// src/pages/trail/components/UnitDetailSheet.tsx
import React from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { GreekText } from '@/components/greek/GreekText';

interface Module {
  id: string;
  title: string;
  anchor_verse: string;
  anchor_reference: string;
  xp_total: number;
  total_exercises: number;
  method_primary: string;
}

interface UnitDetailSheetProps {
  module: Module | null;
  onClose: () => void;
  onStart: (moduleId: string) => void;
}

export const UnitDetailSheet: React.FC<UnitDetailSheetProps> = ({ module, onClose, onStart }) => (
  <BottomSheet isOpen={!!module} onClose={onClose} title={module?.title}>
    {module && (
      <div className="flex flex-col gap-4">
        <div className="bg-background rounded-xl p-4">
          <p className="text-xs text-text-secondary mb-2 uppercase tracking-wide font-medium">
            Versículo Âncora
          </p>
          <GreekText text={module.anchor_verse} size="md" />
          <p className="text-text-secondary text-xs mt-2">{module.anchor_reference}</p>
        </div>

        <div className="bg-background rounded-xl p-4">
          <p className="text-xs text-text-secondary mb-1 uppercase tracking-wide font-medium">
            Método
          </p>
          <p className="text-text-primary text-sm">{module.method_primary}</p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-secondary/10 rounded-xl p-3 text-center">
            <p className="text-secondary font-bold text-lg">+{module.xp_total}</p>
            <p className="text-text-secondary text-xs">XP total</p>
          </div>
          <div className="flex-1 bg-primary/10 rounded-xl p-3 text-center">
            <p className="text-primary font-bold text-lg">{module.total_exercises}</p>
            <p className="text-text-secondary text-xs">Exercícios</p>
          </div>
        </div>

        <Button
          label="Iniciar Módulo"
          onClick={() => onStart(module.id)}
          fullWidth
          size="lg"
        />
      </div>
    )}
  </BottomSheet>
);
