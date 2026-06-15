// src/scripts/downloadBLivre.ts
// Baixa a Bíblia Livre (BLivre) em formato USFM, parseia versículos PT-BR
// e gera src/assets/nt_pt.json com mesmo schema do SBLGNT (book_abbr, ch, v, text).
//
// Fonte: https://ebible.org/Scriptures/porbr2018_usfm.zip
// Licença: CC BY 4.0 Brasil — Diego Santos, Mario Sérgio, Marco Teles (2018)
//
// Execução: npm run download-blivre

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const EBOOK_URL = 'https://ebible.org/Scriptures/porbr2018_usfm.zip';
const TMP_DIR = join(import.meta.dirname, '..', '..', 'tmp-blivre');
const ZIP_PATH = join(TMP_DIR, 'porbr2018_usfm.zip');
const EXTRACT_DIR = join(TMP_DIR, 'usfm');
const OUTPUT = join(import.meta.dirname, '..', 'assets', 'nt_pt.json');

interface NTPtVerse {
  bookAbbr: string;
  bookName: string;
  ch: number;
  v: number;
  text: string;
  source: 'blivre';
  version: string;
}

// Mapeamento: código USFM 3-letras → código SBLGNT do projeto.
// Cobre o NT completo (27 livros).
const USFM_TO_SBLGNT: Record<string, { abbr: string; name: string }> = {
  MAT: { abbr: 'MT',   name: 'Mateus' },
  MRK: { abbr: 'MK',   name: 'Marcos' },
  LUK: { abbr: 'LK',   name: 'Lucas' },
  JHN: { abbr: 'JN',   name: 'João' },
  ACT: { abbr: 'AC',   name: 'Atos' },
  ROM: { abbr: 'RO',   name: 'Romanos' },
  '1CO': { abbr: '1CO', name: '1 Coríntios' },
  '2CO': { abbr: '2CO', name: '2 Coríntios' },
  GAL: { abbr: 'GA',   name: 'Gálatas' },
  EPH: { abbr: 'EP',   name: 'Efésios' },
  PHP: { abbr: 'PH',   name: 'Filipenses' },
  COL: { abbr: 'CO',   name: 'Colossenses' },
  '1TH': { abbr: '1TH', name: '1 Tessalonicenses' },
  '2TH': { abbr: '2TH', name: '2 Tessalonicenses' },
  '1TI': { abbr: '1TI', name: '1 Timóteo' },
  '2TI': { abbr: '2TI', name: '2 Timóteo' },
  TIT: { abbr: 'TI',   name: 'Tito' },
  PHM: { abbr: 'PHM',  name: 'Filemom' },
  HEB: { abbr: 'HE',   name: 'Hebreus' },
  JAS: { abbr: 'JA',   name: 'Tiago' },
  '1PE': { abbr: '1PE', name: '1 Pedro' },
  '2PE': { abbr: '2PE', name: '2 Pedro' },
  '1JN': { abbr: '1JN', name: '1 João' },
  '2JN': { abbr: '2JN', name: '2 João' },
  '3JN': { abbr: '3JN', name: '3 João' },
  JUD: { abbr: 'JUDE', name: 'Judas' },
  REV: { abbr: 'RE',   name: 'Apocalipse' },
};

// Marcadores USFM cujo conteúdo inline deve SER MANTIDO no texto.
//   \add...\add*  → texto adicionado (mantém, sem marcadores)
//   \nd...\nd*   → nome divino (mantém)
//   \pn...\pn*   → nome próprio (mantém)
//
// Marcadores cujo conteúdo deve SER DESCARTADO.
//   \f ... \f*   → footnote (remove tudo entre eles)
//   \fe ... \fe* → footnote editorial
//   \fr / \ft / \fq / \fqa  → partes internas da footnote
//   \x ... \x*   → cross-reference
//   \fig ...|*   → figura
//   \rb ... \rb* → baseline (rubrica)
//
// Marcadores de bloco (descartáveis após extrair informação):
//   \id, \h, \toc1, \toc2, \toc3, \mt1, \c, \p, \q, \q1, \q2, \m, \b, \s, \r

function stripInlineMarkers(line: string): string {
  let out = line;

  // Remove footnotes inteiras. O USFM 3.0 permite variantes como \f, \f+,
  // \fe, \fr, \ft, \fq, \fqa. O conteúdo vai do marcador de abertura até \f*.
  // Usa [\s\S]*? (non-greedy, casa qualquer char) para não parar em \f interno.
  out = out.replace(/\\f[+\-]?[\s\S]*?\\f\*/g, ' ');
  // Remove cross-references: \x ... \x*
  out = out.replace(/\\x\s[\s\S]*?\\x\*/g, ' ');
  // Remove figures: \fig ...|*
  out = out.replace(/\\fig[\s\S]*?\|\*/g, ' ');

  // Remove marcadores de citação/quotation (\q, \q1, \q2, \qt, \qt-s, \qr)
  // mantendo o conteúdo (texto é fala de Jesus, etc.).
  out = out.replace(/\\q[ts12r\-]*\s([^]*?)\\q[ts12r\-]*\*/g, '$1');
  // Versos poéticos: \q1 ... \q1* (mantém conteúdo)
  out = out.replace(/\\q1\s([\s\S]*?)\\q1\*/g, '$1');
  out = out.replace(/\\q2\s([\s\S]*?)\\q2\*/g, '$1');
  out = out.replace(/\\q3\s([\s\S]*?)\\q3\*/g, '$1');

  // Remove generic inline markers mantendo o conteúdo:
  out = out.replace(/\\add\s([\s\S]*?)\\add\*/g, '$1');
  out = out.replace(/\\nd\s([\s\S]*?)\\nd\*/g, '$1');
  out = out.replace(/\\pn\s([\s\S]*?)\\pn\*/g, '$1');
  out = out.replace(/\\bk\s([\s\S]*?)\\bk\*/g, '$1');
  out = out.replace(/\\k\s([\s\S]*?)\\k\*/g, '$1');
  out = out.replace(/\\w\s([\s\S]*?)\\w\*/g, '$1');
  out = out.replace(/\\tl\s([\s\S]*?)\\tl\*/g, '$1');
  out = out.replace(/\\em\s([\s\S]*?)\\em\*/g, '$1');
  out = out.replace(/\\bd\s([\s\S]*?)\\bd\*/g, '$1');
  out = out.replace(/\\it\s([\s\S]*?)\\it\*/g, '$1');
  out = out.replace(/\\bdit\s([\s\S]*?)\\bdit\*/g, '$1');
  out = out.replace(/\\sc\s([\s\S]*?)\\sc\*/g, '$1');
  out = out.replace(/\\sup\s([\s\S]*?)\\sup\*/g, '$1');

  // Remove qualquer marcador residual que ainda tenha ficado (\xxx ... \xxx*)
  out = out.replace(/\\[a-z]+\s[\s\S]*?\\[a-z]+\*/g, ' ');

  // Remove marcadores soltos (\c, \v, \p, \s, \r, \mt1, etc.)
  out = out.replace(/\\[a-z][a-z0-9]*/g, ' ');

  return out;
}

function cleanText(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .trim();
}

function parseUSFM(content: string, usfmCode: string): NTPtVerse[] {
  const meta = USFM_TO_SBLGNT[usfmCode];
  if (!meta) return [];

  const lines = content.split(/\r?\n/);
  const verses: NTPtVerse[] = [];

  let currentChapter = 0;
  let currentVerse = 0;
  let buffer: string[] = [];

  const flush = () => {
    if (currentChapter > 0 && currentVerse > 0) {
      const text = cleanText(stripInlineMarkers(buffer.join(' ')));
      if (text) {
        verses.push({
          bookAbbr: meta.abbr,
          bookName: meta.name,
          ch: currentChapter,
          v: currentVerse,
          text,
          source: 'blivre',
          version: '2018-02',
        });
      }
    }
    buffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Marcador de capítulo: \c 1
    const chMatch = line.match(/^\\c\s+(\d+)/);
    if (chMatch) {
      flush();
      currentChapter = parseInt(chMatch[1], 10);
      currentVerse = 0;
      continue;
    }

    // Marcador de versículo: \v 1 texto...
    const vMatch = line.match(/^\\v\s+(\d+)\s*(.*)$/);
    if (vMatch) {
      flush();
      currentVerse = parseInt(vMatch[1], 10);
      const rest = vMatch[2];
      if (rest) buffer.push(rest);
      continue;
    }

    // Linha de parágrafo (\p) ou outras sem versículo
    if (line.match(/^\\[a-z]/) || line.match(/^\\\*[a-z]/)) {
      // Se for marcador de bloco, ignora
      // Se tiver texto solto (depois de marcador de parágrafo), acumula
      const stripped = line.replace(/^\\[a-z][a-z0-9]*\s*/, '');
      if (stripped && stripped !== line) {
        buffer.push(stripped);
      }
      continue;
    }

    buffer.push(line);
  }

  flush();
  return verses;
}

async function downloadZip(): Promise<void> {
  console.log(`[downloadBLivre] Baixando ${EBOOK_URL}...`);
  if (existsSync(ZIP_PATH)) {
    console.log('[downloadBLivre] ZIP já existe, pulando download');
    return;
  }
  mkdirSync(TMP_DIR, { recursive: true });
  const res = await fetch(EBOOK_URL);
  if (!res.ok) throw new Error(`Falha ao baixar ZIP: ${res.status}`);
  const fileStream = (await import('fs')).createWriteStream(ZIP_PATH);
  await finished(Readable.fromWeb(res.body as any).pipe(fileStream));
  console.log(`[downloadBLivre] ZIP salvo em ${ZIP_PATH}`);
}

async function extractZip(): Promise<void> {
  if (existsSync(EXTRACT_DIR)) {
    console.log('[downloadBLivre] USFM já extraído, pulando');
    return;
  }
  console.log('[downloadBLivre] Extraindo ZIP...');
  mkdirSync(EXTRACT_DIR, { recursive: true });
  const { execSync } = await import('child_process');
  // PowerShell: Expand-Archive
  execSync(`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${ZIP_PATH}' -DestinationPath '${EXTRACT_DIR}' -Force"`, { stdio: 'inherit' });
}

async function main() {
  await downloadZip();
  await extractZip();

  console.log('[downloadBLivre] Lendo arquivos USFM do NT...');
  const allVerses: NTPtVerse[] = [];

  for (const [usfmCode, meta] of Object.entries(USFM_TO_SBLGNT)) {
    // NT: códigos 70..96
    const candidates = [
      join(EXTRACT_DIR, `7${usfmCode.length}`.slice(-1) + `${Object.keys(USFM_TO_SBLGNT).indexOf(usfmCode) + 70}-${usfmCode}porbr2018.usfm`),
      join(EXTRACT_DIR, `${usfmCode}porbr2018.usfm`),
    ];

    let path: string | null = null;
    for (const c of candidates) {
      if (existsSync(c)) { path = c; break; }
    }

    if (!path) {
      const fs = await import('fs');
      const files = fs.readdirSync(EXTRACT_DIR).filter(f => f.includes(usfmCode) && f.endsWith('.usfm'));
      if (files.length > 0) path = join(EXTRACT_DIR, files[0]);
    }

    if (!path) {
      console.warn(`[downloadBLivre] USFM não encontrado para ${usfmCode} (${meta.abbr})`);
      continue;
    }

    const content = readFileSync(path, 'utf-8');
    const verses = parseUSFM(content, usfmCode);
    console.log(`  ${meta.abbr.padEnd(5)} ${meta.name.padEnd(22)} ${verses.length} versículos`);
    allVerses.push(...verses);
  }

  console.log(`[downloadBLivre] Total: ${allVerses.length} versículos NT-PT`);

  // Sanity check: João 1:1
  const jn1_1 = allVerses.find(v => v.bookAbbr === 'JN' && v.ch === 1 && v.v === 1);
  if (jn1_1) {
    console.log(`[downloadBLivre] Sanity check João 1:1: "${jn1_1.text}"`);
  } else {
    throw new Error('João 1:1 não encontrado! Parser USFM quebrado.');
  }

  mkdirSync(join(import.meta.dirname, '..', 'assets'), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(allVerses), 'utf-8');
  console.log(`[downloadBLivre] Salvo em ${OUTPUT} (${(JSON.stringify(allVerses).length / 1024 / 1024).toFixed(2)} MB)`);

  // Cleanup tmp
  try {
    rmSync(TMP_DIR, { recursive: true, force: true });
    console.log('[downloadBLivre] Limpeza tmp concluída');
  } catch {}
}

main().catch(err => {
  console.error('[downloadBLivre] ERRO:', err);
  process.exit(1);
});
