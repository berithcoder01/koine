export type TrophyTier = 'none' | 'bronze' | 'prata' | 'ouro';

export interface TrophyTierDef {
  label: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  gradient: string;
}

export interface TrophyDef {
  cycleId: number;
  verseId: string;
  verse: string;
  reference: string;
  tiers: Record<Exclude<TrophyTier, 'none'>, TrophyTierDef>;
}

export const TROPHY_TIERS: Record<Exclude<TrophyTier, 'none'>, TrophyTierDef> = {
  bronze: {
    label: 'Bronze',
    subtitle: 'Desafiante Nível 1',
    color: '#CD7F32',
    bgColor: 'bg-amber-700/10',
    borderColor: 'border-amber-700/30',
    icon: '🥉',
    gradient: 'from-amber-900/30 to-amber-800/10',
  },
  prata: {
    label: 'Prata',
    subtitle: 'Desafiante Nível 2',
    color: '#A8A9AD',
    bgColor: 'bg-zinc-300/10',
    borderColor: 'border-zinc-400/30',
    icon: '🥈',
    gradient: 'from-zinc-400/20 to-zinc-300/5',
  },
  ouro: {
    label: 'Ouro',
    subtitle: 'Mestre do Ciclo',
    color: '#FFD700',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    icon: '🥇',
    gradient: 'from-yellow-500/20 to-amber-400/5',
  },
};

export const TROPHIES: TrophyDef[] = [
  {
    cycleId: 1,
    verseId: 'JN-1-1',
    verse: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος',
    reference: 'João 1:1',
    tiers: {
      bronze: { ...TROPHY_TIERS.bronze, label: 'Bronze', subtitle: 'Desafiante Nível 1' },
      prata: { ...TROPHY_TIERS.prata, label: 'Prata', subtitle: 'Desafiante Nível 2' },
      ouro: { ...TROPHY_TIERS.ouro, label: 'Ouro', subtitle: 'Mestre do Ciclo' },
    },
  },
  {
    cycleId: 2,
    verseId: '1CO-13-4',
    verse: 'ἡ ἀγάπη μακροθυμεῖ, χρηστεύεται ἡ ἀγάπη, οὐ ζηλοῖ, οὐ περπερεύεται, οὐ φυσιοῦται',
    reference: '1 Coríntios 13:4',
    tiers: {
      bronze: { ...TROPHY_TIERS.bronze, label: 'Bronze', subtitle: 'Desafiante Nível 1' },
      prata: { ...TROPHY_TIERS.prata, label: 'Prata', subtitle: 'Desafiante Nível 2' },
      ouro: { ...TROPHY_TIERS.ouro, label: 'Ouro', subtitle: 'Mestre do Ciclo' },
    },
  },
  {
    cycleId: 3,
    verseId: 'FP-4-13',
    verse: 'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
    reference: 'Filipenses 4:13',
    tiers: {
      bronze: { ...TROPHY_TIERS.bronze, label: 'Bronze', subtitle: 'Desafiante Nível 1' },
      prata: { ...TROPHY_TIERS.prata, label: 'Prata', subtitle: 'Desafiante Nível 2' },
      ouro: { ...TROPHY_TIERS.ouro, label: 'Ouro', subtitle: 'Mestre do Ciclo' },
    },
  },
];

export const DIAMANTE_TROPHY = {
  label: 'Diamante',
  subtitle: 'Lenda do Koiné',
  color: '#B9F2FF',
  icon: '💎',
  description: 'Todos os troféus de ouro desbloqueados',
  gradient: 'from-cyan-400/20 to-blue-500/5',
  borderColor: 'border-cyan-400/30',
};

export function getTrophyForCycle(cycleId: number): TrophyDef | undefined {
  return TROPHIES.find(t => t.cycleId === cycleId);
}

export function calculateTrophyTier(
  completedLessons: number,
  totalModules: number
): TrophyTier {
  if (completedLessons === 0 || totalModules === 0) return 'none';
  const progress = completedLessons / totalModules;
  if (progress >= 1) return 'ouro';
  if (progress >= 0.5) return 'prata';
  return 'bronze';
}

export function getTrophyTierDef(tier: TrophyTier): TrophyTierDef | null {
  if (tier === 'none') return null;
  return TROPHY_TIERS[tier];
}
