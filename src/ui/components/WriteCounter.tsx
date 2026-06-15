import { clsx } from 'clsx';

interface WriteCounterProps {
  total: number;
  current: number;
  onIncrement: () => void;
  isComplete?: boolean;
}

export function WriteCounter({ total, current, onIncrement, isComplete }: WriteCounterProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 flex-wrap justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            onClick={i <= current ? onIncrement : undefined}
            className={clsx(
              'w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-110',
              i < current
                ? 'bg-secondary border-secondary text-white font-bold'
                : i === current && !isComplete
                ? 'border-primary bg-primary/10 text-primary font-bold'
                : 'border-border/40 dark:border-border/20'
            )}
          >
            {i < current ? '✓' : i === current && !isComplete ? <span className="text-sm">{i + 1}</span> : null}
          </div>
        ))}
      </div>

      <span className={clsx(
        'text-sm font-semibold',
        isComplete ? 'text-secondary' : 'text-text-secondary dark:text-zinc-400'
      )}>
        {isComplete ? '✅ Completo!' : `${current} / ${total}`}
      </span>

      {!isComplete && (
        <button
          onClick={onIncrement}
          className={clsx(
            'w-full px-6 py-3 rounded-full border-2 font-bold text-sm transition-all duration-200 active:scale-[0.98]',
            'bg-primary border-primary text-white hover:bg-primary/90 active:scale-95'
          )}
        >
          ✓ Escrevi uma vez
        </button>
      )}
    </div>
  );
}