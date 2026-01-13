import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderX } from "lucide-react";

export default function ProjectNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <FolderX className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Projet non trouvé</h1>
            <p className="mt-2 text-muted-foreground max-w-md">
                Ce projet n&apos;existe pas ou vous n&apos;avez pas les permissions pour y accéder.
            </p>
            <Button asChild className="mt-6">
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au Dashboard
                </Link>
            </Button>
        </div>
    );
}
