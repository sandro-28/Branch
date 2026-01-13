"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { updateProject, deleteProject } from "@/lib/actions/projects";
import type { Project } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Save, Trash2, Calendar, Hash, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ProjectDetailClientProps {
    project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    const router = useRouter();
    const [name, setName] = useState(project.name);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const status = statusConfig[project.status];

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleUpdate = async () => {
        if (name === project.name) return;

        setIsUpdating(true);
        try {
            const result = await updateProject(project.id, { name });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Projet mis à jour");
                router.refresh();
            }
        } catch {
            toast.error("Erreur lors de la mise à jour");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteProject(project.id);

            if (result.error) {
                toast.error(result.error);
                setIsDeleting(false);
            } else {
                toast.success("Projet supprimé");
                router.push("/dashboard");
            }
        } catch {
            toast.error("Erreur lors de la suppression");
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
                            <Badge variant="outline" className={cn("gap-1.5", status.className)}>
                                <span className={cn("h-2 w-2 rounded-full", status.dotClassName)} />
                                {status.label}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">{project.slug}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Informations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Informations
                        </CardTitle>
                        <CardDescription>Détails du projet</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Hash className="h-4 w-4" />
                                <span>ID</span>
                            </div>
                            <span className="font-mono text-sm">{project.id}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Hash className="h-4 w-4" />
                                <span>Slug</span>
                            </div>
                            <span className="font-mono text-sm">{project.slug}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Créé le</span>
                            </div>
                            <span className="text-sm">{formatDate(project.createdAt)}</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Modifié le</span>
                            </div>
                            <span className="text-sm">{formatDate(project.updatedAt)}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Paramètres */}
                <Card>
                    <CardHeader>
                        <CardTitle>Paramètres</CardTitle>
                        <CardDescription>Modifier les paramètres du projet</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="project-name">Nom du projet</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="project-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="project-status">Statut</Label>
                            <Select
                                value={project.status}
                                onValueChange={async (value) => {
                                    setIsUpdating(true);
                                    try {
                                        await updateProject(project.id, { status: value as "online" | "offline" | "provisioning" });
                                        toast.success("Statut mis à jour");
                                        router.refresh();
                                    } catch {
                                        toast.error("Erreur mise à jour statut");
                                    } finally {
                                        setIsUpdating(false);
                                    }
                                }}
                                disabled={isUpdating}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="offline">Offline</SelectItem>
                                    <SelectItem value="provisioning">Provisioning</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                onClick={handleUpdate}
                                disabled={isUpdating || name === project.name}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {isUpdating ? "..." : "Sauver changements"}
                            </Button>
                        </div>

                        <div className="pt-4 border-t">
                            <h4 className="text-sm font-medium text-destructive mb-2">Zone dangereuse</h4>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" disabled={isDeleting}>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        {isDeleting ? "Suppression..." : "Supprimer le projet"}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Cette action est irréversible. Le projet &quot;{project.name}&quot; sera
                                            définitivement supprimé.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Supprimer
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
