// src/features/database/seeds/seedLearningUnits.ts
// Em modo de desenvolvimento (pré-produção), sempre re-seeda quando a versão do conteúdo muda.
// O progresso anterior é sacrificado — conteúdo antigo não é relevante.

import { databaseService } from '../sqlite';
import { LEARNING_UNITS, type UnitRow } from '@/content/curriculum/units';

const CONTENT_VERSION = 'v4'; // Bump quando o conteúdo mudar (força re-seed)

export const seedLearningUnits = async () => {
  await databaseService.waitForReady();
  const db = databaseService.getDB();

  const versionRow = await db.query(
    `SELECT value FROM user_settings WHERE key = 'learning_units_version'`
  );
  const currentVersion = versionRow.values?.[0]?.value;

  if (currentVersion === CONTENT_VERSION) {
    console.log(`[Seed] Learning units version ${CONTENT_VERSION} matches, skipping`);
    return;
  }

  console.log(`[Seed] Learning units version changed (${currentVersion ?? 'none'} → ${CONTENT_VERSION})`);
  console.log(`[Seed] Seeding ${LEARNING_UNITS.length} units (delete + insert)...`);

  // Remove FK-dependent rows first, then learning_units
  await db.execute('DELETE FROM unit_progress;');
  await db.execute('DELETE FROM learning_units;');

  const batchSize = 20;
  for (let i = 0; i < LEARNING_UNITS.length; i += batchSize) {
    const batch = LEARNING_UNITS.slice(i, i + batchSize);
    const statements = batch.map((u: UnitRow) => ({
      statement: `INSERT INTO learning_units
        (id, module_id, unit_order, unit_type, greek_form, transliteration, gloss_pt,
         phonetic_sound, explanation, mnemonic_hint, context_verse, context_reference,
         srs_key, phase2_data, phase3_data, phase4_data, phase5_data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        u.id, u.module_id, u.unit_order, u.unit_type,
        u.greek_form, u.transliteration, u.gloss_pt,
        u.phonetic_sound, u.explanation, u.mnemonic_hint,
        u.context_verse, u.context_reference, u.srs_key,
        u.phase2_data, u.phase3_data, u.phase4_data, u.phase5_data,
      ],
    }));
    await db.executeSet(statements, true);
  }

  await db.executeSet(
    [
      {
        statement: `INSERT OR REPLACE INTO user_settings (key, value) VALUES ('learning_units_version', ?)`,
        values: [CONTENT_VERSION],
      },
    ],
    true
  );

  console.log('[Seed] Learning units seed complete');
};
