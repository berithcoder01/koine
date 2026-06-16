/**
 * L13 — Salvação e Julgamento (σωτηρία, νόμος, δικαιοσύνη, κρίσις, θάνατος)
 *
 * ID:               apostila-L13
 * TÍTULO:           Lição 13 — Salvação e Julgamento
 * DESCRIÇÃO:        σωτηρία, νόμος, δικαιοσύνη, κρίσις, θάνατος
 * PDF_PAGE:         27
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L13: ApostilaLesson = {
  id: 'apostila-L13',
  lessonNumber: 13,
  title: 'Lição 13 — Salvação e Julgamento',
  description: 'σωτηρία, νόμος, δικαιοσύνη, κρίσις, θάνατος',
  apostilaPdfPage: 27,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L13-S01',
      type: 'intro',
      narration:
        'Lição 13 — Salvação e julgamento. Palavras pesadas que definem o evangelho: soteria, nómos, dikaiosýne, krísis e thánatos. Abra sua apostila na página 27.',
      displayText: 'Abra sua apostila na Página 27',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: σωτηρία ──────────────────────────────────
    {
      id: 'apostila-L13-S02',
      type: 'word_intro',
      narration:
        'σωτηρία, salvação. Em Romanos 1:16, Paulo declara: "O evangelho é o poder de Deus para salvação (σωτηρίαν) de todo aquele que crê."',
      greekForm: 'σωτηρία',
      transliteration: 'sōtēría',
      pronunciation: 'so-te-RÍ-a',
      translation: 'salvação / libertação',
      etymology:
        'De σῴζω (salvar); σωτήρ (Salvador) é título de imperadores romanos — Paulo o reivindica para Cristo',
      contextVerse: 'Romanos 1:16',
      contextVerseText:
        '"O evangelho... é o poder de Deus para salvação (σωτηρίαν) de todo aquele que crê"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S03 — WRITE_PRACTICE: σωτηρία ──────────────────────────────
    {
      id: 'apostila-L13-S03',
      type: 'write_practice',
      narration:
        'Agora escreva σωτηρία cinco vezes na linha 1. Pronuncie: so-te-RÍ-a.',
      greekForm: 'σωτηρία',
      transliteration: 'sōtēría',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — σωτηρία',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S04 — WORD_INTRO: νόμος ────────────────────────────────────
    {
      id: 'apostila-L13-S04',
      type: 'word_intro',
      narration:
        'νόμος, lei. Em Romanos 3:31, Paulo pergunta: "Anulamos a lei (νόμον) pela fé? De modo nenhum! Antes a confirmamos."',
      greekForm: 'νόμος',
      transliteration: 'nómos',
      pronunciation: 'NÓ-mos',
      translation: 'lei / Torá / princípio',
      etymology:
        'De νέμω, distribuir; a lei como ordem distribuída e atribuída',
      contextVerse: 'Romanos 3:31',
      contextVerseText:
        '"De modo que anulamos a lei (νόμον) pela fé? De modo nenhum! Antes a confirmamos"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S05 — WRITE_PRACTICE: νόμος ────────────────────────────────
    {
      id: 'apostila-L13-S05',
      type: 'write_practice',
      narration:
        'Agora escreva νόμος cinco vezes na linha 2. Pronuncie: NÓ-mos.',
      greekForm: 'νόμος',
      transliteration: 'nómos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — νόμος',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S06 — WORD_INTRO: δικαιοσύνη ───────────────────────────────
    {
      id: 'apostila-L13-S06',
      type: 'word_intro',
      narration:
        'δικαιοσύνη, justiça. Em Romanos 3:22: "A justiça (δικαιοσύνη) de Deus pela fé em Jesus Cristo para todos os que creem."',
      greekForm: 'δικαιοσύνη',
      transliteration: 'dikaiosýnē',
      pronunciation: 'di-kai-o-SÍ-ne',
      translation: 'justiça / retidão',
      etymology:
        'De δίκαιος (justo); conceito central em Paulo: ser declarado justo por Deus',
      contextVerse: 'Romanos 3:22',
      contextVerseText:
        '"A justiça (δικαιοσύνη) de Deus pela fé em Jesus Cristo para todos os que creem"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S07 — WRITE_PRACTICE: δικαιοσύνη ───────────────────────────
    {
      id: 'apostila-L13-S07',
      type: 'write_practice',
      narration:
        'Agora escreva δικαιοσύνη cinco vezes na linha 3. Pronuncie: di-kai-o-SÍ-ne.',
      greekForm: 'δικαιοσύνη',
      transliteration: 'dikaiosýnē',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — δικαιοσύνη',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: κρίσις ───────────────────────────────────
    {
      id: 'apostila-L13-S08',
      type: 'word_intro',
      narration:
        'κρίσις, julgamento. Em João 3:19: "Esta é a condenação (κρίσις): a luz veio ao mundo, mas os homens amaram mais as trevas."',
      greekForm: 'κρίσις',
      transliteration: 'krísis',
      pronunciation: 'KRÍ-sis',
      translation: 'julgamento / decisão',
      etymology:
        'Deu origem a "crise" e "crítica"; o ponto de decisão onde o destino é determinado',
      contextVerse: 'João 3:19',
      contextVerseText:
        '"Esta é a condenação (κρίσις): a luz veio ao mundo, mas os homens amaram mais as trevas"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S09 — WRITE_PRACTICE: κρίσις ───────────────────────────────
    {
      id: 'apostila-L13-S09',
      type: 'write_practice',
      narration:
        'Agora escreva κρίσις cinco vezes na linha 4. Pronuncie: KRÍ-sis.',
      greekForm: 'κρίσις',
      transliteration: 'krísis',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — κρίσις',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S10 — WORD_INTRO: θάνατος ──────────────────────────────────
    {
      id: 'apostila-L13-S10',
      type: 'word_intro',
      narration:
        'θάνατος, morte. Em Romanos 6:23: "O salário do pecado é a morte (θάνατος), mas o dom gratuito de Deus é a vida eterna."',
      greekForm: 'θάνατος',
      transliteration: 'thánatos',
      pronunciation: 'TÂ-na-tos',
      translation: 'morte',
      etymology:
        'Deu origem a "eutanásia" (boa morte); Paulo o personifica como inimigo em 1 Cor 15',
      contextVerse: 'Romanos 6:23',
      contextVerseText:
        '"Porque o salário do pecado é a morte (θάνατος), mas o dom gratuito de Deus é a vida eterna"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S11 — WRITE_PRACTICE: θάνατος ──────────────────────────────
    {
      id: 'apostila-L13-S11',
      type: 'write_practice',
      narration:
        'Agora escreva θάνατος cinco vezes na linha 5. Pronuncie: TÂ-na-tos.',
      greekForm: 'θάνατος',
      transliteration: 'thánatos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — θάνατος',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S12 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L13-S12',
      type: 'pause',
      narration:
        'Salvação, lei, justiça, julgamento e morte — o vocabulário da cruz. Releia estas palavras.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S13 — DICTATION: σωτηρία ───────────────────────────────────
    {
      id: 'apostila-L13-S13',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "salvação".',
      displayText: '"salvação"',
      greekForm: 'σωτηρία',
      translation: 'salvação',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: νόμος ─────────────────────────────────────
    {
      id: 'apostila-L13-S14',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "lei".',
      displayText: '"lei"',
      greekForm: 'νόμος',
      translation: 'lei',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: δικαιοσύνη ────────────────────────────────
    {
      id: 'apostila-L13-S15',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "justiça".',
      displayText: '"justiça"',
      greekForm: 'δικαιοσύνη',
      translation: 'justiça',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: κρίσις ────────────────────────────────────
    {
      id: 'apostila-L13-S16',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "julgamento".',
      displayText: '"julgamento"',
      greekForm: 'κρίσις',
      translation: 'julgamento',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: θάνατος ───────────────────────────────────
    {
      id: 'apostila-L13-S17',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "morte".',
      displayText: '"morte"',
      greekForm: 'θάνατος',
      translation: 'morte',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

