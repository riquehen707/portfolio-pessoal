import { type NextRequest, NextResponse } from "next/server";

const pausedPaths = [
  "/about",
  "/abordagem-tecnica",
  "/aulas-particulares",
  "/contact",
  "/mapa",
  "/modelos",
  "/publicos",
  "/saiba-mais",
  "/servicos",
  "/simulacao",
  "/trilhas",
  "/work",
] as const;

function isPausedPath(pathname: string) {
  return pausedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function middleware(request: NextRequest) {
  if (!isPausedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/blog";
  url.search = "";

  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    "/about/:path*",
    "/abordagem-tecnica/:path*",
    "/aulas-particulares/:path*",
    "/contact/:path*",
    "/mapa/:path*",
    "/modelos/:path*",
    "/publicos/:path*",
    "/saiba-mais/:path*",
    "/servicos/:path*",
    "/simulacao/:path*",
    "/trilhas/:path*",
    "/work/:path*",
  ],
};
