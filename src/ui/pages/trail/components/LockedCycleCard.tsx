import React from 'react';
import { clsx } from 'clsx';
import { CYCLES } from '@/content/curriculum/cycles';

interface LockedCycleCardProps {
  cycleId: number;
  requiredCycleId: number;
}

const CYCLE_EMOJIS: Record<number, string> = {
  1: '🆎', 2: '📝', 3: '🏛️', 4: '🏃',
  5: '📚', 6: '⏳', 7: '🔗', 8: '📖',
};

const CYCLE_TAGS: Record<number, string> = {
  1: 'Alfabeto', 2: 'Verbos', 3: 'Casos',
  4: 'Conjugação', 5: 'Adjetivos', 6: 'Tempos',
  7: 'Preposições', 8: 'Leitura',
};

export const LockedCycleCard: React.FC<LockedCycleCardProps> = ({ cycleId, requiredCycleId }) => {
  const cycleInfo = CYCLES.find(c => c.id === cycleId);
  const isPremium = cycleInfo?.isPremium === 1;

  return (
    <div className={clsx(
      'relative overflow-hidden rounded-3xl border-2 border-dashed select-none',
      'bg-zinc-100/60 dark:bg-zinc-900/40',
      'border-zinc-300/60 dark:border-zinc-700/40',
    )}>
      <div className="p-5 flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center border-2 border-zinc-300 dark:border-zinc-700 shadow-inner">
            <span className="text-3xl opacity-60">{CYCLE_EMOJIS[cycleId] ?? '📦'}</span>
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-6 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center border-2 border-zinc-100 dark:border-zinc-900">
            <span className="text-xs">🔒</span>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
              Ciclo {cycleId}
            </span>
            {isPremium && (
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Premium
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 leading-tight">
            {cycleInfo?.title ?? `Ciclo ${cycleId}`}
          </h3>
          <p className="text-[10px] text-zinc-300 dark:text-zinc-600 mt-1 font-medium">
            {CYCLE_TAGS[cycleId] ?? ''}
          </p>
        </div>

        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />

        <p className="text-[11px] text-zinc-400 dark:text-zinc-600 text-center font-medium leading-relaxed">
          Complete o <strong className="text-zinc-500 dark:text-zinc-400">Ciclo {requiredCycleId}</strong> para desbloquear
        </p>

        <div className="flex items-center gap-1.5 text-[10px] text-zinc-300 dark:text-zinc-600">
          <span className="font-semibold">{cycleInfo?.totalModules ?? '?'} módulos</span>
          <span>·</span>
          <span>Premium</span>
        </div>
      </div>

      {isPremium && (
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-28 h-7 bg-gradient-to-r from-amber-400 to-amber-500 rotate-45 translate-x-8 -translate-y-2" />
        </div>
      )}
    </div>
  );
};
