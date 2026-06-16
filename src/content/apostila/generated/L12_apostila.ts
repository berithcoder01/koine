/**
 * L12 — Conhecer e Ver (γινώσκω, οἶδα, σοφία, ἀλήθεια, φῶς)
 *
 * ID:               apostila-L12
 * TÍTULO:           Lição 12 — Conhecer e Ver
 * DESCRIÇÃO:        γινώσκω, οἶδα, σοφία, ἀλήθεια, φῶς
 * PDF_PAGE:         25
 * XP:               45
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L12: ApostilaLesson = {
  id: 'apostila-L12',
  lessonNumber: 12,
  title: 'Lição 12 — Conhecer e Ver',
  description: 'γινώσκω, οἶδα, σοφία, ἀλήθεια, φῶς',
  apostilaPdfPage: 25,
  xpReward: 45,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L12-S01',
      type: 'intro',
      narration:
        'Lição 12 — Conhecer e ver. Hoje você vai aprender palavras sobre conhecimento e luz: ginósko, oída, sofía, alétheia e fós. Elas nos ensinam como conhecemos a Deus. Abra sua apostila na página 25.',
      displayText: 'Abra sua apostila na Página 25',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: γινώσκω ─────────────────────────────────
    {
      id: 'apostila-L12-S02',
      type: 'word_intro',
      narration:
        'γινώσκω, conhecer por experiência. Em João 10:14, Jesus declara: "Eu conheço (γινώσκω) as minhas ovelhas, e elas me conhecem."',
      greekForm: 'γινώσκω',
      transliteration: 'ginṓskō',
      pronunciation: 'gi-NÔS-ko',
      translation: 'conhecer por experiência',
      etymology:
        'Conhecimento adquirido por experiência pessoal; em João 10:14 é o conhecimento mútuo do pastor e ovelhas',
      contextVerse: 'João 10:14',
      contextVerseText:
        '"Eu conheço (γινώσκω) as minhas ovelhas, e elas me conhecem"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S03 — WRITE_PRACTICE: γινώσκω ──────────────────────────────
    {
      id: 'apostila-L12-S03',
      type: 'write_practice',
      narration:
        'Agora escreva γινώσκω cinco vezes na linha 1. Pronuncie: gi-NÔS-ko.',
      greekForm: 'γινώσκω',
      transliteration: 'ginṓskō',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — γινώσκω',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S04 — WORD_INTRO: οἶδα ─────────────────────────────────────
    {
      id: 'apostila-L12-S04',
      type: 'word_intro',
      narration:
        'οἶδα, saber por percepção. Em João 3:2, Nicodemos diz: "Sabemos (οἴδαμεν) que és Mestre vindo de Deus."',
      greekForm: 'οἶδα',
      transliteration: 'oîda',
      pronunciation: 'Ôi-da',
      translation: 'saber por percepção / revelação',
      etymology:
        'Perfeito com sentido presente; literalmente "tenho visto e portanto sei"',
      contextVerse: 'João 3:2',
      contextVerseText:
        '"Rabbi, sabemos (οἴδαμεν) que és Mestre vindo de Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S05 — WRITE_PRACTICE: οἶδα ─────────────────────────────────
    {
      id: 'apostila-L12-S05',
      type: 'write_practice',
      narration:
        'Agora escreva οἶδα cinco vezes na linha 2. Pronuncie: Ôi-da.',
      greekForm: 'οἶδα',
      transliteration: 'oîda',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — οἶδα',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S06 — WORD_INTRO: σοφία ────────────────────────────────────
    {
      id: 'apostila-L12-S06',
      type: 'word_intro',
      narration:
        'σοφία, sabedoria. Em 1 Coríntios 1:24, Paulo declara: "Cristo, poder de Deus e sabedoria (σοφία) de Deus."',
      greekForm: 'σοφία',
      transliteration: 'sophía',
      pronunciation: 'so-FÍ-a',
      translation: 'sabedoria',
      etymology:
        'Distinção do NT: a sabedoria de Deus vs a sabedoria do mundo (1 Cor 1:18-25)',
      contextVerse: '1 Coríntios 1:24',
      contextVerseText:
        '"Cristo, poder de Deus e sabedoria (σοφία) de Deus"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S07 — WRITE_PRACTICE: σοφία ────────────────────────────────
    {
      id: 'apostila-L12-S07',
      type: 'write_practice',
      narration:
        'Agora escreva σοφία cinco vezes na linha 3. Pronuncie: so-FÍ-a.',
      greekForm: 'σοφία',
      transliteration: 'sophía',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — σοφία',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: ἀλήθεια ──────────────────────────────────
    {
      id: 'apostila-L12-S08',
      type: 'word_intro',
      narration:
        'ἀλήθεια, verdade. Em João 8:32: "E conhecereis a verdade (ἀλήθεια), e a verdade vos libertará."',
      greekForm: 'ἀλήθεια',
      transliteration: 'alḗtheia',
      pronunciation: 'a-LÊ-tei-a',
      translation: 'verdade',
      etymology:
        'α (negação) + λήθη (esquecimento, ocultamento); o que não está oculto, a realidade revelada',
      contextVerse: 'João 8:32',
      contextVerseText:
        '"E conhecereis a verdade (ἀλήθεια), e a verdade vos libertará"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S09 — WRITE_PRACTICE: ἀλήθεια ──────────────────────────────
    {
      id: 'apostila-L12-S09',
      type: 'write_practice',
      narration:
        'Agora escreva ἀλήθεια cinco vezes na linha 4. Pronuncie: a-LÊ-tei-a.',
      greekForm: 'ἀλήθεια',
      transliteration: 'alḗtheia',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — ἀλήθεια',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S10 — WORD_INTRO: φῶς ──────────────────────────────────────
    {
      id: 'apostila-L12-S10',
      type: 'word_intro',
      narration:
        'φῶς, luz. Em João 1:5: "A luz (φῶς) resplandece nas trevas, e as trevas não a compreenderam."',
      greekForm: 'φῶς',
      transliteration: 'phōs',
      pronunciation: 'FÔS',
      translation: 'luz',
      etymology:
        'Em João 1:5, φῶς é usado para o próprio Cristo; raiz de "fotossíntese" e "fotografia"',
      contextVerse: 'João 1:5',
      contextVerseText:
        '"A luz (φῶς) resplandece nas trevas, e as trevas não a compreenderam"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S11 — WRITE_PRACTICE: φῶς ──────────────────────────────────
    {
      id: 'apostila-L12-S11',
      type: 'write_practice',
      narration:
        'Agora escreva φῶς cinco vezes na linha 5. Pronuncie: FÔS.',
      greekForm: 'φῶς',
      transliteration: 'phōs',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — φῶς',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S12 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L12-S12',
      type: 'pause',
      narration:
        'Conhecimento, sabedoria, verdade e luz — palavras que descrevem Jesus. Releia o que escreveu.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S13 — DICTATION: γινώσκω ───────────────────────────────────
    {
      id: 'apostila-L12-S13',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "conhecer".',
      displayText: '"conhecer"',
      greekForm: 'γινώσκω',
      translation: 'conhecer',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: οἶδα ──────────────────────────────────────
    {
      id: 'apostila-L12-S14',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "saber".',
      displayText: '"saber"',
      greekForm: 'οἶδα',
      translation: 'saber',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: σοφία ─────────────────────────────────────
    {
      id: 'apostila-L12-S15',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "sabedoria".',
      displayText: '"sabedoria"',
      greekForm: 'σοφία',
      translation: 'sabedoria',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: ἀλήθεια ───────────────────────────────────
    {
      id: 'apostila-L12-S16',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "verdade".',
      displayText: '"verdade"',
      greekForm: 'ἀλήθεια',
      translation: 'verdade',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: φῶς ───────────────────────────────────────
    {
      id: 'apostila-L12-S17',
      type: 'dictation',
      narration: 'Ditado: escreva a palavra grega para "luz".',
      displayText: '"luz"',
      greekForm: 'φῶς',
      translation: 'luz',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

