import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const STRONG_FILE = resolve(ROOT_DIR, 'src/assets/strong.json');
const MISSING_FILE = resolve(ROOT_DIR, '.db-output/missing_glosses.json');
const OUTPUT_FILE = resolve(ROOT_DIR, '.db-output/translated_glosses.json');

console.log('[Translate] Carregando dicionário Strong...');
const strongRaw = readFileSync(STRONG_FILE, 'utf-8');
const strongData = JSON.parse(strongRaw);

const strongMap = new Map();
for (const entry of strongData) {
  // O ID no strong.json é "G1", "G2", e bate exatamente com a propriedade strongsId
  strongMap.set(entry.id, entry);
}

console.log('[Translate] Carregando as 22.524 palavras faltantes...');
const missingRaw = readFileSync(MISSING_FILE, 'utf-8');
const missingData = JSON.parse(missingRaw);

let translatedCount = 0;
let fallbackCount = 0;

for (const row of missingData) {
  if (row.strongsId && strongMap.has(row.strongsId)) {
    const strongEntry = strongMap.get(row.strongsId);
    
    // Tenta pegar a primeira definição válida do array
    if (strongEntry.definitions && strongEntry.definitions.length > 0) {
      let mainDefinition = strongEntry.definitions[0];
      
      // Limpeza da definição primária
      // Remove possíveis marcadores como "1) ", "1a) "
      mainDefinition = mainDefinition.replace(/^\d+[a-z]?\)\s*/, '');
      
      // Se houver explicação extra com "i.e.", "i.e.,", cortamos para pegar só a tradução pura
      if (mainDefinition.includes('i.e.,')) {
          mainDefinition = mainDefinition.split('i.e.,')[0].trim();
      } else if (mainDefinition.includes('i.e.')) {
          mainDefinition = mainDefinition.split('i.e.')[0].trim();
      }
      
      // Remove vírgulas/ponto-e-vírgulas no final do texto cortado
      mainDefinition = mainDefinition.replace(/[,;]\s*$/, '');
      
      row.glossPT = mainDefinition;
      translatedCount++;
    } else {
      fallbackCount++;
    }
  } else {
    fallbackCount++;
  }
}

writeFileSync(OUTPUT_FILE, JSON.stringify(missingData, null, 2), 'utf-8');

console.log(`[Translate] Processo de cruzamento finalizado!`);
console.log(`[Translate] Total traduzido com sucesso: ${translatedCount}`);
console.log(`[Translate] Sem correlação no Strong (mantido fallback original): ${fallbackCount}`);
console.log(`[Translate] Arquivo gerado em: ${OUTPUT_FILE}`);
