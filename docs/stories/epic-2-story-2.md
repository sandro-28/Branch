# Story 2.2: Project List & Status View

## User Story
As a **User**,
I want **to see a list of my deployed projects with their status (Online/Offline)**,
So that **I have an overview of my infrastructure**.

## Story Context
**Existing System Integration:**
- **Integrates with:** Next.js Backend API (mocked for now)
- **Technology:** React Server Components (RSC) or Client Components with TanStack Query.
- **Touch points:** `/dashboard` page.

## Acceptance Criteria

### Functional Requirements
1.  **Dashboard Page:** Create `app/page.tsx` (or `/dashboard/page.tsx`) to serve as the main view.
2.  **Project List:** Display a grid of "Project Cards".
3.  **Project Card UI:** Each card must show:
    - Project Name
    - Project ID (slug)
    - Status Badge (Green dot for Online, Red for Offline, Yellow for Provisioning)
    - "Manage" button (link to project details).
4.  **Mock API:** Create a Next.js Route Handler (`app/api/projects/route.ts`) returning a static JSON list of projects to simulate the backend.

### Integration Requirements
5.  **State Management:** Use TanStack Query to fetch the project list from the API endpoint.
6.  **Loading State:** Show a Skeleton loader (Shadcn Skeleton) while fetching data.

### Quality Requirements
7.  **Responsive:** Grid changes from 1 column (mobile) to 3 columns (desktop).
8.  **Empty State:** If no projects exist, show a "Create your first project" empty state component.

## Technical Notes
- **Data Model:**
  ```typescript
  type Project = {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'provisioning';
    port: number;
    createdAt: string;
  }
  ```
- **Mock Data:** Return 2-3 dummy projects to verify the UI.

## Definition of Done
- [x] Dashboard page implemented.
- [x] Mock API endpoint created.
- [x] Project list fetching and rendering correctly.
- [x] Status badges visible.

## Status
**Ready for Review**

---

## Dev Agent Record

### Agent Model Used
Gemini 2.5 (Antigravity)

### File List
| File | Status |
|------|--------|
| `app/api/projects/route.ts` | NEW |
| `app/dashboard/page.tsx` | NEW |
| `lib/types.ts` | NEW |
| `lib/hooks/use-projects.ts` | NEW |
| `components/project-card.tsx` | NEW |
| `components/project-skeleton.tsx` | NEW |
| `components/empty-state.tsx` | NEW |
| `components/ui/card.tsx` | NEW (Shadcn) |
| `components/ui/badge.tsx` | NEW (Shadcn) |
| `components/ui/skeleton.tsx` | NEW (Shadcn) |

### Completion Notes
- Mock API retourne 3 projets (online, provisioning, offline)
- ProjectCard avec badges colorés et animation pulse pour status provisioning
- Grille responsive: 1 col mobile → 3 cols desktop
- EmptyState avec CTA "Create Project"
- TanStack Query pour le data fetching
- Build passé ✅

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Initial implementation by James (Dev Agent) |
