import React from 'react';
import { clsx } from 'clsx';

interface ChipProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'default';
  variant?: 'solid' | 'flat' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  startContent?: React.ReactNode;
  className?: string;
  radius?: 'full' | 'lg' | 'md' | 'sm';
}

const colorStyles: Record<string, Record<string, string>> = {
  primary: {
    solid: 'bg-primary text-white',
    flat: 'bg-primary/10 text-primary',
    outline: 'border border-primary text-primary',
  },
  secondary: {
    solid: 'bg-secondary text-white',
    flat: 'bg-secondary/10 text-secondary',
    outline: 'border border-secondary text-secondary',
  },
  warning: {
    solid: 'bg-warning text-white',
    flat: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    outline: 'border border-amber-500 text-amber-500',
  },
  danger: {
    solid: 'bg-danger text-white',
    flat: 'bg-red-500/10 text-red-600 dark:text-red-400',
    outline: 'border border-red-500 text-red-500',
  },
  success: {
    solid: 'bg-success text-white',
    flat: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    outline: 'border border-emerald-500 text-emerald-500',
  },
  default: {
    solid: 'bg-muted text-muted-foreground',
    flat: 'bg-muted/10 text-muted-foreground',
    outline: 'border border-border text-muted-foreground',
  },
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const radiusStyles = {
  full: 'rounded-full',
  lg: 'rounded-2xl',
  md: 'rounded-xl',
  sm: 'rounded-lg',
};

export const Chip: React.FC<ChipProps> = ({
  children,
  color = 'default',
  variant = 'solid',
  size = 'md',
  startContent,
  className = '',
  radius = 'full',
}) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1.5 font-bold transition-colors duration-150 select-none max-w-fit',
        colorStyles[color]?.[variant] || colorStyles.default.solid,
        sizeStyles[size],
        radiusStyles[radius],
        className
      )}
    >
      {startContent && <span className="flex items-center shrink-0">{startContent}</span>}
      <span className="truncate">{children}</span>
    </div>
  );
};
