// src/services/database/schema.ts
export const SCHEMA_SQL = `
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

  CREATE INDEX IF NOT EXISTS idx_strong_greek
    ON strong (greek);

  CREATE INDEX IF NOT EXISTS idx_strong_number
    ON strong (number);

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

  CREATE INDEX IF NOT EXISTS idx_content_module
    ON lesson_content (module_id, content_order);

  CREATE TABLE IF NOT EXISTS user_settings (
    key     TEXT PRIMARY KEY,
    value   TEXT NOT NULL
  );

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

  CREATE INDEX IF NOT EXISTS idx_learning_units_module
    ON learning_units (module_id, unit_order);

  CREATE TABLE IF NOT EXISTS unit_progress (
    id            TEXT PRIMARY KEY,
    unit_id       TEXT NOT NULL,
    user_id       TEXT NOT NULL,
    phase_reached INTEGER DEFAULT 1,
    phase2_score  REAL DEFAULT 0,
    phase3_score  REAL DEFAULT 0,
    phase4_score  REAL DEFAULT 0,
    phase5_score  REAL DEFAULT 0,
    overall_score REAL DEFAULT 0,
    mastery_level TEXT DEFAULT 'reinforcement',
    srs_enrolled  INTEGER DEFAULT 0,
    completed_at  TEXT,
    FOREIGN KEY (unit_id) REFERENCES learning_units(id)
  );

  CREATE TABLE IF NOT EXISTS nt_pt (
    book_abbr   TEXT NOT NULL,
    chapter     INTEGER NOT NULL,
    verse       INTEGER NOT NULL,
    text        TEXT NOT NULL,
    source      TEXT DEFAULT 'blivre',
    version     TEXT DEFAULT '2018-02',
    PRIMARY KEY (book_abbr, chapter, verse)
  );

  CREATE INDEX IF NOT EXISTS idx_ntpt_ref
    ON nt_pt (book_abbr, chapter);

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

  CREATE INDEX IF NOT EXISTS idx_interlinear_ref
    ON nt_interlinear (book_abbr, chapter, verse);

  CREATE TABLE IF NOT EXISTS typing_history (
    id         TEXT PRIMARY KEY,
    user_id    TEXT NOT NULL,
    word_greek TEXT NOT NULL,
    word_pt    TEXT,
    strongs_id TEXT,
    mode       TEXT NOT NULL,
    input      TEXT NOT NULL,
    is_correct INTEGER NOT NULL,
    score      REAL NOT NULL,
    session_id TEXT,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_typing_strongs ON typing_history(strongs_id);
  CREATE INDEX IF NOT EXISTS idx_typing_correct ON typing_history(user_id, is_correct);
`;
