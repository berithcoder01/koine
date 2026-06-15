// src/components/ui/AchievementToast.tsx
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface AchievementToastProps {
  title: string;
  description: string;
  icon: string;
  xp?: number;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  title,
  description,
  icon,
  xp,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={clsx(
      'fixed top-4 left-4 right-4 z-50 transition-all duration-300',
      visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
    )}>
      <div className="bg-primary rounded-2xl p-4 shadow-lg flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-secondary font-bold text-sm">🏆 Conquista Desbloqueada!</p>
          <p className="text-white font-bold truncate">{title}</p>
          <p className="text-white/70 text-sm truncate">{description}</p>
        </div>
        {xp && (
          <div className="bg-secondary text-white text-xs font-bold rounded-full px-2 py-1 shrink-0">
            +{xp} XP
          </div>
        )}
      </div>
    </div>
  );
};
