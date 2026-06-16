export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isPremium: boolean;
  trialEndsAt: string | null;
  createdAt: Date;
}

export interface UserProgress {
  uid: string;
  currentCycle: number;
  currentUnit: number;
  currentLesson: number;
  streakDays: number;
  streakRecord: number;
  lastStudyDate: string | null;
  dailyGoalMet?: boolean;
  dailyGoalStreak?: number;
  totalXP: number;
  weeklyXP: number;
  streakFreezes: number;
  leagueLevel: string;
  completedUnits: string[];
  completedLessons: { lessonId: string; score: number; completedAt: string }[];
  completedHistoryUnits: string[];
  completedVocabUnits: string[];
  completedCanvasLetters: string[];
  unlockedVerses: string[];
  trophyProgress: Record<string, 'none' | 'bronze' | 'prata' | 'ouro'>;
  achievements?: { id: string; title: string; description: string; icon: string; unlockedAt: string }[];
  avatarId?: string;
}
