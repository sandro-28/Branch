# User Interface Design Goals

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
