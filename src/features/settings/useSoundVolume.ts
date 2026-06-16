import { useCallback } from 'react';
import { useSettingsStore } from '@/features/settings/settingsStore';
import { createSoundEffectPlayer } from './soundEffects';

export const useSoundVolume = () => {
  const {
    audioEnabled,
    masterVolume,
    narrationVolume,
    effectsVolume
  } = useSettingsStore();

  const playEffect = useCallback((name: 'click' | 'success' | 'error' | 'levelUp') => {
    const volume = (masterVolume / 100) * (effectsVolume / 100);
    if (volume <= 0 || !audioEnabled) return;
    
    const playEffectSound = createSoundEffectPlayer(volume, audioEnabled);
    playEffectSound(name);
  }, [masterVolume, effectsVolume, audioEnabled]);

  const getNarrationVolume = useCallback(() => {
    return (masterVolume / 100) * (narrationVolume / 100);
  }, [masterVolume, narrationVolume]);

  return {
    enabled: audioEnabled,
    masterVolume,
    narrationVolume,
    effectsVolume,
    getNarrationVolume,
    playEffect,
  };
};
