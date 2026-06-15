/**
 * L08 — Nomes Divinos (θεός, κύριος, Χριστός, υἱός, πνεῦμα)
 *
 * ID:               apostila-L08
 * TÍTULO:           Lição 8 — Nomes Divinos
 * DESCRIÇÃO:        θεός, κύριος, Χριστός, υἱός, πνεῦμα
 * PDF_PAGE:         17
 * XP:               40
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L08: ApostilaLesson = {
  id: 'apostila-L08',
  lessonNumber: 8,
  title: 'Lição 8 — Nomes Divinos',
  description: 'θεός, κύριος, Χριστός, υἱός, πνεῦμα',
  apostilaPdfPage: 17,
  xpReward: 40,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L08-S01',
      type: 'intro',
      narration:
        'Lição 8 — Nomes divinos. Hoje você vai aprender os nomes mais sagrados do Novo Testamento: Theós, Kýrios, Christós, Hiós e Pneuma. Estas palavras aparecem em cada página do NT. Abra sua apostila na página 17.',
      displayText: 'Abra sua apostila na Página 17',
    },

    // ─── S02 — WORD_INTRO: θεός ─────────────────────────────────────
    {
      id: 'apostila-L08-S02',
      type: 'word_intro',
      narration:
        'θεός (theós) — Deus. No princípio era o Verbo, e o Verbo estava com Deus. Raiz indo-europeia *dhes-, sagrado.',
      displayText: 'θεός — Deus',
      greekForm: 'θεός',
      transliteration: 'theós',
      pronunciation: 'te-ÓS',
      translation: 'Deus',
      etymology:
        'Raiz indo-europeia *dhes-, sagrado; base da teologia (θεο+λόγος)',
      contextVerse: 'João 1:1',
      contextVerseText:
        '"No princípio era o Verbo, e o Verbo estava com Deus (θεόν)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S03 — WRITE_PRACTICE: θεός ────────────────────────────────
    {
      id: 'apostila-L08-S03',
      type: 'write_practice',
      narration:
        'Agora escreva θεός cinco vezes na linha 1 da sua apostila. Pronuncie em voz alta: te-ÓS.',
      displayText: 'θεός × 5',
      greekForm: 'θεός',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — θεός',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S04 — WORD_INTRO: κύριος ──────────────────────────────────
    {
      id: 'apostila-L08-S04',
      type: 'word_intro',
      narration:
        'κύριος (kýrios) — Senhor / Mestre. E toda língua confesse que Jesus Cristo é Senhor. De κῦρος, autoridade.',
      displayText: 'κύριος — Senhor',
      greekForm: 'κύριος',
      transliteration: 'kýrios',
      pronunciation: 'KÍ-ri-os',
      translation: 'Senhor / Mestre',
      etymology:
        'De κῦρος, autoridade; a Septuaginta usa κύριος para traduzir יהוה (YHWH)',
      contextVerse: 'Filipenses 2:11',
      contextVerseText:
        '"E toda língua confesse que Jesus Cristo é Senhor (Κύριος)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S05 — WRITE_PRACTICE: κύριος ──────────────────────────────
    {
      id: 'apostila-L08-S05',
      type: 'write_practice',
      narration:
        'Agora escreva κύριος cinco vezes na linha 2. Pronuncie: KÍ-ri-os.',
      displayText: 'κύριος × 5',
      greekForm: 'κύριος',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — κύριος',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S06 — WORD_INTRO: Χριστός ─────────────────────────────────
    {
      id: 'apostila-L08-S06',
      type: 'word_intro',
      narration:
        'Χριστός (Christós) — Cristo / Ungido. Tu és o Cristo, o Filho do Deus vivo. Tradução do hebraico Messias.',
      displayText: 'Χριστός — Cristo',
      greekForm: 'Χριστός',
      transliteration: 'Christós',
      pronunciation: 'cris-TÓS',
      translation: 'Cristo / Ungido',
      etymology:
        'Tradução do hebraico מָשִׁיחַ (Messias), ungido com óleo para função sagrada',
      contextVerse: 'Mateus 16:16',
      contextVerseText:
        '"Tu és o Cristo (Χριστός), o Filho do Deus vivo"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S07 — WRITE_PRACTICE: Χριστός ─────────────────────────────
    {
      id: 'apostila-L08-S07',
      type: 'write_practice',
      narration:
        'Agora escreva Χριστός cinco vezes na linha 3. Pronuncie: cris-TÓS.',
      displayText: 'Χριστός × 5',
      greekForm: 'Χριστός',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — Χριστός',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: υἱός ────────────────────────────────────
    {
      id: 'apostila-L08-S08',
      type: 'word_intro',
      narration:
        'υἱός (huiós) — Filho. Este é o meu Filho amado, em quem me comprazo. Denota herdeiro legal.',
      displayText: 'υἱός — Filho',
      greekForm: 'υἱός',
      transliteration: 'huiós',
      pronunciation: 'ui-ÓS',
      translation: 'Filho',
      etymology:
        'Denota não apenas filho biológico mas herdeiro legal e representante do pai',
      contextVerse: 'Mateus 3:17',
      contextVerseText:
        '"Este é o meu Filho (υἱός) amado, em quem me comprazo"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S09 — WRITE_PRACTICE: υἱός ─────────────────────────────────
    {
      id: 'apostila-L08-S09',
      type: 'write_practice',
      narration:
        'Agora escreva υἱός cinco vezes na linha 4. Pronuncie: ui-ÓS.',
      displayText: 'υἱός × 5',
      greekForm: 'υἱός',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — υἱός',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S10 — WORD_INTRO: πνεῦμα ──────────────────────────────────
    {
      id: 'apostila-L08-S10',
      type: 'word_intro',
      narration:
        'πνεῦμα (pneûma) — Espírito / vento / sopro. O vento sopra onde quer. De πνέω, soprar.',
      displayText: 'πνεῦμα — Espírito',
      greekForm: 'πνεῦμα',
      transliteration: 'pneûma',
      pronunciation: 'PNÊU-ma',
      translation: 'Espírito / Vento / Sopro',
      etymology:
        'De πνέω, soprar; mesmo campo semântico do hebraico רוּחַ (ruach)',
      contextVerse: 'João 3:8',
      contextVerseText:
        '"O vento (πνεῦμα) sopra onde quer... assim é todo aquele que é nascido do Espírito"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S11 — WRITE_PRACTICE: πνεῦμα ──────────────────────────────
    {
      id: 'apostila-L08-S11',
      type: 'write_practice',
      narration:
        'Agora escreva πνεῦμα cinco vezes na linha 5. Pronuncie: PNÊU-ma.',
      displayText: 'πνεῦμα × 5',
      greekForm: 'πνεῦμα',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — πνεῦμα',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S12 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L08-S12',
      type: 'pause',
      narration:
        'Excelente! Você escreveu os cinco nomes divinos. Cada um destes nomes carrega séculos de revelação. Releia-os na sua apostila e reflita.',
      displayText:
        'Releia os cinco nomes na sua apostila.\nQuando estiver pronto, continue.',
    },

    // ─── S13 — DICTATION: θεός ──────────────────────────────────────
    {
      id: 'apostila-L08-S13',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'Deus'.",
      displayText: 'Deus',
      greekForm: 'θεός',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: κύριος ───────────────────────────────────
    {
      id: 'apostila-L08-S14',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'Senhor'.",
      displayText: 'Senhor',
      greekForm: 'κύριος',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: Χριστός ──────────────────────────────────
    {
      id: 'apostila-L08-S15',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'Cristo'.",
      displayText: 'Cristo',
      greekForm: 'Χριστός',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: υἱός ─────────────────────────────────────
    {
      id: 'apostila-L08-S16',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'filho'.",
      displayText: 'filho',
      greekForm: 'υἱός',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: πνεῦμα ───────────────────────────────────
    {
      id: 'apostila-L08-S17',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'espírito'.",
      displayText: 'espírito',
      greekForm: 'πνεῦμα',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
