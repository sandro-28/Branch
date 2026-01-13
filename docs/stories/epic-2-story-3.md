# Story 2.3: Schéma Projects & CRUD

## User Story
**En tant qu'** Utilisateur,
**Je veux** pouvoir créer, lister et supprimer des projets,
**Afin de** gérer mon infrastructure depuis l'interface.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Drizzle ORM, Better-Auth (user ownership)
- **Technologie:** Server Actions, TanStack Query (invalidation)
- **Points de contact:** `lib/schema.ts`, `lib/actions/projects.ts`

## Acceptance Criteria

### Functional Requirements
1. **Schéma Projects:** Créer table `projects` avec colonnes:
   - `id` (uuid, primary key)
   - `name` (varchar, required)
   - `slug` (varchar, unique)
   - `status` (enum: online, offline, provisioning)
   - `userId` (foreign key vers user)
   - `createdAt`, `updatedAt`

2. **Server Action - List:** `getProjects()` retourne les projets de l'utilisateur connecté.
3. **Server Action - Create:** `createProject(name)` crée un nouveau projet.
4. **Server Action - Delete:** `deleteProject(id)` supprime un projet.

### Integration Requirements
5. **Auth Check:** Toutes les actions vérifient que l'utilisateur est connecté.
6. **Ownership:** Un utilisateur ne voit que SES projets.
7. **Migration:** `drizzle-kit push` applique le schéma.

### Quality Requirements
8. **Validation:** Nom de projet sanitizé (alphanumeric + dash).
9. **Slug Unique:** Génération automatique du slug depuis le nom.
10. **Build:** Aucune erreur TypeScript.

## Technical Notes
- **Schéma Drizzle:**
  ```typescript
  export const projects = pgTable('projects', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    status: projectStatusEnum('status').default('offline'),
    userId: text('user_id').notNull().references(() => user.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  });
  ```

## Definition of Done
- [x] Table `projects` créée dans la DB
- [x] `getProjects()` fonctionnel
- [x] `createProject()` fonctionnel
- [x] `deleteProject()` fonctionnel
- [x] Dashboard utilise les vraies données
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
| `lib/schema.ts` | MODIFIED - Ajout table projects + enum + relations |
| `lib/types.ts` | MODIFIED - Réexport types depuis schema |
| `lib/actions/projects.ts` | NEW - Server actions CRUD |
| `app/api/projects/route.ts` | MODIFIED - Utilise getProjects() |
| `components/project-card.tsx` | MODIFIED - Affiche slug et date |
| `components/create-project-dialog.tsx` | NEW - Dialog création projet |
| `app/dashboard/page.tsx` | MODIFIED - Bouton "Nouveau Projet" |
| `components/ui/dialog.tsx` | NEW - Shadcn Dialog |

### Completion Notes
- **Schéma Projects:**
  - Enum `project_status`: online, offline, provisioning
  - Foreign key vers `user.id` avec cascade delete
  - Types inférés exportés: `Project`, `NewProject`, `ProjectStatus`
  
- **Server Actions:**
  - `getProjects()`: Liste les projets de l'utilisateur connecté
  - `getProjectById(id)`: Récupère un projet avec vérification ownership
  - `createProject(name)`: Crée avec génération slug unique
  - `updateProject(id, data)`: Met à jour avec validation
  - `deleteProject(id)`: Supprime avec vérification ownership
  
- **Validation:**
  - Nom requis, min 3 caractères, max 100
  - Slug généré automatiquement, unicité garantie
  - Auth check sur toutes les actions
  
- **UI:**
  - Dialog de création avec validation et loading state
  - ProjectCard affiche slug et date au lieu de port
  - Dashboard avec bouton "Nouveau Projet"

- **Migration appliquée:** `drizzle-kit push` ✅
- **Build:** Exit code 0 ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation complète CRUD par James (Dev Agent) |
