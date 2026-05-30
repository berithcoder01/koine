import React from 'react';

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = 8,
  showLabel = false,
  label,
  color = 'bg-secondary',
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full" aria-label={label || 'Progresso'}>
      {(showLabel || label) && (
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>{label || 'Progresso'}</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div 
        className="w-full bg-border/20 dark:bg-border/10 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div 
          className={`h-full ${color} transition-all duration-300 rounded-full`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
