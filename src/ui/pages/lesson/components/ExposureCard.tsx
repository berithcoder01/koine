import React from 'react';
import { motion } from 'framer-motion';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { Button } from '@/ui/components/Button';
import { GreekText } from '@/ui/greek/GreekText';
import { clsx } from 'clsx';
import type { LearningUnit } from '@/core/types/lesson.types';
import { renderMarkdown } from '@/core/utils/markdown';

interface Props {
  unit: LearningUnit;
  onContinue: () => void;
  unitNumber: number;
  totalUnits: number;
  isAudioPlaying?: boolean;
}

export const ExposureCard: React.FC<Props> = ({ unit, onContinue, unitNumber, totalUnits, isAudioPlaying }) => {
  return (
    <SafeArea withBottomNav={false} className="h-dvh overflow-hidden flex flex-col bg-[#FAF9F6] dark:from-[#09090B] dark:to-[#18181B]">
      <div className="flex items-center gap-3 px-4 pt-4">
        <div className="flex-1 flex gap-1">
          {Array.from({ length: totalUnits }, (_, i) => (
            <div
              key={i}
              className={clsx(
                'flex-1 h-1.5 rounded-full transition-colors',
                i < unitNumber - 1 ? 'bg-secondary' :
                i === unitNumber - 1 ? 'bg-secondary/40' :
                'bg-border/40 dark:bg-border/20',
              )}
            />
          ))}
        </div>
        <span className="text-xs text-text-primary dark:text-white font-extrabold tabular-nums bg-white/70 dark:bg-surface/70 px-2.5 py-1 rounded-full shadow-sm">
          {unitNumber}/{totalUnits}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-6 gap-6 overflow-y-auto py-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="bg-gradient-to-br from-secondary to-lagune rounded-[2rem] w-52 h-52 flex items-center justify-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/30 blur-3xl pointer-events-none" />
          <span className="text-[#1A1A1A] text-7xl font-greek font-bold relative">
            {unit.greekForm}
          </span>
        </motion.div>

        <div className="text-center">
          <p className="text-secondary font-extrabold text-xl mb-1">{unit.transliteration}</p>
          <p className="text-text-primary dark:text-zinc-100 font-extrabold text-2xl mb-3">{unit.glossPT}</p>
          {unit.phoneticSound && (
            <p className="text-text-secondary dark:text-zinc-400 text-base font-medium">
              Som: {unit.phoneticSound}
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-surface rounded-2xl p-4 w-full shadow-md border border-border/30">
          <p className="text-text-primary dark:text-zinc-200 text-sm leading-relaxed font-medium">
            {renderMarkdown(unit.explanation)}
          </p>
        </div>

        {unit.mnemonicHint && (
          <div className="bg-white dark:bg-surface rounded-2xl p-4 w-full border border-secondary/20 dark:border-secondary/15 shadow-sm">
            <p className="text-zinc-800 dark:text-secondary text-xs font-black uppercase tracking-wider mb-1.5">
              💡 Dica
            </p>
            <p className="text-text-primary dark:text-zinc-200 text-sm font-medium leading-relaxed">
              {renderMarkdown(unit.mnemonicHint)}
            </p>
          </div>
        )}

        {unit.contextVerse && (
          <div className="w-full text-center bg-white dark:bg-surface rounded-2xl p-4 shadow-sm border border-border/30">
            <GreekText text={unit.contextVerse} size="lg" />
            <p className="text-text-secondary dark:text-zinc-400 text-xs mt-2 font-medium">
              {unit.contextReference}
            </p>
          </div>
        )}
      </div>

      <div className="px-6 pb-safe pb-6 space-y-2">
        {isAudioPlaying && (
          <div className="flex items-center justify-center gap-2 text-xs text-text-secondary dark:text-zinc-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            Áudio de exposição em reprodução
          </div>
        )}
        <Button
          label="Entendido, próximo →"
          onClick={onContinue}
          fullWidth
          size="lg"
          radius="full"
          className="bg-secondary text-zinc-900 shadow-md hover:bg-secondary-light transition-all"
        />
      </div>
    </SafeArea>
  );
};
