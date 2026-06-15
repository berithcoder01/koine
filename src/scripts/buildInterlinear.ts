// src/scripts/buildInterlinear.ts
// Alinha nt_text.json (SBLGNT) com nt_glossary.json (glosses PT) e produz
// src/assets/nt_interlinear.json — a tabela de alinhamento palavra-a-palavra
// consumida pelo ReaderPage no modo "interlinear".
//
// Para cada token do SBLGNT, busca o gloss PT no glossário. Se não encontrar,
// usa transliteração e marca como 'pending' para revisão posterior.
//
// Execução: npm run build-interlinear

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const NT_TEXT = join(import.meta.dirname, '..', 'assets', 'nt_text.json');
const NT_GLOSSARY = join(import.meta.dirname, '..', 'assets', 'nt_glossary.json');
const NT_INTERLINEAR = join(import.meta.dirname, '..', 'assets', 'nt_interlinear.json');

interface NTRow {
  id: string;
  book_abbr: string;
  book_name: string;
  chapter: number;
  verse: number;
  position: number;
  token: string;
  lemma: string;
  strongs_id: string | null;
  parsing: string;
  gloss_pt: string | null;
}

interface GlossaryEntry {
  lemma: string;
  parsing: string;
  count: number;
  gloss: string;
  glossSource: string;
}

interface GlossaryFile {
  version: string;
  topN: number;
  coverage: string;
  entries: GlossaryEntry[];
}

interface InterlinearToken {
  bookAbbr: string;
  ch: number;
  v: number;
  position: number;
  tokenGreek: string;
  lemma: string;
  strongsId: string | null;
  parsing: string;
  glossPT: string;
  glossSource: string;
}

function transliterateGreek(lemma: string): string {
  // Transliteração simples (para fallback)
  const map: Record<string, string> = {
    'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'ē', 'θ': 'th',
    'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
    'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'u', 'φ': 'ph', 'χ': 'ch', 'ψ': 'ps', 'ω': 'ō',
  };
  return lemma.toLowerCase().split('').map(c => map[c] || c).join('');
}

async function main() {
  if (!existsSync(NT_GLOSSARY)) {
    console.error('[buildInterlinear] nt_glossary.json não existe. Rode: npm run build-glossary');
    process.exit(1);
  }

  console.log('[buildInterlinear] Lendo nt_text.json...');
  const rows: NTRow[] = JSON.parse(readFileSync(NT_TEXT, 'utf-8'));
  console.log(`[buildInterlinear] ${rows.length} tokens SBLGNT`);

  console.log('[buildInterlinear] Lendo nt_glossary.json...');
  const glossary: GlossaryFile = JSON.parse(readFileSync(NT_GLOSSARY, 'utf-8'));
  console.log(`[buildInterlinear] ${glossary.entries.length} entries no glossário`);

  // Indexa glossário por (lemma, parsing) e por lemma (fallback)
  const byLemmaParsing = new Map<string, GlossaryEntry>();
  const byLemma = new Map<string, GlossaryEntry>();
  for (const e of glossary.entries) {
    const lpKey = `${e.lemma.toLowerCase()}|${e.parsing}`;
    byLemmaParsing.set(lpKey, e);
    if (!byLemma.has(e.lemma.toLowerCase())) {
      byLemma.set(e.lemma.toLowerCase(), e);
    }
  }

  console.log('[buildInterlinear] Alinhando tokens...');
  const result: InterlinearToken[] = [];
  let covered = 0;
  let pending = 0;

  for (const r of rows) {
    const lemmaLower = (r.lemma || '').toLowerCase().trim();
    // Normaliza parsing para os 3 chars principais (NSM, GSM, etc.)
    const rawParsing = r.parsing || '';
    const normParsing = rawParsing.length >= 7 ? rawParsing.slice(4, 7) : rawParsing;
    const lpKey = `${lemmaLower}|${normParsing}`;

    let entry = byLemmaParsing.get(lpKey) || byLemma.get(lemmaLower);
    let glossPT: string;
    let glossSource: string;

    if (entry && entry.glossSource === 'manual' && !entry.gloss.startsWith('[?]')) {
      glossPT = entry.gloss;
      glossSource = 'manual';
      covered++;
    } else {
      // Fallback: transliteração
      glossPT = transliterateGreek(lemmaLower) || lemmaLower || '?';
      glossSource = 'translit';
      pending++;
    }

    result.push({
      bookAbbr: r.book_abbr,
      ch: r.chapter,
      v: r.verse,
      position: r.position,
      tokenGreek: r.token,
      lemma: r.lemma,
      strongsId: r.strongs_id,
      parsing: r.parsing,
      glossPT,
      glossSource,
    });
  }

  const coveragePct = ((covered / result.length) * 100).toFixed(1);
  console.log(`[buildInterlinear] Cobertura: ${covered}/${result.length} tokens (${coveragePct}%)`);
  console.log(`[buildInterlinear] Pendentes (translit): ${pending}`);

  // Sanity check: João 1:1 primeiros 5 tokens
  const jn1_1 = result.filter(r => r.bookAbbr === 'JN' && r.ch === 1 && r.v === 1).slice(0, 5);
  console.log('\n[buildInterlinear] Sanity João 1:1 (primeiros 5):');
  for (const t of jn1_1) {
    console.log(`  ${t.tokenGreek} (${t.lemma}) → ${t.glossPT} [${t.glossSource}]`);
  }

  mkdirSync(join(import.meta.dirname, '..', 'assets'), { recursive: true });
  writeFileSync(NT_INTERLINEAR, JSON.stringify(result), 'utf-8');
  const sizeMB = (JSON.stringify(result).length / 1024 / 1024).toFixed(2);
  console.log(`\n[buildInterlinear] Salvo em ${NT_INTERLINEAR} (${sizeMB} MB)`);
}

main().catch(err => {
  console.error('[buildInterlinear] ERRO:', err);
  process.exit(1);
});
