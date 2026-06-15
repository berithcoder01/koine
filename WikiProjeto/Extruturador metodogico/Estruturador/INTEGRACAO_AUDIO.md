# INTEGRAÇÃO ÁUDIO — KOINÉ APP
## Pipeline completo: Apostila → Narração → Áudio
### Documento operacional para a FASE 5 do Orquestrador de Geração

---

## OBJETIVO

Definir o fluxo técnico que conecta a geração de uma apostila aprovada
(`.apostila.md`) à entrega do pacote final (`.apostila.md` + `.narracao.md`
+ `.wav`) usando Piper TTS para síntese de voz em PT-BR.

Este documento é o **manual operacional da FASE 5** do
`ORQUESTRADOR_GERACAO.md` (versão 1.1+).

---

## VISÃO GERAL DO FLUXO

```
┌─────────────────────────────────────────────────────────────────────┐
│  ENTRADA: <ID>.apostila.md (aprovado pelo Agente de Revisão)        │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
              ╔═══════════════════════════════════╗
              ║  SUB-PASSO M1 — Curadoria         ║
              ║  Reescrever a apostila como       ║
              ║  narração limpa (sem glifos       ║
              ║  gregos, com marcadores [SEÇÃO]). ║
              ╚══════════════════╤════════════════╝
                                 │
                                 ▼
              ╔═══════════════════════════════════╗
              ║  SUB-PASSO M2 — Validação         ║
              ║  Teste "0 caracteres gregos".     ║
              ║  Estrutura completa? Marcadores   ║
              ║  em ordem? Dicionário cobre       ║
              ║  todas as palavras?               ║
              ╚══════════════════╤════════════════╝
                                 │
                                 ▼
              ╔═══════════════════════════════════╗
              ║  SUB-PASSO N1 — Injeção no motor  ║
              ║  Copiar <ID>.narracao.md para     ║
              ║  WikiProjeto/Geração de audio     ║
              ║  piper/                            ║
              ╚══════════════════╤════════════════╝
                                 │
                                 ▼
              ╔═══════════════════════════════════╗
              ║  SUB-PASSO N2 — Síntese           ║
              ║  Rodar gerar_audio.py com a venv  ║
              ║  local (.venv/Scripts/python.exe) ║
              ╚══════════════════╤════════════════╝
                                 │
                                 ▼
              ╔═══════════════════════════════════╗
              ║  SUB-PASSO O1 — Validação do WAV  ║
              ║  Tamanho > 2 KB. Toque limpo.     ║
              ║  Duração coerente (8-12 min).     ║
              ╚══════════════════╤════════════════╝
                                 │
                                 ▼
              ╔═══════════════════════════════════╗
              ║  SUB-PASSO O2 — Manifesto         ║
              ║  Atualizar INDICE.md com          ║
              ║  referência ao .wav.              ║
              ╚═══════════════════════════════════╝
```

---

## AMBIENTE

### Estrutura de pastas

```
Koine/
├── WikiProjeto/
│   ├── Modulos/
│   │   ├── C1-M01.apostila.md            ← entrada (aprovada)
│   │   ├── C1-M01.narracao.md            ← saída M2 (curada)
│   │   ├── C1-M01.relatorio-revisao.md   ← da FASE 3
│   │   └── INDICE.md                     ← atualizado em O2
│   ├── Estruturador/
│   │   ├── NARRACAO.md                   ← especificação do .narracao.md
│   │   ├── cues-format-spec.md           ← especificação do cues.json
│   │   └── INTEGRACAO_AUDIO.md           ← este documento
│   ├── ORQUESTRADOR_GERACAO.md           ← governa FASE 5
│   └── Geração de audio piper/           ← ambiente isolado Piper
│       ├── .venv/                        ← Python 3.14 + piper-tts 1.4.2 + lameenc
│       ├── piper/                        ← espeak-ng-data embutido
│       ├── piper_voz/
│       │   ├── pt_BR-faber-medium.onnx   ← modelo (63 MB)
│       │   └── pt_BR-faber-medium.onnx.json
│       ├── gerar_audio.py                ← script v2.0 (MP3 + cues.json)
│       ├── validate_cues.py              ← validador Python do cues.json
│       └── <ID>.narracao.md              ← entrada N1 (copiada)
└── public/
    └── audio/                            ← saída final (vai para o app)
        ├── C1-M01/
        │   ├── C1-M01.mp3                ← áudio final (10.5 MB, 11.2 min)
        │   └── C1-M01.cues.json          ← timecodes sincronizados
        ├── C1-M02/
        │   ├── C1-M02.mp3
        │   └── C1-M02.cues.json
        └── ...
```

### Dependências (já instaladas na `.venv`)

```
piper-tts          1.4.2
piper-onnx         (embutido em piper-tts)
onnxruntime        (embutido em piper-tts)
lameenc            1.8.2        ← encoder MP3 (Python wheel com LAME embutido)
```

O espeak-ng **não é uma dependência externa** — o piper-tts
embute seus próprios dados em `piper/espeak-ng-data/`. O
workaround do script (`setup_piper()`) copia esses dados para
`%TEMP%/piper-espeak-data/` para evitar problemas de caminho
com acentos no Windows.

---

## SUB-PASSO M1 — CURADORIA DA NARRAÇÃO

### O que difere `.apostila.md` de `.narracao.md`

| Aspecto | `.apostila.md` | `.narracao.md` |
|---------|----------------|----------------|
| **Público** | Aluno + parser da LessonEngine | Piper TTS (máquina) |
| **Glifos gregos** | Permitidos (U+0370–U+03FF) | **Proibidos** (0 ocorrências) |
| **Estrutura** | `---MODULO---`, `---UNIDADE---`, blocos `fase:` | Marcadores `[NOME]` em linhas próprias |
| **Tags internas** | `titulo:`, `explicacao:`, `correta:`, etc. | Nenhuma (texto corrido sob marcador) |
| **Pronúncia** | Grego com acento gráfico PT (ἀγάπη) | Fonética PT (agápe) |
| **Tom** | Instrucional + referencial | Audio-guia (frases curtas, pausas) |
| **Totalidade** | 100% do conteúdo (exposição, questões, etc.) | Curadoria (pode omitir notas técnicas, rodapés) |

### Regras da curadoria

1. **Cada marcador em linha própria**, no formato `[NOME_MARCADOR]`.
2. **Texto entre marcadores** = conteúdo a ser falado naquela seção.
3. **Nada antes do primeiro marcador** (cabeçalho markdown é descartado).
4. **Ordem recomendada**: TITULO → INTRODUCAO → UNIDADE/EXPOSICAO →
   NOTA_DIACRITICOS → DICA → VERSICULO → PERGUNTA → OPCOES →
   PAUSA → RESPOSTA → TRANSICAO → ... → FINALIZACAO.
5. **Sem abreviações** ("U01", "tpr_digital", "matching_pairs") — tudo por extenso.
6. **Tom oral**: "Vamos agora...", "Observe que...", "Repita comigo:".
7. **Frases curtas**: máximo 2 linhas (Piper corta fôlego em frases longas).
8. **Marcador `[PAUSA]`**: usado entre PERGUNTA+OPCOES e RESPOSTA,
   com `duration: 5.0` (5s de silêncio para o aluno pensar).

### Catálogo de marcadores

| Marcador | Ação no áudio | Pausa após | Uso |
|----------|---------------|-----------|-----|
| `[TITULO]` | `speak_with_pause` | 2.0 s | Título do módulo |
| `[INTRODUCAO]` | `speak_normal` | 1.0 s | Acolhimento, "o que vamos aprender" |
| `[UNIDADE]` | `speak_with_pause` | 1.0 s | Letra/forma da unidade (ex: "Letra épsilon") |
| `[EXPOSICAO]` | `speak_normal` | 0.5 s | Conteúdo expositivo principal |
| `[NOTA_DIACRITICOS]` | `speak_informative` | 1.0 s | Instrução sobre diacríticos da letra |
| `[DICA]` | `speak_slow` | 1.5 s | Dica mnemônica (mais lenta para fixar) |
| `[VERSICULO]` | `speak_reverent` | 1.5 s | Versículo (tom solene, pausas em vírgulas) |
| `[PERGUNTA]` | `speak_with_pause` | 2.0 s | Enunciado de questão |
| `[OPCOES]` | `speak_list` | 0.5 s | Alternativas (com quebras entre itens) |
| `[PAUSA]` | `silence` | 5.0 s | Silêncio total para o aluno pensar |
| `[RESPOSTA]` | `speak_affirmative` | 2.0 s | Resposta + explicação |
| `[TRANSICAO]` | `speak_transition` | 1.5 s | Ponte entre unidades (gancho "...") |
| `[FINALIZACAO]` | `speak_closing` | 3.0 s | Encerramento do módulo |

---

## SUB-PASSO M2 — VALIDAÇÃO DA NARRAÇÃO

### Checklist de validação

```
[ ] 0 caracteres gregos (range U+0370–U+03FF, U+1F00–U+1FFF)
[ ] Cada marcador em linha própria (regex ^\[NOME\]$)
[ ] Todos os marcadores usados estão no catálogo (sem typos)
[ ] Ordem segue o fluxo: TITULO → ... → FINALIZACAO
[ ] Há pelo menos um [TITULO] no início
[ ] Há pelo menos um [FINALIZACAO] no fim
[ ] Há [PAUSA] entre [PERGUNTA]+[OPCOES] e [RESPOSTA]
[ ] Todas as palavras gregas foram transliteradas (dicionário cobre)
[ ] Tom professoral mantido (sem "kkk", "show", gírias)
[ ] Tamanho do arquivo entre 5 KB e 50 KB (sanity check)
```

### Comando de verificação rápida (PowerShell)

```powershell
# Teste "0 glifos gregos"
$conteudo = Get-Content -LiteralPath "C1-M01.narracao.md" -Raw
$gregos = [regex]::Matches($conteudo, "[\u0370-\u03FF\u1F00-\u1FFF]")
if ($gregos.Count -eq 0) {
    Write-Host "[OK] Nenhum glifo grego encontrado." -ForegroundColor Green
} else {
    Write-Host "[ERRO] $($gregos.Count) glifos gregos encontrados!" -ForegroundColor Red
    $gregos | ForEach-Object { Write-Host $_.Value }
}

# Contagem de marcadores
$conteudo | Select-String -Pattern "^\[[A-Z_]+\]$" -AllMatches |
    ForEach-Object { $_.Matches } | Group-Object Value |
    Sort-Object Count -Descending | Format-Table Count, Name
```

---

## SUB-PASSO N1 — INJEÇÃO NO MOTOR PIPER

### Por que copiar (não referenciar)

O ambiente Piper é **isolado** em `WikiProjeto/Geração de audio piper/`
para evitar misturar dependências (`.venv/`, modelos, espeak-ng-data)
com o resto do projeto WikiProjeto. A cópia garante:

- **Independência**: o dir Piper pode ser movido/renomeado sem quebrar o pipeline.
- **Reprodutibilidade**: cada `.wav` nasce ao lado do `.narracao.md` que o gerou.
- **Versionamento local**: o `.narracao.md` no dir Piper é o "snapshot" usado
  para aquela síntese. Se a curadoria for refeita, o `INDICE.md` continua
  apontando para o áudio antigo até novo `gerar_audio.py`.

### Comando

```powershell
# Caminhos (ajustar para o módulo desejado)
$origem = "C:\Users\marco\Documents\BerithCode\Koine\WikiProjeto\Modulos\C1-M01.narracao.md"
$destino = "C:\Users\marco\Documents\BerithCode\Koine\WikiProjeto\Geração de audio piper\C1-M01.narracao.md"

Copy-Item -LiteralPath $origem -Destination $destino -Force
```

---

## SUB-PASSO N2 — SÍNTESE

### Comando canônico

```powershell
# Definir UTF-8 (necessário em consoles cp1252 do Windows)
$env:PYTHONIOENCODING = "utf-8"
$env:PYTHONUTF8 = "1"

# Entrar no dir Piper
Set-Location "C:\Users\marco\Documents\BerithCode\Koine\WikiProjeto\Geração de audio piper"

# Rodar síntese (v2.0: gera MP3 + cues.json)
.\.venv\Scripts\python.exe gerar_audio.py `
    --input      "C1-M01.narracao.md" `
    --output-dir "../../public/audio" `
    --no-play
```

### Saída esperada (stdout)

```
Koiné Audio Generator v2.0
   Entrada:    C1-M01.narracao.md
   Modelo:     piper_voz\pt_BR-faber-medium.onnx
   Saída base: ..\..\public\audio

Lendo narração: C1-M01.narracao.md
   → 65 seções encontradas
Carregando modelo: piper_voz\pt_BR-faber-medium.onnx
Sintetizando áudio + gerando timecodes...
Codificando MP3 (lameenc, 128 kbps)...
   MP3 salvo: ..\..\public\audio\C1-M01\C1-M01.mp3 (10484 KB)
   Cues salvos: ..\..\public\audio\C1-M01\C1-M01.cues.json

============================================================
Pacote de áudio gerado!
============================================================
   Módulo:            C1-M01
   Título:            Vogais Base — Alfa, Épsilon, Iota
   MP3:               ..\..\public\audio\C1-M01\C1-M01.mp3
   Cues:              ..\..\public\audio\C1-M01\C1-M01.cues.json
   Tamanho MP3:       10484 KB
   Cues:              65
   Groups:            19 (7 exposição, 12 exercício)
   Duração total:     670.9s (11.2 min)
============================================================
```

### Parâmetros CLI do script (v2.0)

| Flag | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `--input`, `-i` | str | `C1-M01.narracao.md` | Arquivo `.narracao.md` de entrada |
| `--model`, `-m` | str | `piper_voz/pt_BR-faber-medium.onnx` | Caminho do modelo Piper `.onnx` |
| `--output-dir`, `-o` | str | `../../public/audio` | Diretório base de saída (cria `<ID>/`) |
| `--no-play`, `-q` | flag | (desligado) | Não abre o player ao final |

### Comportamento por ação de marcador

| Ação | Efeito no texto |
|------|-----------------|
| `speak_slow` | Adiciona reticências em pontos e espaços duplos em vírgulas (força Piper a desacelerar) |
| `speak_reverent` | Espaços duplos em vírgulas (tom solene, pausas em vírgulas) |
| `speak_list` | Quebras de linha entre pontos (pausas naturais entre itens) |
| `speak_transition` | Adiciona " ..." ao final (gancho de continuidade) |
| `speak_normal` | Sem adaptação |
| `silence` | **Não sintetiza texto** — gera apenas `duration` segundos de silêncio PCM (vira cue de PAUSA) |

---

## SUB-PASSO O1 — VALIDAÇÃO DO PACOTE MP3 + CUES.JSON

### Layout de saída (versão 2.0)

```
public/audio/
├── C1-M01/
│   ├── C1-M01.mp3            ← Áudio MP3 128 kbps mono 22.05 kHz
│   └── C1-M01.cues.json      ← Metadados com timecodes
├── C1-M02/
│   ├── C1-M02.mp3
│   └── C1-M02.cues.json
└── ...
```

### Critérios de validação

```
[ ] <ID>.mp3 existe e tem tamanho > 2.000 bytes
[ ] <ID>.cues.json existe e é JSON válido
[ ] Header MP3 válido (começa com 0xFF 0xFB ou ID3)
[ ] cues.json passa no validate_cues.py (todas as 9 regras)
[ ] Cues estão em ordem cronológica (sem sobreposição)
[ ] Groups têm IDs únicos
[ ] Groups com PERGUNTA são exercise/canSkip=true
[ ] UnitId correto por grupo (C1-M01-U01, -U02, -U03, -APP)
[ ] Toca limpo no player padrão do Windows
[ ] Duração coerente: 5-15 min para módulos de 60-90 XP
```

### Comando de validação cruzada

```powershell
# 1. Validação do cues.json (equivalente ao validateCues.ts)
$env:PYTHONIOENCODING = "utf-8"
$env:PYTHONUTF8 = "1"
.\.venv\Scripts\python.exe validate_cues.py `
    "..\..\public\audio\C1-M01\C1-M01.cues.json"

# 2. Metadados do MP3
$mp3 = "..\..\public\audio\C1-M01\C1-M01.mp3"
Get-Item $mp3 | Format-Table Name, Length, LastWriteTime

# 3. Header do MP3 (primeiros bytes)
.\.venv\Scripts\python.exe -c "
with open(r'$mp3', 'rb') as f:
    h = f.read(16)
print('Header:', h[:8].hex())
print('ID3?:', h[:3] == b'ID3')
print('Frame sync?:', (h[0] == 0xFF) and ((h[1] & 0xE0) == 0xE0))
"

# 4. Estrutura do cues.json
.\.venv\Scripts\python.exe -c "
import json
d = json.load(open(r'..\..\public\audio\C1-M01\C1-M01.cues.json', encoding='utf-8'))
print(f'Module: {d[\"moduleId\"]} — {d[\"moduleTitle\"]}')
print(f'Cues: {len(d[\"cues\"])}')
print(f'Groups: {len(d[\"groups\"])}')
print(f'Duração: {d[\"duration\"]}s')
for g in d['groups']:
    print(f'  {g[\"id\"]:<40} {g[\"lessonPhase\"]:<10} {len(g[\"cueIds\"])} cues')
"
```

---

## SUB-PASSO O2 — ATUALIZAÇÃO DO MANIFESTO

### Formato da nova linha do `INDICE.md`

```markdown
| ID      | Título                    | XP  | Data       | Status     | Áudio                    |
|---------|---------------------------|-----|------------|------------|--------------------------|
| C1-M01  | Vogais Base — Α, Ε, Ι    | 60  | 2026-06-03 | 🟢 Aprovado | ✅ C1-M01.wav (10:13)    |
| C1-M02  | Vogais Abertas e Fechadas | 60  | 2026-06-03 | 🟢 Aprovado | ✅ C1-M02.wav (10:08)    |
| C1-M03  | Consoantes Familiares     | 65  | [pendente] | 🔴 Reprovado | ⏳ pendente             |
```

### Ícones da coluna Áudio

| Ícone | Significado |
|-------|-------------|
| `✅` | Áudio gerado e validado |
| `⏳` | Narração curada, síntese pendente |
| `🔄` | Re-sintetizar (voz/pausas alteradas) |
| `❌` | Falha na síntese (sem modelo, espeak-ng erro) |
| (vazio) | Módulo não possui áudio (Ciclo II+ sem narração) |

---

## WORKAROUNDS CONHECIDOS (WINDOWS)

### Console cp1252 + emojis

O Windows PowerShell usa cp1252 por padrão. Emojis (`🚀`, `📖`, etc.)
e acentos PT-BR quebram no stdout. **Sempre defina:**

```powershell
$env:PYTHONIOENCODING = "utf-8"
$env:PYTHONUTF8 = "1"
```

### Caminho com acentos (espeak-ng data)

O espeak-ng no Windows usa API ANSI e falha em caminhos com
caracteres não-ASCII. O script detecta isso e copia os dados
para `%TEMP%/piper-espeak-data/`. **Não mover** esse diretório.

### Modelo .onnx grande (63 MB)

O `PiperVoice.load()` leva ~5-10 s. É normal. O relatório
"Carregando modelo" deve aparecer e depois seguir.

### Sintetização lenta (CPU)

Cada chunk leva 1-3 s em CPU. Módulo típico de 60 XP =
~9 min de áudio = ~3-5 min de síntese. **Não interrompa** —
o arquivo final estará corrompido.

### Vozes alternativas

Para trocar a voz (ex: voz masculina), basta baixar outro
`.onnx` + `.onnx.json` para `piper_voz/` e usar:

```powershell
.\.venv\Scripts\python.exe gerar_audio.py `
    --model "piper_voz/outro_modelo.onnx" `
    --input "C1-M01.narracao.md" `
    --output "C1-M01.wav" `
    --no-play
```

---

## EXPANSÃO FUTURA

### Vozes adicionais

```
piper_voz/
├── pt_BR-faber-medium.onnx    ← Faber (voz feminina atual)
├── pt_BR-cadu-medium.onnx     ← Cadu (voz masculina) — pendente baixar
└── pt_BR-jeff-medium.onnx     ← Jeff (voz masculina) — pendente baixar
```

### Granularidade do áudio (módulo → unidade)

Hoje o script gera **1 WAV por módulo**. Para granularidade
por unidade (permitir o aluno ouvir uma unidade específica):

```
1. Adicionar marcador [UNIDADE_FIM] no .narracao.md
2. Criar script gerar_audio_unidade.py que quebra o WAV
   usando os marcadores como pontos de corte
3. Saída: <ID>_U01.wav, <ID>_U02.wav, <ID>_U03.wav
```

### Pipeline em fila (batch)

```
1. Criar fila.csv com colunas: id, status_narracao, status_audio
2. Script batch_audio.py lê a fila
3. Para cada linha com status_narracao = "pronto":
   a. Copia .narracao.md para dir Piper
   b. Roda gerar_audio.py
   c. Atualiza fila com status_audio = "ok" e tamanho_wav
4. Log em batch_audio.log
```

---

## CHECKLIST OPERACIONAL (RESUMO)

```
Para cada módulo aprovado:
[ ] .narracao.md criado (M1)
[ ] .narracao.md validado (0 gregos, marcadores OK) (M2)
[ ] .narracao.md copiado para dir Piper (N1)
[ ] gerar_audio.py executado (N2)
[ ] .wav validado (tamanho, formato, audível) (O1)
[ ] INDICE.md atualizado (O2)
[ ] Pacote final entregue ao solicitante
```

---

*INTEGRAÇÃO ÁUDIO — KOINÉ APP*
*Versão 2.0 — Pipeline completo: Apostila → Narração → MP3 + cues.json.*
*Documento operacional da FASE 5 do ORQUESTRADOR_GERACAO.md v1.1.*
*Carrega: NARRACAO.md, cues-format-spec.md, gerar_audio.py, validate_cues.py, INDICE.md.*
*Entrega: Pacote (apostila + narração + MP3 + cues.json + relatório) por módulo em public/audio/<ID>/.*
