/**
 * L07 — Palavras de Fé e Graça (ἀγάπη, πίστις, χάρις, εἰρήνη, ζωή)
 *
 * ID:               apostila-L07
 * TÍTULO:           Lição 7 — Palavras de Fé e Graça
 * DESCRIÇÃO:        ἀγάπη, πίστις, χάρις, εἰρήνη, ζωή
 * PDF_PAGE:         15
 * XP:               40
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L07: ApostilaLesson = {
  id: 'apostila-L07',
  lessonNumber: 7,
  title: 'Lição 7 — Palavras de Fé e Graça',
  description: 'ἀγάπη, πίστις, χάρις, εἰρήνη, ζωή',
  apostilaPdfPage: 15,
  xpReward: 40,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L07-S01',
      type: 'intro',
      narration:
        'Lição 7 — Palavras de fé e graça. Hoje você vai aprender cinco das palavras mais importantes do Novo Testamento: ágape, pístis, cháris, eirene e zoe. Estas palavras aparecem centenas de vezes nas cartas de Paulo. Abra sua apostila na página 15.',
      displayText: 'Abra sua apostila na Página 15',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: ἀγάπη ────────────────────────────────────
    {
      id: 'apostila-L07-S02',
      type: 'word_intro',
      narration:
        'A primeira palavra é ἀγάπη — agápē. Pronuncie: a-GÁ-pe. Significa amor — mas não qualquer amor. É o amor incondicional, que escolhe o bem do outro independentemente de sentimentos.',
      greekForm: 'ἀγάπη',
      transliteration: 'agápē',
      pronunciation: 'a-GÁ-pe',
      translation: 'amor incondicional',
      etymology:
        'Do verbo ἀγαπάω, amar com escolha deliberada; distinto de ἔρως (desejo) e φιλία (amizade)',
      contextVerse: 'João 3:16',
      contextVerseText:
        '"Porque Deus amou (ἠγάπησεν) o mundo de tal maneira..."',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S03 — WRITE_PRACTICE: ἀγάπη ────────────────────────────────
    {
      id: 'apostila-L07-S03',
      type: 'write_practice',
      narration:
        'Agora escreva ἀγάπη cinco vezes na linha 1 da sua apostila. Pronuncie em voz alta cada vez que escrever: a-GÁ-pe.',
      greekForm: 'ἀγάπη',
      transliteration: 'agápē',
      pronunciation: 'a-GÁ-pe',
      translation: 'amor incondicional',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — ἀγάπη',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S04 — WORD_INTRO: πίστις ───────────────────────────────────
    {
      id: 'apostila-L07-S04',
      type: 'word_intro',
      narration:
        'A segunda palavra é πίστις — pístis. Pronuncie: PÍS-tis. Significa fé, confiança. Não é apenas acreditar que algo é verdade, mas confiar ativamente.',
      greekForm: 'πίστις',
      transliteration: 'pístis',
      pronunciation: 'PÍS-tis',
      translation: 'fé / confiança',
      etymology:
        'De πείθω, persuadir; implica confiança ativa, não mera crença intelectual',
      contextVerse: 'Hebreus 11:1',
      contextVerseText:
        '"A fé (πίστις) é a certeza de coisas que se esperam..."',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S05 — WRITE_PRACTICE: πίστις ───────────────────────────────
    {
      id: 'apostila-L07-S05',
      type: 'write_practice',
      narration:
        'Agora escreva πίστις cinco vezes na linha 2 da sua apostila. Pronuncie: PÍS-tis.',
      greekForm: 'πίστις',
      transliteration: 'pístis',
      pronunciation: 'PÍS-tis',
      translation: 'fé / confiança',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — πίστις',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S06 — WORD_INTRO: χάρις ────────────────────────────────────
    {
      id: 'apostila-L07-S06',
      type: 'word_intro',
      narration:
        'A terceira palavra é χάρις — cháris. Pronuncie: CÁ-ris. Significa graça, favor imerecido. É a base da teologia paulina da salvação.',
      greekForm: 'χάρις',
      transliteration: 'cháris',
      pronunciation: 'CÁ-ris',
      translation: 'graça / favor imerecido',
      etymology:
        'Relacionado a χαρά (alegria) e χαίρω (regozijar); favor dado gratuitamente',
      contextVerse: 'Efésios 2:8',
      contextVerseText:
        '"Pela graça (χάριτι) sois salvos, mediante a fé"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S07 — WRITE_PRACTICE: χάρις ────────────────────────────────
    {
      id: 'apostila-L07-S07',
      type: 'write_practice',
      narration:
        'Agora escreva χάρις cinco vezes na linha 3 da sua apostila. Pronuncie: CÁ-ris.',
      greekForm: 'χάρις',
      transliteration: 'cháris',
      pronunciation: 'CÁ-ris',
      translation: 'graça / favor imerecido',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — χάρις',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: εἰρήνη ───────────────────────────────────
    {
      id: 'apostila-L07-S08',
      type: 'word_intro',
      narration:
        'A quarta palavra é εἰρήνη — eirḗnē. Pronuncie: ei-RÊ-ne. Significa paz — mas não apenas ausência de conflito. É completude, inteireza, como o hebraico shalom.',
      greekForm: 'εἰρήνη',
      transliteration: 'eirḗnē',
      pronunciation: 'ei-RÊ-ne',
      translation: 'paz / inteireza',
      etymology:
        'Equivalente ao hebraico שָׁלוֹם (shalom): não ausência de conflito, mas completude total',
      contextVerse: 'João 14:27',
      contextVerseText:
        '"Deixo-vos a paz (εἰρήνην), a minha paz vos dou"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S09 — WRITE_PRACTICE: εἰρήνη ───────────────────────────────
    {
      id: 'apostila-L07-S09',
      type: 'write_practice',
      narration:
        'Agora escreva εἰρήνη cinco vezes na linha 4 da sua apostila. Pronuncie: ei-RÊ-ne.',
      greekForm: 'εἰρήνη',
      transliteration: 'eirḗnē',
      pronunciation: 'ei-RÊ-ne',
      translation: 'paz / inteireza',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — εἰρήνη',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S10 — WORD_INTRO: ζωή ──────────────────────────────────────
    {
      id: 'apostila-L07-S10',
      type: 'word_intro',
      narration:
        'A quinta palavra é ζωή — zōḗ. Pronuncie: zo-Ê. Significa vida — não a vida biológica (bíos), mas a vida em sua plenitude qualitativa, a vida eterna.',
      greekForm: 'ζωή',
      transliteration: 'zōḗ',
      pronunciation: 'zo-Ê',
      translation: 'vida eterna e abundante',
      etymology:
        'Distinto de βίος (vida biológica); ζωή é vida em sua plenitude qualitativa',
      contextVerse: 'João 10:10',
      contextVerseText:
        '"Eu vim para que tenham vida (ζωήν) e a tenham em abundância"',
      showGreekLarge: true,
      showVoiceBadge: true,
    },

    // ─── S11 — WRITE_PRACTICE: ζωή ──────────────────────────────────
    {
      id: 'apostila-L07-S11',
      type: 'write_practice',
      narration:
        'Agora escreva ζωή cinco vezes na linha 5 da sua apostila. Pronuncie: zo-Ê.',
      greekForm: 'ζωή',
      transliteration: 'zōḗ',
      pronunciation: 'zo-Ê',
      translation: 'vida eterna e abundante',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — ζωή',
      showPaperBadge: true,
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    // ─── S12 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L07-S12',
      type: 'pause',
      narration:
        'Excelente! Você escreveu as cinco palavras fundamentais. Antes de continuar, releia o que escreveu na apostila. Cada palavra carrega séculos de teologia.',
      displayText:
        'Releia as cinco palavras na sua apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S13 — DICTATION: ἀγάπη ─────────────────────────────────────
    {
      id: 'apostila-L07-S13',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: amor incondicional.',
      displayText: '"amor incondicional"',
      greekForm: 'ἀγάπη',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S14 — DICTATION: πίστις ────────────────────────────────────
    {
      id: 'apostila-L07-S14',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: fé.',
      displayText: '"fé / confiança"',
      greekForm: 'πίστις',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: χάρις ─────────────────────────────────────
    {
      id: 'apostila-L07-S15',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: graça.',
      displayText: '"graça / favor imerecido"',
      greekForm: 'χάρις',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: εἰρήνη ────────────────────────────────────
    {
      id: 'apostila-L07-S16',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: paz.',
      displayText: '"paz / inteireza"',
      greekForm: 'εἰρήνη',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: ζωή ───────────────────────────────────────
    {
      id: 'apostila-L07-S17',
      type: 'dictation',
      narration:
        'Escreva a palavra grega para: vida eterna.',
      displayText: '"vida (eterna e abundante)"',
      greekForm: 'ζωή',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
