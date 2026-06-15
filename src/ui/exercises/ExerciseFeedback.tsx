import React, { useEffect, useState } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { dbQueries } from '@/features/database/queries';
import { Button } from '@/ui/components/Button';
import { stripGreekPunctuation } from '@/core/utils/greek';
import type { StrongEntry } from '@/core/types/greek.types';
import { renderMarkdown } from '@/core/utils/markdown';

interface ExerciseFeedbackProps {
  isCorrect: boolean;
  explanation?: string;
  correctAnswer?: string;
  onContinue: () => void;
  xpEarned?: number;
  strongGreekWord?: string;
}

export const ExerciseFeedback: React.FC<ExerciseFeedbackProps> = ({
  isCorrect,
  explanation,
  correctAnswer,
  onContinue,
  xpEarned,
  strongGreekWord,
}) => {
  const [strong, setStrong] = useState<StrongEntry | null>(null);
  const [showStrong, setShowStrong] = useState(false);

  useEffect(() => {
    if (strongGreekWord && !isCorrect) {
      const cleanWord = stripGreekPunctuation(strongGreekWord);
      dbQueries.searchStrong(cleanWord).then((results) => {
        if (results.length > 0) {
          setStrong(results[0]);
        } else {
          dbQueries.searchVocabulary(cleanWord).then((vocabResults) => {
            if (vocabResults.length > 0 && vocabResults[0].strongs_id) {
              dbQueries.getStrongById(vocabResults[0].strongs_id).then(setStrong);
            }
          });
        }
      });
    }
  }, [strongGreekWord, isCorrect]);

  useEffect(() => {
    const triggerHaptic = async () => {
      try {
        if (isCorrect) {
          await Haptics.impact({ style: ImpactStyle.Light });
        } else {
          await Haptics.impact({ style: ImpactStyle.Medium });
        }
      } catch {
        // Haptics not available (e.g. web browser)
      }
    };
    triggerHaptic();
  }, [isCorrect]);

  if (showStrong && strong) {
    return (
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 pb-8 z-30 bg-surface max-h-[60vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-primary font-extrabold">Definição Strong ({strong.id})</p>
          <button onClick={() => setShowStrong(false)} className="text-text-secondary text-sm font-bold">
            Voltar
          </button>
        </div>
        {strong.origin && (
          <p className="text-text-secondary text-xs mb-3 leading-relaxed">{strong.origin}</p>
        )}
        {strong.definitions.length > 0 && (
          <ul className="space-y-2">
            {strong.definitions.map((def, i) => (
              <li key={i} className="text-text-primary text-sm leading-relaxed pl-4 relative">
                <span className="absolute left-0 top-0 text-primary font-bold">{i + 1}.</span>
                {def}
              </li>
            ))}
          </ul>
        )}
        <Button
          label="Continuar"
          onClick={onContinue}
          fullWidth
          size="lg"
          radius="full"
          className="mt-4 bg-secondary text-zinc-900 shadow-md hover:bg-secondary-light transition-all"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={clsx(
        'fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 pb-8 z-30 shadow-2xl',
        'max-h-[70vh] overflow-y-auto transition-all duration-300',
        isCorrect
          ? 'bg-gradient-to-br from-[#F0F7F4] to-[#EFF5F7] dark:from-[#121E19] dark:to-[#0F1B1F] border-t border-success/30'
          : 'bg-gradient-to-br from-[#FBF1F0] to-[#FAF3F2] dark:from-[#221516] dark:to-[#1A0E10] border-t border-error/30'
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className={clsx(
            'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold',
            isCorrect ? 'bg-success text-zinc-900' : 'bg-error text-white',
          )}
        >
          {isCorrect ? '✓' : '✕'}
        </motion.div>
        <div>
          <p className="text-text-primary dark:text-white font-extrabold text-xl">
            {isCorrect ? 'Correto!' : 'Quase lá!'}
          </p>
          {isCorrect && xpEarned && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-success-text dark:text-success font-extrabold text-sm"
            >
              +{xpEarned} XP ganhos
            </motion.p>
          )}
        </div>
      </div>

      {!isCorrect && correctAnswer && (
        <div className="bg-black/5 dark:bg-white/10 rounded-2xl p-3 mb-3 border border-black/[0.08] dark:border-white/20">
          <p className="text-text-secondary dark:text-white/80 text-xs mb-1 font-bold uppercase tracking-wider">Resposta correta</p>
          <p className="text-text-primary dark:text-white font-extrabold font-greek text-lg">{correctAnswer}</p>
        </div>
      )}

      {explanation && (
        <p className="text-text-primary dark:text-white/90 text-sm mb-4 leading-relaxed">{renderMarkdown(explanation)}</p>
      )}

      <div className="flex gap-2">
        {strong && (
          <Button
            label="Ver Strong"
            onClick={() => setShowStrong(true)}
            variant="bordered"
            size="lg"
            radius="full"
            className="flex-1 bg-black/5 dark:bg-white/10 text-text-primary dark:text-white border-border dark:border-white/20"
          />
        )}
        <Button
          label="Continuar"
          onClick={onContinue}
          size="lg"
          radius="full"
          className={clsx(
            'bg-secondary text-zinc-900 shadow-md hover:bg-secondary-light transition-all',
            strong ? 'flex-1' : 'w-full',
          )}
        />
      </div>
    </motion.div>
  );
};
