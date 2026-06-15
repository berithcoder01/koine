# Plano: Leitura Interlinear Grego ⇄ Português
## Bíblia completa (NT) lado a lado, palavra por palavra

> **Status:** v1.0 — plano aprovado para execução.
> **Decisões aprovadas (sessão 2026-06-04):**
> 1. **Versão PT-BR:** BLivre (CC BY 4.0 Brasil) — domínio livre, juridicamente seguro.
> 2. **Granularidade:** Interlinear palavra-a-palavra (1 token grego → 1 gloss PT curto).
> 3. **Pipeline:** JSON estático em `public/assets/` + SQLite, mesmo padrão do `nt_text.json` atual.
>
> **URL canônica da fonte:** `https://ebible.org/Scriptures/porbr2018_usfm.zip` (1.4 MB, ~66 livros, NT completo, formato USFM 3.0).
> **Crédito oficial:** "Bíblia Livre (BLIVRE), Copyright © 2018 Diego Santos, Mario Sérgio, e Marco Teles, http://sites.google.com/site/biblialivre/ — fevereiro de 2018. Licença Creative Commons Atribuição 4.0 Brasil".

---

## 1. VISÃO GERAL

O **Leitor Interlinear** do Koiné App exibirá o Novo Testamento grego (SBLGNT) com tradução palavra-a-palavra em PT-BR (BLivre) e tradução fluente de versículo. O aluno poderá:

- Navegar por **Livro → Capítulo → Versículo** (menu em cascata).
- Escolher entre **4 modos de leitura**:
  1. **Interlinear** (grego em cima, gloss PT embaixo de cada palavra + tradução fluente)
  2. **Assistido** (grego + tradução fluente embaixo, sem gloss palavra-a-palavra)
  3. **Desafio** (só grego; aluno toca nas palavras para ver gloss)
  4. **Imersão** (só grego; toca para ver só o Strong ID)
- Tocar em qualquer palavra para ver **painel morfológico completo** (lemma, parsing, Strong, gloss PT, definição Strong).
- Salvar **passagem atual** e **histórico de leitura** (sync via Firestore).

A funcionalidade inteira respeita o **offline-first** do app — todos os dados PT já vêm no APK.

---

## 2. FONTES DE DADOS (LIVRES)

### 2.1 Grego — SBLGNT (SBL Greek New Testament)

```
URL:         https://github.com/morphgnt/sblgnt
Licença:     CC BY 4.0
Créditos:    "SBLGNT — Society of Biblical Literature, 2010"
Já no app:   ✅ src/scripts/downloadNT.ts → src/assets/nt_text.json (24 MB)
Status:      NT grego completo, com lemmas, Strong IDs e parsing Robinson.
```

### 2.2 Português — Bíblia Livre (BLivre)

```
URL:         https://github.com/BibliaLivre/Biblia
             https://biblialivre.com.br
Licença:     CC BY-SA 4.0
Créditos:    "Bíblia Livre — biblialivre.com.br"
Status:      NT completo em PT-BR, mas SEM alinhamento palavra-a-palavra.
             Formato: USFM (Unified Standard Format Markers) / OSIS.
```

**Implicação:** A BLivre entrega o versículo inteiro em PT, mas **não** tem gloss palavra-a-palavra. Precisamos construir o alinhamento token↔tradução.

### 2.3 Dicionário — Strong's Greek

```
Já no app:   ✅ src/assets/strong.json (2.3 MB)
Licença:     Domínio público (Strong, 1890)
Idiomas:     Definições em inglês; precisamos criar/importar PT para
             definir a glosa curta no painel.
```

### 2.4 Glossário Grego → PT (a construir)

Não existe dataset PT-BR palavra-a-palavra do NT sob licença permissiva. **Precisamos construir um.**

**Estratégia híbrida (em ordem de prioridade):**

1. **Glossário manual das ~600 palavras mais frequentes do NT** (cobre ~85% do texto).
   - Fonte de base: lista de frequência do SBLGNT (`scripts/buildNT.ts` pode gerar).
   - Glosses manuais em PT-BR pela equipe Koiné (revisão pelo Agente de Revisão).
   - Pode aproveitar glosses já existentes em `verses.ts` para João 1:1-18.

2. **Fallback automático: Strong PT (a construir).**
   - Tomamos o lemma grego → entrada Strong → definição em inglês.
   - Tradução PT-BR automática via modelo (não-comercial) ou via tabela manual de tradução de roots e sufixos.

3. **Fallback final:** exibir transliteração + "?" quando gloss não estiver disponível, com flag para revisão posterior.

---

## 3. ARQUITETURA DE DADOS

### 3.1 Estrutura de arquivos

```
src/assets/
├── nt_text.json              ← já existe (24 MB) — SBLGNT tokenizado
├── strong.json               ← já existe (2.3 MB) — Strong Greek
├── nt_pt.json                ← NOVO (5-8 MB) — BLivre texto fluente por versículo
├── nt_interlinear.json       ← NOVO (10-15 MB) — alinhamento token + gloss
├── books.json                ← NOVO (~10 KB) — metadados dos 27 livros NT
└── ATTRIBUTIONS.md           ← NOVO — créditos SBLGNT, BLivre, Strong

src/scripts/
├── downloadNT.ts             ← já existe
├── downloadBLivre.ts         ← NOVO — baixa texto PT
├── buildInterlinear.ts       ← NOVO — alinha BLivre com SBLGNT
├── buildGlossary.ts          ← NOVO — gera glossário top-600
└── buildBooks.ts             ← NOVO — extrai metadados de livros
```

### 3.2 Schemas

**`nt_pt.json`** (texto fluente por versículo):

```typescript
interface NTPtVerse {
  bookAbbr: string;        // 'JN', 'MT', etc. (mesmo código do SBLGNT)
  bookName: string;        // 'João', 'Mateus'
  ch: number;
  v: number;
  text: string;            // texto fluente BLivre, com pontuação
  source: 'blivre';        // para rastreabilidade
  version: '1.0';
}

type NTPtData = NTPtVerse[];
```

**`nt_interlinear.json`** (alinhamento palavra-a-palavra):

```typescript
interface NTPtGloss {
  bookAbbr: string;
  ch: number;
  v: number;
  position: number;        // 1-indexed, mesmo position do nt_text.json
  tokenGreek: string;
  lemma: string;
  strongsId: string | null;
  glossPT: string;         // 1-3 palavras PT (ex: "princípio", "o Verbo")
  glossSource: 'manual' | 'strong-translated' | 'translit' | 'unknown';
  parsing: string;         // copiado do SBLGNT
}

type NTPtInterlinear = NTPtGloss[];
```

**`books.json`** (metadados de livros):

```typescript
interface BookMeta {
  abbr: string;            // 'JN'
  name: string;            // 'João'
  testament: 'NT';
  order: number;           // 1-27
  totalChapters: number;   // 21 para João
  sblgntFileCode: string;  // '64-Jn'
  blivreFileCode?: string; // depende do formato BLivre
}
```

### 3.3 SQLite — schema adicional

Adicionar à tabela `nt_text` (ou criar `nt_pt` separada — **recomendo separada para não duplicar 140k tokens**):

```sql
CREATE TABLE IF NOT EXISTS nt_pt (
  book_abbr   TEXT NOT NULL,
  chapter     INTEGER NOT NULL,
  verse       INTEGER NOT NULL,
  text        TEXT NOT NULL,
  source      TEXT DEFAULT 'blivre',
  PRIMARY KEY (book_abbr, chapter, verse)
);

CREATE INDEX IF NOT EXISTS idx_ntpt_ref
  ON nt_pt (book_abbr, chapter, verse);

CREATE TABLE IF NOT EXISTS nt_interlinear (
  book_abbr   TEXT NOT NULL,
  chapter     INTEGER NOT NULL,
  verse       INTEGER NOT NULL,
  position    INTEGER NOT NULL,
  lemma       TEXT,
  strongs_id  TEXT,
  gloss_pt    TEXT,
  gloss_source TEXT,
  PRIMARY KEY (book_abbr, chapter, verse, position)
);

CREATE INDEX IF NOT EXISTS idx_interlinear_ref
  ON nt_interlinear (book_abbr, chapter, verse);
```

---

## 4. SCRIPTS DE INGESTÃO

### 4.1 `downloadBLivre.ts` (novo)

**Entrada:** URL base do repositório BLivre.
**Saída:** `src/assets/nt_pt.json`.

```
Pipeline:
1. Baixar índice de livros NT (Matthew a Revelation).
2. Para cada livro, baixar arquivo USFM ou JSON.
3. Extrair versículos (parser USFM simples: \v N marker).
4. Mapear códigos BLivre → códigos SBLGNT (tabela de tradução).
5. Gerar nt_pt.json com schema acima.
```

**Mapeamento de livros (BLivre → SBLGNT):**

```typescript
const BLIVRE_TO_SBLGNT: Record<string, string> = {
  'MAT': 'MT', 'MRK': 'MK', 'LUK': 'LK', 'JHN': 'JN',
  'ACT': 'ACT', 'ROM': 'ROM', '1CO': '1COR', '2CO': '2COR',
  'GAL': 'GAL', 'EPH': 'EPH', 'PHP': 'PHP', 'COL': 'COL',
  '1TH': '1TH', '2TH': '2TH', '1TI': '1TI', '2TI': '2TI',
  'TIT': 'TIT', 'PHM': 'PHM', 'HEB': 'HEB', 'JAS': 'JAS',
  '1PE': '1PE', '2PE': '2PE', '1JN': '1JN', '2JN': '2JN',
  '3JN': '3JN', 'JUD': 'JUD', 'REV': 'REV',
};
```

### 4.2 `buildInterlinear.ts` (novo)

**Entrada:** `nt_text.json` + glossário top-600 + `nt_pt.json`.
**Saída:** `nt_interlinear.json`.

```
Pipeline:
1. Carregar nt_text.json.
2. Carregar nt_pt.json.
3. Carregar glossário top-600 (gerado por buildGlossary.ts).
4. Para cada versículo em nt_text.json:
   a. Para cada token, buscar gloss:
      - Primeiro: glossário manual (lemma ou token)
      - Segundo: fallback Strong (definição EN → tradução PT via tabela)
      - Terceiro: transliteração + flag 'unknown'
   b. Empacotar em NTPtGloss.
5. Validar 100% dos tokens cobertos (ou registrar gaps).
6. Gerar nt_interlinear.json.
```

### 4.3 `buildGlossary.ts` (novo)

**Entrada:** `nt_text.json` + glosses manuais em `src/content/nt/glossarySeed.ts`.
**Saída:** `src/assets/nt_glossary.json` (top-600 palavras com gloss PT).

```
Pipeline:
1. Agregar todos os tokens do nt_text.json.
2. Contar frequência por (lemma, parsing simplificado).
3. Ordenar por frequência desc.
4. Para cada top-600:
   a. Buscar gloss em glossarySeed.ts (manual).
   b. Se não achar, usar transliteração como placeholder + flag 'pending-review'.
5. Gerar arquivo.
6. Listar palavras que precisam de gloss manual (tarefa humana).
```

### 4.4 `buildBooks.ts` (novo)

**Entrada:** SBLGNT + BLivre.
**Saída:** `src/assets/books.json` com metadados canônicos (códigos SBLGNT).

---

## 5. COMPONENTES UI

### 5.1 Estrutura de arquivos (modificar)

```
src/ui/pages/reader/
├── ReaderPage.tsx                       ← refatorar (modo interlinear)
├── components/
│   ├── PassageSelectorSheet.tsx         ← refatorar (3 níveis: Livro/Cap/Vers)
│   ├── BookChapterGrid.tsx              ← NOVO (menu cascata)
│   ├── InterlinearVerse.tsx             ← NOVO (render grego + PT linha-a-linha)
│   ├── InterlinearToken.tsx             ← NOVO (1 token clicável com gloss)
│   ├── VerseTranslationCard.tsx         ← NOVO (versículo fluente PT)
│   ├── MorphologyPanel.tsx              ← já existe — estender com gloss PT
│   └── ReaderModeSelector.tsx           ← NOVO (4 modos)
```

### 5.2 `BookChapterGrid.tsx` (novo)

Cascata em 3 níveis:

```
[Selecionar Livro]               ← 27 chips com nome abreviado
   ↓
[Selecionar Capítulo de João]    ← grid 6 colunas, números 1..21
   ↓
[Selecionar Versículo]           ← grid 8 colunas, números 1..N do cap
   ↓
[Carregar]                       ← botão confirmar
```

**Estado:** `book | chapter | verse` no `PassageSelectorSheet`.
**Dados:** `books.json` para o grid; `ntService.getChapter(book, ch)` para listar versículos.

### 5.3 `InterlinearVerse.tsx` (novo)

Renderiza 1 versículo inteiro no formato:

```
   Ἐν    ἀρχῇ    ἦν    ὁ    λόγος,
   em   princípio  era   o   Verbo
   ──────────────────────────────────
   "No princípio era o Verbo..."  ← BLivre tradução fluente
   — João 1:1                     ← referência
```

**Layout:** Cada token grego empilhado com seu gloss PT (CSS grid `grid-rows-[auto_auto_auto]`). Tocar no token → abrir `MorphologyPanel`.

### 5.4 `InterlinearToken.tsx` (novo)

```tsx
<button onClick={onTap}>
  <span className="greek-text text-xl">{tokenGreek}</span>
  <span className="text-xs text-secondary mt-0.5">{glossPT}</span>
</button>
```

Estado:
- `default` (sem fundo)
- `selected` (fundo `primary/10`)
- `pending` (gloss faltando, exibe "?" em vez de gloss)

### 5.5 `ReaderPage.tsx` (refatorar)

Adicionar 4º modo (`'interlinear'`) ao `MODE_CONFIG`:

```typescript
const MODE_CONFIG = {
  interlinear: { label: 'Interlinear', icon: '📐', description: 'Grego + tradução palavra-a-palavra + fluente' },
  assisted:    { label: 'Assistido',   icon: '📖', description: 'Grego + tradução fluente' },
  challenge:   { label: 'Desafio',     icon: '🎯', description: 'Tente traduzir' },
  immersion:   { label: 'Imersão',     icon: '🌊', description: 'Só grego + Strong' },
};
```

No modo `interlinear`:
- Renderizar `<InterlinearVerse>` em vez do flex-wrap atual.
- Tokens vêm de `ntService.getVerseInterlinear(book, ch, v)` (junta nt_text + nt_interlinear).

### 5.6 `MorphologyPanel.tsx` (estender)

Adicionar linha "**Gloss PT**" ao grid de informações:

```tsx
<div>
  <p className="text-text-secondary text-[10px] uppercase">Gloss PT</p>
  <p className="text-text-primary font-semibold">{token.gloss_pt}</p>
</div>
```

Fonte: campo `glossPT` de `nt_interlinear`.

---

## 6. CAMADA DE DADOS (REFATORAÇÃO)

### 6.1 `ntService.ts` (estender)

```typescript
export const ntService = {
  // já existem
  getVerse, getChapter, getPassage,

  // novos
  getVerseWithPT: async (book, ch, v) => {
    // JOIN nt_text + nt_interlinear + nt_pt
    // retorna GreekToken[] com gloss_pt preenchido
  },

  getVerseFluentPT: async (book, ch, v) => {
    // retorna { text: string, source: 'blivre' }
  },

  getInterlinearTokens: async (book, ch, v) => {
    // retorna InterlinearToken[] (com glossPT)
  },

  getAllBooks: async () => {
    // retorna BookMeta[] ordenado
  },
};
```

### 6.2 `dbQueries` (estender)

Adicionar em `queries.ts`:

```typescript
getPTVerse: async (book, ch, v): Promise<NTPtVerse | null>,
getInterlinearVerse: async (book, ch, v): Promise<InterlinearToken[]>,
getAllBooksOrdered: async (): Promise<BookMeta[]>,
```

### 6.3 `schema.ts` (acrescentar tabelas)

Acrescentar `nt_pt` e `nt_interlinear` ao `SCHEMA_SQL` (ver §3.3).

---

## 7. PIPELINE DE CONSTRUÇÃO

### 7.1 Ordem de execução (npm scripts)

Atualizar `package.json`:

```json
{
  "scripts": {
    "download-nt": "tsx src/scripts/downloadNT.ts",
    "download-blivre": "tsx src/scripts/downloadBLivre.ts",
    "build-glossary": "tsx src/scripts/buildGlossary.ts",
    "build-interlinear": "tsx src/scripts/buildInterlinear.ts",
    "build-books": "tsx src/scripts/buildBooks.ts",
    "build-nt-pt": "npm run download-blivre && npm run build-glossary && npm run build-interlinear && npm run build-books"
  }
}
```

### 7.2 Sequência completa (executar 1x)

```
npm run download-nt           # já existe, NT grego
npm run download-blivre       # NT português BLivre → nt_pt.json
npm run build-glossary        # gera top-600 glossário → nt_glossary.json
npm run build-interlinear     # alinha → nt_interlinear.json
npm run build-books           # metadados → books.json

# Em runtime (já automático via init.ts):
# O seedNT.ts precisa ser estendido para popular nt_pt e nt_interlinear
# a partir dos JSONs. Crie seedNTpt.ts.
```

### 7.3 Tamanho esperado do APK

```
Atual:    nt_text.json (24 MB) + strong.json (2.3 MB) = 26.3 MB
Novo:     + nt_pt.json (5-8 MB) + nt_interlinear.json (10-15 MB) = +15-23 MB
Total:    ~42-50 MB de JSON
+      DB SQLite compactado: ~8-12 MB adicionais
APK:     ~70-90 MB (aceitável para app educacional, ainda abaixo de 100 MB)
```

**Mitigação se ficar grande:**
- Comprimir JSONs com gzip (Capacitor já serve `?gz=...`).
- Lazy-load de livros (carregar sob demanda; manter sempre os 4 evangelhos + Paulo + Hebreus local).
- Manter NT completo no servidor e entregar via RevenueCat Premium? **Não recomendado** — quebra offline-first.

---

## 8. ATENUAÇÃO DE RISCOS (COPYRIGHT)

### 8.1 Arquivo `ATTRIBUTIONS.md` (obrigatório)

```markdown
# Atribuições e Créditos

Este aplicativo usa, com gratidão, as seguintes fontes de dados
de domínio livre:

## Grego — SBLGNT
"Greek New Testament, SBL Edition" (SBLGNT).
Copyright © 2010 Society of Biblical Literature.
Licenciado sob Creative Commons Attribution 4.0.
https://sblgnt.com

## Português — Bíblia Livre (BLivre)
"Bíblia Livre" (BLivre).
Copyright © contribuidores da Bíblia Livre.
Licenciado sob Creative Commons Attribution-ShareAlike 4.0.
https://biblialivre.com.br

## Dicionário — Strong's Greek Lexicon
Strong, James. "Strong's Exhaustive Concordance of the Bible" (1890).
Domínio público.
Definições adaptadas para PT-BR pela equipe Koiné.

## Construção do alinhamento interlinear
O alinhamento palavra-a-palavra entre SBLGNT e BLivre foi
construído pela equipe Koiné e está disponível como obra
derivada sob CC BY-SA 4.0.
```

### 8.2 Tela "Sobre / Créditos" no app

Adicionar item no `SettingsPage` linkando para `ATTRIBUTIONS.md` (renderizado em HTML dentro do app via rota dedicada).

### 8.3 Risco residual

| Risco | Mitigação |
|---|---|
| BLivre rebaixar para licença mais restritiva | Snapshot em `src/assets/nt_pt.json` no momento da ingestão; nunca usar `fetch` em runtime. |
| SBLGNT mudar licença (improvável, é CC BY 4.0 há 15 anos) | Mesmo: snapshot estático. |
| Glosses PT serem cópias literais de obra não-livre (ex: ARA, NVI) | Glosses PT são produzidos **originalmente** pela equipe Koiné (gloss curto, 1-3 palavras) — não reproduzem texto de versões copyrighted. |
| Mismatch de licença (SA no BLivre → SA no app) | Distribuir o app sob **CC BY-SA 4.0** para componentes derivados do BLivre (apenas se o código do app for público). Se o app for proprietário, o SA do BLivre exige compartilhamento igualitário **apenas** das partes derivadas, não do app inteiro. Confirmar com advogado. |

---

## 9. PLANO DE EXECUÇÃO (ORDEM DE TAREFAS)

### FASE 0 — Pesquisa & Licença (1 dia)

| # | Tarefa | Arquivo | Esforço |
|---|---|---|---|
| 0.1 | Confirmar URL canônica do repositório BLivre e formato dos dados | — | 1h |
| 0.2 | Verificar licença exata do BLivre (link CC BY-SA no site) | — | 30min |
| 0.3 | Coletar glosses manuais para top-100 palavras do NT (começar pelas que aparecem em Jo 1) | `src/content/nt/glossarySeed.ts` | 3h |
| 0.4 | Criar `ATTRIBUTIONS.md` | `src/assets/ATTRIBUTIONS.md` | 30min |

### FASE 1 — Pipeline de Dados (2-3 dias)

| # | Tarefa | Arquivo | Esforço |
|---|---|---|---|
| 1.1 | Script `downloadBLivre.ts` (parser USFM) | `src/scripts/downloadBLivre.ts` | 4h |
| 1.2 | Script `buildBooks.ts` (metadados livros) | `src/scripts/buildBooks.ts` | 1h |
| 1.3 | Estender schema SQLite com `nt_pt` e `nt_interlinear` | `src/features/database/schema.ts` | 1h |
| 1.4 | Seed `seedNTpt.ts` (popular `nt_pt` a partir de `nt_pt.json`) | `src/features/database/seeds/seedNTpt.ts` | 2h |
| 1.5 | `npm run build-nt-pt` (gera todos os JSONs) | — | 30min |
| 1.6 | Verificar tamanho final dos assets | `du -sh src/assets/` | 15min |

### FASE 2 — Camada de Dados (1 dia)

| # | Tarefa | Arquivo | Esforço |
|---|---|---|---|
| 2.1 | Estender `ntService` com `getVerseWithPT`, `getInterlinearTokens`, `getAllBooks` | `src/features/reader/ntService.ts` | 3h |
| 2.2 | Adicionar `getPTVerse`, `getInterlinearVerse`, `getAllBooksOrdered` em `dbQueries` | `src/features/database/queries.ts` | 2h |
| 2.3 | Testar queries manualmente com sqlite3 | — | 1h |

### FASE 3 — Componentes UI (3-4 dias)

| # | Tarefa | Arquivo | Esforço |
|---|---|---|---|
| 3.1 | Componente `InterlinearToken` (token clicável com gloss) | `src/ui/pages/reader/components/InterlinearToken.tsx` | 3h |
| 3.2 | Componente `InterlinearVerse` (versículo linha-a-linha) | `src/ui/pages/reader/components/InterlinearVerse.tsx` | 4h |
| 3.3 | Componente `VerseTranslationCard` (PT fluente) | `src/ui/pages/reader/components/VerseTranslationCard.tsx` | 2h |
| 3.4 | Componente `BookChapterGrid` (cascata livro→cap→vers) | `src/ui/pages/reader/components/BookChapterGrid.tsx` | 4h |
| 3.5 | Refatorar `PassageSelectorSheet` (corrigir abreviações + cascata) | `src/ui/pages/reader/components/PassageSelectorSheet.tsx` | 3h |
| 3.6 | Adicionar modo `interlinear` ao `ReaderModeSelector` | `src/ui/pages/reader/components/ReaderModeSelector.tsx` (novo) | 2h |
| 3.7 | Refatorar `ReaderPage` para integrar tudo | `src/ui/pages/reader/ReaderPage.tsx` | 4h |
| 3.8 | Estender `MorphologyPanel` com campo "Gloss PT" | `src/ui/pages/reader/components/MorphologyPanel.tsx` | 1h |

### FASE 4 — Glossário (1-2 dias)

| # | Tarefa | Arquivo | Esforço |
|---|---|---|---|
| 4.1 | Script `buildGlossary.ts` (gerar top-600) | `src/scripts/buildGlossary.ts` | 3h |
| 4.2 | Script `buildInterlinear.ts` (alinhamento) | `src/scripts/buildInterlinear.ts` | 4h |
| 4.3 | Gerar glosses para top-600 palavras (tarefa humana) | `src/content/nt/glossarySeed.ts` | 8-12h |
| 4.4 | Implementar fallback Strong PT (definição EN → PT) | `src/scripts/strongPT.ts` | 4h |

### FASE 5 — Integração com Lições (1 dia)

| # | Tarefa | Arquivo | Esforço |
|---|---|---|---|
| 5.1 | Implementar `PLANO_VERSE_INTEGRATION.md` (já existente, mas não implementado) | — | 6h |
| 5.2 | Botão "Abrir no Leitor" em `LessonPage` | `src/ui/pages/lesson/LessonPage.tsx` | 2h |
| 5.3 | Componente `VerseReader` (mini-leitor na aula) | `src/ui/components/greek/VerseReader.tsx` | 3h |

### FASE 6 — Tela de Créditos (0.5 dia)

| # | Tarefa | Arquivo | Esforço |
|---|---|---|---|
| 6.1 | Tela `/credits` ou `/about` renderizando `ATTRIBUTIONS.md` | `src/ui/pages/profile/AboutPage.tsx` (novo) | 3h |
| 6.2 | Adicionar rota `ROUTES.ABOUT` | `src/core/constants/routes.ts` | 15min |
| 6.3 | Link no `SettingsPage` | `src/ui/pages/profile/SettingsPage.tsx` | 30min |

### FASE 7 — Validação & Ajustes (1-2 dias)

| # | Tarefa | Arquivo | Esforço |
|---|---|---|---|
| 7.1 | Testar navegação em todos os 27 livros (sanidade) | — | 4h |
| 7.2 | Testar offline (voo mode com app já carregado) | — | 1h |
| 7.3 | Testar performance com livro grande (Romanos = 16 cap, 433 vers) | — | 2h |
| 7.4 | Rodar `npm run build` e `npm run lint` | — | 1h |
| 7.5 | Verificar APK final (tamanho, renderização) | — | 2h |
| 7.6 | Atualizar `docs/ARQUITETURA.md` com novos componentes | `docs/ARQUITETURA.md` | 1h |

**Esforço total estimado:** **11-15 dias úteis** (sendo o gargalo principal o glossário manual de top-600 palavras).

---

## 10. MÉTRICAS DE SUCESSO

- **Cobertura:** ≥ 85% dos tokens do NT com gloss PT (top-600 + fallback Strong).
- **Performance:** navegação livro→cap→versículo em ≤ 500ms (cold start, 1ª vez).
- **Performance:** troca de versículo em ≤ 100ms (cache ativo).
- **Offline:** 100% do conteúdo acessível sem internet após 1ª instalação.
- **Tamanho APK:** ≤ 100 MB.
- **Jurídico:** licença do app compatível com CC BY-SA do BLivre (consultar advogado).
- **UX:** aluno consegue ler João 1:1 interlinear e entender 80% sem sair do app.

---

## 11. PRÓXIMOS PASSOS IMEDIATOS (Kickoff)

1. **Pesquisa BLivre** (Fase 0.1, 0.2) — 1h — confirmar URL e licença.
2. **Iniciar glossário manual top-100** (Fase 0.3) — 3h — pode rodar em paralelo à pesquisa.
3. **Esboçar `downloadBLivre.ts`** (Fase 1.1) — 1h de prototipagem.
4. **Definir o glossário das 100 primeiras palavras** — agendar com a equipe (1 dia de trabalho focado).

---

*Plano de Leitura Interlinear — KOINÉ APP*
*Versão 1.0 — 2026-06-04*
*Mantém compatibilidade com: ARQUITETURA.md, PLANO_VERSE_INTEGRATION.md, audio-system-plan.md, visual-refactor.md*
