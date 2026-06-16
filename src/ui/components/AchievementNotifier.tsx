import React, { useEffect, useRef, useState } from 'react';
import { useGamificationStore, AchievementNotification } from '@/features/gamification/gamificationStore';
import { useSoundVolume } from '@/features/settings/useSoundVolume';

export const AchievementNotifier: React.FC = () => {
  const pendingAchievement = useGamificationStore((s) => s.pendingAchievement);
  const clearPending = useGamificationStore((s) => s.clearPendingAchievement);
  const { playEffect } = useSoundVolume();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<AchievementNotification | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pendingAchievement && !current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setCurrent(pendingAchievement);
      setVisible(true);
      playEffect('levelUp'); // Efeito sonoro quando destrava conquista

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        timeoutRef.current = setTimeout(() => {
          setCurrent(null);
          clearPending();
          timeoutRef.current = null;
        }, 400);
      }, 6000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
    return undefined;
  }, [pendingAchievement]);

  if (!current) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="pointer-events-auto mx-3 mt-3">
        <div
          style={{
            transform: visible ? 'translateY(0)' : 'translateY(-120%)',
            opacity: visible ? 1 : 0,
            transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
          }}
        >
          <div className="bg-[#26422A] rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-white/10">
            <div className="text-4xl shrink-0">{current.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[#C9973A] font-bold text-xs tracking-wide">
                Conquista Desbloqueada!
              </p>
              <p className="text-white font-extrabold text-sm mt-0.5 truncate">
                {current.title}
              </p>
              <p className="text-white/60 text-xs truncate mt-0.5">
                {current.description}
              </p>
            </div>
            {current.xp > 0 && (
              <div className="bg-[#C9973A] text-[#26422A] text-xs font-black rounded-full px-2.5 py-1 shrink-0">
                +{current.xp} XP
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
