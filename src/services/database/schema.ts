// src/services/database/schema.ts
export const SCHEMA_SQL = `
  PRAGMA journal_mode=WAL;
  PRAGMA foreign_keys=ON;

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
    gloss_pt    TEXT,
    FOREIGN KEY (lemma) REFERENCES vocabulary(lemma)
  );

  CREATE INDEX IF NOT EXISTS idx_nt_reference
    ON nt_text (book_abbr, chapter, verse);

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

  CREATE TABLE IF NOT EXISTS srs_cards (
    word_id       TEXT PRIMARY KEY,
    token         TEXT NOT NULL,
    gloss_pt      TEXT NOT NULL,
    interval_days INTEGER DEFAULT 1,
    ease_factor   REAL DEFAULT 2.5,
    repetitions   INTEGER DEFAULT 0,
    next_review   TEXT NOT NULL,
    status        TEXT DEFAULT 'aprendendo',
    last_reviewed TEXT
  );

  CREATE TABLE IF NOT EXISTS audio_cache (
    id          TEXT PRIMARY KEY,
    remote_url  TEXT NOT NULL,
    local_path  TEXT NOT NULL,
    downloaded  INTEGER DEFAULT 0,
    size_bytes  INTEGER DEFAULT 0,
    cycle_id    INTEGER
  );

  CREATE TABLE IF NOT EXISTS user_settings (
    key     TEXT PRIMARY KEY,
    value   TEXT NOT NULL
  );
`;
