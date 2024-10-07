import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthSession } from "./lib/user";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log("Middleware triggered for path:", path);

    const isPublic =
        path === "/login" ||
        path === "/register" ||
        path === "/forget-password" ||
        path.startsWith("/reset-password"); // Use startsWith to capture `/reset-password` and query parameters

    const sessionData = await getAuthSession();
    const user = sessionData?.user;

    console.log("Session data:", sessionData); // Debug session data

    // Redirect authenticated users trying to access public routes
    if (isPublic && user) {
        console.log("Redirecting to home page");
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!isPublic && !user) {
        console.log("Redirecting to login");
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: [
        "/",
        "/private/setting",
        "/private/dashboard",
        "/login",
        "/register",
        "/forget-password",
        "/reset-password/:path*", // Allows all paths starting with `/reset-password`
    ],
};
