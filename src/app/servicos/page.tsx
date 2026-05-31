import { Button, Column, Grid, Heading, Row, Schema, SmartLink, Text } from "@once-ui-system/core";

import {
  baseURL,
  blog,
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
    title: "Páginas que explicam antes de pedir contato",
    description: "Se a página não explica, o atendimento precisa compensar.",
    items: ["Landing pages", "Sites institucionais", "Estrutura para campanhas"],
  },
  {
    label: "Captação",
    title: "Captação sem colocar verba no escuro",
    description: "Mais anúncio não resolve oferta mal posicionada.",
    items: ["Simulação de cenário", "Diagnóstico de gargalo", "Prioridade comercial"],
  },
  {
    label: "Operação",
    title: "Atendimento que não perde lead por desorganização",
    description: "Lead bom também esfria quando resposta, agenda e follow-up falham.",
    items: ["WhatsApp e CRM", "Agenda e follow-up", "Dashboards e automação"],
  },
] as const;

const audienceGroups = [
  {
    title: "Prestadores de serviço",
    description: "Quem depende de indicação e ainda explica o serviço toda vez no privado.",
  },
  {
    title: "Clínicas e negócios de atendimento",
    description: "Quem recebe procura, mas perde lead entre WhatsApp, agenda e retorno.",
  },
  {
    title: "Lojas locais e e-commerce",
    description: "Quem tem produto, mas ainda deixa compra, dúvida e pedido espalhados.",
  },
] as const;

const entryPoints = [
  {
    label: "Primeiro passo",
    title: "Olhar a conta antes do escopo",
    description: "Margem, volume, agenda e atendimento dizem se dá para acelerar.",
    href: simulationPage.path,
    cta: "Abrir simulação",
  },
  {
    label: "Serviço sob medida",
    title: "Escolher a frente que destrava primeiro",
    description: "Página, busca, automação ou rotina comercial entram por motivo.",
    href: "#servicos-publicados",
    cta: "Ver frentes atuais",
  },
  {
    label: "Ferramentas",
    title: "Usar apoio pequeno antes de projeto grande",
    description: "Quando o problema ainda pede método, não consultoria.",
    href: productsPage.path,
    cta: "Ver ferramentas",
  },
] as const;

const decisionSteps = [
  {
    number: "01",
    title: "Simular o cenário",
    description: "Ver se a base comporta investimento agora.",
    href: "#caminhos",
  },
  {
    number: "02",
    title: "Definir a frente certa",
    description: "Escolher pelo problema, não pelo nome do serviço.",
    href: "#onde-entro",
  },
  {
    number: "03",
    title: "Fechar um escopo viável",
    description: "Começar com algo que caiba na operação.",
    href: "#servicos-publicados",
  },
] as const;

const relatedPaths = [
  {
    label: "Ainda estudando",
    title: "Ir para a biblioteca",
    description: "Use guias e artigos antes de transformar dúvida em escopo.",
    href: blog.path,
    cta: "Ler primeiro",
  },
  {
    label: "Quer ver processo",
    title: "Ver laboratório",
    description: "Veja decisões, bastidores e aprendizados antes de contratar.",
    href: work.path,
    cta: "Ver bastidores",
  },
  {
    label: "Quer apoio leve",
    title: "Ver ferramentas disponíveis",
    description: "Materiais e recursos práticos entram quando resolvem um problema específico.",
    href: productsPage.path,
    cta: "Ver recursos",
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
              Consultoria
            </Text>
            <Heading as="h1" variant="display-strong-l" wrap="balance">
              Consultoria para resolver o gargalo certo primeiro.
            </Heading>
            <div className={styles.accentLine} />
            <Text
              className={styles.heroLead}
              variant="heading-default-m"
              onBackground="neutral-weak"
            >
              A conversa começa pela quebra do processo, não pelo nome do serviço.
            </Text>
            <Text className={styles.heroNote} variant="body-default-m" onBackground="neutral-weak">
              Se a base não comporta mais volume, o melhor serviço pode ser esperar.
            </Text>
            <Row className={styles.actions} gap="12" wrap>
              <Button href={simulationPage.path} variant="primary" size="m" prefixIcon="chart">
                Fazer a simulação
              </Button>
            </Row>
          </Column>

          <Column className={styles.heroAside} gap="16">
            {decisionSteps.map((step) => (
              <a className={styles.heroStep} href={step.href} key={step.number}>
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  {step.number}
                </Text>
                <Text variant="heading-strong-s">{step.title}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {step.description}
                </Text>
              </a>
            ))}
          </Column>
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
            O segmento importa menos que o ponto onde o cliente está escapando.
          </Text>
        </Row>

        <Grid
          className={styles.audienceGrid}
          columns="3"
          m={{ columns: 2 }}
          s={{ columns: 1 }}
          gap="20"
        >
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
              Escolha a frente pelo gargalo
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            O nome do serviço vem depois da leitura do problema.
          </Text>
        </Row>

        <Grid
          className={styles.focusGrid}
          columns="3"
          m={{ columns: 2 }}
          s={{ columns: 1 }}
          gap="20"
        >
          {focusAreas.map((area) => (
            <article className={styles.focusItem} key={area.title}>
              <Text
                className={styles.eyebrow}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
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
              Escolha uma forma de começar
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Projeto grande cedo demais costuma esconder o problema real.
          </Text>
        </Row>

        <Grid
          className={styles.entryGrid}
          columns="3"
          m={{ columns: 2 }}
          s={{ columns: 1 }}
          gap="20"
        >
          {entryPoints.map((item) => (
            <article className={styles.entryItem} key={item.title}>
              <Text
                className={styles.eyebrow}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
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
              Frentes de trabalho disponíveis hoje
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Escopo, prazo e investimento para comparar sem pressa.
          </Text>
        </Row>

        <div className={styles.serviceList}>
          {services.map((service) => (
            <article className={styles.serviceItem} key={service.slug}>
              <div className={styles.serviceCopy}>
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
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
                  Entender escopo
                </SmartLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionProof}`} id="proximo-passo">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Próximo passo
            </Text>
            <Heading as="h2" variant="display-strong-s">
              Se ainda não for hora de contratar
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Às vezes a melhor próxima ação é estudar, simular ou organizar um ponto pequeno.
          </Text>
        </Row>

        <Grid
          className={styles.entryGrid}
          columns="3"
          m={{ columns: 2 }}
          s={{ columns: 1 }}
          gap="20"
        >
          {relatedPaths.map((item) => (
            <article className={styles.entryItem} key={item.title}>
              <Text
                className={styles.eyebrow}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
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
    </Column>
  );
}
