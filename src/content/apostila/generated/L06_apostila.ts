/**
 * L06 â€” Nasais, Sigma e Letras Duplas (Î¼, Î½, Ïƒ/Ï‚, Î¶, Î¾, Ïˆ)
 *
 * ID:               apostila-L06
 * TÃTULO:           LiÃ§Ã£o 6 â€” Nasais, Sigma e Letras Duplas
 * DESCRIÃ‡ÃƒO:        Mu, Nu, Sigma, Zeta, Xi, Psi
 * PDF_PAGE:         12
 * XP:               35
 * TEMPO:            14 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 26
 */

import type { ApostilaLesson } from '../../features/apostila/apostilaTypes';

export const APOSTILA_L06: ApostilaLesson = {
  id: 'apostila-L06',
  lessonNumber: 6,
  title: 'LiÃ§Ã£o 6 â€” Nasais, Sigma e Letras Duplas',
  description: 'Mu, Nu, Sigma, Zeta, Xi, Psi',
  apostilaPdfPage: 12,
  xpReward: 35,
  estimatedMinutes: 14,
  requiresPrevious: true,

  steps: [
    // â”€â”€â”€ S01 â€” INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S01',
      type: 'intro',
      narration:
        'Esta Ã© a Ãºltima liÃ§Ã£o do alfabeto. Hoje vocÃª vai completar as 24 letras com as nasais mu e nu, o sigma (com sua forma final), e as letras duplas zeta, xi e psi. Abra sua apostila na pÃ¡gina 12.',
      displayText: 'Abra sua apostila na PÃ¡gina 12',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S02 â€” WORD_INTRO: MU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S02',
      type: 'word_intro',
      narration:
        'A primeira letra Ã© o mu. MaiÃºsculo: Îœ. MinÃºsculo: Î¼. O som Ã© "m", como em "mar".',
      greekForm: 'Îœ Î¼',
      transliteration: 'mu',
      pronunciation: 'm (como em \'mar\')',
      translation: 'Letra Mu',
      etymology:
        'Do Mem hebraico (×ž); corresponde ao \'M\' latino',
      contextVerse: 'Romanos 8:1',
      contextVerseText:
        '"Portanto, nenhuma condenaÃ§Ã£o (ÎºÎ±Ï„Î¬ÎºÏÎ¹Î¼Î±)" â€” Î¼ inicia Î¼Î­Î³Î±Ï‚ (grande) e Î¼Î±Î¸Î·Ï„Î®Ï‚ (discÃ­pulo)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S03 â€” ALPHABET_TRACE: MU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do mu minÃºsculo. Duas hastes verticais conectadas por dois arcos na base â€” o primeiro da esquerda para o centro, o segundo do centro para a direita, como um "u" alongado.',
      greekForm: 'Î¼',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S04 â€” WRITE_PRACTICE: MU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o mu minÃºsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î¼',
      transliteration: 'mu',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila â€” Mu minÃºsculo (Î¼)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S05 â€” WORD_INTRO: NU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S05',
      type: 'word_intro',
      narration:
        'A segunda letra Ã© o nu. MaiÃºsculo: Î. MinÃºsculo: Î½. O som Ã© "n", como em "nÃ³s".',
      greekForm: 'Î Î½',
      transliteration: 'nu',
      pronunciation: 'n (como em \'nÃ³s\')',
      translation: 'Letra Nu',
      etymology:
        'Do Nun hebraico (× ); corresponde ao \'N\' latino',
      contextVerse: 'JoÃ£o 3:16',
      contextVerseText:
        '"Para que todo aquele (Ï€á¾¶Ï‚)" â€” Î½ inicia Î½ÏŒÎ¼Î¿Ï‚ (lei) e Î½ÏÎ¾ (noite)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S06 â€” ALPHABET_TRACE: NU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do nu minÃºsculo. Haste diagonal da esquerda para baixo e para a direita, depois uma haste vertical curta na extremidade direita, descendo para baixo. Forma de "v" com haste Ã  direita.',
      greekForm: 'Î½',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S07 â€” WRITE_PRACTICE: NU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o nu minÃºsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î½',
      transliteration: 'nu',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila â€” Nu minÃºsculo (Î½)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S08 â€” WORD_INTRO: SIGMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S08',
      type: 'word_intro',
      narration:
        'A terceira letra Ã© o sigma. MaiÃºsculo: Î£. MinÃºsculo: Ïƒ. O sigma tem duas formas: Ïƒ (sigma normal) quando aparece no inÃ­cio ou meio da palavra, e Ï‚ (sigma final) quando aparece no final. Veja a diferenÃ§a: ÏƒÏ‰Ï„Î·ÏÎ¯Î± (salvaÃ§Ã£o) â€” o sigma inicial Ã© Ïƒ. Î§ÏÎ¹ÏƒÏ„ÏŒÏ‚ (Cristo) â€” o sigma final Ã© Ï‚. O som Ã© "s", como em "sol".',
      greekForm: 'Î£ Ïƒ/Ï‚',
      transliteration: 'sigma',
      pronunciation: 's (como em \'sol\') â€” forma final Ï‚',
      translation: 'Letra Sigma',
      etymology:
        'Do Shin hebraico (×©); a letra mais frequente do grego â€” como o \'s\' em portuguÃªs',
      contextVerse: 'JoÃ£o 3:16',
      contextVerseText:
        '"...o mundo (ÎºÏŒÏƒÎ¼Î¿Î½)" â€” Ïƒ/Ï‚ Ã© a letra mais frequente em terminaÃ§Ãµes gregas',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S09 â€” ALPHABET_TRACE: SIGMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do sigma minÃºsculo Ïƒ. Um semicÃ­rculo aberto Ã  direita, com um pequeno traÃ§o horizontal no topo e outro na base. O sigma final Ï‚ Ã© uma variaÃ§Ã£o com um gancho descendo abaixo da linha.',
      greekForm: 'Ïƒ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S10 â€” WRITE_PRACTICE: SIGMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o sigma minÃºsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ïƒ',
      transliteration: 'sigma',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila â€” Sigma minÃºsculo (Ïƒ) â€” lembre-se da forma final Ï‚',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S11 â€” WORD_INTRO: ZETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S11',
      type: 'word_intro',
      narration:
        'A quarta letra Ã© o zeta. MaiÃºsculo: Î–. MinÃºsculo: Î¶. O som Ã© "z", como em "zebra".',
      greekForm: 'Î– Î¶',
      transliteration: 'zeta',
      pronunciation: 'z (como em \'zebra\')',
      translation: 'Letra Zeta',
      etymology:
        'Do Zayin hebraico (×–); originalmente \'dz\' no grego clÃ¡ssico, simplificado para \'z\'',
      contextVerse: 'Mateus 5:18',
      contextVerseText:
        '"Nem um iota ou um til (ÎºÎµÏÎ±Î¯Î±)" â€” Î¶ aparece em Î¶Ï‰Î® (vida) e Î¶Î·Ï„Î­Ï‰ (buscar)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S12 â€” ALPHABET_TRACE: ZETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S12',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do zeta minÃºsculo. A barra superior horizontal, depois uma diagonal da direita para baixo e para a esquerda, depois a barra inferior horizontal.',
      greekForm: 'Î¶',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S13 â€” WRITE_PRACTICE: ZETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S13',
      type: 'write_practice',
      narration:
        'Agora escreva o zeta minÃºsculo oito vezes na linha 4 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î¶',
      transliteration: 'zeta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 4 da apostila â€” Zeta minÃºsculo (Î¶)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S14 â€” WORD_INTRO: XI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S14',
      type: 'word_intro',
      narration:
        'A quinta letra Ã© o xi. MaiÃºsculo: Îž. MinÃºsculo: Î¾. O som Ã© "ks", como em "tÃ¡xi".',
      greekForm: 'Îž Î¾',
      transliteration: 'xi',
      pronunciation: 'ks (como em \'tÃ¡xi\')',
      translation: 'Letra Xi',
      etymology:
        'Do Samekh hebraico (×¡); som duplo de Îº + Ï‚ (k + s)',
      contextVerse: 'JoÃ£o 1:14',
      contextVerseText:
        '"...cheio de graÃ§a (Ï‡Î¬ÏÎ¹Ï„Î¿Ï‚)" â€” Î¾ aparece em Î¾Î­Î½Î¿Ï‚ (estrangeiro)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S15 â€” ALPHABET_TRACE: XI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S15',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do xi minÃºsculo. TrÃªs traÃ§os horizontais paralelos: o superior, o mÃ©dio e o inferior, com um traÃ§o vertical curvo conectando-os Ã  direita.',
      greekForm: 'Î¾',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S16 â€” WRITE_PRACTICE: XI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S16',
      type: 'write_practice',
      narration:
        'Agora escreva o xi minÃºsculo oito vezes na linha 5 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Î¾',
      transliteration: 'xi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 5 da apostila â€” Xi minÃºsculo (Î¾)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S17 â€” WORD_INTRO: PSI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S17',
      type: 'word_intro',
      narration:
        'A sexta letra Ã© o psi. MaiÃºsculo: Î¨. MinÃºsculo: Ïˆ. O som Ã© "ps", como em "psicologia".',
      greekForm: 'Î¨ Ïˆ',
      transliteration: 'psi',
      pronunciation: 'ps (como em \'psicologia\')',
      translation: 'Letra Psi',
      etymology:
        'Som duplo de Ï€ + Ï‚ (p + s); deu origem ao sÃ­mbolo da psicologia (Î¨)',
      contextVerse: 'Filipenses 4:7',
      contextVerseText:
        '"...guardarÃ¡ os vossos coraÃ§Ãµes (ÎºÎ±ÏÎ´Î¯Î±Ï‚)" â€” Ïˆ aparece em ÏˆÏ…Ï‡Î® (alma/vida)',
      showGreekLarge: true,
    },

    // â”€â”€â”€ S18 â€” ALPHABET_TRACE: PSI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S18',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traÃ§os do psi minÃºsculo. Haste vertical central de cima para baixo, depois dois ramos curvos saindo do topo da haste, um Ã  esquerda e outro Ã  direita, formando um tridente.',
      greekForm: 'Ïˆ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // â”€â”€â”€ S19 â€” WRITE_PRACTICE: PSI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S19',
      type: 'write_practice',
      narration:
        'Agora escreva o psi minÃºsculo oito vezes na linha 6 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'Ïˆ',
      transliteration: 'psi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 6 da apostila â€” Psi minÃºsculo (Ïˆ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // â”€â”€â”€ S20 â€” PAUSE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S20',
      type: 'pause',
      narration:
        'ParabÃ©ns! VocÃª acaba de aprender todas as 24 letras do alfabeto grego. O mesmo alfabeto que os discÃ­pulos de Jesus usavam. O mesmo alfabeto do apÃ³stolo Paulo. Agora vocÃª pode comeÃ§ar a ler as primeiras palavras do Novo Testamento. Antes de continuar, olhe para tudo que escreveu nas seis linhas da apostila â€” Ã© o alfabeto completo, na sua prÃ³pria letra.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // â”€â”€â”€ S21 â€” DICTATION: MU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S21',
      type: 'dictation',
      narration: 'Escreva no papel: mu.',
      displayText: '"mu"',
      greekForm: 'Îœ Î¼',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S22 â€” DICTATION: NU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S22',
      type: 'dictation',
      narration: 'Escreva no papel: nu.',
      displayText: '"nu"',
      greekForm: 'Î Î½',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S23 â€” DICTATION: SIGMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S23',
      type: 'dictation',
      narration: 'Escreva no papel: sigma.',
      displayText: '"sigma"',
      greekForm: 'Î£ Ïƒ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S24 â€” DICTATION: ZETA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S24',
      type: 'dictation',
      narration: 'Escreva no papel: zeta.',
      displayText: '"zeta"',
      greekForm: 'Î– Î¶',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S25 â€” DICTATION: XI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S25',
      type: 'dictation',
      narration: 'Escreva no papel: xi.',
      displayText: '"xi"',
      greekForm: 'Îž Î¾',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // â”€â”€â”€ S26 â€” DICTATION: PSI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      id: 'apostila-L06-S26',
      type: 'dictation',
      narration: 'Escreva no papel: psi.',
      displayText: '"psi"',
      greekForm: 'Î¨ Ïˆ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

