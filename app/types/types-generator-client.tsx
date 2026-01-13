"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

import { generateTypes } from "@/lib/actions/types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Code2, Copy, RefreshCw, CheckCircle2 } from "lucide-react";

// Dynamic import for Monaco Editor (client-side only)
const Editor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full" />,
});

export function TypesGeneratorClient() {
    const [types, setTypes] = useState<string | null>(null);
    const [tableCount, setTableCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await generateTypes();
            setTypes(result.types);
            setTableCount(result.tableCount);
            toast.success(`Types générés pour ${result.tableCount} table(s)`);
        } catch {
            toast.error("Erreur lors de la génération des types");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleCopy = useCallback(async () => {
        if (!types) return;

        try {
            await navigator.clipboard.writeText(types);
            setIsCopied(true);
            toast.success("Types copiés dans le presse-papier");
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
            toast.error("Impossible de copier");
        }
    }, [types]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Code2 className="h-8 w-8" />
                    TypeScript Types
                </h1>
                <p className="text-muted-foreground">
                    Générez automatiquement les types TypeScript depuis votre schéma de base de données
                </p>
            </div>

            {/* Actions */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base">Générateur</CardTitle>
                            <CardDescription>
                                Introspection du schéma PostgreSQL
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            {types && (
                                <Button
                                    variant="outline"
                                    onClick={handleCopy}
                                    disabled={isCopied}
                                >
                                    {isCopied ? (
                                        <>
                                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                            Copié
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copier
                                        </>
                                    )}
                                </Button>
                            )}
                            <Button onClick={handleGenerate} disabled={isLoading}>
                                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                                {isLoading ? "Génération..." : "Générer les Types"}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Results */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Types Générés</CardTitle>
                        {types && (
                            <Badge variant="secondary">{tableCount} interface(s)</Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {!types ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                            <Code2 className="h-12 w-12 mb-4 opacity-50" />
                            <p>Cliquez sur &quot;Générer les Types&quot; pour commencer</p>
                        </div>
                    ) : (
                        <div className="border rounded-md overflow-hidden">
                            <Editor
                                height="500px"
                                language="typescript"
                                theme="vs-dark"
                                value={types}
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    scrollBeyondLastLine: false,
                                    wordWrap: "on",
                                    tabSize: 2,
                                }}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
