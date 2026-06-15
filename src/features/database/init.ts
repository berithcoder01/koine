// src/services/database/init.ts
import { databaseService } from './sqlite';
import { seedDatabase } from './seeds/seed';
import { seedLetters } from './seeds/seedLetters';
import { seedCoreVocabulary } from './seeds/seedVocabulary';
import { seedStrong } from './seeds/seedStrong';
import { seedNT } from './seeds/seedNT';
import { seedNTpt } from './seeds/seedNTpt';
import { seedLearningUnits } from './seeds/seedLearningUnits';

type ProgressCallback = (percent: number) => void;
type SeedProgressCallback = (percent: number) => void;

/**
 * Seeds are weighted by relative cost (ms estimate).
 * Total weight must sum to 100 for accurate percentage reporting.
 */
const SEEDS: Array<{
  name: string;
  weight: number;
  fn: (onProgress?: SeedProgressCallback) => Promise<void>;
}> = [
  { name: 'Schema',          weight: 5,  fn: seedDatabase },
  { name: 'Letters',         weight: 5,  fn: seedLetters },
  { name: 'Vocabulary',      weight: 10, fn: seedCoreVocabulary },
  { name: 'Strong',          weight: 20, fn: seedStrong },
  { name: 'LearningUnits',   weight: 10, fn: seedLearningUnits },
  { name: 'NT Verses',       weight: 20, fn: seedNT },
  { name: 'NT Portuguese',   weight: 30, fn: seedNTpt },
];

export const initializeDatabase = async (onProgress?: ProgressCallback) => {
  const report = (pct: number) => onProgress?.(Math.min(100, Math.round(pct)));

  // SQLite init → 0 %
  report(0);
  try {
    await databaseService.initialize();
  } catch (err) {
    console.error('[Database Init] Critical: Failed to initialize SQLite database:', err);
    throw err;
  }
  report(2);

  const totalWeight = SEEDS.reduce((acc, s) => acc + s.weight, 0);
  let accumulated = 2; // 2% already used for SQLite init

  for (const seed of SEEDS) {
    try {
      const handleSeedProgress = (seedPct: number) => {
        const seedContribution = ((seed.weight * (seedPct / 100)) / totalWeight) * 98;
        report(accumulated + seedContribution);
      };
      await seed.fn(handleSeedProgress);
    } catch (err) {
      console.warn(`[Database Init] Warning: Seed "${seed.name}" failed:`, err);
    }
    // Map remaining 98% proportionally across seeds
    accumulated += (seed.weight / totalWeight) * 98;
    report(accumulated);
  }

  report(100);
};

