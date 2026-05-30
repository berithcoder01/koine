import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  onClick?: () => void;
}

const paddingMap = {
  none: 'p-0',
  sm: 'p-2', // 8px
  md: 'p-4', // 16px
  lg: 'p-6', // 24px
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = true,
  onClick,
}) => {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      onClick={onClick}
      className={clsx(
        'rounded-3xl border border-border/40 dark:border-border/10 bg-surface text-text-primary text-left transition-all duration-200 block w-full outline-none',
        onClick && 'active:scale-[0.98] cursor-pointer hover:bg-surface-alt/50',
        shadow ? 'shadow-sm' : '',
        paddingMap[padding],
        className
      )}
    >
      {children}
    </Component>
  );
};
