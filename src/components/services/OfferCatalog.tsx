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
  microservice: "Micro-serviços",
  saas: "SaaS e ferramentas",
};

const categoryDescriptions: Record<OfferCategory, string> = {
  package: "Escopos fechados para resolver algo comum com mais previsibilidade.",
  microservice: "Entradas menores para corrigir, ajustar ou destravar um ponto específico.",
  saas: "Ferramentas autorais para organizar escopo, rotina e leitura de oportunidade.",
};

const accessLabels = {
  free: "Gratuito",
  paid: "Pago",
  freemium: "Freemium",
} as const;

const filterOrder: FilterKey[] = ["all", "package", "microservice", "saas"];

function buildQuoteHref(slug: string) {
  return `/servicos/produtos?produto=${encodeURIComponent(slug)}#solicitar-orcamento`;
}

export default function OfferCatalog({ offers }: OfferCatalogProps) {
  const visibleOffers = offers.filter((offer) => offer.category !== "saas");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredOffers =
    activeFilter === "all"
      ? visibleOffers
      : visibleOffers.filter((offer) => offer.category === activeFilter);

  const sections = (["package", "microservice"] as OfferCategory[])
    .map((category) => ({
      category,
      items: filteredOffers.filter((offer) => offer.category === category),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <Column className={styles.root} gap="24">
      <div className={styles.filterShell}>
        <Column className={styles.filterIntro} gap="8">
          <Text className={styles.filterEyebrow} variant="label-default-s" onBackground="neutral-weak">
            Escolha por formato
          </Text>
          <Heading as="h3" variant="heading-strong-l">
            Catálogo de entradas
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Pacotes para começar com mais previsibilidade e micro-serviços para resolver gargalos específicos.
          </Text>
        </Column>

        <Row className={styles.filters} gap="12" wrap>
        {filterOrder.filter((filterKey) => filterKey !== "saas").map((filterKey) => {
          const count =
            filterKey === "all"
              ? visibleOffers.length
              : visibleOffers.filter((offer) => offer.category === filterKey).length;

          const label = filterKey === "all" ? "Tudo" : categoryLabels[filterKey];
          const isActive = activeFilter === filterKey;

          return (
            <button
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
              key={filterKey}
              onClick={() => setActiveFilter(filterKey)}
              aria-pressed={isActive}
              type="button"
            >
              <span>{label}</span>
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
        </Row>
      </div>

      {sections.map((section) => (
        <section className={styles.section} key={section.category}>
          <Column className={styles.sectionHeader} gap="8">
            <Heading as="h2" variant="heading-strong-s">
              {categoryLabels[section.category]}
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              {categoryDescriptions[section.category]}
            </Text>
          </Column>

          <Grid className={styles.catalogGrid} columns="3" s={{ columns: 1 }} gap="16">
            {section.items.map((offer) => (
              <Card
                className={styles.card}
                key={offer.slug}
                direction="column"
                gap="16"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                border="neutral-alpha-weak"
                fillHeight
              >
                <Row className={styles.cardTop} gap="8" wrap>
                  <Tag className={styles.categoryTag} size="s" background="brand-alpha-weak" onBackground="brand-strong">
                    {categoryLabels[offer.category]}
                  </Tag>
                  <Tag size="s" background="neutral-alpha-weak">
                    {accessLabels[offer.access]}
                  </Tag>
                  <Tag size="s" background="neutral-alpha-weak">
                    {offer.status}
                  </Tag>
                </Row>

                <Column className={styles.cardIntro} gap="12">
                  <Heading as="h3" className={styles.cardTitle} variant="heading-strong-m">
                    {offer.title}
                  </Heading>
                  <Text onBackground="neutral-weak" variant="body-default-m">
                    {offer.summary}
                  </Text>
                </Column>

                <div className={styles.pricePanel}>
                  <Text className={styles.priceValue} variant="heading-strong-l">
                    {offer.price}
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {offer.priceLabel}
                  </Text>
                </div>

                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Formato
                    </Text>
                    <Text variant="body-default-s">{offer.format}</Text>
                  </div>
                </div>

                <Column as="ul" className={styles.highlights} gap="8">
                  {offer.highlights.map((item) => (
                    <Text as="li" key={`${offer.slug}-${item}`} variant="body-default-s">
                      {item}
                    </Text>
                  ))}
                </Column>

                <Column className={styles.footer} gap="12">
                  <Button href={buildQuoteHref(offer.slug)} variant="primary" size="m" arrowIcon>
                    {offer.ctaLabel}
                  </Button>

                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Ou siga por WhatsApp com um briefing curto e objetivo.
                  </Text>
                </Column>
              </Card>
            ))}
          </Grid>
        </section>
      ))}
    </Column>
  );
}
