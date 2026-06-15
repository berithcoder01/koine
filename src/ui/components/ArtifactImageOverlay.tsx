import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
}

export const ArtifactImageOverlay: React.FC<Props> = ({ isOpen, onClose, src, alt }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const root = document.getElementById('modal-root') || document.body;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-12 right-4 z-[110] w-10 h-10 !rounded-full bg-white/10 text-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            className="w-full h-full flex items-center justify-center p-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Zoom>
              <img
                src={src}
                alt={alt ?? 'Imagem do artefato'}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </Zoom>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    root
  );
};
