import { useCallback } from 'react';
import { useGamificationStore } from './gamificationStore';
import { useProgressStore } from '@/features/progress/progressStore';
import { ACHIEVEMENTS } from '@/core/constants/achievements';
import { CYCLES } from '@/content/curriculum/cycles';
import { MODULES } from '@/content/curriculum/modules';
import { dbQueries } from '@/features/database/queries';
import { calculateTrophyTier } from '@/core/constants/trophies';
import { useSoundVolume } from '../settings/useSoundVolume';

export const useGamificationActions = () => {
  const { 
    addXP, recordStudyActivity, 
    unlockAchievement, unlockVerse, setTrophyTier,
    lastStudyDate, streakDays,
  } = useGamificationStore();

  const { playEffect } = useSoundVolume();

  const checkAchievements = useCallback(async (xpBonus: number = 0) => {
    const ps = useProgressStore.getState();
    const gs = useGamificationStore.getState();
    let srsCardCount = 0;
    try { srsCardCount = await dbQueries.getTotalSRSCardCount(); } catch {}

    let completedTypingSessions = 0;
    let uniqueTypedWords = 0;
    try {
      const typingHistory = await dbQueries.getTypingHistory('local', 365);
      const correctEntries = typingHistory.filter(r => r.is_correct);
      const uniqueWords = new Set(correctEntries.map(r => r.word_greek));
      uniqueTypedWords = uniqueWords.size;
      const sessionIds = new Set(typingHistory.map(r => r.session_id).filter(Boolean));
      completedTypingSessions = sessionIds.size;
    } catch {}

    const progressObj = {
      totalXP: gs.totalXP + xpBonus,
      streakDays: gs.streakDays,
      completedLessons: Object.keys(ps.completedLessons),
      completedUnits: ps.completedUnits,
      completedHistoryUnits: ps.completedHistoryUnits,
      completedCanvasLetters: ps.completedCanvasLetters,
      unlockedVerses: gs.unlockedVerses,
      srsCardCount,
      fastLessonCompleted: false,
      completedTypingSessions,
      uniqueTypedWords,
      typingPerfectSession: false,
    };

    const unlockedIds = gs.achievements.map(a => a.id);
    for (const achievement of ACHIEVEMENTS) {
      if (!unlockedIds.includes(achievement.id) && achievement.condition(progressObj)) {
        unlockAchievement({
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon,
          unlockedAt: new Date().toISOString(),
        }, achievement.xpReward);
        addXP(achievement.xpReward);
      }
    }

    for (const cycle of CYCLES) {
      const cycleModules = MODULES.filter(m => m.cycle === cycle.id && m.exercises > 0);
      const completedCount = cycleModules.filter(m => Object.keys(ps.completedLessons).includes(m.id)).length;
      const newTier = calculateTrophyTier(completedCount, cycleModules.length);
      setTrophyTier(String(cycle.id), newTier);

      if (!gs.unlockedVerses.includes(cycle.trophyVerseId) && cycleModules.length > 0) {
        const allCompleted = cycleModules.every(m => Object.keys(ps.completedLessons).includes(m.id));
        if (allCompleted) {
          unlockVerse(cycle.trophyVerseId);
        }
      }
    }
  }, [addXP, unlockAchievement, unlockVerse, setTrophyTier]);

  const onApostilaComplete = useCallback(async (_lessonId: string, xpReward: number) => {
    addXP(xpReward);
    recordStudyActivity();
    playEffect('success');
    await checkAchievements(xpReward);
  }, [addXP, recordStudyActivity, checkAchievements]);

  const onLessonComplete = useCallback(async (_lessonId: string, _score: number, xpEarned: number) => {
    addXP(xpEarned);
    recordStudyActivity();
    playEffect('success');
    await checkAchievements(xpEarned);
  }, [
    addXP, recordStudyActivity, lastStudyDate, streakDays, checkAchievements,
  ]);

  return { onLessonComplete, onApostilaComplete, checkAchievements, recordStudyActivity };
};