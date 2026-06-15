/**
 * L13 â€” SalvaÃ§Ã£o e Julgamento (ÏƒÏ‰Ï„Î·ÏÎ¯Î±, Î½ÏŒÎ¼Î¿Ï‚, Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·, ÎºÏÎ¯ÏƒÎ¹Ï‚, Î¸Î¬Î½Î±Ï„Î¿Ï‚)
 *
 * ID:               apostila-L13
 * TÃTULO:           LiÃ§Ã£o 13 â€” SalvaÃ§Ã£o e Julgamento
 * DESCRIÃ‡ÃƒO:        ÏƒÏ‰Ï„Î·ÏÎ¯Î±, Î½ÏŒÎ¼Î¿Ï‚, Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·, ÎºÏÎ¯ÏƒÎ¹Ï‚, Î¸Î¬Î½Î±Ï„Î¿Ï‚
 * PDF_PAGE:         27
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L13: ApostilaLesson = {
  id: 'apostila-L13',
  lessonNumber: 13,
  title: 'LiÃ§Ã£o 13 â€” SalvaÃ§Ã£o e Julgamento',
  description: 'ÏƒÏ‰Ï„Î·ÏÎ¯Î±, Î½ÏŒÎ¼Î¿Ï‚, Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·, ÎºÏÎ¯ÏƒÎ¹Ï‚, Î¸Î¬Î½Î±Ï„Î¿Ï‚',
  apostilaPdfPage: 27,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 13 â€” SalvaÃ§Ã£o e julgamento. Palavras pesadas que definem o evangelho: soteria, nÃ³mos, dikaiosÃ½ne, krÃ­sis e thÃ¡natos. Abra sua apostila na pÃ¡gina 27.',
      displayText: 'Abra sua apostila na PÃ¡gina 27',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: ÏƒÏ‰Ï„Î·ÏÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S02',
      type: 'word_intro',
      narration:
        'ÏƒÏ‰Ï„Î·ÏÎ¯Î±, salvaÃ§Ã£o. Em Romanos 1:16, Paulo declara: "O evangelho Ã© o poder de Deus para salvaÃ§Ã£o (ÏƒÏ‰Ï„Î·ÏÎ¯Î±Î½) de todo aquele que crÃª."',
      greekForm: 'ÏƒÏ‰Ï„Î·ÏÎ¯Î±',
      transliteration: 'sÅtÄ“rÃ­a',
      pronunciation: 'so-te-RÃ-a',
      translation: 'salvaÃ§Ã£o / libertaÃ§Ã£o',
      etymology:
        'De Ïƒá¿´Î¶Ï‰ (salvar); ÏƒÏ‰Ï„Î®Ï (Salvador) Ã© tÃ­tulo de imperadores romanos â€” Paulo o reivindica para Cristo',
      contextVerse: 'Romanos 1:16',
      contextVerseText:
        '"O evangelho... Ã© o poder de Deus para salvaÃ§Ã£o (ÏƒÏ‰Ï„Î·ÏÎ¯Î±Î½) de todo aquele que crÃª"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S03 â€” WRITE_PRACTICE: ÏƒÏ‰Ï„Î·ÏÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S03',
      type: 'write_practice',
      narration:
        'Agora escreva ÏƒÏ‰Ï„Î·ÏÎ¯Î± cinco vezes na linha 1. Pronuncie: so-te-RÃ-a.',
      greekForm: 'ÏƒÏ‰Ï„Î·ÏÎ¯Î±',
      transliteration: 'sÅtÄ“rÃ­a',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” ÏƒÏ‰Ï„Î·ÏÎ¯Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S04 â€” WORD_INTRO: Î½ÏŒÎ¼Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S04',
      type: 'word_intro',
      narration:
        'Î½ÏŒÎ¼Î¿Ï‚, lei. Em Romanos 3:31, Paulo pergunta: "Anulamos a lei (Î½ÏŒÎ¼Î¿Î½) pela fÃ©? De modo nenhum! Antes a confirmamos."',
      greekForm: 'Î½ÏŒÎ¼Î¿Ï‚',
      transliteration: 'nÃ³mos',
      pronunciation: 'NÃ“-mos',
      translation: 'lei / TorÃ¡ / princÃ­pio',
      etymology:
        'De Î½Î­Î¼Ï‰, distribuir; a lei como ordem distribuÃ­da e atribuÃ­da',
      contextVerse: 'Romanos 3:31',
      contextVerseText:
        '"De modo que anulamos a lei (Î½ÏŒÎ¼Î¿Î½) pela fÃ©? De modo nenhum! Antes a confirmamos"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S05 â€” WRITE_PRACTICE: Î½ÏŒÎ¼Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S05',
      type: 'write_practice',
      narration:
        'Agora escreva Î½ÏŒÎ¼Î¿Ï‚ cinco vezes na linha 2. Pronuncie: NÃ“-mos.',
      greekForm: 'Î½ÏŒÎ¼Î¿Ï‚',
      transliteration: 'nÃ³mos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” Î½ÏŒÎ¼Î¿Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” WORD_INTRO: Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S06',
      type: 'word_intro',
      narration:
        'Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·, justiÃ§a. Em Romanos 3:22: "A justiÃ§a (Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·) de Deus pela fÃ© em Jesus Cristo para todos os que creem."',
      greekForm: 'Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·',
      transliteration: 'dikaiosÃ½nÄ“',
      pronunciation: 'di-kai-o-SÃ-ne',
      translation: 'justiÃ§a / retidÃ£o',
      etymology:
        'De Î´Î¯ÎºÎ±Î¹Î¿Ï‚ (justo); conceito central em Paulo: ser declarado justo por Deus',
      contextVerse: 'Romanos 3:22',
      contextVerseText:
        '"A justiÃ§a (Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·) de Deus pela fÃ© em Jesus Cristo para todos os que creem"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S07',
      type: 'write_practice',
      narration:
        'Agora escreva Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î· cinco vezes na linha 3. Pronuncie: di-kai-o-SÃ-ne.',
      greekForm: 'Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·',
      transliteration: 'dikaiosÃ½nÄ“',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: ÎºÏÎ¯ÏƒÎ¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S08',
      type: 'word_intro',
      narration:
        'ÎºÏÎ¯ÏƒÎ¹Ï‚, julgamento. Em JoÃ£o 3:19: "Esta Ã© a condenaÃ§Ã£o (ÎºÏÎ¯ÏƒÎ¹Ï‚): a luz veio ao mundo, mas os homens amaram mais as trevas."',
      greekForm: 'ÎºÏÎ¯ÏƒÎ¹Ï‚',
      transliteration: 'krÃ­sis',
      pronunciation: 'KRÃ-sis',
      translation: 'julgamento / decisÃ£o',
      etymology:
        'Deu origem a "crise" e "crÃ­tica"; o ponto de decisÃ£o onde o destino Ã© determinado',
      contextVerse: 'JoÃ£o 3:19',
      contextVerseText:
        '"Esta Ã© a condenaÃ§Ã£o (ÎºÏÎ¯ÏƒÎ¹Ï‚): a luz veio ao mundo, mas os homens amaram mais as trevas"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S09 â€” WRITE_PRACTICE: ÎºÏÎ¯ÏƒÎ¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S09',
      type: 'write_practice',
      narration:
        'Agora escreva ÎºÏÎ¯ÏƒÎ¹Ï‚ cinco vezes na linha 4. Pronuncie: KRÃ-sis.',
      greekForm: 'ÎºÏÎ¯ÏƒÎ¹Ï‚',
      transliteration: 'krÃ­sis',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” ÎºÏÎ¯ÏƒÎ¹Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S10 â€” WORD_INTRO: Î¸Î¬Î½Î±Ï„Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S10',
      type: 'word_intro',
      narration:
        'Î¸Î¬Î½Î±Ï„Î¿Ï‚, morte. Em Romanos 6:23: "O salÃ¡rio do pecado Ã© a morte (Î¸Î¬Î½Î±Ï„Î¿Ï‚), mas o dom gratuito de Deus Ã© a vida eterna."',
      greekForm: 'Î¸Î¬Î½Î±Ï„Î¿Ï‚',
      transliteration: 'thÃ¡natos',
      pronunciation: 'TÃ‚-na-tos',
      translation: 'morte',
      etymology:
        'Deu origem a "eutanÃ¡sia" (boa morte); Paulo o personifica como inimigo em 1 Cor 15',
      contextVerse: 'Romanos 6:23',
      contextVerseText:
        '"Porque o salÃ¡rio do pecado Ã© a morte (Î¸Î¬Î½Î±Ï„Î¿Ï‚), mas o dom gratuito de Deus Ã© a vida eterna"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S11 â€” WRITE_PRACTICE: Î¸Î¬Î½Î±Ï„Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S11',
      type: 'write_practice',
      narration:
        'Agora escreva Î¸Î¬Î½Î±Ï„Î¿Ï‚ cinco vezes na linha 5. Pronuncie: TÃ‚-na-tos.',
      greekForm: 'Î¸Î¬Î½Î±Ï„Î¿Ï‚',
      transliteration: 'thÃ¡natos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” Î¸Î¬Î½Î±Ï„Î¿Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S12',
      type: 'pause',
      narration:
        'SalvaÃ§Ã£o, lei, justiÃ§a, julgamento e morte â€” o vocabulÃ¡rio da cruz. Releia estas palavras.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S13 â€” DICTATION: ÏƒÏ‰Ï„Î·ÏÎ¯Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S13',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "salvaÃ§Ã£o".',
      displayText: '"salvaÃ§Ã£o"',
      greekForm: 'ÏƒÏ‰Ï„Î·ÏÎ¯Î±',
      translation: 'salvaÃ§Ã£o',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: Î½ÏŒÎ¼Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S14',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "lei".',
      displayText: '"lei"',
      greekForm: 'Î½ÏŒÎ¼Î¿Ï‚',
      translation: 'lei',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î· â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S15',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "justiÃ§a".',
      displayText: '"justiÃ§a"',
      greekForm: 'Î´Î¹ÎºÎ±Î¹Î¿ÏƒÏÎ½Î·',
      translation: 'justiÃ§a',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: ÎºÏÎ¯ÏƒÎ¹Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S16',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "julgamento".',
      displayText: '"julgamento"',
      greekForm: 'ÎºÏÎ¯ÏƒÎ¹Ï‚',
      translation: 'julgamento',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: Î¸Î¬Î½Î±Ï„Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L13-S17',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "morte".',
      displayText: '"morte"',
      greekForm: 'Î¸Î¬Î½Î±Ï„Î¿Ï‚',
      translation: 'morte',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

