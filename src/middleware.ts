// src/middleware.ts
import { NextResponse, NextRequest } from "next/server";

export const runtime = "nodejs";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip API routes
  if (pathname.startsWith("/api")) return NextResponse.next();

  // Pages to protect
  const protectedPages = ["/admin", "/system", "/dashboard"];
  const isProtected = protectedPages.some((p) => pathname.startsWith(p));

  if (isProtected) {
    const adminSession = req.cookies.get("admin_session")?.value;
    if (!adminSession) {
      // Redirect to login with `redirect` param
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname); // <== save original page
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/system/:path*", "/dashboard/:path*"],
};
