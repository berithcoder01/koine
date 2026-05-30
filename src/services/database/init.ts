// src/services/database/init.ts
import { databaseService } from './sqlite';
import { seedDatabase } from './seed';
import { seedLetters } from './seedLetters';
import { seedCoreVocabulary } from './seedVocabulary';

export const initializeDatabase = async () => {
  await databaseService.initialize();
  await seedDatabase();
  await seedLetters();
  await seedCoreVocabulary();
};
