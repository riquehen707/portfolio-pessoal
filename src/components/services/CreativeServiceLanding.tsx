import {
  Button,
  Card,
  Column,
  Grid,
  Heading,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";

import { baseURL, person, servicesPage, work } from "@/resources";
import { ServiceLanding } from "@/types";

import styles from "./CreativeServiceLanding.module.scss";

type CreativeServiceLandingProps = {
  service: ServiceLanding;
  metaTitle: string;
  metaDescription: string;
};

const frictionPoints = [
  {
    label: "Dependência externa",
    title: "Quando indicação e plataforma secam, a entrada de clientes cai junto.",
    description:
      "Sem uma base própria de posicionamento, o freelancer fica sempre vulnerável ao algoritmo, ao boca a boca e à urgência do mês.",
  },
  {
    label: "Oferta confusa",
    title: "Muita gente boa perde cliente porque não explica bem o que faz.",
    description:
      "O visitante entra, gosta do visual, mas não entende com clareza o serviço, o perfil de cliente atendido e o próximo passo.",
  },
  {
    label: "Autoridade dispersa",
    title: "Portfólio solto e bio genérica não sustentam crescimento.",
    description:
      "Sem uma página bem organizada, prova, processo e diferenciais ficam espalhados e a percepção profissional cai.",
  },
];

const growthSignals = [
  {
    title: "Mais clientes com constância",
    description: "Uma rota mais previsível para transformar visita em conversa comercial e briefing.",
  },
  {
    title: "Posicionamento mais claro",
    description: "Mensagem mais direta sobre nicho, serviço, processo e valor entregue.",
  },
  {
    title: "Autoridade no digital",
    description: "Presença mais profissional para sustentar conteúdo, tráfego, indicação e fechamento.",
  },
];

const leverageBlocks = [
  {
    title: "Oferta organizada",
    description:
      "A página mostra o que você resolve, para quem trabalha e qual tipo de projeto faz mais sentido para o cliente.",
  },
  {
    title: "Prova bem posicionada",
    description:
      "Cases, recortes de projeto, bastidores e resultados entram para reforçar competência sem exagero visual.",
  },
  {
    title: "Contato direto",
    description:
      "WhatsApp, formulário ou briefing curto aparecem no momento certo para reduzir atrito e facilitar o próximo passo.",
  },
];

const audienceHighlights = [
  "Social medias que precisam sair da dependência de indicação.",
  "Designers freelancers que querem uma apresentação mais profissional.",
  "Freelancers digitais com boa entrega, mas sem posicionamento claro.",
  "Pequenos estúdios criativos que precisam transformar visita em lead.",
];

export default function CreativeServiceLanding({
  service,
  metaTitle,
  metaDescription,
}: CreativeServiceLandingProps) {
  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={metaTitle}
        description={metaDescription}
        path={`${servicesPage.path}/${service.slug}`}
        image={`/api/og/generate?title=${encodeURIComponent(service.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${servicesPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Row className={styles.tagRow} gap="8" wrap>
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                {service.badge}
              </Tag>
              {service.tags.map((tag) => (
                <Tag key={`${service.slug}-${tag}`} size="s" background="neutral-alpha-weak">
                  {tag}
                </Tag>
              ))}
            </Row>

            <Heading as="h1" variant="heading-strong-xl" wrap="balance">
              Landing page para social media, designers e freelancers digitais que querem crescer com mais consistência.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.lead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              {service.hero.description}
            </Text>

            <Row className={styles.heroActions} gap="12" wrap>
              <Button href={service.hero.ctaHref} variant="primary" size="m" arrowIcon>
                {service.hero.ctaLabel}
              </Button>
              <Button href={work.path} variant="secondary" size="m" arrowIcon>
                Ver projetos
              </Button>
            </Row>
          </Column>

          <Column className={styles.heroSide} gap="12">
            <Column className={styles.metricCard} gap="8">
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Objetivo
              </Text>
              <Text variant="heading-strong-m">Sair do ciclo instável e gerar clientes com mais frequência.</Text>
            </Column>

            <Column className={styles.metricCard} gap="8">
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Ponto crítico
              </Text>
              <Text variant="body-default-m">
                Ter presença online sem posicionamento claro normalmente reduz resposta, autoridade e fechamento.
              </Text>
            </Column>

            <Column className={styles.metricRow} gap="12">
              <Column className={styles.metricMini} gap="8">
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Investimento
                </Text>
                <Text variant="heading-strong-s">{service.hero.price}</Text>
              </Column>
              <Column className={styles.metricMini} gap="8">
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Prazo
                </Text>
                <Text variant="heading-strong-s">{service.hero.duration}</Text>
              </Column>
            </Column>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} gap="16" padding="24">
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Onde trava
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            O problema não é só conseguir atenção. É transformar atenção em cliente.
          </Heading>
        </Column>

        <Grid className={styles.problemGrid} columns="3" s={{ columns: 1 }} gap="16">
          {frictionPoints.map((item) => (
            <Column key={item.title} className={styles.infoCard} gap="12">
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                {item.label}
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text onBackground="neutral-weak">{item.description}</Text>
            </Column>
          ))}
        </Grid>
      </Column>

      <Grid className={styles.asideGrid} columns="2" s={{ columns: 1 }} gap="16">
        <Card
          className={styles.signalPanel}
          direction="column"
          gap="16"
          paddingX="24"
          paddingY="24"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Tag size="s" background="neutral-alpha-weak">
            O que precisa melhorar
          </Tag>
          <Heading as="h2" variant="heading-strong-l">
            Crescimento previsível pede estrutura.
          </Heading>
          <Column gap="12">
            {growthSignals.map((item) => (
              <Column key={item.title} className={styles.inlineBlock} gap="8">
                <Text variant="label-default-m">{item.title}</Text>
                <Text onBackground="neutral-weak">{item.description}</Text>
              </Column>
            ))}
          </Column>
        </Card>

        <Card
          className={styles.signalPanel}
          direction="column"
          gap="16"
          paddingX="24"
          paddingY="24"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Tag size="s" background="neutral-alpha-weak">
            Para quem
          </Tag>
          <Heading as="h2" variant="heading-strong-l">
            Perfis que mais aproveitam essa landing
          </Heading>
          <Column as="ul" className={styles.list} gap="8">
            {audienceHighlights.map((item) => (
              <Text as="li" key={item} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {service.audience}
          </Text>
        </Card>
      </Grid>

      <Column className={styles.sectionPanel} gap="16" padding="24">
        <Column gap="8">
          <Tag size="s" background="neutral-alpha-weak">
            Como converte
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            A página precisa vender seu serviço antes mesmo da conversa.
          </Heading>
        </Column>

        <Grid className={styles.blockGrid} columns="3" s={{ columns: 1 }} gap="16">
          {leverageBlocks.map((item) => (
            <Column key={item.title} className={styles.infoCard} gap="12">
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text onBackground="neutral-weak">{item.description}</Text>
            </Column>
          ))}
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} gap="16" padding="24">
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Formatos de entrega
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Entrada rápida ou estrutura mais completa
          </Heading>
        </Column>

        <Grid className={styles.scopeGrid} columns="3" s={{ columns: 1 }} gap="16">
          {service.scopes.map((scope) => (
            <Card
              className={styles.scopeCard}
              key={`${service.slug}-${scope.title}`}
              direction="column"
              gap="12"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
              fillHeight
            >
              <Heading as="h3" variant="heading-strong-m">
                {scope.title}
              </Heading>
              <Text onBackground="neutral-weak">{scope.summary}</Text>
              <Text className={styles.scopeMeta} variant="body-default-s" onBackground="neutral-weak">
                {scope.investment} | {scope.timeline}
              </Text>
              <Column as="ul" className={styles.list} gap="8">
                {scope.includes.map((item) => (
                  <Text as="li" key={`${scope.title}-${item}`} variant="body-default-s">
                    {item}
                  </Text>
                ))}
              </Column>
            </Card>
          ))}
        </Grid>
      </Column>

      <Grid className={styles.supportGrid} columns="2" s={{ columns: 1 }} gap="16">
        <Card
          className={styles.scopeCard}
          direction="column"
          gap="12"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Tag size="s" background="neutral-alpha-weak">
            O que entra
          </Tag>
          <Heading as="h2" variant="heading-strong-m">
            Base para captar clientes com mais clareza
          </Heading>
          <Column as="ul" className={styles.list} gap="8">
            {service.includes.map((item) => (
              <Text as="li" key={`${service.slug}-${item}`} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>
        </Card>

        <Card
          className={styles.scopeCard}
          direction="column"
          gap="12"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Tag size="s" background="neutral-alpha-weak">
            Como funciona
          </Tag>
          <Heading as="h2" variant="heading-strong-m">
            Processo direto para tirar a página do papel
          </Heading>
          <Column as="ol" className={styles.list} gap="8">
            {service.process.map((item) => (
              <Text as="li" key={`${service.slug}-${item}`} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>
        </Card>
      </Grid>

      <Column className={styles.sectionPanel} gap="16" padding="24">
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Perguntas frequentes
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            O essencial antes de contratar
          </Heading>
        </Column>

        <Column gap="12">
          {service.faq.map((item) => (
            <Card
              className={styles.faqCard}
              key={`${service.slug}-${item.question}`}
              direction="column"
              gap="8"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Text variant="label-default-m">{item.question}</Text>
              <Text onBackground="neutral-weak">{item.answer}</Text>
            </Card>
          ))}
        </Column>
      </Column>

      <Card
        className={styles.ctaPanel}
        direction="column"
        gap="16"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
      >
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Próxima etapa
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Se sua presença digital não ajuda a vender, ela precisa mudar de função.
        </Heading>
        <Text onBackground="neutral-weak">
          Posso transformar sua apresentação atual em uma landing mais clara, mais profissional e mais
          orientada a clientes para social media, designers e freelancers digitais.
        </Text>
        <Row className={styles.heroActions} gap="12" wrap>
          <Button href={service.hero.ctaHref} variant="primary" size="m" arrowIcon>
            {service.hero.ctaLabel}
          </Button>
          <Button href={`mailto:${person.email}`} variant="tertiary" size="m" arrowIcon>
            Enviar contexto por e-mail
          </Button>
        </Row>
      </Card>
    </Column>
  );
}
