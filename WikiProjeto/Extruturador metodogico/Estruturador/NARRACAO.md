# ESPECIFICAÇÃO DE NARRAÇÃO GUIADA — KOINÉ APP
## Formato do arquivo `.narracao.md` e tabela de marcadores
### Documento de v1.0 — 2026-06-02

---

## VISÃO GERAL

Cada módulo aprovado tem **dois arquivos** no `WikiProjeto/Modulos/`:

```
C1-MNN.apostila.md   ← Fonte de verdade do conteúdo pedagógico (legível por humanos + parser)
C1-MNN.narracao.md   ← Texto curado para geração de áudio via TTS (Piper)
```

O arquivo `.narracao.md` é gerado **após a publicação** do `.apostila.md`. Ele contém apenas o texto que será falado pelo sistema de áudio, com **marcadores de seção** que o script Python de narração usa para controlar ritmo, pausas e transições.

---

## REGRAS DE TRANSCRIÇÃO GREGO → PORTUGUÊS

O sistema de TTS (Piper) **não sabe ler caracteres gregos**. Todo glifo grego é substituído por sua transcrição fonética em português **antes** de ir para o áudio.

### Princípios

1. **Palavras gregas conhecidas** são substituídas por sua pronúncia em PT (ex: `ἀγάπη` → `agape`).
2. **Letras gregas isoladas** (em menções como "Α é a primeira letra") são substituídas pelo **nome da letra em português** (ex: `Α` → `Alfa`).
3. **Versículos e referências** são convertidos para o formato falado (ex: `João 11:25` → `João, capítulo 11, versículo 25`).
4. **Acentos e espíritos** (espirituais, agudos, circunflexos, subscritos) são **removidos** — eles serão estudados no Módulo 9, mas o áudio os ignora.
5. **Nenhuma letra grega** (maiúscula nem minúscula) deve aparecer no arquivo `.narracao.md`.

---

## ESTRUTURA DO ARQUIVO

```markdown
# NARRAÇÃO GUIADA — C1-MNN
# [Título do módulo em PT]

> Cabeçalho descritivo (linhas iniciadas com ">" — opcional, ignorado pelo script)

[TITULO]
[Título do módulo em PT, sem glifos gregos]

[INTRODUCAO]
[Parágrafo de boas-vindas + objetivos + palavra-âncora + métodos]

[UNIDADE]
Unidade N — [Nome do elemento]

[EXPOSICAO]
[Conteúdo principal da unidade, sem glifos gregos]

[NOTA_DIACRITICOS]
[Nota padrão sobre diacríticos, presente quando a unidade usa palavra com diacríticos]

[DICA]
[Dica mnemônica]

[VERSICULO]
[Versículo da unidade, em formato falado]

[PERGUNTA]
[Texto da pergunta]

[OPCOES]
[Opções em formato "Opção 1: X. Opção 2: Y. ..." OU pares para matching_pairs]

[PAUSA]

[RESPOSTA]
[Resposta + explicação, em tom afirmativo]

[TRANSICAO]
[Frase de transição entre unidades/seções]

[FINALIZACAO]
[Encerramento do módulo + gancho para o próximo]
```

---

## TABELA DE MARCADORES (v1.0)

Cada marcador fica em **linha própria**, no formato `[NOME_MARCADOR]`. O texto entre um marcador e o próximo é o conteúdo falado.

| Marcador              | Função                                                          | Ação sugerida no script TTS                  |
|-----------------------|-----------------------------------------------------------------|----------------------------------------------|
| `[TITULO]`            | Título do módulo                                                | Ler com ênfase + pausa de 2s                  |
| `[INTRODUCAO]`        | Abertura e boas-vindas                                          | Ler em tom normal                            |
| `[UNIDADE]`           | Anúncio de nova unidade                                         | Ler com ênfase de seção + pausa de 1s         |
| `[EXPOSICAO]`         | Conteúdo teórico principal                                      | Ler em tom normal (velocidade média)         |
| `[NOTA_DIACRITICOS]`  | Aviso padrão sobre diacríticos (regra S-05)                    | Ler em tom informativo                       |
| `[DICA]`              | Dica mnemônica                                                  | Ler devagar (~80% velocidade)                |
| `[VERSICULO]`         | Versículo com referência                                        | Ler em tom reverente (velocidade lenta)      |
| `[PERGUNTA]`          | Pergunta da fase 2, 3, 4 ou 5                                   | Ler com pausa final de 2s                    |
| `[OPCOES]`            | Lista de opções (4 itens, ou pares para matching_pairs)         | Ler como lista numerada, com pausas curtas   |
| `[PAUSA]`             | Marcador de pausa para resposta do aluno                        | Inserir 5 segundos de silêncio               |
| `[RESPOSTA]`          | Resposta + explicação                                           | Ler em tom afirmativo                        |
| `[TRANSICAO]`         | Frase de transição entre unidades                               | Ler + tocar som curto de transição (opcional) |
| `[FINALIZACAO]`       | Encerramento do módulo                                          | Ler com ênfase de encerramento + pausa 3s    |

---

## TABELA DE CÓDIGO PYTHON (PARA COLAR NO SCRIPT)

Este é o código que o script Python precisa para **reconhecer os marcadores** e tomar decisões de leitura/pausa. Cole dentro do módulo de narração do seu script:

```python
# ============================================================
#  TABELA DE MARCADORES — NARRACAO v1.0
#  Cole este bloco no script Python que gera áudio via Piper
# ============================================================

# Marcadores reconhecidos — o script deve IGNORAR essas linhas
# e aplicar a ação correspondente entre cada par de marcadores
NARRATION_MARKERS = {
    "TITULO":            {"action": "speak_with_pause",  "pause_after": 2.0},
    "INTRODUCAO":        {"action": "speak_normal",      "pause_after": 1.0},
    "UNIDADE":           {"action": "speak_with_pause",  "pause_after": 1.0},
    "EXPOSICAO":         {"action": "speak_normal",      "pause_after": 0.5},
    "NOTA_DIACRITICOS":  {"action": "speak_informative", "pause_after": 1.0},
    "DICA":              {"action": "speak_slow",        "pause_after": 1.5},
    "VERSICULO":         {"action": "speak_reverent",    "pause_after": 1.5},
    "PERGUNTA":          {"action": "speak_with_pause",  "pause_after": 2.0},
    "OPCOES":            {"action": "speak_list",        "pause_after": 0.5},
    "PAUSA":             {"action": "silence",           "duration": 5.0},
    "RESPOSTA":          {"action": "speak_affirmative", "pause_after": 2.0},
    "TRANSICAO":         {"action": "speak_transition",  "pause_after": 1.0, "play_sound": "transition_chime.wav"},
    "FINALIZACAO":       {"action": "speak_closing",     "pause_after": 3.0},
}


# Regex para detectar marcadores em uma linha
import re
NARRATION_MARKER_PATTERN = re.compile(r"^\[([A-Z_]+)\]$")


def parse_narration(text: str):
    """
    Faz o parse de um arquivo .narracao.md e retorna uma lista de tuplas:
    [(marker, content), (marker, content), ...]

    O script de TTS itera sobre essa lista, ignorando o marker
    e lendo o content com a ação configurada.
    """
    chunks = []
    current_marker = None
    current_content = []

    for line in text.split("\n"):
        match = NARRATION_MARKER_PATTERN.match(line.strip())
        if match:
            # Encontrou um novo marcador — salva o anterior
            if current_marker is not None:
                chunks.append((current_marker, "\n".join(current_content).strip()))
            current_marker = match.group(1)
            current_content = []
        else:
            if current_marker is not None:
                current_content.append(line)

    # Salva o último bloco
    if current_marker is not None:
        chunks.append((current_marker, "\n".join(current_content).strip()))

    return chunks


# ============================================================
#  DICIONÁRIO DE TRANSCRIÇÃO GREGO → PORTUGUÊS
#  Cole este bloco no script Python
# ============================================================

# Letras gregas: quando aparecem ISOLADAS (fora de palavras conhecidas),
# usa-se o NOME DA LETRA em português.
GREEK_LETTER_NAMES_PT = {
    "α": "alfa",     "Α": "Alfa",
    "β": "beta",     "Β": "Beta",
    "γ": "gama",     "Γ": "Gama",
    "δ": "delta",    "Δ": "Delta",
    "ε": "épsilon",  "Ε": "Épsilon",
    "ζ": "zeta",     "Ζ": "Zeta",
    "η": "eta",      "Η": "Eta",
    "θ": "teta",     "Θ": "Teta",
    "ι": "iota",     "Ι": "Iota",
    "κ": "capa",     "Κ": "Capa",
    "λ": "lambda",   "Λ": "Lambda",
    "μ": "mi",       "Μ": "Mi",
    "ν": "nu",       "Ν": "Nu",
    "ξ": "xi",       "Ξ": "Xi",
    "ο": "ômicron",  "Ο": "Ômicron",
    "π": "pi",       "Π": "Pi",
    "ρ": "rô",       "Ρ": "Rô",
    "σ": "sigma",    "ς": "sigma",   "Σ": "Sigma",
    "τ": "tau",      "Τ": "Tau",
    "υ": "ípsilon",  "Υ": "Ípsilon",
    "φ": "fi",       "Φ": "Fi",
    "χ": "chi",      "Χ": "Chi",
    "ψ": "psi",      "Ψ": "Psi",
    "ω": "ômega",    "Ω": "Ômega",
}


# Palavras gregas comuns: mapeamento para pronúncia fonética em PT.
# ESTE DICIONÁRIO DEVE SER EXPANDIDO À MEDIDA QUE NOVOS MÓDULOS USAREM
# NOVAS PALAVRAS. Veja o dicionário expandido abaixo.
GREEK_WORDS_FONETICA = {
    # C1-M01 e C1-M02 (prova de conceito)
    "ἀγάπη":     "agape",
    "ἐγώ":       "egô",
    "Ἰησοῦς":    "Iesous",
    "λόγος":     "logos",
    "θεός":      "theos",
    "υἱός":      "huios",
    "ὁ":         "ho",
    "ἡ":         "he",
    "τὸ":        "to",
    "τὸν":       "ton",
    "καὶ":       "kai",
    "ἐν":        "en",
    "τῆς":       "tes",
    "τῇ":        "te",
    "ἦν":        "en",
    "ἀρχῇ":      "arjê",
    "πρὸς":      "pros",
    "μονογενῆ":  "monogenê",
    "ἀνάστασις": "anastasis",
    "ζωή":       "zoe",
    "εἰμί":      "eimí",
    "εἶπεν":     "eipen",
    "Ἐγώ":       "Egô",
    "Εἰμι":      "Eime",
    "Ἁγάπη":     "Agape",
    "Λόγος":     "Logos",
    "Θεός":      "Theos",
    "Υἱός":      "Huios",
    "Ἐν":        "En",
    "Ἀρχῇ":      "Arjê",
}


def transliterate_greek_to_pt(text: str) -> str:
    """
    Converte texto grego em texto PT limpo, pronto para TTS.

    Algoritmo:
    1. Procura palavras inteiras no dicionário GREEK_WORDS_FONETICA.
    2. Para caracteres gregos restantes (isolados), usa o nome da letra.
    3. Remove todos os diacríticos.
    """
    import unicodedata

    # 1) Substitui palavras conhecidas
    for greek_word, pt_word in GREEK_WORDS_FONETICA.items():
        text = text.replace(greek_word, pt_word)

    # 2) Remove diacríticos (combining marks) de caracteres gregos restantes
    def strip_greek_diacritics(char):
        if "\u0370" <= char <= "\u03ff" or "\u1f00" <= char <= "\u1fff":
            nfd = unicodedata.normalize("NFD", char)
            return "".join(c for c in nfd if not unicodedata.combining(c))
        return char

    # 3) Substitui caracteres gregos restantes pelo nome da letra
    result = []
    for char in text:
        stripped = strip_greek_diacritics(char)
        if stripped in GREEK_LETTER_NAMES_PT:
            result.append(GREEK_LETTER_NAMES_PT[stripped])
        else:
            result.append(char)

    return "".join(result)
```

---

## CHECKLIST DE VALIDAÇÃO DO ARQUIVO `.narracao.md`

Antes de considerar um arquivo de narração pronto, verifique:

```
[ ] O arquivo não contém NENHUM caractere grego (α-ω, Α-Ω, incluindo diacríticos)
[ ] Cada marcador está em uma linha própria, no formato [NOME_MARCADOR]
[ ] Há um marcador [TITULO] no início
[ ] Há um marcador [INTRODUCAO] após o título
[ ] Para cada unidade do módulo, há marcadores [UNIDADE], [EXPOSICAO], [DICA], [VERSICULO]
[ ] Quando a unidade usa palavra com diacríticos, há [NOTA_DIACRITICOS]
[ ] Para cada questão, há marcadores [PERGUNTA], [OPCOES], [PAUSA], [RESPOSTA]
[ ] Há marcadores [TRANSICAO] entre unidades e antes da aplicação
[ ] Há marcador [FINALIZACAO] no fim do módulo
[ ] As referências bíblicas estão em formato falado
    ("João, capítulo 11, versículo 25" — não "João 11:25")
[ ] O texto está em segunda pessoa ("você") quando se dirige ao aluno
```

---

## REGRAS DE GERAÇÃO (PARA O AUTOR DO MÓDULO)

1. **Apenas exposição + dicas + versículos + perguntas.** Não incluir:
   - Campos técnicos (`id`, `srsKey`, `ordem`, `tipo`, `xpTotal`)
   - Bloco `---MODULO---` / `---UNIDADE---` / `---APLICACAO---`
   - Explicações de erro (apenas o `explicacao` da resposta, em tom afirmativo)
   - Referências técnicas a dimensões de revisão, regras sistêmicas, etc.

2. **Tom professoral conversacional.** Use "você" para se dirigir ao aluno. Evite termos técnicos linguísticos sem explicação.

3. **Transcrição fonética agressiva.** Toda palavra grega deve estar em PT. Quando a palavra grega é importante, mencione o significado em PT logo após:
   - `ἀγάπη` → `agape (que significa "amor")` ou simplesmente `agape`

4. **Versículos em formato falado:**
   - `1 João 4:8` → `Primeira João, capítulo 4, versículo 8`
   - `Apocalipse 1:8` → `Apocalipse, capítulo 1, versículo 8`
   - `João 11:25` → `João, capítulo 11, versículo 25`

5. **Pausas estratégicas.** O marcador `[PAUSA]` deve vir antes da `[RESPOSTA]` em toda questão. Use pausas implícitas (linhas em branco) entre parágrafos de exposições longas.

6. **Dicas mnemônicas com calma.** O marcador `[DICA]` deve ter texto curto e direto — uma ou duas frases. Se for mais longo, considere quebrar em duas dicas.

7. **Transições com gancho.** O marcador `[TRANSICAO]` deve criar um mini-cliffhanger entre unidades, mantendo o aluno engajado.

---

## COMO EXPANDIR O DICIONÁRIO

Quando um novo módulo usar uma palavra grega que ainda não está no dicionário:

1. Identifique a palavra no `.apostila.md` (ex: `νόμος` em C1-M03).
2. Adicione a entrada no dicionário `GREEK_WORDS_FONETICA` no script Python:
   ```python
   "νόμος": "nomos",
   ```
3. Adicione também a versão com inicial maiúscula (se aplicável):
   ```python
   "Νόμος": "Nomos",
   ```
4. Regenere o `.narracao.md` do módulo — o sistema cuidará da substituição.

---

## EXEMPLO COMPLETO DE BLOCO DE PERGUNTA

Entrada no `.apostila.md`:
```yaml
QUESTAO tipo:multiple_choice
pergunta: Qual é o som da letra Alfa?
correta: /a/ como em "pai"
opcoes: /a/ como em "pai" | /e/ como em "pé" | /i/ como em "vida" | /o/ como em "pó"
explicacao: Alfa = /a/. O mesmo som do A do português.
```

Saída no `.narracao.md`:
```markdown
[PERGUNTA]
Qual é o som da letra Alfa?

[OPCOES]
Opção 1: "a" como em "pai".
Opção 2: "e" como em "pé".
Opção 3: "i" como em "vida".
Opção 4: "o" como em "pó".

[PAUSA]

[RESPOSTA]
A resposta correta é a Opção 1: "a" como em "pai". Alfa tem o mesmo som do A do português. Por isso a letra é tão fácil para falantes de português.
```

---

## NOTA SOBRE O WORKFLOW

```
1. Módulo .apostila.md é criado e revisado     → WikiProjeto/Modulos/C1-MNN.apostila.md
2. Módulo é publicado (status 🟢 no INDICE.md)  →  OK
3. Autor gera manualmente o .narracao.md         →  WikiProjeto/Modulos/C1-MNN.narracao.md
   (usando este documento como guia)
4. Script Python lê .narracao.md e gera áudio    →  via Piper TTS
5. Áudio é publicado no app                       →  integrado ao LessonEngine
```

A geração do `.narracao.md` é um **passo manual** hoje, mas a estrutura é determinística o suficiente para que um script automatizado possa ser escrito depois. Por ora, mantemos o controle humano sobre a curadoria do texto falado.

---

*Documento de especificação v1.0 — Koiné App.*
*Mantido pelo Estruturador, em conjunto com o Sistema de Faturação de Conteúdo.*
