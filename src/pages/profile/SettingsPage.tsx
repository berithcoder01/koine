// src/pages/profile/SettingsPage.tsx
import React from 'react';
import { useAppNavigation } from '@/hooks/useNavigation';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { signOut } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const SettingsPage: React.FC = () => {
  const navigation = useAppNavigation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.AUTH_LOGIN);
  };

  return (
    <div className="min-h-screen bg-background px-4 pt-safe pt-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={navigation.goBack} className="text-2xl text-textSecondary">←</button>
        <h1 className="text-xl font-bold text-textPrimary">Configurações</h1>
      </div>

      <div className="space-y-4">
        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-textPrimary text-sm mb-3">Aparência</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textPrimary font-medium">Tema</p>
              <p className="text-textSecondary text-xs">
                {theme === 'light' ? 'Claro' : 'Escuro'}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="w-14 h-8 rounded-full bg-primary relative transition-colors"
            >
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
              }`}>
                <span className="text-xs absolute top-0.5 left-1.5">
                  {theme === 'light' ? '☀️' : '🌙'}
                </span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-textPrimary text-sm mb-3">Conta</p>
          <Button label="Sair da conta" onClick={handleLogout} variant="danger" fullWidth />
        </div>
      </div>
    </div>
  );
};
