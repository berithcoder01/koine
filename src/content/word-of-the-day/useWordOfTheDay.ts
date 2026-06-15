import { useCallback, useMemo, useState } from 'react';
import bank from './bank.json';
import type { WordOfTheDay } from './types';
import { selectWordOfTheDay } from './selectWord';
import {
  isWordSaved,
  isWordVisualizedToday,
  markWordVisualized,
  toggleWordSaved,
} from './storage';

const WORDS = bank as WordOfTheDay[];

export interface UseWordOfTheDayResult {
  word: WordOfTheDay | null;
  totalWords: number;
  isVisualized: boolean;
  isSaved: boolean;
  markVisualized: () => void;
  toggleSaved: () => boolean;
}

export function useWordOfTheDay(): UseWordOfTheDayResult {
  const [tick, setTick] = useState(0);

  const word = useMemo(() => selectWordOfTheDay(WORDS), []);

  const isVisualized = useMemo(
    () => (word ? isWordVisualizedToday(word.id) : false),
    [word, tick],
  );

  const isSaved = useMemo(
    () => (word ? isWordSaved(word.id) : false),
    [word, tick],
  );

  const markVisualized = useCallback(() => {
    if (!word) return;
    markWordVisualized(word.id);
    setTick((n) => n + 1);
  }, [word]);

  const toggleSaved = useCallback(() => {
    if (!word) return false;
    const result = toggleWordSaved(word.id);
    setTick((n) => n + 1);
    return result;
  }, [word]);

  return {
    word,
    totalWords: WORDS.length,
    isVisualized,
    isSaved,
    markVisualized,
    toggleSaved,
  };
}
