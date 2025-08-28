import { NextResponse, NextRequest } from 'next/server'

// config run time
const runtime = "nodejs"

export function middleware(req: NextRequest ) {

  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
    const adminSession = req.cookies.get("admin_session")?.value;

    if (!adminSession || adminSession !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
// Apply middleware only to /admin paths
export const config = {
  matcher: ["/admin/:path*"],

};


