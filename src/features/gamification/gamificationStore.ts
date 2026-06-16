// src/store/gamificationStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { isYesterday } from 'date-fns';
import { XP_VALUES } from '@/core/constants/config';
import { TrophyTier } from '@/core/constants/trophies';
import { useStudyGoalStore } from '@/features/settings/studyGoalStore';

type LeagueLevel = 'bronze' | 'prata' | 'ouro' | 'diamante';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface AchievementNotification {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
}

export interface GamificationState {
  totalXP: number;
  weeklyXP: number;
  streakDays: number;
  streakRecord: number;
  lastStudyDate: string | null;
  dailyGoalMet: boolean;
  dailyGoalStreak: number;
  completedMinutes: number;
  leagueLevel: LeagueLevel;
  achievements: Achievement[];
  unlockedVerses: string[];
  trophyProgress: Record<string, TrophyTier>;
  pendingAchievement: AchievementNotification | null;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  unlockAchievement: (achievement: Achievement, xpReward?: number) => void;
  clearPendingAchievement: () => void;
  unlockVerse: (verseId: string) => void;
  setTrophyTier: (cycleId: string, tier: TrophyTier) => void;
  recordStudyActivity: () => void;
  hydrateFromFirebase: (data: {
    streakDays?: number;
    streakRecord?: number;
    lastStudyDate?: string | null;
    dailyGoalMet?: boolean;
    dailyGoalStreak?: number;
    completedMinutes?: number;
    totalXP?: number;
    weeklyXP?: number;
    leagueLevel?: LeagueLevel;
    achievements?: Achievement[];
    unlockedVerses?: string[];
    trophyProgress?: Record<string, TrophyTier>;
  }) => void;
}

const loadState = (): Partial<GamificationState> => {
  try {
    const saved = localStorage.getItem('koine-gamification');
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch { return {}; }
};

const saveState = (state: GamificationState) => {
  try {
    localStorage.setItem('koine-gamification', JSON.stringify({
      totalXP: state.totalXP,
      weeklyXP: state.weeklyXP,
      streakDays: state.streakDays,
      streakRecord: state.streakRecord,
      lastStudyDate: state.lastStudyDate,
      dailyGoalMet: state.dailyGoalMet,
      dailyGoalStreak: state.dailyGoalStreak,
      completedMinutes: state.completedMinutes,
      leagueLevel: state.leagueLevel,
      achievements: state.achievements,
      unlockedVerses: state.unlockedVerses,
      trophyProgress: state.trophyProgress,
    }));
  } catch {}
};

const saved = loadState();

export const useGamificationStore = create<GamificationState>()(
  immer((set) => ({
    totalXP: saved.totalXP ?? 0,
    weeklyXP: saved.weeklyXP ?? 0,
    streakDays: saved.streakDays ?? 0,
    streakRecord: saved.streakRecord ?? 0,
    lastStudyDate: saved.lastStudyDate ?? null,
    dailyGoalMet: saved.dailyGoalMet ?? false,
    dailyGoalStreak: saved.dailyGoalStreak ?? 0,
    completedMinutes: saved.completedMinutes ?? 0,
    leagueLevel: saved.leagueLevel ?? 'bronze',
    achievements: saved.achievements ?? [],
    unlockedVerses: saved.unlockedVerses ?? [],
    trophyProgress: saved.trophyProgress ?? {},
    pendingAchievement: null,

    addXP: (amount) =>
      set((state) => {
        state.totalXP += amount;
        state.weeklyXP += amount;
        saveState(state);
      }),

    incrementStreak: () =>
      set((state) => {
        state.streakDays += 1;
        state.lastStudyDate = new Date().toISOString().split('T')[0];
        if (state.streakDays > state.streakRecord) {
          state.streakRecord = state.streakDays;
        }
        saveState(state);
      }),

    resetStreak: () =>
      set((state) => {
        state.streakDays = 0;
        saveState(state);
      }),

    unlockAchievement: (achievement, xpReward = 0) =>
      set((state) => {
        const exists = state.achievements.find((a) => a.id === achievement.id);
        if (!exists) {
          state.achievements.push(achievement);
          state.pendingAchievement = {
            id: achievement.id,
            title: achievement.title,
            description: achievement.description,
            icon: achievement.icon,
            xp: xpReward,
          };
          saveState(state);
        }
      }),

    clearPendingAchievement: () =>
      set((state) => {
        state.pendingAchievement = null;
      }),

    unlockVerse: (verseId) =>
      set((state) => {
        if (!state.unlockedVerses.includes(verseId)) {
          state.unlockedVerses.push(verseId);
          state.totalXP += XP_VALUES.FIRST_VERSE;
          state.weeklyXP += XP_VALUES.FIRST_VERSE;
          saveState(state);
        }
      }),

    setTrophyTier: (cycleId, tier) =>
      set((state) => {
        const current = state.trophyProgress[cycleId] ?? 'none';
        const tierOrder: TrophyTier[] = ['none', 'bronze', 'prata', 'ouro'];
        if (tierOrder.indexOf(tier) > tierOrder.indexOf(current)) {
          state.trophyProgress[cycleId] = tier;
          saveState(state);
        }
      }),

    recordStudyActivity: () =>
      set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const isNewDay = state.lastStudyDate !== today;
        const prevLastStudyDate = state.lastStudyDate;

        // Streak logic (only on new day)
        if (!state.lastStudyDate) {
          state.streakDays = 1;
        } else if (isNewDay) {
          const last = new Date(state.lastStudyDate);
          if (isYesterday(last)) {
            state.streakDays += 1;
          } else {
            state.streakDays = 1;
          }
        }

        if (isNewDay) {
          state.lastStudyDate = today;
          state.dailyGoalMet = false;
          state.completedMinutes = 0;
          // Reset daily goal streak if user missed a day
          if (prevLastStudyDate && !isYesterday(new Date(prevLastStudyDate))) {
            state.dailyGoalStreak = 0;
          }
        }

        if (state.streakDays > state.streakRecord) {
          state.streakRecord = state.streakDays;
        }

        // Add estimated minutes and check daily goal
        state.completedMinutes += 5;
        const goalState = useStudyGoalStore.getState();
        if (!state.dailyGoalMet && state.completedMinutes >= goalState.dailyTarget) {
          state.dailyGoalMet = true;
          state.dailyGoalStreak += 1;
          const goalBonus = 5 + Math.min(state.streakDays * 2, 20);
          state.totalXP += goalBonus;
          state.weeklyXP += goalBonus;
        }

        saveState(state);
      }),

    hydrateFromFirebase: (data) =>
      set((state) => {
        // Só hidrata se o valor do Firebase é maior ou mais recente
        if (data.streakDays != null && data.streakDays > state.streakDays) {
          state.streakDays = data.streakDays;
        }
        if (data.streakRecord != null && data.streakRecord > state.streakRecord) {
          state.streakRecord = data.streakRecord;
        }
        if (data.lastStudyDate != null) {
          // Usa a data mais recente
          if (!state.lastStudyDate || data.lastStudyDate > state.lastStudyDate) {
            state.lastStudyDate = data.lastStudyDate;
          }
        }
        if (data.dailyGoalMet != null) {
          state.dailyGoalMet = data.dailyGoalMet;
        }
        if (data.dailyGoalStreak != null && data.dailyGoalStreak > state.dailyGoalStreak) {
          state.dailyGoalStreak = data.dailyGoalStreak;
        }
        if (data.completedMinutes != null && data.completedMinutes > state.completedMinutes) {
          state.completedMinutes = data.completedMinutes;
        }
        if (data.totalXP != null) {
          state.totalXP = Math.max(data.totalXP, state.totalXP);
        }
        if (data.weeklyXP != null && data.weeklyXP > state.weeklyXP) {
          state.weeklyXP = data.weeklyXP;
        }
        if (data.leagueLevel != null) {
          state.leagueLevel = data.leagueLevel;
        }
        if (data.achievements != null && data.achievements.length > state.achievements.length) {
          state.achievements = data.achievements;
        }
        if (data.unlockedVerses != null && data.unlockedVerses.length > state.unlockedVerses.length) {
          state.unlockedVerses = data.unlockedVerses;
        }
        if (data.trophyProgress != null) {
          state.trophyProgress = { ...state.trophyProgress, ...data.trophyProgress };
        }
        saveState(state);
      }),
  }))
);
