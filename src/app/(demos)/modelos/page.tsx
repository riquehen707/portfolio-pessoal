import Link from "next/link";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { DemoCard } from "@/features/demos/components/DemoCard";
import { demoRegistry } from "@/features/demos/data/demo-registry";
import { demoSegments } from "@/features/demos/data/demo-segments";
import { getDemoStyles, getFeaturedDemos, getSegmentDemoCount } from "@/features/demos/helpers/getDemo";
import { modelsDescription, modelsPath, modelsTitle } from "@/features/demos/helpers/seo";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./modelos.module.scss";

const styleLabels: Record<string, string> = {
  calmo: "Calmo",
  sobrio: "Sóbrio",
  conversao: "Conversão",
  visual: "Visual",
  editorial: "Editorial",
  local: "Local",
  premium: "Premium",
};

export async function generateMetadata() {
  const image = buildOgImage(modelsTitle, "demos e vitrines");
  const generatedMeta = Meta.generate({
    title: modelsTitle,
    description: modelsDescription,
    baseURL,
    image,
    path: modelsPath,
  });

  return {
    ...generatedMeta,
    alternates: {
      canonical: `${baseURL}${modelsPath}`,
    },
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, modelsTitle),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function ModelosPage() {
  const featuredDemos = getFeaturedDemos();
  const stylesAvailable = getDemoStyles();

  return (
    <Column className={styles.page} fillWidth gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={modelsTitle}
        description={modelsDescription}
        path={modelsPath}
        author={{
          name: person.name,
          url: `${baseURL}${modelsPath}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: modelsTitle, url: `${baseURL}${modelsPath}` },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Vitrine de modelos
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
            Páginas para testar direção visual antes de construir do zero.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Modelos e demos para clínicas, advocacia, infoprodutores, restaurantes, imobiliárias e
            serviços. Cada demo mostra estrutura, ritmo visual e decisões possíveis.
          </Text>
        </div>

        <aside className={styles.heroPanel} aria-label="Resumo da vitrine">
          <span>{demoRegistry.length} demos</span>
          <span>{demoSegments.length} segmentos</span>
          <span>Experimentais começam com noindex</span>
        </aside>
      </section>

      <section className={styles.filterSection} aria-labelledby="segmentos-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Segmentos
          </Text>
          <Heading id="segmentos-title" as="h2" variant="heading-strong-xl">
            Escolha pelo tipo de negócio.
          </Heading>
        </div>

        <div className={styles.segmentGrid}>
          {demoSegments.map((segment) => {
            const count = getSegmentDemoCount(segment.slug);

            return (
              <Link className={styles.segmentCard} href={`${modelsPath}/${segment.slug}`} key={segment.slug}>
                <span className={styles.segmentName}>{segment.name}</span>
                <p>{segment.description}</p>
                <strong>
                  {count} {count === 1 ? "modelo" : "modelos"}
                </strong>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.styleSection} aria-labelledby="estilos-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Estilos
          </Text>
          <Heading id="estilos-title" as="h2" variant="heading-strong-xl">
            Variações visuais sem misturar com o site principal.
          </Heading>
        </div>

        <div className={styles.stylePills} aria-label="Filtros por estilo visual">
          {stylesAvailable.map((style) => (
            <a href={`#style-${style}`} key={style}>
              {styleLabels[style] ?? style}
            </a>
          ))}
        </div>
      </section>

      <section className={styles.featuredSection} aria-labelledby="destaques-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Destaques
          </Text>
          <Heading id="destaques-title" as="h2" variant="heading-strong-xl">
            Demos com estrutura suficiente para avaliar.
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-m" onBackground="neutral-weak">
            Ainda são modelos experimentais. A ideia é mostrar caminho visual, não fingir que já é
            um produto fechado.
          </Text>
        </div>

        <div className={styles.featuredStack}>
          {featuredDemos.map((demo) => (
            <DemoCard demo={demo} featured key={demo.route} />
          ))}
        </div>
      </section>

      <section className={styles.catalogSection} aria-labelledby="catalogo-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Catálogo
          </Text>
          <Heading id="catalogo-title" as="h2" variant="heading-strong-xl">
            Todos os modelos.
          </Heading>
        </div>

        <div className={styles.catalogGrid}>
          {demoRegistry.map((demo) => (
            <div id={`style-${demo.visualStyle}`} key={demo.route}>
              <DemoCard demo={demo} />
            </div>
          ))}
        </div>
      </section>
    </Column>
  );
}
