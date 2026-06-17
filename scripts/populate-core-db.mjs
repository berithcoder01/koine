import { readFileSync, mkdirSync, existsSync, cpSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const ASSETS_DIR = resolve(ROOT_DIR, 'src/assets');
const ANDROID_DB_DIR = resolve(ROOT_DIR, 'android/app/src/main/assets/databases');
const OUTPUT_DIR = resolve(ROOT_DIR, '.db-output');

function log(msg) {
  console.log(`[populate-core] ${msg}`);
}

function loadJson(filename) {
  const path = resolve(ASSETS_DIR, filename);
  log(`Carregando ${filename}...`);
  const raw = readFileSync(path, 'utf-8');
  return JSON.parse(raw);
}

function createSchema(db) {
  log('Criando schema...');
  db.exec(`
    CREATE TABLE IF NOT EXISTS letters (
      id          TEXT PRIMARY KEY,
      upper_case  TEXT NOT NULL,
      lower_case  TEXT NOT NULL,
      name        TEXT NOT NULL,
      sound       TEXT NOT NULL,
      audio_url   TEXT,
      svg_path    TEXT,
      letter_order INTEGER NOT NULL,
      frequency   TEXT NOT NULL DEFAULT 'alta',
      cycle       INTEGER NOT NULL DEFAULT 1,
      module      INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS vocabulary (
      id              TEXT PRIMARY KEY,
      token           TEXT NOT NULL,
      lemma           TEXT NOT NULL,
      strongs_id      TEXT,
      gloss_pt        TEXT NOT NULL,
      gloss_alt       TEXT,
      frequency       INTEGER DEFAULT 0,
      cycle_intro     INTEGER NOT NULL,
      module_intro    INTEGER NOT NULL,
      is_core         INTEGER DEFAULT 0,
      audio_url       TEXT,
      image_url       TEXT
    );

    CREATE TABLE IF NOT EXISTS nt_text (
      id          TEXT PRIMARY KEY,
      book_abbr   TEXT NOT NULL,
      book_name   TEXT NOT NULL,
      chapter     INTEGER NOT NULL,
      verse       INTEGER NOT NULL,
      position    INTEGER NOT NULL,
      token       TEXT NOT NULL,
      lemma       TEXT NOT NULL,
      strongs_id  TEXT,
      parsing     TEXT,
      gloss_pt    TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_nt_reference ON nt_text (book_abbr, chapter, verse);

    CREATE TABLE IF NOT EXISTS cycles (
      id          INTEGER PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT,
      trophy_verse TEXT NOT NULL,
      trophy_reference TEXT NOT NULL,
      is_premium  INTEGER DEFAULT 0,
      total_modules INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS modules (
      id          TEXT PRIMARY KEY,
      cycle_id    INTEGER NOT NULL,
      module_order INTEGER NOT NULL,
      title       TEXT NOT NULL,
      description TEXT,
      anchor_verse TEXT,
      anchor_reference TEXT,
      method_primary TEXT,
      xp_total    INTEGER DEFAULT 0,
      total_exercises INTEGER DEFAULT 0,
      FOREIGN KEY (cycle_id) REFERENCES cycles(id)
    );

    CREATE TABLE IF NOT EXISTS exercises (
      id              TEXT PRIMARY KEY,
      module_id       TEXT NOT NULL,
      exercise_order  INTEGER NOT NULL,
      type            TEXT NOT NULL,
      question_pt     TEXT,
      question_greek  TEXT,
      correct_answer  TEXT NOT NULL,
      options         TEXT,
      explanation     TEXT,
      hint_text       TEXT,
      image_url       TEXT,
      audio_url       TEXT,
      target_letter   TEXT,
      xp_reward       INTEGER DEFAULT 2,
      FOREIGN KEY (module_id) REFERENCES modules(id)
    );

    CREATE TABLE IF NOT EXISTS strong (
      id          TEXT PRIMARY KEY,
      number      INTEGER NOT NULL,
      greek       TEXT NOT NULL,
      translit    TEXT,
      pronunciation TEXT,
      pos         TEXT,
      origin      TEXT,
      definitions TEXT NOT NULL,
      name        TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_strong_greek ON strong (greek);
    CREATE INDEX IF NOT EXISTS idx_strong_number ON strong (number);

    CREATE TABLE IF NOT EXISTS lesson_content (
      id            TEXT PRIMARY KEY,
      module_id     TEXT NOT NULL,
      content_order INTEGER NOT NULL,
      type          TEXT NOT NULL,
      title         TEXT NOT NULL,
      body          TEXT NOT NULL,
      greek_example TEXT,
      strongs_refs  TEXT,
      FOREIGN KEY (module_id) REFERENCES modules(id)
    );
    CREATE INDEX IF NOT EXISTS idx_content_module ON lesson_content (module_id, content_order);

    CREATE TABLE IF NOT EXISTS learning_units (
      id                TEXT PRIMARY KEY,
      module_id         TEXT NOT NULL,
      unit_order        INTEGER NOT NULL,
      unit_type         TEXT NOT NULL,
      greek_form        TEXT NOT NULL,
      transliteration   TEXT,
      gloss_pt          TEXT NOT NULL,
      phonetic_sound    TEXT,
      explanation       TEXT NOT NULL,
      mnemonic_hint     TEXT,
      audio_url         TEXT,
      image_url         TEXT,
      context_verse     TEXT,
      context_reference TEXT,
      srs_key           TEXT NOT NULL UNIQUE,
      phase2_data       TEXT NOT NULL,
      phase3_data       TEXT NOT NULL,
      phase4_data       TEXT NOT NULL,
      phase5_data       TEXT,
      FOREIGN KEY (module_id) REFERENCES modules(id)
    );
    CREATE INDEX IF NOT EXISTS idx_learning_units_module ON learning_units (module_id, unit_order);

    CREATE TABLE IF NOT EXISTS nt_pt (
      book_abbr   TEXT NOT NULL,
      chapter     INTEGER NOT NULL,
      verse       INTEGER NOT NULL,
      text        TEXT NOT NULL,
      source      TEXT DEFAULT 'blivre',
      version     TEXT DEFAULT '2018-02',
      PRIMARY KEY (book_abbr, chapter, verse)
    );
    CREATE INDEX IF NOT EXISTS idx_ntpt_ref ON nt_pt (book_abbr, chapter);

    CREATE TABLE IF NOT EXISTS nt_interlinear (
      book_abbr    TEXT NOT NULL,
      chapter      INTEGER NOT NULL,
      verse        INTEGER NOT NULL,
      position     INTEGER NOT NULL,
      token_greek  TEXT NOT NULL,
      lemma        TEXT,
      strongs_id   TEXT,
      parsing      TEXT,
      gloss_pt     TEXT,
      gloss_source TEXT DEFAULT 'manual',
      PRIMARY KEY (book_abbr, chapter, verse, position)
    );
    CREATE INDEX IF NOT EXISTS idx_interlinear_ref ON nt_interlinear (book_abbr, chapter, verse);

    CREATE TABLE IF NOT EXISTS books_meta (
      abbr         TEXT PRIMARY KEY,
      name         TEXT NOT NULL,
      testament    TEXT NOT NULL,
      order_index  INTEGER NOT NULL,
      chapters     INTEGER NOT NULL
    );
  `);
}

function insertBatch(db, table, rows, columns, batchSize = 5000) {
  if (rows.length === 0) return;

  const placeholders = columns.map(() => '?').join(', ');
  const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
  const stmt = db.prepare(sql);

  let pos = 0;
  db.exec('BEGIN TRANSACTION');
  try {
    for (const row of rows) {
      stmt.run(...row);
      pos++;
      if (pos % batchSize === 0) {
        log(`  ${table}: inseridos ${pos}/${rows.length}`);
      }
    }
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  log(`  ${table}: inseridos ${pos}/${rows.length}`);
}

function populateStrong(db) {
  log('Populando strong...');
  const data = loadJson('strong.json');
  const rows = data.map(r => [
    r.id,
    r.number,
    r.greek,
    r.translit || null,
    r.pronunciation || null,
    r.pos || null,
    r.origin || null,
    JSON.stringify(r.definitions),
    r.name || null
  ]);
  insertBatch(db, 'strong', rows, ['id', 'number', 'greek', 'translit', 'pronunciation', 'pos', 'origin', 'definitions', 'name']);
  log(`  strong: ${data.length} registros`);
}

function populateNtText(db) {
  log('Populando nt_text...');
  const data = loadJson('nt_text.json');
  const rows = data.map(r => [r.id, r.book_abbr, r.book_name, r.chapter, r.verse, r.position, r.token, r.lemma, r.strongs_id || null, r.parsing || null, r.gloss_pt || null]);
  insertBatch(db, 'nt_text', rows, ['id', 'book_abbr', 'book_name', 'chapter', 'verse', 'position', 'token', 'lemma', 'strongs_id', 'parsing', 'gloss_pt']);
  log(`  nt_text: ${data.length} registros`);
}

function populateNtInterlinear(db) {
  log('Populando nt_interlinear...');
  const data = loadJson('nt_interlinear.json');
  const rows = data.map(r => [r.bookAbbr, r.ch, r.v, r.position, r.tokenGreek, r.lemma || null, r.strongsId || null, r.parsing || null, r.glossPT || null, r.glossSource || 'manual']);
  insertBatch(db, 'nt_interlinear', rows, ['book_abbr', 'chapter', 'verse', 'position', 'token_greek', 'lemma', 'strongs_id', 'parsing', 'gloss_pt', 'gloss_source']);
  log(`  nt_interlinear: ${data.length} registros`);
}

function populateNtPt(db) {
  log('Populando nt_pt...');
  const data = loadJson('nt_pt.json');
  const rows = data.map(r => [r.bookAbbr, r.ch, r.v, r.text, r.source || 'blivre', r.version || '2018-02']);
  insertBatch(db, 'nt_pt', rows, ['book_abbr', 'chapter', 'verse', 'text', 'source', 'version']);
  log(`  nt_pt: ${data.length} registros`);
}

function populateBooksMeta(db) {
  log('Populando books_meta...');
  const data = loadJson('books.json');
  const rows = data.map(r => [r.abbr, r.name, 'nt', r.order, r.totalChapters]);
  insertBatch(db, 'books_meta', rows, ['abbr', 'name', 'testament', 'order_index', 'chapters']);
  log(`  books_meta: ${data.length} registros`);
}

function validate(db) {
  log('Validando banco...');
  const checks = [
    { table: 'nt_text', expected: 137000 },
    { table: 'nt_interlinear', expected: 137000 },
    { table: 'nt_pt', expected: 7000 },
    { table: 'strong', expected: 5000 },
    { table: 'books_meta', expected: 27 },
  ];

  let allPassed = true;
  for (const { table, expected } of checks) {
    try {
      const stmt = db.prepare(`SELECT COUNT(*) as cnt FROM ${table}`);
      const row = stmt.get();
      const count = row ? Number(row.cnt ?? row[0]) : 0;
      const ok = count >= expected * 0.9;
      const status = ok ? 'OK' : 'BAIXA';
      log(`  ${table}: ${count.toLocaleString()} registros [${status}] ${ok ? '' : `(${Math.round(count / expected * 100)}% do esperado)`}`);
      if (!ok) allPassed = false;
    } catch (e) {
      log(`  ${table}: ERRO - ${e.message}`);
      allPassed = false;
    }
  }

  const spotChecks = [
    { sql: `SELECT gloss_pt FROM nt_interlinear WHERE book_abbr='JN' AND chapter=1 AND verse=1 AND position=1`, expected: 'em' },
    { sql: `SELECT greek FROM strong WHERE number=2424`, contains: 'Ιησους' },
    { sql: `SELECT text FROM nt_pt WHERE book_abbr='JN' AND chapter=1 AND verse=1`, contains: 'Palavra' },
  ];

  for (const check of spotChecks) {
    try {
      const stmt = db.prepare(check.sql);
      const row = stmt.get();
      const value = row ? (row[0] ?? Object.values(row)[0]) : null;
      if (check.expected && value !== check.expected) {
        log(`  SPOT FAIL: "${check.sql}" => "${value}" (esperado "${check.expected}")`);
        allPassed = false;
      } else if (check.contains && !String(value).toLowerCase().includes(check.contains.toLowerCase())) {
        log(`  SPOT FAIL: "${check.sql}" => "${value}" (deveria conter "${check.contains}")`);
        allPassed = false;
      } else {
        log(`  SPOT OK: ${check.sql.split('WHERE')[1].trim()} => "${value}"`);
      }
    } catch (e) {
      log(`  SPOT ERROR: ${check.sql} => ${e.message}`);
      allPassed = false;
    }
  }

  return allPassed;
}

function main() {
  log('Iniciando populate-core-db...');
  log(`Node version: ${process.version}`);
  log(`Assets dir: ${ASSETS_DIR}`);

  if (!existsSync(ASSETS_DIR)) {
    log(`ERRO: Diretorio de assets nao encontrado: ${ASSETS_DIR}`);
    process.exit(1);
  }

  mkdirSync(ANDROID_DB_DIR, { recursive: true });
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const dbPath = resolve(OUTPUT_DIR, 'koine_core.db');
  log(`Criando banco em: ${dbPath}`);

  const db = new DatabaseSync(dbPath);

  createSchema(db);

  try {
    populateStrong(db);
    populateNtText(db);
    populateNtInterlinear(db);
    populateNtPt(db);
    populateBooksMeta(db);

    log('Executando VACUUM...');
    db.exec('VACUUM');

    const valid = validate(db);

    db.close();

    const androidPath = resolve(ANDROID_DB_DIR, 'koine_core.db');
    cpSync(dbPath, androidPath, { overwrite: true });
    log(`Copiado para Android: ${androidPath}`);

    // Copiar para public/ (desenvolvimento web local)
    const publicDbDir = resolve(ROOT_DIR, 'public/assets/databases');
    if (!existsSync(publicDbDir)) {
      mkdirSync(publicDbDir, { recursive: true });
    }
    const publicPath = resolve(publicDbDir, 'koine_core.db');
    cpSync(dbPath, publicPath, { overwrite: true });
    log(`Copiado para public: ${publicPath}`);

    const stats = statSync(dbPath);
    log(`Tamanho final: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    if (valid) {
      log('SUCESSO — banco validado');
    } else {
      log('AVISO — banco criado mas com problemas na validacao');
    }
  } catch (e) {
    log(`ERRO: ${e.message}`);
    log(e.stack);
    db.close();
    process.exit(1);
  }
}

main();