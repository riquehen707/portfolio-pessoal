import { Button, Column, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { Projects } from "@/components/work/Projects";
import { baseURL, about, person, servicesPage, work } from "@/resources";
import { getPosts } from "@/utils/utils";

import styles from "./work.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  const projects = getPosts(["src", "app", "work", "projects"]);
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

      <Column className={styles.hero} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Projetos
        </Tag>
        <Heading variant="heading-strong-xl">{work.title}</Heading>
        <div className={styles.accentLine} />
        <Text
          className={styles.heroLead}
          onBackground="neutral-weak"
          variant="heading-default-m"
          wrap="balance"
        >
          Cases, estudos e aplicações em uso.
        </Text>
        <Row gap="12" wrap>
          <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
            Ver serviços
          </Button>
          <Button href="/abordagem-tecnica" variant="secondary" size="m" arrowIcon>
            Ver abordagem técnica
          </Button>
        </Row>
      </Column>

      {hasProjects ? (
        <Projects marginBottom="0" paddingX="0" />
      ) : (
        <Column className={styles.notePanel} gap="16" padding="24">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">Portfólio</Tag>
          <Heading as="h2" variant="display-strong-s">
            Novos cases entram em breve
          </Heading>
          <Text onBackground="neutral-weak">Enquanto isso, a melhor entrada continua nos serviços.</Text>
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
    </Column>
  );
}
