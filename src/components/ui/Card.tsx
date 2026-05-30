import React from 'react';
import { Card as HeroCard } from '@heroui/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  onClick?: () => void;
}

const paddingMap = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = true,
  onClick,
}) => (
  <HeroCard
    isPressable={!!onClick}
    onPress={onClick}
    className={`${shadow ? 'shadow-md' : ''} ${className}`}
    radius="xl"
    style={{ padding: paddingMap[padding] }}
  >
    {children}
  </HeroCard>
);
