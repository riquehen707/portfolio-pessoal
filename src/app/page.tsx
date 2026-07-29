import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
  HiOutlineBookOpen,
  HiOutlineMegaphone,
  HiOutlinePaintBrush,
  HiOutlineSquares2X2,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

import {
  blogEntryCategories,
  getAllBlogPosts,
  getBlogCollectionIndex,
  getBlogEntryCategoryIndex,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getFeaturedHomeBlogPost,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, home, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

const homePageTitle = "Painel editorial de aprendizado";
const homePageDescription =
  "Um arquivo organizado para estudar marketing, design, conteúdo, ferramentas e decisões práticas de presença digital.";

const categoryIcons = {
  criar: HiOutlinePaintBrush,
  vender: HiOutlineMegaphone,
  estudar: HiOutlineAcademicCap,
  ferramentas: HiOutlineWrenchScrewdriver,
} as const;

const seriesCards = [
  {
    title: "Aprendendo SEO do zero",
    description: "Testes práticos para entender busca, palavras-chave, páginas úteis e tráfego.",
    href: "/blog/categorias/vender",
    progressLabel: "3 de 10 posts",
    progress: 3,
    total: 10,
  },
  {
    title: "Design para iniciantes",
    description: "Critérios simples para ler interfaces, melhorar cards, ritmo visual e hierarquia.",
    href: "/blog/categorias/criar",
    progressLabel: "4 de 8 notas",
    progress: 4,
    total: 8,
  },
  {
    title: "Ferramentas que estou testando",
    description: "Rotinas, canais e tecnologia para publicar, organizar ideias e acompanhar resultados.",
    href: "/blog/categorias/ferramentas",
    progressLabel: "2 de 7 testes",
    progress: 2,
    total: 7,
  },
] as const;

const referenceCards = [
  {
    label: "Repertório",
    title: "Interfaces simples costumam esconder boas decisões.",
    text: "Notas sobre ritmo, densidade, contraste e detalhes que deixam uma tela menos cansativa.",
  },
  {
    label: "Criatividade",
    title: "Referência boa não vira cópia: vira critério.",
    text: "Como observar linguagem visual, intenção e contexto antes de transformar inspiração em solução.",
  },
  {
    label: "Prática",
    title: "Projetos pequenos mostram problemas grandes com nitidez.",
    text: "O que sites, páginas e fluxos enxutos revelam sobre oferta, atendimento e decisão.",
  },
] as const;

function postHref(slug: string) {
  return `${blog.path}/${slug}`;
}

function toFeedPost(post: ReturnType<typeof getAllBlogPosts>[number]): EditorialFeedPost {
  return {
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    image: post.metadata.image,
    imageAlt: post.metadata.imageAlt,
    category: getBlogPrimaryCategory(post),
    format: getBlogPostFormat(post),
    readingTime: post.metadata.readingTime,
    publishedAt: post.metadata.updatedAt ?? post.metadata.publishedAt,
  };
}

export async function generateMetadata() {
  const image = buildOgImage("Painel editorial", "design, marketing e aprendizado prático");
  const generatedMeta = Meta.generate({
    title: homePageTitle,
    description: homePageDescription,
    baseURL,
    image,
    path: home.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, homePageTitle),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function Home() {
  const posts = getAllBlogPosts();
  const featuredPost = getFeaturedHomeBlogPost(posts);
  const recentPosts = getRecentBlogPosts(14, posts);
  const feedPosts = recentPosts
    .filter((post) => post.slug !== featuredPost?.slug)
    .slice(0, 9)
    .map(toFeedPost);
  const timelinePosts = recentPosts
    .filter((post) => post.slug !== featuredPost?.slug)
    .slice(0, 5);
  const entryCategories = getBlogEntryCategoryIndex(posts);
  const collections = getBlogCollectionIndex(posts).slice(0, 6);
  const totalReadingTime = posts.reduce((total, post) => total + (post.metadata.readingTime ?? 0), 0);
  const averageReadingTime = posts.length ? Math.max(1, Math.round(totalReadingTime / posts.length)) : 0;

  return (
    <Column className={styles.page} fillWidth gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={homePageTitle}
        description={homePageDescription}
        path={home.path}
        author={{
          name: person.name,
          url: baseURL,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }]} />

      <section className={styles.workspace} aria-labelledby="home-title">
        <div className={styles.workspaceHeader}>
          <span className={styles.brandSquare} aria-hidden="true" />
          <span>henrique.dog</span>
          <span>Painel editorial de aprendizado</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroIntro}>
            <div className={styles.heroMeta}>
              <span>Blog editorial</span>
              <span>Dashboard leve</span>
              <span>Caderno digital</span>
            </div>
            <Heading as="h1" className={styles.heroTitle} id="home-title" variant="display-strong-l">
              Um lugar para estudar, testar e compartilhar descobertas práticas.
            </Heading>
            <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
              Marketing, design, conteúdo e ferramentas organizados em cards para você entrar por
              tema, acompanhar séries e abrir leituras curtas sem cair em texto solto.
            </Text>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href={blog.path}>
                Comece pelo blog
                <HiOutlineArrowRight />
              </Link>
              <Link className={styles.secondaryAction} href="#categorias">
                Ver categorias
              </Link>
            </div>
          </div>

          <aside className={styles.heroBoard} aria-label="Resumo do arquivo">
            <div className={styles.boardCard}>
              <span>Arquivo</span>
              <strong>{posts.length}</strong>
              <p>artigos publicados para consulta rápida.</p>
            </div>
            <div className={styles.boardCard}>
              <span>Entrada</span>
              <strong>{entryCategories.length}</strong>
              <p>categorias principais para reduzir confusão.</p>
            </div>
            <div className={styles.boardCard}>
              <span>Leitura média</span>
              <strong>{averageReadingTime} min</strong>
              <p>conteúdo curto para estudar sem perder ritmo.</p>
            </div>
            <div className={styles.boardNote}>
              <HiOutlineSquares2X2 />
              <span>Todo conteúdo entra no mesmo sistema: artigo, categoria, série ou destaque.</span>
            </div>
          </aside>
        </div>
      </section>

      {featuredPost ? (
        <section className={styles.featuredSection} id="destaque">
          <div className={styles.sectionHeader}>
            <Text
              className={styles.sectionLabel}
              variant="label-default-s"
              onBackground="neutral-weak"
            >
              Card de destaque
            </Text>
            <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
              Uma leitura para abrir o arquivo.
            </Heading>
          </div>

          <Link className={styles.featuredCard} href={postHref(featuredPost.slug)}>
            <span className={styles.featuredContent}>
              <span className={styles.featuredType}>{getBlogPrimaryCategory(featuredPost)}</span>
              <span className={styles.featuredTitle}>{featuredPost.metadata.title}</span>
              {featuredPost.metadata.summary ? (
                <span className={styles.featuredText}>{featuredPost.metadata.summary}</span>
              ) : null}
              <span className={styles.featuredMeta}>
                {featuredPost.metadata.publishedAt
                  ? formatDate(featuredPost.metadata.publishedAt, false)
                  : "Sem data"}
                {featuredPost.metadata.readingTime
                  ? ` · ${featuredPost.metadata.readingTime} min de leitura`
                  : ""}
              </span>
              <span className={styles.featuredAction}>
                Ler artigo
                <HiOutlineArrowRight />
              </span>
            </span>

            <span className={styles.featuredMedia}>
              {featuredPost.metadata.image ? (
                <Image
                  src={featuredPost.metadata.image}
                  alt={featuredPost.metadata.imageAlt ?? featuredPost.metadata.title}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              ) : (
                <span className={styles.featuredFallback} aria-hidden="true" />
              )}
            </span>
          </Link>
        </section>
      ) : null}

      <section className={styles.categorySection} id="categorias">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Cards de categoria
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
            Quatro portas de entrada para navegar sem esforço.
          </Heading>
        </div>

        <div className={styles.categoryGrid}>
          {entryCategories.map((category) => {
            const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] ?? HiOutlineBookOpen;

            return (
              <Link
                className={styles.categoryCard}
                href={`${blog.path}/categorias/${category.slug}`}
                key={category.slug}
              >
                <span className={styles.categoryIcon}>
                  <Icon />
                </span>
                <strong>{category.label}</strong>
                <span className={styles.categoryDescription}>
                  {blogEntryCategories[category.slug as keyof typeof blogEntryCategories]?.description ??
                    category.description}
                </span>
                <span className={styles.categoryFooter}>
                  {category.count} artigo{category.count === 1 ? "" : "s"}
                  <HiOutlineArrowRight />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.seriesSection} id="series">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Cards de série
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
            Trilhas simples para estudar temas por blocos.
          </Heading>
        </div>

        <div className={styles.seriesGrid}>
          {seriesCards.map((series) => (
            <Link className={styles.seriesCard} href={series.href} key={series.title}>
              <strong>{series.title}</strong>
              <span>{series.description}</span>
              <span className={styles.seriesProgress}>
                <span className={styles.seriesProgressHeader}>
                  {series.progressLabel}
                  <HiOutlineArrowRight />
                </span>
                <span className={styles.seriesProgressBar} aria-hidden="true">
                  {Array.from({ length: series.total }).map((_, index) => (
                    <span
                      className={index < series.progress ? styles.seriesStepActive : undefined}
                      key={`${series.title}-${index}`}
                    />
                  ))}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.feedSection} id="artigos">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Cards de artigo
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
            Leituras recentes em blocos limpos.
          </Heading>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Cada card mostra imagem, categoria, tempo de leitura, título e resumo curto para decidir
            rápido o que abrir.
          </Text>
        </div>
        <EditorialFeed posts={feedPosts} initialCount={6} step={3} />
      </section>

      <section className={styles.studySection} id="estudos">
        <div className={styles.collectionsPanel}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Áreas de estudo
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
            Assuntos organizados por contexto.
          </Heading>
          <div className={styles.collectionGrid}>
            {collections.map((collection) => (
              <Link
                className={styles.collectionCard}
                href={`${blog.path}/temas/${collection.slug}`}
                key={collection.slug}
              >
                <span>{collection.label}</span>
                <strong>
                  {collection.count} artigo{collection.count === 1 ? "" : "s"}
                </strong>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.timelinePanel}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Linha do tempo
          </Text>
          <div className={styles.timelineList}>
            {timelinePosts.map((post) => (
              <Link className={styles.timelineItem} href={postHref(post.slug)} key={post.slug}>
                <span className={styles.timelineDate}>
                  {post.metadata.publishedAt
                    ? formatDate(post.metadata.publishedAt, false)
                    : "Sem data"}
                </span>
                <span className={styles.timelineTitle}>{post.metadata.title}</span>
                <span className={styles.timelineCategory}>{getBlogPrimaryCategory(post)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.referenceSection} id="repertorio">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Caderno criativo
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
            Repertório sem atrapalhar a leitura.
          </Heading>
        </div>

        <div className={styles.referenceGrid}>
          {referenceCards.map((card) => (
            <article className={styles.referenceCard} key={card.title}>
              <span>{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </Column>
  );
}
