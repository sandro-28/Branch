# Requirements

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
