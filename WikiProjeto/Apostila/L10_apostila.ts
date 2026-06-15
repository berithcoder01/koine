/**
 * L10 — Palavra e Ação (λόγος, ῥῆμα, γράφω, λέγω, ποιέω)
 *
 * ID:               apostila-L10
 * TÍTULO:           Lição 10 — Palavra e Ação
 * DESCRIÇÃO:        λόγος, ῥῆμα, γράφω, λέγω, ποιέω
 * PDF_PAGE:         21
 * XP:               40
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L10: ApostilaLesson = {
  id: 'apostila-L10',
  lessonNumber: 10,
  title: 'Lição 10 — Palavra e Ação',
  description: 'λόγος, ῥῆμα, γράφω, λέγω, ποιέω',
  apostilaPdfPage: 21,
  xpReward: 40,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L10-S01',
      type: 'intro',
      narration:
        'Lição 10 — Palavra e ação. Hoje você vai aprender verbos e substantivos fundamentais: lógos, rhema, grápho, légo e poiéo. Palavras que nos ensinam como Deus se comunica e age. Abra sua apostila na página 21.',
      displayText: 'Abra sua apostila na Página 21',
    },

    // ─── S02 — WORD_INTRO: λόγος ───────────────────────────────────
    {
      id: 'apostila-L10-S02',
      type: 'word_intro',
      narration:
        'λόγος (lógos) — palavra / razão / discurso. No princípio era o Verbo, e o Verbo estava com Deus. A razão que ordena o cosmos.',
      displayText: 'λόγος — Palavra',
      greekForm: 'λόγος',
      transliteration: 'lógos',
      pronunciation: 'LÓ-gos',
      translation: 'Palavra / Razão / Discurso',
      etymology:
        'Raiz *leg-, colher/ordenar; na filosofia grega, a razão que ordena o cosmos',
      contextVerse: 'João 1:1',
      contextVerseText:
        '"No princípio era o Verbo (Λόγος), e o Verbo estava com Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S03 — WRITE_PRACTICE: λόγος ───────────────────────────────
    {
      id: 'apostila-L10-S03',
      type: 'write_practice',
      narration:
        'Agora escreva λόγος cinco vezes na linha 1. Pronuncie: LÓ-gos.',
      displayText: 'λόγος × 5',
      greekForm: 'λόγος',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — λόγος',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S04 — WORD_INTRO: ῥῆμα ────────────────────────────────────
    {
      id: 'apostila-L10-S04',
      type: 'word_intro',
      narration:
        'ῥῆμα (rhēma) — palavra falada / declaração. A fé vem pelo ouvir, e o ouvir pela palavra de Deus. É a palavra como evento sonoro.',
      displayText: 'ῥῆμα — Palavra Falada',
      greekForm: 'ῥῆμα',
      transliteration: 'rhēma',
      pronunciation: 'RÊ-ma',
      translation: 'Palavra Falada / Declaração',
      etymology:
        'De ῥέω, fluir; é a palavra como evento sonoro, o que foi dito em um momento específico',
      contextVerse: 'Romanos 10:17',
      contextVerseText:
        '"A fé vem pelo ouvir, e o ouvir pela palavra (ῥήματος) de Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S05 — WRITE_PRACTICE: ῥῆμα ────────────────────────────────
    {
      id: 'apostila-L10-S05',
      type: 'write_practice',
      narration:
        'Agora escreva ῥῆμα cinco vezes na linha 2. Pronuncie: RÊ-ma.',
      displayText: 'ῥῆμα × 5',
      greekForm: 'ῥῆμα',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — ῥῆμα',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S06 — WORD_INTRO: γράφω ──────────────────────────────────
    {
      id: 'apostila-L10-S06',
      type: 'word_intro',
      narration:
        'γράφω (gráphō) — escrever. Jesus fez muitos outros sinais... que não estão escritos neste livro. Deu origem a "grafia", "gráfico".',
      displayText: 'γράφω — Escrever',
      greekForm: 'γράφω',
      transliteration: 'gráphō',
      pronunciation: 'GRÁ-fo',
      translation: 'Escrever',
      etymology:
        'Deu origem a "grafia", "gráfico", "gravura"; inicialmente significava riscar, desenhar',
      contextVerse: 'João 20:30',
      contextVerseText:
        '"Jesus fez muitos outros sinais... que não estão escritos (γεγραμμένα) neste livro"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S07 — WRITE_PRACTICE: γράφω ───────────────────────────────
    {
      id: 'apostila-L10-S07',
      type: 'write_practice',
      narration:
        'Agora escreva γράφω cinco vezes na linha 3. Pronuncie: GRÁ-fo.',
      displayText: 'γράφω × 5',
      greekForm: 'γράφω',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — γράφω',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: λέγω ────────────────────────────────────
    {
      id: 'apostila-L10-S08',
      type: 'word_intro',
      narration:
        'λέγω (légō) — dizer / falar. Eis o Cordeiro de Deus, que tira o pecado do mundo — disse João. Um dos verbos mais frequentes do NT.',
      displayText: 'λέγω — Dizer',
      greekForm: 'λέγω',
      transliteration: 'légō',
      pronunciation: 'LÉ-go',
      translation: 'Dizer / Falar',
      etymology:
        'Um dos verbos mais frequentes do NT (~2.350 ocorrências); base de λόγος',
      contextVerse: 'João 1:29',
      contextVerseText:
        '"Eis o Cordeiro de Deus, que tira o pecado do mundo" — disse (λέγει) João',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S09 — WRITE_PRACTICE: λέγω ────────────────────────────────
    {
      id: 'apostila-L10-S09',
      type: 'write_practice',
      narration:
        'Agora escreva λέγω cinco vezes na linha 4. Pronuncie: LÉ-go.',
      displayText: 'λέγω × 5',
      greekForm: 'λέγω',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — λέγω',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S10 — WORD_INTRO: ποιέω ──────────────────────────────────
    {
      id: 'apostila-L10-S10',
      type: 'word_intro',
      narration:
        'ποιέω (poiéō) — fazer / criar / agir. Jesus fez este primeiro sinal em Caná. Deu origem a "poema" (ποίημα): obra-prima.',
      displayText: 'ποιέω — Fazer',
      greekForm: 'ποιέω',
      transliteration: 'poiéō',
      pronunciation: 'poi-É-o',
      translation: 'Fazer / Criar / Agir',
      etymology:
        'Deu origem ao inglês "poem" (ποίημα); o que é criado/feito. Efésios 2:10: ποίημα (obra-prima)',
      contextVerse: 'João 2:11',
      contextVerseText:
        '"Jesus fez (ἐποίησεν) este primeiro sinal em Caná"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S11 — WRITE_PRACTICE: ποιέω ──────────────────────────────
    {
      id: 'apostila-L10-S11',
      type: 'write_practice',
      narration:
        'Agora escreva ποιέω cinco vezes na linha 5. Pronuncie: poi-É-o.',
      displayText: 'ποιέω × 5',
      greekForm: 'ποιέω',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — ποιέω',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S12 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L10-S12',
      type: 'pause',
      narration:
        'Excelente! Você aprendeu palavras que descrevem como Deus se revela: pela Palavra e pela ação.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
    },

    // ─── S13 — DICTATION: λόγος ────────────────────────────────────
    {
      id: 'apostila-L10-S13',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'palavra'.",
      displayText: 'palavra',
      greekForm: 'λόγος',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: ῥῆμα ─────────────────────────────────────
    {
      id: 'apostila-L10-S14',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'palavra falada'.",
      displayText: 'palavra falada',
      greekForm: 'ῥῆμα',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: γράφω ────────────────────────────────────
    {
      id: 'apostila-L10-S15',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'escrever'.",
      displayText: 'escrever',
      greekForm: 'γράφω',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: λέγω ─────────────────────────────────────
    {
      id: 'apostila-L10-S16',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'dizer'.",
      displayText: 'dizer',
      greekForm: 'λέγω',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: ποιέω ────────────────────────────────────
    {
      id: 'apostila-L10-S17',
      type: 'dictation',
      narration: "Escreva a palavra grega para: 'fazer'.",
      displayText: 'fazer',
      greekForm: 'ποιέω',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
