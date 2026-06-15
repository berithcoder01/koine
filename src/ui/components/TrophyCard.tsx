import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { TrophyTier, TrophyDef, getTrophyTierDef } from '@/core/constants/trophies';
import { GreekText } from '@/ui/greek/GreekText';

interface TrophyCardProps {
  trophy: TrophyDef;
  tier: TrophyTier;
  progressPercent: number;
  index: number;
}

export const TrophyCard: React.FC<TrophyCardProps> = ({
  trophy,
  tier,
  progressPercent,
  index,
}) => {
  const tierDef = tier !== 'none' ? getTrophyTierDef(tier) : null;
  const isOuro = tier === 'ouro';
  const isLocked = tier === 'none';

  const tierColors: Record<TrophyTier, { bg: string; border: string; glow: string; barColor: string }> = {
    none: {
      bg: 'bg-surface dark:bg-surface-alt',
      border: 'border-border/30 dark:border-border/10',
      glow: '',
      barColor: 'bg-zinc-300 dark:bg-zinc-600',
    },
    bronze: {
      bg: 'bg-amber-900/10 dark:bg-amber-900/5',
      border: 'border-amber-700/30 dark:border-amber-800/20',
      glow: 'shadow-[0_0_20px_rgba(205,127,50,0.15)]',
      barColor: 'bg-amber-700',
    },
    prata: {
      bg: 'bg-zinc-200/30 dark:bg-zinc-400/5',
      border: 'border-zinc-400/40 dark:border-zinc-500/20',
      glow: 'shadow-[0_0_20px_rgba(168,169,173,0.2)]',
      barColor: 'bg-zinc-400',
    },
    ouro: {
      bg: 'bg-yellow-500/10 dark:bg-yellow-500/5',
      border: 'border-yellow-500/40 dark:border-yellow-500/20',
      glow: 'shadow-[0_0_25px_rgba(255,215,0,0.2)]',
      barColor: 'bg-yellow-500',
    },
  };

  const colors = tierColors[tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
      className={clsx(
        'rounded-3xl border p-5 transition-all duration-300',
        colors.bg,
        colors.border,
        isOuro && colors.glow,
        isLocked && 'opacity-60',
      )}
    >
      {/* Trophy icon + tier badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx(
            'w-14 h-14 rounded-2xl flex items-center justify-center text-3xl',
            isLocked
              ? 'bg-zinc-200/50 dark:bg-zinc-700/30'
              : tier === 'ouro'
                ? 'bg-gradient-to-br from-yellow-400/30 to-amber-500/20'
                : tier === 'prata'
                  ? 'bg-gradient-to-br from-zinc-300/30 to-zinc-400/10'
                  : 'bg-gradient-to-br from-amber-700/20 to-amber-800/10',
          )}>
            {isLocked ? '🔒' : tierDef?.icon ?? '🏆'}
          </div>
          <div>
            {tierDef ? (
              <>
                <span
                  className={clsx('text-xs font-extrabold uppercase tracking-wider', {
                    'text-amber-700 dark:text-amber-500': tier === 'bronze',
                    'text-zinc-500 dark:text-zinc-400': tier === 'prata',
                    'text-yellow-600 dark:text-yellow-400': tier === 'ouro',
                  })}
                >
                  {tierDef.label}
                </span>
                <p className="text-text-primary dark:text-white font-black text-base leading-tight mt-0.5">
                  {tierDef.subtitle}
                </p>
              </>
            ) : (
              <>
                <span className="text-xs text-text-secondary font-extrabold uppercase tracking-wider">
                  Bloqueado
                </span>
                <p className="text-text-primary dark:text-white font-bold text-sm mt-0.5">
                  Comece o Ciclo {trophy.cycleId}
                </p>
              </>
            )}
          </div>
        </div>

        {/* XP reward badge */}
        <span className={clsx(
          'text-xs font-extrabold px-2.5 py-1 rounded-full shrink-0',
          isLocked
            ? 'bg-border/30 text-text-secondary'
            : tier === 'ouro'
              ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
              : tier === 'prata'
                ? 'bg-zinc-300/20 text-zinc-500 dark:text-zinc-400'
                : 'bg-amber-700/15 text-amber-700 dark:text-amber-500',
        )}>
          {trophy.cycleId * 50} XP
        </span>
      </div>

      {/* Verse display */}
      {isOuro ? (
        <div className="bg-black/10 dark:bg-white/5 rounded-2xl p-4 mb-4">
          <GreekText text={trophy.verse} size="sm" color="text-text-primary dark:text-white" />
          <p className="text-text-secondary dark:text-zinc-500 text-xs mt-2 font-medium">
            {trophy.reference}
          </p>
        </div>
      ) : (
        <div className="bg-zinc-200/30 dark:bg-zinc-700/20 rounded-2xl p-4 mb-4">
          {isLocked ? (
            <p className="text-text-secondary text-sm font-medium">
              Complete os {trophy.cycleId === 1 ? '10' : '8'} módulos do Ciclo {trophy.cycleId} para desbloquear
            </p>
          ) : (
            <p className="text-text-secondary text-sm font-medium">
              Complete mais módulos para evoluir seu troféu
            </p>
          )}
          <p className="text-text-secondary text-xs mt-2 opacity-60">{trophy.reference}</p>
        </div>
      )}

      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-text-secondary font-bold">
            {Math.round(progressPercent)}% do ciclo
          </span>
          {tierDef && (
            <span className="text-xs text-text-secondary font-medium">
              {tier === 'bronze' && '→ Prata'}
              {tier === 'prata' && '→ Ouro'}
              {tier === 'ouro' && '✨ Completo!'}
            </span>
          )}
        </div>
        <div className="w-full bg-border/20 dark:bg-border/10 rounded-full overflow-hidden" style={{ height: '6px' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, progressPercent)}%` }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: 'easeOut' }}
            className={clsx('h-full rounded-full', colors.barColor)}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface DiamondTrophyCardProps {
  allOuro: boolean;
  index: number;
}

export const DiamondTrophyCard: React.FC<DiamondTrophyCardProps> = ({ allOuro, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
      className={clsx(
        'rounded-3xl border p-5 transition-all duration-300',
        allOuro
          ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-400/30 shadow-[0_0_30px_rgba(185,242,255,0.15)]'
          : 'bg-surface dark:bg-surface-alt border-border/30 dark:border-border/10 opacity-50',
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx(
            'w-14 h-14 rounded-2xl flex items-center justify-center text-3xl',
            allOuro
              ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/10'
              : 'bg-zinc-200/50 dark:bg-zinc-700/30',
          )}>
            {allOuro ? '💎' : '🔒'}
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Diamante
            </span>
            <p className="text-text-primary dark:text-white font-black text-base leading-tight mt-0.5">
              Lenda do Koiné
            </p>
          </div>
        </div>
        <span className={clsx(
          'text-xs font-extrabold px-2.5 py-1 rounded-full shrink-0',
          allOuro
            ? 'bg-cyan-400/20 text-cyan-600 dark:text-cyan-400'
            : 'bg-border/30 text-text-secondary',
        )}>
          1000 XP
        </span>
      </div>

      <div className={clsx(
        'rounded-2xl p-4 mb-4',
        allOuro
          ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/5'
          : 'bg-zinc-200/30 dark:bg-zinc-700/20',
      )}>
        <p className="text-text-secondary text-sm font-medium">
          {allOuro
            ? 'Todos os troféus de ouro foram conquistados!'
            : 'Desbloqueie todos os troféus de ouro para conquistar o Diamante'}
        </p>
      </div>

      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-text-secondary font-bold">
          {allOuro ? '3/3 Ouros' : 'Conquiste todos os ouros'}
        </span>
        {allOuro && (
          <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">✨ Completo!</span>
        )}
      </div>
    </motion.div>
  );
};
