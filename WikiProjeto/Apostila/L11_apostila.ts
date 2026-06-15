/**
 * L11 — Tempo e Reino (βασιλεία, αἰών, ἡμέρα, νύξ, ὥρα)
 *
 * ID:               apostila-L11
 * TÍTULO:           Lição 11 — Tempo e Reino
 * DESCRIÇÃO:        βασιλεία, αἰών, ἡμέρα, νύξ, ὥρα
 * PDF_PAGE:         23
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L11: ApostilaLesson = {
  id: 'apostila-L11',
  lessonNumber: 11,
  title: 'Lição 11 — Tempo e Reino',
  description: 'βασιλεία, αἰών, ἡμέρα, νύξ, ὥρα',
  apostilaPdfPage: 23,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L11-S01',
      type: 'intro',
      narration:
        'Lição 11 — Tempo e Reino. Hoje vamos aprender cinco palavras que estruturam o tempo e o propósito de Deus: basileía, aión, heméra, nýx e hóra. Abra sua apostila na página 23.',
      displayText: 'Abra sua apostila na Página 23',
    },

    // ─── S02 — WORD_INTRO: βασιλεία ────────────────────────────────
    {
      id: 'apostila-L11-S02',
      type: 'word_intro',
      narration:
        'βασιλεία (basileía) — reino / reinado / soberania. Venha o teu reino, seja feita a tua vontade. De βασιλεύς (rei).',
      displayText: 'βασιλεία — Reino',
      greekForm: 'βασιλεία',
      transliteration: 'basileía',
      pronunciation: 'ba-si-LEI-a',
      translation: 'Reino / Reinado / Soberania',
      etymology:
        'De βασιλεύς (rei); implica tanto o ato de reinar quanto o território reinado',
      contextVerse: 'Mateus 6:10',
      contextVerseText:
        '"Venha o teu reino (βασιλεία), seja feita a tua vontade"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S03 — WRITE_PRACTICE: βασιλεία ────────────────────────────
    {
      id: 'apostila-L11-S03',
      type: 'write_practice',
      narration:
        'Agora escreva βασιλεία cinco vezes na linha 1. Pronuncie: ba-si-LEI-a.',
      displayText: 'βασιλεία × 5',
      greekForm: 'βασιλεία',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — βασιλεία',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S04 — WORD_INTRO: αἰών ────────────────────────────────────
    {
      id: 'apostila-L11-S04',
      type: 'word_intro',
      narration:
        'αἰών (aiṓn) — era / eternidade / século. Acima de todo principado, não só neste século mas também no vindouro. Deu origem a "eon".',
      displayText: 'αἰών — Era / Eternidade',
      greekForm: 'αἰών',
      transliteration: 'aiṓn',
      pronunciation: 'a-IÔN',
      translation: 'Era / Eternidade / Século',
      etymology:
        'Deu origem a "eon"; no NT pode significar "esta era" vs "a era vindoura"',
      contextVerse: 'Efésios 1:21',
      contextVerseText:
        '"...acima de todo principado... não só neste século (αἰῶνι) mas também no vindouro"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S05 — WRITE_PRACTICE: αἰών ────────────────────────────────
    {
      id: 'apostila-L11-S05',
      type: 'write_practice',
      narration:
        'Agora escreva αἰών cinco vezes na linha 2. Pronuncie: a-IÔN.',
      displayText: 'αἰών × 5',
      greekForm: 'αἰών',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — αἰών',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S06 — WORD_INTRO: ἡμέρα ──────────────────────────────────
    {
      id: 'apostila-L11-S06',
      type: 'word_intro',
      narration:
        'ἡμέρα (hēméra) — dia. Não são doze as horas do dia? A Septuaginta usa para o "Dia do Senhor".',
      displayText: 'ἡμέρα — Dia',
      greekForm: 'ἡμέρα',
      transliteration: 'hēméra',
      pronunciation: 'e-MÉ-ra',
      translation: 'Dia',
      etymology:
        'Raiz indo-europeia de calor/dia; a Septuaginta usa para o "Dia do Senhor" (יוֹם יְהוָה)',
      contextVerse: 'João 11:9',
      contextVerseText:
        '"Não são doze as horas do dia (ἡμέρας)?"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S07 — WRITE_PRACTICE: ἡμέρα ──────────────────────────────
    {
      id: 'apostila-L11-S07',
      type: 'write_practice',
      narration:
        'Agora escreva ἡμέρα cinco vezes na linha 3. Pronuncie: e-MÉ-ra.',
      displayText: 'ἡμέρα × 5',
      greekForm: 'ἡμέρα',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — ἡμέρα',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: νύξ ────────────────────────────────────
    {
      id: 'apostila-L11-S08',
      type: 'word_intro',
      narration:
        'νύξ (nýx) — noite. Este veio ter com Jesus de noite — Nicodemos, símbolo de busca na escuridão. Deu origem a "noturno".',
      displayText: 'νύξ — Noite',
      greekForm: 'νύξ',
      transliteration: 'nýx',
      pronunciation: 'NÍKS',
      translation: 'Noite',
      etymology:
        'Deu origem a "noturno"; em João 3:2, Nicodemos vem à noite — simbolismo intencional',
      contextVerse: 'João 3:2',
      contextVerseText:
        '"Este veio ter com Jesus de noite (νυκτός)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S09 — WRITE_PRACTICE: νύξ ─────────────────────────────────
    {
      id: 'apostila-L11-S09',
      type: 'write_practice',
      narration:
        'Agora escreva νύξ cinco vezes na linha 4. Pronuncie: NÍKS.',
      displayText: 'νύξ × 5',
      greekForm: 'νύξ',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — νύξ',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S10 — WORD_INTRO: ὥρα ────────────────────────────────────
    {
      id: 'apostila-L11-S10',
      type: 'word_intro',
      narration:
        'ὥρα (hṓra) — hora / momento oportuno. Ainda não é chegada a minha hora. João 2:4 usa no sentido de momento certo.',
      displayText: 'ὥρα — Hora',
      greekForm: 'ὥρα',
      transliteration: 'hṓra',
      pronunciation: 'Ô-ra',
      translation: 'Hora / Momento Oportuno',
      etymology:
        'Não apenas marcação de tempo, mas "o momento certo"; João 2:4 usa este sentido',
      contextVerse: 'João 2:4',
      contextVerseText:
        '"Ainda não é chegada a minha hora (ὥρα)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S11 — WRITE_PRACTICE: ὥρα ────────────────────────────────
    {
      id: 'apostila-L11-S11',
      type: 'write_practice',
      narration:
        'Agora escreva ὥρα cinco vezes na linha 5. Pronuncie: Ô-ra.',
      displayText: 'ὥρα × 5',
      greekForm: 'ὥρα',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — ὥρα',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S12 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L11-S12',
      type: 'pause',
      narration:
        'Você aprendeu palavras que falam do tempo e da eternidade. Reflita: o tempo foi criado por Deus para revelar o seu Reino.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
    },

    // ─── S13 — DICTATION: βασιλεία ────────────────────────────────
    {
      id: 'apostila-L11-S13',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'reino'.",
      displayText: 'reino',
      greekForm: 'βασιλεία',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: αἰών ─────────────────────────────────────
    {
      id: 'apostila-L11-S14',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'era/eternidade'.",
      displayText: 'era/eternidade',
      greekForm: 'αἰών',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: ἡμέρα ────────────────────────────────────
    {
      id: 'apostila-L11-S15',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'dia'.",
      displayText: 'dia',
      greekForm: 'ἡμέρα',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: νύξ ─────────────────────────────────────
    {
      id: 'apostila-L11-S16',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'noite'.",
      displayText: 'noite',
      greekForm: 'νύξ',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: ὥρα ─────────────────────────────────────
    {
      id: 'apostila-L11-S17',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'hora'.",
      displayText: 'hora',
      greekForm: 'ὥρα',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
