import {
  Avatar,
  Button,
  Column,
  Grid,
  Heading,
  Icon,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";

import { AboutScrollButton, AboutSectionNav } from "@/components/about/AboutSectionNav";
import styles from "@/components/about/about.module.scss";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { type IconName } from "@/resources/icons";
import {
  about,
  baseURL,
  contentStrategy,
  person,
  simulationPage,
  social,
  work,
} from "@/resources";

const aboutStrategy = contentStrategy.pages.about;

const sectionNavItems = [
  { id: "sobre", label: "Sobre" },
  { id: "historia", label: "Historia" },
  { id: "foco", label: "Foco" },
  { id: "metodo", label: "Metodo" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;

const profileFacts = [
  {
    label: "Foco",
    value: "Negocios locais, prestadores de servico e operacoes de atendimento.",
  },
  {
    label: "Atuacao",
    value: "Marketing, paginas e sistemas digitais.",
  },
  {
    label: "Entrega",
    value: "Aquisicao, clareza comercial e organizacao de leads.",
  },
] as const;

const storyBlocks = [
  "Comecei cedo construindo meus proprios projetos e aprendendo na pratica como venda, comunicacao e operacao se conectam.",
  "Com o tempo, percebi que muitos negocios nao precisam apenas de mais divulgacao. Precisam entender onde a estrutura falha: oferta, pagina, atendimento, margem ou acompanhamento.",
  "Hoje uso essa visao para criar solucoes simples, mensuraveis e adequadas ao momento real de cada negocio.",
] as const;

const fitCards = [
  {
    icon: "person" as IconName,
    title: "Prestadores de servico",
    description:
      "Psicologos, advogados, consultores e servicos especializados.",
  },
  {
    icon: "calendar" as IconName,
    title: "Clinicas e operacoes de atendimento",
    description:
      "Saude, estetica, saloes e negocios com agenda, recorrencia e atendimento.",
  },
  {
    icon: "package" as IconName,
    title: "Negocios locais e e-commerce",
    description:
      "Lojas e marcas que precisam organizar presenca digital, pedidos e captacao.",
  },
] as const;

const workStages = [
  {
    number: "01",
    title: "Atrair",
    description:
      "Presenca digital, oferta, canais e paginas de entrada para gerar demanda qualificada.",
    items: ["Sites e landing pages", "Trafego pago", "Oferta clara"],
  },
  {
    number: "02",
    title: "Converter",
    description:
      "Paginas, WhatsApp, CRM simples e fluxo de atendimento para transformar interesse em oportunidade.",
    items: ["CRM simples", "WhatsApp e follow-up", "Agenda e atendimento"],
  },
  {
    number: "03",
    title: "Operar",
    description:
      "Sistemas, automacoes, dados e acompanhamento para crescer com mais controle.",
    items: ["Automacoes", "Sistemas web", "Dashboards e dados"],
  },
] as const;

const relatedProjects = [
  {
    title: "Simulador de investimento",
    type: "Diagnostico e calculo",
    summary: "Leitura inicial para decidir antes de aumentar verba.",
    href: simulationPage.path,
    image:
      "/api/og/generate?title=Simulador%20de%20investimento&subtitle=diagnostico%20e%20calculo",
  },
  {
    title: "Pagina para clinica de estetica",
    type: "Pagina e captacao",
    summary: "Estrutura pensada para agenda, recorrencia e contato simples.",
    href: "/servicos/landing-page-para-estetica",
    image:
      "/api/og/generate?title=Pagina%20para%20clinica%20de%20estetica&subtitle=agenda%20e%20captacao",
  },
  {
    title: "Integracoes para atendimento",
    type: "Sistema e operacao",
    summary: "Fluxos, automacoes e organizacao para leads e acompanhamento.",
    href: "/servicos/integracoes-automacoes",
    image:
      "/api/og/generate?title=Integracoes%20para%20atendimento&subtitle=sistema%20e%20operacao",
  },
] as const;

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: about.title,
      description: about.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
      path: about.path,
    }),
    keywords: aboutStrategy.seo.keywords,
  };
}

export default function About() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;

  return (
    <Column className={styles.page} maxWidth="l" gap="48" paddingTop="8">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Sobre", url: `${baseURL}${about.path}` },
        ]}
      />

      <section className={styles.heroSection} id="sobre">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="24">
          <Column className={styles.heroMain} gap="20">
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Sobre
            </Text>
            <Heading as="h1" variant="display-strong-l" wrap="balance">
              Estruturo presenca digital para negocios venderem com mais clareza e controle.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.heroLead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              O problema nem sempre e falta de marketing. Muitas vezes esta entre oferta, pagina,
              atendimento e acompanhamento.
            </Text>
            <AboutScrollButton targetId="metodo">Veja como trabalho</AboutScrollButton>
          </Column>

          <Column className={styles.heroAside} gap="16">
            <div className={styles.portraitCard}>
              <Media
                src={person.avatar}
                alt={`Retrato de ${person.name}`}
                aspectRatio="4 / 5"
                radius="l"
                border="transparent"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
            </div>

            <div className={styles.profileCard}>
              <Row className={styles.profileTop} gap="12" vertical="center">
                <Avatar src={person.avatar} size="m" />
                <Column className={styles.profileIdentity} gap="4">
                  <Text variant="label-strong-m">{person.name}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Bahia, Brasil
                  </Text>
                </Column>
              </Row>

              <div className={styles.profileFacts}>
                {profileFacts.map((item) => (
                  <div className={styles.profileFact} key={item.label}>
                    <Text className={styles.factLabel} variant="label-default-s" onBackground="neutral-weak">
                      {item.label}
                    </Text>
                    <Text className={styles.factValue} variant="body-default-m" onBackground="neutral-weak">
                      {item.value}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Column>
        </Grid>
      </section>

      <AboutSectionNav items={[...sectionNavItems]} />

      <section className={styles.section} id="historia">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Historia
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Como cheguei ate aqui
          </Heading>
        </div>

        <Grid className={styles.storyGrid} columns="3" m={{ columns: 1 }} gap="20">
          {storyBlocks.map((item) => (
            <div className={styles.storyBlock} key={item}>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item}
              </Text>
            </div>
          ))}
        </Grid>
      </section>

      <section className={styles.section} id="foco">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Foco
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Para quem faco sentido
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Faco mais sentido quando o objetivo e conquistar clientes, organizar atendimento e
            tornar o digital mais util para vender.
          </Text>
        </div>

        <Grid className={styles.fitGrid} columns="3" m={{ columns: 1 }} gap="20">
          {fitCards.map((card) => (
            <article className={styles.fitCard} key={card.title}>
              <div className={styles.fitIcon}>
                <Icon name={card.icon} size="m" />
              </div>
              <Heading as="h3" variant="heading-strong-m">
                {card.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {card.description}
              </Text>
            </article>
          ))}
        </Grid>
      </section>

      <section className={styles.section} id="metodo">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Metodo
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Como trabalho
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Normalmente ajudo em tres frentes que se conectam.
          </Text>
        </div>

        <Grid className={styles.methodGrid} columns="3" m={{ columns: 1 }} gap="20">
          {workStages.map((stage) => (
            <article className={styles.methodCard} key={stage.title}>
              <div className={styles.methodTop}>
                <span className={styles.methodNumber}>{stage.number}</span>
                <Heading as="h3" variant="heading-strong-m">
                  {stage.title}
                </Heading>
              </div>

              <Text variant="body-default-m" onBackground="neutral-weak">
                {stage.description}
              </Text>

              <div className={styles.methodItems}>
                {stage.items.map((item) => (
                  <span className={styles.methodItem} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Grid>
      </section>

      <section className={styles.section} id="projetos">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Projetos
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Projetos relacionados
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Alguns trabalhos onde essa logica aparece em paginas, sistemas e aquisicao.
          </Text>
        </div>

        <Grid className={styles.projectsGrid} columns="3" m={{ columns: 1 }} gap="20">
          {relatedProjects.map((project) => (
            <article className={styles.projectCard} key={project.title}>
              <div className={styles.projectPreview}>
                <Media
                  src={project.image}
                  alt={`Preview de ${project.title}`}
                  aspectRatio="16 / 9"
                  radius="l"
                  border="transparent"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </div>
              <Text className={styles.projectType} variant="label-default-s" onBackground="neutral-weak">
                {project.type}
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {project.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {project.summary}
              </Text>
              <SmartLink href={project.href} suffixIcon="arrowRight">
                Ver projeto
              </SmartLink>
            </article>
          ))}
        </Grid>

        <Button href={work.path} variant="secondary" size="m" arrowIcon>
          Ver todos os projetos
        </Button>
      </section>

      <section className={styles.nextStep} id="contato">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionKicker} variant="label-default-s" onBackground="brand-strong">
            Proximo passo
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Vamos avaliar seu cenario antes de investir mais?
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Sem compromisso. A ideia e entender se a conta faz sentido antes de aumentar verba,
            redesenhar pagina ou contratar novas acoes.
          </Text>
        </div>

        <Row className={styles.ctaRow} gap="12" wrap>
          <Button href={simulationPage.path} variant="primary" size="m" arrowIcon>
            Ver simulacao
          </Button>
          <Button href={whatsappLink} variant="secondary" size="m" prefixIcon="whatsapp">
            Conversar no WhatsApp
          </Button>
        </Row>
      </section>
    </Column>
  );
}
