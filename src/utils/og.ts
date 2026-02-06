export function buildOgImage(title: string, subtitle?: string) {
  const params = new URLSearchParams();
  params.set("title", title);
  if (subtitle) {
    params.set("subtitle", subtitle);
  }
  return `/api/og/generate?${params.toString()}`;
}
