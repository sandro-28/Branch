"use client";

import { useQuery } from "@tanstack/react-query";
import type { Project, ProjectsResponse } from "@/lib/types";

async function fetchProjects(): Promise<Project[]> {
    const response = await fetch("/api/projects");
    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }
    const data: ProjectsResponse = await response.json();
    return data.projects;
}

export function useProjects() {
    return useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });
}
