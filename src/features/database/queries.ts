// src/services/database/queries.ts
import { databaseService } from './sqlite';
import { format } from 'date-fns';
import type { GreekLetter, SRSCard, StrongEntry } from '@/core/types/greek.types';
import type { TypingHistoryRow } from '@/features/typing/typingTypes';
import type { LearningUnit } from '@/core/types/lesson.types';

export const dbQueries = {
  // ─── LETRAS ─────────────────────────────────────────────────

  getAllLetters: async (): Promise<GreekLetter[]> => {
    const db = databaseService.getDB();
    const result = await db.query('SELECT * FROM letters ORDER BY letter_order');
    return (result.values ?? []).map((row: any) => ({
      id: row.id,
      upperCase: row.upper_case,
      lowerCase: row.lower_case,
      name: row.name,
      sound: row.sound,
      audioUrl: row.audio_url ?? '',
      svgPath: row.svg_path ?? '',
      order: row.letter_order,
      frequency: row.frequency,
    }));
  },

  getLettersByModule: async (moduleId: string): Promise<GreekLetter[]> => {
    const db = databaseService.getDB();
    const parts = moduleId.split('-');
    const cycle = parseInt(parts[0].replace('C', ''));
    const module = parseInt(parts[1].replace('M', ''));
    const result = await db.query(
      'SELECT * FROM letters WHERE cycle = ? AND module = ? ORDER BY letter_order',
      [cycle, module],
    );
    return (result.values ?? []).map((row: any) => ({
      id: row.id,
      upperCase: row.upper_case,
      lowerCase: row.lower_case,
      name: row.name,
      sound: row.sound,
      audioUrl: row.audio_url ?? '',
      svgPath: row.svg_path ?? '',
      order: row.letter_order,
      frequency: row.frequency,
    }));
  },

  // ─── VOCABULÁRIO ─────────────────────────────────────────────

  getVocabularyByModule: async (moduleId: string) => {
    await databaseService.waitForReady();
    const db = databaseService.getDB();
    const parts = moduleId.split('-');
    const cycle = parseInt(parts[0].replace('C', ''));
    const module = parseInt(parts[1].replace('M', ''));
    const result = await db.query(
      'SELECT * FROM vocabulary WHERE cycle_intro = ? AND module_intro = ? ORDER BY frequency DESC',
      [cycle, module],
    );
    return result.values ?? [];
  },

  searchVocabulary: async (query: string) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT * FROM vocabulary WHERE token LIKE ? OR lemma LIKE ? OR gloss_pt LIKE ? LIMIT 50',
      [`%${query}%`, `%${query}%`, `%${query}%`],
    );
    return result.values ?? [];
  },

  // ─── TEXTO DO NT ─────────────────────────────────────────────

  getVerse: async (book: string, chapter: number, verse: number) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT * FROM nt_text WHERE book_abbr = ? AND chapter = ? AND verse = ? ORDER BY position',
      [book, chapter, verse],
    );
    return result.values ?? [];
  },

  getChapter: async (book: string, chapter: number) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT DISTINCT verse FROM nt_text WHERE book_abbr = ? AND chapter = ? ORDER BY verse',
      [book, chapter],
    );
    return result.values ?? [];
  },

  getChapterTokens: async (book: string, chapter: number) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT * FROM nt_text WHERE book_abbr = ? AND chapter = ? ORDER BY verse, position',
      [book, chapter],
    );
    return result.values ?? [];
  },

  getInterlinearChapter: async (book: string, chapter: number) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT * FROM nt_interlinear WHERE book_abbr = ? AND chapter = ? ORDER BY verse, position',
      [book, chapter],
    );
    return result.values ?? [];
  },

  // ─── TRADUÇÃO PT (BLivre) ──────────────────────────────────────

  getPTVerse: async (book: string, chapter: number, verse: number) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT * FROM nt_pt WHERE book_abbr = ? AND chapter = ? AND verse = ?',
      [book, chapter, verse],
    );
    return result.values?.[0] ?? null;
  },

  getPTChapter: async (book: string, chapter: number) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT * FROM nt_pt WHERE book_abbr = ? AND chapter = ? ORDER BY verse',
      [book, chapter],
    );
    return result.values ?? [];
  },

  // ─── INTERLINEAR (TOKEN + GLOSS PT) ────────────────────────────

  getInterlinearVerse: async (book: string, chapter: number, verse: number) => {
    const db = databaseService.getDB();
    const result = await db.query(
      `SELECT * FROM nt_interlinear
       WHERE book_abbr = ? AND chapter = ? AND verse = ?
       ORDER BY position`,
      [book, chapter, verse],
    );
    return result.values ?? [];
  },

  // ─── METADADOS DOS LIVROS ──────────────────────────────────────

  getAllBooksOrdered: async (): Promise<Array<{ book_abbr: string; first_chapter: number }>> => {
    const db = databaseService.getDB();
    const result = await db.query(
      `SELECT book_abbr, MIN(chapter) as first_chapter
       FROM nt_text
       GROUP BY book_abbr
       ORDER BY MIN(id)`,
    );
    return result.values ?? [];
  },

  // ─── EXERCÍCIOS ────────────────────────────────────────────────

  getModuleById: async (moduleId: string) => {
    const db = databaseService.getDB();
    const result = await db.query('SELECT * FROM modules WHERE id = ?', [moduleId]);
    return result.values?.[0] ?? null;
  },

  getAllCycles: async () => {
    const db = databaseService.getDB();
    const result = await db.query('SELECT * FROM cycles ORDER BY id');
    return result.values ?? [];
  },

  getModulesByCycle: async (cycleId: number) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT * FROM modules WHERE cycle_id = ? ORDER BY module_order',
      [cycleId],
    );
    return result.values ?? [];
  },

  // ─── STRONG ──────────────────────────────────────────────────

  getStrongById: async (id: string): Promise<StrongEntry | null> => {
    const db = databaseService.getDB();
    const result = await db.query('SELECT * FROM strong WHERE id = ?', [id]);
    const row = result.values?.[0];
    return row ? mapStrongRow(row) : null;
  },

  searchStrong: async (query: string): Promise<StrongEntry[]> => {
    await databaseService.waitForReady();
    const db = databaseService.getDB();
    const q = query;
    const result = await db.query(
      `SELECT * FROM strong
       WHERE greek LIKE ? OR translit LIKE ? OR id LIKE ?
       ORDER BY number LIMIT 50`,
      [`${q}%`, `${q}%`, `%${q}%`],
    );
    return (result.values ?? []).map((row: any) => mapStrongRow(row)!);
  },

  searchStrongByPortuguese: async (query: string): Promise<StrongEntry[]> => {
    await databaseService.waitForReady();
    const db = databaseService.getDB();
    const likeQuery = `%${query}%`;
    const result = await db.query(
      `SELECT * FROM strong
       WHERE name LIKE ? OR definitions LIKE ?
       ORDER BY number LIMIT 50`,
      [likeQuery, likeQuery],
    );
    return (result.values ?? []).map((row: any) => mapStrongRow(row)!);
  },

  // ─── SRS ─────────────────────────────────────────────────────

  getPendingSRSCards: async (): Promise<SRSCard[]> => {
    const db = databaseService.getDB();
    const today = format(new Date(), 'yyyy-MM-dd');
    const result = await db.query(
      'SELECT * FROM srs_cards WHERE next_review <= ? ORDER BY next_review ASC LIMIT 20',
      [today],
    );
    return (result.values ?? []).map((row: any) => ({
      wordId: row.word_id,
      token: row.token,
      glossPT: row.gloss_pt,
      interval: row.interval_days,
      easeFactor: row.ease_factor,
      repetitions: row.repetitions,
      nextReview: row.next_review,
      status: row.status,
    }));
  },

  upsertSRSCard: async (card: SRSCard) => {
    const db = databaseService.getDB();
    await db.run(
      `INSERT OR REPLACE INTO srs_cards
       (word_id, token, gloss_pt, interval_days, ease_factor, repetitions, next_review, status, last_reviewed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        card.wordId,
        card.token,
        card.glossPT,
        card.interval,
        card.easeFactor,
        card.repetitions,
        card.nextReview,
        card.status,
        format(new Date(), 'yyyy-MM-dd'),
      ],
    );
  },

  getSRSCardCount: async (): Promise<number> => {
    const db = databaseService.getDB();
    const today = format(new Date(), 'yyyy-MM-dd');
    const result = await db.query(
      'SELECT COUNT(*) as count FROM srs_cards WHERE next_review <= ?',
      [today],
    );
    return result.values?.[0]?.count ?? 0;
  },

  getTotalSRSCardCount: async (): Promise<number> => {
    const db = databaseService.getDB();
    const result = await db.query('SELECT COUNT(*) as count FROM srs_cards');
    return result.values?.[0]?.count ?? 0;
  },

  // ─── CONFIGURAÇÕES ───────────────────────────────────────────

  getSetting: async (key: string): Promise<string | null> => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT value FROM user_settings WHERE key = ?',
      [key],
    );
    return result.values?.[0]?.value ?? null;
  },

  setSetting: async (key: string, value: string) => {
    const db = databaseService.getDB();
    await db.run(
      'INSERT OR REPLACE INTO user_settings (key, value) VALUES (?, ?)',
      [key, value],
    );
  },

  getLearningUnitsByModule: async (moduleId: string): Promise<LearningUnit[]> => {
    await databaseService.waitForReady();
    const db = databaseService.getDB();
    let result: any;
    try {
      result = await db.query(
        'SELECT * FROM learning_units WHERE module_id = ? ORDER BY unit_order',
        [moduleId],
      );
    } catch (queryErr) {
      console.error(`[Query] SQLite query failed for ${moduleId}:`, queryErr);
      throw queryErr;
    }
    const rows = result.values ?? [];
    return rows.map((row: any) => {
      let p2: any, p3: any, p4: any, p5: any | undefined;
      try { p2 = JSON.parse(row.phase2_data); } catch { p2 = []; }
      try { p3 = JSON.parse(row.phase3_data); } catch { p3 = []; }
      try { p4 = JSON.parse(row.phase4_data); } catch { p4 = []; }
      try { p5 = row.phase5_data ? JSON.parse(row.phase5_data) : undefined; } catch { p5 = undefined; }
      return {
        id: row.id,
        moduleId: row.module_id,
        order: row.unit_order,
        type: row.unit_type,
        greekForm: row.greek_form,
        transliteration: row.transliteration ?? '',
        glossPT: row.gloss_pt,
        phoneticSound: row.phonetic_sound ?? '',
        explanation: row.explanation,
        mnemonicHint: row.mnemonic_hint ?? '',
        audioUrl: row.audio_url ?? '',
        imageUrl: row.image_url ?? '',
        contextVerse: row.context_verse ?? '',
        contextReference: row.context_reference ?? '',
        phase2_recognition: p2,
        phase3_association: p3,
        phase4_recall: p4,
        phase5_application: p5,
        srsKey: row.srs_key,
      };
    });
  },

  upsertUnitProgress: async (progress: {
    unitId: string; userId: string; phaseReached: number;
    overallScore: number; masteryLevel: string; srsEnrolled: boolean;
  }) => {
    await databaseService.waitForReady();
    const db = databaseService.getDB();
    await db.run(
      `INSERT OR REPLACE INTO unit_progress
       (id, unit_id, user_id, phase_reached, overall_score, mastery_level, srs_enrolled, completed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `${progress.userId}_${progress.unitId}`,
        progress.unitId,
        progress.userId,
        progress.phaseReached,
        progress.overallScore,
        progress.masteryLevel,
        progress.srsEnrolled ? 1 : 0,
        new Date().toISOString(),
      ],
    );
  },

  // ─── TYPING HISTORY ─────────────────────────────────────────

  insertTypingHistory: async (row: TypingHistoryRow) => {
    const db = databaseService.getDB();
    await db.run(
      `INSERT INTO typing_history (id, user_id, word_greek, word_pt, strongs_id, mode, input, is_correct, score, session_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [row.id, row.user_id, row.word_greek, row.word_pt, row.strongs_id, row.mode, row.input, row.is_correct, row.score, row.session_id, row.created_at],
    );
  },

  getTypingHistory: async (userId: string, days: number = 30): Promise<TypingHistoryRow[]> => {
    const db = databaseService.getDB();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const result = await db.query(
      `SELECT * FROM typing_history WHERE user_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 500`,
      [userId, cutoff.toISOString()],
    );
    return (result.values ?? []).map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      word_greek: row.word_greek,
      word_pt: row.word_pt,
      strongs_id: row.strongs_id,
      mode: row.mode,
      input: row.input,
      is_correct: row.is_correct,
      score: row.score,
      session_id: row.session_id,
      created_at: row.created_at,
    }));
  },

  getTypingErrorWords: async (userId: string, days: number = 30): Promise<string[]> => {
    const db = databaseService.getDB();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const result = await db.query(
      `SELECT word_greek, word_pt, strongs_id, COUNT(*) as errors
       FROM typing_history
       WHERE user_id = ? AND is_correct = 0 AND created_at >= ?
       GROUP BY word_greek
       ORDER BY errors DESC
       LIMIT 50`,
      [userId, cutoff.toISOString()],
    );
    return (result.values ?? []).map((row: any) => row.word_greek);
  },

  getLearningUnitCount: async (moduleId: string): Promise<number> => {
    await databaseService.waitForReady();
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT COUNT(*) as count FROM learning_units WHERE module_id = ?',
      [moduleId],
    );
    return result.values?.[0]?.count ?? 0;
  },
};

const mapStrongRow = (row: any): StrongEntry | null => {
  if (!row) return null;
  let defs: string[] = [];
  try {
    defs = typeof row.definitions === 'string'
      ? JSON.parse(row.definitions)
      : row.definitions ?? [];
  } catch {
    defs = [];
  }
  return {
    id: row.id,
    number: row.number,
    greek: row.greek,
    translit: row.translit ?? '',
    pronunciation: row.pronunciation ?? '',
    pos: row.pos ?? '',
    origin: row.origin ?? '',
    definitions: defs,
    name: row.name ?? '',
  };
};
