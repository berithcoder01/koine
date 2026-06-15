// src/constants/xp.ts
// Constantes de XP centralizadas para fácil ajuste de balanceamento

export const XP_CONFIG = {
  // Lições
  LESSON_COMPLETE: 15,
  LESSON_PERFECT_BONUS: 10,      // bônus adicional a LESSON_COMPLETE
  LESSON_PERFECT_TOTAL: 25,

  // Exercícios individuais
  EXERCISE_CORRECT: 2,

  // Canvas
  CANVAS_FIRST_TRY: 5,
  CANVAS_SECOND_TRY: 2,
  CANVAS_THIRD_TRY: 0,

  // Revisão
  REVIEW_SESSION_COMPLETE: 10,
  REVIEW_CARD_CORRECT: 1,

  // Marcos especiais
  FIRST_VERSE_READ: 50,
  CYCLE_COMPLETE: 100,
  UNIT_QUIZ_PASS: 30,

  // Multiplicadores de streak
  STREAK_1_TO_6: 1.0,
  STREAK_7_TO_29: 1.2,
  STREAK_30_PLUS: 1.5,

  // Liga (XP para ranking semanal)
  LEAGUE_RESET_DAY: 1, // Segunda-feira (0=Dom, 1=Seg)
} as const;
