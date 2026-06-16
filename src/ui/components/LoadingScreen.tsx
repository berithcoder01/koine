import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
  progress?: number; // 0–100; se definido, exibe a barra de progresso real
}

const LOADING_MESSAGES = [
  "Preparando o aplicativo...",
  "Construindo banco de dados...",
  "Carregando a Bíblia Interlinear...",
  "Isso acontece só na primeira vez...",
  "Preparando a sua trilha...",
  "Quase pronto! Só mais um pouco...",
  "Garantindo que o app funcione offline...",
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  progress,
}) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (message) return; // Se uma mensagem estática foi passada, não rotaciona
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [message]);

  const displayMessage = message || LOADING_MESSAGES[messageIndex];

  const showProgress = progress !== undefined;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 animate-fadeIn" style={{ backgroundColor: '#EA662C' }}>
      <span className="logo-text text-white text-5xl tracking-wide select-none mb-8">
        Κοινή
      </span>

      {!showProgress && (
        <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mb-6" style={{ borderWidth: '3px' }} />
      )}

      {showProgress && (
        <div className="w-64 mb-6">
          {/* Porcentagem */}
          <div className="flex justify-end items-center mb-2">
            <motion.span
              className="text-white font-black text-sm tabular-nums"
              key={progress}
              initial={{ opacity: 0.6, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              {progress}%
            </motion.span>
          </div>
          {/* Barra de progresso */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      <div className="h-10 flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={displayMessage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.8, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-white/80 text-sm font-bold tracking-wide uppercase max-w-[280px]"
          >
            {displayMessage}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
