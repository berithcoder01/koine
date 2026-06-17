// src/services/database/seedNT.ts
// NO-OP: nt_text agora vive em koine_core.db (coreDb, pré-populado).
// O app usa getCoreDB() para acessar nt_text.

export const seedNT = async (onProgress?: (pct: number) => void) => {
  console.log('[Seed] seedNT: NO-OP (nt_text agora em koine_core.db)');
  onProgress?.(100);
};
