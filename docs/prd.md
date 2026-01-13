# Branch Product Requirements Document (PRD)

## Goals and Background Context

### Goals
*   **Cost Reduction:** Reduce database costs for multi-project developers (~$20/mo for a VPS vs ~$300/mo in SaaS).
*   **High Availability:** Guarantee 99.9% uptime for connected applications via robust architecture (PgBouncer).
*   **Instant Provisioning:** Achieve a "Time-to-Project" of < 5 seconds for provisioning a new database.
*   **AI Autonomy:** Ensure total autonomy for AI Agents: ability to initialize and modify structure (Tables + Data) via API without human intervention.
*   **Hybrid Experience:** Merge the "Premium" user experience (Visual Dashboard) with an "AI-Native" architecture (Swagger, Admin API).

### Background Context
Independent developers and creators using AI Agents are currently stuck between the prohibitive cost of SaaS solutions like Supabase (billed per project) and the complexity of managing self-hosting on a VPS. Furthermore, existing tools are not optimized for interactions with AI Agents (lack of standardized API documentation, programmatic migration difficulties).

Branch solves this problem by offering a "Self-Hosted Database as a Service" stack deployable on a single VPS. It offers a modern management interface for humans and a standardized API for AI, thus combining data sovereignty, economies of scale, and advanced automation.

### Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2026-01-07 | 0.1 | Initial Draft | John (PM) |

## Requirements

### Functional Requirements (FR)
*   **FR1:** The user must be able to provision a new database (project) in one click from the dashboard.
*   **FR2:** The system must automatically deploy an isolated PostgreSQL 16 Docker container for each project.
*   **FR3:** The system must expose a full RESTful API for each database via PostgREST.
*   **FR4:** The system must automatically generate an OpenAPI 3.0 compliant `swagger.json` file for each project, accessible via a secure public URL.
*   **FR5:** The system must provide an "Admin" API endpoint (`/api/admin/query`) allowing execution of raw SQL queries (migrations) authenticated by an Admin Key.
*   **FR6:** The Dashboard must allow viewing and modifying table data (Table Editor).
*   **FR7:** The Dashboard must allow executing arbitrary SQL queries (SQL Editor).
*   **FR8:** The system must manage end-user authentication via GoTrue (or self-hosted equivalent).
*   **FR9:** The system must use PgBouncer to manage connection pooling and support a high number of simultaneous connections.
*   **FR10:** The system must automatically secure access via SSL (Let's Encrypt) managed by Traefik.

### Non-Functional Requirements (NFR)
*   **NFR1:** The system must run on a single VPS (Ubuntu/Debian) with minimum 4 vCPU / 8GB RAM.
*   **NFR2:** Provisioning a new project must take less than 5 seconds (Time-to-Project).
*   **NFR3:** The architecture must support at least 10 active projects simultaneously on the target hardware without notable performance degradation.
*   **NFR4:** All external communications must be encrypted (HTTPS only).
*   **NFR5:** The Dashboard user interface must respect WCAG AA accessibility standards (to the extent possible with Shadcn/UI components).
*   **NFR6:** The logging system must implement strict rotation to avoid filling the VPS disk.

## User Interface Design Goals

### Overall UX Vision
The interface must be radically simple, clean, and fast. It should evoke reliability and modernity (Vercel/Supabase style). The user should never feel like a "SysAdmin". Everything complex (raw logs, Docker config) is abstracted behind an elegant UI. "Dark Mode" is enabled by default.

### Key Interaction Paradigms
*   **Instant Feedback:** Actions (table creation, save) must seem instant (Optimistic UI).
*   **Contextual Actions:** Edit options appear on hover or right-click (e.g., modify a row in the Table Editor).
*   **Code-First Hints:** Wherever relevant, display the code snippet (curl, JS, Python) corresponding to the action performed via the UI (to educate the user or help them configure their Agent).

### Core Screens and Views
1.  **Project Hub (Main Dashboard):** List of projects with status (Health check), quick CPU/RAM usage, and "New Project" button.
2.  **Table Editor:** "Spreadsheet" type view (Airtable-like) to see and edit data, add columns. This is the heart of the "No-Code" experience.
3.  **SQL Editor:** A simple console with auto-completion to execute raw SQL.
4.  **API Docs View:** A view integrating Swagger UI to explore the generated API of the current project.
5.  **Settings & Keys:** Management of API keys (Service Key, Anon Key) and DB connection.

### Accessibility
*   **Standard:** WCAG AA.
*   **Focus:** Full keyboard support for the Table Editor (arrow navigation, enter to edit) for power users.

### Branding
*   **Style:** Minimalist, "Developer Professional".
*   **Palette:** Grayscale, subtle accents (green for success/online, red for error/offline). Use of `Inter` or `Geist Mono` font.
*   **Components:** Shadcn/UI (Radix primitives) to ensure consistency and accessibility.

### Target Device and Platforms
*   **Primary:** Desktop Web (Chrome/Firefox/Edge/Safari). It is a pro work tool.
*   **Secondary:** Web Responsive (quick consultation on mobile, but no complex editing).

## Technical Assumptions

### Repository Structure
*   **Monorepo:** A single repository containing the Infrastructure code (Docker Compose, Scripts) and the Console code (Next.js). This simplifies version management and unified deployment.

### Service Architecture
*   **Microservices (Containerized):** The architecture is intrinsically based on microservices orchestrated by Docker Compose.
    *   **Proxy:** Traefik (Reverse Proxy, SSL termination).
    *   **Core:** PostgreSQL 16 (DB).
    *   **API Layer:** PostgREST (REST API), PgBouncer (Connection Pooling).
    *   **Auth:** GoTrue (or lightweight self-hosted equivalent).
    *   **Console:** Next.js App (Node.js/Static).
*   **Communication:** Internal Docker network for backend services. HTTP/HTTPS exposure via Traefik only.

### Testing Requirements
*   **Unit Testing:** Jest/Vitest for Console business logic (utilities, parsing).
*   **Integration Testing:** API tests on generated PostgREST endpoints to validate that the DB+API stack responds correctly.
*   **E2E Testing:** Playwright to test critical Dashboard flows (Project Creation, Login, Table Edit) on a staging environment.

### Additional Technical Assumptions and Requests
*   **Backend Language:** Shell/Bash for orchestration scripts, SQL for DB. Go or Rust if a custom binary is needed (e.g., a lightweight monitoring agent), but existing standard tools are preferred.
*   **Frontend Language:** TypeScript, React, Next.js 14 (App Router).
*   **State Management:** TanStack Query (React Query) to manage server state (it's a very "data-heavy" app). Zustand for local UI state.
*   **Styling:** Tailwind CSS + Shadcn/UI.
*   **Deployment Target:** Standard Linux VPS (Ubuntu 22.04 LTS or 24.04 LTS). Docker and Docker Compose must be the only pre-required system dependencies.

## Epic List

*   **Epic 1: Foundation & Core Stack Initialization:** Establish the core Docker infrastructure (Postgres + PostgREST + Traefik) and prove manual deployment of a functional "Branch Stack" on a VPS. Deliver a secure "Hello World" API.
*   **Epic 2: The Console Shell & Project Management:** Create the Next.js application (Console) and implement project management (CRUD). The user must be able to click "New Project" in the UI and see a DB container launch in the background.
*   **Epic 3: AI-Native Features (Swagger & Admin API):** Implement automatic `swagger.json` generation and the `/api/admin/query` endpoint. This Epic makes the product usable by AI Agents.
*   **Epic 4: Data Management UI (Table & SQL Editors):** Develop rich interfaces for humans: Table Editor (visualization, inline editing) and SQL Editor. This is the visible "No-Code" part.
*   **Epic 5: Authentication & Security Hardening:** Integrate GoTrue for end-user auth, secure Admin endpoints, and finalize automatic SSL management. Prepare for "Production".

## Epic 1: Foundation & Core Stack Initialization

**Goal:** Establish the core Docker infrastructure capable of launching a complete "Branch" instance (Postgres + PostgREST + Traefik) and validate secure external connectivity.

### Story 1.1: Docker Compose Base Template
*   **As a** DevOps Engineer,
*   **I want** a validated `docker-compose.yml` template defining the core services (Postgres 16, PostgREST),
*   **so that** I have a reproducible unit of deployment for future projects.
*   **Acceptance Criteria:**
    1.  The `docker-compose.yml` file launches Postgres 16 and PostgREST successfully.
    2.  PostgREST is connected to Postgres and exposes the API on internal port 3000.
    3.  Environment variables (DB_PASSWORD, JWT_SECRET) are managed via a `.env` file.

### Story 1.2: Traefik Reverse Proxy Setup
*   **As a** System Administrator,
*   **I want** to configure Traefik as the main entry point (Reverse Proxy),
*   **so that** I can route requests to specific project containers based on subdomains or paths.
*   **Acceptance Criteria:**
    1.  Traefik is configured in `docker-compose.yml` (or a separate "Ingress" compose).
    2.  The Traefik Dashboard is accessible (secured by Basic Auth).
    3.  Traefik automatically detects new Docker services with appropriate labels.

### Story 1.3: Automated SSL with Let's Encrypt
*   **As a** Security Officer,
*   **I want** automatic SSL certificate generation for exposed services,
*   **so that** all traffic is encrypted via HTTPS without manual intervention.
*   **Acceptance Criteria:**
    1.  Traefik is configured with the ACME resolver (Let's Encrypt).
    2.  A "Hello World" test service is deployed and accessible via valid HTTPS (green lock).
    3.  Renewal is configured automatically.

### Story 1.4: Connection Pooling with PgBouncer
*   **As a** Backend Developer,
*   **I want** to integrate PgBouncer into the stack,
*   **so that** the database can handle many simultaneous short-lived connections (typical of Serverless/AI agents).
*   **Acceptance Criteria:**
    1.  PgBouncer is added to `docker-compose.yml` in front of Postgres.
    2.  PostgREST connects to Postgres *via* PgBouncer.
    3.  A simple load test (with `pgbench` or script) validates that connections are pooled.

## Epic 2: The Console Shell & Project Management

**Goal:** Create the Console application (Next.js) and allow project (database) creation/management via a graphical interface. This is the "Control Plane" of Branch.

### Story 2.1: Next.js Console Boilerplate
*   **As a** Frontend Developer,
*   **I want** to initialize the Next.js project with Tailwind, Shadcn/UI and TanStack Query,
*   **so that** I have a solid foundation for building the UI.
*   **Acceptance Criteria:**
    1.  Next.js 14 (App Router) project initialized.
    2.  Shadcn/UI installed with "Branch" theme (Gray/Black).
    3.  Basic Layout (Sidebar, Header) implemented.

### Story 2.2: Project List & Status View
*   **As a** User,
*   **I want** to see a list of my deployed projects with their status (Online/Offline),
*   **so that** I have an overview of my infrastructure.
*   **Acceptance Criteria:**
    1.  "Dashboard" view displaying a grid/list of "Project" cards.
    2.  Each card displays: Name, ID, Status (mocked for now or real ping).
    3.  API mocked (or real via Docker folder reading) to list projects.

### Story 2.3: "New Project" Workflow (Provisioning)
*   **As a** User,
*   **I want** to create a new database project by entering a name and clicking "Create",
*   **so that** I don't have to touch the command line.
*   **Acceptance Criteria:**
    1.  Creation form (Project Name, Optional DB Password).
    2.  Backend (Next.js API Route) that triggers a provisioning script (copy docker-compose template + `docker compose up`).
    3.  Visual feedback "Provisioning..." with spinner, then redirection to the project once ready (< 5s).

### Story 2.4: Project Details & Connection Strings
*   **As a** Developer,
*   **I want** to view the connection strings (Postgres URI, API URL, Anon Key) for a project,
*   **so that** I can connect my external applications or agents.
*   **Acceptance Criteria:**
    1.  "Settings" or "Connect" page in the project dashboard.
    2.  Clear display of credentials with "Copy" button.
    3.  "Reset Password" button (optional for MVP but desirable).

## Epic 3: AI-Native Features (Swagger & Admin API)

**Goal:** Make each Branch project "readable" and "controllable" by a standard AI Agent.

### Story 3.1: Auto-Generated Swagger/OpenAPI Spec
*   **As a** Code Agent,
*   **I want** to access a `/swagger.json` endpoint for any given project,
*   **so that** I can understand the full database schema and available API endpoints without hallucinating.
*   **Acceptance Criteria:**
    1.  Integration of `swagger-ui-dist` or equivalent served by PostgREST.
    2.  The endpoint is publicly accessible (or secured via Anon Key, to be defined).
    3.  The JSON reflects DB schema changes in real-time.

### Story 3.2: Admin SQL Query API
*   **As a** Code Agent,
*   **I want** to execute raw SQL (DDL/DML) via a secure HTTP endpoint (`POST /api/admin/query`),
*   **so that** I can run migrations, create tables, or seed data programmatically.
*   **Acceptance Criteria:**
    1.  Dedicated API endpoint (part of the "Branch Management API").
    2.  Secured by a `SERVICE_ROLE_KEY` (must never be exposed to public client).
    3.  Accepts raw SQL in body and returns JSON result or Postgres error.
    4.  Executes queries in transactional mode (Rollback if error).

### Story 3.3: "Copy for AI" Context Feature
*   **As a** Developer,
*   **I want** a "Copy Context" button in the Dashboard,
*   **so that** I can paste a comprehensive prompt snippet (Schema summary + API Keys) into my AI chat to start a session.
*   **Acceptance Criteria:**
    1.  Button in the Project Dashboard header.
    2.  Generates a formatted Markdown text containing: API URL, Keys (masked by default), Summary of main tables.

## Epic 4: Data Management UI (Table & SQL Editors)

**Goal:** Offer a rich visual interface ("No-Code") to manipulate data and structure.

### Story 4.1: SQL Editor Console
*   **As a** Developer,
*   **I want** to write and execute SQL queries directly in the browser,
*   **so that** I can debug data or create complex views quickly.
*   **Acceptance Criteria:**
    1.  Code editor component (Monaco Editor or CodeMirror) with SQL syntax highlighting.
    2.  Result area displaying data in table or JSON errors.
    3.  Query history (local storage).

### Story 4.2: Table Browser (Read-Only)
*   **As a** User,
*   **I want** to view my table data in a spreadsheet-like grid,
*   **so that** I can verify data integrity visually.
*   **Acceptance Criteria:**
    1.  Performant data grid (TanStack Table).
    2.  Pagination and Sorting by column.
    3.  Support for basic Postgres types (Text, Int, Bool, basic JSONB).

### Story 4.3: Table Editor (Inline Editing)
*   **As a** User,
*   **I want** to edit cell values by double-clicking them,
*   **so that** I can fix typos or update records without writing SQL.
*   **Acceptance Criteria:**
    1.  Double-click transforms cell into input.
    2.  "Blur" or "Enter" saves the modification via API (PATCH).
    3.  Error handling (e.g., type constraint violation).

### Story 4.4: Schema Visualizer (Table Creator UI)
*   **As a** No-Code User,
*   **I want** to create a new table via a visual wizard,
*   **so that** I don't need to know `CREATE TABLE` syntax.
*   **Acceptance Criteria:**
    1.  "New Table" interface: Name, Columns (Name, Type, Nullable, Primary Key).
    2.  Generation and execution of corresponding SQL in backend.

## Epic 5: Authentication & Security Hardening

**Goal:** Finalize security and authentication to make the platform "Production Ready".

### Story 5.1: GoTrue Integration
*   **As a** User,
*   **I want** to manage end-users (Sign Up, Login, Password Reset) via an API,
*   **so that** my applications have a ready-to-use Auth system.
*   **Acceptance Criteria:**
    1.  GoTrue (or equivalent) is integrated into each project's Docker stack.
    2.  JWT tokens generated by GoTrue are accepted by PostgREST (Row Level Security).
    3.  "Users" view in the Dashboard to see/delete registered users.

### Story 5.2: API Key Management (Rotation)
*   **As a** Security Officer,
*   **I want** to be able to roll/regenerate API keys (Service Key, Anon Key),
*   **so that** I can revoke access if a key is compromised.
*   **Acceptance Criteria:**
    1.  Backend function to regenerate JWT Secret and signed keys.
    2.  Automatic update of PostgREST container environment variables (restart without downtime if possible, or fast).

### Story 5.3: IP Allow-listing (Firewall)
*   **As a** SysAdmin,
*   **I want** to restrict access to the Admin API (`/api/admin/*`) to specific IPs (e.g., my Vercel backend),
*   **so that** I reduce the attack surface.
*   **Acceptance Criteria:**
    1.  Traefik middleware configuration for IP Whitelist.
    2.  Simple UI interface to add/remove an IP.

## Checklist Results Report

### Checklist Validation Summary (YOLO Mode)

#### Executive Summary
*   **Overall PRD Completeness:** 95%
*   **MVP Scope Appropriateness:** **Just Right**. The scope is strictly limited to the "Branch Stack" core (Postgres/PostgREST/Traefik) and the Console. Features like "Edge Functions" or "Storage" were correctly excluded.
*   **Readiness for Architecture Phase:** **READY**. The technical choices (Docker Compose, Next.js, Traefik) and Epics are clear enough for an architect to design the system.
*   **Most Critical Gaps:**
    *   Specifics of "GoTrue" self-hosted integration might be tricky (configuration complexity).
    *   The "Provisioning Script" mechanism (Story 2.3) needs careful security design (how Next.js talks to Docker socket securely).

#### Category Analysis Table

| Category | Status | Critical Issues |
| :--- | :--- | :--- |
| 1. Problem Definition & Context | **PASS** | None. Clear problem statement and user segments. |
| 2. MVP Scope Definition | **PASS** | None. "No-MVP Strategy" is clear but scoped correctly. |
| 3. User Experience Requirements | **PASS** | None. Vision is strong (Vercel-like). |
| 4. Functional Requirements | **PASS** | None. Requirements are testable and cover the brief. |
| 5. Non-Functional Requirements | **PASS** | None. Performance and hardware constraints defined. |
| 6. Epic & Story Structure | **PASS** | None. Logical flow from Infra -> App -> Features. |
| 7. Technical Guidance | **PASS** | None. Stack is standard and well-defined. |
| 8. Cross-Functional Requirements | **PASS** | None. Security (SSL, IP Whitelist) included. |
| 9. Clarity & Communication | **PASS** | None. Document is structured and readable. |

#### Top Recommendations
1.  **Architecture Deep Dive (Story 2.3):** The architect should prioritize defining the security model for the Console -> Docker interactions. Running Next.js with access to Docker Socket is a risk that needs mitigation (e.g., a proxy or specific capabilities).
2.  **GoTrue Alternatives:** Investigate if a lighter Auth service than GoTrue exists for self-hosting if GoTrue proves too resource-heavy for a small VPS.

#### Final Decision
**READY FOR ARCHITECT**

## Next Steps

### UX Expert Prompt
"You are a UX Expert. Review the 'User Interface Design Goals' and 'Epic 4' sections of the `docs/prd.md`. Create a low-fidelity wireframe description or a list of key UI components (using Shadcn/UI references) for the 'Project Hub', 'Table Editor', and 'SQL Editor' screens. Focus on the 'Code-First Hints' interaction paradigm."

### Architect Prompt
"You are a Senior System Architect. Using the `docs/prd.md`, design the system architecture. Focus specifically on:
1.  The `docker-compose.yml` template structure for the 'Branch Stack'.
2.  The secure communication channel between the Next.js Console and the Docker Daemon (for provisioning).
3.  The integration of Traefik for automatic SSL and routing.
Produce the `docs/architecture.md` file."
