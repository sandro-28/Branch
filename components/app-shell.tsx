"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

// Routes qui ne doivent PAS avoir la sidebar/header (layout minimal)
const publicLayoutRoutes = ["/", "/login", "/register"];

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Vérifier si on est sur une route publique
    const isPublicLayout = publicLayoutRoutes.some(
        (route) => pathname === route
    );

    // Si c'est une page publique (landing, login, register) → layout minimal
    if (isPublicLayout) {
        return (
            <div className="min-h-screen bg-background">
                {children}
            </div>
        );
    }

    // Sinon → layout avec sidebar et header
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
