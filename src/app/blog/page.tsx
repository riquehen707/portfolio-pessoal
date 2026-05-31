import { Column, Heading, Media, Meta, Schema, Text } from "@once-ui-system/core";

import {
  getAllBlogPosts,
  getBlogCollectionIndex,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getFeaturedHomeBlogPost,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person, productsPage, servicesPage, work } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./blog.module.scss";

const libraryPageTitle = "Biblioteca";
const blogHomeDescription =
  "Guias, trilhas e artigos para revisar o problema antes de mexer em tráfego, página ou conteúdo.";

const topicOrder = [
  "fundamentos",
  "beleza-estetica",
  "clinicas-saude",
  "imobiliario",
  "educacao",
  "juridico",
  "contabilidade",
] as const;

export async function generateMetadata() {
  const image = buildOgImage(libraryPageTitle, "guias, trilhas e temas");
  const generatedMeta = Meta.generate({
    title: libraryPageTitle,
    description: blogHomeDescription,
    baseURL,
    image,
    path: blog.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, libraryPageTitle),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function Blog() {
  const posts = getAllBlogPosts();
  const topics = getBlogCollectionIndex(posts).sort((left, right) => {
    const leftIndex = topicOrder.indexOf(left.slug as (typeof topicOrder)[number]);
    const rightIndex = topicOrder.indexOf(right.slug as (typeof topicOrder)[number]);
    const normalizedLeft = leftIndex === -1 ? Number.POSITIVE_INFINITY : leftIndex;
    const normalizedRight = rightIndex === -1 ? Number.POSITIVE_INFINITY : rightIndex;

    if (normalizedLeft !== normalizedRight) return normalizedLeft - normalizedRight;

    return right.count - left.count;
  });
  const featuredPost = getFeaturedHomeBlogPost(posts);
  const recentPosts = getRecentBlogPosts(24, posts).filter(
    (post) => post.slug !== featuredPost?.slug,
  );

  const feedPosts: EditorialFeedPost[] = recentPosts.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    image: post.metadata.image,
    imageAlt: post.metadata.imageAlt,
    category: getBlogPrimaryCategory(post),
    format: getBlogPostFormat(post),
    readingTime: post.metadata.readingTime,
    publishedAt: post.metadata.updatedAt ?? post.metadata.publishedAt,
  }));

  const startCards = [
    {
      label: "Tráfego",
      title: "Antes de investir em tráfego",
      summary: "Porque anúncio só amplifica o que a oferta e a página já fazem.",
      href: "/blog/termos-de-marketing",
    },
    {
      label: "Página",
      title: "Antes de redesenhar uma página",
      summary: "Porque mudar visual sem clarear oferta costuma trocar o problema de lugar.",
      href: "/blog/termos-de-design",
    },
    {
      label: "Leads",
      title: "Antes de gerar mais leads",
      summary: "Porque lead novo não compensa atendimento que perde conversa boa.",
      href: "/blog/termos-de-publicidade",
    },
  ];

  const libraryTypes = [
    { label: "Artigo", value: "responde uma dúvida específica", href: "#artigos" },
    { label: "Guia", value: "organiza uma decisão ou processo", href: "#guia-recomendado" },
    { label: "Tema", value: "agrupa leituras do mesmo assunto", href: "#temas" },
    { label: "Trilha", value: "sugere uma ordem por área", href: "/trilhas" },
    { label: "Mapa", value: "mostra o caminho geral", href: "/mapa" },
  ];

  const bridgeCards = [
    {
      label: "Aplicar",
      title: "Ver laboratório",
      summary: "Para entender como decisões, sistemas e aprendizados aparecem em projetos reais.",
      href: work.path,
    },
    {
      label: "Usar",
      title: "Ver ferramentas disponíveis",
      summary: "Para encontrar materiais, templates e recursos ligados aos problemas estudados.",
      href: productsPage.path,
    },
    {
      label: "Contratar",
      title: "Entender consultoria",
      summary: "Para avaliar se o problema já pede ajuda externa, escopo e prioridade.",
      href: servicesPage.path,
    },
  ];

  return (
    <Column className={styles.page} fillWidth gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={libraryPageTitle}
        description={blogHomeDescription}
        path={blog.path}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: libraryPageTitle, url: `${baseURL}${blog.path}` },
        ]}
      />

      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Biblioteca de conhecimento
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
            Leia por problema, tema ou etapa.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Leia antes de anunciar, redesenhar, automatizar ou publicar mais. A ordem ajuda a não
            tratar sintoma como causa.
          </Text>
          <nav className={styles.heroNav} aria-label="Atalhos da biblioteca">
            <a href="#comece">Começar</a>
            <a href="#temas">Temas</a>
            <a href="/mapa">Mapa</a>
            <a href="#conexoes">Conexões</a>
          </nav>
        </div>
      </section>

      <section className={styles.startSection} id="comece">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Comece por aqui
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="display-strong-s">
            Escolha pelo problema que está tentando resolver.
          </Heading>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Três situações comuns. Escolha a que mais parece com o seu momento.
          </Text>
        </div>

        <div className={styles.startGrid}>
          {startCards.map((item) => (
            <a className={styles.startCard} href={item.href} key={item.title}>
              <span className={styles.startMarker} aria-hidden="true" />
              <div className={styles.startCopy}>
                <span className={styles.startLabel}>{item.label}</span>
                <Heading as="h3" className={styles.startTitle} variant="heading-strong-m">
                  {item.title}
                </Heading>
                <Text
                  className={styles.startSummary}
                  onBackground="neutral-weak"
                  variant="body-default-s"
                >
                  {item.summary}
                </Text>
              </div>
              <span className={styles.startArrow} aria-hidden="true">
                {">"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {topics.length > 0 ? (
        <section className={`${styles.startSection} ${styles.topicSection}`} id="temas">
          <div className={styles.sectionHeader}>
            <Text
              className={styles.sectionLabel}
              variant="label-default-s"
              onBackground="brand-strong"
            >
              Mapa de assuntos
            </Text>
            <Heading as="h2" className={styles.sectionTitle} variant="display-strong-s">
              Navegue pelo tipo de problema.
            </Heading>
            <Text
              className={styles.sectionLead}
              onBackground="neutral-weak"
              variant="body-default-s"
            >
              Use os temas quando o problema já tem nome.
            </Text>
          </div>

          <div className={`${styles.startGrid} ${styles.topicGrid}`}>
            {topics.map((topic) => (
              <a className={styles.startCard} href={`/blog/temas/${topic.slug}`} key={topic.slug}>
                <span className={styles.startMarker} aria-hidden="true" />
                <div className={styles.startCopy}>
                  <span className={styles.startLabel}>Tema</span>
                  <Heading as="h3" className={styles.startTitle} variant="heading-strong-m">
                    {topic.label}
                  </Heading>
                  <Text
                    className={styles.startSummary}
                    onBackground="neutral-weak"
                    variant="body-default-s"
                  >
                    {topic.description}
                  </Text>
                </div>
                <span
                  className={styles.startCount}
                  aria-label={`${topic.count} artigo${topic.count === 1 ? "" : "s"}`}
                >
                  {topic.count} artigo{topic.count === 1 ? "" : "s"}
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.modeSection} aria-labelledby="library-structure-title">
        <div className={styles.modeHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Ordem e formatos
          </Text>
          <h2 className={styles.modeTitle} id="library-structure-title">
            Você pode ler solto ou seguir uma sequência.
          </h2>
        </div>

        <div className={styles.modeList}>
          {libraryTypes.map((type) => (
            <a className={styles.modeItem} href={type.href} key={type.label}>
              <Text
                className={styles.modeLabel}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                {type.label}
              </Text>
              <Text
                className={styles.modeValue}
                variant="body-default-s"
                onBackground="neutral-medium"
              >
                {type.value}
              </Text>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.startSection} id="conexoes">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Depois da leitura
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="display-strong-s">
            Continue pelo tipo de ação.
          </Heading>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Quando a leitura vira decisão, siga para bastidores, recursos ou consultoria.
          </Text>
        </div>

        <div className={styles.startGrid}>
          {bridgeCards.map((item) => (
            <a className={styles.startCard} href={item.href} key={item.title}>
              <span className={styles.startMarker} aria-hidden="true" />
              <div className={styles.startCopy}>
                <span className={styles.startLabel}>{item.label}</span>
                <Heading as="h3" className={styles.startTitle} variant="heading-strong-m">
                  {item.title}
                </Heading>
                <Text
                  className={styles.startSummary}
                  onBackground="neutral-weak"
                  variant="body-default-s"
                >
                  {item.summary}
                </Text>
              </div>
              <span className={styles.startArrow} aria-hidden="true">
                {">"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {featuredPost ? (
        <section className={styles.featuredSection} id="guia-recomendado">
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Guia recomendado
          </Text>

          <article className={styles.featuredCard}>
            <a className={styles.featuredLink} href={`/blog/${featuredPost.slug}`}>
              <div className={styles.featuredMedia}>
                <Media
                  src={featuredPost.metadata.image ?? "/api/og/generate?title=Biblioteca"}
                  alt={
                    featuredPost.metadata.imageAlt ??
                    `Capa do artigo ${featuredPost.metadata.title}`
                  }
                  aspectRatio="16 / 9"
                  radius="l"
                  border="transparent"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority
                />
              </div>

              <div className={styles.featuredContent}>
                <span className={styles.featuredBadge}>Bom ponto de partida</span>
                <Heading as="h2" className={styles.featuredTitle} variant="display-strong-s">
                  {featuredPost.metadata.title}
                </Heading>
                <Text
                  className={styles.featuredSummary}
                  onBackground="neutral-weak"
                  variant="body-default-m"
                >
                  {featuredPost.metadata.summary}
                </Text>
                <div className={styles.featuredMeta}>
                  <span className={styles.featuredTag}>{getBlogPrimaryCategory(featuredPost)}</span>
                  <span>{getBlogPostFormat(featuredPost)}</span>
                  {featuredPost.metadata.readingTime ? (
                    <span>{featuredPost.metadata.readingTime} min</span>
                  ) : null}
                </div>
              </div>
            </a>
          </article>
        </section>
      ) : null}

      <section className={styles.feedSection} id="artigos">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Atualizações recentes
          </Text>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Use como complemento. O melhor começo nem sempre é o texto mais novo.
          </Text>
        </div>

        <EditorialFeed posts={feedPosts} initialCount={3} step={3} />
      </section>
    </Column>
  );
}
