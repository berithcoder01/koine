/**
 * L01 — As Primeiras Vogais (α, ε, η, ι)
 *
 * ID:               apostila-L01
 * TÍTULO:           Lição 1 — As Primeiras Vogais
 * DESCRIÇÃO:        Alpha, Epsilon, Eta, Iota
 * PDF_PAGE:         1
 * XP:               30
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  false
 *
 * Total de Steps: 18
 * Gerado a partir de: APOSTILA_CONTENT_ORCHESTRATOR.md v1.0.0
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L01: ApostilaLesson = {
  id: 'apostila-L01',
  title: 'Lição 1 — As Primeiras Vogais',
  description: 'Alpha, Epsilon, Eta, Iota',
  apostilaPdfPage: 1,
  lessonNumber: 1,
  xpReward: 30,
  estimatedMinutes: 12,
  requiresPrevious: false,

  steps: [
    // ─── S01 — INTRO ───────────────────────────────────────────────
    {
      id: 'apostila-L01-S01',
      type: 'intro',
      narration:
        'Bem-vindo à Lição 1. Hoje você vai conhecer as primeiras quatro vogais do alfabeto grego: alfa, épsilon, éta e iôta. Essas letras são a base de centenas de palavras do Novo Testamento. Abra sua apostila na página 1 e acompanhe comigo.',
      displayText: 'Abra sua apostila na Página 1',
      showGreekLarge: false,
    },

    // ─── S02 — WORD_INTRO: ALPHA ────────────────────────────────────
    {
      id: 'apostila-L01-S02',
      type: 'word_intro',
      narration:
        'A primeira letra é o alfa. Maiúsculo: Α. Minúsculo: α. O som é "a", como em "pai". O alfa é a primeira letra de todos os alfabetos semíticos e deu origem ao nosso "A" latino. No Apocalipse 1:8, Deus declara: "Eu sou o Alfa e o Ômega" — usando esta letra para falar de sua eternidade.',
      greekForm: 'Α α',
      transliteration: 'alfa',
      pronunciation: 'a (como em "pai")',
      translation: 'Letra Alfa',
      etymology:
        'Originou o "A" latino e o Alef hebraico; primeira letra de todos os alfabetos semíticos',
      contextVerse: 'Apocalipse 1:8',
      contextVerseText:
        '"Eu sou o Alfa e o Ômega" — Deus usa esta letra para declarar sua eternidade',
      showGreekLarge: true,
    },

    // ─── S03 — ALPHABET_TRACE: ALPHA ────────────────────────────────
    {
      id: 'apostila-L01-S03',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do alfa minúsculo. Primeiro o traço diagonal da esquerda para baixo, depois o diagonal da direita, depois o traço horizontal no meio.',
      greekForm: 'α',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S04 — WRITE_PRACTICE: ALPHA ────────────────────────────────
    {
      id: 'apostila-L01-S04',
      type: 'write_practice',
      narration:
        'Agora escreva o alfa minúsculo oito vezes na linha 1 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'α',
      transliteration: 'alfa',
      writeRepetitions: 8,
      writeInstruction: 'Linha 1 da apostila — Alfa minúsculo (α)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S05 — WORD_INTRO: EPSILON ──────────────────────────────────
    {
      id: 'apostila-L01-S05',
      type: 'word_intro',
      narration:
        'A segunda letra é o épsilon. Maiúsculo: Ε. Minúsculo: ε. O som é "e" breve, como em "pé". ε + ψιλόν significa "e simples", para distinguir do ditongo αι. No João 1:1, ele aparece na terminação do imperfeito: "No princípio era (ἦν) o Verbo".',
      greekForm: 'Ε ε',
      transliteration: 'épsilon',
      pronunciation: 'e breve (como em "pé")',
      translation: 'Letra Épsilon',
      etymology:
        'ε + ψιλόν significa "e simples", para distinguir do ditongo αι',
      contextVerse: 'João 1:1',
      contextVerseText:
        '"No princípio era (ἦν) o Verbo" — ε aparece na terminação do imperfeito',
      showGreekLarge: true,
    },

    // ─── S06 — ALPHABET_TRACE: EPSILON ──────────────────────────────
    {
      id: 'apostila-L01-S06',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do épsilon minúsculo. Traço vertical à esquerda de cima para baixo, depois o traço horizontal do meio, depois o arco curvo à direita.',
      greekForm: 'ε',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S07 — WRITE_PRACTICE: EPSILON ──────────────────────────────
    {
      id: 'apostila-L01-S07',
      type: 'write_practice',
      narration:
        'Agora escreva o épsilon minúsculo oito vezes na linha 2 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ε',
      transliteration: 'épsilon',
      writeRepetitions: 8,
      writeInstruction: 'Linha 2 da apostila — Épsilon minúsculo (ε)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S08 — WORD_INTRO: ETA ──────────────────────────────────────
    {
      id: 'apostila-L01-S08',
      type: 'word_intro',
      narration:
        'A terceira letra é o éta. Maiúsculo: Η. Minúsculo: η. O som é "ê" longo, como em "mês". Derivado do Chet hebraico, representa o "e" longo do grego clássico. O η aparece em muitas terminações de substantivos femininos, como em Hebreus 11:1: "A fé (πίστις) é..."',
      greekForm: 'Η η',
      transliteration: 'éta',
      pronunciation: 'ê longo (como em "mês")',
      translation: 'Letra Éta',
      etymology:
        'Derivado do Chet hebraico (ח); representa o "e" longo do grego clássico',
      contextVerse: 'Hebreus 11:1',
      contextVerseText:
        '"A fé (πίστις) é..." — o η aparece em muitas terminações de substantivos femininos',
      showGreekLarge: true,
    },

    // ─── S09 — ALPHABET_TRACE: ETA ──────────────────────────────────
    {
      id: 'apostila-L01-S09',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do éta minúsculo. Primeira haste vertical da esquerda para baixo, segunda haste vertical, depois o traço horizontal conectando as duas hastes na altura do meio.',
      greekForm: 'η',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S10 — WRITE_PRACTICE: ETA ──────────────────────────────────
    {
      id: 'apostila-L01-S10',
      type: 'write_practice',
      narration:
        'Agora escreva o éta minúsculo oito vezes na linha 3 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'η',
      transliteration: 'éta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 3 da apostila — Éta minúsculo (η)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S11 — WORD_INTRO: IOTA ─────────────────────────────────────
    {
      id: 'apostila-L01-S11',
      type: 'word_intro',
      narration:
        'A quarta letra é o iôta. Maiúsculo: Ι. Minúsculo: ι. O som é "i", como em "fio". Origem no Yod hebraico; a menor letra do alfabeto, mencionada por Jesus em Mateus 5:18: "Nem um iôta passará da lei".',
      greekForm: 'Ι ι',
      transliteration: 'iôta',
      pronunciation: 'i (como em "fio")',
      translation: 'Letra Iôta',
      etymology:
        'Origem no Yod hebraico (י); a menor letra do alfabeto, mencionada por Jesus em Mateus 5:18',
      contextVerse: 'Mateus 5:18',
      contextVerseText:
        '"Nem um iota (ἰῶτα) passará da lei" — Jesus usa esta própria letra como exemplo',
      showGreekLarge: true,
    },

    // ─── S12 — ALPHABET_TRACE: IOTA ─────────────────────────────────
    {
      id: 'apostila-L01-S12',
      type: 'alphabet_trace',
      narration:
        'Observe a ordem dos traços do iôta minúsculo. Um único traço curvo de cima para baixo, levemente inclinado, com uma serifa no topo.',
      greekForm: 'ι',
      showStrokeOrder: true,
      showPaperBadge: false,
    },

    // ─── S13 — WRITE_PRACTICE: IOTA ─────────────────────────────────
    {
      id: 'apostila-L01-S13',
      type: 'write_practice',
      narration:
        'Agora escreva o iôta minúsculo oito vezes na linha 4 da sua apostila. Mantenha o ritmo: uma letra por clique.',
      greekForm: 'ι',
      transliteration: 'iôta',
      writeRepetitions: 8,
      writeInstruction: 'Linha 4 da apostila — Iôta minúsculo (ι)',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    // ─── S14 — PAUSE ────────────────────────────────────────────────
    {
      id: 'apostila-L01-S14',
      type: 'pause',
      narration:
        'Muito bem! Você acabou de aprender as quatro primeiras vogais gregas. Antes de continuar, olhe para o que escreveu e compare com o modelo na apostila. Cada letra deve ter a mesma forma que o modelo.',
      displayText:
        'Compare sua escrita com o modelo na apostila.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    // ─── S15 — DICTATION: ALPHA ─────────────────────────────────────
    {
      id: 'apostila-L01-S15',
      type: 'dictation',
      narration: 'Escreva no papel: alfa.',
      displayText: '"alfa"',
      greekForm: 'Α α',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S16 — DICTATION: EPSILON ───────────────────────────────────
    {
      id: 'apostila-L01-S16',
      type: 'dictation',
      narration: 'Escreva no papel: épsilon.',
      displayText: '"épsilon"',
      greekForm: 'Ε ε',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S17 — DICTATION: ETA ───────────────────────────────────────
    {
      id: 'apostila-L01-S17',
      type: 'dictation',
      narration: 'Escreva no papel: éta.',
      displayText: '"éta"',
      greekForm: 'Η η',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    // ─── S18 — DICTATION: IOTA ──────────────────────────────────────
    {
      id: 'apostila-L01-S18',
      type: 'dictation',
      narration: 'Escreva no papel: iôta.',
      displayText: '"iôta"',
      greekForm: 'Ι ι',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

