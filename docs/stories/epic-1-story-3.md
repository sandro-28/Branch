# Story 1.3: Pages d'Authentification

## User Story
**En tant qu'** Utilisateur,
**Je veux** pouvoir me connecter et m'inscrire,
**Afin d'** accéder à l'application de manière sécurisée.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Better-Auth (backend), Shadcn/UI (formulaires)
- **Technologie:** Next.js App Router, React Hook Form, Zod
- **Points de contact:** `app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`

## Acceptance Criteria

### Functional Requirements
1. **Page Login:** Formulaire email/password avec validation.
2. **Page Register:** Formulaire inscription avec confirmation password.
3. **Redirection:** Après login réussi → redirection vers `/dashboard`.
4. **Messages d'erreur:** Affichage clair des erreurs (credentials invalides, etc.).

### Integration Requirements
5. **Auth Client:** Utiliser `authClient.signIn.email()` et `authClient.signUp.email()`.
6. **Layout Auth:** Créer un layout dédié `app/(auth)/layout.tsx` (sans sidebar).
7. **Middleware:** Protéger les routes `/dashboard/*` (redirection vers `/login` si non connecté).

### Quality Requirements
8. **UX:** Loading states pendant les requêtes auth.
9. **Accessibilité:** Labels et focus corrects sur les inputs.
10. **Responsive:** Formulaires centrés et adaptés mobile.

## Technical Notes
- **Structure recommandée:**
  ```
  app/
    (auth)/
      layout.tsx      # Layout minimal pour auth
      login/
        page.tsx      # Page de connexion
      register/
        page.tsx      # Page d'inscription
  ```
- **Composants Shadcn:** `Input`, `Button`, `Card`, `Label`

## Definition of Done
- [x] Page `/login` fonctionnelle
- [x] Page `/register` fonctionnelle
- [x] Middleware de protection des routes
- [x] Redirection post-login
- [x] Messages d'erreur affichés
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
| `app/(auth)/layout.tsx` | NEW - Layout centré sans sidebar |
| `app/(auth)/login/page.tsx` | NEW - Formulaire connexion |
| `app/(auth)/register/page.tsx` | NEW - Formulaire inscription |
| `middleware.ts` | NEW - Protection routes |
| `components/ui/input.tsx` | NEW - Shadcn Input |
| `components/ui/label.tsx` | NEW - Shadcn Label |

### Completion Notes
- **Page Login:** 
  - Formulaire email/password
  - Gestion erreurs avec affichage message
  - Loading state pendant la requête
  - Lien vers inscription
  
- **Page Register:**
  - Formulaire nom/email/password/confirmation
  - Validation: passwords match, min 8 caractères
  - Gestion erreurs avec affichage message
  - Loading state pendant la requête
  - Lien vers connexion

- **Layout Auth:**
  - Centré avec gradient subtil
  - Max-width 400px
  - Dark theme supporté

- **Middleware:**
  - Routes protégées: /dashboard, /projects, /tables, /sql, /admin
  - Routes publiques: /login, /register, /api/auth
  - Redirection login → dashboard si déjà connecté
  - Callback URL pour retour après login

- Build Next.js 16.1.1 passe ✅
- Note: Warning "middleware deprecated" → Next.js 16 utilise "proxy" mais le middleware fonctionne

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Création pages auth et middleware par James (Dev Agent) |
