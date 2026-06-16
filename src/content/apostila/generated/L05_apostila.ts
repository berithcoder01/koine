/**
 * L05 — Velares e Líquidas (γ, κ, χ, λ, ρ)
 *
 * ID:               apostila-L05
 * TÍTULO:           Lição 5 — Velares e Líquidas
 * DESCRIÇÃO:        Gama, Capa, Chi, Lambda, Rô
 * PDF_PAGE:         9
 * XP:               35
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  false
 *
 * Total de Steps: 22
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L05: ApostilaLesson = {
  id: 'apostila-L05',
  lessonNumber: 5,
  title: 'Lição 5 — Velares e Líquidas',
  description: 'Gama, Capa, Chi, Lambda, Rô',
  apostilaPdfPage: 9,
  xpReward: 35,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L05-S01',
      type: 'intro',
      narration:
        'Hoje vamos aprender cinco letras: as velares (produzidas no fundo da garganta) gama, capa e chi, e as líquidas lambda e rô. Abra sua apostila na página 9.',
      displayText: 'Abra sua apostila na Página 9',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: GAMA ─────────────────────────────────────
    {
      id: 'apostila-L05-S02',
      type: 'word_intro',
      narration:
        'A primeira letra é o gama. Maiúsculo: Γ. Minúsculo: γ. O som é "g", como em "gato".',
      greekForm: 'Γ γ',
      transliteration: 'gama',
      pronunciation: 'g (como em \'gato\')',
      translation: 'Letra Gama',
      etymology:
        'Do Gimel hebraico (ג); antes do κ em grego (γγ) faz som nasal: \'ng\'',
      contextVerse: 'Mateus 28:18',
      contextVerseText:
        '"...todo o poder (πᾶσα ἐξουσία) me foi dado" — γ inicia γῆ (terra) e γράφω (escrever)',
      showGreekLarge: true,
    },

    // ─── S03 — ALPHABET_TRACE: GAMA ─────────────────────────────────
    {
      id: 'apostila-L05-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do gama minúsculo. Um traço horizontal curto no topo, depois um traço vertical descendente que faz uma curva suave para a direita na base, como um gancho.',
      greekForm: 'γ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S04 — WRITE_PRACTICE: GAMA ─────────────────────────────────
    {
      id: 'apostila-L05-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o gama minúsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'γ',
      transliteration: 'gama',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila — Gama minúsculo (γ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S05 — WORD_INTRO: CAPA ─────────────────────────────────────
    {
      id: 'apostila-L05-S05',
      type: 'word_intro',
      narration:
        'A segunda letra é o capa. Maiúsculo: Κ. Minúsculo: κ. O som é "k", como em "casa".',
      greekForm: 'Κ κ',
      transliteration: 'capa',
      pronunciation: 'k (como em \'casa\')',
      translation: 'Letra Capa',
      etymology:
        'Do Qoph hebraico (ק); deu origem ao \'Q\' latino; em grego substituiu o qoppa arcaico',
      contextVerse: 'João 1:3',
      contextVerseText:
        '"...por ele tudo foi feito (ἐγένετο)" — κ inicia κόσμος (mundo) e καρδία (coração)',
      showGreekLarge: true,
    },

    // ─── S06 — ALPHABET_TRACE: CAPA ─────────────────────────────────
    {
      id: 'apostila-L05-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do capa minúsculo. Haste vertical de cima para baixo, depois dois ramos diagonais saindo da haste: o primeiro para baixo e à esquerda, o segundo para baixo e à direita.',
      greekForm: 'κ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S07 — WRITE_PRACTICE: CAPA ─────────────────────────────────
    {
      id: 'apostila-L05-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o capa minúsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'κ',
      transliteration: 'capa',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila — Capa minúsculo (κ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: CHI ──────────────────────────────────────
    {
      id: 'apostila-L05-S08',
      type: 'word_intro',
      narration:
        'A terceira letra é o chi. Maiúsculo: Χ. Minúsculo: χ. O som é "ch" aspirado, como "Bach" em alemão.',
      greekForm: 'Χ χ',
      transliteration: 'chi',
      pronunciation: 'ch aspirado (como \'Bach\' em alemão)',
      translation: 'Letra Chi',
      etymology:
        'Aspirada velar; deu origem ao \'X\' latino quando usado na grafia de palavras gregas (ex: Χριστός = Christus)',
      contextVerse: 'Filipenses 1:21',
      contextVerseText:
        '"Para mim o viver é Cristo (Χριστός)" — χ é a inicial de Χριστός',
      showGreekLarge: true,
    },

    // ─── S09 — ALPHABET_TRACE: CHI ──────────────────────────────────
    {
      id: 'apostila-L05-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do chi minúsculo. Duas diagonais que se cruzam no centro: a primeira da esquerda para baixo e para a direita, a segunda da direita para baixo e para a esquerda.',
      greekForm: 'χ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S10 — WRITE_PRACTICE: CHI ──────────────────────────────────
    {
      id: 'apostila-L05-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o chi minúsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'χ',
      transliteration: 'chi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila — Chi minúsculo (χ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S11 — WORD_INTRO: LAMBDA ───────────────────────────────────
    {
      id: 'apostila-L05-S11',
      type: 'word_intro',
      narration:
        'A quarta letra é o lambda. Maiúsculo: Λ. Minúsculo: λ. O som é "l", como em "lua".',
      greekForm: 'Λ λ',
      transliteration: 'lambda',
      pronunciation: 'l (como em \'lua\')',
      translation: 'Letra Lambda',
      etymology:
        'Do Lamed hebraico (ל); forma triangular representava balança ou estaca; deu origem ao \'L\' latino',
      contextVerse: 'Lucas 1:1',
      contextVerseText:
        '"...visto que muitos (πολλοί)" — λ aparece em λόγος, λαός (povo)',
      showGreekLarge: true,
    },

    // ─── S12 — ALPHABET_TRACE: LAMBDA ───────────────────────────────
    {
      id: 'apostila-L05-S12',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do lambda minúsculo. Um arco curvo da esquerda para baixo e para a direita, depois uma haste diagonal curta saindo da parte inferior direita do arco. Forma de "v" invertido assimétrico.',
      greekForm: 'λ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S13 — WRITE_PRACTICE: LAMBDA ───────────────────────────────
    {
      id: 'apostila-L05-S13',
      type: 'write_practice',
      narration:
        'Agora escreva o lambda minúsculo oito vezes na linha 4 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'λ',
      transliteration: 'lambda',
      writeRepetitions: 8,
      writeInstruction: 'Linha 4 da apostila — Lambda minúsculo (λ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S14 — WORD_INTRO: RÔ ───────────────────────────────────────
    {
      id: 'apostila-L05-S14',
      type: 'word_intro',
      narration:
        'A quinta letra é o rô. Maiúsculo: Ρ. Minúsculo: ρ. O som é "r" vibrante, como em "rato".',
      greekForm: 'Ρ ρ',
      transliteration: 'rô',
      pronunciation: 'r vibrante (como em \'rato\')',
      translation: 'Letra Rô',
      etymology:
        'Do Resh hebraico (ר); corresponde ao \'R\' latino; no início de palavra pode ser aspirado (ῥ)',
      contextVerse: 'Romanos 1:16',
      contextVerseText:
        '"...para todo aquele que crê (πιστεύοντι)" — ρ aparece em ῥῆμα (palavra falada)',
      showGreekLarge: true,
    },

    // ─── S15 — ALPHABET_TRACE: RÔ ───────────────────────────────────
    {
      id: 'apostila-L05-S15',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do rô minúsculo. Um círculo fechado no topo, depois uma haste vertical descendente saindo da base do círculo.',
      greekForm: 'ρ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S16 — WRITE_PRACTICE: RÔ ───────────────────────────────────
    {
      id: 'apostila-L05-S16',
      type: 'write_practice',
      narration:
        'Agora escreva o rô minúsculo oito vezes na linha 5 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ρ',
      transliteration: 'rô',
      writeRepetitions: 8,
      writeInstruction: 'Linha 5 da apostila — Rô minúsculo (ρ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S17 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L05-S17',
      type: 'pause',
      narration:
        'Muito bem! Você aprendeu as velares e líquidas. Antes de continuar, olhe para o que escreveu nas cinco linhas e compare com o modelo.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S18 — DICTATION: GAMA ──────────────────────────────────────
    {
      id: 'apostila-L05-S18',
      type: 'dictation',
      narration: 'Escreva no papel: gama.',
      displayText: '"gama"',
      greekForm: 'Γ γ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S19 — DICTATION: CAPA ──────────────────────────────────────
    {
      id: 'apostila-L05-S19',
      type: 'dictation',
      narration: 'Escreva no papel: capa.',
      displayText: '"capa"',
      greekForm: 'Κ κ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S20 — DICTATION: CHI ───────────────────────────────────────
    {
      id: 'apostila-L05-S20',
      type: 'dictation',
      narration: 'Escreva no papel: chi.',
      displayText: '"chi"',
      greekForm: 'Χ χ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S21 — DICTATION: LAMBDA ────────────────────────────────────
    {
      id: 'apostila-L05-S21',
      type: 'dictation',
      narration: 'Escreva no papel: lambda.',
      displayText: '"lambda"',
      greekForm: 'Λ λ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S22 — DICTATION: RÔ ────────────────────────────────────────
    {
      id: 'apostila-L05-S22',
      type: 'dictation',
      narration: 'Escreva no papel: rô.',
      displayText: '"rô"',
      greekForm: 'Ρ ρ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

