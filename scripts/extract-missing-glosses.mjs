import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const INPUT_FILE = resolve(ROOT_DIR, 'src/assets/nt_interlinear.json');
const OUTPUT_DIR = resolve(ROOT_DIR, '.db-output');
const OUTPUT_FILE = resolve(OUTPUT_DIR, 'missing_glosses.json');

console.log('[Extract] Lendo base do interlinear...');
const rawData = readFileSync(INPUT_FILE, 'utf-8');
const data = JSON.parse(rawData);

const missingMap = new Map();

console.log('[Extract] Identificando palavras apenas transliteradas...');
let totalMissing = 0;

for (const row of data) {
  if (row.glossSource === 'translit' || !row.glossPT) {
    totalMissing++;
    
    // Agrupar usando combinação única de Token + Lemma + Parsing para preservar contexto gramatical
    const key = `${row.tokenGreek}|${row.lemma || ''}|${row.parsing || ''}|${row.strongsId || ''}`;
    
    if (!missingMap.has(key)) {
      missingMap.set(key, {
        tokenGreek: row.tokenGreek,
        lemma: row.lemma,
        strongsId: row.strongsId,
        parsing: row.parsing,
        occurrences: 1,
        transliteratedFallback: row.glossPT, // Guarda o que estava la pra eventual uso
        glossPT: "" // A preencher no garimpo
      });
    } else {
      const entry = missingMap.get(key);
      entry.occurrences += 1;
    }
  }
}

const missingArray = Array.from(missingMap.values());
// Ordenar por número de ocorrências (para focar no que mais repete)
missingArray.sort((a, b) => b.occurrences - a.occurrences);

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

writeFileSync(OUTPUT_FILE, JSON.stringify(missingArray, null, 2), 'utf-8');

console.log(`[Extract] Sucesso!`);
console.log(`[Extract] Total de ocorrencias faltantes: ${totalMissing}`);
console.log(`[Extract] Total de entradas UNICAS agrupadas: ${missingArray.length}`);
console.log(`[Extract] Arquivo salvo em: ${OUTPUT_FILE}`);
