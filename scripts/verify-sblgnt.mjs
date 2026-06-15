// Re-verify: check bookAbbr field for each schema
import { readFileSync } from 'fs';
import { join } from 'path';

const NEW = ['AC', 'RO', '1CO', '2CO', 'GA', 'EP', 'PH', 'CO', 'TI', 'HE', 'JA', 'JUDE', 'RE'];
const OLD = ['ACT', 'ROM', '1COR', '2COR', 'GAL', 'EPH', 'PHP', 'COL', 'TIT', 'HEB', 'JAS', 'JUD', 'REV'];

const FILES = [
  { file: 'src/assets/nt_text.json',       idField: 'id' },
  { file: 'src/assets/nt_interlinear.json', idField: 'bookAbbr' },
  { file: 'src/assets/nt_pt.json',          idField: 'bookAbbr' },
];

for (const { file, idField } of FILES) {
  const c = readFileSync(join(process.cwd(), file), 'utf-8');
  console.log(`\n=== ${file} (${idField} field) ===`);

  // Check: how many records per new abbr?
  for (const tok of NEW) {
    const re = new RegExp(`"${idField}":"${tok}"`, 'g');
    const n = (c.match(re) || []).length;
    if (n > 0) console.log(`  ✓ ${tok.padEnd(5)}: ${n} records`);
  }

  // Check: any old abbrs remain?
  let stale = 0;
  for (const tok of OLD) {
    const re = new RegExp(`"${idField}":"${tok}"`, 'g');
    const n = (c.match(re) || []).length;
    if (n > 0) {
      console.log(`  ❌ ${tok.padEnd(5)}: ${n} records (STALE)`);
      stale += n;
    }
  }
  if (stale === 0) console.log('  ✓ No stale abbrs');
}

// Sample full record: João 1:1 in interlinear
console.log('\n=== João 1:1 interlinear sample ===');
const ic = readFileSync(join(process.cwd(), 'src/assets/nt_interlinear.json'), 'utf-8');
const iMatches = ic.match(/\{"bookAbbr":"JN","ch":1,"v":1,"position":1[^}]+\}/);
console.log(iMatches ? iMatches[0] : 'NOT FOUND');

// Sample full record: Apocalipse 22:21 in pt
console.log('\n=== Apocalipse 22:21 pt sample ===');
const pc = readFileSync(join(process.cwd(), 'src/assets/nt_pt.json'), 'utf-8');
const pMatches = pc.match(/\{"bookAbbr":"RE","bookName":"Apocalipse","ch":22,"v":21[^}]+\}/);
console.log(pMatches ? pMatches[0] : 'NOT FOUND');
