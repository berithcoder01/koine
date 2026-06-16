import React from 'react';
import { Chip } from './Chip';

interface StreakBadgeProps {
  streak: number;
  record?: number;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, record }) => (
  <div className="flex items-center gap-2">
    <Chip
      color="danger"
      variant="flat"
      size="md"
      startContent={<span>🔥</span>}
      radius="full"
      className="font-bold"
    >
      {streak}
    </Chip>
    {record != null && record > 0 && (
      <span className="text-[10px] text-text-secondary dark:text-zinc-500 font-medium">
        Recorde: {record} 🔥
      </span>
    )}
  </div>
);
