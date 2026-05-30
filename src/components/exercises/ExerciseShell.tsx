import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SafeArea } from '@/components/layout/SafeArea';

interface ExerciseShellProps {
  instruction: string;
  progress: number;
  stepLabel: string;
  onExit: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export const ExerciseShell: React.FC<ExerciseShellProps> = ({
  instruction,
  progress,
  stepLabel,
  onExit,
  children,
  footer,
}) => (
  <SafeArea withBottomNav={false} className="h-dvh overflow-hidden flex flex-col bg-background">
    <div className="flex items-center gap-4 px-4 pt-4 pb-3 bg-surface border-b border-border">
      <button
        onClick={onExit}
        className="w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:bg-surface-alt transition-colors"
        aria-label="Sair da lição"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="flex-1">
        <ProgressBar value={progress} color="bg-secondary" height={8} />
      </div>

      <span className="text-xs text-text-secondary font-semibold tabular-nums min-w-[28px] text-right">
        {stepLabel}
      </span>
    </div>

    <div className="flex-1 flex flex-col px-4 pt-6 pb-4 gap-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-text-primary leading-snug">
        {instruction}
      </h2>

      {children}
    </div>

    <div className="px-4 pb-safe pb-6 pt-3 bg-surface border-t border-border">
      {footer}
    </div>
  </SafeArea>
);
