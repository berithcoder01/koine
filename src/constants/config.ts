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
  SRS_SESSION: 10,
  CANVAS_FIRST_TRY: 5,
  FIRST_VERSE: 50,
  CYCLE_COMPLETE: 100,
} as const;

export const REVENUECAT_API_KEY = {
  ANDROID: 'goog_SUBSTITUA_PELA_CHAVE_REVENUECAT',
} as const;

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyA9hWf595188TytoBCZZ3mjSzV2MzlSO2k',
  authDomain: 'koine-ded49.firebaseapp.com',
  projectId: 'koine-ded49',
  storageBucket: 'koine-ded49.firebasestorage.app',
  messagingSenderId: '594880756211',
  appId: '1:594880756211:android:5acb377b46bfc8fe3c3a86',
  measurementId: '',
};
