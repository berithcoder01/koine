// src/components/layout/SafeArea.tsx
import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface SafeAreaProps {
  children: React.ReactNode;
  className?: string;
  withBottomNav?: boolean;
  scrollable?: boolean;
}

export const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  className = '',
  withBottomNav = true,
  scrollable = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
    className={clsx(
      'bg-background',
      // Quando scrollable=true: altura total da tela, sem overflow próprio
      // O filho deve ter overflow-y-auto para rolar
      scrollable
        ? 'h-dvh overflow-hidden flex flex-col pt-[env(safe-area-inset-top)]'
        : 'min-h-dvh pt-[env(safe-area-inset-top)]',
      !scrollable && withBottomNav ? 'pb-28' : '',
      !scrollable && !withBottomNav ? 'pb-[env(safe-area-inset-bottom)]' : '',
      className,
    )}
  >
    {children}
  </motion.div>
);
