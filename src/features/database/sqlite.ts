// src/services/database/sqlite.ts
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SCHEMA_SQL } from './schema';

class DatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private dbName = 'koineapp.db';
  private _ready = false;
  private _initPromise: Promise<void> | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initialize(): Promise<void> {
    if (this._initPromise) {
      // If previous init failed, reset so retry is possible
      try { await this._initPromise; return; } catch { /* fall through to retry */ }
    }
    this._initPromise = this._doInit();
    return this._initPromise;
  }

  private async _doInit(): Promise<void> {
    try {
      // Step 1-2: Try retrieving existing connection; if native plugin fails, skip to createConnection
      let hasExisting = false;
      try {
        console.log('[SQLite] Step 1/7: checkConnectionsConsistency...');
        const retCC = await this.sqlite.checkConnectionsConsistency();
        console.log('[SQLite] Step 2/7: isConnection...');
        const isConnRes = await this.sqlite.isConnection(this.dbName, false);
        hasExisting = !!(retCC?.result && isConnRes?.result);
      } catch (consistencyErr) {
        console.warn('[SQLite] Consistency check failed, will create new connection:', consistencyErr);
      }

      if (hasExisting) {
        console.log('[SQLite] Step 3/7: retrieveConnection...');
        this.db = await this.sqlite.retrieveConnection(this.dbName, false);
        console.log('[SQLite] Retrieved existing connection');
      } else {
        console.log('[SQLite] Step 3/7: createConnection...');
        this.db = await this.sqlite.createConnection(
          this.dbName, false, 'encryption', 1, false,
        );
        console.log('[SQLite] Created new connection');
      }

      if (this.db) {
        console.log('[SQLite] Step 4/7: isDBOpen...');
        try {
          const openResult = await this.db.isDBOpen();
          if (!openResult?.result) {
            console.log('[SQLite] Step 5/7: opening database...');
            await this.db.open();
          } else {
            console.log('[SQLite] Step 5/7: DB already open');
          }
        } catch (openErr) {
          console.warn('[SQLite] DB open check failed, trying open() directly...');
          await this.db.open();
        }

        console.log('[SQLite] Step 6/7: dropping nt_text and creating schema...');
        await this.db.execute('DROP TABLE IF EXISTS nt_text;');
        await this.createSchema();
        this._ready = true;
        console.log('[SQLite] Step 7/7: ready = true');
      } else {
        console.error('[SQLite] db is null after connection step');
      }
    } catch (error) {
      this._ready = false;
      this._initPromise = null; // Allow retry
      console.error('[SQLite] Initialization failed, _initPromise reset for retry:', error);
      throw error;
    }
  }

  async retryInit(): Promise<void> {
    this._initPromise = null;
    this._ready = false;
    this.db = null;
    return this.initialize();
  }

  get isReady(): boolean {
    return this._ready;
  }

  async waitForReady(): Promise<void> {
    if (this._ready) return;

    // If init previously failed, retry
    if (this._initPromise) {
      try { await this._initPromise; return; } catch {
        console.warn('[SQLite] Previous init failed, retrying initialization...');
        this._initPromise = null;
        this._ready = false;
      }
    }

    // First call or after reset — run initialization
    if (!this._initPromise) {
      console.log('[SQLite] waitForReady triggering initialization...');
      await this.initialize();
      if (!this._ready) {
        throw new Error('Database not ready after initialization');
      }
    }
  }

  getDB(): SQLiteDBConnection {
    if (!this.db) throw new Error('Database not initialized');
    return this.db;
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection(this.dbName, false);
      this.db = null;
      this._ready = false;
    }
  }

  private async createSchema(): Promise<void> {
    const db = this.getDB();
    // PRAGMAs must be executed outside of a transaction
    // Some PRAGMAs return values and must be called with query() on certain Android versions/drivers
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
