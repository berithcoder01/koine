// src/scripts/buildGlossary.ts
// Analisa nt_text.json e gera src/assets/nt_glossary.json com as top-N palavras
// do NT (por frequência de lemma), já com gloss PT aplicado via MANUAL_GLOSSES.
//
// Saída: nt_glossary.json com shape:
//   { lemma, parsing, count, gloss, glossSource }
//
// Execução: npm run build-glossary

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { MANUAL_GLOSSES, GLOSSARY_VERSION } from '../content/nt/glossarySeed';

const NT_TEXT = join(import.meta.dirname, '..', 'assets', 'nt_text.json');
const OUTPUT = join(import.meta.dirname, '..', 'assets', 'nt_glossary.json');
const TOP_N = 0;

interface NTRow {
  lemma: string;
  parsing: string;
}

interface GlossaryEntry {
  lemma: string;
  parsing: string;
  count: number;
  gloss: string;
  glossSource: 'manual' | 'strong' | 'translit' | 'pending';
}

async function main() {
  console.log('[buildGlossary] Lendo nt_text.json...');
  const rows: NTRow[] = JSON.parse(readFileSync(NT_TEXT, 'utf-8'));
  console.log(`[buildGlossary] ${rows.length} tokens totais`);

  // Agrupa por (lemma, parsing) — porque o mesmo lemma pode ter parsing
  // diferente e precisar de gloss diferente (ex: substantivo vs verbo).
  // O parsing do SBLGNT tem formato "----NSM-" (8 chars, Robinson-like).
  // Pegamos só os 3 primeiros chars da parte de caso (NSM, GSM, etc.).
  const stats = new Map<string, { lemma: string; parsing: string; count: number }>();
  for (const r of rows) {
    if (!r.lemma) continue;
    const rawParsing = r.parsing || '';
    // Pega os 3 primeiros chars da parte de caso/pessoa (após os 4 iniciais).
    const normParsing = rawParsing.length >= 7 ? rawParsing.slice(4, 7) : rawParsing;
    const key = `${r.lemma}|${normParsing}`;
    if (!stats.has(key)) {
      stats.set(key, { lemma: r.lemma, parsing: normParsing, count: 0 });
    }
    stats.get(key)!.count++;
  }

  // Ordena por frequência
  const sorted = Array.from(stats.values()).sort((a, b) => b.count - a.count);
  const top = TOP_N > 0 ? sorted.slice(0, TOP_N) : sorted;

  console.log(`[buildGlossary] ${top.length} lemmas/parsing identificados (TOP_N=${TOP_N || 'all'})`);

  // Aplica glosses
  const entries: GlossaryEntry[] = top.map((s) => {
    const lemmaLower = s.lemma.toLowerCase().trim();
    const gloss = MANUAL_GLOSSES[lemmaLower];
    return {
      lemma: s.lemma,
      parsing: s.parsing,
      count: s.count,
      gloss: gloss || `[?] ${lemmaLower}`,
      glossSource: gloss ? 'manual' : 'pending',
    };
  });

  const covered = entries.filter(e => e.glossSource === 'manual').length;
  const pending = entries.filter(e => e.glossSource === 'pending').length;
  const coveragePct = ((covered / entries.length) * 100).toFixed(1);
  console.log(`[buildGlossary] Cobertura glosses manuais: ${covered}/${entries.length} (${coveragePct}%)`);
  console.log(`[buildGlossary] Pendentes: ${pending}`);

  // Lista top 30 pendentes (para tarefa humana)
  const pendentes = entries.filter(e => e.glossSource === 'pending');
  console.log('\n[buildGlossary] Top 30 pendentes:');
  for (const p of pendentes.slice(0, 30)) {
    console.log(`  [${p.count.toString().padStart(5)}] ${p.lemma} (${p.parsing})`);
  }

  mkdirSync(join(import.meta.dirname, '..', 'assets'), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify({
    version: GLOSSARY_VERSION,
    topN: TOP_N,
    coverage: coveragePct,
    entries,
  }, null, 2), 'utf-8');
  console.log(`\n[buildGlossary] Salvo em ${OUTPUT}`);
}

main().catch(err => {
  console.error('[buildGlossary] ERRO:', err);
  process.exit(1);
});
