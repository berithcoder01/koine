import React from 'react';
import { clsx } from 'clsx';

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({
  className = '',
  orientation = 'horizontal',
}) => {
  return (
    <div
      className={clsx(
        'bg-border/60 dark:bg-border/20 shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
        className
      )}
      role="separator"
    />
  );
};
