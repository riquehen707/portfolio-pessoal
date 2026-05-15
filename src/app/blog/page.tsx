import { Button, Column, Grid, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { Posts } from "@/components/blog/Posts";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person, servicesPage } from "@/resources";

import styles from "./blog.module.scss";

const blogPlaceholderDescription =
  "Blog em producao com foco em marketing, design, economia aplicada a negocios e operacao para prestadores de servico.";

const newsletterWaitlistHref = `mailto:${person.email}?subject=${encodeURIComponent(
  "Quero entrar na newsletter",
)}&body=${encodeURIComponent(
  "Quero receber os proximos conteudos do blog quando a newsletter for aberta.",
)}`;

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blogPlaceholderDescription,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Blog em producao")}`,
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
        image={`/api/og/generate?title=${encodeURIComponent("Blog em producao")}`}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
        ]}
      />

      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Blog
            </Tag>

            <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
              Editorial em abertura
            </Heading>

            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
              wrap="balance"
            >
              O blog esta sendo estruturado para publicar conteudo pratico sobre marketing, design,
              economia aplicada a negocios e rotina de prestadores de servico.
            </Text>

            <Text className={styles.heroNote} onBackground="neutral-weak" variant="body-default-m">
              Os primeiros guias de termos ja entram como base de apoio para o simulador e para os
              proximos artigos.
            </Text>

            <Row className={styles.actions} gap="12" wrap>
              <Button href={newsletterWaitlistHref} variant="primary" size="m" arrowIcon>
                Entrar na newsletter
              </Button>
              <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
                Ver servicos
              </Button>
            </Row>
          </div>

          <aside className={styles.topicList}>
            <div className={styles.topicItem}>
              <Text className={styles.topicLabel} variant="label-default-s" onBackground="neutral-weak">
                Marketing
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Posicionamento, aquisicao, oferta, comunicacao e estrutura comercial para negocios
                de servico.
              </Text>
            </div>

            <div className={styles.topicItem}>
              <Text className={styles.topicLabel} variant="label-default-s" onBackground="neutral-weak">
                Design
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Paginas, direcao visual, experiencia e clareza estetica com funcao pratica de venda.
              </Text>
            </div>

            <div className={styles.topicItem}>
              <Text className={styles.topicLabel} variant="label-default-s" onBackground="neutral-weak">
                Publicidade
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Midia paga, leitura de eficiencia, custos de aquisicao e retorno real por verba
                investida.
              </Text>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.publishedSection}>
        <div className={styles.sectionHeader}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Guias
          </Tag>
          <Heading as="h2" variant="heading-strong-l">
            Primeiros artigos publicados
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Um ponto de partida para explicar termos que aparecem nas simulacoes e nos proximos
            textos do site.
          </Text>
        </div>

        <Posts columns="3" range={[1, 3]} showSummary marginBottom="0" />
      </section>

      <Grid className={styles.signalGrid} columns="3" s={{ columns: 1 }} gap="20">
        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Como vou publicar
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Artigos curtos, analises aplicaveis, frameworks de decisao e materiais uteis para o dia a dia.
          </Text>
        </div>

        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Para quem
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Principalmente para prestadores de servico, pequenos negocios e operacoes que precisam
            vender melhor com mais clareza.
          </Text>
        </div>

        <div className={styles.signalItem}>
          <Text className={styles.signalLabel} variant="label-default-s" onBackground="neutral-weak">
            Newsletter
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            A newsletter entra junto com os proximos conteudos para acompanhar essa base editorial
            em construcao.
          </Text>
        </div>
      </Grid>
    </Column>
  );
}
