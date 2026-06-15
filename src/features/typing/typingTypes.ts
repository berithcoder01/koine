export interface TypingResult {
  isCorrect: boolean;
  score: number;
  errorPositions: number[];
}

export interface TypingSession {
  words: TypingWord[];
  currentIndex: number;
  mode: 'copy' | 'translate';
  results: TypingWordResult[];
  startedAt: string;
}

export interface TypingWord {
  greek: string;
  glossPT: string;
  strongsId?: string;
  reference?: string;
  hint?: string;
}

export interface TypingWordResult {
  word: TypingWord;
  input: string;
  isCorrect: boolean;
  score: number;
  attemptCount: number;
}

export interface TypingHistoryRow {
  id: string;
  user_id: string;
  word_greek: string;
  word_pt: string | null;
  strongs_id: string | null;
  mode: 'copy' | 'translate';
  input: string;
  is_correct: number;
  score: number;
  session_id: string | null;
  created_at: string;
}

export interface TypingPackage {
  id: string;
  title: string;
  description: string;
  words: TypingWord[];
  unlocked: boolean;
}
