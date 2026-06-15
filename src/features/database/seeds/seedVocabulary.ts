// src/services/database/seedVocabulary.ts
import { databaseService } from '../sqlite';
import { VOCABULARY } from '@/content/vocabulary';

export const seedCoreVocabulary = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM vocabulary');
  if ((existing.values?.[0]?.count ?? 0) > 0) {
    console.log('[Seed] Vocabulary already seeded, skipping');
    return;
  }

  for (const w of VOCABULARY) {
    await db.run(
      `INSERT OR IGNORE INTO vocabulary
       (id, token, lemma, strongs_id, gloss_pt, gloss_alt, frequency, cycle_intro, module_intro, is_core)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [w.id, w.token, w.lemma, w.strongsId, w.glossPt, JSON.stringify(w.glossAlt), w.frequency, w.cycleIntro, w.moduleIntro, w.isCore],
    );
  }

  console.log(`[Seed] ${VOCABULARY.length} vocabulary words seeded`);
};
