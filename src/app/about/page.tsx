import {
  Avatar,
  Button,
  Column,
  Grid,
  Heading,
  Icon,
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
import { type IconName } from "@/resources/icons";
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

const fitCards = [
  {
    icon: "person" as IconName,
    title: "Prestadores de serviço",
    description:
      "Para profissionais que querem conquistar seus primeiros clientes virtualmente com presença mais clara e captação organizada.",
    items: ["Psicólogos", "Advogados", "Serviços especializados"],
  },
  {
    icon: "calendar" as IconName,
    title: "Clínicas e operações de atendimento",
    description:
      "Para clínicas de saúde, salões, estética e serviços que precisam integrar sistema, agenda e gerenciamento de clientes.",
    items: ["Clínicas de saúde", "Salões e estética", "Agenda, CRM e automação"],
  },
  {
    icon: "package" as IconName,
    title: "Lojas locais e e-commerce",
    description:
      "Para lojas que querem atrair mais clientes locais ou estruturar melhor catálogo, pedidos e envios.",
    items: ["Vitrine local", "Pedidos e catálogo", "Envios de e-commerce"],
  },
] as const;

const serviceTracks = [
  {
    icon: "globe" as IconName,
    eyebrow: "Atrair",
    title: "Posicionamento e aquisição",
    description:
      "Estruturo presença digital e canais de entrada para trazer demanda mais qualificada.",
    items: ["Sites e landing pages", "Tráfego pago", "Oferta clara"],
  },
  {
    icon: "crm" as IconName,
    eyebrow: "Converter",
    title: "Conversão e relacionamento",
    description:
      "Organizo o caminho do lead até o fechamento para reduzir perda comercial e aumentar recorrência.",
    items: ["CRM simples", "WhatsApp e follow-up", "Agenda e atendimento"],
  },
  {
    icon: "rocket" as IconName,
    eyebrow: "Operar",
    title: "Operação e automação",
    description: "Conecto processos e ferramentas para o negócio crescer com menos improviso.",
    items: ["Automações", "Sistemas web", "Dashboards e dados"],
  },
] as const;

const serviceNotes = [
  "Estrutura antes de peça solta",
  "Escopo compatível com a realidade do negócio",
  "Execução viável com foco comercial",
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
                href={aboutStrategy.hero.primaryCtaHref}
                prefixIcon="chart"
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
                href={aboutStrategy.hero.secondaryCtaHref ?? work.path}
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
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Encaixe
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Para quem faço sentido
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Faço mais sentido quando o objetivo é conquistar clientes, organizar atendimento e tornar o
            digital mais útil para vender.
          </Text>
        </Row>

        <Grid className={styles.fitCards} columns="3" m={{ columns: 2 }} s={{ columns: 1 }} gap="20">
          {fitCards.map((card) => (
            <article className={styles.fitCard} key={card.title}>
              <div className={styles.fitCardTop}>
                <div className={styles.fitIconWrap}>
                  <Icon name={card.icon} size="m" />
                </div>
                <Heading as="h3" variant="heading-strong-m">
                  {card.title}
                </Heading>
              </div>

              <Text onBackground="neutral-weak" variant="body-default-m">
                {card.description}
              </Text>

              <div className={styles.fitCardItems}>
                {card.items.map((item) => (
                  <div className={styles.fitCardItem} key={item}>
                    <Text variant="body-default-s">{item}</Text>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </Grid>

        <Column className={styles.servicePanel} gap="20">
            <Column className={styles.serviceHeader} gap="12">
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                Serviços que presto
              </Text>
              <Heading as="h3" variant="heading-strong-l">
                Normalmente ajudo em três frentes que se conectam.
              </Heading>
              <Text className={styles.serviceLead} variant="body-default-s" onBackground="neutral-weak">
                Captação, conversão e operação digital, de acordo com o momento real do negócio.
              </Text>
            </Column>

            <div className={styles.serviceRail}>
              {serviceTracks.map((track) => (
                <article className={styles.serviceTrack} key={track.title}>
                  <div className={styles.serviceTrackMarker}>
                    <div className={styles.serviceIconWrap}>
                      <Icon name={track.icon} size="m" />
                    </div>
                  </div>

                  <div className={styles.serviceTrackBody}>
                    <div className={styles.serviceTrackTop}>
                      <Text className={styles.serviceTrackEyebrow} variant="label-default-s">
                        {track.eyebrow}
                      </Text>
                      <Heading as="h4" variant="heading-strong-m">
                        {track.title}
                      </Heading>
                    </div>

                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {track.description}
                    </Text>

                    <div className={styles.servicePillarItems}>
                      {track.items.map((item) => (
                        <div className={styles.servicePillarItem} key={item}>
                          <Text variant="body-default-s">{item}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.servicePrinciples}>
              {serviceNotes.map((note) => (
                <div className={styles.servicePrinciple} key={note}>
                  <span className={styles.servicePrincipleDot} aria-hidden="true" />
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {note}
                  </Text>
                </div>
              ))}
            </div>
          </Column>
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
