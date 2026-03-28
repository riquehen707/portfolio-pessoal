"use client";

import { useState } from "react";
import { Button, Card, Column, Grid, Heading, Row, Tag, Text } from "@once-ui-system/core";

import { OfferCategory, ProductItem } from "@/types";

import styles from "./OfferCatalog.module.scss";

type OfferCatalogProps = {
  offers: ProductItem[];
};

type FilterKey = OfferCategory | "all";

const categoryLabels: Record<OfferCategory, string> = {
  package: "Pacotes",
  microservice: "Micro-servicos",
  saas: "SaaS e ferramentas",
};

const categoryDescriptions: Record<OfferCategory, string> = {
  package: "Escopos mais fechados para entrar rapido sem abrir um projeto inteiro.",
  microservice: "Entregas menores para corrigir, ajustar ou destravar algo pontual.",
  saas: "Ferramentas autorais, gratuitas, pagas ou em beta.",
};

const accessLabels = {
  free: "Gratuito",
  paid: "Pago",
  freemium: "Freemium",
} as const;

const filterOrder: FilterKey[] = ["all", "package", "microservice", "saas"];

export default function OfferCatalog({ offers }: OfferCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredOffers =
    activeFilter === "all" ? offers : offers.filter((offer) => offer.category === activeFilter);

  const sections = (["package", "microservice", "saas"] as OfferCategory[])
    .map((category) => ({
      category,
      items: filteredOffers.filter((offer) => offer.category === category),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <Column className={styles.root} gap="24">
      <Row className={styles.filters} gap="12" wrap>
        {filterOrder.map((filterKey) => {
          const count =
            filterKey === "all"
              ? offers.length
              : offers.filter((offer) => offer.category === filterKey).length;

          const label = filterKey === "all" ? "Tudo" : categoryLabels[filterKey];
          const isActive = activeFilter === filterKey;

          return (
            <button
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
              key={filterKey}
              onClick={() => setActiveFilter(filterKey)}
              type="button"
            >
              <span>{label}</span>
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </Row>

      {sections.map((section) => (
        <Column key={section.category} gap="12">
          <Column gap="8">
            <Heading as="h2" variant="heading-strong-s">
              {categoryLabels[section.category]}
            </Heading>
            <Text onBackground="neutral-weak">{categoryDescriptions[section.category]}</Text>
          </Column>

          <Grid columns="3" s={{ columns: 1 }} gap="16">
            {section.items.map((offer) => (
              <Card
                className={styles.card}
                key={offer.slug}
                direction="column"
                gap="12"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                border="neutral-alpha-weak"
                fillHeight
              >
                <Row gap="8" wrap>
                  <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                    {categoryLabels[offer.category]}
                  </Tag>
                  <Tag size="s" background="neutral-alpha-weak">
                    {accessLabels[offer.access]}
                  </Tag>
                  <Tag size="s" background="neutral-alpha-weak">
                    {offer.status}
                  </Tag>
                </Row>

                <Column gap="8">
                  <Heading as="h3" variant="heading-strong-m">
                    {offer.title}
                  </Heading>
                  <Text onBackground="neutral-weak">{offer.summary}</Text>
                </Column>

                <Column gap="4">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Formato
                  </Text>
                  <Text variant="body-default-s">{offer.format}</Text>
                </Column>

                <Column as="ul" className={styles.highlights} gap="8">
                  {offer.highlights.map((item) => (
                    <Text as="li" key={`${offer.slug}-${item}`} variant="body-default-s">
                      {item}
                    </Text>
                  ))}
                </Column>

                <Column className={styles.footer} gap="12">
                  <Column gap="2">
                    <Text variant="heading-strong-s">{offer.price}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {offer.priceLabel}
                    </Text>
                  </Column>

                  <Button href={offer.link} variant="primary" size="s" arrowIcon>
                    {offer.ctaLabel}
                  </Button>
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>
      ))}
    </Column>
  );
}
