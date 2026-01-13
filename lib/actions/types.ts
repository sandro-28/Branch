"use server";

import { getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

// PostgreSQL to TypeScript type mapping
const TYPE_MAP: Record<string, string> = {
    // Strings
    uuid: "string",
    text: "string",
    varchar: "string",
    "character varying": "string",
    char: "string",
    character: "string",
    name: "string",
    citext: "string",

    // Numbers
    integer: "number",
    int: "number",
    int4: "number",
    smallint: "number",
    int2: "number",
    bigint: "number",
    int8: "number",
    decimal: "number",
    numeric: "number",
    real: "number",
    float4: "number",
    "double precision": "number",
    float8: "number",
    serial: "number",
    bigserial: "number",

    // Booleans
    boolean: "boolean",
    bool: "boolean",

    // Dates
    timestamp: "Date",
    "timestamp with time zone": "Date",
    "timestamp without time zone": "Date",
    timestamptz: "Date",
    date: "string", // ISO date string
    time: "string", // Time string
    "time with time zone": "string",
    "time without time zone": "string",
    interval: "string",

    // JSON
    json: "unknown",
    jsonb: "Record<string, unknown>",

    // Arrays
    "ARRAY": "unknown[]",

    // Other
    bytea: "Buffer",
    inet: "string",
    cidr: "string",
    macaddr: "string",
    point: "{ x: number; y: number }",
    line: "string",
    lseg: "string",
    box: "string",
    path: "string",
    polygon: "string",
    circle: "string",
};

interface ColumnInfo {
    column_name: string;
    data_type: string;
    udt_name: string;
    is_nullable: string;
}

interface TableInfo {
    table_name: string;
}

/**
 * Convertit un nom de table en PascalCase pour le nom de l'interface
 */
function toPascalCase(str: string): string {
    return str
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
}

/**
 * Convertit un type PostgreSQL en type TypeScript
 */
function mapType(pgType: string, udtName: string): string {
    // Check for user-defined types (enums)
    if (pgType === "USER-DEFINED") {
        // For enums, we'd need to fetch enum values, for now return string
        return "string";
    }

    // Check for arrays
    if (pgType === "ARRAY") {
        const baseType = udtName.replace(/^_/, ""); // Remove leading underscore
        const mappedBase = TYPE_MAP[baseType] || "unknown";
        return `${mappedBase}[]`;
    }

    return TYPE_MAP[pgType] || TYPE_MAP[pgType.toLowerCase()] || "unknown";
}

/**
 * Génère les types TypeScript depuis le schéma de la base de données
 */
export async function generateTypes(): Promise<{ types: string; tableCount: number }> {
    const db = getDb();

    // Get all tables
    const tablesResult = await db.execute(sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);

    const tables = tablesResult as unknown as TableInfo[];

    if (tables.length === 0) {
        return { types: "// No tables found in public schema", tableCount: 0 };
    }

    const interfaces: string[] = [
        "// Auto-generated TypeScript types from PostgreSQL schema",
        `// Generated at: ${new Date().toISOString()}`,
        "",
    ];

    for (const table of tables) {
        const tableName = table.table_name;

        // Get columns for this table
        const columnsResult = await db.execute(sql`
      SELECT 
        column_name,
        data_type,
        udt_name,
        is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' 
        AND table_name = ${tableName}
      ORDER BY ordinal_position
    `);

        const columns = columnsResult as unknown as ColumnInfo[];

        const interfaceName = toPascalCase(tableName);
        interfaces.push(`export interface ${interfaceName} {`);

        for (const col of columns) {
            const tsType = mapType(col.data_type, col.udt_name);
            const nullable = col.is_nullable === "YES" ? " | null" : "";
            interfaces.push(`  ${col.column_name}: ${tsType}${nullable};`);
        }

        interfaces.push("}");
        interfaces.push("");
    }

    return {
        types: interfaces.join("\n"),
        tableCount: tables.length,
    };
}
