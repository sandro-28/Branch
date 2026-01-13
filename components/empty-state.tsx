import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <FolderPlus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Create your first project to get started.
            </p>
            <Button asChild className="mt-6">
                <Link href="/projects/new">Create Project</Link>
            </Button>
        </div>
    );
}
