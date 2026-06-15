import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { BottomNav } from '@/ui/layouts/BottomNav';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { Keyboard, ArrowRight, ArrowLeft, Trophy, BookOpen, RotateCcw, Save } from 'lucide-react';
import { clsx } from 'clsx';
import { TYPING_PACKAGES } from '@/features/typing/useTypingSession';

export const TypingTrailPage: React.FC = () => {
  const navigation = useAppNavigation();
  const navigate = useNavigate();

  const handleStartPackage = (pkgId: string) => {
    navigate(`/typing/session?package=${pkgId}`);
  };

  return (
    <SafeArea scrollable withBottomNav>
      <div className="flex-shrink-0 px-4 pt-6 pb-5 transition-colors duration-200">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={navigation.goBack}
            className="w-10 h-10 !rounded-full bg-surface dark:bg-surface-alt flex items-center justify-center border border-border/40 shadow-sm active:scale-95 transition-transform shrink-0"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} className="text-text-primary dark:text-white" />
          </button>
          <div>
            <p className="text-text-secondary dark:text-zinc-400 text-xs font-semibold">Extra</p>
            <h1 className="text-text-primary dark:text-white font-extrabold text-2xl tracking-tight mt-0.5">
              Treino de Digitação
            </h1>
          </div>
        </div>

        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-4">
          <p className="font-black text-sm text-text-primary dark:text-white">
            Pratique a digitação em grego
          </p>
          <p className="text-text-secondary dark:text-zinc-400 text-xs mt-1 leading-relaxed">
            Escolha um pacote de palavras e comece a treinar. A cada sessão de 10 palavras, você acumula XP e fortalece seu vocabulário.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-28">
        <div className="flex items-center gap-2 mb-2">
          <Keyboard size={18} className="text-secondary" />
          <span className="text-text-primary dark:text-white font-bold text-sm">Pacotes de Palavras</span>
        </div>

        {TYPING_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => pkg.unlocked && handleStartPackage(pkg.id)}
            className={clsx(
              'bg-surface/50 dark:bg-surface-alt/30 border border-border/40 dark:border-border/10 rounded-3xl p-5 shadow-sm',
              pkg.unlocked ? 'cursor-pointer active:scale-[0.98] transition-transform' : 'opacity-50 pointer-events-none',
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                {pkg.id === 'cycle1' && <BookOpen size={20} className="text-primary" />}
                {pkg.id === 'top100' && <Trophy size={20} className="text-primary" />}
                {pkg.id === 'saved' && <Save size={20} className="text-primary" />}
                {pkg.id === 'errors' && <RotateCcw size={20} className="text-primary" />}
              </div>
              <div className="flex-1">
                <h2 className="text-text-primary dark:text-white font-bold text-sm">{pkg.title}</h2>
                <p className="text-text-secondary dark:text-zinc-400 text-[11px]">{pkg.description}</p>
              </div>
              <ArrowRight size={18} className="text-text-secondary" />
            </div>

            {!pkg.unlocked && (
              <div className="mt-2 pt-2 border-t border-border/20">
                <span className="text-text-secondary text-[10px] font-semibold">Complete mais módulos para desbloquear</span>
              </div>
            )}
          </div>
        ))}

        <div className="mt-4 p-4 bg-lagune/5 border border-lagune/20 rounded-2xl">
          <p className="text-text-primary dark:text-white font-bold text-sm mb-1">Dica</p>
          <p className="text-text-secondary dark:text-zinc-400 text-xs leading-relaxed">
            Comece pelo modo Cópia para treinar a posição das letras. Depois de confortável, tente o modo Tradução!
          </p>
        </div>
      </div>

      <BottomNav />
    </SafeArea>
  );
};
