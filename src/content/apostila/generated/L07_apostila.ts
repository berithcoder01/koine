/**
 * L07 â€” Palavras de FÃ© e GraÃ§a (á¼€Î³Î¬Ï€Î·, Ï€Î¯ÏƒÏ„Î¹Ï‚, Ï‡Î¬ÏÎ¹Ï‚, Îµá¼°ÏÎ®Î½Î·, Î¶Ï‰Î®)
 *
 * ID:               apostila-L07
 * TÃTULO:           LiÃ§Ã£o 7 â€” Palavras de FÃ© e GraÃ§a
 * DESCRIÃ‡ÃƒO:        á¼€Î³Î¬Ï€Î·, Ï€Î¯ÏƒÏ„Î¹Ï‚, Ï‡Î¬ÏÎ¹Ï‚, Îµá¼°ÏÎ®Î½Î·, Î¶Ï‰Î®
 * PDF_PAGE:         15
 * XP:               40
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L07: ApostilaLesson = {
  id: 'apostila-L07',
  lessonNumber: 7,
  title: 'LiÃ§Ã£o 7 â€” Palavras de FÃ© e GraÃ§a',
  description: 'á¼€Î³Î¬Ï€Î·, Ï€Î¯ÏƒÏ„Î¹Ï‚, Ï‡Î¬ÏÎ¹Ï‚, Îµá¼°ÏÎ®Î½Î·, Î¶Ï‰Î®',
  apostilaPdfPage: 15,
  xpReward: 40,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 7 â€” Palavras de fÃ© e graÃ§a. Hoje vocÃª vai aprender cinco das palavras mais importantes do Novo Testamento: Ã¡gape, pÃ­stis, chÃ¡ris, eirene e zoe. Estas palavras aparecem centenas de vezes nas cartas de Paulo. Abra sua apostila na pÃ¡gina 15.',
      displayText: 'Abra sua apostila na PÃ¡gina 15',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: á¼€Î³Î¬Ï€Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S02',
      type: 'word_intro',
      narration:
        'A primeira palavra Ã© á¼€Î³Î¬Ï€Î· â€” agÃ¡pÄ“. Pronuncie: a-GÃ-pe. Significa amor â€” mas nÃ£o qualquer amor. Ã‰ o amor incondicional, que escolhe o bem do outro independentemente de sentimentos.',
      greekForm: 'á¼€Î³Î¬Ï€Î·',
      transliteration: 'agÃ¡pÄ“',
      pronunciation: 'a-GÃ-pe',
      translation: 'amor incondicional',
      etymology:
        'Do verbo á¼€Î³Î±Ï€Î¬Ï‰, amar com escolha deliberada; distinto de á¼”ÏÏ‰Ï‚ (desejo) e Ï†Î¹Î»Î¯Î± (amizade)',
      contextVerse: 'JoÃ£o 3:16',
      contextVerseText:
        '"Porque Deus amou (á¼ Î³Î¬Ï€Î·ÏƒÎµÎ½) o mundo de tal maneira..."',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S03 â€” WRITE_PRACTICE: á¼€Î³Î¬Ï€Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S03',
      type: 'write_practice',
      narration:
        'Agora escreva á¼€Î³Î¬Ï€Î· cinco vezes na linha 1 da sua apostila. Pronuncie em voz alta cada vez que escrever: a-GÃ-pe.',
      greekForm: 'á¼€Î³Î¬Ï€Î·',
      transliteration: 'agÃ¡pÄ“',
      pronunciation: 'a-GÃ-pe',
      translation: 'amor incondicional',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” á¼€Î³Î¬Ï€Î·',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S04 â€” WORD_INTRO: Ï€Î¯ÏƒÏ„Î¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S04',
      type: 'word_intro',
      narration:
        'A segunda palavra Ã© Ï€Î¯ÏƒÏ„Î¹Ï‚ â€” pÃ­stis. Pronuncie: PÃS-tis. Significa fÃ©, confianÃ§a. NÃ£o Ã© apenas acreditar que algo Ã© verdade, mas confiar ativamente.',
      greekForm: 'Ï€Î¯ÏƒÏ„Î¹Ï‚',
      transliteration: 'pÃ­stis',
      pronunciation: 'PÃS-tis',
      translation: 'fÃ© / confianÃ§a',
      etymology:
        'De Ï€ÎµÎ¯Î¸Ï‰, persuadir; implica confianÃ§a ativa, nÃ£o mera crenÃ§a intelectual',
      contextVerse: 'Hebreus 11:1',
      contextVerseText:
        '"A fÃ© (Ï€Î¯ÏƒÏ„Î¹Ï‚) Ã© a certeza de coisas que se esperam..."',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S05 â€” WRITE_PRACTICE: Ï€Î¯ÏƒÏ„Î¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S05',
      type: 'write_practice',
      narration:
        'Agora escreva Ï€Î¯ÏƒÏ„Î¹Ï‚ cinco vezes na linha 2 da sua apostila. Pronuncie: PÃS-tis.',
      greekForm: 'Ï€Î¯ÏƒÏ„Î¹Ï‚',
      transliteration: 'pÃ­stis',
      pronunciation: 'PÃS-tis',
      translation: 'fÃ© / confianÃ§a',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” Ï€Î¯ÏƒÏ„Î¹Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” WORD_INTRO: Ï‡Î¬ÏÎ¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S06',
      type: 'word_intro',
      narration:
        'A terceira palavra Ã© Ï‡Î¬ÏÎ¹Ï‚ â€” chÃ¡ris. Pronuncie: CÃ-ris. Significa graÃ§a, favor imerecido. Ã‰ a base da teologia paulina da salvaÃ§Ã£o.',
      greekForm: 'Ï‡Î¬ÏÎ¹Ï‚',
      transliteration: 'chÃ¡ris',
      pronunciation: 'CÃ-ris',
      translation: 'graÃ§a / favor imerecido',
      etymology:
        'Relacionado a Ï‡Î±ÏÎ¬ (alegria) e Ï‡Î±Î¯ÏÏ‰ (regozijar); favor dado gratuitamente',
      contextVerse: 'EfÃ©sios 2:8',
      contextVerseText:
        '"Pela graÃ§a (Ï‡Î¬ÏÎ¹Ï„Î¹) sois salvos, mediante a fÃ©"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: Ï‡Î¬ÏÎ¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S07',
      type: 'write_practice',
      narration:
        'Agora escreva Ï‡Î¬ÏÎ¹Ï‚ cinco vezes na linha 3 da sua apostila. Pronuncie: CÃ-ris.',
      greekForm: 'Ï‡Î¬ÏÎ¹Ï‚',
      transliteration: 'chÃ¡ris',
      pronunciation: 'CÃ-ris',
      translation: 'graÃ§a / favor imerecido',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” Ï‡Î¬ÏÎ¹Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: Îµá¼°ÏÎ®Î½Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S08',
      type: 'word_intro',
      narration:
        'A quarta palavra Ã© Îµá¼°ÏÎ®Î½Î· â€” eirá¸—nÄ“. Pronuncie: ei-RÃŠ-ne. Significa paz â€” mas nÃ£o apenas ausÃªncia de conflito. Ã‰ completude, inteireza, como o hebraico shalom.',
      greekForm: 'Îµá¼°ÏÎ®Î½Î·',
      transliteration: 'eirá¸—nÄ“',
      pronunciation: 'ei-RÃŠ-ne',
      translation: 'paz / inteireza',
      etymology:
        'Equivalente ao hebraico ×©Ö¸××œ×•Ö¹× (shalom): nÃ£o ausÃªncia de conflito, mas completude total',
      contextVerse: 'JoÃ£o 14:27',
      contextVerseText:
        '"Deixo-vos a paz (Îµá¼°ÏÎ®Î½Î·Î½), a minha paz vos dou"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S09 â€” WRITE_PRACTICE: Îµá¼°ÏÎ®Î½Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S09',
      type: 'write_practice',
      narration:
        'Agora escreva Îµá¼°ÏÎ®Î½Î· cinco vezes na linha 4 da sua apostila. Pronuncie: ei-RÃŠ-ne.',
      greekForm: 'Îµá¼°ÏÎ®Î½Î·',
      transliteration: 'eirá¸—nÄ“',
      pronunciation: 'ei-RÃŠ-ne',
      translation: 'paz / inteireza',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” Îµá¼°ÏÎ®Î½Î·',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S10 â€” WORD_INTRO: Î¶Ï‰Î® â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S10',
      type: 'word_intro',
      narration:
        'A quinta palavra Ã© Î¶Ï‰Î® â€” zÅá¸—. Pronuncie: zo-ÃŠ. Significa vida â€” nÃ£o a vida biolÃ³gica (bÃ­os), mas a vida em sua plenitude qualitativa, a vida eterna.',
      greekForm: 'Î¶Ï‰Î®',
      transliteration: 'zÅá¸—',
      pronunciation: 'zo-ÃŠ',
      translation: 'vida eterna e abundante',
      etymology:
        'Distinto de Î²Î¯Î¿Ï‚ (vida biolÃ³gica); Î¶Ï‰Î® Ã© vida em sua plenitude qualitativa',
      contextVerse: 'JoÃ£o 10:10',
      contextVerseText:
        '"Eu vim para que tenham vida (Î¶Ï‰Î®Î½) e a tenham em abundÃ¢ncia"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S11 â€” WRITE_PRACTICE: Î¶Ï‰Î® â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S11',
      type: 'write_practice',
      narration:
        'Agora escreva Î¶Ï‰Î® cinco vezes na linha 5 da sua apostila. Pronuncie: zo-ÃŠ.',
      greekForm: 'Î¶Ï‰Î®',
      transliteration: 'zÅá¸—',
      pronunciation: 'zo-ÃŠ',
      translation: 'vida eterna e abundante',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” Î¶Ï‰Î®',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S12',
      type: 'pause',
      narration:
        'Excelente! VocÃª escreveu as cinco palavras fundamentais. Antes de continuar, releia o que escreveu na apostila. Cada palavra carrega sÃ©culos de teologia.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S13 â€” DICTATION: á¼€Î³Î¬Ï€Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S13',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: amor incondicional.',
      displayText: '"amor incondicional"',
      greekForm: 'á¼€Î³Î¬Ï€Î·',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: Ï€Î¯ÏƒÏ„Î¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S14',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: fÃ©.',
      displayText: '"fÃ© / confianÃ§a"',
      greekForm: 'Ï€Î¯ÏƒÏ„Î¹Ï‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: Ï‡Î¬ÏÎ¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S15',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: graÃ§a.',
      displayText: '"graÃ§a / favor imerecido"',
      greekForm: 'Ï‡Î¬ÏÎ¹Ï‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: Îµá¼°ÏÎ®Î½Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S16',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: paz.',
      displayText: '"paz / inteireza"',
      greekForm: 'Îµá¼°ÏÎ®Î½Î·',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: Î¶Ï‰Î® â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L07-S17',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: vida eterna.',
      displayText: '"vida (eterna e abundante)"',
      greekForm: 'Î¶Ï‰Î®',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

