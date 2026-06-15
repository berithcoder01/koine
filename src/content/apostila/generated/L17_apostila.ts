/**
 * L17 â€” No PrincÃ­pio Era o Verbo (JoÃ£o 1:1a)
 *
 * ID:               apostila-L17
 * TÃTULO:           LiÃ§Ã£o 17 â€” No PrincÃ­pio Era o Verbo
 * DESCRIÃ‡ÃƒO:        JoÃ£o 1:1a â€” á¼Î½ á¼€ÏÏ‡á¿‡ á¼¦Î½ á½ Î»ÏŒÎ³Î¿Ï‚
 * PDF_PAGE:         36
 * XP:               60
 * TEMPO:            15 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 10
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L17: ApostilaLesson = {
  id: 'apostila-L17',
  title: 'LiÃ§Ã£o 17 â€” No PrincÃ­pio Era o Verbo',
  description: 'JoÃ£o 1:1a â€” á¼Î½ á¼€ÏÏ‡á¿‡ á¼¦Î½ á½ Î»ÏŒÎ³Î¿Ï‚',
  apostilaPdfPage: 36,
  lessonNumber: 17,
  xpReward: 60,
  estimatedMinutes: 15,
  requiresPrevious: true,

  steps: [
    {
      id: 'apostila-L17-S01',
      type: 'intro',
      narration:
        'Esta Ã© a frase mais poderosa do Novo Testamento. JoÃ£o 1:1. Vinte sÃ©culos atrÃ¡s, um pescador da Galileia escreveu estas seis palavras em grego e mudou a teologia para sempre. Hoje vocÃª vai aprender a lÃª-las e escrevÃª-las. Abra sua apostila na pÃ¡gina 36.',
      displayText: 'Abra sua apostila na PÃ¡gina 36',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L17-S02',
      type: 'word_intro',
      narration:
        'á¼Î½ Ã© uma preposiÃ§Ã£o que significa "em" ou "dentro de". Ã‰ uma das palavras mais comuns do grego, aparecendo milhares de vezes no NT.',
      greekForm: 'á¼Î½',
      transliteration: 'en',
      pronunciation: 'en',
      translation: 'em / dentro de',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S03',
      type: 'word_intro',
      narration:
        'á¼€ÏÏ‡á¿‡ significa princÃ­pio, origem. Em grego clÃ¡ssico, á¼€ÏÏ‡Î® tambÃ©m significa "governo" ou "autoridade". A raiz aparece em palavras como "arcaico" e "arcanjo".',
      greekForm: 'á¼€ÏÏ‡á¿‡',
      transliteration: 'archÄ“',
      pronunciation: 'ar-CHÃŠ',
      translation: 'princÃ­pio / origem',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S04',
      type: 'word_intro',
      narration:
        'á¼¦Î½ Ã© o imperfeito do verbo ser. Em grego, o imperfeito descreve uma aÃ§Ã£o que estava em andamento no passado, sem comeÃ§o nem fim. JoÃ£o nÃ£o escreveu "o Verbo foi criado", mas "o Verbo ERA".',
      greekForm: 'á¼¦Î½',
      transliteration: 'Ä“n',
      pronunciation: 'Ãªn',
      translation: 'era (imperfeito de Îµá¼°Î¼Î¯)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S05',
      type: 'word_intro',
      narration:
        'á½ Ã© o artigo definido masculino singular. Indica que Î»ÏŒÎ³Î¿Ï‚ Ã© especÃ­fico e singular â€” nÃ£o "uma" palavra, mas "A" Palavra.',
      greekForm: 'á½',
      transliteration: 'ho',
      pronunciation: 'hÃ´',
      translation: 'o (artigo definido)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S06',
      type: 'word_intro',
      narration:
        'Î»ÏŒÎ³Î¿Ï‚ â€” a palavra mais teolÃ³gica do grego. Significa palavra, mas tambÃ©m razÃ£o e discurso. JoÃ£o estava dizendo que Jesus Ã© a prÃ³pria razÃ£o de existir do universo.',
      greekForm: 'Î»ÏŒÎ³Î¿Ï‚',
      transliteration: 'logos',
      pronunciation: 'LÃ“-gos',
      translation: 'Verbo / Palavra',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S07',
      type: 'pause',
      narration:
        'Agora leia a frase completa no topo da pÃ¡gina 36: á¼Î½ á¼€ÏÏ‡á¿‡ á¼¦Î½ á½ Î»ÏŒÎ³Î¿Ï‚. VocÃª acabou de aprender cada palavra. Agora junte-as: "No princÃ­pio era o Verbo".',
      displayText:
        'Leia a frase completa na pÃ¡gina 36.\ná¼Î½ á¼€ÏÏ‡á¿‡ á¼¦Î½ á½ Î»ÏŒÎ³Î¿Ï‚',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L17-S08',
      type: 'write_practice',
      narration:
        'Agora copie a frase completa trÃªs vezes no espaÃ§o da apostila. Escreva devagar, prestando atenÃ§Ã£o em cada letra.',
      greekForm: 'á¼Î½ á¼€ÏÏ‡á¿‡ á¼¦Î½ á½ Î»ÏŒÎ³Î¿Ï‚',
      writeRepetitions: 3,
      writeInstruction: 'EspaÃ§o de cÃ³pia da apostila â€” frase completa',
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L17-S09',
      type: 'read_aloud',
      narration:
        'OuÃ§a a frase completa: en archÄ“ Ä“n ho logos. Agora repita em voz alta comigo. Leia duas vezes.',
      greekForm: 'á¼Î½ á¼€ÏÏ‡á¿‡ á¼¦Î½ á½ Î»ÏŒÎ³Î¿Ï‚',
      transliteration: 'en archÄ“ Ä“n ho logos',
      translation: 'No princÃ­pio era o Verbo',
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S10',
      type: 'dictation',
      narration:
        'Escreva em grego: "No princÃ­pio era o Verbo".',
      displayText: '"No princÃ­pio era o Verbo"',
      greekForm: 'á¼Î½ á¼€ÏÏ‡á¿‡ á¼¦Î½ á½ Î»ÏŒÎ³Î¿Ï‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

