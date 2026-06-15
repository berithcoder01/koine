// src/features/database/seeds/seedNTpt.ts
// Popula as tabelas nt_pt e nt_interlinear a partir de nt_pt.json
// (gerado por downloadBLivre.ts) e nt_interlinear.json (gerado por
// buildInterlinear.ts).
//
// Execução: chamada automática por init.ts após seedNT().

import { databaseService } from '../sqlite';

interface NTPtVerse {
  bookAbbr: string;
  bookName: string;
  ch: number;
  v: number;
  text: string;
  source: string;
  version: string;
}

interface NTPtGloss {
  bookAbbr: string;
  ch: number;
  v: number;
  position: number;
  tokenGreek: string;
  lemma: string;
  strongsId: string | null;
  glossPT: string;
  glossSource: string;
  parsing: string;
}

const NT_PT_PATH = '/assets/nt_pt.json';
const NT_INTERLINEAR_PATH = '/assets/nt_interlinear.json';

const NT_ABBR_VERSION = 'sblgnt-v2'; // Bump quando book_abbr ou dados de strongs_id mudarem (força re-seed)
const CHUNK_SIZE = 500; // Evita OOM no Capacitor Bridge (75MB JSON serialization limit)

export const seedNTpt = async (onProgress?: (pct: number) => void): Promise<void> => {
  const db = databaseService.getDB();
  onProgress?.(0);

  // Version check: força re-seed quando convenção de abreviação muda
  const versionRow = await db.query(
    `SELECT value FROM user_settings WHERE key = 'nt_abbr_version_pt'`
  );
  const currentVersion = versionRow.values?.[0]?.value;
  const abbrChanged = currentVersion !== NT_ABBR_VERSION;

  if (abbrChanged && currentVersion) {
    console.log(`[Seed] NT abbr version changed (${currentVersion} → ${NT_ABBR_VERSION}), clearing nt_pt + nt_interlinear`);
    await db.execute('DELETE FROM nt_pt');
    await db.execute('DELETE FROM nt_interlinear');
  }

  // 1) nt_pt (30% weight)
  const existingPt = await db.query('SELECT COUNT(*) as count FROM nt_pt');
  const isPtSeeded = !abbrChanged && (existingPt.values?.[0]?.count ?? 0) > 20;

  if (isPtSeeded) {
    console.log(`[Seed] nt_pt version ${NT_ABBR_VERSION} matches, skipping`);
    onProgress?.(30);
  } else {
    console.log('[Seed] Loading nt_pt.json...');
    const res = await fetch(NT_PT_PATH);
    const verses: NTPtVerse[] = await res.json();
    console.log(`[Seed] Inserting ${verses.length} verses into nt_pt (in chunks of ${CHUNK_SIZE})...`);

    let ptInserted = 0;
    for (let i = 0; i < verses.length; i += CHUNK_SIZE) {
      const chunk = verses.slice(i, i + CHUNK_SIZE);
      const statements = chunk.map((v) => ({
        statement: `INSERT OR IGNORE INTO nt_pt (book_abbr, chapter, verse, text, source, version)
                    VALUES (?, ?, ?, ?, ?, ?)`,
        values: [v.bookAbbr, v.ch, v.v, v.text, v.source, v.version],
      }));
      await db.executeSet(statements, true);
      ptInserted += chunk.length;
      
      const pct = Math.min(30, (ptInserted / verses.length) * 30);
      onProgress?.(pct);

      if (i % (CHUNK_SIZE * 10) === 0) {
        console.log(`[Seed]   nt_pt progress: ${ptInserted}/${verses.length}`);
      }
    }
    console.log(`[Seed] nt_pt seeded: ${verses.length} verses`);
    onProgress?.(30);
  }

  // 2) nt_interlinear (70% weight)
  const existingIl = await db.query('SELECT COUNT(*) as count FROM nt_interlinear');
  const isIlSeeded = !abbrChanged && (existingIl.values?.[0]?.count ?? 0) > 100;

  if (isIlSeeded) {
    console.log(`[Seed] nt_interlinear version ${NT_ABBR_VERSION} matches, skipping`);
    await db.run(
      `INSERT OR REPLACE INTO user_settings (key, value) VALUES ('nt_abbr_version_pt', ?)`,
      [NT_ABBR_VERSION]
    );
    onProgress?.(100);
    return;
  }

  console.log('[Seed] Loading nt_interlinear.json...');
  try {
    const res = await fetch(NT_INTERLINEAR_PATH);
    const glosses: NTPtGloss[] = await res.json();
    console.log(`[Seed] Inserting ${glosses.length} token glosses into nt_interlinear (in chunks of ${CHUNK_SIZE})...`);

    let ilInserted = 0;
    for (let i = 0; i < glosses.length; i += CHUNK_SIZE) {
      const chunk = glosses.slice(i, i + CHUNK_SIZE);
      const statements = chunk.map((g) => ({
        statement: `INSERT OR IGNORE INTO nt_interlinear
          (book_abbr, chapter, verse, position, token_greek, lemma, strongs_id, parsing, gloss_pt, gloss_source)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        values: [g.bookAbbr, g.ch, g.v, g.position, g.tokenGreek, g.lemma, g.strongsId, g.parsing, g.glossPT, g.glossSource],
      }));
      await db.executeSet(statements, true);
      ilInserted += chunk.length;

      const pct = 30 + Math.min(70, (ilInserted / glosses.length) * 70);
      onProgress?.(pct);

      if (i % (CHUNK_SIZE * 10) === 0) {
        console.log(`[Seed]   nt_interlinear progress: ${ilInserted}/${glosses.length}`);
      }
    }
    await db.run(
      `INSERT OR REPLACE INTO user_settings (key, value) VALUES ('nt_abbr_version_pt', ?)`,
      [NT_ABBR_VERSION]
    );
    console.log(`[Seed] nt_interlinear seeded: ${glosses.length} tokens (${NT_ABBR_VERSION})`);
    onProgress?.(100);
  } catch (e) {
    console.warn('[Seed] nt_interlinear.json não encontrado — execute buildInterlinear.ts primeiro.');
    onProgress?.(100);
  }
};
