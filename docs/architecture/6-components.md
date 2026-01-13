# 6. Components

### 6.1 Component Diagram (C4 Container)

```mermaid
graph TB
    User[User]
    
    subgraph Coolify ["Coolify (VPS)"]
        NextJS["Next.js App"]
        
        subgraph AppLayers ["Application Layers"]
            Pages["App Router (Pages)"]
            ServerActions["Server Actions"]
            AuthRoutes["Auth API Routes"]
        end
        
        subgraph Libraries ["Core Libraries"]
            DrizzleORM["Drizzle ORM"]
            BetterAuth["Better-Auth"]
            ShadcnUI["Shadcn UI Components"]
        end
    end
    
    subgraph Supabase ["Supabase (External)"]
        Postgres[(PostgreSQL 16)]
    end
    
    User -->|HTTPS| NextJS
    NextJS --> Pages
    Pages --> ServerActions
    Pages --> AuthRoutes
    
    ServerActions --> DrizzleORM
    AuthRoutes --> BetterAuth
    BetterAuth --> DrizzleORM
    
    DrizzleORM -->|TCP 5432| Postgres
```

### 6.2 Key Components

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| **App Router** | Next.js 16+ | Page routing, layouts, SSR/SSG |
| **Server Actions** | Next.js | Data mutations, form handling |
| **Auth API** | Better-Auth | `/api/auth/[...all]` - login, signup, sessions |
| **ORM Layer** | Drizzle ORM | Database queries, schema definition |
| **UI Components** | Shadcn/UI | Buttons, forms, cards, dialogs |
| **Database** | Supabase PostgreSQL | Data persistence, user/session storage |

### 6.3 File Structure

```
lib/
├── db.ts           # Drizzle connection (getDb singleton)
├── schema.ts       # Schema index
├── auth-schema.ts  # user, session, account, verification tables
├── auth.ts         # Better-Auth configuration (getAuth)
├── auth-client.ts  # React client (signIn, signUp, useSession)
└── utils.ts        # Shadcn utilities (cn function)

app/
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout
├── globals.css                 # Tailwind styles
└── api/auth/[...all]/route.ts  # Better-Auth handler
```