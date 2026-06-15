// src/content/curriculum/unit-groups.ts
// UI-level grouping of modules into visual "trilhas" (trails).
// Each cycle is split into thematic groups rendered as cards on TrailPage.
// Modules inside a group are referenced by ID — the source of truth for
// each module is content/curriculum/modules.ts.

export interface UnitGroup {
  id: string;
  title: string;
  subtitle: string;
  moduleIds: string[];
}

export const CYCLE_1_UNIT_GROUPS: UnitGroup[] = [
  {
    id: 'c1-intro',
    title: 'Introdução',
    subtitle: 'Bem-vindos ao Grego Bíblico',
    moduleIds: ['C1-M00'],
  },
  {
    id: 'c1-u1',
    title: 'Vogais e Sílabas',
    subtitle: 'Domine os sons fundamentais do alfabeto grego',
    moduleIds: ['C1-M01', 'C1-M02', 'C1-M03'],
  },
  {
    id: 'c1-u2',
    title: 'Domínio de Consoantes',
    subtitle: 'Das oclusivas às aspiradas — precisão fonética',
    moduleIds: ['C1-M04', 'C1-M05', 'C1-M06', 'C1-M07'],
  },
  {
    id: 'c1-u3',
    title: 'Letras Raras e Revisão',
    subtitle: 'Completando o alfabeto e lendo João 1:1',
    moduleIds: ['C1-M08', 'C1-M09', 'C1-M10'],
  },
];

export const CYCLE_2_UNIT_GROUPS: UnitGroup[] = [
  {
    id: 'c2-u1',
    title: 'Verbo εἰμί',
    subtitle: 'Presente do indicativo — eu sou, tu és, ele é',
    moduleIds: ['C2-M01', 'C2-M02'],
  },
  {
    id: 'c2-u2',
    title: 'Pronomes e Artigos',
    subtitle: 'Sujeito, artigo definido e nominativo',
    moduleIds: ['C2-M03', 'C2-M04'],
  },
  {
    id: 'c2-u3',
    title: 'Substantivos e Predicação',
    subtitle: 'Segunda declinação e predicado nominal',
    moduleIds: ['C2-M05', 'C2-M06'],
  },
  {
    id: 'c2-u4',
    title: 'Verbos e Revisão',
    subtitle: 'λέγω, ἔχω, πιστεύω e o troféu final',
    moduleIds: ['C2-M07', 'C2-M08'],
  },
];

export const CYCLE_3_UNIT_GROUPS: UnitGroup[] = [
  {
    id: 'c3-u1',
    title: 'Os Três Casos',
    subtitle: 'Acusativo, Genitivo e Dativo — a base da declinação',
    moduleIds: ['C3-M01', 'C3-M02', 'C3-M03'],
  },
  {
    id: 'c3-u2',
    title: 'Revisão e 1ª Declinação',
    subtitle: 'Consolidação dos casos e substantivos femininos',
    moduleIds: ['C3-M04', 'C3-M05'],
  },
  {
    id: 'c3-u3',
    title: 'Declinação Completa e Preposições',
    subtitle: 'Paradigmas completos e preposições com casos',
    moduleIds: ['C3-M06', 'C3-M07'],
  },
  {
    id: 'c3-u4',
    title: 'Grande Revisão',
    subtitle: 'Troféu João 14:6 — Declinador de Casos',
    moduleIds: ['C3-M08'],
  },
];

export const CYCLE_4_UNIT_GROUPS: UnitGroup[] = [
  {
    id: 'c4-u1',
    title: 'Presente Ativo',
    subtitle: 'O paradigma λύω e as terminações pessoais',
    moduleIds: ['C4-M01'],
  },
  {
    id: 'c4-u2',
    title: 'Verbos de Movimento',
    subtitle: 'ἔρχομαι, πορεύομαι e verbos compostos',
    moduleIds: ['C4-M02', 'C4-M03'],
  },
  {
    id: 'c4-u3',
    title: 'Aula do Versículo',
    subtitle: 'João 14:1-3 — leitura guiada e interpretação',
    moduleIds: ['C4-M04', 'C4-M05'],
  },
  {
    id: 'c4-u4',
    title: 'Contratos, Voz Média e Revisão',
    subtitle: 'Verbos contractos, depoentes e troféu final',
    moduleIds: ['C4-M06', 'C4-M07', 'C4-M08'],
  },
];

export const CYCLE_5_UNIT_GROUPS: UnitGroup[] = [
  {
    id: 'c5-u1',
    title: 'Adjetivos 2ª Declinação',
    subtitle: 'ἀγαθός, καλός, πιστός — paradigma e concordância',
    moduleIds: ['C5-M01', 'C5-M02'],
  },
  {
    id: 'c5-u2',
    title: 'Atributivo vs. Predicativo',
    subtitle: 'A chave para leitura fluente do NT',
    moduleIds: ['C5-M03', 'C5-M04'],
  },
  {
    id: 'c5-u3',
    title: 'Pronomes Demonstrativos',
    subtitle: 'οὗτος, αὕτη, τοῦτο e ἐκεῖνος',
    moduleIds: ['C5-M05', 'C5-M06'],
  },
  {
    id: 'c5-u4',
    title: 'Pronomes Relativos',
    subtitle: 'ὅς, ἥ, ὅ — a ponte para frases complexas',
    moduleIds: ['C5-M07'],
  },
  {
    id: 'c5-u5',
    title: 'Grande Revisão',
    subtitle: 'Troféu Mateus 5:14 — Iluminador',
    moduleIds: ['C5-M08'],
  },
];

export const CYCLE_6_UNIT_GROUPS: UnitGroup[] = [
  {
    id: 'c6-u1',
    title: 'Aoristo Ativo',
    subtitle: 'Tema sigmático, temático e contractos',
    moduleIds: ['C6-M01', 'C6-M02', 'C6-M03'],
  },
  {
    id: 'c6-u2',
    title: 'Aoristo Passivo + Versículo',
    subtitle: 'Marca -θη- e Romanos 6:3-4',
    moduleIds: ['C6-M04', 'C6-M05'],
  },
  {
    id: 'c6-u3',
    title: 'Futuro Ativo + Versículo',
    subtitle: 'Marca -σ- e João 14:3',
    moduleIds: ['C6-M06', 'C6-M07'],
  },
  {
    id: 'c6-u4',
    title: 'Revisão e Leitura',
    subtitle: 'Tabela comparativa e João 3:14-17',
    moduleIds: ['C6-M08', 'C6-M09'],
  },
  {
    id: 'c6-u5',
    title: 'Grande Revisão',
    subtitle: 'Troféu João 3:14-17 — Narrador do Tempo',
    moduleIds: ['C6-M10'],
  },
];

export const CYCLE_7_UNIT_GROUPS: UnitGroup[] = [
  {
    id: 'c7-u1',
    title: 'Preposições Acusativo + Versículo',
    subtitle: 'εἰς, πρός, κατά e Atos 1:8',
    moduleIds: ['C7-M01', 'C7-M02'],
  },
  {
    id: 'c7-u2',
    title: 'Preposições Genitivo',
    subtitle: 'ἐκ (origem), ἀπό (separação), διά (meio)',
    moduleIds: ['C7-M03', 'C7-M04'],
  },
  {
    id: 'c7-u3',
    title: 'Preposições Dativo + Múltiplos Casos',
    subtitle: 'ἐν (4 usos), σύν, ἐπί, παρά, μετά',
    moduleIds: ['C7-M05', 'C7-M06'],
  },
  {
    id: 'c7-u4',
    title: 'Partículas de Transição',
    subtitle: 'γάρ, δέ, οὖν, ἀλλά — conectivos do NT',
    moduleIds: ['C7-M07'],
  },
  {
    id: 'c7-u5',
    title: 'Grande Revisão',
    subtitle: 'Troféu Romanos 8:1 — Conector de Mundos',
    moduleIds: ['C7-M08'],
  },
];

export const CYCLE_8_UNIT_GROUPS: UnitGroup[] = [
  {
    id: 'c8-u1',
    title: 'Prólogo de João',
    subtitle: 'João 1:1-18 — o texto mais denso do NT',
    moduleIds: ['C8-M01', 'C8-M02'],
  },
  {
    id: 'c8-u2',
    title: '1 João — Amor e Verdade',
    subtitle: '1 João 4:7-21 — gramática do amor joanino',
    moduleIds: ['C8-M03', 'C8-M04'],
  },
  {
    id: 'c8-u3',
    title: 'Romanos 8 — Carne e Espírito',
    subtitle: 'Rm 8:1-11 — contraste existencial',
    moduleIds: ['C8-M05', 'C8-M06'],
  },
  {
    id: 'c8-u4',
    title: 'Leitura Livre + Troféu',
    subtitle: 'Leitor interlinear e Fp 4:13 — Leitor do NT',
    moduleIds: ['C8-M07', 'C8-M08'],
  },
];
