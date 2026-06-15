/**
 * L09 â€” O Ser Humano (á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚, ÎºÎ±ÏÎ´Î¯Î±, ÏˆÏ…Ï‡Î®, ÏƒÎ¬ÏÎ¾, á¼Î¼Î±ÏÏ„Î¯Î±)
 *
 * ID:               apostila-L09
 * TÃTULO:           LiÃ§Ã£o 9 â€” O Ser Humano
 * DESCRIÃ‡ÃƒO:        á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚, ÎºÎ±ÏÎ´Î¯Î±, ÏˆÏ…Ï‡Î®, ÏƒÎ¬ÏÎ¾, á¼Î¼Î±ÏÏ„Î¯Î±
 * PDF_PAGE:         19
 * XP:               40
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L09: ApostilaLesson = {
  id: 'apostila-L09',
  lessonNumber: 9,
  title: 'LiÃ§Ã£o 9 â€” O Ser Humano',
  description: 'á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚, ÎºÎ±ÏÎ´Î¯Î±, ÏˆÏ…Ï‡Î®, ÏƒÎ¬ÏÎ¾, á¼Î¼Î±ÏÏ„Î¯Î±',
  apostilaPdfPage: 19,
  xpReward: 40,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 9 â€” O ser humano. Hoje vamos aprender palavras que descrevem o ser humano diante de Deus: Ã¡nthropos, kardÃ­a, psyquÃ©, sÃ¡rx e hamartÃ­a. Abra sua apostila na pÃ¡gina 19.',
      displayText: 'Abra sua apostila na PÃ¡gina 19',
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S02',
      type: 'word_intro',
      narration:
        'á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚ (Ã¡nthrÅpos) â€” ser humano / homem. E a vida era a luz dos homens. PossÃ­vel origem em á¼€Î½Î®Ï + á½¤Ïˆ.',
      displayText: 'á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚ â€” Ser Humano',
      greekForm: 'á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚',
      transliteration: 'Ã¡nthrÅpos',
      pronunciation: 'Ã‚N-trÃ´-pos',
      translation: 'Ser Humano / Homem',
      etymology:
        'PossÃ­vel origem em á¼€Î½Î®Ï (homem) + á½¤Ïˆ (rosto); o ser que olha para cima',
      contextVerse: 'JoÃ£o 1:4',
      contextVerseText:
        '"E a vida era a luz dos homens (á¼€Î½Î¸ÏÏŽÏ€Ï‰Î½)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S03 â€” WRITE_PRACTICE: á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S03',
      type: 'write_practice',
      narration:
        'Agora escreva á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚ cinco vezes na linha 1. Pronuncie: Ã‚N-trÃ´-pos.',
      displayText: 'á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚ Ã— 5',
      greekForm: 'á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S04 â€” WORD_INTRO: ÎºÎ±ÏÎ´Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S04',
      type: 'word_intro',
      narration:
        'ÎºÎ±ÏÎ´Î¯Î± (kardÃ­a) â€” coraÃ§Ã£o / sede da vontade. Bem-aventurados os limpos de coraÃ§Ã£o. No pensamento bÃ­blico, o coraÃ§Ã£o Ã© o centro das decisÃµes.',
      displayText: 'ÎºÎ±ÏÎ´Î¯Î± â€” CoraÃ§Ã£o',
      greekForm: 'ÎºÎ±ÏÎ´Î¯Î±',
      transliteration: 'kardÃ­a',
      pronunciation: 'kar-DÃ-a',
      translation: 'CoraÃ§Ã£o / Sede da Vontade',
      etymology:
        'No pensamento hebraico-grego, o coraÃ§Ã£o Ã© o centro das decisÃµes, nÃ£o das emoÃ§Ãµes apenas',
      contextVerse: 'Mateus 5:8',
      contextVerseText:
        '"Bem-aventurados os limpos de coraÃ§Ã£o (ÎºÎ±ÏÎ´Î¯á¾³)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S05 â€” WRITE_PRACTICE: ÎºÎ±ÏÎ´Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S05',
      type: 'write_practice',
      narration:
        'Agora escreva ÎºÎ±ÏÎ´Î¯Î± cinco vezes na linha 2. Pronuncie: kar-DÃ-a.',
      displayText: 'ÎºÎ±ÏÎ´Î¯Î± Ã— 5',
      greekForm: 'ÎºÎ±ÏÎ´Î¯Î±',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” ÎºÎ±ÏÎ´Î¯Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” WORD_INTRO: ÏˆÏ…Ï‡Î® â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S06',
      type: 'word_intro',
      narration:
        'ÏˆÏ…Ï‡Î® (psychá¸—) â€” alma / ser interior / vida. Pois que aproveitarÃ¡ ao homem ganhar o mundo e perder a sua alma?',
      displayText: 'ÏˆÏ…Ï‡Î® â€” Alma',
      greekForm: 'ÏˆÏ…Ï‡Î®',
      transliteration: 'psychá¸—',
      pronunciation: 'psi-KÃŠ',
      translation: 'Alma / Ser Interior / Vida',
      etymology:
        'Deu origem a "psicologia" e "psiquiatria"; distinto de Ï€Î½Îµá¿¦Î¼Î± (espÃ­rito) e Ïƒá¿¶Î¼Î± (corpo)',
      contextVerse: 'Mateus 16:26',
      contextVerseText:
        '"Pois que aproveitarÃ¡ ao homem ganhar o mundo inteiro e perder a sua alma (ÏˆÏ…Ï‡Î®Î½)?"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: ÏˆÏ…Ï‡Î® â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S07',
      type: 'write_practice',
      narration:
        'Agora escreva ÏˆÏ…Ï‡Î® cinco vezes na linha 3. Pronuncie: psi-KÃŠ.',
      displayText: 'ÏˆÏ…Ï‡Î® Ã— 5',
      greekForm: 'ÏˆÏ…Ï‡Î®',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” ÏˆÏ…Ï‡Î®',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: ÏƒÎ¬ÏÎ¾ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S08',
      type: 'word_intro',
      narration:
        'ÏƒÎ¬ÏÎ¾ (sÃ¡rx) â€” carne / natureza humana. E o Verbo se fez carne e habitou entre nÃ³s. Paulo usa para a natureza humana sem Deus.',
      displayText: 'ÏƒÎ¬ÏÎ¾ â€” Carne',
      greekForm: 'ÏƒÎ¬ÏÎ¾',
      transliteration: 'sÃ¡rx',
      pronunciation: 'SÃRKS',
      translation: 'Carne / Natureza Humana',
      etymology:
        'Frequentemente usado por Paulo para indicar a natureza humana sem Deus, nÃ£o apenas o corpo fÃ­sico',
      contextVerse: 'JoÃ£o 1:14',
      contextVerseText:
        '"E o Verbo se fez carne (ÏƒÎ¬ÏÎ¾) e habitou entre nÃ³s"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S09 â€” WRITE_PRACTICE: ÏƒÎ¬ÏÎ¾ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S09',
      type: 'write_practice',
      narration:
        'Agora escreva ÏƒÎ¬ÏÎ¾ cinco vezes na linha 4. Pronuncie: SÃRKS.',
      displayText: 'ÏƒÎ¬ÏÎ¾ Ã— 5',
      greekForm: 'ÏƒÎ¬ÏÎ¾',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” ÏƒÎ¬ÏÎ¾',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S10 â€” WORD_INTRO: á¼Î¼Î±ÏÏ„Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S10',
      type: 'word_intro',
      narration:
        'á¼Î¼Î±ÏÏ„Î¯Î± (hamartÃ­a) â€” pecado / desvio do alvo. Porque todos pecaram e destituÃ­dos estÃ£o da glÃ³ria de Deus.',
      displayText: 'á¼Î¼Î±ÏÏ„Î¯Î± â€” Pecado',
      greekForm: 'á¼Î¼Î±ÏÏ„Î¯Î±',
      transliteration: 'hamartÃ­a',
      pronunciation: 'a-mar-TÃ-a',
      translation: 'Pecado / Desvio do Alvo',
      etymology:
        'Do verbo á¼Î¼Î±ÏÏ„Î¬Î½Ï‰, errar o alvo; imagine uma flecha que nÃ£o acerta o centro',
      contextVerse: 'Romanos 3:23',
      contextVerseText:
        '"Porque todos pecaram (á¼¥Î¼Î±ÏÏ„Î¿Î½) e destituÃ­dos estÃ£o da glÃ³ria de Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S11 â€” WRITE_PRACTICE: á¼Î¼Î±ÏÏ„Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S11',
      type: 'write_practice',
      narration:
        'Agora escreva á¼Î¼Î±ÏÏ„Î¯Î± cinco vezes na linha 5. Pronuncie: a-mar-TÃ-a.',
      displayText: 'á¼Î¼Î±ÏÏ„Î¯Î± Ã— 5',
      greekForm: 'á¼Î¼Î±ÏÏ„Î¯Î±',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” á¼Î¼Î±ÏÏ„Î¯Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S12',
      type: 'pause',
      narration:
        'VocÃª escreveu palavras que definem a condiÃ§Ã£o humana. Reflita: todas estas palavras apontam para a necessidade de Deus.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
    },

    // â”€â”€â”€ S13 â€” DICTATION: á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S13',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'ser humano'.",
      displayText: 'ser humano',
      greekForm: 'á¼„Î½Î¸ÏÏ‰Ï€Î¿Ï‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: ÎºÎ±ÏÎ´Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S14',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'coraÃ§Ã£o'.",
      displayText: 'coraÃ§Ã£o',
      greekForm: 'ÎºÎ±ÏÎ´Î¯Î±',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: ÏˆÏ…Ï‡Î® â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S15',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'alma'.",
      displayText: 'alma',
      greekForm: 'ÏˆÏ…Ï‡Î®',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: ÏƒÎ¬ÏÎ¾ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S16',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'carne'.",
      displayText: 'carne',
      greekForm: 'ÏƒÎ¬ÏÎ¾',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: á¼Î¼Î±ÏÏ„Î¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L09-S17',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'pecado'.",
      displayText: 'pecado',
      greekForm: 'á¼Î¼Î±ÏÏ„Î¯Î±',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

