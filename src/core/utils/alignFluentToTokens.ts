/**
 * Alinha palavras do fluentPT (Bíblia Livre) aos tokens gregos.
 *
 * Estratégia: para cada token, busca a palavra do fluentPT com maior
 * similaridade ao glossPT (ponte). Usa matching ganancioso por similaridade
 * decrescente, sem viés posicional (a ordem grega e portuguesa divergem).
 *
 * Retorna array de strings (tamanho = tokens.length).
 */
export function alignFluentToTokens(
  tokens: { glossPT?: string; glossSource?: string }[],
  fluentText: string,
): string[] {
  if (!fluentText || tokens.length === 0) {
    return tokens.map((t) => t.glossPT ?? '');
  }

  const fluentWords = fluentText.split(/\s+/);
  const n = tokens.length;
  const m = fluentWords.length;

  const normFluent = fluentWords.map(normalize);
  const glossOptionsList = tokens.map((t) => {
    const gloss = t.glossPT ?? '';
    return gloss
      .split('/')
      .map((o) => normalize(o.trim()))
      .filter(Boolean);
  });

  // Para cada par (token, fluentWord), calcular score de similaridade
  const pairs: { ti: number; fi: number; score: number }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const score = computeSimilarity(glossOptionsList[i], normFluent[j]);
      if (score > 0) pairs.push({ ti: i, fi: j, score });
    }
  }

  // Ordenar por score desc, depois por proximidade posicional (tiebreaker)
  pairs.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Math.abs(a.ti * (m / n) - a.fi) - Math.abs(b.ti * (m / n) - b.fi);
  });

  // Greedy assignment
  const usedTokens = new Set<number>();
  const usedFluent = new Set<number>();
  const result: string[] = new Array(n).fill('');

  for (const { ti, fi, score } of pairs) {
    if (usedTokens.has(ti) || usedFluent.has(fi)) continue;
    if (score < 3) continue; // mínimo para considerar match
    result[ti] = fluentWords[fi];
    usedTokens.add(ti);
    usedFluent.add(fi);
  }

  // Tokens sem match → glossPT original
  for (let i = 0; i < n; i++) {
    if (!result[i]) result[i] = tokens[i].glossPT ?? '';
  }

  return result;
}

function computeSimilarity(glossOpts: string[], normWord: string): number {
  if (!normWord || glossOpts.length === 0) return 0;
  let best = 0;
  for (const opt of glossOpts) {
    if (!opt) continue;
    if (opt === normWord) { best = Math.max(best, 10); continue; }
    if (normWord.includes(opt) && opt.length >= 2) { best = Math.max(best, 7); continue; }
    if (opt.includes(normWord) && normWord.length >= 2) { best = Math.max(best, 6); continue; }
    if (opt.length >= 3 && normWord.length >= 3) {
      let ml = 0;
      const minL = Math.min(opt.length, normWord.length);
      for (let k = 0; k < minL; k++) {
        if (opt[k] === normWord[k]) ml++; else break;
      }
      if (ml >= 3) best = Math.max(best, 3 + ml);
    }
  }
  return best;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,;:!?""''()\-—–\u2026]/g, '')
    .trim();
}
