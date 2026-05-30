export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  xpReward: number;
  condition: (progress: any) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
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
    id: 'chama_viva',
    icon: '🔥',
    title: 'Chama Viva',
    description: '7 dias consecutivos de estudo',
    xpReward: 50,
    condition: (p) => p.streakDays >= 7,
  },
  {
    id: 'centena_grega',
    icon: '📚',
    title: 'Centena Grega',
    description: '100 palavras no deck SRS',
    xpReward: 75,
    condition: (p) => (p.srsCardCount ?? 0) >= 100,
  },
  {
    id: 'velocista',
    icon: '⚡',
    title: 'Velocista',
    description: 'Completou uma lição em menos de 3 minutos',
    xpReward: 30,
    condition: (p) => p.fastLessonCompleted === true,
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
    id: 'ciclo2_completo',
    icon: '💛',
    title: 'Amor em Grego',
    description: 'Completou o Ciclo II — leu 1 João 4:8',
    xpReward: 100,
    condition: (p) => p.unlockedVerses?.includes('1JN-4-8'),
  },
];

export const XP_PER_LEVEL = 200;
export const getLevel = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const getXPForNextLevel = (xp: number) => XP_PER_LEVEL - (xp % XP_PER_LEVEL);
export const getLevelProgress = (xp: number) => ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
