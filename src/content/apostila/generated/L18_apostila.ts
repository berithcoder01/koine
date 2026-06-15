/**
 * L18 â€” Deus Ã© Amor (1 JoÃ£o 4:8b)
 *
 * ID:               apostila-L18
 * TÃTULO:           LiÃ§Ã£o 18 â€” Deus Ã© Amor
 * DESCRIÃ‡ÃƒO:        1 JoÃ£o 4:8b â€” á½ Î¸Îµá½¸Ï‚ á¼€Î³Î¬Ï€Î· á¼ÏƒÏ„Î¯Î½
 * PDF_PAGE:         38
 * XP:               60
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 9
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L18: ApostilaLesson = {
  id: 'apostila-L18',
  title: 'LiÃ§Ã£o 18 â€” Deus Ã© Amor',
  description: '1 JoÃ£o 4:8b â€” á½ Î¸Îµá½¸Ï‚ á¼€Î³Î¬Ï€Î· á¼ÏƒÏ„Î¯Î½',
  apostilaPdfPage: 38,
  lessonNumber: 18,
  xpReward: 60,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    {
      id: 'apostila-L18-S01',
      type: 'intro',
      narration:
        'JoÃ£o escreve trÃªs palavras: hÃ³ theÃ³s agÃ¡pÄ“ estÃ­n â€” Deus Ã© amor. Em apenas trÃªs palavras, o apÃ³stolo define a essÃªncia do Criador. Abra sua apostila na pÃ¡gina 38.',
      displayText: 'Abra sua apostila na PÃ¡gina 38',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L18-S02',
      type: 'word_intro',
      narration:
        'á½ Ã© o artigo â€” "o". Com Î¸ÎµÏŒÏ‚, indica que Ã© o Deus especÃ­fico de Israel, nÃ£o um deus qualquer.',
      greekForm: 'á½',
      transliteration: 'ho',
      pronunciation: 'hÃ´',
      translation: 'o (artigo)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S03',
      type: 'word_intro',
      narration:
        'Î¸ÎµÏŒÏ‚ significa Deus. VocÃª jÃ¡ aprendeu esta palavra na LiÃ§Ã£o 8.',
      greekForm: 'Î¸ÎµÏŒÏ‚',
      transliteration: 'theos',
      pronunciation: 'te-Ã“S',
      translation: 'Deus',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S04',
      type: 'word_intro',
      narration:
        'á¼€Î³Î¬Ï€Î· â€” amor incondicional. VocÃª jÃ¡ aprendeu na LiÃ§Ã£o 7. Note que nÃ£o tem artigo â€” JoÃ£o diz que a natureza de Deus Ã© amor.',
      greekForm: 'á¼€Î³Î¬Ï€Î·',
      transliteration: 'agapÄ“',
      pronunciation: 'a-GÃ-pe',
      translation: 'amor incondicional',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S05',
      type: 'word_intro',
      narration:
        'á¼ÏƒÏ„Î¯Î½ â€” "Ã©" â€” terceira pessoa do singular do presente de Îµá¼°Î¼Î¯.',
      greekForm: 'á¼ÏƒÏ„Î¯Î½',
      transliteration: 'estin',
      pronunciation: 'es-TÃN',
      translation: 'Ã© (3Âª singular de Îµá¼°Î¼Î¯)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S06',
      type: 'pause',
      narration:
        'Leia a frase na apostila e reflita: JoÃ£o nÃ£o diz que Deus tem amor â€” diz que Deus Ã© amor.',
      displayText:
        'Leia a frase na pÃ¡gina 38.\ná½ Î¸Îµá½¸Ï‚ á¼€Î³Î¬Ï€Î· á¼ÏƒÏ„Î¯Î½',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L18-S07',
      type: 'write_practice',
      narration:
        'Agora copie a frase completa trÃªs vezes no espaÃ§o da apostila.',
      greekForm: 'á½ Î¸Îµá½¸Ï‚ á¼€Î³Î¬Ï€Î· á¼ÏƒÏ„Î¯Î½',
      writeRepetitions: 3,
      writeInstruction: 'EspaÃ§o de cÃ³pia da apostila â€” frase completa',
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L18-S08',
      type: 'read_aloud',
      narration:
        'OuÃ§a a frase: ho theos agapÄ“ estin. Agora repita em voz alta comigo. Leia duas vezes.',
      greekForm: 'á½ Î¸Îµá½¸Ï‚ á¼€Î³Î¬Ï€Î· á¼ÏƒÏ„Î¯Î½',
      transliteration: 'ho theos agapÄ“ estin',
      translation: 'Deus Ã© amor',
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S09',
      type: 'dictation',
      narration: 'Escreva em grego: "Deus Ã© amor".',
      displayText: '"Deus Ã© amor"',
      greekForm: 'á½ Î¸Îµá½¸Ï‚ á¼€Î³Î¬Ï€Î· á¼ÏƒÏ„Î¯Î½',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

