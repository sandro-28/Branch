"use client";

import { useState } from "react";
import { toast } from "sonner";

import { generateAIContext } from "@/lib/actions/ai-context";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu, Sparkles, Loader2 } from "lucide-react";

export function Header() {
    const [isLoading, setIsLoading] = useState(false);

    const handleCopyForAI = async () => {
        setIsLoading(true);
        try {
            const context = await generateAIContext();
            await navigator.clipboard.writeText(context);
            toast.success("Contexte AI copié !", {
                description: "Collez dans Claude, ChatGPT, ou autre agent AI",
            });
        } catch {
            toast.error("Erreur lors de la génération du contexte");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TooltipProvider>
            <header className="flex h-16 items-center justify-between border-b bg-card px-6">
                {/* Mobile menu button */}
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>

                {/* Spacer for desktop */}
                <div className="hidden md:block" />

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCopyForAI}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Sparkles className="h-4 w-4" />
                                )}
                                <span className="sr-only">Copy for AI</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Copy schema context for AI agents</p>
                        </TooltipContent>
                    </Tooltip>
                    <ThemeToggle />
                </div>
            </header>
        </TooltipProvider>
    );
}
