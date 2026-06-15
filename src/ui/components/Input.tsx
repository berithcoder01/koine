import React from 'react';
import { clsx } from 'clsx';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  onValueChange?: (value: string) => void;
  variant?: 'flat' | 'bordered' | 'underlined';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  flat: 'bg-surface-alt border-transparent focus:bg-surface focus:border-primary/20',
  bordered: 'border-2 border-border/80 focus:border-secondary dark:border-border/30 dark:focus:border-secondary bg-transparent focus:ring-1 focus:ring-secondary/20',
  underlined: 'border-b-2 border-border focus:border-secondary rounded-none px-0',
};

const radiusStyles = {
  none: 'rounded-none',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
};

const sizeStyles = {
  sm: 'py-2 px-3 text-xs',
  md: 'py-3 px-4 text-sm',
  lg: 'py-3.5 px-4.5 text-base', // Confortável para dispositivos móveis
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      onValueChange,
      onChange,
      variant = 'bordered',
      radius = 'lg',
      size = 'md',
      className,
      id,
      type = 'text',
      value,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString(36).substring(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onValueChange) onValueChange(e.target.value);
    };

    return (
      <div className={clsx('flex flex-col w-full gap-1.5', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold text-text-primary dark:text-text-primary tracking-wide select-none"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
          onChange={handleChange}
          className={clsx(
            'w-full outline-none font-medium transition-all duration-150 text-text-primary placeholder:text-text-secondary/50',
            variantStyles[variant],
            radiusStyles[radius],
            sizeStyles[size]
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
