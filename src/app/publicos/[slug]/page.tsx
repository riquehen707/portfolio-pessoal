import Link from "next/link";
import { notFound } from "next/navigation";

import { Schema } from "@once-ui-system/core";

import { CTAButton } from "@/components/CTAButton";
import { audiencePages, baseURL, getAudiencePage, home, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

type PageProps = { params: Promise<{ slug: string }> };

const calendarHref = "https://cal.com/henriquereis";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const audience = getAudiencePage(slug);

  if (!audience) return {};

  const title = `${audience.label}: ${audience.title}`;
  const image = buildOgImage(audience.label);

  return {
    title,
    description: audience.description,
    alternates: { canonical: `${baseURL}${audience.path}` },
    openGraph: {
      title,
      description: audience.description,
      url: `${baseURL}${audience.path}`,
      siteName: home.title,
      images: buildDiscoverImageMetadata(image, audience.label),
      locale: "pt_BR",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return audiencePages.map((audience) => ({ slug: audience.slug }));
}

export default async function AudiencePage({ params }: PageProps) {
  const { slug } = await params;
  const audience = getAudiencePage(slug);

  if (!audience) notFound();

  const relatedAudiences = audiencePages.filter((item) => item.slug !== audience.slug);
  const metaTitle = `${audience.label}: ${audience.title}`;

  return (
    <main className={styles.page}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={metaTitle}
        description={audience.description}
        path={audience.path}
        image={`/api/og/generate?title=${encodeURIComponent(audience.label)}`}
        author={{
          name: person.name,
          url: `${baseURL}${audience.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{audience.eyebrow}</p>
          <h1>{audience.title}</h1>
          <p>{audience.description}</p>
          <div className={styles.actions}>
            <CTAButton href={calendarHref} prefixIcon="calendar">
              Conversar sobre esse cenário
            </CTAButton>
            <CTAButton href="#estrutura" variant="secondary" suffixIcon="arrowRight">
              Ver estrutura ideal
            </CTAButton>
          </div>
        </div>

        <aside className={styles.heroAside} aria-label="Quando essa página faz sentido">
          <span className={styles.asideLabel}>Quando faz sentido</span>
          <ul>
            {audience.fit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <nav className={styles.audienceSwitch} aria-label="Outros públicos">
        <span>Outros públicos</span>
        {relatedAudiences.map((item) => (
          <Link href={item.path} key={item.slug}>
            {item.label}
          </Link>
        ))}
      </nav>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Problemas comuns</p>
          <h2>O que normalmente trava antes da página.</h2>
        </div>
        <div className={styles.cardGrid}>
          {audience.problems.map((problem, index) => (
            <article className={styles.card} key={problem.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Etapas</p>
          <h2>Como o trabalho sai do genérico e vira estrutura.</h2>
          <p>
            A ordem muda conforme o cenário, mas a lógica é sempre reduzir ruído antes de produzir.
          </p>
        </div>
        <ol className={styles.timeline}>
          {audience.stages.map((stage, index) => (
            <li key={stage.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Conteúdo</p>
          <h2>Dicas de conteúdo para preparar decisão.</h2>
          <p>
            O conteúdo precisa responder dúvidas reais e aproximar a pessoa do próximo passo.
          </p>
        </div>
        <ul className={styles.checkList}>
          {audience.contentTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section} id="estrutura">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Estrutura ideal</p>
          <h2>O que a página precisa explicar sem exagero.</h2>
        </div>
        <div className={styles.structureGrid}>
          {audience.pageStructure.map((item) => (
            <article className={styles.structureItem} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Aquisição</p>
          <h2>Caminhos para atrair sem depender de uma frase genérica.</h2>
        </div>
        <div className={styles.pathGrid}>
          {audience.acquisitionPaths.map((path) => (
            <article className={styles.pathItem} key={path.title}>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.metricsSection}>
        <div>
          <p className={styles.eyebrow}>Medição</p>
          <h2>Sinais simples para saber se a presença ficou mais clara.</h2>
        </div>
        <ul>
          {audience.metrics.map((metric) => (
            <li key={metric}>{metric}</li>
          ))}
        </ul>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.eyebrow}>Próximo passo</p>
        <h2>{audience.ctaTitle}</h2>
        <p>{audience.ctaDescription}</p>
        <CTAButton href={calendarHref} prefixIcon="calendar">
          Agendar uma conversa
        </CTAButton>
      </section>
    </main>
  );
}
