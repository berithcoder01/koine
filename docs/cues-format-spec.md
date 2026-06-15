# Especificação do Formato `cues.json`
## Interface entre o Pipeline Python (Piper TTS) e o AudioEngine (App)

> **Propósito:** Este documento define exatamente o que o script Python de geração de áudio
> precisa produzir como metadados junto com o MP3 de cada módulo.
> O AudioEngine da app consome estes arquivos para navegação sincronizada.

---

## 1. Estrutura de Diretórios (Obrigatória)

```
public/audio/
├── manifest.json               ← Índice de todos os módulos (opcional, gerado posteriormente)
├── C1-M01/
│   ├── C1-M01.mp3              ← Áudio completo do módulo (~10 min)
│   └── C1-M01.cues.json        ← Metadados (timecodes + estrutura)
├── C1-M02/
│   ├── C1-M02.mp3
│   └── C1-M02.cues.json
└── ...
```

**Regra:** O nome do arquivo MP3 e do `cues.json` devem ser idênticos (exceto extensão).
`C1-M01.mp3` → `C1-M01.cues.json`

---

## 2. Formato do `cues.json`

### 2.1 Exemplo Completo

```json
{
  "version": "1.0",
  "moduleId": "C1-M01",
  "moduleTitle": "Vogais Base",
  "audioFile": "/audio/C1-M01/C1-M01.mp3",
  "duration": 612.5,
  "generatedAt": "2026-06-03T10:30:00Z",
  "narrationFile": "C1-M01.narracao.md",

  "cues": [
    {
      "id": "intro",
      "marker": "INTRODUCAO",
      "text": "Bem vindo ao módulo Vogais Base...",
      "startTime": 0.0,
      "endTime": 48.2
    },
    {
      "id": "u1_unidade",
      "marker": "UNIDADE",
      "text": "Unidade 1 — Letra Alfa",
      "startTime": 49.8,
      "endTime": 53.5
    },
    {
      "id": "u1_exposicao",
      "marker": "EXPOSICAO",
      "text": "Alfa é a primeira letra do alfabeto grego...",
      "startTime": 54.5,
      "endTime": 98.3
    },
    {
      "id": "u1_dica",
      "marker": "DICA",
      "text": "Alfa se parece com o nosso A...",
      "startTime": 98.8,
      "endTime": 106.1
    },
    {
      "id": "u1_versiculo",
      "marker": "VERSICULO",
      "text": "Eu sou o Alfa e o Ômega...",
      "startTime": 107.6,
      "endTime": 122.0
    },
    {
      "id": "u1_p1_pergunta",
      "marker": "PERGUNTA",
      "text": "Qual é o som da letra Alfa?",
      "startTime": 124.0,
      "endTime": 130.5
    },
    {
      "id": "u1_p1_opcoes",
      "marker": "OPCOES",
      "text": "Opção 1: a como em pai. Opção 2: e como em pé...",
      "startTime": 131.0,
      "endTime": 140.2
    },
    {
      "id": "u1_p1_pausa",
      "marker": "PAUSA",
      "text": "",
      "startTime": 141.0,
      "endTime": 146.0
    },
    {
      "id": "u1_p1_resposta",
      "marker": "RESPOSTA",
      "text": "A resposta correta é a Opção 1...",
      "startTime": 146.0,
      "endTime": 162.8
    },
    {
      "id": "transicao",
      "marker": "TRANSICAO",
      "text": "Agora que você conhece o Alfa...",
      "startTime": 164.0,
      "endTime": 172.5
    }
  ],

  "groups": [
    {
      "id": "phase1_u1",
      "unitId": "C1-M01-U01",
      "unitType": "letter",
      "lessonPhase": "exposure",
      "cueIds": ["u1_unidade", "u1_exposicao", "u1_dica", "u1_versiculo"],
      "canSkip": false
    },
    {
      "id": "phase2_u1",
      "unitId": "C1-M01-U01",
      "unitType": "letter",
      "lessonPhase": "exercise",
      "cueIds": ["u1_p1_pergunta", "u1_p1_opcoes", "u1_p1_pausa", "u1_p1_resposta"],
      "canSkip": true
    }
  ]
}
```

### 2.2 Campos Obrigatórios

#### Raiz

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `version` | `string` | ✅ | Sempre `"1.0"` |
| `moduleId` | `string` | ✅ | Ex: `"C1-M01"` |
| `moduleTitle` | `string` | ✅ | Título do módulo em PT |
| `audioFile` | `string` | ✅ | Caminho relativo ao `public/`. Ex: `"/audio/C1-M01/C1-M01.mp3"` |
| `duration` | `number` | ✅ | Duração total do MP3 em segundos |
| `generatedAt` | `string` | ❌ | Timestamp ISO 8601 da geração |
| `narrationFile` | `string` | ❌ | Nome do `.narracao.md` de origem |
| `cues` | `Cue[]` | ✅ | Lista de segmentos de áudio |
| `groups` | `Group[]` | ✅ | Agrupamento lógico dos cues |

#### Objeto `Cue`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | `string` | ✅ | Identificador único dentro do módulo. Slug curto e legível. Ex: `"u1_exposicao"`, `"u2_p1_pergunta"` |
| `marker` | `string` | ✅ | Nome do marcador. Ex: `"EXPOSICAO"`, `"PERGUNTA"`, `"RESPOSTA"` |
| `text` | `string` | ❌ | Texto narrado neste segmento (útil para debug/legenda) |
| `startTime` | `number` | ✅ | Início do segmento no MP3, em segundos |
| `endTime` | `number` | ✅ | Fim do segmento no MP3, em segundos |

**Regras para `startTime` / `endTime`:**
- `startTime` deve ser o momento exato em que a fala começa (após o silêncio/pausa anterior)
- `endTime` deve ser o momento exato em que a fala termina (antes do silêncio/pausa seguinte)
- `startTime >= 0`
- `endTime > startTime`
- Os intervals não devem se sobrepor
- Pode haver gaps (silêncio) entre `endTime` de um cue e `startTime` do próximo

#### Objeto `Group`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | `string` | ✅ | Identificador único do grupo. Ex: `"phase1_u1"` |
| `unitId` | `string` | ❌ | ID da unidade (se aplicável). Ex: `"C1-M01-U01"` |
| `unitType` | `string` | ❌ | Tipo da unidade: `"letter"`, `"word"`, `"grammar_rule"`, etc |
| `lessonPhase` | `string` | ✅ | `"exposure"` para fase de exposição, `"exercise"` para exercícios |
| `cueIds` | `string[]` | ✅ | Lista de `id`s dos cues que compõem este grupo, na ordem |
| `canSkip` | `boolean` | ❌ | Se `true`, o aluno pode pular este grupo. Default: `false` |

### 2.3 IDs dos Cues — Convenção de Nomenclatura

Para manter consistência e permitir que a app mapeie cada cue ao conteúdo da lição:

```
{u número da unidade}_{contexto}_{sequencial opcional}
```

| Padrão | Exemplo | Quando usar |
|--------|---------|-------------|
| `intro` | `intro` | Cue único de introdução |
| `titulo` | `titulo` | Título do módulo |
| `u1_unidade` | `u1_unidade` | Anúncio da Unidade 1 |
| `u1_exposicao` | `u1_exposicao` | Exposição da Unidade 1 |
| `u1_dica` | `u1_dica` | Dica da Unidade 1 |
| `u1_versiculo` | `u1_versiculo` | Versículo da Unidade 1 |
| `u1_p1_pergunta` | `u1_p1_pergunta` | Pergunta 1 da Unidade 1 |
| `u1_p1_opcoes` | `u1_p1_opcoes` | Opções da Pergunta 1, Unidade 1 |
| `u1_p1_pausa` | `u1_p1_pausa` | Pausa antes da resposta 1, Unidade 1 |
| `u1_p1_resposta` | `u1_p1_resposta` | Resposta 1 da Unidade 1 |
| `u1_p2_pergunta` | `u1_p2_pergunta` | Pergunta 2 da Unidade 1 |
| `transicao_u1_u2` | `transicao_u1_u2` | Transição entre U1 e U2 |
| `finalizacao` | `finalizacao` | Encerramento do módulo |

---

## 3. Como Gerar no Script Python

O script Python atual que utiliza Piper TTS já:
1. Faz o parse do `.narracao.md` em blocos `(marker, content)`
2. Gera áudio para cada bloco
3. Concatena tudo em um MP3 único

**Modificação necessária:** Durante a concatenação, acumular o tempo decorrido:

```python
import json
from datetime import datetime, timezone

def generate_audio_with_cues(narracao_path, module_id, output_dir):
    """Gera MP3 + cues.json"""
    chunks = parse_narration(open(narracao_path).read())
    cues = []
    current_time = 0.0
    group_index = 0
    current_group_cues = []
    groups = []

    for i, (marker, content) in enumerate(chunks):
        # Gera WAV para este bloco
        wav_data = piper_tts(content)

        # Calcula duração (em segundos) a partir do WAV
        duration = get_wav_duration(wav_data)

        # Cria o cue
        cue_id = generate_cue_id(marker, i, chunks)
        cue = {
            "id": cue_id,
            "marker": marker,
            "text": content[:200],  # opcional, truncado
            "startTime": round(current_time, 1),
            "endTime": round(current_time + duration, 1),
        }
        cues.append(cue)

        # Concatena o WAV ao MP3 de saída
        append_to_output(wav_data, os.path.join(output_dir, f"{module_id}.mp3"))

        current_time += duration

        # PAUSA = fim do grupo atual
        if marker == "PAUSA":
            groups.append({
                "id": f"group_{group_index}",
                "cueIds": [c["id"] for c in current_group_cues],
                "lessonPhase": infer_phase(current_group_cues),
                "canSkip": infer_skip(current_group_cues),
            })
            current_group_cues = []
            group_index += 1
        else:
            current_group_cues.append(cue)

        # Pausa entre blocos (se houver)
        pause = NARRATION_MARKERS.get(marker, {}).get("pause_after", 0)
        if pause > 0 and i < len(chunks) - 1:
            append_silence(pause, output_mp3)
            current_time += pause

    # Último grupo
    if current_group_cues:
        groups.append({
            "id": f"group_{group_index}",
            "cueIds": [c["id"] for c in current_group_cues],
            "lessonPhase": infer_phase(current_group_cues),
            "canSkip": False,
        })

    # Salva cues.json
    cues_data = {
        "version": "1.0",
        "moduleId": module_id,
        "moduleTitle": extract_title(chunks),
        "audioFile": f"/audio/{module_id}/{module_id}.mp3",
        "duration": round(current_time, 1),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "narrationFile": os.path.basename(narracao_path),
        "cues": cues,
        "groups": groups,
    }

    cues_path = os.path.join(output_dir, f"{module_id}.cues.json")
    with open(cues_path, "w", encoding="utf-8") as f:
        json.dump(cues_data, f, ensure_ascii=False, indent=2)

    print(f"✅ Gerado: {module_id}.mp3 ({current_time:.1f}s, {len(cues)} cues)")
```

### Funções auxiliares que o script precisa implementar:

```python
def get_wav_duration(wav_data: bytes) -> float:
    """Retorna duração em segundos de um WAV."""
    import struct
    # WAV header: sample rate está no byte 24 (4 bytes, little-endian)
    # data size está no byte 40 (4 bytes, little-endian)
    sample_rate = struct.unpack_from("<I", wav_data, 24)[0]
    data_size = struct.unpack_from("<I", wav_data, 40)[0]
    # Assume 16-bit mono
    return data_size / (sample_rate * 2)


def generate_cue_id(marker: str, index: int, chunks: list) -> str:
    """Gera um ID legível para o cue baseado no marcador e conteúdo."""
    import re
    marker_lower = marker.lower()

    # Tenta extrair número da unidade do conteúdo
    unit_match = re.search(r"unidade\s*(\d+)", chunks[min(index+1, len(chunks)-1)][1].lower() or "")
    unit_prefix = f"u{unit_match.group(1)}_" if unit_match else ""

    # Mapeia marcador para sufixo
    suffix_map = {
        "TITULO": "titulo",
        "INTRODUCAO": "intro",
        "UNIDADE": "unidade",
        "EXPOSICAO": "exposicao",
        "NOTA_DIACRITICOS": "nota_diacriticos",
        "DICA": "dica",
        "VERSICULO": "versiculo",
        "PERGUNTA": "pergunta",
        "OPCOES": "opcoes",
        "PAUSA": "pausa",
        "RESPOSTA": "resposta",
        "TRANSICAO": "transicao",
        "FINALIZACAO": "finalizacao",
    }

    suffix = suffix_map.get(marker, marker_lower)
    return f"{unit_prefix}{suffix}"


def infer_phase(group_cues: list) -> str:
    """Infere se o grupo é de exposição ou exercício."""
    markers = [c["marker"] for c in group_cues]
    if "PERGUNTA" in markers:
        return "exercise"
    return "exposure"


def infer_skip(group_cues: list) -> bool:
    """Grupos de exercício podem ser pulados."""
    return infer_phase(group_cues) == "exercise"
```

---

## 4. Validação

O arquivo `cues.json` deve passar por estas validações:

```
✅ version == "1.0"
✅ moduleId não vazio
✅ audioFile existe no sistema de arquivos
✅ duration > 0
✅ cues não vazia
✅ Nenhum cue tem startTime < 0
✅ Nenhum cue tem endTime <= startTime
✅ Cues estão ordenados por startTime
✅ Cues não se sobrepõem (cue[i].endTime <= cue[i+1].startTime)
✅ groups não vazia
✅ Todo cueId em groups existe em cues
✅ Último cue termina próximo de duration (±1s)
```

Um validador TypeScript será fornecido em `src/tools/validateCues.ts`.

---

## 5. Comportamento da App (Para Referência)

| Situação | O que a App faz |
|----------|----------------|
| `cues.json` + MP3 existem | Reprodução guiada sincronizada |
| `cues.json` existe mas sem groups | Fallback: toca cada cue em sequência linear |
| Só MP3 existe (sem cues) | Toca o áudio do início ao fim sem sincronia |
| Nada existe | App funciona sem áudio (silencioso) |
