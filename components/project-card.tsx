import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Calendar } from "lucide-react";

const statusConfig = {
    online: {
        label: "Online",
        className: "bg-green-500/10 text-green-500 border-green-500/20",
        dotClassName: "bg-green-500",
    },
    offline: {
        label: "Offline",
        className: "bg-red-500/10 text-red-500 border-red-500/20",
        dotClassName: "bg-red-500",
    },
    provisioning: {
        label: "Provisioning",
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        dotClassName: "bg-yellow-500 animate-pulse",
    },
};

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const status = statusConfig[project.status];

    // Formater la date
    const createdDate = new Date(project.createdAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <Card className="flex flex-col hover:border-primary/50 transition-colors">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="font-mono text-xs">
                            {project.slug}
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className={cn("gap-1.5", status.className)}>
                        <span
                            className={cn("h-2 w-2 rounded-full", status.dotClassName)}
                        />
                        {status.label}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Créé le {createdDate}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/projects/${project.id}`}>
                        <Settings className="mr-2 h-4 w-4" />
                        Manage
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
