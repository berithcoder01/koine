// scripts/inspect-db.mjs
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('android/app/src/main/assets/databases/koine_core.db');

// ── Schema das tabelas ───────────────────────────────────────────
console.log('=== SCHEMA DAS TABELAS ===\n');

const cols1 = db.prepare('PRAGMA table_info(nt_interlinear)').all();
console.log('nt_interlinear cols:', cols1.map(c => c.name).join(', '));

const cols2 = db.prepare('PRAGMA table_info(strong)').all();
console.log('strong cols:', cols2.map(c => c.name).join(', '));

const cols3 = db.prepare('PRAGMA table_info(nt_pt)').all();
console.log('nt_pt cols:', cols3.map(c => c.name).join(', '));

// ── Contagens ───────────────────────────────────────────────────
console.log('\n=== CONTAGENS ===\n');
console.log('nt_interlinear:', db.prepare('SELECT COUNT(*) as c FROM nt_interlinear').get().c, 'tokens');
console.log('strong:', db.prepare('SELECT COUNT(*) as c FROM strong').get().c, 'entradas');
console.log('nt_pt:', db.prepare('SELECT COUNT(*) as c FROM nt_pt').get().c, 'versículos');

// ── Amostra nt_interlinear (primeiros 3 tokens de João 1:1) ─────
console.log('\n=== AMOSTRA nt_interlinear — João 1:1 ===\n');
const interlinear = db.prepare('SELECT * FROM nt_interlinear LIMIT 3').all();
if (interlinear.length) {
  // Mostrar todas as colunas da primeira linha para entender o schema real
  console.log('Colunas disponíveis:', Object.keys(interlinear[0]).join(', '));
  interlinear.forEach(r => console.log(r));
} else {
  console.log('Nenhum dado encontrado.');
}

// ── Amostra nt_pt (versículo João 1:1) ─────────────────────────
console.log('\n=== AMOSTRA nt_pt — primeiros 3 ===\n');
const ptRows = db.prepare('SELECT * FROM nt_pt LIMIT 3').all();
if (ptRows.length) {
  console.log('Colunas disponíveis:', Object.keys(ptRows[0]).join(', '));
  ptRows.forEach(r => console.log(r));
} else {
  console.log('Nenhum dado encontrado.');
}

// ── Amostra strong (G2424 — Ἰησοῦς) ───────────────────────────
console.log('\n=== AMOSTRA strong — G2424 ===\n');
const strong = db.prepare("SELECT * FROM strong WHERE id='G2424'").get();
if (strong) {
  console.log('Colunas disponíveis:', Object.keys(strong).join(', '));
  console.log(strong);
} else {
  console.log('Strong G2424 não encontrado — tentando id numérico...');
  const alt = db.prepare('SELECT * FROM strong LIMIT 1').get();
  console.log('Primeira entrada do strong:', alt);
}

console.log('\n=== VERIFICAÇÃO CONCLUÍDA ===');
