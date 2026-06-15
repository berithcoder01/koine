/**
 * L15 â€” O Mundo Criado (ÎºÏŒÏƒÎ¼Î¿Ï‚, Î¿á½ÏÎ±Î½ÏŒÏ‚, Î³á¿†, á½•Î´Ï‰Ï, á¼„ÏÏ„Î¿Ï‚)
 *
 * ID:               apostila-L15
 * TÃTULO:           LiÃ§Ã£o 15 â€” O Mundo Criado
 * DESCRIÃ‡ÃƒO:        ÎºÏŒÏƒÎ¼Î¿Ï‚, Î¿á½ÏÎ±Î½ÏŒÏ‚, Î³á¿†, á½•Î´Ï‰Ï, á¼„ÏÏ„Î¿Ï‚
 * PDF_PAGE:         31
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L15: ApostilaLesson = {
  id: 'apostila-L15',
  title: 'LiÃ§Ã£o 15 â€” O Mundo Criado',
  description: 'ÎºÏŒÏƒÎ¼Î¿Ï‚, Î¿á½ÏÎ±Î½ÏŒÏ‚, Î³á¿†, á½•Î´Ï‰Ï, á¼„ÏÏ„Î¿Ï‚',
  apostilaPdfPage: 31,
  lessonNumber: 15,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    {
      id: 'apostila-L15-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 15 â€” O mundo criado. Hoje vamos aprender palavras que descrevem a criaÃ§Ã£o de Deus: kosmos, ouranÃ³s, gÃª, hydor e artos. Abra sua apostila na pÃ¡gina 31.',
      displayText: 'Abra sua apostila na PÃ¡gina 31',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S02',
      type: 'word_intro',
      narration:
        'ÎºÏŒÏƒÎ¼Î¿Ï‚ significa mundo, ordem, universo. Originalmente significava "ordem" ou "adorno" â€” deu origem a "cosmÃ©tico" e "cosmos". Em JoÃ£o 3:16, lemos: "Porque Deus amou o mundo de tal maneira". Pronuncia-se KÃ“S-mos.',
      greekForm: 'ÎºÏŒÏƒÎ¼Î¿Ï‚',
      transliteration: 'kÃ³smos',
      pronunciation: 'KÃ“S-mos',
      translation: 'mundo / ordem / universo',
      etymology:
        'Originalmente "ordem" ou "adorno"; deu origem a "cosmÃ©tico" e "cosmos"',
      contextVerse: 'JoÃ£o 3:16',
      contextVerseText:
        '"Porque Deus amou o mundo (ÎºÏŒÏƒÎ¼Î¿Î½) de tal maneira"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S03',
      type: 'write_practice',
      narration:
        'Agora escreva ÎºÏŒÏƒÎ¼Î¿Ï‚ cinco vezes na linha 1. Pronuncie: KÃ“S-mos.',
      greekForm: 'ÎºÏŒÏƒÎ¼Î¿Ï‚',
      transliteration: 'kÃ³smos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” ÎºÏŒÏƒÎ¼Î¿Ï‚',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S04',
      type: 'word_intro',
      narration:
        'Î¿á½ÏÎ±Î½ÏŒÏ‚ significa cÃ©u, morada divina. Deu nome ao planeta Urano. Em Mateus 6:9, oramos: "Pai nosso que estÃ¡s nos cÃ©us". Pronuncia-se ou-ra-NÃ“S.',
      greekForm: 'Î¿á½ÏÎ±Î½ÏŒÏ‚',
      transliteration: 'ouranÃ³s',
      pronunciation: 'ou-ra-NÃ“S',
      translation: 'cÃ©u / morada divina',
      etymology:
        'Deu nome ao planeta Urano; em hebraico ×©Ö¸××žÖ·×™Ö´× (shamayim) tem raiz de "lÃ¡ em cima"',
      contextVerse: 'Mateus 6:9',
      contextVerseText:
        '"Pai nosso que estÃ¡s nos cÃ©us (Î¿á½ÏÎ±Î½Î¿á¿–Ï‚)"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S05',
      type: 'write_practice',
      narration:
        'Agora escreva Î¿á½ÏÎ±Î½ÏŒÏ‚ cinco vezes na linha 2. Pronuncie: ou-ra-NÃ“S.',
      greekForm: 'Î¿á½ÏÎ±Î½ÏŒÏ‚',
      transliteration: 'ouranÃ³s',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” Î¿á½ÏÎ±Î½ÏŒÏ‚',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S06',
      type: 'word_intro',
      narration:
        'Î³á¿† significa terra, solo, paÃ­s. Deu origem a "geografia" e "geologia". Em Mateus 5:5, Jesus diz: "Bem-aventurados os mansos, porque eles herdarÃ£o a terra". Pronuncia-se GÃŠ.',
      greekForm: 'Î³á¿†',
      transliteration: 'gÄ“',
      pronunciation: 'GÃŠ',
      translation: 'terra / solo / paÃ­s',
      etymology:
        'Deu origem a "geografia" e "geologia"; a Gaia da mitologia grega',
      contextVerse: 'Mateus 5:5',
      contextVerseText:
        '"Bem-aventurados os mansos, porque eles herdarÃ£o a terra (Î³á¿†Î½)"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S07',
      type: 'write_practice',
      narration:
        'Agora escreva Î³á¿† cinco vezes na linha 3. Pronuncie: GÃŠ.',
      greekForm: 'Î³á¿†',
      transliteration: 'gÄ“',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” Î³á¿†',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S08',
      type: 'word_intro',
      narration:
        'á½•Î´Ï‰Ï significa Ã¡gua. Deu origem a "hidrÃ¡ulica" e "hidrogÃªnio". Em JoÃ£o 4:14, Jesus promete Ã¡gua viva. Pronuncia-se HÃ-dor.',
      greekForm: 'á½•Î´Ï‰Ï',
      transliteration: 'hÃ½dÅr',
      pronunciation: 'HÃ-dor',
      translation: 'Ã¡gua',
      etymology:
        'Deu origem a "hidrÃ¡ulica" e "hidrogÃªnio"; em JoÃ£o 4:14, Jesus promete Ã¡gua viva (Î¶á¿¶Î½)',
      contextVerse: 'JoÃ£o 4:14',
      contextVerseText:
        '"Aquele que beber da Ã¡gua (á½•Î´Ï‰Ï) que eu lhe der nunca mais terÃ¡ sede"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S09',
      type: 'write_practice',
      narration:
        'Agora escreva á½•Î´Ï‰Ï cinco vezes na linha 4. Pronuncie: HÃ-dor.',
      greekForm: 'á½•Î´Ï‰Ï',
      transliteration: 'hÃ½dÅr',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” á½•Î´Ï‰Ï',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S10',
      type: 'word_intro',
      narration:
        'á¼„ÏÏ„Î¿Ï‚ significa pÃ£o, alimento. Em JoÃ£o 6:35, Jesus se declara á½ á¼„ÏÏ„Î¿Ï‚ Ï„á¿†Ï‚ Î¶Ï‰á¿†Ï‚ â€” o pÃ£o da vida. Pronuncia-se ÃR-tos.',
      greekForm: 'á¼„ÏÏ„Î¿Ï‚',
      transliteration: 'Ã¡rtos',
      pronunciation: 'ÃR-tos',
      translation: 'pÃ£o / alimento',
      etymology:
        'Em JoÃ£o 6:35, Jesus se declara á½ á¼„ÏÏ„Î¿Ï‚ Ï„á¿†Ï‚ Î¶Ï‰á¿†Ï‚ â€” o pÃ£o da vida; referÃªncia ao manÃ¡',
      contextVerse: 'JoÃ£o 6:35',
      contextVerseText:
        '"Eu sou o pÃ£o (á¼„ÏÏ„Î¿Ï‚) da vida"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S11',
      type: 'write_practice',
      narration:
        'Agora escreva á¼„ÏÏ„Î¿Ï‚ cinco vezes na linha 5. Pronuncie: ÃR-tos.',
      greekForm: 'á¼„ÏÏ„Î¿Ï‚',
      transliteration: 'Ã¡rtos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” á¼„ÏÏ„Î¿Ï‚',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S12',
      type: 'pause',
      narration:
        'CÃ©us, terra, Ã¡gua, pÃ£o â€” o mundo criado aponta para o Criador. Releia estas palavras.',
      displayText:
        'CÃ©us, terra, Ã¡gua, pÃ£o â€” o mundo criado aponta para o Criador.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S13',
      type: 'dictation',
      narration: 'Escreva no papel: mundo.',
      displayText: '"mundo"',
      greekForm: 'ÎºÏŒÏƒÎ¼Î¿Ï‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S14',
      type: 'dictation',
      narration: 'Escreva no papel: cÃ©u.',
      displayText: '"cÃ©u"',
      greekForm: 'Î¿á½ÏÎ±Î½ÏŒÏ‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S15',
      type: 'dictation',
      narration: 'Escreva no papel: terra.',
      displayText: '"terra"',
      greekForm: 'Î³á¿†',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S16',
      type: 'dictation',
      narration: 'Escreva no papel: Ã¡gua.',
      displayText: '"Ã¡gua"',
      greekForm: 'á½•Î´Ï‰Ï',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S17',
      type: 'dictation',
      narration: 'Escreva no papel: pÃ£o.',
      displayText: '"pÃ£o"',
      greekForm: 'á¼„ÏÏ„Î¿Ï‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

