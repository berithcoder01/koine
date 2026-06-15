// Fix verses.ts: replace remaining old abbrs
import { readFileSync, writeFileSync } from 'fs';

const path = 'src/content/nt/verses.ts';
let c = readFileSync(path, 'utf-8');

const MIGRATION = {
  'bookAbbr:\'ACT\'':  'bookAbbr:\'AC\'',
  'bookAbbr:\'ROM\'':  'bookAbbr:\'RO\'',
  'bookAbbr:\'1COR\'':'bookAbbr:\'1CO\'',
  'bookAbbr:\'2COR\'':'bookAbbr:\'2CO\'',
  'bookAbbr:\'GAL\'': 'bookAbbr:\'GA\'',
  'bookAbbr:\'EPH\'': 'bookAbbr:\'EP\'',
  'bookAbbr:\'PHP\'': 'bookAbbr:\'PH\'',
  'bookAbbr:\'COL\'': 'bookAbbr:\'CO\'',
  'bookAbbr:\'TIT\'': 'bookAbbr:\'TI\'',
  'bookAbbr:\'HEB\'': 'bookAbbr:\'HE\'',
  'bookAbbr:\'JAS\'': 'bookAbbr:\'JA\'',
  'bookAbbr:\'JUD\'': 'bookAbbr:\'JUDE\'',
  'bookAbbr:\'REV\'': 'bookAbbr:\'RE\'',
};

let total = 0;
const stats = {};
for (const [from, to] of Object.entries(MIGRATION)) {
  const matches = c.match(new RegExp(from.replace(/'/g, "\\'"), 'g'));
  if (matches) {
    stats[from] = matches.length;
    c = c.replace(new RegExp(from.replace(/'/g, "\\'"), 'g'), to);
    total += matches.length;
  }
}

if (total > 0) {
  writeFileSync(path, c, 'utf-8');
  console.log(`[migrate] verses.ts: ${total} replacements`);
  for (const [k, v] of Object.entries(stats)) {
    console.log(`  ${k.padEnd(20)} → ${MIGRATION[k].padEnd(20)}: ${v}`);
  }
} else {
  console.log('[migrate] verses.ts: no changes');
}
