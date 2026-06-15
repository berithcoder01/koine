# CORREÇÕES SISTÊMICAS — KOINÉ APP
## Versão 2.0 — Baseado na Revisão de C1-M01 (Prova de Verdade)
### Documento de aplicação obrigatória a partir de C1-M02

---

## CONTEXTO E FINALIDADE

A versão 2.0 incorpora os achados da **Prova de Verdade** (fact-check) realizada sobre C1-M01 após sua publicação. Diferentemente da V1, que tratava de inconsistências entre conteúdo gerado e especificações, a V2 trata de **erros factuais**, **imprecisões descritivas** e **falhas de estrutura de pergunta** que passaram pela revisão anterior.

Este documento é lido **após** o ORQUESTRADOR_EDITORIAL.md e **antes** de iniciar a escrita de qualquer módulo. Ele complementa e precisa o documento CORRECOES_SISTEMICAS_V1.md — não o substitui (as regras S-01 a S-06 e DS-01, DS-02 continuam vigentes).

### O que mudou da V1 para a V2:

- S-07 (NOVA): vedação de vazamento de resposta no campo `pergunta`
- S-08 (NOVA): vedação de nomeação de diacrítico específico antes de C1-M09
- S-09 (NOVA): vedação de afirmações quantitativas não verificáveis
- S-10 (NOVA): padronização da descrição de formas de letras no texto impresso
- Tabela canônica de descrição de letras (Apêndice A)
- Tabela de referência de diacríticos para Prova de Verdade (Apêndice B)
- Prova de Verdade incorporada como etapa obrigatória da revisão

---

## SEÇÃO 1 — NOVAS REGRAS SISTÊMICAS

---

### Regra S-07 — O campo `pergunta` nunca contém a resposta

**Origem:** Falha #1 do Relatório de Revisão C1-M01 — U03, Fase 4: a pergunta continha `(a letra que falta é o épsilon)` no enunciado, tornando o exercício de recordação inútil.

**Regra:**

O campo `pergunta` de qualquer questão deve ser **autossuficiente e neutro** — não pode conter parênteses, instruções ou dicas que entreguem a resposta. Qualquer explicação, instrução descritiva ou nota pedagógica pertence ao campo `explicacao`.

**Formato correto:**
```
pergunta: Complete a sequência das três vogais aprendidas neste módulo: Α ___ Ι
explicacao: Α (alfa), Ε (épsilon), Ι (iota) — nesta ordem, que é a ordem que você aprendeu (U01, U02, U03).
```

**Formato proibido:**
```
pergunta: Complete a sequência das três vogais aprendidas neste módulo: Α ___ Ι (a letra que falta é o épsilon)
```

**Casos que parecem exceção mas NÃO são:**
- `"Qual destas NÃO é uma vogal grega?"` — a palavra NÃO em caixa alta no enunciado é uma instrução de escopo, não entrega a resposta. Permitido.
- `"Em ἀγάπη (a palavra-âncora do módulo)..."` — contextualizar a palavra é diferente de entregar a resposta. Permitido (desde que o contexto não contenha a resposta).

**Teste de validação: você consegue responder à pergunta sem ler o resto da questão ou o campo `explicacao`? Se sim, está correto. Se a resposta está óbvia só de ler o `pergunta`, está violando S-07.**

---

### Regra S-08 — Diacríticos não são nomeados por tipo específico antes de C1-M09

**Origem:** Falha #2 do Relatório de Revisão C1-M01 — Aplicação Q3: o campo `explicacao` disse "acento circunflexo" quando o diacrítico sobre o Ι inicial de Ἰησοῦς é na verdade um **espírito áspero**. O agente nomeou o tipo errado.

**Regra:**

Em qualquer módulo anterior a C1-M09, o texto do módulo (campos `explicacao`, `dica`, `pergunta`) **nunca deve especificar o tipo de diacrítico** que aparece em uma palavra. Use apenas linguagem genérica:

| Situação | Uso correto | Uso proibido |
|----------|-------------|--------------|
| Referir-se aos sinais sobre letras | "os sinais sobre as letras" / "os diacríticos" / "as marcas" | "acento agudo" / "espírito áspero" / "circunflexo" / "iota subscrito" |
| Instruir o aluno a ignorá-los | "Ignore as marcas por enquanto — você as estuda no Módulo 9" | "Ignore o espírito áspero — você o estuda no Módulo 9" |
| Descrever uma letra com diacrítico | "o Ἰ de Ἰησοῦς" | "o iota com espírito áspero" |

**Por que esta regra existe (duas razões):**

1. **O agente pode errar o tipo.** Como visto em C1-M01, o agente nomeou "acento circunflexo" para um espírito áspero. Quando o aluno chegar a C1-M09 e aprender a diferença, terá uma informação incorreta na memória.

2. **O aluno não precisa saber o tipo em módulos < M09.** O propósito da menção de diacríticos nesse estágio é fazer o aluno ignorá-los, não identificá-los. Nomear o tipo adiciona ruído cognitivo sem benefício pedagógico.

**Exceção:** Em C1-M09, quando o módulo ensina diacríticos, os tipos devem ser nomeados corretamente. A partir de C1-M10, podem ser referenciados pelo nome quando relevante.

**Checklist de verificação:**
```
[ ] Toda menção a diacríticos usa linguagem genérica
    ("sinais", "marcas", "diacríticos")?
[ ] Nenhum campo nomeia "acento", "espírito", "circunflexo",
    "subscrito" ou "áspero" em módulos < C1-M09?
[ ] O nome específico correto foi verificado para cada
    diacrítico mencionado (contra a Tabela de Diacríticos
    do Apêndice B)?
```

---

### Regra S-09 — Afirmações quantitativas devem ser verificáveis

**Origem:** Falha #3 do Relatório de Revisão C1-M01 — U01: "Alfa aparece em mais de 60% das palavras" (dado não verificado, provavelmente incorreto).

**Regra:**

Números precisos (percentuais, contagens absolutas de frequência) só podem ser usados quando verificados contra uma fonte confiável. Fontes aceitáveis:

1. Concordância de Mounce (para frequência de palavras)
2. NA28/UBS5 (para contagens de formas)
3. BibleHub / StepBible (para frequência de letras e palavras)
4. Dicionário de W. Bauer (BDAG) — para palavras

**Substituições obrigatórias:**

| Tipo de afirmação | Original (proibido) | Substituição (correto) |
|------------------|-------------------|----------------------|
| Percentual de ocorrência | "Alfa aparece em mais de 60% das palavras" | "Alfa é a letra mais frequente do alfabeto grego" |
| Frequência relativa | "Esta palavra aparece em 1 em cada 3 versículos" | "Esta palavra está entre as 20 mais frequentes do NT" |
| Contagem não verificada | "Aparece 5.000 vezes" | "Aparece mais de 2.000 vezes" (se verificado) |

**Onde contagens verificáveis SÃO permitidas (incentivadas):**
- Número de ocorrências de uma palavra no NT, quando verificado (ex: "θεός aparece 1.317 vezes no NT")
- Porcentagem do NT que uma letra representa (se verificada contra concordância)
- Número de capítulos/versículos de um livro

**Regra prática para o agente gerador:**
- Se não tem certeza do número: use linguagem qualitativa ("mais frequente", "entre as mais comuns", "altíssima frequência")
- Se tem dúvida sobre o valor: não use o valor
- Se a grade ou o ORQUESTRADOR_EDITORIAL fornece o número: pode usar (ex: "τὸν υἱὸν τὸν μονογενῆ" com contagem de ocorrências)

---

### Regra S-10 — Descrição de formas de letras deve corresponder ao texto impresso padrão (NA28/UBS5)

**Origem:** Falha #4 do Relatório de Revisão C1-M01 — U01, Fase 4: α foi descrito como "laço arredondado na parte inferior e uma haste vertical", que descreve uma variante caligráfica, não a forma impressa padrão.

**Regra:**

Toda descrição de forma de letra nos campos `explicacao` e `dica` deve ser baseada na forma **impressa padrão** usada no NA28/UBS5 (a edição crítica do NT grego), não em variantes caligráficas, manuscritas ou de fontes decorativas.

**Descrições canônicas (usar estas ou equivalentes precisos):**

| Letra | Descrição canônica para o texto impresso |
|-------|------------------------------------------|
| Α α | Α maiúsculo = idêntico ao A do português. α minúsculo = oval fechado com pequena cauda à direita — como um 'a' cursivo. |
| Ε ε | Ε maiúsculo = idêntico ao E do português. ε minúsculo = curva aberta para a direita, sem haste vertical — parecido com um meio círculo. |
| Ι ι | Ι maiúsculo e ι minúsculo = uma única linha reta vertical, maior (maiúscula) ou menor (minúscula). São a mesma forma, só muda o tamanho. |
| Ο ο | Ambos iguais ao O do português — um círculo fechado. |
| Υ υ | Parece um Y em maiúsculo e minúsculo. O minúsculo tem uma haste vertical que se divide em duas curvas na parte superior. |
| Ω ω | Forma de ferradura aberta na parte inferior — não existe igual no português. |
| Η η | Maiúsculo = idêntico ao H do português. η minúsculo = um n (como em "ninho"), com a perna direita descendo abaixo da linha. |
| Ν ν | Maiúsculo = idêntico ao N do português. ν minúsculo = forma de ponte ou 'v' com o lado direito estendido. |
| Τ τ | Maiúsculo = idêntico ao T do português. τ minúsculo = haste vertical com topo curvo à direita — não tem a barra horizontal completa do 't'. |
| Σ σ/ς | Σ maiúsculo = diferente do S — mais angular. σ minúsculo = curva fechada como um 'o' com a abertura à esquerda. ς final = curva com cauda descendo. |
| Κ κ | Similar ao K do português. κ minúsculo = como um k, mas ligeiramente mais curvo. |
| Λ λ | Λ maiúsculo = dois traços diagonais em ângulo — como um 'A' sem o travessão. λ minúsculo = um traço curvo e um traço diagonal, como um y grego. |
| Π π | Π maiúsculo = P maiúsculo do português, mas com as pernas retas (não curvas). π minúsculo = como um 'n' com o topo estendido horizontalmente. |
| Ρ ρ | Parece o P do português, tanto maiúsculo quanto minúsculo. ρ minúsculo = haste vertical com laço fechado no topo e perna descendo. |
| Μ μ | Parece o M do português, maiúsculo e minúsculo. |
| Β β | Parece o B do português (maiúsculo e minúsculo). β minúsculo = dois laços, um acima do outro. |
| Δ δ | Δ maiúsculo = triângulo. δ minúsculo = círculo com curva ascendente à direita. |
| Γ γ | Γ maiúsculo = um L invertido (ângulo reto). γ minúsculo = curva que desce abaixo da linha. |

**Verificação:**
```
[ ] A descrição de cada letra corresponde à forma impressa no
    NA28/UBS5, não a uma variante caligráfica?
[ ] A descrição usa terminologia visual clara (oval, curva,
    haste, laço) que o aluno consegue verificar no texto?
[ ] Se a letra tem forma diferente da equivalente do português,
    a diferença está explicitada?
```

---

## SEÇÃO 2 — REFINAMENTO DAS REGRAS V1 (a partir de C1-M02)

### S-01 (versículos âncora) — nenhuma alteração
### S-02 (glifos futuros) — nenhuma alteração
### S-03 (Fase 5 = grade) — nenhuma alteração

### S-04 (maiúscula/minúscula) — ADENDO:

Letras cuja forma maiúscula e minúscula são **morfologicamente idênticas** (como Ι/ι) devem declarar isso explicitamente, em vez de omitir a distinção. A frase-padrão: "A maiúscula e a minúscula têm a mesma forma — a diferença é o tamanho."

### S-05 (diacríticos) — nenhuma alteração
### S-06 (par Ε/Η) — nenhuma alteração

### DS-01 (distrator futuro) — REFINAMENTO:

A explicação de qualquer questão que usa letra futura como distrator DEVE usar o **enquadramento padrão**:

> "[letra] é uma letra de módulo futuro — aparece aqui apenas como distrator visual."

Este enquadramento deve ser **idêntico em todas as unidades do mesmo módulo** que usam o mesmo distrator, para evitar inconsistências internas como as registradas em C1-M01 (U01 vs U03).

---

## SEÇÃO 3 — PROVA DE VERDADE (NOVA ETAPA OBRIGATÓRIA)

A partir da V2, toda revisão de módulo (nova ou edição) deve incluir uma etapa de **Prova de Verdade** — verificação factual de cada afirmação histórica, linguística e gramatical do módulo contra conhecimento estabelecido.

### Blocos de verificação obrigatórios:

**F1 — Afirmações históricas sobre letras e alfabeto:**
```
[ ] A origem histórica da letra (semítica → grego → latim) está correta?
[ ] A cronologia é defensável (datas, séculos)?
[ ] A cadeia de transmissão alfabética está correta?
[ ] O nome e a posição da letra no alfabeto estão corretos?
```

**F2 — Afirmações sobre frequência e uso no NT:**
```
[ ] Regra S-09: Afirmações quantitativas têm fonte verificável?
[ ] Se a afirmação é qualitativa ("mais frequente"), é defensável?
[ ] As palavras de exemplo realmente contêm a letra ensinada?
[ ] Os exemplos de uso são reais (atestados no NT)?
```

**F3 — Afirmações sobre versículos e texto bíblico:**
```
[ ] Cada versículo citado existe na forma indicada?
[ ] A referência (livro, capítulo, versículo) está correta?
[ ] A forma grega citada está de fato no versículo indicado?
[ ] A tradução/paráfrase reflete com precisão o texto grego?
```

**F4 — Afirmações descritivas sobre formas de letras:**
```
[ ] Regra S-10: A descrição corresponde à forma impressa no NA28/UBS5?
[ ] A descrição não se baseia em variante caligráfica ou manuscrita?
[ ] A metáfora/dica mnemônica é funcional e não enganosa?
```

**F5 — Nomenclatura de diacríticos:**
```
[ ] Regra S-08: Nenhum diacrítico é nomeado por tipo específico
    em módulos < C1-M09?
[ ] Se há menção a diacríticos, a terminologia é genérica?
[ ] O nome específico (se usado em C1-M09+) está correto?
```

---

## SEÇÃO 4 — CHECKLIST CORRETIVO V2

Adicionar ao checklist da V1:

```
[ ] S-07: Nenhuma pergunta contém a resposta ou dica do gabarito
    no campo `pergunta`?

[ ] S-08: Nenhum diacrítico é nomeado por tipo específico
    (acento, espírito, subscrito, áspero) em módulos < C1-M09?

[ ] S-09: Afirmações quantitativas têm fonte verificável?
    → Se não: substituir por linguagem qualitativa.

[ ] S-10: Descrições de formas de letras correspondem ao
    texto impresso padrão (NA28/UBS5)?

[ ] DS-01 (REFINADO): Todas as unidades do mesmo módulo usam
    o MESMO enquadramento padrão para o distrator futuro?
    → Texto-padrão: "[letra] é uma letra de módulo futuro —
      aparece aqui apenas como distrator visual."

[ ] PROVA DE VERDADE: Os blocos F1 a F5 foram percorridos?
    → Conferir cada afirmação factual contra conhecimento
      estabelecido.

[ ] S-04 (ADENDO): Para letras com forma idêntica em maiúscula
    e minúscula (ex: Ι/ι, Ο/ο), isso foi declarado explicitamente?
    → "A maiúscula e a minúscula têm a mesma forma — a diferença
      é o tamanho."
```

---

## APÊNDICE A — TABELA CANÔNICA DE DESCRIÇÃO DE LETRAS

(Conteúdo completo na Regra S-10 acima.)

---

## APÊNDICE B — TABELA DE DIACRÍTICOS PARA PROVA DE VERDADE

Usar esta tabela para verificar qualquer menção a diacríticos. O agente de revisão deve conferir que, se um diacrítico for nomeado (apenas em C1-M09+), o nome está correto.

| Diacrítico | Aparência | Nome correto | Onde aparece |
|-----------|-----------|--------------|-------------|
| ῾ sobre letra inicial | ῾Ι | Espírito áspero | Ἰησοῦς, ἵνα, ἑπτά |
| ᾿ sobre letra inicial | ἀ | Espírito suave | ἀγάπη, ἐν, ἐγώ |
| ά / ά | ά, έ, ή, ί, ό, ύ, ώ | Acento agudo | ἀγάπη, θεός, υἱός |
| ᾶ / ῆ / ῖ / ῦ / ῶ | ῦ | Acento circunflexo | Ἰησοῦς (no υ), κύριε, δῶρον |
| ᾳ / ῃ / ῳ | ῃ | Iota subscrito | τῇ, ἀγάπῃ (C1-M09+) |

**Uso na revisão:** Para cada módulo < C1-M09, verificar que nenhum termo desta tabela aparece no texto (permitido apenas "diacríticos" ou "sinais/marcas"). Para C1-M09+, verificar que cada termo usado corresponde à coluna "Nome correto" desta tabela.

---

*Documento gerado com base no Relatório de Revisão de C1-M01 (Prova de Verdade) · Koiné App*
*Versão 2.0 — aplicar a partir de C1-M02, revisão de todos os módulos C1 existentes*
*Próxima revisão: após conclusão da revisão de todos os módulos do Ciclo I*
