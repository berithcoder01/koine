// src/services/database/init.ts
import { databaseService } from './sqlite';
import { seedDatabase } from './seed';
import { seedLetters } from './seedLetters';
import { seedCoreVocabulary } from './seedVocabulary';
import { seedStrong } from './seedStrong';
import { seedLessonContent } from './seedLessonContent';
import { seedExercises } from './seedExercises';
import { seedNT } from './seedNT';

export const initializeDatabase = async () => {
  try {
    await databaseService.initialize();
  } catch (err) {
    console.error('[Database Init] Critical: Failed to initialize SQLite database:', err);
    throw err;
  }

  // Schema + cycles/modules must run first (table dependency)
  try {
    await seedDatabase();
  } catch (err) {
    console.error('[Database Init] Critical: Failed to seed cycles/modules:', err);
    throw err;
  }

  const runSafeSeed = async (name: string, seedFunc: () => Promise<void>) => {
    try {
      await seedFunc();
    } catch (err) {
      console.warn(`[Database Init] Warning: Optional seed "${name}" failed:`, err);
    }
  };

  // Parallel: letters, vocabulary, strong (no cross-dependency)
  await Promise.all([
    runSafeSeed('Letters', seedLetters),
    runSafeSeed('Vocabulary', seedCoreVocabulary),
    runSafeSeed('Strong Dictionary', seedStrong),
  ]);

  // Lesson content and exercises depend on modules being seeded
  await Promise.all([
    runSafeSeed('Lesson Content', seedLessonContent),
    runSafeSeed('Exercises', seedExercises),
  ]);

  // NT key verses (independent)
  await runSafeSeed('New Testament Verses', seedNT);
};
