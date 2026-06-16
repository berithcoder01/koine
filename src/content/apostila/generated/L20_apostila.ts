/**
 * L20 — Tudo Posso Naquele (Fp 4:13)
 *
 * ID:               apostila-L20
 * TÍTULO:           Lição 20 — Tudo Posso Naquele
 * DESCRIÇÃO:        Fp 4:13 — πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με
 * PDF_PAGE:         42
 * XP:               60
 * TEMPO:            18 min
 * REQUER_ANTERIOR:  true
 *
 * Total de Steps: 11
 */

import type { ApostilaLesson } from '../../../features/apostila/apostilaTypes';

export const APOSTILA_L20: ApostilaLesson = {
  id: 'apostila-L20',
  title: 'Lição 20 — Tudo Posso Naquele',
  description: 'Fp 4:13 — πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
  apostilaPdfPage: 43,
  lessonNumber: 20,
  xpReward: 60,
  estimatedMinutes: 18,
  requiresPrevious: true,

  steps: [
    {
      id: 'apostila-L20-S01',
      type: 'intro',
      narration:
        'Filipenses 4:13 — o verso da fortaleza em Cristo. Paulo escreve da prisão, não de um palácio. É na fraqueza que ele descobre: πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με. Abra sua apostila na página 42.',
      displayText: 'Abra sua apostila na Página 42',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L20-S02',
      type: 'word_intro',
      narration:
        'πάντα significa "todas as coisas" ou "tudo". É o plural neutro de πᾶς (todo, cada). Paulo começa com esta palavra para afirmar que não há exceção.',
      greekForm: 'πάντα',
      transliteration: 'panta',
      pronunciation: 'PÁN-ta',
      translation: 'todas as coisas / tudo',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L20-S03',
      type: 'word_intro',
      narration:
        'ἰσχύω significa "eu tenho força", "sou forte". Não é uma força qualquer — é a fortaleza interior que vem de Deus. A raiz ἰσχύς significa poder, força.',
      greekForm: 'ἰσχύω',
      transliteration: 'ischyō',
      pronunciation: 'is-KHÚ-o',
      translation: 'eu tenho força / sou forte',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L20-S04',
      type: 'word_intro',
      narration:
        'ἐν — preposição "em", "por meio de". Indica instrumento ou agente. Paulo diz que a força não vem dele mesmo, mas por meio de Cristo.',
      greekForm: 'ἐν',
      transliteration: 'en',
      pronunciation: 'en',
      translation: 'em / por meio de',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L20-S05',
      type: 'word_intro',
      narration:
        'τῷ é o artigo definido neutro/dativo singular — "ao" / "no". Acompanha ἐνδυναμοῦντι no caso dativo.',
      greekForm: 'τῷ',
      transliteration: 'tō',
      pronunciation: 'tô',
      translation: 'o / ao (artigo dativo)',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L20-S06',
      type: 'word_intro',
      narration:
        'ἐνδυναμοῦντί é um particípio presente que significa "que me fortalece" ou "que dá força". A palavra tem a mesma raiz de δύναμις (poder, milagre). É Cristo quem ativamente fortalece.',
      greekForm: 'ἐνδυναμοῦντί',
      transliteration: 'endynamounti',
      pronunciation: 'en-dy-na-MOÚN-ti',
      translation: 'que me fortalece / que dá força',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L20-S07',
      type: 'word_intro',
      narration:
        'με significa "mim", "me". É o pronome pessoal acusativo. Paulo personaliza: não é uma força para todos em geral, mas "Cristo que me fortalece a MIM".',
      greekForm: 'με',
      transliteration: 'me',
      pronunciation: 'me',
      translation: 'me / mim',
      showGreekLarge: true,
    },

    {
      id: 'apostila-L20-S08',
      type: 'pause',
      narration:
        'Paulo escreveu esta frase acorrentado a um soldado romano. Leia-a devagar na apostila: panta ischyō en tō endynamounti me. Cada palavra é uma declaração de fé.',
      displayText:
        'Leia a frase na página 42.\nπάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
      showGreekLarge: false,
    },

    {
      id: 'apostila-L20-S09',
      type: 'write_practice',
      narration:
        'Agora copie a frase completa três vezes no espaço da apostila. Cada letra é uma afirmação de fé.',
      greekForm: 'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
      writeRepetitions: 3,
      writeInstruction: 'Espaço de cópia da apostila — frase completa',
      showPaperBadge: true,
      showGreekLarge: false,
    },

    {
      id: 'apostila-L20-S10',
      type: 'read_aloud',
      narration:
        'Ouça a frase: panta ischyō en tō endynamounti me. Agora repita em voz alta comigo. Leia duas vezes com convicção.',
      greekForm: 'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
      transliteration: 'panta ischyō en tō endynamounti me',
      translation: 'Tudo posso naquele que me fortalece',
      showVoiceBadge: true,
      showGreekLarge: true,
    },

    {
      id: 'apostila-L20-S11',
      type: 'dictation',
      narration:
        'Escreva em grego: "Tudo posso naquele que me fortalece".',
      displayText: '"Tudo posso naquele que me fortalece"',
      greekForm: 'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
      revealAfterConfirm: true,
      showPaperBadge: true,
      showGreekLarge: false,
    },
  ],
};

