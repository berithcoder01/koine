// src/components/layout/BottomNav.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { clsx } from 'clsx';

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
    { icon: '👤', label: 'Perfil', route: ROUTES.PROFILE, badge: achievementsCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-20 pb-2">
      <div className="flex">
        {items.map((item) => {
          const isActive = location.pathname.startsWith(item.route);
          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={clsx(
                'flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors duration-150 min-h-[56px]',
                isActive ? 'text-primary' : 'text-text-secondary',
              )}
            >
              <div className="relative">
                <span className="text-2xl">{item.icon}</span>
                {item.badge != null && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-error text-white text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-bold px-1">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={clsx(
                'text-xs font-medium',
                isActive && 'font-bold',
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
