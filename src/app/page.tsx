import {
  Badge,
  Button,
  Column,
  Grid,
  Heading,
  Meta,
  RevealFx,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, blog, home, person, routes, servicesPage, work } from "@/resources";

import styles from "./home.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const heroSignals = [
    {
      label: "Para quem",
      value: "Psicólogas, consultores, autônomos e prestadores de serviço que precisam vender melhor.",
    },
    {
      label: "Foco",
      value: "Clareza na oferta, presença profissional e geração de contatos com menos ruído.",
    },
    {
      label: "Como entra a técnica",
      value: "Next.js, Vue, SCSS, SEO técnico e automações quando isso melhora resultado de verdade.",
    },
  ];

  return (
    <Column className={styles.page} maxWidth="m" gap="40" paddingY="16" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <RevealFx fillWidth translateY="8">
        <Column className={styles.hero} fillWidth gap="24" padding="24">
          <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
            <Column className={styles.heroMain} gap="16">
              {home.featured.display && (
                <Badge
                  background="brand-alpha-weak"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-strong"
                  textVariant="label-default-s"
                  arrow={false}
                  href={home.featured.href}
                >
                  <Row paddingY="2">{home.featured.title}</Row>
                </Badge>
              )}
              <Heading wrap="balance" variant="display-strong-l">
                {home.headline}
              </Heading>
              <div className={styles.accentLine} />
              <Text className={styles.heroCopy} wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
              <Row className={styles.actions} gap="12" wrap>
                <Button href={work.path} variant="primary" size="m" arrowIcon>
                  Ver projetos
                </Button>
                <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
                  Conhecer serviços
                </Button>
              </Row>
              <SmartLink href={about.path} suffixIcon="arrowRight">
                Conhecer mais sobre mim
              </SmartLink>
            </Column>

            <Column className={styles.heroAside} gap="16" padding="20">
              <Tag size="s" background="neutral-alpha-weak">
                Direção atual
              </Tag>
              <Column className={styles.signalList} gap="12">
                {heroSignals.map((item) => (
                  <Column key={item.label} className={styles.signalItem} gap="8">
                    <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                      {item.label}
                    </Text>
                    <Text variant="body-default-m">{item.value}</Text>
                  </Column>
                ))}
              </Column>
              <SmartLink href={blog.path} suffixIcon="arrowRight">
                Ver artigos e estudos
              </SmartLink>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      <Column className={styles.section} gap="16">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Projeto em destaque
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Um projeto para ver como isso ganha forma
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              Em vez de abrir com excesso de informação, a Home começa por um case que mostra critério,
              estrutura e direção.
            </Text>
          </Column>
        </Row>
        <div className={styles.featuredLayout}>
          <Column className={styles.featuredAside} gap="12">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Destaque
            </Text>
            <Text variant="heading-strong-m" wrap="balance">
              Um case principal bem posicionado explica melhor o trabalho do que uma vitrine longa logo na primeira dobra.
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              A prioridade aqui é abrir a conversa com contexto, método e uma leitura clara do que eu entrego.
            </Text>
          </Column>
          <Projects range={[1, 1]} marginBottom="0" paddingX="0" cardVariant="feature" />
        </div>
      </Column>

      {routes["/blog"] && (
        <Column className={styles.sectionPanel} gap="20" padding="24">
          <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
            <Column className={styles.sectionIntro} gap="8">
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Conteúdo
              </Tag>
              <Heading as="h2" variant="display-strong-s">
                Ensaios, tecnologia e interesses em aberto
              </Heading>
              <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                Um recorte do caderno editorial para mostrar como filosofia, cultura, internet e técnica também atravessam meu trabalho.
              </Text>
            </Column>
            <SmartLink href={blog.path} suffixIcon="arrowRight">
              Ir para o blog
            </SmartLink>
          </Row>
          <Posts range={[1, 2]} featuredFirst marginBottom="0" />
        </Column>
      )}

      <Column className={styles.section} gap="16">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Mais projetos
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Outros projetos e estudos aplicados
            </Heading>
          </Column>
          <SmartLink href={work.path} suffixIcon="arrowRight">
            Ver portfólio completo
          </SmartLink>
        </Row>
        <Projects range={[2, 3]} marginBottom="0" paddingX="0" layout="grid" cardVariant="compact" />
      </Column>

      <Mailchimp />
    </Column>
  );
}
