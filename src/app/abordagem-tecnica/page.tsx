import { Button, Column, Grid, Heading, Meta, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import { about, baseURL, person, social, technicalApproach, work } from "@/resources";

import styles from "./page.module.scss";

const pillars = [
  {
    label: "Front-end",
    title: "Next.js e Vue quando a interface precisa ser clara, leve e fácil de manter.",
    description:
      "Uso a stack como ferramenta de organização. Priorizo arquitetura simples, componentes reaproveitáveis e telas que não cansam a leitura.",
    items: ["Next.js para sites e conteúdo", "Vue para painéis e fluxos internos", "SCSS modular e estrutura escalável"],
  },
  {
    label: "SEO técnico",
    title: "Estrutura para ser encontrado, entendido e indexado do jeito certo.",
    description:
      "Cuido de arquitetura, metadados, performance e semântica para que lojas, blogs e páginas de serviço tenham base técnica consistente e cresçam com mais fôlego.",
    items: ["Metadata e schema", "Arquitetura para blog e e-commerce", "Leitura clara para usuário e buscador"],
  },
  {
    label: "Performance",
    title: "Velocidade pensada desde o layout, não só no final do projeto.",
    description:
      "Evito efeitos pesados, hidrato só o necessário e organizo mídia, espaçamento e componentes para manter a navegação fluida.",
    items: ["Menos JS desnecessário", "Layout responsivo com baixo custo visual", "Microinterações leves e previsíveis"],
  },
  {
    label: "Automação",
    title: "Integrações e rotinas simples para o atendimento não depender de improviso.",
    description:
      "A técnica também entra no pós-clique: formulários, disparos, analytics e pequenas automações para acompanhar a conversa comercial sem atrito.",
    items: ["WhatsApp, formulários e captura", "Analytics e leitura de comportamento", "Fluxos simples de organização"],
  },
];

const process = [
  {
    title: "Diagnóstico",
    description: "Entendo a oferta, o público e o que está travando o contato ou a conversão.",
  },
  {
    title: "Estrutura",
    description: "Defino hierarquia, CTA, páginas, blocos e pontos de SEO antes de sair construindo.",
  },
  {
    title: "Construção",
    description: "Monto componentes, estilos modulares e integrações sem inflar a interface.",
  },
  {
    title: "Ajuste fino",
    description: "Reviso performance, leitura, indexação e os caminhos reais que levam ao contato.",
  },
];

const systemBlocks = [
  {
    title: "Componentes reutilizáveis",
    description:
      "Prefiro uma base consistente de blocos, variações e seções reaproveitáveis para o site crescer sem virar remendo.",
  },
  {
    title: "SCSS modular",
    description:
      "Organizo estilos por contexto para manter layout, responsividade e manutenção sob controle.",
  },
  {
    title: "Técnica a serviço da clareza",
    description:
      "O usuário precisa entender rápido o que você faz. A stack aparece como suporte, não como barulho.",
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
              Abordagem técnica
            </Tag>
            <Heading variant="display-strong-l" wrap="balance">
              A técnica entra para sustentar clareza, confiança e uma navegação que faz sentido.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.lead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Não uso stack como vitrine. Organizo front-end, SEO técnico, performance e automação para o site
              ser simples de usar, rápido de navegar e fácil de evoluir com o tempo.
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
                <Text variant="body-default-m">Conteúdo encontrável</Text>
                <Text className={styles.signalValue} variant="label-default-s" onBackground="neutral-weak">
                  SEO técnico
                </Text>
              </Row>
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Renderização leve</Text>
                <Text className={styles.signalValue} variant="label-default-s" onBackground="neutral-weak">
                  Performance
                </Text>
              </Row>
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Pós-clique organizado</Text>
                <Text className={styles.signalValue} variant="label-default-s" onBackground="neutral-weak">
                  Automação
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
              Onde a profundidade técnica aparece
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Cada camada tem um papel claro: melhorar leitura, encontrabilidade, velocidade e manutenção.
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
              Processo técnico sem excesso de camada
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              O projeto fica mais previsível quando arquitetura, conteúdo e conversão entram na ordem certa.
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
              Componentes, SCSS modular e organização visual
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              A técnica também aparece na forma como o layout cresce: seções reaproveitáveis, grids limpos e pouca fricção.
            </Text>
          </Column>
        </Row>

        <div className={styles.systemGrid}>
          <div className={`${styles.systemCard} ${styles.systemCardLarge}`}>
            <Text className={styles.codeLabel} variant="label-default-s" onBackground="neutral-weak">
              Base reutilizável
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Prefiro uma biblioteca pequena de blocos bem resolvidos a uma interface cheia de exceção.
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Isso ajuda o site a continuar rápido, consistente e mais fácil de ajustar quando a oferta ou o conteúdo mudam.
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
