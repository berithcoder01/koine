// src/services/database/seed.ts
import { databaseService } from '../sqlite';
import { CYCLES } from '@/content/curriculum/cycles';
import { MODULES } from '@/content/curriculum/modules';

export const seedDatabase = async () => {
  const db = databaseService.getDB();

  // Verificar se o banco de dados tem dados, mas com contagem incorreta de módulos (inconsistente)
  try {
    const existingModules = await db.query('SELECT COUNT(*) as count FROM modules');
    const moduleCount = existingModules.values?.[0]?.count ?? 0;
    if (moduleCount > 0 && moduleCount !== 19) {
      console.log(`[Seed] Inconsistência de dados detectada (${moduleCount} módulos no banco, esperado 19). Esvaziando tabelas para forçar re-semeadura completa...`);
      await db.run('DELETE FROM unit_progress');
      await db.run('DELETE FROM learning_units');
      await db.run('DELETE FROM exercises');
      await db.run('DELETE FROM lesson_content');
      await db.run('DELETE FROM modules');
      await db.run('DELETE FROM cycles');
      await db.run('DELETE FROM letters');
      await db.run('DELETE FROM vocabulary');
      await db.run('DELETE FROM nt_text');
      await db.run('DELETE FROM nt_pt');
      await db.run('DELETE FROM nt_interlinear');
      await db.run('DELETE FROM strong');
      await db.run("DELETE FROM user_settings WHERE key IN ('learning_units_version', 'nt_abbr_version', 'nt_abbr_version_pt')");
    }
  } catch (err) {
    console.warn('[Seed] Erro ao verificar módulos existentes para re-seed (provavelmente tabelas ainda não criadas):', err);
  }

  // 1. Verificar e semear CICLOS se estiverem vazios
  const existingCycles = await db.query('SELECT COUNT(*) as count FROM cycles');
  if ((existingCycles.values?.[0]?.count ?? 0) === 0) {
    console.log('[Seed] Seeding cycles...');
    for (const c of CYCLES) {
      await db.run(
        `INSERT OR IGNORE INTO cycles
          (id, title, description, trophy_verse, trophy_reference, is_premium, total_modules)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [c.id, c.title, c.description, c.trophyVerse, c.trophyReference, c.isPremium, c.totalModules],
      );
    }
  }

  // 2. Verificar e semear MÓDULOS se estiverem vazios
  const existingModules = await db.query('SELECT COUNT(*) as count FROM modules');
  if ((existingModules.values?.[0]?.count ?? 0) === 0) {
    console.log('[Seed] Seeding modules...');
    for (const m of MODULES) {
      await db.run(
        `INSERT OR IGNORE INTO modules VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [m.id, m.cycle, m.order, m.title, m.description, m.anchorVerse, m.anchorReference, m.method, m.xp, m.exercises],
      );
    }
  }
};
