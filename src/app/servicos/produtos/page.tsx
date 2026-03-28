import { Card, Column, Grid, Heading, Schema, Tag, Text } from "@once-ui-system/core";

import OfferCatalog from "@/components/services/OfferCatalog";
import { baseURL, person, products, productsPage } from "@/resources";

import sectionStyles from "../../section.module.scss";
import styles from "../services.module.scss";

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
  const stats = [
    {
      label: "Pacotes",
      value: `${products.filter((item) => item.category === "package").length} opcoes`,
    },
    {
      label: "Micro-servicos",
      value: `${products.filter((item) => item.category === "microservice").length} opcoes`,
    },
    {
      label: "Gratis ou freemium",
      value: `${products.filter((item) => item.access !== "paid").length} opcoes`,
    },
  ];

  return (
    <Column className={sectionStyles.page} maxWidth="m" paddingTop="24" gap="24">
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

      <Column className={sectionStyles.heroGlow} gap="16">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Entrada menor e mais direta
        </Tag>
        <Heading as="h1" variant="heading-strong-xl">
          {productsPage.title}
        </Heading>
        <div className={sectionStyles.accentLine} />
        <Text onBackground="neutral-weak">{productsPage.description}</Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {productsPage.note} {productsPage.cta}
        </Text>
      </Column>

      <Grid columns="3" s={{ columns: 1 }} gap="16">
        {stats.map((item) => (
          <Card
            className={styles.statCard}
            key={item.label}
            direction="column"
            gap="8"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              {item.label}
            </Text>
            <Heading as="h2" variant="heading-strong-m">
              {item.value}
            </Heading>
          </Card>
        ))}
      </Grid>

      <OfferCatalog offers={products} />
    </Column>
  );
}
