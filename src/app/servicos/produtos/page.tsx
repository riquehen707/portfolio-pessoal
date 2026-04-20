import { Suspense } from "react";

import { Button, Column, Grid, Heading, Row, Schema, Tag, Text } from "@once-ui-system/core";

import OfferCatalog from "@/components/services/OfferCatalog";
import { ProductQuoteForm } from "@/components/services/ProductQuoteForm";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, person, products, productsPage, social } from "@/resources";

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
  const visibleProducts = products.filter((item) => item.category !== "saas");
  const packageProducts = visibleProducts.filter((item) => item.category === "package");
  const microProducts = visibleProducts.filter((item) => item.category === "microservice");
  const featuredProducts = [packageProducts[0], microProducts[0]].filter(Boolean);

  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? "https://wa.me/5575983675164";

  const heroStats = [
    {
      label: "Pacotes",
      value: `${packageProducts.length.toString().padStart(2, "0")} opções`,
      detail: "Entradas mais fechadas para começar com clareza.",
    },
    {
      label: "Micro-serviços",
      value: `${microProducts.length.toString().padStart(2, "0")} opções`,
      detail: "Sprints menores para destravar algo específico.",
    },
    {
      label: "Formato",
      value: "UI + execução",
      detail: "Página pensada para escolha rápida e orçamento sem fricção.",
    },
  ];

  const shoppingSignals = [
    "Escolha rápida por formato",
    "Preço inicial visível",
    "CTA direto para orçamento",
    "Leitura clara em desktop e mobile",
  ];

  const quoteBenefits = [
    "Escolha do produto ou pedido sob medida",
    "Briefing curto para acelerar a resposta",
    "WhatsApp como entrada principal",
  ];

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

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Produtos e pacotes
          </Tag>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
            Escolha um ponto de entrada claro para destravar seu digital.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            {productsPage.description} A ideia aqui é facilitar a decisão com uma vitrine simples,
            bonita e objetiva, sem transformar tudo em projeto grande logo de início.
          </Text>

          <Row className={styles.heroActions} gap="12" wrap>
            <Button href="#catalogo-produtos" variant="primary" size="m" arrowIcon>
              Ver produtos e pacotes
            </Button>
            <Button href="#solicitar-orcamento" variant="secondary" size="m" arrowIcon>
              Solicitar orçamento
            </Button>
          </Row>

          <div className={styles.signalRail}>
            {shoppingSignals.map((item) => (
              <div className={styles.signalItem} key={item}>
                <span className={styles.signalDot} aria-hidden="true" />
                <Text variant="body-default-s">{item}</Text>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.heroAside}>
          {heroStats.map((item) => (
            <div className={styles.heroStat} key={item.label}>
              <Text className={styles.heroStatLabel} variant="label-default-s" onBackground="neutral-weak">
                {item.label}
              </Text>
              <Text className={styles.heroStatValue} variant="heading-strong-l">
                {item.value}
              </Text>
              <Text onBackground="neutral-weak" variant="body-default-s">
                {item.detail}
              </Text>
            </div>
          ))}
        </aside>
      </section>

      {featuredProducts.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Tag size="s" background="neutral-alpha-weak">
              Comece por aqui
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Entradas mais fáceis de contratar
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Uma leitura inicial para quem quer decidir rápido sem navegar o catálogo inteiro.
            </Text>
          </div>

          <Grid className={styles.featuredGrid} columns="2" s={{ columns: 1 }} gap="16">
            {featuredProducts.map((offer) => (
              <article className={styles.featuredCard} key={offer.slug}>
                <div className={styles.featuredCardTop}>
                  <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                    {offer.category === "package" ? "Pacote" : "Micro-serviço"}
                  </Tag>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {offer.status}
                  </Text>
                </div>

                <Column gap="12">
                  <Heading as="h3" variant="heading-strong-l">
                    {offer.title}
                  </Heading>
                  <Text onBackground="neutral-weak" variant="body-default-m">
                    {offer.summary}
                  </Text>
                </Column>

                <div className={styles.featuredMeta}>
                  <div>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Formato
                    </Text>
                    <Text variant="body-default-s">{offer.format}</Text>
                  </div>
                  <div>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Faixa inicial
                    </Text>
                    <Text variant="body-default-s">{offer.price}</Text>
                  </div>
                </div>

                <ul className={styles.featuredList}>
                  {offer.highlights.map((item) => (
                    <li key={`${offer.slug}-${item}`}>
                      <Text variant="body-default-s">{item}</Text>
                    </li>
                  ))}
                </ul>

                <Row className={styles.featuredActions} gap="12" wrap>
                  <Button href={`${productsPage.path}?produto=${offer.slug}#solicitar-orcamento`} variant="primary" size="m" arrowIcon>
                    {offer.ctaLabel}
                  </Button>
                  <Button href="#catalogo-produtos" variant="secondary" size="m" arrowIcon>
                    Ver catálogo
                  </Button>
                </Row>
              </article>
            ))}
          </Grid>
        </section>
      )}

      <section className={styles.section} id="catalogo-produtos">
        <OfferCatalog offers={visibleProducts} />
      </section>

      <section className={styles.quoteSection} id="solicitar-orcamento">
        <div className={styles.quoteIntro}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Solicitar orçamento
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Se o pacote certo já apareceu, o próximo passo é pedir o orçamento.
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            O formulário abaixo foi pensado para ser curto. Ele serve tanto para escolher um dos
            produtos quanto para abrir um pedido mais personalizado.
          </Text>

          <div className={styles.quoteBenefits}>
            {quoteBenefits.map((item) => (
              <div className={styles.quoteBenefit} key={item}>
                <span className={styles.signalDot} aria-hidden="true" />
                <Text variant="body-default-s">{item}</Text>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quotePanel}>
          <Suspense fallback={null}>
            <ProductQuoteForm
              offers={visibleProducts}
              whatsappHref={whatsappLink}
              scheduleHref="https://cal.com/henriquereis"
            />
          </Suspense>
        </div>
      </section>
    </Column>
  );
}
