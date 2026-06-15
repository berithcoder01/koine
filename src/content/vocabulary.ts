// src/content/vocabulary.ts
export interface VocabEntry {
  id: string;
  token: string;
  lemma: string;
  strongsId: string;
  glossPt: string;
  glossAlt: string[];
  frequency: number;
  cycleIntro: number;
  moduleIntro: number;
  isCore: number;
}

export const VOCABULARY: VocabEntry[] = [
  // ═══════════════════════════════════════════════════════════════
  // CICLO I — Alfabeto e Fonética
  // ═══════════════════════════════════════════════════════════════

  // M01: Vogais Α, Ε, Ι
  { id: 'agathos',  token: 'ἀγαθός',  lemma: 'ἀγαθός',  strongsId: 'G18',   glossPt: 'bom',           glossAlt: ['bondoso','útil'],                  frequency: 102,  cycleIntro: 1, moduleIntro: 1, isCore: 1 },
  { id: 'ego',      token: 'ἐγώ',     lemma: 'ἐγώ',     strongsId: 'G1473', glossPt: 'eu',            glossAlt: [],                                  frequency: 256,  cycleIntro: 1, moduleIntro: 1, isCore: 1 },
  { id: 'idou',     token: 'ἰδοὺ',    lemma: 'ἰδοὺ',    strongsId: 'G2400', glossPt: 'eis',           glossAlt: ['vede','aqui está'],                frequency: 200,  cycleIntro: 1, moduleIntro: 1, isCore: 1 },
  { id: 'agape',    token: 'ἀγάπη',   lemma: 'ἀγάπη',   strongsId: 'G26',   glossPt: 'amor',          glossAlt: ['caridade'],                        frequency: 320,  cycleIntro: 1, moduleIntro: 1, isCore: 1 },
  { id: 'eimi',     token: 'εἰμί',    lemma: 'εἰμί',    strongsId: 'G1510', glossPt: 'sou/estar',     glossAlt: ['ser'],                              frequency: 2460, cycleIntro: 1, moduleIntro: 1, isCore: 1 },
  { id: 'adelphos', token: 'ἀδελφός', lemma: 'ἀδελφός', strongsId: 'G80',   glossPt: 'irmão',         glossAlt: ['irmão'],                            frequency: 344,  cycleIntro: 1, moduleIntro: 1, isCore: 1 },

  // M02: Vogais Ο, Υ, Ω
  { id: 'hodos',    token: 'ὁδός',    lemma: 'ὁδός',    strongsId: 'G3598', glossPt: 'caminho',       glossAlt: ['estrada','via'],                    frequency: 101,  cycleIntro: 1, moduleIntro: 2, isCore: 1 },
  { id: 'huios',    token: 'υἱός',    lemma: 'υἱός',    strongsId: 'G5207', glossPt: 'filho',         glossAlt: ['descendente'],                      frequency: 377,  cycleIntro: 1, moduleIntro: 2, isCore: 1 },
  { id: 'hora',     token: 'ὥρα',     lemma: 'ὥρα',     strongsId: 'G5610', glossPt: 'hora',          glossAlt: ['tempo','momento'],                  frequency: 106,  cycleIntro: 1, moduleIntro: 2, isCore: 1 },
  { id: 'logos',    token: 'λόγος',   lemma: 'λόγος',   strongsId: 'G3056', glossPt: 'palavra',       glossAlt: ['verbo','razão'],                    frequency: 330,  cycleIntro: 1, moduleIntro: 2, isCore: 1 },
  { id: 'kyrios',   token: 'κύριος',  lemma: 'κύριος',  strongsId: 'G2962', glossPt: 'Senhor',        glossAlt: ['senhor','mestre'],                  frequency: 717,  cycleIntro: 1, moduleIntro: 2, isCore: 1 },
  { id: 'doulos',   token: 'δοῦλος',  lemma: 'δοῦλος',  strongsId: 'G1401', glossPt: 'servo',         glossAlt: ['escravo'],                          frequency: 127,  cycleIntro: 1, moduleIntro: 2, isCore: 1 },

  // M03: Consoantes Η, Ν, Τ
  { id: 'hemera',   token: 'ἡμέρα',   lemma: 'ἡμέρα',   strongsId: 'G2250', glossPt: 'dia',           glossAlt: ['tempo','luz do dia'],               frequency: 389,  cycleIntro: 1, moduleIntro: 3, isCore: 1 },
  { id: 'nomos',    token: 'νόμος',   lemma: 'νόμος',   strongsId: 'G3551', glossPt: 'lei',           glossAlt: ['torá','ensinamento'],               frequency: 194,  cycleIntro: 1, moduleIntro: 3, isCore: 1 },
  { id: 'teknon',   token: 'τέκνον',  lemma: 'τέκνον',  strongsId: 'G5043', glossPt: 'filho/criança', glossAlt: ['filhinho','infante'],                frequency: 99,   cycleIntro: 1, moduleIntro: 3, isCore: 1 },
  { id: 'pistis',   token: 'πίστις',  lemma: 'πίστις',  strongsId: 'G4102', glossPt: 'fé',            glossAlt: ['crença','fidelidade'],              frequency: 244,  cycleIntro: 1, moduleIntro: 3, isCore: 1 },
  { id: 'en',       token: 'ἦν',      lemma: 'εἰμί',    strongsId: 'G1510', glossPt: 'era',           glossAlt: ['estava'],                           frequency: 484,  cycleIntro: 1, moduleIntro: 3, isCore: 1 },
  { id: 'pneuma',   token: 'πνεῦμα',  lemma: 'πνεῦμα',  strongsId: 'G4151', glossPt: 'Espírito',      glossAlt: ['sopro','vento','espírito'],         frequency: 379,  cycleIntro: 1, moduleIntro: 3, isCore: 1 },

  // M04: Consoantes Σ, Κ, Λ
  { id: 'sarx',     token: 'σάρξ',    lemma: 'σάρξ',    strongsId: 'G4561', glossPt: 'carne',         glossAlt: ['corpo','natureza humana'],          frequency: 147,  cycleIntro: 1, moduleIntro: 4, isCore: 1 },
  { id: 'kosmos',   token: 'κόσμος',  lemma: 'κόσμος',  strongsId: 'G2889', glossPt: 'mundo',         glossAlt: ['ordem','universo'],                 frequency: 186,  cycleIntro: 1, moduleIntro: 4, isCore: 1 },
  { id: 'laos',     token: 'λαός',    lemma: 'λαός',    strongsId: 'G2992', glossPt: 'povo',          glossAlt: ['nação','multidão'],                 frequency: 142,  cycleIntro: 1, moduleIntro: 4, isCore: 1 },
  { id: 'soteria',  token: 'σωτηρία', lemma: 'σωτηρία', strongsId: 'G4991', glossPt: 'salvação',      glossAlt: ['libertação'],                       frequency: 46,   cycleIntro: 1, moduleIntro: 4, isCore: 1 },
  { id: 'kardia',   token: 'καρδία',  lemma: 'καρδία',  strongsId: 'G2588', glossPt: 'coração',       glossAlt: ['mente','íntimo'],                   frequency: 159,  cycleIntro: 1, moduleIntro: 4, isCore: 1 },

  // M05: Consoantes Π, Ρ, Μ
  { id: 'pater',    token: 'πατήρ',   lemma: 'πατήρ',   strongsId: 'G3962', glossPt: 'pai',           glossAlt: ['ancestral'],                        frequency: 413,  cycleIntro: 1, moduleIntro: 5, isCore: 1 },
  { id: 'rhema',    token: 'ῥῆμα',    lemma: 'ῥῆμα',    strongsId: 'G4487', glossPt: 'palavra dita',  glossAlt: ['fala','declaração'],                frequency: 68,   cycleIntro: 1, moduleIntro: 5, isCore: 1 },
  { id: 'meter',    token: 'μήτηρ',   lemma: 'μήτηρ',   strongsId: 'G3384', glossPt: 'mãe',           glossAlt: ['mãe','matriarca'],                  frequency: 83,   cycleIntro: 1, moduleIntro: 5, isCore: 1 },
  { id: 'martys',   token: 'μάρτυς',  lemma: 'μάρτυς',  strongsId: 'G3144', glossPt: 'testemunha',    glossAlt: ['mártir'],                           frequency: 34,   cycleIntro: 1, moduleIntro: 5, isCore: 1 },
  { id: 'pros',     token: 'πρός',    lemma: 'πρός',    strongsId: 'G4314', glossPt: 'para/com',      glossAlt: ['em direção a'],                     frequency: 700,  cycleIntro: 1, moduleIntro: 5, isCore: 1 },

  // M06: Oclusivas Β, Δ, Γ
  { id: 'bios',     token: 'βίος',    lemma: 'βίος',    strongsId: 'G979',  glossPt: 'vida',          glossAlt: ['modo de vida','existência'],        frequency: 10,   cycleIntro: 1, moduleIntro: 6, isCore: 1 },
  { id: 'doxa',     token: 'δόξα',    lemma: 'δόξα',    strongsId: 'G1391', glossPt: 'glória',        glossAlt: ['honra','esplendor'],               frequency: 168,  cycleIntro: 1, moduleIntro: 6, isCore: 1 },
  { id: 'ge',       token: 'γῆ',      lemma: 'γῆ',      strongsId: 'G1093', glossPt: 'terra',         glossAlt: ['solo','mundo','país'],              frequency: 250,  cycleIntro: 1, moduleIntro: 6, isCore: 1 },
  { id: 'biblion',  token: 'βιβλίον', lemma: 'βιβλίον', strongsId: 'G975',  glossPt: 'livro',         glossAlt: ['rolo','escritura'],                 frequency: 34,   cycleIntro: 1, moduleIntro: 6, isCore: 1 },
  { id: 'dynamis',  token: 'δύναμις', lemma: 'δύναμις', strongsId: 'G1411', glossPt: 'poder',         glossAlt: ['força','milagre'],                  frequency: 119,  cycleIntro: 1, moduleIntro: 6, isCore: 1 },
  { id: 'ginosko',  token: 'γινώσκω', lemma: 'γινώσκω', strongsId: 'G1097', glossPt: 'conhecer',      glossAlt: ['saber','reconhecer'],               frequency: 222,  cycleIntro: 1, moduleIntro: 6, isCore: 1 },

  // M07: Aspiradas Φ, Χ, Θ
  { id: 'phos',     token: 'φῶς',     lemma: 'φῶς',     strongsId: 'G5457', glossPt: 'luz',           glossAlt: ['claridade','iluminação'],           frequency: 73,   cycleIntro: 1, moduleIntro: 7, isCore: 1 },
  { id: 'charis',   token: 'χάρις',   lemma: 'χάρις',   strongsId: 'G5485', glossPt: 'graça',         glossAlt: ['favor','bondade'],                  frequency: 155,  cycleIntro: 1, moduleIntro: 7, isCore: 1 },
  { id: 'theos',    token: 'θεός',    lemma: 'θεός',    strongsId: 'G2316', glossPt: 'Deus',          glossAlt: ['divindade'],                        frequency: 1317, cycleIntro: 1, moduleIntro: 7, isCore: 1 },
  { id: 'phero',    token: 'φέρω',    lemma: 'φέρω',    strongsId: 'G5342', glossPt: 'carregar',      glossAlt: ['trazer','levar'],                   frequency: 68,   cycleIntro: 1, moduleIntro: 7, isCore: 1 },
  { id: 'cheir',    token: 'χείρ',    lemma: 'χείρ',    strongsId: 'G5495', glossPt: 'mão',           glossAlt: ['poder','obra'],                     frequency: 177,  cycleIntro: 1, moduleIntro: 7, isCore: 1 },
  { id: 'thysis',   token: 'θυσία',   lemma: 'θυσία',   strongsId: 'G2378', glossPt: 'sacrifício',    glossAlt: ['oferta','holocausto'],              frequency: 28,   cycleIntro: 1, moduleIntro: 7, isCore: 1 },

  // M08: Raras Ζ, Ξ, Ψ
  { id: 'zoe',      token: 'ζωή',     lemma: 'ζωή',     strongsId: 'G2222', glossPt: 'vida',          glossAlt: ['vida eterna'],                      frequency: 135,  cycleIntro: 1, moduleIntro: 8, isCore: 1 },
  { id: 'xenos',    token: 'ξένος',   lemma: 'ξένος',   strongsId: 'G3581', glossPt: 'estrangeiro',   glossAlt: ['hóspede','forasteiro'],             frequency: 14,   cycleIntro: 1, moduleIntro: 8, isCore: 1 },
  { id: 'psyche',   token: 'ψυχή',    lemma: 'ψυχή',    strongsId: 'G5590', glossPt: 'alma',          glossAlt: ['vida','pessoa','mente'],            frequency: 103,  cycleIntro: 1, moduleIntro: 8, isCore: 1 },
  { id: 'zelos',    token: 'ζῆλος',   lemma: 'ζῆλος',   strongsId: 'G2205', glossPt: 'zelo',          glossAlt: ['ciúmes','ardor'],                   frequency: 16,   cycleIntro: 1, moduleIntro: 8, isCore: 1 },
  { id: 'pseudos',  token: 'ψεῦδος',  lemma: 'ψεῦδος',  strongsId: 'G5579', glossPt: 'mentira',       glossAlt: ['falsidade','engano'],               frequency: 10,   cycleIntro: 1, moduleIntro: 8, isCore: 1 },

  // M09: Diacríticos e Vogais Longas
  { id: 'ouranos',  token: 'οὐρανός', lemma: 'οὐρανός', strongsId: 'G3772', glossPt: 'céu',           glossAlt: ['firmamento','paraíso'],             frequency: 273,  cycleIntro: 1, moduleIntro: 9, isCore: 1 },
  { id: 'aion',     token: 'αἰών',    lemma: 'αἰών',    strongsId: 'G165',  glossPt: 'eternidade',    glossAlt: ['era','século'],                     frequency: 122,  cycleIntro: 1, moduleIntro: 9, isCore: 1 },
  { id: 'oikos',    token: 'οἶκος',   lemma: 'οἶκος',   strongsId: 'G3624', glossPt: 'casa',          glossAlt: ['família','lar'],                    frequency: 114,  cycleIntro: 1, moduleIntro: 9, isCore: 1 },
  { id: 'heautou',  token: 'ἑαυτοῦ',  lemma: 'ἑαυτοῦ',  strongsId: 'G1438', glossPt: 'a si mesmo',    glossAlt: ['próprio','reflexivo'],              frequency: 320,  cycleIntro: 1, moduleIntro: 9, isCore: 1 },

  // M10: Revisão — João 1:1
  { id: 'arche',    token: 'ἀρχή',    lemma: 'ἀρχή',    strongsId: 'G746',  glossPt: 'princípio',     glossAlt: ['começo','governo'],                 frequency: 55,   cycleIntro: 1, moduleIntro: 10, isCore: 1 },
  { id: 'en_arch',  token: 'ἦν',      lemma: 'εἰμί',    strongsId: 'G1510', glossPt: 'era/estava',    glossAlt: ['existia'],                          frequency: 484,  cycleIntro: 1, moduleIntro: 10, isCore: 1 },
  { id: 'logos_jn1',token: 'λόγος',   lemma: 'λόγος',   strongsId: 'G3056', glossPt: 'Verbo/Palavra', glossAlt: ['Palavra divina'],                   frequency: 330,  cycleIntro: 1, moduleIntro: 10, isCore: 1 },
  { id: 'theos_jn1',token: 'θεός',    lemma: 'θεός',    strongsId: 'G2316', glossPt: 'Deus',          glossAlt: ['Deus'],                             frequency: 1317, cycleIntro: 1, moduleIntro: 10, isCore: 1 },
  { id: 'pros_jn1', token: 'πρός',    lemma: 'πρός',    strongsId: 'G4314', glossPt: 'com/para',      glossAlt: ['junto a','em direção a'],           frequency: 700,  cycleIntro: 1, moduleIntro: 10, isCore: 1 },

  // ═══════════════════════════════════════════════════════════════
  // CICLO II — Verbos Presente + Ser
  // ═══════════════════════════════════════════════════════════════

  // M01: εἰμί Singular
  { id: 'eimi_sg',  token: 'εἰμί',    lemma: 'εἰμί',    strongsId: 'G1510', glossPt: 'eu sou',        glossAlt: ['ser','estar','existir'],            frequency: 2460, cycleIntro: 2, moduleIntro: 1, isCore: 1 },
  { id: 'ei',       token: 'εἶ',      lemma: 'εἰμί',    strongsId: 'G1488', glossPt: 'tu és',         glossAlt: ['segunda singular'],                 frequency: 485,  cycleIntro: 2, moduleIntro: 1, isCore: 1 },
  { id: 'estin',    token: 'ἐστίν',   lemma: 'εἰμί',    strongsId: 'G2076', glossPt: 'ele/ela é',     glossAlt: ['terceira singular'],                frequency: 484,  cycleIntro: 2, moduleIntro: 1, isCore: 1 },
  { id: 'sy',       token: 'σύ',      lemma: 'σύ',      strongsId: 'G4771', glossPt: 'tu/você',       glossAlt: ['segunda pessoa'],                   frequency: 150,  cycleIntro: 2, moduleIntro: 1, isCore: 1 },

  // M02: εἰμί Plural
  { id: 'esmen',    token: 'ἐσμέν',   lemma: 'εἰμί',    strongsId: 'G2070', glossPt: 'nós somos',     glossAlt: ['primeira plural'],                  frequency: 185,  cycleIntro: 2, moduleIntro: 2, isCore: 1 },
  { id: 'este',     token: 'ἐστέ',    lemma: 'εἰμί',    strongsId: 'G2075', glossPt: 'vós sois',      glossAlt: ['segunda plural'],                   frequency: 190,  cycleIntro: 2, moduleIntro: 2, isCore: 1 },
  { id: 'eisin',    token: 'ἐσίν',   lemma: 'εἰμί',    strongsId: 'G1526', glossPt: 'eles/elas são', glossAlt: ['terceira plural'],                  frequency: 190,  cycleIntro: 2, moduleIntro: 2, isCore: 1 },
  { id: 'hemeis',   token: 'ἡμεῖς',   lemma: 'ἡμεῖς',   strongsId: 'G2249', glossPt: 'nós',           glossAlt: ['primeira plural pronome'],          frequency: 86,   cycleIntro: 2, moduleIntro: 2, isCore: 1 },

  // M03: Pronomes Pessoais
  { id: 'autos',    token: 'αὐτός',   lemma: 'αὐτός',   strongsId: 'G846',  glossPt: 'ele/mesmo',     glossAlt: ['si mesmo','o mesmo'],               frequency: 5600, cycleIntro: 2, moduleIntro: 3, isCore: 1 },
  { id: 'hymeis',   token: 'ὑμεῖς',   lemma: 'ὑμεῖς',   strongsId: 'G5210', glossPt: 'vós',           glossAlt: ['vós outros'],                       frequency: 230,  cycleIntro: 2, moduleIntro: 3, isCore: 1 },
  { id: 'autou',    token: 'αὐτοῦ',   lemma: 'αὐτός',   strongsId: 'G846',  glossPt: 'dele',          glossAlt: ['de si','próprio'],                  frequency: 5600, cycleIntro: 2, moduleIntro: 3, isCore: 1 },
  { id: 'emou',     token: 'ἐμοῦ',    lemma: 'ἐγώ',     strongsId: 'G1700', glossPt: 'de mim',        glossAlt: ['de eu'],                            frequency: 50,   cycleIntro: 2, moduleIntro: 3, isCore: 1 },

  // M04: Artigo Definido (Nominativo)
  { id: 'ho',       token: 'ὁ',       lemma: 'ὁ',       strongsId: 'G3588', glossPt: 'o (artigo)',    glossAlt: ['artigo masc nom sg'],               frequency: 20000, cycleIntro: 2, moduleIntro: 4, isCore: 1 },
  { id: 'he',       token: 'ἡ',       lemma: 'ὁ',       strongsId: 'G3588', glossPt: 'a (artigo)',    glossAlt: ['artigo fem nom sg'],                frequency: 20000, cycleIntro: 2, moduleIntro: 4, isCore: 1 },
  { id: 'to',       token: 'τό',      lemma: 'ὁ',       strongsId: 'G3588', glossPt: 'o/a (neutro)',  glossAlt: ['artigo neutro nom sg'],             frequency: 20000, cycleIntro: 2, moduleIntro: 4, isCore: 1 },
  { id: 'hoi',      token: 'οἱ',      lemma: 'ὁ',       strongsId: 'G3588', glossPt: 'os (artigo)',   glossAlt: ['artigo masc nom pl'],               frequency: 20000, cycleIntro: 2, moduleIntro: 4, isCore: 1 },
  { id: 'hai',      token: 'αἱ',      lemma: 'ὁ',       strongsId: 'G3588', glossPt: 'as (artigo)',   glossAlt: ['artigo fem nom pl'],                frequency: 20000, cycleIntro: 2, moduleIntro: 4, isCore: 1 },
  { id: 'ta',       token: 'τά',      lemma: 'ὁ',       strongsId: 'G3588', glossPt: 'os/as (neutro)',glossAlt: ['artigo neutro nom pl'],             frequency: 20000, cycleIntro: 2, moduleIntro: 4, isCore: 1 },

  // M05: Substantivos Nominativo — 2ª Declinação
  { id: 'logos_2',  token: 'λόγος',   lemma: 'λόγος',   strongsId: 'G3056', glossPt: 'palavra',       glossAlt: ['verbo','razão'],                    frequency: 330,  cycleIntro: 2, moduleIntro: 5, isCore: 1 },
  { id: 'theos_2',  token: 'θεός',    lemma: 'θεός',    strongsId: 'G2316', glossPt: 'Deus',          glossAlt: ['Deus','divindade'],                 frequency: 1317, cycleIntro: 2, moduleIntro: 5, isCore: 1 },
  { id: 'doulos_2', token: 'δοῦλος',  lemma: 'δοῦλος',  strongsId: 'G1401', glossPt: 'servo',         glossAlt: ['escravo','servo'],                  frequency: 127,  cycleIntro: 2, moduleIntro: 5, isCore: 1 },
  { id: 'ergon',    token: 'ἔργον',   lemma: 'ἔργον',   strongsId: 'G2041', glossPt: 'obra',          glossAlt: ['trabalho','ação'],                  frequency: 176,  cycleIntro: 2, moduleIntro: 5, isCore: 1 },
  { id: 'teknon_2', token: 'τέκνον',  lemma: 'τέκνον',  strongsId: 'G5043', glossPt: 'filho',         glossAlt: ['criança','descendente'],            frequency: 99,   cycleIntro: 2, moduleIntro: 5, isCore: 1 },

  // M06: Predicado Nominal
  { id: 'agape_2',  token: 'ἀγάπη',   lemma: 'ἀγάπη',   strongsId: 'G26',   glossPt: 'amor',          glossAlt: ['amor divino','caridade'],           frequency: 320,  cycleIntro: 2, moduleIntro: 6, isCore: 1 },
  { id: 'charis_2', token: 'χάρις',   lemma: 'χάρις',   strongsId: 'G5485', glossPt: 'graça',         glossAlt: ['favor imerecido'],                  frequency: 155,  cycleIntro: 2, moduleIntro: 6, isCore: 1 },
  { id: 'eirene',   token: 'εἰρήνη',  lemma: 'εἰρήνη',  strongsId: 'G1515', glossPt: 'paz',           glossAlt: ['paz','harmonia'],                   frequency: 92,   cycleIntro: 2, moduleIntro: 6, isCore: 1 },
  { id: 'aletheia', token: 'ἀλήθεια', lemma: 'ἀλήθεια', strongsId: 'G225',  glossPt: 'verdade',       glossAlt: ['realidade','sinceridade'],          frequency: 109,  cycleIntro: 2, moduleIntro: 6, isCore: 1 },
  { id: 'pistis_2', token: 'πίστις',  lemma: 'πίστις',  strongsId: 'G4102', glossPt: 'fé',            glossAlt: ['fidelidade','confiança'],           frequency: 244,  cycleIntro: 2, moduleIntro: 6, isCore: 1 },

  // M07: Verbos: λέγω, ἔχω, πιστεύω
  { id: 'lego',     token: 'λέγω',    lemma: 'λέγω',    strongsId: 'G3004', glossPt: 'digo/falo',     glossAlt: ['falar','declarar'],                 frequency: 2354, cycleIntro: 2, moduleIntro: 7, isCore: 1 },
  { id: 'echo',     token: 'ἔχω',     lemma: 'ἔχω',     strongsId: 'G2192', glossPt: 'tenho',         glossAlt: ['possuir','segurar'],                frequency: 708,  cycleIntro: 2, moduleIntro: 7, isCore: 1 },
  { id: 'pisteuo',  token: 'πιστεύω', lemma: 'πιστεύω', strongsId: 'G4100', glossPt: 'creio',         glossAlt: ['confiar','ter fé'],                 frequency: 241,  cycleIntro: 2, moduleIntro: 7, isCore: 1 },
  { id: 'horo',     token: 'ὁράω',    lemma: 'ὁράω',    strongsId: 'G3708', glossPt: 'vejo',          glossAlt: ['ver','perceber'],                   frequency: 454,  cycleIntro: 2, moduleIntro: 7, isCore: 1 },
  { id: 'ginosko_2',token: 'γινώσκω', lemma: 'γινώσκω', strongsId: 'G1097', glossPt: 'conheço',       glossAlt: ['saber','reconhecer'],               frequency: 222,  cycleIntro: 2, moduleIntro: 7, isCore: 1 },
  { id: 'akouo',    token: 'ἀκούω',   lemma: 'ἀκούω',   strongsId: 'G191',  glossPt: 'ouço',          glossAlt: ['escutar','entender'],               frequency: 428,  cycleIntro: 2, moduleIntro: 7, isCore: 1 },

  // M08: Revisão — 1 João 4:8
  { id: 'theos_agape',token: 'θεός',  lemma: 'θεός',    strongsId: 'G2316', glossPt: 'Deus',          glossAlt: ['Deus','o Altíssimo'],               frequency: 1317, cycleIntro: 2, moduleIntro: 8, isCore: 1 },
  { id: 'ho_theos', token: 'ὁ',       lemma: 'ὁ',       strongsId: 'G3588', glossPt: 'o (artigo)',    glossAlt: ['artigo'],                           frequency: 20000, cycleIntro: 2, moduleIntro: 8, isCore: 1 },
  { id: 'estin_agape',token: 'ἐστίν', lemma: 'εἰμί',    strongsId: 'G2076', glossPt: 'é',             glossAlt: ['terceira singular'],                frequency: 484,  cycleIntro: 2, moduleIntro: 8, isCore: 1 },
];
