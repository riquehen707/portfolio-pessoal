import { type NextRequest, NextResponse } from "next/server";
import { getPausedRoutePolicy } from "@/config/routePolicy";

export function middleware(request: NextRequest) {
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
