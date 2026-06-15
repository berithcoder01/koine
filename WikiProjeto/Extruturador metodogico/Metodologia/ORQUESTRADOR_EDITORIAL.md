# ORQUESTRADOR EDITORIAL — KOINÉ APP
## Padrão de Construção de Módulos
### Como cada módulo deve ser escrito, estruturado e sentido pelo aluno

**v1.2 — 2026-06-10**
- Adicionadas 4 novas regras sistêmicas na seção "O QUE NUNCA FAZER" (S-07 a S-10):
  - S-07: vedação de vazamento de resposta no campo `pergunta`
  - S-08: vedação de nomeação de diacrítico específico antes de C1-M09
  - S-09: vedação de afirmações quantitativas não verificáveis
  - S-10: descrição de formas de letras deve usar o texto impresso padrão
- Integração com `CORRECOES_SISTEMICAS_V2.md` (Prova de Verdade)
- Checklist editorial atualizado com os novos itens

**v1.1 — 2026-06-02**
- Adicionada subseção 1.1-A.1: maiúscula e minúscula descritas separadamente (Regra S-04)
- Adicionada subseção 1.1-A.2: diacríticos em palavras usadas antes de C1-M09 (Regra S-05)
- Atualizada seção "O QUE NUNCA FAZER" com as 6 novas regras sistêmicas (S-01 a S-06)
- Integração com `CORRECOES_SISTEMICAS_V1.md` e `SISTEMA_FATURACAO_CONTEUDO.md` v1.1

**v1.0 — versão original**

---

## A FILOSOFIA

O Koiné não é um quiz de grego. É uma aula.

Quando o aluno termina um módulo, ele deve sentir que aprendeu de verdade — que tem algo nas mãos que não tinha antes. Não "acertei perguntas", mas "agora eu sei o que essa palavra significa, de onde ela vem, e já a vi em um versículo real".

O modelo mental do autor ao escrever cada módulo é:

> "Sou um professor sentado com um aluno pela primeira vez. Ele nunca viu grego. Quero que ao final desta aula ele olhe para uma palavra no texto bíblico e reconheça algo — uma letra, um som, uma raiz. Que ele saia com uma vitória concreta."

Cada módulo tem uma **palavra âncora** — uma palavra real do NT que o aluno vai poder identificar ao final. Essa palavra não é decoração. Ela é o objetivo da aula.

---

## ESTRUTURA OBRIGATÓRIA DE CADA MÓDULO

Todo módulo é composto por três camadas:

```
CAMADA 1 — UNIDADES DE ENSINO (3 por módulo)
  Cada unidade ensina um elemento (letra, som, palavra, forma verbal)
  com profundidade: origem, uso, contexto bíblico, prática

CAMADA 2 — PALAVRA DO MÓDULO
  A palavra-síntese que usa os elementos ensinados
  O aluno a decompõe, lê, traduz e entende no contexto

CAMADA 3 — AULA DO VERSÍCULO (último módulo de cada bloco)
  Um versículo completo trabalhado palavra a palavra
  O aluno sai capaz de ler e entender aquele versículo em grego
```

---

## CAMADA 1 — COMO ESCREVER UMA UNIDADE DE ENSINO

### 1.1 O Elemento (o que está sendo ensinado)

Cada unidade ensina um **elemento** — uma letra, um som, uma palavra, uma forma.

O elemento nunca é apresentado como um dado isolado. Ele sempre vem com:

**A) Forma visual**
Mostrar maiúscula e minúscula (para letras). Mostrar a palavra com acento correto. O aluno precisa ver exatamente o que vai encontrar no texto bíblico.

**A.0) Campo `destaque` — a letra grande no cabeçalho do ExposureCard**

Toda unidade tem um campo `destaque` na seção `# EXPOSIÇÃO`. Ele define **qual glifo é exibido em tamanho grande no topo do card**, antes de qualquer texto. É o primeiro contato visual do aluno com o elemento sendo ensinado.

Regra de preenchimento:

| Tipo de unidade | Valor do campo `destaque` |
|-----------------|--------------------------|
| `letter` | Glifo maiúsculo (ex: `Η`) |
| `word` | Palavra com diacríticos (ex: `ἀγάπη`) |
| `phoneme` | Combinação fonética (ex: `αι`) |
| `grammar_rule` | Forma paradigmática central (ex: `ὁ`) |

**Este campo é obrigatório desde v1.2.** Sem ele, o ExposureCard exibe o campo `forma` inteiro (maiúscula + minúscula) como fallback — funcional, mas não ideal pedagogicamente. O campo `destaque` permite que o card exiba a maiúscula em destaque e a minúscula em posição secundária.

Exemplo correto:
```
forma: Η η
destaque: Η
```



Para unidades do tipo `letter`, a forma maiúscula e a forma minúscula devem ser descritas como **entidades separadas**, com sua própria semelhança ou diferença em relação ao português/latim. Esta regra foi gerada a partir de C1-M01 (Erro #6: Épsilon confundiu maiúscula e minúscula na exposição).

**Template obrigatório:**
```
[Nome] maiúsculo (Χ): [descrição da forma e semelhança com PT/latim]
[Nome] minúsculo (χ): [descrição da forma — é aqui que a diferença geralmente aparece]
O som, em ambos os casos: [som] — como em [exemplo em português].
```

**Exemplos de aplicação correta:**

Errado (uma única frase misturando as duas formas):
> "Ε não tem a barra do meio. É um E que perdeu um traço."

Certo (descrição separada de cada forma):
> "A maiúscula (Ε) é praticamente idêntica ao E do português — fácil de reconhecer. Já a minúscula (ε) é diferente: uma curva aberta para a direita, sem a haste vertical do 'e' minúsculo que você usa em português."

Errado (descrição apenas da maiúscula):
> "Alfa é como o A do português, em maiúscula e minúscula."

Certo (descrição de ambas):
> "Α maiúsculo é idêntico ao A do português. α minúsculo tem forma arredondada com laço inferior — também fácil, porque a pronúncia é a mesma: /a/."

A descrição da minúscula não pode ser cópia da descrição da maiúscula. Se forem realmente idênticas, declare isso explicitamente (ex: "Ο ο — idênticos ao O, maiúscula e minúscula").

**A.2) Diacríticos em palavras usadas antes de C1-M09 (Regra S-05)**

Palavras com diacríticos (acentos, espíritos, iota subscrito) podem aparecer antes de C1-M09 como palavras âncora ou em versículos. Quando isso acontece, o campo `explicacao` deve conter a **instrução padrão de diacríticos**:

> "Os pequenos sinais sobre as letras — os acentos e traços — se chamam **diacríticos**. Você aprende tudo sobre eles no Módulo 9. Por agora, identifique apenas a letra [X] nesta palavra. Os diacríticos não mudam a letra em si — apenas indicam como pronunciá-la com precisão."

Esta instrução é obrigatória para toda palavra com diacríticos em módulos anteriores a C1-M09.

**B) Nome e pronúncia**
Como se chama. Como soa. Comparação com o português ou inglês quando ajuda. Para sons novos (como /th/ de theta ou /kh/ de qui), dar exemplos de outras línguas que o aluno possa conhecer.

**C) Origem — a raiz da palavra**
Toda letra grega tem história. Toda palavra tem raiz. O autor deve sempre incluir:
- De onde vem a letra (origem semítica, relação com o latim, com o hebraico quando relevante)
- Palavras do português que vêm da mesma raiz (neologismos, termos técnicos, nomes próprios)
- Por que isso importa: "você já usa essa raiz toda semana sem saber"

Exemplos do padrão:
- Alfa: "A origem do nosso A. A letra existe há 3.500 anos — do aleph semítico, passando pelo alfa grego, até o A que você digitou hoje."
- Logos: "Palavra, razão, discurso. É a raiz de lógica, monólogo, diálogo, teologia. No NT, João usa essa palavra para descrever o próprio Cristo."
- Theos: "Deus. Raiz de teologia, ateísmo, teodiceia, panteísmo. Uma das 10 palavras mais frequentes do NT."

**D) Onde aparece no NT**
Não um versículo qualquer — o **versículo mais emblemático** onde essa letra ou palavra aparece. Preferencialmente um versículo que o aluno já conhece em português, para que a conexão seja imediata.

**E) Frequência**
Para palavras: "aparece X vezes no NT" — isso diz ao aluno o valor daquilo que está aprendendo. Uma palavra que aparece 3.000 vezes vale mais do que uma que aparece 3.

### 1.2 O Tom da Explicação

A explicação deve soar como um professor falando, não como um dicionário.

**Errado:**
> "Alfa é a primeira letra do alfabeto grego com som /a/."

**Certo:**
> "Alfa é a primeira letra — e não é por acaso que João usa ela para descrever Cristo: 'Eu sou o Alfa e o Ômega' (Apocalipse 1:8). Do princípio ao fim. A letra que abre o alfabeto é a mesma que abre a identidade de Jesus no Apocalipse."

A diferença é contexto e intenção. O professor não despeja informação — ele mostra por que aquilo importa.

### 1.3 Comprimento da Explicação

- **Exposição textual:** 4 a 7 linhas. Densa, mas não longa. Cada frase tem uma função.
- **Dica mnemônica:** 1 a 2 linhas. Uma associação forte e direta.
- **Contexto do versículo:** 1 a 2 linhas de comentário além do versículo em si.

### 1.3-A — Convenções de Formatação no Texto de Exposição

O texto dos campos `explicacao` e `dica` deve ser limpo e fluir como prosa. Marcações excessivas — barras, maiúsculas, símbolos técnicos no meio de frases — interrompem a leitura e criam ruído visual.

**Regras de formatação:**

| Situação | Formato correto | Formato errado |
|----------|----------------|----------------|
| Glifo grego em destaque no texto | **Η** (negrito) | Η (solto), /Η/, `Η` |
| Palavra grega em destaque | **ἀγάπη** (negrito) | ἀγάπη sem marcação quando está sendo nomeada |
| Exemplo de som | soa como o *"é"* de *"pé"* (itálico) | soa como /e/ no meio da frase |
| Termo técnico em português | *iota subscrito*, *diacrítico* (itálico) | iota subscrito (sem marcação) |
| Ênfase de conceito importante | **não** soa como H (negrito) | NÃO soa como H (caixa alta) |
| Notação fonética | apenas no campo `som:` e entre parênteses imediatos após a letra | `/a/` solto no meio de uma frase |

**Negrito (`**palavra**`):** para letras gregas nomeadas, palavras gregas sendo identificadas, e ênfases conceituais dentro da frase.

**Itálico (`*palavra*`):** para exemplos em português ("*pai*", "*pé*", "*vida*"), termos técnicos que o aluno ainda não domina, e referências a palavras como palavras (metalinguagem).

**Barras fonéticas (`/a/`):** exclusivamente no campo `som:` do cabeçalho da EXPOSIÇÃO. No corpo do `explicacao` e `dica`, substituir por prosa: *"soa como o 'a' de 'pai'"*, não */a/ como em "pai"*.

**CAIXA ALTA:** proibida para ênfase. Usar negrito.

**Exemplos:**

Errado:
> "O som de eta NÃO é o som do H. O som é /e/ longo — como em 'pé'."

Certo:
> "O som de **eta** **não** é o som do H. Soa como o *'ê'* sustentado de *'pé'* ou *'café'*."

Errado:
> "Eta maiúsculo (Η) tem aparência IDÊNTICA ao H do português."

Certo:
> "**Η** maiúsculo tem aparência **idêntica** ao H do português."

---

### 1.4 Exercícios da Unidade

Os exercícios não são para testar — são para **fixar com prática**. A sequência deve ser:

```
Fase 2 — Reconhecimento: o aluno identifica o que acabou de ver
  → Perguntas diretas, sem pegadinha
  → Opções incorretas são plausíveis, não absurdas

Fase 3 — Associação: o aluno conecta o elemento a algo
  → Letra ↔ som, palavra ↔ significado, forma ↔ uso
  → Quando há 2+ elementos acumulados, usar matching_pairs

Fase 4 — Recordação: o aluno recupera sem apoio visual completo
  → Fill_blank com a resposta correta entre as opções
  → TPR: identifica entre formas similares
```

**Regra absoluta:** as questões das fases 2, 3 e 4 de uma unidade só podem usar conteúdo ensinado **nesta unidade** ou em **unidades anteriores do mesmo módulo ou de módulos já completados**. Nunca antecipar.

---

## CAMADA 2 — A PALAVRA DO MÓDULO

Cada módulo tem uma **palavra-síntese** que usa as letras ou formas ensinadas naquele módulo.

Ela é ensinada como unidade própria, com o mesmo nível de profundidade das letras:

### O que a palavra do módulo deve ter:

**1. Decomposição visual**
Mostrar a palavra letra a letra, identificando quais já foram ensinadas:
> "ἀγάπη — vamos decompor: ἀ (alfa, que você acabou de aprender) + γ + ά (alfa com acento) + π + η"

**2. Significado com profundidade**
Não apenas "amor". Mas:
> "ἀγάπη é o amor incondicional, sacrificial — diferente de ἔρως (amor romântico) e φιλία (amizade). É a palavra que João usa em 'Deus amou o mundo de tal maneira' (João 3:16) e 'Deus é amor' (1 João 4:8). No grego clássico, essa palavra era rara. No NT, ela se torna central."

**3. Contexto bíblico expandido**
Dois ou três versículos onde a palavra aparece, com comentário breve de cada uso. O aluno deve sentir que essa palavra vive em textos reais.

**4. Exercícios específicos da palavra**
- Identificar a palavra num versículo
- Traduzir a palavra
- Completar um versículo com ela

---

## CAMADA 3 — A AULA DO VERSÍCULO

Todo **bloco de módulos** (geralmente 3-4 módulos) termina com uma aula dedicada a um versículo completo. Essa é a aula mais densa e mais recompensadora.

### Critérios para escolha do versículo:

1. **Famoso** — o aluno provavelmente já conhece em português. O reconhecimento gera conexão.
2. **Vocabulário controlado** — usa principalmente palavras já ensinadas nos módulos do bloco.
3. **Teologicamente rico** — não um versículo de transição narrativa, mas uma declaração central.
4. **Breve o suficiente** — 5 a 12 palavras. Versículos longos demais fragmentam a experiência.

### Candidatos por bloco (exemplos):

| Bloco | Versículo | Razão |
|-------|-----------|-------|
| Ciclo I — Vogais | Ἐν ἀρχῇ ἦν ὁ λόγος (João 1:1a) | Usa letras básicas, é o versículo mais famoso do NT grego |
| Ciclo I — Consoantes | καὶ ὁ λόγος σὰρξ ἐγένετο (João 1:14a) | Usa consoantes ensinadas, teologia da encarnação |
| Ciclo II — Verbo ser | ὁ θεὸς ἀγάπη ἐστίν (1 João 4:8b) | Três palavras, teologia profunda, usa εἰμί |
| Ciclo II — Verbos | πιστεύω, κύριε (João 9:38) | Curto, usa πιστεύω, momento de fé pessoal |
| Ciclo III | ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή (João 14:6) | Artigos, substantivos, predicado nominal completo |

### Estrutura da aula do versículo:

**1. Apresentação do versículo inteiro**
Mostrar o versículo completo em grego. Não fragmentar ainda. O aluno vê o todo primeiro.

**2. Tradução palavra a palavra**
Cada palavra recebe:
- A forma grega exata
- O nome da forma (artigo, substantivo, verbo, etc.)
- A tradução
- Uma nota breve se relevante (acento, caso, frequência)

Exemplo para ὁ θεὸς ἀγάπη ἐστίν:
```
ὁ       → artigo definido masculino nominativo singular → "o"
θεὸς    → substantivo masculino nominativo → "Deus" (aparece 1.317× no NT)
ἀγάπη   → substantivo feminino nominativo → "amor" (amor incondicional)
ἐστίν   → verbo ser, 3ª pessoa singular presente → "é"
```

**3. Comentário teológico-linguístico**
Um parágrafo (3-5 linhas) sobre o que o versículo diz e por que a construção grega é significativa. Aqui o professor fala sobre o versículo como texto, não apenas como gramática.

Exemplo:
> "Note que ἀγάπη não tem artigo ('amor', não 'o amor'). Em grego, isso indica que João está descrevendo a natureza de Deus — não que Deus ama, mas que Deus É amor. A ausência do artigo é uma escolha teológica precisa."

**4. Exercício de montagem**
O aluno monta o versículo palavra a palavra (word_order). Este é o exercício mais satisfatório — a sensação de construir uma frase sagrada com as próprias mãos.

**5. Exercício de leitura**
O aluno lê o versículo em voz alta (instrução textual) e responde: "O que este versículo diz sobre Deus/Cristo/o cristão?" — uma questão de interpretação, não só de tradução.

---

## BLOCOS E SEQUENCIAMENTO

### Como agrupar módulos em blocos:

**Bloco** = conjunto de 3-4 módulos que compartilham um tema e terminam com uma aula de versículo.

```
CICLO I — ALFABETO E FONÉTICA

Bloco A (módulos 1-3): Vogais
  M01 — Vogais Α, Ε, Ι  → palavra: ἀγάπη (os alfas)
  M02 — Vogais Ο, Υ, Ω  → palavra: λόγος (o ômicron)
  M03 — Consoantes Η, Ν, Τ  → palavra: ἦν (o eta)
  [Aula do versículo: Ἐν ἀρχῇ ἦν ὁ λόγος — João 1:1a]

Bloco B (módulos 4-6): Consoantes Comuns
  M04 — Σ, Κ, Λ  → palavra: σάρξ (carne)
  M05 — Π, Ρ, Μ  → palavra: πατήρ (pai)
  M06 — Β, Δ, Γ  → palavra: δόξα (glória)
  [Aula do versículo: καὶ ὁ λόγος σὰρξ ἐγένετο — João 1:14a]

Bloco C (módulos 7-9): Aspiradas e Diacríticos
  M07 — Φ, Χ, Θ  → palavra: θεός (Deus)
  M08 — Ζ, Ξ, Ψ  → palavra: ζωή (vida)
  M09 — Diacríticos, acentos, iota subscrito  → palavra: ἀγάπῃ (amor, no dativo)
  [Aula do versículo: τὸ φῶς ἐν τῇ σκοτίᾳ φαίνει — João 1:5]

Bloco D (módulo 10): Grande Revisão
  M10 — Revisão do alfabeto completo + leitura fluente
  [Aula do versículo: Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν — João 1:1 completo]
```

---

## PADRÃO DE PROFUNDIDADE POR TIPO DE CONTEÚDO

### Para letras do alfabeto:

```
OBRIGATÓRIO:
✓ Origem histórica da letra (semítica, relação com português/latim)
✓ Som com comparação em português
✓ Diferença de letras similares (épsilon ≠ eta, ômicron ≠ ômega)
✓ Maiúscula E minúscula (para o Canvas de escrita)
✓ Frequência geral no NT (alta/média/baixa)
✓ Ao menos 1 versículo onde a letra é prominente
✓ Dica mnemônica única e memorável

DESEJÁVEL:
→ Formas especiais (sigma final ς, por exemplo)
→ Combinações fonéticas que produz (gamma + gamma = ng)
→ Nome da letra em hebraico quando há paralelo
```

### Para palavras do vocabulário:

```
OBRIGATÓRIO:
✓ Forma no dicionário (léxema) com acento correto
✓ Tradução principal E alternativas de uso no NT
✓ Frequência exata no NT (número de ocorrências)
✓ Raiz e palavras do português derivadas
✓ Ao menos 2 versículos de uso real, com comentário
✓ Categoria gramatical (substantivo masc. 2ª decl., verbo temático, etc.)

DESEJÁVEL:
→ Família lexical (θεός → θεολογία, θεόπνευστος)
→ Diferença com palavras similares (ἀγάπη vs φιλία vs ἔρως)
→ Uso no AT grego (LXX) quando relevante
→ Uso específico por autor (João prefere ζωή, Paulo prefere χάρις)
```

### Para regras gramaticais:

```
OBRIGATÓRIO:
✓ Explicação da função, não só da forma
✓ Por que essa regra existe (motivação linguística)
✓ Como identificar no texto sem decorar tabelas
✓ Exemplo em versículo real antes de qualquer exercício
✓ Comparação com o português quando a diferença importa

DESEJÁVEL:
→ Erro comum que falantes de português cometem
→ Como a regra muda o significado (artigo presente vs ausente)
→ Exceções mais frequentes no NT
```

---

## INTRODUÇÃO DE CICLO (módulo C<n>-M00)

Todo ciclo começa com um **módulo de introdução** — não é um módulo de ensino de conteúdo, mas um módulo de boas-vindas, contextualização histórica e preparação motivacional. Ele é identificado como `C1-M00`, `C2-M00`, etc.

### Por que a introdução de ciclo existe

O aluno que começa um ciclo novo está fazendo uma aposta: vai investir semanas em algo desconhecido. A introdução é a resposta à pergunta que ele ainda não fez em voz alta: *"Vale a pena?"*

A introdução não ensina gramática. Ela constrói o contexto que faz a gramática fazer sentido.

### O que a introdução de ciclo DEVE conter

**1. Abertura pessoal (3–5 linhas)**
Tom caloroso, concreto. O professor se dirige diretamente ao aluno. Não começa com história — começa com a experiência que o aluno vai ter. Exemplo: *"Em algumas semanas, você vai olhar para uma linha do texto bíblico em grego e reconhecer letras. Não todas — mas algumas. E esse momento de reconhecimento muda algo."*

**2. O que o ciclo ensina (4–6 linhas)**
Sem jargão acadêmico. Em linguagem do aluno. Termina com o versículo-troféu: *"Ao terminar este ciclo, você vai conseguir ler João 1:1 em grego."*

**3. Contexto histórico (2–4 parágrafos)**
Responde: quando surgiu o grego koiné, quem o falava, por que foi o idioma do NT, o que "koiné" significa. Tom narrativo, não enciclopédico. Este é o momento em que o aluno descobre que está aprendendo o idioma dos apóstolos — isso importa.

**4. Por que aprender grego (2–3 parágrafos)**
Obrigatório: pelo menos **1 exemplo concreto de nuance perdida na tradução**. Sem exemplo, o argumento é abstrato. Exemplos fortes: *ἀγάπη* vs. *ἔρως* vs. *φιλία*; *εἰρήνη* (paz ativa, não ausência de conflito); *μετάνοια* (mudança de mente, não apenas arrependimento emocional).

**5. Estrutura do ciclo (1 parágrafo + lista em prosa)**
Blocos, módulos, XP, versículo-troféu de cada bloco. O aluno precisa saber o que vem pela frente.

**6. Versículo-troféu (campos declarativos)**
O versículo completo em grego, a tradução palavra a palavra, e a promessa: *"Ao terminar este ciclo, você conseguirá ler este versículo."*

### O que a introdução de ciclo NÃO DEVE conter

- Nenhuma letra grega no corpo do texto antes da seção `# VERSÍCULO-TROFÉU` — apenas transliterações (*koiné*, *logos*, *agápe*)
- Nenhum exercício, questão ou avaliação
- Nenhuma tabela de conjugação ou declinação
- Nenhuma promessa exagerada ("você vai aprender grego em 10 semanas")
- Nenhum tom de manual ou documento técnico

### Comprimento

400–600 palavras no total. Longo o suficiente para contextualizar; curto o suficiente para o aluno não abandonar antes de começar.

### Referência de tom por ciclo

| Ciclo | Foco da introdução | Versículo-troféu |
|-------|-------------------|-----------------|
| Ciclo I — Alfabeto | "O idioma dos apóstolos" — o koiné como língua viva do NT | João 1:1 completo |
| Ciclo II — Verbos Presente | "Deus age agora" — o presente grego como tempo de revelação | João 3:16 |
| Ciclo III — Substantivos | "As coisas têm casos" — como o grego organiza sujeito e objeto | João 14:6 |

---

## O QUE NUNCA FAZER

### Na formatação do texto:

- **Não usar CAIXA ALTA para ênfase** dentro do texto de `explicacao` e `dica`. Ênfase se faz com negrito (`**palavra**`). Caixa alta interrompe a leitura e dá tom de manual técnico.
- **Não usar barras fonéticas soltas no meio de frases** (`/a/ como em "pai"`). Barras pertencem ao campo `som:`. No texto corrido, escrever em prosa: *"soa como o 'a' de 'pai'"*.
- **Não deixar letras gregas nomeadas sem negrito** quando estão sendo identificadas no texto. Se o professor está apontando para **Η**, o glifo deve estar em negrito.
- **Não misturar estilos de ênfase no mesmo parágrafo**: caixa alta em uma frase, negrito em outra, sem marcação na terceira. A convenção é única: negrito para glifos e ênfases, itálico para exemplos em português e termos técnicos.

### No conteúdo:

- **Não apresentar tabelas de declinação completas** antes do aluno ter visto os casos em contexto. Tabela é referência, não ensino.
- **Não ensinar uma regra gramatical sem versículo**. Toda regra existe para ser lida num texto real.
- **Não usar terminologia linguística sem explicar**. "Caso nominativo" deve ser explicado como "o sujeito da frase — quem faz a ação".
- **Não acumular mais de 3 formas novas por unidade**. O aluno não retém mais do que isso em uma sessão.
- **Não usar exemplos inventados**. Toda frase de exemplo deve ser um versículo real ou uma adaptação mínima de versículo real.
- **Não exibir o glifo de uma letra de módulo futuro** em alertas de confusão. O alerta deve ser verbal, usando o nome em português. (Regra S-02 — originada em C1-M01-U02 com Η).
- **Não substituir o versículo âncora definido pela grade** por outro que pareça mais emblemático. A vinculação é à grade, não à preferência do autor. (Regra S-01 — originada em C1-M01-U03 com Mateus 1:1 vs João 11:25).
- **Não descrever maiúscula e minúscula em uma única frase** que confunda as duas formas. Cada uma tem sua própria descrição. (Regra S-04 — originada em C1-M01-U02 com Épsilon).
- **Não usar palavra com diacríticos antes de C1-M09 sem a instrução padrão de diacríticos**. (Regra S-05 / DS-02).
- **Não introduzir, no campo `explicacao`, glifos de letras que não foram ensinadas até o módulo atual**. (Regra S-05 / S-02).

### Nos exercícios:

- **Não criar questão cujo conteúdo não foi ensinado naquele módulo ou em módulos anteriores.** Esta é a regra mais importante de todas.
- **Não repetir a mesma questão com palavras diferentes.** Cada questão deve trabalhar um aspecto diferente do conteúdo.
- **Não criar opções erradas óbvias.** Se a resposta certa é Α (alfa) e as erradas são Ψ, Ξ, Ω (letras completamente diferentes), o exercício não mede nada.
- **Não colocar a resposta ou dica do gabarito no campo `pergunta`.** O enunciado da pergunta deve ser neutro. Qualquer instrução, parêntese descritivo ou dica pertence ao campo `explicacao`. (Regra S-07 — originada em C1-M01-U03 Fase 4.)
- **Não nomear diacrítico por tipo específico em módulos antes de C1-M09.** Use sempre linguagem genérica ("sinais sobre as letras", "diacríticos", "marcas"). Nomear "acento agudo", "espírito áspero" ou "circunflexo" antes da hora arrisca erro factual e confunde o aluno. (Regra S-08 — originada em C1-M01 Aplicação Q3.)
- **Não terminar um módulo sem uma questão de aplicação em contexto** (fase 5).
- **Não reduzir o nível cognitivo prescrito pela grade** na Fase 5. Varredura ≠ identificação pontual, sequência completa ≠ parcial, tradução ≠ reconhecimento. (Regra S-03 — originada em C1-M01-Aplicação Questão 1).
- **Não nomear letra futura em explicação de questão**, mesmo que ela apareça como distrator (exceção DS-01). (Originada em C1-M01).
- **Não afirmar números precisos sem verificação.** "Aparece em 60% das palavras" sem fonte é alucinação. Use linguagem qualitativa quando a fonte não estiver disponível. (Regra S-09 — originada em C1-M01-U01.)
- **Não descrever forma de letra com base em variante caligráfica.** A descrição deve corresponder à forma impressa no NA28/UBS5, que é o texto que o aluno vai ler. (Regra S-10 — originada em C1-M01-U01 Fase 4.)

---

## O SENTIMENTO QUE O ALUNO DEVE TER

Ao final de **cada unidade:**
> "Entendi essa letra/palavra. Sei de onde vem, sei como soa, e já vi ela num versículo que conheço."

Ao final de **cada módulo:**
> "Aprendi algo novo hoje. Tenho uma palavra grega nova que posso reconhecer no texto bíblico."

Ao final de **cada aula de versículo:**
> "Eu li um versículo em grego. Palavra por palavra. E entendi. Isso é real."

Se o aluno não pode dizer essas três coisas, o módulo ainda não está pronto.

---

## CHECKLIST EDITORIAL ANTES DE FINALIZAR UM MÓDULO

### Formatação do texto:
- [ ] O campo `destaque` está presente em todas as unidades?
- [ ] Letras gregas nomeadas no `explicacao` e `dica` estão em **negrito**?
- [ ] Exemplos em português estão em *itálico* (*"pai"*, *"pé"*, *"vida"*)?
- [ ] Nenhuma linha de `explicacao` ou `dica` usa CAIXA ALTA para ênfase?
- [ ] Barras fonéticas (/a/, /e/) aparecem apenas no campo `som:`, nunca soltas em frases?

### Conteúdo:
- [ ] Cada unidade tem origem histórica do elemento ensinado?
- [ ] Cada unidade tem ao menos 1 versículo real de contexto?
- [ ] A palavra do módulo foi ensinada com frequência no NT?
- [ ] A palavra do módulo foi decomposta em letras já ensinadas?
- [ ] O tom é de professor explicando, não de dicionário listando?
- [ ] **S-09:** Afirmações quantitativas têm fonte verificável (ou são qualitativas)?
- [ ] **S-10:** Descrições de formas de letras correspondem ao texto impresso padrão?

### Exercícios:
- [ ] Nenhuma questão usa conteúdo não ensinado anteriormente?
- [ ] As opções erradas do multiple_choice são plausíveis?
- [ ] **S-07:** Nenhum campo `pergunta` contém a resposta ou dica do gabarito?
- [ ] A fase 5 (aplicação) usa o versículo âncora do módulo?
- [ ] Há ao menos uma questão de contexto/interpretação, não só de forma?

### Aula do versículo (quando aplicável):
- [ ] O versículo foi apresentado inteiro antes de ser fragmentado?
- [ ] Cada palavra recebeu tradução + comentário gramatical?
- [ ] Há comentário teológico-linguístico (por que o grego importa aqui)?
- [ ] O exercício de montagem (word_order) está presente?
- [ ] O aluno tem a sensação de ter lido um versículo real?

### Progressão:
- [ ] O módulo se conecta naturalmente ao anterior?
- [ ] O módulo prepara algo do próximo sem antecipar?
- [ ] A palavra âncora usa elementos ensinados até este módulo?

---

## COMO USAR ESTE DOCUMENTO

Este documento é lido **antes** de escrever qualquer apostila.

O autor (humano ou LLM) lê este orquestrador, internaliza a filosofia, e então abre o `SISTEMA_FATURACAO_CONTEUDO.md` para ver o formato técnico.

A sequência de trabalho é:

```
1. Ler este orquestrador (filosofia e padrão editorial)
2. Ler o SISTEMA_FATURACAO_CONTEUDO.md (formato técnico da apostila)
3. Ler os módulos já existentes como referência (C1-M01.apostila.md)
4. Escrever o novo módulo
5. Revisar contra os checklists deste documento
6. Só então rodar o parser ou entregar à LLM para implementar
```

A qualidade do conteúdo gerado é diretamente proporcional ao quanto este orquestrador foi seguido. Módulos que saem rasos geralmente são módulos onde o autor pulou a seção de origem histórica ou usou versículos genéricos em vez dos mais emblemáticos.

---

*Documento de referência editorial do projeto Koiné.*
*Versão 1.0 — a ser revisado após os primeiros 5 módulos escritos com este padrão.*
