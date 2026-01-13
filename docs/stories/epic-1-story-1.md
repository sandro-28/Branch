# Story 1.1: Configuration Drizzle ORM & Base de Données

## User Story
**En tant que** Développeur,
**Je veux** configurer Drizzle ORM avec la connexion PostgreSQL duale (local/production),
**Afin de** pouvoir interagir avec la base de données de manière type-safe.

## Story Context
**Intégration Système:**
- **S'intègre avec:** PostgreSQL sur VPS (géré par Coolify)
- **Technologie:** Drizzle ORM, drizzle-kit, postgres driver
- **Points de contact:** `lib/db.ts`, `lib/schema.ts`, `drizzle.config.ts`

## Acceptance Criteria

### Functional Requirements
1. **drizzle.config.ts:** Configuré pour utiliser `DATABASE_URL` depuis les variables d'environnement.
2. **Connexion DB:** Créer `lib/db.ts` avec le client Drizzle connecté à PostgreSQL.
3. **Schéma Base:** Créer `lib/schema.ts` avec un schéma minimal (table `projects` sera ajoutée plus tard).

### Integration Requirements
4. **Dualité Env:** La config doit fonctionner en local (host externe + SSL) ET en production (host interne, sans SSL).
5. **Push Test:** `npx drizzle-kit push` doit réussir et créer les tables sur le VPS.

### Quality Requirements
6. **Type Safety:** Tous les types Drizzle doivent être exportés.
7. **Build:** `npm run build` doit passer sans erreur TypeScript.

## Technical Notes
- **Connexion Locale:**
  ```
  postgres://postgres:PASSWORD@coolify.sandro.click:5432/postgres?sslmode=require
  ```
- **Connexion Production:**
  ```
  postgres://postgres:PASSWORD@postgresql-database-XXXXX:5432/postgres
  ```

## Definition of Done
- [x] `drizzle.config.ts` créé et configuré
- [x] `lib/db.ts` créé avec export du client
- [x] `lib/schema.ts` créé (peut être minimal)
- [x] `drizzle-kit push` réussit
- [x] `npm run build` passe

## Status
**Ready for Review**

---

## Dev Agent Record

### Agent Model Used
Gemini 2.5 (Antigravity)

### File List
| File | Status |
|------|--------|
| `drizzle.config.ts` | EXISTS - Configuré avec DATABASE_URL |
| `lib/db.ts` | EXISTS - Singleton pattern avec getDb() |
| `lib/schema.ts` | EXISTS - Exporte auth-schema |
| `lib/auth-schema.ts` | EXISTS - Tables user, session, account, verification |
| `.env.local` | EXISTS - DATABASE_URL configuré |

### Completion Notes
- Configuration Drizzle déjà en place depuis une session précédente
- `drizzle.config.ts` charge `.env.local` via dotenv
- `lib/db.ts` utilise un singleton pattern avec lazy initialization
- `lib/schema.ts` ré-exporte le schéma auth de Better-Auth
- Tables auth créées: user, session, account, verification
- Build Next.js 16.1.1 passe sans erreur ✅
- `drizzle-kit push` réussit avec "No changes detected" (schéma synchronisé) ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Vérification et validation par James (Dev Agent) |
