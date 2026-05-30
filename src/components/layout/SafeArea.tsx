// src/components/layout/SafeArea.tsx
import React from 'react';
import { clsx } from 'clsx';

interface SafeAreaProps {
  children: React.ReactNode;
  className?: string;
  withBottomNav?: boolean;
}

export const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  className = '',
  withBottomNav = true,
}) => (
  <div className={clsx(
    'min-h-screen bg-background pt-[env(safe-area-inset-top)]',
    withBottomNav ? 'pb-20' : 'pb-[env(safe-area-inset-bottom)]',
    className,
  )}>
    {children}
  </div>
);
