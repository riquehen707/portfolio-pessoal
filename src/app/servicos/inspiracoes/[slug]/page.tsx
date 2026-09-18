import { Column, Schema } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RealEstateInspirationPublication } from "@/components/services/inspirations/real-estate/RealEstateInspirationPublication";
import { PhotographyInspirationPublication } from "@/components/services/inspirations/photography/PhotographyInspirationPublication";
import { ArchitectureInspirationPublication } from "@/components/services/inspirations/architecture/ArchitectureInspirationPublication";
import { WellnessInspirationPublication } from "@/components/services/inspirations/wellness/WellnessInspirationPublication";
import { LocalBusinessInspirationPublication } from "@/components/services/inspirations/local-business/LocalBusinessInspirationPublication";
import {
  getServiceInspiration,
  getServiceInspirationPath,
  getServiceInspirationStaticParams,
  serviceInspirations,
} from "@/data/service-inspirations";
import { baseURL, person, social } from "@/resources";

import styles from "./page.module.scss";

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
  const isPortrait = inspiration.height > inspiration.width;
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
      ) : (
        <main className={styles.page}>
          <Link className={styles.backLink} href="/servicos/inspiracoes">
            <span aria-hidden="true">←</span> Voltar para inspirações
          </Link>

          <header className={styles.header}>
            <p>{inspiration.category}</p>
            <h1>{inspiration.title}</h1>
          </header>

          <figure
            className={`${styles.figure} ${isPortrait ? styles.portraitFigure : ""}`}
          >
            <Image
              className={styles.image}
              src={inspiration.image}
              alt={inspiration.alt}
              width={inspiration.width}
              height={inspiration.height}
              priority
              sizes={
                isPortrait
                  ? "(max-width: 760px) 100vw, 42rem"
                  : "(max-width: 1320px) 100vw, 80rem"
              }
            />
          </figure>

          <section
            className={styles.details}
            aria-labelledby="inspiration-direction-title"
          >
            <div className={styles.description}>
              <p className={styles.eyebrow}>Direção visual</p>
              <h2 id="inspiration-direction-title">
                Um ponto de partida, não um modelo fechado.
              </h2>
              <p>{inspiration.description}</p>

              {inspiration.tags?.length ? (
                <ul aria-label="Características desta direção visual">
                  {inspiration.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <aside className={styles.contact} aria-label="Contato sobre esta inspiração">
              <p>Cores, textos, imagens e organização são ajustados ao seu negócio.</p>
              <a
                href={contactHref}
                data-analytics-event="services_help_click"
                data-analytics-location={`service_inspiration_${inspiration.slug}`}
              >
                Quero um site nessa direção
                <span aria-hidden="true">→</span>
              </a>
            </aside>
          </section>
        </main>
      )}
    </Column>
  );
}
