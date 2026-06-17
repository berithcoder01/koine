import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';

interface StudyGoalState {
  dailyTarget: number;
  completedMinutes: number;
  lastReset: string;

  setDailyTarget: (minutes: number) => void;
  addCompletedMinutes: (minutes: number) => void;
  resetDailyProgress: () => void;
}

const getToday = () => format(new Date(), 'yyyy-MM-dd');

export const useStudyGoalStore = create<StudyGoalState>()(
  persist(
    (set, get) => ({
      dailyTarget: 10,
      completedMinutes: 0,
      lastReset: getToday(),

      setDailyTarget: (minutes) => {
        set({ dailyTarget: Math.max(1, Math.min(120, minutes)) });
      },

      addCompletedMinutes: (minutes) => {
        const state = get();
        if (state.lastReset !== getToday()) {
          set({ completedMinutes: 0, lastReset: getToday() });
        }
        set((prev) => ({
          completedMinutes: prev.completedMinutes + minutes,
        }));
      },

      resetDailyProgress: () => {
        set({ completedMinutes: 0, lastReset: getToday() });
      },
    }),
    { name: 'koine-study-goal' }
  )
);
