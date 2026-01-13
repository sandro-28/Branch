# Story 3.2: SQL Console

## User Story
**En tant que** Développeur,
**Je veux** exécuter des requêtes SQL directement dans le navigateur,
**Afin de** débugger et manipuler les données rapidement.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Drizzle ORM (execute raw), Monaco Editor
- **Technologie:** Server Actions, @monaco-editor/react
- **Points de contact:** `app/sql/page.tsx`, `lib/actions/sql.ts`

## Acceptance Criteria

### Functional Requirements
1. **Éditeur SQL:** Monaco Editor avec coloration syntaxique SQL.
2. **Exécution:** Bouton "Run" envoie la requête au serveur.
3. **Résultats:** Affichage en DataTable avec colonnes dynamiques.
4. **Erreurs:** Affichage des erreurs PostgreSQL en alert rouge.
5. **Raccourci:** `Ctrl+Enter` / `Cmd+Enter` pour exécuter.

### Integration Requirements
6. **Server Action:** `executeSQL(query)` exécute et retourne résultats.
7. **Sécurité:** Vérifier que l'utilisateur est authentifié.
8. **Timeout:** Timeout de 30s pour éviter les requêtes infinies.

### Quality Requirements
9. **Loading:** Spinner pendant l'exécution.
10. **Row Count:** Afficher le nombre de lignes retournées.
11. **Responsive:** Editor adapté à la hauteur disponible.

## Technical Notes
- **Monaco Editor:**
  ```typescript
  import Editor from '@monaco-editor/react';
  
  <Editor
    height="300px"
    language="sql"
    theme="vs-dark"
    value={query}
    onChange={setQuery}
  />
  ```

- **Server Action:**
  ```typescript
  export async function executeSQL(query: string) {
    const result = await db.execute(sql.raw(query));
    return { rows: result, rowCount: result.length };
  }
  ```

## Definition of Done
- [x] Éditeur SQL avec coloration syntaxique
- [x] Exécution de requêtes fonctionne
- [x] Résultats affichés en table
- [x] Erreurs affichées correctement
- [x] Raccourci clavier fonctionne
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
| `lib/actions/sql.ts` | NEW - executeSQL avec timeout 30s |
| `app/sql/page.tsx` | NEW - Server component |
| `app/sql/sql-console-client.tsx` | NEW - Client avec Monaco Editor |
| `app/sql/loading.tsx` | NEW - Skeleton loader |
| `components/sidebar.tsx` | MODIFIED - Ajout lien SQL |

### Completion Notes
- **Monaco Editor:**
  - Coloration syntaxique SQL (theme vs-dark)
  - Raccourci Ctrl+Enter / Cmd+Enter pour exécuter
  - Options: minimap off, word wrap on, font size 14

- **Server Action executeSQL:**
  - Exécute requête SQL brute via Drizzle
  - Timeout de 30 secondes
  - Retourne colonnes, rows, rowCount, executionTime
  - Gestion erreurs PostgreSQL

- **UI:**
  - Affichage résultats en DataTable
  - Affichage erreurs en alert rouge avec message
  - Badge row count + temps d'exécution
  - Toast notifications success/error
  - Loading state pendant exécution

- Build réussi ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation SQL Console par James (Dev Agent) |
