import { Button, Column, Grid, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, contact, person, servicesPage } from "@/resources";

import styles from "./blog.module.scss";

const blogPlaceholderDescription =
  "Blog em produção. As publicações, tags e categorias antigas foram removidas para a reconstrução editorial do zero.";

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

      <section className={styles.shell}>
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Blog
            </Tag>
            <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
              Em produção
            </Heading>
            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
              wrap="balance"
            >
              O blog está sendo refeito do zero. As publicações, tags e categorias antigas foram
              removidas para abrir espaço para uma base editorial nova, mais coerente e mais útil.
            </Text>

            <Row className={styles.actions} gap="12" wrap>
              <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
                Ver serviços
              </Button>
              <Button href={contact.path} variant="secondary" size="m" arrowIcon>
                Entrar em contato
              </Button>
            </Row>
          </div>

          <aside className={styles.statusPanel}>
            <div className={styles.statusCard}>
              <span className={styles.statusValue}>00</span>
              <Text onBackground="neutral-weak" variant="body-default-s">
                publicações ativas
              </Text>
            </div>
            <div className={styles.statusCard}>
              <span className={styles.statusValue}>00</span>
              <Text onBackground="neutral-weak" variant="body-default-s">
                categorias atuais
              </Text>
            </div>
            <div className={styles.statusCard}>
              <span className={styles.statusValue}>00</span>
              <Text onBackground="neutral-weak" variant="body-default-s">
                tags ativas
              </Text>
            </div>
          </aside>
        </div>
      </section>

      <Grid className={styles.noteGrid} columns="3" s={{ columns: 1 }} gap="16">
        <div className={styles.noteCard}>
          <Text className={styles.noteLabel} variant="label-default-s" onBackground="neutral-weak">
            Estado atual
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            A estrutura editorial anterior foi encerrada para evitar mistura de temas, tom e direção.
          </Text>
        </div>

        <div className={styles.noteCard}>
          <Text className={styles.noteLabel} variant="label-default-s" onBackground="neutral-weak">
            Recomeço
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            O próximo ciclo vai nascer com nova curadoria, nova taxonomia e uma linha editorial mais clara.
          </Text>
        </div>

        <div className={styles.noteCard}>
          <Text className={styles.noteLabel} variant="label-default-s" onBackground="neutral-weak">
            Enquanto isso
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Os conteúdos públicos ficam pausados até a nova base do blog entrar no ar.
          </Text>
        </div>
      </Grid>
    </Column>
  );
}
