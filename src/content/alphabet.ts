// src/content/alphabet.ts
export interface Letter {
  id: string;
  upper: string;
  lower: string;
  name: string;
  sound: string;
  audioUrl: string | null;
  svgPath: string | null;
  letterOrder: number;
  frequency: 'alta' | 'media' | 'baixa';
  cycle: number;
  module: number;
}

export const LETTERS: Letter[] = [
  { id: 'alpha',   upper: 'Α', lower: 'α', name: 'alfa',    sound: '/a/',   audioUrl: null, svgPath: null, letterOrder: 1,  frequency: 'alta',  cycle: 1, module: 1 },
  { id: 'epsilon', upper: 'Ε', lower: 'ε', name: 'épsilon', sound: '/e/',   audioUrl: null, svgPath: null, letterOrder: 5,  frequency: 'alta',  cycle: 1, module: 1 },
  { id: 'iota',    upper: 'Ι', lower: 'ι', name: 'iota',    sound: '/i/',   audioUrl: null, svgPath: null, letterOrder: 9,  frequency: 'alta',  cycle: 1, module: 1 },
  { id: 'omicron', upper: 'Ο', lower: 'ο', name: 'ômicron', sound: '/o/',   audioUrl: null, svgPath: null, letterOrder: 15, frequency: 'alta',  cycle: 1, module: 2 },
  { id: 'upsilon', upper: 'Υ', lower: 'υ', name: 'ípsilon', sound: '/y/',   audioUrl: null, svgPath: null, letterOrder: 20, frequency: 'media', cycle: 1, module: 2 },
  { id: 'omega',   upper: 'Ω', lower: 'ω', name: 'ômega',   sound: '/ō/',   audioUrl: null, svgPath: null, letterOrder: 24, frequency: 'alta',  cycle: 1, module: 2 },
  { id: 'eta',     upper: 'Η', lower: 'η', name: 'eta',     sound: '/ē/',   audioUrl: null, svgPath: null, letterOrder: 7,  frequency: 'alta',  cycle: 1, module: 3 },
  { id: 'nu',      upper: 'Ν', lower: 'ν', name: 'nu',      sound: '/n/',   audioUrl: null, svgPath: null, letterOrder: 13, frequency: 'alta',  cycle: 1, module: 3 },
  { id: 'tau',     upper: 'Τ', lower: 'τ', name: 'tau',     sound: '/t/',   audioUrl: null, svgPath: null, letterOrder: 19, frequency: 'alta',  cycle: 1, module: 3 },
  { id: 'sigma',   upper: 'Σ', lower: 'σ', name: 'sigma',   sound: '/s/',   audioUrl: null, svgPath: null, letterOrder: 18, frequency: 'alta',  cycle: 1, module: 4 },
  { id: 'kappa',   upper: 'Κ', lower: 'κ', name: 'kappa',   sound: '/k/',   audioUrl: null, svgPath: null, letterOrder: 10, frequency: 'alta',  cycle: 1, module: 4 },
  { id: 'lambda',  upper: 'Λ', lower: 'λ', name: 'lambda',  sound: '/l/',   audioUrl: null, svgPath: null, letterOrder: 11, frequency: 'alta',  cycle: 1, module: 4 },
  { id: 'pi',      upper: 'Π', lower: 'π', name: 'pi',      sound: '/p/',   audioUrl: null, svgPath: null, letterOrder: 16, frequency: 'alta',  cycle: 1, module: 5 },
  { id: 'rho',     upper: 'Ρ', lower: 'ρ', name: 'rô',      sound: '/r/',   audioUrl: null, svgPath: null, letterOrder: 17, frequency: 'alta',  cycle: 1, module: 5 },
  { id: 'mu',      upper: 'Μ', lower: 'μ', name: 'mi',      sound: '/m/',   audioUrl: null, svgPath: null, letterOrder: 12, frequency: 'alta',  cycle: 1, module: 5 },
  { id: 'beta',    upper: 'Β', lower: 'β', name: 'beta',    sound: '/b/',   audioUrl: null, svgPath: null, letterOrder: 2,  frequency: 'media', cycle: 1, module: 6 },
  { id: 'delta',   upper: 'Δ', lower: 'δ', name: 'delta',   sound: '/d/',   audioUrl: null, svgPath: null, letterOrder: 4,  frequency: 'media', cycle: 1, module: 6 },
  { id: 'gamma',   upper: 'Γ', lower: 'γ', name: 'gama',    sound: '/g/',   audioUrl: null, svgPath: null, letterOrder: 3,  frequency: 'media', cycle: 1, module: 6 },
  { id: 'phi',     upper: 'Φ', lower: 'φ', name: 'fi',      sound: '/f/',   audioUrl: null, svgPath: null, letterOrder: 21, frequency: 'alta',  cycle: 1, module: 7 },
  { id: 'chi',     upper: 'Χ', lower: 'χ', name: 'qui',     sound: '/kh/',  audioUrl: null, svgPath: null, letterOrder: 22, frequency: 'media', cycle: 1, module: 7 },
  { id: 'theta',   upper: 'Θ', lower: 'θ', name: 'teta',    sound: '/th/',  audioUrl: null, svgPath: null, letterOrder: 8,  frequency: 'alta',  cycle: 1, module: 7 },
  { id: 'zeta',    upper: 'Ζ', lower: 'ζ', name: 'zeta',    sound: '/dz/',  audioUrl: null, svgPath: null, letterOrder: 6,  frequency: 'baixa', cycle: 1, module: 8 },
  { id: 'xi',      upper: 'Ξ', lower: 'ξ', name: 'xi',      sound: '/ks/',  audioUrl: null, svgPath: null, letterOrder: 14, frequency: 'baixa', cycle: 1, module: 8 },
  { id: 'psi',     upper: 'Ψ', lower: 'ψ', name: 'psi',     sound: '/ps/',  audioUrl: null, svgPath: null, letterOrder: 23, frequency: 'baixa', cycle: 1, module: 8 },
];
