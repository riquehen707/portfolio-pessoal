import type { Metadata } from "next";
import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import type { ServiceLanding as LegacyServiceLanding } from "@/types";
import { baseURL } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

function brlPrice(amount: string) {
  const match = amount.match(/R\$\s?([\d.]+(?:,\d{2})?)/);
  return match ? match[1].replace(/\./g, "").replace(",", ".") : undefined;
}

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
  const pricing = landing.sections.find((section) => section.type === "pricing");
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
    ...(pricing?.type === "pricing" && {
      offers: {
        "@type": "Offer",
        priceCurrency: "BRL",
        priceSpecification: pricing.items.map((item) => {
          const price = brlPrice(item.amount);
          return {
            "@type": item.cadence === "monthly" ? "UnitPriceSpecification" : "PriceSpecification",
            name: item.label,
            priceCurrency: "BRL",
            ...(price && { price }),
            description: `${item.amount}. ${item.details}`,
            ...(item.cadence === "monthly" && { billingDuration: "P1M", unitText: "mês" }),
          };
        }),
      },
    }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function LegacyServiceJsonLd({ service }: { service: LegacyServiceLanding }) {
  const setupPrice = brlPrice(service.commercialModel.setup.amount);
  const monthlyPrice = brlPrice(service.commercialModel.monthly.amount);
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseURL}/servicos/${service.slug}#service`,
    url: `${baseURL}/servicos/${service.slug}`,
    name: service.title,
    description: service.summary,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      priceSpecification: [
        {
          "@type": "PriceSpecification",
          name: "Implantação",
          priceCurrency: "BRL",
          ...(setupPrice && { price: setupPrice }),
          description: `${service.commercialModel.setup.amount}. ${service.commercialModel.setup.description}`,
        },
        {
          "@type": "UnitPriceSpecification",
          name: "Mensalidade",
          billingDuration: "P1M",
          unitText: "mês",
          priceCurrency: "BRL",
          ...(monthlyPrice && { price: monthlyPrice }),
          description: `${service.commercialModel.monthly.amount}. Inclui ${service.commercialModel.monthly.includes.join(", ").toLocaleLowerCase("pt-BR")}.`,
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
