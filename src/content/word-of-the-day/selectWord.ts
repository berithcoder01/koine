import type { WordOfTheDay } from './types';

const MS_PER_DAY = 86_400_000;
const EPOCH_UTC = Date.UTC(2025, 0, 1);

export function dayOfYearUtc(date: Date = new Date()): number {
  const startOfDayUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((startOfDayUtc - EPOCH_UTC) / MS_PER_DAY) + 1;
}

export function selectWordOfTheDay(
  words: WordOfTheDay[],
  date: Date = new Date(),
): WordOfTheDay | null {
  if (words.length === 0) return null;
  const index = (dayOfYearUtc(date) - 1) % words.length;
  return words[index];
}

export function nextWordPreview(
  words: WordOfTheDay[],
  date: Date = new Date(),
): WordOfTheDay | null {
  if (words.length === 0) return null;
  const tomorrow = new Date(date);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const index = (dayOfYearUtc(tomorrow) - 1) % words.length;
  return words[index];
}
