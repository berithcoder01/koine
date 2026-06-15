import type { TypingResult } from './typingTypes';

export function normalizeGreek(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u1f00-\u1fff]/g, (c) => {
      const base = c.normalize('NFD')[0];
      return base ?? c;
    })
    .replace(/[ς]/g, 'σ')
    .toLowerCase();
}

export function compareGreekWords(
  input: string,
  correct: string,
  strictDiacritics: boolean = false
): TypingResult {
  const normalizedInput = strictDiacritics ? input : normalizeGreek(input);
  const normalizedCorrect = strictDiacritics ? correct : normalizeGreek(correct);

  return {
    isCorrect: normalizedInput === normalizedCorrect,
    score: calculateSimilarity(normalizedInput, normalizedCorrect),
    errorPositions: findErrorPositions(normalizedInput, normalizedCorrect),
  };
}

function calculateSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  const maxLen = Math.max(a.length, b.length);
  const distance = levenshteinDistance(a, b);
  return 1 - distance / maxLen;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }
  return matrix[b.length][a.length];
}

function findErrorPositions(input: string, correct: string): number[] {
  const positions: number[] = [];
  const maxLen = Math.max(input.length, correct.length);
  for (let i = 0; i < maxLen; i++) {
    if (input[i] !== correct[i]) positions.push(i);
  }
  return positions;
}

export function getLetterFeedback(
  input: string,
  correct: string,
  strictDiacritics: boolean,
): { char: string; isCorrect: boolean }[] {
  const normInput = strictDiacritics ? input : normalizeGreek(input);
  const normCorrect = strictDiacritics ? correct : normalizeGreek(correct);
  const feedback: { char: string; isCorrect: boolean }[] = [];

  for (let i = 0; i < normInput.length; i++) {
    feedback.push({
      char: input[i] ?? '',
      isCorrect: normInput[i] === normCorrect[i],
    });
  }
  return feedback;
}

export const GREEK_LOWERCASE = [
  'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ',
  'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π',
  'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω',
] as const;

export const GREEK_UPPERCASE: Record<string, string> = {
  α: 'Α', β: 'Β', γ: 'Γ', δ: 'Δ', ε: 'Ε', ζ: 'Ζ', η: 'Η', θ: 'Θ',
  ι: 'Ι', κ: 'Κ', λ: 'Λ', μ: 'Μ', ν: 'Ν', ξ: 'Ξ', ο: 'Ο', π: 'Π',
  ρ: 'Ρ', σ: 'Σ', ς: 'Σ', τ: 'Τ', υ: 'Υ', φ: 'Φ', χ: 'Χ', ψ: 'Ψ', ω: 'Ω',
};
