import React from 'react';
import { Progress as HeroProgress } from '@heroui/react';

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const colorValueMap: Record<string, string> = {
  'bg-secondary': '#C9973A',
  'bg-primary': '#1A3A5C',
  'bg-success': '#2D7A4F',
  'bg-error': '#C0392B',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'bg-secondary',
  height = 8,
  showLabel = false,
  label,
  animated = true,
}) => {
  const clamped = Math.min(100, Math.max(0, value));
  const resolvedColor = colorValueMap[color] || '#C9973A';

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>{label || 'Progresso'}</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <HeroProgress
        value={clamped}
        color="secondary"
        className="w-full"
        style={{ '--progress-height': `${height}px` } as React.CSSProperties}
        aria-label={label || 'Progresso'}
      />
    </div>
  );
};
