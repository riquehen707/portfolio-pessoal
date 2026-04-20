import { Button, Column, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import {
  getAllWorkProjects,
  getWorkProjectCategory,
} from "@/app/work/projectData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Projects } from "@/components/work/Projects";
import {
  about,
  baseURL,
  contact,
  contentStrategy,
  person,
  servicesPage,
  work,
} from "@/resources";

import styles from "./work.module.scss";

const workStrategy = contentStrategy.pages.work;

function formatStatValue(value: number) {
  return value.toString().padStart(2, "0");
}

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: work.title,
      description: work.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
      path: work.path,
    }),
    keywords: workStrategy.seo.keywords,
  };
}

export default function Work() {
  const projects = getAllWorkProjects();
  const hasProjects = projects.length > 0;

  const clientCount = projects.filter((project) => project.metadata.kind === "client").length;
  const studyCount = projects.filter((project) => project.metadata.kind === "study").length;
  const personalCount = projects.filter((project) => project.metadata.kind === "personal").length;

  const activeCategories = Array.from(
    new Set(
      projects
        .map((project) => getWorkProjectCategory(project))
        .filter((category): category is string => Boolean(category)),
    ),
  ).slice(0, 6);

  const heroStats = [
    { label: "Projetos publicados", value: formatStatValue(projects.length) },
    { label: "Cases de cliente", value: formatStatValue(clientCount) },
    { label: "Estudos e autorais", value: formatStatValue(studyCount + personalCount) },
  ];

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Projetos", url: `${baseURL}${work.path}` },
        ]}
      />

      <section className={styles.heroPanel}>
        <div className={styles.heroMain}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            {workStrategy.hero.eyebrow}
          </Tag>

          <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
            {workStrategy.hero.headline}
          </Heading>

          <Text
            className={styles.heroLead}
            onBackground="neutral-weak"
            variant="heading-default-m"
            wrap="balance"
          >
            {workStrategy.hero.subheadline}
          </Text>

          <Row className={styles.heroActions} gap="12" wrap>
            <Button
              href={workStrategy.hero.primaryCtaHref}
              variant="primary"
              size="m"
              arrowIcon
              data-analytics-event="cta_click"
              data-analytics-label={workStrategy.hero.primaryCtaLabel}
              data-analytics-location="work_hero"
              data-analytics-type="primary"
            >
              {workStrategy.hero.primaryCtaLabel}
            </Button>
            {workStrategy.hero.secondaryCtaHref && workStrategy.hero.secondaryCtaLabel && (
              <Button
                href={workStrategy.hero.secondaryCtaHref}
                variant="secondary"
                size="m"
                arrowIcon
                data-analytics-event="cta_click"
                data-analytics-label={workStrategy.hero.secondaryCtaLabel}
                data-analytics-location="work_hero"
                data-analytics-type="secondary"
              >
                {workStrategy.hero.secondaryCtaLabel}
              </Button>
            )}
          </Row>
        </div>

        <aside className={styles.heroAside}>
          <Text className={styles.sideEyebrow} variant="label-default-s" onBackground="neutral-weak">
            Leitura rápida
          </Text>

          <div className={styles.statGrid}>
            {heroStats.map((item) => (
              <div className={styles.statCard} key={item.label}>
                <span className={styles.statValue}>{item.value}</span>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {item.label}
                </Text>
              </div>
            ))}
          </div>

          {activeCategories.length > 0 && (
            <div className={styles.categoryRail}>
              {activeCategories.map((category) => (
                <Tag key={category} size="s" background="neutral-alpha-weak">
                  {category}
                </Tag>
              ))}
            </div>
          )}
        </aside>
      </section>

      {hasProjects ? (
        <section className={styles.librarySection}>
          <div className={styles.sectionIntro}>
            <Text className={styles.sectionEyebrow} variant="label-default-s" onBackground="neutral-weak">
              {workStrategy.sections[2]?.label ?? "Portfólio"}
            </Text>
            <Heading as="h2" variant="display-strong-s">
              {workStrategy.sections[2]?.title ?? "Portfólio publicado."}
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              {workStrategy.sections[2]?.description ??
                "Cada projeto existe para comprovar raciocínio, solução e resultado percebido."}
            </Text>
          </div>

          <Projects
            projects={projects}
            layout="editorial"
            marginBottom="0"
            paddingX="0"
          />
        </section>
      ) : (
        <section className={styles.notePanel}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Portfólio
          </Tag>

          <Heading as="h2" variant="display-strong-s">
            Cases em atualização
          </Heading>

          <Text onBackground="neutral-weak" variant="body-default-m">
            Os próximos projetos estão sendo organizados para entrar com mais contexto, clareza e
            consistência.
          </Text>

          <Row className={styles.panelActions} gap="12" wrap>
            <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
              Ver serviços
            </Button>
            <Button href="/abordagem-tecnica" variant="secondary" size="m" arrowIcon>
              Ver abordagem técnica
            </Button>
          </Row>
        </section>
      )}

      <section className={styles.notePanel}>
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          {workStrategy.sections[3]?.label ?? "Contato"}
        </Tag>

        <Heading as="h2" variant="display-strong-s">
          {workStrategy.sections[3]?.title ?? "Vamos criar algo forte juntos."}
        </Heading>

        <Text onBackground="neutral-weak" variant="body-default-m">
          {workStrategy.sections[3]?.description ??
            "Se a operação precisa de uma presença mais clara, mais forte e mais útil, o próximo passo é conversar."}
        </Text>

        <Row className={styles.panelActions} gap="12" wrap>
          <Button
            href={contact.path}
            variant="primary"
            size="m"
            arrowIcon
            data-analytics-event="cta_click"
            data-analytics-label={workStrategy.sections[3]?.ctaLabel ?? "Vamos conversar"}
            data-analytics-location="work_final_cta"
            data-analytics-type="primary"
          >
            {workStrategy.sections[3]?.ctaLabel ?? "Vamos conversar"}
          </Button>
          <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
            Ver serviços
          </Button>
        </Row>
      </section>
    </Column>
  );
}
