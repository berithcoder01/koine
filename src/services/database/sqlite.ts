// src/services/database/sqlite.ts
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SCHEMA_SQL } from './schema';

class DatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private dbName = 'koineapp.db';

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initialize(): Promise<void> {
    try {
      const retCC = await this.sqlite.checkConnectionsConsistency();
      const isConn = (await this.sqlite.isConnection(this.dbName, false)).result;

      if (retCC.result && isConn) {
        this.db = await this.sqlite.retrieveConnection(this.dbName, false);
      } else {
        this.db = await this.sqlite.createConnection(
          this.dbName,
          false,
          'no-encryption',
          1,
          false,
        );
      }

      await this.db.open();
      await this.createSchema();
    } catch (error) {
      console.error('[SQLite] Initialization failed:', error);
      throw error;
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
    }
  }

  private async createSchema(): Promise<void> {
    const db = this.getDB();
    await db.execute(SCHEMA_SQL);
  }
}

export const databaseService = new DatabaseService();
