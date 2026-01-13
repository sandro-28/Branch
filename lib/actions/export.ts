"use server";

import { getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

const MAX_ROWS = 10000;

interface TableInfo {
    table_name: string;
}

/**
 * Récupère la liste des tables exportables
 */
export async function getExportableTables(): Promise<string[]> {
    const db = getDb();

    const result = await db.execute(sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);

    return (result as unknown as TableInfo[]).map((t) => t.table_name);
}

/**
 * Exporte les données d'une table en CSV
 */
export async function exportTableCSV(tableName: string): Promise<{
    content: string;
    rowCount: number;
    filename: string;
}> {
    // Validate table name
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
        throw new Error("Nom de table invalide");
    }

    const db = getDb();

    const result = await db.execute(
        sql.raw(`SELECT * FROM "${tableName}" LIMIT ${MAX_ROWS}`)
    );

    const rows = result as unknown as Record<string, unknown>[];

    if (rows.length === 0) {
        return {
            content: "",
            rowCount: 0,
            filename: `${tableName}_${Date.now()}.csv`,
        };
    }

    // Get headers
    const headers = Object.keys(rows[0]);

    // Escape CSV value
    const escapeCSV = (value: unknown): string => {
        if (value === null || value === undefined) return "";
        const str = typeof value === "object" ? JSON.stringify(value) : String(value);
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    // Build CSV
    const csvLines = [
        headers.join(","),
        ...rows.map((row) => headers.map((h) => escapeCSV(row[h])).join(",")),
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

    return {
        content: csvLines.join("\n"),
        rowCount: rows.length,
        filename: `${tableName}_${timestamp}.csv`,
    };
}

/**
 * Exporte les données d'une table en JSON
 */
export async function exportTableJSON(tableName: string): Promise<{
    content: string;
    rowCount: number;
    filename: string;
}> {
    // Validate table name
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
        throw new Error("Nom de table invalide");
    }

    const db = getDb();

    const result = await db.execute(
        sql.raw(`SELECT * FROM "${tableName}" LIMIT ${MAX_ROWS}`)
    );

    const rows = result as unknown as Record<string, unknown>[];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

    return {
        content: JSON.stringify(rows, null, 2),
        rowCount: rows.length,
        filename: `${tableName}_${timestamp}.json`,
    };
}
