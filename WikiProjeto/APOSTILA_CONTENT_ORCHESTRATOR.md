# Orquestrador de Conteúdo — ApostilaCoach
## Koiné: Grego do Novo Testamento

> **Versão:** 1.0.0
> **Gerado para:** `src/content/apostila/lessons.ts`
> **Feature:** ApostilaCoach (`FEATURE_APOSTILA_COACH.md`)
> **Uso:** Este documento é o briefing mestre para geração de todas as 20 lições da apostila. Cada seção define exatamente o que deve ser gerado, em qual formato e seguindo qual padrão pedagógico.

---

## COMO USAR ESTE ORQUESTRADOR

Este documento é um **briefing de produção**, não um arquivo de código. Ele responde a três perguntas para cada lição:

1. **O quê** — quais palavras/letras/frases cobrir
2. **Como** — qual sequência de `ApostilaStep[]` gerar
3. **Padrão** — qual template de step usar (os templates estão na Seção 2)

### 🚀 Saída Esperada
Para cada lição **LXX**, o LLM deve gerar **DOIS ARQUIVOS**:

✅ **1. Arquivo Markdown (.apostila.md)**
> **Local:** `WikiProjeto/Apostila/LXX.apostila.md`
- Conteúdo **puro markdown** usado para gerar o PDF da apostila via CI/CD
- Estrutura pedagógica completa: narração, instruções, espaços de escrita, contexto bíblico
- Formato pronto para impressão e uso pelo aluno

✅ **2. Arquivo TypeScript (.ts)**
> **Local:** `WikiProjeto/Apostila/LXX_apostila.ts`
- Exporta a constante `APOSTILA_LXX` com `ApostilaLesson`
- Usa os templates da Seção 2 para montar `steps: ApostilaStep[]`
- Contém o mesmo conteúdo pedagógico em formato estruturado para o app

### Instrução Geral
O LLM deve:
1. LER a grade da lição (ex: L01, L02...)
2. PRODUZIR o markdown pedagógico
3. PRODUZIR o arquivo TypeScript com os steps
4. GARANTIR consistência entre os dois arquivos


---

## 1. VISÃO GERAL DA GRADE DE CONTEÚDO

### Estrutura dos 4 Blocos

| Bloco | Lições | Tema | XP/Lição | Total Lições |
|-------|--------|------|----------|--------------|
| **Bloco 1 — Alfabeto I: Vogais** | L01–L02 | 7 vogais gregas | 30 XP | 2 |
| **Bloco 2 — Alfabeto II: Consoantes** | L03–L06 | 17 consoantes em grupos | 35 XP | 4 |
| **Bloco 3 — Vocabulário do NT** | L07–L16 | 50 palavras essenciais | 40–50 XP | 10 |
| **Bloco 4 — Frases do NT** | L17–L20 | 4 frases reais do NT | 60 XP | 4 |
| **TOTAL** | | | **~840 XP** | **20 lições** |

### Progressão Pedagógica entre Blocos

```
Bloco 1 (L01-L02)          Bloco 2 (L03-L06)
Forma das letras      →     Todas as letras
Vogais                →     Consoantes + grupos
Motor (traçado)       →     Motor (traçado completo)
       ↓
Bloco 3 (L07-L16)          Bloco 4 (L17-L20)
Palavras reais do NT  →     Frases reais do NT
Escrita de palavras   →     Escrita de sentenças
Ditado por significado →    Ditado e leitura em voz alta
```

---

## 2. TEMPLATES DE STEPS (REFERÊNCIA)

Cada lição é composta de steps do tipo `ApostilaStep`. Abaixo estão os templates canônicos para cada tipo. O LLM deve usar estes templates para cada step gerado.

### TEMPLATE A — `intro` (1 step por lição)

```typescript
{
  id: '{lessonId}-S01',
  type: 'intro',
  narration: '{frase de abertura contextualizando o tema da lição, ~2-3 frases}. Abra sua apostila na página {N} e acompanhe comigo.',
  displayText: 'Abra sua apostila na Página {N}',
  showGreekLarge: false,
}
```

**Regras:**
- Sempre é o step S01 de toda lição
- Narração em português, tom de professor
- `displayText` sempre indica a página da apostila
- Sem conteúdo grego

---

### TEMPLATE B — `word_intro` (1 step por letra ou palavra)

**Para letras do alfabeto (Blocos 1 e 2):**
```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'word_intro',
  narration: 'A {ordinal} letra é o {nome}. Maiúsculo: {Maiúsculo}. Minúsculo: {minúsculo}. O som é "{som}", como em "{exemplo em português}".',
  displayText: '{Nome da letra} — {posição ordinal} letra do alfabeto grego',
  greekForm: '{Maiúsculo} {minúsculo}',
  transliteration: '{nome em latim}',
  pronunciation: '{som} (como em "{exemplo}")',
  translation: 'Letra {Nome}',
  etymology: '{origem histórica curta, 1 frase}',
  contextVerse: '{Livro Cap:Versículo}',
  contextVerseText: '"{trecho relevante que usa esta letra ou seu nome}"',
  showGreekLarge: true,
}
```

**Para palavras do vocabulário (Bloco 3):**
```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'word_intro',
  narration: 'A {ordinal} palavra é {greekForm} — {transliteration}. Pronuncie: {pronunciation}. Significa {translation}. {1 frase sobre o significado teológico ou uso no NT}.',
  greekForm: '{palavra grega}',
  transliteration: '{transliteração}',
  pronunciation: '{sílabas acentuadas, ex: "a-GÁ-pe"}',
  translation: '{tradução}',
  etymology: 'Do {verbo/substantivo} {forma-raiz} ({transliteração}), {significado da raiz}',
  contextVerse: '{Livro Cap:Versículo — versículo mais icônico da palavra}',
  contextVerseText: '"{trecho em português com a palavra-chave destacada}"',
  showGreekLarge: true,
  showVoiceBadge: true,
}
```

**Para palavras de frases (Bloco 4):**
```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'word_intro',
  narration: 'A palavra {greekForm} significa {translation}. É a {função gramatical} da frase.',
  greekForm: '{palavra}',
  transliteration: '{transliteração}',
  pronunciation: '{pronúncia}',
  translation: '{tradução}',
  showGreekLarge: true,
}
```

---

### TEMPLATE C — `alphabet_trace` (1 step por letra)

```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'alphabet_trace',
  narration: 'Observe a ordem dos traços do {nome}. {instrução específica dos traços, 1-2 frases descrevendo a ordem}.',
  greekForm: '{minúsculo}',
  showStrokeOrder: true,
  showPaperBadge: false,
}
```

**Regras:**
- Sempre usa a forma **minúscula** em `greekForm` (a mais usada no NT)
- Descreve a ordem dos traços em linguagem simples
- `showPaperBadge: false` — neste step o aluno apenas observa

---

### TEMPLATE D — `write_practice` (1 step por letra/palavra)

**Para letras (minúscula, 8 repetições):**
```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'write_practice',
  narration: 'Agora escreva o {nome} minúsculo oito vezes na linha {N} da sua apostila. Mantenha o ritmo: uma letra por clique.',
  greekForm: '{minúsculo}',
  transliteration: '{nome}',
  writeRepetitions: 8,
  writeInstruction: 'Linha {N} da apostila — {Nome} minúsculo ({minúsculo})',
  showPaperBadge: true,
  showGreekLarge: true,
}
```

**Para palavras (5 repetições, com instrução de voz):**
```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'write_practice',
  narration: 'Agora escreva {greekForm} cinco vezes na linha {N} da sua apostila. Pronuncie em voz alta cada vez que escrever: {pronunciation}.',
  greekForm: '{palavra grega}',
  transliteration: '{transliteração}',
  pronunciation: '{pronúncia}',
  translation: '{tradução}',
  writeRepetitions: 5,
  writeInstruction: 'Linha {N} da apostila — {greekForm}',
  showPaperBadge: true,
  showVoiceBadge: true,
  showGreekLarge: true,
}
```

**Para frases (3 repetições):**
```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'write_practice',
  narration: 'Copie a frase completa três vezes no espaço da apostila. Escreva devagar, prestando atenção em cada letra.',
  greekForm: '{frase completa}',
  writeRepetitions: 3,
  writeInstruction: 'Espaço de cópia da apostila — frase completa',
  showPaperBadge: true,
  showGreekLarge: false,
}
```

---

### TEMPLATE E — `pause` (1-2 steps por lição)

```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'pause',
  narration: '{frase de transição motivacional, 1-2 frases}. Antes de continuar, olhe para o que escreveu e compare com o modelo na apostila.',
  displayText: 'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
  showGreekLarge: false,
}
```

**Usos típicos:**
- Após completar o bloco de `write_practice` de todas as letras/palavras da lição
- Antes do bloco de `dictation`

---

### TEMPLATE F — `dictation` (1 step por letra/palavra/frase)

**Para letras:**
```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'dictation',
  narration: 'Escreva no papel: {nome da letra}.',
  displayText: '"{nome da letra}"',
  greekForm: '{maiúsculo} {minúsculo}',
  revealAfterConfirm: true,
  showPaperBadge: true,
  showGreekLarge: false,
}
```

**Para palavras:**
```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'dictation',
  narration: 'Escreva a palavra grega para: "{tradução em português}".',
  displayText: '"{tradução em português}"',
  greekForm: '{palavra grega}',
  transliteration: '{transliteração}',
  revealAfterConfirm: true,
  showPaperBadge: true,
  showGreekLarge: false,
}
```

---

### TEMPLATE G — `read_aloud` (Bloco 4 apenas)

```typescript
{
  id: '{lessonId}-S{NN}',
  type: 'read_aloud',
  narration: 'Ouça a frase completa: {frase em grego transliterada}. Agora repita em voz alta comigo.',
  greekForm: '{frase completa em grego}',
  transliteration: '{transliteração da frase}',
  translation: '{tradução da frase}',
  showVoiceBadge: true,
  showGreekLarge: true,
}
```

---

## 3. BLOCO 1 — VOGAIS GREGAS (L01–L02)

### Referência: As 7 Vogais Gregas

| Letra | Nome | Maiúscula | Minúscula | Som | Exemplo PT |
|-------|------|-----------|-----------|-----|-----------|
| α | alpha | Α | α | a breve | pai |
| ε | epsilon | Ε | ε | e breve | pé |
| η | eta | Η | η | e longo | ê |
| ι | iota | Ι | ι | i | fio |
| ο | omicron | Ο | ο | o breve | sol |
| υ | upsilon | Υ | υ | u/ü | tu |
| ω | omega | Ω | ω | o longo | ô |

### Lição L01 — As Primeiras Vogais (α, ε, η, ι)

```
ID:               apostila-L01
TÍTULO:           Lição 1 — As Primeiras Vogais
DESCRIÇÃO:        Alpha, Epsilon, Eta, Iota
PDF_PAGE:         1
XP:               30
TEMPO:            12 min
REQUER_ANTERIOR:  false
```

**Grade de Steps:**

| Step | ID | Tipo | Conteúdo | Template |
|------|-----|------|---------|---------|
| S01 | apostila-L01-S01 | `intro` | Abertura: vogais gregas, página 1 da apostila | A |
| S02 | apostila-L01-S02 | `word_intro` | Α α — Alpha — som "a" como em "pai" | B-letra |
| S03 | apostila-L01-S03 | `alphabet_trace` | α — traço curvo + rabo | C |
| S04 | apostila-L01-S04 | `write_practice` | α × 8 — linha 1 | D-letra |
| S05 | apostila-L01-S05 | `word_intro` | Ε ε — Epsilon — som "e" breve como em "pé" | B-letra |
| S06 | apostila-L01-S06 | `alphabet_trace` | ε — traço curvo aberto | C |
| S07 | apostila-L01-S07 | `write_practice` | ε × 8 — linha 2 | D-letra |
| S08 | apostila-L01-S08 | `word_intro` | Η η — Eta — som "ê" longo como em "mês" | B-letra |
| S09 | apostila-L01-S09 | `alphabet_trace` | η — duas hastes + ponte central | C |
| S10 | apostila-L01-S10 | `write_practice` | η × 8 — linha 3 | D-letra |
| S11 | apostila-L01-S11 | `word_intro` | Ι ι — Iota — som "i" como em "fio" | B-letra |
| S12 | apostila-L01-S12 | `alphabet_trace` | ι — traço curvo simples | C |
| S13 | apostila-L01-S13 | `write_practice` | ι × 8 — linha 4 | D-letra |
| S14 | apostila-L01-S14 | `pause` | Revisão: compare a escrita com o modelo | E |
| S15 | apostila-L01-S15 | `dictation` | Ditado: "alpha" → α / Α α | F-letra |
| S16 | apostila-L01-S16 | `dictation` | Ditado: "epsilon" → ε / Ε ε | F-letra |
| S17 | apostila-L01-S17 | `dictation` | Ditado: "eta" → η / Η η | F-letra |
| S18 | apostila-L01-S18 | `dictation` | Ditado: "iota" → ι / Ι ι | F-letra |

**Total: 18 steps**

**Dados especiais para cada letra:**

*Alpha (S02-S04):*
- `etymology`: "Originou o 'A' latino e o Alef hebraico; primeira letra de todos os alfabetos semíticos"
- `contextVerse`: "Apocalipse 1:8"
- `contextVerseText`: "\"Eu sou o Alfa e o Ômega\" — Deus usa esta letra para declarar sua eternidade"
- Ordem dos traços (S03): "Primeiro o traço diagonal da esquerda para baixo, depois o diagonal da direita, depois o traço horizontal no meio"

*Epsilon (S05-S07):*
- `etymology`: "ε + ψιλόν significa 'e simples', para distinguir do ditongo αι"
- `contextVerse`: "João 1:1"
- `contextVerseText`: "\"No princípio era (ἦν) o Verbo\" — ε aparece na terminação do imperfeito"
- Ordem dos traços (S06): "Traço vertical à esquerda de cima para baixo, depois o traço horizontal do meio, depois o arco curvo à direita"

*Eta (S08-S10):*
- `etymology`: "Derivado do Chet hebraico (ח); representa o 'e' longo do grego clássico"
- `contextVerse`: "Hebreus 11:1"
- `contextVerseText`: "\"A fé (πίστις) é...\" — o η aparece em muitas terminações de substantivos femininos"
- Ordem dos traços (S09): "Primeira haste vertical da esquerda para baixo, segunda haste vertical, depois o traço horizontal conectando as duas hastes na altura do meio"

*Iota (S11-S13):*
- `etymology`: "Origem no Yod hebraico (י); a menor letra do alfabeto, mencionada por Jesus em Mateus 5:18"
- `contextVerse`: "Mateus 5:18"
- `contextVerseText`: "\"Nem um iota (ἰῶτα) passará da lei\" — Jesus usa esta própria letra como exemplo"
- Ordem dos traços (S12): "Um único traço curvo de cima para baixo, levemente inclinado, com uma serifa no topo"

---

### Lição L02 — As Vogais Longas e o Upsilon (ο, υ, ω)

```
ID:               apostila-L02
TÍTULO:           Lição 2 — Vogais Longas e o Upsilon
DESCRIÇÃO:        Omicron, Upsilon, Omega
PDF_PAGE:         3
XP:               30
TEMPO:            10 min
REQUER_ANTERIOR:  true
```

**Grade de Steps:**

| Step | ID | Tipo | Conteúdo | Template |
|------|-----|------|---------|---------|
| S01 | apostila-L02-S01 | `intro` | Abertura: completando as vogais, pares longo/breve | A |
| S02 | apostila-L02-S02 | `word_intro` | Ο ο — Omicron — som "o" breve como em "sol" | B-letra |
| S03 | apostila-L02-S03 | `alphabet_trace` | ο — círculo fechado | C |
| S04 | apostila-L02-S04 | `write_practice` | ο × 8 — linha 1 | D-letra |
| S05 | apostila-L02-S05 | `word_intro` | Υ υ — Upsilon — som "u" ou "ü" alemão | B-letra |
| S06 | apostila-L02-S06 | `alphabet_trace` | υ — haste + bifurcação | C |
| S07 | apostila-L02-S07 | `write_practice` | υ × 8 — linha 2 | D-letra |
| S08 | apostila-L02-S08 | `word_intro` | Ω ω — Omega — som "ô" longo como em "avô" | B-letra |
| S09 | apostila-L02-S09 | `alphabet_trace` | ω — dois arcos unidos | C |
| S10 | apostila-L02-S10 | `write_practice` | ω × 8 — linha 3 | D-letra |
| S11 | apostila-L02-S11 | `pause` | Revisão e par ο/ω (breve vs longo) | E |
| S12 | apostila-L02-S12 | `dictation` | Ditado: "omicron" → ο | F-letra |
| S13 | apostila-L02-S13 | `dictation` | Ditado: "upsilon" → υ | F-letra |
| S14 | apostila-L02-S14 | `dictation` | Ditado: "omega" → ω | F-letra |

**Total: 14 steps**

**Dados especiais:**

*Omicron (S02-S04):*
- `etymology`: "ο + μικρόν significa 'o pequeno', para distinguir do ômega (o grande)"
- `contextVerse`: "João 3:16"
- `contextVerseText`: "\"...o mundo (κόσμον)\" — ο aparece como terminação de substantivos masculinos no acusativo"

*Upsilon (S05-S07):*
- `etymology`: "ύ + ψιλόν, 'u simples'; absorvido no latim como Y (chamado 'i grego')"
- `contextVerse`: "João 1:4"
- `contextVerseText`: "\"...a vida (ζωή)\" — o υ aparece em combinações como αυ e ευ formando ditongos"

*Omega (S08-S10):*
- `etymology`: "ω + μέγα significa 'o grande', contraparte longa do omicron"
- `contextVerse`: "Apocalipse 22:13"
- `contextVerseText`: "\"Eu sou o Alfa e o Ômega (Ω), o primeiro e o último\" — última letra do alfabeto"

---

## 4. BLOCO 2 — CONSOANTES (L03–L06)

### Referência: As 17 Consoantes Gregas em Grupos Pedagógicos

| Grupo | Letras | Critério de Agrupamento |
|-------|--------|------------------------|
| **Labiais** | β, π, φ | Sons produzidos com os lábios |
| **Dentais** | δ, τ, θ | Sons com a língua nos dentes |
| **Velares** | γ, κ, χ | Sons produzidos no palato |
| **Líquidas e nasais** | λ, μ, ν, ρ | Sons fluidos e nasais |
| **Sibilantes e especiais** | σ/ς, ζ, ξ, ψ | Sibilante e duplas |

---

### Lição L03 — Consoantes Labiais (β, π, φ)

```
ID:               apostila-L03
TÍTULO:           Lição 3 — Consoantes com os Lábios
DESCRIÇÃO:        Beta, Pi, Fi
PDF_PAGE:         5
XP:               35
TEMPO:            10 min
REQUER_ANTERIOR:  true
```

**Grade de Steps:**

| Step | ID | Tipo | Conteúdo | Template |
|------|-----|------|---------|---------|
| S01 | apostila-L03-S01 | `intro` | Labiais: sons β, π, φ produzidos com lábios | A |
| S02 | apostila-L03-S02 | `word_intro` | Β β — Beta — som "b" como em "bola" | B-letra |
| S03 | apostila-L03-S03 | `alphabet_trace` | β — haste + dois arcos à direita | C |
| S04 | apostila-L03-S04 | `write_practice` | β × 8 — linha 1 | D-letra |
| S05 | apostila-L03-S05 | `word_intro` | Π π — Pi — som "p" como em "pão" | B-letra |
| S06 | apostila-L03-S06 | `alphabet_trace` | π — barra horizontal + duas hastes verticais | C |
| S07 | apostila-L03-S07 | `write_practice` | π × 8 — linha 2 | D-letra |
| S08 | apostila-L03-S08 | `word_intro` | Φ φ — Fi — som "f" como em "fé" | B-letra |
| S09 | apostila-L03-S09 | `alphabet_trace` | φ — haste vertical + círculo ao centro | C |
| S10 | apostila-L03-S10 | `write_practice` | φ × 8 — linha 3 | D-letra |
| S11 | apostila-L03-S11 | `pause` | Revisão: sons labiais | E |
| S12 | apostila-L03-S12 | `dictation` | Ditado: "beta" → β | F-letra |
| S13 | apostila-L03-S13 | `dictation` | Ditado: "pi" → π | F-letra |
| S14 | apostila-L03-S14 | `dictation` | Ditado: "fi" → φ | F-letra |

**Total: 14 steps**

**Dados especiais:**

*Beta (S02-S04):*
- `etymology`: "Do Bet hebraico (ב); segunda letra do alfabeto — daí a palavra 'alfabeto' (alpha + beta)"
- `contextVerse`: "Marcos 1:17"
- `contextVerseText`: "\"Segui-me (ἀκολουθεῖτε)\" — β aparece em verbos como βαπτίζω (batizar)"

*Pi (S05-S07):*
- `etymology`: "Do Pe hebraico (פ); famoso na matemática como π ≈ 3,14, mas no NT é apenas uma consoante"
- `contextVerse`: "Filipenses 4:7"
- `contextVerseText`: "\"...a paz (εἰρήνη)\" — π inicia palavras como πίστις (fé) e πνεῦμα (espírito)"

*Fi (S08-S10):*
- `etymology`: "Aspirada bilabial; emprestada ao latim como 'ph' para representar o som f"
- `contextVerse`: "João 1:1"
- `contextVerseText`: "\"...a palavra (λόγος)\" — φ aparece em φῶς (luz) e φιλέω (amar como amigo)"

---

### Lição L04 — Consoantes Dentais (δ, τ, θ)

```
ID:               apostila-L04
TÍTULO:           Lição 4 — Consoantes com a Língua
DESCRIÇÃO:        Delta, Tau, Teta
PDF_PAGE:         7
XP:               35
TEMPO:            10 min
REQUER_ANTERIOR:  true
```

**Grade de Steps:** (mesmo padrão de L03, 14 steps total)

| Step | Conteúdo |
|------|---------|
| S01 | Intro: dentais, sons com língua nos dentes |
| S02–S04 | Δ δ — Delta — "d" — triângulo equilátero / δ — triângulo com base curva |
| S05–S07 | Τ τ — Tau — "t" — barra horizontal + haste vertical |
| S08–S10 | Θ θ — Teta — "th" aspirado (como "think" em inglês) — círculo + traço horizontal |
| S11 | Pause: revisão dentais |
| S12–S14 | Ditados: delta, tau, teta |

**Dados especiais:**

*Delta:*
- `etymology`: "Do Dalet hebraico (ד); forma triangular foi usada para representar o rio Nilo — daí 'delta'"
- `contextVerse`: "João 1:14"
- `contextVerseText`: "\"O Verbo se fez carne (σάρξ)\" — δ aparece em δόξα (glória) e δύναμις (poder)"

*Tau:*
- `etymology`: "Do Taw hebraico (ת); forma em cruz (+) foi associada pelos primeiros cristãos à cruz de Cristo"
- `contextVerse`: "Ezequiel 9:4 (citado em Apocalipse)"
- `contextVerseText`: "\"...marca o τ (tau) na testa\" — sinal de proteção na tradição judaica"

*Teta:*
- `etymology`: "Aspirada dental; não tem equivalente em português — soa como 'th' do inglês 'think'"
- `contextVerse`: "João 1:1"
- `contextVerseText`: "\"...e Deus (θεός) era o Verbo\" — θ inicia θεός, θέλω, θάνατος (morte)"

---

### Lição L05 — Consoantes Velares e Líquidas (γ, κ, χ, λ, ρ)

```
ID:               apostila-L05
TÍTULO:           Lição 5 — Velares e Líquidas
DESCRIÇÃO:        Gama, Capa, Chi, Lambda, Rô
PDF_PAGE:         9
XP:               35
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

**Grade de Steps:** (18 steps total — 5 letras com ciclo completo)

| Step | Tipo | Conteúdo |
|------|------|---------|
| S01 | `intro` | Velares (fundo da garganta) e líquidas (fluidas) |
| S02 | `word_intro` | Γ γ — Gama — "g" como em "gato" |
| S03 | `alphabet_trace` | γ — forma de gancho |
| S04 | `write_practice` | γ × 8 — linha 1 |
| S05 | `word_intro` | Κ κ — Capa — "k" como em "casa" |
| S06 | `alphabet_trace` | κ — haste + dois ramos diagonais |
| S07 | `write_practice` | κ × 8 — linha 2 |
| S08 | `word_intro` | Χ χ — Chi — "ch" aspirado (como "Bach" em alemão) |
| S09 | `alphabet_trace` | χ — duas diagonais cruzadas |
| S10 | `write_practice` | χ × 8 — linha 3 |
| S11 | `word_intro` | Λ λ — Lambda — "l" como em "lua" |
| S12 | `alphabet_trace` | λ — forma de "v" invertido assimétrico |
| S13 | `write_practice` | λ × 8 — linha 4 |
| S14 | `word_intro` | Ρ ρ — Rô — "r" vibrante como em "rato" |
| S15 | `alphabet_trace` | ρ — círculo + haste descendente |
| S16 | `write_practice` | ρ × 8 — linha 5 |
| S17 | `pause` | Revisão das 5 letras |
| S18–S22 | `dictation` | Ditados: gama, capa, chi, lambda, rô |

**Total: 22 steps**

**Dados especiais:**

*Gama:* `etymology`: "Do Gimel hebraico (ג); antes do κ em grego (γγ) faz som nasal: 'ng'"
`contextVerse`: "Mateus 28:18" / "\"...todo o poder (πᾶσα ἐξουσία) me foi dado\" — γ inicia γῆ (terra) e γράφω (escrever)"

*Capa:* `etymology`: "Do Qoph hebraico (ק); deu origem ao 'Q' latino; em grego substituiu o qoppa arcaico"
`contextVerse`: "João 1:3" / "\"...por ele tudo foi feito (ἐγένετο)\" — κ inicia κόσμος (mundo) e καρδία (coração)"

*Chi:* `etymology`: "Aspirada velar; deu origem ao 'X' latino quando usado na grafia de palavras gregas (ex: Χριστός = Christus)"
`contextVerse`: "Filipenses 1:21" / "\"Para mim o viver é Cristo (Χριστός)\" — χ é a inicial de Χριστός"

*Lambda:* `etymology`: "Do Lamed hebraico (ל); forma triangular representava balança ou estaca; deu origem ao 'L' latino"
`contextVerse`: "Lucas 1:1" / "\"...visto que muitos (πολλοί)\" — λ aparece em λόγος, λαός (povo)"

*Rô:* `etymology`: "Do Resh hebraico (ר); corresponde ao 'R' latino; no início de palavra pode ser aspirado (ῥ)"
`contextVerse`: "Romanos 1:16" / "\"...para todo aquele que crê (πιστεύοντι)\" — ρ aparece em ῥῆμα (palavra falada)"

---

### Lição L06 — Nasais, Sigma e Letras Duplas (μ, ν, σ/ς, ζ, ξ, ψ)

```
ID:               apostila-L06
TÍTULO:           Lição 6 — Nasais, Sigma e Letras Duplas
DESCRIÇÃO:        Mu, Nu, Sigma, Zeta, Xi, Psi
PDF_PAGE:         12
XP:               35
TEMPO:            14 min
REQUER_ANTERIOR:  true
```

**Grade de Steps:** (22 steps total — 6 letras, Sigma com variante final)

| Step | Tipo | Conteúdo |
|------|------|---------|
| S01 | `intro` | Completando o alfabeto: nasais + sibilante + duplas |
| S02 | `word_intro` | Μ μ — Mu — "m" como em "mar" |
| S03 | `alphabet_trace` | μ — duas hastes com arco |
| S04 | `write_practice` | μ × 8 — linha 1 |
| S05 | `word_intro` | Ν ν — Nu — "n" como em "nós" |
| S06 | `alphabet_trace` | ν — forma de "v" com haste à direita |
| S07 | `write_practice` | ν × 8 — linha 2 |
| S08 | `word_intro` | Σ σ/ς — Sigma — "s" como em "sol" + forma final ς |
| S09 | `alphabet_trace` | σ — semicírculo / ς — forma de gancho (final de palavra) |
| S10 | `write_practice` | σ × 8 — linha 3 (com nota sobre ς) |
| S11 | `word_intro` | Ζ ζ — Zeta — "dz" ou "z" como em "zebra" |
| S12 | `alphabet_trace` | ζ — barra superior + diagonal + barra inferior |
| S13 | `write_practice` | ζ × 8 — linha 4 |
| S14 | `word_intro` | Ξ ξ — Xi — "ks" como em "táxi" |
| S15 | `alphabet_trace` | ξ — três traços horizontais + arco inferior |
| S16 | `write_practice` | ξ × 8 — linha 5 |
| S17 | `word_intro` | Ψ ψ — Psi — "ps" como em "psicologia" |
| S18 | `alphabet_trace` | ψ — haste central + dois ramos curvos + cauda |
| S19 | `write_practice` | ψ × 8 — linha 6 |
| S20 | `pause` | Parabéns! Você completou o alfabeto grego inteiro. |
| S21–S26 | `dictation` | Ditados: mu, nu, sigma, zeta, xi, psi |

**Total: 26 steps**

**Dados especiais — narração S20 (pause especial):**
> "Parabéns! Você acaba de aprender todas as 24 letras do alfabeto grego. O mesmo alfabeto que os discípulos de Jesus usavam. O mesmo alfabeto do apóstolo Paulo. Agora você pode começar a ler as primeiras palavras do Novo Testamento. Antes de continuar, olhe para tudo que escreveu nas seis linhas da apostila — é o alfabeto completo, na sua própria letra."

*Sigma — nota pedagógica especial:*
A narração do S08 deve explicar a variante: "O sigma tem duas formas: σ (sigma normal) quando aparece no início ou meio da palavra, e ς (sigma final) quando aparece no final. Veja a diferença: σωτηρία (salvação) — o sigma inicial é σ. Χριστός (Cristo) — o sigma final é ς."

*Mu:* `contextVerse`: "Romanos 8:1" / "\"Portanto, nenhuma condenação (κατάκριμα)\" — μ inicia μέγας (grande) e μαθητής (discípulo)"

*Nu:* `contextVerse`: "João 3:16" / "\"Para que todo aquele (νος)\" — ν inicia νόμος (lei) e νύξ (noite)"

*Sigma:* `contextVerse`: "João 3:16" / "\"...o mundo (κόσμον)\" — σ/ς é a letra mais frequente em terminações gregas"

*Zeta:* `contextVerse`: "Mateus 5:18" / "\"Nem um iota ou um til (κεραία)\" — ζ aparece em ζωή (vida) e ζητέω (buscar)"

*Xi:* `contextVerse`: "João 1:14" / "\"...cheio de graça (χάριτος)\" — ξ aparece em ξένος (estrangeiro)"

*Psi:* `contextVerse`: "Filipenses 4:7" / "\"...guardará os vossos corações (καρδίας)\" — ψ aparece em ψυχή (alma/vida)"

---

## 5. BLOCO 3 — VOCABULÁRIO DO NT (L07–L16)

### Referência: 50 Palavras Essenciais em 10 Grupos Temáticos

Cada lição cobre 5 palavras de um mesmo campo semântico.

| Lição | Tema | Palavras |
|-------|------|---------|
| L07 | Fé e Graça | ἀγάπη, πίστις, χάρις, εἰρήνη, ζωή |
| L08 | Deus e Cristo | θεός, κύριος, Χριστός, υἱός, πνεῦμα |
| L09 | Ser Humano | ἄνθρωπος, καρδία, ψυχή, σάρξ, ἁμαρτία |
| L10 | Ação e Palavra | λόγος, ῥῆμα, γράφω, λέγω, ποιέω |
| L11 | Tempo e Reino | βασιλεία, αἰών, ἡμέρα, νύξ, ὥρα |
| L12 | Conhecimento | γινώσκω, οἶδα, σοφία, ἀλήθεια, φῶς |
| L13 | Salvação | σωτηρία, νόμος, δικαιοσύνη, κρίσις, θάνατος |
| L14 | Comunidade | ἐκκλησία, ἀδελφός, ἀπόστολος, προφήτης, δοῦλος |
| L15 | Lugares e Coisas | κόσμος, οὐρανός, γῆ, ὕδωρ, ἄρτος |
| L16 | Verbos Fundamentais | εἰμί, ἔρχομαι, ἀκούω, βλέπω, πιστεύω |

---

### Padrão de Steps para Lições de Vocabulário (L07–L16)

Todas as 10 lições seguem o **mesmo padrão de 17 steps**:

```
S01  → intro
S02  → word_intro (palavra 1)
S03  → write_practice (palavra 1, 5×)
S04  → word_intro (palavra 2)
S05  → write_practice (palavra 2, 5×)
S06  → word_intro (palavra 3)
S07  → write_practice (palavra 3, 5×)
S08  → word_intro (palavra 4)
S09  → write_practice (palavra 4, 5×)
S10  → word_intro (palavra 5)
S11  → write_practice (palavra 5, 5×)
S12  → pause
S13  → dictation (palavra 1 — professor fala PT, aluno escreve GR)
S14  → dictation (palavra 2)
S15  → dictation (palavra 3)
S16  → dictation (palavra 4)
S17  → dictation (palavra 5)
```

**Total por lição: 17 steps**

---

### Lição L07 — Fé e Graça

```
ID:               apostila-L07
TÍTULO:           Lição 7 — Palavras de Fé e Graça
DESCRIÇÃO:        ἀγάπη, πίστις, χάρις, εἰρήνη, ζωή
PDF_PAGE:         15
XP:               40
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | ἀγάπη | agápē | a-GÁ-pe | amor incondicional | João 3:16 |
| 2 | πίστις | pístis | PÍS-tis | fé / confiança | Hebreus 11:1 |
| 3 | χάρις | cháris | CÁ-ris | graça / favor imerecido | Efésios 2:8 |
| 4 | εἰρήνη | eirḗnē | ei-RÊ-ne | paz / inteireza | João 14:27 |
| 5 | ζωή | zōḗ | zo-Ê | vida (eterna e abundante) | João 10:10 |

**Etymologias:**
- ἀγάπη → "Do verbo ἀγαπάω, amar com escolha deliberada; distinto de ἔρως (desejo) e φιλία (amizade)"
- πίστις → "De πείθω, persuadir; implica confiança ativa, não mera crença intelectual"
- χάρις → "Relacionado a χαρά (alegria) e χαίρω (regozijar); favor dado gratuitamente"
- εἰρήνη → "Equivalente ao hebraico שָׁלוֹם (shalom): não ausência de conflito, mas completude total"
- ζωή → "Distinto de βίος (vida biológica); ζωή é vida em sua plenitude qualitativa"

---

### Lição L08 — Deus e Cristo

```
ID:               apostila-L08
TÍTULO:           Lição 8 — Nomes Divinos
DESCRIÇÃO:        θεός, κύριος, Χριστός, υἱός, πνεῦμα
PDF_PAGE:         17
XP:               40
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | θεός | theós | te-ÓS | Deus | João 1:1 |
| 2 | κύριος | kýrios | KÍ-ri-os | Senhor / Mestre | Filipenses 2:11 |
| 3 | Χριστός | Christós | cris-TÓS | Cristo / Ungido | Mateus 16:16 |
| 4 | υἱός | huiós | ui-ÓS | filho | Mateus 3:17 |
| 5 | πνεῦμα | pneûma | PNÊU-ma | espírito / vento / sopro | João 3:8 |

**Etymologias:**
- θεός → "Raiz indo-europeia *dhes-, sagrado; base da teologia (θεο+λόγος)"
- κύριος → "De κῦρος, autoridade; a Septuaginta usa κύριος para traduzir יהוה (YHWH)"
- Χριστός → "Tradução do hebraico מָשִׁיחַ (Messias), ungido com óleo para função sagrada"
- υἱός → "Denota não apenas filho biológico mas herdeiro legal e representante do pai"
- πνεῦμα → "De πνέω, soprar; mesmo campo semântico do hebraico רוּחַ (ruach)"

---

### Lição L09 — Ser Humano

```
ID:               apostila-L09
TÍTULO:           Lição 9 — O Ser Humano
DESCRIÇÃO:        ἄνθρωπος, καρδία, ψυχή, σάρξ, ἁμαρτία
PDF_PAGE:         19
XP:               40
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | ἄνθρωπος | ánthrōpos | ÂN-trô-pos | ser humano / homem | João 1:4 |
| 2 | καρδία | kardía | kar-DÍ-a | coração (sede da vontade) | Mateus 5:8 |
| 3 | ψυχή | psychḗ | psi-KÊ | alma / ser interior / vida | Mateus 16:26 |
| 4 | σάρξ | sárx | SÁRKS | carne / natureza humana | João 1:14 |
| 5 | ἁμαρτία | hamartía | a-mar-TÍ-a | pecado / desvio do alvo | Romanos 3:23 |

**Etymologias:**
- ἄνθρωπος → "Possível origem em ἀνήρ (homem) + ὤψ (rosto); o ser que olha para cima"
- καρδία → "No pensamento hebraico-grego, o coração é o centro das decisões, não das emoções apenas"
- ψυχή → "Deu origem a 'psicologia' e 'psiquiatria'; distinto de πνεῦμα (espírito) e σῶμα (corpo)"
- σάρξ → "Frequentemente usado por Paulo para indicar a natureza humana sem Deus, não apenas o corpo físico"
- ἁμαρτία → "Do verbo ἁμαρτάνω, errar o alvo; imagine uma flecha que não acerta o centro"

---

### Lição L10 — Ação e Palavra

```
ID:               apostila-L10
TÍTULO:           Lição 10 — Palavra e Ação
DESCRIÇÃO:        λόγος, ῥῆμα, γράφω, λέγω, ποιέω
PDF_PAGE:         21
XP:               40
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | λόγος | lógos | LÓ-gos | palavra / razão / discurso | João 1:1 |
| 2 | ῥῆμα | rhēma | RÊ-ma | palavra falada / declaração | Romanos 10:17 |
| 3 | γράφω | gráphō | GRÁ-fo | escrever | João 20:30 |
| 4 | λέγω | légō | LÉ-go | dizer / falar | João 1:29 |
| 5 | ποιέω | poiéō | poi-É-o | fazer / criar / agir | João 2:11 |

**Etymologias:**
- λόγος → "Raiz *leg-, colher/ordenar; na filosofia grega, a razão que ordena o cosmos"
- ῥῆμα → "De ῥέω, fluir; é a palavra como evento sonoro, o que foi dito em um momento específico"
- γράφω → "Deu origem a 'grafia', 'gráfico', 'gravura'; inicialmente significava riscar, desenhar"
- λέγω → "Um dos verbos mais frequentes do NT (~2.350 ocorrências); base de λόγος"
- ποιέω → "Deu origem ao inglês 'poem' (ποίημα); o que é criado/feito. Efésios 2:10: ποίημα (obra-prima)"

---

### Lição L11 — Tempo e Reino

```
ID:               apostila-L11
TÍTULO:           Lição 11 — Tempo e Reino
DESCRIÇÃO:        βασιλεία, αἰών, ἡμέρα, νύξ, ὥρα
PDF_PAGE:         23
XP:               45
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | βασιλεία | basileía | ba-si-LEI-a | reino / reinado / soberania | Mateus 6:10 |
| 2 | αἰών | aiṓn | a-IÔN | era / eternidade / século | Efésios 1:21 |
| 3 | ἡμέρα | hēméra | e-MÉ-ra | dia | João 11:9 |
| 4 | νύξ | nýx | NÍKS | noite | João 3:2 |
| 5 | ὥρα | hṓra | Ô-ra | hora / momento oportuno | João 2:4 |

**Etymologias:**
- βασιλεία → "De βασιλεύς (rei); implica tanto o ato de reinar quanto o território reinado"
- αἰών → "Deu origem a 'eon'; no NT pode significar 'esta era' vs 'a era vindoura'"
- ἡμέρα → "Raiz indo-europeia de calor/dia; a Septuaginta usa para o 'Dia do Senhor' (יוֹם יְהוָה)"
- νύξ → "Deu origem a 'noturno'; em João 3:2, Nicodemos vem à noite — simbolismo intencional"
- ὥρα → "Não apenas marcação de tempo, mas 'o momento certo'; João 2:4 usa este sentido"

---

### Lição L12 — Conhecimento e Luz

```
ID:               apostila-L12
TÍTULO:           Lição 12 — Conhecer e Ver
DESCRIÇÃO:        γινώσκω, οἶδα, σοφία, ἀλήθεια, φῶς
PDF_PAGE:         25
XP:               45
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | γινώσκω | ginṓskō | gi-NÔS-ko | conhecer (por experiência) | João 10:14 |
| 2 | οἶδα | oîda | Ôi-da | saber (por percepção/revelação) | João 3:2 |
| 3 | σοφία | sophía | so-FÍ-a | sabedoria | 1 Coríntios 1:24 |
| 4 | ἀλήθεια | alḗtheia | a-LÊ-tei-a | verdade / realidade não ocultada | João 8:32 |
| 5 | φῶς | phōs | FÔS | luz | João 1:5 |

**Etymologias:**
- γινώσκω → "Conhecimento adquirido por experiência pessoal; em João 10:14 é o conhecimento mútuo do pastor e ovelhas"
- οἶδα → "Perfeito com sentido presente; literalmente 'tenho visto e portanto sei'"
- σοφία → "Distinção do NT: a sabedoria de Deus vs a sabedoria do mundo (1 Cor 1:18-25)"
- ἀλήθεια → "α (negação) + λήθη (esquecimento, ocultamento); o que não está oculto, a realidade revelada"
- φῶς → "Em João 1:5, φῶς é usado para o próprio Cristo; raiz de 'fotossíntese' e 'fotografia'"

---

### Lição L13 — Salvação e Julgamento

```
ID:               apostila-L13
TÍTULO:           Lição 13 — Salvação e Julgamento
DESCRIÇÃO:        σωτηρία, νόμος, δικαιοσύνη, κρίσις, θάνατος
PDF_PAGE:         27
XP:               45
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | σωτηρία | sōtēría | so-te-RÍ-a | salvação / libertação | Romanos 1:16 |
| 2 | νόμος | nómos | NÓ-mos | lei / Torá / princípio | Romanos 3:31 |
| 3 | δικαιοσύνη | dikaiosýnē | di-kai-o-SÍ-ne | justiça / retidão | Romanos 3:22 |
| 4 | κρίσις | krísis | KRÍ-sis | julgamento / decisão | João 3:19 |
| 5 | θάνατος | thánatos | TÂ-na-tos | morte | Romanos 6:23 |

**Etymologias:**
- σωτηρία → "De σῴζω (salvar); σωτήρ (Salvador) é título de imperadores romanos — Paulo o reivindica para Cristo"
- νόμος → "De νέμω, distribuir; a lei como ordem distribuída e atribuída"
- δικαιοσύνη → "De δίκαιος (justo); conceito central em Paulo: ser declarado justo por Deus"
- κρίσις → "Deu origem a 'crise' e 'crítica'; o ponto de decisão onde o destino é determinado"
- θάνατος → "Deu origem a 'eutanásia' (boa morte); Paulo o personifica como inimigo em 1 Cor 15"

---

### Lição L14 — A Comunidade

```
ID:               apostila-L14
TÍTULO:           Lição 14 — Comunidade e Ministério
DESCRIÇÃO:        ἐκκλησία, ἀδελφός, ἀπόστολος, προφήτης, δοῦλος
PDF_PAGE:         29
XP:               45
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | ἐκκλησία | ekklēsía | e-kle-SÍ-a | igreja / assembleia convocada | Mateus 16:18 |
| 2 | ἀδελφός | adelphós | a-del-FÓS | irmão / membro da família de fé | Romanos 8:29 |
| 3 | ἀπόστολος | apóstolos | a-PÓS-to-los | apóstolo / enviado | Efésios 2:20 |
| 4 | προφήτης | prophḗtēs | pro-FÊ-tes | profeta / porta-voz | Atos 2:17 |
| 5 | δοῦλος | doûlos | DÛ-los | servo / escravo | Romanos 1:1 |

**Etymologias:**
- ἐκκλησία → "ἐκ (de fora) + καλέω (chamar); assembleia dos cidadãos convocados da cidade para deliberar"
- ἀδελφός → "ἀ (mesmo) + δελφύς (útero); literalmente 'do mesmo útero'; Paulo expande para irmãos em Cristo"
- ἀπόστολος → "De ἀποστέλλω, enviar com autoridade e representando quem envia"
- προφήτης → "πρό (antes/em favor de) + φημί (falar); não apenas prevê o futuro, mas fala em nome de Deus"
- δοῦλος → "Paulo se identifica como δοῦλος em Rm 1:1 — paradoxo: o maior título vem da maior humildade"

---

### Lição L15 — O Mundo ao Redor

```
ID:               apostila-L15
TÍTULO:           Lição 15 — O Mundo Criado
DESCRIÇÃO:        κόσμος, οὐρανός, γῆ, ὕδωρ, ἄρτος
PDF_PAGE:         31
XP:               45
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | κόσμος | kósmos | KÓS-mos | mundo / ordem / universo | João 3:16 |
| 2 | οὐρανός | ouranós | ou-ra-NÓS | céu / morada divina | Mateus 6:9 |
| 3 | γῆ | gē | GÊ | terra / solo / país | Mateus 5:5 |
| 4 | ὕδωρ | hýdōr | HÍ-dor | água | João 4:14 |
| 5 | ἄρτος | ártos | ÁR-tos | pão / alimento | João 6:35 |

**Etymologias:**
- κόσμος → "Originalmente 'ordem' ou 'adorno'; deu origem a 'cosmético' e 'cosmos'"
- οὐρανός → "Deu nome ao planeta Urano; em hebraico שָׁמַיִם (shamayim) tem raiz de 'lá em cima'"
- γῆ → "Deu origem a 'geografia' e 'geologia'; a Gaia da mitologia grega"
- ὕδωρ → "Deu origem a 'hidráulica' e 'hidrogênio'; em João 4:14, Jesus promete água viva (ζῶν)"
- ἄρτος → "Em João 6:35, Jesus se declara ὁ ἄρτος τῆς ζωῆς — o pão da vida; referência ao maná"

---

### Lição L16 — Verbos Fundamentais

```
ID:               apostila-L16
TÍTULO:           Lição 16 — Verbos do NT
DESCRIÇÃO:        εἰμί, ἔρχομαι, ἀκούω, βλέπω, πιστεύω
PDF_PAGE:         33
XP:               50
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

| # | Palavra | Translit | Pronúncia | Tradução | Versículo-âncora |
|---|---------|----------|-----------|----------|-----------------|
| 1 | εἰμί | eimí | ei-MÍ | ser / existir | João 8:58 |
| 2 | ἔρχομαι | érchomai | ÉR-cho-mai | vir / chegar / ir | João 1:9 |
| 3 | ἀκούω | akoúō | a-KÚ-o | ouvir / escutar (com atenção) | João 10:27 |
| 4 | βλέπω | blépō | BLÉP-o | ver / perceber / enxergar | João 9:25 |
| 5 | πιστεύω | pisteúō | pis-TEÚ-o | crer / confiar / comprometer-se | João 3:16 |

**Etymologias:**
- εἰμί → "Verbo 'ser' mais irregular do grego; 'ΕΓΩ ΕΙΜΙ' (Ego eimi, Eu sou) é o título divino de João"
- ἔρχομαι → "Verbo de movimento mais frequente; no Apocalipse: 'Vem, Senhor Jesus' (ἔρχου Κύριε Ἰησοῦ)"
- ἀκούω → "Deu origem a 'acústica'; não é ouvir passivo — implica entender e responder"
- βλέπω → "Distinto de ὁράω (ver com mais ênfase); em João 9:25, o cego curado: 'Eu era cego e agora vejo'"
- πιστεύω → "O verbo de πίστις (fé); note: em João, πιστεύω sempre pede comprometimento, não apenas assentimento"

---

## 6. BLOCO 4 — FRASES DO NT (L17–L20)

### Conceito do Bloco

As frases são **textos reais do Novo Testamento grego**, selecionadas por:
1. Brevidade (3-8 palavras)
2. Vocabulário já coberto nos blocos anteriores
3. Impacto teológico máximo
4. Familiaridade cultural (frases que o aluno já conhece em português)

### Padrão de Steps para Frases (L17–L20)

```
S01  → intro (contexto: quem disse, onde no NT, importância)
S02  → word_intro (palavra 1 da frase)
S03  → word_intro (palavra 2 da frase)
...  → word_intro (palavras N da frase)
Snn  → pause ("Agora leia a frase completa na apostila")
Snn  → write_practice (frase inteira × 3)
Snn  → read_aloud (professor lê, aluno repete)
Snn  → dictation (professor fala em PT, aluno escreve toda a frase em GR)
```

---

### Lição L17 — "ἐν ἀρχῇ ἦν ὁ λόγος"

```
ID:               apostila-L17
TÍTULO:           Lição 17 — No Princípio Era o Verbo
DESCRIÇÃO:        João 1:1a — primeira frase do Evangelho de João
PDF_PAGE:         36
XP:               60
TEMPO:            15 min
REQUER_ANTERIOR:  true
```

**Frase:** `ἐν ἀρχῇ ἦν ὁ λόγος`
**Transliteração:** `en archē ēn ho logos`
**Tradução:** "No princípio era o Verbo"

**Palavras e Steps:**

| Step | Tipo | Conteúdo |
|------|------|---------|
| S01 | `intro` | Contexto: João 1:1 é o versículo mais teológico do NT. Eco proposital de Gênesis 1:1. |
| S02 | `word_intro` | ἐν — preposição "em / no / dentro de" — função: localiza no tempo |
| S03 | `word_intro` | ἀρχῇ — "princípio / origem / começo" — de ἀρχή (mesmo radical de 'arcaico', 'arcanjo') |
| S04 | `word_intro` | ἦν — "era" — imperfeito de εἰμί; imperfecto indica ação contínua no passado |
| S05 | `word_intro` | ὁ — artigo definido masculino "o" — indica que λόγος é específico e singular |
| S06 | `word_intro` | λόγος — "Verbo / Palavra / Razão" — já visto na L10 |
| S07 | `pause` | "Leia a frase completa no topo da página 36: ἐν ἀρχῇ ἦν ὁ λόγος" |
| S08 | `write_practice` | Frase completa × 3 — espaço de cópia da apostila |
| S09 | `read_aloud` | Professor lê: "en archē ēn ho logos" — aluno repete 2× |
| S10 | `dictation` | "Escreva em grego: 'No princípio era o Verbo'" → ἐν ἀρχῇ ἦν ὁ λόγος |

**Total: 10 steps**

**Nota especial para narração S01:**
> "Esta é a frase mais poderosa do Novo Testamento. João 1:1. Vinte séculos atrás, um pescador da Galileia escreveu estas seis palavras em grego e mudou a teologia para sempre. Hoje você vai aprender a lê-las e escrevê-las. Abra sua apostila na página 36."

**Nota especial para S04 (ἦν):**
> "ἦν é o imperfeito do verbo ser. Em grego, o imperfeito descreve uma ação que estava em andamento no passado, sem começo nem fim. João não escreveu 'o Verbo foi criado' (o que seria aoristo), mas 'o Verbo ERA' — uma existência contínua, sem início no tempo."

---

### Lição L18 — "ὁ θεὸς ἀγάπη ἐστίν"

```
ID:               apostila-L18
TÍTULO:           Lição 18 — Deus é Amor
DESCRIÇÃO:        1 João 4:8b — a definição mais concisa de Deus
PDF_PAGE:         38
XP:               60
TEMPO:            12 min
REQUER_ANTERIOR:  true
```

**Frase:** `ὁ θεὸς ἀγάπη ἐστίν`
**Transliteração:** `ho theòs agápē estín`
**Tradução:** "Deus é amor"

**Palavras e Steps:**

| Step | Tipo | Conteúdo |
|------|------|---------|
| S01 | `intro` | Contexto: 1 João 4:8. Em 3 palavras (sem artigo no predicado), João faz a mais profunda afirmação teológica |
| S02 | `word_intro` | ὁ — artigo "o" — com θεός indica que é o Deus específico, não um deus qualquer |
| S03 | `word_intro` | θεὸς — "Deus" — já visto na L08 |
| S04 | `word_intro` | ἀγάπη — "amor incondicional" — já visto na L07 |
| S05 | `word_intro` | ἐστίν — "é" — 3ª pessoa singular do presente de εἰμί |
| S06 | `pause` | "Leia a frase na apostila e reflita: João não diz que Deus tem amor — diz que Deus é amor" |
| S07 | `write_practice` | Frase completa × 3 |
| S08 | `read_aloud` | Professor lê: "ho theòs agápē estín" — aluno repete |
| S09 | `dictation` | "Escreva: 'Deus é amor'" → ὁ θεὸς ἀγάπη ἐστίν |

**Total: 9 steps**

**Nota especial para S01:**
> "João escreve três palavras: ὁ θεὸς ἀγάπη ἐστίν. Perceba: ἀγάπη não tem artigo. Em grego, quando o predicado não tem artigo, isso é intencional — João está dizendo que a natureza essencial de Deus é amor, mas que nem todo amor é Deus. É uma afirmação unidirecional e teologicamente precisa."

---

### Lição L19 — "ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή"

```
ID:               apostila-L19
TÍTULO:           Lição 19 — Eu Sou o Caminho
DESCRIÇÃO:        João 14:6 — o grande "EU SOU" de Jesus
PDF_PAGE:         40
XP:               60
TEMPO:            18 min
REQUER_ANTERIOR:  true
```

**Frase:** `ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή`
**Transliteração:** `egō eimi hē hodòs kaì hē alḗtheia kaì hē zōḗ`
**Tradução:** "Eu sou o caminho, a verdade e a vida"

**Palavras e Steps:**

| Step | Tipo | Conteúdo |
|------|------|---------|
| S01 | `intro` | João 14:6 — a mais exclusiva das 7 declarações "Eu Sou" de Jesus em João |
| S02 | `word_intro` | ἐγώ — pronome "eu" — enfático em grego (normalmente omitido); aqui indica ênfase intencional |
| S03 | `word_intro` | εἰμι — "sou" — 1ª pessoa singular de εἰμί; combinado com ἐγώ ecoa o "EU SOU" divino |
| S04 | `word_intro` | ἡ ὁδός — "o caminho" — artigo feminino + substantivo; caminho literal e metafórico |
| S05 | `word_intro` | καί — conjunção "e" — une os três predicados; a mais comum do NT (~9.000×) |
| S06 | `word_intro` | ἡ ἀλήθεια — "a verdade" — já visto na L12 |
| S07 | `word_intro` | ἡ ζωή — "a vida" — já visto na L07 |
| S08 | `pause` | "Esta frase tem 10 palavras. Antes de praticar, leia-a devagar na apostila." |
| S09 | `write_practice` | Frase completa × 3 (frase mais longa — narração de encorajamento) |
| S10 | `read_aloud` | Professor lê a frase completa — aluno repete 2× |
| S11 | `dictation` | "Escreva: 'Eu sou o caminho, a verdade e a vida'" → frase completa |

**Total: 11 steps**

**Nota especial para S02-S03 (ἐγώ εἰμι):**
> "Em grego, o pronome geralmente está oculto no verbo. Quando João escreve ἐγώ εἰμι, o pronome ἐγώ está explícito e enfático. E estas duas palavras exatas — ἐγώ εἰμι — são as mesmas que aparecem em Êxodo 3:14 na Septuaginta (tradução grega do AT), quando Deus diz a Moisés: 'EU SOU o que SOU'. João registra Jesus usando o título divino."

---

### Lição L20 — "πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με"

```
ID:               apostila-L20
TÍTULO:           Lição 20 — Tudo Posso em Cristo
DESCRIÇÃO:        Filipenses 4:13 — a promessa de Paulo
PDF_PAGE:         43
XP:               60
TEMPO:            18 min
REQUER_ANTERIOR:  true
```

**Frase:** `πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με`
**Transliteração:** `pánta ischýō en tō endynamoûntí me`
**Tradução:** "Tudo posso naquele que me fortalece"

**Palavras e Steps:**

| Step | Tipo | Conteúdo |
|------|------|---------|
| S01 | `intro` | Contexto: Paulo escreve da prisão. Esta frase não é um cheque em branco — está no contexto de aprender a contentar-se em toda situação |
| S02 | `word_intro` | πάντα — "tudo / todas as coisas" — neutro plural; forma de πᾶς, πᾶσα, πᾶν |
| S03 | `word_intro` | ἰσχύω — "ser forte / ser capaz / poder" — raiz de 'isquemia' (falta de força) |
| S04 | `word_intro` | ἐν — "em / dentro de / por meio de" — preposição fundamental do NT |
| S05 | `word_intro` | τῷ — artigo dativo masculino "no/pelo" — indica o meio, o instrumento |
| S06 | `word_intro` | ἐνδυναμοῦντί — participio presente "que me fortalece" — de ἐνδυναμόω (en+dýnamis+verbo) |
| S07 | `word_intro` | με — "me" — pronome acusativo de 1ª pessoa singular |
| S08 | `pause` | "Esta é a última frase da apostila. Você chegou ao final de um longo caminho. Leia-a em voz alta." |
| S09 | `write_practice` | Frase completa × 3 |
| S10 | `read_aloud` | Professor lê — aluno repete — narração especial de encerramento |
| S11 | `dictation` | "Escreva a frase final: 'Tudo posso naquele que me fortalece'" |

**Total: 11 steps**

**Nota especial para S01:**
> "Paulo escreve de uma cela romana. Não de um palácio. A frase anterior é: 'aprendi a contentar-me em qualquer estado em que me encontre'. Só então vem: pánta ischýō. O poder de que Paulo fala não é para fazer qualquer coisa que queira — é para passar por qualquer coisa que venha."

**Nota especial para S10 (read_aloud de encerramento):**
> "Parabéns. Você completou a apostila inteira. Vinte lições, 24 letras, 50 palavras, 4 frases do Novo Testamento — tudo escrito com sua própria mão. O apóstolo Paulo aprendeu grego para escrever estas palavras. Você aprendeu grego para lê-las. Leia a última frase mais uma vez, desta vez com toda a convicção: πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με."

---

## 7. CONTAGEM TOTAL DE STEPS POR LIÇÃO

| Lição | Total de Steps | Obs |
|-------|---------------|-----|
| L01 | 18 | 4 letras (vogais) |
| L02 | 14 | 3 letras (vogais) |
| L03 | 14 | 3 letras (labiais) |
| L04 | 14 | 3 letras (dentais) |
| L05 | 22 | 5 letras (velares + líquidas) |
| L06 | 26 | 6 letras (nasais + sigma + duplas) |
| L07 | 17 | 5 palavras: fé e graça |
| L08 | 17 | 5 palavras: Deus e Cristo |
| L09 | 17 | 5 palavras: ser humano |
| L10 | 17 | 5 palavras: ação e palavra |
| L11 | 17 | 5 palavras: tempo e reino |
| L12 | 17 | 5 palavras: conhecimento |
| L13 | 17 | 5 palavras: salvação |
| L14 | 17 | 5 palavras: comunidade |
| L15 | 17 | 5 palavras: mundo |
| L16 | 17 | 5 palavras: verbos |
| L17 | 10 | Frase João 1:1 (5 palavras) |
| L18 | 9 | Frase 1 João 4:8 (4 palavras) |
| L19 | 11 | Frase João 14:6 (10 palavras) |
| L20 | 11 | Frase Fp 4:13 (7 palavras) |
| **TOTAL** | **327 steps** | |

---

## 8. MAPA DE VOCABULÁRIO COBERTO × CURRICULO PRINCIPAL

Esta seção mapeia o conteúdo da apostila com os módulos da Trilha Principal, garantindo que a apostila **reforce** o que já foi ensinado e **não contradiga** a progressão pedagógica.

| Bloco Apostila | Equivalente Trilha Principal |
|----------------|------------------------------|
| L01-L02 (vogais) | C1-M01 a C1-M02 (introdução ao alfabeto) |
| L03-L06 (consoantes) | C1-M03 a C1-M06 (consoantes + grupos) |
| L07-L09 (vocabulário básico) | C1-M07 a C1-M10 (vocabulário fundamental) |
| L10-L13 (vocabulário intermediário) | C2-M01 a C2-M05 (vocabulário expandido) |
| L14-L16 (vocabulário avançado) | C2-M06 a C2-M10 (vocabulário contextual) |
| L17-L20 (frases) | Ciclos 3+ (leitura de textos) |

---

## 9. DIRETRIZES DE VOZ PARA NARRAÇÃO

### Tom e Registro

O narrador da apostila é um **professor experiente, paciente, entusiasmado**. Não um locutor frio. Tom de conversa, como se estivesse ao lado do aluno.

### Padrões de Linguagem

| Situação | Exemplo de locução |
|----------|-------------------|
| Abertura de lição | "Bem-vindo à Lição {N}. Hoje você vai..." |
| Introdução de nova letra | "A {ordinal} letra é o {nome}..." |
| Instrução de escrita | "Agora escreva... Clique em 'Feito' cada vez que escrever uma letra." |
| Ditado | "Escreva no papel: {nome}." |
| Pausa de revisão | "Antes de continuar, olhe para o que escreveu..." |
| Encerramento | "Parabéns! Você {o que realizou}." |

### Pronúncia das Letras Gregas (para TTS e áudio)

O narrador em português deve pronunciar os nomes gregos em aportuguesamento convencional:
- α → "álfa"
- β → "béta"
- γ → "gáma"
- δ → "délta"
- ε → "épsilon"
- ζ → "zéta"
- η → "éta"
- θ → "téta"
- ι → "iôta"
- κ → "cápa"
- λ → "lâmbda"
- μ → "mu"
- ν → "nu"
- ξ → "csi"
- ο → "ômicron"
- π → "pi"
- ρ → "rô"
- σ/ς → "sígma"
- τ → "tau"
- υ → "úpsilon"
- φ → "fi"
- χ → "qui"
- ψ → "psi"
- ω → "ômega"

---

## 10. INSTRUÇÕES PARA O LLM IMPLEMENTADOR

### O que você deve produzir

Com base neste orquestrador, o LLM deve gerar o arquivo completo:

```
src/content/apostila/lessons.ts
```

O arquivo deve conter o array `APOSTILA_LESSONS: ApostilaLesson[]` com **todas as 20 lições** completamente preenchidas.

### Regras de Geração

1. **Nunca omitir steps** — cada step listado neste orquestrador deve ser gerado completamente
2. **IDs sequenciais e únicos** — formato `apostila-L{NN}-S{NN}` com zero-padding (`S01`, `S02`...)
3. **Narração sempre presente** — todo step deve ter `narration` completo (nunca deixar vazio ou com `TODO`)
4. **Dados gregos validados** — as palavras gregas neste orquestrador estão corretas; não alterar
5. **Seguir templates da Seção 2** exatamente — campos obrigatórios por tipo de step
6. **Não inventar versículos** — usar apenas os versículos-âncora listados neste documento
7. **Manter consistência de tom** — professor paciente, entusiasmado, em português brasileiro
8. **writeRepetitions**: letras → 8; palavras → 5; frases → 3 (exceto se explicitamente diferente)
9. **apostilaPdfPage**: usar os valores exatos deste orquestrador (começar em 1, incrementar conforme especificado)
10. **estimatedMinutes**: usar os valores deste orquestrador

### Sequência de Geração Recomendada

Gerar lição por lição, validando a estrutura de cada uma antes de avançar:

```
Gerar L01 → validar estrutura → L02 → ... → L20
```

Validação por lição:
- [ ] `id` correto (`apostila-L{NN}`)
- [ ] `steps` não vazio
- [ ] Primeiro step é `intro` com id `apostila-L{NN}-S01`
- [ ] Último step é `dictation` ou `read_aloud`
- [ ] Todos os `word_intro` têm `greekForm`
- [ ] Todos os `write_practice` têm `writeRepetitions`
- [ ] Todos os `dictation` têm `revealAfterConfirm: true`

### Arquivos Relacionados a Consultar

Antes de gerar, consultar:
- `src/features/apostila/apostilaTypes.ts` — tipos completos de `ApostilaStep` e `ApostilaLesson`
- `src/content/apostila/lessons.ts` (mock existente) — estrutura do arquivo de saída
- `FEATURE_APOSTILA_COACH.md` Seção 4 — exemplo de L01 e L07 já expandidos

---

## 11. CONQUISTAS ESPERADAS AO COMPLETAR A APOSTILA

| Conquista | Condição | XP |
|-----------|----------|-----|
| `apostila_first` | 1 lição completa | 25 XP |
| `apostila_five` | 5 lições completas | 50 XP |
| `apostila_alphabet` | L01-L06 completas (alfabeto inteiro) | 75 XP |
| `apostila_vocab` | L07-L16 completas (vocabulário completo) | 100 XP |
| `apostila_complete` | Todas as 20 lições completas | 200 XP |

> Nota: `apostila_alphabet` e `apostila_vocab` são conquistas adicionais não especificadas no doc original — sugestão de adição ao `ACHIEVEMENTS.ts` para maior granularidade de celebração.

---

*Fim do Orquestrador de Conteúdo — ApostilaCoach v1.0.0*
*Para dúvidas sobre a arquitetura da feature, consultar `FEATURE_APOSTILA_COACH.md`.*
*Para o sistema de steps e hooks, consultar `src/features/apostila/apostilaTypes.ts` e `useApostilaSession.ts`.*
