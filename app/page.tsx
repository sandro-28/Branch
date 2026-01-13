import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white">
      <main className="flex flex-col items-center gap-8 text-center px-4">
        {/* Logo / Titre */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Branch
          </h1>
          <p className="text-xl text-zinc-400">
            Control Plane SaaS
          </p>
        </div>

        {/* Description */}
        <p className="max-w-md text-lg text-zinc-500">
          Gérez vos projets et bases de données depuis une interface unifiée.
        </p>

        {/* Status Connexion */}
        <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-zinc-400">Application prête</span>
          </div>
          <p className="text-xs text-zinc-600">
            Stack: Next.js 14 + Drizzle ORM + Better-Auth + Shadcn UI
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="default" size="lg">
            Se connecter
          </Button>
          <Button variant="outline" size="lg">
            Documentation
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-zinc-600">
          Hébergé sur Coolify • Base de données Supabase PostgreSQL
        </p>
      </main>
    </div>
  );
}
