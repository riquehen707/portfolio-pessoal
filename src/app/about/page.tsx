import {
  Avatar,
  Button,
  Card,
  Column,
  Grid,
  Heading,
  Row,
  Schema,
  Tag,
  Text,
  Meta,
} from "@once-ui-system/core";

import { baseURL, about, person, services, work } from "@/resources";

import styles from "@/components/about/about.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const calendarLink = about.calendar?.display ? about.calendar.link : `mailto:${person.email}`;
  const calendarLabel = about.calendar?.display ? "Agendar conversa" : "Enviar e-mail";

  const leadSignals = [
    "Websites com foco em conversao",
    "SEO tecnico e performance",
    "Automacao e dashboards com dados",
  ];

  const profileSignals = [
    { label: "Base tecnica", value: "Next.js, Python e dados" },
    { label: "Foco", value: "Produto, performance e operacao" },
    { label: "Modelo", value: "Execucao enxuta e orientada a resultado" },
  ];

  const technicalSkills = about.technical.skills.map((skill) => ({
    title: skill.title,
    description: skill.description,
    tags: skill.tags?.map((tag) => tag.name) ?? [],
  }));

  const serviceAreas = services.slice(0, 3).map((service) => ({
    title: service.title,
    badge: service.badge,
    description: service.summary,
  }));

  const featuredExperience = about.work.experiences[0];
  const studyHighlights = about.studies.institutions.slice(0, 2);
  const principles = [
    "Clareza estrategica",
    "Prioridade no que gera resultado",
    "Interface simples para o usuario final",
    "Tecnologia como suporte da operacao",
  ];

  return (
    <Column className={styles.page} maxWidth="m" gap="24" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} fillWidth gap="24">
        <Grid className={styles.heroLayout} columns="2" s={{ columns: 1 }} gap="24">
          <Column className={styles.heroMain} gap="16">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Sobre o estudio
            </Tag>

            <Heading as="h1" variant="display-strong-xl">
              {person.name}
            </Heading>

            <Text className={styles.role} variant="display-default-xs" onBackground="neutral-weak">
              {person.role}
            </Text>

            <Text className={styles.lead} variant="heading-default-m" onBackground="neutral-weak">
              Desenvolvo produtos digitais com foco em clareza, performance e operacao. Meu trabalho
              combina desenvolvimento web, SEO tecnico e automacoes para transformar presenca digital
              em sistema util para o negocio.
            </Text>

            <Row gap="8" wrap>
              {leadSignals.map((item) => (
                <Tag key={item} size="s" background="neutral-alpha-weak">
                  {item}
                </Tag>
              ))}
            </Row>

            <Row className={styles.actions} gap="12" wrap s={{ direction: "column" }}>
              <Button href={calendarLink} variant="primary" size="m" arrowIcon>
                {calendarLabel}
              </Button>
              <Button href={work.path} variant="secondary" size="m" arrowIcon>
                Ver projetos
              </Button>
            </Row>
          </Column>

          <Column
            className={styles.profileCard}
            gap="16"
            paddingX="24"
            paddingY="24"
            radius="l"
            background="surface"
            style={{ background: "var(--surface-weak)" }}
          >
            <Row gap="16" vertical="center">
              <Avatar src={person.avatar} size="xl" />
              <Column gap="4">
                <Heading as="h2" variant="heading-strong-l">
                  Estrutura direta
                </Heading>
                <Text onBackground="neutral-weak">
                  Atuo em projetos onde interface, conteudo e camada tecnica precisam funcionar juntas.
                </Text>
              </Column>
            </Row>

            <Column gap="12">
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                Local e idioma
              </Text>
              <Row gap="8" wrap>
                <Tag size="s" background="neutral-alpha-weak">
                  {person.location}
                </Tag>
                {person.languages?.map((language) => (
                  <Tag key={language} size="s" background="neutral-alpha-weak">
                    {language}
                  </Tag>
                ))}
              </Row>
            </Column>

            <Grid columns="1" gap="12">
              {profileSignals.map((item) => (
                <Column
                  className={styles.signal}
                  key={item.label}
                  gap="8"
                  paddingX="20"
                  paddingY="20"
                  radius="l"
                  background="surface"
                >
                  <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                    {item.label}
                  </Text>
                  <Text variant="heading-strong-s">{item.value}</Text>
                </Column>
              ))}
            </Grid>
          </Column>
        </Grid>
      </Column>

      <Column
        className={styles.sectionPanel}
        fillWidth
        gap="20"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <Column className={styles.sectionCopy} gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Habilidades tecnicas
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            A camada tecnica aparece logo no inicio
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            Estas sao as frentes que mais uso para construir, otimizar e sustentar projetos digitais.
          </Text>
        </Column>

        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {technicalSkills.map((skill, index) => (
            <Card
              className={`${styles.cardTint} ${index === 0 ? styles.cardAccent : ""}`}
              key={skill.title}
              direction="column"
              gap="12"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              style={{ background: "var(--surface-weak)" }}
              fillHeight
            >
              <Heading as="h3" variant="heading-strong-m">
                {skill.title}
              </Heading>
              <Text onBackground="neutral-weak">{skill.description}</Text>
              <Row wrap gap="8">
                {skill.tags.map((tag) => (
                  <Tag key={`${skill.title}-${tag}`} size="s" background="neutral-alpha-weak">
                    {tag}
                  </Tag>
                ))}
              </Row>
            </Card>
          ))}
        </Grid>
      </Column>

      <Column
        className={styles.sectionPanel}
        fillWidth
        gap="20"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <Column className={styles.sectionCopy} gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Como isso entra no projeto
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Tecnologia aplicada a necessidades reais
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            Nao trabalho a tecnologia isoladamente. Ela entra para melhorar presenca, desempenho e operacao.
          </Text>
        </Column>

        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {serviceAreas.map((item) => (
            <Card
              className={styles.cardTint}
              key={item.title}
              direction="column"
              gap="12"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              style={{ background: "var(--surface-weak)" }}
              fillHeight
            >
              <Tag size="s" background="neutral-alpha-weak">
                {item.badge}
              </Tag>
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text onBackground="neutral-weak">{item.description}</Text>
            </Card>
          ))}
        </Grid>
      </Column>

      <Grid columns="2" s={{ columns: 1 }} gap="16">
        <Column
          className={styles.sectionPanel}
          fillWidth
          gap="16"
          paddingX="24"
          paddingY="24"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          s={{ paddingX: "16", paddingY: "20" }}
        >
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Experiencia
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Base pratica
          </Heading>
          <Text variant="heading-strong-m">{featuredExperience.company}</Text>
          <Text onBackground="neutral-weak">
            {featuredExperience.role} | {featuredExperience.timeframe}
          </Text>
          <Column className={styles.list} as="ul" gap="8">
            {featuredExperience.achievements.map((achievement, index) => (
              <Text as="li" key={`achievement-${index}`} variant="body-default-m">
                {achievement}
              </Text>
            ))}
          </Column>
        </Column>

        <Column
          className={styles.sectionPanel}
          fillWidth
          gap="16"
          paddingX="24"
          paddingY="24"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          s={{ paddingX: "16", paddingY: "20" }}
        >
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Repertorio
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Pesquisa e criterio
          </Heading>
          <Column gap="12">
            {studyHighlights.map((item) => (
              <Column key={item.name} gap="4">
                <Text variant="heading-strong-s">{item.name}</Text>
                <Text onBackground="neutral-weak">{item.description}</Text>
              </Column>
            ))}
          </Column>
          <Row wrap gap="8">
            {principles.map((item) => (
              <Tag key={item} size="s" background="neutral-alpha-weak">
                {item}
              </Tag>
            ))}
          </Row>
        </Column>
      </Grid>

      <Column
        className={`${styles.sectionPanel} ${styles.finalPanel}`}
        fillWidth
        gap="16"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Proxima etapa
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Se quiser continuar me conhecendo, veja os projetos primeiro
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          O portfolio mostra melhor como essas habilidades viram produto, interface e entrega real.
          Se preferir, podemos conversar antes para alinhar escopo e prioridade.
        </Text>
        <Row gap="12" wrap s={{ direction: "column" }}>
          <Button href={work.path} variant="primary" size="m" arrowIcon>
            Ver projetos
          </Button>
          <Button href={calendarLink} variant="secondary" size="m" arrowIcon>
            {calendarLabel}
          </Button>
        </Row>
      </Column>
    </Column>
  );
}
