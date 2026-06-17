// src/features/database/sqlite.ts
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SCHEMA_SQL } from './schema';

class DatabaseService {
  private sqlite: SQLiteConnection;
  private userDb: SQLiteDBConnection | null = null;
  private coreDb: SQLiteDBConnection | null = null;
  private userDbName = 'koine_user.db';
  private coreDbName = 'koine_core.db';
  private _ready = false;
  private _initPromise: Promise<void> | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initialize(): Promise<void> {
    if (this._initPromise) {
      try { await this._initPromise; return; } catch { /* fall through to retry */ }
    }
    this._initPromise = this._doInit();
    return this._initPromise;
  }

  private async _doInit(): Promise<void> {
    try {
      // ── COPY FROM ASSETS (for pre-populated core DB) ─────────────────
      try {
        console.log('[SQLite] Copying pre-populated databases from assets...');
        await this.sqlite.copyFromAssets(false);
        console.log('[SQLite] copyFromAssets completed');
      } catch (copyErr) {
        console.warn('[SQLite] copyFromAssets failed (normal on Web):', copyErr);
      }

      // ── USER DB (koine_user.db) ──────────────────────────────────────
      console.log('[SQLite] Step 1/8: checking user DB consistency...');
      let hasUserDb = false;
      try {
        const retCC = await this.sqlite.checkConnectionsConsistency();
        const isConnRes = await this.sqlite.isConnection(this.userDbName, false);
        hasUserDb = !!(retCC?.result && isConnRes?.result);
      } catch (consistencyErr) {
        console.warn('[SQLite] User DB consistency check failed, will create new:', consistencyErr);
      }

      if (hasUserDb) {
        console.log('[SQLite] Step 2/8: retrieveConnection for user DB...');
        this.userDb = await this.sqlite.retrieveConnection(this.userDbName, false);
      } else {
        console.log('[SQLite] Step 2/8: createConnection for user DB...');
        this.userDb = await this.sqlite.createConnection(
          this.userDbName, false, 'no-encryption', 1, false,
        );
      }

      if (this.userDb) {
        console.log('[SQLite] Step 3/8: open user DB...');
        try {
          const openResult = await this.userDb.isDBOpen();
          if (!openResult?.result) {
            await this.userDb.open();
          }
        } catch (openErr) {
          console.warn('[SQLite] User DB open check failed, trying open() directly...');
          await this.userDb.open();
        }
      } else {
        console.error('[SQLite] userDb is null after user DB connection step');
      }

      // ── CORE DB (koine_core.db — read-only, pre-populated in APK) ───
      console.log('[SQLite] Step 4/8: checking core DB consistency...');
      let hasCoreDb = false;
      try {
        const retCC = await this.sqlite.checkConnectionsConsistency();
        const isConnRes = await this.sqlite.isConnection(this.coreDbName, false);
        hasCoreDb = !!(retCC?.result && isConnRes?.result);
      } catch (consistencyErr) {
        console.warn('[SQLite] Core DB consistency check failed:', consistencyErr);
      }

      if (hasCoreDb) {
        console.log('[SQLite] Step 5/8: retrieveConnection for core DB...');
        this.coreDb = await this.sqlite.retrieveConnection(this.coreDbName, false);
      } else {
        console.log('[SQLite] Step 5/8: copyFromAssets + createConnection for core DB...');
        try {
          await this.sqlite.copyFromAssets(true);
        } catch (copyErr) {
          console.warn('[SQLite] copyFromAssets failed:', copyErr);
        }
        try {
          this.coreDb = await this.sqlite.createConnection(
            this.coreDbName, false, 'no-encryption', 1, false,
          );
        } catch (coreErr) {
          console.warn('[SQLite] Core DB createConnection failed after copyFromAssets:', coreErr);
          this.coreDb = null;
        }
      }

      if (this.coreDb) {
        console.log('[SQLite] Step 6/8: open core DB...');
        try {
          const openResult = await this.coreDb.isDBOpen();
          if (!openResult?.result) {
            await this.coreDb.open();
          }
        } catch (openErr) {
          console.warn('[SQLite] Core DB open check failed, trying open() directly...');
          await this.coreDb.open();
        }
      } else {
        console.warn('[SQLite] coreDb is null — koine_core.db not found. NT data will be unavailable.');
      }

      // ── SCHEMA (only on user DB — core DB schema is already correct) ─
      console.log('[SQLite] Step 7/8: creating schema on user DB...');
      await this.createSchema(this.userDb);
      this._ready = true;
      console.log('[SQLite] Step 8/8: ready = true');
    } catch (error) {
      this._ready = false;
      this._initPromise = null;
      console.error('[SQLite] Initialization failed, _initPromise reset for retry:', error);
      throw error;
    }
  }

  async retryInit(): Promise<void> {
    this._initPromise = null;
    this._ready = false;
    this.userDb = null;
    this.coreDb = null;
    return this.initialize();
  }

  get isReady(): boolean {
    return this._ready;
  }

  async waitForReady(): Promise<void> {
    if (this._ready) return;

    if (this._initPromise) {
      try { await this._initPromise; return; } catch {
        console.warn('[SQLite] Previous init failed, retrying initialization...');
        this._initPromise = null;
        this._ready = false;
      }
    }

    if (!this._initPromise) {
      console.log('[SQLite] waitForReady triggering initialization...');
      await this.initialize();
      if (!this._ready) {
        throw new Error('Database not ready after initialization');
      }
    }
  }

  getDB(): SQLiteDBConnection {
    if (!this.userDb) throw new Error('User database not initialized');
    return this.userDb;
  }

  getCoreDB(): SQLiteDBConnection {
    if (!this.coreDb) throw new Error('Core database not initialized — koine_core.db may be missing from APK assets');
    return this.coreDb;
  }

  get isCoreDbReady(): boolean {
    return this.coreDb !== null;
  }

  async close(): Promise<void> {
    if (this.userDb) {
      await this.sqlite.closeConnection(this.userDbName, false);
      this.userDb = null;
    }
    if (this.coreDb) {
      await this.sqlite.closeConnection(this.coreDbName, false);
      this.coreDb = null;
    }
    this._ready = false;
  }

  private async createSchema(db: SQLiteDBConnection): Promise<void> {
    try {
      await db.query('PRAGMA journal_mode=WAL;');
      await db.query('PRAGMA foreign_keys=ON;');
    } catch (pragmaErr) {
      console.warn('[SQLite] PRAGMA setup failed, attempting to continue:', pragmaErr);
    }
    await db.execute(SCHEMA_SQL);
  }
}

export const databaseService = new DatabaseService();