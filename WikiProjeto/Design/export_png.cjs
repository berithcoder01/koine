const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const WIDTH = 1080;
const HEIGHT = 1080;

function generateCaptionTemplate(htmlPath) {
  const baseName = path.basename(htmlPath, '.html');
  const template = `# LEGENDA — ${baseName}

> **Arte:** ${baseName}.png
> **Status:** Aguardando preenchimento pelo Agente de Legenda
> **Gerado em:** ${new Date().toISOString().split('T')[0]}

---

## POST_TYPE

(Tipo A | B | C | D | E)

---

## CORPO

(TODO: Preencher com a legenda no tom oficial Koiné — ver ORQUESTRADOR_LEGENDA_v1.md)

---

## HASHTAGS

(TODO: 15-20 hashtags do banco oficial)

---

## METADADOS

- CONTAGEM_HASHTAGS: (preencher)
- TOM_APLICADO: educativo_devocional
- REFERENCIA_IMAGEM: ${baseName}.png
`;
  return template;
}

async function exportPNG(htmlPath, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Detecta slides (carrossel) ou imagem única
  const slideCount = await page.evaluate(() => {
    const slides = document.querySelectorAll('.slide[data-slide]');
    return slides.length || 1;
  });

  const baseName = path.basename(outputPath, '.png');

  if (slideCount > 1) {
    // Carrossel: exporta cada slide separadamente
    const outDir = path.dirname(outputPath);
    for (let i = 1; i <= slideCount; i++) {
      const slidePath = path.join(outDir, `${baseName}_slide${i}.png`);
      await page.screenshot({
        path: slidePath,
        type: 'png',
        clip: { x: 0, y: (i - 1) * HEIGHT, width: WIDTH, height: HEIGHT }
      });
      console.log(`  [OK] ${baseName}_slide${i}.png`);
    }
    // Também exporta a imagem completa (tall)
    const fullHeight = slideCount * HEIGHT;
    await page.setViewport({ width: WIDTH, height: fullHeight });
    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: { x: 0, y: 0, width: WIDTH, height: fullHeight }
    });
    console.log(`  [OK] ${path.basename(outputPath)} (full ${slideCount} slides)`);
  } else {
    // Imagem única
    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT }
    });
    console.log(`  [OK] ${path.basename(outputPath)}`);
  }

  await browser.close();
}

async function generateCaption(htmlPath, outputDir) {
  const baseName = path.basename(htmlPath, '.html');
  const mdPath = path.join(outputDir, baseName + '.md');

  if (fs.existsSync(mdPath)) {
    console.log(`  [SKIP] ${baseName}.md (already exists)`);
    return;
  }

  const content = generateCaptionTemplate(htmlPath);
  fs.writeFileSync(mdPath, content, 'utf-8');
  console.log(`  [MD]  ${baseName}.md`);
}

async function processFolder(folderPath, outputDir) {
  const htmlFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));
  if (htmlFiles.length === 0) {
    console.log(`  No HTML files in ${folderPath}`);
    return;
  }

  console.log(`Processing ${htmlFiles.length} files from ${path.basename(folderPath)}/`);

  for (const file of htmlFiles) {
    const htmlPath = path.join(folderPath, file);
    const pngPath = path.join(outputDir, file.replace('.html', '.png'));
    try {
      await exportPNG(htmlPath, pngPath);
      await generateCaption(htmlPath, outputDir);
    } catch (err) {
      console.error(`  [FAIL] ${file}: ${err.message}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const designDir = path.join(__dirname);
  const outputDir = path.join(designDir, 'output');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (args.length === 0) {
    // Sem args: processar apenas HTMLs preenchidos em output/
    await processFolder(outputDir, outputDir);
  } else {
    for (const arg of args) {
      const target = path.resolve(arg);
      if (fs.statSync(target).isDirectory()) {
        await processFolder(target, outputDir);
      } else {
        await exportPNG(target, path.join(outputDir, path.basename(target).replace(/\.html$/, '.png')));
        await generateCaption(target, outputDir);
      }
    }
  }

  console.log('\nDone.');
}

main().catch(console.error);
