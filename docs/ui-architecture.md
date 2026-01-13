# Branch Frontend Architecture Document

## 1. Introduction

This document provides the detailed frontend architecture for the **Branch Console**, complementing the main `architecture.md`. It focuses on the User Interface implementation details, component standards, and frontend-specific workflows required for AI agents and developers to build a consistent "Premium" experience.

### 1.1 Template and Framework Selection
**Framework:** Next.js 14 (App Router)
**Starter Template:** Greenfield (Initialized via `create-next-app` with TypeScript, Tailwind, ESLint).
**Rationale:** Next.js 14 App Router is the current industry standard for React applications, offering Server Components for performance (Project List) and Client Components for interactivity (Table Editor). It aligns perfectly with the "Distributed Monolith" architecture defined in the main document.

### 1.2 Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2026-01-07 | 0.1 | Initial Draft | Winston (Architect) |

## 2. Frontend Tech Stack

### 2.1 Technology Stack Table
| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | Next.js | 14.x | App Framework | Server Components, Routing, Optimization. |
| **UI Library** | Shadcn/UI (Radix) | Latest | Component Primitives | Accessible, customizable, copy-paste architecture. |
| **State Management** | TanStack Query | v5 | Server State | Caching, deduplication, background updates. |
| **Local State** | Zustand | v4 | Client State | Simple global store for UI flags (e.g. sidebar open). |
| **Routing** | Next.js App Router | 14.x | Routing | File-system based routing. |
| **Build Tool** | Webpack / Turbo | Latest | Bundling | Built-in to Next.js. |
| **Styling** | Tailwind CSS | v3.4+ | Styling | Utility-first, consistently standard. |
| **Testing** | Jest + React Testing Library | Latest | Unit/Integration | Standard for React components. |
| **Icons** | Lucide React | Latest | Iconography | Clean, consistent SVG icons (standard with Shadcn). |
| **Data Grid** | TanStack Table | v8 | Table Editor | Headless table logic for complex data grids. |
| **Code Editor** | Monaco Editor | Latest | SQL Editor | VS Code like experience for SQL input. |
| **Form Handling** | React Hook Form | Latest | Forms | Performance and validation (Zod integration). |
| **Validation** | Zod | Latest | Schema Validation | Type-safe schema validation for forms & API. |

## 3. Project Structure

This structure is specifically designed for the `apps/web` directory within the Monorepo.

```plaintext
apps/web/
├── .next/                      # Build output
├── public/                     # Static assets (images, fonts)
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── (auth)/             # Auth routes group (login, register)
│   │   ├── (dashboard)/        # Dashboard routes group (protected)
│   │   │   ├── layout.tsx      # Dashboard layout (Sidebar, Header)
│   │   │   ├── page.tsx        # Projects list
│   │   │   └── project/
│   │   │       └── [id]/       # Dynamic project routes
│   │   │           ├── editor/ # Table Editor
│   │   │           ├── sql/    # SQL Editor
│   │   │           └── settings/
│   │   ├── api/                # Internal API Routes
│   │   ├── globals.css         # Global styles & Tailwind
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React Components
│   │   ├── ui/                 # Shadcn/UI Primitives (Button, Input...)
│   │   ├── layout/             # Layout components (Sidebar, Navbar)
│   │   ├── projects/           # Project-related components (Card, List)
│   │   ├── editor/             # Table Editor components
│   │   └── shared/             # Reusable shared components
│   ├── hooks/                  # Custom React Hooks
│   │   ├── use-projects.ts     # Data fetching hooks
│   │   └── use-store.ts        # Global state hooks
│   ├── lib/                    # Utilities & Configuration
│   │   ├── api.ts              # Axios/Fetch client
│   │   ├── utils.ts            # CN/Clsx helpers
│   │   └── constants.ts
│   ├── stores/                 # Zustand stores
│   ├── types/                  # TypeScript definitions
│   └── z-schema/               # Zod schemas for validation
├── .env.local                  # Environment variables
├── next.config.js              # Next.js config
├── package.json
├── tailwind.config.ts          # Tailwind config
└── tsconfig.json               # TypeScript config
```

## 4. Component Standards

### 4.1 Component Template
All components must be functional components with typed props.
```typescript
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

// 1. Define Variants (if applicable) using CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 2. Define Props Interface extending HTML attributes
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// 3. Component Definition
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### 4.2 Naming Conventions
- **Components:** PascalCase (e.g., `ProjectCard.tsx`).
- **Hooks:** camelCase with 'use' prefix (e.g., `useProject.ts`).
- **Utilities:** camelCase (e.g., `formatDate.ts`).
- **Folders:** kebab-case (e.g., `components/ui`).

## 5. State Management

### 5.1 Store Structure (Zustand)
Used for UI state (e.g., Sidebar open/close, current active theme).
```typescript
// src/stores/ui-store.ts
import { create } from 'zustand';

interface UiState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
```

### 5.2 Server State (TanStack Query)
Used for all data fetching.
```typescript
// src/hooks/use-projects.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Project } from '@/types';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get<Project[]>('/api/projects');
      return data;
    },
  });
}
```

## 6. Styling Guidelines

### 6.1 Styling Approach
We use **Tailwind CSS** combined with **Shadcn/UI** (which uses `class-variance-authority` and Radix UI).
- **Utility-First:** Use Tailwind classes for layout, spacing, and sizing.
- **Components:** Use Shadcn components for complex interactive elements.
- **Dark Mode:** Enabled by default.

### 6.2 Global Theme Variables (globals.css)
Standard Shadcn/UI theme configuration.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## 7. Frontend Developer Standards

### 7.1 Critical Coding Rules
1.  **Use Client Components Sparingly:** By default, use Server Components. Only add `"use client"` when interactivity (useState, useEffect) is strictly needed.
2.  **No Direct API Calls in Components:** Always create a hook (e.g., `useProjects`) wrapping the React Query logic.
3.  **Strict Typing:** `any` is forbidden. Use Zod schemas to infer types where possible.
4.  **Accessibility First:** Never remove outline focus rings without replacing them. Use semantic HTML.

### 7.2 Quick Reference
- **Start Dev:** `npm run dev`
- **Add Component:** `npx shadcn-ui@latest add [component-name]`
- **Lint:** `npm run lint`
- **Import Alias:** `@/components`, `@/lib`, `@/hooks`
