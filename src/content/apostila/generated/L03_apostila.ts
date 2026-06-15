/**
 * L03 â€” Consoantes Labiais (Î², Ï€, Ï†)
 *
 * ID:               apostila-L03
 * TÃTULO:           LiÃ§Ã£o 3 â€” Consoantes com os LÃ¡bios
 * DESCRIÃ‡ÃƒO:        Beta, Pi, Fi
 * PDF_PAGE:         5
 * XP:               35
 * TEMPO:            10 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 14
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L03: ApostilaLesson = {
  id: 'apostila-L03',
  title: 'LiÃ§Ã£o 3 â€” Consoantes com os LÃ¡bios',
  description: 'Beta, Pi, Fi',
  apostilaPdfPage: 5,
  lessonNumber: 3,
  xpReward: 35,
  estimatedMinutes: 10,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S01',
      type: 'intro',
      narration:
        'Hoje comeÃ§amos as consoantes gregas. Os sons Î², Ï€ e Ï† sÃ£o produzidos com os lÃ¡bios â€” como em portuguÃªs. Abra sua apostila na pÃ¡gina 5 e acompanhe comigo.',
      displayText: 'Abra sua apostila na PÃ¡gina 5',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: BETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S02',
      type: 'word_intro',
      narration:
        'A primeira letra Ã© o beta. MaiÃºsculo: Î’. MinÃºsculo: Î². O som Ã© "b", como em "bola".',
      greekForm: 'Î’ Î²',
      transliteration: 'beta',
      pronunciation: 'b (como em \'bola\')',
      translation: 'Letra Beta',
      etymology:
        'Do Bet hebraico (×‘); segunda letra do alfabeto â€” daÃ­ a palavra "alfabeto" (alpha + beta)',
      contextVerse: 'Marcos 1:17',
      contextVerseText:
        '"Segui-me (á¼€ÎºÎ¿Î»Î¿Ï…Î¸Îµá¿–Ï„Îµ)" â€” Î² aparece em verbos como Î²Î±Ï€Ï„Î¯Î¶Ï‰ (batizar)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S03 â€” ALPHABET_TRACE: BETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do beta minÃºsculo: Haste vertical Ã  esquerda, depois dois arcos Ã  direita, o primeiro na altura do meio, o segundo na base.',
      greekForm: 'Î²',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S04 â€” WRITE_PRACTICE: BETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o beta minÃºsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î²',
      transliteration: 'beta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila â€” Beta minÃºsculo (Î²)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S05 â€” WORD_INTRO: PI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S05',
      type: 'word_intro',
      narration:
        'A segunda letra Ã© o pi. MaiÃºsculo: Î . MinÃºsculo: Ï€. O som Ã© "p", como em "pÃ£o".',
      greekForm: 'Î  Ï€',
      transliteration: 'pi',
      pronunciation: 'p (como em \'pÃ£o\')',
      translation: 'Letra Pi',
      etymology:
        'Do Pe hebraico (×¤); famoso na matemÃ¡tica como Ï€ â‰ˆ 3,14, mas no NT Ã© apenas uma consoante',
      contextVerse: 'Filipenses 4:7',
      contextVerseText:
        '"...a paz (Îµá¼°ÏÎ®Î½Î·)" â€” Ï€ inicia palavras como Ï€Î¯ÏƒÏ„Î¹Ï‚ (fÃ©) e Ï€Î½Îµá¿¦Î¼Î± (espÃ­rito)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” ALPHABET_TRACE: PI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do pi minÃºsculo: Barra horizontal de cima para baixo, depois duas hastes verticais curtas, uma Ã  esquerda e outra Ã  direita.',
      greekForm: 'Ï€',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: PI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o pi minÃºsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ï€',
      transliteration: 'pi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila â€” Pi minÃºsculo (Ï€)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: FI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S08',
      type: 'word_intro',
      narration:
        'A terceira letra Ã© o fi. MaiÃºsculo: Î¦. MinÃºsculo: Ï†. O som Ã© "f", como em "fÃ©".',
      greekForm: 'Î¦ Ï†',
      transliteration: 'fi',
      pronunciation: 'f (como em \'fÃ©\')',
      translation: 'Letra Fi',
      etymology:
        'Aspirada bilabial; emprestada ao latim como "ph" para representar o som f',
      contextVerse: 'JoÃ£o 1:1',
      contextVerseText:
        '"...a palavra (Î»ÏŒÎ³Î¿Ï‚)" â€” Ï† aparece em Ï†á¿¶Ï‚ (luz) e Ï†Î¹Î»Î­Ï‰ (amar como amigo)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S09 â€” ALPHABET_TRACE: FI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do fi minÃºsculo: Haste vertical de cima para baixo, depois um cÃ­rculo fechado no centro da haste.',
      greekForm: 'Ï†',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S10 â€” WRITE_PRACTICE: FI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o fi minÃºsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ï†',
      transliteration: 'fi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila â€” Fi minÃºsculo (Ï†)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S11 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S11',
      type: 'pause',
      narration:
        'Muito bem! VocÃª acabou de aprender as trÃªs consoantes labiais: beta, pi e fi. Antes de continuar, olhe para o que escreveu e compare com o modelo na apostila.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S12 â€” DICTATION: BETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S12',
      type: 'dictation',
      narration: 'Escreva no papel: beta.',
      displayText: '"beta"',
      greekForm: 'Î’ Î²',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S13 â€” DICTATION: PI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S13',
      type: 'dictation',
      narration: 'Escreva no papel: pi.',
      displayText: '"pi"',
      greekForm: 'Î  Ï€',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: FI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L03-S14',
      type: 'dictation',
      narration: 'Escreva no papel: fi.',
      displayText: '"fi"',
      greekForm: 'Î¦ Ï†',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

