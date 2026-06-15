import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/core/constants/routes';
import { motion } from 'framer-motion';
import { Compass, Sparkles, BookOpen, BookMarked, User as UserIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface NavItem {
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  label: string;
  route: string;
  badge?: number;
}

interface BottomNavProps {
  srsCount?: number;
  achievementsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  srsCount: _srsCount = 0,
  achievementsCount = 0,
}) => {
  void _srsCount;
  const location = useLocation();
  const navigate = useNavigate();

  const items: NavItem[] = [
    { icon: Compass, label: 'Trilha', route: ROUTES.TRAIL },
    { icon: Sparkles, label: 'Atividades', route: ROUTES.REVIEW },
    { icon: BookOpen, label: 'NT', route: ROUTES.READER },
    { icon: BookMarked, label: 'Lexicon', route: ROUTES.LEXICON },
    { icon: UserIcon, label: 'Perfil', route: ROUTES.PROFILE, badge: achievementsCount },
  ];

  return (
    <nav className={clsx(
      'fixed bottom-6 left-6 right-6 z-20 rounded-[28px] shadow-2xl px-3 py-2 flex items-center justify-around h-16',
      'bg-white border border-zinc-200',
      'dark:bg-zinc-900 dark:border-zinc-800',
    )}>
      {items.map((item) => {
        const isActive = location.pathname.startsWith(item.route);
        const IconComponent = item.icon;

        return (
          <button
            key={item.route}
            onClick={() => navigate(item.route)}
            className="relative flex items-center justify-center w-12 h-12 cursor-pointer outline-none select-none"
          >
            {isActive ? (
              <motion.div
                layoutId="activeTabCircle"
                className={clsx(
                  'absolute inset-0 rounded-full flex items-center justify-center shadow-lg',
                  'bg-secondary',
                )}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              >
                <IconComponent
                  size={20}
                  className="text-zinc-900"
                />
                {item.badge != null && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-error text-white text-[9px] min-w-[15px] h-3.5 rounded-full flex items-center justify-center font-bold px-1 border border-white shadow">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center w-full h-full relative">
                <IconComponent
                  size={20}
                  className={clsx(
                    'transition-all duration-200',
                    'text-zinc-400 hover:text-zinc-700',
                    'dark:text-zinc-500 dark:hover:text-zinc-200',
                  )}
                />
                {item.badge != null && item.badge > 0 && (
                  <span className={clsx(
                    'absolute -top-1 -right-1 text-[8px] min-w-[12px] h-3 rounded-full flex items-center justify-center font-bold px-0.5 shadow',
                    'bg-error text-white border-white',
                    'dark:border-zinc-900',
                  )}>
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
