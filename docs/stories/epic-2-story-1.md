# Story 2.1: Next.js Console Boilerplate

## User Story
As a **Frontend Developer**,
I want **to initialize the Next.js project with Tailwind, Shadcn/UI and TanStack Query**,
So that **I have a solid foundation for building the UI**.

## Story Context
**Existing System Integration:**
- **Integrates with:** Docker (will eventually run in a container), but primarily a standalone Next.js app initially.
- **Technology:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React.
- **Touch points:** `console/` directory in the monorepo.

## Acceptance Criteria

### Functional Requirements
1.  **Project Init:** Create a new Next.js app in `console/` folder using `create-next-app`.
2.  **Dependencies:** Install `tanstack/react-query`, `lucide-react`, `clsx`, `tailwind-merge`.
3.  **UI Library:** Initialize Shadcn/UI (`npx shadcn-ui@latest init`) with:
    - Style: New York (or Default)
    - Base Color: Zinc/Slate (Dark mode default)
    - CSS Variables: Yes
4.  **Layout:** Create a global `layout.tsx` with a basic Sidebar navigation shell (placeholder links) and a Header.

### Integration Requirements
5.  **Linting:** Ensure ESLint and Prettier are configured.
6.  **Dark Mode:** Implement a ThemeProvider (next-themes) to force or toggle Dark Mode.

### Quality Requirements
7.  **Build Check:** `npm run build` must pass without errors.
8.  **Start Check:** `npm run dev` starts the server on port 3001 (to avoid conflict with PostgREST 3000 if running locally).

## Technical Notes
- **Directory Structure:**
    - `console/app/` (Pages)
    - `console/components/ui/` (Shadcn components)
    - `console/lib/` (Utils)
- **Design System:** Use standard Shadcn components (Button, Card, Input) to verify setup.

## Definition of Done
- [x] Next.js app created and running.
- [x] Shadcn/UI configured.
- [x] Basic Sidebar layout visible.
- [x] Dark mode working.

## Status
**Ready for Review**

---

## Dev Agent Record

### Agent Model Used
Gemini 2.5 (Antigravity)

### File List
| File | Status |
|------|--------|
| `components/theme-provider.tsx` | NEW |
| `components/theme-toggle.tsx` | NEW |
| `components/sidebar.tsx` | NEW |
| `components/header.tsx` | NEW |
| `components/query-provider.tsx` | NEW |
| `app/layout.tsx` | MODIFIED |
| `package.json` | MODIFIED (@tanstack/react-query, next-themes added) |

### Completion Notes
- Next.js 16.1.1 app with App Router already initialized (from previous session)
- Installed `@tanstack/react-query` and `next-themes`
- Created ThemeProvider with next-themes (dark mode default)
- Created QueryProvider with TanStack Query
- Created Sidebar with navigation links (Dashboard, Projects, Team, Billing, Settings)
- Created Header with ThemeToggle button
- Updated layout.tsx with full app shell (Sidebar + Header + content area)
- Build passed successfully ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Initial implementation by James (Dev Agent) |

