import React from 'react';
import { Chip } from './Chip';

interface StreakBadgeProps {
  streak: number;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak }) => (
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
);
