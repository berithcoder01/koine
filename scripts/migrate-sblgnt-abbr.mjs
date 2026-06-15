// scripts/migrate-sblgnt-abbr.mjs
// One-time migration: replace "with-R" book abbreviations with SBLGNT conventions
// in nt_text.json, nt_interlinear.json, nt_pt.json, books.json.
//
// Mapping (with-R → SBLGNT):
//   ACT  → AC     (Atos)
//   ROM  → RO     (Romanos)
//   1COR → 1CO    (1 Coríntios)
//   2COR → 2CO    (2 Coríntios)
//   GAL  → GA     (Gálatas)
//   EPH  → EP     (Efésios)
//   PHP  → PH     (Filipenses)
//   COL  → CO     (Colossenses)
//   TIT  → TI     (Tito)
//   HEB  → HE     (Hebreus)
//   JAS  → JA     (Tiago)
//   JUD  → JUDE   (Judas)
//   REV  → RE     (Apocalipse)
//
// Books NOT changing: MT, MK, LK, JN, 1TH, 2TH, 1TI, 2TI, 1PE, 2PE,
//                     1JN, 2JN, 3JN, PHM.
//
// Strategy: stream-replace. Each "from" token is a 2-4 char uppercase
// substring. We need word boundaries because PT text contains "ato",
// "romano", "cor", "gal", "col" etc — but our targets are ALL-CAPS, so
// ASCII case-sensitive word boundaries work. Also, JSON keys for `id`
// look like "ACT-5-3-1" and the value position is "ACT", both quoted.
// We only replace the token when surrounded by JSON-delimiter chars: ", :, whitespace.

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const MIGRATION_MAP = {
  ACT: 'AC',
  ROM: 'RO',
  '1COR': '1CO',
  '2COR': '2CO',
  GAL: 'GA',
  EPH: 'EP',
  PHP: 'PH',
  COL: 'CO',
  TIT: 'TI',
  HEB: 'HE',
  JAS: 'JA',
  JUD: 'JUDE',
  REV: 'RE',
};

const FILES = [
  'src/assets/nt_text.json',
  'src/assets/nt_interlinear.json',
  'src/assets/nt_pt.json',
  'src/assets/books.json',
];

const totalStats = { tokens: 0, files: 0 };

for (const file of FILES) {
  const path = join(process.cwd(), file);
  const original = readFileSync(path, 'utf-8');
  let migrated = original;
  const fileStats = {};

  for (const [from, to] of Object.entries(MIGRATION_MAP)) {
    // Match the token only when surrounded by JSON-delimiter chars.
    // Surrounding chars: " (quote), : (colon), , (comma), { } (object), [ ] (array),
    //                    whitespace, or start/end of file.
    // We must also preserve length when matching the prefix form in `id` values:
    // e.g. "id":"ACT-5-3-1" → "id":"AC-5-3-1"
    //
    // Two patterns:
    //   (1) standalone value:  "ACT"  →  "AC"    (matches book_abbr value, no trailing chars)
    //   (2) id prefix:         "ACT-  →  "AC-    (matches id value, followed by hyphen)
    //
    // Both are covered by a single regex that matches the token preceded by "
    // and followed by either " or -.

    const pattern = new RegExp(`"${from}(?=[\\"\-])`, 'g');
    const matches = migrated.match(pattern);
    if (matches) {
      fileStats[from] = matches.length;
      migrated = migrated.replace(pattern, `"${to}`);
    }
  }

  const total = Object.values(fileStats).reduce((a, b) => a + b, 0);
  if (total > 0) {
    writeFileSync(path, migrated, 'utf-8');
    console.log(`[migrate] ${file}: ${total} replacements`);
    for (const [k, v] of Object.entries(fileStats)) {
      console.log(`  ${k.padEnd(5)} → ${MIGRATION_MAP[k].padEnd(5)}: ${v}`);
    }
    totalStats.tokens += total;
    totalStats.files += 1;
  } else {
    console.log(`[migrate] ${file}: no changes`);
  }
}

console.log(`\n[migrate] DONE: ${totalStats.tokens} tokens replaced in ${totalStats.files} files`);
