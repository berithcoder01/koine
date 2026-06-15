import React from 'react';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { Button } from '@/ui/components/Button';
import { Sparkles, BookOpen, PenLine, Headphones, Zap, Infinity } from 'lucide-react';

const FEATURES = [
  { icon: <BookOpen size={20} />, label: 'Todos os 8 Ciclos de Lições', desc: 'Acesso completo ao conteúdo do Ciclo I ao VIII' },
  { icon: <PenLine size={20} />, label: 'Prática de Escrita Ilimitada', desc: 'Sem restrições de letras para praticar' },
  { icon: <Headphones size={20} />, label: 'Leitor Interlinear do NT', desc: 'Todo o Novo Testamento grego com análise morfológica' },
  { icon: <Zap size={20} />, label: 'XP Turbo', desc: 'Ganhe 2× XP em todas as atividades' },
  { icon: <Infinity size={20} />, label: 'Sem Anúncios', desc: 'Experiência de aprendizado contínua e sem interrupções' },
];

export const PaywallPage: React.FC = () => {
  const navigation = useAppNavigation();

  return (
    <SafeArea scrollable withBottomNav={false}>
      <div className="bg-gradient-to-b from-secondary/20 to-background px-6 pt-8 pb-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
          <Sparkles size={32} className="text-secondary" />
        </div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white tracking-tight mb-2">
          Koiné Premium
        </h1>
        <p className="text-text-secondary dark:text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
          Desbloqueie todo o potencial do seu aprendizado de grego coiné
        </p>
      </div>

      <div className="px-6 py-6 flex flex-col gap-3">
        {FEATURES.map((feat, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-surface dark:bg-surface-alt dark:border dark:border-border/10 rounded-2xl p-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 text-secondary">
              {feat.icon}
            </div>
            <div>
              <p className="text-text-primary dark:text-white font-bold text-sm">{feat.label}</p>
              <p className="text-text-secondary dark:text-zinc-400 text-xs">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-8 pt-2 flex flex-col gap-3">
        <Button label="Assinar Premium" onClick={() => {}} fullWidth size="lg" variant="secondary" radius="full" />
        <Button label="Continuar Grátis" onClick={navigation.goBack} fullWidth variant="ghost" radius="full" />
      </div>
    </SafeArea>
  );
};
