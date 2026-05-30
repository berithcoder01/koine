// src/pages/trail/components/WeeklyCalendar.tsx
import React, { useMemo } from 'react';
import { useProgressStore } from '@/store/progressStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export const WeeklyCalendar: React.FC = () => {
  const { completedLessons } = useProgressStore();
  const { streakDays } = useGamificationStore();

  const daysOfWeek = useMemo(() => {
    const today = new Date();
    const sunday = startOfWeek(today, { weekStartsOn: 0 });
    
    return Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(sunday, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const isCompleted = Object.values(completedLessons).some((lesson) => {
        if (!lesson.completedAt) return false;
        return lesson.completedAt.startsWith(dateStr);
      });

      const isToday = isSameDay(date, today);

      return {
        date,
        dayName: format(date, 'EEE', { locale: ptBR }).replace('.', '').substring(0, 3),
        dayNumber: format(date, 'd'),
        isCompleted,
        isToday,
      };
    });
  }, [completedLessons]);

  return (
    <div className="w-full bg-surface dark:bg-surface-alt/60 border border-border/40 dark:border-border/10 rounded-3xl p-5 shadow-sm transition-all duration-200">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-sm font-extrabold text-text-primary dark:text-white">Foco Diário</h3>
          <p className="text-[11px] text-text-secondary">Seu ritmo nesta semana</p>
        </div>
        <div className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <span>🔥</span>
          <span>{streakDays} {streakDays === 1 ? 'dia' : 'dias'}</span>
        </div>
      </div>

      <div className="flex justify-between gap-1">
        {daysOfWeek.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
            className="flex-1 flex flex-col items-center"
          >
            <motion.div
              whileTap={{ scale: 0.94 }}
              className={clsx(
                'w-10 h-20 rounded-full flex flex-col items-center justify-around py-2 transition-all duration-200 relative border',
                day.isToday
                  ? 'bg-[#0E0D13] dark:bg-white text-white dark:text-[#09090B] border-none shadow-lg shadow-black/10 scale-105 z-10'
                  : 'bg-transparent text-text-secondary border-border/50 dark:border-border/10'
              )}
            >
              {/* Top dot indicating completion */}
              <div className="h-1.5 flex items-center justify-center">
                {day.isCompleted ? (
                  <span className={clsx(
                    'w-1.5 h-1.5 rounded-full',
                    day.isToday ? 'bg-white dark:bg-[#09090B]' : 'bg-success'
                  )} />
                ) : (
                  day.isToday && <span className="w-1.5 h-1.5 rounded-full bg-white/30 dark:bg-black/20" />
                )}
              </div>

              {/* Day abbreviation (e.g. Wed) */}
              <span className={clsx(
                'text-[8px] font-extrabold uppercase tracking-wide',
                day.isToday ? 'text-white/60 dark:text-black/60' : 'text-text-secondary'
              )}>
                {day.dayName}
              </span>

              {/* Day number (e.g. 14) */}
              <span className={clsx(
                'text-xs font-black tracking-tight',
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
