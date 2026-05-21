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
  Text,
} from "@once-ui-system/core";

import { BrandSignature } from "@/components";
import { AboutScrollButton } from "@/components/about/AboutSectionNav";
import styles from "@/components/about/about.module.scss";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { type IconName } from "@/resources/icons";
import {
  about,
  baseURL,
  contentStrategy,
  person,
  simulationPage,
  social,
  work,
} from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

const aboutStrategy = contentStrategy.pages.about;

const profileFacts = [
  {
    label: "Foco",
    value: "Negócios locais, prestadores de serviço e operações de atendimento.",
  },
  {
    label: "Atuação",
    value: "Marketing, páginas e sistemas digitais.",
  },
  {
    label: "Entrega",
    value: "Aquisição, recorte comercial e organização de leads.",
  },
] as const;

const thoughtBlocks = [
  "Divulgação sozinha não resolve crescimento.",
  "Oferta, página e atendimento precisam conversar.",
  "Organizo a base antes de aumentar complexidade.",
] as const;

const fitCards = [
  {
    icon: "person" as IconName,
    title: "Prestadores de serviço",
    description: "Psicologos, advogados, consultores e serviços especializados.",
  },
  {
    icon: "calendar" as IconName,
    title: "Operações de atendimento",
    description: "Clínicas, estética, saúde, agenda e recorrência.",
  },
  {
    icon: "package" as IconName,
    title: "Negócios locais",
    description: "Lojas, serviços locais e marcas que precisam captar melhor.",
  },
] as const;

const methodBlocks = [
  {
    number: "01",
    title: "Presença e aquisição",
    description: "Sites, páginas, canais de entrada e oferta.",
    items: ["Site", "Landing page", "Canal de entrada"],
  },
  {
    number: "02",
    title: "Conversa e decisão",
    description: "WhatsApp, formulário, proposta, atendimento e follow-up.",
    items: ["WhatsApp", "Formulário", "Follow-up"],
  },
  {
    number: "03",
    title: "Rotina e controle",
    description: "Sistemas simples, dados, automações e acompanhamento.",
    items: ["Sistemas", "Dados", "Acompanhamento"],
  },
] as const;

const relatedProjects = [
  {
    title: "Simulador de investimento",
    type: "Diagnóstico e calculo",
    summary: "Leitura inicial para decidir antes de aumentar verba.",
    href: simulationPage.path,
  },
  {
    title: "Página para clínica de estética",
    type: "Página e captação",
    summary: "Estrutura pensada para agenda, recorrência e contato simples.",
    href: "/servicos/landing-page-para-estetica",
  },
  {
    title: "Integrações para atendimento",
    type: "Sistema e operação",
    summary: "Fluxos, automações e organização para leads e acompanhamento.",
    href: "/servicos/integracoes-automacoes",
  },
] as const;

export async function generateMetadata() {
  const image = buildOgImage(about.title);
  const generatedMeta = Meta.generate({
    title: about.title,
    description: about.description,
    baseURL,
    image,
    path: about.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, about.title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
    keywords: aboutStrategy.seo.keywords,
  };
}

export default function About() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;

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
          { name: "Inicio", url: baseURL },
          { name: "Sobre", url: `${baseURL}${about.path}` },
        ]}
      />

      <section className={styles.heroSection} id="sobre">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="24">
          <Column className={styles.heroMain} gap="20">
            <BrandSignature />
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Sobre
            </Text>
            <Heading as="h1" variant="display-strong-l" wrap="balance">
              Estratégia, páginas e sistemas para vender com mais direção.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.heroLead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Presença, captação e acompanhamento no mesmo raciocínio.
            </Text>
            <AboutScrollButton targetId="metodo">Ver como trabalho</AboutScrollButton>
          </Column>

          <div className={styles.profileCard}>
            <Row className={styles.profileTop} gap="12" vertical="center">
              <Avatar src={person.avatar} size="m" />
              <Column className={styles.profileIdentity} gap="4">
                <Text variant="label-strong-m">{person.name}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Bahia, Brasil
                </Text>
              </Column>
            </Row>

            <div className={styles.profileFacts}>
              {profileFacts.map((item) => (
                <div className={styles.profileFact} key={item.label}>
                  <Text className={styles.factLabel} variant="label-default-s" onBackground="neutral-weak">
                    {item.label}
                  </Text>
                  <Text className={styles.factValue} variant="body-default-m" onBackground="neutral-weak">
                    {item.value}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </section>
      <section className={styles.section} id="como-penso">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Sobre
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Como penso
          </Heading>
        </div>

        <Grid className={styles.thoughtGrid} columns="3" m={{ columns: 1 }} gap="20">
          {thoughtBlocks.map((item) => (
            <div className={styles.thoughtBlock} key={item}>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item}
              </Text>
            </div>
          ))}
        </Grid>
      </section>

      <section className={styles.section} id="foco">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Foco
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Para quem faço sentido
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Para quem precisa captar, atender e vender com mais clareza.
          </Text>
        </div>

        <Grid className={styles.fitGrid} columns="3" m={{ columns: 1 }} gap="20">
          {fitCards.map((card) => (
            <article className={styles.fitItem} key={card.title}>
              <div className={styles.fitItemTop}>
                <div className={styles.fitIcon}>
                  <Icon name={card.icon} size="m" />
                </div>
                <Heading as="h3" variant="heading-strong-m">
                  {card.title}
                </Heading>
              </div>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {card.description}
              </Text>
            </article>
          ))}
        </Grid>
      </section>

      <section className={styles.section} id="metodo">
        <div className={styles.sectionHeader}>
         <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Método
          </Text>
          <Heading as="h2" variant="display-strong-s">
            O que normalmente organizo
          </Heading>
        </div>

        <Grid className={styles.methodGrid} columns="3" m={{ columns: 1 }} gap="20">
          {methodBlocks.map((item) => (
            <article className={styles.methodItemBlock} key={item.title}>
              <span className={styles.methodNumber}>{item.number}</span>
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item.description}
              </Text>
              <div className={styles.methodList}>
                {item.items.map((entry) => (
                  <span className={styles.methodListItem} key={entry}>
                    {entry}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Grid>
      </section>

      <section className={styles.section} id="projetos">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Projetos
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Projetos relacionados
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Páginas, sistemas e aquisição em prática.
          </Text>
        </div>

        <Grid className={styles.projectsGrid} columns="3" m={{ columns: 1 }} gap="20">
          {relatedProjects.map((project) => (
            <article className={styles.projectItem} key={project.title}>
              <Text className={styles.projectType} variant="label-default-s" onBackground="neutral-weak">
                {project.type}
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {project.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {project.summary}
              </Text>
              <SmartLink href={project.href} suffixIcon="arrowRight">
                Ver projeto
              </SmartLink>
            </article>
          ))}
        </Grid>

        <Button href={work.path} variant="secondary" size="m" arrowIcon>
          Ver todos os projetos
        </Button>
      </section>

      <section className={styles.section} id="contato">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Contato
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Antes de investir mais, vale entender a estrutura.
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Simule antes de aumentar verba ou redesenhar páginas.
          </Text>
        </div>

        <Row className={styles.ctaRow} gap="12" wrap>
          <Button href={simulationPage.path} variant="primary" size="m" arrowIcon>
            Ver simulação
          </Button>
          <Button href={whatsappLink} variant="secondary" size="m" prefixIcon="whatsapp">
            Conversar
          </Button>
        </Row>
      </section>
    </Column>
  );
}
