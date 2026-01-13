# Epic 2: Console Shell & Dashboard

**Objectif:** Créer l'interface utilisateur principale avec navigation, dashboard et gestion des projets.

## Stack Technique

| Composant | Technologie |
|-----------|-------------|
| UI Framework | Shadcn/UI (Radix) |
| State Management | TanStack Query |
| Icons | Lucide React |
| Data Layer | Drizzle ORM + Server Actions |

## Stories

### Story 2.1: Next.js Console Boilerplate ✅
- **Status:** TERMINÉE
- **Résumé:** Next.js 16 initialisé avec Shadcn/UI, Layout Sidebar/Header, Dark mode

### Story 2.2: Project List & Status View ✅
- **Status:** TERMINÉE
- **Résumé:** Dashboard avec Project Cards, Mock API, Status badges, TanStack Query

### Story 2.3: Schéma Projects & CRUD
- **En tant qu'** Utilisateur,
- **Je veux** pouvoir créer, lister et supprimer des projets,
- **Afin de** gérer mon infrastructure depuis l'interface.
- **Critères d'Acceptation:**
    1. Table `projects` créée dans Drizzle
    2. Server Actions: `createProject`, `getProjects`, `deleteProject`
    3. Formulaire de création de projet
    4. Remplacer le mock API par de vraies données

### Story 2.4: Page Détail Projet
- **En tant qu'** Utilisateur,
- **Je veux** voir les détails d'un projet et pouvoir le modifier,
- **Afin d'** avoir un contrôle complet sur mes projets.
- **Critères d'Acceptation:**
    1. Route `/projects/[id]` créée
    2. Affichage des informations projet
    3. Actions: éditer nom, supprimer projet
    4. Navigation retour vers dashboard

## Dépendances

- Epic 1 complété (Drizzle + Auth configurés)