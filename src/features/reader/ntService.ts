import { dbQueries } from '@/features/database/queries';

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

interface NTPtVerse {
  bookAbbr: string;
  bookName: string;
  ch: number;
  v: number;
  text: string;
  source: string;
  version: string;
}

interface NTInterlinearRow {
  bookAbbr: string;
  ch: number;
  v: number;
  position: number;
  tokenGreek: string;
  lemma: string | null;
  strongsId: string | null;
  parsing: string | null;
  glossPT: string;
  glossSource: string;
}

interface InterlinearToken extends NtToken {
  glossPT?: string;
  glossSource?: string;
}

interface BookMeta {
  book_abbr: string;
  first_chapter: number;
}

export interface ChapterVerse {
  verse: number;
  tokens: InterlinearToken[];
  fluentPT: NTPtVerse | null;
}

let cachedTokens: NtToken[] | null = null;
let cacheByRef: Map<string, NtToken[]> | null = null;
let cachedPT: NTPtVerse[] | null = null;
let ptByRef: Map<string, NTPtVerse> | null = null;
let ptByChapter: Map<string, NTPtVerse[]> | null = null;
let cachedInterlinear: NTInterlinearRow[] | null = null;
let interlinearByRef: Map<string, NTInterlinearRow[]> | null = null;
let interlinearByChapter: Map<string, NTInterlinearRow[]> | null = null;
let greekByChapter: Map<string, NtToken[]> | null = null;
let cachedBooks: BookMeta[] | null = null;

async function loadNT(): Promise<void> {
  if (cachedTokens) return;
  const res = await fetch('/assets/nt_text.json');
  const tokens: NtToken[] = await res.json();
  cachedTokens = tokens;
  const refMap = new Map<string, NtToken[]>();
  greekByChapter = new Map<string, NtToken[]>();
  for (const t of tokens) {
    const refKey = `${t.book_abbr}-${t.chapter}-${t.verse}`;
    if (!refMap.has(refKey)) refMap.set(refKey, []);
    refMap.get(refKey)!.push(t);
    const chKey = `${t.book_abbr}-${t.chapter}`;
    if (!greekByChapter.has(chKey)) greekByChapter.set(chKey, []);
    greekByChapter.get(chKey)!.push(t);
  }
  cacheByRef = refMap;
}

async function loadPT(): Promise<void> {
  if (cachedPT) return;
  try {
    const res = await fetch('/assets/nt_pt.json');
    cachedPT = await res.json();
    ptByRef = new Map<string, NTPtVerse>();
    ptByChapter = new Map<string, NTPtVerse[]>();
    for (const v of cachedPT!) {
      ptByRef.set(`${v.bookAbbr}-${v.ch}-${v.v}`, v);
      const chKey = `${v.bookAbbr}-${v.ch}`;
      if (!ptByChapter.has(chKey)) ptByChapter.set(chKey, []);
      ptByChapter.get(chKey)!.push(v);
    }
  } catch (e) {
    console.warn('[ntService] nt_pt.json indisponível:', e);
    cachedPT = [];
    ptByRef = new Map();
    ptByChapter = new Map();
  }
}

async function loadInterlinear(): Promise<void> {
  if (cachedInterlinear !== null) return;
  try {
    const res = await fetch('/assets/nt_interlinear.json');
    const data: NTInterlinearRow[] = await res.json();
    cachedInterlinear = data;
    interlinearByRef = new Map<string, NTInterlinearRow[]>();
    interlinearByChapter = new Map<string, NTInterlinearRow[]>();
    for (const row of data) {
      const refKey = `${row.bookAbbr}-${row.ch}-${row.v}`;
      if (!interlinearByRef.has(refKey)) interlinearByRef.set(refKey, []);
      interlinearByRef.get(refKey)!.push(row);
      const chKey = `${row.bookAbbr}-${row.ch}`;
      if (!interlinearByChapter.has(chKey)) interlinearByChapter.set(chKey, []);
      interlinearByChapter.get(chKey)!.push(row);
    }
  } catch (e) {
    console.warn('[ntService] nt_interlinear.json indisponível:', e);
    cachedInterlinear = [];
    interlinearByRef = new Map();
    interlinearByChapter = new Map();
  }
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

  // ─── TRADUÇÃO FLUENTE PT (BLivre) ─────────────────────────────

  async getVerseFluentPT(book: string, chapter: number, verse: number): Promise<NTPtVerse | null> {
    const fromDB = await dbQueries.getPTVerse(book, chapter, verse);
    if (fromDB) {
      return {
        bookAbbr: fromDB.book_abbr,
        bookName: fromDB.book_abbr,
        ch: fromDB.chapter,
        v: fromDB.verse,
        text: fromDB.text,
        source: fromDB.source ?? 'blivre',
        version: fromDB.version ?? '2018-02',
      };
    }
    await loadPT();
    return ptByRef?.get(`${book}-${chapter}-${verse}`) ?? null;
  },

  // ─── TOKENS INTERLINEARES (GREGO + GLOSS PT) ───────────────────

  async getInterlinearTokens(book: string, chapter: number, verse: number): Promise<InterlinearToken[]> {
    const fromDB = await dbQueries.getInterlinearVerse(book, chapter, verse);
    if (fromDB.length > 0) {
      return fromDB.map((row: any) => ({
        id: `interlinear-${row.book_abbr}-${row.chapter}-${row.verse}-${row.position}`,
        book_abbr: row.book_abbr,
        book_name: row.book_abbr,
        chapter: row.chapter,
        verse: row.verse,
        position: row.position,
        token: row.token_greek,
        lemma: row.lemma ?? '',
        strongs_id: row.strongs_id ?? null,
        parsing: row.parsing ?? '',
        glossPT: row.gloss_pt ?? '',
        glossSource: row.gloss_source ?? 'manual',
      }));
    }

    await loadInterlinear();
    await loadNT();
    const interlinearRows = interlinearByRef?.get(`${book}-${chapter}-${verse}`) ?? [];
    if (interlinearRows.length === 0) {
      // Sem interlinear: retorna tokens gregos sem gloss
      return this.getVerse(book, chapter, verse);
    }
    const glossMap = new Map<number, NTInterlinearRow>();
    for (const r of interlinearRows) glossMap.set(r.position, r);

    const greekTokens = await this.getVerse(book, chapter, verse);
    return greekTokens.map((t) => {
      const gloss = glossMap.get(t.position);
      return {
        ...t,
        glossPT: gloss?.glossPT,
        glossSource: gloss?.glossSource,
      };
    });
  },

  // ─── VERSÍCULO COMPLETO (GREGO + INTERLINEAR + PT) ────────────

  async getVerseWithPT(
    book: string,
    chapter: number,
    verse: number,
  ): Promise<{
    tokens: InterlinearToken[];
    fluentPT: NTPtVerse | null;
  }> {
    const [tokens, fluentPT] = await Promise.all([
      this.getInterlinearTokens(book, chapter, verse),
      this.getVerseFluentPT(book, chapter, verse),
    ]);
    return { tokens, fluentPT };
  },

  // ─── CAPÍTULO COMPLETO (LISTA DE VERSÍCULOS INTERLINEARES) ─────

  async getChapterWithPT(
    book: string,
    chapter: number,
  ): Promise<ChapterVerse[]> {
    const chKey = `${book}-${chapter}`;

    // 1) Tenta SQLite primeiro (rápido e funciona offline no Android)
    let interRows: NTInterlinearRow[] = [];
    let greekTokens: NtToken[] = [];
    let ptVerses: NTPtVerse[] = [];

    try {
      const [dbInter, dbGreek, dbPt] = await Promise.all([
        dbQueries.getInterlinearChapter(book, chapter).catch(() => []),
        dbQueries.getChapterTokens(book, chapter).catch(() => []),
        dbQueries.getPTChapter(book, chapter).catch(() => []),
      ]);
      if (dbGreek.length > 0) {
        greekTokens = dbGreek.map((row: any) => ({
          id: row.id,
          book_abbr: row.book_abbr,
          book_name: row.book_name,
          chapter: row.chapter,
          verse: row.verse,
          position: row.position,
          token: row.token,
          lemma: row.lemma,
          strongs_id: row.strongs_id ?? null,
          parsing: row.parsing ?? '',
          gloss_pt: row.gloss_pt ?? '',
        }));
      }
      if (dbInter.length > 0) {
        interRows = dbInter.map((row: any) => ({
          bookAbbr: row.book_abbr,
          ch: row.chapter,
          v: row.verse,
          position: row.position,
          tokenGreek: row.token_greek,
          lemma: row.lemma,
          strongsId: row.strongs_id,
          parsing: row.parsing,
          glossPT: row.gloss_pt,
          glossSource: row.gloss_source,
        }));
      }
      if (dbPt.length > 0) {
        ptVerses = dbPt.map((row: any) => ({
          bookAbbr: row.book_abbr,
          bookName: row.book_abbr,
          ch: row.chapter,
          v: row.verse,
          text: row.text,
          source: row.source ?? 'blivre',
          version: row.version ?? '2018-02',
        }));
      }
    } catch (e) {
      console.warn('[ntService] SQLite chapter lookup falhou, usando JSON:', e);
    }

    // 2) Fallback para JSON estático (web/dev, ou SQLite vazio)
    if (greekTokens.length === 0 && interRows.length === 0 && ptVerses.length === 0) {
      await Promise.all([loadNT(), loadInterlinear(), loadPT()]);
      interRows = interlinearByChapter?.get(chKey) ?? [];
      greekTokens = greekByChapter?.get(chKey) ?? [];
      ptVerses = ptByChapter?.get(chKey) ?? [];
    }

    // 3) Determina lista de versículos
    const verseSet = new Set<number>();
    for (const r of interRows) verseSet.add(r.v);
    for (const t of greekTokens) verseSet.add(t.verse);
    for (const p of ptVerses) verseSet.add(p.v);
    const verses = Array.from(verseSet).sort((a, b) => a - b);

    if (verses.length === 0) return [];

    // 2) Agrupa por versículo
    const glossByVerse = new Map<number, Map<number, NTInterlinearRow>>();
    for (const r of interRows) {
      if (!glossByVerse.has(r.v)) glossByVerse.set(r.v, new Map());
      glossByVerse.get(r.v)!.set(r.position, r);
    }

    const greekByVerse = new Map<number, NtToken[]>();
    for (const t of greekTokens) {
      if (!greekByVerse.has(t.verse)) greekByVerse.set(t.verse, []);
      greekByVerse.get(t.verse)!.push(t);
    }

    const ptByVerse = new Map<number, NTPtVerse>();
    for (const p of ptVerses) ptByVerse.set(p.v, p);

    // 3) Monta resultado
    return verses.map((verse) => {
      const glosses = glossByVerse.get(verse);
      const greek = greekByVerse.get(verse) ?? [];

      let tokens: InterlinearToken[];
      if (glosses && glosses.size > 0) {
        // Combina grego + gloss
        tokens = greek
          .map((t) => {
            const gloss = glosses.get(t.position);
            return {
              ...t,
              glossPT: gloss?.glossPT,
              glossSource: gloss?.glossSource,
            };
          })
          .sort((a, b) => a.position - b.position);
        if (tokens.length === 0) {
          // Só interlinear, sem grego — usa glosses como tokens
          tokens = Array.from(glosses.values())
            .sort((a, b) => a.position - b.position)
            .map((r) => ({
              id: `i-${book}-${chapter}-${verse}-${r.position}`,
              book_abbr: r.bookAbbr,
              book_name: r.bookAbbr,
              chapter: r.ch,
              verse: r.v,
              position: r.position,
              token: r.tokenGreek,
              lemma: r.lemma ?? '',
              strongs_id: r.strongsId ?? null,
              parsing: r.parsing ?? '',
              glossPT: r.glossPT,
              glossSource: r.glossSource,
            }));
        }
      } else {
        // Só grego, sem gloss
        tokens = greek
          .sort((a, b) => a.position - b.position)
          .map((t) => ({ ...t, glossPT: undefined, glossSource: undefined }));
      }

      return {
        verse,
        tokens,
        fluentPT: ptByVerse.get(verse) ?? null,
      };
    });
  },

  async getChapterMaxVerse(book: string, chapter: number): Promise<number> {
    await loadNT();
    if (!cachedTokens) return 0;
    let max = 0;
    for (const t of cachedTokens) {
      if (t.book_abbr === book && t.chapter === chapter && t.verse > max) {
        max = t.verse;
      }
    }
    return max;
  },

  // ─── METADADOS DOS 27 LIVROS ───────────────────────────────────

  async getAllBooks(): Promise<BookMeta[]> {
    if (cachedBooks) return cachedBooks;
    try {
      cachedBooks = await dbQueries.getAllBooksOrdered();
    } catch (e) {
      console.warn('[ntService] getAllBooksOrdered falhou, fallback vazio:', e);
      cachedBooks = [];
    }
    return cachedBooks;
  },
};
