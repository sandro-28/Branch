"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import {
    getExportableTables,
    exportTableCSV,
    exportTableJSON,
} from "@/lib/actions/export";

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HardDrive, Download, FileSpreadsheet, FileJson, Loader2 } from "lucide-react";

export function ExportClient() {
    const [tables, setTables] = useState<string[]>([]);
    const [selectedTable, setSelectedTable] = useState<string>("");
    const [isLoadingTables, setIsLoadingTables] = useState(true);
    const [isExporting, setIsExporting] = useState<"csv" | "json" | null>(null);

    useEffect(() => {
        async function loadTables() {
            try {
                const tableList = await getExportableTables();
                setTables(tableList);
                if (tableList.length > 0) {
                    setSelectedTable(tableList[0]);
                }
            } catch {
                toast.error("Erreur lors du chargement des tables");
            } finally {
                setIsLoadingTables(false);
            }
        }
        loadTables();
    }, []);

    const triggerDownload = (content: string, filename: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportCSV = useCallback(async () => {
        if (!selectedTable) return;

        setIsExporting("csv");
        try {
            const result = await exportTableCSV(selectedTable);

            if (result.rowCount === 0) {
                toast.warning("La table est vide");
            } else {
                triggerDownload(result.content, result.filename, "text/csv;charset=utf-8");
                toast.success(`${result.rowCount} lignes exportées`, {
                    description: result.filename,
                });
            }
        } catch {
            toast.error("Erreur lors de l'export CSV");
        } finally {
            setIsExporting(null);
        }
    }, [selectedTable]);

    const handleExportJSON = useCallback(async () => {
        if (!selectedTable) return;

        setIsExporting("json");
        try {
            const result = await exportTableJSON(selectedTable);

            if (result.rowCount === 0) {
                toast.warning("La table est vide");
            } else {
                triggerDownload(result.content, result.filename, "application/json;charset=utf-8");
                toast.success(`${result.rowCount} lignes exportées`, {
                    description: result.filename,
                });
            }
        } catch {
            toast.error("Erreur lors de l'export JSON");
        } finally {
            setIsExporting(null);
        }
    }, [selectedTable]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <HardDrive className="h-8 w-8" />
                    Backups & Exports
                </h1>
                <p className="text-muted-foreground">
                    Exportez vos données en CSV ou JSON
                </p>
            </div>

            {/* Export Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Exporter une table</CardTitle>
                    <CardDescription>
                        Sélectionnez une table et choisissez le format d&apos;export
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Table Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Table</label>
                        <Select
                            value={selectedTable}
                            onValueChange={setSelectedTable}
                            disabled={isLoadingTables}
                        >
                            <SelectTrigger className="w-full max-w-sm">
                                <SelectValue placeholder="Sélectionner une table" />
                            </SelectTrigger>
                            <SelectContent>
                                {tables.map((table) => (
                                    <SelectItem key={table} value={table}>
                                        {table}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Export Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={handleExportCSV}
                            disabled={!selectedTable || isExporting !== null}
                            variant="outline"
                        >
                            {isExporting === "csv" ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <FileSpreadsheet className="h-4 w-4 mr-2" />
                            )}
                            Export CSV
                        </Button>
                        <Button
                            onClick={handleExportJSON}
                            disabled={!selectedTable || isExporting !== null}
                            variant="outline"
                        >
                            {isExporting === "json" ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <FileJson className="h-4 w-4 mr-2" />
                            )}
                            Export JSON
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Informations
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">Limite</Badge>
                        <span>Maximum 10,000 lignes par export</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">Encodage</Badge>
                        <span>UTF-8</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">Format CSV</Badge>
                        <span>Compatible Excel, Google Sheets, LibreOffice</span>
                    </div>
                    <p className="pt-2">
                        Pour des exports complets de la base de données, utilisez
                        <code className="mx-1 px-1 bg-muted rounded">pg_dump</code>
                        via Coolify ou Supabase.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
