// src/pages/lesson/exercises/WordOrderExercise.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface Props {
  exercise: any;
  correctAnswer: string[];
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const WordOrderExercise: React.FC<Props> = ({ exercise, correctAnswer, onAnswer }) => {
  const [available, setAvailable] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...correctAnswer].sort(() => Math.random() - 0.5);
    setAvailable(shuffled);
  }, []);

  const addWord = (word: string, fromIndex: number) => {
    setAvailable(prev => prev.filter((_, i) => i !== fromIndex));
    setSelected(prev => [...prev, word]);
  };

  const removeWord = (word: string, fromIndex: number) => {
    setSelected(prev => prev.filter((_, i) => i !== fromIndex));
    setAvailable(prev => [...prev, word]);
  };

  const handleVerify = () => {
    const isCorrect = selected.join(' ') === correctAnswer.join(' ');
    onAnswer(isCorrect, exercise.explanation, correctAnswer.join(' '));
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-textPrimary font-semibold text-center">{exercise.question_pt}</p>

      <div className="min-h-16 bg-surface border-2 border-dashed border-border rounded-2xl p-3 flex flex-wrap gap-2">
        {selected.length === 0 && (
          <p className="text-textDisabled text-sm w-full text-center self-center">
            Toque nas palavras abaixo para montar a frase
          </p>
        )}
        {selected.map((word, i) => (
          <button
            key={i}
            onClick={() => removeWord(word, i)}
            className="bg-primary text-white px-3 py-1.5 rounded-xl greek-text text-sm font-medium"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {available.map((word, i) => (
          <button
            key={i}
            onClick={() => addWord(word, i)}
            className="bg-surface border-2 border-border px-3 py-1.5 rounded-xl greek-text text-sm text-textPrimary shadow-sm"
          >
            {word}
          </button>
        ))}
      </div>

      {selected.length === correctAnswer.length && (
        <Button label="Verificar" onClick={handleVerify} fullWidth />
      )}
    </div>
  );
};
