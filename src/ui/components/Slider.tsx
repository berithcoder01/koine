import React from 'react';
import { clsx } from 'clsx';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  unit?: string;
  className?: string;
  disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  value,
  onChange,
  label,
  showValue = true,
  unit = '',
  className,
  disabled = false,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-xs font-semibold text-text-secondary dark:text-zinc-400">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-bold text-text-primary dark:text-white">
              {value}{unit}
            </span>
          )}
        </div>
      )}
      <div className="relative w-full h-6 flex items-center">
        <div className="absolute w-full h-1.5 bg-border/20 dark:bg-border/10 rounded-full" />
        <div
          className="absolute h-1.5 bg-secondary rounded-full transition-all duration-100"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="absolute w-full h-6 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
        />
        <div
          className="absolute w-5 h-5 bg-white border-2 border-secondary rounded-full shadow-md pointer-events-none transition-all duration-100"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    </div>
  );
};
