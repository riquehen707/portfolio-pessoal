import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

import {
  getAllBlogPosts,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import {
  seoLibraryPath,
  understandSearchBookParts,
  understandSearchBookPath,
} from "@/app/blog/seo/seoLibraryData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, home, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

const homePageTitle = "Aprenda com mais organização";
const homePageDescription =
  "Guias, análises e explicações organizadas para ajudar você a entender um assunto, escolher um caminho e continuar aprendendo.";

const subjectAreas: Array<{
  number: string;
  title: string;
  description: string;
  state: string;
  href?: string;
}> = [
  {
    number: "01",
    title: "Trabalho e negócios",
    description:
      "Design, marketing, SEO, produção de conteúdo, negócios digitais e outras formas de trabalhar e construir renda pela internet.",
    state: "Conteúdos disponíveis",
    href: blog.path,
  },
  {
    number: "02",
    title: "Estudos acadêmicos",
    description:
      "Explicações e materiais sobre ciências exatas, tecnologia e assuntos estudados na universidade.",
    state: "Acervo em formação",
  },
  {
    number: "03",
    title: "Interesses pessoais",
    description:
      "Animes, mangás, animações, jogos e outros assuntos que fazem parte do repertório analisado neste site.",
    state: "Acervo em formação",
  },
];

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
  const image = buildOgImage("Aprenda com mais organização", "guias, análises e explicações");
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
  const feedPosts = getRecentBlogPosts(9, posts).map(toFeedPost);
  const bookChapterCount = understandSearchBookParts.flatMap((part) => part.chapters).length;

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

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroFolio}>
          <span className={styles.brandSquare} aria-hidden="true" />
          <span>henrique.dog</span>
          <span>Biblioteca aberta · edição contínua</span>
        </div>

        <div className={styles.heroBody}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Um ponto de partida para continuar aprendendo</span>
            <Heading
              as="h1"
              className={styles.heroTitle}
              id="home-title"
              variant="display-strong-l"
            >
              Aprenda sem precisar descobrir sozinho por onde começar.
            </Heading>
            <Text className={styles.heroLead} onBackground="neutral-weak">
              Guias, análises e explicações organizadas para ajudar você a entender um assunto,
              escolher um caminho e continuar aprendendo.
            </Text>
            <Link className={styles.primaryAction} href="#assuntos">
              Explorar assuntos
              <HiOutlineArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.heroIndex} aria-label="Formas de explorar o site">
            <span>Pesquisar</span>
            <i aria-hidden="true" />
            <span>Organizar</span>
            <i aria-hidden="true" />
            <span>Explicar</span>
          </div>

          <aside className={styles.heroNote}>
            <span>Nota editorial</span>
            <p>Encontrar um caminho claro importa mais do que acumular informação.</p>
          </aside>
        </div>

        <div className={styles.heroFootnote}>
          <span>{String(posts.length).padStart(2, "0")} publicações</span>
          <span>Guias · análises · explicações</span>
        </div>
      </section>

      <section className={styles.introduction} aria-labelledby="introduction-title">
        <span className={styles.kicker}>Sobre este lugar</span>
        <div>
          <Heading id="introduction-title" as="h2" className={styles.sectionTitle}>
            Um lugar para aprender com mais organização.
          </Heading>
          <p>
            Este site começou como uma forma de organizar estudos e facilitar revisões. Com o tempo,
            também se tornou um espaço para compartilhar esses caminhos com quem tem os mesmos
            interesses.
          </p>
          <p>
            O que conecta os assuntos não é um tema único, mas uma forma de trabalhar o conteúdo:
            pesquisar, organizar e explicar.
          </p>
        </div>
      </section>

      <section className={styles.booksSection} aria-labelledby="books-title">
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>Comece por aqui</span>
          <Heading id="books-title" as="h2" className={styles.sectionTitle}>
            Guias completos em uma ordem que faça sentido.
          </Heading>
        </div>

        <Link className={styles.bookFeature} href={understandSearchBookPath}>
          <div className={styles.bookIdentity}>
            <span>Biblioteca de SEO · Livro 01</span>
            <strong>Entender a busca</strong>
            <p>
              Como mecanismos de busca encontram, interpretam e escolhem conteúdos antes de qualquer
              otimização.
            </p>
            <span className={styles.bookAction}>
              Abrir o sumário
              <HiOutlineArrowRight aria-hidden="true" />
            </span>
          </div>
          <div className={styles.bookMap} aria-hidden="true">
            <span>descoberta</span>
            <span>escolha</span>
            <span>estrutura</span>
            <strong>{String(bookChapterCount).padStart(2, "0")}</strong>
            <small>capítulos e leituras no mapa editorial</small>
          </div>
        </Link>

        <Link className={styles.libraryLink} href={seoLibraryPath}>
          Conhecer a Biblioteca de SEO
          <HiOutlineArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className={styles.subjectsSection} id="assuntos" aria-labelledby="subjects-title">
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>Áreas principais</span>
          <Heading id="subjects-title" as="h2" className={styles.sectionTitle}>
            Explore por assunto.
          </Heading>
        </div>

        <div className={styles.subjectList}>
          {subjectAreas.map((area) => {
            const content = (
              <>
                <span className={styles.subjectNumber}>{area.number}</span>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
                <span className={styles.subjectState}>{area.state}</span>
              </>
            );

            return area.href ? (
              <Link
                className={`${styles.subject} ${styles.subjectLink}`}
                href={area.href}
                key={area.title}
              >
                {content}
              </Link>
            ) : (
              <article className={styles.subject} key={area.title}>
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.feedSection} id="publicacoes" aria-labelledby="recent-title">
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>Arquivo em movimento</span>
          <Heading id="recent-title" as="h2" className={styles.sectionTitle}>
            Publicações recentes
          </Heading>
        </div>
        <EditorialFeed posts={feedPosts} initialCount={6} step={3} />
      </section>

      <section className={styles.positioning} aria-labelledby="positioning-title">
        <span className={styles.positioningMark} aria-hidden="true">
          ≠
        </span>
        <div>
          <span className={styles.kicker}>Posicionamento editorial</span>
          <Heading id="positioning-title" as="h2" className={styles.sectionTitle}>
            Não existe um único caminho que funciona para todo mundo.
          </Heading>
        </div>
        <div className={styles.positioningCopy}>
          <p>
            Os conteúdos são pesquisados e organizados para oferecer um ponto de partida mais claro.
            Isso não significa que sejam a única forma de fazer alguma coisa — nem que seguir cada
            etapa garanta um resultado.
          </p>
          <p>
            A proposta é tornar o caminho mais compreensível e ajudar você a decidir com mais
            critério. Os resultados ainda dependem de prática, consistência, contexto e tempo.
          </p>
        </div>
      </section>

      <section className={styles.archive} aria-labelledby="archive-title">
        <div>
          <span className={styles.kicker}>Arquivo</span>
          <Heading id="archive-title" as="h2" className={styles.sectionTitle}>
            Encontre o que procura.
          </Heading>
          <p>Veja todas as publicações ou continue navegando pelas áreas de interesse.</p>
        </div>
        <Link className={styles.archiveAction} href={blog.path}>
          Ver todas as publicações
          <HiOutlineArrowRight aria-hidden="true" />
        </Link>
      </section>
    </Column>
  );
}
