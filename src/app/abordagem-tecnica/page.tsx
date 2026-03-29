import { Button, Column, Grid, Heading, Meta, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import { about, baseURL, person, social, technicalApproach, work } from "@/resources";

import styles from "./page.module.scss";

const pillars = [
  {
    label: "Front-end",
    title: "Next.js e Vue quando a interface precisa ser clara e facil de manter.",
    description:
      "Uso a stack como ferramenta de organizacao. Priorizo arquitetura simples, componentes reaproveitaveis e telas que nao cansam a leitura.",
    items: ["Next.js para sites e conteudo", "Vue para painis e fluxos internos", "SCSS modular e estrutura escalavel"],
  },
  {
    label: "SEO tecnico",
    title: "Estrutura para ser encontrado, entendido e indexado do jeito certo.",
    description:
      "Cuido de arquitetura, metadados, performance e semantica para que lojas, blogs e paginas de servico tenham base tecnica consistente.",
    items: ["Metadata e schema", "Arquitetura para blog e e-commerce", "Leitura clara para usuario e buscador"],
  },
  {
    label: "Performance",
    title: "Velocidade pensada desde o layout, nao apenas no final.",
    description:
      "Evito efeitos pesados, hidrato so o necessario e organizo midia, espacamento e componentes para manter a navegacao fluida.",
    items: ["Menos JS desnecessario", "Layout responsivo com baixo custo visual", "Microinteracoes leves e previsiveis"],
  },
  {
    label: "Automacao",
    title: "Integracoes e rotinas simples para o atendimento nao depender de improviso.",
    description:
      "A tecnica tambem entra no pos-clique: formularios, disparos, analytics e pequenas automacoes para acompanhar a conversa comercial.",
    items: ["WhatsApp, formularios e captura", "Analytics e leitura de comportamento", "Fluxos simples de organizacao"],
  },
];

const process = [
  {
    title: "Diagnostico",
    description: "Entendo a oferta, o publico e o que esta travando o contato ou a conversao.",
  },
  {
    title: "Estrutura",
    description: "Defino hierarquia, CTA, paginas, blocos e pontos de SEO antes de sair construindo.",
  },
  {
    title: "Construcao",
    description: "Monto componentes, estilos modulares e integracoes sem inflar a interface.",
  },
  {
    title: "Ajuste fino",
    description: "Reviso performance, leitura, indexacao e os caminhos reais que levam ao contato.",
  },
];

const systemBlocks = [
  {
    title: "Componentes reutilizaveis",
    description:
      "Prefiro uma base consistente de blocos, variacoes e secoes reaproveitaveis para o site crescer sem virar remendo.",
  },
  {
    title: "SCSS modular",
    description:
      "Organizo estilos por contexto para manter layout, responsividade e manutencao sob controle.",
  },
  {
    title: "Tecnica a servico da clareza",
    description:
      "O usuario precisa entender rapido o que voce faz. A stack aparece como suporte, nao como barulho.",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: technicalApproach.title,
    description: technicalApproach.description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(technicalApproach.title)}`,
    path: technicalApproach.path,
  });
}

export default function TechnicalApproachPage() {
  const whatsappLink = social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;

  return (
    <Column className={styles.page} maxWidth="m" gap="24" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={technicalApproach.title}
        description={technicalApproach.description}
        path={technicalApproach.path}
        image={`/api/og/generate?title=${encodeURIComponent(technicalApproach.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} fillWidth gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Abordagem tecnica
            </Tag>
            <Heading variant="display-strong-l" wrap="balance">
              A tecnica entra para sustentar clareza, performance e conversao.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.lead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Nao uso stack como vitrine. Organizo front-end, SEO tecnico, performance e automacao para o site
              ser simples de usar, rapido de navegar e facil de evoluir.
            </Text>
            <Row className={styles.actions} gap="12" wrap>
              <Button href={whatsappLink} prefixIcon="whatsapp" size="m" variant="primary">
                Conversar sobre um projeto
              </Button>
              <Button href={work.path} size="m" variant="secondary" arrowIcon>
                Ver projetos
              </Button>
            </Row>
            <SmartLink href={about.path} suffixIcon="arrowRight">
              Voltar para Sobre
            </SmartLink>
          </Column>

          <Column className={styles.heroAside} gap="12">
            <Text className={styles.codeLabel} variant="label-default-s" onBackground="neutral-weak">
              Camadas que costumo combinar
            </Text>
            <Column className={styles.signalList} gap="12">
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Front-end modular</Text>
                <Text className={styles.signalValue} variant="label-default-s" onBackground="neutral-weak">
                  Next.js / Vue
                </Text>
              </Row>
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Conteudo encontravel</Text>
                <Text className={styles.signalValue} variant="label-default-s" onBackground="neutral-weak">
                  SEO tecnico
                </Text>
              </Row>
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Renderizacao leve</Text>
                <Text className={styles.signalValue} variant="label-default-s" onBackground="neutral-weak">
                  Performance
                </Text>
              </Row>
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Pos-clique organizado</Text>
                <Text className={styles.signalValue} variant="label-default-s" onBackground="neutral-weak">
                  Automacao
                </Text>
              </Row>
            </Column>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Blocos principais
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Onde a profundidade tecnica aparece
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Cada camada tem um papel claro: melhorar leitura, encontrabilidade, velocidade e manutencao.
            </Text>
          </Column>
        </Row>

        <Grid className={styles.pillarsGrid} columns="2" s={{ columns: 1 }} gap="16">
          {pillars.map((pillar) => (
            <Column key={pillar.title} className={styles.pillarCard} gap="12">
              <Text className={styles.codeLabel} variant="label-default-s" onBackground="neutral-weak">
                {pillar.label}
              </Text>
              <Heading as="h3" variant="heading-strong-l">
                {pillar.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {pillar.description}
              </Text>
              <Column as="ul" className={styles.stackList} gap="8">
                {pillar.items.map((item) => (
                  <Text as="li" key={item} variant="body-default-s" onBackground="neutral-weak">
                    {item}
                  </Text>
                ))}
              </Column>
            </Column>
          ))}
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Como eu estruturo
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Processo tecnico sem excesso de camada
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              O projeto fica mais previsivel quando arquitetura, conteudo e conversao entram na ordem certa.
            </Text>
          </Column>
        </Row>

        <Grid className={styles.processGrid} columns="2" s={{ columns: 1 }} gap="16">
          {process.map((step, index) => (
            <Column key={step.title} className={styles.processCard} gap="12">
              <Text className={styles.processIndex} variant="label-strong-s">
                0{index + 1}
              </Text>
              <Text variant="heading-strong-m">{step.title}</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {step.description}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Sistema visual
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Componentes, SCSS modular e organizacao visual
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              A tecnica tambem aparece na forma como o layout cresce: secoes reaproveitaveis, grids limpos e pouca friccao.
            </Text>
          </Column>
        </Row>

        <div className={styles.systemGrid}>
          <div className={`${styles.systemCard} ${styles.systemCardLarge}`}>
            <Text className={styles.codeLabel} variant="label-default-s" onBackground="neutral-weak">
              Base reutilizavel
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Prefiro uma biblioteca pequena de blocos bem resolvidos a uma interface cheia de excecao.
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Isso ajuda o site a continuar rapido, consistente e mais facil de ajustar quando a oferta ou o conteudo mudam.
            </Text>
          </div>

          <div className={styles.systemSubgrid}>
            {systemBlocks.map((block) => (
              <div key={block.title} className={styles.systemCard}>
                <Text className={styles.codeLabel} variant="label-default-s" onBackground="neutral-weak">
                  Camada
                </Text>
                <Text variant="heading-strong-m">{block.title}</Text>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {block.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Column>
    </Column>
  );
}
