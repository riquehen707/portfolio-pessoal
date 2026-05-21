import {
  Button,
  Column,
  Grid,
  Heading,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";

import {
  baseURL,
  person,
  productsPage,
  services,
  servicesPage,
  simulationPage,
  work,
} from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./services.module.scss";

const focusAreas = [
  {
    label: "Presença",
    title: "Sites e páginas com função comercial clara",
    description:
      "Explique o serviço e facilite o próximo passo.",
    items: ["Landing pages", "Sites institucionais", "Estrutura para campanhas"],
  },
  {
    label: "Captação",
    title: "Aquisição com critério antes da verba",
    description:
      "Simule cenário, ajuste oferta e escolha a entrada.",
    items: ["Simulação de cenário", "Diagnóstico de gargalo", "Prioridade comercial"],
  },
  {
    label: "Operação",
    title: "Fluxos, CRM e organização digital do atendimento",
    description:
      "Reduza perda comercial e improviso no atendimento.",
    items: ["WhatsApp e CRM", "Agenda e follow-up", "Dashboards e automação"],
  },
] as const;

const audienceGroups = [
  {
    title: "Prestadores de serviço",
    description:
      "Profissionais que precisam explicar valor e gerar conversas melhores.",
  },
  {
    title: "Clínicas e negócios de atendimento",
    description:
      "Agenda, relacionamento e operação no mesmo fluxo.",
  },
  {
    title: "Lojas locais e e-commerce",
    description:
      "Catálogo, pedidos e canais mais fáceis de operar.",
  },
] as const;

const entryPoints = [
  {
    label: "Primeiro passo",
    title: "Ver os dados antes do escopo",
    description:
      "Leia base, gargalos e viabilidade antes de decidir.",
    href: simulationPage.path,
    cta: "Abrir simulação",
  },
  {
    label: "Serviço sob medida",
    title: "Escolher a frente de trabalho certa",
    description:
      "Página, busca, automação ou estrutura comercial.",
    href: "#servicos-publicados",
    cta: "Ver frentes atuais",
  },
  {
    label: "Produtos",
    title: "Linha de produtos em reorganização",
    description:
      "Entradas leves, recursos gratuitos e consultoria curta.",
    href: productsPage.path,
    cta: "Ver status dos produtos",
  },
] as const;

const serviceProofPoints = [
  { label: "Leitura", value: "qual problema merece prioridade" },
  { label: "Escolha", value: "qual frente resolve primeiro" },
  { label: "Entrega", value: "o que precisa ficar operável" },
] as const;

export async function generateMetadata() {
  const image = buildOgImage(servicesPage.title);

  return {
    title: servicesPage.title,
    description: servicesPage.description,
    alternates: { canonical: `${baseURL}${servicesPage.path}` },
    openGraph: {
      title: servicesPage.title,
      description: servicesPage.description,
      url: `${baseURL}${servicesPage.path}`,
      images: buildDiscoverImageMetadata(image, servicesPage.title),
    },
  };
}

export default function ServicesPage() {
  return (
    <Column className={styles.page} maxWidth="l" paddingTop="8" gap="48">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={servicesPage.title}
        description={servicesPage.description}
        path={servicesPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(servicesPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${servicesPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className={styles.hero}>
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="24">
          <Column className={styles.heroMain} gap="20">
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Serviços
            </Text>
            <Heading as="h1" variant="display-strong-l" wrap="balance">
              Serviços digitais para resolver o gargalo certo primeiro.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.heroLead} variant="heading-default-m" onBackground="neutral-weak">
              A conversa começa pela causa do problema, não pelo nome do serviço.
            </Text>
            <Text className={styles.heroNote} variant="body-default-m" onBackground="neutral-weak">
              Quando o cenário ainda está nebuloso, a simulação vem antes do escopo.
            </Text>
            <Row className={styles.actions} gap="12" wrap>
              <Button href={simulationPage.path} variant="primary" size="m" prefixIcon="chart">
                Ver os dados primeiro
              </Button>
              <Button href={work.path} variant="secondary" size="m" arrowIcon>
                Ver projetos
              </Button>
            </Row>
          </Column>

          <Column className={styles.heroAside} gap="16">
            <div className={styles.heroStep}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                01
              </Text>
              <Text variant="heading-strong-s">Simular o cenário</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Ver se a base comporta investimento agora.
              </Text>
            </div>
            <div className={styles.heroStep}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                02
              </Text>
              <Text variant="heading-strong-s">Definir a frente certa</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Escolher pelo problema, não pelo nome do serviço.
              </Text>
            </div>
            <div className={styles.heroStep}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                03
              </Text>
              <Text variant="heading-strong-s">Fechar um escopo viável</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Começar com algo que caiba na operação.
              </Text>
            </div>
          </Column>
        </Grid>
      </section>

      <section className={styles.proofSection}>
        <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
          Critério
        </Text>
        <div className={styles.proofGrid}>
          {serviceProofPoints.map((point) => (
            <div className={styles.proofItem} key={point.label}>
              <Text className={styles.proofLabel} variant="label-default-s" onBackground="neutral-weak">
                {point.label}
              </Text>
              <Text variant="body-default-m" onBackground="neutral-medium">
                {point.value}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCompact}`} id="onde-entro">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Onde entro
            </Text>
            <Heading as="h2" variant="display-strong-s">
              Onde cada frente entra no problema
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Cada frente tem uma função diferente na jornada.
          </Text>
        </Row>

        <Grid className={styles.focusGrid} columns="3" m={{ columns: 2 }} s={{ columns: 1 }} gap="20">
          {focusAreas.map((area) => (
            <article className={styles.focusItem} key={area.title}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                {area.label}
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {area.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {area.description}
              </Text>
              <div className={styles.itemRow}>
                {area.items.map((item) => (
                  <div className={styles.inlineItem} key={item}>
                    <Text variant="body-default-s">{item}</Text>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </Grid>
      </section>

      <section className={`${styles.section} ${styles.sectionStatement}`} id="para-quem">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Para quem
            </Text>
            <Heading as="h2" variant="display-strong-s">
              Quando vale trazer ajuda externa
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            O encaixe depende do momento, não só do segmento.
          </Text>
        </Row>

        <Grid className={styles.audienceGrid} columns="3" m={{ columns: 2 }} s={{ columns: 1 }} gap="20">
          {audienceGroups.map((group) => (
            <article className={styles.audienceItem} key={group.title}>
              <Heading as="h3" variant="heading-strong-m">
                {group.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {group.description}
              </Text>
            </article>
          ))}
        </Grid>
      </section>

      <section className={`${styles.section} ${styles.sectionProof}`} id="caminhos">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Caminhos
            </Text>
            <Heading as="h2" variant="display-strong-s">
              Caminhos possíveis de entrada
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Três formas de começar sem inflar o projeto.
          </Text>
        </Row>

        <Grid className={styles.entryGrid} columns="3" m={{ columns: 2 }} s={{ columns: 1 }} gap="20">
          {entryPoints.map((item) => (
            <article className={styles.entryItem} key={item.title}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                {item.label}
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item.description}
              </Text>
              <SmartLink href={item.href} suffixIcon="arrowRight">
                {item.cta}
              </SmartLink>
            </article>
          ))}
        </Grid>
      </section>

      <section className={`${styles.section} ${styles.sectionList}`} id="servicos-publicados">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Frentes atuais
            </Text>
            <Heading as="h2" variant="display-strong-s">
              Frentes disponíveis hoje
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Detalhes para comparar escopo, prazo e investimento.
          </Text>
        </Row>

        <div className={styles.serviceList}>
          {services.map((service) => (
            <article className={styles.serviceItem} key={service.slug}>
              <div className={styles.serviceCopy}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  {service.badge}
                </Text>
                <Heading as="h3" variant="heading-strong-m">
                  {service.title}
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {service.summary}
                </Text>
              </div>
              <div className={styles.serviceMeta}>
                <div className={styles.serviceTags}>
                  {service.tags.slice(0, 2).map((tag) => (
                    <span className={styles.serviceTag} key={`${service.slug}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Text className={styles.meta} variant="body-default-s" onBackground="neutral-weak">
                  {service.hero.price} | {service.hero.duration}
                </Text>
                <SmartLink href={`${servicesPage.path}/${service.slug}`} suffixIcon="arrowRight">
                  Ver detalhes
                </SmartLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Column>
  );
}
