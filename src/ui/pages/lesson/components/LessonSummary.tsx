import React from 'react';
import { motion } from 'framer-motion';
import { XPBadge } from '@/ui/components/XPBadge';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { Button } from '@/ui/components/Button';
import { clsx } from 'clsx';
import type { MasteryLevel } from '@/core/types/lesson.types';

interface Props {
  score: number;
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  masteryLevel?: MasteryLevel;
  onContinue: () => void;
}

const MASTERY_CONFIG: Record<MasteryLevel, {
  emoji: string; title: string; subtitle: string;
  buttonLabel: string;
  bgClass: string;
  emojiBg: string;
}> = {
  reinforcement: {
    emoji: '💪',
    title: 'Quase lá!',
    subtitle: 'Vamos reforçar o que não ficou claro ainda.',
    buttonLabel: 'Refazer Módulo',
    bgClass: 'bg-gradient-to-br from-[#FEF6EB] to-[#FBD49A] dark:from-[#18181B] dark:to-[#27272A]',
    emojiBg: 'bg-secondary',
  },
  review: {
    emoji: '📚',
    title: 'Bom progresso!',
    subtitle: 'Você avançou! Os itens difíceis entrarão em revisão.',
    buttonLabel: 'Continuar',
    bgClass: 'bg-gradient-to-br from-[#EFF5F7] to-[#C9DFE6] dark:from-[#18181B] dark:to-[#27272A]',
    emojiBg: 'bg-lagune',
  },
  mastered: {
    emoji: '🎉',
    title: 'Módulo Dominado!',
    subtitle: 'Excelente! Você dominou este conteúdo.',
    buttonLabel: 'Avançar',
    bgClass: 'bg-gradient-to-br from-[#F0F7F4] to-[#CBE5D9] dark:from-[#18181B] dark:to-[#27272A]',
    emojiBg: 'bg-success',
  },
};

export const LessonSummary: React.FC<Props> = ({
  score, correctCount, totalCount, xpEarned, masteryLevel, onContinue,
}) => {
  const config = masteryLevel ? MASTERY_CONFIG[masteryLevel] : MASTERY_CONFIG.mastered;

  return (
    <SafeArea withBottomNav={false} className={clsx('h-dvh overflow-hidden flex flex-col items-center justify-start px-6 gap-6 pt-12 pb-8', config.bgClass)}>
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className={clsx('w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl', config.emojiBg)}
      >
        <span className="text-5xl">{config.emoji}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-center"
      >
        <h1 className="text-3xl font-black text-text-primary dark:text-white mb-2 tracking-tight">
          {config.title}
        </h1>
        <p className="text-text-secondary dark:text-zinc-400 text-sm font-medium">
          {config.subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full max-w-sm grid grid-cols-3 gap-3"
      >
        <div className="bg-white dark:bg-surface rounded-2xl p-4 text-center shadow-md border border-border/30">
          <p className="text-2xl font-black text-text-primary dark:text-white">{score}%</p>
          <p className="text-xs text-text-secondary dark:text-zinc-400 mt-1 font-bold uppercase tracking-wide">Acerto</p>
        </div>
        <div className="bg-white dark:bg-surface rounded-2xl p-4 text-center shadow-md border border-border/30">
          <p className="text-2xl font-black text-success">{correctCount}</p>
          <p className="text-xs text-text-secondary dark:text-zinc-400 mt-1 font-bold uppercase tracking-wide">Corretas</p>
        </div>
        <div className="bg-white dark:bg-surface rounded-2xl p-4 text-center shadow-md border border-border/30">
          <p className="text-2xl font-black text-error">{totalCount - correctCount}</p>
          <p className="text-xs text-text-secondary dark:text-zinc-400 mt-1 font-bold uppercase tracking-wide">Erros</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <XPBadge xp={xpEarned} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="w-full max-w-sm"
      >
        <Button
          label={config.buttonLabel}
          onClick={onContinue}
          fullWidth
          size="lg"
          radius="full"
          variant="primary"
        />
      </motion.div>
    </SafeArea>
  );
};
