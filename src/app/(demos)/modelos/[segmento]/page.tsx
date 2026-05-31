import Link from "next/link";
import { notFound } from "next/navigation";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { DemoCard } from "@/features/demos/components/DemoCard";
import { demoSegments } from "@/features/demos/data/demo-segments";
import { getDemoSegment, getDemosBySegment } from "@/features/demos/helpers/getDemo";
import { getSegmentPath, modelsPath, modelsTitle } from "@/features/demos/helpers/seo";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./segmento.module.scss";

type SegmentPageProps = {
  params: Promise<{ segmento: string }>;
};

export function generateStaticParams() {
  return demoSegments.map((segment) => ({
    segmento: segment.slug,
  }));
}

export async function generateMetadata({ params }: SegmentPageProps) {
  const { segmento } = await params;
  const segment = getDemoSegment(segmento);

  if (!segment) return {};

  const path = getSegmentPath(segment);
  const image = buildOgImage(segment.title, "modelos de página");
  const generatedMeta = Meta.generate({
    title: segment.title,
    description: segment.description,
    baseURL,
    image,
    path,
  });

  return {
    ...generatedMeta,
    alternates: {
      canonical: `${baseURL}${path}`,
    },
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, segment.title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
    robots: {
      index: segment.indexable,
      follow: segment.indexable,
    },
  };
}

export default async function SegmentPage({ params }: SegmentPageProps) {
  const { segmento } = await params;
  const segment = getDemoSegment(segmento);

  if (!segment) notFound();

  const demos = getDemosBySegment(segment.slug);
  const path = getSegmentPath(segment);

  return (
    <Column className={styles.page} fillWidth gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={segment.title}
        description={segment.description}
        path={path}
        author={{
          name: person.name,
          url: `${baseURL}${path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: modelsTitle, url: `${baseURL}${modelsPath}` },
          { name: segment.name, url: `${baseURL}${path}` },
        ]}
      />

      <section className={styles.hero}>
        <Link className={styles.backLink} href={modelsPath}>
          Voltar para modelos
        </Link>
        <div className={styles.heroCopy}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            {segment.name}
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
            {segment.title}
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            {segment.description}
          </Text>
        </div>
      </section>

      <section className={styles.contextGrid} aria-label="Contexto do segmento">
        <article>
          <span>Para quem é</span>
          <p>{segment.audience}</p>
        </article>
        <article>
          <span>Tipos de site</span>
          <ul>
            {segment.siteTypes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>CTAs importantes</span>
          <ul>
            {segment.importantCtas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.demoSection} aria-labelledby="modelos-disponiveis">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Modelos disponíveis
          </Text>
          <Heading id="modelos-disponiveis" as="h2" variant="heading-strong-xl">
            Escolha uma demo para ver estrutura e direção visual.
          </Heading>
        </div>

        {demos.length > 0 ? (
          <div className={styles.demoGrid}>
            {demos.map((demo) => (
              <DemoCard demo={demo} key={demo.route} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <strong>Sem demo publicada ainda.</strong>
            <p>Este segmento já tem critérios definidos, mas ainda não recebeu uma vitrine visual.</p>
          </div>
        )}
      </section>

      <section className={styles.criteriaSection} aria-label="Critérios visuais do segmento">
        <div>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            O que costuma funcionar
          </Text>
          <ul className={styles.chipList}>
            {segment.visualSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>

        <div>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Erros a evitar
          </Text>
          <ul className={styles.mistakeList}>
            {segment.commonMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </div>
      </section>
    </Column>
  );
}
