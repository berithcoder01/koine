// src/services/database/seedVocabulary.ts
import { databaseService } from './sqlite';

export const seedCoreVocabulary = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM vocabulary');
  if ((existing.values?.[0]?.count ?? 0) > 0) return;

  const words: Array<[string, string, string, string, string, string, number, number, number, number]> = [
    ['agape',    'ἀγάπη',    'ἀγάπη',  'G26',   'amor',          '["caridade"]',        320,  1, 1, 1],
    ['eimi',     'εἰμί',     'εἰμί',   'G1510', 'eu sou',        '["ser","estar"]',    2460,  2, 1, 1],
    ['hina',     'ἵνα',      'ἵνα',    'G2443', 'para que',      '["a fim de"]',        665,  1, 1, 1],
    ['ho',       'ὁ',        'ὁ',      'G3588', 'o (artigo)',    '[]',                20000,  2, 4, 1],
    ['ou',       'οὐ',       'οὐ',     'G3756', 'não',           '["nenhum"]',         1635,  1, 2, 1],
    ['holos',    'ὅλος',     'ὅλος',   'G3650', 'todo',          '["inteiro"]',         109,  1, 2, 1],
    ['en',       'ἦν',       'εἰμί',   'G1510', 'era',           '["estava"]',          484,  1, 3, 1],
    ['nomos',    'νόμος',    'νόμος',  'G3551', 'lei',           '[]',                  194,  1, 3, 1],
    ['teknon',   'τέκνον',   'τέκνον', 'G5043', 'filho/criança', '["filhinho"]',         99,  1, 3, 1],
    ['kosmos',   'κόσμος',   'κόσμος', 'G2889', 'mundo',         '[]',                  186,  1, 4, 1],
    ['logos',    'λόγος',    'λόγος',  'G3056', 'palavra',       '["verbo","razão"]',   330,  1, 4, 1],
    ['sarx',     'σάρξ',     'σάρξ',   'G4561', 'carne',         '[]',                  147,  1, 4, 1],
    ['pater',    'πατήρ',    'πατήρ',  'G3962', 'pai',           '[]',                  413,  1, 5, 1],
    ['rhema',    'ῥῆμα',     'ῥῆμα',   'G4487', 'palavra dita',  '["fala"]',             68,  1, 5, 1],
    ['mathetes', 'μαθητής',  'μαθητής','G3101', 'discípulo',     '[]',                  261,  1, 5, 1],
    ['bios',     'βίος',     'βίος',   'G979',  'vida',          '["modo de vida"]',     10,  1, 6, 1],
    ['doxa',     'δόξα',     'δόξα',   'G1391', 'glória',        '["honra"]',           168,  1, 6, 1],
    ['ge',       'γῆ',       'γῆ',     'G1093', 'terra',         '["solo","mundo"]',    250,  1, 6, 1],
    ['phos',     'φῶς',      'φῶς',    'G5457', 'luz',           '[]',                   73,  1, 7, 1],
    ['charis',   'χάρις',    'χάρις',  'G5485', 'graça',         '["favor"]',           155,  1, 7, 1],
    ['theos',    'θεός',     'θεός',   'G2316', 'Deus',          '[]',                 1317,  1, 7, 1],
    ['zoe',      'ζωή',      'ζωή',    'G2222', 'vida',          '["vida eterna"]',     135,  1, 8, 1],
    ['psyche',   'ψυχή',     'ψυχή',   'G5590', 'alma',          '["vida","pessoa"]',   103,  1, 8, 1],
    ['eirene',   'εἰρήνη',   'εἰρήνη', 'G1515', 'paz',           '[]',                   92,  1, 9, 1],
    ['aion',     'αἰών',     'αἰών',   'G165',  'eternidade',    '["era","século"]',    122,  1, 9, 1],
    ['oikos',    'οἶκος',    'οἶκος',  'G3624', 'casa',          '["família"]',         114,  1, 9, 1],
    ['arche',    'ἀρχή',     'ἀρχή',   'G746',  'princípio',     '["começo","governo"]',  55, 1, 10, 1],
  ];

  for (const w of words) {
    await db.run(
      `INSERT OR IGNORE INTO vocabulary
       (id, token, lemma, strongs_id, gloss_pt, gloss_alt, frequency, cycle_intro, module_intro, is_core)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      w,
    );
  }

  console.log('[Seed] 27 core vocabulary words seeded');
};
