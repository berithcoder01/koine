// src/tools/apostilaCodegen.ts
// Gera código TypeScript a partir de uma ApostilaAST.
// Saída: src/content/curriculum/generated/{MODULE_ID}.generated.ts
// compatível com o schema UnitRow consumido por seedLearningUnits.ts.

import type { ApostilaAST, QuestaoAST } from './apostilaParser';

export interface UnitRowGenerated {
  id: string;
  module_id: string;
  unit_order: number;
  unit_type: string;
  greek_form: string;
  transliteration: string;
  gloss_pt: string;
  phonetic_sound: string;
  explanation: string;
  mnemonic_hint: string;
  context_verse: string;
  context_reference: string;
  srs_key: string;
  phase2_data: string;
  phase3_data: string;
  phase4_data: string;
  phase5_data: string;
}

export interface CodegenOutput {
  fileName: string;
  moduleId: string;
  constName: string;
  units: UnitRowGenerated[];
  sourceCode: string;
}

export function generateApostilaCode(ast: ApostilaAST): CodegenOutput {
  const moduleId = ast.modulo.id;
  const constName = `${moduleId.replace(/-/g, '')}_UNITS`;
  const lastUnidadeId = ast.unidades[ast.unidades.length - 1]?.id ?? '';

  const units: UnitRowGenerated[] = ast.unidades.map((u) => {
    let phase5Questions: QuestaoAST[] = [];
    if (u.id === lastUnidadeId && ast.aplicacao.length > 0) {
      phase5Questions = [...ast.aplicacao];
    }

    if (u.tipo === 'letter') {
      const parts = u.exposicao.forma.split(' ');
      const lower = parts[1] || parts[0];
      
      const canvasQuestion: QuestaoAST = {
        tipo: 'canvas',
        pergunta: `Trace a letra grega minúscula ${lower} (${u.exposicao.transliteracao}) no canvas abaixo:`,
        correta: lower,
        explicacao: `Pratique o traçado da letra grega minúscula ${lower} (${u.exposicao.transliteracao}). Comece a desenhar seguindo o contorno fantasma da letra.`,
        xp: 3
      };
      
      phase5Questions.unshift(canvasQuestion);
    }

    return {
      id: u.id,
      module_id: moduleId,
      unit_order: u.ordem,
      unit_type: u.tipo,
      greek_form: u.exposicao.forma,
      transliteration: u.exposicao.transliteracao,
      gloss_pt: u.exposicao.traducao,
      phonetic_sound: u.exposicao.som,
      explanation: u.exposicao.explicacao,
      mnemonic_hint: u.exposicao.dica,
      context_verse: u.exposicao.versiculo,
      context_reference: u.exposicao.referencia,
      srs_key: u.srsKey,
      phase2_data: stringifyPhase(u.fase2),
      phase3_data: stringifyPhase(u.fase3),
      phase4_data: stringifyPhase(u.fase4),
      phase5_data: phase5Questions.length > 0 ? stringifyPhase(phase5Questions) : '',
    };
  });

  const sourceCode = renderSource(moduleId, constName, units);
  return {
    fileName: `${moduleId}.generated.ts`,
    moduleId,
    constName,
    units,
    sourceCode,
  };
}

function stringifyPhase(questions: QuestaoAST[]): string {
  if (questions.length === 0) return '';
  const payload = questions.map(serializeQuestao);
  return JSON.stringify(payload, null, 2);
}

function serializeQuestao(q: QuestaoAST): Record<string, unknown> {
  const out: Record<string, unknown> = {
    type: q.tipo,
    questionPT: q.pergunta,
    correctAnswer: q.correta,
    explanation: q.explicacao,
  };
  if (q.tipo === 'matching_pairs' && q.pares) {
    out.options = q.pares;
  } else if (q.opcoes !== undefined) {
    out.options = q.opcoes;
  }
  if (q.xp !== undefined) out.xpReward = q.xp;
  
  if (q.tipo === 'canvas' && typeof q.correta === 'string') {
    out.targetLetter = q.correta;
  }
  return out;
}

function renderSource(
  moduleId: string,
  constName: string,
  units: UnitRowGenerated[]
): string {
  const now = new Date().toISOString().slice(0, 10);
  const body = units
    .map((u) => renderUnit(u))
    .join(',\n');

  return `// AUTO-GENERATED from ${moduleId}.apostila.md on ${now}.
// Do not edit manually. Re-run: npm run parse-apostila ${moduleId}

import type { UnitRow } from '../units';

export const ${constName}: UnitRow[] = [
${body}
];
`;
}

function renderUnit(u: UnitRowGenerated): string {
  const lines: string[] = [];
  lines.push('  {');
  lines.push(`    id: ${jsonString(u.id)},`);
  lines.push(`    module_id: ${jsonString(u.module_id)},`);
  lines.push(`    unit_order: ${u.unit_order},`);
  lines.push(`    unit_type: ${jsonString(u.unit_type)},`);
  lines.push(`    greek_form: ${jsonString(u.greek_form)},`);
  lines.push(`    transliteration: ${jsonString(u.transliteration)},`);
  lines.push(`    gloss_pt: ${jsonString(u.gloss_pt)},`);
  lines.push(`    phonetic_sound: ${jsonString(u.phonetic_sound)},`);
  lines.push(`    explanation: ${jsonString(u.explanation)},`);
  lines.push(`    mnemonic_hint: ${jsonString(u.mnemonic_hint)},`);
  lines.push(`    context_verse: ${jsonString(u.context_verse)},`);
  lines.push(`    context_reference: ${jsonString(u.context_reference)},`);
  lines.push(`    srs_key: ${jsonString(u.srs_key)},`);
  lines.push(`    phase2_data: ${renderJsonString(u.phase2_data)},`);
  lines.push(`    phase3_data: ${renderJsonString(u.phase3_data)},`);
  lines.push(`    phase4_data: ${renderJsonString(u.phase4_data)},`);
  lines.push(`    phase5_data: ${renderJsonString(u.phase5_data)},`);
  lines.push('  }');
  return lines.join('\n');
}

function jsonString(s: string): string {
  return JSON.stringify(s);
}

function renderJsonString(s: string): string {
  if (s === '') return "''";
  return JSON.stringify(s);
}
