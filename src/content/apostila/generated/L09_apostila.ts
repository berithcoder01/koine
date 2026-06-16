/**
 * L09 — O Ser Humano (ἄνθρωπος, καρδία, ψυχή, σάρξ, ἁμαρτία)
 *
 * ID:               apostila-L09
 * TÍTULO:           Lição 9 — O Ser Humano
 * DESCRIÇÃO:        ἄνθρωπος, καρδία, ψυχή, σάρξ, ἁμαρτία
 * PDF_PAGE:         19
 * XP:               40
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L09: ApostilaLesson = {
  id: 'apostila-L09',
  lessonNumber: 9,
  title: 'Lição 9 — O Ser Humano',
  description: 'ἄνθρωπος, καρδία, ψυχή, σάρξ, ἁμαρτία',
  apostilaPdfPage: 19,
  xpReward: 40,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L09-S01',
      type: 'intro',
      narration:
        'Lição 9 — O ser humano. Hoje vamos aprender palavras que descrevem o ser humano diante de Deus: ánthropos, kardía, psyqué, sárx e hamartía. Abra sua apostila na página 19.',
      displayText: 'Abra sua apostila na Página 19',
    },

    // ─── S02 — WORD_INTRO: ἄνθρωπος ────────────────────────────────
    {
      id: 'apostila-L09-S02',
      type: 'word_intro',
      narration:
        'ἄνθρωπος (ánthrōpos) — ser humano / homem. E a vida era a luz dos homens. Possível origem em ἀνήρ + ὤψ.',
      displayText: 'ἄνθρωπος — Ser Humano',
      greekForm: 'ἄνθρωπος',
      transliteration: 'ánthrōpos',
      pronunciation: 'ÂN-trô-pos',
      translation: 'Ser Humano / Homem',
      etymology:
        'Possível origem em ἀνήρ (homem) + ὤψ (rosto); o ser que olha para cima',
      contextVerse: 'João 1:4',
      contextVerseText:
        '"E a vida era a luz dos homens (ἀνθρώπων)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S03 — WRITE_PRACTICE: ἄνθρωπος ────────────────────────────
    {
      id: 'apostila-L09-S03',
      type: 'write_practice',
      narration:
        'Agora escreva ἄνθρωπος cinco vezes na linha 1. Pronuncie: ÂN-trô-pos.',
      displayText: 'ἄνθρωπος × 5',
      greekForm: 'ἄνθρωπος',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — ἄνθρωπος',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S04 — WORD_INTRO: καρδία ──────────────────────────────────
    {
      id: 'apostila-L09-S04',
      type: 'word_intro',
      narration:
        'καρδία (kardía) — coração / sede da vontade. Bem-aventurados os limpos de coração. No pensamento bíblico, o coração é o centro das decisões.',
      displayText: 'καρδία — Coração',
      greekForm: 'καρδία',
      transliteration: 'kardía',
      pronunciation: 'kar-DÍ-a',
      translation: 'Coração / Sede da Vontade',
      etymology:
        'No pensamento hebraico-grego, o coração é o centro das decisões, não das emoções apenas',
      contextVerse: 'Mateus 5:8',
      contextVerseText:
        '"Bem-aventurados os limpos de coração (καρδίᾳ)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S05 — WRITE_PRACTICE: καρδία ──────────────────────────────
    {
      id: 'apostila-L09-S05',
      type: 'write_practice',
      narration:
        'Agora escreva καρδία cinco vezes na linha 2. Pronuncie: kar-DÍ-a.',
      displayText: 'καρδία × 5',
      greekForm: 'καρδία',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — καρδία',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S06 — WORD_INTRO: ψυχή ────────────────────────────────────
    {
      id: 'apostila-L09-S06',
      type: 'word_intro',
      narration:
        'ψυχή (psychḗ) — alma / ser interior / vida. Pois que aproveitará ao homem ganhar o mundo e perder a sua alma?',
      displayText: 'ψυχή — Alma',
      greekForm: 'ψυχή',
      transliteration: 'psychḗ',
      pronunciation: 'psi-KÊ',
      translation: 'Alma / Ser Interior / Vida',
      etymology:
        'Deu origem a "psicologia" e "psiquiatria"; distinto de πνεῦμα (espírito) e σῶμα (corpo)',
      contextVerse: 'Mateus 16:26',
      contextVerseText:
        '"Pois que aproveitará ao homem ganhar o mundo inteiro e perder a sua alma (ψυχήν)?"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S07 — WRITE_PRACTICE: ψυχή ─────────────────────────────────
    {
      id: 'apostila-L09-S07',
      type: 'write_practice',
      narration:
        'Agora escreva ψυχή cinco vezes na linha 3. Pronuncie: psi-KÊ.',
      displayText: 'ψυχή × 5',
      greekForm: 'ψυχή',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — ψυχή',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: σάρξ ────────────────────────────────────
    {
      id: 'apostila-L09-S08',
      type: 'word_intro',
      narration:
        'σάρξ (sárx) — carne / natureza humana. E o Verbo se fez carne e habitou entre nós. Paulo usa para a natureza humana sem Deus.',
      displayText: 'σάρξ — Carne',
      greekForm: 'σάρξ',
      transliteration: 'sárx',
      pronunciation: 'SÁRKS',
      translation: 'Carne / Natureza Humana',
      etymology:
        'Frequentemente usado por Paulo para indicar a natureza humana sem Deus, não apenas o corpo físico',
      contextVerse: 'João 1:14',
      contextVerseText:
        '"E o Verbo se fez carne (σάρξ) e habitou entre nós"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S09 — WRITE_PRACTICE: σάρξ ─────────────────────────────────
    {
      id: 'apostila-L09-S09',
      type: 'write_practice',
      narration:
        'Agora escreva σάρξ cinco vezes na linha 4. Pronuncie: SÁRKS.',
      displayText: 'σάρξ × 5',
      greekForm: 'σάρξ',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — σάρξ',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S10 — WORD_INTRO: ἁμαρτία ────────────────────────────────
    {
      id: 'apostila-L09-S10',
      type: 'word_intro',
      narration:
        'ἁμαρτία (hamartía) — pecado / desvio do alvo. Porque todos pecaram e destituídos estão da glória de Deus.',
      displayText: 'ἁμαρτία — Pecado',
      greekForm: 'ἁμαρτία',
      transliteration: 'hamartía',
      pronunciation: 'a-mar-TÍ-a',
      translation: 'Pecado / Desvio do Alvo',
      etymology:
        'Do verbo ἁμαρτάνω, errar o alvo; imagine uma flecha que não acerta o centro',
      contextVerse: 'Romanos 3:23',
      contextVerseText:
        '"Porque todos pecaram (ἥμαρτον) e destituídos estão da glória de Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S11 — WRITE_PRACTICE: ἁμαρτία ────────────────────────────
    {
      id: 'apostila-L09-S11',
      type: 'write_practice',
      narration:
        'Agora escreva ἁμαρτία cinco vezes na linha 5. Pronuncie: a-mar-TÍ-a.',
      displayText: 'ἁμαρτία × 5',
      greekForm: 'ἁμαρτία',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — ἁμαρτία',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S12 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L09-S12',
      type: 'pause',
      narration:
        'Você escreveu palavras que definem a condição humana. Reflita: todas estas palavras apontam para a necessidade de Deus.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
    },

    // ─── S13 — DICTATION: ἄνθρωπος ─────────────────────────────────
    {
      id: 'apostila-L09-S13',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'ser humano'.",
      displayText: 'ser humano',
      greekForm: 'ἄνθρωπος',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: καρδία ──────────────────────────────────
    {
      id: 'apostila-L09-S14',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'coração'.",
      displayText: 'coração',
      greekForm: 'καρδία',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: ψυχή ────────────────────────────────────
    {
      id: 'apostila-L09-S15',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'alma'.",
      displayText: 'alma',
      greekForm: 'ψυχή',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: σάρξ ────────────────────────────────────
    {
      id: 'apostila-L09-S16',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'carne'.",
      displayText: 'carne',
      greekForm: 'σάρξ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: ἁμαρτία ─────────────────────────────────
    {
      id: 'apostila-L09-S17',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'pecado'.",
      displayText: 'pecado',
      greekForm: 'ἁμαρτία',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

