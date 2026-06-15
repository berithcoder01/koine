// src/tools/apostilaRunner.ts
// CLI: parse + validate + codegen para .apostila.md files.
//
// Uso:
//   tsx src/tools/apostilaRunner.ts C1-M01          (parseia + gera 1)
//   tsx src/tools/apostilaRunner.ts --all            (parseia + gera todos)
//   tsx src/tools/apostilaRunner.ts --validate C1-M01 (só valida)
//   tsx src/tools/apostilaRunner.ts --validate --all  (valida todos)

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseApostila, type ApostilaAST } from './apostilaParser';
import { validateApostila, type ValidationReport } from './apostilaValidator';
import { generateApostilaCode, type CodegenOutput } from './apostilaCodegen';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '..', '..');
const SOURCE_DIR = join(PROJECT_ROOT, 'WikiProjeto', 'Modulos');
const OUTPUT_DIR = join(PROJECT_ROOT, 'src', 'content', 'curriculum', 'generated');

interface RunResult {
  moduleId: string;
  status: 'generated' | 'validated' | 'failed' | 'skipped';
  validation?: ValidationReport;
  codegen?: CodegenOutput;
  error?: string;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const validateOnly = args.includes('--validate');
  const all = args.includes('--all');
  const target = args.find((a) => !a.startsWith('--'));

  if (!all && !target) {
    console.error('Uso: tsx src/tools/apostilaRunner.ts <C?-M??> | --all [--validate]');
    process.exit(1);
  }

  const moduleIds = all ? discoverModules() : [target!];
  if (moduleIds.length === 0) {
    console.error(`Nenhum .apostila.md encontrado em ${SOURCE_DIR}`);
    process.exit(1);
  }

  console.log(`[Runner] ${validateOnly ? 'Validando' : 'Processando'} ${moduleIds.length} módulo(s)...\n`);

  const results: RunResult[] = [];
  for (const id of moduleIds) {
    results.push(await processOne(id, validateOnly));
  }

  printSummary(results, validateOnly);

  const hasErrors = results.some((r) => r.status === 'failed' || (r.validation && r.validation.totalErrors > 0));
  process.exit(hasErrors ? 1 : 0);
}

function discoverModules(): string[] {
  if (!existsSync(SOURCE_DIR)) return [];
  const files = readdirSync(SOURCE_DIR).filter((f) => f.endsWith('.apostila.md'));
  return files
    .map((f) => f.replace(/\.apostila\.md$/, ''))
    .sort((a, b) => a.localeCompare(b));
}

async function processOne(moduleId: string, validateOnly: boolean): Promise<RunResult> {
  const sourcePath = join(SOURCE_DIR, `${moduleId}.apostila.md`);

  if (!existsSync(sourcePath)) {
    return {
      moduleId,
      status: 'failed',
      error: `Arquivo não encontrado: ${sourcePath}`,
    };
  }

  let ast: ApostilaAST;
  try {
    const content = readFileSync(sourcePath, 'utf-8');
    ast = parseApostila(content);
  } catch (err) {
    return {
      moduleId,
      status: 'failed',
      error: err instanceof Error ? err.message : String(err),
    };
  }

  const validation = validateApostila(ast);

  if (validateOnly) {
    return { moduleId, status: 'validated', validation };
  }

  if (validation.totalErrors > 0) {
    return {
      moduleId,
      status: 'skipped',
      validation,
      error: `${validation.totalErrors} erro(s) — geração bloqueada`,
    };
  }

  const codegen = generateApostilaCode(ast);
  const outPath = join(OUTPUT_DIR, codegen.fileName);

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  writeFileSync(outPath, codegen.sourceCode, 'utf-8');

  return { moduleId, status: 'generated', validation, codegen };
}

function printSummary(results: RunResult[], validateOnly: boolean): void {
  for (const r of results) {
    const tag = `[${r.status.toUpperCase().padEnd(9)}]`;
    console.log(`${tag} ${r.moduleId}`);
    if (r.error) console.log(`           ${r.error}`);
    if (r.validation) printValidation(r.validation);
    if (r.codegen) {
      console.log(`           → ${r.codegen.units.length} unidade(s) gerada(s) em ${r.codegen.fileName}`);
    }
    console.log('');
  }

  const totals = results.reduce(
    (acc, r) => {
      if (r.validation) {
        acc.errors += r.validation.totalErrors;
        acc.warnings += r.validation.totalWarnings;
        acc.info += r.validation.totalInfo;
      }
      return acc;
    },
    { errors: 0, warnings: 0, info: 0 }
  );

  console.log('─'.repeat(60));
  console.log(`Total: ${results.length} módulo(s) | ${totals.errors} erro(s) | ${totals.warnings} aviso(s) | ${totals.info} info`);
  if (!validateOnly) {
    const generated = results.filter((r) => r.status === 'generated').length;
    console.log(`Gerados: ${generated}/${results.length}`);
  }
}

function printValidation(report: ValidationReport): void {
  if (report.issues.length === 0) {
    console.log('           ✓ sem issues');
    return;
  }
  const grouped = groupBy(report.issues, (i) => i.severity);
  for (const [severity, issues] of Object.entries(grouped)) {
    for (const issue of issues) {
      const icon = severity === 'error' ? '✗' : severity === 'warning' ? '⚠' : 'ℹ';
      console.log(`           ${icon} [${issue.rule}] ${issue.location ?? ''} — ${issue.message}`);
    }
  }
}

function groupBy<T, K extends string>(items: T[], keyFn: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keyFn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}

main().catch((err) => {
  console.error('[Runner] Erro fatal:', err);
  process.exit(1);
});
