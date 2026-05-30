// src/utils/srsAlgorithm.ts
// Algoritmo SM-2 (SuperMemo 2) — base do Anki
// Para cada cartão mantém: interval, easeFactor (EF) e repetitions

import { APP_CONFIG } from '@/constants/config';

export type SRSQuality = 0 | 3 | 4 | 5;

export interface SRSCardState {
  interval: number;     // dias até próxima revisão
  easeFactor: number;   // EF, inicial 2.5, mínimo 1.3
  repetitions: number;
  nextReview: string;   // ISO date string
}

/**
 * Calcula o novo estado do cartão após uma resposta do aluno.
 * @param current - Estado atual do cartão
 * @param quality - Qualidade da resposta: 0=não lembrei, 3=difícil, 4=fácil, 5=perfeito
 * @returns Novo estado do cartão
 */
export function calculateSRS(
  current: SRSCardState,
  quality: SRSQuality
): SRSCardState {
  const { SRS_MIN_EF } = APP_CONFIG;

  let { interval, easeFactor, repetitions } = current;

  if (quality === 0) {
    // Não lembrou: reinicia
    interval = 1;
    easeFactor = Math.max(SRS_MIN_EF, easeFactor - 0.2);
    repetitions = 0;
  } else if (quality === 3) {
    // Difícil
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(SRS_MIN_EF, easeFactor - 0.14);
    repetitions += 1;
  } else if (quality === 4) {
    // Fácil
    interval = repetitions === 0 ? 1 : repetitions === 1 ? 6 : Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    // Perfeito (5)
    interval = repetitions === 0 ? 1 : repetitions === 1 ? 6 : Math.round(interval * easeFactor * 1.3);
    easeFactor = Math.min(easeFactor + 0.1, 4.0);
    repetitions += 1;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    interval,
    easeFactor,
    repetitions,
    nextReview: nextReviewDate.toISOString().split('T')[0],
  };
}

/**
 * Verifica se um cartão está vencido para revisão hoje.
 */
export function isDue(card: SRSCardState): boolean {
  const today = new Date().toISOString().split('T')[0];
  return card.nextReview <= today;
}

/**
 * Retorna o status do cartão com base nas repetições.
 */
export function getCardStatus(
  card: SRSCardState
): 'aprendendo' | 'familiar' | 'dominado' | 'mestre' {
  if (card.repetitions === 0) return 'aprendendo';
  if (card.repetitions <= 2) return 'familiar';
  if (card.repetitions <= 5) return 'dominado';
  return 'mestre';
}
