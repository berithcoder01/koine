import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const MASTER_FILE = resolve(ROOT_DIR, 'src/assets/nt_interlinear.json');
const TRANSLATED_FILE = resolve(ROOT_DIR, '.db-output/translated_glosses.json');

console.log('[Merge] Carregando dicionário recém traduzido...');
const translatedRaw = readFileSync(TRANSLATED_FILE, 'utf-8');
const translatedData = JSON.parse(translatedRaw);

const translatedMap = new Map();
for (const row of translatedData) {
  // Ignora o que não conseguiu achar no Strong
  if (row.glossPT && row.glossPT !== '') {
    const key = `${row.tokenGreek}|${row.lemma || ''}|${row.parsing || ''}|${row.strongsId || ''}`;
    translatedMap.set(key, row.glossPT);
  }
}

console.log('[Merge] Modificando base do Interlinear Mestre...');
const masterRaw = readFileSync(MASTER_FILE, 'utf-8');
const masterData = JSON.parse(masterRaw);

let updatedCount = 0;

for (const row of masterData) {
  if (row.glossSource === 'translit' || row.glossSource === 'strong_dict' || !row.glossPT) {
    const key = `${row.tokenGreek}|${row.lemma || ''}|${row.parsing || ''}|${row.strongsId || ''}`;
    
    if (translatedMap.has(key)) {
      row.glossPT = translatedMap.get(key);
      row.glossSource = 'strong_dict'; // Marcando que a fonte foi nosso merge automático
      updatedCount++;
    }
  }
}

console.log(`[Merge] Salvando arquivo mestre com os novos dados...`);
writeFileSync(MASTER_FILE, JSON.stringify(masterData, null, 2), 'utf-8');

console.log(`[Merge] Sucesso!`);
console.log(`[Merge] Total de palavras consertadas permanentemente: ${updatedCount}`);
