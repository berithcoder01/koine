# Plano do Sistema de Áudio Guiado v2
## Baseado em `.narracao.md` + áudio contínuo com cues

> **Premissa:** Cada módulo tem um `.narracao.md` que gera um MP3 único de ~10 min via Piper TTS.
> Precisamos sincronizar esse áudio longo com o progresso em etapas do aluno na app.

---

## 1. Arquitetura Geral

```
┌─────────────────────────────────────────────────────────┐
│                   PIPELINE DE GERAÇÃO                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  WikiProjeto/Modulos/                                    │
│  ├── C1-M01.apostila.md  →  parser     →  dados SQLite  │
│  ├── C1-M01.narracao.md  →  Piper TTS  →  C1-M01.mp3   │
│  └── (gerado manualmente) └── + script →  C1-M01.cues.json│
│                                                          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     AUDIO ENGINE (App)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  public/audio/                                           │
│  └── C1-M01/                                            │
│      ├── C1-M01.mp3         ← áudio completo (~10 min) │
│      └── C1-M01.cues.json   ← timecodes dos marcadores  │
│                                                          │
│  LessonEngine → AudioService → HTMLAudioElement          │
│       │            │                                      │
│       ├── currentCue → seek(startTime) → play → monitor  │
│       │              → pause(endTime) → next             │
│       └── progresso sincronizado                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Formato do Arquivo de Cues

Gerado pelo script Python que também gera o MP3 via Piper. O TTS sabe exatamente quando cada bloco começa e termina.

### `C1-M01.cues.json`

```json
{
  "moduleId": "C1-M01",
  "moduleTitle": "Vogais Base",
  "audioFile": "/audio/C1-M01/C1-M01.mp3",
  "duration": 612.5,
  "narracaoFile": "C1-M01.narracao.md",
  "version": "1.0",

  "cues": [
    {
      "id": "titulo",
      "marker": "TITULO",
      "text": "Vogais Base",
      "startTime": 0.0,
      "endTime": 2.8,
      "pauseAfter": 2.0
    },
    {
      "id": "introducao",
      "marker": "INTRODUCAO",
      "text": "Bem vindo ao primeiro módulo...",
      "startTime": 4.8,
      "endTime": 48.2,
      "pauseAfter": 1.0
    },
    {
      "id": "u1_unidade",
      "marker": "UNIDADE",
      "text": "Unidade 1 — Letra Alfa",
      "startTime": 49.8,
      "endTime": 53.5,
      "pauseAfter": 1.0
    },
    {
      "id": "u1_exposicao",
      "marker": "EXPOSICAO",
      "text": "Alfa é a primeira letra do alfabeto grego...",
      "startTime": 54.5,
      "endTime": 98.3,
      "pauseAfter": 0.5
    },
    {
      "id": "u1_dica",
      "marker": "DICA",
      "text": "Alfa se parece com o nosso A...",
      "startTime": 98.8,
      "endTime": 106.1,
      "pauseAfter": 1.5
    },
    {
      "id": "u1_versiculo",
      "marker": "VERSICULO",
      "text": "Eu sou o Alfa e o Ômega...",
      "startTime": 107.6,
      "endTime": 122.0,
      "pauseAfter": 1.5
    },
    {
      "id": "u1_p1_pergunta",
      "marker": "PERGUNTA",
      "text": "Qual é o som da letra Alfa?",
      "startTime": 124.0,
      "endTime": 130.5,
      "pauseAfter": 0.5
    },
    {
      "id": "u1_p1_opcoes",
      "marker": "OPCOES",
      "text": "Opção 1: a como em pai...",
      "startTime": 131.0,
      "endTime": 140.2,
      "pauseAfter": 0.5
    },
    {
      "id": "u1_p1_pausa",
      "marker": "PAUSA",
      "text": "",
      "startTime": 141.0,
      "endTime": 146.0,
      "pauseAfter": 0.0
    },
    {
      "id": "u1_p1_resposta",
      "marker": "RESPOSTA",
      "text": "A resposta correta é a Opção 1...",
      "startTime": 146.0,
      "endTime": 162.8,
      "pauseAfter": 2.0
    }
  ],

  "groups": [
    {
      "id": "phase1_u1",
      "unitId": "C1-M01-U01",
      "unitTitle": "Letra Alfa",
      "lessonPhase": "exposure",
      "cues": ["u1_unidade", "u1_exposicao", "u1_dica", "u1_versiculo"],
      "autoAdvance": true
    },
    {
      "id": "phase2_u1_p1",
      "unitId": "C1-M01-U01",
      "lessonPhase": "exercise",
      "exerciseType": "multiple_choice",
      "cues": ["u1_p1_pergunta", "u1_p1_opcoes", "u1_p1_pausa", "u1_p1_resposta"],
      "autoAdvance": false
    }
  ]
}
```

### Como o script Python pode gerar os timecodes

Modificação no script atual que chama o Piper:

```python
def generate_audio_with_cues(narracao_path, output_dir):
    """Gera MP3 + cues.json a partir do .narracao.md"""
    chunks = parse_narration(open(narracao_path).read())
    cues = []
    current_time = 0.0

    for marker, content in chunks:
        # Gera WAV deste bloco via Piper
        wav_data = piper_tts(content, voice="pt_BR")

        # Salva WAV temporário
        wav_path = f"/tmp/{marker}_{hash(content)}.wav"
        wav_path.write_bytes(wav_data)

        # Obtém duração do WAV
        duration = get_wav_duration(wav_data)  # em segundos

        cue = {
            "id": slugify(marker + "_" + content[:20]),
            "marker": marker,
            "text": content,
            "startTime": round(current_time, 1),
            "endTime": round(current_time + duration, 1),
            "pauseAfter": NARRATION_MARKERS.get(marker, {}).get("pause_after", 0.5),
        }
        cues.append(cue)

        # Concatena ao MP3 final
        append_to_output(wav_path, output_mp3)

        current_time += duration
        # Se o marcador tem pause_after, adiciona silêncio
        pause = NARRATION_MARKERS.get(marker, {}).get("pause_after", 0)
        if pause > 0:
            append_silence(pause, output_mp3)
            current_time += pause

    # Salva cues.json
    json.dump({"moduleId": "...", "audioFile": "...", "cues": cues, "groups": build_groups(cues)}, f)
```

**Se o áudio já foi gerado sem timecodes**, duas alternativas:

| Alternativa | Ação | Precisão |
|-------------|------|----------|
| **Re-parse com duração estimada** | Estimativa por caractere (chars/15) | ~Baixa (±2s) |
| **Silence Detection** | Script Python que detecta silêncios >0.5s no MP3 e mapeia aos marcadores | ~Média (±0.3s) |
| **Regenerar com cues** | Rodar Piper novamente com o script modificado | ~Alta (±0.1s) |

**Recomendação:** Regenerar com o script modificado, já que o Piper é rápido.

---

## 3. AudioEngine (App)

### 3.1 Serviço Central

```
src/features/audio/
├── AudioEngine.ts       # Singleton: carrega cues, faz seek, monitora
├── useGuidedAudio.ts    # Hook React para LessonEngine
├── types.ts             # Cue, CueGroup, AudioState
└── __tests__/
```

### 3.2 API Pública

```typescript
// types.ts
interface Cue {
  id: string;
  marker: string;
  text: string;
  startTime: number;
  endTime: number;
  pauseAfter: number;
}

interface CueGroup {
  id: string;
  unitId?: string;
  lessonPhase: 'exposure' | 'exercise';
  cues: string[];          // IDs dos cues nesta etapa
  autoAdvance: boolean;
}

interface ModuleAudio {
  moduleId: string;
  audioFile: string;
  duration: number;
  cues: Cue[];
  groups: CueGroup[];
}

// AudioEngine.ts
class AudioEngine {
  private static instance: AudioEngine;
  private audio: HTMLAudioElement | null = null;
  private moduleAudio: ModuleAudio | null = null;
  private currentCueIndex: number = -1;
  private animFrameId: number | null = null;
  private enabled: boolean;

  // Carrega módulo (cues.json + mp3)
  async loadModule(moduleId: string): Promise<void>;

  // Toca um cue específico pelo ID
  async playCue(cueId: string): Promise<void>;

  // Toca a sequência completa de um grupo
  async playGroup(groupId: string): Promise<void>;

  // Pausa
  pause(): void;

  // Para tudo e reseta
  stop(): void;

  // Callbacks
  onCueEnd?: (cueId: string) => void;
  onGroupEnd?: (groupId: string) => void;
  onError?: (error: AudioError) => void;

  // Monitoramento interno
  private monitorProgress(): void;
  private seekTo(time: number): void;
}
```

### 3.3 Hook: `useGuidedAudio`

```typescript
// useGuidedAudio.ts
function useGuidedAudio(moduleId: string) {
  const engine = AudioEngine.getInstance();

  useEffect(() => {
    engine.loadModule(moduleId);
    return () => engine.stop();
  }, [moduleId]);

  return {
    playCue: (id: string) => engine.playCue(id),
    playGroup: (id: string) => engine.playGroup(id),
    pause: () => engine.pause(),
    stop: () => engine.stop(),
    isPlaying: boolean,
    currentCue: Cue | null,
    currentGroup: CueGroup | null,
    progress: number, // 0-1 dentro do cue atual
  };
}
```

### 3.4 Integração com LessonEngine

```typescript
// LessonPage.tsx (pseudo-código)
function LessonPage() {
  const { playGroup, stop, currentCue } = useGuidedAudio(moduleId);
  const [unitIndex, setUnitIndex] = useState(0);
  const [phase, setPhase] = useState<'exposure' | 'exercise'>('exposure');

  // Ao entrar na exposição da unidade:
  useEffect(() => {
    playGroup(`phase1_u${unitIndex + 1}`);
  }, [unitIndex, phase]);

  // Quando o grupo de áudio termina:
  const handleGroupEnd = (groupId: string) => {
    if (groupId.startsWith('phase1_')) {
      // Habilita botão "Continuar" (exposição terminou)
      setCanContinue(true);
    }
  };

  // Indicador visual de áudio tocando
  {currentCue && (
    <AudioIndicator marker={currentCue.marker} isPlaying={isPlaying} />
  )}
}
```

### 3.5 Mapeamento Marcador → Comportamento na App

| Marcador | Evento na App | Ação do AudioEngine |
|----------|--------------|---------------------|
| `[TITULO]` | Mostra título do módulo | play("titulo"), ao fim, avança |
| `[INTRODUCAO]` | Mostra texto de boas-vindas | play("introducao"), ao fim, avança |
| `[UNIDADE]` | Transição de unidade | play("u1_unidade"), mostra próxima unidade |
| `[EXPOSICAO]` | Mostra conteúdo principal | play("u1_exposicao"), texto sync com áudio |
| `[DICA]` | Mostra dica mnemônica | play("u1_dica") |
| `[VERSICULO]` | Mostra versículo | play("u1_versiculo") |
| `[PERGUNTA]` | Renderiza exercício | play("u1_p1_pergunta") |
| `[OPCOES]` | Mostra opções na tela | play("u1_p1_opcoes") |
| `[PAUSA]` | Aguarda resposta do usuário | pause(), habilita input |
| `[RESPOSTA]` | Mostra feedback | play("u1_p1_resposta"), ao fim avança |
| `[TRANSICAO]` | Animação de transição | play("transicao") |
| `[FINALIZACAO]` | Tela de resumo | play("finalizacao") |

---

## 4. Estrutura de Diretórios Final

```
public/audio/
├── C1-M01/
│   ├── C1-M01.mp3           ← Áudio completo (~10 min, ~5 MB)
│   └── C1-M01.cues.json     ← Metadados com timecodes
├── C1-M02/
│   ├── C1-M02.mp3
│   └── C1-M02.cues.json
├── C1-M03/
│   ├── C1-M03.mp3
│   └── C1-M03.cues.json
├── ...
├── C2-M01/
│   ├── C2-M01.mp3
│   └── C2-M01.cues.json
└── manifest.json             ← Índice geral (gerado pelo script TypeScript)
```

### manifest.json

```json
{
  "version": "2.0",
  "modules": [
    {
      "moduleId": "C1-M01",
      "title": "Vogais Base",
      "audioFile": "/audio/C1-M01/C1-M01.mp3",
      "cuesFile": "/audio/C1-M01/C1-M01.cues.json",
      "duration": 612.5,
      "totalCues": 45,
      "totalGroups": 15
    }
  ]
}
```

---

## 5. Scripts

### 5.1 Python — Gerar cues.json durante TTS (modificar pipeline existente)

Inserir no script Python que chama o Piper:

```python
# Durante a geração do áudio, para cada bloco do .narracao.md:
cue = {
    "id": slugify(marker + "_" + content[:30]),
    "marker": marker,
    "text": content,
    "startTime": round(current_time, 1),
    "endTime": round(current_time + duration, 1),
    "pauseAfter": NARRATION_MARKERS.get(marker, {}).get("pause_after", 0.5),
}
cues.append(cue)

# Ao final, salva:
json.dump({"moduleId": module_id, "audioFile": f"...", "cues": cues, "groups": build_groups(cues)}, f)
```

### 5.2 TypeScript — Gerar manifest.json dos módulos disponíveis

O `src/tools/generateAudioManifest.ts` já existente deve ser **modificado** para:

1. Procurar por `public/audio/**/*.cues.json`
2. Extrair metadados de cada um
3. Gerar `public/audio/manifest.json`

```bash
npx tsx src/tools/generateAudioManifest.ts
```

---

## 6. Tratamento de Erros e Fallbacks

| Situação | Comportamento |
|----------|--------------|
| MP3 não encontrado | App funciona sem áudio (silencioso) |
| cues.json não encontrado | Áudio único sem navegação (toca do início ao fim) |
| cue específico não encontrado | Pula etapa, não trava |
| Usuário desativou áudio | `audioEnabled = false` → não carrega nada |
| Erro de rede no download | Mostra "áudio indisponível", continua sem |
| Aluno avança manualmente | `stop()` + pula para próximo grupo |

---

## 7. Plano de Implementação

| Fase | O Que Fazer | Quem |
|------|-------------|------|
| **1** | Modificar script Python do Piper para gerar cues.json | Você (ou equipe) |
| **2** | Criar `AudioEngine.ts` + `useGuidedAudio.ts` | Eu |
| **3** | Criar diretórios `public/audio/C1-M01/` e colocar MP3 + cues | Você |
| **4** | Integrar AudioEngine no LessonPage (exposure + exercises) | Eu |
| **5** | Modificar `generateAudioManifest.ts` para ler cues.json | Eu |
| **6** | Adicionar indicador visual de áudio (cue atual tocando) | Eu |
| **7** | Testar com módulo real | Ambos |

---

## 8. Perguntas para o Próximo Passo

1. **O script Python que gera o MP3 via Piper** — você pode modificá-lo para também gerar o `cues.json` com os timecodes de cada marcador? Ou quer que a gente use silence detection no MP3 já gerado?

2. **Os áudios já existem** ou você vai gerar todos do zero? Se já existem, a abordagem de silence detection + estimativa pode ser usada como ponte.
