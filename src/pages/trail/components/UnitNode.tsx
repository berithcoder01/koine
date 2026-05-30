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
    { bg: 'bg-card-blue dark:bg-card-blue/20', border: 'border-card-blue-border dark:border-card-blue-border/40', text: 'text-card-blue-text dark:text-blue-300', icon: '📖' },
    { bg: 'bg-card-amber dark:bg-card-amber/20', border: 'border-card-amber-border dark:border-card-amber-border/40', text: 'text-card-amber-text dark:text-amber-300', icon: '⚡' },
    { bg: 'bg-card-green dark:bg-card-green/20', border: 'border-card-green-border dark:border-card-green-border/40', text: 'text-card-green-text dark:text-green-300', icon: '🌱' },
    { bg: 'bg-card-rose dark:bg-card-rose/20', border: 'border-card-rose-border dark:border-card-rose-border/40', text: 'text-card-rose-text dark:text-rose-300', icon: '🌸' },
    { bg: 'bg-card-purple dark:bg-card-purple/20', border: 'border-card-purple-border dark:border-card-purple-border/40', text: 'text-card-purple-text dark:text-purple-300', icon: '🔮' },
  ];
  return themes[(order - 1) % themes.length];
};

export const UnitNode: React.FC<UnitNodeProps> = ({ module, status, onPress }) => {
  const theme = getPastelTheme(module.module_order);

  const handlePress = async () => {
    if (status === 'locked') {
      try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
      return;
    }
    try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
    onPress();
  };

  const getStyleConfig = () => {
    switch (status) {
      case 'locked':
        return {
          icon: '🔒',
          bg: 'bg-border/60 dark:bg-zinc-800',
          border: 'border-border dark:border-zinc-700',
          text: 'text-text-disabled',
        };
      case 'complete':
        return {
          icon: '✅',
          bg: 'bg-success',
          border: 'border-success shadow-lg shadow-success/10',
          text: 'text-white',
        };
      case 'in_progress':
      case 'available':
      default:
        return {
          icon: theme.icon,
          bg: theme.bg,
          border: `${theme.border} shadow-lg shadow-black/5`,
          text: theme.text,
        };
    }
  };

  const config = getStyleConfig();

  return (
    <button
      onClick={handlePress}
      className={clsx(
        'w-[88px] h-[88px] rounded-full border-4 flex flex-col items-center justify-center',
        'shadow-md transition-all active:scale-95 duration-150',
        config.bg,
        config.border,
        status === 'locked' && 'opacity-50 grayscale-[20%]',
      )}
    >
      <span className="text-3xl filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        {config.icon}
      </span>
      
      {status === 'complete' ? (
        <span className="text-[10px] font-black text-white mt-0.5">
          {module.module_order}
        </span>
      ) : (
        status !== 'locked' && (
          <span className={clsx('text-[10px] font-black mt-0.5', config.text)}>
            +{module.xp_total}xp
          </span>
        )
      )}
    </button>
  );
};
