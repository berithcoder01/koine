// src/scripts/buildBooks.ts
// Extrai metadados dos 27 livros do NT a partir de nt_text.json (SBLGNT)
// e gera src/assets/books.json. Usado pelo ReaderPage para o menu de livros.
//
// Execução: npm run build-books

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const NT_TEXT = join(import.meta.dirname, '..', 'assets', 'nt_text.json');
const OUTPUT = join(import.meta.dirname, '..', 'assets', 'books.json');

interface BookMeta {
  abbr: string;
  name: string;
  order: number;
  totalChapters: number;
  totalVerses: number;
  sblgntFileCode: string;
}

// Ordem canônica do NT (SBLGNT) com nomes em PT-BR.
// Abreviações: padrão SBLGNT sem R (AC, RO, 1CO, JA, RE) — bate com BOOK_NAMES
// em ReaderPage/TrailPage.
const BOOK_ORDER: Array<{ abbr: string; name: string; sblgntFileCode: string }> = [
  { abbr: 'MT',   name: 'Mateus',              sblgntFileCode: '61-Mt' },
  { abbr: 'MK',   name: 'Marcos',              sblgntFileCode: '62-Mk' },
  { abbr: 'LK',   name: 'Lucas',               sblgntFileCode: '63-Lk' },
  { abbr: 'JN',   name: 'João',                sblgntFileCode: '64-Jn' },
  { abbr: 'AC',   name: 'Atos',                sblgntFileCode: '65-Ac' },
  { abbr: 'RO',   name: 'Romanos',             sblgntFileCode: '66-Ro' },
  { abbr: '1CO',  name: '1 Coríntios',         sblgntFileCode: '67-1Co' },
  { abbr: '2CO',  name: '2 Coríntios',         sblgntFileCode: '68-2Co' },
  { abbr: 'GA',   name: 'Gálatas',             sblgntFileCode: '69-Ga' },
  { abbr: 'EP',   name: 'Efésios',             sblgntFileCode: '70-Eph' },
  { abbr: 'PH',   name: 'Filipenses',          sblgntFileCode: '71-Php' },
  { abbr: 'CO',   name: 'Colossenses',         sblgntFileCode: '72-Col' },
  { abbr: '1TH',  name: '1 Tessalonicenses',   sblgntFileCode: '73-1Th' },
  { abbr: '2TH',  name: '2 Tessalonicenses',   sblgntFileCode: '74-2Th' },
  { abbr: '1TI',  name: '1 Timóteo',           sblgntFileCode: '75-1Ti' },
  { abbr: '2TI',  name: '2 Timóteo',           sblgntFileCode: '76-2Ti' },
  { abbr: 'TI',   name: 'Tito',                sblgntFileCode: '77-Tit' },
  { abbr: 'PHM',  name: 'Filemom',             sblgntFileCode: '78-Phm' },
  { abbr: 'HE',   name: 'Hebreus',             sblgntFileCode: '79-Heb' },
  { abbr: 'JA',   name: 'Tiago',               sblgntFileCode: '80-Jas' },
  { abbr: '1PE',  name: '1 Pedro',             sblgntFileCode: '81-1Pe' },
  { abbr: '2PE',  name: '2 Pedro',             sblgntFileCode: '82-2Pe' },
  { abbr: '1JN',  name: '1 João',              sblgntFileCode: '83-1Jn' },
  { abbr: '2JN',  name: '2 João',              sblgntFileCode: '84-2Jn' },
  { abbr: '3JN',  name: '3 João',              sblgntFileCode: '85-3Jn' },
  { abbr: 'JUDE', name: 'Judas',               sblgntFileCode: '86-Jud' },
  { abbr: 'RE',   name: 'Apocalipse',          sblgntFileCode: '87-Re' },
];

interface NTRow {
  book_abbr: string;
  chapter: number;
  verse: number;
}

async function main() {
  console.log('[buildBooks] Lendo nt_text.json...');
  const rows: NTRow[] = JSON.parse(readFileSync(NT_TEXT, 'utf-8'));

  // Agrupa por livro
  const byBook = new Map<string, Set<number>>();
  const verseCount = new Map<string, Set<number>>();
  for (const r of rows) {
    if (!byBook.has(r.book_abbr)) byBook.set(r.book_abbr, new Set());
    byBook.get(r.book_abbr)!.add(r.chapter);

    const k = `${r.book_abbr}-${r.chapter}`;
    if (!verseCount.has(k)) verseCount.set(k, new Set());
    verseCount.get(k)!.add(r.verse);
  }

  const books: BookMeta[] = BOOK_ORDER.map((b, idx) => {
    const chs = byBook.get(b.abbr) ?? new Set();
    let totalV = 0;
    for (const ch of chs) {
      const k = `${b.abbr}-${ch}`;
      totalV += verseCount.get(k)?.size ?? 0;
    }
    return {
      abbr: b.abbr,
      name: b.name,
      order: idx + 1,
      totalChapters: chs.size,
      totalVerses: totalV,
      sblgntFileCode: b.sblgntFileCode,
    };
  });

  console.log('[buildBooks] Resultado:');
  for (const b of books) {
    console.log(`  ${String(b.order).padStart(2)}. ${b.abbr.padEnd(5)} ${b.name.padEnd(22)} ${b.totalChapters} cap, ${b.totalVerses} vers`);
  }

  mkdirSync(join(import.meta.dirname, '..', 'assets'), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(books, null, 2), 'utf-8');
  console.log(`[buildBooks] Salvo em ${OUTPUT} (${books.length} livros)`);
}

main().catch(err => {
  console.error('[buildBooks] ERRO:', err);
  process.exit(1);
});
