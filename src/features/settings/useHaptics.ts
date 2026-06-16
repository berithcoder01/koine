import { useCallback } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useSettingsStore } from '@/features/settings/settingsStore';

const INTENSITY_MAP = {
  light: ImpactStyle.Light,
  medium: ImpactStyle.Medium,
  heavy: ImpactStyle.Heavy,
};

export const useHaptics = () => {
  const { hapticEnabled, hapticIntensity } = useSettingsStore();

  const impact = useCallback(async (style?: ImpactStyle) => {
    if (!hapticEnabled) return;
    const resolvedStyle = style ?? INTENSITY_MAP[hapticIntensity];
    try {
      await Haptics.impact({ style: resolvedStyle });
    } catch {
      // Haptics not available (web browser)
    }
  }, [hapticEnabled, hapticIntensity]);

  const light = useCallback(() => impact(ImpactStyle.Light), [impact]);
  const medium = useCallback(() => impact(ImpactStyle.Medium), [impact]);
  const heavy = useCallback(() => impact(ImpactStyle.Heavy), [impact]);

  const vibrate = useCallback(async (duration: number = 200) => {
    if (!hapticEnabled) return;
    try {
      await Haptics.vibrate({ duration });
    } catch {
      // fallback: try navigator.vibrate
      if ('vibrate' in navigator) {
        navigator.vibrate(duration);
      }
    }
  }, [hapticEnabled]);

  return { impact, light, medium, heavy, vibrate, enabled: hapticEnabled };
};
