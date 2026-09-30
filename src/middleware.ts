import { type NextRequest, NextResponse } from "next/server";
import { getPausedRoutePolicy } from "@/config/routePolicy";

const CANONICAL_HOST = "henriquereis.app";

const REDIRECT_TO_CANONICAL_HOSTS = new Set([
  "henrique.dog",
  "www.henrique.dog",
  "www.henriquereis.app",
]);

function getRequestHost(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0] ??
    request.headers.get("host") ??
    request.nextUrl.hostname;

  return host.trim().toLowerCase().replace(/:\d+$/, "");
}

export function middleware(request: NextRequest) {
  if (REDIRECT_TO_CANONICAL_HOSTS.has(getRequestHost(request))) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";

    return NextResponse.redirect(url, 308);
  }

  const policy = getPausedRoutePolicy(request.nextUrl.pathname);

  if (!policy) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = policy.redirectTo;
  url.search = "";

  return NextResponse.redirect(url, 307);
}

export const config = {
  // O Next.js exige matchers literais para analisá-los no build. Esta lista é
  // verificada contra routePolicy.ts pelo script audit:route-policy.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
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
