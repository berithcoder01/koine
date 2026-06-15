/**
 * L15 — O Mundo Criado (κόσμος, οὐρανός, γῆ, ὕδωρ, ἄρτος)
 *
 * ID:               apostila-L15
 * TÍTULO:           Lição 15 — O Mundo Criado
 * DESCRIÇÃO:        κόσμος, οὐρανός, γῆ, ὕδωρ, ἄρτος
 * PDF_PAGE:         31
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L15: ApostilaLesson = {
  id: 'apostila-L15',
  title: 'Lição 15 — O Mundo Criado',
  description: 'κόσμος, οὐρανός, γῆ, ὕδωρ, ἄρτος',
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
        'Lição 15 — O mundo criado. Hoje vamos aprender palavras que descrevem a criação de Deus: kosmos, ouranós, gê, hydor e artos. Abra sua apostila na página 31.',
      displayText: 'Abra sua apostila na Página 31',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S02',
      type: 'word_intro',
      narration:
        'κόσμος significa mundo, ordem, universo. Originalmente significava "ordem" ou "adorno" — deu origem a "cosmético" e "cosmos". Em João 3:16, lemos: "Porque Deus amou o mundo de tal maneira". Pronuncia-se KÓS-mos.',
      greekForm: 'κόσμος',
      transliteration: 'kósmos',
      pronunciation: 'KÓS-mos',
      translation: 'mundo / ordem / universo',
      etymology:
        'Originalmente "ordem" ou "adorno"; deu origem a "cosmético" e "cosmos"',
      contextVerse: 'João 3:16',
      contextVerseText:
        '"Porque Deus amou o mundo (κόσμον) de tal maneira"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S03',
      type: 'write_practice',
      narration:
        'Agora escreva κόσμος cinco vezes na linha 1. Pronuncie: KÓS-mos.',
      greekForm: 'κόσμος',
      transliteration: 'kósmos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — κόσμος',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S04',
      type: 'word_intro',
      narration:
        'οὐρανός significa céu, morada divina. Deu nome ao planeta Urano. Em Mateus 6:9, oramos: "Pai nosso que estás nos céus". Pronuncia-se ou-ra-NÓS.',
      greekForm: 'οὐρανός',
      transliteration: 'ouranós',
      pronunciation: 'ou-ra-NÓS',
      translation: 'céu / morada divina',
      etymology:
        'Deu nome ao planeta Urano; em hebraico שָׁמַיִם (shamayim) tem raiz de "lá em cima"',
      contextVerse: 'Mateus 6:9',
      contextVerseText:
        '"Pai nosso que estás nos céus (οὐρανοῖς)"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S05',
      type: 'write_practice',
      narration:
        'Agora escreva οὐρανός cinco vezes na linha 2. Pronuncie: ou-ra-NÓS.',
      greekForm: 'οὐρανός',
      transliteration: 'ouranós',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — οὐρανός',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S06',
      type: 'word_intro',
      narration:
        'γῆ significa terra, solo, país. Deu origem a "geografia" e "geologia". Em Mateus 5:5, Jesus diz: "Bem-aventurados os mansos, porque eles herdarão a terra". Pronuncia-se GÊ.',
      greekForm: 'γῆ',
      transliteration: 'gē',
      pronunciation: 'GÊ',
      translation: 'terra / solo / país',
      etymology:
        'Deu origem a "geografia" e "geologia"; a Gaia da mitologia grega',
      contextVerse: 'Mateus 5:5',
      contextVerseText:
        '"Bem-aventurados os mansos, porque eles herdarão a terra (γῆν)"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S07',
      type: 'write_practice',
      narration:
        'Agora escreva γῆ cinco vezes na linha 3. Pronuncie: GÊ.',
      greekForm: 'γῆ',
      transliteration: 'gē',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — γῆ',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S08',
      type: 'word_intro',
      narration:
        'ὕδωρ significa água. Deu origem a "hidráulica" e "hidrogênio". Em João 4:14, Jesus promete água viva. Pronuncia-se HÍ-dor.',
      greekForm: 'ὕδωρ',
      transliteration: 'hýdōr',
      pronunciation: 'HÍ-dor',
      translation: 'água',
      etymology:
        'Deu origem a "hidráulica" e "hidrogênio"; em João 4:14, Jesus promete água viva (ζῶν)',
      contextVerse: 'João 4:14',
      contextVerseText:
        '"Aquele que beber da água (ὕδωρ) que eu lhe der nunca mais terá sede"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S09',
      type: 'write_practice',
      narration:
        'Agora escreva ὕδωρ cinco vezes na linha 4. Pronuncie: HÍ-dor.',
      greekForm: 'ὕδωρ',
      transliteration: 'hýdōr',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — ὕδωρ',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S10',
      type: 'word_intro',
      narration:
        'ἄρτος significa pão, alimento. Em João 6:35, Jesus se declara ὁ ἄρτος τῆς ζωῆς — o pão da vida. Pronuncia-se ÁR-tos.',
      greekForm: 'ἄρτος',
      transliteration: 'ártos',
      pronunciation: 'ÁR-tos',
      translation: 'pão / alimento',
      etymology:
        'Em João 6:35, Jesus se declara ὁ ἄρτος τῆς ζωῆς — o pão da vida; referência ao maná',
      contextVerse: 'João 6:35',
      contextVerseText:
        '"Eu sou o pão (ἄρτος) da vida"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S11',
      type: 'write_practice',
      narration:
        'Agora escreva ἄρτος cinco vezes na linha 5. Pronuncie: ÁR-tos.',
      greekForm: 'ἄρτος',
      transliteration: 'ártos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — ἄρτος',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L15-S12',
      type: 'pause',
      narration:
        'Céus, terra, água, pão — o mundo criado aponta para o Criador. Releia estas palavras.',
      displayText:
        'Céus, terra, água, pão — o mundo criado aponta para o Criador.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S13',
      type: 'dictation',
      narration: 'Escreva no papel: mundo.',
      displayText: '"mundo"',
      greekForm: 'κόσμος',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S14',
      type: 'dictation',
      narration: 'Escreva no papel: céu.',
      displayText: '"céu"',
      greekForm: 'οὐρανός',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S15',
      type: 'dictation',
      narration: 'Escreva no papel: terra.',
      displayText: '"terra"',
      greekForm: 'γῆ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S16',
      type: 'dictation',
      narration: 'Escreva no papel: água.',
      displayText: '"água"',
      greekForm: 'ὕδωρ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L15-S17',
      type: 'dictation',
      narration: 'Escreva no papel: pão.',
      displayText: '"pão"',
      greekForm: 'ἄρτος',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
