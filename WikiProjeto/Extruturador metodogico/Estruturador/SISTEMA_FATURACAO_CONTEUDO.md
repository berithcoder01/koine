# SISTEMA DE FATURAÇÃO DE CONTEÚDO — KOINÉ APP
## Apostila Fonte + Motor de Interpretação
### Documento de Arquitetura v1.1

**v1.1 — 2026-06-02**
- Adicionada PARTE VI-A: Regras Sistêmicas Vigentes (S-01 a S-06 + DS-01, DS-02)
- Adicionado Apêndice A: Mapa de Versículos Âncora
- Adicionado Apêndice B: Instrução Padrão de Diacríticos
- Integração com `CORRECOES_SISTEMICAS_V1.md`

**v1.0 — versão original**

---

## VISÃO GERAL

O sistema é composto por dois componentes separados e independentes:

```
┌─────────────────────────────────────────────────────────┐
│  APOSTILA (.md)                                         │
│  Conteúdo pedagógico revisado por humanos               │
│  Fonte de verdade — editada, revisada, expandida        │
│  Um arquivo por módulo. Formato estruturado legível.    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼  parse()
┌─────────────────────────────────────────────────────────┐
│  MOTOR DE INTERPRETAÇÃO (apostilaParser.ts)             │
│  Lê a apostila → valida → gera UnitRow[] compatível     │
│  com o schema existente (units.ts / SQLite)             │
│  Nunca editado para expandir conteúdo                   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼  seed()
┌─────────────────────────────────────────────────────────┐
│  APLICAÇÃO (units.ts → SQLite → LessonEngine)           │
│  Recebe o conteúdo pronto, sem saber da origem          │
└─────────────────────────────────────────────────────────┘
```

**Fluxo de trabalho para novos conteúdos:**
1. Autor escreve/revisa `C1-M03.apostila.md`
2. Revisor confere o `.md` (sem código)
3. `npm run parse-apostila` valida e gera `units.ts` atualizado
4. `npm run seed` popula o SQLite
5. App recebe o conteúdo — zero alteração na aplicação

---

## PARTE I — FORMATO DA APOSTILA

### 1.1 Estrutura de Arquivo

Cada módulo tem seu próprio arquivo `.apostila.md`:

```
content/apostila/
  ciclo-1/
    C1-M01.apostila.md   ← Vogais Α, Ε, Ι
    C1-M02.apostila.md
    ...
    C1-M10.apostila.md
  ciclo-2/
    C2-M01.apostila.md
    ...
    C2-M08.apostila.md
```

### 1.2 Cabeçalho do Arquivo (metadados do módulo)

Todo arquivo começa com um bloco `---MODULO---`:

```
---MODULO---
id: C1-M01
ciclo: 1
ordem: 1
titulo: Vogais Base — Α, Ε, Ι
descricao: Primeiro contato com as vogais fundamentais do alfabeto grego
versiculoAncora: ἀγάπη
referenciaAncora: 1 João 4:8
metodoPrimario: ExposureCard + Múltipla Escolha + TPR Digital
xpTotal: 60
revisadoPor: [nome do revisor]
dataRevisao: 2025-01-15
---
```

### 1.3 Bloco de Unidade de Aprendizado

Cada unidade de conteúdo usa o bloco `---UNIDADE---`:

```
---UNIDADE---
id: C1-M01-U01
ordem: 1
tipo: letter
srsKey: C1-M01_letter_alpha

# EXPOSIÇÃO (Fase 1 — sem avaliação)

forma: Α α
destaque: Α
transliteracao: alfa
traducao: letra alfa
som: /a/
explicacao: Primeira letra do alfabeto grego. Som de /a/ como em "pai". Existe em maiúscula (Α) e minúscula (α).
dica: Α parece com o A do português — mesma origem!
versiculo: ἀγάπη
referencia: 1 João 4:8

# RECONHECIMENTO (Fase 2)

QUESTAO tipo:multiple_choice
pergunta: Qual destas é a letra Alfa?
correta: Α
opcoes: Α | Β | Γ | Δ
explicacao: Α (alfa) é a primeira letra do alfabeto grego.

# ASSOCIAÇÃO (Fase 3)

QUESTAO tipo:multiple_choice
pergunta: Qual o som de Α (alfa)?
correta: /a/ como em "pai"
opcoes: /a/ como em "pai" | /e/ como em "pé" | /b/ como em "boca" | /o/ como em "pó"
explicacao: Alfa = /a/. Mesmo som do A português.

# RECORDAÇÃO (Fase 4)

QUESTAO tipo:tpr_digital
pergunta: Identifique a letra Alfa entre as opções:
correta: α
opcoes: α | ε | ι | ο
explicacao: α (minúscula de Alfa) tem um laço característico.

---
```

### 1.3-A — Campo `destaque` na EXPOSIÇÃO (obrigatório para unidades do tipo `letter`)

O campo `destaque` contém **a forma principal a ser exibida em destaque visual no topo do ExposureCard** — a letra em tamanho grande que o aluno vê antes de ler qualquer texto.

**Regra de uso:**

```
destaque: <glifo maiúsculo da letra>
```

- Para unidades do tipo `letter`: usar o glifo maiúsculo (ex: `Α`, `Η`, `Σ`).
- Para unidades do tipo `word` ou `phrase`: usar a palavra ou frase completa com diacríticos (ex: `ἀγάπη`, `ὁ λόγος`).
- Para unidades do tipo `phoneme`: usar a combinação fonética (ex: `αι`, `ου`).
- Para unidades do tipo `grammar_rule`: usar o símbolo ou forma paradigmática central (ex: `ὁ`, `τοῦ`).

**Por que este campo existe:**

O campo `forma` contém maiúscula + minúscula (ex: `Α α`). Mas o ExposureCard precisa saber *qual forma exibir em tamanho grande no cabeçalho visual* — a que o aluno vê primeiro, antes da explicação. Sem o campo `destaque`, o parser não tem como inferir isso automaticamente sem lógica adicional frágil. O campo torna a intenção explícita e o parser simples.

**Mapeamento para `UnitRow`:**

O parser extrai `destaque` para o campo:

```typescript
display_letter: exposure.destaque ?? exposure.forma.split(' ')[0],
```

O fallback `exposure.forma.split(' ')[0]` cobre módulos ainda não migrados, mas **todo módulo novo deve ter o campo `destaque` explícito**.

**Exemplo em apostila:**

```
# EXPOSIÇÃO (Fase 1 — sem avaliação)

forma: Η η
destaque: Η
transliteracao: eta
...
```

O app exibe `Η` em fonte grande no cabeçalho do card, e abaixo: `Η η · eta · /e/ longo`.

---

### 1.3-B — Bloco de Introdução de Ciclo (`---INTRODUCAO_CICLO---`)

Cada ciclo começa com um módulo de introdução especial — **não é um módulo de ensino de conteúdo**, mas um módulo de boas-vindas, contextualização histórica e preparação motivacional. Ele é gerado antes do primeiro módulo numerado (ex: antes de C1-M01) e identificado como `C1-M00`, `C2-M00`, etc.

**Formato do arquivo:**

```
C1-M00.introducao.md   ← Introdução do Ciclo I
C2-M00.introducao.md   ← Introdução do Ciclo II
```

**Estrutura do bloco:**

```
---INTRODUCAO_CICLO---
id: C1-M00
ciclo: 1
titulo: Bem-vindo ao Grego do Novo Testamento
subtitulo: O que você vai aprender — e por que isso muda como você lê a Bíblia
versiculoTrofeu: Ἐν ἀρχῇ ἦν ὁ λόγος
referenciaTrofeu: João 1:1
totalModulos: 10
totalSemanas: 10
dataRevisao: [pendente]
---

# ABERTURA

[Texto de abertura: 3–5 linhas. Tom caloroso, concreto, motivador. Não pedagógico ainda — apenas humano. O aluno está decidindo se quer continuar.]

# O QUE VOCÊ VAI APRENDER

[Descrição do ciclo em 4–6 linhas. O que o ciclo cobre, em linguagem do aluno (não de especialista). Terminar com o versículo-troféu e o que ele vai conseguir ler ao final.]

# CONTEXTO HISTÓRICO

[2–4 parágrafos. Responde: quando e onde surgiu o grego koiné, quem o falava, por que ele foi o idioma do NT, e o que "koiné" significa. Tom de aula, não de enciclopédia.]

# POR QUE APRENDER GREGO

[2–3 parágrafos. Responde: o que muda quando você lê o original. Pelo menos 1 exemplo concreto de uma palavra grega com nuance perdida na tradução (ex: ἀγάπη vs. ἔρως, εἰρήνη vs. paz romana). Não exagerar — o aluno não precisa aprender tudo agora.]

# O QUE ESPERAR DESTE CICLO

[Lista em prosa dos blocos e do que cada bloco entrega. Referência à estrutura de módulos, XP, e ao versículo-troféu do ciclo.]

# VERSÍCULO-TROFÉU

versiculoTrofeu: [versículo completo em grego]
referenciaTrofeu: [referência]
textoTrofeu: [tradução palavra a palavra em 1–2 linhas]
promessaTrofeu: [frase de 1 linha: "Ao terminar este ciclo, você conseguirá ler este versículo em grego."]
---
```

**Campos do bloco `---INTRODUCAO_CICLO---`:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string | ✅ | Sempre `C<n>-M00` |
| `ciclo` | int | ✅ | Número do ciclo |
| `titulo` | string | ✅ | Título da introdução (≤ 60 chars) |
| `subtitulo` | string | ✅ | Subtítulo motivador (≤ 80 chars) |
| `versiculoTrofeu` | string | ✅ | Versículo-troféu do ciclo em grego |
| `referenciaTrofeu` | string | ✅ | Referência bíblica (ex: João 1:1) |
| `totalModulos` | int | ✅ | Total de módulos do ciclo |
| `totalSemanas` | int | ✅ | Estimativa de semanas de estudo |
| `dataRevisao` | string | ✅ | Data da última revisão |

**Seções de conteúdo obrigatórias:**

| Seção | Comprimento | Tom |
|-------|-------------|-----|
| `# ABERTURA` | 3–5 linhas | Caloroso, pessoal |
| `# O QUE VOCÊ VAI APRENDER` | 4–6 linhas | Claro, concreto |
| `# CONTEXTO HISTÓRICO` | 2–4 parágrafos | Professoral, narrativo |
| `# POR QUE APRENDER GREGO` | 2–3 parágrafos | Motivacional, com exemplo concreto |
| `# O QUE ESPERAR DESTE CICLO` | 1 parágrafo + estrutura | Estruturado |
| `# VERSÍCULO-TROFÉU` | campos declarativos | Inspirador |

**Regras editoriais da introdução:**

1. **Nenhuma letra grega no corpo do texto antes de `# VERSÍCULO-TROFÉU`** — exceto em palavras transliteradas (ex: *koiné*, *logos*, *agápe*). O aluno ainda não sabe ler.
2. **A seção `# CONTEXTO HISTÓRICO` não é opcional** — o contexto histórico é o que transforma o grego de "decoreba" em "descoberta". O aluno precisa saber que está lendo o mesmo idioma dos apóstolos.
3. **A seção `# POR QUE APRENDER GREGO` deve ter 1 exemplo de nuance perdida na tradução** — sem ele, o texto é vago.
4. **O tom não é de manual** — é de professor que está animado com o que vai ensinar.
5. **Comprimento total:** 400–600 palavras. Suficiente para contextualizar, curto o bastante para o aluno não abandonar antes de começar.

**Mapeamento no parser:**

O parser detecta `---INTRODUCAO_CICLO---` e gera um `IntroRow`:

```typescript
export interface IntroRow {
  id: string;           // C1-M00
  ciclo: number;
  titulo: string;
  subtitulo: string;
  abertura: string;
  o_que_aprender: string;
  contexto_historico: string;
  por_que_aprender: string;
  o_que_esperar: string;
  versiculo_trofeu: string;
  referencia_trofeu: string;
  texto_trofeu: string;
  promessa_trofeu: string;
  total_modulos: number;
  total_semanas: number;
}
```

---

### 1.4 Bloco de Fase de Aplicação (nível módulo)

A fase 5 é declarada uma vez, ao final do módulo, após todas as unidades:

```
---APLICACAO---
# APLICAÇÃO DO MÓDULO (Fase 5 — usa conteúdo de todas as unidades acima)

QUESTAO tipo:tpr_digital xp:3
pergunta: Na palavra ἀγάπη, quantas vogais você reconhece?
correta: 3 vogais
opcoes: 1 vogal | 2 vogais | 3 vogais | 4 vogais
explicacao: ἀγάπη tem vogais: α, ά, η. Você aprendeu Α (α) e Ε (ε).

QUESTAO tipo:multiple_choice xp:3
pergunta: Qual sequência é: alfa, épsilon, iota?
correta: Α Ε Ι
opcoes: Α Ε Ι | Β Γ Δ | Ο Υ Ω | Η Ν Τ
explicacao: Α = alfa, Ε = épsilon, Ι = iota. As três primeiras vogais aprendidas.

---
```

### 1.5 Tipos de Questão Disponíveis

| Tipo | Quando usar |
|------|-------------|
| `multiple_choice` | Fase 2, 3, 4, 5 — identificação com 4 opções |
| `tpr_digital` | Fase 2, 4 — toque na resposta certa (visual) |
| `matching_pairs` | Fase 3 — associar pares (A↔B) |
| `fill_blank` | Fase 4, 5 — completar com opções |
| `word_order` | Fase 5 — montar frase arrastando blocos |
| `flashcard` | Fase 3, 4 — frente/verso com auto-avaliação |

### 1.6 Tipos de Unidade Disponíveis

| Tipo | Descrição | Quando usar |
|------|-----------|-------------|
| `letter` | Uma letra do alfabeto | Ciclo I |
| `phoneme` | Ditongo ou combinação fonética | Ciclo I módulos 9 |
| `grammar_rule` | Regra gramatical (artigo, declinação) | Ciclo II |
| `word` | Palavra do vocabulário | Ciclo II+ |
| `phrase` | Construção frasal | Ciclo II módulos 6+ |
| `verse_chunk` | Fragmento de versículo | Módulos de revisão |

---

## PARTE II — EXEMPLO COMPLETO DE APOSTILA

### C1-M01.apostila.md (arquivo completo)

```markdown
---MODULO---
id: C1-M01
ciclo: 1
ordem: 1
titulo: Vogais Base — Α, Ε, Ι
descricao: Primeiro contato com as três vogais fundamentais do alfabeto grego koiné
versiculoAncora: ἀγάπη
referenciaAncora: 1 João 4:8
metodoPrimario: ExposureCard + Múltipla Escolha + TPR Digital
xpTotal: 60
revisadoPor: MarcoAntonio
dataRevisao: 2025-01-15
---

---UNIDADE---
id: C1-M01-U01
ordem: 1
tipo: letter
srsKey: C1-M01_letter_alpha

# EXPOSIÇÃO

forma: Α α
destaque: Α
transliteracao: alfa

QUESTAO tipo:multiple_choice
pergunta: Qual destas é a letra Alfa?
correta: Α
opcoes: Α | Β | Γ | Δ
explicacao: Α (alfa) é a primeira letra do alfabeto grego.

# ASSOCIAÇÃO

QUESTAO tipo:multiple_choice
pergunta: Qual o som de Α (alfa)?
correta: /a/ como em "pai"
opcoes: /a/ como em "pai" | /e/ como em "pé" | /b/ como em "boca" | /o/ como em "pó"
explicacao: Alfa = /a/. Mesmo som do A do português.

# RECORDAÇÃO

QUESTAO tipo:tpr_digital
pergunta: Identifique a letra Alfa entre as opções:
correta: α
opcoes: α | ε | ι | ο
explicacao: α (minúscula de Alfa) tem um laço fechado na parte inferior.

---

---UNIDADE---
id: C1-M01-U02
ordem: 2
tipo: letter
srsKey: C1-M01_letter_epsilon

# EXPOSIÇÃO

forma: Ε ε
destaque: Ε
transliteracao: épsilon
dica: Ε parece com um E sem a barra do meio — como se tivesse perdido um traço.
versiculo: ἐγώ
referencia: João 6:35

# RECONHECIMENTO

QUESTAO tipo:multiple_choice
pergunta: Qual destas é a letra Épsilon?
correta: Ε
opcoes: Α | Ε | Ι | Ο
explicacao: Ε (épsilon) é a quinta letra do alfabeto grego.

# ASSOCIAÇÃO

QUESTAO tipo:matching_pairs
pergunta: Combine as letras aprendidas com seus sons:
pares: Α:/a/ | Ε:/e/
explicacao: Α = /a/ como "pai", Ε = /e/ como "pé". Atenção à diferença!

# RECORDAÇÃO

QUESTAO tipo:tpr_digital
pergunta: Qual é o Épsilon minúsculo?
correta: ε
opcoes: α | ε | ι
explicacao: ε (épsilon minúsculo) tem forma de curva aberta para a direita.

---

---UNIDADE---
id: C1-M01-U03
ordem: 3
tipo: letter
srsKey: C1-M01_letter_iota

# EXPOSIÇÃO

forma: Ι ι
destaque: Ι
transliteracao: iota
traducao: letra iota
som: /i/
explicacao: Nona letra do alfabeto grego. Som de /i/ como em "vida". Muito frequente no NT — aparece em ἵνα (para que), ἰδού (eis), e especialmente no nome Ἰησοῦς (Jesus). Em grego clássico, iota também pode ser subscrito (ι pequeno sob vogal longa).
dica: ι é como uma vírgula reta — simples e fino, como o som /i/.
versiculo: Ἰησοῦς
referencia: Mateus 1:1

# RECONHECIMENTO

QUESTAO tipo:tpr_digital
pergunta: Qual destas é a letra Iota?
correta: Ι
opcoes: Α | Ε | Ι | Β
explicacao: Ι (iota) é a mais fina e simples das letras gregas.

# ASSOCIAÇÃO

QUESTAO tipo:multiple_choice
pergunta: Qual o som de Ι (iota)?
correta: /i/ como em "vida"
opcoes: /i/ como em "vida" | /a/ como em "pai" | /e/ como em "pé" | /u/
explicacao: Iota = /i/. O mesmo som do "i" português.

# RECORDAÇÃO

QUESTAO tipo:fill_blank
pergunta: Complete as 3 vogais aprendidas neste módulo:
correta: Α Ε Ι
opcoes: Α Ε Ι | Β Γ Δ | Ο Υ Ω | Α Ο Ω
explicacao: As três primeiras vogais do grego são Α (alfa), Ε (épsilon) e Ι (iota).

---

---APLICACAO---
# APLICAÇÃO DO MÓDULO C1-M01
# Usa APENAS o conteúdo ensinado nas unidades acima: Α, Ε, Ι

QUESTAO tipo:tpr_digital xp:3
pergunta: Na palavra ἀγάπη, quantas vogais você reconhece dentre as aprendidas?
correta: 2 vogais (α, α)
opcoes: 1 vogal | 2 vogais | 3 vogais | nenhuma
explicacao: ἀγάπη tem ἀ e ά (ambas alfa — Α). O η ainda não foi ensinado.

QUESTAO tipo:multiple_choice xp:3
pergunta: Qual sequência representa: alfa, épsilon, iota?
correta: Α Ε Ι
opcoes: Α Ε Ι | Β Γ Δ | Ο Υ Ω | Η Ν Τ
explicacao: Α = alfa (/a/), Ε = épsilon (/e/), Ι = iota (/i/). As três vogais do módulo 1.

---
```

---

## PARTE III — O MOTOR DE INTERPRETAÇÃO

### 3.1 Localização e Responsabilidade

```
src/
  tools/
    apostilaParser.ts    ← Motor principal (lê .md → gera UnitRow[])
    apostilaValidator.ts ← Valida regras pedagógicas
    apostilaRunner.ts    ← CLI: npm run parse-apostila
```

O motor nunca vai para produção. É uma ferramenta de desenvolvimento.

### 3.2 Interface de Saída

O parser gera exatamente o mesmo `UnitRow[]` que o `units.ts` atual já usa:

```typescript
// src/tools/apostilaParser.ts

import { UnitRow } from '@/content/curriculum/units';

export interface ParseResult {
  success: boolean;
  moduleId: string;
  units: UnitRow[];
  applicationPhase: PhaseExercise[]; // fase 5
  errors: ParseError[];
  warnings: ParseWarning[];
}

export interface ParseError {
  line: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface ParseWarning {
  unitId: string;
  message: string;
}
```

### 3.3 Implementação do Parser

```typescript
// src/tools/apostilaParser.ts

export const parseApostila = (content: string, filename: string): ParseResult => {
  const lines = content.split('\n');
  const errors: ParseError[] = [];
  const warnings: ParseWarning[] = [];
  
  // ── 1. Extrair cabeçalho do módulo ────────────────────────────
  const moduleHeader = extractBlock(lines, '---MODULO---', '---');
  if (!moduleHeader) {
    return { success: false, moduleId: '', units: [], applicationPhase: [], errors: [
      { line: 1, message: 'Bloco ---MODULO--- não encontrado', severity: 'error' }
    ], warnings };
  }
  const moduleId = moduleHeader['id'];

  // ── 2. Extrair blocos de unidade ──────────────────────────────
  const unitBlocks = extractAllBlocks(lines, '---UNIDADE---', '---');
  const units: UnitRow[] = [];

  for (const block of unitBlocks) {
    const unit = parseUnitBlock(block, moduleId, errors);
    if (unit) units.push(unit);
  }

  // ── 3. Extrair fase de aplicação ──────────────────────────────
  const applicationBlock = extractBlock(lines, '---APLICACAO---', '---');
  const applicationPhase = applicationBlock
    ? parseQuestions(applicationBlock['questoes'] ?? '', errors)
    : [];

  // ── 4. Injetar fase 5 na última unidade ───────────────────────
  if (units.length > 0 && applicationPhase.length > 0) {
    units[units.length - 1].phase5_data = JSON.stringify(applicationPhase);
  }

  // ── 5. Validação pedagógica ───────────────────────────────────
  const validationWarnings = validatePedagogicalRules(units, moduleId);
  warnings.push(...validationWarnings);

  return {
    success: errors.filter(e => e.severity === 'error').length === 0,
    moduleId,
    units,
    applicationPhase,
    errors,
    warnings,
  };
};

// ── PARSERS INTERNOS ─────────────────────────────────────────────

const parseUnitBlock = (blockContent: string, moduleId: string, errors: ParseError[]): UnitRow | null => {
  const lines = blockContent.split('\n');
  const meta = extractMetaFields(lines); // id, ordem, tipo, srsKey
  
  const exposureSection = extractSection(lines, '# EXPOSIÇÃO');
  const phase2Section = extractSection(lines, '# RECONHECIMENTO');
  const phase3Section = extractSection(lines, '# ASSOCIAÇÃO');
  const phase4Section = extractSection(lines, '# RECORDAÇÃO');

  if (!exposureSection || !phase2Section || !phase3Section || !phase4Section) {
    errors.push({
      line: 0,
      message: `Unidade ${meta.id}: seção obrigatória ausente (EXPOSIÇÃO/RECONHECIMENTO/ASSOCIAÇÃO/RECORDAÇÃO)`,
      severity: 'error',
    });
    return null;
  }

  const exposure = parseExposureSection(exposureSection);
  const phase2 = parseQuestions(phase2Section, errors);
  const phase3 = parseQuestions(phase3Section, errors);
  const phase4 = parseQuestions(phase4Section, errors);

  return {
    id: meta.id,
    module_id: moduleId,
    unit_order: parseInt(meta.ordem),
    unit_type: meta.tipo,
    greek_form: exposure.forma,
    transliteration: exposure.transliteracao,
    gloss_pt: exposure.traducao,
    phonetic_sound: exposure.som ?? '',
    explanation: exposure.explicacao,
    mnemonic_hint: exposure.dica ?? '',
    context_verse: exposure.versiculo ?? '',
    context_reference: exposure.referencia ?? '',
    srs_key: meta.srsKey,
    phase2_data: JSON.stringify(phase2),
    phase3_data: JSON.stringify(phase3),
    phase4_data: JSON.stringify(phase4),
    phase5_data: '', // preenchido depois com a fase de aplicação
  };
};

const parseQuestions = (sectionContent: string, errors: ParseError[]): PhaseExercise[] => {
  const questions: PhaseExercise[] = [];
  const questaoBlocks = sectionContent.split('QUESTAO ');
  
  for (const block of questaoBlocks.slice(1)) {
    const question = parseQuestion(block.trim(), errors);
    if (question) questions.push(question);
  }
  
  return questions;
};

const parseQuestion = (block: string, errors: ParseError[]): PhaseExercise | null => {
  const lines = block.split('\n');
  const firstLine = lines[0]; // "tipo:multiple_choice" ou "tipo:multiple_choice xp:3"
  
  const tipoMatch = firstLine.match(/tipo:(\w+)/);
  const xpMatch = firstLine.match(/xp:(\d+)/);
  
  if (!tipoMatch) {
    errors.push({ line: 0, message: 'Questão sem tipo definido', severity: 'error' });
    return null;
  }

  const fields: Record<string, string> = {};
  for (const line of lines.slice(1)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.substring(0, colonIdx).trim().toLowerCase();
    const value = line.substring(colonIdx + 1).trim();
    fields[key] = value;
  }

  const type = tipoMatch[1] as ExerciseType;
  const xpReward = xpMatch ? parseInt(xpMatch[1]) : 2;

  // Tratar tipos especiais
  if (type === 'matching_pairs') {
    const pares = fields['pares']?.split('|').map(p => {
      const [a, b] = p.trim().split(':');
      return [a.trim(), b.trim()];
    }) ?? [];
    return {
      type,
      questionPT: fields['pergunta'],
      correctAnswer: 'matching',
      options: pares,
      explanation: fields['explicacao'],
      xpReward,
    };
  }

  const options = fields['opcoes']?.split('|').map(o => o.trim()) ?? [];

  return {
    type,
    questionPT: fields['pergunta'],
    correctAnswer: fields['correta'],
    options,
    explanation: fields['explicacao'],
    xpReward,
  };
};
```

### 3.4 Validador Pedagógico

```typescript
// src/tools/apostilaValidator.ts

export const validatePedagogicalRules = (units: UnitRow[], moduleId: string): ParseWarning[] => {
  const warnings: ParseWarning[] = [];

  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    
    // Verificar que cada fase tem ao menos 1 questão
    const p2 = JSON.parse(unit.phase2_data || '[]');
    const p3 = JSON.parse(unit.phase3_data || '[]');
    const p4 = JSON.parse(unit.phase4_data || '[]');
    
    if (p2.length === 0) warnings.push({ unitId: unit.id, message: 'Fase 2 (Reconhecimento) vazia' });
    if (p3.length === 0) warnings.push({ unitId: unit.id, message: 'Fase 3 (Associação) vazia' });
    if (p4.length === 0) warnings.push({ unitId: unit.id, message: 'Fase 4 (Recordação) vazia' });
    
    // Verificar que matching_pairs tem ao menos 2 pares
    for (const exercise of [...p2, ...p3, ...p4]) {
      if (exercise.type === 'matching_pairs') {
        if (!Array.isArray(exercise.options) || exercise.options.length < 2) {
          warnings.push({ unitId: unit.id, message: 'matching_pairs precisa de ao menos 2 pares' });
        }
      }
    }

    // Verificar que multiple_choice tem entre 2 e 4 opções
    for (const exercise of [...p2, ...p3, ...p4]) {
      if (exercise.type === 'multiple_choice') {
        const opts = Array.isArray(exercise.options) ? exercise.options : [];
        if (opts.length < 2 || opts.length > 4) {
          warnings.push({ unitId: unit.id, message: `multiple_choice com ${opts.length} opções (esperado 2-4)` });
        }
        if (!opts.includes(exercise.correctAnswer)) {
          warnings.push({ unitId: unit.id, message: `Resposta correta "${exercise.correctAnswer}" não está nas opções` });
        }
      }
    }

    // Verificar que fill_blank e tpr_digital têm a correctAnswer dentro das options
    for (const exercise of [...p2, ...p3, ...p4]) {
      if (['fill_blank', 'tpr_digital'].includes(exercise.type)) {
        const opts: string[] = Array.isArray(exercise.options) ? exercise.options : [];
        if (!opts.includes(exercise.correctAnswer)) {
          warnings.push({ unitId: unit.id, message: `Resposta correta "${exercise.correctAnswer}" ausente nas opções de ${exercise.type}` });
        }
      }
    }
  }

  return warnings;
};
```

### 3.5 Script CLI

```typescript
// src/tools/apostilaRunner.ts
// Uso: npm run parse-apostila -- --modulo C1-M01

import * as fs from 'fs';
import * as path from 'path';
import { parseApostila } from './apostilaParser';
import { generateUnitRowCode } from './apostilaCodegen';

const args = process.argv.slice(2);
const moduloArg = args.find(a => a.startsWith('--modulo='))?.split('=')?.[1]
               ?? args[args.indexOf('--modulo') + 1];

if (!moduloArg) {
  console.error('❌ Uso: npm run parse-apostila -- --modulo C1-M01');
  process.exit(1);
}

// Determinar caminho do arquivo
const ciclo = moduloArg.startsWith('C1') ? 'ciclo-1' : 'ciclo-2';
const filePath = path.resolve(`content/apostila/${ciclo}/${moduloArg}.apostila.md`);

if (!fs.existsSync(filePath)) {
  console.error(`❌ Arquivo não encontrado: ${filePath}`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
const result = parseApostila(content, moduloArg);

// Exibir erros
if (result.errors.length > 0) {
  console.log('\n🚨 ERROS:');
  result.errors.forEach(e => console.log(`  Linha ${e.line}: ${e.message}`));
}

// Exibir warnings
if (result.warnings.length > 0) {
  console.log('\n⚠️  AVISOS:');
  result.warnings.forEach(w => console.log(`  [${w.unitId}] ${w.message}`));
}

if (!result.success) {
  console.log('\n❌ Parse falhou. Corrija os erros antes de gerar o código.');
  process.exit(1);
}

// Gerar código TypeScript
const generatedCode = generateUnitRowCode(result.units, moduloArg);

// Opção 1: Mostrar na tela
console.log('\n✅ Parse bem-sucedido!');
console.log(`📦 ${result.units.length} unidades geradas para ${moduloArg}`);
console.log('\n--- CÓDIGO GERADO ---\n');
console.log(generatedCode);

// Opção 2: Escrever direto no arquivo de saída (com flag --write)
if (args.includes('--write')) {
  const outPath = path.resolve(`content/curriculum/generated/${moduloArg}.generated.ts`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, generatedCode, 'utf-8');
  console.log(`\n💾 Escrito em: ${outPath}`);
}
```

### 3.6 Gerador de Código TypeScript

```typescript
// src/tools/apostilaCodegen.ts

import { UnitRow } from '@/content/curriculum/units';

export const generateUnitRowCode = (units: UnitRow[], moduleId: string): string => {
  const lines = [
    `// GERADO AUTOMATICAMENTE por apostilaParser.ts`,
    `// Fonte: content/apostila/**/${moduleId}.apostila.md`,
    `// NÃO EDITAR DIRETAMENTE — edite a apostila`,
    ``,
    `import { UnitRow } from '@/content/curriculum/units';`,
    ``,
    `export const ${moduleId.replace('-', '_')}: UnitRow[] = [`,
  ];

  for (const unit of units) {
    lines.push(`  {`);
    lines.push(`    id: '${unit.id}',`);
    lines.push(`    module_id: '${unit.module_id}',`);
    lines.push(`    unit_order: ${unit.unit_order},`);
    lines.push(`    unit_type: '${unit.unit_type}',`);
    lines.push(`    greek_form: '${unit.greek_form}',`);
    lines.push(`    transliteration: '${unit.transliteration}',`);
    lines.push(`    gloss_pt: '${unit.gloss_pt}',`);
    lines.push(`    phonetic_sound: '${unit.phonetic_sound}',`);
    lines.push(`    explanation: '${escapeStr(unit.explanation)}',`);
    lines.push(`    mnemonic_hint: '${escapeStr(unit.mnemonic_hint)}',`);
    lines.push(`    context_verse: '${unit.context_verse}',`);
    lines.push(`    context_reference: '${unit.context_reference}',`);
    lines.push(`    srs_key: '${unit.srs_key}',`);
    lines.push(`    phase2_data: ${JSON.stringify(unit.phase2_data)},`);
    lines.push(`    phase3_data: ${JSON.stringify(unit.phase3_data)},`);
    lines.push(`    phase4_data: ${JSON.stringify(unit.phase4_data)},`);
    lines.push(`    phase5_data: ${JSON.stringify(unit.phase5_data)},`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  return lines.join('\n');
};

const escapeStr = (s: string) => s.replace(/'/g, "\\'").replace(/\n/g, '\\n');
```

---

## PARTE IV — CONFIGURAÇÃO DO PROJETO

### 4.1 Scripts no `package.json`

```json
{
  "scripts": {
    "parse-apostila": "tsx src/tools/apostilaRunner.ts",
    "parse-apostila:all": "tsx src/tools/apostilaRunner.ts --all",
    "validate-apostila": "tsx src/tools/apostilaRunner.ts --validate-only",
    "seed": "tsx src/features/database/seedAll.ts"
  }
}
```

### 4.2 Instalar Dependência

```bash
npm install -D tsx
```

---

## PARTE V — FLUXO DE TRABALHO COMPLETO

### Para um novo módulo (ex: C3-M01 — Ciclo III)

```bash
# 1. Criar o arquivo da apostila
touch content/apostila/ciclo-3/C3-M01.apostila.md

# 2. Escrever o conteúdo no formato documentado acima
# (professor/autor escreve, revisor confere o .md)

# 3. Validar sem gerar código
npm run validate-apostila -- --modulo C3-M01

# 4. Se OK, gerar e ver na tela
npm run parse-apostila -- --modulo C3-M01

# 5. Gerar arquivo TypeScript
npm run parse-apostila -- --modulo C3-M01 --write

# 6. Incluir o módulo gerado no units.ts
# Em content/curriculum/units.ts:
# import { C3_M01 } from './generated/C3-M01.generated';
# export const LEARNING_UNITS = [...existingUnits, ...C3_M01];

# 7. Rodar o seed do banco
npm run seed
```

### Para corrigir um módulo existente

```bash
# 1. Editar o arquivo .apostila.md (só texto, zero código)
# 2. Validar
npm run validate-apostila -- --modulo C1-M03

# 3. Regenerar
npm run parse-apostila -- --modulo C1-M03 --write

# 4. O arquivo units.ts já aponta para o generated, não precisa tocar
# 5. npm run seed para repopular SQLite
```

---

## PARTE VI — REGRAS EDITORIAIS DA APOSTILA

### O que o autor DEVE fazer

- Escrever a `explicacao` em português claro, 2-4 linhas máximo
- A `dica` deve ter UMA associação mnemônica, não mais de 2 linhas
- Cada questão de `multiple_choice` deve ter exatamente 4 opções
- A `correta` deve ser copiada exatamente de uma das `opcoes`
- Em fases 2 e 3, as opções erradas devem ser plausíveis (não óbvias)
- Em fases de `matching_pairs`, listar os pares como `grego:português`
- Questões da Fase 5 (`---APLICACAO---`) usam APENAS conteúdo ensinado nas unidades acima

### O que o autor NÃO deve fazer

- Usar palavras gregas nas opções que ainda não foram ensinadas neste módulo ou em módulos anteriores
- Repetir a mesma questão em fases diferentes
- Criar `fill_blank` sem incluir a resposta correta nas opções
- Criar questões de `word_order` na Fase 2 ou 3 (reservado para Fase 5)
- Omitir o campo `srsKey` — ele conecta a unidade ao banco SRS

### Checklist de revisão por módulo

```
[ ] Cabeçalho ---MODULO--- preenchido completamente
[ ] Número de unidades = 3 (padrão) ou justificado
[ ] Cada unidade tem EXPOSIÇÃO, RECONHECIMENTO, ASSOCIAÇÃO, RECORDAÇÃO
[ ] Fase 5 (---APLICACAO---) existe na apostila
[ ] Todas as respostas corretas estão nas opções
[ ] Nenhuma questão usa conteúdo não ensinado anteriormente
[ ] Matching pairs tem ≥ 2 pares
[ ] Multiple choice tem 4 opções
[ ] Versículo âncora e referência estão corretos
[ ] Campo revisadoPor e dataRevisao preenchidos
```

---

## PARTE VI-A — REGRAS SISTÊMICAS VIGENTES (v1.0)

> **Esta seção é vinculante.** Foi gerada a partir da primeira revisão completa de C1-M01 e complementa as regras da PARTE VI. Toda regra listada aqui deve ser aplicada pelo autor **e** verificada pelo Agente de Revisão. Acompanhe as atualizações em `CORRECOES_SISTEMICAS_V1.md`.

### Regra S-01 — Versículos âncora são definidos pela grade, sem substituição

O campo `versiculo` e `referencia` de cada unidade deve corresponder **exatamente** ao que está definido na GRADE_CURRICULAR_KOINE.md. Substituir o versículo por outro que pareça mais emblemático é falha bloqueadora.

A única exceção é quando a grade usa a expressão "preferencialmente" ou "ou equivalente". Nenhuma entrada do Ciclo I contém essa ressalva.

**Verificação:**
```
[ ] Conferir versiculo e referencia contra o Apêndice
    "MAPA DE VERSÍCULOS ÂNCORA" deste documento.
[ ] Conferir contra a GRADE_CURRICULAR_KOINE.md (versão mais recente).
```

### Regra S-02 — Glifos gregos de módulos futuros não aparecem no texto de exposição

Alertas de confusão com letras futuras são permitidos, mas devem mencionar a letra **pelo nome em português**, nunca pelo glifo grego.

**Formato correto:**
> "No Módulo 3, você vai conhecer outra letra que parece com esta em maiúsculo — ela se chama eta e tem um som diferente."

**Formato proibido:**
> "Cuidado com Η (eta) — parece Ε mas soa diferente."

**Exceção (DS-01):** distratores em questões de múltipla escolha podem usar glifos de letras futuras, mas apenas como distrator e nunca nomeados.

### Regra S-03 — Questões da Fase de Aplicação correspondem exatamente à grade

A grade curricular prescreve as questões da `---APLICACAO---` de forma vinculante. O nível cognitivo da questão implementada deve ser o mesmo prescrito.

| Tarefa da grade | Tarefa incorreta (simplificada) |
|----------------|--------------------------------|
| "identifique TODAS as letras Α/α em ἀγάπη" | "qual é a primeira letra de ἀγάπη?" |
| "monte a sequência completa Α Ε Ι Ο Υ Ω" | "quais são as 3 primeiras vogais?" |
| "identifique o ε inicial em ἐγώ εἰμι ὁ ἄρτος" | "qual letra abre a palavra ἐγώ?" |

### Regra S-04 — Maiúscula e minúscula são descritas separadamente

Toda unidade do tipo `letter` deve descrever a forma maiúscula e a forma minúscula como **entidades separadas**.

**Template obrigatório:**
```
[Nome] maiúsculo (Χ): [descrição da forma e semelhança com português/latim]
[Nome] minúsculo (χ): [descrição da forma — é aqui que a diferença geralmente aparece]
O som, em ambos os casos: [som] — como em [exemplo em português].
```

**Mapeamento de referência para os módulos seguintes:**

| Letra | Maiúscula — semelhança PT | Minúscula — diferença |
|-------|--------------------------|----------------------|
| Ο ο | Idêntica ao O | Idêntica — sem confusão |
| Υ υ | Parece Y | Curva com haste — diferente do u |
| Ω ω | Diferente — ferradura aberta | Mesma forma da maiúscula, menor |
| Η η | Parece H (mas não soa H) | Diferente do h minúsculo |
| Ν ν | Igual ao N | Forma de ponte |
| Τ τ | Igual ao T | Tem curva à direita — diferente do t |
| Σ σ/ς | Diferente do S | σ: curva fechada / ς: curva com cauda |
| Κ κ | Similar ao K | Ligeiramente mais curvo |
| Λ λ | Diferente — triângulo | Dois traços: um curvo, um diagonal |

### Regra S-05 — Exposições usam apenas glifos do conjunto acumulado

Os campos `explicacao` e `dica` podem conter apenas glifos do conjunto de letras ensinadas nos módulos C1-M01 até o módulo atual. Isso inclui:
- Palavras gregas usadas como exemplo
- Letras isoladas usadas como ilustração visual
- Formas de palavras dentro de versículos citados

**Tratamento de palavras com diacríticos antes de C1-M09:** palavras com diacríticos podem aparecer (são palavras âncora) desde que o texto da exposição contenha a **instrução padrão de diacríticos** (ver Apêndice B deste documento).

### Regra S-06 — Ε e Η como par de confusão primário desde C1-M01

**Em C1-M01 (Épsilon):**
- Mencionar a existência de uma letra parecida em maiúsculo, sem exibir o glifo Η.
- Focar na forma minúscula ε como a forma que o aluno mais encontrará.

**Em C1-M03 (Eta):**
- Retomar a distinção explicitamente.
- Exercício de distinção obrigatório: `matching_pairs` com `Ε:/e/ breve | Η:/e/ longo` na Fase 3 de U01.

---

### Decisão DS-01 — 1 letra futura como distrator (C1-M01, C1-M02, C1-M03)

Em módulos com menos de 4 letras ensinadas, é matematicamente impossível gerar 4 opções de `multiple_choice` sem usar letras futuras. A exceção autoriza até 1 letra futura como distrator, sob as condições:

1. A letra futura aparece **apenas como distrator** — nunca como resposta correta, nunca na exposição, nunca na dica.
2. A letra futura não é **nomeada** na explicação da questão. Pode-se dizer "as outras letras você aprenderá nos próximos módulos", mas não "Β é o beta e você aprende no Módulo 6."
3. Dar preferência a letras que **visualmente** se assemelhem às já ensinadas.
4. A explicação pode mencionar "não foi ensinada ainda", mas não dar mais informação do que isso.

**Letras autorizadas como distratores por módulo:**

| Módulo | Letras ensinadas | Distrator autorizado |
|--------|-----------------|---------------------|
| C1-M01 | Α Ε Ι | Β |
| C1-M02 | + Ο Υ Ω | Θ ou Φ |
| C1-M03 | + Η Ν Τ | Π ou Γ |

A partir de C1-M04, esta exceção não se aplica.

### Decisão DS-02 — Palavras com diacríticos antes de C1-M09

Palavras teologicamente importantes (Ἰησοῦς, ἀγάπη, λόγος, ἦν) contêm diacríticos ensinados em C1-M09. A exceção permite uso, sob as condições:

1. O campo `explicacao` da unidade contém a instrução padrão de diacríticos (ver Regra S-05).
2. As questões de fase 2, 3 e 4 **não pedem ao aluno que identifique ou diferencie diacríticos**. Usam a letra base, não a letra com marca.
3. A resposta correta em `tpr_digital` é a forma com diacrítico completa; a explicação explicita que o diacrítico é acessório por ora.

---

### Checklist corretivo (v1.0)

```
[ ] S-01: Cada versiculo e referencia conferido contra a grade?
[ ] S-02: O campo explicacao de cada unidade contém glifo
    de letra futura? (NÃO DEVE)
[ ] S-03: Cada questão da ---APLICACAO--- corresponde
    exatamente à tarefa descrita na grade?
[ ] S-04: O campo explicacao de cada unidade tipo `letter`
    descreve maiúscula e minúscula separadamente?
[ ] S-05: Toda palavra com diacríticos usada antes de C1-M09
    tem a instrução padrão de diacríticos no explicacao?
[ ] S-06 (apenas C1-M03): matching_pairs Ε/Η presente na Fase 3 de U01?
[ ] DS-01: Se distrator de letra futura foi usado, foi por
    semelhança visual e sem nomeação?
[ ] DS-02: Instrução padrão de diacríticos presente onde aplicável?
```

---

## APÊNDICE A — MAPA DE VERSÍCULOS ÂNCORA (CICLO I)

Tabela de referência rápida. Colar diretamente nos campos `versiculo` e `referencia` sem modificação.

| Módulo | Unidade | Forma grega | Referência |
|--------|---------|-------------|------------|
| C1-M01 | U01 Alfa | ἀγάπη | 1 João 4:8 |
| C1-M01 | U02 Épsilon | ἐγώ | João 6:35 |
| C1-M01 | U03 Iota | Ἰησοῦς εἶπεν | João 11:25 |
| C1-M02 | U01 Ômicron | ὁ θεός | João 1:1 |
| C1-M02 | U02 Ípsilon | τὸν υἱὸν τὸν μονογενῆ | João 3:16 |
| C1-M02 | U03 Ômega | ἐγώ εἰμι τὸ Α καὶ τὸ Ω | Apocalipse 1:8 |
| C1-M03 | U01 Eta | Ἐν ἀρχῇ ἦν ὁ λόγος | João 1:1a |
| C1-M03 | U02 Nu | ὁ νόμος διὰ Μωϋσέως ἐδόθη | João 1:17 |
| C1-M03 | U03 Tau | τέκνα θεοῦ γενέσθαι | João 1:12 |
| C1-M04 | U01 Sigma | ὁ λόγος σὰρξ ἐγένετο | João 1:14 |
| C1-M04 | U02 Kappa | οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον | João 3:16 |
| C1-M04 | U03 Lambda | Ἐν ἀρχῇ ἦν ὁ λόγος | João 1:1 |
| C1-M05 | U01 Pi | Πάτερ ἅγιε | João 17:11 |
| C1-M05 | U02 Rô | τὰ ῥήματά μου | João 6:63 |
| C1-M05 | U03 Mi | Ἐν τούτῳ γνώσονται πάντες ὅτι ἐμοὶ μαθηταί ἐστε | João 13:35 |
| C1-M06 | U01 Beta | ἐν τῷ βιβλίῳ τούτῳ | João 20:30 |
| C1-M06 | U02 Delta | ἐθεασάμεθα τὴν δόξαν αὐτοῦ | João 1:14 |

---

## APÊNDICE B — INSTRUÇÃO PADRÃO DE DIACRÍTICOS

Copiar este bloco sempre que uma palavra com diacríticos aparecer em módulo anterior a C1-M09:

> "Os pequenos sinais sobre as letras — os acentos e traços — se chamam **diacríticos**. Você aprende tudo sobre eles no Módulo 9. Por agora, identifique apenas a letra [X] nesta palavra. Os diacríticos não mudam a letra em si — apenas indicam como pronunciá-la com precisão."

---

## PARTE VII — DIFERENÇAS DO SISTEMA DIANOIGO

O sistema Koiné tem particularidades em relação ao Dianoigo:

| Aspecto | Dianoigo | Koiné |
|---------|----------|-------|
| Formato de saída | Documento único | Array `UnitRow[]` por módulo |
| Fases | Linear por seção | 4 fases por unidade + 1 por módulo |
| Tipos de exercício | Redação/discussão | 6 tipos interativos |
| Caracteres especiais | Latim/PT | Grego politônico (diacríticos) |
| Validação | Semântica | Pedagógica + estrutural |
| Destino | PDF/Web | SQLite → React Native |

A principal diferença é que no Koiné **cada questão é tipada e interativa** — o parser precisa conhecer os tipos de exercício para garantir que os dados estão corretos antes de gerar o código.

---

## PARTE VIII — PRÓXIMOS PASSOS (ordem de execução)

### Sprint 1 — Infraestrutura
1. Criar pasta `content/apostila/` com subpastas `ciclo-1/` e `ciclo-2/`
2. Criar `src/tools/apostilaParser.ts` conforme Seção 3.3
3. Criar `src/tools/apostilaValidator.ts` conforme Seção 3.4
4. Criar `src/tools/apostilaRunner.ts` conforme Seção 3.5
5. Criar `src/tools/apostilaCodegen.ts` conforme Seção 3.6
6. Adicionar scripts no `package.json`
7. Testar com conteúdo já existente: converter `C1-M01` do `units.ts` para `.apostila.md` e fazer parse

### Sprint 2 — Migração do conteúdo existente
8. Converter todos os módulos do `units.ts` para `.apostila.md`
9. Validar cada módulo com `npm run validate-apostila`
10. Corrigir os erros identificados pelo validador (questões incorretas, opções faltando)
11. Marcar todos como `revisadoPor: [autor]` após verificação manual

### Sprint 3 — Expansão
12. Criar `C1-M09.apostila.md` e `C2-M09+` (módulos ainda não existentes)
13. Ciclo III em apostila antes de codificar qualquer tela nova

---

*Documento gerado com base na análise do `koine-content.zip` e no sistema Dianoigo como referência.*
*Stack: Node.js + tsx + TypeScript + formato Markdown estruturado*
