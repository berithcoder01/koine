// src/types/gamification.types.ts

export type LeagueLevel = 'bronze' | 'prata' | 'ouro' | 'diamante';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string; // ISO date
}

export interface LeagueEntry {
  uid: string;
  displayName: string;
  weeklyXP: number;
  leagueLevel: LeagueLevel;
  rank: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'alphabet_builder',
    title: 'Arquiteto do Alfabeto',
    description: 'Completou o Ciclo I — o alfabeto grego completo!',
    icon: '🏛️',
    xpReward: 100,
  },
  {
    id: 'first_verse',
    title: 'Primeiro Versículo',
    description: 'Leu João 1:1 sem assistência pela primeira vez.',
    icon: '📖',
    xpReward: 50,
  },
  {
    id: 'flame_alive',
    title: 'Chama Viva',
    description: 'Estudou 7 dias consecutivos.',
    icon: '🔥',
    xpReward: 30,
  },
  {
    id: 'hundred_greek',
    title: 'Centena Grega',
    description: '100 palavras no deck SRS.',
    icon: '📚',
    xpReward: 50,
  },
  {
    id: 'speedster',
    title: 'Velocista',
    description: 'Completou uma lição em menos de 3 minutos.',
    icon: '⚡',
    xpReward: 20,
  },
  {
    id: 'koine_master',
    title: 'Mestre do Koiné',
    description: 'Completou todos os 8 ciclos.',
    icon: '🏆',
    xpReward: 500,
  },
];
