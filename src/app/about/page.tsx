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

const compactSummary = [
  {
    label: "Especialidade",
    value: "Negócios locais, prestadores de serviço e e-commerce.",
  },
  {
    label: "Entrega",
    value: "Captação de clientes, presença digital e estrutura operacional.",
  },
  {
    label: "Atuação",
    value: "Marketing, sistemas e posicionamento digital.",
  },
] as const;

const storyParagraphs = [
  "Empreender cedo me ensinou algo importante: bons negócios nem sempre crescem, porque esforço sem estrutura cobra caro.",
  "Depois de enfrentar mudanças pessoais profundas, precisei recomeçar do zero. Esse processo me tornou ainda mais prático, disciplinado e orientado a resultado.",
  "Hoje aplico essa visão ajudando pequenos negócios e prestadores de serviço a vender melhor, operar melhor e crescer com mais clareza.",
];

const fitParagraphs = [
  "Trabalho melhor com pequenos e médios negócios que já entregam valor, mas ainda precisam organizar presença digital, captação e relacionamento com clientes.",
  "Isso inclui profissionais e empresas de serviço que dependem de confiança para vender: psicólogos, advogados, contadores, dentistas, clínicas de estética e negócios locais especializados.",
  "Faço sentido para quem está nos primeiros anos de crescimento, sente que o digital poderia render mais e precisa de estrutura sem transformar tudo em complexidade.",
];

const serviceItems = [
  "Captação de clientes",
  "Presença digital",
  "Sites",
  "Tráfego pago",
  "CRM",
  "Automações",
  "Sistemas web",
  "Organização comercial",
] as const;

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
    .filter((project) => project.slug !== "atlas-imoveis-estudo")
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
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="24">
          <Column className={styles.heroMain} gap="20">
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

          <Column className={styles.heroAside} gap="20">
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

            <div className={styles.summaryCard}>
              {compactSummary.map((item) => (
                <div className={styles.summaryRow} key={item.label}>
                  <Text
                    className={styles.eyebrow}
                    variant="label-default-s"
                    onBackground="neutral-weak"
                  >
                    {item.label}
                  </Text>
                  <Text
                    className={styles.summaryValue}
                    variant="body-default-m"
                    onBackground="neutral-weak"
                    wrap="balance"
                  >
                    {item.value}
                  </Text>
                </div>
              ))}
            </div>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="24">
        <Tag size="s" background="neutral-alpha-weak">
          Trajetória
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Minha história
        </Heading>

        <Column className={styles.storyBody} gap="16">
          {storyParagraphs.map((paragraph) => (
            <Text key={paragraph} variant="body-default-m" onBackground="neutral-weak">
              {paragraph}
            </Text>
          ))}
        </Column>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Aderência
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Para quem faço sentido
        </Heading>

        <Grid className={styles.fitGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.storyBody} gap="16">
            {fitParagraphs.map((paragraph) => (
              <Text key={paragraph} onBackground="neutral-weak" variant="body-default-m">
                {paragraph}
              </Text>
            ))}
          </Column>

          <Column className={styles.serviceCard} gap="16">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Serviços que presto
            </Text>
            <div className={styles.serviceTags}>
              {serviceItems.map((item) => (
                <Tag key={item} size="s" background="neutral-alpha-weak">
                  {item}
                </Tag>
              ))}
            </div>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="24">
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

        <Grid className={styles.proofGrid} columns="3" s={{ columns: 1 }} gap="20">
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
