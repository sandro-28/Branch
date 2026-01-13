import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { Database } from "./db";

// Type pour l'instance auth
type AuthInstance = ReturnType<typeof betterAuth>;

// Singleton pour auth (lazy initialization)
let authInstance: AuthInstance | null = null;

/**
 * Récupère l'instance Better-Auth (lazy initialization)
 * Évite l'exécution au build time
 */
export function getAuth(): AuthInstance {
    if (!authInstance) {
        // Import dynamique pour éviter l'exécution au build
        const { getDb } = require("./db");
        const db: Database = getDb();

        authInstance = betterAuth({
            database: drizzleAdapter(db, {
                provider: "pg",
            }),
            emailAndPassword: {
                enabled: true,
            },
            session: {
                expiresIn: 60 * 60 * 24 * 7, // 7 jours
                updateAge: 60 * 60 * 24, // Mise à jour toutes les 24h
            },
            trustedOrigins: [
                "http://localhost:3000",
                "https://branch.sandro.click",
            ],
        });
    }

    return authInstance;
}
