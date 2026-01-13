import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Handlers créés dynamiquement à chaque requête
export async function GET(request: Request) {
    const auth = getAuth();
    const handler = toNextJsHandler(auth);
    return handler.GET(request);
}

export async function POST(request: Request) {
    const auth = getAuth();
    const handler = toNextJsHandler(auth);
    return handler.POST(request);
}
