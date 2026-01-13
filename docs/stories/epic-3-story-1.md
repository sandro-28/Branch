# Story 3.1: Table Explorer (Read-Only)

## User Story
**En tant que** Développeur,
**Je veux** explorer les tables de ma base de données,
**Afin de** visualiser la structure et les données.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Drizzle ORM (raw SQL), PostgreSQL information_schema
- **Technologie:** Server Actions, Shadcn DataTable
- **Points de contact:** `app/tables/page.tsx`, `lib/actions/tables.ts`

## Acceptance Criteria

### Functional Requirements
1. **Liste Tables:** Afficher toutes les tables du schéma `public`.
2. **Sélection:** Clic sur une table → affichage de son contenu.
3. **Colonnes:** Afficher header avec nom de colonne et type.
4. **Données:** Afficher les lignes dans une DataTable.
5. **Pagination:** 25 lignes par page, navigation prev/next.

### Integration Requirements
6. **Introspection:** Query `information_schema.tables` et `information_schema.columns`.
7. **Select Data:** `SELECT * FROM {table} LIMIT 25 OFFSET {offset}`.
8. **Count:** Afficher le nombre total de lignes.

### Quality Requirements
9. **Loading:** Skeleton pendant le chargement.
10. **Empty State:** Message si table vide.
11. **Responsive:** Scroll horizontal sur mobile.

## Technical Notes
- **Query introspection:**
  ```sql
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  ```

- **Query colonnes:**
  ```sql
  SELECT column_name, data_type FROM information_schema.columns
  WHERE table_name = '{table}';
  ```

## Definition of Done
- [x] Liste des tables affichée
- [x] Contenu de table affiché
- [x] Pagination fonctionnelle
- [x] Types de colonnes affichés
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
| `lib/actions/tables.ts` | NEW - getTables, getTableColumns, getTableData |
| `app/tables/page.tsx` | NEW - Server component |
| `app/tables/table-explorer-client.tsx` | NEW - Client component avec UI |
| `app/tables/loading.tsx` | NEW - Skeleton loader |
| `components/sidebar.tsx` | MODIFIED - Ajout lien Tables |
| `components/ui/table.tsx` | NEW - Shadcn Table |

### Completion Notes
- **Server Actions:**
  - `getTables()`: Liste toutes les tables public avec row count
  - `getTableColumns()`: Récupère colonnes avec nom, type, nullable
  - `getTableData()`: Données paginées (25 par page)
  
- **UI Features:**
  - Sidebar avec liste des tables et row count badge
  - Table avec header (nom + type) et données
  - Pagination prev/next avec indicateur page
  - Empty state pour tables vides
  - Loading skeleton
  - Scroll horizontal responsive

- **Sécurité:**
  - Validation regex sur noms de tables
  - Protection contre SQL injection

- Build réussi ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation Table Explorer par James (Dev Agent) |
