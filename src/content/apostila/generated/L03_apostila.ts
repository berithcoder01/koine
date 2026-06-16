/**
 * L03 — Consoantes Labiais (β, π, φ)
 *
 * ID:               apostila-L03
 * TÍTULO:           Lição 3 — Consoantes com os Lábios
 * DESCRIÇÃO:        Beta, Pi, Fi
 * PDF_PAGE:         5
 * XP:               35
 * TEMPO:            10 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 14
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L03: ApostilaLesson = {
  id: 'apostila-L03',
  title: 'Lição 3 — Consoantes com os Lábios',
  description: 'Beta, Pi, Fi',
  apostilaPdfPage: 5,
  lessonNumber: 3,
  xpReward: 35,
  estimatedMinutes: 10,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L03-S01',
      type: 'intro',
      narration:
        'Hoje começamos as consoantes gregas. Os sons β, π e φ são produzidos com os lábios — como em português. Abra sua apostila na página 5 e acompanhe comigo.',
      displayText: 'Abra sua apostila na Página 5',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: BETA ─────────────────────────────────────
    {
      id: 'apostila-L03-S02',
      type: 'word_intro',
      narration:
        'A primeira letra é o beta. Maiúsculo: Β. Minúsculo: β. O som é "b", como em "bola".',
      greekForm: 'Β β',
      transliteration: 'beta',
      pronunciation: 'b (como em \'bola\')',
      translation: 'Letra Beta',
      etymology:
        'Do Bet hebraico (ב); segunda letra do alfabeto — daí a palavra "alfabeto" (alpha + beta)',
      contextVerse: 'Marcos 1:17',
      contextVerseText:
        '"Segui-me (ἀκολουθεῖτε)" — β aparece em verbos como βαπτίζω (batizar)',
      showGreekLarge: true,
    },

    // ─── S03 — ALPHABET_TRACE: BETA ─────────────────────────────────
    {
      id: 'apostila-L03-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do beta minúsculo: Haste vertical à esquerda, depois dois arcos à direita, o primeiro na altura do meio, o segundo na base.',
      greekForm: 'β',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S04 — WRITE_PRACTICE: BETA ─────────────────────────────────
    {
      id: 'apostila-L03-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o beta minúsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'β',
      transliteration: 'beta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila — Beta minúsculo (β)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S05 — WORD_INTRO: PI ───────────────────────────────────────
    {
      id: 'apostila-L03-S05',
      type: 'word_intro',
      narration:
        'A segunda letra é o pi. Maiúsculo: Π. Minúsculo: π. O som é "p", como em "pão".',
      greekForm: 'Π π',
      transliteration: 'pi',
      pronunciation: 'p (como em \'pão\')',
      translation: 'Letra Pi',
      etymology:
        'Do Pe hebraico (פ); famoso na matemática como π ≈ 3,14, mas no NT é apenas uma consoante',
      contextVerse: 'Filipenses 4:7',
      contextVerseText:
        '"...a paz (εἰρήνη)" — π inicia palavras como πίστις (fé) e πνεῦμα (espírito)',
      showGreekLarge: true,
    },

    // ─── S06 — ALPHABET_TRACE: PI ───────────────────────────────────
    {
      id: 'apostila-L03-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do pi minúsculo: Barra horizontal de cima para baixo, depois duas hastes verticais curtas, uma à esquerda e outra à direita.',
      greekForm: 'π',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S07 — WRITE_PRACTICE: PI ───────────────────────────────────
    {
      id: 'apostila-L03-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o pi minúsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'π',
      transliteration: 'pi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila — Pi minúsculo (π)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: FI ───────────────────────────────────────
    {
      id: 'apostila-L03-S08',
      type: 'word_intro',
      narration:
        'A terceira letra é o fi. Maiúsculo: Φ. Minúsculo: φ. O som é "f", como em "fé".',
      greekForm: 'Φ φ',
      transliteration: 'fi',
      pronunciation: 'f (como em \'fé\')',
      translation: 'Letra Fi',
      etymology:
        'Aspirada bilabial; emprestada ao latim como "ph" para representar o som f',
      contextVerse: 'João 1:1',
      contextVerseText:
        '"...a palavra (λόγος)" — φ aparece em φῶς (luz) e φιλέω (amar como amigo)',
      showGreekLarge: true,
    },

    // ─── S09 — ALPHABET_TRACE: FI ───────────────────────────────────
    {
      id: 'apostila-L03-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do fi minúsculo: Haste vertical de cima para baixo, depois um círculo fechado no centro da haste.',
      greekForm: 'φ',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S10 — WRITE_PRACTICE: FI ───────────────────────────────────
    {
      id: 'apostila-L03-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o fi minúsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'φ',
      transliteration: 'fi',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila — Fi minúsculo (φ)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S11 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L03-S11',
      type: 'pause',
      narration:
        'Muito bem! Você acabou de aprender as três consoantes labiais: beta, pi e fi. Antes de continuar, olhe para o que escreveu e compare com o modelo na apostila.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S12 — DICTATION: BETA ──────────────────────────────────────
    {
      id: 'apostila-L03-S12',
      type: 'dictation',
      narration: 'Escreva no papel: beta.',
      displayText: '"beta"',
      greekForm: 'Β β',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S13 — DICTATION: PI ────────────────────────────────────────
    {
      id: 'apostila-L03-S13',
      type: 'dictation',
      narration: 'Escreva no papel: pi.',
      displayText: '"pi"',
      greekForm: 'Π π',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: FI ────────────────────────────────────────
    {
      id: 'apostila-L03-S14',
      type: 'dictation',
      narration: 'Escreva no papel: fi.',
      displayText: '"fi"',
      greekForm: 'Φ φ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

