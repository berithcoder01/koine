import React from 'react';
import { ProgressBar } from '@/ui/components/ProgressBar';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ExerciseShellProps {
  instruction: string;
  progress: number;
  stepLabel: string;
  onExit: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const PHASE_THEMES: Record<number, { color: string; bg: string; chipBg: string; chipText: string; barColor: string }> = {
  2: {
    color: 'text-lagune',
    bg: 'from-[#6398A9]/15 via-[#6398A9]/5 to-transparent dark:from-[#6398A9]/20 dark:via-[#6398A9]/5 dark:to-transparent',
    chipBg: 'bg-lagune',
    chipText: 'text-white',
    barColor: 'bg-lagune',
  },
  3: {
    color: 'text-secondary',
    bg: 'from-[#F9B95C]/15 via-[#F9B95C]/5 to-transparent dark:from-[#F9B95C]/20 dark:via-[#F9B95C]/5 dark:to-transparent',
    chipBg: 'bg-gradient-to-r from-[#F9B95C] to-[#E5A850]',
    chipText: 'text-white',
    barColor: 'bg-secondary',
  },
  4: {
    color: 'text-error', // Nectarine mapped to error semantically
    bg: 'from-[#D7897F]/15 via-[#D7897F]/5 to-transparent dark:from-[#D7897F]/20 dark:via-[#D7897F]/5 dark:to-transparent',
    chipBg: 'bg-gradient-to-r from-[#F9B95C] to-[#D7897F]',
    chipText: 'text-white',
    barColor: 'bg-error',
  },
  5: {
    color: 'text-success', // Menthe mapped to success semantically
    bg: 'from-[#96C7B3]/15 via-[#96C7B3]/5 to-transparent dark:from-[#96C7B3]/20 dark:via-[#96C7B3]/5 dark:to-transparent',
    chipBg: 'bg-success',
    chipText: 'text-zinc-900 font-bold',
    barColor: 'bg-success',
  },
};

/* SVG Phase Icons — crisp inline vectors instead of emojis */
const PhaseIcon: React.FC<{ phase: number; className?: string }> = ({ phase, className = '' }) => {
  const cn = clsx('shrink-0', className);
  switch (phase) {
    case 2: // Recognition — Eye
      return (
        <svg className={cn} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      );
    case 3: // Association — Link
      return (
        <svg className={cn} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      );
    case 4: // Recall — Brain
      return (
        <svg className={cn} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
          <line x1="9" y1="21" x2="15" y2="21"/>
          <line x1="10" y1="24" x2="14" y2="24"/>
        </svg>
      );
    case 5: // Application — Bolt
      return (
        <svg className={cn} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      );
    default:
      return null;
  }
};

function getPhaseFromInstruction(instruction: string): number {
  if (instruction.startsWith('Reconhecimento')) return 2;
  if (instruction.startsWith('Associação')) return 3;
  if (instruction.startsWith('Recordação')) return 4;
  if (instruction.startsWith('Aplicação')) return 5;
  return 2;
}

function getPhaseLabel(instruction: string): string {
  return instruction.split('—')[0].trim();
}

function getUnitLabel(instruction: string): string {
  const parts = instruction.split('—');
  return parts[1]?.trim() ?? '';
}

export const ExerciseShell: React.FC<ExerciseShellProps> = ({
  instruction,
  progress,
  stepLabel,
  onExit,
  children,
  footer,
}) => {
  const phase = getPhaseFromInstruction(instruction);
  const theme = PHASE_THEMES[phase] ?? PHASE_THEMES[2];
  const phaseLabel = getPhaseLabel(instruction);
  const unitLabel = getUnitLabel(instruction);

  return (
    <SafeArea withBottomNav={false} className="h-dvh overflow-hidden flex flex-col bg-background">
      {/* ── Header Premium ── */}
      <div className={clsx(
        'flex-shrink-0 px-4 pt-3 pb-3',
        'bg-gradient-to-br backdrop-blur-sm',
        'border-b border-black/[0.04] dark:border-white/[0.06]',
        theme.bg,
      )}>
        {/* Row 1: Close · Phase Chip · Step Counter */}
        <div className="flex items-center gap-2.5 mb-2.5">
          {/* Close Button */}
          <button
            onClick={onExit}
            className={clsx(
              'w-8 h-8 flex items-center justify-center !rounded-full',
              'bg-white/70 dark:bg-white/10 backdrop-blur-sm',
              'text-text-secondary dark:text-zinc-400',
              'shadow-sm active:scale-90 transition-all duration-150',
            )}
            aria-label="Sair da lição"
          >
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Phase Chip — Pill shape */}
          <motion.div
            key={phase}
            initial={{ opacity: 0, scale: 0.92, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={clsx(
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full',
              'text-[10px] font-black uppercase tracking-[0.08em]',
              'shadow-sm',
              theme.chipBg, theme.chipText,
            )}
          >
            <PhaseIcon phase={phase} />
            {phaseLabel}
          </motion.div>

          <div className="flex-1" />

          {/* Step Counter */}
          <span className={clsx(
            'text-[11px] font-bold tabular-nums',
            'bg-white/60 dark:bg-white/10 backdrop-blur-sm',
            'text-text-primary dark:text-zinc-300',
            'px-2.5 py-1 rounded-full',
          )}>
            {stepLabel}
          </span>
        </div>

        {/* Row 2: Unit Label + Progress Bar */}
        <div className="flex items-center gap-3">
          <motion.span
            key={unitLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={clsx(
              'text-[10px] font-extrabold uppercase tracking-wider shrink-0',
              theme.color,
            )}
          >
            {unitLabel}
          </motion.span>
          <div className="flex-1">
            <ProgressBar value={progress} color={theme.barColor} height={5} />
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="flex-1 flex flex-col px-4 pt-6 pb-4 gap-6 overflow-y-auto">
        {children}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 pb-safe pb-6 pt-3 bg-surface dark:bg-surface-alt border-t border-border dark:border-border/20">
        {footer}
      </div>
    </SafeArea>
  );
};
