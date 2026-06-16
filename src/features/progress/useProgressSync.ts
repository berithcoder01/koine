import { useEffect, useRef, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { useAuthStore } from '@/features/auth/authStore';
import { useProgressStore, type ProgressState } from '@/features/progress/progressStore';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { saveUserProgress } from '@/features/auth/firestore';
import { dbQueries } from '@/features/database/queries';
import type { UserProgress } from '@/core/types/user.types';

const HEARTBEAT_MS = 300000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY = 1000;

const INITIAL_PROGRESS: Partial<ProgressState> = {
  completedLessons: {},
  completedUnits: [],
  currentCycle: 1,
  currentUnit: 1,
  currentLesson: 1,
};

let _heartbeatStarted = false;
let _achievementWatchStarted = false;

export const useProgressSync = () => {
  const user = useAuthStore(s => s.user);
  const progress = useAuthStore(s => s.progress);
  const prevUid = useRef<string | null>(null);

  const syncToFirestore = useCallback(async () => {
    if (!user) return;
    const ps = useProgressStore.getState();
    const gs = useGamificationStore.getState();

    const authProgress = useAuthStore.getState().progress;
    const hasLocalData = gs.totalXP > 0 || Object.keys(ps.completedLessons).length > 0;
    if (!hasLocalData) {
      if (!authProgress) return;
      if (authProgress.totalXP > 0 || authProgress.completedLessons.length > 0) return;
    }

    const data: Partial<UserProgress> = {
      currentCycle: ps.currentCycle,
      currentUnit: ps.currentUnit,
      currentLesson: ps.currentLesson,
      streakDays: gs.streakDays,
      streakRecord: gs.streakRecord,
      lastStudyDate: gs.lastStudyDate,
      dailyGoalMet: gs.dailyGoalMet,
      dailyGoalStreak: gs.dailyGoalStreak,
      totalXP: gs.totalXP,
      weeklyXP: gs.weeklyXP,
      leagueLevel: gs.leagueLevel,
      completedUnits: ps.completedUnits,
      completedLessons: Object.values(ps.completedLessons),
      completedHistoryUnits: ps.completedHistoryUnits,
      completedVocabUnits: ps.completedVocabUnits,
      completedCanvasLetters: ps.completedCanvasLetters,
      unlockedVerses: gs.unlockedVerses,
      trophyProgress: gs.trophyProgress,
      achievements: gs.achievements,
      avatarId: useAuthStore.getState().avatarId ?? undefined,
    };

    let lastError: unknown;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        await saveUserProgress(user.uid, data);
        return;
      } catch (err) {
        lastError = err;
        if (attempt < MAX_RETRIES - 1) {
          await new Promise(r => setTimeout(r, RETRY_BASE_DELAY * (attempt + 1)));
        }
      }
    }
    console.error('[ProgressSync] Firestore write failed after retries:', lastError);
  }, [user]);

  const isSyncing = useRef(false);
  const syncOnce = useCallback(async () => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    await syncToFirestore();
    isSyncing.current = false;
  }, [syncToFirestore]);

  // Background effects só rodam no primeiro mount (ex: App.tsx)
  useEffect(() => {
    if (_heartbeatStarted) return;
    _heartbeatStarted = true;

    if (!user) return;

    const heartbeat = setInterval(syncOnce, HEARTBEAT_MS);
    const handleBeforeUnload = () => { syncToFirestore(); };

    window.addEventListener('beforeunload', handleBeforeUnload);

    let appStateCleanup: (() => void) | undefined;
    if (Capacitor.isNativePlatform()) {
      import('@capacitor/app').then(({ App }) => {
        App.addListener('appStateChange', ({ isActive }) => {
          if (!isActive) syncToFirestore();
        }).then(l => { appStateCleanup = l.remove; });
      });
    }

    return () => {
      clearInterval(heartbeat);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      appStateCleanup?.();
    };
  }, [user, syncOnce, syncToFirestore]);

  // Sync imediato ao desbloquear conquista
  useEffect(() => {
    if (_achievementWatchStarted) return;
    _achievementWatchStarted = true;

    if (!user) return;
    let prevLen = useGamificationStore.getState().achievements.length;
    const unsub = useGamificationStore.subscribe(() => {
      const curLen = useGamificationStore.getState().achievements.length;
      if (curLen > prevLen) {
        prevLen = curLen;
        syncToFirestore();
      }
    });
    return unsub;
  }, [user, syncToFirestore]);

  useEffect(() => {
    if (!user || !progress) return;
    const uid = user.uid;
    const prev = prevUid.current;
    prevUid.current = uid;

    if (prev !== null && prev !== uid) {
      localStorage.removeItem('koine-progress');
      localStorage.removeItem('koine-gamification');
      localStorage.removeItem('koine-canvas-completed');
      useProgressStore.setState(INITIAL_PROGRESS);
    }

    const ps = useProgressStore.getState();
    if (Object.keys(ps.completedLessons).length > 0 && prev === uid) return;

    // Hidrata gamificationStore com dados do Firebase
    const gs = useGamificationStore.getState();
    gs.hydrateFromFirebase({
      streakDays: progress.streakDays,
      streakRecord: progress.streakRecord,
      lastStudyDate: progress.lastStudyDate,
      dailyGoalMet: progress.dailyGoalMet,
      dailyGoalStreak: progress.dailyGoalStreak,
      totalXP: progress.totalXP,
      weeklyXP: progress.weeklyXP,
      leagueLevel: progress.leagueLevel as any,
      achievements: progress.achievements,
      unlockedVerses: progress.unlockedVerses,
      trophyProgress: progress.trophyProgress,
    });

    if (progress.completedLessons.length > 0) {
      // Verifica formato: old (string[]) vs new ({ lessonId, score, completedAt }[])
      const first = progress.completedLessons[0];
      if (typeof first === 'string') {
        // Old format — fallback score 100
        for (const lessonId of progress.completedLessons as unknown as string[]) {
          ps.markLessonComplete(lessonId, 100);
        }
      } else {
        for (const item of progress.completedLessons) {
          ps.markLessonComplete(item.lessonId, item.score);
        }
      }
      ps.setCurrentPosition(
        progress.currentCycle, progress.currentUnit, progress.currentLesson,
      );
    }

    // Hidrata atividades extracurriculares do Firebase
    if (progress.completedHistoryUnits?.length > 0) {
      for (const unitId of progress.completedHistoryUnits) {
        ps.markHistoryUnitComplete(unitId);
      }
    }
    if (progress.completedVocabUnits?.length > 0) {
      for (const unitId of progress.completedVocabUnits) {
        ps.markVocabUnitComplete(unitId);
      }
    }
    if (progress.completedCanvasLetters?.length > 0) {
      for (const letterId of progress.completedCanvasLetters) {
        ps.markCanvasLetterComplete(letterId);
      }
    }
  }, [user?.uid, progress]);

  const syncUnitProgress = useCallback(async (
    unitId: string,
    phaseReached: number,
    overallScore: number,
    masteryLevel: string,
  ) => {
    if (!user) return;
    await dbQueries.upsertUnitProgress({
      unitId,
      userId: user.uid,
      phaseReached,
      overallScore,
      masteryLevel,
      srsEnrolled: true,
    });
  }, [user]);

  return { syncToFirestore: syncOnce, syncUnitProgress };
};
