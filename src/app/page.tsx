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
      label: "Stack",
      value: "Next.js, Vue, SCSS e arquitetura de interface.",
    },
    {
      label: "Especialidade",
      value: "SEO tecnico para lojas virtuais, blogs e paginas de captacao.",
    },
    {
      label: "Entrega",
      value: "Sites claros, rapidos e prontos para conversao e crescimento.",
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
                  Conhecer servicos
                </Button>
              </Row>
              <SmartLink href={about.path} suffixIcon="arrowRight">
                Conhecer mais sobre mim
              </SmartLink>
            </Column>

            <Column className={styles.heroAside} gap="16" padding="20">
              <Tag size="s" background="neutral-alpha-weak">
                Direcao atual
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
              Uma leitura rapida do meu jeito de construir
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              O portfolio fica mais leve quando um case abre a conversa e o restante aparece no ritmo certo.
            </Text>
          </Column>
        </Row>
        <Projects range={[1, 1]} marginBottom="0" paddingX="0" />
      </Column>

      {routes["/blog"] && (
        <Column className={styles.sectionPanel} gap="20" padding="24">
          <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
            <Column className={styles.sectionIntro} gap="8">
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Conteudo
              </Tag>
              <Heading as="h2" variant="display-strong-s">
                Artigos para aprofundar metodo, produto e SEO
              </Heading>
              <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                Um bloco editorial compacto, sem transformar a Home em uma lista longa.
              </Text>
            </Column>
            <SmartLink href={blog.path} suffixIcon="arrowRight">
              Ir para o blog
            </SmartLink>
          </Row>
          <Posts range={[1, 2]} columns="2" marginBottom="0" />
        </Column>
      )}

      <Column className={styles.section} gap="16">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Mais projetos
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Outros cases e estudos de caso
            </Heading>
          </Column>
          <SmartLink href={work.path} suffixIcon="arrowRight">
            Ver portfolio completo
          </SmartLink>
        </Row>
        <Projects range={[2]} marginBottom="0" paddingX="0" />
      </Column>

      <Mailchimp />
    </Column>
  );
}
