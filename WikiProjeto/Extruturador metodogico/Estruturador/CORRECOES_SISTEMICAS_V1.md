# CORREÇÕES SISTÊMICAS — KOINÉ APP
## Baseado na Revisão de C1-M01 · Versão 1.0
### Documento de aplicação obrigatória a partir de C1-M02

---

## CONTEXTO E FINALIDADE

Este documento foi gerado após a primeira revisão completa de um módulo produzido pelo pipeline de geração do Koiné (C1-M01). Ele registra **seis inconsistências** identificadas entre o conteúdo gerado e as especificações dos documentos-fonte, e define as **regras corretivas** que devem ser incorporadas pelo agente gerador a partir de agora.

Este documento é lido **após** o ORQUESTRADOR_EDITORIAL.md e **antes** de iniciar a escrita de qualquer módulo do Ciclo I ou Ciclo II. Ele não substitui os documentos-fonte — ele os **complementa e precisa** nos pontos onde ambiguidade ou omissão gerou erro.

Estrutura:
- **Seção 1** — Correções obrigatórias ao C1-M01 existente (4 itens)
- **Seção 2** — Regras sistêmicas para todos os módulos futuros (6 regras derivadas das falhas)
- **Seção 3** — Decisões de sistema formalizadas (2 itens que o sistema tolerará como exceção documentada)
- **Seção 4** — Checklist adicional de geração (complementa o checklist do Orquestrador)

---

## SEÇÃO 1 — CORREÇÕES OBRIGATÓRIAS AO C1-M01

Estas quatro correções devem ser aplicadas ao arquivo `C1-M01.apostila.md` antes que ele seja usado como referência para módulos subsequentes.

### Correção 1.A — Versículo âncora de U03 (Iota)

**Localização:** `C1-M01-U03` / campos `versiculo` e `referencia`

**Estado atual:**
```
versiculo: Ἰησοῦς
referencia: Mateus 1:1
```

**Estado correto:**
```
versiculo: Ἰησοῦς εἶπεν
referencia: João 11:25
```

**Por que importa:** A grade especifica João 11:25 como versículo âncora do Iota. Esse versículo será o versículo-troféu do Ciclo II — a repetição futura cria uma camada de reconhecimento valiosa para o aluno. Mateus 1:1 é válido, mas não é o especificado.

**Ajuste no texto da exposição:** A menção a "Mateus abre seu Evangelho com..." pode ser mantida como exemplo adicional, mas a referência âncora canônica deve ser João 11:25. Sugestão de redação para o trecho final da exposição:

> "No Novo Testamento, iota é a primeira letra do nome Ἰησοῦς (Jesus). Em João 11:25, Jesus diz: 'Ἐγώ εἰμι ἡ ἀνάστασις καὶ ἡ ζωή' — 'Eu sou a ressurreição e a vida.' O Ι que abre Ἰησοῦς abre também essa declaração."

---

### Correção 1.B — Forma grega Η na exposição de U02 (Épsilon)

**Localização:** `C1-M01-U02` / campo `explicacao`

**Trecho atual (problemático):**
> "existe uma letra chamada Eta (Η) que tem a MESMA aparência em maiúsculo"

**Trecho corrigido:**
> "Atenção: no Módulo 3, você vai conhecer uma outra letra que se parece com este E em maiúsculo — ela tem um som completamente diferente. Por enquanto, fique com o épsilon: /e/ breve, como em 'pé'."

**Por que importa:** A exibição da forma grega Η viola a regra i+1 — introduz um glifo do conjunto de C1-M03 no contexto visual de C1-M01. O aluno ainda não tem referência para diferenciar os dois símbolos; a menção prematura pode criar confusão em vez de prevenção. O alerta continua existindo, mas sem o glifo.

---

### Correção 1.C — Questão 1 da ---APLICACAO---

**Localização:** `---APLICACAO---` / Questão 1 (tpr_digital)

**Estado atual:**
```
pergunta: Na palavra ἀγάπη, qual é a primeira letra (a letra Alfa)?
correta: ἀ
opcoes: ἀ | γ | ά | π
```

**Estado correto (alinhado com a grade):**
```
QUESTAO tipo:multiple_choice xp:3
pergunta: Na palavra ἀγάπη, quantas vezes a letra Alfa (Α/α) aparece?
correta: 2 vezes (ἀ e ά)
opcoes: 1 vez | 2 vezes (ἀ e ά) | 3 vezes | nenhuma vez
explicacao: ἀγάπη tem dois alfas: o ἀ no início (alfa com espírito suave) e o ά no meio (alfa com acento agudo). As marcas sobre as letras são diacríticos — você aprende isso no Módulo 9. O que importa agora é reconhecer que ambas são a mesma letra: Alfa.
```

**Por que importa:** A grade especifica explicitamente "identifique todas as letras Α/α que aparecem" — o objetivo é varredura da palavra inteira, não identificação pontual. A tarefa de varredura é pedagogicamente mais rica e prepara o aluno para o trabalho com palavras inteiras nos módulos seguintes.

---

### Correção 1.D — Descrição da forma do Épsilon em U02

**Localização:** `C1-M01-U02` / campo `explicacao` e campo `dica`

**Problema:** O texto diz "Ε não tem a barra do meio. É um E que perdeu um traço." Isso é impreciso — Ε maiúsculo tem três hastes horizontais, exatamente como o E do português. A confusão está entre maiúscula e minúscula.

**Correção no campo `explicacao`:** Substituir o trecho inicial por:

> "Épsilon é a quinta letra do alfabeto grego. A maiúscula (Ε) é praticamente idêntica ao E do português — fácil de reconhecer. Já a minúscula (ε) é diferente: uma curva aberta para a direita, sem a haste vertical do 'e' minúsculo que você usa em português. Como a maior parte do texto grego bíblico usa minúsculas, é o ε que você mais vai encontrar. O som, em ambos os casos, é /e/ breve — como em 'pé', 'café', 'meta'."

**Correção no campo `dica`:** Substituir por:

> "Ε maiúsculo = E do português. Fácil. O ε minúsculo é a curva — pense numa lua crescente virada para a esquerda, com um traço no meio. Esse é o épsilon que aparece nos textos."

---

## SEÇÃO 2 — REGRAS SISTÊMICAS PARA MÓDULOS FUTUROS

Estas regras derivam diretamente das falhas identificadas em C1-M01 e se aplicam a **todos os módulos do Ciclo I e Ciclo II**.

---

### Regra S-01 — Versículos âncora são definidos pela grade, sem substituição

**Origem:** Falha #1 (C1-M01-U03 usou Mateus 1:1 em vez de João 11:25)

**Regra:**

O versículo âncora de cada unidade está definido na GRADE_CURRICULAR_KOINE.md. O agente gerador deve copiar a referência exata — livro, capítulo e versículo — sem substituição, mesmo que encontre um versículo que julgue mais emblemático ou mais simples.

**A única exceção permitida** é quando a grade usa a expressão "preferencialmente" ou "ou equivalente" ao indicar o versículo. Nenhuma entrada atual do Ciclo I contém essa ressalva — portanto, todos os versículos do Ciclo I são vinculantes.

**Verificação obrigatória antes de fechar qualquer unidade:**
```
[ ] O campo `versiculo` corresponde exatamente ao versículo indicado
    na grade para esta unidade específica?
[ ] O campo `referencia` usa o formato "Livro Capítulo:Versículo"
    na grafia portuguesa padrão?
```

---

### Regra S-02 — Glifos gregos de módulos futuros não aparecem no texto de exposição

**Origem:** Falha #2 (Η apareceu em C1-M01-U02 como alerta de conflito futuro)

**Regra:**

Alertas de confusão com letras futuras são permitidos e desejáveis (o Orquestrador os encoraja explicitamente). Mas o alerta deve mencionar a letra **pelo nome em português**, nunca pelo glifo grego.

**Formato correto:**
> "No Módulo 3, você vai conhecer outra letra que parece com esta em maiúsculo — ela se chama eta e tem um som diferente."

**Formato proibido:**
> "Cuidado com Η (eta) — parece Ε mas soa diferente."

**Por que a distinção importa:** O aluno de C1-M01 não tem referência visual para Η. Ver o glifo sem contexto de ensino cria uma impressão desordenada que o SRS não consegue organizar. O alerta funciona melhor como aviso verbal do que como apresentação visual antecipada.

**Aplicação nos próximos módulos com alertas de confusão:**

| Módulo | Alerta permitido | Glifo proibido até |
|--------|-----------------|-------------------|
| C1-M02 (Ο e Ω) | Mencionar que os dois parecem iguais | — (ambos ensinados no mesmo módulo) |
| C1-M03 (Η) | Retomar alerta Η ≠ H sem mencionar Ε por glifo | — |
| C1-M04 (Λ) | Mencionar semelhança com Α sem exibir Α por glifo | C1-M01 já passou — Α pode aparecer |
| C1-M05 (Ρ) | Mencionar semelhança com P latino por nome | — (P não é letra grega) |

---

### Regra S-03 — Questões da Fase de Aplicação devem corresponder ao especificado na grade

**Origem:** Falha #3 (Questão 1 da Aplicação reduziu a tarefa de varredura para identificação pontual)

**Regra:**

A GRADE_CURRICULAR_KOINE.md especifica as questões da Fase de Aplicação (`---APLICACAO---`) de forma prescritiva para cada módulo. O agente gerador deve implementar exatamente a tarefa descrita — não uma versão simplificada, não uma variação de dificuldade menor.

**Verificação obrigatória para a Fase de Aplicação:**
```
[ ] A pergunta da questão corresponde à tarefa descrita na grade?
[ ] O nível de exigência cognitiva é o mesmo (varredura ≠ identificação pontual,
    sequência completa ≠ sequência parcial, tradução ≠ reconhecimento)?
[ ] A questão usa o versículo âncora do módulo, não um versículo avulso?
```

**Exemplo de distinção de nível:**

| Tarefa da grade | Tarefa incorreta (simplificada) |
|----------------|--------------------------------|
| "identifique TODAS as letras Α/α em ἀγάπη" | "qual é a primeira letra de ἀγάπη?" |
| "monte a sequência completa Α Ε Ι Ο Υ Ω" | "quais são as 3 primeiras vogais?" |
| "identifique o ε inicial em ἐγώ εἰμι ὁ ἄρτος" | "qual letra abre a palavra ἐγώ?" |

---

### Regra S-04 — Maiúscula e minúscula são sempre descritas separadamente

**Origem:** Falha #6 (Exposição do Épsilon confundiu as formas maiúscula e minúscula na descrição)

**Regra:**

Toda unidade do tipo `letter` deve descrever a forma maiúscula e a forma minúscula **como entidades separadas**, indicando explicitamente a semelhança ou diferença com o português para cada uma.

**Template obrigatório para o campo `explicacao` de unidades do tipo `letter`:**

```
[Nome] maiúsculo (Χ): [descrição da forma e semelhança com português/latim]
[Nome] minúsculo (χ): [descrição da forma — é aqui que a diferença geralmente aparece]
O som, em ambos os casos: [som] — como em [exemplo em português].
```

**Mapeamento para os módulos seguintes (referência rápida):**

| Letra | Maiúscula — semelhança PT | Minúscula — diferença |
|-------|--------------------------|----------------------|
| Ο ο | Idêntica ao O | Idêntica — sem confusão |
| Υ υ | Parece Y | Curva com haste — diferente do u |
| Ω ω | Diferente — ferradura aberta | Diferente — mesma forma da maiúscula, menor |
| Η η | Parece H (mas não soa H) | Diferente do h minúsculo |
| Ν ν | Igual ao N | Parece n mas tem forma de ponte |
| Τ τ | Igual ao T | Tem curva à direita — diferente do t |
| Σ σ/ς | Diferente do S | σ: curva fechada / ς: curva com cauda |
| Κ κ | Similar ao K | Similar ao k, ligeiramente mais curvo |
| Λ λ | Diferente — triângulo | Dois traços: um curvo, um diagonal |

---

### Regra S-05 — Exposições usam apenas glifos do conjunto acumulado até o módulo atual

**Origem:** Falha #2 (Η) e Falha #5 (diacríticos em Ἰησοῦς)

**Regra:**

O campo `explicacao` e o campo `dica` de cada unidade podem conter glifos gregos apenas do conjunto de letras ensinadas nos módulos C1-M01 até o módulo atual. Isso inclui:
- Palavras gregas usadas como exemplo
- Letras isoladas usadas como ilustração visual
- Formas de palavras dentro de versículos citados

**Tratamento de palavras com diacríticos antes de C1-M09:**

Palavras que contêm diacríticos (acentos, espíritos, iota subscrito) podem aparecer como **palavras âncora ou em versículos**, desde que o texto da exposição instrua explicitamente o aluno a ignorar as marcas por enquanto. A instrução deve ser:

> "Os pequenos sinais sobre as letras se chamam diacríticos — você aprende tudo sobre eles no Módulo 9. Por agora, identifique apenas a(s) letra(s) [X] nesta palavra."

Esta instrução é obrigatória sempre que uma palavra com diacríticos for usada em módulo anterior a C1-M09.

---

### Regra S-06 — Épsilon e Eta são tratados como par de confusão primário desde C1-M01

**Origem:** Falhas #2 e #6 (tratamento inconsistente da distinção Ε/Η)

**Regra:**

A distinção Ε/Η é o par de confusão mais importante dos Módulos 1–3. O sistema deve tratá-la de forma progressiva e consistente:

**Em C1-M01 (Épsilon):**
- Mencionar a existência de uma letra parecida em maiúsculo, sem exibir o glifo Η.
- Focar na forma minúscula ε como a forma que o aluno mais encontrará.

**Em C1-M03 (Eta):**
- Retomar a distinção explicitamente: "Lembra que no Módulo 1 eu avisei que havia uma letra parecida com o E? Pois bem — você acabou de conhecê-la."
- Exercício de distinção obrigatório: questão de matching_pairs ou multiple_choice que coloca Ε e Η lado a lado para o aluno distinguir pelos sons.
- A Fase 3 de U01 de C1-M03 deve incluir: `matching_pairs` com `Ε:/e/ breve | Η:/e/ longo`.

---

## SEÇÃO 3 — DECISÕES DE SISTEMA FORMALIZADAS

Estas duas situações foram identificadas como casos onde o sistema produz comportamentos que parecem violar regras, mas são necessários para a viabilidade pedagógica. Ao invés de tratar como falha a cada revisão, elas são aqui documentadas como **exceções autorizadas**.

---

### Decisão DS-01 — Uso de 1 letra futura como distrator nos módulos com menos de 4 elementos

**Contexto:** Em C1-M01, C1-M02 e C1-M03, o módulo ensina apenas 3 letras. Questões de `multiple_choice` requerem 4 opções. Com apenas 3 letras no conjunto acumulado, é matematicamente impossível criar 4 distratores sem usar uma letra de módulo futuro.

**Decisão:** O agente gerador está **autorizado** a usar **no máximo 1 letra de módulo futuro** como distrator visual em questões dos módulos C1-M01, C1-M02 e C1-M03, sob as seguintes condições:

1. A letra futura aparece **apenas como distrator** — nunca como resposta correta, nunca na exposição, nunca na dica.
2. A letra futura não é **nomeada** na explicação da questão. A explicação pode dizer "as outras letras você aprenderá nos próximos módulos", mas não "Β é o beta e você aprende no Módulo 6."
3. Dar preferência a letras que **visualmente** se assemelhem às já ensinadas (maior poder discriminativo) em vez de letras completamente distintas.
4. O campo `explicacao` da questão pode mencionar que a letra futura "não foi ensinada ainda", mas não deve dar mais informação do que isso.

**Letras autorizadas como distratores por módulo:**

| Módulo | Letras ensinadas | Distrator autorizado | Critério de escolha |
|--------|-----------------|---------------------|-------------------|
| C1-M01 | Α Ε Ι | Β | Visualmente próxima de Ε/ε em minúsculo |
| C1-M02 | + Ο Υ Ω | Θ ou Φ | Próximas de Ο e Υ em forma circular |
| C1-M03 | + Η Ν Τ | Π ou Γ | Próximas de Η e Ν em forma |

A partir de C1-M04, o conjunto acumulado tem 12+ letras — distratores futuros não são mais necessários e esta exceção não se aplica.

---

### Decisão DS-02 — Palavras com diacríticos podem aparecer como palavras âncora antes de C1-M09

**Contexto:** Palavras teologicamente importantes como Ἰησοῦς, ἀγάπη, λόγος, ἦν contêm diacríticos que só são ensinados em C1-M09. Excluí-las dos módulos anteriores empobrece radicalmente a experiência do aluno.

**Decisão:** Palavras com diacríticos podem aparecer como palavras âncora e em versículos em qualquer módulo, mesmo antes de C1-M09, sob a condição de que:

1. O campo `explicacao` da unidade contenha a instrução padrão de diacríticos (ver Regra S-05).
2. As questões de fase 2, 3 e 4 **não peçam ao aluno que identifique ou diferencie diacríticos**. As questões usam a letra base, não a letra com marca.
3. A resposta correta em questões `tpr_digital` deve ser a forma com diacrítico exatamente como aparece no versículo — o aluno toca na forma completa, mas a explicação deixa claro que o diacrítico é acessório por ora.

**Exemplo correto (C1-M01-U03):**
```
QUESTAO tipo:tpr_digital
pergunta: Identifique a letra Iota (Ι) maiúscula no início de Ἰησοῦς:
correta: Ι
opcoes: Ι | Α | Ε | Β
explicacao: O Ι inicial de Ἰησοῦς é iota maiúsculo. As marcas sobre as outras letras
            (ῦ, ς) são diacríticos — você aprende isso no Módulo 9.
```

---

## SEÇÃO 4 — CHECKLIST ADICIONAL DE GERAÇÃO

Este checklist é executado **depois** do checklist do ORQUESTRADOR_EDITORIAL.md e **antes** de entregar o módulo para revisão. Ele cobre especificamente os pontos que geraram falhas em C1-M01.

```
CHECKLIST CORRETIVO — VERSÃO 1.0

[ ] S-01: Cada campo `versiculo` e `referencia` foi conferido
    contra a entrada do módulo na GRADE_CURRICULAR_KOINE.md?
    → Abrir o arquivo da grade, ir à entrada do módulo,
      copiar os versículos âncora palavra por palavra.

[ ] S-02: O campo `explicacao` de cada unidade contém algum
    glifo grego que não foi ensinado até este módulo?
    → Varrer cada exposição com a lista acumulada de letras
      ensinadas. Qualquer glifo fora da lista = violação.
    → Exceção DS-01: distratores em questões (não em exposições).

[ ] S-03: Cada questão da ---APLICACAO--- corresponde
    exatamente à tarefa descrita na grade para este módulo?
    → Comparar pergunta a pergunta, verificar se o nível
      cognitivo é o mesmo (varredura vs. identificação,
      sequência completa vs. parcial, etc.).

[ ] S-04: O campo `explicacao` de cada unidade do tipo `letter`
    descreve maiúscula e minúscula separadamente?
    → Verificar se há um parágrafo ou frase dedicada a cada forma.
    → A descrição da minúscula não pode ser idêntica à maiúscula.

[ ] S-05: Toda palavra grega com diacríticos usada antes de
    C1-M09 tem a instrução padrão de diacríticos na exposição?
    → Buscar no texto da exposição a frase "diacríticos" ou
      "sinais sobre as letras" para confirmar presença.

[ ] S-06 (apenas C1-M03): A Fase 3 de U01 inclui matching_pairs
    com a distinção Ε:/e/ breve vs Η:/e/ longo?
    → Este é o exercício de consolidação do par de confusão
      primário do Ciclo I.

[ ] DS-01: Se o módulo usa distrator de letra futura, a letra
    futura não é nomeada na explicação da questão?
    → Buscar o nome da letra nas explicações de questões.
    → Se encontrado, substituir por "letra que você aprenderá
      nos próximos módulos".

[ ] GERAL: O campo `revisadoPor` e `dataRevisao` do cabeçalho
    foram preenchidos com os valores corretos?
```

---

## APÊNDICE — MAPA DE VERSÍCULOS ÂNCORA (CICLO I)

Tabela de referência rápida para o agente gerador. Colar diretamente nos campos `versiculo` e `referencia` sem modificação.

| Módulo | Unidade | Forma grega | Referência |
|--------|---------|-------------|------------|
| C1-M01 | U01 Alfa | ἀγάπη | 1 João 4:8 |
| C1-M01 | U02 Épsilon | ἐγώ | João 6:35 |
| C1-M01 | U03 Iota | Ἰησοῦς εἶπεν | João 11:25 |
| C1-M02 | U01 Ômicron | ὁ θεός | João 1:1 |
| C1-M02 | U02 Ípsilon | τὸν υἱὸν τὸν μονογενῆ | João 3:16 |
| C1-M02 | U03 Ômega | ἐγώ εἰμι τὸ Α καὶ τὸ Ω | Apocalipse 1:8 |
| C1-M03 | U01 Eta | Ἐν ἀρχῇ ἦν ὁ λόγος | João 1:1a |
| C1-M03 | U02 Nu | ὁ νόμος διὰ Μωϋσέως ἐδόθη | João 1:17 |
| C1-M03 | U03 Tau | τέκνα θεοῦ γενέσθαι | João 1:12 |
| C1-M04 | U01 Sigma | ὁ λόγος σὰρξ ἐγένετο | João 1:14 |
| C1-M04 | U02 Kappa | οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον | João 3:16 |
| C1-M04 | U03 Lambda | Ἐν ἀρχῇ ἦν ὁ λόγος | João 1:1 |
| C1-M05 | U01 Pi | Πάτερ ἅγιε | João 17:11 |
| C1-M05 | U02 Rô | τὰ ῥήματά μου | João 6:63 |
| C1-M05 | U03 Mi | Ἐν τούτῳ γνώσονται πάντες ὅτι ἐμοὶ μαθηταί ἐστε | João 13:35 |
| C1-M06 | U01 Beta | ἐν τῷ βιβλίῳ τούτῳ | João 20:30 |
| C1-M06 | U02 Delta | ἐθεασάμεθα τὴν δόξαν αὐτοῦ | João 1:14 |

---

## APÊNDICE — INSTRUÇÃO PADRÃO DE DIACRÍTICOS

Copiar este bloco sempre que uma palavra com diacríticos aparecer em módulo anterior a C1-M09:

> "Os pequenos sinais sobre as letras — os acentos e traços — se chamam **diacríticos**. Você aprende tudo sobre eles no Módulo 9. Por agora, identifique apenas a letra [X] nesta palavra. Os diacríticos não mudam a letra em si — apenas indicam como pronunciá-la com precisão."

---

*Documento gerado com base na Revisão de C1-M01 · Koiné App*
*Versão 1.0 — aplicar a partir de C1-M02*
*Próxima revisão após C1-M03: verificar se Regra S-06 foi implementada corretamente*
