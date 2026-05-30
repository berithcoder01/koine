import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';

interface Props {
  exercise: any;
  correctAnswer: string[];
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const WordOrderExercise: React.FC<Props> = ({
  exercise,
  correctAnswer,
  onAnswer,
}) => {
  const [available, setAvailable] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...correctAnswer].sort(() => Math.random() - 0.5);
    setAvailable(shuffled);
  }, []);

  const handleVerify = () => {
    const isCorrect = selected.join(' ') === correctAnswer.join(' ');
    onAnswer(isCorrect, exercise.explanation, correctAnswer.join(' '));
  };

  const addWord = (word: string, fromIndex: number) => {
    setAvailable(prev => prev.filter((_, i) => i !== fromIndex));
    setSelected(prev => [...prev, word]);
  };

  const removeWord = (word: string, fromIndex: number) => {
    setSelected(prev => prev.filter((_, i) => i !== fromIndex));
    setAvailable(prev => [...prev, word]);
  };

  const isGreek = correctAnswer.some(w => /[^\u0000-\u007F]/.test(w));

  return (
    <div className="flex flex-col gap-5">
      {exercise.question_pt && (
        <p className="text-text-secondary text-sm font-medium text-center">
          {exercise.question_pt}
        </p>
      )}

      <div
        className={clsx(
          'min-h-[72px] bg-surface border-2 rounded-2xl p-3',
          'flex flex-wrap gap-2 items-start content-start',
          'transition-colors duration-150',
          selected.length > 0 ? 'border-text-primary' : 'border-dashed border-border',
        )}
      >
        {selected.length === 0 && (
          <p className="text-text-disabled text-sm w-full text-center self-center py-2">
            Toque nas palavras abaixo
          </p>
        )}
        {selected.map((word, i) => (
          <button
            key={i}
            onClick={() => removeWord(word, i)}
            className={clsx(
              'px-3 py-2 rounded-xl text-sm font-semibold',
              'bg-text-primary text-background',
              'active:opacity-80 transition-opacity',
              isGreek && 'font-greek text-base',
            )}
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
            className={clsx(
              'px-3 py-2 rounded-xl text-sm font-semibold border-2',
              'bg-surface border-border text-text-primary shadow-sm',
              'active:bg-surface-alt transition-colors',
              isGreek && 'font-greek text-base',
            )}
          >
            {word}
          </button>
        ))}
      </div>

      {selected.length === correctAnswer.length && (
        <button
          onClick={handleVerify}
          className="w-full bg-text-primary text-background font-bold rounded-2xl py-4 text-base
                     active:opacity-80 transition-all duration-150"
        >
          VERIFICAR
        </button>
      )}
    </div>
  );
};
