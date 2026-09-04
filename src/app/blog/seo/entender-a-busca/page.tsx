import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

import {
  seoLibraryPath,
  understandSearchBookParts,
  understandSearchBookPath,
} from "@/app/blog/seo/seoLibraryData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./book.module.scss";

const pageTitle = "Entender a busca";
const pageDescription =
  "O primeiro livro da Biblioteca de SEO: uma formação progressiva sobre descoberta, indexação, intenção, classificação e arquitetura.";

export async function generateMetadata() {
  const image = buildOgImage(pageTitle, "Livro 1 da Biblioteca de SEO");
  const generatedMeta = Meta.generate({
    title: pageTitle,
    description: pageDescription,
    baseURL,
    image,
    path: understandSearchBookPath,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, pageTitle),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function UnderstandSearchBookPage() {
  const plannedChapters = understandSearchBookParts.flatMap((part) =>
    part.chapters.filter((chapter) => chapter.status === "planned"),
  ).length;
  const complementaryReadings = understandSearchBookParts.flatMap((part) =>
    part.chapters.filter((chapter) => chapter.status === "complementary"),
  ).length;

  return (
    <Column className={styles.page} fillWidth gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={pageTitle}
        description={pageDescription}
        path={understandSearchBookPath}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
          { name: "Biblioteca de SEO", url: `${baseURL}${seoLibraryPath}` },
          { name: pageTitle, url: `${baseURL}${understandSearchBookPath}` },
        ]}
      />

      <header className={styles.hero}>
        <nav className={styles.heroNav} aria-label="Navegação do livro">
          <Link href={seoLibraryPath}>
            <HiOutlineArrowLeft aria-hidden="true" />
            Biblioteca de SEO
          </Link>
          <span>Livro 01 · edição em construção</span>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Livro 01</span>
            <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
              Entender a busca
            </Heading>
            <Text className={styles.heroLead} variant="heading-default-m">
              Compreenda como mecanismos de busca encontram, interpretam e escolhem conteúdos antes
              de tomar decisões técnicas ou editoriais.
            </Text>
            <a className={styles.primaryAction} href="#sumario">
              Consultar o sumário
              <HiOutlineArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className={styles.cover} aria-hidden="true">
            <span className={styles.coverCode}>SEO / 01</span>
            <span className={styles.coverOrbit}>descobrir · interpretar · escolher</span>
            <strong>BUSCA</strong>
            <span className={styles.coverNote}>uma introdução aos sistemas de descoberta</span>
          </div>
        </div>
      </header>

      <section className={styles.orientation} aria-labelledby="orientation-title">
        <div>
          <span className={styles.kicker}>Orientação de leitura</span>
          <Heading id="orientation-title" as="h2" className={styles.sectionTitle}>
            Uma base para decisões que vêm depois.
          </Heading>
        </div>
        <div className={styles.orientationCopy}>
          <p>
            Este livro é indicado para quem está começando em SEO ou já executa tarefas sem
            compreender completamente o sistema por trás delas. Não exige conhecimento técnico
            prévio.
          </p>
          <p>
            Ao terminar, o leitor deverá conseguir distinguir descoberta, processamento, indexação e
            classificação; interpretar intenção com mais cuidado; e avaliar como a estrutura de um
            site participa da busca.
          </p>
        </div>
      </section>

      <section className={styles.statusStrip} aria-label="Estado editorial do livro">
        <div>
          <span>Estado editorial</span>
          <strong>Sumário publicado</strong>
        </div>
        <div>
          <span>Capítulos fundamentais</span>
          <strong>{plannedChapters} planejados</strong>
        </div>
        <div>
          <span>Acervo relacionado</span>
          <strong>{complementaryReadings} leituras disponíveis</strong>
        </div>
      </section>

      <section className={styles.contents} id="sumario" aria-labelledby="contents-title">
        <div className={styles.contentsHeader}>
          <span className={styles.kicker}>Sumário</span>
          <Heading id="contents-title" as="h2" className={styles.sectionTitle}>
            Do encontro com a página à organização do site.
          </Heading>
          <p>
            A ordem é pedagógica. Capítulos planejados ainda não recebem links; leituras
            complementares preservam suas URLs originais no blog.
          </p>
        </div>

        <div className={styles.parts}>
          {understandSearchBookParts.map((part) => (
            <section className={styles.part} key={part.number}>
              <div className={styles.partIntro}>
                <span className={styles.partNumber}>{part.number}</span>
                <div>
                  <Heading as="h3" className={styles.partTitle}>
                    {part.title}
                  </Heading>
                  <p>{part.description}</p>
                </div>
              </div>

              <ol className={styles.chapterList}>
                {part.chapters.map((chapter) => (
                  <li className={styles.chapter} key={chapter.number}>
                    <span className={styles.chapterNumber}>{chapter.number}</span>
                    <div className={styles.chapterCopy}>
                      <strong>{chapter.title}</strong>
                      <p>{chapter.description}</p>
                    </div>
                    {chapter.href ? (
                      <Link className={styles.chapterLink} href={chapter.href}>
                        Ler agora
                        <HiOutlineArrowRight aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className={styles.chapterStatus}>Planejado</span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.nextStep} aria-labelledby="next-step-title">
        <span className={styles.kicker}>Próximo passo editorial</span>
        <Heading id="next-step-title" as="h2" className={styles.sectionTitle}>
          Escrever o capítulo de abertura.
        </Heading>
        <p>
          O primeiro texto deverá apresentar o percurso completo da busca sem antecipar em excesso
          os capítulos técnicos. Até sua publicação, esta página funciona como mapa transparente do
          livro.
        </p>
      </section>
    </Column>
  );
}
