"use server";

import { getDb } from "@/lib/db";
import { user, session } from "@/lib/auth-schema";
import { eq, desc, and, ne } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    createdAt: Date;
    lastSession: Date | null;
}

/**
 * Récupère l'utilisateur connecté
 */
async function getCurrentUser() {
    const auth = getAuth();
    const headersList = await headers();
    const sessionData = await auth.api.getSession({
        headers: headersList,
    });

    if (!sessionData?.user) {
        throw new Error("Non authentifié");
    }

    return sessionData.user;
}

/**
 * Vérifie que l'utilisateur courant est admin
 */
async function requireAdmin() {
    const currentUser = await getCurrentUser();
    const db = getDb();

    const [userData] = await db
        .select({ isAdmin: user.isAdmin })
        .from(user)
        .where(eq(user.id, currentUser.id))
        .limit(1);

    if (!userData?.isAdmin) {
        throw new Error("Accès réservé aux administrateurs");
    }

    return currentUser;
}

/**
 * Récupère tous les utilisateurs (admin only)
 */
export async function getUsers(): Promise<UserInfo[]> {
    await requireAdmin();
    const db = getDb();

    // Get all users with their latest session
    const users = await db
        .select({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            createdAt: user.createdAt,
        })
        .from(user)
        .orderBy(desc(user.createdAt));

    // Get last session for each user
    const result: UserInfo[] = [];

    for (const u of users) {
        const [lastSessionData] = await db
            .select({ createdAt: session.createdAt })
            .from(session)
            .where(eq(session.userId, u.id))
            .orderBy(desc(session.createdAt))
            .limit(1);

        result.push({
            ...u,
            lastSession: lastSessionData?.createdAt || null,
        });
    }

    return result;
}

/**
 * Désactive un utilisateur (admin only)
 */
export async function deactivateUser(userId: string): Promise<{ success: boolean; error?: string }> {
    const currentUser = await requireAdmin();

    // Self-protection
    if (userId === currentUser.id) {
        return { success: false, error: "Vous ne pouvez pas vous désactiver vous-même" };
    }

    const db = getDb();

    await db
        .update(user)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(user.id, userId));

    return { success: true };
}

/**
 * Réactive un utilisateur (admin only)
 */
export async function reactivateUser(userId: string): Promise<{ success: boolean; error?: string }> {
    await requireAdmin();
    const db = getDb();

    await db
        .update(user)
        .set({ isActive: true, updatedAt: new Date() })
        .where(eq(user.id, userId));

    return { success: true };
}

/**
 * Supprime un utilisateur (admin only)
 */
export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
    const currentUser = await requireAdmin();

    // Self-protection
    if (userId === currentUser.id) {
        return { success: false, error: "Vous ne pouvez pas vous supprimer vous-même" };
    }

    const db = getDb();

    // Delete user (sessions will be cascade deleted)
    await db
        .delete(user)
        .where(and(eq(user.id, userId), ne(user.id, currentUser.id)));

    return { success: true };
}

/**
 * Promeut un utilisateur en admin (admin only)
 */
export async function promoteToAdmin(userId: string): Promise<{ success: boolean; error?: string }> {
    await requireAdmin();
    const db = getDb();

    await db
        .update(user)
        .set({ isAdmin: true, updatedAt: new Date() })
        .where(eq(user.id, userId));

    return { success: true };
}

/**
 * Retire les droits admin (admin only)
 */
export async function demoteFromAdmin(userId: string): Promise<{ success: boolean; error?: string }> {
    const currentUser = await requireAdmin();

    // Self-protection
    if (userId === currentUser.id) {
        return { success: false, error: "Vous ne pouvez pas vous retirer vos propres droits admin" };
    }

    const db = getDb();

    await db
        .update(user)
        .set({ isAdmin: false, updatedAt: new Date() })
        .where(eq(user.id, userId));

    return { success: true };
}

/**
 * Vérifie si l'utilisateur courant est admin
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
    try {
        const currentUser = await getCurrentUser();
        const db = getDb();

        const [userData] = await db
            .select({ isAdmin: user.isAdmin })
            .from(user)
            .where(eq(user.id, currentUser.id))
            .limit(1);

        return userData?.isAdmin || false;
    } catch {
        return false;
    }
}
