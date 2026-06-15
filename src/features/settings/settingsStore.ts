// src/store/settingsStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type DailyGoalType = 'casual' | 'regular' | 'intensive';

interface SettingsState {
  dailyGoalType: DailyGoalType;
  dailyGoalMinutes: number;
  audioEnabled: boolean;
  hapticEnabled: boolean;
  notificationsEnabled: boolean;
  notificationTime: string; // '20:00'
  setDailyGoal: (type: DailyGoalType) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setHapticEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setNotificationTime: (time: string) => void;
}

const GOAL_MINUTES: Record<DailyGoalType, number> = {
  casual: 5,
  regular: 10,
  intensive: 15,
};

export const useSettingsStore = create<SettingsState>()(
  immer((set) => ({
    dailyGoalType: 'regular',
    dailyGoalMinutes: 10,
    audioEnabled: true,
    hapticEnabled: true,
    notificationsEnabled: true,
    notificationTime: '20:00',

    setDailyGoal: (type) =>
      set((state) => {
        state.dailyGoalType = type;
        state.dailyGoalMinutes = GOAL_MINUTES[type];
      }),

    setAudioEnabled: (enabled) =>
      set((state) => {
        state.audioEnabled = enabled;
      }),

    setHapticEnabled: (enabled) =>
      set((state) => {
        state.hapticEnabled = enabled;
      }),

    setNotificationsEnabled: (enabled) =>
      set((state) => {
        state.notificationsEnabled = enabled;
      }),

    setNotificationTime: (time) =>
      set((state) => {
        state.notificationTime = time;
      }),
  }))
);
