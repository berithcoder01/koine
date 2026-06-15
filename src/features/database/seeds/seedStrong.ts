// src/services/database/seedStrong.ts
import { databaseService } from '../sqlite';
import { STRONG_DICTIONARY } from '@/content/strong';

export const seedStrong = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM strong');
  if ((existing.values?.[0]?.count ?? 0) > 0) {
    console.log('[Seed] Strong dictionary already seeded, skipping');
    return;
  }

  console.log(`[Seed] Seeding ${STRONG_DICTIONARY.length} Strong entries...`);

  const batchSize = 100;
  let current = 0;

  while (current < STRONG_DICTIONARY.length) {
    const batch = STRONG_DICTIONARY.slice(current, current + batchSize);
    const statements = batch.map((entry) => ({
      statement: `INSERT OR IGNORE INTO strong
        (id, number, greek, translit, pronunciation, pos, origin, definitions, name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        entry.id,
        entry.number,
        entry.greek,
        entry.translit || null,
        entry.pronunciation || null,
        entry.pos || null,
        entry.origin || null,
        JSON.stringify(entry.definitions),
        entry.name || null,
      ],
    }));

    await db.executeSet(statements, true);
    current += batchSize;

    if (current % 500 === 0 || current === STRONG_DICTIONARY.length) {
      console.log(`[Seed] Strong: ${current}/${STRONG_DICTIONARY.length}`);
    }
  }

  console.log('[Seed] Strong dictionary complete');
};
