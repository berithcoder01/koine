import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

type Phase = 'typing' | 'pausing' | 'deleting' | 'waiting';

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  className = '',
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');
  const [charIndex, setCharIndex] = useState(0);

  const currentPhrase = phrases[currentPhraseIndex];

  useEffect(() => {
    if (phrases.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case 'typing': {
        if (charIndex < currentPhrase.length) {
          timeout = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          }, typingSpeed);
        } else {
          setPhase('pausing');
        }
        break;
      }

      case 'pausing': {
        timeout = setTimeout(() => {
          setPhase('deleting');
        }, pauseDuration);
        break;
      }

      case 'deleting': {
        if (charIndex > 0) {
          timeout = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          }, deletingSpeed);
        } else {
          setPhase('waiting');
        }
        break;
      }

      case 'waiting': {
        timeout = setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setPhase('typing');
        }, 200);
        break;
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, phase, currentPhrase, phrases, typingSpeed, deletingSpeed, pauseDuration, currentPhraseIndex]);

  return (
    <div className={`relative h-8 overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentPhraseIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute inset-0 flex items-center justify-center font-medium text-base tracking-wide ${className || 'text-text-secondary'}`}
        >
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className={`inline-block w-[2px] h-5 ml-0.5 ${className ? 'bg-white/60' : 'bg-text-secondary/60'}`}
          />
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
