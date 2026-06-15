/**
 * L08 â€” Nomes Divinos (Î¸ÎµÏŒÏ‚, ÎºÏÏÎ¹Î¿Ï‚, Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚, Ï…á¼±ÏŒÏ‚, Ï€Î½Îµá¿¦Î¼Î±)
 *
 * ID:               apostila-L08
 * TÃTULO:           LiÃ§Ã£o 8 â€” Nomes Divinos
 * DESCRIÃ‡ÃƒO:        Î¸ÎµÏŒÏ‚, ÎºÏÏÎ¹Î¿Ï‚, Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚, Ï…á¼±ÏŒÏ‚, Ï€Î½Îµá¿¦Î¼Î±
 * PDF_PAGE:         17
 * XP:               40
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L08: ApostilaLesson = {
  id: 'apostila-L08',
  lessonNumber: 8,
  title: 'LiÃ§Ã£o 8 â€” Nomes Divinos',
  description: 'Î¸ÎµÏŒÏ‚, ÎºÏÏÎ¹Î¿Ï‚, Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚, Ï…á¼±ÏŒÏ‚, Ï€Î½Îµá¿¦Î¼Î±',
  apostilaPdfPage: 17,
  xpReward: 40,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 8 â€” Nomes divinos. Hoje vocÃª vai aprender os nomes mais sagrados do Novo Testamento: TheÃ³s, KÃ½rios, ChristÃ³s, HiÃ³s e Pneuma. Estas palavras aparecem em cada pÃ¡gina do NT. Abra sua apostila na pÃ¡gina 17.',
      displayText: 'Abra sua apostila na PÃ¡gina 17',
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: Î¸ÎµÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S02',
      type: 'word_intro',
      narration:
        'Î¸ÎµÏŒÏ‚ (theÃ³s) â€” Deus. No princÃ­pio era o Verbo, e o Verbo estava com Deus. Raiz indo-europeia *dhes-, sagrado.',
      displayText: 'Î¸ÎµÏŒÏ‚ â€” Deus',
      greekForm: 'Î¸ÎµÏŒÏ‚',
      transliteration: 'theÃ³s',
      pronunciation: 'te-Ã“S',
      translation: 'Deus',
      etymology:
        'Raiz indo-europeia *dhes-, sagrado; base da teologia (Î¸ÎµÎ¿+Î»ÏŒÎ³Î¿Ï‚)',
      contextVerse: 'JoÃ£o 1:1',
      contextVerseText:
        '"No princÃ­pio era o Verbo, e o Verbo estava com Deus (Î¸ÎµÏŒÎ½)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S03 â€” WRITE_PRACTICE: Î¸ÎµÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S03',
      type: 'write_practice',
      narration:
        'Agora escreva Î¸ÎµÏŒÏ‚ cinco vezes na linha 1 da sua apostila. Pronuncie em voz alta: te-Ã“S.',
      displayText: 'Î¸ÎµÏŒÏ‚ Ã— 5',
      greekForm: 'Î¸ÎµÏŒÏ‚',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” Î¸ÎµÏŒÏ‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S04 â€” WORD_INTRO: ÎºÏÏÎ¹Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S04',
      type: 'word_intro',
      narration:
        'ÎºÏÏÎ¹Î¿Ï‚ (kÃ½rios) â€” Senhor / Mestre. E toda lÃ­ngua confesse que Jesus Cristo Ã© Senhor. De Îºá¿¦ÏÎ¿Ï‚, autoridade.',
      displayText: 'ÎºÏÏÎ¹Î¿Ï‚ â€” Senhor',
      greekForm: 'ÎºÏÏÎ¹Î¿Ï‚',
      transliteration: 'kÃ½rios',
      pronunciation: 'KÃ-ri-os',
      translation: 'Senhor / Mestre',
      etymology:
        'De Îºá¿¦ÏÎ¿Ï‚, autoridade; a Septuaginta usa ÎºÏÏÎ¹Î¿Ï‚ para traduzir ×™×”×•×” (YHWH)',
      contextVerse: 'Filipenses 2:11',
      contextVerseText:
        '"E toda lÃ­ngua confesse que Jesus Cristo Ã© Senhor (ÎšÏÏÎ¹Î¿Ï‚)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S05 â€” WRITE_PRACTICE: ÎºÏÏÎ¹Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S05',
      type: 'write_practice',
      narration:
        'Agora escreva ÎºÏÏÎ¹Î¿Ï‚ cinco vezes na linha 2. Pronuncie: KÃ-ri-os.',
      displayText: 'ÎºÏÏÎ¹Î¿Ï‚ Ã— 5',
      greekForm: 'ÎºÏÏÎ¹Î¿Ï‚',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” ÎºÏÏÎ¹Î¿Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” WORD_INTRO: Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S06',
      type: 'word_intro',
      narration:
        'Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ (ChristÃ³s) â€” Cristo / Ungido. Tu Ã©s o Cristo, o Filho do Deus vivo. TraduÃ§Ã£o do hebraico Messias.',
      displayText: 'Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ â€” Cristo',
      greekForm: 'Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚',
      transliteration: 'ChristÃ³s',
      pronunciation: 'cris-TÃ“S',
      translation: 'Cristo / Ungido',
      etymology:
        'TraduÃ§Ã£o do hebraico ×žÖ¸×©Ö´××™×—Ö· (Messias), ungido com Ã³leo para funÃ§Ã£o sagrada',
      contextVerse: 'Mateus 16:16',
      contextVerseText:
        '"Tu Ã©s o Cristo (Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚), o Filho do Deus vivo"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S07',
      type: 'write_practice',
      narration:
        'Agora escreva Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ cinco vezes na linha 3. Pronuncie: cris-TÃ“S.',
      displayText: 'Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ Ã— 5',
      greekForm: 'Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: Ï…á¼±ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S08',
      type: 'word_intro',
      narration:
        'Ï…á¼±ÏŒÏ‚ (huiÃ³s) â€” Filho. Este Ã© o meu Filho amado, em quem me comprazo. Denota herdeiro legal.',
      displayText: 'Ï…á¼±ÏŒÏ‚ â€” Filho',
      greekForm: 'Ï…á¼±ÏŒÏ‚',
      transliteration: 'huiÃ³s',
      pronunciation: 'ui-Ã“S',
      translation: 'Filho',
      etymology:
        'Denota nÃ£o apenas filho biolÃ³gico mas herdeiro legal e representante do pai',
      contextVerse: 'Mateus 3:17',
      contextVerseText:
        '"Este Ã© o meu Filho (Ï…á¼±ÏŒÏ‚) amado, em quem me comprazo"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S09 â€” WRITE_PRACTICE: Ï…á¼±ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S09',
      type: 'write_practice',
      narration:
        'Agora escreva Ï…á¼±ÏŒÏ‚ cinco vezes na linha 4. Pronuncie: ui-Ã“S.',
      displayText: 'Ï…á¼±ÏŒÏ‚ Ã— 5',
      greekForm: 'Ï…á¼±ÏŒÏ‚',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” Ï…á¼±ÏŒÏ‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S10 â€” WORD_INTRO: Ï€Î½Îµá¿¦Î¼Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S10',
      type: 'word_intro',
      narration:
        'Ï€Î½Îµá¿¦Î¼Î± (pneÃ»ma) â€” EspÃ­rito / vento / sopro. O vento sopra onde quer. De Ï€Î½Î­Ï‰, soprar.',
      displayText: 'Ï€Î½Îµá¿¦Î¼Î± â€” EspÃ­rito',
      greekForm: 'Ï€Î½Îµá¿¦Î¼Î±',
      transliteration: 'pneÃ»ma',
      pronunciation: 'PNÃŠU-ma',
      translation: 'EspÃ­rito / Vento / Sopro',
      etymology:
        'De Ï€Î½Î­Ï‰, soprar; mesmo campo semÃ¢ntico do hebraico ×¨×•Ö¼×—Ö· (ruach)',
      contextVerse: 'JoÃ£o 3:8',
      contextVerseText:
        '"O vento (Ï€Î½Îµá¿¦Î¼Î±) sopra onde quer... assim Ã© todo aquele que Ã© nascido do EspÃ­rito"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S11 â€” WRITE_PRACTICE: Ï€Î½Îµá¿¦Î¼Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S11',
      type: 'write_practice',
      narration:
        'Agora escreva Ï€Î½Îµá¿¦Î¼Î± cinco vezes na linha 5. Pronuncie: PNÃŠU-ma.',
      displayText: 'Ï€Î½Îµá¿¦Î¼Î± Ã— 5',
      greekForm: 'Ï€Î½Îµá¿¦Î¼Î±',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” Ï€Î½Îµá¿¦Î¼Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S12',
      type: 'pause',
      narration:
        'Excelente! VocÃª escreveu os cinco nomes divinos. Cada um destes nomes carrega sÃ©culos de revelaÃ§Ã£o. Releia-os na sua apostila e reflita.',
      displayText:
        'Releia os cinco nomes na sua apostila.\nQuando estiver pronto, continue.',
    },

    // â”€â”€â”€ S13 â€” DICTATION: Î¸ÎµÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S13',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'Deus'.",
      displayText: 'Deus',
      greekForm: 'Î¸ÎµÏŒÏ‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: ÎºÏÏÎ¹Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S14',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'Senhor'.",
      displayText: 'Senhor',
      greekForm: 'ÎºÏÏÎ¹Î¿Ï‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S15',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'Cristo'.",
      displayText: 'Cristo',
      greekForm: 'Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: Ï…á¼±ÏŒÏ‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S16',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'filho'.",
      displayText: 'filho',
      greekForm: 'Ï…á¼±ÏŒÏ‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: Ï€Î½Îµá¿¦Î¼Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L08-S17',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'espÃ­rito'.",
      displayText: 'espÃ­rito',
      greekForm: 'Ï€Î½Îµá¿¦Î¼Î±',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

