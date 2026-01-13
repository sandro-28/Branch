# Technical Assumptions

### Repository Structure

*   **Flat Structure:** Single repository containing the Next.js application code. No monorepo setup required.
*   **Key Directories:**
    *   `app/` - Next.js App Router pages and API routes
    *   `lib/` - Core utilities (database, auth, schema)
    *   `components/` - React components (Shadcn UI)
    *   `drizzle/` - Generated database migrations

### Service Architecture

*   **Monolithic Application:** Single Next.js application handling all concerns (UI, API, Auth).
*   **External Database:** Supabase PostgreSQL, accessed via Drizzle ORM.
*   **Managed Deployment:** Coolify handles container orchestration, SSL, and routing.

| Layer | Technology |
|-------|------------|
| **UI** | Next.js App Router + Shadcn UI |
| **API** | Next.js Server Actions |
| **Auth** | Better-Auth (Email/Password) |
| **ORM** | Drizzle ORM |
| **Database** | Supabase PostgreSQL |
| **Deployment** | Coolify (Git push → Deploy) |

### Testing Requirements

*   **Unit Testing:** Vitest for business logic and utilities.
*   **Component Testing:** Testing Library for React components.
*   **E2E Testing:** Playwright for critical user flows.

### Infrastructure Constraints (NON-NEGOTIABLE)

| Constraint | Value |
|------------|-------|
| **Deployment** | Coolify (Git push on `main`) |
| **Database** | PostgreSQL via Supabase (external) |
| **Local DB Access** | `coolify.sandro.click:5432` |
| **Production DB Access** | Docker internal network |
| **Docker Compose** | ❌ NOT USED |
| **SQLite** | ❌ NOT USED |
| **In-memory DB** | ❌ NOT USED |

### Technical Stack Summary

| Category | Choice |
|----------|--------|
| **Framework** | Next.js 16+ (App Router, TypeScript) |
| **ORM** | Drizzle ORM (drizzle-kit for migrations) |
| **Auth** | Better-Auth (Email/Password) |
| **UI** | Tailwind CSS v4 + Shadcn UI + Lucide React |
| **Package Manager** | npm |