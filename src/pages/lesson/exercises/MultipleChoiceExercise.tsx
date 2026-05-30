// src/pages/lesson/exercises/MultipleChoiceExercise.tsx
import React, { useState } from 'react';
import { GreekText } from '@/components/greek/GreekText';
import { clsx } from 'clsx';

interface Props {
  exercise: any;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const MultipleChoiceExercise: React.FC<Props> = ({
  exercise, options, correctAnswer, onAnswer,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect, exercise.explanation, correctAnswer);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface rounded-2xl p-6 shadow-sm text-center">
        {exercise.question_greek ? (
          <GreekText text={exercise.question_greek} size="lg" />
        ) : (
          <p className="text-textPrimary text-xl font-semibold">{exercise.question_pt}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selected;

          let bgClass = 'bg-surface border-border';
          if (selected) {
            if (isCorrect) bgClass = 'bg-success/10 border-success';
            else if (isSelected && !isCorrect) bgClass = 'bg-error/10 border-error';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={clsx(
                'w-full p-4 rounded-2xl border-2 text-left transition-all',
                'flex items-center gap-3',
                bgClass,
              )}
            >
              <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-sm font-bold text-textSecondary">
                {String.fromCharCode(65 + index)}
              </span>
              <span className={clsx(
                'greek-text text-lg flex-1',
                selected && isCorrect && 'text-success font-bold',
                selected && isSelected && !isCorrect && 'text-error',
              )}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
