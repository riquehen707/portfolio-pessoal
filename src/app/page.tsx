import {
  Button,
  Column,
  Heading,
  Meta,
  RevealFx,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import { BrandSignature, Mailchimp } from "@/components";
import { HeroProofCarousel } from "@/components/HeroProofCarousel";
import { MarketStrategyRail } from "@/components/MarketStrategyRail";
import { Posts } from "@/components/blog/Posts";
import { FeaturedWorksShowcase } from "@/components/work/FeaturedWorksShowcase";
import { about, baseURL, blog, home, person, routes, servicesPage, work } from "@/resources";
import { getPosts } from "@/utils/utils";

import styles from "./home.module.scss";

const heroProofItems = [
  {
    icon: "grid" as const,
    label: "Presença forte para negócios que vivem de confiança",
  },
  {
    icon: "chart" as const,
    label: "Decisão orientada por lógica, dados e direção clara",
  },
  {
    icon: "globe" as const,
    label: "Design, tecnologia e comunicação em um mesmo sistema",
  },
  {
    icon: "rocket" as const,
    label: "Execução sofisticada sem aparência genérica ou improvisada",
  },
];

const heroPillars = [
  {
    label: "Essência",
    value: "Transformar complexidade em clareza.",
  },
  {
    label: "Arquétipo",
    value: "Criador + Sábio",
  },
  {
    label: "Centro",
    value: "Controle + Valor + Futuro",
  },
];

const heroSignals = [
  "Estratégia antes da execução.",
  "Design com função real.",
  "Tecnologia organizada para crescimento.",
];

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

  return (
    <Column maxWidth="m" horizontal="center" paddingY="20" gap="40">
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

      <Column className={styles.heroIntro} fillWidth gap="24">
        <div className={styles.heroFrame}>
          <RevealFx delay={0.04} speed={900} translateY={0.28}>
            <Column className={styles.heroStack} gap="16">
              <BrandSignature
                className={styles.heroBrand}
                descriptor="Estratégia, design e sistemas para crescimento digital"
              />

              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Estratégia antes da execução
              </Tag>

              <Column gap="12" className={styles.heroCopy}>
                <Heading wrap="balance" variant="display-strong-l">
                  {home.headline}
                </Heading>

                <Text
                  className={styles.heroLead}
                  wrap="balance"
                  onBackground="neutral-weak"
                  variant="heading-default-xl"
                >
                  {home.subline}
                </Text>
              </Column>

              <Row gap="12" wrap className={styles.heroActions}>
                <Button
                  href={about.calendar.link}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  size="m"
                  prefixIcon="calendar"
                >
                  Agendar uma ligação
                </Button>
                <Button href={work.path} variant="secondary" size="m" arrowIcon>
                  Conheça meu trabalho
                </Button>
              </Row>
            </Column>
          </RevealFx>

          <RevealFx delay={0.1} speed={980} translateY={0.24}>
            <Column className={styles.heroAside} gap="16">
              <Column gap="12">
                <Text className={styles.kicker} variant="label-default-s" onBackground="neutral-weak">
                  Posicionamento
                </Text>
                <Heading as="h2" variant="heading-strong-l" wrap="balance">
                  Presença digital que funciona. Visual que posiciona. Sistemas feitos para durar.
                </Heading>
                <Text onBackground="neutral-weak" variant="body-default-m">
                  Para negócios que querem presença forte, eficiência operacional e comunicação com
                  direção real.
                </Text>
              </Column>

              <div className={styles.heroPillarGrid}>
                {heroPillars.map((pillar) => (
                  <div key={pillar.label} className={styles.heroPillar}>
                    <Text className={styles.kicker} variant="label-default-s" onBackground="neutral-weak">
                      {pillar.label}
                    </Text>
                    <Text variant="body-default-m">{pillar.value}</Text>
                  </div>
                ))}
              </div>

              <Column as="ul" className={styles.heroSignalList} gap="12">
                {heroSignals.map((signal) => (
                  <Text as="li" key={signal} className={styles.heroSignalItem} onBackground="neutral-weak">
                    {signal}
                  </Text>
                ))}
              </Column>
            </Column>
          </RevealFx>
        </div>

        <RevealFx delay={0.14} speed={980} translateY={0.18}>
          <Column gap="12">
            <Text
              className={styles.proofLabel}
              variant="label-default-s"
              onBackground="neutral-weak"
            >
              Percepção desejada
            </Text>
            <HeroProofCarousel items={heroProofItems} />
          </Column>
        </RevealFx>
      </Column>

      <MarketStrategyRail />

      {hasWorkProjects ? (
        <FeaturedWorksShowcase projects={workProjects} />
      ) : (
        <Column fillWidth gap="12">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Portfólio em atualização
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Novos cases entram em breve
          </Heading>
          <RevealFx delay={0.16} speed={900} translateY={0.3}>
            <Row gap="12" wrap className={styles.actions}>
              <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
                Ver serviços
              </Button>
              <Button href={about.path} variant="secondary" size="m" arrowIcon>
                Sobre mim
              </Button>
            </Row>
          </RevealFx>
        </Column>
      )}

      {routes["/blog"] && (
        <Column className={styles.blogPanel} fillWidth gap="16">
          <Row
            className={styles.panelHeader}
            fillWidth
            horizontal="between"
            s={{ direction: "column" }}
          >
            <Column className={styles.panelCopy} gap="8">
              <Tag size="s" background="neutral-alpha-weak">
                Blog
              </Tag>
              <Heading as="h2" variant="display-strong-s">
                Pensamento, processo e internet sem ruído.
              </Heading>
              <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                Ensaios, notas e leituras sobre estratégia, tecnologia, comunicação e construção de
                presença digital com critério.
              </Text>
            </Column>

            <div className={styles.blogLinkRow}>
              <SmartLink href={blog.path} suffixIcon="arrowRight">
                Ir para o blog
              </SmartLink>
            </div>
          </Row>

          <Posts range={[1, 2]} featuredFirst thumbnail showSummary marginBottom="0" />
        </Column>
      )}

      <Column className={styles.contactPanel} fillWidth gap="20">
        <Row
          className={styles.contactShell}
          fillWidth
          horizontal="between"
          s={{ direction: "column" }}
        >
          <Column className={styles.panelCopy} gap="12">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Próximo passo
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Se a operação precisa de mais clareza, a próxima conversa começa por aí.
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              O objetivo não é empilhar entregas. É entender contexto, organizar prioridades e
              desenhar a estrutura certa para crescer com mais controle.
            </Text>

            <Row gap="12" wrap className={styles.heroActions}>
              <Button
                href={about.calendar.link}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                size="m"
                prefixIcon="calendar"
              >
                Agendar uma ligação
              </Button>
              <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
                Ver serviços
              </Button>
            </Row>
          </Column>

          <Column className={styles.contactAside} gap="12">
            <Text
              className={styles.proofLabel}
              variant="label-default-s"
              onBackground="neutral-weak"
            >
              O que essa conversa destrava
            </Text>
            <Column className={styles.signalList} as="ul" gap="12">
              <Text as="li" className={styles.signalItem} onBackground="neutral-weak">
                leitura objetiva da estrutura digital atual
              </Text>
              <Text as="li" className={styles.signalItem} onBackground="neutral-weak">
                definição do formato mais adequado para o próximo passo
              </Text>
              <Text as="li" className={styles.signalItem} onBackground="neutral-weak">
                priorização técnica e estratégica sem excesso de ruído
              </Text>
            </Column>
          </Column>
        </Row>
      </Column>

      <Mailchimp />
    </Column>
  );
}
