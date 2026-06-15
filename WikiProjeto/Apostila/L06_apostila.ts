/**
 * L06 — Nasais, Sigma e Letras Duplas (μ, ν, σ/ς, ζ, ξ, ψ)
 *
 * ID:               apostila-L06
 * TÍTULO:           Lição 6 — Nasais, Sigma e Letras Duplas
 * DESCRIÇÃO:        Mu, Nu, Sigma, Zeta, Xi, Psi
 * PDF_PAGE:         12
 * XP:               35
 * TEMPO:            14 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 26
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L06: ApostilaLesson = {
  id: 'apostila-L06',
  lessonNumber: 6,
  title: 'Lição 6 — Nasais, Sigma e Letras Duplas',
  description: 'Mu, Nu, Sigma, Zeta, Xi, Psi',
  apostilaPdfPage: 12,
  xpReward: 35,
  estimatedMinutes: 14,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L06-S01',
      type: 'intro',
      narration:
        'Esta é a última lição do alfabeto. Hoje você vai completar as 24 letras com as nasais mu e nu, o sigma (com sua forma final), e as letras duplas zeta, xi e psi. Abra sua apostila na página 12.',
      displayText: 'Abra sua apostila na Página 12',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: MU ───────────────────────────────────────
    {
      id: 'apostila-L06-S02',
      type: 'word_intro',
      narration:
        'A primeira letra é o mu. Maiúsculo: Μ. Minúsculo: μ. O som é "m", como em "mar".',
      greekForm: 'Μ μ',
      transliteration: 'mu',
      pronunciation: 'm (como em \'mar\')',
      translation: 'Letra Mu',
      etymology:
        'Do Mem hebraico (מ); corresponde ao \'M\' latino',
      contextVerse: 'Romanos 8:1',
      contextVerseText:
        '"Portanto, nenhuma condenação (κατάκριμα)" — μ inicia μέγας (grande) e μαθητής (discípulo)',
      showGreekLarge: true,
    },

    // ─── S03 — ALPHABET_TRACE: MU ───────────────────────────────────
    {
      id: 'apostila-L06-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do mu minúsculo. Duas hastes verticais conectadas por dois arcos na base — o primeiro da esquerda para o centro, o segundo do centro para a direita, como um "u" alongado.',
      greekForm: 'μ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S04 — WRITE_PRACTICE: MU ───────────────────────────────────
    {
      id: 'apostila-L06-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o mu minúsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'μ',
      transliteration: 'mu',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila — Mu minúsculo (μ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S05 — WORD_INTRO: NU ───────────────────────────────────────
    {
      id: 'apostila-L06-S05',
      type: 'word_intro',
      narration:
        'A segunda letra é o nu. Maiúsculo: Ν. Minúsculo: ν. O som é "n", como em "nós".',
      greekForm: 'Ν ν',
      transliteration: 'nu',
      pronunciation: 'n (como em \'nós\')',
      translation: 'Letra Nu',
      etymology:
        'Do Nun hebraico (נ); corresponde ao \'N\' latino',
      contextVerse: 'João 3:16',
      contextVerseText:
        '"Para que todo aquele (πᾶς)" — ν inicia νόμος (lei) e νύξ (noite)',
      showGreekLarge: true,
    },

    // ─── S06 — ALPHABET_TRACE: NU ───────────────────────────────────
    {
      id: 'apostila-L06-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do nu minúsculo. Haste diagonal da esquerda para baixo e para a direita, depois uma haste vertical curta na extremidade direita, descendo para baixo. Forma de "v" com haste à direita.',
      greekForm: 'ν',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S07 — WRITE_PRACTICE: NU ───────────────────────────────────
    {
      id: 'apostila-L06-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o nu minúsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ν',
      transliteration: 'nu',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila — Nu minúsculo (ν)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: SIGMA ────────────────────────────────────
    {
      id: 'apostila-L06-S08',
      type: 'word_intro',
      narration:
        'A terceira letra é o sigma. Maiúsculo: Σ. Minúsculo: σ. O sigma tem duas formas: σ (sigma normal) quando aparece no início ou meio da palavra, e ς (sigma final) quando aparece no final. Veja a diferença: σωτηρία (salvação) — o sigma inicial é σ. Χριστός (Cristo) — o sigma final é ς. O som é "s", como em "sol".',
      greekForm: 'Σ σ/ς',
      transliteration: 'sigma',
      pronunciation: 's (como em \'sol\') — forma final ς',
      translation: 'Letra Sigma',
      etymology:
        'Do Shin hebraico (ש); a letra mais frequente do grego — como o \'s\' em português',
      contextVerse: 'João 3:16',
      contextVerseText:
        '"...o mundo (κόσμον)" — σ/ς é a letra mais frequente em terminações gregas',
      showGreekLarge: true,
    },

    // ─── S09 — ALPHABET_TRACE: SIGMA ────────────────────────────────
    {
      id: 'apostila-L06-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do sigma minúsculo σ. Um semicírculo aberto à direita, com um pequeno traço horizontal no topo e outro na base. O sigma final ς é uma variação com um gancho descendo abaixo da linha.',
      greekForm: 'σ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S10 — WRITE_PRACTICE: SIGMA ────────────────────────────────
    {
      id: 'apostila-L06-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o sigma minúsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'σ',
      transliteration: 'sigma',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila — Sigma minúsculo (σ) — lembre-se da forma final ς',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S11 — WORD_INTRO: ZETA ─────────────────────────────────────
    {
      id: 'apostila-L06-S11',
      type: 'word_intro',
      narration:
        'A quarta letra é o zeta. Maiúsculo: Ζ. Minúsculo: ζ. O som é "z", como em "zebra".',
      greekForm: 'Ζ ζ',
      transliteration: 'zeta',
      pronunciation: 'z (como em \'zebra\')',
      translation: 'Letra Zeta',
      etymology:
        'Do Zayin hebraico (ז); originalmente \'dz\' no grego clássico, simplificado para \'z\'',
      contextVerse: 'Mateus 5:18',
      contextVerseText:
        '"Nem um iota ou um til (κεραία)" — ζ aparece em ζωή (vida) e ζητέω (buscar)',
      showGreekLarge: true,
    },

    // ─── S12 — ALPHABET_TRACE: ZETA ─────────────────────────────────
    {
      id: 'apostila-L06-S12',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do zeta minúsculo. A barra superior horizontal, depois uma diagonal da direita para baixo e para a esquerda, depois a barra inferior horizontal.',
      greekForm: 'ζ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S13 — WRITE_PRACTICE: ZETA ─────────────────────────────────
    {
      id: 'apostila-L06-S13',
      type: 'write_practice',
      narration:
        'Agora escreva o zeta minúsculo oito vezes na linha 4 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ζ',
      transliteration: 'zeta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 4 da apostila — Zeta minúsculo (ζ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S14 — WORD_INTRO: XI ───────────────────────────────────────
    {
      id: 'apostila-L06-S14',
      type: 'word_intro',
      narration:
        'A quinta letra é o xi. Maiúsculo: Ξ. Minúsculo: ξ. O som é "ks", como em "táxi".',
      greekForm: 'Ξ ξ',
      transliteration: 'xi',
      pronunciation: 'ks (como em \'táxi\')',
      translation: 'Letra Xi',
      etymology:
        'Do Samekh hebraico (ס); som duplo de κ + ς (k + s)',
      contextVerse: 'João 1:14',
      contextVerseText:
        '"...cheio de graça (χάριτος)" — ξ aparece em ξένος (estrangeiro)',
      showGreekLarge: true,
    },

    // ─── S15 — ALPHABET_TRACE: XI ───────────────────────────────────
    {
      id: 'apostila-L06-S15',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do xi minúsculo. Três traços horizontais paralelos: o superior, o médio e o inferior, com um traço vertical curvo conectando-os à direita.',
      greekForm: 'ξ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S16 — WRITE_PRACTICE: XI ───────────────────────────────────
    {
      id: 'apostila-L06-S16',
      type: 'write_practice',
      narration:
        'Agora escreva o xi minúsculo oito vezes na linha 5 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ξ',
      transliteration: 'xi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 5 da apostila — Xi minúsculo (ξ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S17 — WORD_INTRO: PSI ──────────────────────────────────────
    {
      id: 'apostila-L06-S17',
      type: 'word_intro',
      narration:
        'A sexta letra é o psi. Maiúsculo: Ψ. Minúsculo: ψ. O som é "ps", como em "psicologia".',
      greekForm: 'Ψ ψ',
      transliteration: 'psi',
      pronunciation: 'ps (como em \'psicologia\')',
      translation: 'Letra Psi',
      etymology:
        'Som duplo de π + ς (p + s); deu origem ao símbolo da psicologia (Ψ)',
      contextVerse: 'Filipenses 4:7',
      contextVerseText:
        '"...guardará os vossos corações (καρδίας)" — ψ aparece em ψυχή (alma/vida)',
      showGreekLarge: true,
    },

    // ─── S18 — ALPHABET_TRACE: PSI ──────────────────────────────────
    {
      id: 'apostila-L06-S18',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do psi minúsculo. Haste vertical central de cima para baixo, depois dois ramos curvos saindo do topo da haste, um à esquerda e outro à direita, formando um tridente.',
      greekForm: 'ψ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S19 — WRITE_PRACTICE: PSI ──────────────────────────────────
    {
      id: 'apostila-L06-S19',
      type: 'write_practice',
      narration:
        'Agora escreva o psi minúsculo oito vezes na linha 6 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ψ',
      transliteration: 'psi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 6 da apostila — Psi minúsculo (ψ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S20 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L06-S20',
      type: 'pause',
      narration:
        'Parabéns! Você acaba de aprender todas as 24 letras do alfabeto grego. O mesmo alfabeto que os discípulos de Jesus usavam. O mesmo alfabeto do apóstolo Paulo. Agora você pode começar a ler as primeiras palavras do Novo Testamento. Antes de continuar, olhe para tudo que escreveu nas seis linhas da apostila — é o alfabeto completo, na sua própria letra.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S21 — DICTATION: MU ────────────────────────────────────────
    {
      id: 'apostila-L06-S21',
      type: 'dictation',
      narration: 'Escreva no papel: mu.',
      displayText: '"mu"',
      greekForm: 'Μ μ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S22 — DICTATION: NU ────────────────────────────────────────
    {
      id: 'apostila-L06-S22',
      type: 'dictation',
      narration: 'Escreva no papel: nu.',
      displayText: '"nu"',
      greekForm: 'Ν ν',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S23 — DICTATION: SIGMA ─────────────────────────────────────
    {
      id: 'apostila-L06-S23',
      type: 'dictation',
      narration: 'Escreva no papel: sigma.',
      displayText: '"sigma"',
      greekForm: 'Σ σ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S24 — DICTATION: ZETA ──────────────────────────────────────
    {
      id: 'apostila-L06-S24',
      type: 'dictation',
      narration: 'Escreva no papel: zeta.',
      displayText: '"zeta"',
      greekForm: 'Ζ ζ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S25 — DICTATION: XI ────────────────────────────────────────
    {
      id: 'apostila-L06-S25',
      type: 'dictation',
      narration: 'Escreva no papel: xi.',
      displayText: '"xi"',
      greekForm: 'Ξ ξ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S26 — DICTATION: PSI ───────────────────────────────────────
    {
      id: 'apostila-L06-S26',
      type: 'dictation',
      narration: 'Escreva no papel: psi.',
      displayText: '"psi"',
      greekForm: 'Ψ ψ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
