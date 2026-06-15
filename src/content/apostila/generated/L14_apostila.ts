/**
 * L14 â€” Comunidade e MinistÃ©rio (á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±, á¼€Î´ÎµÎ»Ï†ÏŒÏ‚, á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚, Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚, Î´Î¿á¿¦Î»Î¿Ï‚)
 *
 * ID:               apostila-L14
 * TÃTULO:           LiÃ§Ã£o 14 â€” Comunidade e MinistÃ©rio
 * DESCRIÃ‡ÃƒO:        á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±, á¼€Î´ÎµÎ»Ï†ÏŒÏ‚, á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚, Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚, Î´Î¿á¿¦Î»Î¿Ï‚
 * PDF_PAGE:         29
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L14: ApostilaLesson = {
  id: 'apostila-L14',
  lessonNumber: 14,
  title: 'LiÃ§Ã£o 14 â€” Comunidade e MinistÃ©rio',
  description: 'á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±, á¼€Î´ÎµÎ»Ï†ÏŒÏ‚, á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚, Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚, Î´Î¿á¿¦Î»Î¿Ï‚',
  apostilaPdfPage: 29,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 14 â€” Comunidade e ministÃ©rio. Palavras que descrevem o povo de Deus: ekklesÃ­a, adelphÃ³s, apÃ³stolos, profÃ©tes e dÃ»los. Abra sua apostila na pÃ¡gina 29.',
      displayText: 'Abra sua apostila na PÃ¡gina 29',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: á¼ÎºÎºÎ»Î·ÏƒÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S02',
      type: 'word_intro',
      narration:
        'á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±, igreja. Em Mateus 16:18, Jesus promete: "Sobre esta pedra edificarei a minha igreja (á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±Î½)."',
      greekForm: 'á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±',
      transliteration: 'ekklÄ“sÃ­a',
      pronunciation: 'e-kle-SÃ-a',
      translation: 'igreja / assembleia convocada',
      etymology:
        'á¼Îº (de fora) + ÎºÎ±Î»Î­Ï‰ (chamar); assembleia dos cidadÃ£os convocados da cidade para deliberar',
      contextVerse: 'Mateus 16:18',
      contextVerseText:
        '"Sobre esta pedra edificarei a minha igreja (á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±Î½)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S03 â€” WRITE_PRACTICE: á¼ÎºÎºÎ»Î·ÏƒÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S03',
      type: 'write_practice',
      narration:
        'Agora escreva á¼ÎºÎºÎ»Î·ÏƒÎ¯Î± cinco vezes na linha 1. Pronuncie: e-kle-SÃ-a.',
      greekForm: 'á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±',
      transliteration: 'ekklÄ“sÃ­a',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S04 â€” WORD_INTRO: á¼€Î´ÎµÎ»Ï†ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S04',
      type: 'word_intro',
      narration:
        'á¼€Î´ÎµÎ»Ï†ÏŒÏ‚, irmÃ£o. Em Romanos 8:29: "Para que ele seja o primogÃªnito entre muitos irmÃ£os (á¼€Î´ÎµÎ»Ï†Î¿á¿–Ï‚)."',
      greekForm: 'á¼€Î´ÎµÎ»Ï†ÏŒÏ‚',
      transliteration: 'adelphÃ³s',
      pronunciation: 'a-del-FÃ“S',
      translation: 'irmÃ£o / membro da famÃ­lia de fÃ©',
      etymology:
        'á¼€ (mesmo) + Î´ÎµÎ»Ï†ÏÏ‚ (Ãºtero); literalmente "do mesmo Ãºtero"; Paulo expande para irmÃ£os em Cristo',
      contextVerse: 'Romanos 8:29',
      contextVerseText:
        '"Para que ele seja o primogÃªnito entre muitos irmÃ£os (á¼€Î´ÎµÎ»Ï†Î¿á¿–Ï‚)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S05 â€” WRITE_PRACTICE: á¼€Î´ÎµÎ»Ï†ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S05',
      type: 'write_practice',
      narration:
        'Agora escreva á¼€Î´ÎµÎ»Ï†ÏŒÏ‚ cinco vezes na linha 2. Pronuncie: a-del-FÃ“S.',
      greekForm: 'á¼€Î´ÎµÎ»Ï†ÏŒÏ‚',
      transliteration: 'adelphÃ³s',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” á¼€Î´ÎµÎ»Ï†ÏŒÏ‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” WORD_INTRO: á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S06',
      type: 'word_intro',
      narration:
        'á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚, apÃ³stolo. Em EfÃ©sios 2:20: "Edificados sobre o fundamento dos apÃ³stolos (á¼€Ï€Î¿ÏƒÏ„ÏŒÎ»Ï‰Î½) e profetas."',
      greekForm: 'á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚',
      transliteration: 'apÃ³stolos',
      pronunciation: 'a-PÃ“S-to-los',
      translation: 'apÃ³stolo / enviado',
      etymology:
        'De á¼€Ï€Î¿ÏƒÏ„Î­Î»Î»Ï‰, enviar com autoridade e representando quem envia',
      contextVerse: 'EfÃ©sios 2:20',
      contextVerseText:
        '"Edificados sobre o fundamento dos apÃ³stolos (á¼€Ï€Î¿ÏƒÏ„ÏŒÎ»Ï‰Î½) e profetas"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S07',
      type: 'write_practice',
      narration:
        'Agora escreva á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚ cinco vezes na linha 3. Pronuncie: a-PÃ“S-to-los.',
      greekForm: 'á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚',
      transliteration: 'apÃ³stolos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S08',
      type: 'word_intro',
      narration:
        'Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚, profeta. Em Atos 2:17: "Os vossos filhos e as vossas filhas profetizarÃ£o (Ï€ÏÎ¿Ï†Î·Ï„ÎµÏÏƒÎ¿Ï…ÏƒÎ¹Î½)."',
      greekForm: 'Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚',
      transliteration: 'prophá¸—tÄ“s',
      pronunciation: 'pro-FÃŠ-tes',
      translation: 'profeta / porta-voz',
      etymology:
        'Ï€ÏÏŒ (antes/em favor de) + Ï†Î·Î¼Î¯ (falar); nÃ£o apenas prevÃª o futuro, mas fala em nome de Deus',
      contextVerse: 'Atos 2:17',
      contextVerseText:
        '"Os vossos filhos e as vossas filhas profetizarÃ£o (Ï€ÏÎ¿Ï†Î·Ï„ÎµÏÏƒÎ¿Ï…ÏƒÎ¹Î½)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S09 â€” WRITE_PRACTICE: Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S09',
      type: 'write_practice',
      narration:
        'Agora escreva Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚ cinco vezes na linha 4. Pronuncie: pro-FÃŠ-tes.',
      greekForm: 'Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚',
      transliteration: 'prophá¸—tÄ“s',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S10 â€” WORD_INTRO: Î´Î¿á¿¦Î»Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S10',
      type: 'word_intro',
      narration:
        'Î´Î¿á¿¦Î»Î¿Ï‚, servo. Em Romanos 1:1, Paulo se identifica: "Paulo, servo (Î´Î¿á¿¦Î»Î¿Ï‚) de Jesus Cristo, chamado para ser apÃ³stolo."',
      greekForm: 'Î´Î¿á¿¦Î»Î¿Ï‚',
      transliteration: 'doÃ»los',
      pronunciation: 'DÃ›-los',
      translation: 'servo / escravo',
      etymology:
        'Paulo se identifica como Î´Î¿á¿¦Î»Î¿Ï‚ em Rm 1:1 â€” paradoxo: o maior tÃ­tulo vem da maior humildade',
      contextVerse: 'Romanos 1:1',
      contextVerseText:
        '"Paulo, servo (Î´Î¿á¿¦Î»Î¿Ï‚) de Jesus Cristo, chamado para ser apÃ³stolo"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S11 â€” WRITE_PRACTICE: Î´Î¿á¿¦Î»Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S11',
      type: 'write_practice',
      narration:
        'Agora escreva Î´Î¿á¿¦Î»Î¿Ï‚ cinco vezes na linha 5. Pronuncie: DÃ›-los.',
      greekForm: 'Î´Î¿á¿¦Î»Î¿Ï‚',
      transliteration: 'doÃ»los',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” Î´Î¿á¿¦Î»Î¿Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S12',
      type: 'pause',
      narration:
        'Igreja, irmÃ£os, apÃ³stolos, profetas, servos â€” esta Ã© a comunidade de Deus. Releia estas palavras.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S13 â€” DICTATION: á¼ÎºÎºÎ»Î·ÏƒÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S13',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "igreja".',
      displayText: '"igreja"',
      greekForm: 'á¼ÎºÎºÎ»Î·ÏƒÎ¯Î±',
      translation: 'igreja',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: á¼€Î´ÎµÎ»Ï†ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S14',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "irmÃ£o".',
      displayText: '"irmÃ£o"',
      greekForm: 'á¼€Î´ÎµÎ»Ï†ÏŒÏ‚',
      translation: 'irmÃ£o',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S15',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "apÃ³stolo".',
      displayText: '"apÃ³stolo"',
      greekForm: 'á¼€Ï€ÏŒÏƒÏ„Î¿Î»Î¿Ï‚',
      translation: 'apÃ³stolo',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S16',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "profeta".',
      displayText: '"profeta"',
      greekForm: 'Ï€ÏÎ¿Ï†Î®Ï„Î·Ï‚',
      translation: 'profeta',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: Î´Î¿á¿¦Î»Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L14-S17',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "servo".',
      displayText: '"servo"',
      greekForm: 'Î´Î¿á¿¦Î»Î¿Ï‚',
      translation: 'servo',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

