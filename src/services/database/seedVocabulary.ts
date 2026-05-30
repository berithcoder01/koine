import { databaseService } from './sqlite';

type VocabRow = [string, string, string, string, string, string, number, number, number, number];

const VOCAB: VocabRow[] = [
  // ═══════════════════════════════════════════════════════════════
  // CICLO I — Alfabeto e Fonética
  // ═══════════════════════════════════════════════════════════════

  // M01: Vogais Α, Ε, Ι
  ['agathos',  'ἀγαθός',  'ἀγαθός',  'G18',   'bom',           '["bondoso","útil"]',        102, 1, 1, 1],
  ['ego',      'ἐγώ',     'ἐγώ',     'G1473', 'eu',            '[]',                        256, 1, 1, 1],
  ['idou',     'ἰδοὺ',    'ἰδοὺ',    'G2400', 'eis',           '["vede","aqui está"]',      200, 1, 1, 1],
  ['agape',    'ἀγάπη',   'ἀγάπη',   'G26',   'amor',          '["caridade"]',              320, 1, 1, 1],
  ['eimi',     'εἰμί',    'εἰμί',    'G1510', 'sou/estar',     '["ser"]',                  2460, 1, 1, 1],
  ['adelphos', 'ἀδελφός', 'ἀδελφός', 'G80',   'irmão',         '["irmão"]',                 344, 1, 1, 1],

  // M02: Vogais Ο, Υ, Ω
  ['hodos',    'ὁδός',    'ὁδός',    'G3598', 'caminho',       '["estrada","via"]',         101, 1, 2, 1],
  ['huios',    'υἱός',    'υἱός',    'G5207', 'filho',         '["descendente"]',           377, 1, 2, 1],
  ['hora',     'ὥρα',     'ὥρα',     'G5610', 'hora',          '["tempo","momento"]',       106, 1, 2, 1],
  ['logos',    'λόγος',   'λόγος',   'G3056', 'palavra',       '["verbo","razão"]',         330, 1, 2, 1],
  ['kyrios',   'κύριος',  'κύριος',  'G2962', 'Senhor',        '["senhor","mestre"]',       717, 1, 2, 1],
  ['doulos',   'δοῦλος',  'δοῦλος',  'G1401', 'servo',         '["escravo"]',               127, 1, 2, 1],

  // M03: Consoantes Η, Ν, Τ
  ['hemera',   'ἡμέρα',   'ἡμέρα',   'G2250', 'dia',           '["tempo","luz do dia"]',    389, 1, 3, 1],
  ['nomos',    'νόμος',   'νόμος',   'G3551', 'lei',           '["torá","ensinamento"]',    194, 1, 3, 1],
  ['teknon',   'τέκνον',  'τέκνον',  'G5043', 'filho/criança', '["filhinho","infante"]',     99, 1, 3, 1],
  ['pistis',   'πίστις',  'πίστις',  'G4102', 'fé',            '["crença","fidelidade"]',   244, 1, 3, 1],
  ['en',       'ἦν',      'εἰμί',    'G1510', 'era',           '["estava"]',                484, 1, 3, 1],
  ['pneuma',   'πνεῦμα',  'πνεῦμα',  'G4151', 'Espírito',      '["sopro","vento","espírito"]', 379, 1, 3, 1],

  // M04: Consoantes Σ, Κ, Λ
  ['sarx',     'σάρξ',    'σάρξ',    'G4561', 'carne',         '["corpo","natureza humana"]',147, 1, 4, 1],
  ['kosmos',   'κόσμος',  'κόσμος',  'G2889', 'mundo',         '["ordem","universo"]',      186, 1, 4, 1],
  ['laos',     'λαός',    'λαός',    'G2992', 'povo',          '["nação","multidão"]',      142, 1, 4, 1],
  ['soteria',  'σωτηρία', 'σωτηρία', 'G4991', 'salvação',      '["libertação"]',             46, 1, 4, 1],
  ['kardia',   'καρδία',  'καρδία',  'G2588', 'coração',       '["mente","íntimo"]',        159, 1, 4, 1],

  // M05: Consoantes Π, Ρ, Μ
  ['pater',    'πατήρ',   'πατήρ',   'G3962', 'pai',           '["ancestral"]',             413, 1, 5, 1],
  ['rhema',    'ῥῆμα',    'ῥῆμα',    'G4487', 'palavra dita',  '["fala","declaração"]',      68, 1, 5, 1],
  ['meter',    'μήτηρ',   'μήτηρ',   'G3384', 'mãe',           '["mãe","matriarca"]',        83, 1, 5, 1],
  ['martys',   'μάρτυς',  'μάρτυς',  'G3144', 'testemunha',    '["mártir"]',                 34, 1, 5, 1],
  ['pros',     'πρός',    'πρός',    'G4314', 'para/com',      '["em direção a"]',          700, 1, 5, 1],

  // M06: Oclusivas Β, Δ, Γ
  ['bios',     'βίος',    'βίος',    'G979',  'vida',          '["modo de vida","existência"]', 10, 1, 6, 1],
  ['doxa',     'δόξα',    'δόξα',    'G1391', 'glória',        '["honra","esplendor"]',     168, 1, 6, 1],
  ['ge',       'γῆ',      'γῆ',      'G1093', 'terra',         '["solo","mundo","país"]',   250, 1, 6, 1],
  ['biblion',  'βιβλίον', 'βιβλίον', 'G975',  'livro',         '["rolo","escritura"]',       34, 1, 6, 1],
  ['dynamis',  'δύναμις', 'δύναμις', 'G1411', 'poder',         '["força","milagre"]',       119, 1, 6, 1],
  ['ginosko',  'γινώσκω', 'γινώσκω', 'G1097', 'conhecer',      '["saber","reconhecer"]',    222, 1, 6, 1],

  // M07: Aspiradas Φ, Χ, Θ
  ['phos',     'φῶς',     'φῶς',     'G5457', 'luz',           '["claridade","iluminação"]',  73, 1, 7, 1],
  ['charis',   'χάρις',   'χάρις',   'G5485', 'graça',         '["favor","bondade"]',       155, 1, 7, 1],
  ['theos',    'θεός',    'θεός',    'G2316', 'Deus',           '["divindade"]',            1317, 1, 7, 1],
  ['phero',    'φέρω',    'φέρω',    'G5342', 'carregar',      '["trazer","levar"]',         68, 1, 7, 1],
  ['cheir',    'χείρ',    'χείρ',    'G5495', 'mão',           '["poder","obra"]',          177, 1, 7, 1],
  ['thysis',   'θυσία',   'θυσία',   'G2378', 'sacrifício',    '["oferta","holocausto"]',    28, 1, 7, 1],

  // M08: Raras Ζ, Ξ, Ψ
  ['zoe',      'ζωή',     'ζωή',     'G2222', 'vida',          '["vida eterna"]',           135, 1, 8, 1],
  ['xenos',    'ξένος',   'ξένος',   'G3581', 'estrangeiro',    '["hóspede","forasteiro"]',  14, 1, 8, 1],
  ['psyche',   'ψυχή',    'ψυχή',    'G5590', 'alma',           '["vida","pessoa","mente"]', 103, 1, 8, 1],
  ['zelos',    'ζῆλος',   'ζῆλος',   'G2205', 'zelo',          '["ciúmes","ardor"]',         16, 1, 8, 1],
  ['pseudos',  'ψεῦδος',  'ψεῦδος',  'G5579', 'mentira',       '["falsidade","engano"]',     10, 1, 8, 1],

  // M09: Diacríticos e Vogais Longas
  ['ouranos',  'οὐρανός', 'οὐρανός', 'G3772', 'céu',           '["firmamento","paraíso"]',  273, 1, 9, 1],
  ['aion',     'αἰών',    'αἰών',    'G165',  'eternidade',    '["era","século"]',          122, 1, 9, 1],
  ['oikos',    'οἶκος',   'οἶκος',   'G3624', 'casa',          '["família","lar"]',         114, 1, 9, 1],
  ['heautou',  'ἑαυτοῦ',  'ἑαυτοῦ',  'G1438', 'a si mesmo',    '["próprio","reflexivo"]',  320, 1, 9, 1],

  // M10: Revisão — João 1:1
  ['arche',    'ἀρχή',    'ἀρχή',    'G746',  'princípio',     '["começo","governo"]',       55, 1, 10, 1],
  ['en_arch',  'ἦν',      'εἰμί',    'G1510', 'era/estava',    '["existia"]',               484, 1, 10, 1],
  ['logos_jn1','λόγος',   'λόγος',   'G3056', 'Verbo/Palavra',  '["Palavra divina"]',       330, 1, 10, 1],
  ['theos_jn1','θεός',    'θεός',    'G2316', 'Deus',           '["Deus"]',                 1317, 1, 10, 1],
  ['pros_jn1', 'πρός',    'πρός',    'G4314', 'com/para',       '["junto a","em direção a"]',700, 1, 10, 1],

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — Verbos Presente + Ser
  // ═══════════════════════════════════════════════════════════════

  // M01: εἰμί Singular
  ['eimi_sg',  'εἰμί',    'εἰμί',    'G1510', 'eu sou',        '["ser","estar","existir"]',2460, 2, 1, 1],
  ['ei',       'εἶ',      'εἰμί',    'G1488', 'tu és',         '["segunda singular"]',      485, 2, 1, 1],
  ['estin',    'ἐστίν',   'εἰμί',    'G2076', 'ele/ela é',     '["terceira singular"]',     484, 2, 1, 1],
  ['sy',       'σύ',      'σύ',      'G4771', 'tu/você',        '["segunda pessoa"]',       150, 2, 1, 1],

  // M02: εἰμί Plural
  ['esmen',    'ἐσμέν',   'εἰμί',    'G2070', 'nós somos',     '["primeira plural"]',       185, 2, 2, 1],
  ['este',     'ἐστέ',    'εἰμί',    'G2075', 'vós sois',      '["segunda plural"]',        190, 2, 2, 1],
  ['eisin',    'εἰσίν',   'εἰμί',    'G1526', 'eles/elas são',  '["terceira plural"]',      190, 2, 2, 1],
  ['hemeis',   'ἡμεῖς',   'ἡμεῖς',   'G2249', 'nós',           '["primeira plural pronome"]', 86, 2, 2, 1],

  // M03: Pronomes Pessoais
  ['autos',    'αὐτός',   'αὐτός',   'G846',  'ele/mesmo',     '["si mesmo","o mesmo"]',   5600, 2, 3, 1],
  ['hymeis',   'ὑμεῖς',   'ὑμεῖς',   'G5210', 'vós',           '["vós outros"]',            230, 2, 3, 1],
  ['autou',    'αὐτοῦ',   'αὐτός',   'G846',  'dele',          '["de si","próprio"]',      5600, 2, 3, 1],
  ['emou',     'ἐμοῦ',    'ἐγώ',     'G1700', 'de mim',        '["de eu"]',                  50, 2, 3, 1],

  // M04: Artigo Definido (Nominativo)
  ['ho',       'ὁ',       'ὁ',       'G3588', 'o (artigo)',    '["artigo masc nom sg"]',  20000, 2, 4, 1],
  ['he',       'ἡ',       'ὁ',       'G3588', 'a (artigo)',    '["artigo fem nom sg"]',   20000, 2, 4, 1],
  ['to',       'τό',      'ὁ',       'G3588', 'o/a (neutro)',  '["artigo neutro nom sg"]',20000, 2, 4, 1],
  ['hoi',      'οἱ',      'ὁ',       'G3588', 'os (artigo)',   '["artigo masc nom pl"]',  20000, 2, 4, 1],
  ['hai',      'αἱ',      'ὁ',       'G3588', 'as (artigo)',   '["artigo fem nom pl"]',   20000, 2, 4, 1],
  ['ta',       'τά',      'ὁ',       'G3588', 'os/as (neutro)','["artigo neutro nom pl"]',20000, 2, 4, 1],

  // M05: Substantivos Nominativo — 2ª Declinação
  ['logos_2',  'λόγος',   'λόγος',   'G3056', 'palavra',       '["verbo","razão"]',         330, 2, 5, 1],
  ['theos_2',  'θεός',    'θεός',    'G2316', 'Deus',           '["Deus","divindade"]',    1317, 2, 5, 1],
  ['doulos_2', 'δοῦλος',  'δοῦλος',  'G1401', 'servo',          '["escravo","servo"]',      127, 2, 5, 1],
  ['ergon',    'ἔργον',   'ἔργον',   'G2041', 'obra',          '["trabalho","ação"]',      176, 2, 5, 1],
  ['teknon_2', 'τέκνον',  'τέκνον',  'G5043', 'filho',         '["criança","descendente"]',  99, 2, 5, 1],

  // M06: Predicado Nominal
  ['agape_2',  'ἀγάπη',   'ἀγάπη',   'G26',   'amor',          '["amor divino","caridade"]',320, 2, 6, 1],
  ['charis_2', 'χάρις',   'χάρις',   'G5485', 'graça',         '["favor imerecido"]',      155, 2, 6, 1],
  ['eirene',   'εἰρήνη',  'εἰρήνη',  'G1515', 'paz',           '["paz","harmonia"]',        92, 2, 6, 1],
  ['aletheia', 'ἀλήθεια', 'ἀλήθεια', 'G225',  'verdade',       '["realidade","sinceridade"]',109, 2, 6, 1],
  ['pistis_2', 'πίστις',  'πίστις',  'G4102', 'fé',            '["fidelidade","confiança"]',244, 2, 6, 1],

  // M07: Verbos: λέγω, ἔχω, πιστεύω
  ['lego',     'λέγω',    'λέγω',    'G3004', 'digo/falo',     '["falar","declarar"]',     2354, 2, 7, 1],
  ['echo',     'ἔχω',     'ἔχω',     'G2192', 'tenho',         '["possuir","segurar"]',    708, 2, 7, 1],
  ['pisteuo',  'πιστεύω', 'πιστεύω', 'G4100', 'creio',         '["confiar","ter fé"]',     241, 2, 7, 1],
  ['horo',     'ὁράω',    'ὁράω',    'G3708', 'vejo',          '["ver","perceber"]',       454, 2, 7, 1],
  ['ginosko_2','γινώσκω', 'γινώσκω', 'G1097', 'conheço',       '["saber","reconhecer"]',   222, 2, 7, 1],
  ['akouo',    'ἀκούω',   'ἀκούω',   'G191',  'ouço',          '["escutar","entender"]',   428, 2, 7, 1],

  // M08: Revisão — 1 João 4:8
  ['theos_agape','θεός',  'θεός',    'G2316', 'Deus',           '["Deus","o Altíssimo"]',   1317, 2, 8, 1],
  ['ho_theos', 'ὁ',       'ὁ',       'G3588', 'o (artigo)',    '["artigo"]',             20000, 2, 8, 1],
  ['estin_agape','ἐστίν', 'εἰμί',   'G2076', 'é',             '["terceira singular"]',     484, 2, 8, 1],
];

export const seedCoreVocabulary = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM vocabulary');
  if ((existing.values?.[0]?.count ?? 0) > 0) {
    console.log('[Seed] Vocabulary already seeded, skipping');
    return;
  }

  for (const w of VOCAB) {
    await db.run(
      `INSERT OR IGNORE INTO vocabulary
       (id, token, lemma, strongs_id, gloss_pt, gloss_alt, frequency, cycle_intro, module_intro, is_core)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      w,
    );
  }

  console.log(`[Seed] ${VOCAB.length} vocabulary words seeded`);
};
