// src/pages/lesson/exercises/FillBlankExercise.tsx
import React, { useState } from 'react';
import { GreekText } from '@/components/greek/GreekText';
import { Button } from '@/components/ui/Button';

interface Props {
  exercise: any;
  correctAnswer: string;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const FillBlankExercise: React.FC<Props> = ({ exercise, correctAnswer, onAnswer }) => {
  const [input, setInput] = useState('');

  const handleVerify = () => {
    const normalized = input.trim().toLowerCase();
    const expected = correctAnswer.toLowerCase();
    const isCorrect = normalized === expected;
    onAnswer(isCorrect, exercise.explanation, correctAnswer);
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

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-textSecondary">Sua resposta:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua resposta..."
          className="w-full bg-surface border-2 border-border rounded-xl px-4 py-3 text-textPrimary greek-text text-lg outline-none focus:border-primary transition-colors text-center"
          autoFocus
        />
      </div>

      {exercise.hint_text && (
        <p className="text-textSecondary text-sm text-center">💡 {exercise.hint_text}</p>
      )}

      <Button
        label="Verificar"
        onClick={handleVerify}
        disabled={input.trim().length === 0}
        fullWidth
      />
    </div>
  );
};
