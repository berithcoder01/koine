export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  xpReward: number;
  condition: (progress: any) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── TRILHA PRINCIPAL ──
  {
    id: 'arquiteto_alfabeto',
    icon: '🏛️',
    title: 'Arquiteto do Alfabeto',
    description: 'Completou o Ciclo I — todas as 24 letras gregas',
    xpReward: 100,
    condition: (p) => p.completedUnits?.includes('C1'),
  },
  {
    id: 'primeiro_versiculo',
    icon: '📖',
    title: 'Primeiro Versículo',
    description: 'Leu João 1:1 sem assistência',
    xpReward: 50,
    condition: (p) => p.unlockedVerses?.includes('JN-1-1'),
  },
  {
    id: 'ciclo2_completo',
    icon: '💛',
    title: 'Amor em Grego',
    description: 'Completou o Ciclo II — leu 1 Coríntios 13:4',
    xpReward: 100,
    condition: (p) => p.unlockedVerses?.includes('1CO-13-4'),
  },
  {
    id: 'ciclo3_completo',
    icon: '💪',
    title: 'Força em Grego',
    description: 'Completou o Ciclo III — leu Filipenses 4:13',
    xpReward: 100,
    condition: (p) => p.unlockedVerses?.includes('FP-4-13'),
  },
  {
    id: 'mestre_koine',
    icon: '🏆',
    title: 'Mestre do Koiné',
    description: 'Completou todos os 8 ciclos',
    xpReward: 500,
    condition: (p) => p.completedUnits?.length >= 8,
  },
  {
    id: 'lenda_koine',
    icon: '💎',
    title: 'Lenda do Koiné',
    description: 'Todos os troféus de ouro desbloqueados',
    xpReward: 1000,
    condition: (p) => {
      const trophyVerses = ['JN-1-1', '1CO-13-4', 'FP-4-13'];
      return trophyVerses.every(id => p.unlockedVerses?.includes(id));
    },
  },

  // ── HISTÓRIA DO NT ──
  {
    id: 'historiador',
    icon: '🏛️',
    title: 'Historiador',
    description: 'Leu todas as unidades da Parte 1 (Mundo Helenístico)',
    xpReward: 30,
    condition: (p) => {
      const h1Units = ['H1-M01-U1','H1-M01-U2','H1-M01-U3','H1-M02-U1','H1-M02-U2','H1-M02-U3','H1-M03-U1','H1-M03-U2','H1-M03-U3','H1-M04-U1','H1-M04-U2','H1-M04-U3'];
      return h1Units.every(id => p.completedHistoryUnits?.includes(id));
    },
  },
  {
    id: 'evangelista',
    icon: '📜',
    title: 'Evangelista',
    description: 'Leu todas as 45 unidades da História do NT',
    xpReward: 150,
    condition: (p) => (p.completedHistoryUnits?.length ?? 0) >= 45,
  },
  {
    id: 'primeiro_capitulo',
    icon: '📄',
    title: 'Primeiro Capítulo',
    description: 'Leu a primeira unidade de história',
    xpReward: 10,
    condition: (p) => (p.completedHistoryUnits?.length ?? 0) >= 1,
  },

  // ── VOCABULÁRIO DO NT ──
  {
    id: 'primeira_palavra',
    icon: '📖',
    title: 'Primeira Palavra',
    description: 'Leu a primeira unidade de vocabulário',
    xpReward: 10,
    condition: (p) => (p.completedVocabUnits?.length ?? 0) >= 1,
  },
  {
    id: 'conectores_gregos',
    icon: '🔗',
    title: 'Conectores Gregos',
    description: 'Completou o módulo "Os Conectores" (V1-M01)',
    xpReward: 20,
    condition: (p) => ['V1-M01-U01','V1-M01-U02','V1-M01-U03'].every(id => p.completedVocabUnits?.includes(id)),
  },
  {
    id: 'cavaleiro_verbo',
    icon: '⚔️',
    title: 'Cavaleiro do Verbo',
    description: 'Completou todos os módulos de verbos (Bloco V2)',
    xpReward: 50,
    condition: (p) => {
      const v2Units = ['V2-M01-U01','V2-M01-U02','V2-M01-U03','V2-M02-U01','V2-M02-U02','V2-M02-U03','V2-M03-U01','V2-M03-U02','V2-M03-U03','V2-M04-U01','V2-M04-U02','V2-M04-U03'];
      return v2Units.every(id => p.completedVocabUnits?.includes(id));
    },
  },
  {
    id: 'lexicografo',
    icon: '📚',
    title: 'Lexicógrafo',
    description: 'Leu 50 unidades de vocabulário',
    xpReward: 75,
    condition: (p) => (p.completedVocabUnits?.length ?? 0) >= 50,
  },
  {
    id: 'mestre_vocabulario',
    icon: '🏆',
    title: 'Mestre do Vocabulário',
    description: 'Completou todas as 36 unidades de vocabulário',
    xpReward: 150,
    condition: (p) => (p.completedVocabUnits?.length ?? 0) >= 36,
  },

  // ── CANVAS / ESCRITA ──
  {
    id: 'primeira_letra',
    icon: '✍️',
    title: 'Primeira Letra',
    description: 'Completou sua primeira letra no Canvas',
    xpReward: 10,
    condition: (p) => (p.completedCanvasLetters?.length ?? 0) >= 1,
  },
  {
    id: 'alfabeto_grego',
    icon: '🅰️',
    title: 'Alfabeto Grego',
    description: 'Completou todas as 24 letras no Canvas',
    xpReward: 100,
    condition: (p) => (p.completedCanvasLetters?.length ?? 0) >= 24,
  },
  {
    id: 'caligrafo',
    icon: '🎨',
    title: 'Calígrafo',
    description: 'Completou 10 letras no Canvas',
    xpReward: 30,
    condition: (p) => (p.completedCanvasLetters?.length ?? 0) >= 10,
  },

  // ── REVISÃO ──
  {
    id: 'centena_grega',
    icon: '📚',
    title: 'Centena Grega',
    description: '100 palavras no deck de revisão',
    xpReward: 75,
    condition: (p) => (p.srsCardCount ?? 0) >= 100,
  },
  {
    id: 'memorizacao',
    icon: '🧠',
    title: 'Memorização',
    description: '50 palavras no deck de revisão',
    xpReward: 40,
    condition: (p) => (p.srsCardCount ?? 0) >= 50,
  },

  // ── META DIÁRIA ──
  {
    id: 'metaboss',
    icon: '🎮',
    title: 'Metáboss',
    description: 'Cumpriu a meta diária por 3 dias seguidos',
    xpReward: 15,
    condition: (p) => (p.dailyGoalStreak ?? 0) >= 3,
  },
  {
    id: 'fera_da_consistencia',
    icon: '🦁',
    title: 'Fera da Consistência',
    description: 'Cumpriu a meta diária por 7 dias distintos',
    xpReward: 30,
    condition: (p) => (p.dailyGoalStreak ?? 0) >= 7,
  },

  // ── STREAKS ──
  {
    id: 'trilha_em_chamas',
    icon: '🔥',
    title: 'Trilha em Chamas',
    description: '3 dias consecutivos de estudo',
    xpReward: 10,
    condition: (p) => p.streakDays >= 3,
  },
  {
    id: 'essa_trilha_e_minha',
    icon: '🛤️',
    title: 'Essa Trilha é Minha',
    description: '7 dias consecutivos de estudo',
    xpReward: 25,
    condition: (p) => p.streakDays >= 7,
  },
  {
    id: 'chama_viva',
    icon: '🔥',
    title: 'Chama Viva',
    description: '7 dias consecutivos de estudo',
    xpReward: 50,
    condition: (p) => p.streakDays >= 7,
  },
  {
    id: 'mes_completo',
    icon: '🌟',
    title: 'Mês Completo',
    description: '30 dias consecutivos de estudo',
    xpReward: 100,
    condition: (p) => p.streakDays >= 30,
  },
  {
    id: 'lenda',
    icon: '👑',
    title: 'Lenda',
    description: '100 dias consecutivos de estudo',
    xpReward: 250,
    condition: (p) => p.streakDays >= 100,
  },

  // ── GERAIS ──
  // ── DIGITAÇÃO ──
  {
    id: 'typing_first',
    icon: '⌨️',
    title: 'Primeiras Palavras',
    description: 'Completou o primeiro exercício de digitação',
    xpReward: 10,
    condition: (p) => (p.completedTypingSessions ?? 0) >= 1,
  },
  {
    id: 'typing_10',
    icon: '✍️',
    title: 'Mãos Ágeis',
    description: 'Completou 10 sessões de digitação',
    xpReward: 30,
    condition: (p) => (p.completedTypingSessions ?? 0) >= 10,
  },
  {
    id: 'typing_streak_3',
    icon: '🔥',
    title: 'Ritual Diário',
    description: 'Digitou por 3 dias consecutivos',
    xpReward: 15,
    condition: (p) => (p.completedTypingSessions ?? 0) >= 3,
  },
  {
    id: 'typing_perfect_session',
    icon: '💯',
    title: 'Sem Erros',
    description: 'Sessão de 10 palavras com 100% de acerto',
    xpReward: 50,
    condition: (p) => p.typingPerfectSession === true,
  },
  {
    id: 'typing_50_words',
    icon: '📜',
    title: 'Escriba do NT',
    description: 'Digitou 50 palavras únicas corretamente',
    xpReward: 75,
    condition: (p) => (p.uniqueTypedWords ?? 0) >= 50,
  },

  {
    id: 'velocista',
    icon: '⚡',
    title: 'Velocista',
    description: 'Completou uma lição em menos de 3 minutos',
    xpReward: 30,
    condition: (p) => p.fastLessonCompleted === true,
  },
];

export const XP_PER_LEVEL = 200;
export const getLevel = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const getXPForNextLevel = (xp: number) => XP_PER_LEVEL - (xp % XP_PER_LEVEL);
export const getLevelProgress = (xp: number) => ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
