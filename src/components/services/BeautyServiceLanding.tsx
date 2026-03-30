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

import styles from "./BeautyServiceLanding.module.scss";

type BeautyServiceLandingProps = {
  service: ServiceLanding;
  metaTitle: string;
  metaDescription: string;
};

const painPoints = [
  {
    label: "Instagram sem conversão",
    title: "Já existe atenção, mas falta uma página que leve ao agendamento.",
    description:
      "A clínica ou a esteticista posta, recebe visita e até gera interesse, mas a pessoa esfria porque não encontra uma rota clara para agir.",
  },
  {
    label: "Agenda instável",
    title: "Buracos na agenda viram faturamento perdido.",
    description:
      "Quando a captação depende só de story, direct ou indicação, a agenda oscila mais do que deveria.",
  },
  {
    label: "Valor percebido",
    title: "Presença digital fraca reduz confiança e trava a decisão.",
    description:
      "Em estética e harmonização facial, profissionalismo visual e clareza comercial impactam diretamente no fechamento.",
  },
];

const revenueSignals = [
  {
    title: "Agenda cheia",
    description: "Mais pessoas saindo da visita para o WhatsApp ou formulário com intenção de marcar.",
  },
  {
    title: "Clientes recorrentes",
    description: "Melhor comunicação para retorno, manutenção de procedimento e novas etapas do atendimento.",
  },
  {
    title: "Mais faturamento",
    description: "Mais previsibilidade comercial a partir de uma página feita para converter e não só para existir.",
  },
];

const conversionBlocks = [
  {
    title: "Oferta clara",
    description:
      "A página precisa mostrar rápido o que a clínica faz, para quem atende e por que vale a pena agendar.",
  },
  {
    title: "Confiança",
    description:
      "Procedimentos, diferenciais, perguntas frequentes e sinais de segurança entram para reduzir objeção e aumentar confiança.",
  },
  {
    title: "Ação direta",
    description:
      "O clique precisa encontrar um caminho simples: WhatsApp, formulário ou agendamento, sem distração demais.",
  },
];

export default function BeautyServiceLanding({
  service,
  metaTitle,
  metaDescription,
}: BeautyServiceLandingProps) {
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
              Landing page para clínica de estética, esteticista e harmonização facial com foco em agenda e faturamento.
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

          <Column className={styles.heroAside} gap="12">
            <Column className={styles.metricCard} gap="8">
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Foco comercial
              </Text>
              <Text variant="heading-strong-m">Agenda cheia com rota clara para agendamento.</Text>
            </Column>

            <Column className={styles.metricCard} gap="8">
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Canal atual
              </Text>
              <Text variant="body-default-m">
                Ideal para quem já usa Instagram, mas perde conversão entre visita, confiança e contato.
              </Text>
            </Column>

            <Column className={styles.metricCard} gap="8">
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Meta
              </Text>
              <Text variant="body-default-m">
                Mais clientes recorrentes, mais previsibilidade e aumento direto no faturamento da clínica.
              </Text>
            </Column>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} gap="16" padding="24">
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Onde a agenda trava
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            O problema não costuma ser falta de atenção. É falta de conversão.
          </Heading>
        </Column>

        <Grid className={styles.painGrid} columns="3" s={{ columns: 1 }} gap="16">
          {painPoints.map((item) => (
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

      <Column className={styles.sectionPanel} gap="16" padding="24">
        <Column gap="8">
          <Tag size="s" background="neutral-alpha-weak">
            Resultado esperado
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            O que essa landing precisa mover na prática
          </Heading>
        </Column>

        <Grid className={styles.signalGrid} columns="3" s={{ columns: 1 }} gap="16">
          {revenueSignals.map((item) => (
            <Card
              className={styles.signalCard}
              key={item.title}
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
                {item.title}
              </Heading>
              <Text onBackground="neutral-weak">{item.description}</Text>
            </Card>
          ))}
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} gap="16" padding="24">
        <Column gap="8">
          <Tag size="s" background="neutral-alpha-weak">
            Como converte
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Estrutura pensada para clínica de estética e procedimentos faciais
          </Heading>
        </Column>

        <Grid className={styles.blockGrid} columns="3" s={{ columns: 1 }} gap="16">
          {conversionBlocks.map((item) => (
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

      <Grid className={styles.splitGrid} columns="2" s={{ columns: 1 }} gap="16">
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
            Base para gerar mais clientes e mais agendamento
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
            Processo direto ao ponto
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
          Se a agenda impacta o faturamento, a página precisa ajudar a vender melhor.
        </Heading>
        <Text onBackground="neutral-weak">
          Posso transformar essa necessidade em uma landing mais clara, mais profissional e mais focada
          em agendamento para clínica de estética, esteticista ou harmonização facial.
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
