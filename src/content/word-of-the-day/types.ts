export type WordDifficulty = 'facil' | 'media' | 'dificil';

export interface WordOfTheDay {
  id: number;
  grego: string;
  transliteracao: string;
  categoria: string;
  significado_curto: string;
  etimologia: string;
  curiosidade: string;
  ocorrencias_nt: number;
  primeiro_texto: string;
  primeiro_trecho: string;
  ciclo_pedagogico: number;
  tags: string[];
  dificuldade: WordDifficulty;
}
