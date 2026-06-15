import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GreekKey } from './GreekKey';
import { GREEK_UPPERCASE } from '@/features/typing/typingUtils';

interface GreekKeyboardProps {
  onInput: (char: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  unlockedLetters?: string[];
  highlightLetters?: string[];
  disabled?: boolean;
  inputValue?: string;
}

const ROWS: string[][] = [
  ['α', 'β', 'γ', 'δ', 'ε', 'ζ'],
  ['η', 'θ', 'ι', 'κ', 'λ', 'μ'],
  ['ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'ς'],
  ['τ', 'υ', 'φ', 'χ', 'ψ', 'ω'],
];

export const GreekKeyboard: React.FC<GreekKeyboardProps> = ({
  onInput,
  onDelete,
  onSubmit,
  unlockedLetters,
  highlightLetters = [],
  disabled = false,
  inputValue = '',
}) => {
  const [shifted, setShifted] = useState(false);

  const isUnlocked = (char: string): boolean => {
    if (!unlockedLetters) return true;
    return unlockedLetters.includes(char);
  };

  const handleLetterPress = useCallback((char: string) => {
    onInput(char);
    if (shifted) setShifted(false);
  }, [onInput, shifted]);

  const handleShiftPress = useCallback(() => {
    setShifted(s => !s);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-md mx-auto select-none"
    >
      <div className="bg-surface-alt/60 dark:bg-zinc-800/70 rounded-t-2xl px-4 pt-3 pb-5 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
      {ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-1.5 mb-1 justify-center"
        >
          {row.map((char) => {
            const upper = GREEK_UPPERCASE[char];
            return (
              <GreekKey
                key={char}
                char={char}
                uppercase={upper}
                onPress={handleLetterPress}
                disabled={disabled || !isUnlocked(char)}
                highlighted={highlightLetters.includes(char) || highlightLetters.includes(upper)}
                forceUppercase={shifted}
              />
            );
          })}
        </div>
      ))}

      <div className="flex gap-1.5 mt-1">
        <div className="w-[46px]">
          <GreekKey
            char="⇧"
            onPress={handleShiftPress}
            disabled={disabled}
            isSpecial
            toggled={shifted}
          />
        </div>
        <GreekKey
          char=" "
          onPress={() => onInput(' ')}
          disabled={disabled}
          isSpecial
          wide
        />
        <div className="w-[46px]">
          <GreekKey
            char="⌫"
            onPress={() => onDelete()}
            disabled={disabled || inputValue.length === 0}
            isSpecial
          />
        </div>
        <div className="w-[48px]">
          <GreekKey
            char="✓"
            onPress={onSubmit}
            disabled={disabled || inputValue.trim().length === 0}
            isSpecial
          />
        </div>
      </div>
      </div>
    </motion.div>
  );
};
