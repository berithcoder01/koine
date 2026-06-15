/**
 * L04 â€” Consoantes Dentais (Î´, Ï„, Î¸)
 *
 * ID:               apostila-L04
 * TÃTULO:           LiÃ§Ã£o 4 â€” Consoantes com a LÃ­ngua
 * DESCRIÃ‡ÃƒO:        Delta, Tau, Teta
 * PDF_PAGE:         7
 * XP:               35
 * TEMPO:            10 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 14
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L04: ApostilaLesson = {
  id: 'apostila-L04',
  title: 'LiÃ§Ã£o 4 â€” Consoantes com a LÃ­ngua',
  description: 'Delta, Tau, Teta',
  apostilaPdfPage: 7,
  lessonNumber: 4,
  xpReward: 35,
  estimatedMinutes: 10,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S01',
      type: 'intro',
      narration:
        'Hoje vamos estudar as consoantes dentais. Esses sons sÃ£o produzidos com a lÃ­ngua nos dentes: delta, tau e teta. Abra sua apostila na pÃ¡gina 7.',
      displayText: 'Abra sua apostila na PÃ¡gina 7',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: DELTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S02',
      type: 'word_intro',
      narration:
        'A primeira letra Ã© o delta. MaiÃºsculo: Î”. MinÃºsculo: Î´. O som Ã© "d", como em "dado".',
      greekForm: 'Î” Î´',
      transliteration: 'delta',
      pronunciation: 'd (como em \'dado\')',
      translation: 'Letra Delta',
      etymology:
        'Do Dalet hebraico (×“); forma triangular foi usada para representar o rio Nilo â€” daÃ­ "delta"',
      contextVerse: 'JoÃ£o 1:14',
      contextVerseText:
        '"O Verbo se fez carne (ÏƒÎ¬ÏÎ¾)" â€” Î´ aparece em Î´ÏŒÎ¾Î± (glÃ³ria) e Î´ÏÎ½Î±Î¼Î¹Ï‚ (poder)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S03 â€” ALPHABET_TRACE: DELTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do delta minÃºsculo: Primeiro o arco curvo da esquerda para baixo formando um semicÃ­rculo aberto, depois a haste vertical Ã  direita, levemente inclinada.',
      greekForm: 'Î´',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S04 â€” WRITE_PRACTICE: DELTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o delta minÃºsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î´',
      transliteration: 'delta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila â€” Delta minÃºsculo (Î´)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S05 â€” WORD_INTRO: TAU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S05',
      type: 'word_intro',
      narration:
        'A segunda letra Ã© o tau. MaiÃºsculo: Î¤. MinÃºsculo: Ï„. O som Ã© "t", como em "tudo".',
      greekForm: 'Î¤ Ï„',
      transliteration: 'tau',
      pronunciation: 't (como em \'tudo\')',
      translation: 'Letra Tau',
      etymology:
        'Do Taw hebraico (×ª); forma em cruz (+) foi associada pelos primeiros cristÃ£os Ã  cruz de Cristo',
      contextVerse: 'Ezequiel 9:4 (citado em Apocalipse)',
      contextVerseText:
        '"...marca o Ï„ (tau) na testa" â€” sinal de proteÃ§Ã£o na tradiÃ§Ã£o judaica',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” ALPHABET_TRACE: TAU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do tau minÃºsculo: Primeiro a barra horizontal de cima para baixo, depois a haste vertical curta no centro, abaixo da barra.',
      greekForm: 'Ï„',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: TAU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o tau minÃºsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ï„',
      transliteration: 'tau',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila â€” Tau minÃºsculo (Ï„)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: TETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S08',
      type: 'word_intro',
      narration:
        'A terceira letra Ã© o teta. MaiÃºsculo: Î˜. MinÃºsculo: Î¸. O som Ã© "th" aspirado, como em "think" do inglÃªs.',
      greekForm: 'Î˜ Î¸',
      transliteration: 'teta',
      pronunciation: 'th aspirado (como \'think\' em inglÃªs)',
      translation: 'Letra Teta',
      etymology:
        'Aspirada dental; nÃ£o tem equivalente em portuguÃªs â€” soa como "th" do inglÃªs "think"',
      contextVerse: 'JoÃ£o 1:1',
      contextVerseText:
        '"...e Deus (Î¸ÎµÏŒÏ‚) era o Verbo" â€” Î¸ inicia Î¸ÎµÏŒÏ‚, Î¸Î­Î»Ï‰, Î¸Î¬Î½Î±Ï„Î¿Ï‚ (morte)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S09 â€” ALPHABET_TRACE: TETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do teta minÃºsculo: Primeiro um cÃ­rculo fechado completo, depois o traÃ§o horizontal no centro do cÃ­rculo.',
      greekForm: 'Î¸',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S10 â€” WRITE_PRACTICE: TETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o teta minÃºsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î¸',
      transliteration: 'teta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila â€” Teta minÃºsculo (Î¸)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S11 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S11',
      type: 'pause',
      narration:
        'Excelente! VocÃª aprendeu as trÃªs consoantes dentais: delta, tau e teta. Antes de continuar, olhe para o que escreveu e compare com o modelo.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S12 â€” DICTATION: DELTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S12',
      type: 'dictation',
      narration: 'Escreva no papel: delta.',
      displayText: '"delta"',
      greekForm: 'Î” Î´',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S13 â€” DICTATION: TAU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S13',
      type: 'dictation',
      narration: 'Escreva no papel: tau.',
      displayText: '"tau"',
      greekForm: 'Î¤ Ï„',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: TETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L04-S14',
      type: 'dictation',
      narration: 'Escreva no papel: teta.',
      displayText: '"teta"',
      greekForm: 'Î˜ Î¸',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

