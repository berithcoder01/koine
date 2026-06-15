import { useState, useCallback, useMemo } from 'react';
import type { TypingWord, TypingWordResult, TypingPackage } from './typingTypes';
import { compareGreekWords } from './typingUtils';
import { dbQueries } from '@/features/database/queries';

const SESSION_SIZE = 10;

export function useTypingSession(mode: 'copy' | 'translate') {
  const [words, setWords] = useState<TypingWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<TypingWordResult[]>([]);
  const [attempts, setAttempts] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());

  const currentWord = useMemo(() => words[currentIndex] ?? null, [words, currentIndex]);
  const progress = words.length > 0 ? ((currentIndex) / words.length) * 100 : 0;

  const loadWords = useCallback((wordList: TypingWord[]) => {
    const shuffled = [...wordList].sort(() => Math.random() - 0.5).slice(0, SESSION_SIZE);
    setWords(shuffled);
    setCurrentIndex(0);
    setResults([]);
    setAttempts({});
    setIsComplete(false);
  }, []);

  const recordAnswer = useCallback(async (input: string): Promise<TypingWordResult> => {
    if (!currentWord) throw new Error('No current word');

    const currentAttempts = (attempts[currentIndex] ?? 0) + 1;
    setAttempts(prev => ({ ...prev, [currentIndex]: currentAttempts }));

    const comparison = compareGreekWords(input, currentWord.greek, false);
    const result: TypingWordResult = {
      word: currentWord,
      input,
      isCorrect: comparison.isCorrect,
      score: comparison.score,
      attemptCount: currentAttempts,
    };

    const newResults = [...results, result];
    setResults(newResults);

    try {
      const userId = 'local';
      await dbQueries.insertTypingHistory({
        id: crypto.randomUUID(),
        user_id: userId,
        word_greek: currentWord.greek,
        word_pt: currentWord.glossPT ?? null,
        strongs_id: currentWord.strongsId ?? null,
        mode,
        input,
        is_correct: comparison.isCorrect ? 1 : 0,
        score: comparison.score,
        session_id: sessionId,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[TypingSession] Failed to save history:', err);
    }

    return result;
  }, [currentWord, currentIndex, attempts, results, mode, sessionId]);

  const advanceWord = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= words.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, words.length]);

  const getStats = useCallback(() => {
    const total = results.length;
    const correct = results.filter(r => r.isCorrect).length;
    return { total, correct, score: total > 0 ? Math.round((correct / total) * 100) : 0 };
  }, [results]);

  const startNewSession = useCallback((wordList: TypingWord[]) => {
    loadWords(wordList);
  }, [loadWords]);

  return {
    currentWord,
    currentIndex,
    progress,
    isComplete,
    results,
    loadWords: startNewSession,
    recordAnswer,
    advanceWord,
    getStats,
    totalWords: words.length,
  };
}

export const TYPING_PACKAGES: TypingPackage[] = [
  {
    id: 'cycle1',
    title: 'Palavras do Ciclo I',
    description: 'Palavras-âncora dos módulos C1-M01 a C1-M10',
    words: [],
    unlocked: true,
  },
  {
    id: 'top100',
    title: '100 Palavras Mais Frequentes',
    description: 'As palavras mais frequentes do Novo Testamento',
    words: [],
    unlocked: false,
  },
  {
    id: 'saved',
    title: 'Minhas Palavras Salvas',
    description: 'Palavras que você salvou para revisar',
    words: [],
    unlocked: true,
  },
  {
    id: 'errors',
    title: 'Palavras com Erro',
    description: 'Palavras onde você errou recentemente',
    words: [],
    unlocked: true,
  },
];
