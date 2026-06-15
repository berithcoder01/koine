---
name: koine-module-impl
description: Use when implementing new learning modules for the Koine Greek app — generating apostila, narracao, relatorio-revisao, and audio files. Covers the full pipeline from content creation to TypeScript code generation and app integration.
---

# Koine Module Implementation Skill

Use this skill when the user asks to implement, create, generate, or integrate new learning modules (Ciclo/trail modules or History modules) for the Koine Greek learning app.

## Project Context

Koine is a React + Capacitor app for learning Koine Greek. It has two content trails:
- **Main Trail**: C1 (Alfabeto, 10 modules) → C2 (Verbos, 8 modules) → C3+ (Substantivos, planned)
- **History Trail**: H1-H4 (contextual history, 15 modules total)

## Module Naming Convention

- Main trail: `C{cycle}-M{order}` (e.g., C3-M01, C3-M08)
- History trail: `H{block}-M{order}` (e.g., H1-M05, H4-M04)

## Content Artifacts Per Module

Every module needs 3 content files in `WikiProjeto/Modulos/` (or `WikiProjeto/ModulosHistoria/` for history):

| File | Purpose |
|------|---------|
| `{ID}.apostila.md` | Structured markdown — pedagogical source of truth |
| `{ID}.narracao.md` | Clean narration script for Piper TTS (no Greek glyphs) |
| `{ID}.relatorio-revisao.md` | Review report from "Agente de Revisao" |

Plus audio files in `public/audio/{ID}/`:
- `{ID}.mp3` — generated from narracao via Piper TTS
- `{ID}.cues.json` — timestamp markers for guided audio

## Apostila Format (Structured Markdown)

```markdown
---MODULO---
id: C3-M01
ciclo: 3
ordem: 1
titulo: <title>
descricao: <description>
versiculoAncora: <Greek verse>
referenciaAncora: <Book Chapter:Verse>
metodoPrimario: <primary methods>
xpTotal: 65
revisadoPor: Agente de Revisão
dataRevisao: YYYY-MM-DD
---

---UNIDADE---
id: C3-M01-U01
ordem: 1
tipo: <letter|phoneme|word|grammar_rule|phrase|verse_chunk|context_history>
srsKey: C3-M01_<type>_<name>

# EXPOSIÇÃO (Fase 1 — sem avaliação)

destaque: <highlight word>
forma: <full form with variants>
transliteracao: <transliteration>
traducao: <Portuguese translation>
som: <phonetic sound>
explicacao: <detailed explanation, 30+ chars>
dica: <mnemonic hint>
versiculo: <Greek verse>
referencia: <Book Chapter:Verse>

# RECONHECIMENTO (Fase 2)

QUESTAO tipo:multiple_choice
pergunta: <question in Portuguese>
correta: <correct answer>
opcoes: <option1> | <option2> | <option3> | <option4>
explicacao: <explanation>

# ASSOCIAÇÃO (Fase 3)

QUESTAO tipo:matching_pairs
pergunta: <question>
correta: matching
pares: <key1>:<value1> | <key2>:<value2> | <key3>:<value3>
explicacao: <explanation>

# RECORDAÇÃO (Fase 4)

QUESTAO tipo:fill_blank
pergunta: <question>
correta: <correct answer>
opcoes: <option1> | <option2> | <option3>
explicacao: <explanation>
---

---APLICACAO---
# Optional Phase 5 questions (only for last unit)

QUESTAO tipo:multiple_choice xp:3
pergunta: <question>
correta: <answer>
opcoes: <opt1> | <opt2> | <opt3> | <opt4>
explicacao: <explanation>
---
```

## Exercise Types

| Type | Fields |
|------|--------|
| `multiple_choice` | pergunta, correta, opcoes (pipe-separated), explicacao |
| `tpr_digital` | pergunta, correta, opcoes, explicacao |
| `fill_blank` | pergunta, correta, opcoes, explicacao |
| `matching_pairs` | pergunta, pares (key:value pipe-separated), explicacao |
| `word_order` | pergunta, correta (space-separated tokens), opcoes, explicacao |
| `flashcard` | pergunta, correta, explicacao |
| `canvas` | pergunta, correta, explicacao, xp, targetLetter |

## Validation Rules

Parser enforces:
- `forma` is required in EXPOSIÇÃO (use `destaque` as fallback)
- `som` is optional (defaults to empty string)
- `referenciaAncora` must be single "Book Chapter:Verse" format
- `correta` in multiple_choice must be one of the `opcoes`
- `|` in `correta` is parsed as option separator — use `;` instead for multi-part answers
- Minimum 1 question per phase (Fase 2, 3, 4)
- Greek letters required only for `tipo: letter` units

## Pipeline Commands

```bash
# Validate a single module
npm run validate-apostila C3-M01

# Validate all modules
npm run validate-apostila:all

# Generate TypeScript from apostila
npm run parse-apostila C3-M01

# Generate all modules
npm run parse-apostila:all
```

## Integration Steps

After generating the `.generated.ts` file:

1. **Import in `units.ts`**:
```typescript
import { C3M01_UNITS } from './generated/C3-M01.generated';
```

2. **Add to `LEARNING_UNITS` array**:
```typescript
export const LEARNING_UNITS: UnitRow[] = [
  ...C1M01_UNITS, /* ... */, ...C1M10_UNITS,
  ...C2M01_UNITS, /* ... */, ...C2M08_UNITS,
  ...C3M01_UNITS, /* ... */, ...C3M08_UNITS,
];
```

3. **Register module in `modules.ts`**:
```typescript
{
  id: 'C3-M01',
  ciclo: 3,
  ordem: 1,
  title: '<title>',
  description: '<description>',
  ...
}
```

4. **Add unit groups in `unit-groups.ts`** for trail UI

5. **Run typecheck**: `npx tsc --noEmit`

## Narracao Format

Clean narration script for TTS. Section markers:

```
[TITULO]       — Module title
[INTRODUCAO]   — Welcome + objectives
[UNIDADE]      — Unit announcement
[EXPOSICAO]    — Main teaching content
[DICA]         — Mnemonic hint (slower TTS speed)
[VERSICULO]    — Bible verse (reverent tone)
[PERGUNTA]     — Exercise question
[OPCOES]       — Multiple choice options
[PAUSA]        — 5-second silence
[RESPOSTA]     — Answer + explanation
[TRANSICAO]    — Transition between units
[FINALIZACAO]  — Module closing
```

**Key rule**: ALL Greek glyphs replaced with Portuguese phonetic transcription.

## Relatorio-Revisao Template

```markdown
# RELATÓRIO DE REVISÃO — {ID}
**Data:** YYYY-MM-DD
**Revisor:** Agente de Revisão
**Veredito:** APROVADO / REPROVADO

## 5 Dimensions Assessment
1. Filosofia Editorial
2. Conformidade com a Grade
3. Formato Técnico
4. Qualidade Pedagógica
5. Coerência Teológica/Linguística

## System Rules (S-01..S-10, DS-01..DS-02)
```

## History Module Differences

History modules use a different unit structure in `src/content/history/history-units.ts`:

```typescript
{
  id: 'H1-M05-U01',
  moduleId: 'H1-M05',
  unitOrder: 1,
  title: '<title>',
  periodLabel: '<period>',
  locationLabel: '<location>',
  keyFigure: '<figure>',
  artifactNote: '<note>',
  artifactImage: '<path>',
  bibleConnection: '<reference>',
  content: `<markdown content>`,
  isPremium: false,
}
```

History modules are defined INLINE (not generated from apostila). The apostila files serve as source documentation but are not parsed by the pipeline.

## Common Pitfalls

1. **Encoding**: Always save files as UTF-8 with BOM for Greek characters
2. **Pipe characters**: Never use `|` in `correta` field — use `;` as separator
3. **referenciaAncora**: Must be single reference, not multiple (e.g., "João 1:1" not "João 1:1 / 14:6")
4. **Empty phases**: Each unit MUST have at least 1 question in Fase 2, 3, and 4
5. **Greek in narracao**: Replace ALL Greek with phonetic transcription for TTS
