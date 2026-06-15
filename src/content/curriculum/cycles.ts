// src/content/curriculum/cycles.ts
export interface Cycle {
  id: number;
  title: string;
  description: string;
  trophyVerse: string;
  trophyReference: string;
  trophyVerseId: string;
  isPremium: 0 | 1;
  totalModules: number;
}

export const CYCLES: Cycle[] = [
  {
    id: 1,
    title: 'Alfabeto e Fonética',
    description: 'Aprenda as 24 letras do grego koiné com pronúncia erasmiana e escrita motora',
    trophyVerse: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόgos ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος',
    trophyReference: 'João 1:1',
    trophyVerseId: 'JN-1-1',
    isPremium: 0,
    totalModules: 10,
  },
  {
    id: 2,
    title: 'Verbos Presente + Ser',
    description: 'Conjugação de εἰμί e primeiros verbos do NT em frases reais',
    trophyVerse: 'ἡ ἀγάπη μακροθυμεῖ, χρηστεύεται ἡ ἀγάπη, οὐ ζηλοῖ',
    trophyReference: '1 Coríntios 13:4',
    trophyVerseId: '1CO-13-4',
    isPremium: 0,
    totalModules: 8,
  },
  {
    id: 3,
    title: 'Substantivos e Artigos',
    description: 'Declinações funcionais via arraste de blocos',
    trophyVerse: 'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
    trophyReference: 'Filipenses 4:13',
    trophyVerseId: 'FP-4-13',
    isPremium: 1,
    totalModules: 8,
  },
  {
    id: 4,
    title: 'Verbos — Presente e Movimento',
    description: 'Conjugação completa do presente ativo, verbos de movimento e contratos',
    trophyVerse: 'ἐν τούτῳ ἐδοξάσθη ὁ πατήρ μου, ἵνα καρπὸν πολὺν φέρητε',
    trophyReference: 'João 15:8',
    trophyVerseId: 'JN-15-8',
    isPremium: 1,
    totalModules: 8,
  },
  {
    id: 5,
    title: 'Adjetivos e Pronomes',
    description: 'Concordância, atributivo/predicativo, demonstrativos e relativos',
    trophyVerse: 'ὑμεῖς ἐστε τὸ φῶς τοῦ κόσμου',
    trophyReference: 'Mateus 5:14',
    trophyVerseId: 'MT-5-14',
    isPremium: 1,
    totalModules: 8,
  },
  {
    id: 6,
    title: 'Verbos Aoristo e Futuro',
    description: 'Aspecto perfectivo, tema sigmático, futuro ativo e passivo',
    trophyVerse: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον',
    trophyReference: 'João 3:14-17',
    trophyVerseId: 'JN-3-14',
    isPremium: 1,
    totalModules: 10,
  },
  {
    id: 7,
    title: 'Partículas e Preposições',
    description: 'Preposições com casos e conectivos de transição',
    trophyVerse: 'οὐδὲν ἄρα νῦν κατάκριμα τοῖς ἐν Χριστῷ Ἰησοῦ',
    trophyReference: 'Romanos 8:1',
    trophyVerseId: 'RM-8-1',
    isPremium: 1,
    totalModules: 8,
  },
  {
    id: 8,
    title: 'Leitura Livre do NT',
    description: 'Prólogo de João, 1 João, Romanos — leitura independente',
    trophyVerse: 'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με',
    trophyReference: 'Filipenses 4:13',
    trophyVerseId: 'FP-4-13',
    isPremium: 1,
    totalModules: 8,
  },
];
