import React from 'react';
import { Chip } from '@heroui/react';

interface XPBadgeProps {
  xp: number;
  size?: 'sm' | 'md';
}

export const XPBadge: React.FC<XPBadgeProps> = ({ xp, size = 'md' }) => (
  <Chip
    color="warning"
    variant="flat"
    size={size === 'sm' ? 'sm' : 'md'}
    startContent={<span>⚡</span>}
    radius="full"
    className="font-bold"
  >
    +{xp} XP
  </Chip>
);
