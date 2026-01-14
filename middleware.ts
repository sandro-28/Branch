import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes publiques (accessibles sans auth)
const publicRoutes = ["/login", "/register", "/api/auth"];

// Routes qui nécessitent une authentification
const protectedRoutes = [
    "/dashboard",
    "/projects",
    "/tables",
    "/sql",
    "/admin",
    "/logs",
    "/types",
    "/export",
    "/team",
    "/billing",
    "/settings",
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Vérifier si c'est une route publique
    const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // Vérifier si c'est une route protégée
    const isProtectedRoute = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // Récupérer le token de session depuis les cookies
    // Better-Auth stocke la session dans un cookie
    const sessionToken = request.cookies.get("better-auth.session_token");

    // Si route protégée et pas de session → redirection vers login
    if (isProtectedRoute && !sessionToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Si route auth (login/register) et déjà connecté → redirection vers dashboard
    if ((pathname === "/login" || pathname === "/register") && sessionToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
