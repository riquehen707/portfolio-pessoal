import {
  Button,
  Column,
  Grid,
  Heading,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";

import { GrowthSimulator } from "@/components/simulation/GrowthSimulator";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import {
  baseURL,
  person,
  servicesPage,
  simulationPage,
  social,
  work,
} from "@/resources";

import styles from "./page.module.scss";

const simulationSignals = [
  {
    label: "Etapa 1",
    description:
      "Preco, custo, vendas e custos fixos para medir a base atual do negocio.",
  },
  {
    label: "Etapa 2",
    description:
      "Pequenos ajustes de vendas, preco, custo e recorrencia para ver o ganho sem depender primeiro de midia.",
  },
  {
    label: "Etapa 3",
    description:
      "Quanto o marketing precisaria retornar para bater esse ganho, considerando CAC e saturacao do modelo.",
  },
] as const;

export async function generateMetadata() {
  return {
    title: simulationPage.title,
    description: simulationPage.description,
    alternates: { canonical: `${baseURL}${simulationPage.path}` },
    openGraph: {
      title: simulationPage.title,
      description: simulationPage.description,
      url: `${baseURL}${simulationPage.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(simulationPage.title)}` }],
    },
  };
}

export default function SimulationPage() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;

  return (
    <Column className={styles.page} maxWidth="l" paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={simulationPage.title}
        description={simulationPage.description}
        path={simulationPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(simulationPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${simulationPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Simulacao", url: `${baseURL}${simulationPage.path}` },
        ]}
      />

      <section className={styles.heroSection}>
        <Grid className={styles.hero} columns="2" s={{ columns: 1 }} gap="24">
          <Column className={styles.heroCopy} gap="20">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Simulacao
            </Tag>
            <Heading as="h1" variant="display-strong-l" wrap="balance">
              Ver os dados primeiro
            </Heading>
            <Text className={styles.heroLead} variant="heading-default-m" onBackground="neutral-weak">
              Esta pagina separa a conta em tres etapas para mostrar o que ja pode melhorar no negocio antes de depender de marketing.
            </Text>
            <Text className={styles.heroNote} variant="body-default-m" onBackground="neutral-weak">
              A ideia nao e prometer faturamento. E entender margem, ganho operacional e quanto a midia realmente precisaria entregar.
            </Text>
            <Row className={styles.actions} gap="12" wrap>
              <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
                Ver servicos
              </Button>
              <Button href={work.path} variant="secondary" size="m" arrowIcon>
                Ver projetos
              </Button>
            </Row>
          </Column>

          <Column className={styles.heroAside} gap="16">
            <div className={styles.asideItem}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                90 dias
              </Text>
              <Text variant="heading-strong-s">Leitura de curto prazo</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                O foco aqui e comparar esforco operacional com esforco de marketing no mesmo horizonte.
              </Text>
            </div>
            <div className={styles.asideItem}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                Segmento
              </Text>
              <Text variant="heading-strong-s">Categorias com dinamicas diferentes</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Psicologas, advogados, corretores, clinicas, estetica e lojas saturam em ritmos diferentes.
              </Text>
            </div>
            <div className={styles.asideItem}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                Conversa
              </Text>
              <Text variant="heading-strong-s">Boa para validar o proximo passo</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Se a conta fechar, a conversa entra com muito mais contexto e menos chute.
              </Text>
            </div>
          </Column>
        </Grid>
      </section>

      <GrowthSimulator servicesHref={servicesPage.path} contactHref={whatsappLink} />

      <section className={styles.section}>
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Leitura
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              O que essa pagina ajuda a responder
            </Heading>
          </Column>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            O objetivo nao e fechar um numero exato. E comparar se um ajuste interno simples gera mais caixa do que uma aposta apressada em marketing.
          </Text>
        </Row>

        <Grid className={styles.signalGrid} columns="3" s={{ columns: 1 }} gap="20">
          {simulationSignals.map((signal) => (
            <article className={styles.signalItem} key={signal.label}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                {signal.label}
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {signal.description}
              </Text>
            </article>
          ))}
        </Grid>
      </section>
    </Column>
  );
}
