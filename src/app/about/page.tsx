import { Avatar, Button, Column, Grid, Heading, Meta, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import { BrandSignature } from "@/components";
import styles from "@/components/about/about.module.scss";
import { about, baseURL, person, social, technicalApproach, work } from "@/resources";
import { getPosts } from "@/utils/utils";

const kindLabels = {
  personal: "Pessoal",
  study: "Estudo",
  client: "Cliente",
} as const;

const serviceFocus = [
  "Estratégia digital e posicionamento",
  "Sites, landing pages e presença com alto nível estético",
  "Sistemas, automações e operações mais claras",
];

const audienceFocus = [
  "Negócios locais que precisam crescer com estrutura",
  "Operações que dependem de confiança e percepção de valor",
  "Marcas que não querem aparência genérica nem execução solta",
];

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
  const whatsappLink = social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;
  const proofProjects = getPosts(["src", "app", "work", "projects"])
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt ?? 0).getTime() - new Date(a.metadata.publishedAt ?? 0).getTime(),
    )
    .slice(0, 2);

  return (
    <Column className={styles.page} maxWidth="m" gap="32" paddingTop="24">
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

      <Column className={styles.hero} fillWidth gap="24" padding="32">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <BrandSignature descriptor="Transformar complexidade em clareza" />
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Sobre
            </Tag>
            <Heading variant="display-strong-l" wrap="balance">
              Uno estética, estratégia e execução para construir crescimento digital com valor real.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.lead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Não entrego só design ou código. Estruturo presença, sistemas e comunicação para
              negócios que querem crescer com clareza, confiança e alto nível estético.
            </Text>
            <Row className={styles.actions} gap="12" wrap>
              <Button href={whatsappLink} prefixIcon="whatsapp" size="m" variant="primary">
                Falar no WhatsApp
              </Button>
              <Button href={work.path} size="m" variant="secondary" arrowIcon>
                Ver projetos
              </Button>
            </Row>
            <SmartLink href={technicalApproach.path} suffixIcon="arrowRight">
              Abordagem técnica
            </SmartLink>
          </Column>

          <Column className={styles.heroAside} gap="16">
            <Row className={styles.profileCard} gap="16" vertical="start">
              <div className={styles.avatarWrap}>
                <Avatar src={person.avatar} size="l" />
              </div>
              <Column className={styles.profileMeta} gap="8">
                <Text variant="label-strong-m">{person.name}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Bahia, Brasil
                </Text>
              </Column>
            </Row>

            <div className={styles.collage}>
              <div className={`${styles.collageCard} ${styles.collageWide}`}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Essência
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-m" wrap="balance">
                  Transformar complexidade em clareza.
                </Heading>
                <Text className={styles.collageBody} variant="body-default-m" onBackground="neutral-weak">
                  Estruturas digitais com direção, controle e valor aplicado.
                </Text>
              </div>
              <div className={styles.collageCard}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Arquétipo
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-s" wrap="balance">
                  Criador + Sábio
                </Heading>
              </div>
              <div className={styles.collageCard}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Diferencial
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-s" wrap="balance">
                  Sofisticação aplicada, sem ruído.
                </Heading>
              </div>
            </div>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Tag size="s" background="neutral-alpha-weak">
          Trabalho
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          O que eu construo
        </Heading>

        <Grid className={styles.splitGrid} columns="2" s={{ columns: 1 }} gap="16">
          <Column className={styles.infoCard} gap="12">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Entrega
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Presença, sistema e posicionamento.
            </Heading>
            <Column as="ul" className={styles.infoList} gap="12">
              {serviceFocus.map((point) => (
                <Text as="li" key={point} variant="body-default-m" onBackground="neutral-weak">
                  {point}
                </Text>
              ))}
            </Column>
          </Column>

          <Column className={styles.infoCard} gap="12">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Para quem
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Onde isso encaixa melhor.
            </Heading>
            <Column as="ul" className={styles.infoList} gap="12">
              {audienceFocus.map((point) => (
                <Text as="li" key={point} variant="body-default-m" onBackground="neutral-weak">
                  {point}
                </Text>
              ))}
            </Column>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Projetos
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Alguns trabalhos
            </Heading>
          </Column>
          <SmartLink href={work.path} suffixIcon="arrowRight">
            Ver projetos
          </SmartLink>
        </Row>

        <Grid className={styles.proofGrid} columns="3" s={{ columns: 1 }} gap="16">
          {proofProjects.map((project) => {
            const tag = project.metadata.tag ?? project.metadata.tags?.[0];
            const kind =
              project.metadata.kind &&
              kindLabels[project.metadata.kind as keyof typeof kindLabels];

            return (
              <Column key={project.slug} className={styles.proofCard} gap="12">
                <Row gap="8" wrap>
                  {kind && (
                    <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                      {kind}
                    </Tag>
                  )}
                  {tag && (
                    <Tag size="s" background="neutral-alpha-weak">
                      {tag}
                    </Tag>
                  )}
                </Row>
                <Text variant="heading-strong-m" wrap="balance">
                  {project.metadata.title}
                </Text>
                <SmartLink href={`/work/${project.slug}`} suffixIcon="arrowRight">
                  Abrir
                </SmartLink>
              </Column>
            );
          })}
        </Grid>
      </Column>
    </Column>
  );
}
