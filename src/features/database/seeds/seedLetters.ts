// src/services/database/seedLetters.ts
import { databaseService } from '../sqlite';
import { LETTERS } from '@/content/alphabet';

export const seedLetters = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM letters');
  if ((existing.values?.[0]?.count ?? 0) > 0) return;

  for (const l of LETTERS) {
    await db.run(
      `INSERT OR IGNORE INTO letters
       (id, upper_case, lower_case, name, sound, audio_url, svg_path, letter_order, frequency, cycle, module)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [l.id, l.upper, l.lower, l.name, l.sound, l.audioUrl, l.svgPath, l.letterOrder, l.frequency, l.cycle, l.module],
    );
  }
};
