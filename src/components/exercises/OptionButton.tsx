import React from 'react';
import { clsx } from 'clsx';

export type OptionState = 'idle' | 'selected' | 'correct' | 'wrong';

interface OptionButtonProps {
  label: string;
  state?: OptionState;
  onClick: () => void;
  disabled?: boolean;
  isGreek?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const stateStyles: Record<OptionState, string> = {
  idle:     'bg-surface border-border text-text-primary active:bg-surface-alt',
  selected: 'bg-surface border-text-primary text-text-primary',
  correct:  'bg-success/10 border-success text-success',
  wrong:    'bg-error/10 border-error text-error animate-shake',
};

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  state = 'idle',
  onClick,
  disabled = false,
  isGreek = false,
  fullWidth = false,
  className,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      'border-2 rounded-2xl px-4 py-4 text-center transition-all duration-150',
      'font-semibold text-base min-h-[56px]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      isGreek && 'font-greek',
      fullWidth && 'w-full',
      stateStyles[state],
      className,
    )}
  >
    {label}
  </button>
);
