import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";
import * as schema from "./schema";

// Type pour la base de données
export type Database = PostgresJsDatabase<typeof schema>;

// Singleton pattern
let client: Sql | null = null;
let db: Database | null = null;

/**
 * Récupère l'instance de la base de données (lazy initialization)
 * @throws Error si DATABASE_URL n'est pas défini
 */
export function getDb(): Database {
  if (!db) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      console.error("❌ DATABASE_URL missing in process.env");
      throw new Error(
        "DATABASE_URL is not defined. Please set it in your .env.local file."
      );
    }

    client = postgres(connectionString, {
      prepare: false, // Désactivé pour compatibilité Supabase
    });

    db = drizzle(client, { schema });
  }

  return db;
}
