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
import { getPosts } from "@/utils/utils";

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
  const workProjects = getPosts(["src", "app", "work", "projects"]);
  const hasWorkProjects = workProjects.length > 0;
  const hasMoreWorkProjects = workProjects.length > 1;

  const heroSignals = [
    {
      label: "Quem costuma me procurar",
      value:
        "Psicólogas, consultores, autônomos e prestadores de serviço que precisam passar mais confiança no digital.",
    },
    {
      label: "O que muda",
      value:
        "A oferta fica mais clara, a presença mais profissional e o contato deixa de parecer improvisado.",
    },
    {
      label: "Onde a técnica entra",
      value:
        "Next.js, Vue, SCSS, SEO técnico e automações, mas sempre como suporte para uma experiência melhor.",
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
              <Text
                className={styles.heroCopy}
                wrap="balance"
                onBackground="neutral-weak"
                variant="heading-default-xl"
              >
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
                    <Text
                      className={styles.eyebrow}
                      variant="label-default-s"
                      onBackground="neutral-weak"
                    >
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

      {hasWorkProjects ? (
        <>
          <Column className={styles.section} gap="16">
            <Row
              className={styles.sectionHeader}
              fillWidth
              horizontal="between"
              vertical="end"
              s={{ direction: "column" }}
            >
              <Column className={styles.sectionIntro} gap="8">
                <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                  Projeto em destaque
                </Tag>
                <Heading as="h2" variant="display-strong-s">
                  Um projeto para sentir o padrão de clareza e acabamento
                </Heading>
                <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                  Em vez de abrir com promessa demais, a Home começa por um case que mostra como eu
                  organizo leitura, hierarquia e intenção.
                </Text>
              </Column>
            </Row>
            <div className={styles.featuredLayout}>
              <Column className={styles.featuredAside} gap="12">
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Destaque
                </Text>
                <Text variant="heading-strong-m" wrap="balance">
                  Um case bem escolhido explica melhor o trabalho do que uma vitrine longa logo na
                  primeira dobra.
                </Text>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  A prioridade aqui é abrir a conversa com contexto, repertório e uma leitura clara
                  do que eu entrego.
                </Text>
              </Column>
              <Projects range={[1, 1]} marginBottom="0" paddingX="0" cardVariant="feature" />
            </div>
          </Column>

          {hasMoreWorkProjects && (
            <Column className={styles.section} gap="16">
              <Row
                className={styles.sectionHeader}
                fillWidth
                horizontal="between"
                vertical="end"
                s={{ direction: "column" }}
              >
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
              <Projects
                range={[2, 3]}
                marginBottom="0"
                paddingX="0"
                layout="grid"
                cardVariant="compact"
              />
            </Column>
          )}
        </>
      ) : (
        <Column className={styles.sectionPanel} gap="16" padding="24">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Portfólio em atualização
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Os placeholders antigos saíram da vitrine
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            Prefiro deixar a área de projetos mais enxuta do que sustentar estudos genéricos como
            prova principal. Os próximos cases entram aqui com mais contexto real, material visual e
            recorte mais honesto.
          </Text>
          <Row gap="12" wrap>
            <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
              Conhecer serviços
            </Button>
            <Button href={about.path} variant="secondary" size="m" arrowIcon>
              Ver sobre
            </Button>
          </Row>
        </Column>
      )}

      {routes["/blog"] && (
        <Column className={styles.sectionPanel} gap="20" padding="24">
          <Row
            className={styles.sectionHeader}
            fillWidth
            horizontal="between"
            vertical="end"
            s={{ direction: "column" }}
          >
            <Column className={styles.sectionIntro} gap="8">
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Conteúdo
              </Tag>
              <Heading as="h2" variant="display-strong-s">
                Ensaios, tecnologia e interesses em aberto
              </Heading>
              <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                O blog também faz parte do meu jeito de trabalhar: penso melhor quando escrevo,
                observo e conecto assuntos diferentes.
              </Text>
            </Column>
            <SmartLink href={blog.path} suffixIcon="arrowRight">
              Ir para o blog
            </SmartLink>
          </Row>
          <Posts range={[1, 2]} featuredFirst marginBottom="0" />
        </Column>
      )}

      <Mailchimp />
    </Column>
  );
}
