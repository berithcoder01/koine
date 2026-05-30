import React from 'react';
import { Button } from '@heroui/react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon, title, description, actionLabel, onAction,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
    <span className="text-6xl mb-4">{icon}</span>
    <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
    <p className="text-text-secondary text-sm mb-6">{description}</p>
    {actionLabel && onAction && (
      <Button onPress={onAction} color="primary" variant="solid" radius="lg" className="font-semibold">
        {actionLabel}
      </Button>
    )}
  </div>
);
