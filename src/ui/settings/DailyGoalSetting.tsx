import React, { useEffect } from 'react';
import { useStudyGoalStore } from '@/features/settings/studyGoalStore';
import { CircularProgress } from '@/ui/components/CircularProgress';
import { Slider } from '@/ui/components/Slider';

interface DailyGoalSettingProps {
  onChange?: (value: number) => void;
}

export const DailyGoalSetting: React.FC<DailyGoalSettingProps> = ({ onChange }) => {
  const {
    dailyTarget,
    completedMinutes,
    setDailyTarget,
    resetDailyProgress,
  } = useStudyGoalStore();

  const progressPercentage = Math.min(100, Math.round((completedMinutes / dailyTarget) * 100));

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const { lastReset } = useStudyGoalStore.getState();
    if (lastReset !== today) {
      resetDailyProgress();
    }
  }, []);

  return (
    <div className="py-4">
      <p className="text-text-secondary dark:text-zinc-400 text-xs mb-3">
        Quanto tempo você quer estudar por dia?
      </p>
      <div className="flex items-center gap-4">
        <CircularProgress
          value={progressPercentage}
          size={56}
          strokeWidth={4}
          className="text-secondary"
        />
        <div className="flex-1">
          <Slider
            min={1}
            max={120}
            value={dailyTarget}
            onChange={(val) => {
              const rounded = Math.round(val);
              setDailyTarget(rounded);
              onChange?.(rounded);
            }}
            unit=" min"
          />
          <p className="text-[10px] text-text-secondary dark:text-zinc-500 mt-1">
            {completedMinutes} de {dailyTarget} min concluídos
          </p>
        </div>
      </div>
    </div>
  );
};
