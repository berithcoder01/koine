/**
 * L16 â€” Verbos do NT (Îµá¼°Î¼Î¯, á¼”ÏÏ‡Î¿Î¼Î±Î¹, á¼€ÎºÎ¿ÏÏ‰, Î²Î»Î­Ï€Ï‰, Ï€Î¹ÏƒÏ„ÎµÏÏ‰)
 *
 * ID:               apostila-L16
 * TÃTULO:           LiÃ§Ã£o 16 â€” Verbos do NT
 * DESCRIÃ‡ÃƒO:        Îµá¼°Î¼Î¯, á¼”ÏÏ‡Î¿Î¼Î±Î¹, á¼€ÎºÎ¿ÏÏ‰, Î²Î»Î­Ï€Ï‰, Ï€Î¹ÏƒÏ„ÎµÏÏ‰
 * PDF_PAGE:         33
 * XP:               50
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L16: ApostilaLesson = {
  id: 'apostila-L16',
  title: 'LiÃ§Ã£o 16 â€” Verbos do NT',
  description: 'Îµá¼°Î¼Î¯, á¼”ÏÏ‡Î¿Î¼Î±Î¹, á¼€ÎºÎ¿ÏÏ‰, Î²Î»Î­Ï€Ï‰, Ï€Î¹ÏƒÏ„ÎµÏÏ‰',
  apostilaPdfPage: 33,
  lessonNumber: 16,
  xpReward: 50,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    {
      id: 'apostila-L16-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 16 â€” Verbos fundamentais do Novo Testamento. Hoje vocÃª vai aprender os verbos mais importantes: eimÃ­, Ã©rchomai, akoÃºo, blÃ©po e pisteÃºo. Abra sua apostila na pÃ¡gina 33.',
      displayText: 'Abra sua apostila na PÃ¡gina 33',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S02',
      type: 'word_intro',
      narration:
        'Îµá¼°Î¼Î¯ Ã© o verbo ser, existir. Ã‰ o verbo mais irregular do grego. á¼˜Î³ÏŽ Îµá¼°Î¼Î¹ (Ego eimi â€” Eu sou) Ã© o tÃ­tulo divino em JoÃ£o. Em JoÃ£o 8:58, Jesus declara: "Antes que AbraÃ£o existisse, EU SOU". Pronuncia-se ei-MÃ.',
      greekForm: 'Îµá¼°Î¼Î¯',
      transliteration: 'eimÃ­',
      pronunciation: 'ei-MÃ',
      translation: 'ser / existir',
      etymology:
        'Verbo "ser" mais irregular do grego; "á¼˜Î“Î© Î•Î™ÎœÎ™" (Ego eimi, Eu sou) Ã© o tÃ­tulo divino de JoÃ£o',
      contextVerse: 'JoÃ£o 8:58',
      contextVerseText:
        '"Em verdade, em verdade vos digo: antes que AbraÃ£o existisse, EU SOU (á¼Î³ÏŽ Îµá¼°Î¼Î¹)"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S03',
      type: 'write_practice',
      narration:
        'Agora escreva Îµá¼°Î¼Î¯ cinco vezes na linha 1. Pronuncie: ei-MÃ.',
      greekForm: 'Îµá¼°Î¼Î¯',
      transliteration: 'eimÃ­',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” Îµá¼°Î¼Î¯',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S04',
      type: 'word_intro',
      narration:
        'á¼”ÏÏ‡Î¿Î¼Î±Î¹ significa vir, chegar, ir. Ã‰ o verbo de movimento mais frequente do NT. No Apocalipse: "Vem, Senhor Jesus" (á¼”ÏÏ‡Î¿Ï… ÎšÏÏÎ¹Îµ á¼¸Î·ÏƒÎ¿á¿¦). Em JoÃ£o 1:9, a verdadeira luz estava vindo ao mundo. Pronuncia-se Ã‰R-cho-mai.',
      greekForm: 'á¼”ÏÏ‡Î¿Î¼Î±Î¹',
      transliteration: 'Ã©rchomai',
      pronunciation: 'Ã‰R-cho-mai',
      translation: 'vir / chegar / ir',
      etymology:
        'Verbo de movimento mais frequente; no Apocalipse: "Vem, Senhor Jesus" (á¼”ÏÏ‡Î¿Ï… ÎšÏÏÎ¹Îµ á¼¸Î·ÏƒÎ¿á¿¦)',
      contextVerse: 'JoÃ£o 1:9',
      contextVerseText:
        '"A verdadeira luz... estava vindo (á¼ÏÏ‡ÏŒÎ¼ÎµÎ½Î¿Î½) ao mundo"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S05',
      type: 'write_practice',
      narration:
        'Agora escreva á¼”ÏÏ‡Î¿Î¼Î±Î¹ cinco vezes na linha 2. Pronuncie: Ã‰R-cho-mai.',
      greekForm: 'á¼”ÏÏ‡Î¿Î¼Î±Î¹',
      transliteration: 'Ã©rchomai',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” á¼”ÏÏ‡Î¿Î¼Î±Î¹',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S06',
      type: 'word_intro',
      narration:
        'á¼€ÎºÎ¿ÏÏ‰ significa ouvir, escutar com atenÃ§Ã£o. Deu origem a "acÃºstica". NÃ£o Ã© ouvir passivo â€” implica entender e responder. Em JoÃ£o 10:27, Jesus diz: "As minhas ovelhas ouvem a minha voz". Pronuncia-se a-KÃš-o.',
      greekForm: 'á¼€ÎºÎ¿ÏÏ‰',
      transliteration: 'akoÃºÅ',
      pronunciation: 'a-KÃš-o',
      translation: 'ouvir / escutar com atenÃ§Ã£o',
      etymology:
        'Deu origem a "acÃºstica"; nÃ£o Ã© ouvir passivo â€” implica entender e responder',
      contextVerse: 'JoÃ£o 10:27',
      contextVerseText:
        '"As minhas ovelhas ouvem (á¼€ÎºÎ¿ÏÎ¿Ï…ÏƒÎ¹Î½) a minha voz"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S07',
      type: 'write_practice',
      narration:
        'Agora escreva á¼€ÎºÎ¿ÏÏ‰ cinco vezes na linha 3. Pronuncie: a-KÃš-o.',
      greekForm: 'á¼€ÎºÎ¿ÏÏ‰',
      transliteration: 'akoÃºÅ',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” á¼€ÎºÎ¿ÏÏ‰',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S08',
      type: 'word_intro',
      narration:
        'Î²Î»Î­Ï€Ï‰ significa ver, perceber, enxergar. Ã‰ distinto de á½ÏÎ¬Ï‰, que Ã© ver com mais Ãªnfase. Em JoÃ£o 9:25, o cego curado diz: "Uma coisa sei: eu era cego e agora vejo". Pronuncia-se BLÃ‰P-o.',
      greekForm: 'Î²Î»Î­Ï€Ï‰',
      transliteration: 'blÃ©pÅ',
      pronunciation: 'BLÃ‰P-o',
      translation: 'ver / perceber / enxergar',
      etymology:
        'Distinto de á½ÏÎ¬Ï‰ (ver com mais Ãªnfase); em JoÃ£o 9:25: "Eu era cego e agora vejo"',
      contextVerse: 'JoÃ£o 9:25',
      contextVerseText:
        '"Uma coisa sei: eu era cego e agora vejo (Î²Î»Î­Ï€Ï‰)"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S09',
      type: 'write_practice',
      narration:
        'Agora escreva Î²Î»Î­Ï€Ï‰ cinco vezes na linha 4. Pronuncie: BLÃ‰P-o.',
      greekForm: 'Î²Î»Î­Ï€Ï‰',
      transliteration: 'blÃ©pÅ',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” Î²Î»Î­Ï€Ï‰',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S10',
      type: 'word_intro',
      narration:
        'Ï€Î¹ÏƒÏ„ÎµÏÏ‰ significa crer, confiar, comprometer-se. Ã‰ o verbo de Ï€Î¯ÏƒÏ„Î¹Ï‚ (fÃ©). Em JoÃ£o, Ï€Î¹ÏƒÏ„ÎµÏÏ‰ sempre pede comprometimento, nÃ£o apenas assentimento. JoÃ£o 3:16: "Para que todo aquele que nele crÃª nÃ£o pereÃ§a". Pronuncia-se pis-TEÃš-o.',
      greekForm: 'Ï€Î¹ÏƒÏ„ÎµÏÏ‰',
      transliteration: 'pisteÃºÅ',
      pronunciation: 'pis-TEÃš-o',
      translation: 'crer / confiar / comprometer-se',
      etymology:
        'O verbo de Ï€Î¯ÏƒÏ„Î¹Ï‚ (fÃ©); note: em JoÃ£o, Ï€Î¹ÏƒÏ„ÎµÏÏ‰ sempre pede comprometimento, nÃ£o apenas assentimento',
      contextVerse: 'JoÃ£o 3:16',
      contextVerseText:
        '"Para que todo aquele que nele crÃª (Ï€Î¹ÏƒÏ„ÎµÏÏ‰Î½) nÃ£o pereÃ§a"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S11',
      type: 'write_practice',
      narration:
        'Agora escreva Ï€Î¹ÏƒÏ„ÎµÏÏ‰ cinco vezes na linha 5. Pronuncie: pis-TEÃš-o.',
      greekForm: 'Ï€Î¹ÏƒÏ„ÎµÏÏ‰',
      transliteration: 'pisteÃºÅ',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” Ï€Î¹ÏƒÏ„ÎµÏÏ‰',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S12',
      type: 'pause',
      narration:
        'Ser, vir, ouvir, ver e crer â€” verbos que descrevem o discipulado. Releia estas palavras.',
      displayText:
        'Ser, vir, ouvir, ver e crer â€” verbos que descrevem o discipulado.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S13',
      type: 'dictation',
      narration: 'Escreva no papel: ser.',
      displayText: '"ser"',
      greekForm: 'Îµá¼°Î¼Î¯',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S14',
      type: 'dictation',
      narration: 'Escreva no papel: vir.',
      displayText: '"vir"',
      greekForm: 'á¼”ÏÏ‡Î¿Î¼Î±Î¹',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S15',
      type: 'dictation',
      narration: 'Escreva no papel: ouvir.',
      displayText: '"ouvir"',
      greekForm: 'á¼€ÎºÎ¿ÏÏ‰',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S16',
      type: 'dictation',
      narration: 'Escreva no papel: ver.',
      displayText: '"ver"',
      greekForm: 'Î²Î»Î­Ï€Ï‰',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S17',
      type: 'dictation',
      narration: 'Escreva no papel: crer.',
      displayText: '"crer"',
      greekForm: 'Ï€Î¹ÏƒÏ„ÎµÏÏ‰',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

