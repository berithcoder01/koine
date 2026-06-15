import { useEffect, useState, useCallback } from 'react';
import { AudioEngine } from './AudioEngine';
import { useSettingsStore } from '../settings/settingsStore';
import type { Cue, CueGroup, AudioEngineState } from './types';

const engine = AudioEngine.getInstance();

export function useGuidedAudio(moduleId?: string) {
  const audioEnabled = useSettingsStore(s => s.audioEnabled);
  const [state, setState] = useState<AudioEngineState>(engine.state);
  const [currentCue, setCurrentCue] = useState<Cue | null>(null);
  const [currentGroup, setCurrentGroup] = useState<CueGroup | null>(null);
  const [progress, setProgress] = useState(0);

  // Sincroniza enabled com a store
  useEffect(() => {
    engine.setEnabled(audioEnabled);
  }, [audioEnabled]);

  // Carrega módulo
  useEffect(() => {
    if (!moduleId) return;
    engine.setCallbacks({
      onStateChange: setState,
      onCueStart: (_cue) => {
        setCurrentCue(_cue);
        setProgress(0);
      },
      onCueEnd: () => {
        setCurrentCue(null);
        setProgress(1);
        engine.next();
      },
      onGroupEnd: () => {
        setCurrentGroup(null);
        setCurrentCue(null);
      },
      onError: () => {
        setState('idle');
      },
    });

    engine.loadModule(moduleId).then(() => {
      setState(engine.state);
    });

    return () => {
      engine.unload();
    };
  }, [moduleId]);

  const playGroup = useCallback((groupId: string) => {
    if (!moduleId) return;
    const group = engine['moduleCues']?.groups.find(g => g.id === groupId);
    if (group) setCurrentGroup(group ?? null);
    engine.playGroup(groupId);
  }, [moduleId]);

  const playCue = useCallback((cueId: string) => {
    engine.playCue(cueId);
  }, []);

  const pause = useCallback(() => {
    engine.pause();
  }, []);

  const resume = useCallback(() => {
    engine.resume();
  }, []);

  const stop = useCallback(() => {
    engine.stop();
    setCurrentCue(null);
    setCurrentGroup(null);
  }, []);

  const next = useCallback(() => {
    engine.next();
  }, []);

  const skipGroup = useCallback(() => {
    engine.skipGroup();
  }, []);

  return {
    state,
    currentCue,
    currentGroup,
    progress,
    enabled: audioEnabled,
    playGroup,
    playCue,
    pause,
    resume,
    stop,
    next,
    skipGroup,
  };
}
