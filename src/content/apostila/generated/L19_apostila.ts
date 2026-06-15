/**
 * L19 â€” Eu Sou o Caminho (JoÃ£o 14:6)
 *
 * ID:               apostila-L19
 * TÃTULO:           LiÃ§Ã£o 19 â€” Eu Sou o Caminho
 * DESCRIÃ‡ÃƒO:        JoÃ£o 14:6 â€” á¼Î³ÏŽ Îµá¼°Î¼Î¹ á¼¡ á½Î´á½¸Ï‚ ÎºÎ±á½¶ á¼¡ á¼€Î»Î®Î¸ÎµÎ¹Î± ÎºÎ±á½¶ á¼¡ Î¶Ï‰Î®
 * PDF_PAGE:         40
 * XP:               60
 * TEMPO:            18 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 11
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L19: ApostilaLesson = {
  id: 'apostila-L19',
  title: 'LiÃ§Ã£o 19 â€” Eu Sou o Caminho',
  description: 'JoÃ£o 14:6 â€” á¼Î³ÏŽ Îµá¼°Î¼Î¹ á¼¡ á½Î´á½¸Ï‚ ÎºÎ±á½¶ á¼¡ á¼€Î»Î®Î¸ÎµÎ¹Î± ÎºÎ±á½¶ á¼¡ Î¶Ï‰Î®',
  apostilaPdfPage: 40,
  lessonNumber: 19,
  xpReward: 60,
  estimatedMinutes: 18,
  requiresPrevious: true,

  steps: [
    {
      id: 'apostila-L19-S01',
      type: 'intro',
      narration:
        'JoÃ£o 14:6 â€” uma das sete declaraÃ§Ãµes "Eu Sou" de Jesus. Esta frase contÃ©m trÃªs predicados que definem Jesus. Abra sua apostila na pÃ¡gina 40.',
      displayText: 'Abra sua apostila na PÃ¡gina 40',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L19-S02',
      type: 'word_intro',
      narration:
        'á¼Î³ÏŽ â€” "eu". Em grego o pronome geralmente estÃ¡ oculto no verbo. Quando estÃ¡ explÃ­cito, como aqui, Ã© enfÃ¡tico.',
      greekForm: 'á¼Î³ÏŽ',
      transliteration: 'egÅ',
      pronunciation: 'e-GÃ”',
      translation: 'eu (enfÃ¡tico)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S03',
      type: 'word_intro',
      narration:
        'Îµá¼°Î¼Î¹ â€” "sou". Primeira pessoa de Îµá¼°Î¼Î¯. á¼˜Î³ÏŽ Îµá¼°Î¼Î¹ sÃ£o exatamente as palavras de ÃŠxodo 3:14 na Septuaginta â€” o tÃ­tulo divino.',
      greekForm: 'Îµá¼°Î¼Î¹',
      transliteration: 'eimi',
      pronunciation: 'ei-MÃ',
      translation: 'sou (1Âª singular de Îµá¼°Î¼Î¯)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S04',
      type: 'word_intro',
      narration:
        'á¼¡ á½Î´ÏŒÏ‚ â€” "o caminho". Substantivo feminino; nÃ£o apenas um caminho fÃ­sico, mas o modo de vida. O artigo á¼¡ Ã© o artigo feminino.',
      greekForm: 'á½Î´ÏŒÏ‚',
      transliteration: 'hodos',
      pronunciation: 'ho-DÃ“S',
      translation: 'caminho',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S05',
      type: 'word_intro',
      narration:
        'ÎºÎ±Î¯ â€” "e". A conjunÃ§Ã£o mais comum do NT, com cerca de 9.000 ocorrÃªncias.',
      greekForm: 'ÎºÎ±Î¯',
      transliteration: 'kai',
      pronunciation: 'cÃ¡-i',
      translation: 'e',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S06',
      type: 'word_intro',
      narration:
        'á¼¡ á¼€Î»Î®Î¸ÎµÎ¹Î± â€” "a verdade". VocÃª jÃ¡ aprendeu esta palavra na LiÃ§Ã£o 12.',
      greekForm: 'á¼€Î»Î®Î¸ÎµÎ¹Î±',
      transliteration: 'alÄ“theia',
      pronunciation: 'a-LÃŠ-tei-a',
      translation: 'verdade',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S07',
      type: 'word_intro',
      narration:
        'á¼¡ Î¶Ï‰Î® â€” "a vida". VocÃª jÃ¡ aprendeu na LiÃ§Ã£o 7. Vida em plenitude.',
      greekForm: 'Î¶Ï‰Î®',
      transliteration: 'zÅÄ“',
      pronunciation: 'zo-ÃŠ',
      translation: 'vida',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S08',
      type: 'pause',
      narration:
        'Esta frase tem 10 palavras. Leia-a devagar na apostila: egÅ eimi hÄ“ hodos kai hÄ“ alÄ“theia kai hÄ“ zÅÄ“.',
      displayText:
        'Leia a frase na pÃ¡gina 40.\ná¼Î³ÏŽ Îµá¼°Î¼Î¹ á¼¡ á½Î´á½¸Ï‚ ÎºÎ±á½¶ á¼¡ á¼€Î»Î®Î¸ÎµÎ¹Î± ÎºÎ±á½¶ á¼¡ Î¶Ï‰Î®',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L19-S09',
      type: 'write_practice',
      narration:
        'Agora copie a frase completa trÃªs vezes. Ã‰ a frase mais longa â€” vÃ¡ com calma.',
      greekForm: 'á¼Î³ÏŽ Îµá¼°Î¼Î¹ á¼¡ á½Î´á½¸Ï‚ ÎºÎ±á½¶ á¼¡ á¼€Î»Î®Î¸ÎµÎ¹Î± ÎºÎ±á½¶ á¼¡ Î¶Ï‰Î®',
      writeRepetitions: 3,
      writeInstruction: 'EspaÃ§o de cÃ³pia da apostila â€” frase completa',
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L19-S10',
      type: 'read_aloud',
      narration:
        'OuÃ§a: egÅ eimi hÄ“ hodos kai hÄ“ alÄ“theia kai hÄ“ zÅÄ“. Repita em voz alta duas vezes.',
      greekForm: 'á¼Î³ÏŽ Îµá¼°Î¼Î¹ á¼¡ á½Î´á½¸Ï‚ ÎºÎ±á½¶ á¼¡ á¼€Î»Î®Î¸ÎµÎ¹Î± ÎºÎ±á½¶ á¼¡ Î¶Ï‰Î®',
      transliteration: 'egÅ eimi hÄ“ hodos kai hÄ“ alÄ“theia kai hÄ“ zÅÄ“',
      translation: 'Eu sou o caminho, a verdade e a vida',
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S11',
      type: 'dictation',
      narration:
        'Escreva em grego: "Eu sou o caminho, a verdade e a vida".',
      displayText: '"Eu sou o caminho, a verdade e a vida"',
      greekForm: 'á¼Î³ÏŽ Îµá¼°Î¼Î¹ á¼¡ á½Î´á½¸Ï‚ ÎºÎ±á½¶ á¼¡ á¼€Î»Î®Î¸ÎµÎ¹Î± ÎºÎ±á½¶ á¼¡ Î¶Ï‰Î®',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

