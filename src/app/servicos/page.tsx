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
      "Projetos para explicar melhor o serviço, reduzir ruído e facilitar o próximo passo de quem chega.",
    items: ["Landing pages", "Sites institucionais", "Estrutura para campanhas"],
  },
  {
    label: "Captação",
    title: "Leitura de aquisição antes de escopo grande",
    description:
      "Simulação inicial, ajuste de oferta e desenho de entrada para investir com mais critério.",
    items: ["Simulação de cenário", "Diagnóstico de gargalo", "Prioridade comercial"],
  },
  {
    label: "Operação",
    title: "Fluxos, CRM e organização digital do atendimento",
    description:
      "Integrações e automações para reduzir perda comercial e deixar a rotina menos improvisada.",
    items: ["WhatsApp e CRM", "Agenda e follow-up", "Dashboards e automação"],
  },
] as const;

const audienceGroups = [
  {
    title: "Prestadores de serviço",
    description:
      "Psicólogas, advogados, consultores e profissionais que precisam conquistar clientes online com mais consistência.",
  },
  {
    title: "Clínicas e negócios de atendimento",
    description:
      "Saúde, beleza e estética quando agenda, relacionamento e operação precisam conversar melhor.",
  },
  {
    title: "Lojas locais e e-commerce",
    description:
      "Operações que precisam vender melhor no local, organizar catálogo ou estruturar melhor pedidos e envios.",
  },
] as const;

const entryPoints = [
  {
    label: "Primeiro passo",
    title: "Ver os dados antes do escopo",
    description:
      "A simulação lê a base atual, os ajustes internos e a viabilidade do investimento antes de fechar escopo.",
    href: simulationPage.path,
    cta: "Abrir simulação",
  },
  {
    label: "Serviço sob medida",
    title: "Escolher a frente de trabalho certa",
    description:
      "Depois da leitura inicial, o trabalho pode entrar por página, SEO, automação ou estrutura comercial.",
    href: "#servicos-publicados",
    cta: "Ver frentes atuais",
  },
  {
    label: "Produtos",
    title: "Linha de produtos em reorganizacao",
    description:
      "Os produtos voltam depois com formato mais claro, incluindo entradas leves, recursos gratuitos e consultoria curta.",
    href: productsPage.path,
    cta: "Ver status dos produtos",
  },
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
              Presença, captação e operação digital para negócios que precisam vender melhor.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.heroLead} variant="heading-default-m" onBackground="neutral-weak">
              Eu não começo por catálogo. Primeiro leio momento, orçamento e gargalo principal para
              decidir se vale investir, por onde entrar e qual formato faz sentido.
            </Text>
            <Text className={styles.heroNote} variant="body-default-m" onBackground="neutral-weak">
              Se a leitura ainda não está clara, a simulação entra antes do escopo.
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
                Entender se a base comporta investimento agora ou se ainda pede ajuste interno.
              </Text>
            </div>
            <div className={styles.heroStep}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                02
              </Text>
              <Text variant="heading-strong-s">Definir a frente certa</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Escolher o tipo de trabalho pelo problema real, não pelo nome do serviço.
              </Text>
            </div>
            <div className={styles.heroStep}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                03
              </Text>
              <Text variant="heading-strong-s">Fechar um escopo viável</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Entrar com algo que caiba na operação e sustente o próximo passo do negócio.
              </Text>
            </div>
          </Column>
        </Grid>
      </section>

      <section className={styles.section} id="onde-entro">
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
              Três frentes que normalmente se conectam
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            A maioria dos projetos entra por presença, captação ou operação. Em muitos casos, o
            problema real atravessa as três.
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

      <section className={styles.section} id="para-quem">
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
              Negócios em que esse trabalho costuma fazer mais sentido
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Principalmente quando já existe valor real no serviço, mas falta mais clareza para
            vender, atender e sustentar crescimento.
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

      <section className={styles.section} id="caminhos">
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
              Como normalmente o trabalho começa
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            A simulação vira porta de entrada quando ainda não vale fechar um formato no escuro.
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

      <section className={styles.section} id="servicos-publicados">
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
              Serviços publicados hoje
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Os detalhes continuam acessíveis por página própria. Aqui fica a leitura curta do que
            está aberto agora.
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
