import { Column, Meta, Schema } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineRectangleStack,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

import {
  getAllBlogPosts,
  getBlogPrimaryCategory,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { creators } from "@/content/creators/creators";
import { readingCatalog } from "@/content/reading/reading";
import { getReadingWorkPath } from "@/content/reading/readingDomain";
import { baseURL, home, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

const homePageTitle =
  "Histórias, ideias e referências que valem a pena descobrir";

const homePageDescription =
  "Explore artigos, livros, filmes, quadrinhos, pessoas, ferramentas e projetos em um espaço editorial aberto.";

const entryPoints = [
  {
    href: "/blog",
    label: "Leituras",
    detail: "Artigos, análises e guias",
    analyticsId: "readings",
    icon: HiOutlineBookOpen,
  },
  {
    href: "/acervo",
    label: "Coleções",
    detail: "Obras, filmes e quadrinhos",
    analyticsId: "collections",
    icon: HiOutlineRectangleStack,
  },
  {
    href: "/ferramentas",
    label: "Ferramentas",
    detail: "Recursos para usar",
    analyticsId: "tools",
    icon: HiOutlineWrenchScrewdriver,
  },
  {
    href: "/ideias",
    label: "Projetos",
    detail: "Experimentos em construção",
    analyticsId: "projects",
    icon: HiOutlineLightBulb,
  },
] as const;

const selectedDiscoveries = [
  {
    kind: "work",
    id: "read_work_absolute_batman",
  },
  {
    kind: "person",
    id: "person_hannah_arendt",
  },
  {
    kind: "person",
    id: "person_carl_jung",
  },
  {
    kind: "person",
    id: "person_friedrich_nietzsche",
  },
] as const;

const getCover = (workId: string) =>
  readingCatalog.editions.find(
    (edition) => edition.workId === workId && edition.cover,
  )?.cover;

export async function generateMetadata() {
  const image = buildOgImage(
    homePageTitle,
    "artigos, coleções, ferramentas e ideias",
  );

  const metadata = Meta.generate({
    title: homePageTitle,
    description: homePageDescription,
    baseURL,
    image,
    path: home.path,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: buildDiscoverImageMetadata(image, homePageTitle),
    },
    twitter: {
      ...metadata.twitter,
      images: [image],
    },
  };
}

export default function Home() {
  const posts = getAllBlogPosts();
  const recentPosts = getRecentBlogPosts(4, posts);

  const [leadPost, ...secondaryPosts] = recentPosts;

  const featuredWork = readingCatalog.works.find(
    (work) => work.id === "read_work_burnout_society",
  );

  const featuredCover = featuredWork
    ? getCover(featuredWork.id)
    : undefined;

  const discoveries = selectedDiscoveries.flatMap((selection) => {
    if (selection.kind === "work") {
      const work = readingCatalog.works.find(
        (item) => item.id === selection.id,
      );

      const cover = work ? getCover(work.id) : undefined;

      return work
        ? [
            {
              title: work.titleBr ?? work.originalTitle,
              label: work.comicTradition ? "Quadrinho" : "Livro",
              href: getReadingWorkPath(work),
              image: cover?.src,
              imageAlt: cover?.alt,
              analyticsType: work.comicTradition ? "comic" : "book",
            },
          ]
        : [];
    }

    const creator = creators.find(
      (item) =>
        item.id === selection.id &&
        item.status === "published",
    );

    return creator?.profilePath
      ? [
          {
            title: creator.name,
            label: creator.occupations[0] ?? "Personalidade",
            href: creator.profilePath,
            image: creator.image?.src,
            imageAlt: creator.image?.alt,
            analyticsType: "person",
          },
        ]
      : [];
  });

  return (
    <Column className={styles.page} fillWidth>
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

      <BreadcrumbJsonLd
        items={[
          {
            name: "Início",
            url: baseURL,
          },
        ]}
      />

      <HeroShowcase />

      <nav
        className={styles.entryPoints}
        aria-label="Principais áreas do site"
      >
        {entryPoints.map(
          ({
            href,
            label,
            detail,
            analyticsId,
            icon: Icon,
          }) => (
            <Link
              href={href}
              key={href}
              data-analytics="home-entry-point"
              data-destination={analyticsId}
            >
              <span className={styles.entryIcon}>
                <Icon aria-hidden="true" />
              </span>

              <span className={styles.entryCopy}>
                <strong>{label}</strong>
                <small>{detail}</small>
              </span>

              <HiOutlineArrowRight
                className={styles.entryArrow}
                aria-hidden="true"
              />
            </Link>
          ),
        )}
      </nav>

      {featuredWork ? (
        <section
          className={styles.feature}
          aria-labelledby="feature-title"
        >
          <div className={styles.featureCopy}>
            <span className={styles.featureEyebrow}>
              Destaque editorial
            </span>

            <h2 id="feature-title">
              {featuredWork.titleBr ??
                featuredWork.originalTitle}
            </h2>

            <p>
              Como a exigência de produzir, melhorar e
              permanecer ativo pode transformar liberdade em
              autoexploração.
            </p>

            <Link
              href="/blog/sociedade-do-cansaco-resumo"
              className={styles.featureAction}
              data-analytics="home-featured"
              data-content-type="article"
              data-content-id="sociedade-do-cansaco-resumo"
            >
              Ler a análise
              <HiOutlineArrowRight aria-hidden="true" />
            </Link>
          </div>

          <Link
            className={styles.featureMedia}
            href={getReadingWorkPath(featuredWork)}
            aria-label={`Ver ${
              featuredWork.titleBr ??
              featuredWork.originalTitle
            } no acervo`}
            data-analytics="home-featured"
            data-content-type="book"
            data-content-id={featuredWork.id}
          >
            {featuredCover ? (
              <Image
                src={featuredCover.src}
                alt={featuredCover.alt}
                fill
                priority
                sizes="(max-width: 700px) 100vw, 420px"
              />
            ) : null}
          </Link>
        </section>
      ) : null}

      <section
        className={styles.section}
        aria-labelledby="discover-title"
      >
        <header className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>
              Explore
            </span>

            <h2 id="discover-title">
              Vale conhecer
            </h2>
          </div>

          <Link
            href="/acervo"
            className={styles.sectionAction}
            data-analytics="home-section-link"
            data-destination="collections"
          >
            Ver coleções
            <HiOutlineArrowRight aria-hidden="true" />
          </Link>
        </header>

        <div className={styles.discoveryGrid}>
          {discoveries.map((item) => (
            <article
              className={styles.discoveryCard}
              key={item.href}
            >
              <Link
                href={item.href}
                data-analytics="home-discovery"
                data-content-type={item.analyticsType}
                data-content-title={item.title}
              >
                <span className={styles.discoveryMedia}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(max-width: 600px) 46vw, 260px"
                    />
                  ) : (
                    <span
                      className={styles.mediaFallback}
                      aria-hidden="true"
                    />
                  )}
                </span>

                <span className={styles.cardLabel}>
                  {item.label}
                </span>

                <h3>{item.title}</h3>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {leadPost ? (
        <section
          className={styles.section}
          aria-labelledby="read-title"
        >
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>
                Publicações
              </span>

              <h2 id="read-title">
                Leia agora
              </h2>
            </div>

            <Link
              href="/blog"
              className={styles.sectionAction}
              data-analytics="home-section-link"
              data-destination="readings"
            >
              Todas as leituras
              <HiOutlineArrowRight aria-hidden="true" />
            </Link>
          </header>

          <div className={styles.articleEditorial}>
            <article className={styles.leadArticle}>
              <Link
                href={`/blog/${leadPost.slug}`}
                data-analytics="home-article"
                data-content-id={leadPost.slug}
                data-position="1"
              >
                <span className={styles.leadMedia}>
                  {leadPost.metadata.image ? (
                    <Image
                      src={leadPost.metadata.image}
                      alt={
                        leadPost.metadata.imageAlt ??
                        leadPost.metadata.title
                      }
                      fill
                      unoptimized
                      sizes="(max-width: 760px) 100vw, 66vw"
                    />
                  ) : null}
                </span>

                <span className={styles.cardLabel}>
                  {getBlogPrimaryCategory(leadPost)}
                </span>

                <h3>{leadPost.metadata.title}</h3>

                <p>{leadPost.metadata.summary}</p>

                <span className={styles.readMore}>
                  Continuar lendo
                  <HiOutlineArrowRight
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </article>

            <div
              className={styles.articleList}
              aria-label="Mais publicações recentes"
            >
              {secondaryPosts.map(
                (post, index) => (
                  <article
                    className={styles.compactArticle}
                    key={post.slug}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      data-analytics="home-article"
                      data-content-id={post.slug}
                      data-position={index + 2}
                    >
                      <span
                        className={
                          styles.compactMeta
                        }
                      >
                        {getBlogPrimaryCategory(post)}
                      </span>

                      <h3>
                        {post.metadata.title}
                      </h3>

                      <p>
                        {post.metadata.summary}
                      </p>

                      <span
                        className={
                          styles.compactArrow
                        }
                      >
                        <HiOutlineArrowRight
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </article>
                ),
              )}

              <Link
                href="/blog"
                className={styles.allArticles}
                data-analytics="home-section-link"
                data-destination="readings"
              >
                Explorar todas as leituras
                <HiOutlineArrowRight
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </Column>
  );
}