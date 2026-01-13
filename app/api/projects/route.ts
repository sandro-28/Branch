import { NextResponse } from "next/server";
import { getProjects } from "@/lib/actions/projects";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const projects = await getProjects();
        return NextResponse.json({ projects });
    } catch (error) {
        // Si non authentifié, renvoyer une liste vide plutôt qu'une erreur
        // L'utilisateur sera redirigé vers /login par le middleware
        console.error("Error fetching projects:", error);
        return NextResponse.json({ projects: [] });
    }
}
