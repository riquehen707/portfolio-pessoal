import { Column, Grid, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { Projects } from "@/components/work/Projects";
import { baseURL, about, person, work } from "@/resources";

import styles from "./work.module.scss";

const notes = [
  {
    label: "Formato",
    title: "Projetos pessoais e estudos de caso",
    description:
      "Uma vitrine para mostrar critério, processo e forma de resolver interface, SEO e estrutura.",
  },
  {
    label: "Leitura",
    title: "Menos volume, mais contexto",
    description:
      "Os projetos entram como prova de raciocínio e execução, não como uma galeria solta de telas.",
  },
  {
    label: "Direção",
    title: "Cases reais podem entrar aqui",
    description:
      "Enquanto isso, os estudos de caso ajudam a deixar claro como penso produto, conteúdo e experiência.",
  },
];

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

      <Column className={styles.hero} gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Portfólio
            </Tag>
            <Heading variant="heading-strong-xl">{work.title}</Heading>
            <div className={styles.accentLine} />
            <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              Projetos pessoais e estudos de caso para mostrar como organizo interface, SEO técnico,
              arquitetura e clareza de navegação.
            </Text>
          </Column>

          <Column className={styles.heroAside} gap="12">
            <Text variant="label-default-s" onBackground="neutral-weak">
              O que aparece aqui
            </Text>
            <Text variant="heading-strong-m" wrap="balance">
              Menos vitrine vazia e mais contexto para entender o raciocínio por trás de cada entrega.
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Mesmo quando o case nasce como estudo, a ideia é demonstrar critério visual, estrutura
              técnica e clareza comercial.
            </Text>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.notePanel} gap="16" padding="24">
        <Grid className={styles.noteGrid} columns="3" s={{ columns: 1 }} gap="16">
          {notes.map((note) => (
            <Column key={note.title} className={styles.noteCard} gap="12">
              <Text className={styles.noteEyebrow} variant="label-default-s" onBackground="neutral-weak">
                {note.label}
              </Text>
              <Heading as="h2" variant="heading-strong-m">
                {note.title}
              </Heading>
              <Text onBackground="neutral-weak">{note.description}</Text>
            </Column>
          ))}
        </Grid>
      </Column>

      <Projects marginBottom="0" paddingX="0" />
    </Column>
  );
}
