import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'solid' | 'light' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  startContent?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'default';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const variantStyles: Record<string, string> = {
  primary: 'bg-primary text-white dark:text-[#18181B] shadow-sm shadow-primary/5 active:scale-[0.98]',
  secondary: 'bg-secondary text-white dark:text-[#18181B] shadow-sm shadow-secondary/5 active:scale-[0.98]',
  outline: 'border-2 border-border bg-transparent text-text-primary active:bg-surface-alt active:scale-[0.98]',
  bordered: 'border-2 border-border/80 dark:border-border/30 bg-transparent text-text-primary active:bg-surface-alt active:scale-[0.98]',
  ghost: 'bg-transparent text-text-primary active:bg-surface-alt active:scale-[0.98]',
  light: 'bg-transparent text-text-primary active:bg-surface-alt active:scale-[0.98]',
  danger: 'bg-error text-white shadow-sm shadow-error/5 active:scale-[0.98]',
  solid: 'bg-primary text-white dark:text-[#18181B] shadow-sm shadow-primary/5 active:scale-[0.98]',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-xs min-h-[38px]',
  md: 'px-5 py-3 text-sm min-h-[48px]',
  lg: 'px-6 py-4 text-base min-h-[56px]',
};

const radiusStyles: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: '!rounded-full',
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  icon,
  startContent,
  className = '',
  color,
  radius = 'md',
  children,
  type = 'button',
  ...props
}) => {
  const isButtonDisabled = disabled || isDisabled || loading || isLoading;
  const isButtonLoading = loading || isLoading;

  // Mapeamento automático de cores do HeroUI para consistência vanilla
  let finalVariant = variant;
  if (color === 'primary' && variant === 'primary') {
    finalVariant = 'primary';
  } else if (color === 'primary' && variant === 'bordered') {
    finalVariant = 'bordered';
  } else if (color === 'danger') {
    finalVariant = 'danger';
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isButtonDisabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
    if (onPress) onPress();
  };

  const finalIcon = icon || startContent;

  const inlineRadiusStyle = radius === 'full' 
    ? '9999px' 
    : radius === 'lg' 
      ? '16px' 
      : radius === 'md' 
        ? '12px' 
        : radius === 'sm' 
          ? '8px' 
          : undefined;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isButtonDisabled}
      style={{
        borderRadius: inlineRadiusStyle,
        ...props.style
      }}
      className={clsx(
        'inline-flex items-center justify-center font-bold transition-all duration-150 select-none cursor-pointer',
        variantStyles[finalVariant] || variantStyles.primary,
        sizeStyles[size],
        radius && radiusStyles[radius],
        fullWidth && 'w-full',
        isButtonDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {isButtonLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : finalIcon ? (
        <span className="mr-2 inline-flex items-center">{finalIcon}</span>
      ) : null}
      {children || label}
    </button>
  );
};
