import { Button, Column, Grid, Heading, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, person, productsPage, servicesPage, work } from "@/resources";

import styles from "./page.module.scss";

export async function generateMetadata() {
  return {
    title: productsPage.title,
    description: productsPage.description,
    alternates: { canonical: `${baseURL}${productsPage.path}` },
    openGraph: {
      title: productsPage.title,
      description: productsPage.description,
      url: `${baseURL}${productsPage.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(productsPage.title)}` }],
    },
  };
}

export default function ProductsPage() {
  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={productsPage.title}
        description={productsPage.description}
        path={productsPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(productsPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${productsPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Produtos", url: `${baseURL}${productsPage.path}` },
        ]}
      />

      <section className={styles.shell}>
        <div className={styles.aurora} aria-hidden="true" />

        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Produtos
            </Tag>
            <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
              Organizando o portfólio
            </Heading>
            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
              wrap="balance"
            >
              Antes de prosseguir com produtos, estou organizando o portfólio e ajustando melhor a
              base dessa frente.
            </Text>
            <Text className={styles.heroNote} onBackground="neutral-weak" variant="body-default-m">
              Depois disso, esta página volta com recursos gratuitos, apps úteis, auditoria simples
              e consultoria de 30 minutos como entradas mais leves.
            </Text>

            <Row className={styles.actions} gap="12" wrap>
              <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
                Ver serviços
              </Button>
              <Button href={work.path} variant="secondary" size="m" arrowIcon>
                Ver projetos
              </Button>
            </Row>
          </div>

          <aside className={styles.statusPanel}>
            <div className={styles.statusCard}>
              <span className={styles.statusValue}>00</span>
              <Text onBackground="neutral-weak" variant="body-default-s">
                produtos ativos
              </Text>
            </div>
            <div className={styles.statusCard}>
              <span className={styles.statusValue}>Em breve</span>
              <Text onBackground="neutral-weak" variant="body-default-s">
                gratuitos, apps e utilitários
              </Text>
            </div>
            <div className={styles.statusCard}>
              <span className={styles.statusValue}>30 min</span>
              <Text onBackground="neutral-weak" variant="body-default-s">
                consultoria e auditoria simples
              </Text>
            </div>
          </aside>
        </div>
      </section>

      <Grid className={styles.noteGrid} columns="3" s={{ columns: 1 }} gap="16">
        <div className={styles.noteCard}>
          <Text className={styles.noteLabel} variant="label-default-s" onBackground="neutral-weak">
            Agora
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Organizando o portfólio antes de prosseguir com produtos.
          </Text>
        </div>

        <div className={styles.noteCard}>
          <Text className={styles.noteLabel} variant="label-default-s" onBackground="neutral-weak">
            Gratuitos
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Devem entrar recursos gratuitos, apps úteis e algumas ferramentas mais simples para uso
            rápido.
          </Text>
        </div>

        <div className={styles.noteCard}>
          <Text className={styles.noteLabel} variant="label-default-s" onBackground="neutral-weak">
            Entradas leves
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Também quero abrir auditoria simples e consultoria de 30 minutos como formatos mais
            diretos.
          </Text>
        </div>
      </Grid>
    </Column>
  );
}
