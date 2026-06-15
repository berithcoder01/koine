// src/components/layout/SafeArea.tsx
import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface SafeAreaProps {
  children: React.ReactNode;
  className?: string;
  withBottomNav?: boolean;
  scrollable?: boolean;
  noTopSafeArea?: boolean;
}

export const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  className = '',
  withBottomNav = true,
  scrollable = false,
  noTopSafeArea = false,
}) => (
  <motion.div
    initial={false}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
    className={clsx(
      'bg-background',
      // Quando scrollable=true: altura total da tela, sem overflow próprio
      // O filho deve ter overflow-y-auto para rolar
      scrollable
        ? clsx('h-dvh overflow-hidden flex flex-col', !noTopSafeArea && 'pt-[env(safe-area-inset-top)]')
        : clsx('min-h-dvh', !noTopSafeArea && 'pt-[env(safe-area-inset-top)]'),
      !scrollable && withBottomNav ? 'pb-28' : '',
      !scrollable && !withBottomNav ? 'pb-[env(safe-area-inset-bottom)]' : '',
      className,
    )}
  >
    {children}
  </motion.div>
);
