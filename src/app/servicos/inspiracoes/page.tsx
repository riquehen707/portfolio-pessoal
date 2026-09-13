import type { Metadata } from "next";
import { Column, Schema } from "@once-ui-system/core";

import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import { ServiceInspirationsGallery } from "@/components/services/inspirations/ServiceInspirationsGallery";
import { serviceInspirations } from "@/data/service-inspirations";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

const page = {
  path: "/servicos/inspiracoes",
  title: "Inspirações para sites",
  description:
    "Explore referências visuais para encontrar cores, ritmos e composições que combinam com o seu negócio.",
};

export function generateMetadata(): Metadata {
  const image = buildOgImage(page.title);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${baseURL}${page.path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${baseURL}${page.path}`,
      images: buildDiscoverImageMetadata(image, page.title),
    },
  };
}

export default function ServiceInspirationsPage() {
  return (
    <Column fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={page.title}
        description={page.description}
        path={page.path}
        image={`/api/og/generate?title=${encodeURIComponent(page.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/sobre`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <main className={styles.page}>
        <ServicesAreaNav active="inspirations" />
        <ServiceInspirationsGallery inspirations={serviceInspirations} />
      </main>
    </Column>
  );
}
