import {
  Avatar,
  Button,
  Column,
  Grid,
  Heading,
  Meta,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import { BrandSignature } from "@/components";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import styles from "@/components/about/about.module.scss";
import {
  about,
  baseURL,
  brandIdentity,
  contact,
  contentStrategy,
  person,
  social,
  technicalApproach,
  work,
} from "@/resources";
import { getPosts } from "@/utils/utils";

const kindLabels = {
  personal: "Pessoal",
  study: "Estudo",
  client: "Cliente",
} as const;

const aboutStrategy = contentStrategy.pages.about;

const thinkingBlocks = [
  {
    label: aboutStrategy.sections[0]?.label ?? "Visão",
    title:
      aboutStrategy.sections[0]?.title ??
      "Não acredito em excesso. Acredito em clareza bem executada.",
    description:
      aboutStrategy.sections[0]?.description ??
      "O valor não está em parecer complexo, e sim em organizar o que importa com precisão.",
  },
  {
    label: aboutStrategy.sections[1]?.label ?? "Como penso",
    title:
      aboutStrategy.sections[1]?.title ??
      "Negócios crescem quando posicionamento, operação e tecnologia trabalham juntos.",
    description:
      aboutStrategy.sections[1]?.description ??
      "Cada camada do digital precisa reforçar a outra. Quando isso acontece, a percepção melhora e a operação ganha força.",
  },
];

const differentialFocus = [
  "Visão estratégica para ler contexto antes de decidir ferramenta",
  "Execução prática para transformar direção em entrega utilizável",
  "Tecnologia moderna aplicada com critério e sem excesso",
  "Foco em resultado real, não em volume de entregas",
];

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: about.title,
      description: about.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
      path: about.path,
    }),
    keywords: aboutStrategy.seo.keywords,
  };
}

export default function About() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;
  const proofProjects = getPosts(["src", "app", "work", "projects"])
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt ?? 0).getTime() -
        new Date(a.metadata.publishedAt ?? 0).getTime(),
    )
    .slice(0, 2);

  return (
    <Column className={styles.page} maxWidth="l" gap="48" paddingTop="8">
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
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Sobre", url: `${baseURL}${about.path}` },
        ]}
      />

      <Column className={styles.hero} fillWidth gap="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <BrandSignature />
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              {aboutStrategy.hero.eyebrow}
            </Tag>
            <Heading variant="display-strong-l" wrap="balance">
              {aboutStrategy.hero.headline}
            </Heading>
            <div className={styles.accentLine} />
            <Text
              className={styles.lead}
              variant="heading-default-m"
              onBackground="neutral-weak"
              wrap="balance"
            >
              {aboutStrategy.hero.subheadline}
            </Text>
            <Row className={styles.actions} gap="12" wrap>
              <Button
                href={contact.path}
                prefixIcon="send"
                size="m"
                variant="primary"
                data-analytics-event="cta_click"
                data-analytics-label={aboutStrategy.hero.primaryCtaLabel}
                data-analytics-location="about_hero"
                data-analytics-type="primary"
              >
                {aboutStrategy.hero.primaryCtaLabel}
              </Button>
              <Button
                href={work.path}
                size="m"
                variant="secondary"
                arrowIcon
                data-analytics-event="cta_click"
                data-analytics-label={aboutStrategy.hero.secondaryCtaLabel}
                data-analytics-location="about_hero"
                data-analytics-type="secondary"
              >
                {aboutStrategy.hero.secondaryCtaLabel}
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
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Essência
                </Text>
                <Heading
                  className={styles.collageTitle}
                  as="h2"
                  variant="heading-strong-m"
                  wrap="balance"
                >
                  Simplicidade bem executada.
                </Heading>
                <Text
                  className={styles.collageBody}
                  variant="body-default-m"
                  onBackground="neutral-weak"
                >
                  Clareza estratégica em um mercado cheio de excesso.
                </Text>
              </div>
              <div className={styles.collageCard}>
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Emoção central
                </Text>
                <Heading
                  className={styles.collageTitle}
                  as="h2"
                  variant="heading-strong-s"
                  wrap="balance"
                >
                  {brandIdentity.emotion}
                </Heading>
              </div>
              <div className={styles.collageCard}>
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Percepção
                </Text>
                <Heading
                  className={styles.collageTitle}
                  as="h2"
                  variant="heading-strong-s"
                  wrap="balance"
                >
                  Confiança silenciosa. Critério visível.
                </Heading>
              </div>
            </div>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="20">
        <Tag size="s" background="neutral-alpha-weak">
          Visão
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Como eu penso o digital
        </Heading>

        <Grid className={styles.splitGrid} columns="2" s={{ columns: 1 }} gap="16">
          {thinkingBlocks.map((block) => (
            <Column key={block.label} className={styles.infoCard} gap="12">
              <Text
                className={styles.eyebrow}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                {block.label}
              </Text>
              <Heading as="h3" variant="heading-strong-l">
                {block.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {block.description}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="20">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          {aboutStrategy.sections[2]?.label ?? "Diferenciais"}
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          {aboutStrategy.sections[2]?.title ?? "O que sustenta meu trabalho."}
        </Heading>
        <Text onBackground="neutral-weak" variant="body-default-m">
          {aboutStrategy.sections[2]?.description ??
            "Visão estratégica, execução prática, tecnologia moderna e foco em resultado real."}
        </Text>

        <Grid className={styles.splitGrid} columns="2" s={{ columns: 1 }} gap="16">
          {differentialFocus.map((point) => (
            <Column key={point} className={styles.infoCard} gap="12">
              <Text
                className={styles.eyebrow}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                Diferencial
              </Text>
              <Text variant="heading-strong-m" wrap="balance">
                {point}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="20">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
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
              project.metadata.kind && kindLabels[project.metadata.kind as keyof typeof kindLabels];

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

        <Row gap="12" wrap>
          <Button href={contact.path} variant="primary" size="m" arrowIcon>
            Vamos conversar
          </Button>
          <Button href={whatsappLink} variant="secondary" size="m" prefixIcon="whatsapp">
            Falar no WhatsApp
          </Button>
        </Row>
      </Column>
    </Column>
  );
}
