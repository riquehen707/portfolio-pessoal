import { Button, Column, Heading, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { QuickDiagnostic } from "@/components/diagnostic/QuickDiagnostic";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, diagnostic, person, productsPage, social } from "@/resources";

import styles from "./page.module.scss";

const projectionPage = {
  title: `Simulador de crescimento | ${person.name}`,
  description:
    "Um simulador de projecao para estimar ganhos futuros por categoria de servico, faturamento atual e verba mensal de marketing e anuncios.",
} as const;

const heroNotes = [
  "Escolha a categoria do servico",
  "Informe faturamento e verba mensal",
  "Receba uma estimativa simples de 90 dias",
] as const;

export async function generateMetadata() {
  return {
    title: projectionPage.title,
    description: projectionPage.description,
    alternates: { canonical: `${baseURL}${diagnostic.path}` },
    openGraph: {
      title: projectionPage.title,
      description: projectionPage.description,
      url: `${baseURL}${diagnostic.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(projectionPage.title)}` }],
    },
  };
}

export default function DiagnosticPage() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? "https://wa.me/5575983675164";

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="20">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={projectionPage.title}
        description={projectionPage.description}
        path={diagnostic.path}
        image={`/api/og/generate?title=${encodeURIComponent(projectionPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${diagnostic.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: diagnostic.label, url: `${baseURL}${diagnostic.path}` },
        ]}
      />

      <section className={styles.hero}>
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Simulador de crescimento
        </Tag>

        <Heading as="h1" className={styles.heroTitle} variant="display-strong-m">
          Veja um cenario de crescimento sem abrir planilha.
        </Heading>

        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          {projectionPage.description} A entrada ficou mais simples: categoria, faturamento atual,
          verba de anuncios e verba total de marketing.
        </Text>

        <Row className={styles.heroActions} gap="12" wrap>
          <Button href="#simulador-projecao" variant="primary" size="m" arrowIcon>
            Abrir simulador
          </Button>
          <Button href={productsPage.path} variant="secondary" size="m" arrowIcon>
            Ver solucoes
          </Button>
        </Row>

        <div className={styles.heroNotes}>
          {heroNotes.map((item) => (
            <div className={styles.heroNote} key={item}>
              <span className={styles.heroDot} aria-hidden="true" />
              <Text variant="body-default-s">{item}</Text>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.simulatorSection} id="simulador-projecao">
        <div className={styles.sectionHeader}>
          <Tag size="s" background="neutral-alpha-weak">
            Projecao em 90 dias
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Menos enfeite. Mais leitura de caixa, verba e retorno.
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            O simulador abaixo devolve um cenario conservador, um esperado e um acelerado para
            servicos como psicologas, advogados e corretores de imoveis.
          </Text>
        </div>

        <QuickDiagnostic whatsappHref={whatsappLink} productsHref={productsPage.path} />
      </section>
    </Column>
  );
}
