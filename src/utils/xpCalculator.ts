// src/utils/xpCalculator.ts
import { XP_VALUES } from '@/constants/config';

export type StreakMultiplierLevel = 'none' | 'medium' | 'high';

/**
 * Retorna o multiplicador de XP baseado no streak atual do aluno.
 */
export function getStreakMultiplier(streakDays: number): number {
  if (streakDays >= 30) return 1.5;
  if (streakDays >= 7) return 1.2;
  return 1.0;
}

/**
 * Calcula o XP ganho por completar uma lição.
 */
export function calculateLessonXP(
  score: number,
  streakDays: number
): number {
  const multiplier = getStreakMultiplier(streakDays);
  const isPerfect = score === 100;

  const base = isPerfect ? XP_VALUES.LESSON_PERFECT : XP_VALUES.LESSON_COMPLETE;
  return Math.round(base * multiplier);
}

/**
 * Calcula o XP de um exercício individual.
 */
export function calculateExerciseXP(
  isCorrect: boolean,
  streakDays = 0
): number {
  if (!isCorrect) return 0;
  return Math.round(XP_VALUES.EXERCISE_CORRECT * getStreakMultiplier(streakDays));
}

/**
 * Calcula o XP ganho pelo Canvas na 1ª tentativa.
 */
export function calculateCanvasXP(isFirstAttempt: boolean): number {
  return isFirstAttempt ? XP_VALUES.CANVAS_FIRST_TRY : 0;
}

/**
 * Verifica se a meta diária foi atingida com base no XP acumulado no dia.
 */
export function isDailyGoalMet(
  dailyXP: number,
  goalMinutes: number
): boolean {
  // Estimativa: cada minuto de estudo ≈ 5 XP (baseado em ~15 XP/lição de 3min)
  const xpPerMinute = 5;
  return dailyXP >= goalMinutes * xpPerMinute;
}
