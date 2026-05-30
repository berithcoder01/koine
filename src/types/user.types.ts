// src/types/user.types.ts
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isPremium: boolean;
  trialEndsAt: Date | null;
  createdAt: Date;
}

export interface UserProgress {
  uid: string;
  currentCycle: number;
  currentUnit: number;
  currentLesson: number;
  streakDays: number;
  streakRecord: number;
  lastStudyDate: string | null; // ISO date string
  totalXP: number;
  weeklyXP: number;
  streakFreezes: number; // disponíveis no mês
  leagueLevel: 'bronze' | 'prata' | 'ouro' | 'diamante';
  completedUnits: string[];   // array de unitIds
  completedLessons: string[]; // array de lessonIds
  unlockedVerses: string[];   // verseIds desbloqueados como troféus
}

export interface DailyGoal {
  type: 'casual' | 'regular' | 'intensive';
  minutes: number; // 5, 10 ou 15
}
