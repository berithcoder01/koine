# Especificação de Funcionalidade — Estudo com Apostila (ApostilaCoach)

> **Versão:** 1.0.0
> **App:** Koiné — Grego do Novo Testamento (`com.berith.koineapp`)
> **Stack:** React 18 + TypeScript + Capacitor 6 + Ionic React 7 + Zustand + SQLite
> **Contexto:** Esta especificação assume familiaridade completa com o MASTER_MANUAL.md do projeto.

---

## 1. VISÃO GERAL DA FUNCIONALIDADE

### 1.1 Conceito

**ApostilaCoach** é uma sessão de estudo guiada por voz e texto que acompanha o aluno enquanto ele usa uma **apostila impressa em papel**. O celular atua como um professor ao lado: fala as palavras gregas, explica a origem e o significado, instrui o aluno a escrever no papel e aguarda a confirmação manual antes de avançar.

O canal de validação da escrita é **o próprio papel** — o app não valida o traçado (isso já é papel do CanvasPage existente). O app entrega **input auditivo + visual + instrução sequencial**, ativando múltiplos canais de memória simultaneamente.

### 1.2 Problema que Resolve

- O aluno não tem como usar o app e escrever no papel ao mesmo tempo de forma coordenada
- A apostila impressa fica desconectada da experiência digital
- Falta um modo "professor ao vivo" que narre e instrua passo a passo
- A escrita manual no papel (motor skill) não está integrada ao fluxo de aprendizado

### 1.3 Proposta de Valor

**"Imprima a apostila, abra o app, estude como se tivesse um professor ao seu lado."**

| Canal | O que faz |
|---|---|
| **Mão** | Escreve no papel (motor skill, memória muscular) |
| **Ouvido** | Ouve o professor narrar via áudio (input auditivo) |
| **Olho** | Vê a palavra na tela + na apostila (input visual duplo) |
| **Voz** | Repete em voz alta quando solicitado pelo app (output oral) |

### 1.4 Integração com o Sistema Existente

Esta feature se encaixa como uma **trilha paralela**, exatamente como `HistoryTrailPage` e `VocabTrailPage` já funcionam. Não altera nenhuma funcionalidade existente. Adiciona:

- 2 novas páginas (`ApostilaPage`, `ApostilaSessionPage`)
- 1 novo componente principal (`WriteCounter`)
- Extensões no `progressStore`, `gamificationStore`, Firestore schema e SQLite schema
- Entrada no `ActivitiesPage` (`/review`) como novo card

---

## 2. ARQUITETURA DA FUNCIONALIDADE

### 2.1 Localização no Projeto

```
src/
├── features/
│ └── apostila/ # Feature principal
│ ├── apostilaTypes.ts # Interfaces TS
│ ├── useApostilaSession.ts # Hook de sessão
│ └── tools/ # Ferramentas de build
│ ├── apostilaParser.ts # Converte `.apostila.md` → `ApostilaLesson[]`
│ └── apostilaCodegen.ts # Gera PDF da apostila
├── ui/
│ ├── pages/
│ │ └── apostila/
│ │ ├── ApostilaPage.tsx # Seleção de lição
│ │ └── ApostilaSessionPage.tsx # Sessão ativa
│ └── components/
│ └── WriteCounter.tsx # Componente de contagem
└── content/
└── apostila/
└── lessons.ts # Conteúdo parseado (gerado)
```

### 2.2 Fluxo de Assets e Build
```mermaid
flowchart TD
    A[WikiProjeto/ModulosApostila/*.apostila.md] -->|apostilaParser.ts| B[src/content/apostila/lessons.ts]
    B --> C[App React: ApostilaPage/Sessão]
    B --> D[apostilaCodegen.ts]
    D --> E[/assets/apostila-koineapp.pdf]
    G[Geração Áudio Piper TTS] --> H[public/audio/apostila/*]
    H --> C
    H -.->|Web Speech API fallback| C
```

> **Detalhes técnicos**:
> - **Build pipeline**: Rodar `npm run generate:apostila` → parseia `.apostila.md` para `lessons.ts`
> - **Geração áudio**: Piper TTS é executado em CI/CD para criar áudios para `narration` e `greekForm`
> - **PDF**: `apostilaCodegen.ts` usa Puppeteer/PDFKit para gerar a apostila física correspondente às lições

### 2.2 Fluxo de Dados

```
ApostilaPage
  → Lê ApostilaLesson[] de content/apostila/lessons.ts (estático)
  → Lê progressStore.completedApostilaLessons (quais lições foram concluídas)
  → Renderiza lista de lições com status (novo / feito / bloqueado)

ApostilaSessionPage
  → useApostilaSession(lessonId)
    → Carrega ApostilaLesson de content/apostila/lessons.ts
    → Controla currentStepIndex (state local)
    → Dispara áudio via AudioEngine (reutilizado do sistema existente)
    → Ao completar:
      → progressStore.markApostilaLessonComplete(lessonId)
      → useGamificationActions.onApostilaComplete(xpReward)
      → syncToFirestore()
```

### 2.3 Roteamento

Adicionar ao `App.tsx` (junto com as rotas existentes):

```tsx
<Route path="/apostila" component={ApostilaPage} />
<Route path="/apostila/:lessonId" component={ApostilaSessionPage} />
```

Acessado via `ActivitiesPage` (`/review`) — novo card "Estudo com Apostila".

---

## 3. TIPOS TYPESCRIPT

### 3.1 Arquivo: `src/features/apostila/apostilaTypes.ts`

```typescript
/**
 * Tipo da etapa da sessão
 */
export type ApostilaStepType =
| 'intro'
| 'word_intro'
| 'write_practice'
| 'dictation'
| 'alphabet_trace'
| 'read_aloud'
| 'pause'
| 'illustration'; // NOVA: exibe ilustração da apostila física

/**
 * Etapas extendidas para integração com apostila física
 */
export interface ApostilaStep {
  id: string;
  type: ApostilaStepType;

  /**
   * Texto que o professor narra em áudio.
   * Se audioUrl for fornecido, usa o arquivo. Caso contrário, usa TTS com este texto.
   * Sempre presente.
   */
  narration: string;

  /**
   * URL do arquivo de áudio pré-gravado (relativo a /audio/apostila/).
   * Se ausente, usa TTS (Web Speech API) com o texto de `narration`.
   * Exemplo: 'apostila-L01-step-01.mp3'
   */
  audioUrl?: string;

  /**
   * Texto exibido na área central da tela (pode ser diferente do narrado).
   * Para etapas 'intro' e 'pause', é o texto de instrução principal.
   */
  displayText?: string;

  // --- Campos de conteúdo grego (usados em word_intro, write_practice, dictation, alphabet_trace) ---

  /** A palavra ou letra grega. Exemplo: 'ἀγάπη', 'α' */
  greekForm?: string;

  /** Transliteração latina. Exemplo: 'agápē', 'alpha' */
  transliteration?: string;

  /** Pronúncia fonética legível. Exemplo: 'a-GÁ-pe' */
  pronunciation?: string;

  /** Tradução em português. Exemplo: 'amor' */
  translation?: string;

  /** Breve origem/etimologia exibida como nota de rodapé da etapa. Exemplo: 'Do proto-grego *ἀγαπάω* (amar)' */
  etymology?: string;

  /** Versículo do NT onde a palavra aparece, para contextualizar. Exemplo: 'João 3:16' */
  contextVerse?: string;

  /** Texto do versículo em português, exibido abaixo do contexto. */
  contextVerseText?: string;

  // --- Campos de write_practice ---

  /** Quantas vezes o aluno deve escrever no papel. Default: 8 */
  writeRepetitions?: number;

  /** Instrução específica para esta prática. Exemplo: 'Use a linha 3 da sua apostila.' */
  writeInstruction?: string;

  // --- Campos de dictation ---

  /**
   * Se true, após o aluno clicar "Revelar", exibe a forma grega correta.
   * Permite autoconferência no papel. Default: true.
   */
  revealAfterConfirm?: boolean;

  // --- Campos de alphabet_trace ---

  /**
   * Se true, exibe animação de ordem dos traços.
   */
  showStrokeOrder?: boolean;

  // --- Campos de integração com pipeline ---

  /**
   * Identificador da ilustração para inserção na apostila física.
   * Usado por `apostilaCodegen.ts` para buscar SVG/imagem em `/assets/illustrations/`.
   */
  illustrationId?: string;

  /**
   * Versão do conteúdo. Usado para migrações automáticas.
   * Padrão: 1.0
   */
  version?: string;

  // --- Controle de UI ---

  /**
   * Se true, exibe badge "✏️ Escreva no papel" na tela.
   * Automático para write_practice e dictation, mas pode ser forçado.
   */
  showPaperBadge?: boolean;

  /**
   * Se true, exibe badge "🔊 Repita em voz alta" na tela.
   * Automático para read_aloud.
   */
  showVoiceBadge?: boolean;

  /**
   * Se true, exibe a forma grega em tamanho grande (72px) no centro da tela.
   * Default true para word_intro, false para intro/pause.
   */
  showGreekLarge?: boolean;
}

export interface ApostilaLesson {
  id: string;                     // Exemplo: 'apostila-L01'
  lessonNumber: number;           // Número sequencial exibido na UI: 1, 2, 3...
  title: string;                  // Exemplo: 'Lição 1 — As Primeiras Vogais'
  description: string;            // Subtítulo exibido no card da lista
  apostilaPdfPage: number;        // Página correspondente na apostila impressa (para referência na UI)
  xpReward: number;               // XP concedido ao concluir
  estimatedMinutes: number;       // Tempo estimado exibido no card
  steps: ApostilaStep[];          // Sequência de etapas

  /**
   * Se true, esta lição exige que a anterior tenha sido completada.
   * A lição apostila-L01 nunca é bloqueada.
   */
  requiresPrevious?: boolean;
}

/** Estado interno da sessão (gerenciado pelo hook useApostilaSession) */
export interface ApostilaSessionState {
  lesson: ApostilaLesson;
  currentStepIndex: number;
  currentStep: ApostilaStep;
  totalSteps: number;
  progressPercent: number;        // 0-100
  writeCount: number;             // Repetições escritas na etapa atual
  isDictationRevealed: boolean;   // Se o ditado já foi revelado
  isCompleted: boolean;           // Se a lição foi concluída
  isAudioPlaying: boolean;
}
```

---

## 4. CONTEÚDO ESTÁTICO DAS LIÇÕES

> **Pipeline Integrado**: Os dados de lições serão:
> - Criados em arquivos `.apostila.md` pela equipe de conteúdo
> - Parseados por `apostilaParser.ts` → gerando `APOSTILA_LESSONS.ts`
> - Usados no app + para gerar apostila PDF

### 4.1 Estrutura de Mock Inicial (Fase 1)
**Arquivo:** `src/content/apostila/lessons.ts`

```typescript
import { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_LESSONS: ApostilaLesson[] = [
  // Lição mock para desenvolvimento
  {
    id: 'apostila-MOCK-L01',
    lessonNumber: 1,
    title: '[MOCK] Primeiras Vogais',
    description: 'Introdução ao alfabeto grego',
    apostilaPdfPage: 1,
    xpReward: 30,
    steps: [
      {
        id: 'mock-01',
        type: 'intro',
        narration: 'Bem-vindo à primeira lição!',
        displayText: 'Liçao mock para desenvolvimento',
        audioUrl: 'apostila-MOCK/intro.mp3',
      }
    ]
  }
];
```

### 4.2 Formato `.apostila.md` (Nova Fonte de Conteúdo)
**Diretório:** `WikiProjeto/ModulosApostila/`

Exemplo de arquivo `L01.apostila.md`:
```markdown
---
APOSTILA: L01
TITLE: Lição 1 - Vogais Gregas
PDF_PAGE: 1
---

# Α α — Alfa
| TYPE | GREGO | TRANSLIT | PRONÚNCIA | TRADUÇÃO |
|------|-------|----------|-----------|-----------|
| word_intro | Α α | Alpha | ah | Vogal A |

- **ETIMOLOGIA**: Do protosemítico *ʾalp*
- **DITADO**: Escreva Α 5 vezes

```typescript
import { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_LESSONS: ApostilaLesson[] = [
  // --- BLOCO 1: ALFABETO (L01–L06) ---
  // Cada lição cobre 4 letras.
  // Estrutura de etapas para cada letra dentro do bloco:
  //   1. intro (narração do bloco/lição)
  //   2. word_intro × 4 (apresentar cada letra: nome, som, maiúscula, minúscula)
  //   3. alphabet_trace × 4 (treino de traçado de cada letra)
  //   4. write_practice × 4 (escrever cada letra 8× no papel)
  //   5. pause (revisar o que escreveu antes de continuar)
  //   6. dictation × 4 (professor fala o nome da letra, aluno escreve no papel)

  {
    id: 'apostila-L01',
    lessonNumber: 1,
    title: 'Lição 1 — As Primeiras Vogais',
    description: 'Alpha, Epsilon, Eta, Iota',
    apostilaPdfPage: 1,
    xpReward: 30,
    estimatedMinutes: 10,
    requiresPrevious: false,
    steps: [
      {
        id: 'apostila-L01-S01',
        type: 'intro',
        narration: 'Bem-vindo à Lição 1. Hoje você vai aprender as quatro primeiras vogais do alfabeto grego: Alfa, Épsilon, Eta e Iota. Abra sua apostila na página 1 e acompanhe comigo.',
        displayText: 'Abra sua apostila na Página 1',
        showGreekLarge: false,
      },
      {
        id: 'apostila-L01-S02',
        type: 'word_intro',
        narration: 'A primeira letra é o Alfa. Maiúsculo: Α. Minúsculo: α. O som é "a", como em "pai".',
        displayText: 'Alfa — a primeira letra do alfabeto grego',
        greekForm: 'Α α',
        transliteration: 'Alpha',
        pronunciation: 'a (como em "pai")',
        translation: 'Letra Alpha',
        etymology: 'Originou o "A" do alfabeto latino e hebraico (Alef)',
        contextVerse: 'Apocalipse 1:8',
        contextVerseText: '"Eu sou o Alfa e o Ômega" — Deus usa esta letra para se identificar como o princípio',
        showGreekLarge: true,
      },
      {
        id: 'apostila-L01-S03',
        type: 'alphabet_trace',
        narration: 'Observe a ordem dos traços do Alfa. Primeiro o traço diagonal esquerdo, depois o diagonal direito, depois o traço horizontal do meio.',
        greekForm: 'α',
        showStrokeOrder: true,
        showPaperBadge: false,
      },
      {
        id: 'apostila-L01-S04',
        type: 'write_practice',
        narration: 'Agora escreva o Alpha minúsculo oito vezes na linha 1 da sua apostila. Clique em "Feito" cada vez que escrever uma letra.',
        greekForm: 'α',
        transliteration: 'alpha',
        writeRepetitions: 8,
        writeInstruction: 'Linha 1 da apostila — Alpha minúsculo (α)',
        showPaperBadge: true,
        showGreekLarge: true,
      },
      // ... (padrão se repete para Ε ε, Η η, Ι ι)
      {
        id: 'apostila-L01-S05',
        type: 'pause',
        narration: 'Ótimo! Você escreveu as quatro vogais. Antes de continuar, olhe para o que escreveu e compare com o modelo na apostila. Quando estiver pronto, continue.',
        displayText: 'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
        showGreekLarge: false,
      },
      {
        id: 'apostila-L01-S06',
        type: 'dictation',
        narration: 'Ditado! Eu vou falar o nome de uma letra em grego e você escreve no papel sem olhar para a tela. Preparado?',
        displayText: 'Escreva no papel o que ouvir.\nNão olhe para a tela!',
        showPaperBadge: true,
        showGreekLarge: false,
        revealAfterConfirm: true,
      },
      // etapas de ditado individuais para cada letra (greekForm revelado após confirmação)
    ],
  },

  // --- BLOCO 2: CONSOANTES (L02–L06) ---
  // Mesmo padrão do Bloco 1, cobrindo as consoantes em grupos de 4.

  // --- BLOCO 3: VOCABULÁRIO ESSENCIAL (L07–L16) ---
  // 5 palavras por lição, foco em significado + escrita + contexto bíblico.
  // Estrutura de etapas:
  //   1. intro (apresenta o tema da lição, ex: "palavras de fé")
  //   2. word_intro × 5 (palavra grega, significado, versículo de contexto)
  //   3. write_practice × 5 (escrever a palavra completa 5× no papel)
  //   4. pause (reler as palavras escritas)
  //   5. dictation × 5 (professor fala o significado em PT, aluno escreve a palavra grega)

  {
    id: 'apostila-L07',
    lessonNumber: 7,
    title: 'Lição 7 — Palavras de Fé',
    description: 'ἀγάπη, πίστις, χάρις, εἰρήνη, ζωή',
    apostilaPdfPage: 7,
    xpReward: 40,
    estimatedMinutes: 12,
    requiresPrevious: true,
    steps: [
      {
        id: 'apostila-L07-S01',
        type: 'intro',
        narration: 'Lição 7 — Palavras de fé. Hoje você vai aprender cinco das palavras mais importantes de todo o Novo Testamento: ágape, pístis, cháris, eirene e zoe. Estas palavras aparecem centenas de vezes nas cartas do apóstolo Paulo.',
        displayText: 'Abra sua apostila na Página 7',
        showGreekLarge: false,
      },
      {
        id: 'apostila-L07-S02',
        type: 'word_intro',
        narration: 'A primeira palavra é ἀγάπη — agápē. Pronuncie: a-GÁ-pe. Significa amor — mas não qualquer amor. É o amor incondicional, que escolhe o bem do outro independentemente de sentimentos.',
        greekForm: 'ἀγάπη',
        transliteration: 'agápē',
        pronunciation: 'a-GÁ-pe',
        translation: 'amor incondicional',
        etymology: 'Do verbo ἀγαπάω (agapaō), amar com escolha e devoção',
        contextVerse: 'João 3:16',
        contextVerseText: '"Porque Deus amou (ἠγάπησεν) o mundo de tal maneira..."',
        showGreekLarge: true,
        showVoiceBadge: true,
      },
      {
        id: 'apostila-L07-S03',
        type: 'write_practice',
        narration: 'Agora escreva ἀγάπη cinco vezes na linha 1 da sua apostila. Pronuncie em voz alta cada vez que escrever: a-GÁ-pe.',
        greekForm: 'ἀγάπη',
        transliteration: 'agápē',
        pronunciation: 'a-GÁ-pe',
        translation: 'amor incondicional',
        writeRepetitions: 5,
        writeInstruction: 'Linha 1 da apostila — ἀγάπη',
        showPaperBadge: true,
        showVoiceBadge: true,
        showGreekLarge: true,
      },
      // ... (padrão se repete para as demais 4 palavras)
      {
        id: 'apostila-L07-S09',
        type: 'dictation',
        narration: 'Ditado final. Eu vou falar o significado em português e você escreve a palavra grega no papel. Vamos lá: escreva a palavra grega para "amor incondicional".',
        displayText: '"amor incondicional"',
        greekForm: 'ἀγάπη',
        revealAfterConfirm: true,
        showPaperBadge: true,
        showGreekLarge: false,
      },
      // ... (padrão se repete para as demais 4 palavras)
    ],
  },

  // --- BLOCO 4: FRASES DO NT (L17–L20) ---
  // Frases curtas reais do Novo Testamento grego.
  // Estrutura de etapas:
  //   1. intro (contexto da frase: quem disse, onde está no NT)
  //   2. word_intro × N (cada palavra da frase individualmente)
  //   3. pause (ler a frase completa na apostila)
  //   4. write_practice (copiar a frase inteira 3× no papel)
  //   5. read_aloud (professor lê, aluno repete)
  //   6. dictation (professor fala frase inteira, aluno escreve)
];
```

> **Nota para o LLM:** O conteúdo acima é uma **especificação da estrutura**. O conteúdo real de cada lição (todas as letras, todas as palavras, todas as frases) deve ser gerado seguindo exatamente estes padrões. Os campos obrigatórios por tipo de etapa estão definidos na seção 3.1.

---

## 5. HOOK DE SESSÃO

### 5.1 Arquivo: `src/features/apostila/useApostilaSession.ts`

```typescript
/**
 * useApostilaSession
 *
 * Controla toda a lógica de estado da sessão ApostilaCoach.
 * Gerencia:
 * - Qual etapa está ativa (currentStepIndex)
 * - Contagem de repetições de escrita (writeCount)
 * - Estado do ditado (revelado ou não)
 * - Reprodução de áudio (via AudioEngine existente ou TTS nativo)
 * - Conclusão da lição (hooks de gamificação e progresso)
 *
 * NÃO gerencia:
 * - Renderização (responsabilidade de ApostilaSessionPage)
 * - Validação da escrita no papel (não é responsabilidade do app)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { APOSTILA_LESSONS } from '../../content/apostila/lessons';
import { ApostilaSessionState, ApostilaLesson } from './apostilaTypes';
import { useProgressStore } from '../progress/progressStore';
import { useGamificationActions } from '../gamification/useGamificationActions';

export function useApostilaSession(lessonId: string) {
  const lesson = APOSTILA_LESSONS.find(l => l.id === lessonId);
  const { markApostilaLessonComplete } = useProgressStore();
  const { onApostilaComplete } = useGamificationActions();
  const ttsRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [writeCount, setWriteCount] = useState(0);
  const [isDictationRevealed, setIsDictationRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  if (!lesson) return null;

  const currentStep = lesson.steps[currentStepIndex];
  const totalSteps = lesson.steps.length;
  const progressPercent = Math.round((currentStepIndex / totalSteps) * 100);

  /**
   * playNarration
   *
   * Toca o áudio da etapa atual.
   * Prioridade: audioUrl pré-gravado > TTS nativo (Web Speech API).
   *
   * Para áudio pré-gravado: usa AudioEngine existente (src/features/audio/AudioEngine.ts)
   * Para TTS: usa window.speechSynthesis com voz pt-BR
   *
   * A pronúncia das palavras gregas DEVE usar audioUrl pré-gravado para garantir
   * precisão fonética. TTS apenas para instruções em português.
   */
  const playNarration = useCallback(() => {
    if (currentStep.audioUrl) {
      // TODO: integrar com AudioEngine.playFile(currentStep.audioUrl)
      // AudioEngine já existe em src/features/audio/AudioEngine.ts
      setIsAudioPlaying(true);
    } else {
      // TTS nativo
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentStep.narration);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.onend = () => setIsAudioPlaying(false);
      utterance.onstart = () => setIsAudioPlaying(true);
      ttsRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentStep]);

  // Toca áudio automaticamente ao mudar de etapa
  useEffect(() => {
    playNarration();
    // Resetar estados locais da etapa
    setWriteCount(0);
    setIsDictationRevealed(false);
  }, [currentStepIndex]);

  /**
   * incrementWriteCount
   *
   * Chamado cada vez que o aluno clica "Feito" durante write_practice ou alphabet_trace.
   * Ao atingir writeRepetitions, avança automaticamente para a próxima etapa após 1.5s.
   */
  const incrementWriteCount = useCallback(() => {
    const target = currentStep.writeRepetitions ?? 8;
    const newCount = writeCount + 1;
    setWriteCount(newCount);

    if (newCount >= target) {
      // Haptic leve (ImpactStyle.Light) + som de confirmação
      // TODO: Haptics.impact({ style: ImpactStyle.Light })
      setTimeout(() => advanceStep(), 1500);
    }
  }, [writeCount, currentStep]);

  /**
   * revealDictation
   *
   * Chamado quando o aluno clica "Revelar" em etapas de ditado.
   * Exibe a forma grega na tela para conferência manual no papel.
   */
  const revealDictation = useCallback(() => {
    setIsDictationRevealed(true);
  }, []);

  /**
   * advanceStep
   *
   * Avança para a próxima etapa ou conclui a lição se for a última.
   * Deve ser chamado:
   * - Após write_practice completar as repetições (automático)
   * - Ao clicar "Continuar" em intro, word_intro, pause, read_aloud
   * - Ao clicar "Continuar" em dictation após revelar
   */
  const advanceStep = useCallback(() => {
    if (currentStepIndex >= totalSteps - 1) {
      completeLesson();
      return;
    }
    setCurrentStepIndex(prev => prev + 1);
  }, [currentStepIndex, totalSteps]);

  /**
   * completeLesson
   *
   * Marca a lição como completa e dispara gamificação.
   * Mesma sequência usada em LessonPage ao completar uma lição:
   *   1. markApostilaLessonComplete → progressStore
   *   2. onApostilaComplete → gamificationStore (XP + streak + achievements)
   *   3. syncToFirestore (via heartbeat existente)
   */
  const completeLesson = useCallback(async () => {
    setIsCompleted(true);
    window.speechSynthesis.cancel();
    markApostilaLessonComplete(lesson.id);
    await onApostilaComplete(lesson.id, lesson.xpReward);
    // syncToFirestore é disparado pelo heartbeat ou beforeunload existente
  }, [lesson]);

  const state: ApostilaSessionState = {
    lesson,
    currentStepIndex,
    currentStep,
    totalSteps,
    progressPercent,
    writeCount,
    isDictationRevealed,
    isCompleted,
    isAudioPlaying,
  };

  return { state, incrementWriteCount, revealDictation, advanceStep, playNarration };
}
```

---

## 6. EXTENSÕES NO SISTEMA EXISTENTE

### 6.1 `progressStore.ts` — Adicionar campo e método

```typescript
// Em useProgressStore (src/features/progress/progressStore.ts)
// Adicionar ao estado existente:

interface ProgressState {
  // ... campos existentes ...
  completedApostilaLessons: string[];  // IDs das lições concluídas: ['apostila-L01', 'apostila-L02']
}

// Adicionar ao objeto de actions:
markApostilaLessonComplete: (lessonId: string) => void;

// Implementação (dentro do create do Zustand):
markApostilaLessonComplete: (lessonId) =>
  set(state => ({
    completedApostilaLessons: state.completedApostilaLessons.includes(lessonId)
      ? state.completedApostilaLessons
      : [...state.completedApostilaLessons, lessonId]
  })),

// Estado inicial:
completedApostilaLessons: [],
```

### 6.2 `gamificationStore.ts` / `useGamificationActions.ts` — Adicionar action

```typescript
// Em useGamificationActions (src/features/gamification/useGamificationActions.ts)
// Adicionar método:

/**
 * onApostilaComplete
 *
 * Chamado ao concluir uma lição da apostila.
 * Mesma lógica de onLessonComplete, adaptada para a apostila.
 * Concede XP, atualiza streak e verifica conquistas.
 */
async function onApostilaComplete(lessonId: string, xpReward: number): Promise<void> {
  const { addXP, incrementStreak } = useGamificationStore.getState();
  const { completedApostilaLessons } = useProgressStore.getState();

  addXP(xpReward);
  incrementStreak();
  checkAchievements(xpReward);  // função existente
}
```

### 6.3 Firestore Schema — `users/{uid}`

```typescript
// Adicionar ao documento users/{uid} no Firestore:
completedApostilaLessons: string[];  // IDs das lições concluídas

// Em firestore.ts (src/features/auth/firestore.ts):
// Adicionar ao objeto UserProgress:
completedApostilaLessons: string[];

// Em sanitize() (função existente):
completedApostilaLessons: Array.isArray(data.completedApostilaLessons)
  ? data.completedApostilaLessons.slice(0, 50)  // máximo 50 lições
  : [],

// Em hydrateFromFirebase():
if (remote.completedApostilaLessons?.length) {
  remote.completedApostilaLessons.forEach(id =>
    useProgressStore.getState().markApostilaLessonComplete(id)
  );
}
```

### 6.4 Firestore Security Rules — Adicionar campo

```
// Em firestore.rules:
// Adicionar à validação existente:
&& (!('completedApostilaLessons' in request.resource.data) ||
    (request.resource.data.completedApostilaLessons is list &&
     request.resource.data.completedApostilaLessons.size() <= 50))
```

### 6.5 Conquistas — `ACHIEVEMENTS`

```typescript
// Em src/core/constants/achievements.ts
// Adicionar ao array ACHIEVEMENTS:

{
  id: 'apostila_first',
  title: 'Primeiro Estudo com Apostila',
  description: 'Complete a primeira lição da apostila',
  icon: '📄',
  xpReward: 25,
  condition: (progress) => progress.completedApostilaLessons.length >= 1,
},
{
  id: 'apostila_five',
  title: 'Estudante Dedicado',
  description: 'Complete 5 lições da apostila',
  icon: '📚',
  xpReward: 50,
  condition: (progress) => progress.completedApostilaLessons.length >= 5,
},
{
  id: 'apostila_complete',
  title: 'Apostila Completa',
  description: 'Complete todas as lições da apostila',
  icon: '🏛️',
  xpReward: 200,
  condition: (progress) => progress.completedApostilaLessons.length >= 20,
},
```

### 6.6 `ActivitiesPage` — Adicionar card

```tsx
// Em src/ui/pages/activities/ActivitiesPage.tsx
// Adicionar card após o card de História do NT:

<div
  className="..."
  onClick={() => navigate('/apostila')}
>
  <div>📄</div>
  <div>
    <h3>Estudo com Apostila</h3>
    <p>Imprima e estude com seu professor digital</p>
  </div>
  <div>{completedApostilaLessons.length}/20 lições</div>
</div>
```

---

## 7. PÁGINAS

### 7.1 `ApostilaPage` — Seleção de Lição

**Arquivo:** `src/ui/pages/apostila/ApostilaPage.tsx`

**Rota:** `/apostila`

**Responsabilidades:**
- Exibir banner explicativo e botão de download da apostila PDF
- Listar todas as lições agrupadas por bloco
- Exibir status de cada lição: disponível, concluída ou bloqueada
- Navegar para `/apostila/:lessonId` ao selecionar uma lição disponível

**Estado:**
```typescript
const { completedApostilaLessons } = useProgressStore();
// Sem estado local — tudo derivado do conteúdo estático + progressStore
```

**Lógica de desbloqueio:**
```typescript
function isLessonUnlocked(lesson: ApostilaLesson, index: number): boolean {
  if (!lesson.requiresPrevious || index === 0) return true;
  const previousLesson = APOSTILA_LESSONS[index - 1];
  return completedApostilaLessons.includes(previousLesson.id);
}

function getLessonStatus(lesson: ApostilaLesson, index: number): 'available' | 'completed' | 'locked' {
  if (completedApostilaLessons.includes(lesson.id)) return 'completed';
  if (isLessonUnlocked(lesson, index)) return 'available';
  return 'locked';
}
```

**Layout da tela:**

```
┌─────────────────────────────────┐
│ ← Estudo com Apostila           │
├─────────────────────────────────┤
│  📄 Banner explicativo          │
│  "Imprima a apostila e use com  │
│   seu professor digital"        │
│  [ Baixar Apostila PDF ]        │
├─────────────────────────────────┤
│  Bloco 1 — Alfabeto             │
│  ┌──────────────────────────┐   │
│  │ ✅ Lição 1 · Alpha...   │   │  ← status: completed (verde)
│  │ ▶ Lição 2 · Beta...     │   │  ← status: available (azul)
│  │ 🔒 Lição 3 · Gamma...   │   │  ← status: locked (cinza)
│  └──────────────────────────┘   │
│                                 │
│  Bloco 2 — Vocabulário          │
│  ┌──────────────────────────┐   │
│  │ 🔒 Lição 7 · Palavras...│   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

**Card de lição:**
- Ícone de status (✅ / ▶ / 🔒)
- Número + Título da lição
- Descrição (palavras cobertas)
- Tempo estimado + XP
- Ao clicar lição bloqueada: Toast "Complete a lição anterior primeiro"

---

### 7.2 `ApostilaSessionPage` — Sessão Ativa

**Arquivo:** `src/ui/pages/apostila/ApostilaSessionPage.tsx`

**Rota:** `/apostila/:lessonId`

**Responsabilidades:**
- Renderizar a etapa atual da sessão baseado em `state.currentStep.type`
- Exibir barra de progresso global da lição
- Controlar o botão de ação principal (que muda conforme o tipo de etapa)
- Exibir a tela de conclusão ao final

**Estado:**
```typescript
const { lessonId } = useParams<{ lessonId: string }>();
const session = useApostilaSession(lessonId);
// session pode ser null se lessonId inválido → redirecionar para /apostila
```

**Layout base (todas as etapas compartilham este scaffold):**

```
┌─────────────────────────────────┐
│ ←  Lição 1 — As Primeiras Vogais│
│ ████████████░░░░░ 6/12          │  ← barra de progresso
├─────────────────────────────────┤
│                                 │
│  [Área de conteúdo variável]    │
│  (varia por tipo de etapa)      │
│                                 │
├─────────────────────────────────┤
│  [Badges contextuais]           │
│  ✏️ Escreva no papel  🔊 Repita │
├─────────────────────────────────┤
│  [Botão de ação principal]      │
│  (varia por tipo de etapa)      │
└─────────────────────────────────┘
```

**Renderização por tipo de etapa (`renderStepContent`):**

```tsx
function renderStepContent(step: ApostilaStep, state: ApostilaSessionState) {
  switch (step.type) {
    case 'intro':
    case 'pause':
      return (
        // Texto de instrução centralizado, sem palavra grega grande
        // Ícone temático (📖 para intro, ⏸️ para pause)
        <IntroStepContent step={step} />
      );

    case 'word_intro':
      return (
        // Palavra grega em fonte SBL Greek, tamanho 72px
        // Transliteração + pronúncia em cinza abaixo
        // Tradução em destaque
        // Card de origem/etimologia (colapsável)
        // Card de versículo de contexto (colapsável)
        <WordIntroContent step={step} />
      );

    case 'alphabet_trace':
      return (
        // Exibe maiúscula e minúscula da letra lado a lado
        // Se showStrokeOrder: exibe animação SVG de ordem dos traços
        // Instrução: "Observe a ordem dos traços"
        <AlphabetTraceContent step={step} />
      );

    case 'write_practice':
      return (
        // Palavra grega grande no topo
        // Instrução de qual linha da apostila usar
        // WriteCounter (componente central — veja seção 8)
        <WritePracticeContent step={step} state={state} />
      );

    case 'dictation':
      return (
        // Antes de revelar: apenas a tradução/significado visível, palavra grega oculta
        // Após revelar (isDictationRevealed): palavra grega aparece com animação
        <DictationContent step={step} state={state} />
      );

    case 'read_aloud':
      return (
        // Frase completa em grego, grande
        // Transliteração abaixo
        // Instrução "Repita em voz alta"
        // Botão 🔊 para ouvir novamente
        <ReadAloudContent step={step} state={state} />
      );
  }
}
```

**Botão de ação principal por tipo:**

| Tipo de etapa | Label do botão | Ação ao clicar |
|---|---|---|
| `intro` | "Começar ▶" | `advanceStep()` |
| `word_intro` | "Entendido, continuar" | `advanceStep()` |
| `alphabet_trace` | "Vou praticar agora" | `advanceStep()` |
| `write_practice` | "✓ Escrevi uma vez" (enquanto writeCount < target) / "Continuar ▶" (quando completo) | `incrementWriteCount()` / `advanceStep()` |
| `dictation` (antes de revelar) | "Revelar resposta" | `revealDictation()` |
| `dictation` (após revelar) | "Continuar ▶" | `advanceStep()` |
| `read_aloud` | "Continuar ▶" | `advanceStep()` |
| `pause` | "Pronto, continuar ▶" | `advanceStep()` |

**Tela de conclusão (`isCompleted === true`):**

```
┌─────────────────────────────────┐
│           🎉                    │
│   Lição 1 concluída!            │
│                                 │
│   Você escreveu:                │
│   • Alpha (α) — 8×              │
│   • Epsilon (ε) — 8×            │
│   • Eta (η) — 8×                │
│   • Iota (ι) — 8×               │
│                                 │
│   +30 XP                        │
│                                 │
│  [ Ir para a Lição 2 ]          │
│  [ Voltar às lições   ]          │
└─────────────────────────────────┘
```

---

## 8. COMPONENTE `WriteCounter`

**Arquivo:** `src/ui/components/WriteCounter.tsx`

**Função:** Exibe o progresso de repetições de escrita no papel. Cada círculo representa uma escrita concluída. Clicável (cada clique = uma escrita confirmada).

**Props:**
```typescript
interface WriteCounterProps {
  total: number;        // Total de repetições (ex: 8)
  current: number;      // Quantas já foram feitas (ex: 3)
  onIncrement: () => void;  // Callback ao clicar "Feito"
  isComplete: boolean;  // Se todas as repetições foram feitas
}
```

**Layout:**

```
○ ○ ● ○ ○ ○ ○ ○    3/8
[  ✓ Escrevi uma vez  ]   ← botão secundário (alternativa ao clique nos círculos)
```

Quando completo:
```
● ● ● ● ● ● ● ●    ✅ Completo!
```

**Comportamento:**
- Cada clique no botão principal (ou nos círculos) preenche um círculo
- Círculo preenchido: cor primária do tema (mesma do ProgressBar existente)
- Círculo vazio: borda cinza
- Ao completar: animação de escala nos círculos + haptic leve
- Após completar: botão "Continuar ▶" aparece (habilitado)

**Implementação:**
```tsx
export function WriteCounter({ total, current, onIncrement, isComplete }: WriteCounterProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Círculos de progresso */}
      <div className="flex gap-2 flex-wrap justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
              i < current
                ? 'bg-primary border-primary scale-110'
                : 'border-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Label de contagem */}
      <span className="text-sm text-gray-500">
        {isComplete ? '✅ Completo!' : `${current} / ${total}`}
      </span>

      {/* Botão de incremento (visível apenas quando não completo) */}
      {!isComplete && (
        <Button
          label="✓ Escrevi uma vez"
          onClick={onIncrement}
          variant="bordered"
          fullWidth
        />
      )}
    </div>
  );
}
```

---

## 9. SISTEMA DE ÁUDIO

### 9.1 Estratégia (Híbrida)

| Conteúdo | Método | Motivo |
|---|---|---|
| Palavras gregas (pronúncia) | Áudio pré-gravado (MP3) | TTS não tem qualidade fonética adequada para grego |
| Narração em português (instruções) | TTS nativo (Web Speech API, pt-BR) | Reduz tamanho do bundle, fácil de manter |
| Frases gregas completas | Áudio pré-gravado | Idem |

### 9.2 Áudio Pré-gravado

- **Localização:** `/audio/apostila/{lessonId}/{stepId}.mp3`
- **Exemplo:** `/audio/apostila/apostila-L07/apostila-L07-S02.mp3`
- **Campo no step:** `audioUrl: 'apostila-L07/apostila-L07-S02.mp3'`
- **Engine:** Reutiliza `AudioEngine.ts` existente via `AudioEngine.playFile(url)`

> **Para o LLM:** O `AudioEngine` em `src/features/audio/AudioEngine.ts` já tem suporte a `playFile(url)`. Verificar a API exata antes de integrar. Se não tiver, adicionar método `playFile(url: string): Promise<void>` que cria um `Audio` element, faz play e aguarda o evento `ended`.

### 9.3 TTS Nativo

```typescript
// Utilitário reutilizável (adicionar em src/core/utils/tts.ts):

export function speakPtBR(text: string, onEnd?: () => void): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.88;      // levemente mais lento para clareza
  utterance.pitch = 1.0;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function cancelTTS(): void {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}
```

---

## 10. DOWNLOAD DA APOSTILA PDF

### 10.1 Geração

A apostila PDF já tem um parser e codegen existentes em `src/tools/apostilaParser` e `src/tools/apostilaCodegen`. O PDF é gerado a partir do conteúdo de `APOSTILA_LESSONS`.

Para cada lição, a apostila impressa deve conter:
- Número e título da lição
- Referência da página
- Linhas pautadas para escrita (8 linhas por exercício de write_practice)
- Modelo da letra/palavra em cinza claro (guide) ao lado das linhas
- Espaço para ditado (linhas em branco sem modelo)

### 10.2 Download

```typescript
// Em ApostilaPage.tsx:
function handleDownloadApostila() {
  const url = '/assets/apostila-koineapp.pdf';
  // Em Capacitor (Android/iOS): usar FileSystem.downloadFile ou Browser.open
  // Na web: window.open(url, '_blank')
  if (Capacitor.isNativePlatform()) {
    Browser.open({ url });
  } else {
    window.open(url, '_blank');
  }
}
```

---

## 11. MAPA DE DEPENDÊNCIAS DA FEATURE

```
ApostilaPage
  → APOSTILA_LESSONS (content estático)
  → useProgressStore.completedApostilaLessons
  → useNavigation → /apostila/:lessonId

ApostilaSessionPage
  → useApostilaSession(lessonId)
    → APOSTILA_LESSONS
    → AudioEngine (áudio pré-gravado)
    → speakPtBR util (TTS)
    → useProgressStore.markApostilaLessonComplete
    → useGamificationActions.onApostilaComplete
      → useGamificationStore.addXP
      → useGamificationStore.incrementStreak
      → checkAchievements()
  → WriteCounter component
  → GreekText component (já existente)
  → ProgressBar component (já existente)
  → Button component (já existente)
  → Haptics (@capacitor/haptics — já usado no CanvasPage)

ActivitiesPage (modificação)
  → Novo card → /apostila

progressStore (modificação)
  → completedApostilaLessons: string[]
  → markApostilaLessonComplete(id)

Firestore users/{uid} (modificação)
  → completedApostilaLessons: string[]
```

---

## 12. CHECKLIST DE IMPLEMENTAÇÃO

### Fase 0: Infraestrutura Base (MVP)
> **Critério**: App funcional com lição mock e integração completa de stores/features.

- [ ] Criar `src/features/apostila/apostilaTypes.ts` (interfaces completas)
- [ ] Criar `src/content/apostila/lessons.ts` com **1 lição mock**
- [ ] Adicionar `completedApostilaLessons: []` ao `progressStore.ts`
- [ ] Adicionar `markApostilaLessonComplete(lessonId)` ao `progressStore`
- [ ] Criar `useGamificationActions.onApostilaComplete(lessonId, xp)`
- [ ] Adicionar 3 conquistas de apostila em `ACHIEVEMENTS.ts`
- [ ] Criar `src/core/utils/tts.ts` (utilitário de fallback)
- [ ] Adicionar `playFile(url)` em `AudioEngine.ts`

### Fase 1: UI Completa
> **Critério**: Telas `/apostila` e `/apostila/LXX` funcionais com lição mock.

- [ ] Criar `src/ui/components/WriteCounter.tsx`
- [ ] Criar `src/ui/pages/apostila/ApostilaPage.tsx`
- [ ] Criar `src/ui/pages/apostila/ApostilaSessionPage.tsx` com todos renders de etapa
- [ ] Adicionar rotas `/apostila` e `/apostila/:lessonId` em `App.tsx`
- [ ] Adicionar card novo em `ActivitiesPage.tsx`

### Fase 2: Pipeline de Conteúdo
> **Critério**: Geração automática de lições e assets.

- [ ] Criar `src/features/apostila/tools/apostilaParser.ts`
- [ ] Criar `src/features/apostila/tools/apostilaCodegen.ts`
- [ ] Adicionar scripts `package.json`:
  ```json
  {
    "scripts": {
      "generate:apostila": "node src/features/apostila/tools/apostilaParser.mjs",
      "generate:audio": "piper --model pt_BR-vits --output public/audio/apostila",
      "build:apostila:pdf": "node src/features/apostila/tools/apostilaCodegen.mjs"
    }
  }
  ```
- [ ] Configurar GitHub Actions para rodar pipeline em push (`/.github/workflows/apostila.yaml`)

### Fase 3: Conteúdo Real
> **Critério**: Substituir mock pela primeira leva de 10 lições.

- [ ] Criar `.apostila.md` para L01-L10 em `WikiProjeto/ModulosApostila/`
- [ ] Gerar áudio Piper TTS para todas as lições
- [ ] Rodar `npm run generate:apostila` → validar estrutura sintática
- [ ] Rodar `npm run build:apostila:pdf` → gerar PDF entregável

### Fase 4: Live Ops
> **Critério**: Feature pronta para usuários.

- [ ] Atualizar `firestore.ts`: extensões `UserProgress` para apostilas
- [ ] Adicionar campo `completedApostilaLessons` às Firestore Security Rules
- [ ] Criar tela promocional "/new-chart" com destaque para apostila
- [ ] Adicionar analytics para métricas de engajamento (time-on-task, retomada)

### Fase 2 — Hook e Lógica

- [ ] Criar `src/features/apostila/useApostilaSession.ts`
- [ ] Criar `src/core/utils/tts.ts` (utilitário TTS)
- [ ] Verificar/adicionar `playFile(url)` no `AudioEngine`

### Fase 3 — Componentes e Páginas

- [ ] Criar `src/ui/components/WriteCounter.tsx`
- [ ] Criar `src/ui/pages/apostila/ApostilaPage.tsx`
- [ ] Criar `src/ui/pages/apostila/ApostilaSessionPage.tsx` com todos os sub-renderers por tipo
- [ ] Adicionar rotas em `App.tsx`
- [ ] Adicionar card em `ActivitiesPage`

### Fase 4 — Sync e Dados

- [ ] Atualizar `firestore.ts`: `sanitize()`, `hydrateFromFirebase()`, `UserProgress` type
- [ ] Atualizar Firestore Security Rules
- [ ] Verificar que o heartbeat existente já captura `completedApostilaLessons` automaticamente (deve capturar via `progressStore.getState()`)

### Fase 5 — Conteúdo

- [ ] Popular `APOSTILA_LESSONS` com todas as 20 lições
- [ ] Gravar áudios MP3 das palavras gregas e colocar em `/audio/apostila/`
- [ ] Gerar apostila PDF e colocar em `/assets/apostila-koineapp.pdf`

---

## 13. NOTAS PARA O LLM IMPLEMENTADOR

1. **Não criar nada em `/review` (ActivitiesPage) além do novo card** — apenas adicionar o card de Apostila à lista existente. Toda a lógica fica em `/apostila`.

2. **`useGamificationActions.onApostilaComplete` deve seguir exatamente o mesmo padrão de `onLessonComplete`** — não reinventar. Copiar e adaptar, removendo as partes específicas de lição (SRS enrollment, por exemplo).

3. **`WriteCounter` é independente** — não tem acesso ao hook, apenas recebe props. A lógica de incrementar e detectar conclusão fica em `useApostilaSession`.

4. **TTS é fallback** — se `step.audioUrl` existir, usar áudio pré-gravado. TTS apenas quando `audioUrl` for undefined/null.

5. **A barra de progresso exibe `currentStepIndex / totalSteps`**, não fases pedagógicas. Cada step é uma unidade de progresso visível.

6. **Desbloqueio de lições** é linear e sequencial — lição N requer lição N-1 concluída. Não há lógica de ciclo como na trilha principal. Exceção: `apostila-L01` (sempre disponível).

7. **Não adicionar ao BottomNav** — ApostilaPage é acessada via ActivitiesPage, igual a HistoryTrailPage e VocabTrailPage. Mesma hierarquia de navegação.

8. **A tela de conclusão não é uma página separada** — é um estado dentro de `ApostilaSessionPage` (`isCompleted === true`) que substitui o conteúdo da etapa atual.

9. **`greekForm` em steps de `dictation` é revelado condicionalmente** via `isDictationRevealed`. Antes de revelar, exibir apenas `translation` ou `displayText`. Após revelar, exibir `greekForm` com animação de fade-in.

10. **Haptics já estão configurados no projeto** (`@capacitor/haptics`). Usar `ImpactStyle.Light` ao completar uma repetição, `ImpactStyle.Medium` ao completar a lição inteira (mesma lógica do CanvasPage).
