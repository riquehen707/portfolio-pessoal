import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

import {
  getAllBlogPosts,
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

const homePageTitle = "Arquivo editorial";
const homePageDescription =
  "Um arquivo organizado para estudar marketing, design, conteúdo, ferramentas e decisões práticas de presença digital.";

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
  const image = buildOgImage("Arquivo editorial", "design, conteúdo e decisões práticas");
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
  const timelinePosts = recentPosts.filter((post) => post.slug !== featuredPost?.slug).slice(0, 5);
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

      <section className={styles.editorialHero} aria-labelledby="home-title">
        <div className={styles.heroFolio}>
          <span className={styles.brandSquare} aria-hidden="true" />
          <span>henrique.dog</span>
          <span>arquivo autoral · edição contínua</span>
        </div>

        <div className={styles.heroComposition}>
          <span className={`${styles.orbitWord} ${styles.orbitWordLeft}`} aria-hidden="true">
            observar
          </span>
          <span className={`${styles.orbitWord} ${styles.orbitWordRight}`} aria-hidden="true">
            publicar
          </span>
          <span className={styles.heroReticle} aria-hidden="true" />

          <div className={styles.heroCopy}>
            <span className={styles.heroKicker}>Notas sobre o que faz uma ideia funcionar</span>
            <Heading
              as="h1"
              className={styles.heroTitle}
              id="home-title"
              variant="display-strong-l"
            >
              Ler o digital com mais critério.
            </Heading>
            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
            >
              Ensaios e guias sobre interfaces, conteúdo e decisões práticas — escritos enquanto as
              perguntas ainda estão vivas.
            </Text>
            <Link className={styles.primaryAction} href={blog.path}>
              Abrir o arquivo
              <HiOutlineArrowRight />
            </Link>
          </div>

          <div className={styles.heroFragments} aria-label="Fragmentos do arquivo editorial">
            <div className={styles.featureFragment}>
              <span className={styles.fragmentIndex}>em destaque · 01</span>
              <strong>
                {featuredPost?.metadata.title ?? "Uma leitura para começar o arquivo."}
              </strong>
              <span className={styles.fragmentRule} aria-hidden="true" />
              <p>
                {featuredPost?.metadata.summary ??
                  "Uma nota aberta sobre presença digital, linguagem e decisões de projeto."}
              </p>
            </div>

            <aside className={styles.marginNote}>
              <span>nota à margem</span>
              <p>Referência boa não vira cópia. Vira pergunta, corte e critério.</p>
            </aside>

            <div className={styles.editorialMarks} aria-hidden="true">
              <span>texto</span>
              <i />
              <span>interface</span>
              <i />
              <span>repertório</span>
            </div>
          </div>
        </div>

        <div className={styles.heroFootnote}>
          <span>{String(posts.length).padStart(2, "0")} textos publicados</span>
          <span>design · conteúdo · trabalho</span>
          <span>São Paulo, BR</span>
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

      <section className={styles.timelinePanel} id="linha-do-tempo">
        <Text className={styles.sectionLabel} variant="label-default-s" onBackground="neutral-weak">
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
