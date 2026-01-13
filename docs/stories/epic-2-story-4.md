# Story 2.4: Page Détail Projet

## User Story
**En tant qu'** Utilisateur,
**Je veux** voir les détails d'un projet et pouvoir le modifier,
**Afin d'** avoir un contrôle complet sur mes projets.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Drizzle ORM, Router Next.js (dynamic routes)
- **Technologie:** Server Components, Server Actions
- **Points de contact:** `app/projects/[id]/page.tsx`

## Acceptance Criteria

### Functional Requirements
1. **Route Dynamique:** Créer `app/projects/[id]/page.tsx`.
2. **Fetch Projet:** Récupérer les données du projet via `getProjectById(id)`.
3. **Affichage:** Card avec nom, slug, status, dates de création/modification.
4. **Édition Nom:** Formulaire inline pour modifier le nom du projet.
5. **Suppression:** Bouton "Supprimer" avec confirmation dialog.

### Integration Requirements
6. **Auth Check:** Vérifier que l'utilisateur est propriétaire du projet.
7. **404:** Afficher page 404 si projet inexistant ou non autorisé.
8. **Navigation:** Bouton retour vers `/dashboard`.

### Quality Requirements
9. **Loading State:** Skeleton pendant le chargement.
10. **Toast:** Notifications success/error pour les actions.
11. **Responsive:** Layout adapté mobile.

## Technical Notes
- **Structure de page:**
  ```
  app/
    projects/
      [id]/
        page.tsx         # Page principale
        loading.tsx      # Skeleton loader
        not-found.tsx    # 404 custom
  ```

- **Server Actions:**
  - `getProjectById(id)` - Lecture
  - `updateProject(id, data)` - Modification
  - `deleteProject(id)` - Suppression (déjà fait en 2.3)

## Definition of Done
- [x] Route `/projects/[id]` fonctionnelle
- [x] Affichage détails du projet
- [x] Édition du nom fonctionnelle
- [x] Suppression avec confirmation
- [x] Toast notifications
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
| `app/projects/[id]/page.tsx` | NEW - Server component avec fetch |
| `app/projects/[id]/loading.tsx` | NEW - Skeleton loader |
| `app/projects/[id]/not-found.tsx` | NEW - 404 custom |
| `app/projects/[id]/project-detail-client.tsx` | NEW - Client component interactif |
| `app/layout.tsx` | MODIFIED - Ajout Toaster |
| `components/ui/sonner.tsx` | NEW - Shadcn Sonner |
| `components/ui/alert-dialog.tsx` | NEW - Shadcn AlertDialog |

### Completion Notes
- **Page Détail:**
  - Server component fetch le projet via getProjectById
  - Affiche nom, slug, status avec badge coloré
  - Affiche ID, dates création/modification
  
- **Édition Nom:**
  - Input inline avec bouton "Sauver"
  - Désactivé si pas de changement
  - Toast success/error
  
- **Suppression:**
  - AlertDialog de confirmation
  - Toast success puis redirection dashboard
  
- **Loading/Error:**
  - Skeleton loader pendant le chargement
  - Page 404 custom si projet non trouvé
  - Bouton retour vers dashboard
  
- **Toaster:**
  - Ajouté au layout global
  - Position: top-right
  - richColors activé

- **Build:** Exit code 0 ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation page détail projet par James (Dev Agent) |
