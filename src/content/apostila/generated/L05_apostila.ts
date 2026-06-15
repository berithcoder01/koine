/**
 * L05 â€” Velares e LÃ­quidas (Î³, Îº, Ï‡, Î», Ï)
 *
 * ID:               apostila-L05
 * TÃTULO:           LiÃ§Ã£o 5 â€” Velares e LÃ­quidas
 * DESCRIÃ‡ÃƒO:        Gama, Capa, Chi, Lambda, RÃ´
 * PDF_PAGE:         9
 * XP:               35
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  false
 *
 * Total de Steps: 22
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L05: ApostilaLesson = {
  id: 'apostila-L05',
  lessonNumber: 5,
  title: 'LiÃ§Ã£o 5 â€” Velares e LÃ­quidas',
  description: 'Gama, Capa, Chi, Lambda, RÃ´',
  apostilaPdfPage: 9,
  xpReward: 35,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S01',
      type: 'intro',
      narration:
        'Hoje vamos aprender cinco letras: as velares (produzidas no fundo da garganta) gama, capa e chi, e as lÃ­quidas lambda e rÃ´. Abra sua apostila na pÃ¡gina 9.',
      displayText: 'Abra sua apostila na PÃ¡gina 9',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: GAMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S02',
      type: 'word_intro',
      narration:
        'A primeira letra Ã© o gama. MaiÃºsculo: Î“. MinÃºsculo: Î³. O som Ã© "g", como em "gato".',
      greekForm: 'Î“ Î³',
      transliteration: 'gama',
      pronunciation: 'g (como em \'gato\')',
      translation: 'Letra Gama',
      etymology:
        'Do Gimel hebraico (×’); antes do Îº em grego (Î³Î³) faz som nasal: \'ng\'',
      contextVerse: 'Mateus 28:18',
      contextVerseText:
        '"...todo o poder (Ï€á¾¶ÏƒÎ± á¼Î¾Î¿Ï…ÏƒÎ¯Î±) me foi dado" â€” Î³ inicia Î³á¿† (terra) e Î³ÏÎ¬Ï†Ï‰ (escrever)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S03 â€” ALPHABET_TRACE: GAMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do gama minÃºsculo. Um traÃ§o horizontal curto no topo, depois um traÃ§o vertical descendente que faz uma curva suave para a direita na base, como um gancho.',
      greekForm: 'Î³',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S04 â€” WRITE_PRACTICE: GAMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o gama minÃºsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î³',
      transliteration: 'gama',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila â€” Gama minÃºsculo (Î³)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S05 â€” WORD_INTRO: CAPA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S05',
      type: 'word_intro',
      narration:
        'A segunda letra Ã© o capa. MaiÃºsculo: Îš. MinÃºsculo: Îº. O som Ã© "k", como em "casa".',
      greekForm: 'Îš Îº',
      transliteration: 'capa',
      pronunciation: 'k (como em \'casa\')',
      translation: 'Letra Capa',
      etymology:
        'Do Qoph hebraico (×§); deu origem ao \'Q\' latino; em grego substituiu o qoppa arcaico',
      contextVerse: 'JoÃ£o 1:3',
      contextVerseText:
        '"...por ele tudo foi feito (á¼Î³Î­Î½ÎµÏ„Î¿)" â€” Îº inicia ÎºÏŒÏƒÎ¼Î¿Ï‚ (mundo) e ÎºÎ±ÏÎ´Î¯Î± (coraÃ§Ã£o)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” ALPHABET_TRACE: CAPA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do capa minÃºsculo. Haste vertical de cima para baixo, depois dois ramos diagonais saindo da haste: o primeiro para baixo e Ã  esquerda, o segundo para baixo e Ã  direita.',
      greekForm: 'Îº',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: CAPA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o capa minÃºsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Îº',
      transliteration: 'capa',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila â€” Capa minÃºsculo (Îº)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: CHI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S08',
      type: 'word_intro',
      narration:
        'A terceira letra Ã© o chi. MaiÃºsculo: Î§. MinÃºsculo: Ï‡. O som Ã© "ch" aspirado, como "Bach" em alemÃ£o.',
      greekForm: 'Î§ Ï‡',
      transliteration: 'chi',
      pronunciation: 'ch aspirado (como \'Bach\' em alemÃ£o)',
      translation: 'Letra Chi',
      etymology:
        'Aspirada velar; deu origem ao \'X\' latino quando usado na grafia de palavras gregas (ex: Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ = Christus)',
      contextVerse: 'Filipenses 1:21',
      contextVerseText:
        '"Para mim o viver Ã© Cristo (Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚)" â€” Ï‡ Ã© a inicial de Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S09 â€” ALPHABET_TRACE: CHI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do chi minÃºsculo. Duas diagonais que se cruzam no centro: a primeira da esquerda para baixo e para a direita, a segunda da direita para baixo e para a esquerda.',
      greekForm: 'Ï‡',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S10 â€” WRITE_PRACTICE: CHI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o chi minÃºsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ï‡',
      transliteration: 'chi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila â€” Chi minÃºsculo (Ï‡)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S11 â€” WORD_INTRO: LAMBDA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S11',
      type: 'word_intro',
      narration:
        'A quarta letra Ã© o lambda. MaiÃºsculo: Î›. MinÃºsculo: Î». O som Ã© "l", como em "lua".',
      greekForm: 'Î› Î»',
      transliteration: 'lambda',
      pronunciation: 'l (como em \'lua\')',
      translation: 'Letra Lambda',
      etymology:
        'Do Lamed hebraico (×œ); forma triangular representava balanÃ§a ou estaca; deu origem ao \'L\' latino',
      contextVerse: 'Lucas 1:1',
      contextVerseText:
        '"...visto que muitos (Ï€Î¿Î»Î»Î¿Î¯)" â€” Î» aparece em Î»ÏŒÎ³Î¿Ï‚, Î»Î±ÏŒÏ‚ (povo)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” ALPHABET_TRACE: LAMBDA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S12',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do lambda minÃºsculo. Um arco curvo da esquerda para baixo e para a direita, depois uma haste diagonal curta saindo da parte inferior direita do arco. Forma de "v" invertido assimÃ©trico.',
      greekForm: 'Î»',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S13 â€” WRITE_PRACTICE: LAMBDA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S13',
      type: 'write_practice',
      narration:
        'Agora escreva o lambda minÃºsculo oito vezes na linha 4 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î»',
      transliteration: 'lambda',
      writeRepetitions: 8,
      writeInstruction: 'Linha 4 da apostila â€” Lambda minÃºsculo (Î»)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S14 â€” WORD_INTRO: RÃ” â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S14',
      type: 'word_intro',
      narration:
        'A quinta letra Ã© o rÃ´. MaiÃºsculo: Î¡. MinÃºsculo: Ï. O som Ã© "r" vibrante, como em "rato".',
      greekForm: 'Î¡ Ï',
      transliteration: 'rÃ´',
      pronunciation: 'r vibrante (como em \'rato\')',
      translation: 'Letra RÃ´',
      etymology:
        'Do Resh hebraico (×¨); corresponde ao \'R\' latino; no inÃ­cio de palavra pode ser aspirado (á¿¥)',
      contextVerse: 'Romanos 1:16',
      contextVerseText:
        '"...para todo aquele que crÃª (Ï€Î¹ÏƒÏ„ÎµÏÎ¿Î½Ï„Î¹)" â€” Ï aparece em á¿¥á¿†Î¼Î± (palavra falada)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S15 â€” ALPHABET_TRACE: RÃ” â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S15',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do rÃ´ minÃºsculo. Um cÃ­rculo fechado no topo, depois uma haste vertical descendente saindo da base do cÃ­rculo.',
      greekForm: 'Ï',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S16 â€” WRITE_PRACTICE: RÃ” â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S16',
      type: 'write_practice',
      narration:
        'Agora escreva o rÃ´ minÃºsculo oito vezes na linha 5 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ï',
      transliteration: 'rÃ´',
      writeRepetitions: 8,
      writeInstruction: 'Linha 5 da apostila â€” RÃ´ minÃºsculo (Ï)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S17 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S17',
      type: 'pause',
      narration:
        'Muito bem! VocÃª aprendeu as velares e lÃ­quidas. Antes de continuar, olhe para o que escreveu nas cinco linhas e compare com o modelo.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S18 â€” DICTATION: GAMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S18',
      type: 'dictation',
      narration: 'Escreva no papel: gama.',
      displayText: '"gama"',
      greekForm: 'Î“ Î³',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S19 â€” DICTATION: CAPA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S19',
      type: 'dictation',
      narration: 'Escreva no papel: capa.',
      displayText: '"capa"',
      greekForm: 'Îš Îº',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S20 â€” DICTATION: CHI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S20',
      type: 'dictation',
      narration: 'Escreva no papel: chi.',
      displayText: '"chi"',
      greekForm: 'Î§ Ï‡',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S21 â€” DICTATION: LAMBDA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S21',
      type: 'dictation',
      narration: 'Escreva no papel: lambda.',
      displayText: '"lambda"',
      greekForm: 'Î› Î»',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S22 â€” DICTATION: RÃ” â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L05-S22',
      type: 'dictation',
      narration: 'Escreva no papel: rÃ´.',
      displayText: '"rÃ´"',
      greekForm: 'Î¡ Ï',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

