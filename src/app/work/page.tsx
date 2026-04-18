import { Button, Column, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { getAllWorkProjects } from "@/app/work/projectData";
import { Projects } from "@/components/work/Projects";
import { baseURL, about, person, servicesPage, work } from "@/resources";

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

      <Column className={styles.hero} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Projetos
        </Tag>

        <Heading variant="heading-strong-xl">
          Trabalhos selecionados
        </Heading>

        <Text
          className={styles.heroLead}
          onBackground="neutral-weak"
          variant="heading-default-m"
          wrap="balance"
        >
          Uma seleção de projetos que mostra como estruturo ideias, construo soluções e resolvo problemas com clareza.
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
        <Column gap="16">
          <Column gap="8">
            <Heading as="h2" variant="display-strong-s">
              Projetos publicados
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Cada projeto ajuda a mostrar processo, critério e execução.
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
            Os próximos projetos estão sendo organizados para entrar com mais contexto, clareza e consistência.
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
    </Column>
  );
}
