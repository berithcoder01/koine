/**
 * L14 — Comunidade e Ministério (ἐκκλησία, ἀδελφός, ἀπόστολος, προφήτης, δοῦλος)
 *
 * ID:               apostila-L14
 * TÍTULO:           Lição 14 — Comunidade e Ministério
 * DESCRIÇÃO:        ἐκκλησία, ἀδελφός, ἀπόστολος, προφήτης, δοῦλος
 * PDF_PAGE:         29
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L14: ApostilaLesson = {
  id: 'apostila-L14',
  lessonNumber: 14,
  title: 'Lição 14 — Comunidade e Ministério',
  description: 'ἐκκλησία, ἀδελφός, ἀπόστολος, προφήτης, δοῦλος',
  apostilaPdfPage: 29,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L14-S01',
      type: 'intro',
      narration:
        'Lição 14 — Comunidade e ministério. Palavras que descrevem o povo de Deus: ekklesía, adelphós, apóstolos, profétes e dûlos. Abra sua apostila na página 29.',
      displayText: 'Abra sua apostila na Página 29',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: ἐκκλησία ─────────────────────────────────
    {
      id: 'apostila-L14-S02',
      type: 'word_intro',
      narration:
        'ἐκκλησία, igreja. Em Mateus 16:18, Jesus promete: "Sobre esta pedra edificarei a minha igreja (ἐκκλησίαν)."',
      greekForm: 'ἐκκλησία',
      transliteration: 'ekklēsía',
      pronunciation: 'e-kle-SÍ-a',
      translation: 'igreja / assembleia convocada',
      etymology:
        'ἐκ (de fora) + καλέω (chamar); assembleia dos cidadãos convocados da cidade para deliberar',
      contextVerse: 'Mateus 16:18',
      contextVerseText:
        '"Sobre esta pedra edificarei a minha igreja (ἐκκλησίαν)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S03 — WRITE_PRACTICE: ἐκκλησία ─────────────────────────────
    {
      id: 'apostila-L14-S03',
      type: 'write_practice',
      narration:
        'Agora escreva ἐκκλησία cinco vezes na linha 1. Pronuncie: e-kle-SÍ-a.',
      greekForm: 'ἐκκλησία',
      transliteration: 'ekklēsía',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — ἐκκλησία',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S04 — WORD_INTRO: ἀδελφός ──────────────────────────────────
    {
      id: 'apostila-L14-S04',
      type: 'word_intro',
      narration:
        'ἀδελφός, irmão. Em Romanos 8:29: "Para que ele seja o primogênito entre muitos irmãos (ἀδελφοῖς)."',
      greekForm: 'ἀδελφός',
      transliteration: 'adelphós',
      pronunciation: 'a-del-FÓS',
      translation: 'irmão / membro da família de fé',
      etymology:
        'ἀ (mesmo) + δελφύς (útero); literalmente "do mesmo útero"; Paulo expande para irmãos em Cristo',
      contextVerse: 'Romanos 8:29',
      contextVerseText:
        '"Para que ele seja o primogênito entre muitos irmãos (ἀδελφοῖς)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S05 — WRITE_PRACTICE: ἀδελφός ──────────────────────────────
    {
      id: 'apostila-L14-S05',
      type: 'write_practice',
      narration:
        'Agora escreva ἀδελφός cinco vezes na linha 2. Pronuncie: a-del-FÓS.',
      greekForm: 'ἀδελφός',
      transliteration: 'adelphós',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — ἀδελφός',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S06 — WORD_INTRO: ἀπόστολος ────────────────────────────────
    {
      id: 'apostila-L14-S06',
      type: 'word_intro',
      narration:
        'ἀπόστολος, apóstolo. Em Efésios 2:20: "Edificados sobre o fundamento dos apóstolos (ἀποστόλων) e profetas."',
      greekForm: 'ἀπόστολος',
      transliteration: 'apóstolos',
      pronunciation: 'a-PÓS-to-los',
      translation: 'apóstolo / enviado',
      etymology:
        'De ἀποστέλλω, enviar com autoridade e representando quem envia',
      contextVerse: 'Efésios 2:20',
      contextVerseText:
        '"Edificados sobre o fundamento dos apóstolos (ἀποστόλων) e profetas"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S07 — WRITE_PRACTICE: ἀπόστολος ────────────────────────────
    {
      id: 'apostila-L14-S07',
      type: 'write_practice',
      narration:
        'Agora escreva ἀπόστολος cinco vezes na linha 3. Pronuncie: a-PÓS-to-los.',
      greekForm: 'ἀπόστολος',
      transliteration: 'apóstolos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — ἀπόστολος',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: προφήτης ─────────────────────────────────
    {
      id: 'apostila-L14-S08',
      type: 'word_intro',
      narration:
        'προφήτης, profeta. Em Atos 2:17: "Os vossos filhos e as vossas filhas profetizarão (προφητεύσουσιν)."',
      greekForm: 'προφήτης',
      transliteration: 'prophḗtēs',
      pronunciation: 'pro-FÊ-tes',
      translation: 'profeta / porta-voz',
      etymology:
        'πρό (antes/em favor de) + φημί (falar); não apenas prevê o futuro, mas fala em nome de Deus',
      contextVerse: 'Atos 2:17',
      contextVerseText:
        '"Os vossos filhos e as vossas filhas profetizarão (προφητεύσουσιν)"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S09 — WRITE_PRACTICE: προφήτης ─────────────────────────────
    {
      id: 'apostila-L14-S09',
      type: 'write_practice',
      narration:
        'Agora escreva προφήτης cinco vezes na linha 4. Pronuncie: pro-FÊ-tes.',
      greekForm: 'προφήτης',
      transliteration: 'prophḗtēs',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — προφήτης',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S10 — WORD_INTRO: δοῦλος ───────────────────────────────────
    {
      id: 'apostila-L14-S10',
      type: 'word_intro',
      narration:
        'δοῦλος, servo. Em Romanos 1:1, Paulo se identifica: "Paulo, servo (δοῦλος) de Jesus Cristo, chamado para ser apóstolo."',
      greekForm: 'δοῦλος',
      transliteration: 'doûlos',
      pronunciation: 'DÛ-los',
      translation: 'servo / escravo',
      etymology:
        'Paulo se identifica como δοῦλος em Rm 1:1 — paradoxo: o maior título vem da maior humildade',
      contextVerse: 'Romanos 1:1',
      contextVerseText:
        '"Paulo, servo (δοῦλος) de Jesus Cristo, chamado para ser apóstolo"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S11 — WRITE_PRACTICE: δοῦλος ───────────────────────────────
    {
      id: 'apostila-L14-S11',
      type: 'write_practice',
      narration:
        'Agora escreva δοῦλος cinco vezes na linha 5. Pronuncie: DÛ-los.',
      greekForm: 'δοῦλος',
      transliteration: 'doûlos',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — δοῦλος',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S12 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L14-S12',
      type: 'pause',
      narration:
        'Igreja, irmãos, apóstolos, profetas, servos — esta é a comunidade de Deus. Releia estas palavras.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S13 — DICTATION: ἐκκλησία ──────────────────────────────────
    {
      id: 'apostila-L14-S13',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "igreja".',
      displayText: '"igreja"',
      greekForm: 'ἐκκλησία',
      translation: 'igreja',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: ἀδελφός ───────────────────────────────────
    {
      id: 'apostila-L14-S14',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "irmão".',
      displayText: '"irmão"',
      greekForm: 'ἀδελφός',
      translation: 'irmão',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: ἀπόστολος ─────────────────────────────────
    {
      id: 'apostila-L14-S15',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "apóstolo".',
      displayText: '"apóstolo"',
      greekForm: 'ἀπόστολος',
      translation: 'apóstolo',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: προφήτης ──────────────────────────────────
    {
      id: 'apostila-L14-S16',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "profeta".',
      displayText: '"profeta"',
      greekForm: 'προφήτης',
      translation: 'profeta',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: δοῦλος ────────────────────────────────────
    {
      id: 'apostila-L14-S17',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "servo".',
      displayText: '"servo"',
      greekForm: 'δοῦλος',
      translation: 'servo',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

