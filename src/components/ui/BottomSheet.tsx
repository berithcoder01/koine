import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: 'auto' | 'half' | 'full';
}

const heightMap = {
  auto: 'max-h-[85vh]',
  half: 'h-[50vh]',
  full: 'h-[95vh]',
};

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  height = 'auto',
}) => {
  // Desabilitar o scroll da página principal quando o bottom sheet estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const modalRoot = document.getElementById('modal-root') || document.body;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`relative w-full max-w-lg bg-background border-t border-border/40 dark:border-border/10 rounded-t-[32px] shadow-2xl flex flex-col z-10 ${heightMap[height]}`}
          >
            {/* Handle do BottomSheet */}
            <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 bg-border/80 dark:bg-border/30 rounded-full" />
            </div>

            {/* Cabeçalho */}
            {title && (
              <div className="px-6 py-3 border-b border-border/40 dark:border-border/10 flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-muted text-text-secondary active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Corpo do BottomSheet */}
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-2 text-text-primary">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};
