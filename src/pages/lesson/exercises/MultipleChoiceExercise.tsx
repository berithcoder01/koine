import React, { useState } from 'react';
import { clsx } from 'clsx';
import { GreekText } from '@/components/greek/GreekText';
import { OptionButton, OptionState } from '@/components/exercises/OptionButton';

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
    }, 700);
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
      <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border text-center">
        {exercise.question_greek ? (
          <GreekText text={exercise.question_greek} size="xl" />
        ) : (
          <p className="text-text-primary text-xl font-semibold leading-snug">
            {exercise.question_pt}
          </p>
        )}

        {exercise.audio_url && (
          <button
            onClick={() => {
              const audio = new Audio(exercise.audio_url);
              audio.play().catch(() => {});
            }}
            className="mt-4 mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/10 text-secondary active:bg-secondary/20 transition-colors"
            aria-label="Ouvir pronúncia"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      <div className={clsx(useGrid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3')}>
        {options.map((option, index) => {
          const isGreek = /[^\u0000-\u007F]/.test(option);

          return (
            <OptionButton
              key={index}
              label={option}
              state={getState(option)}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
              isGreek={isGreek}
              fullWidth={!useGrid}
            />
          );
        })}
      </div>
    </div>
  );
};
