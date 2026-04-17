import { Avatar, Button, Column, Grid, Heading, Meta, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import styles from "@/components/about/about.module.scss";
import { about, baseURL, person, social, technicalApproach, work } from "@/resources";
import { getPosts } from "@/utils/utils";

const kindLabels = {
  personal: "Pessoal",
  study: "Estudo",
  client: "Cliente",
} as const;

const serviceFocus = ["Sites e landing pages", "SEO técnico", "Automações e integrações"];

const audienceFocus = [
  "Negócios locais",
  "Profissionais de serviço",
  "Operações que vivem de confiança e contato",
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
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Sobre
            </Tag>
            <Heading variant="display-strong-l" wrap="balance">
              Crio sites, SEO técnico e automações para negócios que precisam ser entendidos rápido.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.lead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Clareza primeiro. Técnica para sustentar o resto.
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
                  Foco
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-m" wrap="balance">
                  Página, busca e contato alinhados.
                </Heading>
                <Text className={styles.collageBody} variant="body-default-m" onBackground="neutral-weak">
                  Estrutura clara para vender, atender e crescer melhor.
                </Text>
              </div>
              <div className={styles.collageCard}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Entrega
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-s" wrap="balance">
                  Sites, landing pages e sistemas leves.
                </Heading>
              </div>
              <div className={styles.collageCard}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Base
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-s" wrap="balance">
                  Next.js, SCSS, SEO e automação.
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
          O que eu faço
        </Heading>

        <Grid className={styles.splitGrid} columns="2" s={{ columns: 1 }} gap="16">
          <Column className={styles.infoCard} gap="12">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Entrega
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Estrutura digital para negócio local.
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
              Melhor encaixe.
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
