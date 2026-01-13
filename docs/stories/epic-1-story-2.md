# Story 1.2: Configuration Better-Auth

## User Story
**En tant que** Développeur,
**Je veux** configurer Better-Auth pour l'authentification,
**Afin d'** avoir un système auth sécurisé et extensible.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Drizzle ORM (stockage sessions/users), Next.js API Routes
- **Technologie:** Better-Auth, Drizzle Adapter
- **Points de contact:** `lib/auth.ts`, `lib/auth-schema.ts`, `app/api/auth/[...all]/route.ts`

## Acceptance Criteria

### Functional Requirements
1. **Installation:** Better-Auth et `@better-auth/drizzle` installés.
2. **Configuration Auth:** Créer `lib/auth.ts` avec la configuration Better-Auth.
3. **Schéma Auth:** Tables `user`, `session`, `account`, `verification` créées via Drizzle.

### Integration Requirements
4. **API Route:** `app/api/auth/[...all]/route.ts` doit gérer toutes les routes auth.
5. **Client Auth:** `lib/auth-client.ts` doit exporter le client côté frontend.
6. **Trusted Origins:** Configurer `trustedOrigins` pour `https://branch.sandro.click`.

### Quality Requirements
7. **Migrations:** Les tables auth doivent être créées avec `drizzle-kit push`.
8. **Build:** Aucune erreur TypeScript.

## Technical Notes
- **Variables d'environnement requises:**
  ```env
  BETTER_AUTH_URL="http://localhost:3000"
  BETTER_AUTH_SECRET="<secret-32-chars>"
  ```
- **Providers:** Email/Password pour MVP (Social login plus tard).

## Definition of Done
- [x] Better-Auth installé et configuré
- [x] Tables auth créées dans la DB
- [x] API route `/api/auth/[...all]` fonctionnelle
- [x] Client auth configuré
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
| `lib/auth.ts` | MODIFIED - Ajout trustedOrigins |
| `lib/auth-client.ts` | EXISTS - Client avec signIn/signUp/signOut/useSession |
| `lib/auth-schema.ts` | EXISTS - Tables user, session, account, verification |
| `app/api/auth/[...all]/route.ts` | EXISTS - Handlers GET/POST |

### Completion Notes
- Better-Auth déjà configuré depuis session précédente
- **Ajout:** `trustedOrigins` pour sécuriser les requêtes cross-origin
  - `http://localhost:3000` (développement)
  - `https://branch.sandro.click` (production)
- Configuration: email/password activé, sessions 7 jours
- Client auth exporte: signIn, signUp, signOut, useSession
- Build Next.js 16.1.1 passe sans erreur ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Ajout trustedOrigins par James (Dev Agent) |
