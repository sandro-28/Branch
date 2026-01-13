# Story 4.4: Backups & Exports

## User Story
**En tant qu'** Admin,
**Je veux** exporter mes données,
**Afin de** faire des sauvegardes.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Database, File download API
- **Technologie:** Server Actions, Blob download
- **Points de contact:** `app/export/page.tsx`, `lib/actions/export.ts`

## Acceptance Criteria

### Functional Requirements
1. **Export CSV:** Exporter une table en format CSV.
2. **Export JSON:** Exporter une table en format JSON.
3. **Table Selection:** Dropdown pour choisir la table.
4. **Download:** Téléchargement automatique du fichier.
5. **Filename:** Nom de fichier = `{table}_{timestamp}.{ext}`.

### Integration Requirements
6. **Query:** `SELECT * FROM {table}` pour récupérer les données.
7. **Streaming:** Pour les grosses tables, utiliser streaming.
8. **Limit:** Limite de 10,000 lignes par export (MVP).

### Quality Requirements
9. **Progress:** Indication de progression pour gros exports.
10. **UTF-8:** Encodage UTF-8 pour les fichiers.

## Technical Notes
- **CSV Generation:**
  ```typescript
  function toCSV(data: Record<string, unknown>[]) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  }
  ```

- **Download blob:**
  ```typescript
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  // trigger download
  ```

## Definition of Done
- [x] Export CSV fonctionne
- [x] Export JSON fonctionne
- [x] Sélection de table
- [x] Téléchargement automatique
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
| `lib/actions/export.ts` | NEW - exportTableCSV, exportTableJSON |
| `app/export/page.tsx` | NEW - Server component |
| `app/export/export-client.tsx` | NEW - Client avec Select et boutons |
| `components/ui/select.tsx` | NEW - Shadcn Select |
| `components/sidebar.tsx` | MODIFIED - Ajout lien Export |

### Completion Notes
- **Server Actions:**
  - `getExportableTables()`: Liste les tables public
  - `exportTableCSV()`: Export avec proper CSV escaping
  - `exportTableJSON()`: Export JSON formaté (pretty print)
  - Limite 10,000 lignes (MAX_ROWS)
  - Validation nom de table (regex)

- **UI:**
  - Select dropdown pour choisir la table
  - Boutons CSV et JSON avec icônes
  - Loading state pendant export
  - Toast avec nom de fichier et row count
  - Card info avec limites et encodage

- **Download:**
  - Blob creation avec MIME type correct
  - URL.createObjectURL pour trigger download
  - Filename: `{table}_{timestamp}.{ext}`
  - UTF-8 encoding

- Build réussi ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation Backups & Exports par James (Dev Agent) |
