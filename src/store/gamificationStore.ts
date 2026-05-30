// src/store/gamificationStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { XP_VALUES } from '@/constants/config';

type LeagueLevel = 'bronze' | 'prata' | 'ouro' | 'diamante';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface GamificationState {
  totalXP: number;
  weeklyXP: number;
  streakDays: number;
  streakRecord: number;
  lastStudyDate: string | null;
  leagueLevel: LeagueLevel;
  achievements: Achievement[];
  unlockedVerses: string[];
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  unlockAchievement: (achievement: Achievement) => void;
  unlockVerse: (verseId: string) => void;
}

const loadState = (): Partial<GamificationState> => {
  try {
    const saved = localStorage.getItem('koine-gamification');
    return saved ? JSON.parse(saved) : {};
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
      leagueLevel: state.leagueLevel,
      achievements: state.achievements,
      unlockedVerses: state.unlockedVerses,
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
    leagueLevel: saved.leagueLevel ?? 'bronze',
    achievements: saved.achievements ?? [],
    unlockedVerses: saved.unlockedVerses ?? [],

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

    unlockAchievement: (achievement) =>
      set((state) => {
        const exists = state.achievements.find((a) => a.id === achievement.id);
        if (!exists) {
          state.achievements.push(achievement);
          saveState(state);
        }
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
  }))
);
