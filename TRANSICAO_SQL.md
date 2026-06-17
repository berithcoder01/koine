# TRANSICAO_SQL — Plano de Arquitetura do Banco de Dados

> **Objetivo**: Documentar a arquitetura atual do banco SQLite e planejar a transição para um modelo onde o banco de dados já vem PRÉ-POPULADO com todas as informações do NT, eliminando a dependência de fetch/parsing de arquivos JSON em runtime.

---

## INDICE

1. [Estado Atual](#1--estado-atual)
2. [Tabelas do Banco](#2--tabelas-do-banco)
3. [Arquivos que Utilizam o Banco](#3--arquivos-que-utilizam-o-banco)
4. [API de Queries (dbQueries)](#4--api-de-queries-dbqueries)
5. [Fluxo de Dados Atual](#5--fluxo-de-dados-atual)
6. [Problemas Identificados](#6--problemas-identificados)
7. [Proposta de Arquitetura](#7--proposta-de-arquitetura)
8. [Plano de Implementacao](#8--plano-de-implementacao)
9. [Riscos e Mitigacoes](#9--riscos-e-mitigacoes)
10. [Checklist de Migracao](#10--checklist-de-migracao)

---

## 1. ESTADO ATUAL

### 1.1 Arquitetura Geral

O app Koine utiliza **dois bancos de dados SQLite** logicamente separados por domínio:

```
┌──────────────────────────────────────────────┐
│           KOINEAPP (unico .db)               │
│                                              │
│  Dados de Referencia    │   Dados de Usuario  │
│  ──────────────────    │   ────────────────  │
│  - nt_text              │   - user_settings   │
│  - nt_interlinear       │   - unit_progress   │
│  - nt_pt                │   - srs_cards       │
│  - strong               │   - typing_history │
│  - letters              │   - audio_cache     │
│  - vocabulary           │                     │
│  - cycles              │                     │
│  - modules              │                     │
│  - exercises            │                     │
│  - learning_units       │                     │
│  - lesson_content       │                     │
└──────────────────────────────────────────────┘
```

**Problema**: Todos os dados (referência E usuário) estão no mesmo arquivo `koineapp.db`, que é criado em runtime na primeira execução. O schema de `nt_text` é DROPPADO e recriado a cada init (linha 67 de `sqlite.ts`).

### 1.2 Arquivos JSON de Dados do NT

| Arquivo | Tamanho | Conteudo | Tokens/Entradas |
|---------|---------|----------|-----------------|
| `src/assets/nt_text.json` | 23.58 MB | Grego SBLGNT tokenizado | 137.554 tokens |
| `src/assets/nt_interlinear.json` | 23.15 MB | Alinhamento grego→PT | 137.554 rows |
| `src/assets/nt_pt.json` | 1.65 MB | Traducao BLivre PT | 7.957 versiculos |
| `src/assets/strong.json` | 2.25 MB | Lexico Strong | 5.624 entries |
| `src/assets/nt_glossary.json` | 2.07 MB | Glossario grego→PT | 13.844 entries |
| `src/assets/books.json` | ~4 KB | Metadados dos livros | 27 livros |

**Total**: ~53 MB de dados JSON.

### 1.3 Padrao de Acesso Dual

O app possui **duas formas** de acessar dados do NT:

| Camada | Arquivo | Como funciona |
|--------|---------|---------------|
| **SQLite** (primaria) | `ntService.ts` consulta `dbQueries` primeiro | Queries SQL no banco local |
| **JSON** (fallback) | `ntService.ts` usa Maps em memoria | `fetch('/assets/...')` + parse em `Map` |

A camada `ntService` tenta o banco primeiro, se vazio usa JSON:
```typescript
const fromDB = await dbQueries.getInterlinearVerse(book, chapter, verse);
if (fromDB.length > 0) return fromDB;
// so chega aqui se DB vazio → usa JSON
```

### 1.4 Problema Critico: Fetch falha no Android

O carregamento via `fetch('/assets/...')` **falha silenciosamente** no Android (Capacitor), resultando em:
- Apenas o `SAMPLE_CHAPTER` (Joao 1:1-4) aparecer
- O resto dos capitulos nao carrega

Caminho dos arquivos no Android:
```
android/app/src/main/assets/public/assets/nt_text.json
```

O fetch espera `/assets/...` mas no Android o path pode ser diferente ou ha timeout em arquivos de 24MB.

---

## 2. TABELAS DO BANCO

### 2.1 Schema Completo

**Arquivo de origem**: `src/features/database/schema.ts`

```sql
-- =============================================
-- DADOS DE REFERENCIA (seed em build time)
-- =============================================

CREATE TABLE letters (
  id          TEXT PRIMARY KEY,
  upper_case  TEXT NOT NULL,
  lower_case  TEXT NOT NULL,
  name        TEXT NOT NULL,
  sound       TEXT NOT NULL,
  audio_url   TEXT,
  svg_path    TEXT,
  letter_order INTEGER NOT NULL,
  frequency   TEXT NOT NULL DEFAULT 'alta',
  cycle       INTEGER NOT NULL DEFAULT 1,
  module      INTEGER NOT NULL
);

CREATE TABLE vocabulary (
  id              TEXT PRIMARY KEY,
  token           TEXT NOT NULL,
  lemma           TEXT NOT NULL,
  strongs_id      TEXT,
  gloss_pt        TEXT NOT NULL,
  gloss_alt       TEXT,
  frequency       INTEGER DEFAULT 0,
  cycle_intro     INTEGER NOT NULL,
  module_intro    INTEGER NOT NULL,
  is_core         INTEGER DEFAULT 0,
  audio_url       TEXT,
  image_url       TEXT
);

CREATE TABLE nt_text (
  id          TEXT PRIMARY KEY,
  book_abbr   TEXT NOT NULL,
  book_name   TEXT NOT NULL,
  chapter     INTEGER NOT NULL,
  verse       INTEGER NOT NULL,
  position    INTEGER NOT NULL,
  token       TEXT NOT NULL,
  lemma       TEXT NOT NULL,
  strongs_id  TEXT,
  parsing     TEXT,
  gloss_pt    TEXT
);
CREATE INDEX idx_nt_reference ON nt_text (book_abbr, chapter, verse);

CREATE TABLE cycles (
  id          INTEGER PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  trophy_verse TEXT NOT NULL,
  trophy_reference TEXT NOT NULL,
  is_premium  INTEGER DEFAULT 0,
  total_modules INTEGER NOT NULL
);

CREATE TABLE modules (
  id          TEXT PRIMARY KEY,
  cycle_id    INTEGER NOT NULL,
  module_order INTEGER NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  anchor_verse TEXT,
  anchor_reference TEXT,
  method_primary TEXT,
  xp_total    INTEGER DEFAULT 0,
  total_exercises INTEGER DEFAULT 0,
  FOREIGN KEY (cycle_id) REFERENCES cycles(id)
);

CREATE TABLE exercises (
  id              TEXT PRIMARY KEY,
  module_id       TEXT NOT NULL,
  exercise_order  INTEGER NOT NULL,
  type            TEXT NOT NULL,
  question_pt     TEXT,
  question_greek  TEXT,
  correct_answer  TEXT NOT NULL,
  options         TEXT,
  explanation     TEXT,
  hint_text       TEXT,
  image_url       TEXT,
  audio_url       TEXT,
  target_letter   TEXT,
  xp_reward       INTEGER DEFAULT 2,
  FOREIGN KEY (module_id) REFERENCES modules(id)
);

CREATE TABLE strong (
  id          TEXT PRIMARY KEY,
  number      INTEGER NOT NULL,
  greek       TEXT NOT NULL,
  translit    TEXT,
  pronunciation TEXT,
  pos         TEXT,
  origin      TEXT,
  definitions TEXT NOT NULL,
  name        TEXT
);
CREATE INDEX idx_strong_greek ON strong (greek);
CREATE INDEX idx_strong_number ON strong (number);

CREATE TABLE lesson_content (
  id            TEXT PRIMARY KEY,
  module_id     TEXT NOT NULL,
  content_order INTEGER NOT NULL,
  type          TEXT NOT NULL,
  title         TEXT NOT NULL,
  body          TEXT NOT NULL,
  greek_example TEXT,
  strongs_refs  TEXT,
  FOREIGN KEY (module_id) REFERENCES modules(id)
);
CREATE INDEX idx_content_module ON lesson_content (module_id, content_order);

CREATE TABLE learning_units (
  id                TEXT PRIMARY KEY,
  module_id         TEXT NOT NULL,
  unit_order        INTEGER NOT NULL,
  unit_type         TEXT NOT NULL,
  greek_form        TEXT NOT NULL,
  transliteration   TEXT,
  gloss_pt          TEXT NOT NULL,
  phonetic_sound    TEXT,
  explanation       TEXT NOT NULL,
  mnemonic_hint     TEXT,
  audio_url         TEXT,
  image_url         TEXT,
  context_verse     TEXT,
  context_reference TEXT,
  srs_key           TEXT NOT NULL UNIQUE,
  phase2_data       TEXT NOT NULL,
  phase3_data       TEXT NOT NULL,
  phase4_data       TEXT NOT NULL,
  phase5_data       TEXT,
  FOREIGN KEY (module_id) REFERENCES modules(id)
);
CREATE INDEX idx_learning_units_module ON learning_units (module_id, unit_order);

-- =============================================
-- TRADUCOES E INTERLINEAR
-- =============================================

CREATE TABLE nt_pt (
  book_abbr   TEXT NOT NULL,
  chapter     INTEGER NOT NULL,
  verse       INTEGER NOT NULL,
  text        TEXT NOT NULL,
  source      TEXT DEFAULT 'blivre',
  version     TEXT DEFAULT '2018-02',
  PRIMARY KEY (book_abbr, chapter, verse)
);
CREATE INDEX idx_ntpt_ref ON nt_pt (book_abbr, chapter);

CREATE TABLE nt_interlinear (
  book_abbr    TEXT NOT NULL,
  chapter      INTEGER NOT NULL,
  verse        INTEGER NOT NULL,
  position     INTEGER NOT NULL,
  token_greek  TEXT NOT NULL,
  lemma        TEXT,
  strongs_id   TEXT,
  parsing      TEXT,
  gloss_pt     TEXT,
  gloss_source TEXT DEFAULT 'manual',
  PRIMARY KEY (book_abbr, chapter, verse, position)
);
CREATE INDEX idx_interlinear_ref ON nt_interlinear (book_abbr, chapter, verse);

-- =============================================
-- DADOS DO USUARIO (runtime, por usuario)
-- =============================================

CREATE TABLE user_settings (
  key     TEXT PRIMARY KEY,
  value   TEXT NOT NULL
);

CREATE TABLE unit_progress (
  id            TEXT PRIMARY KEY,
  unit_id       TEXT NOT NULL,
  user_id       TEXT NOT NULL,
  phase_reached INTEGER DEFAULT 1,
  phase2_score  REAL DEFAULT 0,
  phase3_score  REAL DEFAULT 0,
  phase4_score  REAL DEFAULT 0,
  phase5_score  REAL DEFAULT 0,
  overall_score REAL DEFAULT 0,
  mastery_level TEXT DEFAULT 'reinforcement',
  srs_enrolled  INTEGER DEFAULT 0,
  completed_at  TEXT,
  FOREIGN KEY (unit_id) REFERENCES learning_units(id)
);

CREATE TABLE srs_cards (
  word_id       TEXT PRIMARY KEY,
  token         TEXT NOT NULL,
  gloss_pt      TEXT NOT NULL,
  interval_days INTEGER DEFAULT 1,
  ease_factor   REAL DEFAULT 2.5,
  repetitions   INTEGER DEFAULT 0,
  next_review   TEXT NOT NULL,
  status        TEXT DEFAULT 'aprendendo',
  last_reviewed TEXT
);

CREATE TABLE typing_history (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  word_greek TEXT NOT NULL,
  word_pt    TEXT,
  strongs_id TEXT,
  mode       TEXT NOT NULL,
  input      TEXT NOT NULL,
  is_correct INTEGER NOT NULL,
  score      REAL NOT NULL,
  session_id TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_typing_strongs ON typing_history(strongs_id);
CREATE INDEX idx_typing_correct ON typing_history(user_id, is_correct);

CREATE TABLE audio_cache (
  id          TEXT PRIMARY KEY,
  remote_url  TEXT NOT NULL,
  local_path  TEXT NOT NULL,
  downloaded  INTEGER DEFAULT 0,
  size_bytes  INTEGER DEFAULT 0,
  cycle_id    INTEGER
);
```

### 2.2 Contagem de Registros Estimada

| Tabela | Estimativa de Registros | Fonte |
|--------|------------------------|-------|
| `letters` | 24 | Hardcoded TS |
| `vocabulary` | ~200 | Hardcoded TS |
| `nt_text` | 137.554 | `nt_text.json` |
| `nt_interlinear` | 137.554 | `nt_interlinear.json` |
| `nt_pt` | 7.957 | `nt_pt.json` |
| `strong` | 5.624 | `strong.json` |
| `cycles` | 5 | Hardcoded TS |
| `modules` | 19 | Hardcoded TS |
| `exercises` | ~100 | Hardcoded TS |
| `learning_units` | ~500 | Hardcoded TS |
| `lesson_content` | ~50 | Hardcoded TS |
| `user_settings` | Dinamico | Runtime |
| `unit_progress` | Dinamico | Runtime |
| `srs_cards` | Dinamico | Runtime |
| `typing_history` | Dinamico | Runtime |

---

## 3. ARQUIVOS QUE UTILIZAM O BANCO

### 3.1 Camada de Database (core)

| Arquivo | Funcao |
|---------|--------|
| `src/features/database/sqlite.ts` | CapacitorSQLite wrapper - conexao, init, schema |
| `src/features/database/queries.ts` | Todas as queries SQL via `dbQueries` |
| `src/features/database/schema.ts` | `SCHEMA_SQL` - definicao completa do schema |
| `src/features/database/init.ts` | `initializeDatabase()` - orquestra init + seeds |
| `src/features/database/index.ts` | Re-exports public API |

### 3.2 Seeds (populam banco em runtime)

| Arquivo | Alimenta |
|--------|----------|
| `src/features/database/seeds/seed.ts` | `cycles`, `modules` |
| `src/features/database/seeds/seedLetters.ts` | `letters` |
| `src/features/database/seeds/seedVocabulary.ts` | `vocabulary` |
| `src/features/database/seeds/seedStrong.ts` | `strong` (via `src/assets/strong.json`) |
| `src/features/database/seeds/seedLearningUnits.ts` | `learning_units` |
| `src/features/database/seeds/seedNT.ts` | `nt_text` (apenas ~1.380 tokens do curriculo) |
| `src/features/database/seeds/seedNTpt.ts` | `nt_pt`, `nt_interlinear` (via `fetch /assets/*.json`) |

### 3.3 Services e Hooks

| Arquivo | Tabelas consultadas |
|---------|---------------------|
| `src/features/reader/ntService.ts` | `nt_text`, `nt_interlinear`, `nt_pt`, `strong` via dbQueries + fallback JSON |
| `src/features/progress/useProgressSync.ts` | `unit_progress` |
| `src/features/gamification/useGamificationActions.ts` | `srs_cards`, `typing_history` |
| `src/features/typing/useTypingSession.ts` | `typing_history` |
| `src/features/strong/useStrong.ts` | `strong` |
| `src/features/lesson-engine/useLessonEngine.ts` | `learning_units`, `srs_cards` |

### 3.4 Paginas UI

| Arquivo | Tabelas consultadas |
|---------|---------------------|
| `src/ui/pages/trail/TrailPage.tsx` | `cycles`, `modules`, `srs_cards` |
| `src/ui/pages/canvas/CanvasPage.tsx` | `letters` |
| `src/ui/pages/activities/ActivitiesPage.tsx` | `letters` |
| `src/ui/pages/profile/ProfilePage.tsx` | `srs_cards` |
| `src/ui/pages/onboarding/OnboardingPage.tsx` | `user_settings` |
| `src/ui/pages/lexicon/LexiconPage.tsx` | `strong`, `srs_cards` |
| `src/ui/pages/reader/ReaderPage.tsx` | Usa `ntService.ts` indiretamente |

### 3.5 Componentes UI

| Arquivo | Tabelas consultadas |
|---------|---------------------|
| `src/ui/components/AvatarPickerSheet.tsx` | `user_settings` |
| `src/ui/exercises/ExerciseFeedback.tsx` | `strong`, `vocabulary` |
| `src/ui/greek/WordPopup.tsx` | `strong` |

---

## 4. API DE QUERIES (dbQueries)

**Arquivo**: `src/features/database/queries.ts`

### 4.1 Letters
```typescript
getAllLetters(): Letter[]                                 // Todos, ordenado
getLettersByModule(moduleId: number): Letter[]             // Por ciclo/modulo
```

### 4.2 Vocabulary
```typescript
getVocabularyByModule(moduleId: number): Vocabulary[]      // Por modulo
searchVocabulary(query: string): Vocabulary[]            // Busca token/lemma/gloss_pt
```

### 4.3 NT Text
```typescript
getVerse(book: string, chapter: number, verse: number): NtToken[]
getChapter(book: string, chapter: number): number[]       // Lista de versiculos
getChapterTokens(book: string, chapter: number): NtToken[]
getInterlinearChapter(book: string, chapter: number): NtInterlinearRow[]
getPTVerse(book: string, chapter: number, verse: number): NTPtVerse | null
getPTChapter(book: string, chapter: number): NTPtVerse[]
getInterlinearVerse(book: string, chapter: number, verse: number): NtInterlinearRow[]
getAllBooksOrdered(): BookMeta[]
```

### 4.4 Strong
```typescript
getStrongById(id: string): StrongEntry | null
searchStrong(query: string): StrongEntry[]
searchStrongByPortuguese(query: string): StrongEntry[]
```

### 4.5 Modules/Cycles
```typescript
getModuleById(moduleId: string): Module | null
getAllCycles(): Cycle[]
getModulesByCycle(cycleId: number): Module[]
```

### 4.6 SRS
```typescript
getPendingSRSCards(): SRSCard[]
upsertSRSCard(card: SRSCard): void
getSRSCardCount(): number
getTotalSRSCardCount(): number
```

### 4.7 Progress
```typescript
getLearningUnitsByModule(moduleId: string): LearningUnit[]
upsertUnitProgress(progress: UnitProgress): void
getLearningUnitCount(moduleId: string): number
```

### 4.8 Settings
```typescript
getSetting(key: string): string | null
setSetting(key: string, value: string): void
```

### 4.9 Typing History
```typescript
insertTypingHistory(row: TypingHistoryRow): void
getTypingHistory(userId: string, days: number): TypingHistoryRow[]
getTypingErrorWords(userId: string, days: number): string[]
```

---

## 5. FLUXO DE DADOS ATUAL

### 5.1 Init no App Start

```
App.tsx
    │
    ▼
initializeDatabase()
    │
    ├─► CapacitorSQLite.createConnection()
    │       cria koineapp.db vazio
    │
    ├─► databaseService.initialize()
    │       ├─ CREATE SCHEMA (SCHEMA_SQL)
    │       │     └─ ATENCAO: DROP TABLE nt_text / nt_interlinear antes de criar!
    │       │
    │       └─ Verifica versoes em user_settings
    │
    └─► seed.ts
            ├─ seedLetters()     ← LETTERS de alphabet.ts
            ├─ seedVocabulary()   ← VOCABULARY de vocabulary.ts
            ├─ seedStrong()      ← STRONG de strong.json (fetch)
            ├─ seedLearningUnits()← LEARNING_UNITS de units.ts
            ├─ seedNT()          ← NT_TOKENS de verses.ts (~1.380 tokens, NAO 137k!)
            └─ seedNTpt()        ← nt_pt.json + nt_interlinear.json (fetch)
```

### 5.2 Leitura de Dados do NT

```
Leitor NT (ReaderPage.tsx)
    │
    ▼
ntService.getChapterWithPT(book, chapter)
    │
    ├─► dbQueries.getInterlinearChapter()  ← SQLite (SE tiver dados)
    │
    ├─ SE SQLite vazio:
    │     └─► ensureDataLoaded()           ← Carrega JSONs em memoria
    │           ├─ import('@/assets/strong.json?raw')
    │           ├─ import('@/assets/nt_glossary.json?raw')
    │           ├─ import('@/assets/nt_text.json?raw')
    │           ├─ import('@/assets/nt_interlinear.json?raw')
    │           └─ import('@/assets/nt_pt.json?raw')
    │
    └─► Constrói ChapterVerse[] com tokens, gloss, translit
```

### 5.3 Dados de Usuário

```
User actions (lesson complete, typing, etc.)
    │
    ▼
useProgressSync / useGamificationActions / useTypingSession
    │
    ▼
dbQueries upsertXXXX()
    │
    ▼
SQLite local (koineapp.db)
    │
    ▼
Firebase sync (useProgressSync.ts)
```

---

## 6. PROBLEMAS IDENTIFICADOS

### 6.1 CRITICO: Fetch falha no Android

**Sintoma**: Apenas Joao 1:1-4 aparece no leitor. O resto dos livros/capitulos retorna vazio.

**Causa**: `fetch('/assets/...')` falha no Android por:
- Path diferente (`/android_asset/public/assets/...` vs `/assets/...`)
- Timeout em arquivos grandes (24MB)
- Encoding ou parsing error silencioso

**Evidencia**: O `SAMPLE_CHAPTER` em `ReaderPage.tsx` (linhas 12-49) so aparece quando `getChapterWithPT` retorna vazio.

### 6.2 CRITICO: seedNT insere apenas ~1.380 tokens

O `seedNT.ts` importa de `src/content/nt/verses.ts` que contem apenas os tokens usados no curriculo (Cycles I-II), NAO todos os 137.554 tokens do NT.

O banco SQLite So teria dados do NT se:
1. `seedNTpt.ts` executasse com sucesso (mas falha via fetch)
2. Ou `ntService.ts` usasse fallback JSON (mas fetch tambem falha)

### 6.3 Banco nao pre-populado

O app cria o banco do zero em cada instalacao fresh. Se o processo de seed falhar, o app fica sem dados.

### 6.4 Versao do schema nao controlada

Nao ha migracoes formais. A versao e controlada por chaves em `user_settings`:
- `nt_abbr_version`
- `nt_abbr_version_pt`
- `learning_units_version`

Se o schema mudar, nao ha garantia de que tables serao recriadas corretamente.

### 6.5 DROP TABLE em toda init

Em `sqlite.ts` linha 67:
```typescript
db.execute('DROP TABLE IF EXISTS nt_text');
db.execute('DROP TABLE IF EXISTS nt_interlinear');
```

Isso apaga os dados do NT toda vez que o app inicia (se o schema for recriado).

---

## 7. PROPOSTA DE ARQUITETURA

### 7.1 Visao Geral

> **Principio**: Separar dados de referencia (imutaveis, iguais para todos) de dados de usuário (dinâmicos, por usuário). Empacotar o banco de referência PRÉ-POPULADO junto com o APK.

### 7.2 Arquitetura Proposta: 2 Bancos

```
┌─────────────────────────────────────────────────────────┐
│                    APK INSTALL                          │
│                                                         │
│  ┌─────────────────┐      ┌─────────────────────────┐  │
│  │ koine_core.db   │      │  (user data goes here    │  │
│  │ PRÉ-POPULADO    │      │   after install)        │  │
│  │                 │      │                         │  │
│  │ - nt_text       │      │  koine_user.db          │  │
│  │ - nt_interlinear│      │  CRIA EM RUNTIME        │  │
│  │ - nt_pt         │      │                         │  │
│  │ - strong        │      │  - user_settings        │  │
│  │ - letters       │      │  - unit_progress        │  │
│  │ - vocabulary    │      │  - srs_cards           │  │
│  │ - cycles         │      │  - typing_history       │  │
│  │ - modules        │      │  - audio_cache          │  │
│  │ - exercises      │      │                         │  │
│  │ - learning_units│      │  Sync: Firebase         │  │
│  │ - lesson_content │      │                         │  │
│  └─────────────────┘      └─────────────────────────┘  │
│         READ-ONLY                   READ/WRITE         │
└─────────────────────────────────────────────────────────┘
```

### 7.3 Beneficios

| Aspecto | Hoje | Proposta |
|---------|------|----------|
| App funciona offline | Parcial | Completo |
| Tempo de primeira execucao | Lento (seed + fetch) | Rapido (banco ja existe) |
| Falha de fetch | Afeta todo o NT | Nao afeta (banco local) |
| Tamanho do bundle | ~53MB JSON | ~5MB (banco SQLite compactado) |
| Separacao de concerns | Misturado | Dados ref vs usuario separados |
| Migracoes | Nenhuma | Possivel com schema versioning |

### 7.4 Implementacao no Build

```bash
# Build time (no computador do dev, NAO no app):
node scripts/populate-core-db.js
    │
    ├─► Ler todos os JSONs de assets
    │
    ├─► Criar koine_core.db com schema completo
    │
    ├─► Importar TODOS os 137.554 tokens do nt_text
    │
    ├─► Importar TODOS os 137.554 rows do nt_interlinear
    │
    ├─► Importar 7.957 versiculos do nt_pt
    │
    ├─► Importar 5.624 entradas do strong
    │
    └─► Copiar para: android/app/src/main/assets/databases/koine_core.db

# Capacitor copia automaticamente para o APK
```

### 7.5 Detalhes de Implementacao

#### 7.5.1 Scripts de Population

Criar `scripts/populate-core-db.js` que:
1. Usa `better-sqlite3` ou `sqlite3` no Node.js
2. Le todos os JSONs de `src/assets/`
3. Insere os dados nas tabelas correspondentes
4. Salva como `koine_core.db`
5. Coloca em `android/app/src/main/assets/databases/`

#### 7.5.2 Configuracao do Capacitor

Ja existe em `capacitor.config.ts`:
```typescript
CapacitorSQLite: {
  androidIsEncryption: true,
},
```

Adicionar no `capacitor.config.ts`:
```typescript
plugins: {
  CapacitorSQLite: {
    iosDatabaseLocation: 'Library/CapacitorDatabase',
    androidDatabaseLocation: 'databases',  // <- importante
    // ...
  }
}
```

#### 7.5.3 Logica de Init Modificada

```typescript
// init.ts modificado:
async function initializeDatabase() {
  // 1. Connecta ao koine_user.db (cria se nao existir)
  await userDb.initialize();

  // 2. Connecta ao koine_core.db (ja existe no APK, SÓ LEITURA)
  await coreDb.connect('koine_core.db', { readonly: true });

  // 3. seeds só para dados de usuário (srs_cards, user_settings, etc.)
  await seedUserData(userDb);
}
```

#### 7.5.4 Queries Modificadas

Todas as queries de dados de referência (`nt_text`, `nt_interlinear`, `nt_pt`, `strong`) devem usar `coreDb`. Queries de usuário (`unit_progress`, `srs_cards`, `user_settings`) usam `userDb`.

### 7.6 Formato do Banco Pré-populado

| Item | Tamanho Estimado |
|------|------------------|
| `nt_text` (137.554 rows) | ~25 MB |
| `nt_interlinear` (137.554 rows) | ~20 MB |
| `nt_pt` (7.957 rows) | ~2 MB |
| `strong` (5.624 rows) | ~3 MB |
| `letters` (24 rows) | ~5 KB |
| `vocabulary` (~200 rows) | ~50 KB |
| `cycles` + `modules` + `exercises` | ~100 KB |
| `learning_units` (~500 rows) | ~1 MB |
| **TOTAL** | **~51 MB (descomprimido)** |

O arquivo `.db` no APK pode ser menor se usarmos `PRAGMA page_size=4096` e `VACUUM`.

---

## 8. PLANO DE IMPLEMENTACAO

### Fase 1: Script de Population (Build Time)

**Objetivo**: Criar o script que gera o banco pré-populado.

1. Criar `scripts/populate-core-db.js`
2. Usar `better-sqlite3` para criar e popular
3. Testar locally
4. Garantir que o banco é colocado em `android/app/src/main/assets/databases/`

**Entregaveis**:
- `scripts/populate-core-db.js` funcional
- `koine_core.db` gerado localmente

### Fase 2: Separar Bancos (Core vs User)

**Objetivo**: Separar a conexao em dois bancos distintos.

1. Modificar `sqlite.ts` para expor duas conexoes: `coreDb` e `userDb`
2. `coreDb`: conexao ao `koine_core.db` (readonly)
3. `userDb`: conexao ao `koine_user.db` (read-write)
4. Modificar `queries.ts` para receber qual banco usar

**Entregaveis**:
- `sqlite.ts` com dual connection
- `queries.ts` aceitando conexao como parametro

### Fase 3: Modificar Seeds

**Objetivo**: Seeds só populam `userDb`, não dados de referência.

1. Modificar `seedNT.ts` e `seedNTpt.ts` para não fazer nada (dados já no banco)
2. `seedLetters.ts`, `seedVocabulary.ts`, `seedStrong.ts`, `seedLearningUnits.ts` → avaliar se vão pro core ou user
3. Remover o `DROP TABLE IF EXISTS nt_text` em `sqlite.ts`

**Entregaveis**:
- Seeds não recriam tabelas de referência
- Init só popula dados de usuário

### Fase 4: Modificar ntService.ts

**Objetivo**: Usar banco core para dados do NT (sem fetch).

1. `ntService` recebe referencia ao `coreDb`
2. Remove fallback para JSON (nao precisa mais)
3. Queries vão direto para `coreDb`

**Entregaveis**:
- `ntService.ts` sem dependencia de fetch/JSON

### Fase 5: Build e Teste

**Objetivo**: Garantir que o APK vem com banco pré-populado.

1. Rodar `node scripts/populate-core-db.js` no build
2. Capacitor copia `koine_core.db` para o APK
3. Testar leitura do NT em airplane mode (sem rede)
4. Verificar que João 1-5, Romanos 1, Apocalipse 1 funcionam

**Entregaveis**:
- APK com banco pré-populado funcionando
- Teste em airplane mode passando

### Fase 6: Cleanup (Opcional)

**Objetivo**: Remover arquivos JSON de assets (se banco cobrir tudo).

1. Remover imports de JSON em `ntService.ts`
2. Remover `src/assets/nt_text.json`, `nt_interlinear.json`, etc. (opcional)
3. Manter `strong.json` e `nt_glossary.json` se ainda usados para fallback

---

## 9. RISCOS E MITIGACOES

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|-------------|---------|-----------|
| Banco SQLite maior que 50MB causando problema de install | Baixa | Alto | Testar tamanho final; usar compressao se necessario |
| Capacitor nao copia .db da pasta databases/ | Media | Alto | Verificar capacitor.config.ts e steps de build |
| Performance de leitura pior com SQLite vs Map em memoria | Baixa | Baixo | Indices ja existem nas tabelas (idx_nt_reference, etc.) |
| Quebrar queries existentes | Alta | Critico | Manter API de dbQueries idêntica; testar todos os 16+ arquivos consumidores |
| Falha ao detectar banco core (primeira execucao sem rede) | Media | Alto | App deve verificar: "se koine_core.db existe, usar; senao, mostrar erro amigavel" |
| Versao do schema diverge entre banco do APK e updates do app | Baixa | Medio | Implementar schema versioning: `user_settings.core_schema_version` |

---

## 10. CHECKLIST DE MIGRACAO

### 10.1 Script de Population

- [ ] Criar `scripts/populate-core-db.js`
- [ ] Instalar `better-sqlite3` ou `sqlite3`
- [ ] Testar criacao do banco com todos os dados
- [ ] Verificar tamanho final do `.db`
- [ ] Colocar em `android/app/src/main/assets/databases/`
- [ ] Garantir que Capacitor copia para APK

### 10.2 Camada de Database

- [ ] Modificar `sqlite.ts` para dual connection (core + user)
- [ ] Remover `DROP TABLE IF EXISTS nt_text` e `nt_interlinear`
- [ ] Adicionar funcao `connectCore(path)` e `connectUser(path)`
- [ ] `queries.ts` aceita parametro de conexao (ou usa default)

### 10.3 Seeds

- [ ] `seedNT.ts` → nao fazer nada (banco ja populado)
- [ ] `seedNTpt.ts` → nao fazer nada (banco ja populado)
- [ ] `seedStrong.ts` → avaliar se vai pro core (se banco core existir)
- [ ] `seedLetters.ts` → mesmo eval
- [ ] Testar que init funciona sem popular nt_text/nt_interlinear

### 10.4 ntService

- [ ] Remover `ensureDataLoaded()` e imports de JSON
- [ ]Todas queries vao direto para `coreDb`
- [ ] `fallback JSON` removido
- [ ] Testar leitura de Joao 1, Romanos 1, Apocalipse 1 sem rede

### 10.5 Build e Deploy

- [ ] Build gera `koine_core.db` automaticamente
- [ ] APK inclui `koine_core.db` em `assets/databases/`
- [ ] Testar em airplane mode
- [ ] Testar em dispositivo Xiaomi real
- [ ] Commit de transicao

### 10.6 Validacao de Todas as Features

- [ ] Leitor NT: Joao 1 completo (todos os versiculos)
- [ ] Leitor NT: Romanos 1
- [ ] Leitor NT: Apocalipse 1
- [ ] Lexicon: busca por palavra grega
- [ ] Lexicon: busca por traducao PT
- [ ] Trail page: ciclos e modulos carregam
- [ ] Canvas: letras carregam
- [ ] Profile: stats de SRS carregam
- [ ] Onboarding: salvar configuracoes
- [ ] Exercises: feedback com Strong info
- [ ] Firebase sync: progresso sincroniza

---

## ANEXO: ARQUIVOS CRITICOS PARA A TRANSICAO

### A.1 Arquivos que NAO podem ser quebrados

```
src/features/database/sqlite.ts          ← Conexao e schema
src/features/database/queries.ts         ← TODAS as queries
src/features/database/schema.ts         ← Schema completo
src/features/database/init.ts           ← Orchestrator de init
src/features/reader/ntService.ts        ← Leitor NT
src/features/progress/useProgressSync.ts
src/features/gamification/useGamificationActions.ts
src/features/typing/useTypingSession.ts
src/features/strong/useStrong.ts
src/features/lesson-engine/useLessonEngine.ts
src/ui/pages/trail/TrailPage.tsx
src/ui/pages/canvas/CanvasPage.tsx
src/ui/pages/activities/ActivitiesPage.tsx
src/ui/pages/profile/ProfilePage.tsx
src/ui/pages/onboarding/OnboardingPage.tsx
src/ui/pages/lexicon/LexiconPage.tsx
src/ui/components/AvatarPickerSheet.tsx
src/ui/exercises/ExerciseFeedback.tsx
src/ui/greek/WordPopup.tsx
```

### A.2 Arquivos JSON de Origem

```
src/assets/nt_text.json         (23.58 MB) ← Fonte do nt_text
src/assets/nt_interlinear.json   (23.15 MB) ← Fonte do nt_interlinear
src/assets/nt_pt.json           (1.65 MB)  ← Fonte do nt_pt
src/assets/strong.json           (2.25 MB)  ← Fonte do strong
src/assets/nt_glossary.json     (2.07 MB)  ← Fallback (pode manter)
src/assets/books.json            (~4 KB)    ← Metadados
```

### A.3 Content Files (Hardcoded)

```
src/content/alphabet.ts          ← LETTERS
src/content/vocabulary.ts       ← VOCABULARY
src/content/strong.ts           ← Strong (usa strong.json)
src/content/curriculum/cycles.ts ← cycles
src/content/curriculum/modules.ts ← modules
src/content/curriculum/units.ts  ← learning_units
src/content/nt/verses.ts         ← NT_TOKENS (~1.380, NAO 137k)
```

### A.4 Capacitor Config

```
capacitor.config.ts             ← CapacitorSQLite settings
android/app/src/main/assets/     ← Onde o .db sera copiado
```

---

**Versao**: 1.0
**Data**: 2026-06-16
**Autor**: AI Agent (sistema Antigravity Kit)
**Status**: Planejado, pendente implementacao