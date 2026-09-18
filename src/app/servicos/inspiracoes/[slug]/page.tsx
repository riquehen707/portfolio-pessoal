import { Column, Schema } from "@once-ui-system/core";
import { notFound } from "next/navigation";

import { RealEstateInspirationPublication } from "@/components/services/inspirations/real-estate/RealEstateInspirationPublication";
import { PhotographyInspirationPublication } from "@/components/services/inspirations/photography/PhotographyInspirationPublication";
import { ArchitectureInspirationPublication } from "@/components/services/inspirations/architecture/ArchitectureInspirationPublication";
import { WellnessInspirationPublication } from "@/components/services/inspirations/wellness/WellnessInspirationPublication";
import { LocalBusinessInspirationPublication } from "@/components/services/inspirations/local-business/LocalBusinessInspirationPublication";
import { DesignerInspirationPublication } from "@/components/services/inspirations/designer/DesignerInspirationPublication";
import { StandardInspirationPublication } from "@/components/services/inspirations/standard/StandardInspirationPublication";
import {
  getServiceInspiration,
  getServiceInspirationPath,
  getServiceInspirationStaticParams,
  serviceInspirations,
} from "@/data/service-inspirations";
import { baseURL, person, social } from "@/resources";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceInspirationStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const inspiration = getServiceInspiration((await params).slug);

  if (!inspiration) return {};

  const title = `${inspiration.title} | Inspiração para sites`;
  const url = `${baseURL}${getServiceInspirationPath(inspiration.slug)}`;

  return {
    title,
    description: inspiration.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: inspiration.description,
      url,
      images: [
        {
          url: inspiration.image,
          width: inspiration.width,
          height: inspiration.height,
          alt: inspiration.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: inspiration.description,
      images: [inspiration.image],
    },
  };
}

export default async function ServiceInspirationPage({ params }: Props) {
  const inspiration = getServiceInspiration((await params).slug);

  if (!inspiration) notFound();

  const path = getServiceInspirationPath(inspiration.slug);
  const whatsapp = social.find((item) => item.name === "WhatsApp")?.link;
  const message = `Olá, Henrique. Gostei da inspiração “${inspiration.title}” e quero conversar sobre um site nessa direção.`;
  const contactHref = whatsapp
    ? `${whatsapp}?text=${encodeURIComponent(message)}`
    : `mailto:${person.email}?subject=${encodeURIComponent(`Site na direção ${inspiration.title}`)}`;
  const relatedInspirations = [
    "bem-estar-acolhedor",
    "arquitetura-editorial",
    "portfolio-fotografico",
    "negocio-local-vibrante",
    "galeria-autoral",
    "trabalho-autoral",
  ].flatMap((slug) => {
    const related = serviceInspirations.find((item) => item.slug === slug);
    return related && related.slug !== inspiration.slug ? [related] : [];
  }).slice(0, 4);

  return (
    <Column fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={inspiration.title}
        description={inspiration.description}
        path={path}
        image={inspiration.image}
        author={{
          name: person.name,
          url: `${baseURL}/sobre`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {inspiration.publication === "real-estate-editorial" ? (
        <RealEstateInspirationPublication
          inspiration={inspiration}
          contactHref={contactHref}
          relatedInspirations={relatedInspirations}
        />
      ) : inspiration.publication === "photography-editorial" ? (
        <PhotographyInspirationPublication
          inspiration={inspiration}
          contactHref={contactHref}
          relatedInspirations={relatedInspirations}
        />
      ) : inspiration.publication === "architecture-editorial" ? (
        <ArchitectureInspirationPublication
          inspiration={inspiration}
          contactHref={contactHref}
          relatedInspirations={relatedInspirations}
        />
      ) : inspiration.publication === "wellness-editorial" ? (
        <WellnessInspirationPublication
          inspiration={inspiration}
          contactHref={contactHref}
          relatedInspirations={relatedInspirations}
        />
      ) : inspiration.publication === "local-business-editorial" ? (
        <LocalBusinessInspirationPublication
          inspiration={inspiration}
          contactHref={contactHref}
          relatedInspirations={relatedInspirations}
        />
      ) : inspiration.publication === "designer-editorial" ? (
        <DesignerInspirationPublication
          inspiration={inspiration}
          contactHref={contactHref}
          relatedInspirations={relatedInspirations}
        />
      ) : (
        <StandardInspirationPublication
          inspiration={inspiration}
          contactHref={contactHref}
          relatedInspirations={relatedInspirations}
        />
      )}
    </Column>
  );
}
