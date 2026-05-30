import { databaseService } from './sqlite';

interface ExDef {
  type: string;
  question_pt?: string;
  question_greek?: string;
  correct: any;
  options?: any;
  explanation: string;
}

const C1_M01: ExDef[] = [
  { type: 'flashcard', question_greek: 'ἀγαθός', correct: 'bom', explanation: 'ἀγαθός (G18) = bom, bondoso — primeira palavra com Α' },
  { type: 'flashcard', question_greek: 'ἐγώ', correct: 'eu', explanation: 'ἐγώ (G1473) = eu — pronome pessoal com Ε' },
  { type: 'multiple_choice', question_pt: 'Qual é a primeira letra do alfabeto grego?', options: ['Α (Alfa)', 'Β (Beta)', 'Γ (Gama)', 'Δ (Delta)'], correct: 'Α (Alfa)', explanation: 'Alfa (Α α) é a primeira letra do alfabeto grego' },
  { type: 'multiple_choice', question_pt: 'Como se diz "amor" em grego?', options: ['ἀγάπη', 'ἀγαθός', 'ἀδελφός', 'ἐγώ'], correct: 'ἀγάπη', explanation: 'ἀγάπη (G26) = amor. Palavra com Α, α' },
  { type: 'fill_blank', question_pt: 'Complete: ἐγώ ___ (eu sou)', options: ['εἰμί', 'εἶ', 'ἐστίν'], correct: 'εἰμί', explanation: 'ἐγώ εἰμί = eu sou. εἰμί (G1510) é o verbo ser/estar' },
  { type: 'fill_blank', question_pt: 'Complete com a vogal que falta: _γάπη', options: ['ἀ', 'ἐ', 'ἰ'], correct: 'ἀ', explanation: 'ἀγάπη começa com Α (alfa). Alfa representa o som /a/' },
  { type: 'matching_pairs', question_pt: 'Combine cada palavra grega com sua tradução:', options: [['ἀγαθός','bom'],['ἀγάπη','amor'],['ἀδελφός','irmão'],['ἐγώ','eu']], correct: 'matching', explanation: 'Vocabulário básico com Α, Ε, Ι' },
  { type: 'tpr_digital', question_pt: 'Qual letra grega se parece com um "A" maiúsculo?', options: ['Α', 'Ε', 'Ι', 'Ο'], correct: 'Α', explanation: 'Α (alfa) é a letra que se parece com o A maiúsculo do português' },
  { type: 'word_order', question_pt: 'Monte a frase "Deus é amor" em grego:', correct: ['ὁ', 'θεός', 'ἀγάπη', 'ἐστίν'], explanation: 'ὁ θεὸς ἀγάπη ἐστίν — estrutura sujeito + predicado + verbo' },
  { type: 'narration', question_pt: 'Quantas letras tem a palavra ἀγάπη?', options: ['5 letras', '4 letras', '6 letras', '7 letras'], correct: '5 letras', explanation: 'ἀ-γ-ά-π-η tem 5 letras' },
];

const C1_M02: ExDef[] = [
  { type: 'flashcard', question_greek: 'ὁδός', correct: 'caminho', explanation: 'ὁδός (G3598) = caminho, estrada — com Ο e ς' },
  { type: 'flashcard', question_greek: 'υἱός', correct: 'filho', explanation: 'υἱός (G5207) = filho — tem Υ e Ι' },
  { type: 'multiple_choice', question_pt: 'Qual letra grega representa o som de /o/ breve?', options: ['Ο (Ômicron)', 'Ω (Ômega)', 'Υ (Ípsilon)', 'Α (Alfa)'], correct: 'Ο (Ômicron)', explanation: 'Ômicron (Ο ο) = /o/ breve, como "ó" em "pó"' },
  { type: 'multiple_choice', question_pt: 'Como se diz "Senhor" em grego?', options: ['κύριος', 'κόσμος', 'λόγος', 'θεός'], correct: 'κύριος', explanation: 'κύριος (G2962) = Senhor — tem Υ, Ι, Ο, e ς final' },
  { type: 'fill_blank', question_pt: 'Complete com a letra que falta: κ_ρ_ος (Senhor)', options: ['ύ, ί', 'ό, ό', 'ά, ά', 'ή, ή'], correct: 'ύ, ί', explanation: 'κύριος — as vogais são Υ e Ι' },
  { type: 'fill_blank', question_pt: 'Qual vogal longa corresponde a Ω (ômega)?', options: ['/ō/ longo', '/o/ breve', '/u/', '/a/'], correct: '/ō/ longo', explanation: 'Ω (ômega) = /ō/ longo. Ο (ômicron) = /o/ breve' },
  { type: 'matching_pairs', question_pt: 'Combine as palavras:', options: [['ὁδός','caminho'],['υἱός','filho'],['κύριος','Senhor'],['λόγος','palavra']], correct: 'matching', explanation: 'Vocabulário do módulo 2 — vogais Ο, Υ, Ω' },
  { type: 'word_order', question_pt: 'Monte a frase "Eu sou o caminho":', correct: ['ἐγώ', 'εἰμι', 'ἡ', 'ὁδός'], explanation: 'Ἐγώ εἰμι ἡ ὁδός — João 14:6' },
  { type: 'tpr_digital', question_pt: 'Qual letra NÃO existe em δοῦλος (servo)?', options: ['Α', 'Ο', 'Υ', 'Σ'], correct: 'Α', explanation: 'δοῦλος tem Δ, Ο, Υ, Λ, Ο, Σ — não tem Α' },
  { type: 'narration', question_pt: 'A palavra κύριος termina com qual forma de sigma?', options: ['ς (final)', 'σ (meio)', 'Σ (maiúsculo)', 'nenhuma'], correct: 'ς (final)', explanation: 'κύριος termina com ς porque está no final da palavra' },
];

const C1_M03: ExDef[] = [
  { type: 'flashcard', question_greek: 'ἡμέρα', correct: 'dia', explanation: 'ἡμέρα (G2250) = dia — começa com Η' },
  { type: 'flashcard', question_greek: 'νόμος', correct: 'lei', explanation: 'νόμος (G3551) = lei — tem Ν' },
  { type: 'flashcard', question_greek: 'τέκνον', correct: 'filho/criança', explanation: 'τέκνον (G5043) = filho — tem Τ e Ν' },
  { type: 'multiple_choice', question_pt: 'Eta (Η) representa qual som?', options: ['/e/ longo (ê)', '/e/ breve (é)', '/i/', '/a/'], correct: '/e/ longo (ê)', explanation: 'Η (eta) = /e/ longo, diferente de Ε (épsilon) que é breve' },
  { type: 'multiple_choice', question_pt: 'Como se diz "fé" em grego?', options: ['πίστις', 'πνεῦμα', 'νόμος', 'ἡμέρα'], correct: 'πίστις', explanation: 'πίστις (G4102) = fé — tem Π, Ι, Σ, Τ, Ι, Σ' },
  { type: 'fill_blank', question_pt: 'Complete: _μέρα (dia)', options: ['ἡ', 'ἀ', 'ἐ'], correct: 'ἡ', explanation: 'ἡμέρα começa com Η (eta)' },
  { type: 'fill_blank', question_pt: 'Complete a frase: Ἐν ἀρχῇ ἦν ὁ _όγος', options: ['λ', 'ν', 'τ'], correct: 'λ', explanation: 'λόγος — comes with lambda (Λ)' },
  { type: 'matching_pairs', question_pt: 'Combine:', options: [['ἡμέρα','dia'],['νόμος','lei'],['τέκνον','filho'],['πίστις','fé']], correct: 'matching', explanation: 'Vocabulário do módulo 3' },
  { type: 'narration', question_pt: 'Quantas consoantes tem a palavra πνεῦμα?', options: ['4 (π, ν, υ, μ)', '3 (π, ν, μ)', '5 (π, ν, ε, υ, μ)', '2 (π, μ)'], correct: '4 (π, ν, υ, μ)', explanation: 'πνεῦμα tem π-ν-ε-ῦ-μ-α: as consoantes são π, ν (υ é vogal), μ' },
];

const C1_M04: ExDef[] = [
  { type: 'flashcard', question_greek: 'σάρξ', correct: 'carne', explanation: 'σάρξ (G4561) = carne — começa com Σ' },
  { type: 'flashcard', question_greek: 'κόσμος', correct: 'mundo', explanation: 'κόσμος (G2889) = mundo — tem Κ, Σ, Μ' },
  { type: 'flashcard', question_greek: 'λαός', correct: 'povo', explanation: 'λαός (G2992) = povo — começa com Λ' },
  { type: 'multiple_choice', question_pt: 'Qual a forma correta de sigma no FINAL da palavra?', options: ['ς', 'σ', 'Σ', 'τ'], correct: 'ς', explanation: 'Sigma final é ς. No meio usa-se σ. Ex: σάρξ (começo=σ, fim=ς)' },
  { type: 'multiple_choice', question_pt: 'Como se diz "salvação" em grego?', options: ['σωτηρία', 'σάρξ', 'καρδία', 'κόσμος'], correct: 'σωτηρία', explanation: 'σωτηρία (G4991) = salvação — tem Σ, Ω, Τ, Η, Ρ, Ι, Α' },
  { type: 'fill_blank', question_pt: 'Complete: κό_μος (mundo)', options: ['σ', 'ς', 'τ'], correct: 'σ', explanation: 'κόσμος — no meio da palavra usa-se σ, não ς' },
  { type: 'fill_blank', question_pt: 'Complete a palavra com sigma final: σάρ_', options: ['ξ', 'ς', 'σ'], correct: 'ξ', explanation: 'σάρξ — termina com ξ (sigma final na verdade é o som /ks/ da junção κ + ς)' },
  { type: 'matching_pairs', question_pt: 'Combine:', options: [['σάρξ','carne'],['κόσμος','mundo'],['λαός','povo'],['καρδία','coração']], correct: 'matching', explanation: 'Vocabulário do módulo 4' },
  { type: 'narration', question_pt: 'A palavra σωτηρία tem quantas sílabas?', options: ['4 (σω-τη-ρί-α)', '3 (σω-τη-ρία)', '5 (σ-ω-τ-η-ρ-ι-α)', '2 (σω-τηρία)'], correct: '4 (σω-τη-ρί-α)', explanation: 'σω-τη-ρί-α = 4 sílabas' },
];

const C1_M05: ExDef[] = [
  { type: 'flashcard', question_greek: 'πατήρ', correct: 'pai', explanation: 'πατήρ (G3962) = pai — começa com Π' },
  { type: 'flashcard', question_greek: 'ῥῆμα', correct: 'palavra dita', explanation: 'ῥῆμα (G4487) = palavra dita — começa com Ρ com aspiração' },
  { type: 'flashcard', question_greek: 'μήτηρ', correct: 'mãe', explanation: 'μήτηρ (G3384) = mãe — começa com Μ' },
  { type: 'multiple_choice', question_pt: 'Rô (Ρ) no início de palavra tem:?', options: ['aspiração (ῥ)', 'som simples (ρ)', 'som mudo', 'som duplo'], correct: 'aspiração (ῥ)', explanation: 'Rô no início de palavra tem espírito áspero: ῥ = /rh/' },
  { type: 'multiple_choice', question_pt: 'Como se diz "testemunha" em grego?', options: ['μάρτυς', 'πατήρ', 'ῥῆμα', 'πρός'], correct: 'μάρτυς', explanation: 'μάρτυς (G3144) = testemunha — tem Μ, Α, Ρ, Τ, Υ, ς' },
  { type: 'fill_blank', question_pt: 'Complete: _ατήρ (pai)', options: ['π', 'μ', 'ρ'], correct: 'π', explanation: 'πατήρ começa com Π (pi)' },
  { type: 'fill_blank', question_pt: 'Complete: _ήτηρ (mãe)', options: ['μ', 'π', 'ρ'], correct: 'μ', explanation: 'μήτηρ começa com Μ (mi)' },
  { type: 'matching_pairs', question_pt: 'Combine:', options: [['πατήρ','pai'],['ῥῆμα','palavra dita'],['μήτηρ','mãe'],['μάρτυς','testemunha']], correct: 'matching', explanation: 'Vocabulário do módulo 5' },
];

const C1_M06: ExDef[] = [
  { type: 'flashcard', question_greek: 'βίος', correct: 'vida', explanation: 'βίος (G979) = vida — começa com Β' },
  { type: 'flashcard', question_greek: 'δόξα', correct: 'glória', explanation: 'δόξα (G1391) = glória — começa com Δ' },
  { type: 'flashcard', question_greek: 'γῆ', correct: 'terra', explanation: 'γῆ (G1093) = terra — a letra Γ' },
  { type: 'multiple_choice', question_pt: 'Beta (Β) representa qual som?', options: ['/b/ (boca)', '/p/ (pai)', '/v/ (vaca)', '/f/ (faca)'], correct: '/b/ (boca)', explanation: 'Β (beta) = /b/ como em "boca"' },
  { type: 'multiple_choice', question_pt: 'Gamma (Γ) antes de gamma soa como?', options: ['/n/ (nasal)', '/g/ (gato)', '/ng/', '/gn/'], correct: '/n/ (nasal)', explanation: 'γ antes de γ, κ, χ, ξ soa como /n/. Ex: ἄγγελος = /angelos/' },
  { type: 'fill_blank', question_pt: 'Qual oclusiva falta em _ύναμις (poder)?', options: ['δ', 'β', 'γ'], correct: 'δ', explanation: 'δύναμις (G1411) = poder — começa com Δ (delta)' },
  { type: 'fill_blank', question_pt: 'Complete com a oclusiva correta: _ιβλίον (livro)', options: ['β', 'δ', 'γ'], correct: 'β', explanation: 'βιβλίον (G975) = livro — começa com Β (beta)' },
  { type: 'matching_pairs', question_pt: 'Combine as oclusivas:', options: [['Β β','/b/'],['Δ δ','/d/'],['Γ γ','/g/'],['γγ','/ng/']], correct: 'matching', explanation: 'As três oclusivas sonoras do grego' },
];

const C1_M07: ExDef[] = [
  { type: 'flashcard', question_greek: 'φῶς', correct: 'luz', explanation: 'φῶς (G5457) = luz — começa com Φ (aspirada)' },
  { type: 'flashcard', question_greek: 'χάρις', correct: 'graça', explanation: 'χάρις (G5485) = graça — começa com Χ (aspirada)' },
  { type: 'flashcard', question_greek: 'θεός', correct: 'Deus', explanation: 'θεός (G2316) = Deus — começa com Θ (aspirada)' },
  { type: 'multiple_choice', question_pt: 'Teta (Θ) representa qual som?', options: ['/th/ (think)', '/f/ (faca)', '/t/ (tudo)', '/d/ (dedo)'], correct: '/th/ (think)', explanation: 'Θ = /th/ como em inglês "think". É uma consoante aspirada' },
  { type: 'multiple_choice', question_pt: 'Qual letra NÃO é aspirada?', options: ['Π (pi)', 'Φ (fi)', 'Χ (qui)', 'Θ (teta)'], correct: 'Π (pi)', explanation: 'Π é oclusiva simples. Φ, Χ, Θ são aspiradas' },
  { type: 'fill_blank', question_pt: 'Complete com a aspirada certa: _άρις (graça)', options: ['χ', 'φ', 'θ'], correct: 'χ', explanation: 'χάρις (G5485) = graça — começa com Χ (qui)' },
  { type: 'fill_blank', question_pt: 'Complete: _εός (Deus)', options: ['θ', 'φ', 'χ'], correct: 'θ', explanation: 'θεός (G2316) = Deus — começa com Θ (teta)' },
  { type: 'matching_pairs', question_pt: 'Combine as aspiradas com seus sons:', options: [['Φ φ','/ph/'],['Χ χ','/kh/'],['Θ θ','/th/']], correct: 'matching', explanation: 'As três aspiradas: Φ, Χ, Θ' },
];

const C1_M08: ExDef[] = [
  { type: 'flashcard', question_greek: 'ζωή', correct: 'vida', explanation: 'ζωή (G2222) = vida — começa com Ζ (zeta)' },
  { type: 'flashcard', question_greek: 'ξένος', correct: 'estrangeiro', explanation: 'ξένος (G3581) = estrangeiro — começa com Ξ (xi)' },
  { type: 'flashcard', question_greek: 'ψυχή', correct: 'alma', explanation: 'ψυχή (G5590) = alma — começa com Ψ (psi)' },
  { type: 'multiple_choice', question_pt: 'Xi (Ξ) representa qual combinação de sons?', options: ['/ks/ (táxi)', '/ps/ (psicologia)', '/dz/ (pods)', '/gz/'], correct: '/ks/ (táxi)', explanation: 'Ξ (xi) = /ks/ como "x" em "táxi"' },
  { type: 'multiple_choice', question_pt: 'Psi (Ψ) representa qual combinação?', options: ['/ps/ (psicologia)', '/ks/ (táxi)', '/dz/ (pods)', '/pn/'], correct: '/ps/ (psicologia)', explanation: 'Ψ (psi) = /ps/ como "ps" em "psicologia"' },
  { type: 'fill_blank', question_pt: 'Complete: _ωή (vida)', options: ['ζ', 'ξ', 'ψ'], correct: 'ζ', explanation: 'ζωή (G2222) = vida — começa com Ζ (zeta)' },
  { type: 'fill_blank', question_pt: 'Complete: _υχή (alma)', options: ['ψ', 'ζ', 'ξ'], correct: 'ψ', explanation: 'ψυχή (G5590) = alma — começa com Ψ (psi)' },
  { type: 'matching_pairs', question_pt: 'Combine as letras raras:', options: [['Ζ ζ','/dz/'],['Ξ ξ','/ks/'],['Ψ ψ','/ps/']], correct: 'matching', explanation: 'As três letras de dupla consoante' },
];

const C1_M09: ExDef[] = [
  { type: 'flashcard', question_greek: 'οὐρανός', correct: 'céu', explanation: 'οὐρανός (G3772) = céu — tem ditongo ου' },
  { type: 'flashcard', question_greek: 'αἰών', correct: 'eternidade', explanation: 'αἰών (G165) = eternidade — tem ditongo αι' },
  { type: 'flashcard', question_greek: 'οἶκος', correct: 'casa', explanation: 'οἶκος (G3624) = casa — tem ditongo οι' },
  { type: 'multiple_choice', question_pt: 'Qual palavra tem espírito áspero?', options: ['ἁγιάζω (hagiazō)', 'ἐγώ (egō)', 'ἀγάπη (agapē)', 'εἰμί (eimi)'], correct: 'ἁγιάζω (hagiazō)', explanation: 'ἁγιάζω tem ἁ com espírito áspero → /h/. As outras têm espírito suave' },
  { type: 'multiple_choice', question_pt: 'O iota subscrito (ᾳ) é pronunciado como?', options: ['Não é pronunciado', 'Como /i/', 'Como /j/', 'Como /e/'], correct: 'Não é pronunciado', explanation: 'Iota subscrito não é pronunciado — só indica vogal longa histórica' },
  { type: 'fill_blank', question_pt: 'Qual espírito leva a palavra ἐγώ?', options: ['suave (᾽)', 'áspero (῾)'], correct: 'suave (᾽)', explanation: 'ἐγώ tem espírito suave — o Ε não é aspirado' },
  { type: 'fill_blank', question_pt: 'Ditongo οι forma-se com ο + _', options: ['ι', 'υ', 'η'], correct: 'ι', explanation: 'οι = ο + ι. Ex: οἶκος (casa)' },
  { type: 'matching_pairs', question_pt: 'Combine os ditongos:', options: [['αι','/ai/ (país)'],['ει','/ei/ (leite)'],['οι','/oi/ (boi)'],['ου','/u/ (tu)']], correct: 'matching', explanation: 'Os principais ditongos do grego koiné' },
];

const C1_M10: ExDef[] = [
  { type: 'flashcard', question_greek: 'Ἐν ἀρχῇ', correct: 'No princípio', explanation: 'Ἐν ἀρχῇ = No princípio — João 1:1' },
  { type: 'flashcard', question_greek: 'λόγος', correct: 'Verbo/Palavra', explanation: 'λόγος (G3056) = o Verbo divino em João 1:1' },
  { type: 'multiple_choice', question_pt: 'Quantas vezes aparece ὁ em João 1:1?', options: ['3 vezes', '2 vezes', '4 vezes', '1 vez'], correct: '3 vezes', explanation: 'ὁ aparece 3 vezes: "ὁ λόγος... ὁ λόγος... ὁ λόγος"' },
  { type: 'multiple_choice', question_pt: 'Qual verbo é repetido 3 vezes em João 1:1?', options: ['ἦν (era)', 'εἰμί (sou)', 'ἔχω (ter)', 'λέγω (dizer)'], correct: 'ἦν (era)', explanation: 'ἦν (imperfeito de εἰμί) aparece 3 vezes em João 1:1' },
  { type: 'fill_blank', question_pt: 'Complete: Ἐν ἀρχῇ _ν ὁ λόγος', options: ['ἦ', 'ἔ', 'ἤ'], correct: 'ἦ', explanation: 'Ἐν ἀρχῇ ἦν ὁ λόγος — "No princípio era o Verbo"' },
  { type: 'fill_blank', question_pt: 'Complete: καὶ ὁ λόγος ἦν πρὸς τὸν _', options: ['θεόν', 'λόγον', 'ἀρχήν'], correct: 'θεόν', explanation: 'πρὸς τὸν θεόν — "com Deus"' },
  { type: 'word_order', question_pt: 'Monte João 1:1:', correct: ['Ἐν', 'ἀρχῇ', 'ἦν', 'ὁ', 'λόγος', 'καὶ', 'ὁ', 'λόγος', 'ἦν', 'πρὸς', 'τὸν', 'θεόν'], explanation: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν' },
  { type: 'matching_pairs', question_pt: 'Combine palavras de João 1:1:', options: [['Ἐν','em'],['ἀρχῇ','princípio'],['λόγος','Verbo'],['θεόν','Deus']], correct: 'matching', explanation: 'Vocabulário de João 1:1' },
];

const C2_M01: ExDef[] = [
  { type: 'flashcard', question_greek: 'εἰμί', correct: 'eu sou', explanation: 'εἰμί (G1510) = eu sou — 1ª singular do verbo ser' },
  { type: 'flashcard', question_greek: 'εἶ', correct: 'tu és', explanation: 'εἶ (G1488) = tu és — 2ª singular' },
  { type: 'flashcard', question_greek: 'ἐστίν', correct: 'ele/ela é', explanation: 'ἐστίν (G2076) = ele/ela é — 3ª singular' },
  { type: 'multiple_choice', question_pt: 'Qual a 1ª pessoa do singular de εἰμί?', options: ['εἰμί', 'εἶ', 'ἐστίν', 'ἐσμέν'], correct: 'εἰμί', explanation: 'ἐγὼ εἰμί = eu sou' },
  { type: 'multiple_choice', question_pt: 'ἐστίν corresponde a qual pessoa?', options: ['3ª singular (ele é)', '1ª singular (eu sou)', '2ª singular (tu és)', '3ª plural (eles são)'], correct: '3ª singular (ele é)', explanation: 'ἐστίν = ele/ela é. Ex: θεός ἐστίν = Deus é' },
  { type: 'fill_blank', question_pt: 'Complete: ἐγὼ _ (eu sou)', options: ['εἰμί', 'εἶ', 'ἐστίν'], correct: 'εἰμί', explanation: 'ἐγὼ εἰμί = eu sou' },
  { type: 'fill_blank', question_pt: 'Complete: σὺ _ (tu és)', options: ['εἶ', 'εἰμί', 'ἐστίν'], correct: 'εἶ', explanation: 'σὺ εἶ = tu és' },
  { type: 'word_order', question_pt: 'Monte: "eu sou o caminho"', correct: ['ἐγώ', 'εἰμι', 'ἡ', 'ὁδός'], explanation: 'Ἐγώ εἰμι ἡ ὁδός (João 14:6)' },
];

const C2_M02: ExDef[] = [
  { type: 'flashcard', question_greek: 'ἐσμέν', correct: 'nós somos', explanation: 'ἐσμέν (G2070) = nós somos — 1ª plural' },
  { type: 'flashcard', question_greek: 'ἐστέ', correct: 'vós sois', explanation: 'ἐστέ (G2075) = vós sois — 2ª plural' },
  { type: 'flashcard', question_greek: 'εἰσίν', correct: 'eles/elas são', explanation: 'εἰσίν (G1526) = eles são — 3ª plural' },
  { type: 'multiple_choice', question_pt: 'Qual a 1ª pessoa do PLURAL de εἰμί?', options: ['ἐσμέν', 'εἰμί', 'ἐστέ', 'εἰσίν'], correct: 'ἐσμέν', explanation: 'ἡμεῖς ἐσμέν = nós somos' },
  { type: 'multiple_choice', question_pt: 'εἰσίν corresponde a qual pessoa?', options: ['3ª plural (eles são)', '1ª plural (nós somos)', '2ª plural (vós sois)', '3ª singular (ele é)'], correct: '3ª plural (eles são)', explanation: 'εἰσίν = eles/elas são' },
  { type: 'fill_blank', question_pt: 'Complete: ἡμεῖς _ (nós somos)', options: ['ἐσμέν', 'ἐστέ', 'εἰσίν'], correct: 'ἐσμέν', explanation: 'ἡμεῖς ἐσμέν = nós somos' },
  { type: 'fill_blank', question_pt: 'Complete: ὑμεῖς _ (vós sois)', options: ['ἐστέ', 'ἐσμέν', 'εἰσίν'], correct: 'ἐστέ', explanation: 'ὑμεῖς ἐστέ = vós sois. Mateus 5:14: ὑμεῖς ἐστὲ τὸ φῶς' },
  { type: 'word_order', question_pt: 'Monte: "vós sois a luz"', correct: ['ὑμεῖς', 'ἐστέ', 'τὸ', 'φῶς'], explanation: 'Ὑμεῖς ἐστέ τὸ φῶς (Mateus 5:14)' },
];

const C2_M03: ExDef[] = [
  { type: 'flashcard', question_greek: 'αὐτός', correct: 'ele/mesmo', explanation: 'αὐτός (G846) = ele, ele mesmo — pronome mais frequente do NT' },
  { type: 'multiple_choice', question_pt: 'Qual pronome significa "eu"?', options: ['ἐγώ', 'σύ', 'αὐτός', 'ἡμεῖς'], correct: 'ἐγώ', explanation: 'ἐγώ (G1473) = eu' },
  { type: 'multiple_choice', question_pt: 'αὐτός pode significar também?', options: ['ele mesmo (ênfase)', 'tu mesmo', 'nós mesmos', 'vós mesmos'], correct: 'ele mesmo (ênfase)', explanation: 'αὐτός = ele / mesmo / o mesmo. Usado para ênfase' },
  { type: 'fill_blank', question_pt: 'Complete: _ὐτός (ele)', options: ['α', 'ε', 'η'], correct: 'α', explanation: 'αὐτός = ele. Pronome muito frequente no NT' },
  { type: 'fill_blank', question_pt: 'Qual pronome falta? _ύ (tu)', options: ['σ', 'α', 'ἐ'], correct: 'σ', explanation: 'σύ (G4771) = tu' },
  { type: 'matching_pairs', question_pt: 'Combine pronomes:', options: [['ἐγώ','eu'],['σύ','tu'],['αὐτός','ele'],['ἡμεῖς','nós']], correct: 'matching', explanation: 'Pronomes pessoais do grego koiné' },
];

const C2_M04: ExDef[] = [
  { type: 'flashcard', question_greek: 'ὁ', correct: 'o (artigo masc)', explanation: 'ὁ (G3588) = o — artigo definido masculino singular' },
  { type: 'flashcard', question_greek: 'ἡ', correct: 'a (artigo fem)', explanation: 'ἡ (G3588) = a — artigo definido feminino singular' },
  { type: 'flashcard', question_greek: 'τό', correct: 'o/a (neutro)', explanation: 'τό (G3588) = o/a — artigo definido neutro singular' },
  { type: 'multiple_choice', question_pt: 'Qual artigo corresponde a λόγος (masc)?', options: ['ὁ', 'ἡ', 'τό', 'τά'], correct: 'ὁ', explanation: 'λόγος é masculino → ὁ λόγος' },
  { type: 'multiple_choice', question_pt: 'Qual artigo com ἀγάπη (fem)?', options: ['ἡ', 'ὁ', 'τό', 'οἱ'], correct: 'ἡ', explanation: 'ἀγάπη é feminino → ἡ ἀγάπη' },
  { type: 'fill_blank', question_pt: 'Complete: _ λόγος (a palavra)', options: ['ὁ', 'ἡ', 'τό'], correct: 'ὁ', explanation: 'λόγος é masculino → ὁ λόγος' },
  { type: 'fill_blank', question_pt: 'Complete: _ ἀγάπη (o amor)', options: ['ἡ', 'ὁ', 'τό'], correct: 'ἡ', explanation: 'ἀγάπη é feminino → ἡ ἀγάπη' },
  { type: 'word_order', question_pt: 'Monte com artigo: "o filho"', correct: ['ὁ', 'υἱός'], explanation: 'υἱός é masculino → ὁ υἱός' },
];

const C2_M05: ExDef[] = [
  { type: 'flashcard', question_greek: 'λόγος', correct: 'palavra (masc)', explanation: 'λόγος (G3056) — nominativo singular, 2ª declinação masc' },
  { type: 'flashcard', question_greek: 'ἔργον', correct: 'obra (neutro)', explanation: 'ἔργον (G2041) — nominativo singular, 2ª declinação neutro' },
  { type: 'multiple_choice', question_pt: 'Qual a desinência de nominativo singular masculino na 2ª declinação?', options: ['-ος', '-ον', '-α', '-η'], correct: '-ος', explanation: '2ª declinação masc: nom sg = -ος. Ex: λόγος, θεός, δοῦλος' },
  { type: 'multiple_choice', question_pt: 'Qual a desinência de nominativo singular neutro?', options: ['-ον', '-ος', '-α', '-η'], correct: '-ον', explanation: 'Neutro 2ª declinação: nom sg = -ον. Ex: τέκνον, ἔργον' },
  { type: 'fill_blank', question_pt: 'Complete o nominativo: λόγ_ (palavra)', options: ['ος', 'ον', 'ου'], correct: 'ος', explanation: 'λόγος — nom sg masc = λόγος' },
  { type: 'fill_blank', question_pt: 'Complete o nominativo neutro: τέκν_ (filho)', options: ['ον', 'ος', 'α'], correct: 'ον', explanation: 'τέκνον — nom sg neutro = τέκνον' },
  { type: 'word_order', question_pt: 'Monte com artigo + substantivo: "a palavra"', correct: ['ὁ', 'λόγος'], explanation: 'ὁ λόγος — artigo masc + subst masc' },
  { type: 'matching_pairs', question_pt: 'Combine caso com desinência:', options: [['Nom sg masc','-ος'],['Nom sg neutro','-ον'],['Ac sg masc','-ον'],['Gen sg','-ου']], correct: 'matching', explanation: 'Desinências da 2ª declinação' },
];

const C2_M06: ExDef[] = [
  { type: 'flashcard', question_greek: 'ἀγάπη', correct: 'amor', explanation: 'ἀγάπη (G26) = amor — predicado nominal em "Deus é amor"' },
  { type: 'flashcard', question_greek: 'εἰρήνη', correct: 'paz', explanation: 'εἰρήνη (G1515) = paz' },
  { type: 'flashcard', question_greek: 'ἀλήθεια', correct: 'verdade', explanation: 'ἀλήθεια (G225) = verdade' },
  { type: 'multiple_choice', question_pt: 'Em "Deus é amor" (Ὁ θεὸς ἀγάπη ἐστίν), qual caso está ἀγάπη?', options: ['Nominativo', 'Acusativo', 'Genitivo', 'Dativo'], correct: 'Nominativo', explanation: 'Predicativo do sujeito fica no mesmo caso (nominativo) que o sujeito' },
  { type: 'multiple_choice', question_pt: 'Em grego, o predicativo de εἰμί fica em qual caso?', options: ['Nominativo', 'Acusativo', 'Genitivo', 'Dativo'], correct: 'Nominativo', explanation: 'Diferente do português, o grego usa nominativo para sujeito E predicativo' },
  { type: 'fill_blank', question_pt: 'Complete: Ὁ θεὸς ἀγάπη _στίν', options: ['ἐ', 'εἰ', 'ἦ'], correct: 'ἐ', explanation: 'ἐστίν — 3ª singular do verbo εἰμί' },
  { type: 'word_order', question_pt: 'Monte: "Deus é amor"', correct: ['Ὁ', 'θεὸς', 'ἀγάπη', 'ἐστίν'], explanation: 'Ὁ θεὸς ἀγάπη ἐστίν (1 João 4:8)' },
  { type: 'matching_pairs', question_pt: 'Combine os pares:', options: [['ἀγάπη','amor'],['εἰρήνη','paz'],['ἀλήθεια','verdade'],['χάρις','graça']], correct: 'matching', explanation: 'Vocabulário do predicado nominal' },
];

const C2_M07: ExDef[] = [
  { type: 'flashcard', question_greek: 'λέγω', correct: 'digo/falo', explanation: 'λέγω (G3004) = digo — verbo temático modelo' },
  { type: 'flashcard', question_greek: 'ἔχω', correct: 'tenho', explanation: 'ἔχω (G2192) = tenho' },
  { type: 'flashcard', question_greek: 'πιστεύω', correct: 'creio', explanation: 'πιστεύω (G4100) = creio' },
  { type: 'multiple_choice', question_pt: 'Qual a desinência de 1ª singular do presente ativo?', options: ['-ω', '-εις', '-ει', '-ομεν'], correct: '-ω', explanation: '1ª sg presente ativo = -ω. Ex: λέγ-ω, ἔχ-ω, πιστεύ-ω' },
  { type: 'multiple_choice', question_pt: 'Qual a desinência de 3ª plural?', options: ['-ουσι(ν)', '-ω', '-εις', '-ει'], correct: '-ουσι(ν)', explanation: '3ª pl presente ativo = -ουσι(ν). Ex: λέγ-ουσι' },
  { type: 'fill_blank', question_pt: 'Complete: λέγ_ (3ª sg = ele diz)', options: ['ει', 'εις', 'ω'], correct: 'ει', explanation: 'λέγ-ει = ele diz. 3ª sg = -ει' },
  { type: 'fill_blank', question_pt: 'Complete: πιστεύ_ (1ª sg = eu creio)', options: ['ω', 'εις', 'ει'], correct: 'ω', explanation: 'πιστεύ-ω = eu creio. 1ª sg = -ω' },
  { type: 'word_order', question_pt: 'Monte: "eu creio em Deus"', correct: ['πιστεύω', 'εἰς', 'τὸν', 'θεόν'], explanation: 'Πιστεύω εἰς τὸν θεόν' },
];

const C2_M08: ExDef[] = [
  { type: 'flashcard', question_greek: 'Ὁ θεὸς ἀγάπη ἐστίν', correct: 'Deus é amor', explanation: '1 João 4:8 — o verso troféu do Ciclo II' },
  { type: 'multiple_choice', question_pt: 'Em "Ὁ θεὸς ἀγάπη ἐστίν", quantas palavras têm?', options: ['4', '3', '5', '6'], correct: '4', explanation: 'Ὁ (1) + θεὸς (2) + ἀγάπη (3) + ἐστίν (4)' },
  { type: 'multiple_choice', question_pt: 'Qual o sujeito de "Ὁ θεὸς ἀγάπη ἐστίν"?', options: ['θεός (Deus)', 'ἀγάπη (amor)', 'ἐστίν (é)', 'ὁ (artigo)'], correct: 'θεός (Deus)', explanation: 'Sujeito = θεός. Artigo ὁ concorda com θεός (masc nom sg)' },
  { type: 'fill_blank', question_pt: 'Complete: Ὁ _εὸς ἀγάπη ἐστίν', options: ['θ', 'φ', 'χ'], correct: 'θ', explanation: 'θεός — começa com Θ (teta aspirada)' },
  { type: 'fill_blank', question_pt: 'Complete: Ὁ θεὸς _γάπη ἐστίν', options: ['ἀ', 'ἐ', 'ἰ'], correct: 'ἀ', explanation: 'ἀγάπη — começa com Α (alfa)' },
  { type: 'word_order', question_pt: 'Monte 1 João 4:8:', correct: ['Ὁ', 'θεὸς', 'ἀγάπη', 'ἐστίν'], explanation: 'Ὁ θεὸς ἀγάπη ἐστίν — "Deus é amor"' },
  { type: 'matching_pairs', question_pt: 'Combine cada palavra de 1 João 4:8:', options: [['Ὁ','o (artigo)'],['θεὸς','Deus'],['ἀγάπη','amor'],['ἐστίν','é']], correct: 'matching', explanation: 'Análise completa de 1 João 4:8' },
];

const MODULE_EXERCISES: Record<string, ExDef[]> = {
  'C1-M01': C1_M01,
  'C1-M02': C1_M02,
  'C1-M03': C1_M03,
  'C1-M04': C1_M04,
  'C1-M05': C1_M05,
  'C1-M06': C1_M06,
  'C1-M07': C1_M07,
  'C1-M08': C1_M08,
  'C1-M09': C1_M09,
  'C1-M10': C1_M10,
  'C2-M01': C2_M01,
  'C2-M02': C2_M02,
  'C2-M03': C2_M03,
  'C2-M04': C2_M04,
  'C2-M05': C2_M05,
  'C2-M06': C2_M06,
  'C2-M07': C2_M07,
  'C2-M08': C2_M08,
};

export const seedExercises = async () => {
  const db = databaseService.getDB();

  const existing = await db.query('SELECT COUNT(*) as count FROM exercises');
  if ((existing.values?.[0]?.count ?? 0) > 0) {
    console.log('[Seed] Exercises already seeded, skipping');
    return;
  }

  let total = 0;

  for (const [moduleId, exList] of Object.entries(MODULE_EXERCISES)) {
    const statements = exList.map((ex, i) => ({
      statement: `INSERT OR IGNORE INTO exercises
        (id, module_id, exercise_order, type, question_pt, question_greek, correct_answer, options, explanation, xp_reward)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        `${moduleId}-ex${i + 1}`,
        moduleId,
        i + 1,
        ex.type,
        ex.question_pt ?? null,
        ex.question_greek ?? null,
        JSON.stringify(ex.correct),
        ex.options ? JSON.stringify(ex.options) : null,
        ex.explanation,
        2,
      ],
    }));
    await db.executeSet(statements, true);
    total += exList.length;
  }

  console.log(`[Seed] ${total} exercises seeded across ${Object.keys(MODULE_EXERCISES).length} modules`);
};
