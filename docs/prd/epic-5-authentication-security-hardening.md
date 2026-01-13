# Epic 5: Administration & Sécurité

**Objectif:** Sécuriser l'application et gérer les utilisateurs avec Better-Auth.

## Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Auth | Better-Auth |
| User Management | Drizzle ORM (auth tables) |
| Roles | Better-Auth RBAC (futur) |

## Stories

### Story 5.1: Gestion Utilisateurs Admin
- **En tant qu'** Admin,
- **Je veux** gérer les utilisateurs de l'application,
- **Afin de** contrôler qui a accès au système.
- **Critères d'Acceptation:**
    1. Page `/admin/users` avec liste des utilisateurs
    2. Affichage: email, date inscription, dernière connexion
    3. Action: désactiver/réactiver un compte
    4. Action: supprimer un utilisateur
    5. Protection: seuls les admins peuvent accéder

## Stories Futures (Post-MVP)

### Story 5.2: Rôles et Permissions (Futur)
- Définir rôles: Admin, Editor, Viewer
- Assigner rôles aux utilisateurs
- Restricter accès selon le rôle

### Story 5.3: Audit Log (Futur)
- Logger toutes les actions critiques
- Interface de consultation des logs
- Filtrage par utilisateur/action

### Story 5.4: 2FA (Futur)
- Authentification à deux facteurs
- TOTP (Google Authenticator)
- Backup codes

## Dépendances

- Epic 1 complété (Better-Auth configuré)