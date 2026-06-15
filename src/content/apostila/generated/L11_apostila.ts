/**
 * L11 â€” Tempo e Reino (Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î±, Î±á¼°ÏŽÎ½, á¼¡Î¼Î­ÏÎ±, Î½ÏÎ¾, á½¥ÏÎ±)
 *
 * ID:               apostila-L11
 * TÃTULO:           LiÃ§Ã£o 11 â€” Tempo e Reino
 * DESCRIÃ‡ÃƒO:        Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î±, Î±á¼°ÏŽÎ½, á¼¡Î¼Î­ÏÎ±, Î½ÏÎ¾, á½¥ÏÎ±
 * PDF_PAGE:         23
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L11: ApostilaLesson = {
  id: 'apostila-L11',
  lessonNumber: 11,
  title: 'LiÃ§Ã£o 11 â€” Tempo e Reino',
  description: 'Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î±, Î±á¼°ÏŽÎ½, á¼¡Î¼Î­ÏÎ±, Î½ÏÎ¾, á½¥ÏÎ±',
  apostilaPdfPage: 23,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 11 â€” Tempo e Reino. Hoje vamos aprender cinco palavras que estruturam o tempo e o propÃ³sito de Deus: basileÃ­a, aiÃ³n, hemÃ©ra, nÃ½x e hÃ³ra. Abra sua apostila na pÃ¡gina 23.',
      displayText: 'Abra sua apostila na PÃ¡gina 23',
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S02',
      type: 'word_intro',
      narration:
        'Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î± (basileÃ­a) â€” reino / reinado / soberania. Venha o teu reino, seja feita a tua vontade. De Î²Î±ÏƒÎ¹Î»ÎµÏÏ‚ (rei).',
      displayText: 'Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î± â€” Reino',
      greekForm: 'Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î±',
      transliteration: 'basileÃ­a',
      pronunciation: 'ba-si-LEI-a',
      translation: 'Reino / Reinado / Soberania',
      etymology:
        'De Î²Î±ÏƒÎ¹Î»ÎµÏÏ‚ (rei); implica tanto o ato de reinar quanto o territÃ³rio reinado',
      contextVerse: 'Mateus 6:10',
      contextVerseText:
        '"Venha o teu reino (Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î±), seja feita a tua vontade"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S03 â€” WRITE_PRACTICE: Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S03',
      type: 'write_practice',
      narration:
        'Agora escreva Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î± cinco vezes na linha 1. Pronuncie: ba-si-LEI-a.',
      displayText: 'Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î± Ã— 5',
      greekForm: 'Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î±',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S04 â€” WORD_INTRO: Î±á¼°ÏŽÎ½ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S04',
      type: 'word_intro',
      narration:
        'Î±á¼°ÏŽÎ½ (aiá¹“n) â€” era / eternidade / sÃ©culo. Acima de todo principado, nÃ£o sÃ³ neste sÃ©culo mas tambÃ©m no vindouro. Deu origem a "eon".',
      displayText: 'Î±á¼°ÏŽÎ½ â€” Era / Eternidade',
      greekForm: 'Î±á¼°ÏŽÎ½',
      transliteration: 'aiá¹“n',
      pronunciation: 'a-IÃ”N',
      translation: 'Era / Eternidade / SÃ©culo',
      etymology:
        'Deu origem a "eon"; no NT pode significar "esta era" vs "a era vindoura"',
      contextVerse: 'EfÃ©sios 1:21',
      contextVerseText:
        '"...acima de todo principado... nÃ£o sÃ³ neste sÃ©culo (Î±á¼°á¿¶Î½Î¹) mas tambÃ©m no vindouro"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S05 â€” WRITE_PRACTICE: Î±á¼°ÏŽÎ½ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S05',
      type: 'write_practice',
      narration:
        'Agora escreva Î±á¼°ÏŽÎ½ cinco vezes na linha 2. Pronuncie: a-IÃ”N.',
      displayText: 'Î±á¼°ÏŽÎ½ Ã— 5',
      greekForm: 'Î±á¼°ÏŽÎ½',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” Î±á¼°ÏŽÎ½',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” WORD_INTRO: á¼¡Î¼Î­ÏÎ± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S06',
      type: 'word_intro',
      narration:
        'á¼¡Î¼Î­ÏÎ± (hÄ“mÃ©ra) â€” dia. NÃ£o sÃ£o doze as horas do dia? A Septuaginta usa para o "Dia do Senhor".',
      displayText: 'á¼¡Î¼Î­ÏÎ± â€” Dia',
      greekForm: 'á¼¡Î¼Î­ÏÎ±',
      transliteration: 'hÄ“mÃ©ra',
      pronunciation: 'e-MÃ‰-ra',
      translation: 'Dia',
      etymology:
        'Raiz indo-europeia de calor/dia; a Septuaginta usa para o "Dia do Senhor" (×™×•Ö¹× ×™Ö°×”×•Ö¸×”)',
      contextVerse: 'JoÃ£o 11:9',
      contextVerseText:
        '"NÃ£o sÃ£o doze as horas do dia (á¼¡Î¼Î­ÏÎ±Ï‚)?"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: á¼¡Î¼Î­ÏÎ± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S07',
      type: 'write_practice',
      narration:
        'Agora escreva á¼¡Î¼Î­ÏÎ± cinco vezes na linha 3. Pronuncie: e-MÃ‰-ra.',
      displayText: 'á¼¡Î¼Î­ÏÎ± Ã— 5',
      greekForm: 'á¼¡Î¼Î­ÏÎ±',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” á¼¡Î¼Î­ÏÎ±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: Î½ÏÎ¾ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S08',
      type: 'word_intro',
      narration:
        'Î½ÏÎ¾ (nÃ½x) â€” noite. Este veio ter com Jesus de noite â€” Nicodemos, sÃ­mbolo de busca na escuridÃ£o. Deu origem a "noturno".',
      displayText: 'Î½ÏÎ¾ â€” Noite',
      greekForm: 'Î½ÏÎ¾',
      transliteration: 'nÃ½x',
      pronunciation: 'NÃKS',
      translation: 'Noite',
      etymology:
        'Deu origem a "noturno"; em JoÃ£o 3:2, Nicodemos vem Ã  noite â€” simbolismo intencional',
      contextVerse: 'JoÃ£o 3:2',
      contextVerseText:
        '"Este veio ter com Jesus de noite (Î½Ï…ÎºÏ„ÏŒÏ‚)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S09 â€” WRITE_PRACTICE: Î½ÏÎ¾ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S09',
      type: 'write_practice',
      narration:
        'Agora escreva Î½ÏÎ¾ cinco vezes na linha 4. Pronuncie: NÃKS.',
      displayText: 'Î½ÏÎ¾ Ã— 5',
      greekForm: 'Î½ÏÎ¾',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” Î½ÏÎ¾',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S10 â€” WORD_INTRO: á½¥ÏÎ± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S10',
      type: 'word_intro',
      narration:
        'á½¥ÏÎ± (há¹“ra) â€” hora / momento oportuno. Ainda nÃ£o Ã© chegada a minha hora. JoÃ£o 2:4 usa no sentido de momento certo.',
      displayText: 'á½¥ÏÎ± â€” Hora',
      greekForm: 'á½¥ÏÎ±',
      transliteration: 'há¹“ra',
      pronunciation: 'Ã”-ra',
      translation: 'Hora / Momento Oportuno',
      etymology:
        'NÃ£o apenas marcaÃ§Ã£o de tempo, mas "o momento certo"; JoÃ£o 2:4 usa este sentido',
      contextVerse: 'JoÃ£o 2:4',
      contextVerseText:
        '"Ainda nÃ£o Ã© chegada a minha hora (á½¥ÏÎ±)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S11 â€” WRITE_PRACTICE: á½¥ÏÎ± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S11',
      type: 'write_practice',
      narration:
        'Agora escreva á½¥ÏÎ± cinco vezes na linha 5. Pronuncie: Ã”-ra.',
      displayText: 'á½¥ÏÎ± Ã— 5',
      greekForm: 'á½¥ÏÎ±',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” á½¥ÏÎ±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S12',
      type: 'pause',
      narration:
        'VocÃª aprendeu palavras que falam do tempo e da eternidade. Reflita: o tempo foi criado por Deus para revelar o seu Reino.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
    },

    // â”€â”€â”€ S13 â€” DICTATION: Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S13',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'reino'.",
      displayText: 'reino',
      greekForm: 'Î²Î±ÏƒÎ¹Î»ÎµÎ¯Î±',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: Î±á¼°ÏŽÎ½ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S14',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'era/eternidade'.",
      displayText: 'era/eternidade',
      greekForm: 'Î±á¼°ÏŽÎ½',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: á¼¡Î¼Î­ÏÎ± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S15',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'dia'.",
      displayText: 'dia',
      greekForm: 'á¼¡Î¼Î­ÏÎ±',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: Î½ÏÎ¾ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S16',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'noite'.",
      displayText: 'noite',
      greekForm: 'Î½ÏÎ¾',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: á½¥ÏÎ± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L11-S17',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'hora'.",
      displayText: 'hora',
      greekForm: 'á½¥ÏÎ±',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

