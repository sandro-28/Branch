import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/actions/projects";
import { ProjectDetailClient } from "./project-detail-client";

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;

    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient project={project} />;
}
