import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GreekText } from '@/ui/greek/GreekText';
import { clsx } from 'clsx';

interface Props {
  exercise: any;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const TPRExercise: React.FC<Props> = ({ exercise, onAnswer }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const options: string[] = exercise.options ? JSON.parse(exercise.options) : [];
  const correctAnswer: string = JSON.parse(exercise.correct_answer);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect, exercise.explanation, correctAnswer);
    }, 900);
  };

  const showResult = selected !== null;

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-surface border border-secondary/20 dark:border-secondary/15 rounded-[24px] p-6 shadow-[0_2px_16px_rgba(249,185,92,0.08)] text-center relative overflow-hidden"
      >
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
        <div className="relative">
          {exercise.image_url && (
            <img src={exercise.image_url} alt="" className="w-32 h-32 mx-auto mb-4 rounded-2xl object-cover shadow-md" />
          )}
          <p className="text-text-primary text-xl font-extrabold leading-snug">
            {exercise.question_pt}
          </p>
          {exercise.question_greek && (
            <div className="mt-3">
              <GreekText text={exercise.question_greek} size="lg" />
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        className="grid grid-cols-2 gap-3"
      >
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selected;
          const isWrongShown = showResult && isSelected && !isCorrect;
          const isCorrectShown = showResult && isCorrect;

          return (
            <motion.button
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              animate={
                isWrongShown
                  ? { x: [0, -6, 6, -4, 4, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.35 }}
              onClick={() => handleSelect(option)}
              disabled={showResult}
              className={clsx(
                'relative aspect-square rounded-full border-2 font-extrabold text-center',
                'transition-all duration-200 ease-out shadow-sm',
                'flex items-center justify-center',
                'active:scale-[0.97]',
                !showResult && 'bg-white dark:bg-surface border-border/60 dark:border-border/20 text-text-primary hover:border-secondary/50 hover:shadow-md cursor-pointer',
                isCorrectShown && 'bg-gradient-to-br from-success/15 to-success/5 dark:from-success/20 dark:to-success/10 border-success text-success-text dark:text-success shadow-md',
                isWrongShown && 'bg-gradient-to-br from-error/15 to-error/5 dark:from-error/20 dark:to-error/10 border-error text-error-text dark:text-error shadow-md animate-shake',
                showResult && !isCorrectShown && !isWrongShown && 'opacity-40',
              )}
            >
              <span className="greek-text text-3xl sm:text-4xl leading-none">
                {option}
              </span>
              {isCorrectShown && (
                <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-success text-zinc-900 flex items-center justify-center text-xs font-black">
                  ✓
                </span>
              )}
              {isWrongShown && (
                <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-error text-white flex items-center justify-center text-xs font-black">
                  ✕
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
