import { Button, Column, Grid, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person, servicesPage } from "@/resources";

import styles from "./blog.module.scss";

const blogPlaceholderDescription =
  "Blog em produção com foco em marketing, design, economia aplicada a negócios e operação para prestadores de serviço.";

const newsletterWaitlistHref = `mailto:${person.email}?subject=${encodeURIComponent(
  "Quero entrar na newsletter",
)}&body=${encodeURIComponent(
  "Quero receber os próximos conteúdos do blog quando a newsletter for aberta.",
)}`;

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blogPlaceholderDescription,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Blog em produção")}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={blog.title}
        description={blogPlaceholderDescription}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent("Blog em produção")}`}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
        ]}
      />

      <section className={styles.heroSection}>
        <div className={styles.atmosphere} aria-hidden="true" />

        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Blog
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
              O blog está sendo preparado para publicar conteúdo prático sobre marketing, design,
              economia aplicada a negócios e rotina de prestadores de serviço.
            </Text>

            <Text className={styles.heroNote} onBackground="neutral-weak" variant="body-default-m">
              A ideia é abrir com uma linha editorial coesa, para que os textos entrem como base útil
              e não como arquivo solto.
            </Text>

            <Row className={styles.actions} gap="12" wrap>
              <Button href={newsletterWaitlistHref} variant="primary" size="m" arrowIcon>
                Entrar na newsletter
              </Button>
              <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
                Ver serviços
              </Button>
            </Row>
          </div>

          <aside className={styles.topicList}>
            <div className={styles.topicItem}>
              <Text className={styles.topicLabel} variant="label-default-s" onBackground="neutral-weak">
                Marketing
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Posicionamento, aquisição, oferta, comunicação e estrutura comercial para negócios de
                serviço.
              </Text>
            </div>

            <div className={styles.topicItem}>
              <Text className={styles.topicLabel} variant="label-default-s" onBackground="neutral-weak">
                Design
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Páginas, direção visual, experiência e clareza estética com função prática de venda.
              </Text>
            </div>

            <div className={styles.topicItem}>
              <Text className={styles.topicLabel} variant="label-default-s" onBackground="neutral-weak">
                Economia aplicada
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Preço, margem, recorrência, demanda e leitura de negócio para crescer com menos ruído.
              </Text>
            </div>
          </aside>
        </div>
      </section>

      <Grid className={styles.signalGrid} columns="3" s={{ columns: 1 }} gap="20">
        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Como vou publicar
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Artigos curtos, análises aplicáveis, frameworks de decisão e materiais úteis para o dia a
            dia.
          </Text>
        </div>

        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Para quem
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Principalmente para prestadores de serviço, pequenos negócios e operações que precisam
            vender melhor com mais clareza.
          </Text>
        </div>

        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Newsletter
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            A newsletter entra junto com os primeiros conteúdos para acompanhar essa base editorial em
            construção.
          </Text>
        </div>
      </Grid>
    </Column>
  );
}
