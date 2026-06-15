/**
 * L12 â€” Conhecer e Ver (Î³Î¹Î½ÏŽÏƒÎºÏ‰, Î¿á¼¶Î´Î±, ÏƒÎ¿Ï†Î¯Î±, á¼€Î»Î®Î¸ÎµÎ¹Î±, Ï†á¿¶Ï‚)
 *
 * ID:               apostila-L12
 * TÃTULO:           LiÃ§Ã£o 12 â€” Conhecer e Ver
 * DESCRIÃ‡ÃƒO:        Î³Î¹Î½ÏŽÏƒÎºÏ‰, Î¿á¼¶Î´Î±, ÏƒÎ¿Ï†Î¯Î±, á¼€Î»Î®Î¸ÎµÎ¹Î±, Ï†á¿¶Ï‚
 * PDF_PAGE:         25
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L12: ApostilaLesson = {
  id: 'apostila-L12',
  lessonNumber: 12,
  title: 'LiÃ§Ã£o 12 â€” Conhecer e Ver',
  description: 'Î³Î¹Î½ÏŽÏƒÎºÏ‰, Î¿á¼¶Î´Î±, ÏƒÎ¿Ï†Î¯Î±, á¼€Î»Î®Î¸ÎµÎ¹Î±, Ï†á¿¶Ï‚',
  apostilaPdfPage: 25,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 12 â€” Conhecer e ver. Hoje vocÃª vai aprender palavras sobre conhecimento e luz: ginÃ³sko, oÃ­da, sofÃ­a, alÃ©theia e fÃ³s. Elas nos ensinam como conhecemos a Deus. Abra sua apostila na pÃ¡gina 25.',
      displayText: 'Abra sua apostila na PÃ¡gina 25',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: Î³Î¹Î½ÏŽÏƒÎºÏ‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S02',
      type: 'word_intro',
      narration:
        'Î³Î¹Î½ÏŽÏƒÎºÏ‰, conhecer por experiÃªncia. Em JoÃ£o 10:14, Jesus declara: "Eu conheÃ§o (Î³Î¹Î½ÏŽÏƒÎºÏ‰) as minhas ovelhas, e elas me conhecem."',
      greekForm: 'Î³Î¹Î½ÏŽÏƒÎºÏ‰',
      transliteration: 'giná¹“skÅ',
      pronunciation: 'gi-NÃ”S-ko',
      translation: 'conhecer por experiÃªncia',
      etymology:
        'Conhecimento adquirido por experiÃªncia pessoal; em JoÃ£o 10:14 Ã© o conhecimento mÃºtuo do pastor e ovelhas',
      contextVerse: 'JoÃ£o 10:14',
      contextVerseText:
        '"Eu conheÃ§o (Î³Î¹Î½ÏŽÏƒÎºÏ‰) as minhas ovelhas, e elas me conhecem"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S03 â€” WRITE_PRACTICE: Î³Î¹Î½ÏŽÏƒÎºÏ‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S03',
      type: 'write_practice',
      narration:
        'Agora escreva Î³Î¹Î½ÏŽÏƒÎºÏ‰ cinco vezes na linha 1. Pronuncie: gi-NÃ”S-ko.',
      greekForm: 'Î³Î¹Î½ÏŽÏƒÎºÏ‰',
      transliteration: 'giná¹“skÅ',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” Î³Î¹Î½ÏŽÏƒÎºÏ‰',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S04 â€” WORD_INTRO: Î¿á¼¶Î´Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S04',
      type: 'word_intro',
      narration:
        'Î¿á¼¶Î´Î±, saber por percepÃ§Ã£o. Em JoÃ£o 3:2, Nicodemos diz: "Sabemos (Î¿á¼´Î´Î±Î¼ÎµÎ½) que Ã©s Mestre vindo de Deus."',
      greekForm: 'Î¿á¼¶Î´Î±',
      transliteration: 'oÃ®da',
      pronunciation: 'Ã”i-da',
      translation: 'saber por percepÃ§Ã£o / revelaÃ§Ã£o',
      etymology:
        'Perfeito com sentido presente; literalmente "tenho visto e portanto sei"',
      contextVerse: 'JoÃ£o 3:2',
      contextVerseText:
        '"Rabbi, sabemos (Î¿á¼´Î´Î±Î¼ÎµÎ½) que Ã©s Mestre vindo de Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S05 â€” WRITE_PRACTICE: Î¿á¼¶Î´Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S05',
      type: 'write_practice',
      narration:
        'Agora escreva Î¿á¼¶Î´Î± cinco vezes na linha 2. Pronuncie: Ã”i-da.',
      greekForm: 'Î¿á¼¶Î´Î±',
      transliteration: 'oÃ®da',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” Î¿á¼¶Î´Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” WORD_INTRO: ÏƒÎ¿Ï†Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S06',
      type: 'word_intro',
      narration:
        'ÏƒÎ¿Ï†Î¯Î±, sabedoria. Em 1 CorÃ­ntios 1:24, Paulo declara: "Cristo, poder de Deus e sabedoria (ÏƒÎ¿Ï†Î¯Î±) de Deus."',
      greekForm: 'ÏƒÎ¿Ï†Î¯Î±',
      transliteration: 'sophÃ­a',
      pronunciation: 'so-FÃ-a',
      translation: 'sabedoria',
      etymology:
        'DistinÃ§Ã£o do NT: a sabedoria de Deus vs a sabedoria do mundo (1 Cor 1:18-25)',
      contextVerse: '1 CorÃ­ntios 1:24',
      contextVerseText:
        '"Cristo, poder de Deus e sabedoria (ÏƒÎ¿Ï†Î¯Î±) de Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: ÏƒÎ¿Ï†Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S07',
      type: 'write_practice',
      narration:
        'Agora escreva ÏƒÎ¿Ï†Î¯Î± cinco vezes na linha 3. Pronuncie: so-FÃ-a.',
      greekForm: 'ÏƒÎ¿Ï†Î¯Î±',
      transliteration: 'sophÃ­a',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” ÏƒÎ¿Ï†Î¯Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: á¼€Î»Î®Î¸ÎµÎ¹Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S08',
      type: 'word_intro',
      narration:
        'á¼€Î»Î®Î¸ÎµÎ¹Î±, verdade. Em JoÃ£o 8:32: "E conhecereis a verdade (á¼€Î»Î®Î¸ÎµÎ¹Î±), e a verdade vos libertarÃ¡."',
      greekForm: 'á¼€Î»Î®Î¸ÎµÎ¹Î±',
      transliteration: 'alá¸—theia',
      pronunciation: 'a-LÃŠ-tei-a',
      translation: 'verdade',
      etymology:
        'Î± (negaÃ§Ã£o) + Î»Î®Î¸Î· (esquecimento, ocultamento); o que nÃ£o estÃ¡ oculto, a realidade revelada',
      contextVerse: 'JoÃ£o 8:32',
      contextVerseText:
        '"E conhecereis a verdade (á¼€Î»Î®Î¸ÎµÎ¹Î±), e a verdade vos libertarÃ¡"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S09 â€” WRITE_PRACTICE: á¼€Î»Î®Î¸ÎµÎ¹Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S09',
      type: 'write_practice',
      narration:
        'Agora escreva á¼€Î»Î®Î¸ÎµÎ¹Î± cinco vezes na linha 4. Pronuncie: a-LÃŠ-tei-a.',
      greekForm: 'á¼€Î»Î®Î¸ÎµÎ¹Î±',
      transliteration: 'alá¸—theia',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” á¼€Î»Î®Î¸ÎµÎ¹Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S10 â€” WORD_INTRO: Ï†á¿¶Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S10',
      type: 'word_intro',
      narration:
        'Ï†á¿¶Ï‚, luz. Em JoÃ£o 1:5: "A luz (Ï†á¿¶Ï‚) resplandece nas trevas, e as trevas nÃ£o a compreenderam."',
      greekForm: 'Ï†á¿¶Ï‚',
      transliteration: 'phÅs',
      pronunciation: 'FÃ”S',
      translation: 'luz',
      etymology:
        'Em JoÃ£o 1:5, Ï†á¿¶Ï‚ Ã© usado para o prÃ³prio Cristo; raiz de "fotossÃ­ntese" e "fotografia"',
      contextVerse: 'JoÃ£o 1:5',
      contextVerseText:
        '"A luz (Ï†á¿¶Ï‚) resplandece nas trevas, e as trevas nÃ£o a compreenderam"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S11 â€” WRITE_PRACTICE: Ï†á¿¶Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S11',
      type: 'write_practice',
      narration:
        'Agora escreva Ï†á¿¶Ï‚ cinco vezes na linha 5. Pronuncie: FÃ”S.',
      greekForm: 'Ï†á¿¶Ï‚',
      transliteration: 'phÅs',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” Ï†á¿¶Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S12',
      type: 'pause',
      narration:
        'Conhecimento, sabedoria, verdade e luz â€” palavras que descrevem Jesus. Releia o que escreveu.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S13 â€” DICTATION: Î³Î¹Î½ÏŽÏƒÎºÏ‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S13',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "conhecer".',
      displayText: '"conhecer"',
      greekForm: 'Î³Î¹Î½ÏŽÏƒÎºÏ‰',
      translation: 'conhecer',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: Î¿á¼¶Î´Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S14',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "saber".',
      displayText: '"saber"',
      greekForm: 'Î¿á¼¶Î´Î±',
      translation: 'saber',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: ÏƒÎ¿Ï†Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S15',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "sabedoria".',
      displayText: '"sabedoria"',
      greekForm: 'ÏƒÎ¿Ï†Î¯Î±',
      translation: 'sabedoria',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: á¼€Î»Î®Î¸ÎµÎ¹Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S16',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "verdade".',
      displayText: '"verdade"',
      greekForm: 'á¼€Î»Î®Î¸ÎµÎ¹Î±',
      translation: 'verdade',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: Ï†á¿¶Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L12-S17',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "luz".',
      displayText: '"luz"',
      greekForm: 'Ï†á¿¶Ï‚',
      translation: 'luz',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

