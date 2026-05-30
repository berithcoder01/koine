// src/utils/greekUtils.ts

/**
 * Decodifica uma string de parsing morfológico para labels legíveis em PT-BR.
 * Formato: N-NMS = Substantivo • Nominativo • Masc. • Singular
 */

const CATEGORY_MAP: Record<string, string> = {
  N: 'Substantivo',
  V: 'Verbo',
  A: 'Adjetivo',
  P: 'Pronome',
  T: 'Artigo',
  PREP: 'Preposição',
  CONJ: 'Conjunção',
  PRT: 'Partícula',
  ADV: 'Advérbio',
  INJ: 'Interjeição',
};

const CASE_MAP: Record<string, string> = {
  N: 'Nominativo',
  G: 'Genitivo',
  D: 'Dativo',
  A: 'Acusativo',
  V: 'Vocativo',
};

const NUMBER_MAP: Record<string, string> = {
  S: 'Singular',
  P: 'Plural',
};

const GENDER_MAP: Record<string, string> = {
  M: 'Masc.',
  F: 'Fem.',
  N: 'Neutro',
};

const PERSON_MAP: Record<string, string> = {
  '1': '1ª pessoa',
  '2': '2ª pessoa',
  '3': '3ª pessoa',
};

const TENSE_MAP: Record<string, string> = {
  P: 'Presente',
  I: 'Imperfeito',
  F: 'Futuro',
  A: 'Aoristo',
  X: 'Perfeito',
  Y: 'Mais-que-perfeito',
};

const MOOD_MAP: Record<string, string> = {
  I: 'Indicativo',
  S: 'Subjuntivo',
  O: 'Optativo',
  M: 'Imperativo',
  N: 'Infinitivo',
  P: 'Particípio',
};

const VOICE_MAP: Record<string, string> = {
  A: 'Ativa',
  M: 'Média',
  P: 'Passiva',
  E: 'Média/Passiva',
  D: 'Depoente',
};

/**
 * Decodifica string de parsing morfológico em labels PT-BR.
 * Ex.: 'N-NMS' → ['Substantivo', 'Nominativo', 'Masc.', 'Singular']
 */
export function decodeParsing(parsing: string): string[] {
  if (!parsing) return [];

  const parts = parsing.split('-');
  const category = CATEGORY_MAP[parts[0]] ?? parts[0];
  const labels: string[] = [category];

  if (parts.length > 1) {
    const inflection = parts[1];
    // Substantivos / Adjetivos / Artigos / Pronomes: Caso+Número+Gênero
    if (['N', 'A', 'T', 'P'].includes(parts[0]) && inflection.length >= 2) {
      const caseLabel = CASE_MAP[inflection[0]];
      const numberLabel = NUMBER_MAP[inflection[1]];
      const genderLabel = inflection[2] ? GENDER_MAP[inflection[2]] : null;
      if (caseLabel) labels.push(caseLabel);
      if (numberLabel) labels.push(numberLabel);
      if (genderLabel) labels.push(genderLabel);
    }
    // Verbos: Pessoa+Número+Tempo+Modo+Voz
    if (parts[0] === 'V' && inflection.length >= 3) {
      const personLabel = PERSON_MAP[inflection[0]];
      const numberLabel = NUMBER_MAP[inflection[1]];
      const tenseLabel = TENSE_MAP[inflection[2]];
      const moodLabel = inflection[3] ? MOOD_MAP[inflection[3]] : null;
      const voiceLabel = inflection[4] ? VOICE_MAP[inflection[4]] : null;
      if (personLabel) labels.push(personLabel);
      if (numberLabel) labels.push(numberLabel);
      if (tenseLabel) labels.push(tenseLabel);
      if (moodLabel) labels.push(moodLabel);
      if (voiceLabel) labels.push(voiceLabel);
    }
  }

  return labels;
}

/**
 * Remove diacríticos de texto grego para comparação simples.
 */
export function stripDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f\u0313\u0314\u0345]/g, '');
}

/**
 * Formata a frequência de ocorrência para exibição.
 */
export function formatFrequency(count: number): string {
  if (count === 1) return '1 ocorrência no NT';
  return `${count.toLocaleString('pt-BR')} ocorrências no NT`;
}
