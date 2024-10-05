export { auth as authMiddleware } from "@/auth"

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    console.log("Middleware triggered for path:", path);

    const isPublic =
        path === "/login" || path === "/register";

    const token = request.cookies.get("token")?.value || "";

    if (isPublic && token) {
        console.log("Redirecting to home page");
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublic && !token) {
        console.log("Redirecting to login");
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // Let the request proceed as normal
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/", "/", "/private/setting", "/login", "/register", "/profile/:id*"],
};
