import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/ui/components/Button';

interface Props {
  exercise: any;
  correctAnswer: string[];
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const WordOrderExercise: React.FC<Props> = ({
  exercise,
  correctAnswer,
  onAnswer,
}) => {
  const [available, setAvailable] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...correctAnswer].sort(() => Math.random() - 0.5);
    setAvailable(shuffled);
  }, []);

  const handleVerify = () => {
    const isCorrect = selected.join(' ') === correctAnswer.join(' ');
    onAnswer(isCorrect, exercise.explanation, correctAnswer.join(' '));
  };

  const addWord = (word: string, fromIndex: number) => {
    setAvailable(prev => prev.filter((_, i) => i !== fromIndex));
    setSelected(prev => [...prev, word]);
  };

  const removeWord = (word: string, fromIndex: number) => {
    setSelected(prev => prev.filter((_, i) => i !== fromIndex));
    setAvailable(prev => [...prev, word]);
  };

  const isGreek = correctAnswer.some(w => /[^\u0000-\u007F]/.test(w));

  return (
    <div className="flex flex-col gap-5">
      {exercise.question_pt && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-surface border border-secondary/20 dark:border-secondary/15 rounded-[24px] p-5 shadow-[0_2px_16px_rgba(249,185,92,0.08)] text-center relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
          <p className="text-text-primary text-base font-extrabold leading-snug relative">
            {exercise.question_pt}
          </p>
        </motion.div>
      )}

      <div
        className={clsx(
          'min-h-[88px] bg-gradient-to-br from-white to-[#FAFAF8] dark:from-surface dark:to-surface-alt',
          'border-2 rounded-3xl p-4',
          'flex flex-wrap gap-2 items-start content-start',
          'transition-all duration-200 shadow-sm',
          selected.length > 0
            ? 'border-secondary/60 shadow-md'
            : 'border-dashed border-border/60',
        )}
      >
        {selected.length === 0 && (
          <p className="text-text-disabled text-sm w-full text-center self-center py-3 font-medium">
            Toque nas palavras abaixo para montar a frase
          </p>
        )}
        <AnimatePresence mode="popLayout">
          {selected.map((word, i) => (
            <motion.button
              key={`sel-${i}-${word}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => removeWord(word, i)}
              className={clsx(
                'px-4 py-2.5 rounded-full font-extrabold shadow-sm',
                'bg-gradient-to-br from-secondary to-[#E5A850] text-zinc-900 border-2 border-secondary',
                'active:scale-95 transition-transform',
                isGreek && 'font-greek text-lg',
              )}
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <AnimatePresence mode="popLayout">
          {available.map((word, i) => (
            <motion.button
              key={`av-${i}-${word}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => addWord(word, i)}
              className={clsx(
                'px-4 py-2.5 rounded-full font-bold border-2 shadow-sm',
                'bg-white dark:bg-surface border-border/60 dark:border-border/20 text-text-primary',
                'hover:border-secondary/50 active:scale-95 transition-all',
                isGreek && 'font-greek text-lg',
              )}
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {selected.length === correctAnswer.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            label="VERIFICAR"
            onClick={handleVerify}
            fullWidth
            size="lg"
            radius="full"
            className="bg-secondary text-zinc-900 shadow-md hover:bg-secondary-light transition-all"
          />
        </motion.div>
      )}
    </div>
  );
};
