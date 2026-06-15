/**
 * L01 â€” As Primeiras Vogais (Î±, Îµ, Î·, Î¹)
 *
 * ID:               apostila-L01
 * TÃTULO:           LiÃ§Ã£o 1 â€” As Primeiras Vogais
 * DESCRIÃ‡ÃƒO:        Alpha, Epsilon, Eta, Iota
 * PDF_PAGE:         1
 * XP:               30
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  false
 *
 * Total de Steps: 18
 * Gerado a partir de: APOSTILA_CONTENT_ORCHESTRATOR.md v1.0.0
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L01: ApostilaLesson = {
  id: 'apostila-L01',
  title: 'LiÃ§Ã£o 1 â€” As Primeiras Vogais',
  description: 'Alpha, Epsilon, Eta, Iota',
  apostilaPdfPage: 1,
  lessonNumber: 1,
  xpReward: 30,
  estimatedMinutes: 12,
  requiresPrevious: false,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S01',
      type: 'intro',
      narration:
        'Bem-vindo Ã  LiÃ§Ã£o 1. Hoje vocÃª vai conhecer as primeiras quatro vogais do alfabeto grego: alfa, Ã©psilon, Ã©ta e iÃ´ta. Essas letras sÃ£o a base de centenas de palavras do Novo Testamento. Abra sua apostila na pÃ¡gina 1 e acompanhe comigo.',
      displayText: 'Abra sua apostila na PÃ¡gina 1',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: ALPHA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S02',
      type: 'word_intro',
      narration:
        'A primeira letra Ã© o alfa. MaiÃºsculo: Î‘. MinÃºsculo: Î±. O som Ã© "a", como em "pai". O alfa Ã© a primeira letra de todos os alfabetos semÃ­ticos e deu origem ao nosso "A" latino. No Apocalipse 1:8, Deus declara: "Eu sou o Alfa e o Ã”mega" â€” usando esta letra para falar de sua eternidade.',
      greekForm: 'Î‘ Î±',
      transliteration: 'alfa',
      pronunciation: 'a (como em "pai")',
      translation: 'Letra Alfa',
      etymology:
        'Originou o "A" latino e o Alef hebraico; primeira letra de todos os alfabetos semÃ­ticos',
      contextVerse: 'Apocalipse 1:8',
      contextVerseText:
        '"Eu sou o Alfa e o Ã”mega" â€” Deus usa esta letra para declarar sua eternidade',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S03 â€” ALPHABET_TRACE: ALPHA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do alfa minÃºsculo. Primeiro o traÃ§o diagonal da esquerda para baixo, depois o diagonal da direita, depois o traÃ§o horizontal no meio.',
      greekForm: 'Î±',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S04 â€” WRITE_PRACTICE: ALPHA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o alfa minÃºsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î±',
      transliteration: 'alfa',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila â€” Alfa minÃºsculo (Î±)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S05 â€” WORD_INTRO: EPSILON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S05',
      type: 'word_intro',
      narration:
        'A segunda letra Ã© o Ã©psilon. MaiÃºsculo: Î•. MinÃºsculo: Îµ. O som Ã© "e" breve, como em "pÃ©". Îµ + ÏˆÎ¹Î»ÏŒÎ½ significa "e simples", para distinguir do ditongo Î±Î¹. No JoÃ£o 1:1, ele aparece na terminaÃ§Ã£o do imperfeito: "No princÃ­pio era (á¼¦Î½) o Verbo".',
      greekForm: 'Î• Îµ',
      transliteration: 'Ã©psilon',
      pronunciation: 'e breve (como em "pÃ©")',
      translation: 'Letra Ã‰psilon',
      etymology:
        'Îµ + ÏˆÎ¹Î»ÏŒÎ½ significa "e simples", para distinguir do ditongo Î±Î¹',
      contextVerse: 'JoÃ£o 1:1',
      contextVerseText:
        '"No princÃ­pio era (á¼¦Î½) o Verbo" â€” Îµ aparece na terminaÃ§Ã£o do imperfeito',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” ALPHABET_TRACE: EPSILON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do Ã©psilon minÃºsculo. TraÃ§o vertical Ã  esquerda de cima para baixo, depois o traÃ§o horizontal do meio, depois o arco curvo Ã  direita.',
      greekForm: 'Îµ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: EPSILON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o Ã©psilon minÃºsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Îµ',
      transliteration: 'Ã©psilon',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila â€” Ã‰psilon minÃºsculo (Îµ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: ETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S08',
      type: 'word_intro',
      narration:
        'A terceira letra Ã© o Ã©ta. MaiÃºsculo: Î—. MinÃºsculo: Î·. O som Ã© "Ãª" longo, como em "mÃªs". Derivado do Chet hebraico, representa o "e" longo do grego clÃ¡ssico. O Î· aparece em muitas terminaÃ§Ãµes de substantivos femininos, como em Hebreus 11:1: "A fÃ© (Ï€Î¯ÏƒÏ„Î¹Ï‚) Ã©..."',
      greekForm: 'Î— Î·',
      transliteration: 'Ã©ta',
      pronunciation: 'Ãª longo (como em "mÃªs")',
      translation: 'Letra Ã‰ta',
      etymology:
        'Derivado do Chet hebraico (×—); representa o "e" longo do grego clÃ¡ssico',
      contextVerse: 'Hebreus 11:1',
      contextVerseText:
        '"A fÃ© (Ï€Î¯ÏƒÏ„Î¹Ï‚) Ã©..." â€” o Î· aparece em muitas terminaÃ§Ãµes de substantivos femininos',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S09 â€” ALPHABET_TRACE: ETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do Ã©ta minÃºsculo. Primeira haste vertical da esquerda para baixo, segunda haste vertical, depois o traÃ§o horizontal conectando as duas hastes na altura do meio.',
      greekForm: 'Î·',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S10 â€” WRITE_PRACTICE: ETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o Ã©ta minÃºsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î·',
      transliteration: 'Ã©ta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila â€” Ã‰ta minÃºsculo (Î·)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S11 â€” WORD_INTRO: IOTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S11',
      type: 'word_intro',
      narration:
        'A quarta letra Ã© o iÃ´ta. MaiÃºsculo: Î™. MinÃºsculo: Î¹. O som Ã© "i", como em "fio". Origem no Yod hebraico; a menor letra do alfabeto, mencionada por Jesus em Mateus 5:18: "Nem um iÃ´ta passarÃ¡ da lei".',
      greekForm: 'Î™ Î¹',
      transliteration: 'iÃ´ta',
      pronunciation: 'i (como em "fio")',
      translation: 'Letra IÃ´ta',
      etymology:
        'Origem no Yod hebraico (×™); a menor letra do alfabeto, mencionada por Jesus em Mateus 5:18',
      contextVerse: 'Mateus 5:18',
      contextVerseText:
        '"Nem um iota (á¼°á¿¶Ï„Î±) passarÃ¡ da lei" â€” Jesus usa esta prÃ³pria letra como exemplo',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” ALPHABET_TRACE: IOTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S12',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do iÃ´ta minÃºsculo. Um Ãºnico traÃ§o curvo de cima para baixo, levemente inclinado, com uma serifa no topo.',
      greekForm: 'Î¹',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S13 â€” WRITE_PRACTICE: IOTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S13',
      type: 'write_practice',
      narration:
        'Agora escreva o iÃ´ta minÃºsculo oito vezes na linha 4 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î¹',
      transliteration: 'iÃ´ta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 4 da apostila â€” IÃ´ta minÃºsculo (Î¹)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S14 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S14',
      type: 'pause',
      narration:
        'Muito bem! VocÃª acabou de aprender as quatro primeiras vogais gregas. Antes de continuar, olhe para o que escreveu e compare com o modelo na apostila. Cada letra deve ter a mesma forma que o modelo.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: ALPHA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S15',
      type: 'dictation',
      narration: 'Escreva no papel: alfa.',
      displayText: '"alfa"',
      greekForm: 'Î‘ Î±',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: EPSILON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S16',
      type: 'dictation',
      narration: 'Escreva no papel: Ã©psilon.',
      displayText: '"Ã©psilon"',
      greekForm: 'Î• Îµ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: ETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S17',
      type: 'dictation',
      narration: 'Escreva no papel: Ã©ta.',
      displayText: '"Ã©ta"',
      greekForm: 'Î— Î·',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S18 â€” DICTATION: IOTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L01-S18',
      type: 'dictation',
      narration: 'Escreva no papel: iÃ´ta.',
      displayText: '"iÃ´ta"',
      greekForm: 'Î™ Î¹',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

