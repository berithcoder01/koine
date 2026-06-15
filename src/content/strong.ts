// src/content/strong.ts
// Re-exports the Strong dictionary from the bundled JSON asset so that
// pedagogical code (lessons, lexicon, reader) can consume it as typed data.
import strongData from '@/assets/strong.json';

export interface StrongEntry {
  id: string;
  number: number;
  greek: string;
  translit?: string;
  pronunciation?: string;
  pos?: string;
  origin?: string;
  definitions: string[];
  name?: string;
}

export const STRONG_DICTIONARY: StrongEntry[] = strongData as StrongEntry[];

// Aceita tanto o id prefixado ("G3056") quanto o número cru ("3056" / 3056)
export const findStrong = (idOrNumber: string | number): StrongEntry | undefined => {
  const numeric = typeof idOrNumber === 'number'
    ? idOrNumber
    : (String(idOrNumber).toUpperCase().startsWith('G')
        ? Number(String(idOrNumber).slice(1))
        : Number(idOrNumber));
  if (!Number.isFinite(numeric) || (numeric as number) <= 0) return undefined;
  return STRONG_DICTIONARY.find((e) => e.number === numeric);
};

// Resolve a Strong's id like "G3056" to its entry. Accepts both the prefixed
// form (G3056) and the bare number (3056) for safety.
export const findStrongById = (strongId: string | undefined | null): StrongEntry | undefined => {
  if (!strongId) return undefined;
  const trimmed = String(strongId).trim();
  if (!trimmed) return undefined;
  const numeric = trimmed.toUpperCase().startsWith('G')
    ? Number(trimmed.slice(1))
    : Number(trimmed);
  if (!Number.isFinite(numeric) || numeric <= 0) return undefined;
  return STRONG_DICTIONARY.find((e) => e.number === numeric);
};
