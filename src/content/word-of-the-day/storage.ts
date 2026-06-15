const STORAGE_KEY = 'koine.wordOfTheDay';

export interface WordOfTheDayState {
  lastSeenDayKey: string;
  savedIds: number[];
  history: Array<{
    wordId: number;
    date: string;
    visualized: boolean;
    saved: boolean;
  }>;
}

const EMPTY_STATE: WordOfTheDayState = {
  lastSeenDayKey: '',
  savedIds: [],
  history: [],
};

function readState(): WordOfTheDayState {
  if (typeof window === 'undefined') return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<WordOfTheDayState>;
    return {
      lastSeenDayKey: parsed.lastSeenDayKey ?? '',
      savedIds: Array.isArray(parsed.savedIds) ? parsed.savedIds : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function writeState(state: WordOfTheDayState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silently ignore quota errors — the app must keep working.
  }
}

export function dayKey(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getWordOfTheDayState(): WordOfTheDayState {
  return readState();
}

export function isWordVisualizedToday(wordId: number, today: Date = new Date()): boolean {
  const state = readState();
  if (state.lastSeenDayKey !== dayKey(today)) return false;
  const todayEntry = state.history.find(
    (h) => h.date === dayKey(today) && h.wordId === wordId,
  );
  return todayEntry?.visualized ?? false;
}

export function markWordVisualized(wordId: number, today: Date = new Date()): void {
  const state = readState();
  const todayStr = dayKey(today);
  const existingIndex = state.history.findIndex(
    (h) => h.date === todayStr && h.wordId === wordId,
  );

  if (existingIndex >= 0) {
    state.history[existingIndex] = { ...state.history[existingIndex], visualized: true };
  } else {
    state.history.unshift({ wordId, date: todayStr, visualized: true, saved: false });
  }

  state.lastSeenDayKey = todayStr;
  writeState(state);
}

export function isWordSaved(wordId: number): boolean {
  return readState().savedIds.includes(wordId);
}

export function toggleWordSaved(wordId: number): boolean {
  const state = readState();
  const isSaved = state.savedIds.includes(wordId);
  state.savedIds = isSaved
    ? state.savedIds.filter((id) => id !== wordId)
    : [...state.savedIds, wordId];

  const todayStr = dayKey();
  const entry = state.history.find((h) => h.date === todayStr && h.wordId === wordId);
  if (entry) entry.saved = !isSaved;

  writeState(state);
  return !isSaved;
}
