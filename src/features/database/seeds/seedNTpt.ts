// src/features/database/seeds/seedNTpt.ts
// NO-OP: nt_pt e nt_interlinear agora vivem em koine_core.db (coreDb, pré-populado).
// O app usa getCoreDB() para acessar essas tabelas. Este seed não faz mais nada.

export const seedNTpt = async (onProgress?: (pct: number) => void): Promise<void> => {
  console.log('[Seed] seedNTpt: NO-OP (nt_pt/nt_interlinear agora em koine_core.db)');
  onProgress?.(100);
};