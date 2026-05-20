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

import styles from "./services.module.scss";

const focusAreas = [
  {
    label: "Presenca",
    title: "Sites e paginas com funcao comercial clara",
    description:
      "Projetos para explicar melhor o servico, reduzir ruido e facilitar o proximo passo de quem chega.",
    items: ["Landing pages", "Sites institucionais", "Estrutura para campanhas"],
  },
  {
    label: "Captacao",
    title: "Leitura de aquisicao antes de escopo grande",
    description:
      "Simulacao inicial, ajuste de oferta e desenho de entrada para investir com mais criterio.",
    items: ["Simulacao de cenario", "Diagnostico de gargalo", "Prioridade comercial"],
  },
  {
    label: "Operacao",
    title: "Fluxos, CRM e organizacao digital do atendimento",
    description:
      "Integracoes e automacoes para reduzir perda comercial e deixar a rotina menos improvisada.",
    items: ["WhatsApp e CRM", "Agenda e follow-up", "Dashboards e automacao"],
  },
] as const;

const audienceGroups = [
  {
    title: "Prestadores de servico",
    description:
      "Psicologas, advogados, consultores e profissionais que precisam conquistar clientes online com mais consistencia.",
  },
  {
    title: "Clinicas e negocios de atendimento",
    description:
      "Saude, beleza e estetica quando agenda, relacionamento e operacao precisam conversar melhor.",
  },
  {
    title: "Lojas locais e e-commerce",
    description:
      "Operacoes que precisam vender melhor no local, organizar catalogo ou estruturar melhor pedidos e envios.",
  },
] as const;

const entryPoints = [
  {
    label: "Primeiro passo",
    title: "Ver os dados antes do escopo",
    description:
      "A simulacao le a base atual, os ajustes internos e a viabilidade do investimento antes de fechar escopo.",
    href: simulationPage.path,
    cta: "Abrir simulacao",
  },
  {
    label: "Servico sob medida",
    title: "Escolher a frente de trabalho certa",
    description:
      "Depois da leitura inicial, o trabalho pode entrar por pagina, SEO, automacao ou estrutura comercial.",
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
  return {
    title: servicesPage.title,
    description: servicesPage.description,
    alternates: { canonical: `${baseURL}${servicesPage.path}` },
    openGraph: {
      title: servicesPage.title,
      description: servicesPage.description,
      url: `${baseURL}${servicesPage.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(servicesPage.title)}` }],
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
              Servicos
            </Text>
            <Heading as="h1" variant="display-strong-l" wrap="balance">
              Presenca, captacao e operacao digital para negocios que precisam vender melhor.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.heroLead} variant="heading-default-m" onBackground="neutral-weak">
              Eu nao comeco por catalogo. Primeiro leio momento, orcamento e gargalo principal para
              decidir se vale investir, por onde entrar e qual formato faz sentido.
            </Text>
            <Text className={styles.heroNote} variant="body-default-m" onBackground="neutral-weak">
              Se a leitura ainda nao esta clara, a simulacao entra antes do escopo.
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
              <Text variant="heading-strong-s">Simular o cenario</Text>
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
                Escolher o tipo de trabalho pelo problema real, nao pelo nome do servico.
              </Text>
            </div>
            <div className={styles.heroStep}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                03
              </Text>
              <Text variant="heading-strong-s">Fechar um escopo viavel</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Entrar com algo que caiba na operacao e sustente o proximo passo do negocio.
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
              Tres frentes que normalmente se conectam
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            A maioria dos projetos entra por presenca, captacao ou operacao. Em muitos casos, o
            problema real atravessa as tres.
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
              Negocios em que esse trabalho costuma fazer mais sentido
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Principalmente quando ja existe valor real no servico, mas falta mais clareza para
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
              Como normalmente o trabalho comeca
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            A simulacao vira porta de entrada quando ainda nao vale fechar um formato no escuro.
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
              Servicos publicados hoje
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Os detalhes continuam acessiveis por pagina propria. Aqui fica a leitura curta do que
            esta aberto agora.
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
