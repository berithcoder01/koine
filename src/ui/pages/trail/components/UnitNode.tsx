// src/pages/trail/components/UnitNode.tsx
import React from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { clsx } from 'clsx';

type NodeStatus = 'locked' | 'available' | 'in_progress' | 'complete';

interface UnitNodeProps {
  module: { id: string; title: string; xp_total: number; module_order: number };
  status: NodeStatus;
  onPress: () => void;
}

const getPastelTheme = (order: number) => {
  const themes = [
    {
      bg: 'bg-card-blue dark:bg-card-blue/20',
      border: 'border-card-blue-border dark:border-card-blue-border/40',
      border3d: 'border-b-[#1E40AF] dark:border-b-[#3B82F6]',
      text: 'text-card-blue-text dark:text-blue-300',
      icon: '📖',
    },
    {
      bg: 'bg-card-amber dark:bg-card-amber/20',
      border: 'border-card-amber-border dark:border-card-amber-border/40',
      border3d: 'border-b-[#92400E] dark:border-b-[#F59E0B]',
      text: 'text-card-amber-text dark:text-amber-300',
      icon: '⚡',
    },
    {
      bg: 'bg-card-green dark:bg-card-green/20',
      border: 'border-card-green-border dark:border-card-green-border/40',
      border3d: 'border-b-[#065F46] dark:border-b-[#10B981]',
      text: 'text-card-green-text dark:text-green-300',
      icon: '🌱',
    },
    {
      bg: 'bg-card-rose dark:bg-card-rose/20',
      border: 'border-card-rose-border dark:border-card-rose-border/40',
      border3d: 'border-b-[#9F1239] dark:border-b-[#F43F5E]',
      text: 'text-card-rose-text dark:text-rose-300',
      icon: '🌸',
    },
    {
      bg: 'bg-card-purple dark:bg-card-purple/20',
      border: 'border-card-purple-border dark:border-card-purple-border/40',
      border3d: 'border-b-[#6B21A8] dark:border-b-[#8B5CF6]',
      text: 'text-card-purple-text dark:text-purple-300',
      icon: '📜',
    },
  ];
  return themes[((order - 1) % themes.length + themes.length) % themes.length];
};

export const UnitNode: React.FC<UnitNodeProps> = ({ module, status, onPress }) => {
  const theme = getPastelTheme(module.module_order);

  const handlePress = async () => {
    if (status === 'locked') {
      try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
      return;
    }
    try { await Haptics.impact({ style: ImpactStyle.Medium }); } catch {}
    onPress();
  };

  const getStyleConfig = () => {
    switch (status) {
      case 'locked':
        return {
          icon: '🔒',
          bg: 'bg-zinc-200 dark:bg-zinc-800',
          border: 'border-zinc-300 dark:border-zinc-700 border-b-[6px] border-b-zinc-400 dark:border-b-zinc-900',
          text: 'text-text-disabled',
        };
      case 'complete':
        return {
          icon: theme.icon,
          bg: theme.bg,
          border: `${theme.border} border-b-[6px] ${theme.border3d} shadow-lg shadow-success/15`,
          text: theme.text,
        };
      case 'in_progress':
      case 'available':
      default:
        return {
          icon: theme.icon,
          bg: theme.bg,
          border: `${theme.border} border-b-[6px] ${theme.border3d} shadow-lg shadow-black/5`,
          text: theme.text,
        };
    }
  };

  const config = getStyleConfig();
  const isActive = status === 'available' || status === 'in_progress';

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative">
        {/* Pulsing glow under active elements */}
        {isActive && (
          <span className="absolute -inset-2.5 rounded-full bg-secondary/20 dark:bg-secondary/15 animate-ping opacity-75 pointer-events-none" />
        )}

    <button
      onClick={handlePress}
      style={{ borderRadius: '9999px' }}
      className={clsx(
        'w-[88px] h-[88px] !rounded-full border-4 flex flex-col items-center justify-center',
        'shadow-md transition-all active:scale-95 duration-150',
        config.bg,
        config.border,
        status === 'locked' && 'opacity-50 grayscale-[20%]',
      )}
    >
          <span className="text-2xl filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            {config.icon}
          </span>
          
          {status === 'complete' ? (
            <span className="absolute -top-1 -right-1 bg-success text-zinc-900 text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-md font-black">
              ✓
            </span>
          ) : (
            status !== 'locked' && (
              <span className={clsx('text-[8px] font-black tracking-tight select-none mt-0.5', config.text)}>
                +{module.xp_total}xp
              </span>
            )
          )}
        </button>
      </div>

      {/* Compact module label under the circle */}
      <span
        className={clsx(
          'text-[10px] font-extrabold tracking-wide mt-2 text-center max-w-[90px] leading-tight select-none uppercase',
          status === 'locked' ? 'text-text-disabled' : 'text-text-primary dark:text-zinc-300'
        )}
      >
        {module.title.split(':')[0]}
      </span>
    </div>
  );
};
