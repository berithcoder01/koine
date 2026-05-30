// src/pages/lesson/exercises/NarrationExercise.tsx
import React, { useState } from 'react';
import { GreekText } from '@/components/greek/GreekText';
import { Button } from '@/components/ui/Button';
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

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface rounded-2xl p-6 shadow-sm">
        {exercise.question_greek && (
          <GreekText text={exercise.question_greek} size="md" className="mb-3" />
        )}
        <p className="text-textPrimary font-semibold">{exercise.question_pt}</p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelected(option)}
            className={clsx(
              'w-full p-4 rounded-2xl border-2 text-left transition-all',
              selected === option
                ? 'border-primary bg-primary/5'
                : 'border-border bg-surface',
            )}
          >
            <span className="text-textPrimary">{option}</span>
          </button>
        ))}
      </div>

      {selected && (
        <Button label="Verificar" onClick={handleVerify} fullWidth />
      )}
    </div>
  );
};
