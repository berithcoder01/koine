import { dbQueries } from '@/features/database/queries';
import { databaseService } from '@/features/database/sqlite';

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

interface InterlinearToken extends NtToken {
  glossPT?: string;
  glossSource?: string;
  translitPT?: string;
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

let strongById: Map<string, string> | null = null;
let glossaryByLemma: Map<string, string> | null = null;

async function ensureDataLoaded(): Promise<void> {
  if (strongById && glossaryByLemma) return;

  try {
    await databaseService.waitForReady();
  } catch {
    console.warn('[ntService] databaseService.waitForReady failed, using fallback maps');
    return;
  }

  try {
    const coreDb = databaseService.getCoreDB();
    const strongResult = await coreDb.query("SELECT id, translit FROM strong WHERE translit IS NOT NULL AND translit != ''");
    strongById = new Map();
    for (const row of strongResult.values ?? []) {
      if (row.id && row.translit) strongById.set(row.id, row.translit);
    }

    const glossResult = await coreDb.query(
      `SELECT DISTINCT lemma, gloss_pt FROM nt_interlinear
       WHERE gloss_pt IS NOT NULL AND gloss_pt != '' AND lemma IS NOT NULL AND lemma != ''
       AND gloss_source = 'manual'`
    );
    glossaryByLemma = new Map();
    for (const row of glossResult.values ?? []) {
      if (row.lemma && row.gloss_pt) glossaryByLemma.set(row.lemma, row.gloss_pt);
    }

    console.log('[ntService] Fallback maps loaded:', {
      strong: strongById.size,
      glossary: glossaryByLemma.size,
    });
  } catch (e) {
    console.warn('[ntService] Failed to load fallback maps from coreDb:', e);
    strongById = strongById ?? new Map();
    glossaryByLemma = glossaryByLemma ?? new Map();
  }
}

function getGlossaryGloss(lemma: string): string | undefined {
  return glossaryByLemma?.get(lemma);
}

export const ntService = {
  async getVerse(book: string, chapter: number, verse: number) {
    await databaseService.waitForReady();
    const fromDB = await dbQueries.getVerse(book, chapter, verse);
    if (fromDB.length > 0) return fromDB;
    return [];
  },

  async getChapter(book: string, chapter: number) {
    await databaseService.waitForReady();
    const tokens = await dbQueries.getChapterTokens(book, chapter);
    const verses = new Set<number>();
    for (const t of tokens) verses.add(t.verse);
    return Array.from(verses).sort((a, b) => a - b);
  },

  async getPassage(book: string, chapter: number, startVerse: number, endVerse: number) {
    await databaseService.waitForReady();
    const tokens = await dbQueries.getChapterTokens(book, chapter);
    return tokens.filter(t => t.verse >= startVerse && t.verse <= endVerse);
  },

  async getVerseFluentPT(book: string, chapter: number, verse: number): Promise<NTPtVerse | null> {
    await databaseService.waitForReady();
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
    return null;
  },

  async getInterlinearTokens(book: string, chapter: number, verse: number): Promise<InterlinearToken[]> {
    await databaseService.waitForReady();

    const fromDB = await dbQueries.getInterlinearVerse(book, chapter, verse);
    if (fromDB.length > 0) {
      return fromDB.map((row: any) => {
        const lemma = row.lemma ?? '';
        const gloss = row.gloss_pt || getGlossaryGloss(lemma);
        return {
          id: `interlinear-${row.book_abbr}-${row.chapter}-${row.verse}-${row.position}`,
          book_abbr: row.book_abbr,
          book_name: row.book_abbr,
          chapter: row.chapter,
          verse: row.verse,
          position: row.position,
          token: row.token_greek,
          lemma,
          strongs_id: row.strongs_id ?? null,
          parsing: row.parsing ?? '',
          glossPT: gloss || undefined,
          glossSource: gloss ? (row.gloss_pt ? (row.gloss_source ?? 'manual') : 'glossary') : undefined,
          translitPT: row.strongs_id ? strongById?.get(row.strongs_id) : undefined,
        };
      });
    }

    return this.getVerse(book, chapter, verse);
  },

  async getVerseWithPT(book: string, chapter: number, verse: number) {
    await databaseService.waitForReady();
    const [tokens, fluentPT] = await Promise.all([
      this.getInterlinearTokens(book, chapter, verse),
      this.getVerseFluentPT(book, chapter, verse),
    ]);
    return { tokens, fluentPT };
  },

  async getChapterWithPT(book: string, chapter: number): Promise<ChapterVerse[]> {
    await databaseService.waitForReady();
    await ensureDataLoaded(); // loads strongById + glossaryByLemma Maps from coreDb

    const [interRows, greekTokens, ptVerses] = await Promise.all([
      dbQueries.getInterlinearChapter(book, chapter),
      dbQueries.getChapterTokens(book, chapter),
      dbQueries.getPTChapter(book, chapter),
    ]);

    const verseSet = new Set<number>();
    for (const r of interRows) verseSet.add(r.verse);
    for (const t of greekTokens) verseSet.add(t.verse);
    for (const p of ptVerses) verseSet.add(p.verse);
    const verses = Array.from(verseSet).sort((a, b) => a - b);

    if (verses.length === 0) {
      console.warn('[ntService] getChapterWithPT: nenhum versículo para', book, chapter);
      return [];
    }

    const glossByVerse = new Map<number, Map<number, any>>();
    for (const r of interRows) {
      if (!glossByVerse.has(r.verse)) glossByVerse.set(r.verse, new Map());
      glossByVerse.get(r.verse)!.set(r.position, r);
    }

    const greekByVerse = new Map<number, any[]>();
    for (const t of greekTokens) {
      if (!greekByVerse.has(t.verse)) greekByVerse.set(t.verse, []);
      greekByVerse.get(t.verse)!.push(t);
    }

    const ptByVerse = new Map<number, any>();
    for (const p of ptVerses) ptByVerse.set(p.verse, p);

    return verses.map((verse) => {
      const glosses = glossByVerse.get(verse);
      const greek = greekByVerse.get(verse) ?? [];

      let tokens: InterlinearToken[];
      if (glosses && glosses.size > 0) {
        tokens = greek
          .map((t) => {
            const gloss = glosses.get(t.position);
            const glossPT = gloss?.gloss_pt || getGlossaryGloss(t.lemma);
            return {
              ...t,
              glossPT: glossPT || undefined,
              glossSource: glossPT ? (gloss?.gloss_pt ? (gloss.gloss_source ?? 'manual') : 'glossary') : undefined,
              translitPT: t.strongs_id ? strongById?.get(t.strongs_id) : undefined,
            };
          })
          .sort((a, b) => a.position - b.position);

        if (tokens.length === 0) {
          tokens = Array.from(glosses.values())
            .sort((a, b) => a.position - b.position)
            .map((r) => {
              const lemma = r.lemma ?? '';
              const glossPT = r.gloss_pt || (lemma ? getGlossaryGloss(lemma) : undefined);
              return {
                id: `i-${book}-${chapter}-${verse}-${r.position}`,
                book_abbr: r.book_abbr,
                book_name: r.book_abbr,
                chapter: r.chapter,
                verse: r.verse,
                position: r.position,
                token: r.token_greek,
                lemma,
                strongs_id: r.strongs_id ?? null,
                parsing: r.parsing ?? '',
                glossPT: glossPT || undefined,
                glossSource: glossPT ? (r.gloss_pt ? (r.gloss_source ?? 'manual') : 'glossary') : undefined,
                translitPT: r.strongs_id ? strongById?.get(r.strongs_id) : undefined,
              };
            });
        }
      } else {
        tokens = greek
          .sort((a, b) => a.position - b.position)
          .map((t) => {
            const glossPT = getGlossaryGloss(t.lemma);
            return {
              ...t,
              glossPT: glossPT || undefined,
              glossSource: glossPT ? 'glossary' : undefined,
              translitPT: t.strongs_id ? strongById?.get(t.strongs_id) : undefined,
            };
          });
      }

      const ptVerse = ptByVerse.get(verse);
      return {
        verse,
        tokens,
        fluentPT: ptVerse ? {
          bookAbbr: ptVerse.book_abbr,
          bookName: ptVerse.book_abbr,
          ch: ptVerse.chapter,
          v: ptVerse.verse,
          text: ptVerse.text,
          source: ptVerse.source ?? 'blivre',
          version: ptVerse.version ?? '2018-02',
        } : null,
      };
    });
  },

  async getChapterMaxVerse(book: string, chapter: number): Promise<number> {
    await databaseService.waitForReady();
    const tokens = await dbQueries.getChapterTokens(book, chapter);
    if (!tokens || tokens.length === 0) return 0;
    return Math.max(...tokens.map((t: any) => t.verse));
  },

  async getAllBooks(): Promise<BookMeta[]> {
    try {
      return await dbQueries.getAllBooksOrdered();
    } catch (e) {
      console.warn('[ntService] getAllBooksOrdered falhou:', e);
      return [];
    }
  },
};