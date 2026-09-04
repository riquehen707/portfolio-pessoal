import { Column, Meta, Schema } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineLightBulb,
  HiOutlineRectangleStack,
} from "react-icons/hi2";

import {
  getAllBlogPosts,
  getBlogPrimaryCategory,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { HomeSearchTrigger } from "@/components/home/HomeSearchTrigger";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { creators } from "@/content/creators/creators";
import { readingCatalog } from "@/content/reading/reading";
import { getReadingWorkPath } from "@/content/reading/readingDomain";
import { baseURL, home, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";
import styles from "./page.module.scss";

const homePageTitle = "Histórias e ideias que valem a pena descobrir";
const homePageDescription =
  "Explore artigos, filmes, livros, quadrinhos, ideias e personalidades em um acervo editorial aberto.";
const entryPoints = [
  {
    href: "/filmes",
    label: "Filmes",
    detail: "Cinema e curadorias",
    icon: HiOutlineFilm,
  },
  {
    href: "/livros",
    label: "Livros",
    detail: "Obras e edições",
    icon: HiOutlineBookOpen,
  },
  {
    href: "/quadrinhos",
    label: "Quadrinhos",
    detail: "Mangás, HQs e mais",
    icon: HiOutlineRectangleStack,
  },
  {
    href: "/ideias",
    label: "Ideias",
    detail: "Projetos em aberto",
    icon: HiOutlineLightBulb,
  },
] as const;
const selectedDiscoveries = [
  { kind: "work", id: "read_work_burnout_society" },
  { kind: "work", id: "read_work_absolute_batman" },
  { kind: "person", id: "person_hannah_arendt" },
  { kind: "person", id: "person_carl_jung" },
] as const;
const selectedPeople = [
  "person_friedrich_nietzsche",
  "person_byung_chul_han",
  "person_agostinho_hipona",
];
const getCover = (workId: string) =>
  readingCatalog.editions.find(
    (edition) => edition.workId === workId && edition.cover,
  )?.cover;

export async function generateMetadata() {
  const image = buildOgImage(homePageTitle, "artigos, acervos e ideias");
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
    twitter: { ...metadata.twitter, images: [image] },
  };
}

export default function Home() {
  const posts = getAllBlogPosts();
  const recentPosts = getRecentBlogPosts(4, posts);
  const featuredWork = readingCatalog.works.find(
    (work) => work.id === "read_work_burnout_society",
  );
  const featuredCover = featuredWork ? getCover(featuredWork.id) : undefined;
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
            },
          ]
        : [];
    }
    const creator = creators.find(
      (item) => item.id === selection.id && item.status === "published",
    );
    return creator?.profilePath
      ? [
          {
            title: creator.name,
            label: creator.occupations[0] ?? "Personalidade",
            href: creator.profilePath,
            image: creator.image?.src,
            imageAlt: creator.image?.alt,
          },
        ]
      : [];
  });
  const people = selectedPeople.flatMap((id) => {
    const creator = creators.find(
      (item) => item.id === id && item.status === "published",
    );
    return creator?.profilePath ? [creator] : [];
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
      <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }]} />
      <section className={styles.intro} aria-labelledby="home-title">
        <span className={styles.eyebrow}>Biblioteca editorial aberta</span>
        <h1 id="home-title">
          Histórias, ideias e coisas que valem a pena descobrir.
        </h1>
        <p>
          Um acervo para encontrar um assunto, entender o contexto e continuar
          explorando.
        </p>
        <HomeSearchTrigger />
      </section>
      {featuredWork ? (
        <section className={styles.feature} aria-labelledby="feature-title">
          <div className={styles.featureCopy}>
            <span className={styles.eyebrow}>Destaque editorial</span>
            <h2 id="feature-title">
              {featuredWork.titleBr ?? featuredWork.originalTitle}
            </h2>
            <p>
              Como a exigência de produzir, melhorar e permanecer ativo pode
              transformar liberdade em autoexploração.
            </p>
            <Link href="/blog/sociedade-do-cansaco-resumo">
              Ler a análise <HiOutlineArrowRight aria-hidden="true" />
            </Link>
          </div>
          <Link
            className={styles.featureMedia}
            href={getReadingWorkPath(featuredWork)}
            aria-label={`Ver ${featuredWork.titleBr ?? featuredWork.originalTitle} no acervo`}
          >
            {featuredCover ? (
              <Image
                src={featuredCover.src}
                alt={featuredCover.alt}
                fill
                priority
                sizes="(max-width:700px) 42vw,320px"
              />
            ) : null}
          </Link>
        </section>
      ) : null}
      <nav className={styles.entryPoints} aria-label="Principais áreas do site">
        {entryPoints.map(({ href, label, detail, icon: Icon }) => (
          <Link href={href} key={href}>
            <Icon aria-hidden="true" />
            <span>
              <strong>{label}</strong>
              <small>{detail}</small>
            </span>
          </Link>
        ))}
      </nav>
      <section className={styles.section} aria-labelledby="discover-title">
        <header className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>Acervo</span>
            <h2 id="discover-title">Vale conhecer</h2>
          </div>
          <Link href="/acervo">
            Ver o acervo <HiOutlineArrowRight aria-hidden="true" />
          </Link>
        </header>
        <div className={styles.discoveryGrid}>
          {discoveries.map((item) => (
            <article className={styles.discoveryCard} key={item.href}>
              <Link href={item.href}>
                <span className={styles.discoveryMedia}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(max-width:520px) 44vw,240px"
                    />
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </span>
                <span className={styles.cardLabel}>{item.label}</span>
                <h3>{item.title}</h3>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="read-title">
        <header className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>Publicações</span>
            <h2 id="read-title">Leia agora</h2>
          </div>
          <Link href="/blog">
            Todos os artigos <HiOutlineArrowRight aria-hidden="true" />
          </Link>
        </header>
        <div className={styles.articleGrid}>
          {recentPosts.map((post, index) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <span className={styles.articleMedia}>
                  {post.metadata.image ? (
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.imageAlt ?? post.metadata.title}
                      fill
                      priority={index === 0}
                      unoptimized
                      sizes="(max-width:700px) 100vw,50vw"
                    />
                  ) : null}
                </span>
                <span className={styles.cardLabel}>
                  {getBlogPrimaryCategory(post)}
                </span>
                <h3>{post.metadata.title}</h3>
                <p>{post.metadata.summary}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="people-title">
        <header className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>Pessoas e ideias</span>
            <h2 id="people-title">Quem ajuda a pensar</h2>
          </div>
          <Link href="/personalidades">
            Ver personalidades <HiOutlineArrowRight aria-hidden="true" />
          </Link>
        </header>
        <div className={styles.peopleGrid}>
          {people.map((creator) => (
            <article key={creator.id}>
              <Link href={creator.profilePath!}>
                <span className={styles.personPortrait}>
                  {creator.image ? (
                    <Image
                      src={creator.image.src}
                      alt={creator.image.alt}
                      fill
                      sizes="(max-width:600px) 30vw,220px"
                    />
                  ) : null}
                </span>
                <h3>{creator.name}</h3>
                <p>{creator.occupations.slice(0, 2).join(" · ")}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Column>
  );
}
