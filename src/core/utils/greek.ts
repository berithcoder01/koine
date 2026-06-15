const GREEK_PUNCTUATION = /[,\.·;'’:\-‑–—‒_«»""„“‟′‴""‹›〞〟'·;⸂⸃⸄⸅⸀⸁⸉⸊⸋)\](}\[{(]/g;

export function stripGreekPunctuation(word: string): string {
  return word.replace(GREEK_PUNCTUATION, '').trim();
}

export function stripGreekPunctuationDeep(word: string): string {
  return word.replace(/[^α-ωἀ-ὼἈ-ῼΑ-Ωa-zA-Z]/g, '').trim();
}
