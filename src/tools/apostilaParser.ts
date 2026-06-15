// src/tools/apostilaParser.ts
// Parser para arquivos .apostila.md do WikiProjeto/Modulos/.
// Converte Markdown estruturado em AST tipada (ApostilaAST).
//
// Formato esperado:
//
// ---MODULO---
// id: C1-M01
// ciclo: 1
// ...
// ---
//
// ---UNIDADE---
// id: C1-M01-U01
// ordem: 1
// tipo: letter
// srsKey: C1-M01_letter_alpha
//
// # EXPOSIÇÃO (Fase 1 — sem avaliação)
//
// forma: Α α
// transliteracao: alfa
// ...
//
// # RECONHECIMENTO (Fase 2)
//
// QUESTAO tipo:multiple_choice
// pergunta: ...
// correta: Α
// opcoes: Α | Ε | Ι | Β
// explicacao: ...
//
// # ASSOCIAÇÃO (Fase 3)
// ...
//
// # RECORDAÇÃO (Fase 4)
// ...
// ---
//
// ---APLICACAO---
// # Comentários opcionais
//
// QUESTAO tipo:multiple_choice xp:3
// pergunta: ...
// correta: 2
// opcoes: 1 | 2 | 3 | 4
// explicacao: ...
// ---

export interface ModuloMeta {
  id: string;
  ciclo: number;
  ordem: number;
  titulo: string;
  descricao: string;
  versiculoAncora: string;
  referenciaAncora: string;
  metodoPrimario: string;
  xpTotal: number;
  revisadoPor?: string;
  dataRevisao?: string;
  notaRevisao?: string;
}

export interface ExposicaoAST {
  forma: string;
  transliteracao: string;
  traducao: string;
  som: string;
  explicacao: string;
  dica: string;
  versiculo: string;
  referencia: string;
}

export interface QuestaoAST {
  tipo: string;
  pergunta: string;
  correta: string | string[];
  opcoes?: string[];
  pares?: Array<[string, string]>;
  explicacao: string;
  xp?: number;
}

export interface UnidadeAST {
  id: string;
  ordem: number;
  tipo: string;
  srsKey: string;
  exposicao: ExposicaoAST;
  fase2: QuestaoAST[];
  fase3: QuestaoAST[];
  fase4: QuestaoAST[];
}

export interface ApostilaAST {
  modulo: ModuloMeta;
  unidades: UnidadeAST[];
  aplicacao: QuestaoAST[];
}

interface Block {
  kind: 'MODULO' | 'UNIDADE' | 'APLICACAO';
  body: string[];
}

const MODULO_NUMERIC_KEYS = new Set(['ciclo', 'ordem', 'xpTotal']);

const MODULO_OPTIONAL_KEYS = new Set([
  'revisadoPor',
  'dataRevisao',
  'notaRevisao',
]);

const EXPOSICAO_KEYS = [
  'forma',
  'transliteracao',
  'traducao',
  'som',
  'explicacao',
  'dica',
  'versiculo',
  'referencia',
] as const;

const EXPOSICAO_OPTIONAL_KEYS = new Set(['som']);

const QUESTAO_INLINE_KEYS = new Set([
  'tipo',
  'pergunta',
  'correta',
  'opcoes',
  'pares',
  'explicacao',
  'xp',
]);

export function parseApostila(content: string): ApostilaAST {
  const lines = content.split(/\r?\n/);
  const blocks = extractBlocks(lines);

  const moduloBlock = blocks.find((b) => b.kind === 'MODULO');
  if (!moduloBlock) {
    throw new Error('Bloco ---MODULO--- ausente');
  }
  const modulo = parseModulo(moduloBlock.body);

  const unidadeBlocks = blocks.filter((b) => b.kind === 'UNIDADE');
  const unidades = unidadeBlocks.map((b, idx) =>
    parseUnidade(b.body, idx + 1, modulo.id)
  );

  const appBlock = blocks.find((b) => b.kind === 'APLICACAO');
  const aplicacao = appBlock ? parseQuestoes(appBlock.body) : [];

  return { modulo, unidades, aplicacao };
}

function extractBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === '---MODULO---') {
      i = consumeBlock(lines, i + 1, 'MODULO', blocks);
    } else if (line === '---UNIDADE---') {
      i = consumeBlock(lines, i + 1, 'UNIDADE', blocks);
    } else if (line === '---APLICACAO---') {
      i = consumeBlock(lines, i + 1, 'APLICACAO', blocks);
    } else {
      i++;
    }
  }

  return blocks;
}

function consumeBlock(
  lines: string[],
  start: number,
  kind: Block['kind'],
  blocks: Block[]
): number {
  const body: string[] = [];
  let i = start;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === '---') break;
    body.push(lines[i]);
    i++;
  }
  blocks.push({ kind, body });
  return i + 1;
}

function parseKeyValueLines(body: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of body) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!match) continue;
    result[match[1]] = match[2].trim();
  }
  return result;
}

function parseModulo(body: string[]): ModuloMeta {
  const kv = parseKeyValueLines(body);
  const result: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(kv)) {
    if (MODULO_OPTIONAL_KEYS.has(key)) {
      result[key] = value;
    } else if (MODULO_NUMERIC_KEYS.has(key)) {
      const n = Number(value);
      if (Number.isNaN(n)) {
        throw new Error(`MODULO: chave "${key}" deveria ser número, recebeu "${value}"`);
      }
      result[key] = n;
    } else {
      result[key] = value;
    }
  }
  const required = ['id', 'ciclo', 'ordem', 'titulo', 'descricao', 'versiculoAncora', 'referenciaAncora', 'metodoPrimario', 'xpTotal'];
  for (const key of required) {
    if (result[key] === undefined) {
      throw new Error(`MODULO: chave obrigatória ausente "${key}"`);
    }
  }
  return result as unknown as ModuloMeta;
}

function parseUnidade(body: string[], idx: number, moduloId: string): UnidadeAST {
  const headerEnd = body.findIndex((l) => l.trim().startsWith('# '));
  const headerBody = headerEnd < 0 ? body : body.slice(0, headerEnd);
  const sectionsBody = headerEnd < 0 ? [] : body.slice(headerEnd);

  const header = parseKeyValueLines(headerBody);
  for (const key of ['id', 'ordem', 'tipo', 'srsKey']) {
    if (!header[key]) {
      throw new Error(`UNIDADE #${idx} de ${moduloId}: chave obrigatória ausente "${key}"`);
    }
  }
  if (!header.id.startsWith(`${moduloId}-U`)) {
    throw new Error(
      `UNIDADE #${idx} de ${moduloId}: id "${header.id}" deveria começar com "${moduloId}-U"`
    );
  }

  const sections = splitSections(sectionsBody);
  const exposicao = parseExposicao(sections.EXPOSICAO, header.id);
  const fase2 = parseQuestoes(sections.RECONHECIMENTO, header.id, 'Fase 2');
  const fase3 = parseQuestoes(sections.ASSOCIACAO, header.id, 'Fase 3');
  const fase4 = parseQuestoes(sections.RECORDACAO, header.id, 'Fase 4');

  return {
    id: header.id,
    ordem: Number(header.ordem),
    tipo: header.tipo,
    srsKey: header.srsKey,
    exposicao,
    fase2,
    fase3,
    fase4,
  };
}

function splitSections(body: string[]): Record<string, string[]> {
  const sections: Record<string, string[]> = {
    EXPOSICAO: [],
    RECONHECIMENTO: [],
    ASSOCIACAO: [],
    RECORDACAO: [],
  };
  let current: keyof typeof sections | '' = '';
  for (const line of body) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# EXPOSIÇÃO') || trimmed.startsWith('# EXPOSICAO')) {
      current = 'EXPOSICAO';
      continue;
    }
    if (trimmed.startsWith('# RECONHECIMENTO')) {
      current = 'RECONHECIMENTO';
      continue;
    }
    if (trimmed.startsWith('# ASSOCIAÇÃO') || trimmed.startsWith('# ASSOCIACAO')) {
      current = 'ASSOCIACAO';
      continue;
    }
    if (trimmed.startsWith('# RECORDAÇÃO') || trimmed.startsWith('# RECORDACAO')) {
      current = 'RECORDACAO';
      continue;
    }
    if (current) sections[current].push(line);
  }
  return sections;
}

function parseExposicao(body: string[], unidadeId: string): ExposicaoAST {
  const kv = parseKeyValueLines(body);
  const result: Record<string, string> = {};
  for (const key of EXPOSICAO_KEYS) {
    if (!kv[key]) {
      if (EXPOSICAO_OPTIONAL_KEYS.has(key)) {
        result[key] = '';
        continue;
      }
      if (key === 'forma' && kv['destaque']) {
        result['forma'] = kv['destaque'];
        continue;
      }
      throw new Error(`${unidadeId} EXPOSIÇÃO: chave obrigatória ausente "${key}"`);
    }
    result[key] = kv[key];
  }
  return result as unknown as ExposicaoAST;
}

function parseQuestoes(
  body: string[],
  contextId = '',
  phaseLabel = ''
): QuestaoAST[] {
  const questions: QuestaoAST[] = [];
  const ctx = contextId ? `${contextId} ${phaseLabel}` : phaseLabel;
  let raw: Record<string, string> | null = null;

  const flush = () => {
    if (!raw) return;
    const finalized = finalizeQuestao(raw, ctx);
    if (finalized) questions.push(finalized);
    raw = null;
  };

  for (const line of body) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('QUESTAO')) {
      flush();
      const rest = trimmed.slice('QUESTAO'.length).trim();
      raw = parseInlineFields(rest);
      continue;
    }

    if (!raw) continue;

    const match = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!match) continue;
    if (!QUESTAO_INLINE_KEYS.has(match[1])) continue;
    raw[match[1]] = match[2].trim();
  }
  flush();

  return questions;
}

function parseInlineFields(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  const parts: string[] = [];
  let current = '';
  let i = 0;
  while (i < text.length) {
    if (text[i] === ' ') {
      const rest = text.slice(i + 1);
      if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(rest)) {
        parts.push(current);
        current = '';
        i++;
        continue;
      }
    }
    current += text[i];
    i++;
  }
  if (current) parts.push(current);

  for (const part of parts) {
    const colonIdx = part.indexOf(':');
    if (colonIdx < 0) continue;
    const key = part.slice(0, colonIdx).trim();
    const value = part.slice(colonIdx + 1).trim();
    result[key] = value;
  }
  return result;
}

function finalizeQuestao(
  raw: Record<string, string>,
  context: string
): QuestaoAST | null {
  if (!raw.tipo) {
    throw new Error(`${context} QUESTAO: campo "tipo" ausente`);
  }
  if (!raw.pergunta) {
    throw new Error(`${context} QUESTAO [${raw.tipo}]: campo "pergunta" ausente`);
  }
  if (!raw.explicacao) {
    throw new Error(`${context} QUESTAO [${raw.tipo}]: campo "explicacao" ausente`);
  }

  const result: QuestaoAST = {
    tipo: raw.tipo,
    pergunta: raw.pergunta,
    correta: raw.correta ?? '',
    explicacao: raw.explicacao,
  };

  if (raw.tipo === 'matching_pairs') {
    if (!raw.pares) {
      throw new Error(`${context} QUESTAO matching_pairs: campo "pares" ausente`);
    }
    result.pares = raw.pares
      .split('|')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const colonIdx = p.indexOf(':');
        if (colonIdx < 0) {
          throw new Error(`${context} QUESTAO matching_pairs: par malformado "${p}" (esperado "chave:valor")`);
        }
        return [p.slice(0, colonIdx).trim(), p.slice(colonIdx + 1).trim()] as [string, string];
      });
    result.correta = 'matching';
  } else if (raw.tipo === 'word_order') {
    if (raw.correta) {
      result.correta = raw.correta.split(/\s+/).filter(Boolean);
    }
    if (raw.opcoes) {
      result.opcoes = raw.opcoes.split('|').map((o) => o.trim()).filter(Boolean);
    }
  } else {
    if (raw.opcoes) {
      result.opcoes = raw.opcoes.split('|').map((o) => o.trim()).filter(Boolean);
    }
  }

  if (raw.xp) {
    const n = Number(raw.xp);
    if (!Number.isNaN(n)) result.xp = n;
  }

  return result;
}

export const __TESTING = {
  extractBlocks,
  parseKeyValueLines,
  parseInlineFields,
  splitSections,
  finalizeQuestao,
};
