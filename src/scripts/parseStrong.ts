import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const INPUT = resolve(import.meta.dirname, '../wiki/strong_grego.md');
const OUTPUT = resolve(import.meta.dirname, '../assets/strong.json');

interface StrongEntry {
  id: string;
  number: number;
  greek: string;
  translit: string;
  pronunciation: string;
  origin: string;
  pos: string;
  definitions: string[];
  name: string;
  isTopic: boolean;
}

const GREEK_RE = /[\u0370-\u03FF\u1F00-\u1FFF\u2C80-\u2CFF\u3040-\u309F\u30A0-\u30FF\u0400-\u04FF]/;
const HEADER_RE = /^## (G\d+)\s*[—–-]\s*G0?\d+\s*(.*)/;
const BULLET_RE = /^[-–]\s*(?:\d+[\)\.]\s*)?(.*)/;
const ORIGIN_POS_RE = /;\s*(n\s*(pr\s+m|pr\s+f|pr\s+loc|f|m|n)|v|adj|adv|conj|prep|part|interj|ptcl|pron|art|hebr|aram|heb|aram)/i;
const VER_DEF_RE = /^Ver defini[cç][aã]o de/i;

function isGreekChar(c: string): boolean {
  return GREEK_RE.test(c);
}

function isLatinChar(c: string): boolean {
  return /[a-zA-Zà-üÀ-Ü]/.test(c);
}

function parseHeader(rest: string): { greek: string; translit: string; pronunciation: string; name: string; isTopic: boolean } {
  let greek = '';
  let translit = '';
  let pronunciation = '';
  let name = '';
  let isTopic = false;

  rest = rest.trim();

  if (rest.startsWith('-')) {
    isTopic = true;
    name = rest.replace(/^-\s*/, '').trim();
    return { greek, translit, pronunciation, name, isTopic };
  }

  const tokens = rest.split(/\s+/);
  const greekTokens: string[] = [];
  const latinTokens: string[] = [];
  let inGreek = false;
  let inLatin = false;
  let switchedToLatin = false;

  for (const tok of tokens) {
    const firstChar = tok[0];
    if (isGreekChar(firstChar) || (firstChar && firstChar.charCodeAt(0) > 127 && !/^[a-zA-Z]/.test(firstChar))) {
      if (inLatin && switchedToLatin) {
        pronunciation = latinTokens.join(' ');
        latinTokens.length = 0;
        latinTokens.push(tok);
        inLatin = true;
        inGreek = false;
        continue;
      }
      inGreek = true;
      inLatin = false;
      greekTokens.push(tok);
    } else if (isLatinChar(firstChar) || firstChar === '/' || firstChar === "'") {
      if (inGreek && greekTokens.length > 0) {
        switchedToLatin = true;
      }
      inLatin = true;
      inGreek = false;
      latinTokens.push(tok);
    }
  }

  greek = greekTokens.join(' ');

  if (latinTokens.length >= 1) {
    translit = latinTokens[0];
    if (latinTokens.length > 1) {
      pronunciation = latinTokens.slice(1).join(' ');
    }
  }

  if (!greek && translit) {
    isTopic = true;
    name = translit + (pronunciation ? ' ' + pronunciation : '');
    translit = '';
    pronunciation = '';
  }

  return { greek, translit, pronunciation, name, isTopic };
}

function extractPos(line: string): string {
  const match = line.match(ORIGIN_POS_RE);
  if (match) {
    let pos = match[1].trim();
    pos = pos.replace(/\s+/g, ' ');
    const common: Record<string, string> = {
      'n pr m': 'n pr m',
      'n pr f': 'n pr f',
      'n pr loc': 'n pr loc',
      'n f': 'n f',
      'n m': 'n m',
      'n n': 'n n',
      'n': 'n',
      'v': 'v',
      'adj': 'adj',
      'adv': 'adv',
      'conj': 'conj',
      'prep': 'prep',
      'part': 'part',
      'interj': 'interj',
      'ptcl': 'ptcl',
      'pron': 'pron',
      'art': 'art',
      'hebr': 'hebr',
      'aram': 'aram',
    };
    return common[pos.toLowerCase()] || pos.toLowerCase();
  }
  return '';
}

function parse(): StrongEntry[] {
  const content = readFileSync(INPUT, 'utf-8');
  const sections = content.split(/\n---+\n/);
  const entries: StrongEntry[] = [];

  // First section is file header (# Dic.Strong...), skip it
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i].trim();
    if (!section) continue;

    const lines = section.split('\n');
    const headerLine = lines[0].trim();
    const headerMatch = headerLine.match(HEADER_RE);

    if (!headerMatch) continue;

    const id = headerMatch[1].toUpperCase();
    const number = parseInt(id.replace('G', ''));
    const rest = headerMatch[2];

    const parsed = parseHeader(rest);

    const bodyLines = lines.slice(1).map(l => l.trim()).filter(l => l && !l.startsWith('---'));

    let origin = '';
    let pos = '';
    const definitions: string[] = [];

    // Process body
    for (let j = 0; j < bodyLines.length; j++) {
      const line = bodyLines[j];

      if (!origin && !VER_DEF_RE.test(line) && !BULLET_RE.test(line) && !line.startsWith('Ver definição') && !line.startsWith('Sinônimos')) {
        origin += (origin ? ' ' : '') + line;
        continue;
      }

      const bulletMatch = line.match(BULLET_RE);
      if (bulletMatch) {
        definitions.push(bulletMatch[1].trim());
        continue;
      }

      if (VER_DEF_RE.test(line) || line.startsWith('Sinônimos')) {
        definitions.push(line);
        continue;
      }

      if (line.startsWith('Ver')) {
        definitions.push(line);
        continue;
      }

      if (!line.startsWith('-') && definitions.length > 0) {
        const lastIdx = definitions.length - 1;
        definitions[lastIdx] += ' ' + line;
      }
    }

    if (origin) {
      pos = extractPos(origin);
    }

    entries.push({
      id,
      number,
      greek: parsed.greek,
      translit: parsed.translit,
      pronunciation: parsed.pronunciation,
      origin: origin || '',
      pos,
      definitions: definitions.length > 0 ? definitions : [],
      name: parsed.name || '',
      isTopic: parsed.isTopic,
    });
  }

  return entries;
}

const entries = parse();
mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`Parsed ${entries.length} entries -> ${OUTPUT}`);
