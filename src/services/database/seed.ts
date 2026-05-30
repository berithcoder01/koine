// src/services/database/seed.ts
import { databaseService } from './sqlite';

export const seedDatabase = async () => {
  const db = databaseService.getDB();

  // Verificar se o banco de dados tem dados, mas com contagem incorreta de módulos (inconsistente)
  try {
    const existingModules = await db.query('SELECT COUNT(*) as count FROM modules');
    const moduleCount = existingModules.values?.[0]?.count ?? 0;
    if (moduleCount > 0 && moduleCount !== 18) {
      console.log(`[Seed] Inconsistência de dados detectada (${moduleCount} módulos no banco, esperado 18). Esvaziando tabelas para forçar re-semeadura completa...`);
      await db.run('DELETE FROM exercises');
      await db.run('DELETE FROM lesson_content');
      await db.run('DELETE FROM modules');
      await db.run('DELETE FROM cycles');
      await db.run('DELETE FROM letters');
      await db.run('DELETE FROM vocabulary');
      await db.run('DELETE FROM nt_text');
      await db.run('DELETE FROM strong');
    }
  } catch (err) {
    console.warn('[Seed] Erro ao verificar módulos existentes para re-seed (provavelmente tabelas ainda não criadas):', err);
  }

  // 1. Verificar e semear CICLOS se estiverem vazios
  const existingCycles = await db.query('SELECT COUNT(*) as count FROM cycles');
  if ((existingCycles.values?.[0]?.count ?? 0) === 0) {
    console.log('[Seed] Seeding cycles...');
    await db.run(`INSERT OR IGNORE INTO cycles VALUES
      (1, 'Alfabeto e Fonética', 'Aprenda as 24 letras do grego koiné com pronúncia erasmiana e escrita motora',
       'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόgos ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος',
       'João 1:1', 0, 10)`);

    await db.run(`INSERT OR IGNORE INTO cycles VALUES
      (2, 'Verbos Presente + Ser', 'Conjugação de εἰμί e primeiros verbos do NT em frases reais',
       'ὁ θεὸς ἀγάπη ἐστίν',
       '1 João 4:8', 0, 8)`);

    await db.run(`INSERT OR IGNORE INTO cycles VALUES
      (3, 'Substantivos e Artigos', 'Declinações funcionais via arraste de blocos',
       'ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή',
       'João 14:6', 1, 8)`);
  }

  // 2. Verificar e semear MÓDULOS se estiverem vazios
  const existingModules = await db.query('SELECT COUNT(*) as count FROM modules');
  if ((existingModules.values?.[0]?.count ?? 0) === 0) {
    console.log('[Seed] Seeding modules...');

    // ─── MÓDULOS DO CICLO I ───────────────────────────────────────
    const cycle1Modules = [
      { id: 'C1-M01', order: 1, title: 'Vogais Base: Α, Ε, Ι', anchor: 'ἠγάπησen', ref: 'João 3:16', method: 'Flashcard + Canvas 2D + Áudio', xp: 60, exercises: 10 },
      { id: 'C1-M02', order: 2, title: 'Vogais: Ο, Υ, Ω', anchor: 'χωρὶς αὐτοῦ', ref: 'João 1:3', method: 'Flashcard + Canvas 2D + Distinção de sons', xp: 60, exercises: 10 },
      { id: 'C1-M03', order: 3, title: 'Consoantes Η, Ν, Τ', anchor: 'Ἐν ἀρχῇ ἦν', ref: 'João 1:1', method: 'Flashcard + Canvas 2D + Sílabas', xp: 65, exercises: 10 },
      { id: 'C1-M04', order: 4, title: 'Consoantes Σ, Κ, Λ', anchor: 'Καὶ ὁ λόγος σὰρξ ἐγένετο', ref: 'João 1:14', method: 'Flashcard + Canvas 2D + TPR Digital', xp: 65, exercises: 10 },
      { id: 'C1-M05', order: 5, title: 'Consoantes Π, Ρ, Μ', anchor: 'ἐν τῷ λόγῳ τῷ ἐμῷ', ref: 'João 8:31', method: 'Canvas 2D + Ordenar Sílabas + Áudio', xp: 65, exercises: 10 },
      { id: 'C1-M06', order: 6, title: 'Oclusivas Β, Δ, Γ', anchor: 'κληρονομήσουσιν τὴν γῆn', ref: 'Mateus 5:5', method: 'Canvas 2D + Múltipla Escolha + TPR', xp: 65, exercises: 10 },
      { id: 'C1-M07', order: 7, title: 'Aspiradas Φ, Χ, Θ', anchor: 'τὸ φῶς τῶν ἀνθρώπων', ref: 'João 1:4', method: 'Canvas 2D + Flashcard fonético', xp: 70, exercises: 10 },
      { id: 'C1-M08', order: 8, title: 'Letras Raras Ζ, Ξ, Ψ', anchor: 'ἵνα ζωὴν ἔχωσιν', ref: 'João 10:10', method: 'Canvas 2D + Múltipla Escolha + Narração', xp: 70, exercises: 10 },
      { id: 'C1-M09', order: 9, title: 'Diacríticos e Vogais Longas', anchor: 'Αὐτὸς γάρ ἐστιν ἡ εἰρήνη', ref: 'Efésios 2:14', method: 'Flashcard + Áudio comparativo', xp: 70, exercises: 10 },
      { id: 'C1-M10', order: 10, title: 'Revisão Total + João 1:1', anchor: 'Ἐν ἀρχῇ ἦν ὁ λόγος', ref: 'João 1:1', method: 'Quiz + Narração completa', xp: 100, exercises: 11 },
    ];

    for (const m of cycle1Modules) {
      await db.run(
        `INSERT OR IGNORE INTO modules VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [m.id, 1, m.order, m.title, null, m.anchor, m.ref, m.method, m.xp, m.exercises],
      );
    }

    // ─── MÓDULOS DO CICLO II ──────────────────────────────────────
    const cycle2Modules = [
      { id: 'C2-M01', order: 1, title: 'εἰμί Singular: Eu sou, Tu és, Ele é', anchor: 'ἐγώ εἰμι ἡ ἀνάστασις', ref: 'João 11:25', method: 'Flashcard + MC + TPR', xp: 60, exercises: 10 },
      { id: 'C2-M02', order: 2, title: 'εἰμί Plural: Nós somos, Vós sois, Eles são', anchor: 'ὑμεῖς ἐστε τὸ φῶς', ref: 'Mateus 5:14', method: 'Ordenar + Narração', xp: 60, exercises: 10 },
      { id: 'C2-M03', order: 3, title: 'Pronomes Pessoais Sujeito', anchor: 'ἐγώ εἰμι ὁ ποιμὴν ὁ καλός', ref: 'João 10:11', method: 'TPR Digital + Flashcard', xp: 65, exercises: 10 },
      { id: 'C2-M04', order: 4, title: 'Artigo Definido (Nominativo)', anchor: 'καὶ ὁ λόγος ἦν πρὸς τὸν θεόν', ref: 'João 1:1', method: 'Ordenar + Preencher Lacuna', xp: 65, exercises: 10 },
      { id: 'C2-M05', order: 5, title: 'Substantivos Nominativo — 2ª Declinação', anchor: 'τὸν υἱὸν τὸν μονογενῆ', ref: 'João 3:16', method: 'Flashcard + Canvas', xp: 70, exercises: 10 },
      { id: 'C2-M06', order: 6, title: 'Predicado Nominal', anchor: 'ὁ θεὸς ἀγάπη ἐστίν', ref: '1 João 4:8', method: 'Narração + TBLT', xp: 70, exercises: 10 },
      { id: 'C2-M07', order: 7, title: 'Verbos: λέγω, ἔχω, πιστεύω', anchor: 'ὁ πιστεύων εἰς τὸν υἱόν', ref: 'João 3:36', method: 'Flashcard + Ordenar', xp: 70, exercises: 10 },
      { id: 'C2-M08', order: 8, title: 'Revisão + 1 João 4:8 (Troféu)', anchor: 'ὁ θεὸς ἀγάπη ἐστίν', ref: '1 João 4:8', method: 'Quiz + Narração completa', xp: 100, exercises: 11 },
    ];

    for (const m of cycle2Modules) {
      await db.run(
        `INSERT OR IGNORE INTO modules VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [m.id, 2, m.order, m.title, null, m.anchor, m.ref, m.method, m.xp, m.exercises],
      );
    }
  }
};
