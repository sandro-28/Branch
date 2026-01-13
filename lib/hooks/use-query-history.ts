"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "branch-sql-history";
const MAX_HISTORY = 20;

export interface QueryHistoryItem {
    id: string;
    query: string;
    executedAt: string;
    rowCount?: number;
    error?: boolean;
}

export function useQueryHistory() {
    const [history, setHistory] = useState<QueryHistoryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setHistory(parsed);
                }
            } catch {
                console.error("Failed to load query history");
            }
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage when history changes
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
            } catch {
                console.error("Failed to save query history");
            }
        }
    }, [history, isLoaded]);

    const addQuery = useCallback(
        (query: string, rowCount?: number, error?: boolean) => {
            const trimmedQuery = query.trim();
            if (!trimmedQuery) return;

            const newItem: QueryHistoryItem = {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                query: trimmedQuery,
                executedAt: new Date().toISOString(),
                rowCount,
                error,
            };

            setHistory((prev) => {
                // Remove duplicates (same query)
                const filtered = prev.filter((item) => item.query !== trimmedQuery);
                // Add new item at the beginning, limit to MAX_HISTORY
                return [newItem, ...filtered].slice(0, MAX_HISTORY);
            });
        },
        []
    );

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    const removeItem = useCallback((id: string) => {
        setHistory((prev) => prev.filter((item) => item.id !== id));
    }, []);

    return {
        history,
        addQuery,
        clearHistory,
        removeItem,
        isLoaded,
    };
}
