import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const ASSETS_DIR = resolve(ROOT_DIR, 'src/assets');

const BOOKS = [
  'MT','MK','LK','JN','AC','RO','1CO','2CO','GA','EP','PH','CO','1TH','2TH','1TI','2TI','TI','PHM','HE','JA','1PE','2PE','1JN','2JN','3JN','JUDE','RE'
];

const BOOK_NAMES = {
  MT: 'Mateus', MK: 'Marcos', LK: 'Lucas', JN: 'João', AC: 'Atos',
  RO: 'Romanos', '1CO': '1 Coríntios', '2CO': '2 Coríntios', GA: 'Gálatas',
  EP: 'Efésios', PH: 'Filipenses', CO: 'Colossenses', '1TH': '1 Tessalonicenses',
  '2TH': '2 Tessalonicenses', '1TI': '1 Timóteo', '2TI': '2 Timóteo',
  TI: 'Tito', PHM: 'Filemom', HE: 'Hebreus', JA: 'Tiago',
  '1PE': '1 Pedro', '2PE': '2 Pedro', '1JN': '1 João', '2JN': '2 João',
  '3JN': '3 João', JUDE: 'Judas', RE: 'Apocalipse'
};

const CHAPTERS = {
  MT:28,MK:16,LK:24,JN:21,AC:28,RO:16,'1CO':16,'2CO':13,GA:6,EP:6,PH:4,CO:4,
  '1TH':5,'2TH':3,'1TI':6,'2TI':4,TI:3,PHM:1,HE:13,JA:5,'1PE':5,'2PE':3,
  '1JN':5,'2JN':1,'3JN':1,JUDE:1,RE:22
};

function loadJson(filename) {
  try {
    const path = resolve(ASSETS_DIR, filename);
    const raw = readFileSync(path, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Erro carregando ${filename}: ${e.message}`);
    return null;
  }
}

function analyze() {
  console.log('🔍 Carregando dados...\n');

  const ntText = loadJson('nt_text.json');
  const ntInterlinear = loadJson('nt_interlinear.json');
  const ntGlossary = loadJson('nt_glossary.json');

  if (!ntText || !ntInterlinear || !ntGlossary) {
    console.error('Falha ao carregar arquivos necessários');
    process.exit(1);
  }

  console.log(`📊 Dados carregados:`);
  console.log(`   - nt_text.json: ${ntText.length.toLocaleString()} tokens gregos`);
  console.log(`   - nt_interlinear.json: ${ntInterlinear.length.toLocaleString()} alinhamentos`);
  console.log(`   - nt_glossary.json: ${ntGlossary.entries?.length?.toLocaleString() ?? 0} entradas\n`);

  const interlinearMap = new Map();
  for (const row of ntInterlinear) {
    const key = `${row.bookAbbr}-${row.ch}-${row.v}-${row.position}`;
    interlinearMap.set(key, row);
  }

  const glossaryMap = new Map();
  if (ntGlossary.entries) {
    for (const entry of ntGlossary.entries) {
      if (entry.lemma && entry.gloss) {
        glossaryMap.set(entry.lemma, entry.gloss);
      }
    }
  }
  console.log(`   - Glossary map: ${glossaryMap.size.toLocaleString()} lemmas\n`);

  const stats = {};
  let totalTokens = 0;
  let totalWithInterlinear = 0;
  let totalWithEmptyInterlinear = 0;
  let totalWithTranslit = 0;
  let totalWithManualPT = 0;
  let totalWithGlossary = 0;
  let totalWithAnyRealPT = 0;
  let totalGaps = 0;

  for (const book of BOOKS) {
    stats[book] = {
      name: BOOK_NAMES[book],
      chapters: {},
      totalTokens: 0,
      totalWithInterlinear: 0,
      totalWithEmptyInterlinear: 0,
      totalWithTranslit: 0,
      totalWithManualPT: 0,
      totalWithGlossary: 0,
      totalWithAnyRealPT: 0,
      totalGaps: 0
    };

    for (let ch = 1; ch <= CHAPTERS[book]; ch++) {
      const chapterTokens = ntText.filter(t => t.book_abbr === book && t.chapter === ch);

      let chTokens = 0;
      let chInterlinear = 0;
      let chEmptyInterlinear = 0;
      let chTranslit = 0;
      let chManualPT = 0;
      let chGlossary = 0;
      let chAnyRealPT = 0;
      let chGaps = 0;

      const verses = [...new Set(chapterTokens.map(t => t.verse))].sort((a, b) => a - b);

      for (const verse of verses) {
        const verseTokens = chapterTokens.filter(t => t.verse === verse);

        for (const token of verseTokens) {
          chTokens++;
          totalTokens++;

          const key = `${book}-${ch}-${verse}-${token.position}`;
          const interlinearRow = interlinearMap.get(key);
          const glossaryGloss = glossaryMap.get(token.lemma);

          const hasInterlinear = interlinearRow?.glossPT && interlinearRow.glossPT.trim() !== '';
          const hasEmptyInterlinear = interlinearRow?.glossPT !== undefined && interlinearRow.glossPT.trim() === '';
          const isTranslit = interlinearRow?.glossSource === 'translit';
          const hasManualPT = hasInterlinear && !isTranslit;
          const hasGlossary = !!glossaryGloss;
          const hasAnyGloss = hasInterlinear || hasGlossary;

          if (hasInterlinear) {
            if (isTranslit) {
              chTranslit++;
              totalWithTranslit++;
            } else {
              chManualPT++;
              totalWithManualPT++;
            }
          } else if (hasEmptyInterlinear) {
            chEmptyInterlinear++;
            totalWithEmptyInterlinear++;
          }
          if (hasGlossary) {
            chGlossary++;
            totalWithGlossary++;
          }
          const hasAnyRealPT = hasManualPT || hasGlossary;
          if (hasAnyRealPT) {
            chAnyRealPT++;
            totalWithAnyRealPT++;
          } else {
            chGaps++;
            totalGaps++;
          }
        }
      }

      const chCoverage = chTokens > 0 ? ((chAnyRealPT / chTokens) * 100).toFixed(1) : '0.0';
      stats[book].chapters[ch] = {
        tokens: chTokens,
        interlinear: chInterlinear,
        emptyInterlinear: chEmptyInterlinear,
        translit: chTranslit,
        manualPT: chManualPT,
        glossary: chGlossary,
        anyRealPT: chAnyRealPT,
        gaps: chGaps,
        coverage: parseFloat(chCoverage)
      };

      stats[book].totalTokens += chTokens;
      stats[book].totalWithInterlinear += chInterlinear;
      stats[book].totalWithEmptyInterlinear += chEmptyInterlinear;
      stats[book].totalWithTranslit += chTranslit;
      stats[book].totalWithManualPT += chManualPT;
      stats[book].totalWithGlossary += chGlossary;
      stats[book].totalWithAnyRealPT += chAnyRealPT;
      stats[book].totalGaps += chGaps;
    }

const bookCoverage = stats[book].totalTokens > 0
      ? ((stats[book].totalWithAnyRealPT / stats[book].totalTokens) * 100).toFixed(1)
      : '0.0';
    stats[book].coverage = parseFloat(bookCoverage);
  }

  console.log('\n╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                           COBERTURA DO NT - RESUMO POR LIVRO                                      ║');
  console.log('╠══════════════════════════════════════════════════════════════════════════════════════════════════════╣');

  for (const book of BOOKS) {
    const s = stats[book];
    const emoji = s.coverage >= 90 ? '🟢' : s.coverage >= 70 ? '🟡' : s.coverage >= 50 ? '🟠' : '🔴';
    const realPT = s.totalWithManualPT + s.totalWithGlossary;
    const bookLine = `║ ${emoji} ${s.name.padEnd(23)} ║ Cap: ${String(CHAPTERS[book]).padStart(2)} ║ Tokens: ${String(s.totalTokens).padStart(5)} ║ Translit: ${String(s.totalWithTranslit).padStart(4)} ║ Real PT: ${String(realPT).padStart(4)} ║ Cov: ${String(s.coverage).padStart(5)}% ║`;
    console.log(bookLine);

    const chapterEntries = Object.entries(s.chapters).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    let lowChapters = chapterEntries.filter(([ch, data]) => data.coverage < 70);

    if (lowChapters.length > 0 && lowChapters.length <= 5) {
      for (const [ch, data] of lowChapters) {
        const gapEmoji = data.coverage < 50 ? '🔴' : data.coverage < 70 ? '🟡' : '🟠';
        console.log(`║   ${gapEmoji} Cap ${ch.padStart(2)}: ${data.tokens} tokens | Translit: ${data.translit} | Real PT: ${data.manualPT + data.glossary} | Gaps: ${data.gaps}     ║`);
      }
    } else if (lowChapters.length > 5) {
      const worst = lowChapters.sort((a, b) => a[1].coverage - b[1].coverage).slice(0, 3);
      const best = lowChapters.sort((a, b) => b[1].coverage - a[1].coverage).slice(0, 2);
      for (const [ch, data] of [...worst, ...best]) {
        const gapEmoji = data.coverage < 50 ? '🔴' : data.coverage < 70 ? '🟡' : '🟠';
        console.log(`║   ${gapEmoji} Cap ${ch.padStart(2)}: ${data.tokens} t | Translit: ${data.translit} | Real PT: ${data.manualPT + data.glossary} | Gaps: ${data.gaps}     ║`);
      }
      console.log(`║   ... e mais ${lowChapters.length - 5} capítulos com coverage < 70%                        ║`);
    }
  }

  const translitOnly = totalWithTranslit;
  const realPTCount = totalWithManualPT + totalWithGlossary;
  const glossaryOnly = totalWithGlossary;
  const overallCoverage = ((realPTCount / totalTokens) * 100).toFixed(1);
  console.log('╠══════════════════════════════════════════════════════════════════════════════════════════════════════╣');
  console.log(`║ 📖 TOTAL: ${totalTokens.toLocaleString()} tokens | Translit only: ${String(translitOnly).padStart(5)} | Real PT: ${String(realPTCount).padStart(5)} | Gaps: ${String(totalGaps).padStart(5)} | Cov: ${overallCoverage}% ║`);
  console.log('╚══════════════════════════════════════════════════════════════════════════════════════════════════════╝');

  console.log('\n📋 TOP 10 CAPÍTULOS COM MENOS COBERTURA:');
  const allChapters = [];
  for (const book of BOOKS) {
    for (const [ch, data] of Object.entries(stats[book].chapters)) {
      allChapters.push({ book, chapter: parseInt(ch), ...data });
    }
  }

  allChapters
    .sort((a, b) => a.coverage - b.coverage)
    .slice(0, 10)
    .forEach(({ book, chapter, tokens, coverage, gaps, translit, manualPT, glossary }) => {
      const pct = coverage < 50 ? '🔴' : coverage < 70 ? '🟡' : '🟠';
      const realPT = manualPT + glossary;
      console.log(`  ${pct} ${BOOK_NAMES[book]} ${chapter} - ${tokens} tokens, ${coverage}% real PT, Translit: ${translit}, Gaps: ${gaps}`);
    });

  console.log('\n📋 TOP 10 CAPÍTULOS COM MELHOR COBERTURA:');
  allChapters
    .sort((a, b) => b.coverage - a.coverage)
    .slice(0, 10)
    .forEach(({ book, chapter, tokens, coverage, manualPT, glossary }) => {
      const realPT = manualPT + glossary;
      console.log(`  🟢 ${BOOK_NAMES[book]} ${chapter} - ${tokens} tokens, ${coverage}% real PT (manual: ${manualPT}, glossary: ${glossary})`);
    });

  console.log(`\n💡 RESUMO:`);
  console.log(`   - Translit only (sem PT real): ${translitOnly.toLocaleString()} tokens (${((translitOnly/totalTokens)*100).toFixed(1)}%)`);
  console.log(`   - Com glossário mas sem interlinear manual: ${(totalWithGlossary - totalWithManualPT).toLocaleString()} tokens`);
  console.log(`   - Gaps (sem PT de nenhuma fonte): ${totalGaps.toLocaleString()} tokens`);

  return stats;
}

analyze();