import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const MASTER_FILE = resolve(ROOT_DIR, 'src/assets/nt_interlinear.json');

console.log('[Truncate] Carregando arquivo Mestre do interlinear...');
const masterRaw = readFileSync(MASTER_FILE, 'utf-8');
const masterData = JSON.parse(masterRaw);

let updatedCount = 0;
const MAX_LEN = 30;

for (const row of masterData) {
  if (row.glossPT && row.glossPT.length > MAX_LEN) {
    let text = row.glossPT;
    
    // Procura por pontuação dentro dos primeiros 30 caracteres
    const firstPart = text.substring(0, MAX_LEN);
    const punctuationMatch = firstPart.match(/([,.;:])(.*)$/);
    
    if (punctuationMatch) {
      // Se tiver pontuação, corta imediatamente nela
      const cutIndex = punctuationMatch.index;
      text = text.substring(0, cutIndex).trim();
    } else {
      // Sem pontuação: procura o último espaço vazio antes dos 30 caracteres para não quebrar palavra
      const lastSpaceIndex = firstPart.lastIndexOf(' ');
      if (lastSpaceIndex > 0) {
        text = text.substring(0, lastSpaceIndex).trim() + '...';
      } else {
        // Palavra gigante sem espaços? Corta seco nos 30 caracteres
        text = firstPart + '...';
      }
    }
    
    if (row.glossPT !== text) {
      row.glossPT = text;
      updatedCount++;
    }
  }
}

writeFileSync(MASTER_FILE, JSON.stringify(masterData, null, 2), 'utf-8');

console.log(`[Truncate] Processo Finalizado!`);
console.log(`[Truncate] Total de descricoes longas encurtadas: ${updatedCount}`);
