import { serviceLandings } from "@/content/service-landings/landings";
import { serviceLandingSchema } from "@/content/service-landings/serviceLandingSchema";
import { services } from "@/resources/services";

const landings = serviceLandings.map((entry) => serviceLandingSchema.parse(entry));
const ids = new Set<string>();
const slugs = new Set(["produtos", ...services.map((service) => service.slug)]);
for (const landing of landings) {
  if (ids.has(landing.id) || slugs.has(landing.slug)) {
    throw new Error(
      `Landing duplicada ou em conflito com rota existente: ${landing.id}/${landing.slug}`,
    );
  }
  ids.add(landing.id);
  slugs.add(landing.slug);
}

export function getPublishedServiceLandings() {
  return landings.filter((landing) => landing.status === "published");
}

export function getServiceLanding(slug: string) {
  return getPublishedServiceLandings().find((landing) => landing.slug === slug);
}

export function getServiceLandingById(id: string) {
  return getPublishedServiceLandings().find((landing) => landing.id === id);
}
