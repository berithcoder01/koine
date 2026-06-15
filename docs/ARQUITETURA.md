# KOINE — Arquitetura da Aplicação

## Visão Geral

```
                          ┌──────────────┐
                          │   App.tsx     │
                          │  (Router)     │
                          └──────┬───────┘
                                 │
            ┌────────────────────┼────────────────────┐
            │                    │                     │
     ┌──────┴──────┐    ┌───────┴───────┐    ┌────────┴────────┐
     │ PublicRoute  │    │  PrivateRoute  │    │   SyncWrapper   │
     │ (onboarding, │    │  (auth check)  │    │ (useProgressSync│
     │  auth)       │    │                │    │  → Firestore)   │
     └─────────────┘    └───────┬───────┘    └─────────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
   ┌──────┴──────┐      ┌──────┴──────┐      ┌───────┴──────┐
   │  TrailPage  │      │  LessonPage │      │  ReviewPage  │
   │  (home)     │──────│  (motor)    │      │  (SRS SM-2)  │
   └──────┬──────┘      └──────┬──────┘      └──────────────┘
          │                    │
   ┌──────┴──────┐      ┌─────┴─────┐
   │ Outras       │      │ Exercises  │
   │ páginas:     │      │ ─────────  │
   │ ReaderPage  │      │ Flashcard  │
   │ LexiconPage │      │ Multiple   │
   │ CanvasPage  │      │ Choice     │
   │ ProfilePage │      │ FillBlank  │
   │ SettingsPage│      │ WordOrder  │
   │ PaywallPage │      │ Matching   │
   └─────────────┘      │ Pairs      │
                        │ TPR        │
                        │ Digital    │
                        └────────────┘
```

---

## Camada de Dados

```
  ┌─────────────────────────────────────────────────────────────┐
  │                     FONTE ÚNICA DE VERDADE                  │
  │  ┌─────────────────────────────────────────────────────┐   │
  │  │              Firebase Firestore                      │   │
  │  │  users/{uid} → UserProgress (XP, streak, lessons)   │   │
  │  │  ↑ sync debounced (2s) via useProgressSync          │   │
  │  └──────────────────────┬──────────────────────────────┘   │
  │                         │                                   │
  │  ┌──────────────────────┴──────────────────────────────┐   │
  │  │              localStorage (Zustand)                  │   │
  │  │  ┌──────────────────┐  ┌────────────────────────┐   │   │
  │  │  │ progressStore.ts │  │ gamificationStore.ts    │   │   │
  │  │  │ completedLessons │  │ totalXP, streakDays     │   │   │
  │  │  │ completedUnits   │  │ weeklyXP, leagueLevel   │   │   │
  │  │  │ currentCycle/    │  │ achievements            │   │   │
  │  │  │   Unit/Lesson    │  │ unlockedVerses          │   │   │
  │  │  └──────────────────┘  └────────────────────────┘   │   │
  │  └──────────────────────┬──────────────────────────────┘   │
  │                         │                                   │
  │  ┌──────────────────────┴──────────────────────────────┐   │
  │  │              Local SQLite (koineapp.db)              │   │
  │  │  DADOS ESTÁTICOS              │  DADOS DE PROGRESSO   │   │
  │  │  ──────────────────           │  ────────────────────  │   │
  │  │  cycles (3 ciclos)           │  unit_progress         │   │
  │  │  modules (18 módulos)        │  srs_cards             │   │
  │  │  learning_units (53 unid.)   │  user_settings         │   │
  │  │  letters (24 letras)         │                        │   │
  │  │  vocabulary                  │                        │   │
  │  │  strong (5.670 entradas)     │                        │   │
  │  │  nt_text (lazy fetch)        │                        │   │
  │  └──────────────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────┘
```

---

## Fluxo do Motor Pedagógico (LessonPage)

```
  TrailPage ──tap module──▶  /lesson/{moduleId}  ──▶  LessonPage.tsx
                                                          │
                                                    ┌─────┴─────┐
                                                    │useLessonEngine│
                                                    │  hook       │
                                                    └─────┬─────┘
                                                          │
              ┌─────────────────┬──────────────┬──────────┴──────────┐
              │                 │              │                     │
         ┌────┴────┐      ┌────┴────┐    ┌────┴────┐         ┌─────┴─────┐
         │ Phase 1  │      │ Phases  │    │ Phase 5 │         │  Phase 6  │
         │Exposição │      │ 2-4     │    │Aplicação│         │ Completado│
         │          │      │Exercícios│   │(opcional)│         │           │
         └────┬─────┘      └────┬────┘    └────┬────┘         └─────┬─────┘
              │                 │              │                     │
         ┌────┴─────┐     ┌────┴─────┐   ┌────┴─────┐        ┌──────┴──────┐
         │Exposure  │     │Flashcard │   │WordOrder │        │ LessonSummary│
         │Card      │     │Multiple  │   │Multiple  │        │ 3 variantes  │
         │(2s delay)│     │Choice    │   │Choice    │        │ de mastery   │
         └──────────┘     │FillBlank │   │(XP bonus)│        └──────┬──────┘
                           │WordOrder  │   └──────────┘              │
                           │Matching   │                      ┌──────┴──────┐
                           │Pairs      │                      │ enrollItems │
                           │TPR        │                      │ InSRS()     │
                           └───────────┘                      │ syncUnit    │
                                                              │ Progress()  │
                                                              │ Firestore   │
                                                              │ sync        │
                                                              └─────────────┘
```

### Por Unidade

```
        1ª unidade             2ª unidade            3ª unidade
    ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
    │ ExposureCard   │   │ ExposureCard   │   │ ExposureCard   │
    │ → phase2 (rec) │   │ → phase2       │   │ → phase2       │
    │ → phase3 (ass) │   │ → phase3       │   │ → phase3       │
    │ → phase4 (rec) │   │ → phase4       │   │ → phase4       │
    └────────────────┘   └────────────────┘   └───────┬────────┘
                                                      │
                                         ┌────────────┴────────────┐
                                         │    Phase 5 (Aplicação)  │
                                         │  (só na última unidade  │
                                         │   do módulo)            │
                                         └────────────┬────────────┘
                                                      │
                                              ┌───────┴────────┐
                                              │   Phase 6      │
                                              │  → SRS cards   │
                                              │  → LessonSummary│
                                              │  → Synced to   │
                                              │    SQLite +    │
                                              │    Firestore   │
                                              └────────────────┘
```

---

## Estado de Telas (Roteamento)

```
  ┌──────────────┐      ┌────────────────┐      ┌────────────────┐
  │   /onboarding│─────▶│  /auth/login   │─────▶│   /trail       │
  │              │      │  /auth/register│      │   (home)       │
  └──────────────┘      └────────────────┘      └───┬────┬───────┘
                                                     │    │
                     ┌───────────────────────────────┘    │
                     │                                   │
              ┌──────┴──────┐                   ┌────────┴────────┐
              │ /lesson/     │                   │ /review         │
              │  :lessonId   │                   │ (SRS Review)    │
              │  (C1-M01..   │                   └─────────────────┘
              │   C2-M08)    │
              └─────────────┘           ┌──────────────────────────┐
              ┌─────────────┐           │ /reader                  │
              │ /canvas/     │           │ /reader/:book/:chapter  │
              │  :letterId   │           │  /:verse                │
              └─────────────┘           └──────────────────────────┘
              ┌─────────────┐           ┌──────────────────────────┐
              │ /lexicon     │           │ /profile                 │
              └─────────────┘           │ /settings                │
                                        │ /paywall                 │
              ┌─────────────┐           └──────────────────────────┘
              │ /splash      │
              └─────────────┘
```

---

## Hooks & Stores

### Hooks

| Hook | Função |
|---|---|
| `useAuth.ts` | Lê Firebase Auth, carrega UserProgress do Firestore, alimenta authStore |
| `useLessonEngine.ts` | Gerencia sessão de aprendizado, fases 1-6, exercícios, mastery |
| `useProgressSync.ts` | Subscrição global (SyncWrapper), sincroniza stores → Firestore + SQLite |
| `useStrong.ts` | Busca no dicionário Strong (strong.json importado) |
| `useNavigation.ts` | Navegação entre telas (goToLesson, goToReview, etc.) |
| `useGamification.ts` | Ganchos de gamificação (XP, streak) |

### Stores (Zustand + immer)

| Store | Persistência | Dados |
|---|---|---|
| `authStore.ts` | (memória) | user, progress, isLoading |
| `progressStore.ts` | localStorage | completedLessons, completedUnits, currentPosition |
| `gamificationStore.ts` | localStorage | XP, streak, league, achievements, unlockedVerses |
| `settingsStore.ts` | localStorage | Configurações do usuário |

---

## Tabelas do SQLite

### Dados Estáticos (seeded uma vez)

| Tabela | Registros | Origem |
|---|---|---|
| `cycles` | 3 | `seed.ts` |
| `modules` | 18 | `seed.ts` |
| `learning_units` | 53 (C1: 29 + C2: 24) | `seedLearningUnits.ts` |
| `letters` | 24 | `seedLetters.ts` |
| `vocabulary` | ~100 | `seedVocabulary.ts` |
| `strong` | 5.670 | `seedStrong.ts` |
| `nt_verses` | ~30 | `seedNT.ts` |

### Dados de Progresso (mutáveis)

| Tabela | Uso |
|---|---|
| `unit_progress` | Progresso por unidade (fase, score, mastery) |
| `srs_cards` | Cartões SRS (wordId, EF, intervalo, status) |
| `user_settings` | Pares chave-valor |

---

## Seed Pipeline (`init.ts`)

```
initializeDatabase()
  ├── databaseService.initialize()  → cria/abre koineapp.db
  ├── seedDatabase()                → cycles, modules (obrigatório)
  └── runSafeSeed em paralelo:
       ├── seedLetters()            → 24 letras
       ├── seedCoreVocabulary()     → vocabulário básico
       ├── seedStrong()             → 5.670 entradas Strong
       ├── seedLearningUnits()      → 53 unidades pedagógicas
       └── seedNT()                 → versículos-chave
```

---

## Legenda: Novo vs Antigo vs Morto

| Status | Arquivos |
|---|---|
| ✅ **Novo** | `lesson.types.ts`, `useLessonEngine.ts`, `useProgressSync.ts`, `seedLearningUnits.ts`, `LessonPage.tsx` (reescrito), `ExposureCard.tsx`, `LessonSummary.tsx` (atualizado), `schema.ts` (+ learning_units, unit_progress), `queries.ts` (+ Learning Units) |
| ♻️ **Modificado** | `init.ts` (limpado), `TrailPage.tsx` (+ card SRS), `App.tsx` (+ SyncWrapper) |
| 🗑️ **Removido** | `seedLessonContent.ts`, `seedExercises.ts`, `VocabularyStep.tsx`, `LessonContentView.tsx`, `getExercisesByModule`, `getLessonContent` |
| ⏳ **Antigo (não usado)** | Tabelas: `exercises`, `lesson_content` (ainda no schema, sem leituras) |

---

## Constantes de Rotas

```typescript
export const ROUTES = {
  SPLASH: '/splash',
  ONBOARDING: '/onboarding',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  TRAIL: '/trail',
  LESSON: '/lesson/:lessonId',
  CANVAS: '/canvas/:letterId',
  READER: '/reader',
  READER_PASSAGE: '/reader/:book/:chapter/:verse',
  REVIEW: '/review',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  PAYWALL: '/paywall',
  LEXICON: '/lexicon',
};
```
