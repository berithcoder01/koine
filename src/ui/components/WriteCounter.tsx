import { clsx } from 'clsx';

interface WriteCounterProps {
  onIncrement: () => void;
  isComplete?: boolean;
}

export function WriteCounter({ onIncrement, isComplete }: WriteCounterProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {!isComplete ? (
        <button
          onClick={onIncrement}
          className={clsx(
            'w-full max-w-xs px-8 py-4 rounded-full border-2 font-bold text-base transition-all duration-200',
            'bg-secondary border-secondary text-white hover:bg-secondary/90 active:scale-95'
          )}
        >
          ✓ Concluí o traço
        </button>
      ) : (
        <div className="flex items-center gap-2 text-secondary font-semibold">
          <span className="text-xl">✓</span>
          <span>Completo!</span>
        </div>
      )}
    </div>
  );
}
