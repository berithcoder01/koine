// src/components/greek/GreekText.tsx
import React from 'react';
import { clsx } from 'clsx';
import { stripGreekPunctuation } from '@/core/utils/greek';

interface GreekTextProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  className?: string;
  onWordPress?: (word: string, index: number) => void;
}

export const GreekText: React.FC<GreekTextProps> = ({
  text,
  size = 'md',
  color = 'text-primary',
  className,
  onWordPress,
}) => {
  const sizes = {
    sm: 'text-greek-sm',
    md: 'text-greek-md',
    lg: 'text-greek-lg',
    xl: 'text-greek-xl',
    '2xl': 'text-5xl',
  };

  if (!onWordPress) {
    return (
      <span className={clsx('font-greek', sizes[size], color, className)}>
        {text}
      </span>
    );
  }

  const words = text.split(' ');

  return (
    <p className={clsx('font-greek leading-relaxed', sizes[size], color, className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          onClick={() => onWordPress(stripGreekPunctuation(word), index)}
          className="cursor-pointer active:text-secondary transition-colors duration-150 px-0.5 rounded min-h-[48px] inline-flex items-center"
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
};
