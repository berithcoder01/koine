import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const MORPHGNT_URL = 'https://raw.githubusercontent.com/morphgnt/sblgnt/master/';

interface TokenRow {
  id: string;
  book_abbr: string;
  book_name: string;
  chapter: number;
  verse: number;
  position: number;
  token: string;
  lemma: string;
  strongs_id: string | null;
  parsing: string;
}

interface StrongEntry {
  id: string;
  greek: string;
}

// Internal MorphGNT ref codes → our abbreviations/book names
const BOOK_MAP: Record<string, { abbr: string; name: string }> = {
  '01': { abbr: 'MT', name: 'Mateus' },
  '02': { abbr: 'MK', name: 'Marcos' },
  '03': { abbr: 'LK', name: 'Lucas' },
  '04': { abbr: 'JN', name: 'João' },
  '05': { abbr: 'ACT', name: 'Atos' },
  '06': { abbr: 'ROM', name: 'Romanos' },
  '07': { abbr: '1COR', name: '1 Coríntios' },
  '08': { abbr: '2COR', name: '2 Coríntios' },
  '09': { abbr: 'GAL', name: 'Gálatas' },
  '10': { abbr: 'EPH', name: 'Efésios' },
  '11': { abbr: 'PHP', name: 'Filipenses' },
  '12': { abbr: 'COL', name: 'Colossenses' },
  '13': { abbr: '1TH', name: '1 Tessalonicenses' },
  '14': { abbr: '2TH', name: '2 Tessalonicenses' },
  '15': { abbr: '1TI', name: '1 Timóteo' },
  '16': { abbr: '2TI', name: '2 Timóteo' },
  '17': { abbr: 'TIT', name: 'Tito' },
  '18': { abbr: 'PHM', name: 'Filemom' },
  '19': { abbr: 'HEB', name: 'Hebreus' },
  '20': { abbr: 'JAS', name: 'Tiago' },
  '21': { abbr: '1PE', name: '1 Pedro' },
  '22': { abbr: '2PE', name: '2 Pedro' },
  '23': { abbr: '1JN', name: '1 João' },
  '24': { abbr: '2JN', name: '2 João' },
  '25': { abbr: '3JN', name: '3 João' },
  '26': { abbr: 'JUD', name: 'Judas' },
  '27': { abbr: 'REV', name: 'Apocalipse' },
};

const FILE_NAMES: Record<string, string> = {
  '61': '61-Mt', '62': '62-Mk', '63': '63-Lk', '64': '64-Jn', '65': '65-Ac',
  '66': '66-Ro', '67': '67-1Co', '68': '68-2Co', '69': '69-Ga', '70': '70-Eph',
  '71': '71-Php', '72': '72-Col', '73': '73-1Th', '74': '74-2Th', '75': '75-1Ti',
  '76': '76-2Ti', '77': '77-Tit', '78': '78-Phm', '79': '79-Heb', '80': '80-Jas',
  '81': '81-1Pe', '82': '82-2Pe', '83': '83-1Jn', '84': '84-2Jn', '85': '85-3Jn',
  '86': '86-Jud', '87': '87-Re',
};

function parseLine(line: string): { ref: string; pos: string; parsing: string; text: string; lemma: string } | null {
  const parts = line.split(/\s+/);
  if (parts.length < 7) return null;
  return {
    ref: parts[0],
    pos: parts[1],
    parsing: parts[2],
    text: parts[3],
    lemma: parts[6],
  };
}

function buildLemmaMap(strong: StrongEntry[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of strong) {
    const greekLower = entry.greek.toLowerCase().trim();
    if (!map.has(greekLower)) {
      map.set(greekLower, entry.id);
    }
  }
  return map;
}

async function downloadBook(fileName: string): Promise<string> {
  const url = `${MORPHGNT_URL}${fileName}-morphgnt.txt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  return await res.text();
}

const STRONG_PATH = join(import.meta.dirname, '..', 'assets', 'strong.json');
const NT_OUTPUT = join(import.meta.dirname, '..', 'assets', 'nt_text.json');

async function main() {
  console.log('[downloadNT] Loading strong.json...');
  const strong: StrongEntry[] = JSON.parse(readFileSync(STRONG_PATH, 'utf-8'));
  const lemmaMap = buildLemmaMap(strong);
  console.log(`[downloadNT] Built lemma map with ${lemmaMap.size} entries`);

  const allTokens: TokenRow[] = [];
  const fileCodes = Object.keys(FILE_NAMES);

  for (const numCode of fileCodes) {
    const fileName = FILE_NAMES[numCode];
    console.log(`[downloadNT] Downloading ${fileName}...`);
    const text = await downloadBook(fileName);
    const lines = text.split('\n').filter(l => l.trim());

    let position = 0;
    let prevBookRef = '';

    for (const line of lines) {
      const parsed = parseLine(line);
      if (!parsed) continue;

      const refBook = parsed.ref.substring(0, 2);
      const chapter = parseInt(parsed.ref.substring(2, 4), 10);
      const verse = parseInt(parsed.ref.substring(4, 6), 10);

      const bookMeta = BOOK_MAP[refBook];
      if (!bookMeta) {
        console.warn(`[downloadNT] Unknown book code: ${refBook} (in ${fileName})`);
        continue;
      }

      const currentRef = `${refBook}-${chapter}-${verse}`;
      if (currentRef !== prevBookRef) {
        position = 0;
        prevBookRef = currentRef;
      }
      position++;

      const id = `${bookMeta.abbr}-${chapter}-${verse}-${position}`;
      const lemmaLower = parsed.lemma.toLowerCase().trim();
      const strongsId = lemmaMap.get(lemmaLower) || null;

      allTokens.push({
        id,
        book_abbr: bookMeta.abbr,
        book_name: bookMeta.name,
        chapter,
        verse,
        position,
        token: parsed.text,
        lemma: parsed.lemma,
        strongs_id: strongsId,
        parsing: parsed.parsing,
      });
    }
  }

  console.log(`[downloadNT] Generated ${allTokens.length} tokens`);
  writeFileSync(NT_OUTPUT, JSON.stringify(allTokens), 'utf-8');
  console.log(`[downloadNT] Written to ${NT_OUTPUT}`);
}

main().catch(console.error);
