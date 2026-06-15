import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GreekText } from '@/ui/greek/GreekText';
import { Button } from '@/ui/components/Button';
import { clsx } from 'clsx';

interface Props {
  exercise: any;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const NarrationExercise: React.FC<Props> = ({ exercise, onAnswer }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const options: string[] = exercise.options ? JSON.parse(exercise.options) : [];
  const correctAnswer: string = JSON.parse(exercise.correct_answer);

  const handleVerify = () => {
    if (!selected) return;
    const isCorrect = selected === correctAnswer;
    onAnswer(isCorrect, exercise.explanation, correctAnswer);
  };

  const getState = (option: string): 'idle' | 'correct' | 'wrong' => {
    if (selected === null) return 'idle';
    if (option === correctAnswer) return 'correct';
    if (option === selected) return 'wrong';
    return 'idle';
  };

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-surface border border-secondary/20 dark:border-secondary/15 rounded-3xl p-6 shadow-[0_2px_16px_rgba(249,185,92,0.08)] text-center relative overflow-hidden"
      >
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
        <div className="relative">
          {exercise.question_greek && (
            <div className="mb-3">
              <GreekText text={exercise.question_greek} size="md" />
            </div>
          )}
          <p className="text-text-primary text-lg font-extrabold leading-snug">
            {exercise.question_pt}
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col gap-3">
        {options.map((option, index) => {
          const state = getState(option);
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelected(option)}
              disabled={selected !== null}
              className={clsx(
                'w-full p-4 rounded-full border-2 text-left transition-all duration-200',
                'font-extrabold shadow-sm active:scale-[0.98]',
                state === 'idle' && 'bg-white dark:bg-surface border-border/60 dark:border-border/20 text-text-primary hover:border-secondary/50 hover:shadow-md',
                state === 'correct' && 'bg-gradient-to-br from-success/15 to-success/5 dark:from-success/20 dark:to-success/10 border-success text-success-text dark:text-success shadow-md',
                state === 'wrong' && 'bg-gradient-to-br from-error/15 to-error/5 dark:from-error/20 dark:to-error/10 border-error text-error-text dark:text-error shadow-md',
              )}
            >
              <span className="flex-1 break-words leading-snug">{option}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
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
      </AnimatePresence>
    </div>
  );
};
