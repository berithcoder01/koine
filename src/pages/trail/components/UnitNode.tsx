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

const STATUS_CONFIG = {
  locked:      { icon: '🔒', bg: 'bg-border', text: 'text-textDisabled', border: 'border-border' },
  available:   { icon: '⭕', bg: 'bg-surface', text: 'text-primary', border: 'border-primary' },
  in_progress: { icon: '🔄', bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary' },
  complete:    { icon: '✅', bg: 'bg-success', text: 'text-white', border: 'border-success' },
};

export const UnitNode: React.FC<UnitNodeProps> = ({ module, status, onPress }) => {
  const config = STATUS_CONFIG[status];

  const handlePress = async () => {
    if (status === 'locked') {
      try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
      return;
    }
    try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
    onPress();
  };

  return (
    <button
      onClick={handlePress}
      className={clsx(
        'w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center',
        'shadow-md transition-all active:scale-95',
        config.bg,
        config.border,
        status === 'locked' && 'opacity-60',
      )}
    >
      <span className="text-2xl">{config.icon}</span>
      {status === 'available' && (
        <span className="text-xs font-bold text-primary mt-0.5">
          +{module.xp_total}xp
        </span>
      )}
      {status === 'complete' && (
        <span className="text-xs font-bold text-white mt-0.5">
          {module.module_order}
        </span>
      )}
    </button>
  );
};
