import { Button, Column, Grid, Heading, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, person, productsPage, servicesPage, work } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

export async function generateMetadata() {
  const image = buildOgImage(productsPage.title);

  return {
    title: productsPage.title,
    description: productsPage.description,
    alternates: { canonical: `${baseURL}${productsPage.path}` },
    openGraph: {
      title: productsPage.title,
      description: productsPage.description,
      url: `${baseURL}${productsPage.path}`,
      images: buildDiscoverImageMetadata(image, productsPage.title),
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

      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Produtos
            </Tag>

            <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
              Em andamento
            </Heading>

            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
              wrap="balance"
            >
              Estou organizando o portfólio antes de prosseguir com os produtos, para que essa área
              entre com utilidade real, recorte e direção.
            </Text>

            <Text className={styles.heroNote} onBackground="neutral-weak" variant="body-default-m">
              A ideia é abrir essa frente por etapas, começando pelo que pode ser útil de forma mais
              leve e imediata.
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

          <aside className={styles.roadmapList}>
            <div className={styles.roadmapItem}>
              <Text className={styles.roadmapLabel} variant="label-default-s" onBackground="neutral-weak">
                Gratuitos
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Recursos mais simples, materiais rápidos e utilitários para apoiar decisões e rotina.
              </Text>
            </div>

            <div className={styles.roadmapItem}>
              <Text className={styles.roadmapLabel} variant="label-default-s" onBackground="neutral-weak">
                Apps úteis
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Pequenas ferramentas com função prática para marketing, atendimento e operação.
              </Text>
            </div>

            <div className={styles.roadmapItem}>
              <Text className={styles.roadmapLabel} variant="label-default-s" onBackground="neutral-weak">
                Entradas leves
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Auditoria simples e consultoria de 30 minutos como formatos diretos para começar.
              </Text>
            </div>
          </aside>
        </div>
      </section>

      <Grid className={styles.signalGrid} columns="3" s={{ columns: 1 }} gap="20">
        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Agora
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Organizando o portfólio e a base da oferta antes de abrir uma nova camada de produtos.
          </Text>
        </div>

        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Depois
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            A página volta com recursos gratuitos, apps úteis, auditorias leves e consultorias rápidas.
          </Text>
        </div>

        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Como entra
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Sem catálogo inflado: a ideia é publicar aos poucos, conforme cada item estiver realmente
            pronto para uso.
          </Text>
        </div>
      </Grid>
    </Column>
  );
}
