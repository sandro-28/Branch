# Epic 1: Foundation & Configuration

**Objectif:** Établir la base technique avec Next.js 15, Drizzle ORM, Better-Auth et connexion PostgreSQL sur VPS.

## Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 15 (App Router) |
| ORM | Drizzle ORM |
| Auth | Better-Auth |
| Database | PostgreSQL (VPS via Coolify) |
| Styling | Tailwind CSS v4 + Shadcn/UI |
| Déploiement | Coolify (Git Push → Auto Deploy) |

## Stories

### Story 1.1: Configuration Drizzle ORM & Base de Données
- **En tant que** Développeur,
- **Je veux** configurer Drizzle ORM avec la connexion PostgreSQL duale (local/production),
- **Afin de** pouvoir interagir avec la base de données de manière type-safe.
- **Critères d'Acceptation:**
    1. `drizzle.config.ts` configuré avec `DATABASE_URL`
    2. Schéma de base créé dans `lib/schema.ts`
    3. `drizzle-kit push` fonctionne vers le VPS

### Story 1.2: Configuration Better-Auth
- **En tant que** Développeur,
- **Je veux** configurer Better-Auth pour l'authentification,
- **Afin d'** avoir un système auth sécurisé et extensible.
- **Critères d'Acceptation:**
    1. Better-Auth installé et configuré
    2. Tables auth créées (`user`, `session`, `account`)
    3. `trustedOrigins` configuré pour production

### Story 1.3: Pages d'Authentification
- **En tant qu'** Utilisateur,
- **Je veux** pouvoir me connecter et m'inscrire,
- **Afin d'** accéder à l'application de manière sécurisée.
- **Critères d'Acceptation:**
    1. Page `/login` fonctionnelle
    2. Page `/register` fonctionnelle
    3. Middleware de protection des routes privées

### Story 1.4: Configuration Environnement & Premier Déploiement
- **En tant que** DevOps,
- **Je veux** documenter les variables d'environnement et valider le déploiement,
- **Afin de** garantir un déploiement reproductible sur Coolify.
- **Critères d'Acceptation:**
    1. Documentation `.env.local` et `.env.production`
    2. `npm run build` passe sans erreur
    3. Premier déploiement réussi sur Coolify

## Dépendances

- VPS Hostinger avec Coolify installé
- Instance PostgreSQL configurée sur Coolify
- Domaine `branch.sandro.click` configuré