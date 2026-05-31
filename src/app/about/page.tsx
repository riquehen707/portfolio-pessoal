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
  blog,
  contentStrategy,
  person,
  productsPage,
  servicesPage,
  work,
} from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

const aboutStrategy = contentStrategy.pages.about;
const aboutPageDescription =
  "Como Henrique Reis lê oferta, página, conteúdo e atendimento antes de recomendar mais volume.";

const profileFacts = [
  {
    label: "O que faço",
    value: "Procuro onde a pessoa entende, desconfia ou abandona.",
  },
  {
    label: "Como decido",
    value: "Mexo no ponto que trava a próxima ação.",
  },
  {
    label: "O que evito",
    value: "Aumentar campanha quando a página ainda não explica.",
  },
] as const;

const thoughtBlocks = [
  "Prefiro corrigir uma oferta ruim antes de aumentar tráfego.",
  "Se o atendimento quebra, marketing vira desperdício.",
  "Nem todo negócio precisa postar mais. Às vezes precisa explicar melhor o que já vende.",
] as const;

const fitCards = [
  {
    icon: "person" as IconName,
    title: "Oferta e mensagem",
    description: "Quando a pessoa chega, mas não entende por que deveria escolher você.",
  },
  {
    icon: "calendar" as IconName,
    title: "Página e conteúdo",
    description: "Quando existe divulgação, mas a explicação não conduz para uma ação clara.",
  },
  {
    icon: "package" as IconName,
    title: "Atendimento e rotina",
    description: "Quando leads aparecem, mas se perdem no WhatsApp, agenda ou follow-up.",
  },
] as const;

const methodBlocks = [
  {
    number: "01",
    title: "Procurar o vazamento",
    description: "A pessoa chega? Entende? Confia? Chama? Recebe resposta?",
    items: ["Procura", "Página", "Conversa"],
  },
  {
    number: "02",
    title: "Mexer no menor ponto útil",
    description: "Uma oferta, uma seção da página, um CTA ou uma prova melhor.",
    items: ["Oferta", "CTA", "Prova"],
  },
  {
    number: "03",
    title: "Só depois pensar em volume",
    description: "Mais conteúdo, tráfego ou automação entram quando a base já responde melhor.",
    items: ["Conteúdo", "Tráfego", "Automação"],
  },
] as const;

const aboutNextLinks = [
  { href: blog.path, label: "Ler biblioteca" },
  { href: work.path, label: "Ver laboratório" },
  { href: productsPage.path, label: "Ver ferramentas" },
] as const;

const aboutPathCards = [
  {
    label: "Raciocínio",
    title: "Quero entender como Henrique pensa",
    description: "Leia as opiniões que aparecem antes de qualquer escopo.",
    href: "#como-penso",
    cta: "Ver raciocínio",
  },
  {
    label: "Processo",
    title: "Quero ver exemplos práticos",
    description: "Veja decisões pequenas, registros e aprendizados em andamento.",
    href: work.path,
    cta: "Ver laboratório",
  },
  {
    label: "Estudo",
    title: "Quero aprender antes de executar",
    description: "Use a biblioteca para revisar o problema antes de agir.",
    href: blog.path,
    cta: "Ir para biblioteca",
  },
  {
    label: "Ajuda",
    title: "Quero avaliar contratação",
    description: "Veja se o gargalo já pede ajuda externa.",
    href: servicesPage.path,
    cta: "Entender consultoria",
  },
] as const;

export async function generateMetadata() {
  const image = buildOgImage(about.title);
  const generatedMeta = Meta.generate({
    title: about.title,
    description: aboutPageDescription,
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
  return (
    <Column className={styles.page} maxWidth="l" gap="48" paddingTop="8">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={aboutPageDescription}
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

      <section className={styles.heroSection} id="sobre">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="24">
          <Column className={styles.heroMain} gap="20">
            <BrandSignature />
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Sobre
            </Text>
            <Heading as="h1" variant="display-strong-l" wrap="balance">
              Sou Henrique Reis. Eu organizo o que acontece antes da venda.
            </Heading>
            <div className={styles.accentLine} />
            <Text
              className={styles.heroLead}
              variant="heading-default-m"
              onBackground="neutral-weak"
              wrap="balance"
            >
              Olho para oferta, página, conteúdo e atendimento para descobrir onde a decisão trava.
              Quase nunca começo perguntando qual canal falta.
            </Text>
            <AboutScrollButton targetId="caminhos">Escolher caminho</AboutScrollButton>
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
                  <Text
                    className={styles.factLabel}
                    variant="label-default-s"
                    onBackground="neutral-weak"
                  >
                    {item.label}
                  </Text>
                  <Text
                    className={styles.factValue}
                    variant="body-default-m"
                    onBackground="neutral-weak"
                  >
                    {item.value}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </section>

      <section className={styles.section} id="caminhos">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionKicker}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Caminhos
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Escolha pelo que você quer entender.
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Sobre não precisa ser fim de navegação.
          </Text>
        </div>

        <div className={styles.pathGrid}>
          {aboutPathCards.map((item) => (
            <a className={styles.pathCard} href={item.href} key={item.title}>
              <span className={styles.pathLabel}>{item.label}</span>
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item.description}
              </Text>
              <span className={styles.pathCta}>{item.cta}</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section} id="como-penso">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionKicker}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            O que observo
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Algumas quebras aparecem o tempo todo.
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
          <Text
            className={styles.sectionKicker}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Onde entro
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Quando mais procura não vira conversa boa.
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            O gargalo costuma aparecer antes da venda.
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
          <Text
            className={styles.sectionKicker}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Como penso
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Eu organizo antes de escalar.
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

      <section className={styles.section} id="contato">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionKicker}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Próximo passo
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Veja se o problema combina com meu jeito de trabalhar.
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Se a trava está na oferta, página, conteúdo ou atendimento, comece pela consultoria.
          </Text>
        </div>

        <Row className={styles.ctaRow} gap="12" wrap>
          <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
            Entender consultoria
          </Button>
          {aboutNextLinks.map((link) => (
            <SmartLink href={link.href} suffixIcon="arrowRight" key={link.href}>
              {link.label}
            </SmartLink>
          ))}
        </Row>
      </section>
    </Column>
  );
}
