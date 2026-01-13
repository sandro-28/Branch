# Story 3.3: Historique des Requêtes

## User Story
**En tant que** Développeur,
**Je veux** retrouver mes requêtes précédentes,
**Afin de** ne pas les retaper.

## Story Context
**Intégration Système:**
- **S'intègre avec:** SQL Console (Story 3.2), localStorage
- **Technologie:** React state, localStorage API
- **Points de contact:** `app/sql/page.tsx`, `hooks/use-query-history.ts`

## Acceptance Criteria

### Functional Requirements
1. **Auto-Save:** Sauvegarder automatiquement chaque requête exécutée.
2. **Limite:** Garder les 20 dernières requêtes maximum.
3. **Affichage:** Sidebar ou dropdown avec liste des requêtes.
4. **Preview:** Afficher les premiers 50 caractères de chaque requête.
5. **Reload:** Clic sur une requête → la charge dans l'éditeur.

### Integration Requirements
6. **localStorage:** Stocker en `branch-sql-history`.
7. **Timestamps:** Afficher la date/heure de chaque requête.
8. **Clear:** Bouton pour vider l'historique.

### Quality Requirements
9. **Persistence:** L'historique survit au refresh.
10. **UX:** Indication visuelle de la requête active.

## Technical Notes
- **Structure localStorage:**
  ```typescript
  interface QueryHistoryItem {
    id: string;
    query: string;
    executedAt: string;
    rowCount?: number;
  }
  ```

- **Custom Hook:**
  ```typescript
  function useQueryHistory() {
    const [history, setHistory] = useState<QueryHistoryItem[]>([]);
    
    const addQuery = (query: string, rowCount: number) => { ... };
    const clearHistory = () => { ... };
    
    return { history, addQuery, clearHistory };
  }
  ```

## Definition of Done
- [x] Requêtes sauvegardées automatiquement
- [x] Liste historique affichée
- [x] Clic recharge la requête
- [x] Bouton clear fonctionne
- [x] Persistence après refresh
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
| `lib/hooks/use-query-history.ts` | NEW - Custom hook avec localStorage |
| `app/sql/sql-console-client.tsx` | MODIFIED - Intégration sidebar historique |

### Completion Notes
- **Custom Hook useQueryHistory:**
  - Stockage en localStorage key `branch-sql-history`
  - Limite de 20 requêtes (MAX_HISTORY)
  - Auto-dédoublonnage (même requête = mise à jour)
  - Retourne: history, addQuery, clearHistory, removeItem

- **UI Sidebar Historique:**
  - Liste des requêtes avec preview 50 chars
  - Icône succès (vert) / erreur (rouge)
  - Timestamp "dd/mm hh:mm"
  - Row count si succès
  - Bouton clear (trash icon)
  - Highlight requête active
  - Clic charge dans l'éditeur avec toast

- Build réussi ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation historique requêtes par James (Dev Agent) |
