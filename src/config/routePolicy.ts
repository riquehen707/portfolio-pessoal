export const pausedRoutePolicies = [
  { path: "/abordagem-tecnica", redirectTo: "/blog" },
  { path: "/aulas-particulares", redirectTo: "/blog" },
  { path: "/blog/categorias", redirectTo: "/blog" },
  { path: "/blog/temas", redirectTo: "/blog" },
  { path: "/contact", redirectTo: "/blog" },
  { path: "/mapa", redirectTo: "/blog" },
  { path: "/modelos", redirectTo: "/blog" },
  { path: "/publicos", redirectTo: "/blog" },
  { path: "/saiba-mais", redirectTo: "/blog" },
  { path: "/simulacao", redirectTo: "/blog" },
  { path: "/trilhas", redirectTo: "/blog" },
] as const;

export const pausedRoutePaths = pausedRoutePolicies.map(({ path }) => path);

export function getPausedRoutePolicy(pathname: string) {
  return pausedRoutePolicies.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function isPausedRoute(pathname: string) {
  return getPausedRoutePolicy(pathname) !== undefined;
}
