"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import {
    getUsers,
    deactivateUser,
    reactivateUser,
    deleteUser,
    promoteToAdmin,
    demoteFromAdmin,
    type UserInfo,
} from "@/lib/actions/users";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
    Users,
    Shield,
    ShieldOff,
    UserX,
    UserCheck,
    Trash2,
    RefreshCw,
} from "lucide-react";

export function AdminUsersClient() {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const loadUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erreur de chargement");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleAction = async (
        action: () => Promise<{ success: boolean; error?: string }>,
        userId: string,
        successMessage: string
    ) => {
        setActionLoading(userId);
        try {
            const result = await action();
            if (result.success) {
                toast.success(successMessage);
                loadUsers();
            } else {
                toast.error(result.error || "Erreur");
            }
        } catch {
            toast.error("Erreur lors de l'action");
        } finally {
            setActionLoading(null);
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-8 w-8" />
                        Gestion Utilisateurs
                    </h1>
                    <p className="text-muted-foreground">
                        Gérez les comptes utilisateurs de l&apos;application
                    </p>
                </div>
                <Button variant="outline" onClick={loadUsers}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualiser
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total</CardDescription>
                        <CardTitle className="text-2xl">{users.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Actifs</CardDescription>
                        <CardTitle className="text-2xl text-green-500">
                            {users.filter((u) => u.isActive).length}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Admins</CardDescription>
                        <CardTitle className="text-2xl text-blue-500">
                            {users.filter((u) => u.isAdmin).length}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Utilisateurs</CardTitle>
                    <CardDescription>{users.length} compte(s) enregistré(s)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Inscrit le</TableHead>
                                    <TableHead>Dernière connexion</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((u) => (
                                    <TableRow key={u.id} className={!u.isActive ? "opacity-50" : ""}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                {u.name}
                                                {u.isAdmin && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        <Shield className="h-3 w-3 mr-1" />
                                                        Admin
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{u.email}</TableCell>
                                        <TableCell>
                                            {u.isActive ? (
                                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                                    Actif
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                                                    Désactivé
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm">{formatDate(u.createdAt)}</TableCell>
                                        <TableCell className="text-sm">{formatDate(u.lastSession)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                {/* Toggle Admin */}
                                                {u.isAdmin ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleAction(
                                                                () => demoteFromAdmin(u.id),
                                                                u.id,
                                                                "Droits admin retirés"
                                                            )
                                                        }
                                                        disabled={actionLoading === u.id}
                                                        title="Retirer admin"
                                                    >
                                                        <ShieldOff className="h-4 w-4" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleAction(
                                                                () => promoteToAdmin(u.id),
                                                                u.id,
                                                                "Promu admin"
                                                            )
                                                        }
                                                        disabled={actionLoading === u.id}
                                                        title="Promouvoir admin"
                                                    >
                                                        <Shield className="h-4 w-4" />
                                                    </Button>
                                                )}

                                                {/* Toggle Active */}
                                                {u.isActive ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleAction(
                                                                () => deactivateUser(u.id),
                                                                u.id,
                                                                "Compte désactivé"
                                                            )
                                                        }
                                                        disabled={actionLoading === u.id}
                                                        title="Désactiver"
                                                    >
                                                        <UserX className="h-4 w-4" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleAction(
                                                                () => reactivateUser(u.id),
                                                                u.id,
                                                                "Compte réactivé"
                                                            )
                                                        }
                                                        disabled={actionLoading === u.id}
                                                        title="Réactiver"
                                                    >
                                                        <UserCheck className="h-4 w-4" />
                                                    </Button>
                                                )}

                                                {/* Delete */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-destructive hover:text-destructive"
                                                            disabled={actionLoading === u.id}
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Supprimer l&apos;utilisateur ?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Cette action est irréversible. L&apos;utilisateur &quot;{u.name}&quot;
                                                                ({u.email}) sera définitivement supprimé.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleAction(
                                                                        () => deleteUser(u.id),
                                                                        u.id,
                                                                        "Utilisateur supprimé"
                                                                    )
                                                                }
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                Supprimer
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
