// src/services/database/queries.ts
import { databaseService } from './sqlite';
import { format } from 'date-fns';
import type { GreekLetter, SRSCard } from '@/types/greek.types';

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

  // ─── EXERCÍCIOS ────────────────────────────────────────────────

  getExercisesByModule: async (moduleId: string) => {
    const db = databaseService.getDB();
    const result = await db.query(
      'SELECT * FROM exercises WHERE module_id = ? ORDER BY exercise_order',
      [moduleId],
    );
    return result.values ?? [];
  },

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
};
