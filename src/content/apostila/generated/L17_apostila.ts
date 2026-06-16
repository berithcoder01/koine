/**
 * L17 — No Princípio Era o Verbo (João 1:1a)
 *
 * ID:               apostila-L17
 * TÍTULO:           Lição 17 — No Princípio Era o Verbo
 * DESCRIÇÃO:        João 1:1a — ἐν ἀρχῇ ἦν ὁ λόγος
 * PDF_PAGE:         36
 * XP:               60
 * TEMPO:            15 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 10
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L17: ApostilaLesson = {
  id: 'apostila-L17',
  title: 'Lição 17 — No Princípio Era o Verbo',
  description: 'João 1:1a — ἐν ἀρχῇ ἦν ὁ λόγος',
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
        'Esta é a frase mais poderosa do Novo Testamento. João 1:1. Vinte séculos atrás, um pescador da Galileia escreveu estas seis palavras em grego e mudou a teologia para sempre. Hoje você vai aprender a lê-las e escrevê-las. Abra sua apostila na página 36.',
      displayText: 'Abra sua apostila na Página 36',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L17-S02',
      type: 'word_intro',
      narration:
        'ἐν é uma preposição que significa "em" ou "dentro de". É uma das palavras mais comuns do grego, aparecendo milhares de vezes no NT.',
      greekForm: 'ἐν',
      transliteration: 'en',
      pronunciation: 'en',
      translation: 'em / dentro de',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S03',
      type: 'word_intro',
      narration:
        'ἀρχῇ significa princípio, origem. Em grego clássico, ἀρχή também significa "governo" ou "autoridade". A raiz aparece em palavras como "arcaico" e "arcanjo".',
      greekForm: 'ἀρχῇ',
      transliteration: 'archē',
      pronunciation: 'ar-CHÊ',
      translation: 'princípio / origem',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S04',
      type: 'word_intro',
      narration:
        'ἦν é o imperfeito do verbo ser. Em grego, o imperfeito descreve uma ação que estava em andamento no passado, sem começo nem fim. João não escreveu "o Verbo foi criado", mas "o Verbo ERA".',
      greekForm: 'ἦν',
      transliteration: 'ēn',
      pronunciation: 'ên',
      translation: 'era (imperfeito de εἰμί)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S05',
      type: 'word_intro',
      narration:
        'ὁ é o artigo definido masculino singular. Indica que λόγος é específico e singular — não "uma" palavra, mas "A" Palavra.',
      greekForm: 'ὁ',
      transliteration: 'ho',
      pronunciation: 'hô',
      translation: 'o (artigo definido)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S06',
      type: 'word_intro',
      narration:
        'λόγος — a palavra mais teológica do grego. Significa palavra, mas também razão e discurso. João estava dizendo que Jesus é a própria razão de existir do universo.',
      greekForm: 'λόγος',
      transliteration: 'logos',
      pronunciation: 'LÓ-gos',
      translation: 'Verbo / Palavra',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S07',
      type: 'pause',
      narration:
        'Agora leia a frase completa no topo da página 36: ἐν ἀρχῇ ἦν ὁ λόγος. Você acabou de aprender cada palavra. Agora junte-as: "No princípio era o Verbo".',
      displayText:
        'Leia a frase completa na página 36.\nἐν ἀρχῇ ἦν ὁ λόγος',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L17-S08',
      type: 'write_practice',
      narration:
        'Agora copie a frase completa três vezes no espaço da apostila. Escreva devagar, prestando atenção em cada letra.',
      greekForm: 'ἐν ἀρχῇ ἦν ὁ λόγος',
      writeRepetitions: 3,
      writeInstruction: 'Espaço de cópia da apostila — frase completa',
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L17-S09',
      type: 'read_aloud',
      narration:
        'Ouça a frase completa: en archē ēn ho logos. Agora repita em voz alta comigo. Leia duas vezes.',
      greekForm: 'ἐν ἀρχῇ ἦν ὁ λόγος',
      transliteration: 'en archē ēn ho logos',
      translation: 'No princípio era o Verbo',
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L17-S10',
      type: 'dictation',
      narration:
        'Escreva em grego: "No princípio era o Verbo".',
      displayText: '"No princípio era o Verbo"',
      greekForm: 'ἐν ἀρχῇ ἦν ὁ λόγος',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

