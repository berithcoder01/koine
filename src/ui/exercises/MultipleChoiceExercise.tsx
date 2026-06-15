import React, { useState } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { GreekText } from '@/ui/greek/GreekText';
import { OptionButton, OptionState } from '@/ui/exercises/OptionButton';

interface Props {
  exercise: any;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const MultipleChoiceExercise: React.FC<Props> = ({
  exercise,
  options,
  correctAnswer,
  onAnswer,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (selected !== null) return;
    setSelected(option);
    const isCorrect = option === correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect, exercise.explanation, correctAnswer);
    }, 900);
  };

  const getState = (option: string): OptionState => {
    if (selected === null) return 'idle';
    if (option === correctAnswer) return 'correct';
    if (option === selected) return 'wrong';
    return 'idle';
  };

  const useGrid = options.length === 4;

  return (
    <div className="flex flex-col gap-5">
      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={clsx(
          'bg-white dark:bg-surface',
          'border border-secondary/20 dark:border-secondary/15',
          'rounded-[24px] p-6',
          'shadow-[0_2px_16px_rgba(249,185,92,0.08)]',
          'text-center relative overflow-hidden',
        )}
      >
        {/* Decorative glows - blended colors */}
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-lagune/8 blur-2xl pointer-events-none" />
 
        {exercise.question_greek ? (
          <GreekText text={exercise.question_greek} size="xl" className="relative" />
        ) : (
          <p className="text-text-primary dark:text-zinc-100 text-lg font-bold leading-relaxed relative">
            {exercise.question_pt}
          </p>
        )}
 
        {exercise.audio_url && (
          <button
            onClick={() => {
              const audio = new Audio(exercise.audio_url);
              audio.play().catch(() => {});
            }}
            className={clsx(
              'mt-4 mx-auto flex items-center justify-center',
              'w-12 h-12 !rounded-full',
              'bg-gradient-to-br from-secondary to-[#E5A850]',
              'text-zinc-900 shadow-md',
              'active:scale-95 transition-transform',
            )}
            aria-label="Ouvir pronúncia"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </motion.div>

      {/* Options */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className={clsx(
          useGrid
            ? 'grid grid-cols-2 gap-2.5'
            : 'flex flex-col gap-2.5',
        )}
      >
        {options.map((option, index) => {
          const isGreek = /[^\u0000-\u007F]/.test(option);
          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <OptionButton
                label={option}
                state={getState(option)}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
                isGreek={isGreek}
                fullWidth={!useGrid}
                index={index}
                compact={useGrid}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
