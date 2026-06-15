// src/content/nt/verses.ts
export interface NTToken {
  bookAbbr: string;
  bookName: string;
  ch: number;
  v: number;
  p: number;
  token: string;
  lemma: string;
  sid: string;
  pars: string;
  gloss: string;
}

export const NT_TOKENS: NTToken[] = [
  // ═══════════════════════════════════════════════════════════════
  // JOÃO 1:1-18 (Prológo) — referência principal Ciclo I + II
  // ═══════════════════════════════════════════════════════════════
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:1,token:'Ἐν',lemma:'ἐν',sid:'G1722',pars:'PREP',gloss:'em'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:2,token:'ἀρχῇ',lemma:'ἀρχή',sid:'G746',pars:'N-DSF',gloss:'princípio'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:3,token:'ἦν',lemma:'εἰμί',sid:'G1510',pars:'V-IAI-3S',gloss:'era'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:4,token:'ὁ',lemma:'ὁ',sid:'G3588',pars:'T-NSM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:5,token:'λόγος,',lemma:'λόγος',sid:'G3056',pars:'N-NSM',gloss:'Verbo'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:6,token:'καὶ',lemma:'καί',sid:'G2532',pars:'CONJ',gloss:'e'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:7,token:'ὁ',lemma:'ὁ',sid:'G3588',pars:'T-NSM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:8,token:'λόγος',lemma:'λόγος',sid:'G3056',pars:'N-NSM',gloss:'Verbo'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:9,token:'ἦν',lemma:'εἰμί',sid:'G1510',pars:'V-IAI-3S',gloss:'era'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:10,token:'πρὸς',lemma:'πρός',sid:'G4314',pars:'PREP',gloss:'com'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:11,token:'τὸν',lemma:'ὁ',sid:'G3588',pars:'T-ASM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:12,token:'θεόν,',lemma:'θεός',sid:'G2316',pars:'N-ASM',gloss:'Deus'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:13,token:'καὶ',lemma:'καί',sid:'G2532',pars:'CONJ',gloss:'e'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:14,token:'θεὸς',lemma:'θεός',sid:'G2316',pars:'N-NSM',gloss:'Deus'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:15,token:'ἦν',lemma:'εἰμί',sid:'G1510',pars:'V-IAI-3S',gloss:'era'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:16,token:'ὁ',lemma:'ὁ',sid:'G3588',pars:'T-NSM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:1,p:17,token:'λόγος.',lemma:'λόγος',sid:'G3056',pars:'N-NSM',gloss:'Verbo'},

  {bookAbbr:'JN',bookName:'João',ch:1,v:2,p:1,token:'Οὗτος',lemma:'οὗτος',sid:'G3778',pars:'D-NSM',gloss:'Este'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:2,p:2,token:'ἦν',lemma:'εἰμί',sid:'G1510',pars:'V-IAI-3S',gloss:'era'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:2,p:3,token:'ἐν',lemma:'ἐν',sid:'G1722',pars:'PREP',gloss:'em'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:2,p:4,token:'ἀρχῇ',lemma:'ἀρχή',sid:'G746',pars:'N-DSF',gloss:'princípio'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:2,p:5,token:'πρὸς',lemma:'πρός',sid:'G4314',pars:'PREP',gloss:'com'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:2,p:6,token:'τὸν',lemma:'ὁ',sid:'G3588',pars:'T-ASM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:2,p:7,token:'θεόν.',lemma:'θεός',sid:'G2316',pars:'N-ASM',gloss:'Deus'},

  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:1,token:'πάντα',lemma:'πᾶς',sid:'G3956',pars:'A-NPN',gloss:'todas'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:2,token:'δι’',lemma:'διά',sid:'G1223',pars:'PREP',gloss:'por'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:3,token:'αὐτοῦ',lemma:'αὐτός',sid:'G846',pars:'P-GSM',gloss:'dele'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:4,token:'ἐγένετο,',lemma:'γίνομαι',sid:'G1096',pars:'V-ADI-3S',gloss:'foram feitas'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:5,token:'καὶ',lemma:'καί',sid:'G2532',pars:'CONJ',gloss:'e'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:6,token:'χωρὶς',lemma:'χωρίς',sid:'G5565',pars:'PREP',gloss:'sem'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:7,token:'αὐτοῦ',lemma:'αὐτός',sid:'G846',pars:'P-GSM',gloss:'ele'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:8,token:'ἐγένετο',lemma:'γίνομαι',sid:'G1096',pars:'V-ADI-3S',gloss:'se fez'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:9,token:'οὐδὲ',lemma:'οὐδέ',sid:'G3761',pars:'CONJ',gloss:'nem'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:3,p:10,token:'ἕν.',lemma:'εἷς',sid:'G1520',pars:'A-NSN',gloss:'uma coisa'},

  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:1,token:'ἐν',lemma:'ἐν',sid:'G1722',pars:'PREP',gloss:'nele'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:2,token:'αὐτῷ',lemma:'αὐτός',sid:'G846',pars:'P-DSM',gloss:'nele'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:3,token:'ζωὴ',lemma:'ζωή',sid:'G2222',pars:'N-NSF',gloss:'vida'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:4,token:'ἦν,',lemma:'εἰμί',sid:'G1510',pars:'V-IAI-3S',gloss:'era'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:5,token:'καὶ',lemma:'καί',sid:'G2532',pars:'CONJ',gloss:'e'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:6,token:'ἡ',lemma:'ὁ',sid:'G3588',pars:'T-NSF',gloss:'a'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:7,token:'ζωὴ',lemma:'ζωή',sid:'G2222',pars:'N-NSF',gloss:'vida'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:8,token:'ἦν',lemma:'εἰμί',sid:'G1510',pars:'V-IAI-3S',gloss:'era'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:9,token:'τὸ',lemma:'ὁ',sid:'G3588',pars:'T-NSN',gloss:'a'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:10,token:'φῶς',lemma:'φῶς',sid:'G5457',pars:'N-NSN',gloss:'luz'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:11,token:'τῶν',lemma:'ὁ',sid:'G3588',pars:'T-GNP',gloss:'dos'},
  {bookAbbr:'JN',bookName:'João',ch:1,v:4,p:12,token:'ἀνθρώπων.',lemma:'ἄνθρωπος',sid:'G444',pars:'N-GMP',gloss:'homens'},

  // João 3:16
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:1,token:'Οὕτως',lemma:'οὕτως',sid:'G3779',pars:'ADV',gloss:'De tal modo'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:2,token:'γὰρ',lemma:'γάρ',sid:'G1063',pars:'CONJ',gloss:'porque'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:3,token:'ἠγάπησεν',lemma:'ἀγαπάω',sid:'G25',pars:'V-AAI-3S',gloss:'amou'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:4,token:'ὁ',lemma:'ὁ',sid:'G3588',pars:'T-NSM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:5,token:'θεὸς',lemma:'θεός',sid:'G2316',pars:'N-NSM',gloss:'Deus'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:6,token:'τὸν',lemma:'ὁ',sid:'G3588',pars:'T-ASM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:7,token:'κόσμον,',lemma:'κόσμος',sid:'G2889',pars:'N-ASM',gloss:'mundo'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:8,token:'ὥστε',lemma:'ὥστε',sid:'G5620',pars:'CONJ',gloss:'de modo que'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:9,token:'τὸν',lemma:'ὁ',sid:'G3588',pars:'T-ASM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:10,token:'υἱὸν',lemma:'υἱός',sid:'G5207',pars:'N-ASM',gloss:'Filho'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:11,token:'τὸν',lemma:'ὁ',sid:'G3588',pars:'T-ASM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:12,token:'μονογενῆ',lemma:'μονογενής',sid:'G3439',pars:'A-ASM',gloss:'unigênito'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:13,token:'ἔδωκεν,',lemma:'δίδωμι',sid:'G1325',pars:'V-AAI-3S',gloss:'deu'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:14,token:'ἵνα',lemma:'ἵνα',sid:'G2443',pars:'CONJ',gloss:'para que'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:15,token:'πᾶς',lemma:'πᾶς',sid:'G3956',pars:'A-NSM',gloss:'todo'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:16,token:'ὁ',lemma:'ὁ',sid:'G3588',pars:'T-NSM',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:17,token:'πιστεύων',lemma:'πιστεύω',sid:'G4100',pars:'V-PAP-NSM',gloss:'crê'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:18,token:'εἰς',lemma:'εἰς',sid:'G1519',pars:'PREP',gloss:'em'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:19,token:'αὐτὸν',lemma:'αὐτός',sid:'G846',pars:'P-ASM',gloss:'nele'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:20,token:'μὴ',lemma:'μή',sid:'G3361',pars:'PTCL',gloss:'não'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:21,token:'ἀπόληται',lemma:'ἀπόλλυμι',sid:'G622',pars:'V-AMS-3S',gloss:'pereça'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:22,token:'ἀλλ’',lemma:'ἀλλά',sid:'G235',pars:'CONJ',gloss:'mas'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:23,token:'ἔχῃ',lemma:'ἔχω',sid:'G2192',pars:'V-PAS-3S',gloss:'tenha'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:24,token:'ζωὴν',lemma:'ζωή',sid:'G2222',pars:'N-ASF',gloss:'vida'},
  {bookAbbr:'JN',bookName:'João',ch:3,v:16,p:25,token:'αἰώνιον.',lemma:'αἰώνιος',sid:'G166',pars:'A-ASF',gloss:'eterna'},

  // ═══════════════════════════════════════════════════════════════
  // 1 JOÃO 4:7-9 — verso troféu Ciclo II
  // ═══════════════════════════════════════════════════════════════
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:1,token:'Ἀγαπητοί,',lemma:'ἀγαπητός',sid:'G27',pars:'A-VPM',gloss:'Amados'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:2,token:'ἀγαπῶμεν',lemma:'ἀγαπάω',sid:'G25',pars:'V-PAS-1P',gloss:'amemos'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:3,token:'ἀλλήλους,',lemma:'ἀλλήλων',sid:'G240',pars:'R-APM',gloss:'uns aos outros'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:4,token:'ὅτι',lemma:'ὅτι',sid:'G3754',pars:'CONJ',gloss:'porque'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:5,token:'ἡ',lemma:'ὁ',sid:'G3588',pars:'T-NSF',gloss:'o'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:6,token:'ἀγάπη',lemma:'ἀγάπη',sid:'G26',pars:'N-NSF',gloss:'amor'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:7,token:'ἐκ',lemma:'ἐκ',sid:'G1537',pars:'PREP',gloss:'de'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:8,token:'τοῦ',lemma:'ὁ',sid:'G3588',pars:'T-GSM',gloss:'do'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:9,token:'θεοῦ',lemma:'θεός',sid:'G2316',pars:'N-GSM',gloss:'Deus'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:7,p:10,token:'ἐστιν,',lemma:'εἰμί',sid:'G1510',pars:'V-PAI-3S',gloss:'é'},

  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:1,token:'ὁ',lemma:'ὁ',sid:'G3588',pars:'T-NSM',gloss:'o'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:2,token:'μὴ',lemma:'μή',sid:'G3361',pars:'PTCL',gloss:'não'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:3,token:'ἀγαπῶν',lemma:'ἀγαπάω',sid:'G25',pars:'V-PAP-NSM',gloss:'ama'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:4,token:'οὐκ',lemma:'οὐ',sid:'G3756',pars:'ADV',gloss:'não'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:5,token:'ἔγνω',lemma:'γινώσκω',sid:'G1097',pars:'V-AAI-3S',gloss:'conhece'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:6,token:'τὸν',lemma:'ὁ',sid:'G3588',pars:'T-ASM',gloss:'a'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:7,token:'θεόν,',lemma:'θεός',sid:'G2316',pars:'N-ASM',gloss:'Deus'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:8,token:'ὅτι',lemma:'ὅτι',sid:'G3754',pars:'CONJ',gloss:'porque'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:9,token:'ὁ',lemma:'ὁ',sid:'G3588',pars:'T-NSM',gloss:'o'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:10,token:'θεὸς',lemma:'θεός',sid:'G2316',pars:'N-NSM',gloss:'Deus'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:11,token:'ἀγάπη',lemma:'ἀγάπη',sid:'G26',pars:'N-NSF',gloss:'amor'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:8,p:12,token:'ἐστίν.',lemma:'εἰμί',sid:'G1510',pars:'V-PAI-3S',gloss:'é'},

  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:9,p:1,token:'ἐν',lemma:'ἐν',sid:'G1722',pars:'PREP',gloss:'em'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:9,p:2,token:'τούτῳ',lemma:'οὗτος',sid:'G3778',pars:'D-DSN',gloss:'nisso'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:9,p:3,token:'ἐφανερώθη',lemma:'φανερόω',sid:'G5319',pars:'V-API-3S',gloss:'se manifestou'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:9,p:4,token:'ἡ',lemma:'ὁ',sid:'G3588',pars:'T-NSF',gloss:'o'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:9,p:5,token:'ἀγάπη',lemma:'ἀγάπη',sid:'G26',pars:'N-NSF',gloss:'amor'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:9,p:6,token:'τοῦ',lemma:'ὁ',sid:'G3588',pars:'T-GSM',gloss:'do'},
  {bookAbbr:'1JN',bookName:'1 João',ch:4,v:9,p:7,token:'θεοῦ',lemma:'θεός',sid:'G2316',pars:'N-GSM',gloss:'Deus'},

  // ═══════════════════════════════════════════════════════════════
  // JOÃO 14:6 — "Eu sou o caminho" (C2 M01)
  // ═══════════════════════════════════════════════════════════════
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:1,token:'λέγει',lemma:'λέγω',sid:'G3004',pars:'V-PAI-3S',gloss:'Diz'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:2,token:'αὐτῷ',lemma:'αὐτός',sid:'G846',pars:'P-DSM',gloss:'lhe'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:3,token:'Ἰησοῦς·',lemma:'Ἰησοῦς',sid:'G2424',pars:'N-NSM',gloss:'Jesus'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:4,token:'Ἐγώ',lemma:'ἐγώ',sid:'G1473',pars:'P-NS',gloss:'Eu'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:5,token:'εἰμι',lemma:'εἰμί',sid:'G1510',pars:'V-PAI-1S',gloss:'sou'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:6,token:'ἡ',lemma:'ὁ',sid:'G3588',pars:'T-NSF',gloss:'o'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:7,token:'ὁδὸς',lemma:'ὁδός',sid:'G3598',pars:'N-NSF',gloss:'caminho'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:8,token:'καὶ',lemma:'καί',sid:'G2532',pars:'CONJ',gloss:'e'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:9,token:'ἡ',lemma:'ὁ',sid:'G3588',pars:'T-NSF',gloss:'a'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:10,token:'ἀλήθεια',lemma:'ἀλήθεια',sid:'G225',pars:'N-NSF',gloss:'verdade'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:11,token:'καὶ',lemma:'καί',sid:'G2532',pars:'CONJ',gloss:'e'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:12,token:'ἡ',lemma:'ὁ',sid:'G3588',pars:'T-NSF',gloss:'a'},
  {bookAbbr:'JN',bookName:'João',ch:14,v:6,p:13,token:'ζωή·',lemma:'ζωή',sid:'G2222',pars:'N-NSF',gloss:'vida'},

  // ═══════════════════════════════════════════════════════════════
  // MATEUS 5:3-5 (parte das Bem-aventuranças) — C1 M03
  // ═══════════════════════════════════════════════════════════════
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:3,p:1,token:'Μακάριοι',lemma:'μακάριος',sid:'G3107',pars:'A-NPM',gloss:'Bem-aventurados'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:3,p:2,token:'οἱ',lemma:'ὁ',sid:'G3588',pars:'T-NPM',gloss:'os'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:3,p:3,token:'πτωχοὶ',lemma:'πτωχός',sid:'G4434',pars:'A-NPM',gloss:'pobres'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:3,p:4,token:'τῷ',lemma:'ὁ',sid:'G3588',pars:'T-DSN',gloss:'de'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:3,p:5,token:'πνεύματι,',lemma:'πνεῦμα',sid:'G4151',pars:'N-DSN',gloss:'espírito'},

  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:4,p:1,token:'μακάριοι',lemma:'μακάριος',sid:'G3107',pars:'A-NPM',gloss:'Bem-aventurados'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:4,p:2,token:'οἱ',lemma:'ὁ',sid:'G3588',pars:'T-NPM',gloss:'os'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:4,p:3,token:'πενθοῦντες,',lemma:'πενθέω',sid:'G3996',pars:'V-PAP-NPM',gloss:'que choram'},

  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:5,p:1,token:'μακάριοι',lemma:'μακάριος',sid:'G3107',pars:'A-NPM',gloss:'Bem-aventurados'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:5,p:2,token:'οἱ',lemma:'ὁ',sid:'G3588',pars:'T-NPM',gloss:'os'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:5,p:3,token:'πραεῖς,',lemma:'πραΰς',sid:'G4239',pars:'A-NPM',gloss:'mansos'},

  // ═══════════════════════════════════════════════════════════════
  // MATEUS 5:14 — "Vós sois a luz" (C2 M02)
  // ═══════════════════════════════════════════════════════════════
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:14,p:1,token:'Ὑμεῖς',lemma:'ὑμεῖς',sid:'G5210',pars:'P-NP',gloss:'Vós'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:14,p:2,token:'ἐστε',lemma:'εἰμί',sid:'G1510',pars:'V-PAI-2P',gloss:'sois'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:14,p:3,token:'τὸ',lemma:'ὁ',sid:'G3588',pars:'T-NSN',gloss:'a'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:14,p:4,token:'φῶς',lemma:'φῶς',sid:'G5457',pars:'N-NSN',gloss:'luz'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:14,p:5,token:'τοῦ',lemma:'ὁ',sid:'G3588',pars:'T-GSM',gloss:'do'},
  {bookAbbr:'MT',bookName:'Mateus',ch:5,v:14,p:6,token:'κόσμου.',lemma:'κόσμος',sid:'G2889',pars:'N-GSM',gloss:'mundo'},

  // ═══════════════════════════════════════════════════════════════
  // ROMANOS 8:28 (C1 M02)
  // ═══════════════════════════════════════════════════════════════
  {bookAbbr:'RO',bookName:'Romanos',ch:8,v:28,p:1,token:'Οἴδαμεν',lemma:'οἶδα',sid:'G1492',pars:'V-RAI-1P',gloss:'Sabemos'},
  {bookAbbr:'RO',bookName:'Romanos',ch:8,v:28,p:2,token:'δὲ',lemma:'δέ',sid:'G1161',pars:'CONJ',gloss:'que'},
  {bookAbbr:'RO',bookName:'Romanos',ch:8,v:28,p:3,token:'ὅτι',lemma:'ὅτι',sid:'G3754',pars:'CONJ',gloss:'que'},
  {bookAbbr:'RO',bookName:'Romanos',ch:8,v:28,p:4,token:'τοῖς',lemma:'ὁ',sid:'G3588',pars:'T-DPM',gloss:'aos'},
  {bookAbbr:'RO',bookName:'Romanos',ch:8,v:28,p:5,token:'ἀγαπῶσι',lemma:'ἀγαπάω',sid:'G25',pars:'V-PAP-DPM',gloss:'que amam'},
  {bookAbbr:'RO',bookName:'Romanos',ch:8,v:28,p:6,token:'τὸν',lemma:'ὁ',sid:'G3588',pars:'T-ASM',gloss:'a'},
  {bookAbbr:'RO',bookName:'Romanos',ch:8,v:28,p:7,token:'θεὸν',lemma:'θεός',sid:'G2316',pars:'N-ASM',gloss:'Deus'},

  // ═══════════════════════════════════════════════════════════════
  // 1 CORÍNTIOS 13:1-2 (amor) — C1 M07
  // ═══════════════════════════════════════════════════════════════
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:1,token:'Ἐὰν',lemma:'ἐάν',sid:'G1437',pars:'CONJ',gloss:'Se'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:2,token:'ταῖς',lemma:'ὁ',sid:'G3588',pars:'T-DFP',gloss:'as'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:3,token:'γλώσσαις',lemma:'γλῶσσα',sid:'G1100',pars:'N-DFP',gloss:'línguas'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:4,token:'τῶν',lemma:'ὁ',sid:'G3588',pars:'T-GMP',gloss:'dos'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:5,token:'ἀνθρώπων',lemma:'ἄνθρωπος',sid:'G444',pars:'N-GMP',gloss:'homens'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:6,token:'λαλῶ',lemma:'λαλέω',sid:'G2980',pars:'V-PAS-1S',gloss:'falar'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:7,token:'ἀγάπην',lemma:'ἀγάπη',sid:'G26',pars:'N-ASF',gloss:'amor'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:8,token:'δὲ',lemma:'δέ',sid:'G1161',pars:'CONJ',gloss:'mas'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:9,token:'μὴ',lemma:'μή',sid:'G3361',pars:'ADV',gloss:'não'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:1,p:10,token:'ἔχω,',lemma:'ἔχω',sid:'G2192',pars:'V-PAS-1S',gloss:'tenha'},

  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:2,p:1,token:'νῦνὶ',lemma:'νυνί',sid:'G3570',pars:'ADV',gloss:'agora'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:2,p:2,token:'δὲ',lemma:'δέ',sid:'G1161',pars:'CONJ',gloss:'mas'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:2,p:3,token:'μένει',lemma:'μένω',sid:'G3306',pars:'V-PAI-3S',gloss:'permanece'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:2,p:4,token:'πίστις,',lemma:'πίστις',sid:'G4102',pars:'N-NSF',gloss:'fé'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:2,p:5,token:'ἐλπίς,',lemma:'ἐλπίς',sid:'G1680',pars:'N-NSF',gloss:'esperança'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:2,p:6,token:'ἀγάπη,',lemma:'ἀγάπη',sid:'G26',pars:'N-NSF',gloss:'amor'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:2,p:7,token:'τὰ',lemma:'ὁ',sid:'G3588',pars:'T-NPN',gloss:'estas'},
  {bookAbbr:'1CO',bookName:'1 Coríntios',ch:13,v:2,p:8,token:'τρία·',lemma:'τρεῖς',sid:'G5140',pars:'A-NPN',gloss:'três'},

  // ═══════════════════════════════════════════════════════════════
  // APOCALIPSE 1:8 (C1 M08)
  // ═══════════════════════════════════════════════════════════════
  {bookAbbr:'RE',bookName:'Apocalipse',ch:1,v:8,p:1,token:'Ἐγώ',lemma:'ἐγώ',sid:'G1473',pars:'P-NS',gloss:'Eu'},
  {bookAbbr:'RE',bookName:'Apocalipse',ch:1,v:8,p:2,token:'εἰμι',lemma:'εἰμί',sid:'G1510',pars:'V-PAI-1S',gloss:'sou'},
  {bookAbbr:'RE',bookName:'Apocalipse',ch:1,v:8,p:3,token:'τὸ',lemma:'ὁ',sid:'G3588',pars:'T-NSN',gloss:'o'},
  {bookAbbr:'RE',bookName:'Apocalipse',ch:1,v:8,p:4,token:'Ἄλφα',lemma:'ἄλφα',sid:'G1',pars:'N-NSN',gloss:'Alfa'},
  {bookAbbr:'RE',bookName:'Apocalipse',ch:1,v:8,p:5,token:'καὶ',lemma:'καί',sid:'G2532',pars:'CONJ',gloss:'e'},
  {bookAbbr:'RE',bookName:'Apocalipse',ch:1,v:8,p:6,token:'τὸ',lemma:'ὁ',sid:'G3588',pars:'T-NSN',gloss:'o'},
  {bookAbbr:'RE',bookName:'Apocalipse',ch:1,v:8,p:7,token:'Ὦ',lemma:'ὦ',sid:'G5598',pars:'N-NSN',gloss:'Ômega'},
  {bookAbbr:'RE',bookName:'Apocalipse',ch:1,v:8,p:8,token:'–',lemma:'–',sid:'',pars:'',gloss:''},
];

export const getNTTokensByReference = (bookAbbr: string, ch: number, v: number): NTToken[] =>
  NT_TOKENS.filter((t) => t.bookAbbr === bookAbbr && t.ch === ch && t.v === v);
