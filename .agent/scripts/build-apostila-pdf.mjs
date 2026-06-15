#!/usr/bin/env node
/**
 * build-apostila-pdf.mjs
 * Converte .apostila.md → PDF via Puppeteer
 *
 * Uso:
 *   node .agent/scripts/build-apostila-pdf.mjs WikiProjeto/Apostila/L01.apostila.md
 *   node .agent/scripts/build-apostila-pdf.mjs --all          # todas as lições
 *   node .agent/scripts/build-apostila-pdf.mjs --out-dir dist  # diretório de saída
 *
 * Saída: mesmo diretório do .md, com extensão .pdf
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { resolve, basename, dirname, join } from 'path';
import { marked } from 'marked';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CSS_PATH = resolve(import.meta.dirname, '..', 'templates', 'apostila.css');

function parseArgs() {
  const args = process.argv.slice(2);
  const files = [];
  let outDir = null;
  let all = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out-dir' && args[i + 1]) {
      outDir = args[++i];
    } else if (args[i] === '--all') {
      all = true;
    } else {
      files.push(args[i]);
    }
  }

  if (all) {
    const apostilaDir = resolve(process.cwd(), 'WikiProjeto', 'Apostila');
    if (existsSync(apostilaDir)) {
      const mdFiles = readdirSync(apostilaDir)
        .filter(f => f.endsWith('.apostila.md'))
        .map(f => join(apostilaDir, f));
      files.push(...mdFiles);
    }
  }

  return { files, outDir };
}

function extractMeta(markdown) {
  const meta = {};
  const lines = markdown.split('\n');
  for (const line of lines) {
    const match = line.match(/^\*\*(\w+):\*\*\s*(.+)/);
    if (match) {
      meta[match[1].toLowerCase()] = match[2].trim();
    }
  }
  return meta;
}

function buildHTML(markdown, css) {
  const html = marked.parse(markdown);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apostila Koine</title>
  <style>${css}</style>
</head>
<body>
${html}
</body>
</html>`;
}

async function generatePDF(htmlPath, outPath) {
  const puppeteer = await import('puppeteer-core');
  const browser = await puppeteer.default.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(120000);
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
    waitUntil: 'load',
  });

  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '2cm',
      bottom: '2.5cm',
      left: '2cm',
      right: '2cm',
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="width:100%;font-size:9pt;color:#666;text-align:center;padding:0 2cm;">
        <span>Koine — Apostila Coach</span>
        <span style="float:right;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `,
  });

  await browser.close();
  console.log(`  PDF gerado: ${outPath}`);
}

async function main() {
  const { files, outDir } = parseArgs();

  if (files.length === 0) {
    console.error('Uso: node build-apostila-pdf.mjs <arquivo.md> [--all] [--out-dir dir]');
    process.exit(1);
  }

  let css = '';
  if (existsSync(CSS_PATH)) {
    css = readFileSync(CSS_PATH, 'utf-8');
  } else {
    console.warn('WARNING: apostila.css não encontrado, usando estilo básico');
    css = 'body { font-family: serif; font-size: 12pt; line-height: 1.6; }';
  }

  for (const mdFile of files) {
    const absMd = resolve(mdFile);
    if (!existsSync(absMd)) {
      console.error(`Arquivo não encontrado: ${absMd}`);
      continue;
    }

    console.log(`Processando: ${basename(absMd)}`);
    const markdown = readFileSync(absMd, 'utf-8');
    const html = buildHTML(markdown, css);

    // Gerar HTML temporário para debug
    const baseName = basename(absMd, '.apostila.md');
    const dir = outDir ? resolve(outDir) : dirname(absMd);

    if (!existsSync(dir)) {
      const { mkdirSync } = await import('fs');
      mkdirSync(dir, { recursive: true });
    }

    const htmlPath = join(dir, `${baseName}.apostila.html`);
    const pdfPath = join(dir, `${baseName}.apostila.pdf`);

    writeFileSync(htmlPath, html, 'utf-8');
    console.log(`  HTML temporário: ${htmlPath}`);

    await generatePDF(htmlPath, pdfPath);
  }

  console.log('\nConversão concluída!');
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
