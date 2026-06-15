/**
 * L04 — Consoantes Dentais (δ, τ, θ)
 *
 * ID:               apostila-L04
 * TÍTULO:           Lição 4 — Consoantes com a Língua
 * DESCRIÇÃO:        Delta, Tau, Teta
 * PDF_PAGE:         7
 * XP:               35
 * TEMPO:            10 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 14
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L04: ApostilaLesson = {
  id: 'apostila-L04',
  title: 'Lição 4 — Consoantes com a Língua',
  description: 'Delta, Tau, Teta',
  apostilaPdfPage: 7,
  lessonNumber: 4,
  xpReward: 35,
  estimatedMinutes: 10,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L04-S01',
      type: 'intro',
      narration:
        'Hoje vamos estudar as consoantes dentais. Esses sons são produzidos com a língua nos dentes: delta, tau e teta. Abra sua apostila na página 7.',
      displayText: 'Abra sua apostila na Página 7',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: DELTA ────────────────────────────────────
    {
      id: 'apostila-L04-S02',
      type: 'word_intro',
      narration:
        'A primeira letra é o delta. Maiúsculo: Δ. Minúsculo: δ. O som é "d", como em "dado".',
      greekForm: 'Δ δ',
      transliteration: 'delta',
      pronunciation: 'd (como em \'dado\')',
      translation: 'Letra Delta',
      etymology:
        'Do Dalet hebraico (ד); forma triangular foi usada para representar o rio Nilo — daí "delta"',
      contextVerse: 'João 1:14',
      contextVerseText:
        '"O Verbo se fez carne (σάρξ)" — δ aparece em δόξα (glória) e δύναμις (poder)',
      showGreekLarge: true,
    },

    // ─── S03 — ALPHABET_TRACE: DELTA ────────────────────────────────
    {
      id: 'apostila-L04-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do delta minúsculo: Primeiro o arco curvo da esquerda para baixo formando um semicírculo aberto, depois a haste vertical à direita, levemente inclinada.',
      greekForm: 'δ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S04 — WRITE_PRACTICE: DELTA ────────────────────────────────
    {
      id: 'apostila-L04-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o delta minúsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'δ',
      transliteration: 'delta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila — Delta minúsculo (δ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S05 — WORD_INTRO: TAU ──────────────────────────────────────
    {
      id: 'apostila-L04-S05',
      type: 'word_intro',
      narration:
        'A segunda letra é o tau. Maiúsculo: Τ. Minúsculo: τ. O som é "t", como em "tudo".',
      greekForm: 'Τ τ',
      transliteration: 'tau',
      pronunciation: 't (como em \'tudo\')',
      translation: 'Letra Tau',
      etymology:
        'Do Taw hebraico (ת); forma em cruz (+) foi associada pelos primeiros cristãos à cruz de Cristo',
      contextVerse: 'Ezequiel 9:4 (citado em Apocalipse)',
      contextVerseText:
        '"...marca o τ (tau) na testa" — sinal de proteção na tradição judaica',
      showGreekLarge: true,
    },

    // ─── S06 — ALPHABET_TRACE: TAU ──────────────────────────────────
    {
      id: 'apostila-L04-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do tau minúsculo: Primeiro a barra horizontal de cima para baixo, depois a haste vertical curta no centro, abaixo da barra.',
      greekForm: 'τ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S07 — WRITE_PRACTICE: TAU ──────────────────────────────────
    {
      id: 'apostila-L04-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o tau minúsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'τ',
      transliteration: 'tau',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila — Tau minúsculo (τ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: TETA ─────────────────────────────────────
    {
      id: 'apostila-L04-S08',
      type: 'word_intro',
      narration:
        'A terceira letra é o teta. Maiúsculo: Θ. Minúsculo: θ. O som é "th" aspirado, como em "think" do inglês.',
      greekForm: 'Θ θ',
      transliteration: 'teta',
      pronunciation: 'th aspirado (como \'think\' em inglês)',
      translation: 'Letra Teta',
      etymology:
        'Aspirada dental; não tem equivalente em português — soa como "th" do inglês "think"',
      contextVerse: 'João 1:1',
      contextVerseText:
        '"...e Deus (θεός) era o Verbo" — θ inicia θεός, θέλω, θάνατος (morte)',
      showGreekLarge: true,
    },

    // ─── S09 — ALPHABET_TRACE: TETA ─────────────────────────────────
    {
      id: 'apostila-L04-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do teta minúsculo: Primeiro um círculo fechado completo, depois o traço horizontal no centro do círculo.',
      greekForm: 'θ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S10 — WRITE_PRACTICE: TETA ─────────────────────────────────
    {
      id: 'apostila-L04-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o teta minúsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'θ',
      transliteration: 'teta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila — Teta minúsculo (θ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S11 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L04-S11',
      type: 'pause',
      narration:
        'Excelente! Você aprendeu as três consoantes dentais: delta, tau e teta. Antes de continuar, olhe para o que escreveu e compare com o modelo.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S12 — DICTATION: DELTA ─────────────────────────────────────
    {
      id: 'apostila-L04-S12',
      type: 'dictation',
      narration: 'Escreva no papel: delta.',
      displayText: '"delta"',
      greekForm: 'Δ δ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S13 — DICTATION: TAU ───────────────────────────────────────
    {
      id: 'apostila-L04-S13',
      type: 'dictation',
      narration: 'Escreva no papel: tau.',
      displayText: '"tau"',
      greekForm: 'Τ τ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: TETA ──────────────────────────────────────
    {
      id: 'apostila-L04-S14',
      type: 'dictation',
      narration: 'Escreva no papel: teta.',
      displayText: '"teta"',
      greekForm: 'Θ θ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
