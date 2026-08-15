import { type NextRequest, NextResponse } from "next/server";

const pausedPaths = [
  "/abordagem-tecnica",
  "/aulas-particulares",
  "/blog/categorias",
  "/blog/temas",
  "/contact",
  "/mapa",
  "/modelos",
  "/publicos",
  "/saiba-mais",
  "/simulacao",
  "/trilhas",
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
    "/abordagem-tecnica/:path*",
    "/aulas-particulares/:path*",
    "/blog/categorias/:path*",
    "/blog/temas/:path*",
    "/contact/:path*",
    "/mapa/:path*",
    "/modelos/:path*",
    "/publicos/:path*",
    "/saiba-mais/:path*",
    "/simulacao/:path*",
    "/trilhas/:path*",
  ],
};
