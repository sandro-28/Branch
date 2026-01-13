"use server";

import { getDb } from "@/lib/db";
import { projects, type Project, type NewProject } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Récupère l'utilisateur connecté depuis la session
 */
async function getCurrentUser() {
    const auth = getAuth();
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session?.user) {
        throw new Error("Non authentifié");
    }

    return session.user;
}

/**
 * Génère un slug depuis le nom du projet
 */
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Supprime les caractères spéciaux
        .replace(/\s+/g, "-") // Remplace les espaces par des tirets
        .replace(/-+/g, "-") // Supprime les tirets multiples
        .substring(0, 100); // Limite la longueur
}

/**
 * Valide le nom du projet
 */
function validateProjectName(name: string): { valid: boolean; error?: string } {
    if (!name || name.trim().length === 0) {
        return { valid: false, error: "Le nom du projet est requis" };
    }

    if (name.length < 3) {
        return { valid: false, error: "Le nom doit contenir au moins 3 caractères" };
    }

    if (name.length > 100) {
        return { valid: false, error: "Le nom ne peut pas dépasser 100 caractères" };
    }

    return { valid: true };
}

// ============================================
// CRUD Operations
// ============================================

/**
 * Récupère tous les projets de l'utilisateur connecté
 */
export async function getProjects(): Promise<Project[]> {
    const user = await getCurrentUser();
    const db = getDb();

    const userProjects = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, user.id))
        .orderBy(projects.createdAt);

    return userProjects;
}

/**
 * Récupère un projet par son ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
    const user = await getCurrentUser();
    const db = getDb();

    const [project] = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
        .limit(1);

    return project || null;
}

/**
 * Crée un nouveau projet
 */
export async function createProject(name: string): Promise<{ project?: Project; error?: string }> {
    // Validation
    const validation = validateProjectName(name);
    if (!validation.valid) {
        return { error: validation.error };
    }

    try {
        const user = await getCurrentUser();
        const db = getDb();

        // Générer un slug unique
        let slug = generateSlug(name);
        let slugSuffix = 0;

        // Vérifier l'unicité du slug
        while (true) {
            const existingSlug = await db
                .select()
                .from(projects)
                .where(eq(projects.slug, slug))
                .limit(1);

            if (existingSlug.length === 0) break;

            slugSuffix++;
            slug = `${generateSlug(name)}-${slugSuffix}`;
        }

        // Créer le projet
        const [newProject] = await db
            .insert(projects)
            .values({
                name: name.trim(),
                slug,
                userId: user.id,
                status: "offline",
            } satisfies NewProject)
            .returning();

        return { project: newProject };
    } catch (error) {
        console.error("Erreur création projet:", error);
        return { error: "Erreur lors de la création du projet" };
    }
}

/**
 * Met à jour un projet
 */
export async function updateProject(
    id: string,
    data: { name?: string; status?: "online" | "offline" | "provisioning" }
): Promise<{ project?: Project; error?: string }> {
    try {
        const user = await getCurrentUser();
        const db = getDb();

        // Vérifier que le projet appartient à l'utilisateur
        const existing = await getProjectById(id);
        if (!existing) {
            return { error: "Projet non trouvé" };
        }

        // Validation du nom si fourni
        if (data.name) {
            const validation = validateProjectName(data.name);
            if (!validation.valid) {
                return { error: validation.error };
            }
        }

        // Mettre à jour
        const [updated] = await db
            .update(projects)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
            .returning();

        return { project: updated };
    } catch (error) {
        console.error("Erreur mise à jour projet:", error);
        return { error: "Erreur lors de la mise à jour" };
    }
}

/**
 * Supprime un projet
 */
export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const user = await getCurrentUser();
        const db = getDb();

        // Vérifier que le projet appartient à l'utilisateur
        const existing = await getProjectById(id);
        if (!existing) {
            return { success: false, error: "Projet non trouvé" };
        }

        // Supprimer
        await db
            .delete(projects)
            .where(and(eq(projects.id, id), eq(projects.userId, user.id)));

        return { success: true };
    } catch (error) {
        console.error("Erreur suppression projet:", error);
        return { success: false, error: "Erreur lors de la suppression" };
    }
}
