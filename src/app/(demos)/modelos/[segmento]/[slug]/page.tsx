import Link from "next/link";
import { notFound } from "next/navigation";

import { demoRegistry } from "@/features/demos/data/demo-registry";
import { getDemoBySlug, getDemoSegment } from "@/features/demos/helpers/getDemo";
import { getDemoDescription, getDemoTitle, modelsPath, modelsTitle } from "@/features/demos/helpers/seo";
import { baseURL } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./demo.module.scss";

type DemoPageProps = {
  params: Promise<{ segmento: string; slug: string }>;
};

export function generateStaticParams() {
  return demoRegistry.map((demo) => ({
    segmento: demo.segment,
    slug: demo.slug,
  }));
}

export async function generateMetadata({ params }: DemoPageProps) {
  const { segmento, slug } = await params;
  const demo = getDemoBySlug(segmento, slug);

  if (!demo) return {};

  const title = getDemoTitle(demo);
  const description = getDemoDescription(demo);
  const image = buildOgImage(demo.name, "demo de página");

  return {
    title,
    description,
    alternates: {
      canonical: `${baseURL}${demo.route}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseURL}${demo.route}`,
      images: buildDiscoverImageMetadata(image, demo.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: demo.indexable,
      follow: demo.indexable,
    },
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { segmento, slug } = await params;
  const demo = getDemoBySlug(segmento, slug);

  if (!demo) notFound();

  const segment = getDemoSegment(demo.segment);

  if (!segment) notFound();

  return (
    <div
      className={`${styles.demoCanvas} demoCanvasRoot`}
      data-segment={demo.segment}
      data-style={demo.visualStyle}
    >
      <div className={styles.demoToolbar}>
        <Link href={modelsPath}>Modelos</Link>
        <Link href={`${modelsPath}/${segment.slug}`}>{segment.name}</Link>
        <span>{demo.status}</span>
      </div>

      <header className={styles.siteHeader}>
        <Link href={`${modelsPath}/${segment.slug}`} className={styles.demoBrand}>
          {demo.name}
        </Link>
        <nav aria-label="Navegação da demo">
          <a href="#problema">Problema</a>
          <a href="#estrutura">Estrutura</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>{segment.name}</span>
          <h1>{demo.goal}</h1>
          <p>{demo.description}</p>
          <div className={styles.actions}>
            <a href="#contato">Quero um caminho parecido</a>
            <a href={`${modelsPath}/${segment.slug}`}>Ver segmento</a>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.visualCard}>
            <span />
            <strong>{segment.importantCtas[0]}</strong>
            <small>{segment.visualSignals.slice(0, 3).join(" · ")}</small>
          </div>
          <div className={styles.visualGrid}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className={styles.signalStrip} aria-label="Sinais importantes">
        {segment.visualSignals.slice(0, 5).map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </section>

      <section className={styles.problemSection} id="problema">
        <div>
          <span className={styles.kicker}>Problema que a página precisa resolver</span>
          <h2>Não basta parecer bonita. A página precisa reduzir dúvida.</h2>
        </div>
        <p>{segment.audience}</p>
      </section>

      <section className={styles.structureSection} id="estrutura">
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>Estrutura sugerida</span>
          <h2>Uma sequência simples para o visitante entender e agir.</h2>
        </div>

        <div className={styles.stepGrid}>
          {["Contexto", "Prova", "Oferta", "Ação"].map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
              <p>
                {index === 0
                  ? "Explique rapidamente para quem é e qual situação resolve."
                  : index === 1
                    ? "Mostre sinais de confiança sem exagerar resultado."
                    : index === 2
                      ? "Deixe claro o que a pessoa recebe ou pode solicitar."
                      : "Use um CTA direto e compatível com o momento da decisão."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection} id="contato">
        <div>
          <span className={styles.kicker}>Demo experimental</span>
          <h2>Esta vitrine mostra direção visual, não um pacote fechado.</h2>
          <p>
            O conteúdo é demonstrativo. Antes de transformar em uma página real, a oferta, o público
            e o processo de contato precisam ser ajustados.
          </p>
        </div>
        <Link href="/servicos">Entender se faz sentido</Link>
      </section>
    </div>
  );
}
