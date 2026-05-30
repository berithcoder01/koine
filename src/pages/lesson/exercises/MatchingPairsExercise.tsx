import React, { useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';

interface Pair {
  id: string;
  left: string;
  right: string;
}

interface Props {
  exercise: any;
  pairs: Pair[];
  onAnswer: (isCorrect: boolean, explanation?: string) => void;
}

type ItemState = 'idle' | 'selected' | 'correct' | 'wrong';

interface ItemStatus {
  left: Record<string, ItemState>;
  right: Record<string, ItemState>;
}

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function isGreekText(text: string): boolean {
  return /[^\u0000-\u007F]/.test(text);
}

export const MatchingPairsExercise: React.FC<Props> = ({
  exercise,
  pairs,
  onAnswer,
}) => {
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<ItemStatus>({ left: {}, right: {} });

  useEffect(() => {
    setLeftItems(shuffleArray(pairs.map(p => p.left)));
    setRightItems(shuffleArray(pairs.map(p => p.right)));
  }, []);

  const checkPair = useCallback(
    (left: string, right: string) => {
      const pair = pairs.find(p => p.left === left && p.right === right);
      const isCorrect = !!pair;

      if (isCorrect) {
        setStatus(prev => ({
          left:  { ...prev.left,  [left]:  'correct' },
          right: { ...prev.right, [right]: 'correct' },
        }));
        setMatched(prev => {
          const next = new Set(prev);
          next.add(left);
          return next;
        });
      } else {
        setStatus(prev => ({
          left:  { ...prev.left,  [left]:  'wrong' },
          right: { ...prev.right, [right]: 'wrong' },
        }));
        setTimeout(() => {
          setStatus(prev => ({
            left:  { ...prev.left,  [left]:  'idle' },
            right: { ...prev.right, [right]: 'idle' },
          }));
        }, 600);
      }

      setSelectedLeft(null);
      setSelectedRight(null);
    },
    [pairs],
  );

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      checkPair(selectedLeft, selectedRight);
    }
  }, [selectedLeft, selectedRight, checkPair]);

  useEffect(() => {
    if (matched.size === pairs.length && pairs.length > 0) {
      setTimeout(() => {
        onAnswer(true, exercise.explanation);
      }, 500);
    }
  }, [matched, pairs.length]);

  const handleLeftPress = (item: string) => {
    if (matched.has(item)) return;
    setSelectedLeft(prev => (prev === item ? null : item));
    setStatus(prev => ({
      ...prev,
      left: {
        ...prev.left,
        [item]: prev.left[item] === 'selected' ? 'idle' : 'selected',
      },
    }));
  };

  const handleRightPress = (item: string) => {
    const matchedPair = pairs.find(p => p.right === item && matched.has(p.left));
    if (matchedPair) return;
    setSelectedRight(prev => (prev === item ? null : item));
    setStatus(prev => ({
      ...prev,
      right: {
        ...prev.right,
        [item]: prev.right[item] === 'selected' ? 'idle' : 'selected',
      },
    }));
  };

  const getItemClasses = (state: ItemState, isGreek: boolean) =>
    clsx(
      'flex-1 border-2 rounded-2xl px-3 py-4 text-center font-semibold text-sm',
      'transition-all duration-150 min-h-[56px] flex items-center justify-center',
      isGreek && 'font-greek text-base',
      {
        idle:     'bg-surface border-border text-text-primary active:bg-surface-alt',
        selected: 'bg-surface border-text-primary text-text-primary scale-[0.97]',
        correct:  'bg-success/10 border-success text-success opacity-60',
        wrong:    'bg-error/10 border-error text-error animate-shake',
      }[state],
    );

  return (
    <div className="flex flex-col gap-3">
      <p className="text-text-secondary text-xs text-center font-medium">
        {matched.size} de {pairs.length} pares encontrados
      </p>

      <div className="flex flex-col gap-3">
        {leftItems.map((leftItem, rowIndex) => {
          const rightItem = rightItems[rowIndex];
          const leftState = status.left[leftItem] ?? 'idle';
          const rightState = status.right[rightItem] ?? 'idle';

          return (
            <div key={rowIndex} className="flex gap-3">
              <button
                onClick={() => handleLeftPress(leftItem)}
                disabled={matched.has(leftItem)}
                className={getItemClasses(leftState, isGreekText(leftItem))}
              >
                {leftItem}
              </button>

              <button
                onClick={() => rightItem ? handleRightPress(rightItem) : undefined}
                disabled={!rightItem || !!pairs.find(p => p.right === rightItem && matched.has(p.left))}
                className={rightItem ? getItemClasses(rightState, isGreekText(rightItem)) : 'flex-1'}
              >
                {rightItem ?? ''}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function parsePairsFromExercise(exercise: any): Pair[] {
  try {
    const raw = typeof exercise.options === 'string'
      ? JSON.parse(exercise.options)
      : exercise.options;

    if (!Array.isArray(raw)) return [];

    return raw.map((item: any, index: number) => {
      if (Array.isArray(item)) {
        return { id: String(index), left: item[0], right: item[1] };
      }
      return { id: String(index), left: item.left, right: item.right };
    });
  } catch {
    return [];
  }
}
