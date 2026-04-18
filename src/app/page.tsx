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

import { Mailchimp } from "@/components";
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
    label: "Especializado em negócios e serviços locais",
  },
  {
    icon: "chart" as const,
    label: "Decisões guiadas por dados reais",
  },
  {
    icon: "globe" as const,
    label: "Ecossistema digital completo e integrado",
  },
  {
    icon: "rocket" as const,
    label: "Soluções personalizadas para sua operação",
  },
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
        <RevealFx delay={0.08} speed={1200} translateY={0.8}>
          <Column className={styles.heroStack} gap="16">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Operação digital para negócios locais
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

        <RevealFx delay={0.18} speed={1250} translateY={0.7}>
          <Column gap="12">
            <Text
              className={styles.proofLabel}
              variant="label-default-s"
              onBackground="neutral-weak"
            >
              Base do trabalho
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
          <RevealFx delay={0.22} speed={1200} translateY={0.9}>
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
                Textos sobre internet, negócio e tecnologia
              </Heading>
              <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                Ensaios, notas e leituras práticas sobre presença digital, operação e tomada de
                decisão.
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
              Se fizer sentido, a próxima conversa já pode sair com direção prática.
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              A ideia aqui não é vender confusão. É entender contexto, organizar prioridades e
              transformar presença digital em operação mais clara.
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
                leitura objetiva da situação atual do negócio
              </Text>
              <Text as="li" className={styles.signalItem} onBackground="neutral-weak">
                prioridades técnicas e estratégicas em ordem útil
              </Text>
              <Text as="li" className={styles.signalItem} onBackground="neutral-weak">
                recomendação de formato mais adequado para o próximo passo
              </Text>
            </Column>
          </Column>
        </Row>
      </Column>

      <Mailchimp />
    </Column>
  );
}
