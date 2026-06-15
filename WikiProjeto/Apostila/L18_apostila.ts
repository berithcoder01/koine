/**
 * L18 — Deus é Amor (1 João 4:8b)
 *
 * ID:               apostila-L18
 * TÍTULO:           Lição 18 — Deus é Amor
 * DESCRIÇÃO:        1 João 4:8b — ὁ θεὸς ἀγάπη ἐστίν
 * PDF_PAGE:         38
 * XP:               60
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 9
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L18: ApostilaLesson = {
  id: 'apostila-L18',
  title: 'Lição 18 — Deus é Amor',
  description: '1 João 4:8b — ὁ θεὸς ἀγάπη ἐστίν',
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
        'João escreve três palavras: hó theós agápē estín — Deus é amor. Em apenas três palavras, o apóstolo define a essência do Criador. Abra sua apostila na página 38.',
      displayText: 'Abra sua apostila na Página 38',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L18-S02',
      type: 'word_intro',
      narration:
        'ὁ é o artigo — "o". Com θεός, indica que é o Deus específico de Israel, não um deus qualquer.',
      greekForm: 'ὁ',
      transliteration: 'ho',
      pronunciation: 'hô',
      translation: 'o (artigo)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S03',
      type: 'word_intro',
      narration:
        'θεός significa Deus. Você já aprendeu esta palavra na Lição 8.',
      greekForm: 'θεός',
      transliteration: 'theos',
      pronunciation: 'te-ÓS',
      translation: 'Deus',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S04',
      type: 'word_intro',
      narration:
        'ἀγάπη — amor incondicional. Você já aprendeu na Lição 7. Note que não tem artigo — João diz que a natureza de Deus é amor.',
      greekForm: 'ἀγάπη',
      transliteration: 'agapē',
      pronunciation: 'a-GÁ-pe',
      translation: 'amor incondicional',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S05',
      type: 'word_intro',
      narration:
        'ἐστίν — "é" — terceira pessoa do singular do presente de εἰμί.',
      greekForm: 'ἐστίν',
      transliteration: 'estin',
      pronunciation: 'es-TÍN',
      translation: 'é (3ª singular de εἰμί)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S06',
      type: 'pause',
      narration:
        'Leia a frase na apostila e reflita: João não diz que Deus tem amor — diz que Deus é amor.',
      displayText:
        'Leia a frase na página 38.\nὁ θεὸς ἀγάπη ἐστίν',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L18-S07',
      type: 'write_practice',
      narration:
        'Agora copie a frase completa três vezes no espaço da apostila.',
      greekForm: 'ὁ θεὸς ἀγάπη ἐστίν',
      writeRepetitions: 3,
      writeInstruction: 'Espaço de cópia da apostila — frase completa',
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L18-S08',
      type: 'read_aloud',
      narration:
        'Ouça a frase: ho theos agapē estin. Agora repita em voz alta comigo. Leia duas vezes.',
      greekForm: 'ὁ θεὸς ἀγάπη ἐστίν',
      transliteration: 'ho theos agapē estin',
      translation: 'Deus é amor',
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L18-S09',
      type: 'dictation',
      narration: 'Escreva em grego: "Deus é amor".',
      displayText: '"Deus é amor"',
      greekForm: 'ὁ θεὸς ἀγάπη ἐστίν',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
