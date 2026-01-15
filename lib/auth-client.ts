import { createAuthClient } from "better-auth/react";

// Get the base URL - in production use the current domain, locally use localhost
const getBaseURL = () => {
    // If NEXT_PUBLIC_APP_URL is set, use it
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL;
    }

    // In browser, use current origin
    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    // Fallback for SSR
    return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
});

export const { signIn, signUp, signOut, useSession } = authClient;

