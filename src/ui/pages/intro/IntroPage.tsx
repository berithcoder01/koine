import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { Button } from '@/ui/components/Button';
import { GreekText } from '@/ui/greek/GreekText';
import { useProgressStore } from '@/features/progress/progressStore';
import { useGamificationActions } from '@/features/gamification/useGamificationActions';
import { useProgressSync } from '@/features/progress/useProgressSync';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { MODULES } from '@/content/curriculum/modules';
import type { Cue } from '@/features/audio/types';
import { renderMarkdown } from '@/core/utils/markdown';

export const IntroPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigation = useAppNavigation();
  const { markLessonComplete } = useProgressStore();
  const { onLessonComplete } = useGamificationActions();
  const { syncToFirestore } = useProgressSync();
  const moduleInfo = MODULES.find(m => m.id === moduleId);
  const [hasCompleted, setHasCompleted] = useState(false);
  const gamificationApplied = useRef(false);

  const [cues, setCues] = useState<Cue[]>([]);
  const [currentCue, setCurrentCue] = useState<Cue | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const durationRef = useRef(0);

  useEffect(() => {
    if (!moduleId) return;

    fetch(`/audio/${moduleId}/${moduleId}.cues.json`)
      .then(r => r.json())
      .then(data => setCues(data.cues ?? []))
      .catch(() => setCues([]));

    const audio = new Audio(`/audio/${moduleId}/${moduleId}.mp3`);
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setIsLoading(false));
    audio.addEventListener('loadeddata', () => setIsLoading(false));

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [moduleId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || cues.length === 0) return;

    const onTimeUpdate = () => {
      const time = audio.currentTime;
      durationRef.current = audio.duration || 1;
      setProgress(Math.min(1, time / durationRef.current));
      const active = cues.find(c => time >= c.startTime && time < c.endTime);
      setCurrentCue(active ?? null);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); setCurrentCue(null); };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, [cues]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [isPlaying]);

  const skipForward = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || cues.length === 0) return;
    const idx = cues.findIndex(c => c.id === currentCue?.id);
    if (idx >= 0 && idx < cues.length - 1) {
      audio.currentTime = cues[idx + 1].startTime;
    } else {
      audio.currentTime = Math.min(audio.duration || 0, (audio.currentTime || 0) + 10);
    }
  }, [currentCue, cues]);

  const skipBack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, (audio.currentTime || 0) - 10);
  }, []);

  const handleComplete = useCallback(() => {
    if (hasCompleted || !moduleId) return;
    setHasCompleted(true);
    audioRef.current?.pause();
    markLessonComplete(moduleId, 100);
    if (!gamificationApplied.current) {
      gamificationApplied.current = true;
      onLessonComplete(moduleId, 100, 0);
      syncToFirestore();
    }
    navigation.goToTrail();
  }, [hasCompleted, moduleId, markLessonComplete, onLessonComplete, syncToFirestore, navigation]);

  if (!moduleInfo) {
    return (
      <SafeArea>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Módulo não encontrado</p>
        </div>
      </SafeArea>
    );
  }

  return (
    <SafeArea noTopSafeArea>
      <div className="h-dvh overflow-hidden flex flex-col bg-background">

        {/* Header: back button + title */}
        <div className="flex items-center gap-3 px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-3">
          <button
            onClick={() => navigation.goBack()}
            className="w-10 h-10 !rounded-full bg-surface dark:bg-surface-alt border border-border/30 flex items-center justify-center active:scale-90 transition-transform shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-text-primary dark:text-white font-black text-base truncate">
            {moduleInfo.title}
          </h1>
        </div>

        {/* Main content: current cue text */}
        <div className="flex-1 px-4 pb-2 flex flex-col justify-center">
          <div className="bg-surface dark:bg-surface-alt border border-border/40 rounded-3xl p-6 shadow-sm min-h-[160px] flex items-center justify-center">
            {currentCue ? (
              <p className="text-text-primary dark:text-white text-lg leading-relaxed font-medium text-center max-w-md">
                {renderMarkdown(currentCue.text)}
              </p>
            ) : (
              <p className="text-text-secondary text-sm text-center">
                {isLoading
                  ? 'Carregando áudio...'
                  : hasCompleted
                    ? 'Introdução concluída!'
                    : isPlaying
                      ? 'Aguardando próximo trecho...'
                      : 'Pressione ▶ para começar'}
              </p>
            )}
          </div>
        </div>

        {/* Trophy verse */}
        <div className="px-4 pb-3">
          <div className="bg-gradient-to-r from-card-purple/20 to-card-blue/20 border border-card-purple-border/30 rounded-2xl px-5 py-3 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-text-secondary text-[10px] font-semibold uppercase tracking-wide mb-1">Versículo-Troféu</p>
              <GreekText text={moduleInfo.anchorVerse} size="sm" />
            </div>
            <p className="text-text-secondary text-xs font-medium shrink-0">{moduleInfo.anchorReference}</p>
          </div>
        </div>

        {/* Player controls + progress + button */}
        <div className="px-4 pb-[max(env(safe-area-inset-bottom),1rem)] flex flex-col gap-3">
          {/* Player buttons */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={skipBack}
              className="w-12 h-12 !rounded-full bg-surface dark:bg-surface-alt border border-border/30 flex items-center justify-center active:scale-90 transition-transform"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary">
                <polygon points="19 20 9 12 19 4 19 20" />
                <line x1="5" y1="19" x2="5" y2="5" />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 !rounded-full bg-secondary text-white dark:text-[#18181B] flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <span className="text-3xl">{isPlaying ? '⏸' : '▶'}</span>
            </button>

            <button
              onClick={skipForward}
              className="w-12 h-12 !rounded-full bg-surface dark:bg-surface-alt border border-border/30 flex items-center justify-center active:scale-90 transition-transform"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary">
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" y1="5" x2="19" y2="19" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Complete button */}
          <Button
            label={hasCompleted ? 'Ir para Trilha' : 'Concluir Introdução'}
            onClick={handleComplete}
            fullWidth
            size="lg"
            radius="full"
            className="bg-secondary text-white dark:text-[#18181B] font-black"
          />
        </div>

      </div>
    </SafeArea>
  );
};
