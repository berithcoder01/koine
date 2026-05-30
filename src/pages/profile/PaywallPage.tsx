// src/pages/profile/PaywallPage.tsx
import React from 'react';
import { useAppNavigation } from '@/hooks/useNavigation';
import { Button } from '@/components/ui/Button';

export const PaywallPage: React.FC = () => {
  const navigation = useAppNavigation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <p className="text-6xl mb-4">👑</p>
      <h1 className="text-xl font-bold text-text-primary mb-2">Koiné Premium</h1>
      <p className="text-text-secondary text-center mb-6">
        Desbloqueie todos os ciclos e funcionalidades
      </p>
      <Button label="Voltar" onClick={navigation.goBack} variant="ghost" />
    </div>
  );
};
