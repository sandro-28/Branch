"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

import { executeSQL, type SQLResult } from "@/lib/actions/sql";
import { useQueryHistory } from "@/lib/hooks/use-query-history";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Play,
    Clock,
    AlertCircle,
    Terminal,
    Rows,
    History,
    Trash2,
    X,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dynamic import for Monaco Editor (client-side only)
const Editor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
    loading: () => <Skeleton className="h-[200px] w-full" />,
});

const DEFAULT_QUERY = `-- Écrivez votre requête SQL ici
-- Ctrl+Enter (ou Cmd+Enter) pour exécuter

SELECT * FROM "user" LIMIT 10;`;

export function SQLConsoleClient() {
    const [query, setQuery] = useState(DEFAULT_QUERY);
    const [result, setResult] = useState<SQLResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { history, addQuery, clearHistory } = useQueryHistory();

    const runQuery = useCallback(async () => {
        if (!query.trim()) {
            toast.error("La requête est vide");
            return;
        }

        setIsLoading(true);
        try {
            const res = await executeSQL(query);
            setResult(res);

            // Save to history
            addQuery(query, res.rowCount, !!res.error);

            if (res.error) {
                toast.error("Erreur SQL", { description: res.error });
            } else {
                toast.success(`${res.rowCount} ligne(s) retournée(s)`);
            }
        } catch {
            toast.error("Erreur lors de l'exécution");
        } finally {
            setIsLoading(false);
        }
    }, [query, addQuery]);

    const handleEditorMount = useCallback((editor: unknown) => {
        const monacoEditor = editor as { addCommand: (keybinding: number, handler: () => void) => void };
        monacoEditor.addCommand(2048 + 3, () => {
            runQuery();
        });
    }, [runQuery]);

    const loadFromHistory = (historyQuery: string) => {
        setQuery(historyQuery);
        toast.success("Requête chargée depuis l'historique");
    };

    const formatCellValue = (value: unknown): string => {
        if (value === null) return "NULL";
        if (value === undefined) return "";
        if (typeof value === "object") {
            if (value instanceof Date) return value.toISOString();
            return JSON.stringify(value);
        }
        return String(value);
    };

    const formatDate = (isoDate: string) => {
        return new Date(isoDate).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const truncateQuery = (q: string, maxLength: number = 50) => {
        const firstLine = q.split("\n").find((line) => !line.trim().startsWith("--"))?.trim() || q.trim();
        return firstLine.length > maxLength ? firstLine.substring(0, maxLength) + "..." : firstLine;
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Terminal className="h-8 w-8" />
                    SQL Console
                </h1>
                <p className="text-muted-foreground">
                    Exécutez des requêtes SQL directement sur votre base de données
                </p>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 md:grid-cols-[1fr_280px] flex-1">
                {/* Left: Editor + Results */}
                <div className="space-y-6 flex flex-col">
                    {/* Editor */}
                    <Card className="flex-shrink-0">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-base">Requête</CardTitle>
                                    <CardDescription>
                                        Ctrl+Enter pour exécuter
                                    </CardDescription>
                                </div>
                                <Button onClick={runQuery} disabled={isLoading}>
                                    <Play className="h-4 w-4 mr-2" />
                                    {isLoading ? "Exécution..." : "Exécuter"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-md overflow-hidden">
                                <Editor
                                    height="200px"
                                    language="sql"
                                    theme="vs-dark"
                                    value={query}
                                    onChange={(value) => setQuery(value || "")}
                                    onMount={handleEditorMount}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        lineNumbers: "on",
                                        scrollBeyondLastLine: false,
                                        wordWrap: "on",
                                        tabSize: 2,
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="flex-1 overflow-hidden flex flex-col">
                        <CardHeader className="pb-3 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Résultats</CardTitle>
                                {result && !result.error && (
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Badge variant="secondary" className="gap-1">
                                            <Rows className="h-3 w-3" />
                                            {result.rowCount} ligne(s)
                                        </Badge>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {result.executionTime}ms
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-auto">
                            {!result ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                    <Terminal className="h-12 w-12 mb-4 opacity-50" />
                                    <p>Exécutez une requête pour voir les résultats</p>
                                </div>
                            ) : result.error ? (
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Erreur SQL</p>
                                        <p className="text-sm mt-1 font-mono">{result.error}</p>
                                    </div>
                                </div>
                            ) : result.rows.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                    <p>Requête exécutée avec succès (0 lignes retournées)</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {result.columns.map((col) => (
                                                    <TableHead key={col} className="whitespace-nowrap font-medium">
                                                        {col}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {result.rows.map((row, rowIndex) => (
                                                <TableRow key={rowIndex}>
                                                    {result.columns.map((col) => (
                                                        <TableCell key={col} className="font-mono text-sm">
                                                            <span
                                                                className={cn(
                                                                    row[col] === null && "text-muted-foreground italic"
                                                                )}
                                                            >
                                                                {formatCellValue(row[col])}
                                                            </span>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right: History Sidebar */}
                <Card className="h-fit max-h-[600px] flex flex-col">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                                <History className="h-4 w-4" />
                                Historique
                            </CardTitle>
                            {history.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearHistory}
                                    className="h-8 px-2 text-muted-foreground hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <CardDescription>
                            {history.length} requête(s) sauvegardée(s)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto">
                        {history.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                                <History className="h-8 w-8 mb-2 opacity-50" />
                                <p className="text-sm">Aucune requête dans l&apos;historique</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {history.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => loadFromHistory(item.query)}
                                        className={cn(
                                            "w-full text-left p-3 rounded-md border transition-colors",
                                            "hover:bg-accent hover:border-accent-foreground/20",
                                            item.query === query && "bg-accent border-primary/50"
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <code className="text-xs font-mono line-clamp-2">
                                                {truncateQuery(item.query)}
                                            </code>
                                            {item.error ? (
                                                <X className="h-3 w-3 text-destructive flex-shrink-0" />
                                            ) : (
                                                <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {formatDate(item.executedAt)}
                                            {item.rowCount !== undefined && !item.error && (
                                                <>
                                                    <span>•</span>
                                                    <span>{item.rowCount} lignes</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
