"use server";

import { getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

export interface TableInfo {
    name: string;
    rowCount: number;
}

export interface ColumnInfo {
    name: string;
    type: string;
    nullable: boolean;
}

export interface TableData {
    columns: ColumnInfo[];
    rows: Record<string, unknown>[];
    totalRows: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

interface TableRow {
    name: string;
    row_count: string | number;
}

interface ColumnRow {
    name: string;
    type: string;
    nullable: boolean;
}

/**
 * Récupère la liste de toutes les tables du schéma public
 */
/**
 * Récupère la liste de toutes les tables du schéma public
 */
export async function getTables(): Promise<TableInfo[]> {
    const db = getDb();

    // Get table names first
    const tablesResult = await db.execute(sql`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
        ORDER BY table_name
    `);

    const tables = tablesResult as unknown as { table_name: string }[];
    const result: TableInfo[] = [];

    // Get count for each table safely
    for (const t of tables) {
        try {
            const countResult = await db.execute(
                sql.raw(`SELECT COUNT(*) as count FROM "${t.table_name}"`)
            );
            const countRow = countResult as unknown as { count: string | number }[];
            result.push({
                name: t.table_name,
                rowCount: Number(countRow[0]?.count) || 0
            });
        } catch {
            result.push({
                name: t.table_name,
                rowCount: 0
            });
        }
    }

    return result;
}

/**
 * Récupère les colonnes d'une table
 */
export async function getTableColumns(tableName: string): Promise<ColumnInfo[]> {
    const db = getDb();

    // Validate table name to prevent SQL injection
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
        throw new Error("Nom de table invalide");
    }

    const result = await db.execute(sql`
    SELECT 
      column_name as name,
      data_type as type,
      is_nullable = 'YES' as nullable
    FROM information_schema.columns
    WHERE table_schema = 'public' 
      AND table_name = ${tableName}
    ORDER BY ordinal_position
  `);

    return (result as unknown as ColumnRow[]).map((row) => ({
        name: row.name,
        type: row.type,
        nullable: Boolean(row.nullable),
    }));
}

/**
 * Récupère les données d'une table avec pagination
 */
export async function getTableData(
    tableName: string,
    page: number = 1,
    pageSize: number = 25
): Promise<TableData> {
    const db = getDb();

    // Validate table name to prevent SQL injection
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
        throw new Error("Nom de table invalide");
    }

    // Get columns first
    const columns = await getTableColumns(tableName);

    // Get total count
    const countResult = await db.execute(
        sql.raw(`SELECT COUNT(*) as count FROM "${tableName}"`)
    );
    const countRow = countResult as unknown as { count: string | number }[];
    const totalRows = Number(countRow[0]?.count) || 0;
    const totalPages = Math.ceil(totalRows / pageSize);

    // Get paginated data
    const offset = (page - 1) * pageSize;
    const dataResult = await db.execute(
        sql.raw(`SELECT * FROM "${tableName}" ORDER BY 1 LIMIT ${pageSize} OFFSET ${offset}`)
    );

    return {
        columns,
        rows: dataResult as unknown as Record<string, unknown>[],
        totalRows,
        page,
        pageSize,
        totalPages,
    };
}
