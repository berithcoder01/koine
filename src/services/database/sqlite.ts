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
    if (this._initPromise) return this._initPromise;
    this._initPromise = this._doInit();
    return this._initPromise;
  }

  private async _doInit(): Promise<void> {
    try {
      console.log('[SQLite] Starting initialization...');
      const retCC = await this.sqlite.checkConnectionsConsistency();
      const isConn = (await this.sqlite.isConnection(this.dbName, false)).result;

      if (retCC.result && isConn) {
        this.db = await this.sqlite.retrieveConnection(this.dbName, false);
        console.log('[SQLite] Retrieved existing connection');
      } else {
        this.db = await this.sqlite.createConnection(
          this.dbName,
          false,
          'no-encryption',
          1,
          false,
        );
        console.log('[SQLite] Created new connection');
      }

      try {
        const isOpen = (await this.db.isDBOpen()).result;
        if (!isOpen) {
          await this.db.open();
          console.log('[SQLite] Database opened');
        } else {
          console.log('[SQLite] Database was already open');
        }
      } catch (e) {
        console.warn('[SQLite] Database open bypassed (already open or checking failed):', e);
      }
      await this.db.execute('DROP TABLE IF EXISTS nt_text;');
      await this.createSchema();
      this._ready = true;
      console.log('[SQLite] Initialization complete, ready = true');
    } catch (error) {
      console.error('[SQLite] Initialization failed:', error);
      throw error;
    }
  }

  get isReady(): boolean {
    return this._ready;
  }

  async waitForReady(): Promise<void> {
    if (this._ready) return;
    if (this._initPromise) await this._initPromise;
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
    await db.execute(SCHEMA_SQL);
  }
}

export const databaseService = new DatabaseService();
