// src/pages/lesson/exercises/FlashcardExercise.tsx
import React, { useState } from 'react';
import { GreekText } from '@/components/greek/GreekText';
import { Button } from '@/components/ui/Button';

interface Props {
  exercise: any;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const FlashcardExercise: React.FC<Props> = ({ exercise, onAnswer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <p className="text-textSecondary text-sm font-medium uppercase tracking-wide">
        Toque para revelar
      </p>

      <button
        onClick={() => setFlipped(true)}
        className="w-full max-w-sm aspect-[3/2] rounded-3xl shadow-lg transition-all duration-300"
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 bg-primary rounded-3xl flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <GreekText
              text={exercise.question_greek ?? exercise.question_pt}
              size="xl"
              color="text-white"
            />
          </div>

          <div
            className="absolute inset-0 bg-surface rounded-3xl flex flex-col items-center justify-center p-6 gap-3"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-primary font-bold text-2xl text-center">
              {JSON.parse(exercise.correct_answer)}
            </p>
            {exercise.hint_text && (
              <p className="text-textSecondary text-sm text-center">{exercise.hint_text}</p>
            )}
          </div>
        </div>
      </button>

      {flipped && (
        <div className="flex gap-3 w-full max-w-sm animate-fadeIn">
          <Button label="Não sabia" onClick={() => onAnswer(false)} variant="outline" fullWidth />
          <Button label="Sabia ✓" onClick={() => onAnswer(true)} variant="primary" fullWidth />
        </div>
      )}
    </div>
  );
};
