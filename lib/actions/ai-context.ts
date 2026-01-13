"use server";

import { getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

interface ColumnInfo {
    column_name: string;
    data_type: string;
    is_nullable: string;
    column_default: string | null;
}

interface TableInfo {
    table_name: string;
}

/**
 * Génère un contexte formaté Markdown pour les agents AI
 */
export async function generateAIContext(): Promise<string> {
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

    const lines: string[] = [
        "# Branch Project Context",
        "",
        "> ⚠️ **WARNING**: This context contains database schema information.",
        "> Do not share publicly.",
        "",
        `Generated: ${new Date().toISOString()}`,
        "",
        "---",
        "",
        "## Database Schema",
        "",
    ];

    for (const table of tables) {
        const tableName = table.table_name;

        // Get columns for this table
        const columnsResult = await db.execute(sql`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' 
        AND table_name = ${tableName}
      ORDER BY ordinal_position
    `);

        const columns = columnsResult as unknown as ColumnInfo[];

        lines.push(`### Table: \`${tableName}\``);
        lines.push("");
        lines.push("| Column | Type | Nullable | Default |");
        lines.push("|--------|------|----------|---------|");

        for (const col of columns) {
            const nullable = col.is_nullable === "YES" ? "✓" : "✗";
            const defaultVal = col.column_default
                ? `\`${col.column_default.substring(0, 30)}${col.column_default.length > 30 ? "..." : ""}\``
                : "-";
            lines.push(`| ${col.column_name} | ${col.data_type} | ${nullable} | ${defaultVal} |`);
        }

        lines.push("");
    }

    // Add instructions for AI
    lines.push("---");
    lines.push("");
    lines.push("## Instructions for AI Assistant");
    lines.push("");
    lines.push("You are an AI assistant helping with a **Branch** project.");
    lines.push("");
    lines.push("### Tech Stack");
    lines.push("- **Framework**: Next.js 15 (App Router)");
    lines.push("- **Database**: PostgreSQL (Supabase)");
    lines.push("- **ORM**: Drizzle ORM");
    lines.push("- **Auth**: Better-Auth");
    lines.push("- **UI**: Shadcn/UI + Tailwind CSS v4");
    lines.push("");
    lines.push("### Guidelines");
    lines.push("1. Use **Server Actions** for database operations (not API routes)");
    lines.push("2. Use **Drizzle ORM** syntax for queries");
    lines.push("3. All queries should use **prepared statements** to prevent SQL injection");
    lines.push("4. Use the `getDb()` helper to get a database connection");
    lines.push("5. Always check user authentication before database operations");
    lines.push("");
    lines.push("### Example Query");
    lines.push("```typescript");
    lines.push('import { getDb } from "@/lib/db";');
    lines.push('import { projects } from "@/lib/schema";');
    lines.push('import { eq } from "drizzle-orm";');
    lines.push("");
    lines.push("const db = getDb();");
    lines.push("const result = await db");
    lines.push("  .select()");
    lines.push("  .from(projects)");
    lines.push('  .where(eq(projects.userId, "user-id"))');
    lines.push("  .limit(10);");
    lines.push("```");
    lines.push("");

    return lines.join("\n");
}
