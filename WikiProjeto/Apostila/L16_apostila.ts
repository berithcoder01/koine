/**
 * L16 — Verbos do NT (εἰμί, ἔρχομαι, ἀκούω, βλέπω, πιστεύω)
 *
 * ID:               apostila-L16
 * TÍTULO:           Lição 16 — Verbos do NT
 * DESCRIÇÃO:        εἰμί, ἔρχομαι, ἀκούω, βλέπω, πιστεύω
 * PDF_PAGE:         33
 * XP:               50
 * TEMPO:            12 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 17
 */

import type { ApostilaLesson } from '../features/apostila/apostilaTypes';

export const APOSTILA_L16: ApostilaLesson = {
  id: 'apostila-L16',
  title: 'Lição 16 — Verbos do NT',
  description: 'εἰμί, ἔρχομαι, ἀκούω, βλέπω, πιστεύω',
  apostilaPdfPage: 33,
  lessonNumber: 16,
  xpReward: 50,
  estimatedMinutes: 12,
  requiresPrevious: true,

  steps: [
    {
      id: 'apostila-L16-S01',
      type: 'intro',
      narration:
        'Lição 16 — Verbos fundamentais do Novo Testamento. Hoje você vai aprender os verbos mais importantes: eimí, érchomai, akoúo, blépo e pisteúo. Abra sua apostila na página 33.',
      displayText: 'Abra sua apostila na Página 33',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S02',
      type: 'word_intro',
      narration:
        'εἰμί é o verbo ser, existir. É o verbo mais irregular do grego. Ἐγώ εἰμι (Ego eimi — Eu sou) é o título divino em João. Em João 8:58, Jesus declara: "Antes que Abraão existisse, EU SOU". Pronuncia-se ei-MÍ.',
      greekForm: 'εἰμί',
      transliteration: 'eimí',
      pronunciation: 'ei-MÍ',
      translation: 'ser / existir',
      etymology:
        'Verbo "ser" mais irregular do grego; "ἘΓΩ ΕΙΜΙ" (Ego eimi, Eu sou) é o título divino de João',
      contextVerse: 'João 8:58',
      contextVerseText:
        '"Em verdade, em verdade vos digo: antes que Abraão existisse, EU SOU (ἐγώ εἰμι)"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S03',
      type: 'write_practice',
      narration:
        'Agora escreva εἰμί cinco vezes na linha 1. Pronuncie: ei-MÍ.',
      greekForm: 'εἰμί',
      transliteration: 'eimí',
      writeRepetitions: 5,
      writeInstruction: 'Linha 1 da apostila — εἰμί',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S04',
      type: 'word_intro',
      narration:
        'ἔρχομαι significa vir, chegar, ir. É o verbo de movimento mais frequente do NT. No Apocalipse: "Vem, Senhor Jesus" (ἔρχου Κύριε Ἰησοῦ). Em João 1:9, a verdadeira luz estava vindo ao mundo. Pronuncia-se ÉR-cho-mai.',
      greekForm: 'ἔρχομαι',
      transliteration: 'érchomai',
      pronunciation: 'ÉR-cho-mai',
      translation: 'vir / chegar / ir',
      etymology:
        'Verbo de movimento mais frequente; no Apocalipse: "Vem, Senhor Jesus" (ἔρχου Κύριε Ἰησοῦ)',
      contextVerse: 'João 1:9',
      contextVerseText:
        '"A verdadeira luz... estava vindo (ἐρχόμενον) ao mundo"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S05',
      type: 'write_practice',
      narration:
        'Agora escreva ἔρχομαι cinco vezes na linha 2. Pronuncie: ÉR-cho-mai.',
      greekForm: 'ἔρχομαι',
      transliteration: 'érchomai',
      writeRepetitions: 5,
      writeInstruction: 'Linha 2 da apostila — ἔρχομαι',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S06',
      type: 'word_intro',
      narration:
        'ἀκούω significa ouvir, escutar com atenção. Deu origem a "acústica". Não é ouvir passivo — implica entender e responder. Em João 10:27, Jesus diz: "As minhas ovelhas ouvem a minha voz". Pronuncia-se a-KÚ-o.',
      greekForm: 'ἀκούω',
      transliteration: 'akoúō',
      pronunciation: 'a-KÚ-o',
      translation: 'ouvir / escutar com atenção',
      etymology:
        'Deu origem a "acústica"; não é ouvir passivo — implica entender e responder',
      contextVerse: 'João 10:27',
      contextVerseText:
        '"As minhas ovelhas ouvem (ἀκούουσιν) a minha voz"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S07',
      type: 'write_practice',
      narration:
        'Agora escreva ἀκούω cinco vezes na linha 3. Pronuncie: a-KÚ-o.',
      greekForm: 'ἀκούω',
      transliteration: 'akoúō',
      writeRepetitions: 5,
      writeInstruction: 'Linha 3 da apostila — ἀκούω',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S08',
      type: 'word_intro',
      narration:
        'βλέπω significa ver, perceber, enxergar. É distinto de ὁράω, que é ver com mais ênfase. Em João 9:25, o cego curado diz: "Uma coisa sei: eu era cego e agora vejo". Pronuncia-se BLÉP-o.',
      greekForm: 'βλέπω',
      transliteration: 'blépō',
      pronunciation: 'BLÉP-o',
      translation: 'ver / perceber / enxergar',
      etymology:
        'Distinto de ὁράω (ver com mais ênfase); em João 9:25: "Eu era cego e agora vejo"',
      contextVerse: 'João 9:25',
      contextVerseText:
        '"Uma coisa sei: eu era cego e agora vejo (βλέπω)"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S09',
      type: 'write_practice',
      narration:
        'Agora escreva βλέπω cinco vezes na linha 4. Pronuncie: BLÉP-o.',
      greekForm: 'βλέπω',
      transliteration: 'blépō',
      writeRepetitions: 5,
      writeInstruction: 'Linha 4 da apostila — βλέπω',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S10',
      type: 'word_intro',
      narration:
        'πιστεύω significa crer, confiar, comprometer-se. É o verbo de πίστις (fé). Em João, πιστεύω sempre pede comprometimento, não apenas assentimento. João 3:16: "Para que todo aquele que nele crê não pereça". Pronuncia-se pis-TEÚ-o.',
      greekForm: 'πιστεύω',
      transliteration: 'pisteúō',
      pronunciation: 'pis-TEÚ-o',
      translation: 'crer / confiar / comprometer-se',
      etymology:
        'O verbo de πίστις (fé); note: em João, πιστεύω sempre pede comprometimento, não apenas assentimento',
      contextVerse: 'João 3:16',
      contextVerseText:
        '"Para que todo aquele que nele crê (πιστεύων) não pereça"',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S11',
      type: 'write_practice',
      narration:
        'Agora escreva πιστεύω cinco vezes na linha 5. Pronuncie: pis-TEÚ-o.',
      greekForm: 'πιστεύω',
      transliteration: 'pisteúō',
      writeRepetitions: 5,
      writeInstruction: 'Linha 5 da apostila — πιστεύω',
      showPaperBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L16-S12',
      type: 'pause',
      narration:
        'Ser, vir, ouvir, ver e crer — verbos que descrevem o discipulado. Releia estas palavras.',
      displayText:
        'Ser, vir, ouvir, ver e crer — verbos que descrevem o discipulado.\nQuando estiver pronto, continue.',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S13',
      type: 'dictation',
      narration: 'Escreva no papel: ser.',
      displayText: '"ser"',
      greekForm: 'εἰμί',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S14',
      type: 'dictation',
      narration: 'Escreva no papel: vir.',
      displayText: '"vir"',
      greekForm: 'ἔρχομαι',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S15',
      type: 'dictation',
      narration: 'Escreva no papel: ouvir.',
      displayText: '"ouvir"',
      greekForm: 'ἀκούω',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S16',
      type: 'dictation',
      narration: 'Escreva no papel: ver.',
      displayText: '"ver"',
      greekForm: 'βλέπω',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L16-S17',
      type: 'dictation',
      narration: 'Escreva no papel: crer.',
      displayText: '"crer"',
      greekForm: 'πιστεύω',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};
