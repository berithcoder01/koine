/**
 * L19 — Eu Sou o Caminho (João 14:6)
 *
 * ID:               apostila-L19
 * TÍTULO:           Lição 19 — Eu Sou o Caminho
 * DESCRIÇÃO:        João 14:6 — ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή
 * PDF_PAGE:         40
 * XP:               60
 * TEMPO:            18 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 11
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L19: ApostilaLesson = {
  id: 'apostila-L19',
  title: 'Lição 19 — Eu Sou o Caminho',
  description: 'João 14:6 — ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή',
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
        'João 14:6 — uma das sete declarações "Eu Sou" de Jesus. Esta frase contém três predicados que definem Jesus. Abra sua apostila na página 40.',
      displayText: 'Abra sua apostila na Página 40',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L19-S02',
      type: 'word_intro',
      narration:
        'ἐγώ — "eu". Em grego o pronome geralmente está oculto no verbo. Quando está explícito, como aqui, é enfático.',
      greekForm: 'ἐγώ',
      transliteration: 'egō',
      pronunciation: 'e-GÔ',
      translation: 'eu (enfático)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S03',
      type: 'word_intro',
      narration:
        'εἰμι — "sou". Primeira pessoa de εἰμί. Ἐγώ εἰμι são exatamente as palavras de Êxodo 3:14 na Septuaginta — o título divino.',
      greekForm: 'εἰμι',
      transliteration: 'eimi',
      pronunciation: 'ei-MÍ',
      translation: 'sou (1ª singular de εἰμί)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S04',
      type: 'word_intro',
      narration:
        'ἡ ὁδός — "o caminho". Substantivo feminino; não apenas um caminho físico, mas o modo de vida. O artigo ἡ é o artigo feminino.',
      greekForm: 'ὁδός',
      transliteration: 'hodos',
      pronunciation: 'ho-DÓS',
      translation: 'caminho',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S05',
      type: 'word_intro',
      narration:
        'καί — "e". A conjunção mais comum do NT, com cerca de 9.000 ocorrências.',
      greekForm: 'καί',
      transliteration: 'kai',
      pronunciation: 'cá-i',
      translation: 'e',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S06',
      type: 'word_intro',
      narration:
        'ἡ ἀλήθεια — "a verdade". Você já aprendeu esta palavra na Lição 12.',
      greekForm: 'ἀλήθεια',
      transliteration: 'alētheia',
      pronunciation: 'a-LÊ-tei-a',
      translation: 'verdade',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S07',
      type: 'word_intro',
      narration:
        'ἡ ζωή — "a vida". Você já aprendeu na Lição 7. Vida em plenitude.',
      greekForm: 'ζωή',
      transliteration: 'zōē',
      pronunciation: 'zo-Ê',
      translation: 'vida',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L19-S08',
      type: 'pause',
      narration:
        'Esta frase tem 10 palavras. Leia-a devagar na apostila: egō eimi hē hodos kai hē alētheia kai hē zōē.',
      displayText:
        'Leia a frase na página 40.\nἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L19-S09',
      type: 'write_practice',
      narration:
        'Agora copie a frase completa três vezes. É a frase mais longa — vá com calma.',
      greekForm: 'ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή',
      writeRepetitions: 3,
      writeInstruction: 'Espaço de cópia da apostila — frase completa',
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L19-S10',
      type: 'read_aloud',
      narration:
        'Ouça: egō eimi hē hodos kai hē alētheia kai hē zōē. Repita em voz alta duas vezes.',
      greekForm: 'ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή',
      transliteration: 'egō eimi hē hodos kai hē alētheia kai hē zōē',
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
      greekForm: 'ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

