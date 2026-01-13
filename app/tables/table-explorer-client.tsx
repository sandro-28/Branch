"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { getTableData, type TableInfo, type TableData } from "@/lib/actions/tables";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Database, TableIcon, ChevronLeft, ChevronRight, Rows } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableExplorerClientProps {
    tables: TableInfo[];
}

export function TableExplorerClient({ tables }: TableExplorerClientProps) {
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (selectedTable) {
            loadTableData(selectedTable, 1);
        }
    }, [selectedTable]);

    const loadTableData = async (tableName: string, newPage: number) => {
        setIsLoading(true);
        try {
            const data = await getTableData(tableName, newPage);
            setTableData(data);
            setPage(newPage);
        } catch (error) {
            toast.error("Erreur lors du chargement des données");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (selectedTable) {
            loadTableData(selectedTable, newPage);
        }
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Database className="h-8 w-8" />
                    Table Explorer
                </h1>
                <p className="text-muted-foreground">
                    Explorez les tables de votre base de données
                </p>
            </div>

            {/* Content */}
            <div className="grid gap-6 md:grid-cols-[280px_1fr]">
                {/* Table list sidebar */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Tables</CardTitle>
                        <CardDescription>{tables.length} tables trouvées</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {tables.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                                Aucune table trouvée
                            </p>
                        ) : (
                            tables.map((table) => (
                                <button
                                    key={table.name}
                                    onClick={() => setSelectedTable(table.name)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        selectedTable === table.name && "bg-accent text-accent-foreground"
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        <TableIcon className="h-4 w-4" />
                                        {table.name}
                                    </span>
                                    <Badge variant="secondary" className="text-xs">
                                        {table.rowCount}
                                    </Badge>
                                </button>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* Data area */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base">
                                    {selectedTable ? selectedTable : "Sélectionnez une table"}
                                </CardTitle>
                                {tableData && (
                                    <CardDescription className="flex items-center gap-1">
                                        <Rows className="h-3 w-3" />
                                        {tableData.totalRows} lignes • {tableData.columns.length} colonnes
                                    </CardDescription>
                                )}
                            </div>
                            {tableData && tableData.totalPages > 1 && (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page <= 1 || isLoading}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Page {page} / {tableData.totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page >= tableData.totalPages || isLoading}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {!selectedTable ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                <Database className="h-12 w-12 mb-4 opacity-50" />
                                <p>Sélectionnez une table pour voir son contenu</p>
                            </div>
                        ) : isLoading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-10 w-full" />
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        ) : tableData && tableData.rows.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                <TableIcon className="h-12 w-12 mb-4 opacity-50" />
                                <p>Cette table est vide</p>
                            </div>
                        ) : tableData ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {tableData.columns.map((col) => (
                                                <TableHead key={col.name} className="whitespace-nowrap">
                                                    <div>
                                                        <span className="font-medium">{col.name}</span>
                                                        <span className="ml-2 text-xs text-muted-foreground font-normal">
                                                            {col.type}
                                                        </span>
                                                    </div>
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tableData.rows.map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {tableData.columns.map((col) => (
                                                    <TableCell key={col.name} className="font-mono text-sm">
                                                        <span
                                                            className={cn(
                                                                row[col.name] === null && "text-muted-foreground italic"
                                                            )}
                                                        >
                                                            {formatCellValue(row[col.name])}
                                                        </span>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
