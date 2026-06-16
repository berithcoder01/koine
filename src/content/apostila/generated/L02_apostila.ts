/**
 * L02 — Vogais Longas e o Upsilon (ο, υ, ω)
 *
 * ID:               apostila-L02
 * TÍTULO:           Lição 2 — Vogais Longas e o Upsilon
 * DESCRIÇÃO:        Omicron, Upsilon, Omega
 * PDF_PAGE:         3
 * XP:               30
 * TEMPO:            10 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 14
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L02: ApostilaLesson = {
  id: 'apostila-L02',
  title: 'Lição 2 — Vogais Longas e o Upsilon',
  description: 'Omicron, Upsilon, Omega',
  apostilaPdfPage: 3,
  lessonNumber: 2,
  xpReward: 30,
  estimatedMinutes: 10,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L02-S01',
      type: 'intro',
      narration: 'Hoje completaremos as vogais gregas. Você aprenderá o omicron, o upsilon e finalmente o omega — o "o grande". Estas letras são essenciais para pronunciar corretamente as palavras do Novo Testamento. Abra sua apostila na página 3 e acompanhe comigo.',
      displayText: 'Abra sua apostila na Página 3',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: OMICRON ─────────────────────────────────
    {
      id: 'apostila-L02-S02',
      type: 'word_intro',
      narration: 'A primeira letra é o omicron. Maiúsculo: Ο. Minúsculo: ο. O som é "o" breve, como em "sol". O nome significa "o pequeno", para distinguir do ômega (o grande).',
      greekForm: 'Ο ο',
      transliteration: 'omicron',
      pronunciation: 'o breve (como em "sol")',
      translation: 'Letra Omicron',
      etymology: 'ο + μικρόν significa "o pequeno", para distinguir do ômega (o grande)',
      contextVerse: 'João 3:16',
      contextVerseText: '"...o mundo (κόσμον)" — ο aparece como terminação de substantivos masculinos no acusativo',
      showGreekLarge: true,
    },

    // ─── S03 — ALPHABET_TRACE: OMICRON ──────────────────────────────
    {
      id: 'apostila-L02-S03',
      type: 'alphabet_trace',
      narration: 'Observe a ordem dos traços do omicron minúsculo. Um único círculo fechado, traçado no sentido anti-horário.',
      greekForm: 'ο',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S04 — WRITE_PRACTICE: OMICRON ──────────────────────────────
    {
      id: 'apostila-L02-S04',
      type: 'write_practice',
      narration: 'Agora escreva o omicron minúsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ο',
      transliteration: 'omicron',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila — Omicron minúsculo (ο)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S05 — WORD_INTRO: UPSILON ──────────────────────────────────
    {
      id: 'apostila-L02-S05',
      type: 'word_intro',
      narration: 'A segunda letra é o upsilon. Maiúsculo: Υ. Minúsculo: υ. O som é "u" ou "ü", como em "tu" ou o alemão "ü". Absorvido no latim como Y, chamado "i grego".',
      greekForm: 'Υ υ',
      transliteration: 'upsilon',
      pronunciation: 'u ou ü (como em "tu")',
      translation: 'Letra Upsilon',
      etymology: 'ύ + ψιλόν, "u simples"; absorvido no latim como Y (chamado "i grego")',
      contextVerse: 'João 1:4',
      contextVerseText: '"...a vida (ζωή)" — o υ aparece em combinações como αυ e ευ formando ditongos',
      showGreekLarge: true,
    },

    // ─── S06 — ALPHABET_TRACE: UPSILON ──────────────────────────────
    {
      id: 'apostila-L02-S06',
      type: 'alphabet_trace',
      narration: 'Observe a ordem dos traços do upsilon minúsculo. Primeiro a haste vertical de cima para baixo, depois a bifurcação no topo, formando um "V" invertido.',
      greekForm: 'υ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S07 — WRITE_PRACTICE: UPSILON ──────────────────────────────
    {
      id: 'apostila-L02-S07',
      type: 'write_practice',
      narration: 'Agora escreva o upsilon minúsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'υ',
      transliteration: 'upsilon',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila — Upsilon minúsculo (υ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: OMEGA ────────────────────────────────────
    {
      id: 'apostila-L02-S08',
      type: 'word_intro',
      narration: 'A terceira letra é o ômega. Maiúsculo: Ω. Minúsculo: ω. O som é "ô" longo, como em "avô". É a última letra do alfabeto grego. No Apocalipse, Deus declara: "Eu sou o Alfa e o Ômega".',
      greekForm: 'Ω ω',
      transliteration: 'omega',
      pronunciation: 'ô longo (como em "avô")',
      translation: 'Letra Ômega',
      etymology: 'ω + μέγα significa "o grande", contraparte longa do omicron',
      contextVerse: 'Apocalipse 22:13',
      contextVerseText: '"Eu sou o Alfa e o Ômega (Ω), o primeiro e o último" — última letra do alfabeto',
      showGreekLarge: true,
    },

    // ─── S09 — ALPHABET_TRACE: OMEGA ────────────────────────────────
    {
      id: 'apostila-L02-S09',
      type: 'alphabet_trace',
      narration: 'Observe a ordem dos traços do omega minúsculo. Primeiro arco à esquerda, de cima para baixo. Segundo arco à direita, unindo-se ao primeiro na base.',
      greekForm: 'ω',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S10 — WRITE_PRACTICE: OMEGA ────────────────────────────────
    {
      id: 'apostila-L02-S10',
      type: 'write_practice',
      narration: 'Agora escreva o omega minúsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ω',
      transliteration: 'omega',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila — Omega minúsculo (ω)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S11 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L02-S11',
      type: 'pause',
      narration: 'Muito bem! Agora você conhece todas as sete vogais gregas. Compare as letras que escreveu com o modelo na apostila, especialmente os pares ο/ω (breve vs longo) e o υ (som único).',
      displayText: 'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S12 — DICTATION: OMICRON ───────────────────────────────────
    {
      id: 'apostila-L02-S12',
      type: 'dictation',
      narration: 'Escreva no papel: omicron.',
      displayText: '"omicron"',
      greekForm: 'Ο ο',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S13 — DICTATION: UPSILON ───────────────────────────────────
    {
      id: 'apostila-L02-S13',
      type: 'dictation',
      narration: 'Escreva no papel: upsilon.',
      displayText: '"upsilon"',
      greekForm: 'Υ υ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: OMEGA ─────────────────────────────────────
    {
      id: 'apostila-L02-S14',
      type: 'dictation',
      narration: 'Escreva no papel: omega.',
      displayText: '"omega"',
      greekForm: 'Ω ω',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

