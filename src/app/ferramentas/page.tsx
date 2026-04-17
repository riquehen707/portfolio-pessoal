import {
  Button,
  Card,
  Column,
  Grid,
  Heading,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import { baseURL, freeTools, person, productsPage, toolsPage } from "@/resources";

import sectionStyles from "../section.module.scss";
import styles from "./ferramentas.module.scss";

export async function generateMetadata() {
  return {
    title: toolsPage.title,
    description: toolsPage.description,
    alternates: { canonical: `${baseURL}${toolsPage.path}` },
    openGraph: {
      title: toolsPage.title,
      description: toolsPage.description,
      url: `${baseURL}${toolsPage.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(toolsPage.title)}` }],
    },
  };
}

export default function ToolsPage() {
  const signals = [
    {
      label: "Ferramentas ativas",
      value: `${freeTools.length}`,
      description:
        "Cada item entra com página própria para facilitar acesso, compartilhamento e expansão futura.",
    },
    {
      label: "Acesso",
      value: "Gratuito",
      description:
        "A ideia aqui é abrir caminho com utilidade real antes de qualquer proposta mais fechada.",
    },
    {
      label: "Foco",
      value: "Escopo e decisão",
      description:
        "Simuladores e utilidades para sair do improviso e entender melhor o próximo passo.",
    },
  ];

  const principles = [
    {
      title: "Páginas próprias",
      description: "Cada ferramenta ganha contexto, explicação e uma rota fácil de compartilhar.",
    },
    {
      title: "Uso rápido",
      description: "Nada aqui depende de cadastro obrigatório para ser útil já no primeiro acesso.",
    },
    {
      title: "Crescimento organizado",
      description:
        "Essa área foi pensada para receber novas ferramentas sem misturar tudo em catálogo genérico.",
    },
  ];

  const primaryTool = freeTools[0];

  return (
    <Column className={sectionStyles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={toolsPage.title}
        description={toolsPage.description}
        path={toolsPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(toolsPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${toolsPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Ferramentas gratuitas
            </Tag>
            <Heading as="h1" variant="heading-strong-xl">
              {toolsPage.title}
            </Heading>
            <div className={sectionStyles.accentLine} />
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              {toolsPage.intro.headline}
            </Text>
            <Text onBackground="neutral-weak">{toolsPage.intro.lead}</Text>
            <Row className={styles.ctaBar} gap="12" wrap>
              <Button
                href={primaryTool?.path ?? productsPage.path}
                variant="primary"
                size="m"
                arrowIcon
              >
                {primaryTool?.ctaLabel ?? "Ver ferramentas"}
              </Button>
              <Button href={productsPage.path} variant="secondary" size="m" arrowIcon>
                Ver catálogo completo
              </Button>
            </Row>
          </Column>

          <Column className={styles.heroAside} gap="16">
            <Column className={styles.heroPanel} gap="12">
              <Text
                className={styles.heroEyebrow}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                Como esta área funciona
              </Text>
              <Text variant="heading-strong-m" wrap="balance">
                Um hub enxuto para reunir páginas de ferramentas que resolvem algo específico com
                mais autonomia.
              </Text>
              <Text onBackground="neutral-weak">{toolsPage.note}</Text>
              <SmartLink href={productsPage.path} suffixIcon="arrowRight">
                Ver ofertas pagas e freemium
              </SmartLink>
            </Column>

            <Grid className={styles.signalGrid} columns="1" gap="12">
              {signals.map((item) => (
                <Column key={item.label} className={styles.signalCard} gap="8" padding="16">
                  <Text
                    className={styles.heroEyebrow}
                    variant="label-default-s"
                    onBackground="neutral-weak"
                  >
                    {item.label}
                  </Text>
                  <Text variant="heading-strong-m">{item.value}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                </Column>
              ))}
            </Grid>
          </Column>
        </Grid>
      </Column>

      <Column
        className={sectionStyles.sectionPanel}
        gap="16"
        padding="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Diretório
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Páginas disponíveis agora
          </Heading>
          <Text onBackground="neutral-weak">
            Cada ferramenta fica em uma página própria para melhorar leitura, indexação e
            compartilhamento.
          </Text>
        </Column>

        <Grid className={styles.directoryGrid} columns="1" gap="16">
          {freeTools.map((tool) => (
            <Card
              className={styles.directoryCard}
              key={tool.slug}
              direction="column"
              gap="12"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Row gap="8" wrap>
                <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                  {tool.category}
                </Tag>
                <Tag size="s" background="neutral-alpha-weak">
                  {tool.accessLabel}
                </Tag>
                <Tag size="s" background="neutral-alpha-weak">
                  {tool.status}
                </Tag>
              </Row>

              <Heading as="h2" variant="heading-strong-m">
                {tool.title}
              </Heading>
              <Text onBackground="neutral-weak">{tool.summary}</Text>
              <Text
                className={styles.toolMeta}
                variant="body-default-s"
                onBackground="neutral-weak"
              >
                {tool.format}
              </Text>

              <Column as="ul" className={styles.list} gap="8">
                {tool.highlights.map((item) => (
                  <Text as="li" key={`${tool.slug}-${item}`} variant="body-default-s">
                    {item}
                  </Text>
                ))}
              </Column>

              <Button href={tool.path} variant="primary" size="s" arrowIcon>
                {tool.ctaLabel}
              </Button>
            </Card>
          ))}
        </Grid>
      </Column>

      <Grid className={styles.principlesGrid} columns="3" s={{ columns: 1 }} gap="16">
        {principles.map((item) => (
          <Card
            className={styles.principleCard}
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
            <Text variant="label-default-s" onBackground="neutral-weak">
              Direção
            </Text>
            <Heading as="h2" variant="heading-strong-m">
              {item.title}
            </Heading>
            <Text onBackground="neutral-weak">{item.description}</Text>
          </Card>
        ))}
      </Grid>
    </Column>
  );
}
