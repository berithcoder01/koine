// src/constants/config.ts
export const APP_CONFIG = {
  APP_ID: 'com.berith.koineapp',
  APP_NAME: 'Koiné',
  VERSION: '1.0.0',
  
  // Freemium limits
  FREE_MAX_CYCLES: 2,        // Ciclos I e II gratuitos
  FREE_DAILY_LESSONS: 3,     // Máx lições/dia nos ciclos pagos
  
  // SRS
  SRS_MAX_DAILY_CARDS: 20,
  SRS_INITIAL_EF: 2.5,
  SRS_MIN_EF: 1.3,
  
  // Gamificação
  STREAK_GRACE_PERIOD_MONTHLY: 1, // 1 freeze/mês para Premium
  LEAGUE_SIZE: 30,
  LEAGUE_PROMOTION_TOP: 10,
  LEAGUE_DEMOTION_BOTTOM: 5,
  
  // Canvas
  CANVAS_PRECISION_TOLERANCE: 0.15, // ±15%
  CANVAS_PASS_SCORE: 70,            // mínimo 70/100
  CANVAS_MAX_ATTEMPTS: 3,
  
  // Lição
  LESSON_PASS_SCORE: 80,           // mínimo 80% para passar
  UNIT_QUIZ_PASS_SCORE: 80,
  
  // Preços (referência — RevenueCat é a fonte real)
  PRICE_MONTHLY: 'R$ 14,90',
  PRICE_ANNUAL: 'R$ 99,90',
  TRIAL_DAYS: 7,
} as const;

export const XP_VALUES = {
  LESSON_COMPLETE: 15,
  LESSON_PERFECT: 25,        // 15 base + 10 bônus
  EXERCISE_CORRECT: 2,
  REVIEW_SESSION: 10,
  CANVAS_FIRST_TRY: 5,
  CANVAS_SECOND_TRY: 2,
  CANVAS_ALL_LETTERS: 100,
  FIRST_VERSE: 50,
  CYCLE_COMPLETE: 100,
  HISTORY_UNIT_READ: 5,
  HISTORY_MODULE_COMPLETE: 0, // XP já está no módulo
  HISTORY_BLOCK_COMPLETE: 25,
  HISTORY_ALL_COMPLETE: 150,
  VOCAB_UNIT_READ: 5,
  STREAK_30: 100,
  STREAK_100: 250,
  TYPING_COPY_FIRST_TRY: 3,
  TYPING_COPY_SECOND_TRY: 1,
  TYPING_TRANSLATE_FIRST_TRY: 5,
  TYPING_TRANSLATE_SECOND_TRY: 2,
  TYPING_SESSION_COMPLETE: 10,
} as const;

export const REVENUECAT_API_KEY = {
  ANDROID: import.meta.env.VITE_REVENUECAT_ANDROID_KEY ?? '',
} as const;

export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? '',
};

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';
