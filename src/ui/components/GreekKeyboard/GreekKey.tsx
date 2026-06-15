import React, { useRef, useCallback } from 'react';
import { clsx } from 'clsx';

interface GreekKeyProps {
  char: string;
  uppercase?: string;
  onPress: (char: string) => void;
  disabled?: boolean;
  highlighted?: boolean;
  isSpecial?: boolean;
  label?: string;
  wide?: boolean;
  forceUppercase?: boolean;
  toggled?: boolean;
}

export const GreekKey: React.FC<GreekKeyProps> = ({
  char,
  uppercase,
  onPress,
  disabled = false,
  highlighted = false,
  isSpecial = false,
  label,
  wide = false,
  forceUppercase = false,
  toggled = false,
}) => {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pressed, setPressed] = React.useState(false);
  const [showUppercase, setShowUppercase] = React.useState(false);

  const handlePointerDown = useCallback(() => {
    if (disabled) return;
    setPressed(true);
    if (uppercase) {
      longPressTimer.current = setTimeout(() => {
        setShowUppercase(true);
      }, 300);
    }
  }, [disabled, uppercase]);

  const handlePointerUp = useCallback(() => {
    setPressed(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (disabled) return;
    const toSend = (showUppercase || forceUppercase) && uppercase ? uppercase : char;
    onPress(toSend);
    setShowUppercase(false);
  }, [disabled, onPress, char, uppercase, showUppercase, forceUppercase]);

  const handlePointerLeave = useCallback(() => {
    setPressed(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setShowUppercase(false);
  }, []);

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      disabled={disabled}
      className={clsx(
        'select-none touch-none rounded-xl flex items-center justify-center font-bold transition-all duration-100',
        'min-h-[42px] min-w-[36px]',
        wide ? 'flex-1 px-3' : 'w-full',
        disabled
          ? 'bg-surface-alt/30 text-text-secondary/30 cursor-not-allowed'
          : pressed
            ? 'bg-secondary/20 text-secondary scale-[0.92]'
            : toggled
              ? 'bg-secondary/30 text-secondary ring-2 ring-secondary/50'
              : highlighted
                ? 'bg-secondary/10 text-secondary border-2 border-secondary/40'
                : isSpecial
                  ? 'bg-surface-alt/80 text-text-primary hover:bg-surface-alt'
                  : 'bg-surface dark:bg-surface-alt/60 text-text-primary hover:bg-surface-alt/80 active:scale-95',
        'shadow-sm',
      )}
    >
      {label || ((showUppercase || forceUppercase) && uppercase ? uppercase : char)}
    </button>
  );
};
