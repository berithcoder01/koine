// src/services/database/seedLetters.ts
import { databaseService } from './sqlite';

export const seedLetters = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM letters');
  if ((existing.values?.[0]?.count ?? 0) > 0) return;

  const letters: Array<[string, string, string, string, string, null, null, number, string, number, number]> = [
    ['alpha',   'Α', 'α', 'alfa',    '/a/',     null, null, 1,  'alta',  1, 1],
    ['epsilon', 'Ε', 'ε', 'épsilon', '/e/',     null, null, 5,  'alta',  1, 1],
    ['iota',    'Ι', 'ι', 'iota',    '/i/',     null, null, 9,  'alta',  1, 1],
    ['omicron', 'Ο', 'ο', 'ômicron', '/o/',     null, null, 15, 'alta',  1, 2],
    ['upsilon', 'Υ', 'υ', 'ípsilon', '/y/',     null, null, 20, 'media', 1, 2],
    ['omega',   'Ω', 'ω', 'ômega',   '/ō/',     null, null, 24, 'alta',  1, 2],
    ['eta',     'Η', 'η', 'eta',     '/ē/',     null, null, 7,  'alta',  1, 3],
    ['nu',      'Ν', 'ν', 'nu',      '/n/',     null, null, 13, 'alta',  1, 3],
    ['tau',     'Τ', 'τ', 'tau',     '/t/',     null, null, 19, 'alta',  1, 3],
    ['sigma',   'Σ', 'σ', 'sigma',   '/s/',     null, null, 18, 'alta',  1, 4],
    ['kappa',   'Κ', 'κ', 'kappa',   '/k/',     null, null, 10, 'alta',  1, 4],
    ['lambda',  'Λ', 'λ', 'lambda',  '/l/',     null, null, 11, 'alta',  1, 4],
    ['pi',      'Π', 'π', 'pi',      '/p/',     null, null, 16, 'alta',  1, 5],
    ['rho',     'Ρ', 'ρ', 'rô',      '/r/',     null, null, 17, 'alta',  1, 5],
    ['mu',      'Μ', 'μ', 'mi',      '/m/',     null, null, 12, 'alta',  1, 5],
    ['beta',    'Β', 'β', 'beta',    '/b/',     null, null, 2,  'media', 1, 6],
    ['delta',   'Δ', 'δ', 'delta',   '/d/',     null, null, 4,  'media', 1, 6],
    ['gamma',   'Γ', 'γ', 'gama',    '/g/',     null, null, 3,  'media', 1, 6],
    ['phi',     'Φ', 'φ', 'fi',      '/f/',     null, null, 21, 'alta',  1, 7],
    ['chi',     'Χ', 'χ', 'qui',     '/kh/',    null, null, 22, 'media', 1, 7],
    ['theta',   'Θ', 'θ', 'teta',    '/th/',    null, null, 8,  'alta',  1, 7],
    ['zeta',    'Ζ', 'ζ', 'zeta',    '/dz/',    null, null, 6,  'baixa', 1, 8],
    ['xi',      'Ξ', 'ξ', 'xi',      '/ks/',    null, null, 14, 'baixa', 1, 8],
    ['psi',     'Ψ', 'ψ', 'psi',     '/ps/',    null, null, 23, 'baixa', 1, 8],
  ];

  for (const l of letters) {
    await db.run(
      `INSERT OR IGNORE INTO letters
       (id, upper_case, lower_case, name, sound, audio_url, svg_path, letter_order, frequency, cycle, module)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      l,
    );
  }
};
