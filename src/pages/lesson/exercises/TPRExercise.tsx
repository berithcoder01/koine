// src/pages/lesson/exercises/TPRExercise.tsx
import React, { useState } from 'react';
import { GreekText } from '@/components/greek/GreekText';
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
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface rounded-2xl p-6 shadow-sm text-center">
        {exercise.image_url && (
          <img src={exercise.image_url} alt="" className="w-32 h-32 mx-auto mb-4 rounded-xl object-cover" />
        )}
        <p className="text-text-primary text-xl font-semibold">{exercise.question_pt}</p>
        {exercise.question_greek && (
          <GreekText text={exercise.question_greek} size="lg" className="mt-2" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
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
                'p-4 rounded-2xl border-2 text-center transition-all greek-text text-lg',
                bgClass,
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
