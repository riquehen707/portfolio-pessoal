import { Column, Grid, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import {
  getAllBlogPosts,
  getBlogCategoryCounts,
  getBlogTagCounts,
  getBusinessBlogPosts,
  getFeaturedBlogPosts,
  getPersonalBlogPosts,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import BlogExplorer from "@/components/blog/BlogExplorer";
import Post from "@/components/blog/Post";
import { PostData, PostFrontmatter } from "@/components/blog/Posts";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, contentStrategy, person } from "@/resources";
import { type BlogFile } from "@/utils/utils";

import styles from "./blog.module.scss";

const blogStrategy = contentStrategy.pages.blog;

const categoryLabelMap: Record<string, string> = {
  "Negocios locais": "Negócios locais",
  Marketing: "Marketing",
  Design: "Design",
  Operacao: "Operação",
  Tecnologia: "Tecnologia",
  Growth: "Growth",
  "Cultura e Sociedade": "Cultura e Sociedade",
};

const categoryDescriptions: Record<string, string> = {
  "Negocios locais":
    "Mercados reais, aquisição local, autonomia digital e clareza comercial.",
  Marketing:
    "Oferta, conversão, posicionamento e leitura de crescimento com foco em negócio.",
  Design:
    "Percepção de valor, hierarquia e linguagem visual usadas para gerar confiança.",
  Operacao:
    "Processos, CRM, rotina comercial e estrutura para reduzir atrito operacional.",
  Tecnologia:
    "Sites, SEO, automação e sistemas aplicados ao que realmente melhora a operação.",
  Growth:
    "Crescimento com dados úteis, consistência e leitura mais inteligente do canal.",
  "Cultura e Sociedade":
    "Ensaios sobre mídia, cultura, narrativa e os efeitos sociais do que se torna normal.",
};

function formatLabel(value: string) {
  return categoryLabelMap[value] ?? value;
}

function toPostData(post: BlogFile): PostData {
  return {
    slug: post.slug,
    metadata: post.metadata as PostFrontmatter,
  };
}

function dedupePosts(posts: BlogFile[]) {
  const seen = new Set<string>();

  return posts.filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  });
}

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: blog.title,
      description: blog.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
      path: blog.path,
    }),
    keywords: blogStrategy.seo.keywords,
  };
}

export default function Blog() {
  const allBlogPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts(3, allBlogPosts);
  const recentPosts = dedupePosts([...getRecentBlogPosts(4, allBlogPosts), ...featuredPosts]).slice(0, 4);
  const businessPosts = getBusinessBlogPosts(4, allBlogPosts);
  const personalPosts = getPersonalBlogPosts(4, allBlogPosts);

  const archivePosts = allBlogPosts.map(toPostData);
  const categoryOptions = getBlogCategoryCounts(allBlogPosts).map((item) => ({
    key: item.key,
    label: formatLabel(item.key),
    count: item.count,
  }));
  const tagOptions = getBlogTagCounts(16, allBlogPosts).map((item) => ({
    key: item.key,
    label: item.key,
    count: item.count,
  }));

  const [leadPost, ...secondaryFeatured] = featuredPosts;

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            {blogStrategy.hero.eyebrow}
          </Tag>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
            {blogStrategy.hero.headline}
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            {blogStrategy.hero.subheadline}
          </Text>
        </div>

        <aside className={styles.heroAside}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{allBlogPosts.length.toString().padStart(2, "0")}</span>
            <Text onBackground="neutral-weak" variant="body-default-s">
              textos publicados
            </Text>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{categoryOptions.length.toString().padStart(2, "0")}</span>
            <Text onBackground="neutral-weak" variant="body-default-s">
              categorias e frentes editoriais
            </Text>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{tagOptions.length.toString().padStart(2, "0")}</span>
            <Text onBackground="neutral-weak" variant="body-default-s">
              tags para navegação discreta
            </Text>
          </div>
        </aside>
      </section>

      {leadPost && (
        <section className={styles.section}>
          <Row className={styles.sectionHeader} gap="12" wrap vertical="end">
            <Column className={styles.sectionCopy} gap="8">
              <Tag size="s" background="neutral-alpha-weak">
                Destaques
              </Tag>
              <Heading as="h2" variant="display-strong-s">
                Artigos em destaque
              </Heading>
              <Text onBackground="neutral-weak" variant="body-default-m">
                Abertura editorial para os textos que melhor representam o blog agora.
              </Text>
            </Column>
          </Row>

          <div className={styles.featuredGrid}>
            <Post post={toPostData(leadPost)} thumbnail variant="feature" priority showSummary />

            {secondaryFeatured.length > 0 && (
              <div className={styles.featuredSide}>
                {secondaryFeatured.map((post) => (
                  <Post key={post.slug} post={toPostData(post)} variant="compact" showSummary />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className={styles.section}>
          <Row className={styles.sectionHeader} gap="12" wrap vertical="end">
            <Column className={styles.sectionCopy} gap="8">
              <Tag size="s" background="neutral-alpha-weak">
                Recentes
              </Tag>
              <Heading as="h2" variant="display-strong-s">
                Leituras recentes
              </Heading>
              <Text onBackground="neutral-weak" variant="body-default-m">
                Os textos mais novos organizados para leitura rápida, como uma capa editorial.
              </Text>
            </Column>
          </Row>

          <Grid className={styles.recentGrid} columns="3" s={{ columns: 1 }} gap="16">
            {recentPosts.map((post, index) => (
              <Post
                key={post.slug}
                post={toPostData(post)}
                thumbnail
                direction="column"
                showSummary
                priority={index === 0}
              />
            ))}
          </Grid>
        </section>
      )}

      <section className={styles.trackGrid}>
        <div className={styles.trackPanel}>
          <div className={styles.trackHeader}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Negócios e marketing
            </Tag>
            <Heading as="h2" variant="heading-strong-xl">
              Conteúdo para negócios reais
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Presença digital, conversão, operação, aquisição e crescimento com leitura prática.
            </Text>
          </div>

          <div className={styles.trackList}>
            {businessPosts.map((post) => (
              <Post key={post.slug} post={toPostData(post)} variant="compact" showSummary />
            ))}
          </div>
        </div>

        <div className={styles.trackPanel}>
          <div className={styles.trackHeader}>
            <Tag size="s" background="neutral-alpha-weak">
              Pessoal
            </Tag>
            <Heading as="h2" variant="heading-strong-xl">
              Ensaios e repertório pessoal
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Leituras mais autorais sobre cultura, filosofia, sociedade e pensamento.
            </Text>
          </div>

          <div className={styles.trackList}>
            {personalPosts.map((post) => (
              <Post key={post.slug} post={toPostData(post)} variant="compact" showSummary />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.explorerSection}>
        <Row className={styles.sectionHeader} gap="12" wrap vertical="end">
          <Column className={styles.sectionCopy} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Arquivo
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Explore por trilha editorial
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Filtros discretos por categoria e tag para navegar sem poluir a experiência.
            </Text>
          </Column>
        </Row>

        <BlogExplorer posts={archivePosts} categories={categoryOptions} tags={tagOptions} />
      </section>

      <section className={styles.categorySummary}>
        {categoryOptions.slice(0, 6).map((category) => (
          <div className={styles.categorySummaryCard} key={category.key}>
            <Text className={styles.categorySummaryLabel} variant="label-default-s" onBackground="neutral-weak">
              {category.label}
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {categoryDescriptions[category.key] ??
                "Conteúdo agrupado para facilitar leitura, contexto e navegação por tema."}
            </Text>
          </div>
        ))}
      </section>
    </Column>
  );
}
