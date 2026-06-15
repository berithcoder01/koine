// src/tools/apostilaValidator.ts
// Validador pedagógico para ASTs de apostilas.
// Aplica as regras S-01 a S-06 do SISTEMA_FATURACAO_CONTEUDO e
// as decisões DS-01/DS-02. Não bloqueia: emite issues categorizadas
// (error, warning, info) para revisão humana.

import type {
  ApostilaAST,
  ModuloMeta,
  QuestaoAST,
  UnidadeAST,
} from './apostilaParser';

export type IssueSeverity = 'error' | 'warning' | 'info';

export interface Issue {
  severity: IssueSeverity;
  rule: string;
  message: string;
  location?: string;
}

export interface ValidationReport {
  moduleId: string;
  totalErrors: number;
  totalWarnings: number;
  totalInfo: number;
  issues: Issue[];
}

const CHOICE_TYPES = new Set([
  'multiple_choice',
  'tpr_digital',
  'fill_blank',
]);

const GREEK_LETTER_RE = /^[ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω]/;

export function validateApostila(ast: ApostilaAST): ValidationReport {
  const issues: Issue[] = [];

  issues.push(...validateModulo(ast.modulo));
  for (const unidade of ast.unidades) {
    issues.push(...validateUnidade(unidade));
  }
  issues.push(...validateAplicacao(ast));

  const totalErrors = issues.filter((i) => i.severity === 'error').length;
  const totalWarnings = issues.filter((i) => i.severity === 'warning').length;
  const totalInfo = issues.filter((i) => i.severity === 'info').length;

  return {
    moduleId: ast.modulo.id,
    totalErrors,
    totalWarnings,
    totalInfo,
    issues,
  };
}

function validateModulo(modulo: ModuloMeta): Issue[] {
  const issues: Issue[] = [];
  const loc = `MODULO ${modulo.id ?? '???'}`;

  if (!modulo.id || !/^C[12345678]-M\d{2}$/.test(modulo.id)) {
    issues.push({
      severity: 'error',
      rule: 'S-ESTRUTURA',
      message: `id do módulo "${modulo.id}" fora do padrão C{1..8}-MNN`,
      location: loc,
    });
  }

  if (!modulo.titulo || modulo.titulo.length < 5) {
    issues.push({
      severity: 'error',
      rule: 'S-ESTRUTURA',
      message: 'titulo ausente ou muito curto',
      location: loc,
    });
  }

  if (!modulo.versiculoAncora) {
    issues.push({
      severity: 'error',
      rule: 'S-01',
      message: 'versiculoAncora ausente',
      location: loc,
    });
  }

  if (!modulo.referenciaAncora || !isValidReference(modulo.referenciaAncora)) {
    issues.push({
      severity: 'error',
      rule: 'S-01',
      message: `referenciaAncora "${modulo.referenciaAncora}" inválida (esperado "Livro Cap:Verse")`,
      location: loc,
    });
  }

  if (modulo.xpTotal <= 0 || modulo.xpTotal > 200) {
    issues.push({
      severity: 'warning',
      rule: 'S-XP',
      message: `xpTotal ${modulo.xpTotal} fora da faixa esperada (1-200)`,
      location: loc,
    });
  }

  if (!modulo.revisadoPor) {
    issues.push({
      severity: 'warning',
      rule: 'S-REVISAO',
      message: 'módulo sem revisadoPor — não passou por revisão',
      location: loc,
    });
  }

  return issues;
}

function validateUnidade(unidade: UnidadeAST): Issue[] {
  const issues: Issue[] = [];
  const loc = `UNIDADE ${unidade.id}`;

  if (unidade.fase2.length === 0) {
    issues.push({
      severity: 'error',
      rule: 'S-05',
      message: 'RECONHECIMENTO (Fase 2) vazio — mínimo 1 questão',
      location: loc,
    });
  }
  if (unidade.fase3.length === 0) {
    issues.push({
      severity: 'error',
      rule: 'S-05',
      message: 'ASSOCIAÇÃO (Fase 3) vazio — mínimo 1 questão',
      location: loc,
    });
  }
  if (unidade.fase4.length === 0) {
    issues.push({
      severity: 'error',
      rule: 'S-05',
      message: 'RECORDAÇÃO (Fase 4) vazio — mínimo 1 questão',
      location: loc,
    });
  }

  if (
    !unidade.exposicao.forma ||
    (unidade.tipo === 'letter' && !GREEK_LETTER_RE.test(unidade.exposicao.forma.trim()))
  ) {
    issues.push({
      severity: 'error',
      rule: 'S-02',
      message: `forma "${unidade.exposicao.forma}" não começa com letra grega`,
      location: loc,
    });
  }

  if (!unidade.exposicao.explicacao || unidade.exposicao.explicacao.length < 30) {
    issues.push({
      severity: 'warning',
      rule: 'S-DIDATICA',
      message: `explicacao muito curta (${unidade.exposicao.explicacao.length} chars) — mínimo recomendado 30`,
      location: loc,
    });
  }

  if (!unidade.exposicao.referencia || !isValidReference(unidade.exposicao.referencia)) {
    issues.push({
      severity: 'error',
      rule: 'S-01',
      message: `referencia "${unidade.exposicao.referencia}" inválida`,
      location: loc,
    });
  }

  if (unidade.tipo === 'verse_chunk' && !unidade.exposicao.versiculo) {
    issues.push({
      severity: 'error',
      rule: 'S-01',
      message: 'verse_chunk requer versiculo na EXPOSIÇÃO',
      location: loc,
    });
  }

  for (const q of [...unidade.fase2, ...unidade.fase3, ...unidade.fase4]) {
    issues.push(...validateQuestao(q, `${loc} [${q.tipo}]`));
  }

  return issues;
}

function validateAplicacao(ast: ApostilaAST): Issue[] {
  const issues: Issue[] = [];
  const loc = `APLICACAO ${ast.modulo.id}`;

  if (ast.aplicacao.length === 0) {
    issues.push({
      severity: 'info',
      rule: 'S-05',
      message: 'módulo sem questões de APLICAÇÃO (Fase 5) — considere adicionar',
      location: loc,
    });
  }

  const letrasEnsinadas = collectLetrasEnsinadas(ast.unidades);
  for (const q of ast.aplicacao) {
    issues.push(...validateQuestao(q, `${loc} [${q.tipo}]`));
    if (q.opcoes) {
      const letrasDistratoras = q.opcoes.filter((o) =>
        GREEK_LETTER_RE.test(o.trim()) && !letrasEnsinadas.has(o.trim().charAt(0))
      );
      if (letrasDistratoras.length > 1) {
        issues.push({
          severity: 'warning',
          rule: 'DS-01',
          message: `opcoes contém ${letrasDistratoras.length} letras de módulos futuros — máximo recomendado: 1`,
          location: `${loc} [${q.tipo}]`,
        });
      }
    }
  }

  return issues;
}

function validateQuestao(q: QuestaoAST, loc: string): Issue[] {
  const issues: Issue[] = [];

  if (CHOICE_TYPES.has(q.tipo)) {
    if (!q.opcoes || q.opcoes.length < 2) {
      issues.push({
        severity: 'error',
        rule: 'S-06',
        message: `${q.tipo} requer pelo menos 2 opcoes`,
        location: loc,
      });
    } else if (q.opcoes.length > 4) {
      issues.push({
        severity: 'warning',
        rule: 'S-06',
        message: `${q.tipo} com ${q.opcoes.length} opcoes (recomendado 2-4)`,
        location: loc,
      });
    }
    if (typeof q.correta === 'string' && q.opcoes && !q.opcoes.includes(q.correta)) {
      issues.push({
        severity: 'error',
        rule: 'S-06',
        message: `correta "${q.correta}" não está em opcoes [${q.opcoes.join(', ')}]`,
        location: loc,
      });
    }
  }

  if (q.tipo === 'matching_pairs') {
    if (!q.pares || q.pares.length < 2) {
      issues.push({
        severity: 'error',
        rule: 'S-06',
        message: `matching_pairs requer pelo menos 2 pares (recebeu ${q.pares?.length ?? 0})`,
        location: loc,
      });
    }
  }

  if (q.tipo === 'word_order') {
    if (!Array.isArray(q.correta) || q.correta.length === 0) {
      issues.push({
        severity: 'error',
        rule: 'S-06',
        message: 'word_order requer correta como lista de tokens',
        location: loc,
      });
    }
  }

  if (!q.explicacao || q.explicacao.length < 20) {
    issues.push({
      severity: 'warning',
      rule: 'S-DIDATICA',
      message: `explicacao curta (${q.explicacao.length} chars)`,
      location: loc,
    });
  }

  return issues;
}

function collectLetrasEnsinadas(unidades: UnidadeAST[]): Set<string> {
  const set = new Set<string>();
  for (const u of unidades) {
    if (u.tipo !== 'letter') continue;
    const forma = u.exposicao.forma.trim();
    for (const ch of forma) {
      if (GREEK_LETTER_RE.test(ch)) set.add(ch);
    }
  }
  return set;
}

function isValidReference(ref: string): boolean {
  // Aceita "Livro Cap:Verse" e variantes com sufixo de parte
  // (ex: "João 1:1a", "João 1:1b–c", "1 João 4:8").
  return /^[1-3]?\s*[A-ZÀ-Ú][a-zà-ú]+\s+\d+:\d+[a-zA-Z–\-]*$/i.test(ref.trim());
}
