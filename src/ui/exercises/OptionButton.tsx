import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export type OptionState = 'idle' | 'correct' | 'wrong';

interface Props {
  label: string;
  state: OptionState;
  onClick: () => void;
  disabled?: boolean;
  isGreek?: boolean;
  fullWidth?: boolean;
  index?: number;
  compact?: boolean;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const OptionButton: React.FC<Props> = ({
  label,
  state,
  onClick,
  disabled = false,
  isGreek = false,
  index = 0,
  compact = false,
}) => {
  const letter = OPTION_LETTERS[index] ?? String(index + 1);

  const stateStyles: Record<OptionState, string> = {
    idle: clsx(
      'bg-white dark:bg-surface',
      'border-[1.5px] border-zinc-200/80 dark:border-zinc-700/40',
      'text-text-primary',
      'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
      'hover:border-secondary/50 hover:shadow-[0_2px_8px_rgba(249,185,92,0.12)]',
    ),
    correct: clsx(
      'bg-gradient-to-br from-success/15 to-success/5 dark:from-success/20 dark:to-success/10',
      'border-[1.5px] border-success',
      'text-success-text dark:text-success',
      'shadow-[0_2px_12px_rgba(150,199,179,0.15)]',
    ),
    wrong: clsx(
      'bg-gradient-to-br from-error/15 to-error/5 dark:from-error/20 dark:to-error/10',
      'border-[1.5px] border-error',
      'text-error-text dark:text-error',
      'shadow-[0_2px_12px_rgba(215,137,127,0.15)]',
    ),
  };

  const badgeStyles: Record<OptionState, string> = {
    idle: clsx(
      'bg-gradient-to-br from-secondary/35 to-secondary/15 dark:from-secondary/20 dark:to-secondary/10',
      'text-zinc-800 dark:text-secondary',
      'ring-1 ring-secondary/20 dark:ring-secondary/30',
    ),
    correct: 'bg-success text-zinc-900 ring-1 ring-success/30 font-bold',
    wrong: 'bg-error text-white ring-1 ring-error/30 font-bold',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled && state === 'idle'}
      whileTap={state === 'idle' && !disabled ? { scale: 0.97 } : undefined}
      animate={
        state === 'wrong'
          ? { x: [0, -6, 6, -4, 4, 0] }
          : state === 'correct'
          ? { scale: [1, 1.02, 1] }
          : { x: 0 }
      }
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={clsx(
        'w-full relative flex items-center gap-3 rounded-full text-left',
        'transition-all duration-200 ease-out',
        stateStyles[state],
        disabled && state === 'idle' && 'opacity-45 cursor-not-allowed',
        !disabled && 'active:shadow-lg cursor-pointer',
        compact ? 'px-3 py-3 min-h-[52px]' : 'px-4 py-4 min-h-[60px]',
      )}
    >
      {/* Letter Badge — fully round */}
      <span
        className={clsx(
          'shrink-0 flex items-center justify-center rounded-full',
          'font-extrabold tracking-tight select-none',
          compact ? 'w-7 h-7 text-[11px]' : 'w-8 h-8 text-xs',
          badgeStyles[state],
        )}
      >
        {state === 'correct' ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : state === 'wrong' ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="4" y1="4" x2="20" y2="20"/>
            <line x1="20" y1="4" x2="4" y2="20"/>
          </svg>
        ) : (
          letter
        )}
      </span>

      {/* Label */}
      <span
        className={clsx(
          'flex-1 font-semibold leading-snug break-words min-w-0',
          compact ? 'text-sm' : 'text-base',
          isGreek && 'font-greek text-lg sm:text-xl',
          state === 'idle' && 'text-text-primary dark:text-zinc-200',
        )}
      >
        {label}
      </span>
    </motion.button>
  );
};
