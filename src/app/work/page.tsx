import { Button, Column, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { getAllWorkProjects } from "@/app/work/projectData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, contact, contentStrategy, person, servicesPage, work } from "@/resources";

import styles from "./work.module.scss";

const workStrategy = contentStrategy.pages.work;
const workCategories = ["Cliente", "Estudo", "Pessoal"];

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

  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
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
          { name: "Home", url: baseURL },
          { name: "Works", url: `${baseURL}${work.path}` },
        ]}
      />

      <Column className={styles.hero} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          {workStrategy.hero.eyebrow}
        </Tag>

        <Heading variant="heading-strong-xl">{workStrategy.hero.headline}</Heading>

        <Text
          className={styles.heroLead}
          onBackground="neutral-weak"
          variant="heading-default-m"
          wrap="balance"
        >
          {workStrategy.hero.subheadline}
        </Text>

        <Row gap="12" wrap>
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

        <Row gap="8" wrap>
          {workCategories.map((category) => (
            <Tag key={category} size="s" background="neutral-alpha-weak">
              {category}
            </Tag>
          ))}
        </Row>
      </Column>

      {hasProjects ? (
        <Column gap="16">
          <Column gap="8">
            <Heading as="h2" variant="display-strong-s">
              {workStrategy.sections[2]?.title ?? "Portfólio publicado."}
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              {workStrategy.sections[2]?.description ??
                "Cada projeto existe para comprovar raciocínio, solução e resultado percebido."}
            </Text>
          </Column>

          <Projects projects={projects} marginBottom="0" paddingX="0" />
        </Column>
      ) : (
        <Column className={styles.notePanel} gap="16" padding="24">
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

          <Row className={styles.emptyActions} gap="12" wrap>
            <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
              Ver serviços
            </Button>
            <Button href="/abordagem-tecnica" variant="secondary" size="m" arrowIcon>
              Ver abordagem técnica
            </Button>
          </Row>
        </Column>
      )}

      <Column className={styles.notePanel} gap="16" padding="24">
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

        <Row className={styles.emptyActions} gap="12" wrap>
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
      </Column>
    </Column>
  );
}
