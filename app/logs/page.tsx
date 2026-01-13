import Link from "next/link";
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
    ExternalLink,
    Activity,
    Server,
    Database,
    Shield,
    Clock,
} from "lucide-react";

const COOLIFY_URL = "https://coolify.sandro.click";

const services = [
    {
        name: "Next.js Application",
        icon: Server,
        status: "running",
        description: "Frontend & API routes",
    },
    {
        name: "PostgreSQL Database",
        icon: Database,
        status: "running",
        description: "Supabase managed",
    },
    {
        name: "Authentication",
        icon: Shield,
        status: "running",
        description: "Better-Auth sessions",
    },
];

export default function LogsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Activity className="h-8 w-8" />
                    Logs & Monitoring
                </h1>
                <p className="text-muted-foreground">
                    Vue d&apos;ensemble de l&apos;état des services
                </p>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Coolify Dashboard</CardTitle>
                    <CardDescription>
                        Accédez au panneau de contrôle complet pour les logs et métriques
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href={COOLIFY_URL} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ouvrir Coolify
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Services Status */}
            <div className="grid gap-4 md:grid-cols-3">
                {services.map((service) => (
                    <Card key={service.name}>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <service.icon className="h-5 w-5 text-muted-foreground" />
                                <Badge
                                    variant="outline"
                                    className="bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                    {service.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {service.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        À propos des logs
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                        Les logs détaillés de l&apos;application sont disponibles via le dashboard Coolify.
                        Cela inclut :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Logs de build et déploiement</li>
                        <li>Logs d&apos;application en temps réel</li>
                        <li>Métriques de performance (CPU, mémoire)</li>
                        <li>Historique des déploiements</li>
                    </ul>
                    <p className="pt-2">
                        Pour les logs PostgreSQL, consultez votre tableau de bord Supabase.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
