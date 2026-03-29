import { Column, Heading, Meta, Schema, Tag, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

import styles from "../section.module.scss";

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

      <Column className={styles.heroGlow} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Portfolio
        </Tag>
        <Heading variant="heading-strong-xl">{work.title}</Heading>
        <div className={styles.accentLine} />
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Projetos pessoais e estudos de caso que mostram minha camada de interface, SEO tecnico e execucao.
        </Text>
      </Column>

      <Projects marginBottom="0" />
    </Column>
  );
}
