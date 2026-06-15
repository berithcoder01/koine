import { useState, useCallback } from 'react';

interface UseGreekKeyboardOptions {
  maxLength?: number;
}

interface UseGreekKeyboardReturn {
  input: string;
  handleInput: (char: string) => void;
  handleDelete: () => void;
  handleSubmit: () => void;
  clear: () => void;
  setInput: (value: string) => void;
}

export function useGreekKeyboard(
  onSubmit: (value: string) => void,
  options: UseGreekKeyboardOptions = {},
): UseGreekKeyboardReturn {
  const { maxLength = 50 } = options;
  const [input, setInput] = useState('');

  const handleInput = useCallback((char: string) => {
    setInput((prev) => {
      if (prev.length >= maxLength) return prev;
      return prev + char;
    });
  }, [maxLength]);

  const handleDelete = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  const handleSubmit = useCallback(() => {
    if (input.trim().length > 0) {
      onSubmit(input.trim());
    }
  }, [input, onSubmit]);

  const clear = useCallback(() => {
    setInput('');
  }, []);

  return {
    input,
    handleInput,
    handleDelete,
    handleSubmit,
    clear,
    setInput,
  };
}
