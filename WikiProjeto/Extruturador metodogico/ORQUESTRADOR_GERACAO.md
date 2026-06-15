# ORQUESTRADOR DE GERAÇÃO — KOINÉ APP
## O Maestro do Pipeline de Módulos
### Define a leitura dos agentes, inicia o trabalho, chama a revisão e publica o módulo

---

## IDENTIDADE E MISSÃO

Este documento é o **maestro** do projeto Koiné. Ele não ensina, não estrutura, não formata, não revisa. Ele **orquestra**.

Sua única responsabilidade é:

```
1. DECLARAR quais agentes existem no pipeline
2. DEFINIR a ordem em que devem ser lidos
3. INICIAR o trabalho de geração do módulo solicitado
4. CHAMAR o Agente de Revisão ao final da geração
5. PUBLICAR o módulo aprovado na pasta Modulos/
```

Todos os critérios substantivos — filosóficos, pedagógicos, técnicos, de qualidade — estão em outros documentos. Este orquestrador é a **espinha do processo**, não o conteúdo.

> Você é o regente. Os outros documentos são os músicos. Sua função é fazê-los entrar na ordem certa, no tempo certo.

---

## O PIPELINE — VISÃO GERAL

```
┌─────────────────────────────────────────────────────────────────┐
│  ENTRADA:  ID do módulo solicitado (ex: "C1-M05")                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
        ╔════════════════════════════════════╗
        ║  FASE 1 — LEITURA DOS AGENTES       ║
        ║  Carregar contexto na ordem abaixo. ║
        ╚══════════════════╤═════════════════╝
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
   Metodologia/         Grade/         Estruturador/
   ORQUESTRADOR_        GRADE_          SISTEMA_
   EDITORIAL.md         CURRICULAR_     FATURACAO_
                        KOINE.md        CONTEUDO.md
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
        ╔════════════════════════════════════╗
        ║  FASE 2 — GERAÇÃO DO MÓDULO        ║
        ║  Aplicar os três documentos acima  ║
        ║  para produzir <ID>.apostila.md    ║
        ╚══════════════════╤═════════════════╝
                           │
                            ▼
         ╔════════════════════════════════════╗
         ║  FASE 3 — REVISÃO                  ║
         ║  Submeter ao Agente de Revisão.    ║
         ╚══════════════════╤═════════════════╝
                            │
                   ┌────────┴────────┐
                   ▼                 ▼
               APROVADO          REPROVADO
                   │                 │
                   ▼                 ▼
         ╔══════════════╗    Volta para Fase 2
         ║  FASE 4 —    ║    com relatório de
         ║  PUBLICAÇÃO  ║    correções
         ║  Salvar em   ║
         ║  Modulos/    ║
         ╚══════════╤═══╝
                    │
                    ▼
         ╔════════════════════════════════════╗
          ║  FASE 5 — PACOTE DE ENTREGA         ║
          ║  Gerar <ID>.narracao.md curado +   ║
          ║  <ID>.mp3 + <ID>.cues.json via    ║
          ║  Piper TTS.                         ║
          ║  Entregar: apostila + áudio + meta. ║
         ╚══════════════════╤═════════════════╝
                            │
                            ▼
                       PUBLICADO
                       (pacote)
```

O pipeline é **iterativo** entre Fases 2 e 3. O ciclo de qualidade termina com aprovação. A Fase 5 é linear e posterior.

---

## AGENTES DO PIPELINE

O pipeline é composto por **quatro agentes**. Cada agente é um arquivo `.md` com uma responsabilidade bem definida. Nenhum agente invade o escopo do outro.

### AGENTE 1 — Filosofia Editorial

```
ARQUIVO:     WikiProjeto/Metodologia/ORQUESTRADOR_EDITORIAL.md
RESPONSÁVEL: Definir a filosofia pedagógica, o tom professoral,
             o padrão de profundidade, e o checklist editorial
             que rege TODA a produção de conteúdo.
PAPEL NO PIPELINE: Fonte da verdade sobre COMO ensinar.
NÃO FAZ:       Não define o que ensinar, não define o formato
               técnico, não revisa, não publica.
```

### AGENTE 2 — Grade Curricular

```
ARQUIVO:     WikiProjeto/Grade/GRADE_CURRICULAR_KOINE.md
RESPONSÁVEL: Dizer, módulo a módulo, o que deve ser ensinado:
             letras, formas, palavras-âncora, versículos,
             XP, tipo de unidades, regras i+1.
PAPEL NO PIPELINE: Fonte da verdade sobre O QUE ensinar.
NÃO FAZ:       Não define o tom, não define o formato, não revisa,
               não publica.
```

### AGENTE 3 — Sistema de Faturação de Conteúdo

```
ARQUIVO:     WikiProjeto/Estruturador/SISTEMA_FATURACAO_CONTEUDO.md
RESPONSÁVEL: Definir o formato técnico do arquivo .apostila.md,
             os blocos ---MODULO---, ---UNIDADE---, ---APLICACAO---,
             os tipos de questão, e as regras do parser.
PAPEL NO PIPELINE: Fonte da verdade sobre EM QUE FORMATO escrever.
NÃO FAZ:       Não define o tom, não define o que ensinar,
               não revisa, não publica.
```

### AGENTE 4 — Revisão

```
ARQUIVO:     WikiProjeto/Agente de Revisão/AGENTE_REVISAO.md
RESPONSÁVEL: Avaliar o módulo gerado contra os critérios dos
             três agentes acima e emitir um veredito
             (APROVADO | APROVADO COM RESSALVAS | REPROVADO).
PAPEL NO PIPELINE: Gate de qualidade. Última instância antes
                   da publicação.
NÃO FAZ:       Não gera conteúdo, não corrige, não reescreve.
               Apenas avalia e aponta.
```

### AGENTE 5 — Correções Sistêmicas (documento vivo)

```
ARQUIVO:     WikiProjeto/Estruturador/CORRECOES_SISTEMICAS_V1.md
RESPONSÁVEL: Carregar as regras sistêmicas vigentes (S-01 a S-06)
             e as exceções formalizadas (DS-01, DS-02) que
             complementam os três agentes de produção. Inclui o
             mapa de versículos âncora e o checklist corretivo.
PAPEL NO PIPELINE: Memória institucional de erros. Cada revisão
                   de módulo pode gerar uma nova regra sistêmica
                   ou atualizar uma existente. Este documento é
                   VERSIONADO (v1, v2, ...) e incrementado.
NÃO FAZ:       Não define tom, não define o que ensinar, não
               revisa diretamente, não publica.
```

### AGENTE 6 — Narração Guiada e Áudio (TTS)

```
ARQUIVO:     WikiProjeto/Estruturador/NARRACAO.md
SCRIPT:      WikiProjeto/Geração de audio piper/gerar_audio.py
             (v2.0; lê .narracao.md e gera MP3 + cues.json
             via Piper TTS + lameenc)
VALIDADOR:   WikiProjeto/Geração de audio piper/validate_cues.py
             (equivalente Python do validateCues.ts; verifica
             o cues.json contra a spec v1.0)
SPEC:        WikiProjeto/Estruturador/cues-format-spec.md
             (define schema do cues.json consumido pelo AudioEngine)
RESPONSÁVEL: Definir o formato do arquivo <ID>.narracao.md
             (curado, 100% sem glifos gregos, com marcadores
             [SEÇÃO]), o dicionário grego→PT, e o pipeline
             de síntese em chunks com timecodes por cue.
PAPEL NO PIPELINE: Atua APENAS na FASE 5, após aprovação do
                   módulo. Transforma a apostila aprovada em
                   pacote de entrega (apostila + MP3 + cues.json).
NÃO FAZ:       Não define o que ensinar, não revisa, não
               publica. Não substitui a apostila — apenas
               adiciona a camada de áudio narrado.
```

---

## ORDEM DE LEITURA DOS AGENTES

Antes de iniciar a geração de qualquer módulo, **todos os quatro agentes de produção (1, 2, 3 e 5) devem ser lidos na ordem abaixo**, e mantidos em contexto simultaneamente. O agente 4 (revisão) é conhecido desde o início, mas carregado em profundidade apenas no momento da revisão.

```
PASSO 1 ──►  Metodologia/ORQUESTRADOR_EDITORIAL.md
             Por que primeiro: define o tom, a filosofia, o padrão
             de profundidade. É a lente através da qual todo o
             conteúdo deve ser olhado.

PASSO 2 ──►  Grade/GRADE_CURRICULAR_KOINE.md
             Por que segundo: diz O QUE ensinar. Lendo depois da
             filosofia, você já tem o filtro editorial pronto
             para julgar as escolhas da grade.

PASSO 3 ──►  Estruturador/SISTEMA_FATURACAO_CONTEUDO.md
             Por que terceiro: define o formato. Lendo por último,
             você já sabe o tom e o conteúdo — só falta aprender
             a sintaxe técnica que os conterá.

PASSO 4 ──►  Estruturador/CORRECOES_SISTEMICAS_V1.md
             Por que quarto: carrega a memória institucional de
             erros. São as regras que complementam os três
             agentes de produção com correções derivadas de
             revisões anteriores. Use o mapa de versículos
             âncora (Apêndice A) e a instrução padrão de
             diacríticos (Apêndice B) como referência direta.

PASSO 5 ──►  Agente de Revisão/AGENTE_REVISAO.md
             Por que em paralelo: o Agente de Revisão é carregado
             PELA PRIMEIRA VEZ apenas no momento de revisar, mas
             sua existência deve ser CONHECIDA desde o início.
             Saber que haverá gate de qualidade muda a postura
             de quem gera.
```

**Regra de leitura:** os quatro agentes de produção (1, 2, 3 e 5) devem coexistir no contexto do gerador durante toda a FASE 2. Se algum deles cair do contexto, a geração é interrompida e o documento é recarregado.

---

## INÍCIO DOS TRABALHOS

Quando um humano (ou sistema) solicita a geração de um módulo, este orquestrador é ativado com **um único parâmetro de entrada**:

```
ENTRADA: <ID_DO_MÓDULO>
         Exemplo: C1-M05
         Exemplo: C2-M03
         Exemplo: C1-M10
```

A partir desta entrada, o pipeline é executado de forma determinística.

### PASSO A — Validação da entrada

```
Verificar:
  [ ] O ID está no formato correto (C<n>-M<nn>)
  [ ] O ID existe na GRADE_CURRICULAR_KOINE.md
  [ ] Todos os módulos anteriores na grade já foram publicados
      em Modulos/ (regra i+1: nenhum módulo pode ser gerado
      sem que seus predecessores estejam prontos)

Se qualquer verificação falhar:
  → INTERROMPER o pipeline.
  → Reportar ao humano o motivo da interrupção.
  → Não tentar compensar, não improvisar.
```

### PASSO B — Briefing do módulo

Antes de gerar, montar um briefing com os dados extraídos da grade:

```
BRIEFING DO MÓDULO <ID>

Ciclo:                <extraído da grade>
Título:               <extraído da grade>
Letras/Formas:        <lista exata>
Palavra-âncora:       <forma léxica com acento>
Versículos-âncora:    <lista com referência completa>
Tipo de unidades:     <quantidade e tipo>
XP total permitido:   <faixa>
Inclui Aula do Versículo:  <sim|não>
Requisitos especiais: <citados na grade, se houver>

Este briefing é a referência operacional durante toda a geração.
Qualquer desvio dele é uma falha a ser corrigida.
```

---

## FASE 2 — GERAÇÃO DO MÓDULO

Com os três agentes carregados e o briefing montado, inicia-se a geração.

### PASSO C — Estruturação

```
Seguindo o SISTEMA_FATURACAO_CONTEUDO.md:
  1. Criar o cabeçalho ---MODULO--- com todos os campos
     (id, ciclo, ordem, titulo, descricao, versiculoAncora,
     referenciaAncora, metodoPrimario, xpTotal, revisadoPor: [pendente],
     dataRevisao: [pendente]).

  2. Para cada unidade do briefing, criar um bloco ---UNIDADE---
     com as quatro seções: EXPOSIÇÃO, RECONHECIMENTO,
     ASSOCIAÇÃO, RECORDAÇÃO.
     ATENÇÃO: o campo `destaque` na EXPOSIÇÃO é OBRIGATÓRIO
     (seção 1.3-A do SISTEMA_FATURACAO_CONTEUDO.md).
     Sem ele, a letra não aparece no cabeçalho do ExposureCard.

  3. Criar o bloco ---APLICACAO--- com a Fase 5.

Arquivo de trabalho: arquivo temporário (não publicar ainda).
```

### PASSO D — Conteúdo

```
Seguindo o ORQUESTRADOR_EDITORIAL.md:
  1. Escrever cada EXPOSIÇÃO com tom professoral,
     origem histórica do elemento, versículo emblemático,
     dica mnemônica, frequência no NT (quando aplicável).

  2. Escrever cada questão de cada fase com opções
     plausíveis, respostas corretas dentro das opções,
     explicações claras.

  3. Verificar que NENHUMA questão usa conteúdo não
     ensinado neste módulo ou em módulos anteriores
     (regra i+1 da GRADE_CURRICULAR_KOINE.md).

  4. Se o módulo inclui Aula do Versículo, escrevê-la
     conforme o padrão do orquestrador editorial:
     apresentação inteira → tradução palavra a palavra →
     comentário teológico-linguístico → word_order →
     questão de interpretação.
```

### PASSO E — Validação técnica prévia

```
Antes de submeter à revisão, o gerador deve fazer uma
auto-verificação rápida:

  [ ] Cabeçalho ---MODULO--- completo
  [ ] Todas as unidades com as 4 seções
  [ ] Campo `destaque` presente em TODAS as unidades
      (obrigatório — sem ele a letra não aparece no cabeçalho visual)
  [ ] ---APLICACAO--- presente
  [ ] Tipos de questão válidos
  [ ] Respostas corretas dentro das opções
  [ ] Versículos conferidos contra NA28/UBS5 ou TR
  [ ] Nenhum placeholder (___ , [preencher] , TBD)

Esta auto-verificação NÃO substitui o Agente de Revisão.
É apenas um filtro grosseiro para evitar submissões
descartáveis.
```

O arquivo de trabalho é salvo temporariamente. **Não vai para `Modulos/` ainda.**

---

## FASE 3 — CHAMADA DA REVISÃO

O arquivo gerado é submetido ao **Agente de Revisão** (AGENTE_REVISAO.md).

### PASSO F — Submissão

```
O orquestrador entrega ao Agente de Revisão:
  • Caminho do arquivo gerado
  • Briefing do módulo (do PASSO B)
  • Indicação do tipo de revisão (sempre "Módulo Novo"
    na primeira passagem; "Edição" nas subsequentes)
```

### PASSO G — Aguardar veredito

```
O Agente de Revisão devolve um relatório estruturado
conforme o TEMPLATE definido no AGENTE_REVISAO.md.
```

### PASSO H — Tratar o veredito

```
SE veredito = 🟢 APROVADO
   → Avançar para FASE 4 (publicação).
   → Anexar o relatório ao módulo.

SE veredito = 🟡 APROVADO COM RESSALVAS
   → Avançar para FASE 4 (publicação).
   → Anexar o relatório ao módulo.
   → Criar lista de correções a fazer ANTES do próximo
     módulo ser gerado (para não acumular débitos técnicos).

SE veredito = 🔴 REPROVADO — CORREÇÃO OBRIGATÓRIA
   → NÃO publicar.
   → Voltar para FASE 2 (PASSO D) usando o relatório
     de revisão como lista de correções.
   → Reauto-verificar (PASSO E).
   → Resubmeter ao Agente de Revisão.
   → Limite: até 3 iterações. Se após 3 iterações ainda
     reprovado, escalar para o humano com histórico
     completo de relatórios.

SE veredito = ⚫ REPROVADO — REESCRITA NECESSÁRIA
   → NÃO publicar.
   → Voltar para FASE 2 (PASSO C) — descartar a versão
     atual e reestruturar do zero, seguindo as dimensões
     indicadas pelo revisor.
   → Reauto-verificar (PASSO E).
   → Resubmeter.
```

---

## FASE 4 — PUBLICAÇÃO

Quando o veredito é APROVADO ou APROVADO COM RESSALVAS, o módulo é publicado.

### PASSO I — Movimentação

```
MOVER o arquivo de trabalho para:
    WikiProjeto/Modulos/<ID>.apostila.md

Exemplos:
    WikiProjeto/Modulos/C1-M01.apostila.md
    WikiProjeto/Modulos/C1-M05.apostila.md
    WikiProjeto/Modulos/C2-M08.apostila.md
```

### PASSO J — Arquivamento do relatório

```
O relatório de revisão do Agente de Revisão é arquivado
em:
    WikiProjeto/Modulos/<ID>.relatorio-revisao.md

Este arquivo é parte da documentação do módulo.
Permite que revisões futuras (edições) tenham o histórico
de qualidade do módulo.
```

### PASSO K — Atualização do manifesto

```
Atualizar o arquivo:
    WikiProjeto/Modulos/INDICE.md

Esta é a lista canônica de módulos publicados. Cada nova
publicação adiciona uma linha:

| ID      | Título                              | XP  | Data       | Status                |
|---------|-------------------------------------|-----|------------|-----------------------|
| C1-M01  | Vogais Base — Α, Ε, Ι              | 60  | 2025-01-15 | 🟢 Aprovado            |
| C1-M02  | Vogais Abertas e Fechadas           | 60  | 2025-01-22 | 🟢 Aprovado            |
| C1-M05  | Novas Consoantes: Π, Ρ, Μ          | 65  | 2025-02-12 | 🟡 Aprovado c/ ressalvas |
```

### PASSO L — Comunicação

```
Reportar ao humano (ou sistema) que solicitou a geração:

  ✅ Módulo <ID> publicado com sucesso.
  📄 Arquivo: WikiProjeto/Modulos/<ID>.apostila.md
  📋 Veredito: <🟢|🟡|🔴|⚫>
  🔄 Iterações de revisão: <n>
  ⚠️ Ressalvas: <lista, se houver>
  🎙️ Áudio: public/audio/<ID>/<ID>.mp3 (+ .cues.json)

  Próximo módulo sugerido: <ID seguinte na grade>
```

---

## FASE 5 — PACOTE DE ENTREGA (NARRAÇÃO + ÁUDIO)

Com a apostila publicada, o módulo é então empacotado com a camada de **narração guiada em áudio**. Esta fase é **opcional por módulo, obrigatória para o ciclo I** (crianças precisam ouvir) e roda em três sub-passos.

### PASSO M — Gerar a narração curada

```
CRIAR:  WikiProjeto/Modulos/<ID>.narracao.md

O arquivo .narracao.md é uma versão curada da apostila,
pronta para ser lida por TTS, contendo:

  • 100% de texto em PT-BR (0 glifos gregos, range 0370-03FF)
  • Marcadores [SEÇÃO] em linhas próprias
    ([TITULO], [INTRODUCAO], [UNIDADE], [EXPOSICAO],
     [NOTA_DIACRITICOS], [DICA], [VERSICULO], [PERGUNTA],
     [OPCOES], [PAUSA], [RESPOSTA], [TRANSICAO], [FINALIZACAO])
  • Pronúncia fonética PT-BR para palavras gregas
    (agápe, Iesús, egó, hína, idú, êipen)
  • Tom professoral adaptado para áudio (frases curtas,
    pausas marcadas, ênfase em dicas e versículos)

Formato completo: ver WikiProjeto/Estruturador/NARRACAO.md
```

### PASSO N — Sintetizar o áudio (MP3 + cues.json)

```
MOVER o .narracao.md para o ambiente de síntese:
  →  WikiProjeto/Geração de audio piper/<ID>.narracao.md

EXECUTAR o script (com a venv local já instalada):
  >  cd "WikiProjeto/Geração de audio piper"
  >  .\.venv\Scripts\python.exe gerar_audio.py `
        --input <ID>.narracao.md `
        --output-dir "../../public/audio" `
        --no-play

O script produz (v2.0 — MP3 + timecodes):
  • 1 arquivo MP3 mono, 128 kbps, 22050 Hz (em public/audio/<ID>/<ID>.mp3)
  • 1 arquivo cues.json com cues[] e groups[] (em public/audio/<ID>/<ID>.cues.json)
  • Duração típica: 8 a 12 min por módulo de 60-90 XP
  • Pausas reais de silêncio PCM entre seções
  • Relatório final com tamanho, cues, groups, duração

VALIDAR o cues.json gerado:
  >  .\.venv\Scripts\python.exe validate_cues.py `
        "../../public/audio/<ID>/<ID>.cues.json"
```

### PASSO O — Validar e atualizar manifesto

```
[ ] O .narracao.md passa no teste "0 glifos gregos"
    (regex `[\u0370-\u03FF\u1F00-\u1FFF]`)
[ ] O .mp3 tem tamanho > 100 KB (não-vazio, ~10 MB típico)
[ ] O .cues.json passa no validate_cues.py (9 regras do spec)
[ ] O .mp3 toca limpo no player padrão do Windows
[ ] Duração total coerente: 5-15 min para módulos de 60-90 XP
[ ] Groups com PERGUNTA são lessonPhase="exercise" + canSkip=true
[ ] TRANSICAO são grupos próprios (não agrupados com próxima unidade)

ATUALIZAR o INDICE.md com a coluna Áudio:
  | ID      | Título                    | XP  | Status     | Áudio               |
  |---------|---------------------------|-----|------------|---------------------|
  | C1-M01  | Vogais Base               | 60  | 🟢 Aprovado | ✅ C1-M01.mp3 (11:10) |
  | C1-M02  | Vogais Abertas/Fechadas   | 60  | 🟢 Aprovado | ✅ C1-M02.mp3 (10:08) |

ENTREGAR o pacote final:
  📄 WikiProjeto/Modulos/<ID>.apostila.md
  📝 WikiProjeto/Modulos/<ID>.narracao.md
  🎵 public/audio/<ID>/<ID>.mp3
  📑 public/audio/<ID>/<ID>.cues.json
  📋 WikiProjeto/Modulos/<ID>.relatorio-revisao.md
```

### Por que esta fase é separada

```
• A revisão (Fase 3) avalia o conteúdo pedagógico da apostila.
  Não tem como revisar a pronúncia fonética de ágape ou a
  duração de uma pausa — isso é trabalho do AGENTE 6.

• A síntese é lenta (1-3 min por chunk no CPU).
  Não deve bloquear a revisão de outros módulos.

• A narração curada é REPRODUZÍVEL.
  Mesmo .narracao.md → mesmo .mp3 + mesmo .cues.json.
  Trocar voz = trocar --model. Trocar pausas = editar
  marcadores. Re-sintetizar = mesmo comando.

• O cues.json é a interface com o AudioEngine.
  Permite que o app saiba exatamente quando cada seção
  começa/termina, exiba legendas, e habilite navegação
  por cue (pular exercício, voltar ao versículo, etc.).

• O fallback é trivial: se o TTS falhar, a apostila
  já está publicada. O aluno não fica sem conteúdo.
```

---

## TRATAMENTO DE ERROS E EXCEÇÕES

### Erro na entrada

```
Se o ID do módulo solicitado é inválido, inexistente,
ou tem predecessores não publicados:
  → Reportar imediatamente o erro.
  → Sugerir o ID correto ou listar os predecessores
    pendentes.
  → Não improvisar.
```

### Erro na geração

```
Se o gerador não consegue produzir o módulo por
insuficiência de contexto ou contradição entre agentes:
  → Interromper.
  → Reportar a contradição (ex: "a grade pede X mas o
    orquestrador editorial proíbe X neste estágio").
  → Escalonar para decisão humana.
```

### Erro na revisão

```
Se o Agente de Revisão falha em produzir um relatório
estruturado, ou produz um relatório internamente
contraditório:
  → Reinvocar o agente pedindo que siga o template.
  → Se persistir, escalonar para humano.
```

### Erro na publicação

```
Se a pasta Modulos/ não existe ou não tem permissão de
escrita:
  → Criar a pasta (se não existir).
  → Reportar erro de permissão, se persistir.
```

---

## COMO EXECUTAR ESTE ORQUESTRADOR

Este orquestrador pode ser executado por:

### Por um humano

```
1. Abra este documento (WikiProjeto/ORQUESTRADOR_GERACAO.md).
2. Identifique o módulo a ser gerado (ex: C1-M05).
3. Leia, na ordem:
     a. Metodologia/ORQUESTRADOR_EDITORIAL.md
     b. Grade/GRADE_CURRICULAR_KOINE.md
     c. Estruturador/SISTEMA_FATURACAO_CONTEUDO.md
4. Monte o briefing do módulo.
5. Escreva o arquivo <ID>.apostila.md seguindo os três
   documentos acima.
6. Submeta o arquivo ao Agente de Revisão, lendo o
   AGENTE_REVISAO.md e aplicando seus critérios.
7. Trate o veredito conforme a FASE 3.
8. Publique conforme a FASE 4.
```

### Por uma LLM (modelo de linguagem)

```
System prompt:
  "Você é o executor do ORQUESTRADOR DE GERAÇÃO do Koiné App.
   Carregue os quatro documentos do pipeline e siga o
   protocolo definido em ORQUESTRADOR_GERACAO.md.
   Não invente regras além das que estão nos documentos.
   Em caso de dúvida entre documentos, prevalece a
   GRADE_CURRICULAR_KOINE.md."

User prompt:
  "Gere o módulo <ID>."

A LLM então executa:
  1. Lê os 4 agentes (mantém em contexto).
  2. Faz o briefing.
  3. Gera o .apostila.md.
  4. Auto-verifica.
  5. Submete ao Agente de Revisão (pode ser a mesma LLM
     lendo o AGENTE_REVISAO.md, ou uma instância separada).
  6. Trata o veredito.
  7. Publica.
```

### Por um script automatizado

```
Um script (em Node, Python, etc.) pode:
  1. Receber o ID do módulo como parâmetro.
  2. Carregar os 4 documentos como contexto.
  3. Chamar uma API de LLM com system prompt fixo
     referenciando este orquestrador.
  4. Salvar a resposta como arquivo temporário.
  5. Chamar uma segunda chamada de LLM com system prompt
     do Agente de Revisão, passando o arquivo gerado.
  6. Tratar o veredito automaticamente.
  7. Mover o arquivo para Modulos/ se aprovado.

ATENÇÃO: a revisão automática por LLM não substitui
revisão humana para os primeiros 5 módulos de cada ciclo.
A confiança no Agente de Revisão é calibrada por uso.
```

---

## CHECKLIST DO ORQUESTRADOR (auto-verificação final)

Antes de declarar o pipeline concluído para um módulo:

```
FASE 1-4 (conteúdo):
[ ] Os 4 agentes foram lidos (3 de produção + 1 de revisão)
[ ] O briefing do módulo foi montado a partir da grade
[ ] O arquivo <ID>.apostila.md foi gerado
[ ] O arquivo foi auto-verificado (formato técnico básico)
[ ] O arquivo foi submetido ao Agente de Revisão
[ ] O veredito foi tratado conforme a FASE 3
[ ] Se aprovado, o arquivo foi movido para Modulos/
[ ] O relatório de revisão foi arquivado em Modulos/
[ ] O INDICE.md foi atualizado
[ ] A comunicação final foi enviada ao solicitante

FASE 5 (pacote de áudio) — obrigatória para o Ciclo I:
[ ] <ID>.narracao.md criado (0 glifos gregos, marcadores [SEÇÃO])
[ ] <ID>.narracao.md movido para "Geração de audio piper/"
[ ] gerar_audio.py v2.0 executado com --no-play
[ ] <ID>.mp3 gerado em public/audio/<ID>/ (tamanho > 100 KB)
[ ] <ID>.cues.json gerado em public/audio/<ID>/
[ ] validate_cues.py passa (9 regras do spec)
[ ] INDICE.md atualizado com coluna "Áudio"
[ ] Pacote final entregue (apostila + narração + MP3 + cues.json + relatório)
```

Todos os itens marcados → pipeline concluído com sucesso.

---

## PRINCÍPIOS DO ORQUESTRADOR

### O orquestrador nunca decide conteúdo

Ele não diz qual é a palavra grega certa, qual é o versículo emblemático, qual é a tradução correta. Ele apenas **faz os agentes certos falarem na ordem certa**. Toda decisão substantiva é de um dos três agentes de produção.

### O orquestrador é o único que move arquivos

Apenas este documento autoriza a movimentação de `.apostila.md` para `Modulos/`. Os agentes de produção não publicam. O agente de revisão não publica. Quem publica é o orquestrador, mediante veredito favorável.

### O orquestrador é finito

Este pipeline tem começo, meio e fim claros. Ele não é um sistema de monitoramento contínuo, não é um dashboard, não é um agente autônomo de longo prazo. É um protocolo para gerar UM módulo por vez, com qualidade controlada.

### O orquestrador evolui

Este documento é versão 1.0. Após a produção dos primeiros 5 módulos com este pipeline, ele deve ser revisado para incorporar lições aprendidas — gargalos, ambiguidades, atalhos que funcionaram, regras que se mostraram desnecessárias.

---

*ORQUESTRADOR DE GERAÇÃO — KOINÉ APP*
*Versão 1.1 — Protocolo de pipeline + FASE 5 (pacote de áudio).*
*Documento raiz do projeto WikiProjeto.*
*Carrega: Metodologia, Grade, Estruturador, Correções Sistêmicas, Agente de Revisão, Narração/Áudio.*
*Entrega: Módulos publicados em Modulos/ + pacote de áudio em Geração de audio piper/.*
