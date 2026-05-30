import React from 'react';
import { Button as HeroButton, Spinner } from '@heroui/react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const variantMap = {
  primary: 'solid' as const,
  secondary: 'flat' as const,
  outline: 'bordered' as const,
  ghost: 'light' as const,
  danger: 'flat' as const,
};

const colorMap = {
  primary: 'primary' as const,
  secondary: 'secondary' as const,
  outline: 'primary' as const,
  ghost: 'primary' as const,
  danger: 'danger' as const,
};

const sizeMap = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'lg' as const,
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
}) => (
  <HeroButton
    onPress={onClick}
    variant={variantMap[variant]}
    color={colorMap[variant]}
    size={sizeMap[size]}
    isDisabled={disabled || loading}
    isLoading={loading}
    fullWidth={fullWidth}
    startContent={icon && !loading ? icon : undefined}
    radius="lg"
    className="font-semibold"
  >
    {label}
  </HeroButton>
);
