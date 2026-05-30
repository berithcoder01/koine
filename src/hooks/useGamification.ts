import { useProgressStore } from '@/store/progressStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { ACHIEVEMENTS } from '@/constants/achievements';

export const useGamification = () => {
  const { completedLessons, completedUnits } = useProgressStore();
  const { totalXP, streakDays, unlockedVerses, addXP } = useGamificationStore();

  const checkAchievements = async () => {
    const progressObj = {
      totalXP,
      streakDays,
      completedLessons: Object.keys(completedLessons),
      completedUnits,
      unlockedVerses,
      srsCardCount: 0,
      fastLessonCompleted: false,
    };

    for (const achievement of ACHIEVEMENTS) {
      if (completedLessons[`achievement_${achievement.id}`]) continue;
      if (achievement.condition(progressObj)) {
        addXP(achievement.xpReward);
      }
    }
  };

  const getStreakMultiplier = (): number => {
    if (streakDays >= 30) return 1.5;
    if (streakDays >= 7) return 1.2;
    return 1.0;
  };

  const applyMultiplier = (baseXP: number): number => {
    return Math.round(baseXP * getStreakMultiplier());
  };

  return { checkAchievements, getStreakMultiplier, applyMultiplier };
};
