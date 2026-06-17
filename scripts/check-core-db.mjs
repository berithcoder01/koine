// check-core-db.mjs
import { DatabaseSync } from 'node:sqlite';

const coreDb = new DatabaseSync('android/app/src/main/assets/databases/koine_core.db');

console.log('Tabelas no coreDb:---------------------------');
const tables = coreDb.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
tables.forEach(row => console.log(`- ${row.name}`));

console.log('\nVerificação rápida de dados:-----------------------');
console.log('Contagem nt_interlinear:', coreDb.prepare('SELECT COUNT(*) as count FROM nt_interlinear').get().count);
console.log('Contagem strong:', coreDb.prepare('SELECT COUNT(*) as count FROM strong').get().count);
console.log('Contagem nt_pt:', coreDb.prepare('SELECT COUNT(*) as count FROM nt_pt').get().count);

console.log('\nAmostra nt_interlinear (João 1:1):');
const joao1 = coreDb.prepare("SELECT * FROM nt_interlinear WHERE book_abbr='JN' AND chapter=1 AND verse=1 LIMIT 5").all();
joao1.forEach(row => console.log(`- ${row.token_greek} (${row.gloss_pt})`));

console.log('\nAmostra strong G2424:');
const strong2424 = coreDb.prepare("SELECT * FROM strong WHERE id='G2424'").get();
if (strong2424) {
  console.log(`- ${strong2424.greek} (translit: ${strong2424.translit})`);
  console.log(`- Definições: ${strong2424.definitions}`);
} else {
  console.log("- Strong G2424 não encontrado");
}

console.log('\nVerificação concluída.');