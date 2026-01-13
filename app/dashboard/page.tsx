"use client";

import { useProjects } from "@/lib/hooks/use-projects";
import { ProjectCard } from "@/components/project-card";
import { ProjectGridSkeleton } from "@/components/project-skeleton";
import { EmptyState } from "@/components/empty-state";
import { CreateProjectDialog } from "@/components/create-project-dialog";

export default function DashboardPage() {
    const { data: projects, isLoading, error } = useProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Vue d&apos;ensemble de vos projets
                    </p>
                </div>
                <CreateProjectDialog />
            </div>

            {isLoading && <ProjectGridSkeleton />}

            {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                    Impossible de charger les projets. Veuillez réessayer.
                </div>
            )}

            {projects && projects.length === 0 && <EmptyState />}

            {projects && projects.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}
