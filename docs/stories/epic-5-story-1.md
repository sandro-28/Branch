# Story 5.1: Gestion Utilisateurs Admin

## User Story
**En tant qu'** Admin,
**Je veux** gérer les utilisateurs de l'application,
**Afin de** contrôler qui a accès au système.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Better-Auth (user table), Drizzle ORM
- **Technologie:** Server Actions, DataTable
- **Points de contact:** `app/admin/users/page.tsx`, `lib/actions/users.ts`

## Acceptance Criteria

### Functional Requirements
1. **Liste Users:** Page `/admin/users` affichant tous les utilisateurs.
2. **Colonnes:** Email, nom, date inscription, dernière connexion.
3. **Désactiver:** Bouton pour désactiver un compte (soft delete).
4. **Réactiver:** Bouton pour réactiver un compte désactivé.
5. **Supprimer:** Bouton pour supprimer définitivement (avec confirmation).

### Integration Requirements
6. **Auth Check:** Vérifier que l'utilisateur courant est admin.
7. **Self Protection:** Impossible de se supprimer soi-même.
8. **Better-Auth Tables:** Utiliser les tables `user` et `session`.

### Quality Requirements
9. **Confirmation:** Dialog de confirmation pour actions destructives.
10. **Toast:** Notifications pour les actions réussies/échouées.
11. **Pagination:** Si > 20 utilisateurs, pagination.

## Technical Notes
- **Admin Check:**
  ```typescript
  // Option 1: Champ isAdmin dans user table
  // Option 2: Premier utilisateur = admin (bootstrap)
  // Option 3: Email spécifique = admin
  ```

- **Soft Delete:**
  ```typescript
  export const user = pgTable('user', {
    // ... existing fields
    isActive: boolean('is_active').default(true),
    deactivatedAt: timestamp('deactivated_at'),
  });
  ```

## Definition of Done
- [x] Page admin/users accessible
- [x] Liste utilisateurs affichée
- [x] Actions désactiver/réactiver fonctionnelles
- [x] Action supprimer fonctionnelle
- [x] Protection admin-only
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
| `lib/auth-schema.ts` | MODIFIED - Ajout isAdmin, isActive |
| `lib/actions/users.ts` | NEW - CRUD complet users admin |
| `app/admin/users/page.tsx` | NEW - Server component avec protection |
| `app/admin/users/admin-users-client.tsx` | NEW - UI complète |

### Completion Notes
- **Schema Updates:**
  - Ajout `isAdmin: boolean` (default false)
  - Ajout `isActive: boolean` (default true)
  - `drizzle-kit push` exécuté

- **Server Actions (lib/actions/users.ts):**
  - `getUsers()`: Liste tous les users avec dernière session
  - `deactivateUser()`: Soft delete
  - `reactivateUser()`: Réactive un compte
  - `deleteUser()`: Suppression permanente
  - `promoteToAdmin()`: Donne droits admin
  - `demoteFromAdmin()`: Retire droits admin
  - `isCurrentUserAdmin()`: Check admin status

- **Protection:**
  - Toutes les actions vérifient que l'appelant est admin
  - Self-protection: impossible de se supprimer/désactiver/démoter soi-même

- **UI:**
  - Stats cards (total, actifs, admins)
  - Table avec colonnes: nom, email, statut, inscrit, dernière connexion
  - Boutons d'action avec icônes
  - AlertDialog pour suppression
  - Toast notifications
  - Refresh button

- Build réussi ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation gestion users admin par James (Dev Agent) |
