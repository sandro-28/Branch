# Story 4.1: Génération TypeScript Types

## User Story
**En tant que** Développeur,
**Je veux** générer les types TypeScript depuis le schéma DB,
**Afin de** avoir du typage automatique dans mon code.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Drizzle ORM, information_schema
- **Technologie:** Server Actions, Clipboard API
- **Points de contact:** `app/types/page.tsx`, `lib/actions/types.ts`

## Acceptance Criteria

### Functional Requirements
1. **Bouton Generate:** Bouton "Generate Types" dans l'interface.
2. **Introspection:** Lire les tables et colonnes depuis information_schema.
3. **Type Generation:** Générer interfaces TypeScript pour chaque table.
4. **Affichage:** Afficher les types générés dans un code block.
5. **Copie:** Bouton pour copier dans le presse-papier.

### Integration Requirements
6. **Mapping Types:** Mapper les types PostgreSQL vers TypeScript.
7. **Nullable:** Gérer les colonnes nullable avec `| null`.

### Quality Requirements
8. **Syntax Highlighting:** Coloration syntaxique TypeScript.
9. **Toast:** Notification après copie.

## Technical Notes
- **Mapping types:**
  ```typescript
  const typeMap = {
    'uuid': 'string',
    'text': 'string',
    'varchar': 'string',
    'integer': 'number',
    'boolean': 'boolean',
    'timestamp': 'Date',
    'jsonb': 'Record<string, unknown>',
  };
  ```

- **Output example:**
  ```typescript
  export interface Projects {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'provisioning';
    createdAt: Date;
  }
  ```

## Definition of Done
- [x] Bouton Generate fonctionne
- [x] Types générés correctement
- [x] Mapping types PostgreSQL → TypeScript
- [x] Copie dans presse-papier
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
| `lib/actions/types.ts` | NEW - generateTypes avec mapping complet |
| `app/types/page.tsx` | NEW - Server component |
| `app/types/types-generator-client.tsx` | NEW - Client avec Monaco Editor |
| `app/types/loading.tsx` | NEW - Skeleton loader |
| `components/sidebar.tsx` | MODIFIED - Ajout lien Types |

### Completion Notes
- **Type Mapping Complet:**
  - Strings: uuid, text, varchar, char, citext
  - Numbers: integer, smallint, bigint, decimal, real, serial
  - Booleans: boolean, bool
  - Dates: timestamp, timestamptz, date, time
  - JSON: json, jsonb → Record<string, unknown>
  - Arrays: ARRAY → type[]
  - Other: bytea, inet, point, etc.

- **Fonctionnalités:**
  - Génère interfaces PascalCase depuis noms de tables
  - Gère nullable avec `| null`
  - Affichage Monaco Editor (read-only, syntax highlighting)
  - Bouton "Copier" avec clipboard API + toast
  - Header avec timestamp de génération
  - Badge compteur d'interfaces

- Build réussi ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation TypeScript Types Generator par James (Dev Agent) |
