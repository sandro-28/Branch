"use server";

import { getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

export interface SQLResult {
    columns: string[];
    rows: Record<string, unknown>[];
    rowCount: number;
    executionTime: number;
    error?: string;
}

/**
 * Exécute une requête SQL brute
 * @param query La requête SQL à exécuter
 * @returns Résultat avec colonnes, lignes, et temps d'exécution
 */
export async function executeSQL(query: string): Promise<SQLResult> {
    const startTime = Date.now();

    // Validation basique
    if (!query || query.trim().length === 0) {
        return {
            columns: [],
            rows: [],
            rowCount: 0,
            executionTime: 0,
            error: "La requête est vide",
        };
    }

    try {
        const db = getDb();

        // Exécuter la requête avec un timeout de 30s
        const result = await Promise.race([
            db.execute(sql.raw(query)),
            new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error("Timeout: requête trop longue (>30s)")), 30000)
            ),
        ]);

        const executionTime = Date.now() - startTime;
        const rows = result as unknown as Record<string, unknown>[];

        // Extraire les noms de colonnes du premier résultat
        const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

        return {
            columns,
            rows,
            rowCount: rows.length,
            executionTime,
        };
    } catch (error) {
        const executionTime = Date.now() - startTime;
        const errorMessage = error instanceof Error
            ? error.message
            : "Erreur inconnue lors de l'exécution";

        return {
            columns: [],
            rows: [],
            rowCount: 0,
            executionTime,
            error: errorMessage,
        };
    }
}
