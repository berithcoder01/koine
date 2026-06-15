/**
 * L10 â€” Palavra e AÃ§Ã£o (Î»ÏŒÎ³Î¿Ï‚, á¿¥á¿†Î¼Î±, Î³ÏÎ¬Ï†Ï‰, Î»Î­Î³Ï‰, Ï€Î¿Î¹Î­Ï‰)
 *
 * ID:               apostila-L10
 * TÃTULO:           LiÃ§Ã£o 10 â€” Palavra e AÃ§Ã£o
 * DESCRIÃ‡ÃƒO:        Î»ÏŒÎ³Î¿Ï‚, á¿¥á¿†Î¼Î±, Î³ÏÎ¬Ï†Ï‰, Î»Î­Î³Ï‰, Ï€Î¿Î¹Î­Ï‰
 * PDF_PAGE:         21
 * XP:               40
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L10: ApostilaLesson = {
  id: 'apostila-L10',
  lessonNumber: 10,
  title: 'LiÃ§Ã£o 10 â€” Palavra e AÃ§Ã£o',
  description: 'Î»ÏŒÎ³Î¿Ï‚, á¿¥á¿†Î¼Î±, Î³ÏÎ¬Ï†Ï‰, Î»Î­Î³Ï‰, Ï€Î¿Î¹Î­Ï‰',
  apostilaPdfPage: 21,
  xpReward: 40,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S01',
      type: 'intro',
      narration:
        'LiÃ§Ã£o 10 â€” Palavra e aÃ§Ã£o. Hoje vocÃª vai aprender verbos e substantivos fundamentais: lÃ³gos, rhema, grÃ¡pho, lÃ©go e poiÃ©o. Palavras que nos ensinam como Deus se comunica e age. Abra sua apostila na pÃ¡gina 21.',
      displayText: 'Abra sua apostila na PÃ¡gina 21',
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: Î»ÏŒÎ³Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S02',
      type: 'word_intro',
      narration:
        'Î»ÏŒÎ³Î¿Ï‚ (lÃ³gos) â€” palavra / razÃ£o / discurso. No princÃ­pio era o Verbo, e o Verbo estava com Deus. A razÃ£o que ordena o cosmos.',
      displayText: 'Î»ÏŒÎ³Î¿Ï‚ â€” Palavra',
      greekForm: 'Î»ÏŒÎ³Î¿Ï‚',
      transliteration: 'lÃ³gos',
      pronunciation: 'LÃ“-gos',
      translation: 'Palavra / RazÃ£o / Discurso',
      etymology:
        'Raiz *leg-, colher/ordenar; na filosofia grega, a razÃ£o que ordena o cosmos',
      contextVerse: 'JoÃ£o 1:1',
      contextVerseText:
        '"No princÃ­pio era o Verbo (Î›ÏŒÎ³Î¿Ï‚), e o Verbo estava com Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S03 â€” WRITE_PRACTICE: Î»ÏŒÎ³Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S03',
      type: 'write_practice',
      narration:
        'Agora escreva Î»ÏŒÎ³Î¿Ï‚ cinco vezes na linha 1. Pronuncie: LÃ“-gos.',
      displayText: 'Î»ÏŒÎ³Î¿Ï‚ Ã— 5',
      greekForm: 'Î»ÏŒÎ³Î¿Ï‚',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila â€” Î»ÏŒÎ³Î¿Ï‚',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S04 â€” WORD_INTRO: á¿¥á¿†Î¼Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S04',
      type: 'word_intro',
      narration:
        'á¿¥á¿†Î¼Î± (rhÄ“ma) â€” palavra falada / declaraÃ§Ã£o. A fÃ© vem pelo ouvir, e o ouvir pela palavra de Deus. Ã‰ a palavra como evento sonoro.',
      displayText: 'á¿¥á¿†Î¼Î± â€” Palavra Falada',
      greekForm: 'á¿¥á¿†Î¼Î±',
      transliteration: 'rhÄ“ma',
      pronunciation: 'RÃŠ-ma',
      translation: 'Palavra Falada / DeclaraÃ§Ã£o',
      etymology:
        'De á¿¥Î­Ï‰, fluir; Ã© a palavra como evento sonoro, o que foi dito em um momento especÃ­fico',
      contextVerse: 'Romanos 10:17',
      contextVerseText:
        '"A fÃ© vem pelo ouvir, e o ouvir pela palavra (á¿¥Î®Î¼Î±Ï„Î¿Ï‚) de Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S05 â€” WRITE_PRACTICE: á¿¥á¿†Î¼Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S05',
      type: 'write_practice',
      narration:
        'Agora escreva á¿¥á¿†Î¼Î± cinco vezes na linha 2. Pronuncie: RÃŠ-ma.',
      displayText: 'á¿¥á¿†Î¼Î± Ã— 5',
      greekForm: 'á¿¥á¿†Î¼Î±',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila â€” á¿¥á¿†Î¼Î±',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” WORD_INTRO: Î³ÏÎ¬Ï†Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S06',
      type: 'word_intro',
      narration:
        'Î³ÏÎ¬Ï†Ï‰ (grÃ¡phÅ) â€” escrever. Jesus fez muitos outros sinais... que nÃ£o estÃ£o escritos neste livro. Deu origem a "grafia", "grÃ¡fico".',
      displayText: 'Î³ÏÎ¬Ï†Ï‰ â€” Escrever',
      greekForm: 'Î³ÏÎ¬Ï†Ï‰',
      transliteration: 'grÃ¡phÅ',
      pronunciation: 'GRÃ-fo',
      translation: 'Escrever',
      etymology:
        'Deu origem a "grafia", "grÃ¡fico", "gravura"; inicialmente significava riscar, desenhar',
      contextVerse: 'JoÃ£o 20:30',
      contextVerseText:
        '"Jesus fez muitos outros sinais... que nÃ£o estÃ£o escritos (Î³ÎµÎ³ÏÎ±Î¼Î¼Î­Î½Î±) neste livro"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: Î³ÏÎ¬Ï†Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S07',
      type: 'write_practice',
      narration:
        'Agora escreva Î³ÏÎ¬Ï†Ï‰ cinco vezes na linha 3. Pronuncie: GRÃ-fo.',
      displayText: 'Î³ÏÎ¬Ï†Ï‰ Ã— 5',
      greekForm: 'Î³ÏÎ¬Ï†Ï‰',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila â€” Î³ÏÎ¬Ï†Ï‰',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: Î»Î­Î³Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S08',
      type: 'word_intro',
      narration:
        'Î»Î­Î³Ï‰ (lÃ©gÅ) â€” dizer / falar. Eis o Cordeiro de Deus, que tira o pecado do mundo â€” disse JoÃ£o. Um dos verbos mais frequentes do NT.',
      displayText: 'Î»Î­Î³Ï‰ â€” Dizer',
      greekForm: 'Î»Î­Î³Ï‰',
      transliteration: 'lÃ©gÅ',
      pronunciation: 'LÃ‰-go',
      translation: 'Dizer / Falar',
      etymology:
        'Um dos verbos mais frequentes do NT (~2.350 ocorrÃªncias); base de Î»ÏŒÎ³Î¿Ï‚',
      contextVerse: 'JoÃ£o 1:29',
      contextVerseText:
        '"Eis o Cordeiro de Deus, que tira o pecado do mundo" â€” disse (Î»Î­Î³ÎµÎ¹) JoÃ£o',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S09 â€” WRITE_PRACTICE: Î»Î­Î³Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S09',
      type: 'write_practice',
      narration:
        'Agora escreva Î»Î­Î³Ï‰ cinco vezes na linha 4. Pronuncie: LÃ‰-go.',
      displayText: 'Î»Î­Î³Ï‰ Ã— 5',
      greekForm: 'Î»Î­Î³Ï‰',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila â€” Î»Î­Î³Ï‰',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S10 â€” WORD_INTRO: Ï€Î¿Î¹Î­Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S10',
      type: 'word_intro',
      narration:
        'Ï€Î¿Î¹Î­Ï‰ (poiÃ©Å) â€” fazer / criar / agir. Jesus fez este primeiro sinal em CanÃ¡. Deu origem a "poema" (Ï€Î¿Î¯Î·Î¼Î±): obra-prima.',
      displayText: 'Ï€Î¿Î¹Î­Ï‰ â€” Fazer',
      greekForm: 'Ï€Î¿Î¹Î­Ï‰',
      transliteration: 'poiÃ©Å',
      pronunciation: 'poi-Ã‰-o',
      translation: 'Fazer / Criar / Agir',
      etymology:
        'Deu origem ao inglÃªs "poem" (Ï€Î¿Î¯Î·Î¼Î±); o que Ã© criado/feito. EfÃ©sios 2:10: Ï€Î¿Î¯Î·Î¼Î± (obra-prima)',
      contextVerse: 'JoÃ£o 2:11',
      contextVerseText:
        '"Jesus fez (á¼Ï€Î¿Î¯Î·ÏƒÎµÎ½) este primeiro sinal em CanÃ¡"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // â”€â”€â”€ S11 â€” WRITE_PRACTICE: Ï€Î¿Î¹Î­Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S11',
      type: 'write_practice',
      narration:
        'Agora escreva Ï€Î¿Î¹Î­Ï‰ cinco vezes na linha 5. Pronuncie: poi-Ã‰-o.',
      displayText: 'Ï€Î¿Î¹Î­Ï‰ Ã— 5',
      greekForm: 'Ï€Î¿Î¹Î­Ï‰',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila â€” Ï€Î¿Î¹Î­Ï‰',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S12',
      type: 'pause',
      narration:
        'Excelente! VocÃª aprendeu palavras que descrevem como Deus se revela: pela Palavra e pela aÃ§Ã£o.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
    },

    // â”€â”€â”€ S13 â€” DICTATION: Î»ÏŒÎ³Î¿Ï‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S13',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'palavra'.",
      displayText: 'palavra',
      greekForm: 'Î»ÏŒÎ³Î¿Ï‚',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S14 â€” DICTATION: á¿¥á¿†Î¼Î± â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S14',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'palavra falada'.",
      displayText: 'palavra falada',
      greekForm: 'á¿¥á¿†Î¼Î±',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S15 â€” DICTATION: Î³ÏÎ¬Ï†Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S15',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'escrever'.",
      displayText: 'escrever',
      greekForm: 'Î³ÏÎ¬Ï†Ï‰',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S16 â€” DICTATION: Î»Î­Î³Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S16',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'dizer'.",
      displayText: 'dizer',
      greekForm: 'Î»Î­Î³Ï‰',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S17 â€” DICTATION: Ï€Î¿Î¹Î­Ï‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L10-S17',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'fazer'.",
      displayText: 'fazer',
      greekForm: 'Ï€Î¿Î¹Î­Ï‰',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

