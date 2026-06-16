import React, { useMemo } from 'react';
import { useProgressStore } from '@/features/progress/progressStore';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { format, startOfWeek, addDays, isSameDay, subDays, parseISO, isAfter } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

function getStreakDateRange(streakDays: number, lastStudyDate: string | null): { start: Date; end: Date } | null {
  if (!lastStudyDate || streakDays <= 0) return null;
  const end = parseISO(lastStudyDate);
  const start = subDays(end, streakDays - 1);
  return { start, end };
}

function isInStreakRange(date: Date, range: { start: Date; end: Date } | null): boolean {
  if (!range) return false;
  return isAfter(date, subDays(range.start, 1)) && !isAfter(date, range.end);
}

export const WeeklyCalendar: React.FC = () => {
  const { completedLessons } = useProgressStore();
  const streakDays = useGamificationStore(s => s.streakDays);
  const lastStudyDate = useGamificationStore(s => s.lastStudyDate);

  const streakRange = useMemo(() => getStreakDateRange(streakDays, lastStudyDate), [streakDays, lastStudyDate]);

  const daysOfWeek = useMemo(() => {
    const today = new Date();
    const sunday = startOfWeek(today, { weekStartsOn: 0 });

    return Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(sunday, i);
      const dateStr = format(date, 'yyyy-MM-dd');

      const hasActivity = Object.values(completedLessons).some((lesson) => {
        if (!lesson.completedAt) return false;
        return lesson.completedAt.startsWith(dateStr);
      });

      const isToday = isSameDay(date, today);
      const onStreak = isInStreakRange(date, streakRange) && hasActivity;

      return {
        date,
        dayName: format(date, 'EEE', { locale: ptBR }).replace('.', '').substring(0, 3),
        dayNumber: format(date, 'd'),
        hasActivity,
        onStreak,
        isToday,
      };
    });
  }, [completedLessons, streakRange]);

  return (
    <div className="w-full bg-surface/50 dark:bg-surface-alt/25 border border-border/20 dark:border-border/10 rounded-3xl p-3.5 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🔥</span>
          <p className="text-[10px] font-extrabold text-text-secondary dark:text-zinc-400 uppercase tracking-widest select-none">
            Calendário de Perseverança
          </p>
        </div>
        {streakDays > 0 && (
          <span className="text-[10px] font-black text-secondary dark:text-secondary-light">
            {streakDays} 🔥
          </span>
        )}
      </div>
      <div className="grid grid-cols-7 gap-1 justify-items-center w-full">
        {daysOfWeek.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* Fire emoji for streak days */}
            {day.onStreak && (
              <span className="text-xs mb-0.5 select-none">🔥</span>
            )}

            <motion.div
              whileTap={{ scale: 0.94 }}
              className={clsx(
                'w-full max-w-[36px] h-[62px] rounded-xl flex flex-col items-center justify-around py-1.5 transition-all duration-200 relative border select-none',
                day.isToday
                  ? 'bg-[#0E0D13] dark:bg-white text-white dark:text-[#09090B] border-none shadow-md shadow-black/10 scale-105 z-10'
                  : 'bg-transparent text-text-secondary border-border/50 dark:border-border/10'
              )}
            >
              {/* Top dot indicating activity */}
              <div className="h-1 flex items-center justify-center select-none">
                {day.hasActivity ? (
                  <span className={clsx(
                    'w-1.5 h-1.5 rounded-full',
                    day.isToday ? 'bg-white dark:bg-[#09090B]' : 'bg-success'
                  )} />
                ) : (
                  day.isToday && <span className="w-1 h-1 rounded-full bg-white/30 dark:bg-black/20" />
                )}
              </div>

              <span className={clsx(
                'text-[8px] font-extrabold uppercase tracking-wide select-none',
                day.isToday ? 'text-white/60 dark:text-black/60' : 'text-text-secondary'
              )}>
                {day.dayName}
              </span>

              <span className={clsx(
                'text-[11px] font-black tracking-tight select-none',
                day.isToday ? 'text-white dark:text-[#09090B]' : 'text-text-primary'
              )}>
                {day.dayNumber}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
