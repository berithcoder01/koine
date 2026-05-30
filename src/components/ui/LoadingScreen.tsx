import React from 'react';
import { Spinner } from '@heroui/react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Carregando...',
}) => (
  <div className="fixed inset-0 bg-primary flex flex-col items-center justify-center z-50">
    <p className="font-greek text-secondary text-5xl mb-6">Κοινή</p>
    <Spinner color="secondary" size="lg" className="mb-4" />
    <p className="text-white/60 text-sm">{message}</p>
  </div>
);
