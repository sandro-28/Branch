// Re-export Drizzle schema types
export { type Project, type NewProject, type ProjectStatus } from "./schema";

// API Response types
export type ProjectsResponse = {
    projects: import("./schema").Project[];
};
