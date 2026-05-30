import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { motion } from 'framer-motion';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

interface BottomNavProps {
  srsCount?: number;
  achievementsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  srsCount = 0,
  achievementsCount = 0,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const items: NavItem[] = [
    { icon: '🏛️', label: 'Trilha', route: ROUTES.TRAIL },
    { icon: '🔄', label: 'Revisão', route: ROUTES.REVIEW, badge: srsCount },
    { icon: '📖', label: 'NT', route: ROUTES.READER },
    { icon: '📚', label: 'Lexicon', route: ROUTES.LEXICON },
    { icon: '👤', label: 'Perfil', route: ROUTES.PROFILE, badge: achievementsCount },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 bg-[#0E0D13] dark:bg-[#09090B] border border-white/10 dark:border-white/5 z-20 rounded-[28px] shadow-2xl px-3 py-2 flex items-center justify-around h-16">
      {items.map((item) => {
        const isActive = location.pathname.startsWith(item.route);
        return (
          <button
            key={item.route}
            onClick={() => navigate(item.route)}
            className="relative flex items-center justify-center w-12 h-12 cursor-pointer outline-none"
          >
            {isActive ? (
              <motion.div
                layoutId="activeTabCircle"
                className="absolute inset-0 bg-white dark:bg-white rounded-full flex items-center justify-center shadow-lg"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              >
                <span className="text-xl filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                  {item.icon}
                </span>
                {item.badge != null && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-error text-white text-[9px] min-w-[15px] h-3.5 rounded-full flex items-center justify-center font-bold px-1 border border-white shadow">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center w-full h-full relative">
                <span className="text-xl filter grayscale opacity-40 hover:opacity-80 transition-all duration-200">
                  {item.icon}
                </span>
                {item.badge != null && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-[8px] min-w-[12px] h-3 rounded-full flex items-center justify-center font-bold px-0.5 border border-[#0E0D13] shadow">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
};
