import { databaseService } from './sqlite';
import strongData from '@/assets/strong.json';

export const seedStrong = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM strong');
  if ((existing.values?.[0]?.count ?? 0) > 0) {
    console.log('[Seed] Strong dictionary already seeded, skipping');
    return;
  }

  console.log(`[Seed] Seeding ${strongData.length} Strong entries...`);

  const batchSize = 100;
  let current = 0;

  while (current < strongData.length) {
    const batch = strongData.slice(current, current + batchSize);
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

    if (current % 500 === 0 || current === strongData.length) {
      console.log(`[Seed] Strong: ${current}/${strongData.length}`);
    }
  }

  console.log('[Seed] Strong dictionary complete');
};
