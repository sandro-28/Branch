# Project Brief: Branch

## Executive Summary
Branch est une plateforme "Self-Hosted Database as a Service" hébergée sur un VPS personnel, conçue pour remplacer Supabase. Elle offre une expérience utilisateur "Premium" (Dashboard moderne, fluidité) pour l'humain, tout en étant "AI-Native" (API standardisée, Swagger, Admin SQL) pour permettre aux Agents de code de travailler en autonomie totale. C'est la fusion de la souveraineté des données (VPS) et de l'expérience utilisateur SaaS.

## Problem Statement
Les développeurs indépendants et créateurs utilisant des Agents IA sont confrontés à un dilemme :
1.  **Coût prohibitif du SaaS :** Supabase et équivalents deviennent très chers dès qu'on multiplie les projets (Pro Plan @ $25/mo/projet).
2.  **Complexité du Self-Hosting :** Gérer PostgreSQL sur un VPS demande des compétences SysAdmin (SSH, backups, sécurité) et offre une UX pauvre (Adminer, pgAdmin).
3.  **Friction pour les Agents IA :** Les outils actuels ne sont pas pensés pour les IA (manque de documentation API standardisée automatique, difficulté à faire des migrations sans UI).

Il manque une solution "intermédiaire" : aussi simple et belle que Supabase, mais hébergée chez soi pour un coût fixe, et documentée pour les robots.

## Proposed Solution
**Branch** est une stack logicielle complète déployable sur un VPS unique.
*   **Core Engine :** Une orchestration Docker optimisée (Postgres + PostgREST + PgBouncer + Auth).
*   **Console :** Un dashboard Web (Next.js) élégant pour la gestion visuelle des tables, des utilisateurs et des logs.
*   **AI Integration :** Génération automatique de `swagger.json` et endpoint "Admin SQL" sécurisé pour permettre aux Agents de piloter la BDD.
*   **Zero-Maintenance :** Système d'auto-update et de backups intégrés.

## Target Users
### Primary User Segment: Le "Creator-Developer"
*   **Profil :** Utilise des outils No-Code ou des Agents IA pour coder. N'est pas expert SysAdmin.
*   **Besoin :** Veut "voir" ses données dans une belle interface et créer des projets instantanément sans configurer de serveur.
*   **Pain Point :** "Supabase me coûte trop cher pour mes 15 side-projects."

### Secondary User Segment: L'Agent IA (Code Agent)
*   **Profil :** LLM (Claude, GPT-4) pilotant un IDE.
*   **Besoin :** Comprendre le schéma de la BDD sans deviner (besoin de Swagger) et pouvoir modifier la structure (Migrations) via API.

## Goals & Success Metrics
### Business Objectives
- Réduire la facture BDD de l'utilisateur de ~300$/mois (12 projets Supabase) à ~20$/mois (1 VPS).
- Offrir une disponibilité de 99.9% pour les apps connectées (grâce à PgBouncer).

### User Success Metrics
- **Time-to-Project :** < 5 secondes pour créer une nouvelle BDD prête à l'emploi.
- **AI Autonomy :** L'Agent peut initialiser une BDD complète (Tables + Data) sans aucune intervention humaine.

## MVP Scope (V1 Release - "No-MVP Strategy")
Nous visons un produit fini et robuste dès la sortie.

### Core Features (Must Have)
- **Architecture Branch Stack :** Docker Compose optimisé (Postgres 16, PostgREST, GoTrue/Auth, PgBouncer, Traefik).
- **Branch Console :** Dashboard Next.js (Table Editor, SQL Editor, User Management, Logs).
- **AI Suite :**
    - Endpoint `/swagger.json` auto-généré par projet.
    - Endpoint `/api/admin/query` pour les migrations SQL (sécurisé par Admin Key).
- **Infrastructure Management :**
    - Provisioning instantané (Template BDD pré-chauffé).
    - Isolation des ressources par projet (Docker limits).
    - Auto-Update du système.
- **Security :** Gestion SSL automatique (Let's Encrypt via Traefik), Whitelist IP.

### Out of Scope for MVP
- Marketplace de templates communautaires.
- Hébergement de fichiers (S3-compatible storage) - reporté à la V2.
- Fonctions Serverless (Edge Functions) - on utilise Vercel pour ça.

## Technical Considerations
### Platform Requirements
- **Target Platforms:** Serveur VPS (Ubuntu/Debian) pour le backend. Navigateur Web moderne pour la Console.
- **Performance Requirements:** Support de 10+ projets sur un VPS standard (4 vCPU / 8GB RAM).

### Technology Preferences
- **Frontend (Console):** Next.js 14, Tailwind CSS, Shadcn/UI (pour le look Premium), TanStack Query.
- **Backend (Engine):** Docker, PostgreSQL 16, PostgREST, PgBouncer.
- **Orchestration:** Docker Compose (simple et robuste sur mono-serveur).

### Architecture Considerations
- **Sécurité:** Le VPS n'expose que les ports 80/443. Tout le reste est dans le réseau Docker interne.
- **Communication Vercel <-> VPS:** Via HTTPS standard avec Token d'authentification.

## Constraints & Assumptions
### Constraints
- **Hardware:** Le système doit tourner sur un VPS unique (Vertical Scaling). Pas de cluster Kubernetes complexe.
- **Réseau:** Les apps clientes (Vercel) ont des IP dynamiques, donc la whitelist doit être flexible ou basée sur des tokens forts.

### Key Assumptions
- L'utilisateur a déjà un nom de domaine pointant vers le VPS.
- Les Agents IA sont capables de lire une spec OpenAPI JSON (validé par l'expérience).

## Risks & Open Questions
- **Risk:** Saturation disque avec les logs ou backups.
    - *Mitigation:* Rotation des logs stricte et retention policy sur les backups (S3 externe recommandé).
- **Risk:** Une migration malheureuse d'un Agent casse la prod.
    - *Mitigation:* Transaction SQL obligatoire pour toute migration via API Admin. Rollback automatique en cas d'erreur.

## Next Steps
### Immediate Actions
1.  Valider l'architecture Docker "Branch Stack" (choix des images exactes).
2.  Designer l'API Admin pour les Agents (Spec OpenAPI de l'interface de gestion).
3.  Maquetter la "Branch Console" avec Shadcn/UI.

### PM Handoff
This Project Brief provides the full context for Branch. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements.
