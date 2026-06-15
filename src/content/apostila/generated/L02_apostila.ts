/**
 * L02 â€” Vogais Longas e o Upsilon (Î¿, Ï…, Ï‰)
 *
 * ID:               apostila-L02
 * TÃTULO:           LiÃ§Ã£o 2 â€” Vogais Longas e o Upsilon
 * DESCRIÃ‡ÃƒO:        Omicron, Upsilon, Omega
 * PDF_PAGE:         3
 * XP:               30
 * TEMPO:            10 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 14
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L02: ApostilaLesson = {
  id: 'apostila-L02',
  title: 'LiÃ§Ã£o 2 â€” Vogais Longas e o Upsilon',
  description: 'Omicron, Upsilon, Omega',
  apostilaPdfPage: 3,
  lessonNumber: 2,
  xpReward: 30,
  estimatedMinutes: 10,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S01',
      type: 'intro',
      narration: 'Hoje completaremos as vogais gregas. VocÃª aprenderÃ¡ o omicron, o upsilon e finalmente o omega â€” o "o grande". Estas letras sÃ£o essenciais para pronunciar corretamente as palavras do Novo Testamento. Abra sua apostila na pÃ¡gina 3 e acompanhe comigo.',
      displayText: 'Abra sua apostila na PÃ¡gina 3',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: OMICRON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S02',
      type: 'word_intro',
      narration: 'A primeira letra Ã© o omicron. MaiÃºsculo: ÎŸ. MinÃºsculo: Î¿. O som Ã© "o" breve, como em "sol". O nome significa "o pequeno", para distinguir do Ã´mega (o grande).',
      greekForm: 'ÎŸ Î¿',
      transliteration: 'omicron',
      pronunciation: 'o breve (como em "sol")',
      translation: 'Letra Omicron',
      etymology: 'Î¿ + Î¼Î¹ÎºÏÏŒÎ½ significa "o pequeno", para distinguir do Ã´mega (o grande)',
      contextVerse: 'JoÃ£o 3:16',
      contextVerseText: '"...o mundo (ÎºÏŒÏƒÎ¼Î¿Î½)" â€” Î¿ aparece como terminaÃ§Ã£o de substantivos masculinos no acusativo',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S03 â€” ALPHABET_TRACE: OMICRON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S03',
      type: 'alphabet_trace',
      narration: 'Observe a ordem dos traÃ§os do omicron minÃºsculo. Um Ãºnico cÃ­rculo fechado, traÃ§ado no sentido anti-horÃ¡rio.',
      greekForm: 'Î¿',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S04 â€” WRITE_PRACTICE: OMICRON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S04',
      type: 'write_practice',
      narration: 'Agora escreva o omicron minÃºsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î¿',
      transliteration: 'omicron',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila â€” Omicron minÃºsculo (Î¿)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S05 â€” WORD_INTRO: UPSILON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S05',
      type: 'word_intro',
      narration: 'A segunda letra Ã© o upsilon. MaiÃºsculo: Î¥. MinÃºsculo: Ï…. O som Ã© "u" ou "Ã¼", como em "tu" ou o alemÃ£o "Ã¼". Absorvido no latim como Y, chamado "i grego".',
      greekForm: 'Î¥ Ï…',
      transliteration: 'upsilon',
      pronunciation: 'u ou Ã¼ (como em "tu")',
      translation: 'Letra Upsilon',
      etymology: 'Ï + ÏˆÎ¹Î»ÏŒÎ½, "u simples"; absorvido no latim como Y (chamado "i grego")',
      contextVerse: 'JoÃ£o 1:4',
      contextVerseText: '"...a vida (Î¶Ï‰Î®)" â€” o Ï… aparece em combinaÃ§Ãµes como Î±Ï… e ÎµÏ… formando ditongos',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” ALPHABET_TRACE: UPSILON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S06',
      type: 'alphabet_trace',
      narration: 'Observe a ordem dos traÃ§os do upsilon minÃºsculo. Primeiro a haste vertical de cima para baixo, depois a bifurcaÃ§Ã£o no topo, formando um "V" invertido.',
      greekForm: 'Ï…',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: UPSILON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S07',
      type: 'write_practice',
      narration: 'Agora escreva o upsilon minÃºsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ï…',
      transliteration: 'upsilon',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila â€” Upsilon minÃºsculo (Ï…)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: OMEGA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S08',
      type: 'word_intro',
      narration: 'A terceira letra Ã© o Ã´mega. MaiÃºsculo: Î©. MinÃºsculo: Ï‰. O som Ã© "Ã´" longo, como em "avÃ´". Ã‰ a Ãºltima letra do alfabeto grego. No Apocalipse, Deus declara: "Eu sou o Alfa e o Ã”mega".',
      greekForm: 'Î© Ï‰',
      transliteration: 'omega',
      pronunciation: 'Ã´ longo (como em "avÃ´")',
      translation: 'Letra Ã”mega',
      etymology: 'Ï‰ + Î¼Î­Î³Î± significa "o grande", contraparte longa do omicron',
      contextVerse: 'Apocalipse 22:13',
      contextVerseText: '"Eu sou o Alfa e o Ã”mega (Î©), o primeiro e o Ãºltimo" â€” Ãºltima letra do alfabeto',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S09 â€” ALPHABET_TRACE: OMEGA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S09',
      type: 'alphabet_trace',
      narration: 'Observe a ordem dos traÃ§os do omega minÃºsculo. Primeiro arco Ã  esquerda, de cima para baixo. Segundo arco Ã  direita, unindo-se ao primeiro na base.',
      greekForm: 'Ï‰',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S10 â€” WRITE_PRACTICE: OMEGA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S10',
      type: 'write_practice',
      narration: 'Agora escreva o omega minÃºsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ï‰',
      transliteration: 'omega',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila â€” Omega minÃºsculo (Ï‰)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S11 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S11',
      type: 'pause',
      narration: 'Muito bem! Agora vocÃª conhece todas as sete vogais gregas. Compare as letras que escreveu com o modelo na apostila, especialmente os pares Î¿/Ï‰ (breve vs longo) e o Ï… (som Ãºnico).',
      displayText: 'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S12 â€” DICTATION: OMICRON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S12',
      type: 'dictation',
      narration: 'Escreva no papel: omicron.',
      displayText: '"omicron"',
      greekForm: 'ÎŸ Î¿',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S13 â€” DICTATION: UPSILON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S13',
      type: 'dictation',
      narration: 'Escreva no papel: upsilon.',
      displayText: '"upsilon"',
      greekForm: 'Î¥ Ï…',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: OMEGA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L02-S14',
      type: 'dictation',
      narration: 'Escreva no papel: omega.',
      displayText: '"omega"',
      greekForm: 'Î© Ï‰',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

