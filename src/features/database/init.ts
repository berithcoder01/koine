// src/services/database/init.ts
import { databaseService } from './sqlite';
import { seedDatabase } from './seeds/seed';
import { seedLetters } from './seeds/seedLetters';
import { seedCoreVocabulary } from './seeds/seedVocabulary';
import { seedLearningUnits } from './seeds/seedLearningUnits';

type ProgressCallback = (percent: number) => void;
type SeedFn = (onProgress?: (pct: number) => void) => Promise<void>;

// Global flag to prevent duplicate seeding
enum SeedState {
  NOT_STARTED = 0,
  IN_PROGRESS,
  COMPLETED
}
let _seedState = SeedState.NOT_STARTED;

const SEEDS_WEIGHTS: Array<{ name: string; weight: number; fn: SeedFn }> = [
  { name: 'Schema', weight: 5, fn: seedDatabase },
  { name: 'Letters', weight: 5, fn: seedLetters },
  { name: 'Vocabulary', weight: 10, fn: seedCoreVocabulary },
  { name: 'LearningUnits', weight: 10, fn: seedLearningUnits },
];

export const initializeDatabase = async (onProgress?: ProgressCallback) => {
  const report = (pct: number) => onProgress?.(Math.min(100, Math.round(pct)));

  // Always initialize SQLite
  report(0);
  try {
    await databaseService.initialize();
  } catch (err) {
    console.error('[Database Init] Critical: Failed to initialize SQLite database:', err);
    throw err;
  }

  // Only seed once per app session
  if (_seedState === SeedState.COMPLETED) {
    report(100);
    return;
  }

  // Mark as in progress to block duplicate calls
  if (_seedState === SeedState.NOT_STARTED) {
    _seedState = SeedState.IN_PROGRESS;
  } else if (_seedState === SeedState.IN_PROGRESS) {
    // Skip seeds but report fake progress to keep UI feedback
    let mockedProgress = 0;
    while (_seedState === SeedState.IN_PROGRESS) {
      await new Promise(resolve => setTimeout(resolve, 200));
      // Linear progress reporting to mimic ongoing seeding
      mockedProgress = Math.min(99, mockedProgress + 2);
      report(mockedProgress);
    }
    report(100);
    return;
  }

  report(2);

  const totalWeight = SEEDS_WEIGHTS.reduce((acc, s) => acc + s.weight, 0);
  let accumulated = 2; // 2% already used for SQLite init

  for (const seed of SEEDS_WEIGHTS) {
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

  _seedState = SeedState.COMPLETED;
  report(100);
};

