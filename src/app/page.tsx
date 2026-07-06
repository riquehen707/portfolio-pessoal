import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";

import {
  getAllBlogPosts,
  getBlogCollectionIndex,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, home, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./blog/blog.module.scss";

const homePageTitle = "Arquivo editorial";
const homePageDescription =
  "Textos sobre marketing, design, produto, repertório visual e prática profissional.";

const referenceCards = [
  {
    label: "Repertório",
    title: "Interfaces que parecem simples porque escondem boas decisões.",
    text: "Notas sobre ritmo, densidade, contraste e o tipo de detalhe que faz uma tela cansar menos.",
  },
  {
    label: "Criatividade",
    title: "Referência boa não vira cópia: vira critério.",
    text: "Como observar linguagem visual, intenção e contexto antes de transformar inspiração em solução.",
  },
  {
    label: "Profissional",
    title: "Projetos pequenos mostram problemas grandes com mais nitidez.",
    text: "O que sites, páginas e fluxos enxutos revelam sobre oferta, atendimento e decisão.",
  },
] as const;

const projectNotes = [
  "UI/UX para blogs, sites e páginas de aquisição",
  "Estrutura editorial para conteúdo encontrável",
  "Sistemas visuais leves para publicar com consistência",
] as const;

function postHref(slug: string) {
  return `${blog.path}/${slug}`;
}

function toFeedPost(post: ReturnType<typeof getAllBlogPosts>[number]): EditorialFeedPost {
  return {
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    category: getBlogPrimaryCategory(post),
    format: getBlogPostFormat(post),
    readingTime: post.metadata.readingTime,
    publishedAt: post.metadata.updatedAt ?? post.metadata.publishedAt,
  };
}

export async function generateMetadata() {
  const image = buildOgImage("Arquivo editorial", "design, marketing e repertório");
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
  const recentPosts = getRecentBlogPosts(14, posts);
  const [featuredPost, ...remainingPosts] = recentPosts;
  const timelinePosts = remainingPosts.slice(0, 5);
  const feedPosts = remainingPosts.slice(0, 8).map(toFeedPost);
  const topics = getBlogCollectionIndex(posts).slice(0, 8);

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

      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <div className={styles.heroMeta}>
            <span>Arquivo vivo</span>
            <span>UI/UX, conteúdo e presença digital</span>
          </div>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
            Ideias práticas para interfaces, conteúdo e negócios digitais.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Um blog autoral para registrar observações, decisões de projeto, repertório visual e
            aprendizados de trabalho.
          </Text>
          <nav className={styles.heroNav} aria-label="Atalhos">
            <a href="#textos">Textos</a>
            <a href="#linha-do-tempo">Linha do tempo</a>
            <a href="#editorias">Editorias</a>
            <a href="#repertorio">Repertório</a>
          </nav>
        </div>
      </section>

      {featuredPost ? (
        <section className={styles.featuredSection} id="textos">
          <div className={styles.sectionHeader}>
            <Text
              className={styles.sectionLabel}
              variant="label-default-s"
              onBackground="neutral-weak"
            >
              Destaque
            </Text>
          </div>

          <Link className={styles.featuredCard} href={postHref(featuredPost.slug)}>
            <span className={styles.featuredType}>{getBlogPrimaryCategory(featuredPost)}</span>
            <Heading as="h2" className={styles.featuredHeading} variant="display-strong-s">
              {featuredPost.metadata.title}
            </Heading>
            {featuredPost.metadata.summary ? (
              <Text
                className={styles.featuredText}
                onBackground="neutral-weak"
                variant="body-default-m"
              >
                {featuredPost.metadata.summary}
              </Text>
            ) : null}
            <span className={styles.featuredMeta}>
              {featuredPost.metadata.publishedAt
                ? formatDate(featuredPost.metadata.publishedAt, false)
                : "Sem data"}
              {featuredPost.metadata.readingTime
                ? ` / ${featuredPost.metadata.readingTime} min`
                : ""}
            </span>
          </Link>
        </section>
      ) : null}

      <section className={styles.feedSection}>
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Recentes
          </Text>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Leituras curtas para revisar uma decisão antes de abrir uma campanha, redesenhar uma
            página ou publicar mais conteúdo.
          </Text>
        </div>
        <EditorialFeed posts={feedPosts} initialCount={4} step={4} />
      </section>

      <section className={styles.timelineSection} id="linha-do-tempo">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Linha do tempo
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
            O arquivo em ordem de publicação.
          </Heading>
        </div>
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

      <section className={styles.startSection} id="editorias">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Editorias
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
            Assuntos para entrar pelo problema.
          </Heading>
        </div>
        <div className={styles.startGrid}>
          {topics.map((topic) => (
            <Link
              className={styles.startCard}
              href={`${blog.path}/temas/${topic.slug}`}
              key={topic.slug}
            >
              <div className={styles.startCopy}>
                <Heading as="h3" className={styles.startTitle} variant="heading-strong-m">
                  {topic.label}
                </Heading>
                <Text
                  className={styles.startSummary}
                  onBackground="neutral-weak"
                  variant="body-default-s"
                >
                  {topic.description || `${topic.count} artigo${topic.count === 1 ? "" : "s"}`}
                </Text>
              </div>
              <span className={styles.topicCount}>
                {topic.count} artigo{topic.count === 1 ? "" : "s"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.splitSection} id="profissional">
        <div className={styles.projectCard}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Profissional
          </Text>
          <Heading as="h2" className={styles.sectionTitle} variant="heading-strong-xl">
            Design, conteúdo e produto como uma mesma conversa.
          </Heading>
          <ul className={styles.noteList}>
            {projectNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className={styles.referenceGrid} id="repertorio">
          {referenceCards.map((card) => (
            <article className={styles.referenceCard} key={card.title}>
              <span>{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.followSection} id="sobre">
        <div>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Acompanhar
          </Text>
          <Heading as="h2" className={styles.followTitle} variant="heading-strong-xl">
            Salve o arquivo para voltar quando estiver decidindo com calma.
          </Heading>
        </div>
        <div className={styles.followActions}>
          <Link href="/rss.xml">RSS</Link>
          <Link href="/blog">Todos os textos</Link>
        </div>
      </section>
    </Column>
  );
}
