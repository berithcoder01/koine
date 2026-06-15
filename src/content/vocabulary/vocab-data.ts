export type VocabBlockId = 'V1' | 'V2' | 'V3' | 'V4';

export interface VocabBlock {
  id: VocabBlockId;
  title: string;
  subtitle: string;
  description: string;
  trophyVerse: string;
  trophyReference: string;
  moduleIds: string[];
  metaGoal: string;
}

export interface VocabModule {
  id: string;
  blockId: VocabBlockId;
  order: number;
  title: string;
  description: string;
  anchorWord: string;
  anchorMeaning: string;
  xp: number;
  unitCount: number;
  isPremium?: boolean;
}

export interface VocabWord {
  greek: string;
  translit: string;
  translation: string;
  frequency: number;
}

export interface VocabUnit {
  id: string;
  moduleId: string;
  unitOrder: number;
  title: string;
  groupLabel: string;
  words: VocabWord[];
  content: string;
  isPremium: boolean;
}

export function getBlocks(): VocabBlock[] {
  return VOCAB_BLOCKS;
}

export function getModulesByBlock(blockId: string): VocabModule[] {
  return VOCAB_MODULES.filter(m => m.blockId === blockId);
}

export function getModuleById(moduleId: string): VocabModule | undefined {
  return VOCAB_MODULES.find(m => m.id === moduleId);
}

export function getUnitsByModule(moduleId: string): VocabUnit[] {
  return VOCAB_UNITS.filter(u => u.moduleId === moduleId);
}

export function getUnitById(unitId: string): VocabUnit | undefined {
  return VOCAB_UNITS.find(u => u.id === unitId);
}

// ─── BLOCKS ────────────────────────────────────────────
export const VOCAB_BLOCKS: VocabBlock[] = [
  {
    id: 'V1',
    title: 'Vocabulário 1',
    subtitle: 'Palavras de Estrutura',
    description: 'Artigos, conjunções, pronomes e partículas — o cimento do grego.',
    trophyVerse: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος',
    trophyReference: 'João 1:1',
    moduleIds: ['V1-M01', 'V1-M02'],
    metaGoal: 'Reconhecer as palavras de estrutura do grego — as que sustentam as frases.',
  },
  {
    id: 'V2',
    title: 'Vocabulário 2',
    subtitle: 'Os Verbos Fundamentais',
    description: 'Os 15 verbos mais frequentes e teologicamente centrais do NT.',
    trophyVerse: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ἵνα τὸν υἱὸν τὸν μονογενῆ ἔδωκεν',
    trophyReference: 'João 3:16',
    moduleIds: ['V2-M01', 'V2-M02', 'V2-M03', 'V2-M04'],
    metaGoal: 'Reconhecer os verbos centrais do NT — quando vê, não conjugar com perfeição.',
  },
  {
    id: 'V3',
    title: 'Vocabulário 3',
    subtitle: 'Os Substantivos do NT',
    description: 'Os 40 substantivos de maior frequência e relevância teológica.',
    trophyVerse: 'ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή',
    trophyReference: 'João 14:6',
    moduleIds: ['V3-M01', 'V3-M02', 'V3-M03', 'V3-M04'],
    metaGoal: 'Reconhecer os substantivos centrais da fé cristã em grego.',
  },
  {
    id: 'V4',
    title: 'Vocabulário 4',
    subtitle: 'Preposições e Encerramento',
    description: 'As 12 preposições mais frequentes e advérbios de tempo e lugar.',
    trophyVerse: 'ἐγώ εἰμι ἡ ἀνάστασις καὶ ἡ ζωή',
    trophyReference: 'João 11:25',
    moduleIds: ['V4-M01', 'V4-M02'],
    metaGoal: 'Ler João 3:16 e João 11:25–26 identificando cada palavra.',
  },
];

// ─── MODULES ───────────────────────────────────────────
export const VOCAB_MODULES: VocabModule[] = [
  { id: 'V1-M01', blockId: 'V1', order: 1, title: 'Os Conectores', description: 'Artigo, conjunções e partículas de negação', anchorWord: 'καί', anchorMeaning: 'e, também', xp: 60, unitCount: 3 },
  { id: 'V1-M02', blockId: 'V1', order: 2, title: 'Pronomes e Condicionais', description: 'ἐγώ, σύ, αὐτός, ὅς, εἰ, ἵνα, ὡς', anchorWord: 'ἐγώ εἰμι', anchorMeaning: 'eu sou', xp: 60, unitCount: 3 },

  { id: 'V2-M01', blockId: 'V2', order: 1, title: 'Ser, Tornar-se, Fazer, Vir', description: 'εἰμί, γίνομαι, ποιέω, ἐρχομαι', anchorWord: 'κύριός ἐστιν', anchorMeaning: 'é o Senhor', xp: 60, unitCount: 3 },
  { id: 'V2-M02', blockId: 'V2', order: 2, title: 'Ver, Ouvir, Saber, Dar', description: 'ὁράω, ἀκούω, οἶδα, δίδωμι, πιστεύω', anchorWord: 'ὁ πιστεύων', anchorMeaning: 'o que crê', xp: 60, unitCount: 3 },
  { id: 'V2-M03', blockId: 'V2', order: 3, title: 'Falar, Enviar, Escrever', description: 'λέγω, ἀποστέλλω, εὑρίσκω, γράφω, ἀγαπάω', anchorWord: 'ἀπέσταλκέν με', anchorMeaning: 'o Pai me enviou', xp: 60, unitCount: 3 },
  { id: 'V2-M04', blockId: 'V2', order: 4, title: 'Salvar, Morrer, Perdoar', description: 'σῴζω, ἀποθνῄσκω, ἀφίημι + Aula João 3:16', anchorWord: 'σέσῳσταί', anchorMeaning: 'foi salvo', xp: 60, unitCount: 3 },

  { id: 'V3-M01', blockId: 'V3', order: 1, title: 'Relações e Papéis', description: 'κύριος, πατήρ, υἱός, ἀδελφός, ἄνθρωπος, λόγος, ἡμέρα', anchorWord: 'Πάτερ', anchorMeaning: 'Pai (vocativo)', xp: 60, unitCount: 3 },
  { id: 'V3-M02', blockId: 'V3', order: 2, title: 'Cosmos e Vida', description: 'θεός, πνεῦμα, ζωή, κόσμος, οὐρανός, γῆ, ὄνομα, ἀγάπη', anchorWord: 'ζωὴ αἰώνιος', anchorMeaning: 'vida eterna', xp: 60, unitCount: 3 },
  { id: 'V3-M03', blockId: 'V3', order: 3, title: 'Comunidade e Conflito', description: 'ὄχλος, ἁμαρτία, δοῦλος, νόμος, πόλις, βασιλεία, ἄγγελος', anchorWord: 'βασιλεία τοῦ θεοῦ', anchorMeaning: 'reino de Deus', xp: 60, unitCount: 3 },
  { id: 'V3-M04', blockId: 'V3', order: 4, title: 'Salvação e Identidade', description: 'ἀλήθεια, λαός, εἰρήνη, πίστις, χάρις, ἐκκλησία e mais', anchorWord: 'χάρις καὶ ἀλήθεια', anchorMeaning: 'graça e verdade', xp: 65, unitCount: 3 },

  { id: 'V4-M01', blockId: 'V4', order: 1, title: 'As Preposições', description: 'ἐν, εἰς, ἐκ, ἀπό, πρός, διά, κατά, μετά, περί, παρά, ὑπό, ἐπί', anchorWord: 'ἐν Χριστῷ', anchorMeaning: 'em Cristo', xp: 65, unitCount: 3 },
  { id: 'V4-M02', blockId: 'V4', order: 2, title: 'Advérbios e Encerramento', description: 'τότε, ἐκεῖ, πάλιν, δικαιοσύνη, ἀνάστασις + Aula Final', anchorWord: 'ἀνάστασις καὶ ζωή', anchorMeaning: 'ressurreição e vida', xp: 65, unitCount: 3 },
];

// ─── UNITS ─────────────────────────────────────────────
export const VOCAB_UNITS: VocabUnit[] = [
  // ═══════════════════════════════════════════════════════════
  // BLOCO V1
  // ═══════════════════════════════════════════════════════════
  {
    id: 'V1-M01-U01', moduleId: 'V1-M01', unitOrder: 1,
    title: 'Artigo definido e καί',
    groupLabel: 'Artigo + Conjunções aditivas',
    words: [
      { greek: 'ὁ, ἡ, τό', translit: 'ho, hē, to', translation: 'o, a, os, as (artigo)', frequency: 20000 },
      { greek: 'καί', translit: 'kai', translation: 'e, também, até', frequency: 9153 },
    ],
    content: `Você já sabe qual é a palavra mais frequente do NT grego? Não é *"Deus"*. Não é *"Jesus"*. É o artigo definido — **ὁ, ἡ, τό**.

**ὁ** (masculino), **ἡ** (feminino), **τό** (neutro) — funcionam exatamente como *"o, a"* em português. Mas em grego, o artigo carrega uma informação extra: ele diz o **gênero** e o **caso** da palavra que vem depois. É como uma etiqueta grudada no substantivo.

Aparece **~20.000 vezes** no NT. Isso significa que, nas primeiras frases que você ler em grego, já vai encontrar **ὁ** ou **ἡ**. É a letra que mais vai ver.

Versículo para guardar: *Ἐν ἀρχῇ ἦν **ὁ** λόγος* — "No princípio era **o** Verbo" (João 1:1). Repare: **ὁ** λόγος = **o** Verbo.

---

**καί** parece simples — é *"e"*. Mas em grego, **καί** faz mais do que conectar palavras.

Pode ser aditivo: *"e também"*. Pode ser adjuntivo: *"até mesmo"*. E pode ser a cola narrativa que mantém frases juntas — como se o autor estivesse dizendo *"e então... e mais..."*.

Aparece **9.153 vezes**. O Sermão do Monte em Mateus usa **καί** 95 vezes em três capítulos. É uma das primeiras palavras que você vai memorizar sem perceber.

Versículo âncora: *Ἐν ἀρχῇ ἦν ὁ λόγος, **καὶ** ὁ λόγος ἦν πρὸς τὸν θεόν, **καὶ** θεὸς ἦν ὁ λόγος.* (João 1:1) — *"No princípio era o Verbo, **e** o Verbo estava com Deus, **e** o Verbo era Deus."* Três **καί** sustentam a frase mais famosa do NT.`,
    isPremium: false,
  },
  {
    id: 'V1-M01-U02', moduleId: 'V1-M01', unitOrder: 2,
    title: 'Partículas de contraste e explicação',
    groupLabel: 'δέ, γάρ, ἀλλά, οὖν',
    words: [
      { greek: 'δέ', translit: 'de', translation: 'mas, e, porém', frequency: 2792 },
      { greek: 'γάρ', translit: 'gar', translation: 'pois, porque', frequency: 1041 },
      { greek: 'ἀλλά', translit: 'alla', translation: 'mas, pelo contrário', frequency: 638 },
      { greek: 'οὖν', translit: 'oun', translation: 'então, portanto', frequency: 499 },
    ],
    content: `Imagine que você está lendo uma carta. O autor acabou de dizer algo — e agora muda de assunto, ou acrescenta um contraste. Em grego, ele usa **δέ**.

**δέ** — *"mas, porém"* (2.792×). Nunca inicia a frase. Vem sempre na **segunda posição** — é pós-positiva. Isso é uma marca do grego que o português não tem: a partícula de contraste aparece depois da primeira palavra importante.

Versículo: *ὁ **δὲ** εἶπεν αὐτοῖς...* — *"E ele lhes disse..."* (Marcos 4:40). O **δέ** conecta o que Jesus acabou de fazer com o que ele vai falar.

---

Agora pense no autor argumentando. Ele precisa explicar **por que** algo é verdade. Para isso, usa **γάρ**.

**γάρ** — *"pois, porque"* (1.041×). Também pós-positiva. Paulo usa mais **γάρ** que os evangelistas — porque Paulo argumenta. Cada vez que você ver **γάρ** no meio de uma frase, o autor está dando uma razão.

Versículo: *οὕτως **γὰρ** ἠγάπησεν ὁ θεὸς τὸν κόσμον...* — *"Pois Deus amou o mundo de tal maneira..."* (João 3:16). O **γάρ** está dizendo: *"a razão é essa"*.

---

Quando o contraste é forte — não uma nuance, mas uma correção —, grego usa **ἀλλά**.

**ἀλλά** — *"mas, pelo contrário"* (638×). Mais enfático que **δέ**. A construção mais famosa: *οὐ... **ἀλλά*** — *"não... mas..."*.

Versículo: *οὐ γὰρ ἦλθον καλέσαι δικαίους **ἀλλὰ** ἁμαρτωλούς* — *"Pois não vim chamar justos, **mas** pecadores"* (Mateus 9:13). Jesus não está suavizando — está corrigindo.

---

Por fim, **οὖν** — a partícula de conclusão.

**οὖν** — *"então, portanto"* (499×). João usa mais **οὖν** que qualquer outro autor — é marca de estilo joanina. Cada vez que João diz **οὖν**, ele está tirando uma conclusão do que acabou de explicar.

Versículo: *οἱ **οὖν** στρατιῶται...* — *"Então os soldados..."* (João 19:23). Lucas usa **οὖν** para conectar a crucificação com o que acontece depois.`,
    isPremium: false,
  },
  {
    id: 'V1-M01-U03', moduleId: 'V1-M01', unitOrder: 3,
    title: 'Negações, ὅτι e preposições básicas',
    groupLabel: 'οὐ/μή, ὅτι, ἐκ, ἐν',
    words: [
      { greek: 'οὐ / οὐκ / οὐχ', translit: 'ou/ouk/oukh', translation: 'não', frequency: 1623 },
      { greek: 'μή', translit: 'mē', translation: 'não (proibições, condicionais)', frequency: 1042 },
      { greek: 'ὅτι', translit: 'hoti', translation: 'que, porque', frequency: 1296 },
      { greek: 'ἐκ / ἐξ', translit: 'ek/ex', translation: 'de, fora de', frequency: 914 },
      { greek: 'ἐν', translit: 'en', translation: 'em, dentro de', frequency: 2752 },
    ],
    content: `Em português temos apenas *"não"*. Em grego, são **duas** palavras diferentes — e elas significam coisas distintas.

**οὐ** — *"não"* de fato. Nega algo que é ou não é verdade. Aparece em três roupas: **οὐ** antes de consoante, **οὐκ** antes de vogal suave, **οὐχ** antes de áspera. Mesma palavra,三种 sons. (1.623×)

**μή** — *"não"* de intenção. Nega o que alguém quer, mandou ou deveria fazer. *οὐκ οἴδα* = *"não sei"* (fato). *μὴ γένοιτo* = *"que não aconteça!"* (desejo). (1.042×)

A diferença importa: **οὐ** diz o que não existe. **μή** diz o que não deve existir.

---

**ὅτι** é uma das palavras mais versáteis do grego. Pode ser *"que"* (discurso indireto) ou *"porque"* (causativo). (1.296×)

*οἶδα **ὅτι** ἔρχομαι* = *"sei **que** venho"*. *ὅτι** οὕτως ἠγάπησεν ὁ θεός* = *"**porque** Deus amou assim"*.

---

Agora, duas preposições que você vai ver o tempo todo.

**ἐν** — *"em, dentro de"* (2.752×). Uma das mais frequentes do NT. *ἐν ἀρχῇ* = *"no princípio"*. *ἐν Χριστῷ* = *"em Cristo"*. A ideia é de **dentro** — estar dentro de algo.

**ἐκ / ἐξ** — *"de, fora de"* (914×). O oposto de **ἐν**. Sai de dentro. *ἐκ* antes de consoante, *ἐξ* antes de vogal. *ἐκ θεοῦ* = *"de Deus"*.

Versículo âncora: *ἦν **ἐν** ἀρχῇ πρὸς τὸν θεόν* — *"Estava no princípio com Deus"* (João 1:2). **ἐν** = dentro de; **πρός** = junto de. O Verbo estava dentro do princípio e junto de Deus.`,
    isPremium: false,
  },

  // V1-M02
  {
    id: 'V1-M02-U01', moduleId: 'V1-M02', unitOrder: 1,
    title: 'Pronomes pessoais',
    groupLabel: 'ἐγώ, σύ, αὐτός',
    words: [
      { greek: 'ἐγώ', translit: 'egō', translation: 'eu', frequency: 1725 },
      { greek: 'σύ', translit: 'sy', translation: 'tu, você', frequency: 1067 },
      { greek: 'αὐτός', translit: 'autos', translation: 'ele, ela, mesmo', frequency: 5601 },
    ],
    content: `Você sabe por que Jesus disse *"Eu SOU"* em João 8:58 — e os judeus quase o apedrejaram?

Porque em grego, **ἐγώ εἰμί** não é apenas *"eu sou"*. É uma declaração de identidade divina. Quando **ἐγώ** aparece no grego, é **ênfase intencional**. Não é *"sou o homem"*. É *"**EU** sou"*.

Essa palavra aparece **1.725 vezes** no NT. É comum — mas cada vez que Jesus a usa com **εἰμί**, carrega um peso que a tradução não captura.

Versículo: *ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή* — *"Eu sou o caminho, a verdade e a vida"* (João 14:6). Sem **ἐγώ**, a frase perde a ênfase pessoal.

---

**σύ** — *"tu"* (1.067×). Enfático quando expresso. Em português, *"tu"* já é mais íntimo que *"você"*. Em grego, quando **σύ** aparece no verso, o autor está escolhendo tornar a fala pessoal.

*σὺ δὲ τίς με λέγεις εἶναι;* — *"E tu, quem dizes que eu sou?"* (Marcos 8:29). Jesus está perguntando **a Pedro pessoalmente**.

---

**αὐτός** é a palavra mais difícil deste módulo — porque tem **três usos** completamente diferentes. (5.601×)

**1. Pronome de 3ª pessoa** — *"ele, ela"*: *εἶπεν **αὐτοῖς*** = *"ele lhes disse"*.

**2. Intensivo** — *"o próprio, a mesma"*: ***αὐτὸς** ὁ θεός* = *"o próprio Deus"*. Não é "um deus" — é **Deus em pessoa**.

**3. Predicado** — *"mesmo"*: *ὁ θεὸς **αὐτός*** = *"Deus mesmo"*.

A diferença entre os dois últimos é sutil: o intensivo precede o substantivo, o predicado vem depois. Mas os dois dizem a mesma coisa: **esta é a pessoa, sem dúvida**.`,
    isPremium: false,
  },
  {
    id: 'V1-M02-U02', moduleId: 'V1-M02', unitOrder: 2,
    title: 'Pronome relativo e indefinido',
    groupLabel: 'ὅς, τις',
    words: [
      { greek: 'ὅς, ἥ, ὅ', translit: 'hos, hē, ho', translation: 'que, o qual', frequency: 1407 },
      { greek: 'τις, τι', translit: 'tis, ti', translation: 'alguém, algum', frequency: 525 },
    ],
    content: `**ὅς** é o pronome relativo — o *"que"* do português. Conecta duas frases referindo-se a algo dito antes.

*ὁ λόγος **ὃν** εἶπεν* = *"a palavra **que** ele disse"*. Sem **ὅς**, as duas frases ficariam soltas. Com ele, viram uma só.

Cuida de três gêneros: **ὅς** (masculino), **ἥ** (feminino), **ὅ** (neutro). Muda de forma, não de função.

Versículo: *τὸ φῶς τὸ ἀληθινόν, **ὃ** φωτίζει πάντα ἄνθρωπον* — *"A luz verdadeira, **que** ilumina todo homem"* (João 1:9). O **ὅ** está dizendo: *"essa luz que acabei de mencionar — ela ilumina"*.

---

**τις** — *"alguém, algum"* (525×). Palavra pequena, mas com um detalhe que muda tudo: o acento.

**τίς** (com acento agudo) = *"quem?"* — interrogativo.
**τις** (sem acento) = *"alguém"* — indefinido.

Mesma forma, funções opostas. O acento é o único indicio. No contexto, você vai saber qual é.

Versículo: *ἄνθρωπός **τις** εἶχεν δύο υἱούς* — *"Certo homem tinha dois filhos"* (Lucas 15:11). **τις** = *"certo"*, não perguntando — apresentando.`,
    isPremium: false,
  },
  {
    id: 'V1-M02-U03', moduleId: 'V1-M02', unitOrder: 3,
    title: 'Condicionais e modais',
    groupLabel: 'εἰ, ἵνα, ὡς, πᾶς',
    words: [
      { greek: 'εἰ', translit: 'ei', translation: 'se (condicional)', frequency: 502 },
      { greek: 'ἵνα', translit: 'hina', translation: 'para que, a fim de que', frequency: 663 },
      { greek: 'ὡς', translit: 'hōs', translation: 'como, quando', frequency: 504 },
      { greek: 'πᾶς', translit: 'pas', translation: 'todo, cada, qualquer', frequency: 1228 },
    ],
    content: `Quando Jesus tenta Satanás no deserto, ele diz: *"Está escrito: não tentarás o Senhor teu Deus"*. Em grego, a frase começa com **εἰ**.

**εἰ** — *"se"* (502×). Condicional. Diferente de *ἐάν* (que é condicional hipotético), **εἰ** apresenta uma condição direta.

*εἰ υἱὸς εἶ τοῦ θεοῦ* — *"**Se** és filho de Deus"* (Mateus 4:3). Satanás está testando: **se** você é, prova isso.

---

**ἵνα** é uma das palavras teologicamente mais importantes do NT. (663×)

**ἵνα** = *"para que, a fim de que"*. Introduz **propósito**. Quando você vê **ἵνα**, o autor está dizendo: *"o motivo disso é..."*.

*οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, **ἵνα**...* — *"Pois Deus amou o mundo de tal maneira, **para que**..."* (João 3:16). O **ἵνα** é o ponto de virada: o amor de Deus **tinha um propósito**.

---

**ὡς** — *"como, quando"* (504×). Comparativa e temporal. Funciona como a palavra mais flexível do grego — quase sempre se encaixa onde *"como"* se encaixa em português.

---

**πᾶς** — *"todo, cada"* (1.228×). Uma das palavras mais frequentes do NT. Quando tem artigo (*πᾶς ὁ ἄνθρωπος*), significa *"todo o homem"*. Sem artigo (*πᾶς ἄνθρωπος*), significa *"qualquer homem"*.

Versículo: *καὶ **πᾶς** ὁ ζῶν καὶ πιστεύων εἰς ἐμὲ οὐ μὴ ἀποθάνῃ* — *"E **todo** aquele que vive e crê em mim não morrerá para sempre"* (João 11:26). O **πᾶς** é universal: sem exceção.`,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO V2
  // ═══════════════════════════════════════════════════════════
  {
    id: 'V2-M01-U01', moduleId: 'V2-M01', unitOrder: 1,
    title: 'Verbos de existência e identidade',
    groupLabel: 'εἰμί, γίνομαι',
    words: [
      { greek: 'εἰμί', translit: 'eimi', translation: 'ser, estar, existir', frequency: 2462 },
      { greek: 'γίνομαι', translit: 'ginomai', translation: 'tornar-se, acontecer', frequency: 669 },
    ],
    content: `Se você pudesse aprender apenas um verbo grego, aprenderia **εἰμί**. É o verbo *"ser, estar, existir"* — e aparece **2.462 vezes** no NT.

**εἰμí** é irregular: *εἰμί* (sou), *εἶ* (és), *ἐστίν* (é), *ἦν* (era). Parece difícil, mas é igual ao português: *"sou, és, é, era"* — cada pessoa tem uma forma diferente. Você já sabe isso. Só precisa reconhecer as formas novas.

Onde brilha: *καὶ θεὸς **ἦν** ὁ λόγος* — *"E o Verbo **era** Deus"* (João 1:1c). João usa **ἦν** (imperfeito) — não *"se tornou"*, mas *"**era** desde sempre"*. A escolha do tempo verbal é teologia.

---

**γίνομαι** — *"tornar-se, acontecer"* (669×). A diferença para **εἰμί** é crucial: **εἰμí** descreve o que algo **é**. **γίνομαι** descreve o que algo **se torna**.

João 1:14: *ὁ λόγος σὰρξ **ἐγένετο*** — *"O Verbo **se fez** carne"*. Não *"era carne"* — **se tornou**. A encarnação é um evento, não uma condição permanente.

Versículo: *καὶ ὁ λόγος σὰρξ **ἐγένετο*** (João 1:14). A palavra-chave do Natal em grego é **γίνομαι**.`,
    isPremium: false,
  },
  {
    id: 'V2-M01-U02', moduleId: 'V2-M01', unitOrder: 2,
    title: 'Verbos de ação e movimento',
    groupLabel: 'ποιέω, ἐρχομαι',
    words: [
      { greek: 'ποιέω', translit: 'poieō', translation: 'fazer, agir, praticar', frequency: 568 },
      { greek: 'ἐρχομαι', translit: 'erchomai', translation: 'vir, ir, chegar', frequency: 634 },
    ],
    content: `**ποιέω** é o verbo *"fazer"* mais genérico do grego. Quando alguém pergunta *"τί **ποιεῖς**;"* — *"o que você **está fazendo**?"* —, é **ποιέω**. (568×)

Funciona para qualquer ação: construir, agir, praticar, criar. É o verbo que você usaria se não soubesse outro.

Versículo: *ὅτι ὁ πατήρ μου ἕως ἄρτι **ἐργάζεται**, κἀγὼ **ποιῶ*** — *"Pois meu Pai até agora trabalha, e eu também **trabalho**"* (João 5:17). Jesus usa **ποιέω** para descrever a obra contínua de Deus.

---

**ἐρχομαι** — *"vir, ir, chegar"* (634×). Irregular: no aoristo, a raiz muda para **ἦλθον**. Parece outra palavra, mas é a mesma coisa — assim como *"fui"* e *"vou"* são formas de *"ir"* em português.

Em João, **ἐρχομαι** carrega peso teológico: é o verbo da **vinda de Jesus**. *ἦλθεν εἰς τὰ ἴδια* — *"Veio para o que era seu"* (João 1:11). Ele **veio** — e foi rejeitado.`,
    isPremium: false,
  },
  {
    id: 'V2-M01-U03', moduleId: 'V2-M01', unitOrder: 3,
    title: 'Vocabulário vinculado',
    groupLabel: 'κύριος, Χριστός, Ἰησοῦς',
    words: [
      { greek: 'κύριος', translit: 'kyrios', translation: 'Senhor', frequency: 717 },
      { greek: 'Χριστός', translit: 'Christos', translation: 'Cristo, o Ungido', frequency: 529 },
      { greek: 'Ἰησοῦς', translit: 'Iēsous', translation: 'Jesus', frequency: 917 },
    ],
    content: `Três palavras que você já conhece em português — mas em grego, carregam peso diferente.

**κύριος** — *"Senhor"* (717×). Na tradução grega do AT (Septuaginta), **κύριος** traduz o nome de Deus: YHWH. Quando os cristãos primitivos chamaram Jesus de **κύριος**, estavam dizendo algo revolucionário: *"Jesus é o Senhor que o AT prometeu"*.

Versículo: *ὅτι **Κύριος** Ἰησοῦς* — *"Jesus é o **Senhor**"* (Romanos 10:9). Confessar **κύριος** era declarar que César não é o senhor.

---

**Χριστός** — *"Cristo, o Ungido"* (529×). Tradução grega de *מָשִׁיחַ* (Mashiach) — o ungido por Deus. Não é sobrenome de Jesus — é **título**: *"Jesus, o Ungido"*.

Os primeiros cristãos usavam o símbolo ☧ (combinação de Χ e Ρ, as duas primeiras letras de **Χριστός**) como senha de identificação.

---

**Ἰησοῦς** — *"Jesus"* (917×). O nome mais frequente do NT. Em hebraico: *יֵשׁוּעַ* (Yeshua) — *"YHWH salva"*. O próprio nome é um versículo.

Versículo: *Ἰησοῦς ἐστιν ὁ **Χριστός*** — *"Jesus é o **Cristo**"* (João 20:31). A frase mais curta e mais completa do Evangelho.`,
    isPremium: false,
  },

  // V2-M02
  {
    id: 'V2-M02-U01', moduleId: 'V2-M02', unitOrder: 1,
    title: 'Percepção',
    groupLabel: 'ὁράω, ἀκούω',
    words: [
      { greek: 'ὁράω', translit: 'horaō', translation: 'ver, perceber', frequency: 454 },
      { greek: 'ἀκούω', translit: 'akouō', translation: 'ouvir, escutar', frequency: 428 },
    ],
    content: `**ὁράω** — *"ver, perceber"* (454×). Não é apenas enxergar com os olhos — é **perceber**, entender com a visão.

João 20:5–8 usa três verbos de visão diferentes para descrever a mesma cena: **βλέπει** (olha), **θεωρεῖ** (observa com atenção), **εἶδεν** (vê e compreende). Cada verbo dá um passo a mais na percepção.

Versículo: *ὁ **ἑωρακὼς** μεμαρτύρηκεν* — *"Aquele que **viu** testemunhou"* (João 19:35). O autor do Evangelho está dizendo: *"eu vi com meus próprios olhos"*.

---

**ἀκούω** — *"ouvir, obedecer"* (428×). Em grego bíblico, *"ouvir"* quase sempre implica **"obedecer"**. Não é só receber som — é deixar o som mudar seu comportamento.

*τὰ πρόβατα τῆς φωνῆς αὐτοῦ **ἀκούει*** — *"As ovelhas **ouvem** a voz dele"* (João 10:3). As ovelhas não apenas escutam — **reconhecem e seguem**.`,
    isPremium: false,
  },
  {
    id: 'V2-M02-U02', moduleId: 'V2-M02', unitOrder: 2,
    title: 'Conhecimento e posse',
    groupLabel: 'οἶδα, ἔχω',
    words: [
      { greek: 'οἶδα', translit: 'oida', translation: 'saber, conhecer (intuição)', frequency: 318 },
      { greek: 'ἔχω', translit: 'echō', translation: 'ter, possuir', frequency: 708 },
    ],
    content: `**οἶδα** — *"saber"* (318×). Parece o verbo do tempo perfeito, mas tem sentido **presente**. É como se a pessoa dissesse: *"já sei"* — o conhecimento veio e ficou.

Distinto de **γινώσκω** (conhecer por experiência). **οἶδα** = saber intuição. **γινώσκω** = saber vivência. *"Eu **sei** que existe Deus"* vs. *"Eu **conheço** a Deus"*.

Versículo: *ὑμεῖς δὲ **οὐκ οἴδατε** πόθεν ἔρχομαι* — *"Mas vocês **não sabem** de onde eu venho"* (João 8:14). Jesus está dizendo que eles não **compreenderam** quem ele é.

---

**ἔχω** — *"ter, possuir"* (708×). Um dos verbos mais comuns do grego. Mas no NT, frequentemente aparece em contextos de **estado espiritual**.

*ζωὴν αἰώνιον **ἔχειν*** = *"ter vida eterna"*. Não é algo que você vai ganhar no futuro — é algo que **já tem** quando crê.

Versículo: *ὁ πιστεύων εἰς τὸν υἱὸν **ἔχει** ζωὴν αἰώνιον* — *"Quem crê no Filho **já tem** vida eterna"* (João 3:36). **ἔχει** = presente. Já tem.`,
    isPremium: false,
  },
  {
    id: 'V2-M02-U03', moduleId: 'V2-M02', unitOrder: 3,
    title: 'Dom e fé',
    groupLabel: 'δίδωμι, πιστεύω',
    words: [
      { greek: 'δίδωμι', translit: 'didōmi', translation: 'dar, conceder', frequency: 415 },
      { greek: 'πιστεύω', translit: 'pisteuō', translation: 'crer, confiar, ter fé', frequency: 241 },
    ],
    content: `**δίδωμι** — *"dar, conceder"* (415×). Verbo irregular tipo **-μι** — as formas mudam mais do que os verbos regulares. Mas o sentido é sempre o mesmo: **entregar algo a alguém**.

O verbo do dom divino. João 3:16: *τὸν υἱὸν τὸν μονογενῆ **ἔδωκεν*** — *"Deu o seu Filho unigênito"*. O ato de dar o Filho é o coração do evangelho.

Versículo: *τὸν υἱὸν τὸν μονογενῆ **ἔδωκεν*** (João 3:16). **ἔδωκεν** (aoristo) = ato histórico. Deus **deu** — ponto.

---

**πιστεύω** — *"crer, confiar"* (241×). Verbo central de João — aparece **98 vezes** só no Evangelho. Detalhe importante: João **nunca** usa o substantivo **πίστις** (fé). Para João, a fé é sempre **ação**. É verbo, não substantivo.

*ἵνα πᾶς ὁ **πιστεύων** εἰς αὐτὸν μὴ ἀπόληται* — *"Para que todo aquele que **crê** não pereça"* (João 3:16). **πιστεύων** = participio presente: *"o que está continuamente crendo"*. Fé não é momento — é postura.`,
    isPremium: false,
  },

  // V2-M03
  {
    id: 'V2-M03-U01', moduleId: 'V2-M03', unitOrder: 1,
    title: 'Comunicação',
    groupLabel: 'λέγω, γράφω',
    words: [
      { greek: 'λέγω', translit: 'legō', translation: 'dizer, falar', frequency: 2354 },
      { greek: 'γράφω', translit: 'graphō', translation: 'escrever', frequency: 191 },
    ],
    content: `**λέγω** — *"dizer"* (2.354×). A segunda palavra mais frequente do NT (depois de **καί**). É o verbo de fala mais genérico: dizer, falar, contar, chamar.

No aoristo, a raiz muda: **εἶπον**. Parece outra palavra, mas é a mesma — assim como *"disse"* e *"digo"* são formas de *"dizer"*.

Versículo: *λέγει αὐτῇ ὁ Ἰησοῦς· Μαριάμ* — *"Jesus lhe diz: Maria!"* (João 20:16). O momento em que Jesus ressuscitado chama Maria pelo nome. **λέγει** = presente — como se estivesse acontecendo agora.

---

**γράφω** — *"escrever"* (191×). A raiz de **γραφή** (escritura) e **τὸ γεγραμμένο** (o que está escrito).

A forma mais poderosa: ***γέγραπται*** — *"está escrito"*. Aparece **65 vezes** no NT, sempre para citar o AT. Quando Jesus diz *"está escrito"*, ele está usando **γέγραπται** (perfeito passivo): algo que **foi escrito** e **continua escrito**.

Versículo: ***γέγραπται** γάρ· ἁγιοί ἔσεσθε* — *"**Está escrito**: seréis santos"* (1 Pedro 1:16). A Escritura é referência permanente.`,
    isPremium: false,
  },
  {
    id: 'V2-M03-U02', moduleId: 'V2-M03', unitOrder: 2,
    title: 'Missão e movimento',
    groupLabel: 'ἀποστέλλω, ἐξέρχομαι, φέρω',
    words: [
      { greek: 'ἀποστέλλω', translit: 'apostellō', translation: 'enviar (com autoridade)', frequency: 132 },
      { greek: 'ἐξέρχομαι', translit: 'exerchomai', translation: 'sair, ir para fora', frequency: 218 },
      { greek: 'φέρω', translit: 'pherō', translation: 'trazer, levar, carregar', frequency: 66 },
    ],
    content: `**ἀποστέλλω** — *"enviar com autoridade"* (132×). Daqui vem **ἀπόστολος** (apóstolo). Não é qualquer envio — é enviar como **representante**. Quando o embaixador vai ao país vizinho, ele não vai com suas palavras: vai com as palavras do rei.

Versículo: *καθὼς ἀπέσταλκέν με ὁ πατήρ, κἀγὼ **ἀποστέλλω** ὑμᾶς* — *"Como o Pai me enviou, eu também **envio** vocês"* (João 20:21). A cadeia de autoridade: Pai → Jesus → discípulos.

---

**ἐξέρχομαι** — *"sair, ir para fora"* (218×). Composto de **ἐκ** (fora) + **ἐρχομαι** (ir). A ideia é **sair de dentro**.

---

**φέρω** — *"trazer, carregar"* (66×). O verbo do fruto: *ὁ μένων ἐν ἐμοὶ... **φέρει** καρπὸν πολύν* — *"Quem permanece em mim... **dá** muito fruto"* (João 15:5). O fruto não é produzido — é **carregado** como resultado de estar ligado à videira.`,
    isPremium: false,
  },
  {
    id: 'V2-M03-U03', moduleId: 'V2-M03', unitOrder: 3,
    title: 'Amor e descoberta',
    groupLabel: 'ἀγαπάω, εὑρίσκω',
    words: [
      { greek: 'ἀγαπάω', translit: 'agapaō', translation: 'amar (com ἀγάπη)', frequency: 143 },
      { greek: 'εὑρίσκω', translit: 'heuriskō', translation: 'encontrar, achar', frequency: 176 },
    ],
    content: `**ἀγαπάω** — *"amar"* (143×). Se **ἀγάπη** é o amor como substantivo, **ἀγαπάω** é o amor como **ato**. É o verbo que transforma sentimento em ação.

Versículo: *οὕτως γὰρ **ἠγάπησεν** ὁ θεὸς τὸν κόσμον* — *"Pois Deus **amou** o mundo de tal maneira"* (João 3:16). **ἠγάπησεν** (aoristo) = ato único e irreversível. Deus **amou** — não *"vai amar"* ou *"está aprendendo a amar"*.

---

**εὑρίσκω** — *"encontrar, achar"* (176×). Frequente nas narrativas de busca — porque o evangelho é, no fundo, uma história de encontro.

Versículo: *εὑρίσκει οὗτος πρῶτον τὸν ἀδελφὸν τὸν ἴδιον Σίμωνα* — *"Este encontrou primeiro seu próprio irmão Simão"* (João 1:41). O primeiro ato de quem encontra Jesus é **encontrar outra pessoa**.`,
    isPremium: false,
  },

  // V2-M04
  {
    id: 'V2-M04-U01', moduleId: 'V2-M04', unitOrder: 1,
    title: 'Salvação e perdão',
    groupLabel: 'σῴζω, ἀφίημι',
    words: [
      { greek: 'σῴζω', translit: 'sōzō', translation: 'salvar, curar, preservar', frequency: 106 },
      { greek: 'ἀφίημι', translit: 'aphiēmi', translation: 'perdoar, deixar, permitir', frequency: 143 },
    ],
    content: `**σῴζω** — *"salvar, curar"* (106×). A mesma palavra para curar o doente e salvar o pecador. Não é acidente — é a teologia grega: **ser salvo é ser curado**.

A gama semântica é ampla: cura física, libertação de perigo, salvação escatológica. Dependendo do contexto, pode significar qualquer uma dessas.

Versículo: *ἡ πίστις σου **σέσωκέν** σε* — *"A fé te **curou**"* (Lucas 17:19). **σέσωκεν** (perfeito) = a cura já aconteceu e seus efeitos continuam.

---

**ἀφίημι** — *"perdoar, deixar, permitir"* (143×). Verbo irregular tipo **-μι**. Três sentidos, dependendo do contexto.

**Perdoar**: *Πάτερ, **ἄφες** αὐτοῖς* — *"Pai, **perdoa**-lhes"* (Lucas 23:34). A última palavra de Jesus na cruz antes de morrer.

**Deixar**: deixar ir, liberar.

**Permitir**: dar permissão.

Versículo: *Πάτερ, **ἄφες** αὐτοῖς* (Lucas 23:34). A primeira coisa que Jesus faz ao ser crucificado é **perdoar**.`,
    isPremium: false,
  },
  {
    id: 'V2-M04-U02', moduleId: 'V2-M04', unitOrder: 2,
    title: 'Morte e ressurreição',
    groupLabel: 'ἀποθνῄσκω',
    words: [
      { greek: 'ἀποθνῄσκω', translit: 'apothnēskō', translation: 'morrer', frequency: 111 },
    ],
    content: `**ἀποθνῄσκω** — *"morrer"* (111×). Em João, este verbo forma o par central com **ζωή** (vida): quem crê não morrerá.

Mas o que significa *"não morrer"*? João brinca com a ambiguidade: **ἀποθνῄσκω** pode significar morte física ou morte espiritual (separação de Deus). Quando Jesus diz que o crente *"não morrerá"*, ele está dizendo algo que vai além da biologia.

Versículo: *καὶ πᾶς ὁ ζῶν καὶ πιστεύων εἰς ἐμὲ **οὐ μὴ ἀποθάνῃ** εἰς τὸν αἰῶνα* — *"Todo aquele que vive e crê em mim **nunca morrerá** para sempre"* (João 11:26).

**οὐ μή** + subjuntivo = a **negação mais forte** do grego. Não é *"provavelmente não vai morrer"*. É *"de forma alguma morrerá"*.`,
    isPremium: false,
  },
  {
    id: 'V2-M04-U03', moduleId: 'V2-M04', unitOrder: 3,
    title: 'Aula do Versículo — João 3:16',
    groupLabel: 'Síntese do Bloco V2',
    words: [],
    content: `Agora você tem ferramentas para desmontar o versículo mais famoso do mundo.

*οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ἵνα τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλ᾿ ἔχῃ ζωὴν αἰώνιον.*

Vamos palavra a palavra:

*οὕτως* — *"assim, de tal maneira"*
*γάρ* — *"pois"* (V1-M01: conecta com o que veio antes)
*ἠγάπησεν* — *"amou"* → **ἀγαπάω** (V2-M03). Aoristo: ato histórico único.
*ὁ θεός* — *"Deus"* (V3-M02)
*τὸν κόσμον* — *"o mundo"* (V3-M02)
*ἵνα* — *"para que"* (V1-M02: propósito)
*τὸν υἱὸν τὸν μονογενῆ* — *"o Filho unigênito"*
*ἔδωκεν* — *"deu"* → **δίδωμι** (V2-M02). Aoristo: ato de dar.
*πᾶς ὁ πιστεύων* — *"todo aquele que crê"* → **πιστεύω** (V2-M02). Participio presente: continua crendo.
*εἰς αὐτόν* — *"nele"* → **εἰς** (V1-M01)
*μὴ ἀπόληται* — *"não pereça"* → dupla negação **μή**
*ἀλλά* — *"mas"* (V1-M01: correção)
*ἔχῃ* — *"tenha"* → **ἔχω** (V2-M02). Subjuntivo: desejo/possibilidade.
*ζωὴν αἰώνιον* — *"vida eterna"* → **ζωή** (V3-M02)

Das ~15 palavras principais, você já reconhece **11**. Está começando a ler grego.`,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO V3
  // ═══════════════════════════════════════════════════════════
  {
    id: 'V3-M01-U01', moduleId: 'V3-M01', unitOrder: 1,
    title: 'Família e relação',
    groupLabel: 'πατήρ, υἱός, ἀδελφός',
    words: [
      { greek: 'πατήρ', translit: 'patēr', translation: 'pai', frequency: 413 },
      { greek: 'υἱός', translit: 'huios', translation: 'filho', frequency: 377 },
      { greek: 'ἀδελφός', translit: 'adelphos', translation: 'irmão', frequency: 343 },
    ],
    content: `**πατήρ** — *"pai"* (413×). Aparece **118 vezes** no Evangelho de João — mais que em qualquer outro. João é o evangelho do Pai e do Filho.

Quando Jesus ora, ele chama Deus de **Πάτερ** — vocativo. Não *"Deus"*, não *"Senhor"*. *"Pai"*. A mais íntima das palavras.

Versículo: ***Πάτερ**, δόξασόν σου τὸν υἱόν* — *"**Pai**, glorifica o teu Filho"* (João 17:1). A oração sacerdotal começa com **Πάτερ**.

---

**υἱός** — *"filho"* (377×). Distinto de **τέκνον** (criança): **υἱός** é relação de origem e natureza. **τέκνον** é relação afetiva. *"Filho"* no sentido de herdeiro, não de bebê.

No NT, **ὁ υἱὸς τοῦ θεοῦ** (o Filho de Deus) é o título mais teológico de Jesus. Não é *"um filho"* — é *"o Filho"*.

---

**ἀδελφός** — *"irmão"* (343×). No NT, vai além do parentesco biológico. Todos os crentes são **ἀδελφοί** — irmãos não por sangue, mas por fé.`,
    isPremium: false,
  },
  {
    id: 'V3-M01-U02', moduleId: 'V3-M01', unitOrder: 2,
    title: 'Humanidade e linguagem',
    groupLabel: 'ἄνθρωπος, λόγος',
    words: [
      { greek: 'ἄνθρωπος', translit: 'anthrōpos', translation: 'homem, ser humano', frequency: 550 },
      { greek: 'λόγος', translit: 'logos', translation: 'palavra, discurso, razão', frequency: 330 },
    ],
    content: `**ἄνθρωπος** — *"ser humano"* (550×). Não é gênero — **ἀνήρ** é *"homem"* como gênero. **ἄνθρωπos** é a raça humana. Pessoa. Humano.

João 19:5: *ἰδοὺ ὁ **ἄνθρωπος*** — *"Eis o **homem**!"*. Pilatos apresenta Jesus flagelado. A palavra que ele escolhe é **ἄνθρωπos** — não rei, não messias. Um homem.

---

**λόγος** — *"palavra, razão, o Verbo"* (330×). Uma das palavras mais carregadas de significado do NT.

Em João 1:1, **λόγος** carrega duas tradições simultaneamente: a **Palavra criadora** de Deus no judaísmo (Deus falou e houve luz) e a **razão ordenadora** do pensamento grego (o *logos* que sustenta o universo).

*Ἐν ἀρχῇ ἦν ὁ **λόγος*** — *"No princípio era o **Verbo**"* (João 1:1). João está dizendo: o **λόγος** que criou o mundo no Gênesis é a mesma pessoa que se encarnou em Jesus.`,
    isPremium: false,
  },
  {
    id: 'V3-M01-U03', moduleId: 'V3-M01', unitOrder: 3,
    title: 'Tempo e autoridade',
    groupLabel: 'ἡμέρα, κύριος',
    words: [
      { greek: 'ἡμέρα', translit: 'hēmera', translation: 'dia', frequency: 389 },
      { greek: 'κύριος', translit: 'kyrios', translation: 'Senhor (revisão)', frequency: 717 },
    ],
    content: `**ἡμέρα** — *"dia"* (389×). Frequente em expressões de tempo. Obrigatório: **ἡ ἐσχάτη ἡμέρα** — *"o último dia"*. Aparece 4 vezes em João 6, sempre referindo-se à ressurreição final.

Versículo: *ἀναστήσω αὐτὸν ἐν τῇ **ἡμέρᾳ** τῇ ἐσχάτῃ* — *"O levantarei no último **dia**"* (João 6:40). A promessa de ressurreição está ancorada num dia — **ἡ ἐσχάτη ἡμέρα**.

---

**κύριος** — *"Senhor"* (717×). Revisão de V2-M01: na Septuaginta, **κύριος** traduz YHWH. Filipenses 2:9–11: *"Todo joelho se dobrará ao nome de **Κύριος**"*.

Versículo: *ὁ **κύριός** μου καὶ ὁ θεός μου* — *"O **Senhor** meu e o Deus meu"* (João 20:28). Tomé confessiona Jesus como **κύριος** — Senhor, não apenas mestre.`,
    isPremium: false,
  },

  // V3-M02
  {
    id: 'V3-M02-U01', moduleId: 'V3-M02', unitOrder: 1,
    title: 'Deus e cosmos',
    groupLabel: 'θεός, κόσμος, οὐρανός, γῆ',
    words: [
      { greek: 'θεός', translit: 'theos', translation: 'Deus', frequency: 1317 },
      { greek: 'κόσμος', translit: 'kosmos', translation: 'mundo, universo', frequency: 186 },
      { greek: 'οὐρανός', translit: 'ouranos', translation: 'céu, céus', frequency: 273 },
      { greek: 'γῆ', translit: 'gē', translation: 'terra, solo', frequency: 250 },
    ],
    content: `**θεός** — *"Deus"* (1.317×). Palavra tão熟悉 que parece simples — mas o artigo muda tudo.

**ὁ θεός** = *"o Deus"* específico. O Deus de Israel, o Deus de Abraão.
**θεός** sem artigo = predicado de natureza. *ὁ θεὸς **ἀγάπη** ἐστίν* = *"Deus **é amor**"* — não *"o amor é Deus"*, mas *"Deus é, por natureza, amor"*.

Versículo: *ὁ θεὸς **ἀγάπη** ἐστίν* (1 João 4:8).

---

**κόσμος** — *"mundo"* (186×). Em João, tem dois sentidos opostos: o mundo **amado** por Deus (*ὁ θεὸς οὕτως ἠγάπησεν τὸν **κόσμον*** — João 3:16) e o mundo que **odeia** Jesus (*ὁ **κόσμος** μισεῖ ὑμᾶς* — João 15:18).

---

**οὐρανός** — *"céu"* (273×). **γῆ** — *"terra"* (250×). O par mais fundamental da cosmologia bíblica. *ὡς ἐν οὐρανῷ καὶ ἐπὶ **γῆς*** — *"Assim no céu como na **terra**"* (Mateus 6:10).`,
    isPremium: false,
  },
  {
    id: 'V3-M02-U02', moduleId: 'V3-M02', unitOrder: 2,
    title: 'Vida e espírito',
    groupLabel: 'ζωή, πνεῦμα, ἀγάπη',
    words: [
      { greek: 'ζωή', translit: 'zōē', translation: 'vida (plena, eterna)', frequency: 135 },
      { greek: 'πνεῦμα', translit: 'pneuma', translation: 'espírito, vento, sopro', frequency: 379 },
      { greek: 'ἀγάπη', translit: 'agapē', translation: 'amor (incondicional)', frequency: 116 },
    ],
    content: `**ζωή** — *"vida"* (135×). Distinta de **βίος** (vida biológica, recursos materiais). **ζωή** é vida em sua plenitude — qualidade, não apenas existência.

**ζωὴ αἰώνιος** (*vida eterna*) aparece **17 vezes** em João — e não é algo que começa no céu. Começa **agora**, quando você crê.

Versículo: *ἐγώ εἰμι... ἡ **ζωή*** — *"Eu sou... a **vida**"* (João 14:6). Jesus não dá vida — ele **é** a vida.

---

**πνεῦμα** — *"espírito, vento, sopro"* (379×). A mesma palavra para vento, sopro e Espírito Santo. João 3:8 brinca com essa ambiguidade: *τὸ **πνεῦμα** ὅπου θέλει πνεῖ* — *"O **espírito**/vento sopra onde quer"*.

---

**ἀγάπη** — *"amor"* (116×). Rara no grego pré-cristão. Os filósofos gregos preferiam **φιλία** (amizade) ou **ἔρως** (amor romântico). **ἀγάπη** era quase um termo técnico — e os cristãos o escolheram para dar um significado novo: **amor como escolha e sacrifício**.

Versículo: *ὁ θεὸς **ἀγάπη** ἐστίν* (1 João 4:8).`,
    isPremium: false,
  },
  {
    id: 'V3-M02-U03', moduleId: 'V3-M02', unitOrder: 3,
    title: 'Nome, quantidade e unicidade',
    groupLabel: 'ὄνομα, πολύς, εἷς',
    words: [
      { greek: 'ὄνομα', translit: 'onoma', translation: 'nome', frequency: 231 },
      { greek: 'πολύς', translit: 'polys', translation: 'muito, muitos', frequency: 416 },
      { greek: 'εἷς', translit: 'heis', translation: 'um, uma', frequency: 345 },
    ],
    content: `**ὄνομα** — *"nome"* (231×). Em grego bíblico, o nome não é rótulo — é **identidade**. Agir *"em nome de"* = com a autoridade de quem enviou.

*ἵνα **ὀνόματι** Ἰησοῦ... πᾶν γόνυ κάμψῃ* — *"Para que ao nome de **Jesus** todo joelho se dobre"* (Filipenses 2:10). O nome de Jesus não é apenas uma palavra — é autoridade total.

---

**πολύς** — *"muito"* (416×). Funciona como adjetivo, advérbio e substantivo. *πολλοί* (muitos), *πολύ* (muito).

---

**εἷς** — *"um"* (345×). Parece simples, mas em João 10:30 carrega peso teológico enorme: *ἐγὼ καὶ ὁ πατὴρ **ἕν** ἐσμεν* — *"Eu e o Pai **um** somos"*.

**ἕν** (neutro) — não *"um"* (pessoa), mas *"uma coisa"*, *"uma realidade"*. Unidade de natureza, não de pessoa.`,
    isPremium: false,
  },

  // V3-M03
  {
    id: 'V3-M03-U01', moduleId: 'V3-M03', unitOrder: 1,
    title: 'Pessoas e comunidade',
    groupLabel: 'ὄχλος, δοῦλος, ἄγγελος',
    words: [
      { greek: 'ὄχλος', translit: 'ochlos', translation: 'multidão, povo', frequency: 175 },
      { greek: 'δοῦλος', translit: 'doulos', translation: 'escravo, servo', frequency: 124 },
      { greek: 'ἄγγελος', translit: 'angelos', translation: 'anjo, mensageiro', frequency: 175 },
    ],
    content: `**ὄχλος** — *"multidão"* (175×). Distinto de **λαός** (povo com identidade e história). **ὄχλος** é multidão — influenciável, passageira.

Versículo: *ἰδὼν δὲ τοὺς **ὄχλους** ἀνέβη εἰς τὸ ὄρος* — *"Vendo as **multidões**, subiu ao monte"* (Mateus 5:1). Jesus vê a multidão — e ensina.

---

**δοῦλος** — *"escravo"* (124×). Não *"servo"*. **δοῦλος** é escravo sem direitos — propriedade legal de outro. Quando Paulo se chama *"**δοῦλος** Χριστοῦ Ἰησοῦ"*, ele está dizendo: *"pertenco a Cristo por completo"*.

---

**ἄγγελος** — *"mensageiro"* (175×). Da raiz vem **εὐαγγέλιον** — *"boa mensagem"*, *"evangelho"*. O anjo é quem carrega a notícia. O evangelho é a notícia que o anjo carrega.`,
    isPremium: false,
  },
  {
    id: 'V3-M03-U02', moduleId: 'V3-M03', unitOrder: 2,
    title: 'Estruturas e lei',
    groupLabel: 'νόμος, πόλις, βασιλεία',
    words: [
      { greek: 'νόμος', translit: 'nomos', translation: 'lei, Torá', frequency: 194 },
      { greek: 'πόλις', translit: 'polis', translation: 'cidade', frequency: 162 },
      { greek: 'βασιλεία', translit: 'basileia', translation: 'reino, reinado', frequency: 162 },
    ],
    content: `**νόμος** — *"lei"* (194×). Paulo usa **68 vezes** em Romanos — mais do que em todos os outros livros juntos. Para Paulo, **νόμος** é a Torá, a instrução divina — mas também o sistema que mostra que não conseguimos cumprir a Torá.

Versículo: *ὁ **νόμος** διὰ Μωϋσέως ἐδόθη, ἡ χάρις διὰ Ἰησοῦ Χριστοῦ ἐγένετο* — *"A **lei** foi dada por Moisés; a graça veio por Jesus Cristo"* (João 1:17). Lei e graça não são opostas — são etapas.

---

**πόλις** — *"cidade"* (162×). A **πόλις** final é a Jerusalém celestial (Apocalipse 21). Mas no Cotidiano, **πόλις** é a cidade onde as pessoas vivem, trabalham, pecam — e encontram Deus.

---

**βασιλεία** — *"reino"* (162×). *ἡ **βασιλεία** τοῦ θεοῦ* — *"o **reino** de Deus"*. Não lugar geográfico — soberania de Deus em ação. Onde Deus reina, lá está o reino.

Versículo: *Μετανοεῖτε· ἤγγικεν γὰρ ἡ **βασιλεία** τῶν οὐρανῶν* — *"Arrependem-vos, pois o **reino** dos céus se aproximou"* (Mateus 4:17).`,
    isPremium: false,
  },
  {
    id: 'V3-M03-U03', moduleId: 'V3-M03', unitOrder: 3,
    title: 'Pecado e totalidade',
    groupLabel: 'ἁμαρτία, ὅλος, Παῦλος',
    words: [
      { greek: 'ἁμαρτία', translit: 'hamartia', translation: 'pecado, erro', frequency: 173 },
      { greek: 'ὅλος', translit: 'holos', translation: 'todo, inteiro', frequency: 109 },
      { greek: 'Παῦλος', translit: 'Paulos', translation: 'Paulo', frequency: 158 },
    ],
    content: `**ἁμαρτία** — *"pecado"* (173×). Literalmente: *"errar o alvo"*. Não é apenas falhar — é **mirar errado**. A intenção estava lá, mas o alvo era outro.

João usa **ἁμαρτία** no singular abstrato — não como ato isolado, mas como **estado**. O pecado como condição humana.

Versículo: *ἴδε ὁ ἀμνὸς τοῦ θεοῦ ὁ αἴρων τὴν **ἁμαρτίαν** τοῦ κόσμου* — *"Eis o Cordeiro de Deus, que tira o **pecado** do mundo"* (João 1:29). João Batista aponta para Jesus como solução de **ἁμαρτία** — não de pecados pontuais.

---

**ὅλος** — *"todo, inteiro"* (109×). Distinto de **πᾶς**: **ὅλος** é coletivo (*ὅλη ἡ πόλις* = *"a cidade inteira"*). **πᾶς** é distributivo (*πᾶς ἄνθρωπος* = *"cada homem"*).

---

**Παῦλος** — *"Paulo"* (158×). Nome romano. Em contextos judaicos, ele é **Σαῦλος** (Saulo). Dupla identidade — judeu de nascimento, cidadão romano de direito.`,
    isPremium: false,
  },

  // V3-M04
  {
    id: 'V3-M04-U01', moduleId: 'V3-M04', unitOrder: 1,
    title: 'Revelação e identidade coletiva',
    groupLabel: 'ἀλήθεια, λαός, Ἰουδαῖος, ἐντολή',
    words: [
      { greek: 'ἀλήθεια', translit: 'alētheia', translation: 'verdade', frequency: 109 },
      { greek: 'λαός', translit: 'laos', translation: 'povo (de Deus)', frequency: 142 },
      { greek: 'Ἰουδαῖος', translit: 'Ioudaios', translation: 'judeu, judaico', frequency: 195 },
      { greek: 'ἐντολή', translit: 'entolē', translation: 'mandamento, ordem', frequency: 67 },
    ],
    content: `**ἀλήθεια** — *"verdade"* (109×). Não é apenas *"o que é verdade"* — é **o que não está oculto**. A raiz grega: **α-** (negativo) + **λήθη** (esquecimento). A verdade é o que se revela, o que se torna visível.

João usa **ἀλήθεια** 25 vezes — mais que qualquer outro evangelista. Para João, Jesus não apenas **diz** a verdade — ele **é** a verdade.

Versículo: *ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ **ἀλήθεια** καὶ ἡ ζωή* — *"Eu sou o caminho, a **verdade** e a vida"* (João 14:6).

---

**λαός** — *"povo"* (142×). Não multidão — é povo com identidade, história e aliança. O **λαός** de Deus.

**Ἰουδαῖος** — *"judeu"* (195×). No contexto de João, pode significar judeu (povo), judaico (cultura) ou os líderes religiosos de Jerusalém.

**ἐντολή** — *"mandamento"* (67×). Não é lei abstrata — é ordem concreta, instrução.`,
    isPremium: false,
  },
  {
    id: 'V3-M04-U02', moduleId: 'V3-M04', unitOrder: 2,
    title: 'Comunidade cristã primitiva',
    groupLabel: 'μαθητής, ἀπόστολος, ἐκκλησία, χάρις, πίστις',
    words: [
      { greek: 'μαθητής', translit: 'mathētēs', translation: 'discípulo, aprendiz', frequency: 261 },
      { greek: 'ἀπόστολος', translit: 'apostolos', translation: 'apóstolo, enviado', frequency: 80 },
      { greek: 'ἐκκλησία', translit: 'ekklēsia', translation: 'igreja, assembleia', frequency: 114 },
      { greek: 'χάρις', translit: 'charis', translation: 'graça, favor', frequency: 155 },
      { greek: 'πίστις', translit: 'pistis', translation: 'fé, confiança', frequency: 243 },
    ],
    content: `**χάρις** — *"graça"* (155×). Dom puro, sem condição. Paulo radicalizou: *χάριτί ἐστε σεσῳσμένοι* — *"Pela graça sois salvos"* (Efésios 2:8). Não por obras, não por mérito — por **χάρις**.

Versículo: *πλήρης **χάριτος** καὶ ἀληθείας* — *"Cheio de **graça** e de verdade"* (João 1:14). A primeira descrição de Jesus encarnado é **χάρις**.

---

**πίστις** — *"fé"* (243×). Detalhe importante: João **nunca** usa **πίστις**. Prefere o verbo **πιστεύω** (crer). Para João, fé é ação, não substantivo. Paulo usa **πίστις** como conceito central — justificação pela fé.

Versículo: *ὁ δὲ δίκαιος ἐκ **πίστεως** ζήσεται* — *"O justo viverá pela **fé**"* (Romanos 1:17). A frase que马丁·路德 leu e mudou a história.

---

**ἐκκλησία** — *"igreja"* (114×). Termo cívico grego: a assembleia dos convocados. Não é prédio — é **pessoas convocadas por Deus**.

**μαθητής** — *"discípulo"* (261×). Aprendiz. Não estudante de escola — aprendiz de mestre.

**ἀπόστολος** — *"apóstolo"* (80×). Enviado com autoridade.`,
    isPremium: false,
  },
  {
    id: 'V3-M04-U03', moduleId: 'V3-M04', unitOrder: 3,
    title: 'Pessoa, tempo e corpo',
    groupLabel: 'καρδία, ψυχή, σάρξ, ὥρα, τέκνον, ἔργον',
    words: [
      { greek: 'καρδία', translit: 'kardia', translation: 'coração (centro da pessoa)', frequency: 156 },
      { greek: 'ψυχή', translit: 'psychē', translation: 'alma, vida interior', frequency: 103 },
      { greek: 'σάρξ', translit: 'sarx', translation: 'carne, natureza humana', frequency: 147 },
      { greek: 'ὥρα', translit: 'hōra', translation: 'hora, momento', frequency: 106 },
      { greek: 'τέκνον', translit: 'teknon', translation: 'filho, criança (afetivo)', frequency: 99 },
      { greek: 'ἔργον', translit: 'ergon', translation: 'obra, trabalho', frequency: 169 },
    ],
    content: `**καρδία** — *"coração"* (156×). Não é o órgão biológico — é o **centro da pessoa**: mente, vontade, caráter, desejo. Quando Jesus diz *"καθαραί εἰσιν αἱ **καρδίαι** αὐτῶν"* — *"seus corações estão puros"* — ele está falando do centro moral.

---

**ψυχή** — *"alma, ser"* (103×). Não a alma platônica que sobrevive à morte — é o **ser vivo como um todo**. *ἐξ ὅλης τῆς **ψυχῆς** σου* — *"De todo o teu **ser**"* (Marcos 12:30).

---

**σάρξ** — *"carne"* (147×). Natureza humana em sua fragilidade. Não é necessariamente pecaminosa — mas pode ser.

**ὥρα** — *"hora"* (106×). Momento. *ἡ **ὥρα** μου* — *"minha hora"* (João 2:4) — o momento da crucificação.

**τέκνον** — *"criança"* (99×). Relação afetiva, não biológica.

**ἔργον** — *"obra"* (169×). Trabalho, obra. *τὰ **ἔργα** μου* — *"as minhas obras"*.

Versículo: *ὁ καλὸς ποιμὴν τὴν **ψυχὴν** αὐτοῦ τίθησιν ὑπὲρ τῶν προβάτων* — *"O bom pastor põe a sua **vida** pelas ovelhas"* (João 10:11). **ψυχή** aqui = vida, ser.`,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO V4
  // ═══════════════════════════════════════════════════════════
  {
    id: 'V4-M01-U01', moduleId: 'V4-M01', unitOrder: 1,
    title: 'Direção e origem',
    groupLabel: 'πρός, ἀπό, εἰς (revisão)',
    words: [
      { greek: 'πρός', translit: 'pros', translation: 'para, junto de, diante de', frequency: 700 },
      { greek: 'ἀπό', translit: 'apo', translation: 'de, longe de, desde', frequency: 646 },
    ],
    content: `**πρός** — *"para, junto de"* (700×). Uma das preposições mais frequentes do NT. Pode indicar direção (*"para"*), proximidade (*"junto de"*) ou face a face (*"diante de"*).

*πρὸς τὸν θεόν* = *"junto de Deus"* — João 1:1. O Verbo não estava longe de Deus — estava **junto**, face a face.

A dica: **πρός** + acusativo = direção. *"Para onde?"*

---

**ἀπό** — *"de, desde, longe de"* (646×). O oposto de **πρός**: enquanto **πρός** indica proximidade, **ἀπό** indica **distância**. Sai de um lugar.

*ἀπ᾽ ἀρχῆς* = *"desde o princípio"* — 1 João 1:1. Não é "no princípio" — é "**desde** o princípio", desde o começo.

A dica: **ἀπό** + genitivo = origem. *"De onde vem?"`,
    isPremium: false,
  },
  {
    id: 'V4-M01-U02', moduleId: 'V4-M01', unitOrder: 2,
    title: 'Relação e instrumentalidade',
    groupLabel: 'διά, κατά, μετά',
    words: [
      { greek: 'διά', translit: 'dia', translation: 'por meio de / por causa de', frequency: 667 },
      { greek: 'κατά', translit: 'kata', translation: 'segundo, contra', frequency: 473 },
      { greek: 'μετά', translit: 'meta', translation: 'com / depois de', frequency: 469 },
    ],
    content: `**διά** — *"por meio de"* ou *"por causa de"* (667×). Muda de sentido dependendo do caso gramatical.

**διά** + genitivo = *"por meio de"*: *διὰ **πίστεως*** = *"por meio da fé"* (Efésios 2:8). A fé é o **meio**, não o mérito.

**διά** + acusativo = *"por causa de"*: *διὰ **τί*** = *"por quê?"*

---

**κατά** — *"segundo, contra"* (473×). Outra preposição que muda com o caso.

**κατά** + genitivo = *"de acordo com"*: *κατὰ **σάρκα*** = *"segundo a carne"* (Romanos 8:4). Como as coisas são do ponto de vista humano.

**κατά** + acusativo = *"contra"*: oposição.

---

**μετά** — *"com / depois de"* (469×). Dois sentidos.

**μετά** + genitivo = *"com"*: *μετὰ τῶν μαθητῶν* = *"com os discípulos"*.

**μετά** + acusativo = *"depois de"*: *μετὰ ταῦτα* = *"depois disso"* — João usa esta expressão **7 vezes** para marcar transições na narrativa.`,
    isPremium: false,
  },
  {
    id: 'V4-M01-U03', moduleId: 'V4-M01', unitOrder: 3,
    title: 'Posição e agente',
    groupLabel: 'περί, παρά, ὑπό, ἐπί',
    words: [
      { greek: 'περί', translit: 'peri', translation: 'sobre, acerca de', frequency: 333 },
      { greek: 'παρά', translit: 'para', translation: 'junto de, da parte de', frequency: 194 },
      { greek: 'ὑπό', translit: 'hypo', translation: 'por (agente passivo), sob', frequency: 220 },
      { greek: 'ἐπί', translit: 'epi', translation: 'sobre, em cima de', frequency: 890 },
    ],
    content: `**περί** — *"sobre, acerca de"* (333×). Indica assunto, tema, proximidade.

*περὶ **ἁμαρτίας*** = *"acerca do **pecado**"* — João 8:46. Jesus está falando **sobre** o assunto pecado.

---

**παρά** — *"junto de, da parte de"* (194×). Indica proveniência: de onde algo vem.

*παρὰ **θεοῦ*** = *"da parte de **Deus**"* — João 1:6. João Batista veio **de Deus** — não por acaso, mas por envio.

---

**ὑπό** — *"por (agente passivo)"* (220×). Em frases passivas, indica quem fez a ação.

*ὑπὸ τοῦ **κυρίου*** = *"pelo **Senhor**"* — 1 Coríntios 11:23. O Senhor **é** o agente.

---

**ἐπί** — *"sobre, em cima de"* (890×). Uma das preposições mais frequentes. Indica posição, superfície, base.

*ἐπὶ τῆς **γῆς*** = *"sobre a **terra**"* — Mateus 6:10.

Agora conecte: **ἐν** Χριστῷ (V1: "em Cristo") + **ἐπὶ** τῆς γῆς (V4: "sobre a terra") = a vida cristã entre céu e terra.`,
    isPremium: false,
  },

  // V4-M02
  {
    id: 'V4-M02-U01', moduleId: 'V4-M02', unitOrder: 1,
    title: 'Advérbios de tempo e lugar',
    groupLabel: 'τότε, ἐκεῖ, πάλιν',
    words: [
      { greek: 'τότε', translit: 'tote', translation: 'então, naquele tempo', frequency: 160 },
      { greek: 'ἐκεῖ', translit: 'ekei', translation: 'ali, lá', frequency: 95 },
      { greek: 'πάλιν', translit: 'palin', translation: 'de novo, novamente', frequency: 141 },
    ],
    content: `**τότε** — *"então, naquele tempo"* (160×). Advérbio temporal. Mateus usa **90 vezes** — mais que todos os outros evangelistas juntos. É marca de Mateus: *"então Jesus fez..."*.

***τότε** λέγει αὐτοῖς ὁ Ἰησοῦς* — *"**Então** Jesus lhes diz"* (Mateus 26:38). O **τότε** marca o momento decisivo: antes da prisão.

---

**ἐκεῖ** — *"ali, lá"* (95×). Advérbio de lugar. Indica um ponto específico.

*ἦν δὲ **ἐκεῖ** κρήνη τοῦ Ἰακώβ* — *"Havia ali um poço de Jacó"* (João 4:6). João está apontando o lugar exato: **ali**, naquele poço.

---

**πάλιν** — *"de novo, novamente"* (141×). Marca de estilo joanino — Jesus **retorna**, fala **de novo**, se revela **novamente**. A repetição não é acaso — é padrão de revelação.`,
    isPremium: false,
  },
  {
    id: 'V4-M02-U02', moduleId: 'V4-M02', unitOrder: 2,
    title: 'δικαιοσύνη e ἀνάστασις',
    groupLabel: 'Justiça e Ressurreição',
    words: [
      { greek: 'δικαιοσύνη', translit: 'dikaiosynē', translation: 'justiça, retidão', frequency: 92 },
      { greek: 'ἀνάστασις', translit: 'anastasis', translation: 'ressurreição', frequency: 42 },
    ],
    content: `**δικαιοσύνη** — *"justiça"* (92×). Palavra central da teologia paulina da **justificação**. Não é justiça humana (cumprir regras) — é justiça de Deus (dada como dom).

**δικαιοσύνη θεοῦ** — *"a justiça de Deus"* (Romanos 1:17). Deus não apenas cumpre a justiça — ele a **dá** a quem crê.

Família lexical: **δίκαιος** (justo), **δικαιόω** (justificar — declarar justo), **δικαίωσις** (justificação — o ato de declarar justo).

Versículo: *ζητεῖτε δὲ πρῶτον τὴν βασιλείαν τοῦ θεοῦ καὶ τὴν **δικαιοσύνην** αὐτοῦ* — *"Buscai primeiro o reino de Deus e a sua **justiça**"* (Mateus 6:33).

---

**ἀνάστασις** — *"ressurreição"* (42×). De menor frequência das 100 — mas de **maior peso teológico**.

A raiz: **ἀνά** (de volta) + **ἵστημι** (levantar-se). Algo que caiu **se levanta de volta**.

1 Coríntios 15:14: *εἰ **ἀνάστασις** νεκρῶν οὐκ ἔστιν, καὶ Χριστὸς οὐκ ἐγήγερται* — *"Se não há **ressurreição** dos mortos, também Cristo não foi ressuscitado"*. Sem **ἀνάστασις**, tudo desmorona.

Versículo: *ἐγώ εἰμι ἡ **ἀνάστασις** καὶ ἡ ζωή* — *"Eu sou a **ressurreição** e a vida"* (João 11:25).`,
    isPremium: false,
  },
  {
    id: 'V4-M02-U03', moduleId: 'V4-M02', unitOrder: 3,
    title: 'Aula Final — João 11:25–26',
    groupLabel: 'Síntese da Trilha',
    words: [],
    content: `Agora você tem todas as peças. Vamos montar o versículo que Jesus diz a Marta, no túmulo de Lázaro:

*εἶπεν αὐτῇ ὁ Ἰησοῦς· ἐγώ εἰμι ἡ ἀνάστασις καὶ ἡ ζωή· ὁ πιστεύων εἰς ἐμὲ κἂν ἀποθάνῃ ζήσεται, καὶ πᾶς ὁ ζῶν καὶ πιστεύων εἰς ἐμὲ οὐ μὴ ἀποθάνῃ εἰς τὸν αἰῶνα.*

Palavra a palavra:

*εἶπεν* — *"disse"* → **λέγω** / εἶπον (V2-M03)
*αὐτῇ* — *"a ela"* → **αὐτός** (V1-M02)
*ὁ Ἰησοῦς* — *"Jesus"* (V2-M01)
*ἐγώ εἰμι* — *"eu sou"* → **ἐγώ** + **εἰμί** (V1-M02 / V2-M01)
*ἡ ἀνάστασις* — *"a ressurreição"* (V4-M02)
*καί* — *"e"* (V1-M01)
*ἡ ζωή* — *"a vida"* (V3-M02)
*ὁ πιστεύων* — *"o que crê"* → **πιστεύω** (V2-M02)
*εἰς ἐμέ* — *"em mim"* → **εἰς** (V1-M01)
*κἂν ἀποθάνῃ* — *"ainda que morra"* → **ἀποθνῄσκω** (V2-M04)
*ζήσεται* — *"viverá"* → **ζωή** (V3-M02)
*πᾶς* — *"todo"* (V1-M02)
*ὁ ζῶν* — *"o que vive"* → **ζωή** (V3-M02)
*οὐ μή* — dupla negação, negação mais forte (V1-M01)
*ἀποθάνῃ* — *"morrerá"* → **ἀποθνῄσκω** (V2-M04)
*εἰς τὸν αἰῶνα* — *"para sempre"* (literalmente: "para a eternidade")

Das ~18 palavras deste versículo, quantas você consegue identificar pelo módulo onde as estudou?

**Todas**. Você acabou de aprender grego. Καλῶς ποιεῖς.`,
    isPremium: false,
  },
];
