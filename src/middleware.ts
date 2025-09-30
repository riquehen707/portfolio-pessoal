// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (needsAuth && !pathname.startsWith("/admin/login")) {
    const cookie = req.cookies.get("admin");
    if (!cookie || cookie.value !== "1") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
