import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DailyGoalType = 'casual' | 'regular' | 'intensive';
type HapticIntensity = 'light' | 'medium' | 'heavy';

interface SettingsState {
  dailyGoalType: DailyGoalType;
  dailyGoalMinutes: number;
  audioEnabled: boolean;
  masterVolume: number;
  narrationVolume: number;
  effectsVolume: number;
  hapticEnabled: boolean;
  hapticIntensity: HapticIntensity;
  notificationsEnabled: boolean;
  notificationTime: string;

  setDailyGoal: (type: DailyGoalType) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setMasterVolume: (volume: number) => void;
  setNarrationVolume: (volume: number) => void;
  setEffectsVolume: (volume: number) => void;
  setHapticEnabled: (enabled: boolean) => void;
  setHapticIntensity: (intensity: HapticIntensity) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setNotificationTime: (time: string) => void;
}

const GOAL_MINUTES: Record<DailyGoalType, number> = {
  casual: 5,
  regular: 10,
  intensive: 15,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      dailyGoalType: 'regular',
      dailyGoalMinutes: 10,
      audioEnabled: true,
      masterVolume: 80,
      narrationVolume: 80,
      effectsVolume: 80,
      hapticEnabled: true,
      hapticIntensity: 'medium' as HapticIntensity,
      notificationsEnabled: true,
      notificationTime: '20:00',

      setDailyGoal: (type) =>
        set({ dailyGoalType: type, dailyGoalMinutes: GOAL_MINUTES[type] }),

      setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
      setMasterVolume: (volume) => set({ masterVolume: Math.max(0, Math.min(100, volume)) }),
      setNarrationVolume: (volume) => set({ narrationVolume: Math.max(0, Math.min(100, volume)) }),
      setEffectsVolume: (volume) => set({ effectsVolume: Math.max(0, Math.min(100, volume)) }),

      setHapticEnabled: (enabled) => set({ hapticEnabled: enabled }),
      setHapticIntensity: (intensity) => set({ hapticIntensity: intensity }),

      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setNotificationTime: (time) => set({ notificationTime: time }),
    }),
    { name: 'koine-settings' }
  )
);

export type { DailyGoalType, HapticIntensity };
