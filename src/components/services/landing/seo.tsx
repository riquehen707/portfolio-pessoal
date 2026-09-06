import type { Metadata } from "next";
import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import { baseURL } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

export function serviceLandingMetadata(landing: ServiceLanding): Metadata {
  const url = `${baseURL}/servicos/${landing.slug}`;
  const image = landing.seo.image?.src ?? buildOgImage(landing.seo.title);
  return {
    title: landing.seo.title,
    description: landing.seo.description,
    alternates: { canonical: url },
    robots: { index: landing.status === "published" && landing.seo.index, follow: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      title: landing.seo.title,
      description: landing.seo.description,
      images: buildDiscoverImageMetadata(image, landing.seo.title),
    },
    twitter: {
      card: "summary_large_image",
      title: landing.seo.title,
      description: landing.seo.description,
      images: [image],
    },
  };
}

export function ServiceJsonLd({ landing }: { landing: ServiceLanding }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseURL}/servicos/${landing.slug}#service`,
    url: `${baseURL}/servicos/${landing.slug}`,
    name: landing.hero.title,
    description: landing.hero.description,
    provider: {
      "@type": "Person",
      name: landing.provider.name,
      description: landing.provider.description,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
