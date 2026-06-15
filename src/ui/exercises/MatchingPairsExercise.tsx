import React, { useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

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

const ACCENT_PALETTE = [
  { bg: 'bg-[#FEF6EB]', border: 'border-[#F9B95C]', text: 'text-zinc-800 dark:text-secondary', ring: 'ring-[#F9B95C]/40' },
  { bg: 'bg-[#EFF5F7]', border: 'border-[#6398A9]', text: 'text-[#2E5866] dark:text-lagune', ring: 'ring-[#6398A9]/40' },
  { bg: 'bg-[#F0F7F4]', border: 'border-[#96C7B3]', text: 'text-success-text dark:text-success', ring: 'ring-[#96C7B3]/40' },
  { bg: 'bg-[#FBF1F0]', border: 'border-[#D7897F]', text: 'text-error-text dark:text-error', ring: 'ring-[#D7897F]/40' },
];

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
        }, 700);
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
      }, 700);
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

  const getItemClasses = (state: ItemState, isGreek: boolean, accentIndex: number) => {
    const accent = ACCENT_PALETTE[accentIndex % ACCENT_PALETTE.length];

    const stateMap: Record<ItemState, string> = {
      idle: `bg-white dark:bg-surface border-2 ${accent.border}/60 text-text-primary shadow-sm hover:shadow-md active:scale-[0.97]`,
      selected: `bg-white dark:bg-surface border-2 ${accent.border} ${accent.text} ring-4 ${accent.ring} scale-[0.97] shadow-md`,
      correct: `bg-gradient-to-br from-success/15 to-success/5 dark:from-success/20 dark:to-success/10 border-2 border-success text-success-text dark:text-success shadow-md opacity-70`,
      wrong: `bg-gradient-to-br from-error/15 to-error/5 dark:from-error/20 dark:to-error/10 border-2 border-error text-error-text dark:text-error shadow-md`,
    };

    return clsx(
      'flex-1 border-2 rounded-full px-3 py-3 text-center font-extrabold text-sm',
      'transition-all duration-200 min-h-[56px] flex items-center justify-center',
      isGreek && 'font-greek text-base',
      stateMap[state],
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <span className="text-text-secondary text-xs font-black uppercase tracking-wider">
          {matched.size} de {pairs.length} pares
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: pairs.length }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                'w-6 h-1.5 rounded-full transition-all duration-300',
                i < matched.size ? 'bg-secondary' : 'bg-border/40',
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {leftItems.map((leftItem, rowIndex) => {
          const rightItem = rightItems[rowIndex];
          const leftState = status.left[leftItem] ?? 'idle';
          const rightState = status.right[rightItem] ?? 'idle';
          const accent = ACCENT_PALETTE[rowIndex % ACCENT_PALETTE.length];

          return (
            <div key={rowIndex} className="flex gap-2 items-stretch">
              <motion.button
                layout
                onClick={() => handleLeftPress(leftItem)}
                disabled={matched.has(leftItem)}
                animate={
                  leftState === 'wrong' ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }
                }
                transition={{ duration: 0.35 }}
                className={getItemClasses(leftState, isGreekText(leftItem), rowIndex)}
              >
                {leftItem}
              </motion.button>

              <div className="flex items-center justify-center w-6 shrink-0">
                <AnimatePresence>
                  {matched.has(leftItem) ? (
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      className="w-6 h-6 rounded-full bg-success text-zinc-900 flex items-center justify-center text-xs font-black shadow-sm"
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={clsx('w-2 h-2 rounded-full', accent.bg, `border ${accent.border}`)}
                    />
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                layout
                onClick={() => rightItem ? handleRightPress(rightItem) : undefined}
                disabled={!rightItem || !!pairs.find(p => p.right === rightItem && matched.has(p.left))}
                animate={
                  rightState === 'wrong' ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }
                }
                transition={{ duration: 0.35 }}
                className={rightItem ? getItemClasses(rightState, isGreekText(rightItem), rowIndex) : 'flex-1'}
              >
                {rightItem ?? ''}
              </motion.button>
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
