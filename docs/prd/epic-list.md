# Epic List - Branch v2

## Vue d'ensemble

| Epic | Nom | Stories | Status |
|------|-----|---------|--------|
| 1 | Foundation & Configuration | 4 | Ready |
| 2 | Console Shell & Dashboard | 4 | 2.1-2.2 ✅ Terminées |
| 3 | Gestion des Données | 3 | Ready |
| 4 | Features Avancées | 4 | Ready |
| 5 | Administration & Sécurité | 1 (+3 futures) | Ready |

---

## Détail des Epics

### Epic 1: Foundation & Configuration
Établir la base technique avec Next.js 15, Drizzle ORM, Better-Auth et connexion PostgreSQL sur VPS Coolify.

**Stories:**
- 1.1: Configuration Drizzle ORM & Base de Données
- 1.2: Configuration Better-Auth
- 1.3: Pages d'Authentification
- 1.4: Configuration Environnement & Premier Déploiement

---

### Epic 2: Console Shell & Dashboard
Interface utilisateur principale avec navigation, dashboard et gestion des projets.

**Stories:**
- 2.1: Next.js Console Boilerplate ✅
- 2.2: Project List & Status View ✅
- 2.3: Schéma Projects & CRUD
- 2.4: Page Détail Projet

---

### Epic 3: Gestion des Données
Visualisation et manipulation des données de la base de données.

**Stories:**
- 3.1: Table Explorer (Read-Only)
- 3.2: SQL Console
- 3.3: Historique des Requêtes

---

### Epic 4: Features Avancées
Fonctionnalités avancées pour améliorer la productivité des développeurs.

**Stories:**
- 4.1: Génération TypeScript Types
- 4.2: Copy-for-AI Context
- 4.3: Logs & Monitoring
- 4.4: Backups & Exports

---

### Epic 5: Administration & Sécurité
Sécuriser l'application et gérer les utilisateurs avec Better-Auth.

**Stories:**
- 5.1: Gestion Utilisateurs Admin

**Futures (Post-MVP):**
- 5.2: Rôles et Permissions
- 5.3: Audit Log
- 5.4: 2FA

---

## Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 15 (App Router) |
| ORM | Drizzle ORM |
| Auth | Better-Auth |
| Database | PostgreSQL (VPS via Coolify) |
| UI | Shadcn/UI + Tailwind CSS v4 |
| State | TanStack Query + Zustand |
| Déploiement | Coolify (Git Push → Auto Deploy) |