// src/services/database/seedNT.ts
import { databaseService } from '../sqlite';
import { NT_TOKENS } from '@/content/nt/verses';

const NT_ABBR_VERSION = 'sblgnt-v1'; // Bump quando book_abbr mudar (força re-seed)
const CHUNK_SIZE = 500;

export const seedNT = async (onProgress?: (pct: number) => void) => {
  const db = databaseService.getDB();
  onProgress?.(0);

  // Version check: força re-seed quando convenção de abreviação muda
  const versionRow = await db.query(
    `SELECT value FROM user_settings WHERE key = 'nt_abbr_version'`
  );
  const currentVersion = versionRow.values?.[0]?.value;
  const isSeeded = currentVersion === NT_ABBR_VERSION;
  if (isSeeded) {
    const existing = await db.query('SELECT COUNT(*) as count FROM nt_text');
    if ((existing.values?.[0]?.count ?? 0) > 20) {
      console.log(`[Seed] NT text version ${NT_ABBR_VERSION} matches, skipping`);
      onProgress?.(100);
      return;
    }
  }

  if (currentVersion) {
    console.log(`[Seed] NT abbr version changed (${currentVersion} → ${NT_ABBR_VERSION}), re-seeding nt_text`);
    await db.execute('DELETE FROM nt_text');
  }

  console.log(`[Seed] Inserting ${NT_TOKENS.length} tokens into nt_text (in chunks of ${CHUNK_SIZE})...`);

  let tokensInserted = 0;
  for (let i = 0; i < NT_TOKENS.length; i += CHUNK_SIZE) {
    const chunk = NT_TOKENS.slice(i, i + CHUNK_SIZE);
    const statements = chunk.map((t) => ({
      statement: `INSERT OR IGNORE INTO nt_text
        (id, book_abbr, book_name, chapter, verse, position, token, lemma, strongs_id, parsing, gloss_pt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        `${t.bookAbbr}-${t.ch}-${t.v}-${t.p}`,
        t.bookAbbr, t.bookName, t.ch, t.v, t.p,
        t.token, t.lemma, t.sid || null, t.pars || null, t.gloss || null,
      ],
    }));

    await db.executeSet(statements, true);
    tokensInserted += chunk.length;

    const pct = Math.min(100, (tokensInserted / NT_TOKENS.length) * 100);
    onProgress?.(pct);

    if (i % (CHUNK_SIZE * 10) === 0) {
      console.log(`[Seed]   nt_text progress: ${tokensInserted}/${NT_TOKENS.length}`);
    }
  }

  await db.run(
    `INSERT OR REPLACE INTO user_settings (key, value) VALUES ('nt_abbr_version', ?)`,
    [NT_ABBR_VERSION]
  );
  console.log(`[Seed] ${NT_TOKENS.length} NT tokens seeded (${NT_ABBR_VERSION})`);
  onProgress?.(100);
};
