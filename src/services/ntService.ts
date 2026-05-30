import { dbQueries } from '@/services/database/queries';

interface NtToken {
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

let cachedTokens: NtToken[] | null = null;
let cacheByRef: Map<string, NtToken[]> | null = null;

async function loadNT(): Promise<void> {
  if (cachedTokens) return;
  const res = await fetch('/assets/nt_text.json');
  const tokens: NtToken[] = await res.json();
  cachedTokens = tokens;
  const refMap = new Map<string, NtToken[]>();
  for (const t of tokens) {
    const key = `${t.book_abbr}-${t.chapter}-${t.verse}`;
    if (!refMap.has(key)) refMap.set(key, []);
    refMap.get(key)!.push(t);
  }
  cacheByRef = refMap;
}

export const ntService = {
  async getVerse(book: string, chapter: number, verse: number) {
    const fromDB = await dbQueries.getVerse(book, chapter, verse);
    if (fromDB.length > 0) return fromDB;

    await loadNT();
    const refKey = `${book}-${chapter}-${verse}`;
    return cacheByRef?.get(refKey) ?? [];
  },

  async getChapter(book: string, chapter: number) {
    await loadNT();
    if (!cachedTokens) return [];
    const verses = new Set<number>();
    for (const t of cachedTokens) {
      if (t.book_abbr === book && t.chapter === chapter) {
        verses.add(t.verse);
      }
    }
    return Array.from(verses).sort((a, b) => a - b);
  },

  async getPassage(book: string, chapter: number, startVerse: number, endVerse: number) {
    await loadNT();
    if (!cachedTokens) return [];
    const results: NtToken[] = [];
    for (const t of cachedTokens) {
      if (t.book_abbr === book && t.chapter === chapter && t.verse >= startVerse && t.verse <= endVerse) {
        results.push(t);
      }
    }
    return results;
  },
};
