# Story 4.2: Copy-for-AI Context

## User Story
**En tant que** Développeur,
**Je veux** copier un contexte formaté pour les agents AI,
**Afin de** démarrer rapidement une session avec Claude/GPT.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Database schema, Clipboard API
- **Technologie:** Server Actions, Markdown generation
- **Points de contact:** Header component, `lib/actions/ai-context.ts`

## Acceptance Criteria

### Functional Requirements
1. **Bouton UI:** Bouton "Copy for AI" (icône Sparkles) dans le header.
2. **Schema Fetch:** Récupérer la liste des tables et colonnes.
3. **Prompt Generation:** Générer un prompt Markdown formaté.
4. **Contenu:**
   - Nom du projet
   - Liste des tables avec colonnes et types
   - Instructions pour l'agent AI
5. **Clipboard:** Copier le contenu dans le presse-papier.

### Integration Requirements
6. **Introspection:** Réutiliser la logique de Story 4.1.
7. **Toast:** Notification "Context copied!" après copie.

### Quality Requirements
8. **Warning:** Avertissement "Contains schema info, do not share publicly".
9. **Format:** Markdown bien formaté, lisible par AI.

## Technical Notes
- **Format du prompt:**
  ```markdown
  # Branch Project Context
  
  ## Database Schema
  
  ### Table: projects
  - id (uuid, primary key)
  - name (varchar, not null)
  - status (enum: online, offline, provisioning)
  - created_at (timestamp)
  
  ## Instructions
  You are an AI assistant connected to this PostgreSQL database.
  Use Drizzle ORM syntax for queries.
  ```

## Definition of Done
- [x] Bouton dans le header
- [x] Schema récupéré correctement
- [x] Prompt Markdown généré
- [x] Copie dans presse-papier
- [x] Toast notification
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
| `lib/actions/ai-context.ts` | NEW - generateAIContext avec Markdown |
| `components/header.tsx` | MODIFIED - Bouton Sparkles avec tooltip |
| `components/ui/tooltip.tsx` | NEW - Shadcn Tooltip |

### Completion Notes
- **Bouton Header:**
  - Icône Sparkles dans le header (côté droit)
  - Tooltip "Copy schema context for AI agents"
  - Loading state avec spinner
  - Toast success avec description

- **Génération Markdown:**
  - Header avec warning "Do not share publicly"
  - Timestamp de génération
  - Table de chaque table du schéma avec colonnes (type, nullable, default)
  - Section "Instructions for AI Assistant"
  - Tech stack complet (Next.js, Drizzle, Better-Auth, Shadcn)
  - Guidelines pour utiliser Server Actions et prepared statements
  - Exemple de code Drizzle

- Build réussi ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Implémentation Copy-for-AI Context par James (Dev Agent) |
