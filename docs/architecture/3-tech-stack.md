# 3. Tech Stack

### 3.1 Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | 5.x | Type Safety | Robustness and developer experience. |
| **Frontend Framework** | Next.js | 16+ (App Router) | Console Application | Server Components, Server Actions, performance. |
| **UI Component Library** | Shadcn/UI (Radix) | Latest | User Interface | "Premium" look, accessible, easy customization. |
| **CSS Framework** | Tailwind CSS | v4 | Styling | Utility-first, fast development. |
| **State Management** | TanStack Query | 5.x | Server State | Efficient data fetching and caching. |
| **Client State** | Zustand | 4.x | UI State | Simple, lightweight global store. |
| **Database** | PostgreSQL (Supabase) | 16 | Core Database | Managed by Supabase, robustness, JSON support. |
| **ORM** | Drizzle ORM | Latest | Database Access | Type-safe queries, migrations via drizzle-kit. |
| **Authentication** | Better-Auth | Latest | Auth Service | Email/Password, sessions, extensible. |
| **Deployment Platform** | Coolify | Latest | PaaS | Git push deploy, automatic SSL, Docker management. |
| **Package Manager** | npm | 10.x | Dependencies | Standard Node.js package manager. |
| **Testing** | Jest / Vitest | Latest | Unit Testing | Standard testing tools for Node.js ecosystem. |

### 3.2 Architecture Simplifiée

```
┌─────────────────────────────────────────────────────────────┐
│                        COOLIFY (VPS)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Next.js App (Branch)                    │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │ App Router  │  │ Server      │  │ Better-Auth │  │   │
│  │  │ (Pages)     │  │ Actions     │  │ (Auth API)  │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  │                         │                            │   │
│  │                   Drizzle ORM                        │   │
│  └─────────────────────────┼────────────────────────────┘   │
│                            │                                │
│                     Docker Network                          │
└────────────────────────────┼────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │    Supabase     │
                    │   PostgreSQL    │
                    └─────────────────┘
```

### 3.3 Connexion Base de Données

| Environnement | Host | Port |
|---------------|------|------|
| **Développement Local** | `coolify.sandro.click` | 5432 |
| **Production (Coolify)** | Hostname Docker interne | 5432 |