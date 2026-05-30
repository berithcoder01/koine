// src/types/greek.types.ts
export interface GreekWord {
  id: string;
  token: string;        // forma como aparece no texto
  lemma: string;        // forma do dicionário
  strongsId: string;    // ex: G3056
  parsing: string;      // ex: N-NMS
  glossPT: string;      // tradução principal
  glossAlternatives: string[];
  frequency: number;    // ocorrências no NT
  book: string;
  chapter: number;
  verse: number;
  position: number;
}

export interface ParsedMorphology {
  category: string;     // Substantivo, Verbo, etc.
  case?: string;        // Nominativo, Acusativo...
  number?: string;      // Singular, Plural
  gender?: string;      // Masculino, Feminino, Neutro
  person?: string;      // 1ª, 2ª, 3ª
  tense?: string;       // Presente, Aoristo, Futuro...
  mood?: string;        // Indicativo, Subjuntivo...
  voice?: string;       // Ativa, Passiva, Média
}

export interface GreekLetter {
  id: string;
  upperCase: string;
  lowerCase: string;
  name: string;         // ex: alfa, beta
  sound: string;        // transcrição fonética
  audioUrl: string;
  svgPath: string;      // path para Canvas template
  order: number;        // posição no alfabeto (1-24)
  frequency: 'alta' | 'media' | 'baixa';
}

export interface SRSCard {
  wordId: string;
  token: string;
  glossPT: string;
  interval: number;     // dias até próxima revisão
  easeFactor: number;   // EF, inicial 2.5
  repetitions: number;
  nextReview: string;   // ISO date
  status: 'aprendendo' | 'familiar' | 'dominado' | 'mestre';
}
