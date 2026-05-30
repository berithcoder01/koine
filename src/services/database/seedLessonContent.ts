import { databaseService } from './sqlite';

interface ContentItem {
  id: string;
  moduleId: string;
  order: number;
  type: string;
  title: string;
  body: string;
  greekExample?: string;
  strongsRefs?: string;
}

const CONTENT: ContentItem[] = [
  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M01: Vogais Base Α, Ε, Ι
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M01-c1', moduleId: 'C1-M01', order: 1, type: 'pronunciation',
    title: 'A Vogal Α (Alfa)',
    body: '## Alfa (Α α)\n\nA letra Α (alfa) representa o som de /a/ como em "pai" ou "casa" em português. É a primeira letra do alfabeto grego.\n\n• É sempre pronunciada como "a" aberto, nunca como "ã" ou "â".\n• Exemplo: ἀγάπη (agapē) — "amor"\n• Alfa pode ter dois tipos de "espírito" (aspiração):\n  • ἁ — espírito áspero (som aspirado, como "h")\n  • ἀ — espírito suave (sem aspiração)',
    greekExample: 'ἀγαθός • ἀγάπη • ἀδελφός',
    strongsRefs: 'G18, G26, G80',
  },
  {
    id: 'C1-M01-c2', moduleId: 'C1-M01', order: 2, type: 'pronunciation',
    title: 'A Vogal Ε (Épsilon)',
    body: '## Épsilon (Ε ε)\n\nÉpsilon é a quinta letra do alfabeto. Representa o som de /e/ breve, como "é" em "pé".\n\n• Sempre breve, nunca alongado.\n• Não confundir com η (eta), que é o som de /e/ longo.\n• Exemplo: ἐγώ (egō) — "eu"',
    greekExample: 'ἐγώ • ἔχω • ἐστίν',
    strongsRefs: 'G1473, G2192, G2076',
  },
  {
    id: 'C1-M01-c3', moduleId: 'C1-M01', order: 3, type: 'pronunciation',
    title: 'A Vogal Ι (Iota)',
    body: '## Iota (Ι ι)\n\nIota é a nona letra. Representa o som de /i/ como "i" em "vida".\n\n• Pode ser breve ou longo — a pronúncia é a mesma, só muda a duração.\n• Exemplo: ἰδοὺ (idou) — "eis"\n• Iota também aparece como "iota subscrito" sob vogais longas (ᾳ, ῃ, ῳ) — não é pronunciado separadamente, apenas alonga a vogal.',
    greekExample: 'ἰδοὺ • ἱερός • ἵνα',
    strongsRefs: 'G2400',
  },
  {
    id: 'C1-M01-c4', moduleId: 'C1-M01', order: 4, type: 'rule',
    title: 'Ditongos com Ι',
    body: '## Ditongos\n\nQuando ι se junta a outra vogal, forma um ditongo:\n\n• αι — como "ai" em "país" (ex: καί — "e")\n• ει — como "êi" (ex: εἰμί — "eu sou")\n• οι — como "ói" (ex: οἶκος — "casa")\n• υι — como "üi" (raro)\n\nNos ditongos, o ι NÃO é pronunciado separadamente — ele desliza junto com a vogal anterior.',
    greekExample: 'καί • εἰμί • οἶκος • υἱός',
    strongsRefs: 'G2532, G1510, G3624, G5207',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M02: Vogais Ο, Υ, Ω
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M02-c1', moduleId: 'C1-M02', order: 1, type: 'pronunciation',
    title: 'A Vogal Ο (Ômicron)',
    body: '## Ômicron (Ο ο)\n\nÔmicron é a décima quinta letra. Representa o som de /o/ breve, como "ó" em "pó".\n\n• Sempre breve — opõe-se a ω (ômega), que é longo.\n• Exemplo: ὁδός (hodos) — "caminho"',
    greekExample: 'ὁδός • λόγος • κόσμος',
    strongsRefs: 'G3598, G3056, G2889',
  },
  {
    id: 'C1-M02-c2', moduleId: 'C1-M02', order: 2, type: 'pronunciation',
    title: 'A Vogal Υ (Ípsilon)',
    body: '## Ípsilon (Υ υ)\n\nÍpsilon é a vigésima letra. Representa o som de /ü/ ou /y/, como o "u" francês em "lune" ou o "ü" alemão.\n\n• Não existe som idêntico em português. O mais próximo é "i" com lábios arredondados.\n• Exemplo: υἱός (huios) — "filho"\n• No ditongo αυ, ου, ευ, o υ funciona como semivogal.',
    greekExample: 'υἱός • κύριος • αὐτός',
    strongsRefs: 'G5207, G2962, G846',
  },
  {
    id: 'C1-M02-c3', moduleId: 'C1-M02', order: 3, type: 'pronunciation',
    title: 'A Vogal Ω (Ômega)',
    body: '## Ômega (Ω ω)\n\nÔmega é a vigésima quarta e última letra. Representa o som de /ō/ longo, como "ô" em "avô" mas prolongado.\n\n• A diferença entre ο (breve) e ω (longo) é de quantidade, não de qualidade.\n• Exemplo: ὥρα (hōra) — "hora"',
    greekExample: 'ὥρα • δόξα • ζωή',
    strongsRefs: 'G5610, G1391, G2222',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M03: Consoantes Η, Ν, Τ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M03-c1', moduleId: 'C1-M03', order: 1, type: 'pronunciation',
    title: 'A Consoante Η (Eta)',
    body: '## Eta (Η η)\n\nEta é a sétima letra. Embora seja uma vogal, é classificada aqui por seu formato de consoante. Representa o som de /e/ longo, como "ê" em "vêr" (prolongado).\n\n• Não confundir com ε (épsilon), que é breve.\n• Exemplo: ἡμέρα (hēmera) — "dia"',
    greekExample: 'ἡμέρα • ἀλήθεια • ζωή',
    strongsRefs: 'G2250, G225',
  },
  {
    id: 'C1-M03-c2', moduleId: 'C1-M03', order: 2, type: 'pronunciation',
    title: 'A Consoante Ν (Nu)',
    body: '## Nu (Ν ν)\n\nNu é a décima terceira letra. Representa o som de /n/, como em "nada".\n\n• No final de palavras, o ν pode ser omitido (ν efelcístico) quando a próxima palavra começa com consoante.\n• Exemplo: νόμος (nomos) — "lei"',
    greekExample: 'νόμος • ἐν • νῦν',
    strongsRefs: 'G3551, G1722, G3568',
  },
  {
    id: 'C1-M03-c3', moduleId: 'C1-M03', order: 3, type: 'pronunciation',
    title: 'A Consoante Τ (Tau)',
    body: '## Tau (Τ τ)\n\nTau é a décima nona letra. Representa o som de /t/, como em "tudo".\n\n• É sempre oclusivo dental, nunca palatalizado.\n• Exemplo: τέκνον (teknon) — "filho"',
    greekExample: 'τέκνον • πίστις • πνεῦμα',
    strongsRefs: 'G5043, G4102, G4151',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M04: Σ, Κ, Λ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M04-c1', moduleId: 'C1-M04', order: 1, type: 'orthography',
    title: 'A Consoante Σ (Sigma)',
    body: '## Sigma (Σ σ ς)\n\nSigma tem três formas:\n\n• Σ (maiúscula)\n• σ (minúscula no início/meio da palavra)\n• ς (sigma final — usada APENAS no fim da palavra)\n\nRepresenta o som de /s/, como em "sapo".\n\n📌 Regra ortográfica importante: no meio da palavra usa-se σ; no final, ς.\n\nExemplo: σάρξ (sarx) — "carne"',
    greekExample: 'σάρξ • κόσμος • σωτηρία',
    strongsRefs: 'G4561, G2889, G4991',
  },
  {
    id: 'C1-M04-c2', moduleId: 'C1-M04', order: 2, type: 'pronunciation',
    title: 'A Consoante Κ (Kappa)',
    body: '## Kappa (Κ κ)\n\nKappa é a décima letra. Representa o som de /k/, como em "casa".\n\n• Sempre oclusivo velar, independente da vogal seguinte.\n• Exemplo: κόσμος (kosmos) — "mundo"',
    greekExample: 'κόσμος • κύριος • καρδία',
    strongsRefs: 'G2889, G2962, G2588',
  },
  {
    id: 'C1-M04-c3', moduleId: 'C1-M04', order: 3, type: 'pronunciation',
    title: 'A Consoante Λ (Lambda)',
    body: '## Lambda (Λ λ)\n\nLambda é a décima primeira letra. Representa o som de /l/, como em "lua".\n\n• Sempre lateral alveolar, nunca velarizado como o "l" final em português.\n• Exemplo: λόγος (logos) — "palavra"',
    greekExample: 'λόγος • λαός • ἀλήθεια',
    strongsRefs: 'G3056, G2992, G225',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M05: Π, Ρ, Μ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M05-c1', moduleId: 'C1-M05', order: 1, type: 'pronunciation',
    title: 'A Consoante Π (Pi)',
    body: '## Pi (Π π)\n\nPi é a décima sexta letra. Representa o som de /p/, como em "pai".\n\n• Oclusivo bilabial. Nunca é aspirado como em inglês "pin".\n• Exemplo: πατήρ (patēr) — "pai"',
    greekExample: 'πατήρ • πίστις • πνεῦμα',
    strongsRefs: 'G3962, G4102, G4151',
  },
  {
    id: 'C1-M05-c2', moduleId: 'C1-M05', order: 2, type: 'pronunciation',
    title: 'A Consoante Ρ (Rô)',
    body: '## Rô (Ρ ρ)\n\nRô é a décima sétima letra. Representa o som de /r/ vibrante.\n\n• No início de palavra, é sempre aspirado (ῥ), como /rh/.\n• Entre vogais, é simples.\n• Exemplo: ῥῆμα (rhēma) — "palavra dita"',
    greekExample: 'ῥῆμα • μάρτυς • γραφή',
    strongsRefs: 'G4487, G3144',
  },
  {
    id: 'C1-M05-c3', moduleId: 'C1-M05', order: 3, type: 'pronunciation',
    title: 'A Consoante Μ (Mi)',
    body: '## Mi (Μ μ)\n\nMi é a décima segunda letra. Representa o som de /m/, como em "mãe".\n\n• Bilabial nasal.\n• Exemplo: μήτηρ (mētēr) — "mãe"',
    greekExample: 'μήτηρ • νόμος • κόσμος',
    strongsRefs: 'G3384, G3551, G2889',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M06: Οclusivas Β, Δ, Γ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M06-c1', moduleId: 'C1-M06', order: 1, type: 'pronunciation',
    title: 'As Oclusivas Sonoras: Β, Δ, Γ',
    body: '## Consoantes Oclusivas Sonoras\n\nEstas três consoantes são chamadas de "oclusivas" porque o fluxo de ar é completamente interrompido na boca.\n\n• Β β (Beta) — /b/ como em "boca"\n• Δ δ (Delta) — /d/ como em "dedo"\n• Γ γ (Gama) — /ɡ/ como em "gato"\n\n📌 Importante: γ antes de γ, κ, χ, ξ soa como /n/ (gama nasal):\n  • ἄγγελος (angelos) = /angelos/ — "mensageiro"',
    greekExample: 'βίος • δόξα • γῆ • ἄγγελος',
    strongsRefs: 'G979, G1391, G1093, G32',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M07: Aspiradas Φ, Χ, Θ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M07-c1', moduleId: 'C1-M07', order: 1, type: 'pronunciation',
    title: 'As Aspiradas: Φ, Χ, Θ',
    body: '## Consoantes Aspiradas\n\nEstas consoantes são produzidas com uma explosão de ar extra.\n\n• Φ φ (Fi) — /ph/ como em "f" mas com mais ar, como "ph" em inglês "phone"\n• Χ χ (Qui) — /kh/ como "j" espanhol ou "ch" alemão em "Bach"\n• Θ θ (Teta) — /th/ como "th" em inglês "think"\n\n📌 Não existem sons idênticos em português. Treine com os exemplos: φῶς (luz), χάρις (graça), θεός (Deus)',
    greekExample: 'φῶς • χάρις • θεός • θυσία',
    strongsRefs: 'G5457, G5485, G2316, G2378',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M08: Letras Raras Ζ, Ξ, Ψ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M08-c1', moduleId: 'C1-M08', order: 1, type: 'pronunciation',
    title: 'Letras de Dupla Consoante',
    body: '## Ζ, Ξ, Ψ — Consoantes Duplas\n\nEstas letras representam dois sons combinados:\n\n• Ζ ζ (Zeta) — /dz/ como "ds" em "pods"\n• Ξ ξ (Xi) — /ks/ como "x" em "táxi"\n• Ψ ψ (Psi) — /ps/ como "ps" em "psicologia"\n\n📌 São consoantes duplas: cada uma equivale a duas letras em português.',
    greekExample: 'ζωή • ξένος • ψυχή',
    strongsRefs: 'G2222, G3581, G5590',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M09: Diacríticos
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M09-c1', moduleId: 'C1-M09', order: 1, type: 'orthography',
    title: 'Espíritos (Aspirações)',
    body: '## Espírito Suave e Áspero\n\nToda palavra grega que começa com vogal ou ditongo leva um sinal de aspiração chamado "espírito":\n\n• ᾽ (espírito suave) — NÃO se pronuncia\n  • Ex: ἐγώ (egō) — "eu"\n• ῾ (espírito áspero) — pronuncia-se como "h"\n  • Ex: ἁγιάζω (hagiazō) — "santificar"\n\n📌 Regra: se a palavra começa com υ ou ρ, SEMPRE leva espírito áspero.',
    greekExample: 'ἐγώ (suave) • ἁγιάζω (áspero) • ῥῆμα (áspero)',
    strongsRefs: 'G1473, G37, G4487',
  },
  {
    id: 'C1-M09-c2', moduleId: 'C1-M09', order: 2, type: 'orthography',
    title: 'Acentos',
    body: '## Os Três Acentos Gregos\n\nO grego clássico tem três acentos tonais:\n\n• ´ (Agudo) — tom ascendente: ἀγάπη\n• ` (Grave) — tom descendente (só na última sílaba quando seguida de outra palavra): καὶ\n• ῀ (Circunflexo) — tom ascendente-descendente (só em sílabas longas): δοῦλος\n\n📌 O acento pode cair até três sílabas antes do fim (lei do trissilabismo).',
    greekExample: 'ἀγάπη • δοῦλος • σωτηρία',
    strongsRefs: 'G26, G1401, G4991',
  },
  {
    id: 'C1-M09-c3', moduleId: 'C1-M09', order: 3, type: 'orthography',
    title: 'Iota Subscrito',
    body: '## Iota Subscrito\n\nQuando iota aparece sob uma vogal longa (α, η, ω), é chamado de "iota subscrito":\n\n• ᾳ — alfa com iota subscrito\n• ῃ — eta com iota subscrito\n• ῳ — ômega com iota subscrito\n\n📌 O iota subscrito NÃO é pronunciado separadamente — ele apenas indica que historicamente havia um ditongo. Na pronúncia erasmiana (que usamos), ignoramos o iota subscrito.',
    greekExample: 'τῇ • τῷ • τῇ ἡμέρᾳ',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO I — M10: Revisão — João 1:1
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C1-M10-c1', moduleId: 'C1-M10', order: 1, type: 'example',
    title: 'João 1:1 — O Verso Mais Famoso',
    body: '## João 1:1\n\n"Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος"\n\nEste verso é o ponto de partida perfeito por várias razões:\n\n• Contém 17 palavras que usam quase todo o alfabeto\n• Apresenta o artigo definido (ὁ, τὸν)\n• Usa o verbo εἰμί (ἦν — "era") três vezes\n• Introduz o vocabulário central do NT: λόγος, θεός\n\n📌 Todas as palavras deste verso você já estudou nos módulos anteriores.',
    greekExample: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος',
    strongsRefs: 'G1722, G746, G1510, G3588, G3056, G2532, G4314, G2316',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — M01: εἰμί Singular
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C2-M01-c1', moduleId: 'C2-M01', order: 1, type: 'grammar',
    title: 'O Verbo εἰμί — Singular',
    body: '## εἰμί — Presente do Indicativo (Singular)\n\nεἰμί é o verbo "ser/estar" e é o verbo mais importante do grego koiné. É um verbo irregular.\n\n### Conjugação no singular:\n\n• ἐγώ εἰμί — "eu sou"\n  • ἐγώ εἰμι μαθητής — "eu sou discípulo"\n\n• σὺ εἶ — "tu és"\n  • σὺ εἶ ὁ υἱός — "tu és o filho"\n\n• αὐτός ἐστίν — "ele é"\n  • θεός ἐστίν — "Deus é"\n\n📌 ἐστίν tem um ν (nu) móvel no final antes de pausa ou vogal.',
    greekExample: 'Ἐγώ εἰμι • Σὺ εἶ • Αὐτός ἐστίν',
    strongsRefs: 'G1510, G1488, G2076',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — M02: εἰμί Plural
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C2-M02-c1', moduleId: 'C2-M02', order: 1, type: 'grammar',
    title: 'O Verbo εἰμί — Plural',
    body: '## εἰμί — Presente do Indicativo (Plural)\n\n### Conjugação no plural:\n\n• ἡμεῖς ἐσμέν — "nós somos"\n  • ἡμεῖς ἐσμέν μαθηταί — "nós somos discípulos"\n\n• ὑμεῖς ἐστέ — "vós sois"\n  • ὑμεῖς ἐστέ τὸ φῶς — "vós sois a luz"\n\n• αὐτοί εἰσίν — "eles são"\n  • οὗτοί εἰσιν ἀγαθοί — "estes são bons"\n\n### Tabela completa (Presente do Indicativo):\n\n| Pessoa | Singular | Plural |\n|--------|----------|--------|\n| 1ª | εἰμί | ἐσμέν |\n| 2ª | εἶ | ἐστέ |\n| 3ª | ἐστίν | εἰσίν |',
    greekExample: 'Ἡμεῖς ἐσμέν • Ὑμεῖς ἐστέ • Αὐτοί εἰσίν',
    strongsRefs: 'G1510, G2070, G2075, G1526',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — M03: Pronomes Pessoais
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C2-M03-c1', moduleId: 'C2-M03', order: 1, type: 'grammar',
    title: 'Pronomes Pessoais — Caso Nominativo',
    body: '## Pronomes Pessoais Sujeito\n\nEm grego, o pronome sujeito é frequentemente omitido porque a desinência verbal já indica a pessoa.\n\n### Singular:\n• ἐγώ — eu\n• σύ — tu\n• αὐτός — ele (também "ele mesmo")\n\n### Plural:\n• ἡμεῖς — nós\n• ὑμεῖς — vós\n• αὐτοί — eles (masculino) / αὐταί (feminino)\n\n📌 Usa-se o pronome explícito para ênfase ou contraste: "ἐγώ εἰμι" (EU sou) vs "σὺ εἶ" (TU és).',
    greekExample: 'Ἐγώ εἰμι, σὺ εἶ, αὐτός ἐστίν',
    strongsRefs: 'G1473, G4771, G846, G2249, G5210',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — M04: Artigo Nominativo
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C2-M04-c1', moduleId: 'C2-M04', order: 1, type: 'grammar',
    title: 'O Artigo Definido — Nominativo',
    body: '## O Artigo Definido\n\nDiferente do português, o artigo grego tem três gêneros e dois números, e concorda com o substantivo.\n\n### Nominativo Singular:\n• ὁ — o (masculino)\n• ἡ — a (feminino)\n• τό — o/a (neutro)\n\n### Nominativo Plural:\n• οἱ — os (masculino)\n• αἱ — as (feminino)\n• τά — os/as (neutro)\n\n📌 O artigo é usado com muito mais frequência em grego do que em português, inclusive com nomes próprios: ὁ Ἰησοῦς ("o Jesus").',
    greekExample: 'ὁ λόγος • ἡ ἀγάπη • τὸ τέκνον • οἱ μαθηταί',
    strongsRefs: 'G3588',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — M05: Substantivos 2ª Declinação
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C2-M05-c1', moduleId: 'C2-M05', order: 1, type: 'grammar',
    title: 'Substantivos — 2ª Declinação (Temática)',
    body: '## 2ª Declinação\n\nA segunda declinação agrupa principalmente substantivos masculinos e neutros com tema em -ο.\n\n### Modelo: λόγος (masc) — "palavra"\n\n| Caso | Singular | Plural |\n|------|----------|--------|\n| Nom | λόγος | λόγοι |\n| Voc | λόγε | λόγοι |\n| Ac | λόγον | λόγους |\n| Gen | λόγου | λόγων |\n| Dat | λόγῳ | λόγοις |\n\n### Neutro: τέκνον — "filho"\n\n| Caso | Singular | Plural |\n|------|----------|--------|\n| Nom/Ac/Voc | τέκνον | τέκνα |\n| Gen | τέκνου | τέκνων |\n| Dat | τέκνῳ | τέκνοις |\n\n📌 Neutros têm nom/ac/voc sempre iguais entre si, e o plural termina em -α.',
    greekExample: 'ὁ λόγος • τοῦ λόγου • τῷ λόγῳ • τὸν λόγον • τέκνον • τέκνα',
    strongsRefs: 'G3056, G5043, G2316, G1401, G2041',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — M06: Predicado Nominativo
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C2-M06-c1', moduleId: 'C2-M06', order: 1, type: 'grammar',
    title: 'Predicado Nominativo com εἰμί',
    body: '## O Predicado Nominativo\n\nQuando o verbo εἰμί liga o sujeito a um predicado, ambos ficam no caso nominativo. É a estrutura mais comum no NT.\n\n• Sujeito + εἰμί + Predicado (mesmo caso!)\n\n### Exemplos:\n\n• Ὁ θεὸς ἀγάπη ἐστίν — "Deus é amor"\n  (sujeito: θεός; predicado: ἀγάπη — ambos nominativos)\n\n• Ἐγώ εἰμι ἡ ὁδός — "Eu sou o caminho"\n  (sujeito: ἐγώ; predicado: ὁδός)\n\n📌 Diferente do português, que usa o caso reto, o grego usa o nominativo TANTO para o sujeito QUANTO para o predicativo.',
    greekExample: 'Ὁ θεὸς ἀγάπη ἐστίν • Ἐγώ εἰμι ἡ ὁδός',
    strongsRefs: 'G2316, G26, G1510, G225, G1515',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — M07: Verbos λέγω, ἔχω, πιστεύω
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C2-M07-c1', moduleId: 'C2-M07', order: 1, type: 'grammar',
    title: 'Verbos Temáticos — Presente Ativo',
    body: '## Presente do Indicativo Ativo\n\nVerbos temáticos seguem um padrão regular de desinências. O tema verbal termina em vogal temática (-ο/ε-).\n\n### λέγω (dizer) — modelo:\n\n| Pessoa | Singular | Plural |\n|--------|----------|--------|\n| 1ª | λέγ-ω | λέγ-ο-μεν |\n| 2ª | λέγ-εις | λέγ-ε-τε |\n| 3ª | λέγ-ει | λέγ-ουσι(ν) |\n\n📌 A vogal temática muda: -ο antes de μ/ν, -ε antes de τ, -ου antes de σ.\n\n### ἔχω (ter):\n• ἔχω, ἔχεις, ἔχει, ἔχομεν, ἔχετε, ἔχουσι\n\n### πιστεύω (crer):\n• πιστεύω, πιστεύεις, πιστεύει, πιστεύομεν, πιστεύετε, πιστεύουσι',
    greekExample: 'Λέγω • ἔχω • πιστεύω • ἀκούω • γινώσκω',
    strongsRefs: 'G3004, G2192, G4100, G191, G1097',
  },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — M08: Revisão — 1 João 4:8
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'C2-M08-c1', moduleId: 'C2-M08', order: 1, type: 'example',
    title: '1 João 4:8 — O Verso Troféu do Ciclo II',
    body: '## 1 João 4:8\n\n"Ὁ θεὸς ἀγάπη ἐστίν"\n\nTrês palavras que resumem tudo que você aprendeu neste ciclo:\n\n• Ὁ — artigo definido nominativo masculino singular\n• θεός — substantivo de 2ª declinação (Deus)\n• ἀγάπη — substantivo de 1ª declinação (amor)\n• ἐστίν — verbo εἰμί, 3ª pessoa singular (é)\n\n📌 Este é o "verso troféu" do Ciclo II. É uma frase completa com sujeito + verbo + predicativo — a estrutura mais fundamental do grego koiné.',
    greekExample: 'Ὁ θεὸς ἀγάπη ἐστίν',
    strongsRefs: 'G3588, G2316, G26, G2076',
  },
];

export const seedLessonContent = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM lesson_content');
  if ((existing.values?.[0]?.count ?? 0) > 0) {
    console.log('[Seed] Lesson content already seeded, skipping');
    return;
  }

  for (const c of CONTENT) {
    await db.run(
      `INSERT OR IGNORE INTO lesson_content
       (id, module_id, content_order, type, title, body, greek_example, strongs_refs)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [c.id, c.moduleId, c.order, c.type, c.title, c.body, c.greekExample ?? null, c.strongsRefs ?? null],
    );
  }

  console.log(`[Seed] ${CONTENT.length} lesson content items seeded`);
};
