// src/core/types/history.types.ts

export type HistoryBlock = 'H1' | 'H2' | 'H3' | 'H4';

export interface HistoryBlockInfo {
  id: HistoryBlock;
  title: string;
  subtitle: string;
  description: string;
  trophyVerse: string;
  trophyReference: string;
  isPremium: boolean;
  moduleIds: string[];
  metaGoal: string;
}

export interface HistoryModule {
  id: string;              // "H1-M01"
  blockId: HistoryBlock;
  order: number;           // position within block
  title: string;
  description: string;
  anchorWord: string;      // Greek word
  anchorMeaning: string;   // Portuguese meaning
  period: string;          // e.g. "336 a.C. – 30 d.C."
  places: string;          // e.g. "Macedônia, Alexandria, Antioquia"
  xp: number;
  unitCount: number;
  isPremium?: boolean;
}

export interface HistoryUnit {
  id: string;              // "H1-M01-U01"
  moduleId: string;
  unitOrder: number;
  title: string;
  periodLabel: string;
  locationLabel: string;
  keyFigure: string;
  artifactNote: string;
  artifactImage?: string;  // e.g. "artifacts/H1/pilatus-inscription.jpg"
  bibleConnection: string;
  content: string;         // Main narrative content (markdown)
  isPremium: boolean;
}
