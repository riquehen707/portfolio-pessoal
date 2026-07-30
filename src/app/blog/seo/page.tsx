import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./seo.module.scss";
import { seoBooks, seoLibraryPath, seoLibrarySections } from "./seoLibraryData";

const pageTitle = "Biblioteca de SEO";
const pageDescription =
  "Aprenda como a busca funciona, construa estratégias melhores e desenvolva competências profissionais em SEO.";

export async function generateMetadata() {
  const image = buildOgImage(pageTitle, "busca, conteúdo e estratégia");
  const generatedMeta = Meta.generate({
    title: pageTitle,
    description: pageDescription,
    baseURL,
    image,
    path: seoLibraryPath,
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

export default function SeoLibraryPage() {
  return (
    <Column className={styles.page} fillWidth gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={pageTitle}
        description={pageDescription}
        path={seoLibraryPath}
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
          { name: pageTitle, url: `${baseURL}${seoLibraryPath}` },
        ]}
      />

      <section className={styles.hero} aria-labelledby="seo-library-title">
        <div className={styles.heroFolio}>
          <span className={styles.brandMark} aria-hidden="true" />
          <span>Biblioteca temática</span>
          <span>Fundamentos</span>
          <span>Relevância</span>
          <span>Medição</span>
          <span className={styles.heroEdition}>SEO · edição em construção</span>
        </div>
        <div className={styles.heroBody}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Biblioteca de SEO</span>
            <Heading
              id="seo-library-title"
              as="h1"
              className={styles.heroTitle}
              variant="display-strong-l"
            >
              Entender antes de otimizar.
            </Heading>
            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
            >
              SEO não é uma coleção de truques para aparecer no Google. É o trabalho de compreender
              como pessoas pesquisam, como páginas são interpretadas e como descoberta pode se
              transformar em resultado.
            </Text>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="#livros">
                Começar pelos livros
                <HiOutlineArrowRight aria-hidden="true" />
              </Link>
              <Link className={styles.textAction} href="#guia-pratico">
                Consultar o guia prático
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.readingDesk} aria-label="Fragmentos da Biblioteca de SEO">
          <div className={styles.deskHeader}>
            <span>Arquivo de busca</span>
            <span>01—03</span>
          </div>
          <div className={styles.deskGrid}>
            <div className={styles.deskPrimary}>
              <span className={styles.fragmentLabel}>Pergunta de partida</span>
              <strong>O que acontece antes de uma página aparecer na busca?</strong>
              <span className={styles.annotation}>rastrear → interpretar → escolher</span>
            </div>
            <div className={styles.deskNote}>
              <span className={styles.fragmentLabel}>Nota 01</span>
              <p>Intenção vem antes da palavra-chave.</p>
            </div>
            <div className={styles.deskTerm}>
              <span className={styles.fragmentLabel}>Vocabulário</span>
              <strong>relevância</strong>
              <span>/ re.le.vân.cia /</span>
            </div>
            <div className={styles.deskQuote}>
              <span aria-hidden="true">“</span>
              <p>Otimizar é tornar uma boa resposta mais fácil de encontrar e compreender.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.booksSection} id="livros" aria-labelledby="books-title">
        <a className={styles.sectionRail} href="#livros">
          <span>Entrada principal</span>
          <span>Livros de formação</span>
          <span>Começar ↓</span>
        </a>
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Comece pelos livros</span>
          <Heading id="books-title" as="h2" className={styles.sectionTitle}>
            Uma formação construída em sequência.
          </Heading>
          <Text className={styles.sectionLead} onBackground="neutral-weak">
            Cada volume parte dos conceitos anteriores e acrescenta uma nova camada de aplicação. Os
            três livros ainda estão em planejamento editorial.
          </Text>
        </div>

        <div className={styles.bookSequence}>
          {seoBooks.map((book) => (
            <article className={styles.book} key={book.number}>
              <div className={styles.bookHeader}>
                <span className={styles.bookNumber}>{book.number}</span>
                <span className={styles.plannedLabel}>Em planejamento</span>
              </div>
              <Heading as="h3" className={styles.bookTitle}>
                {book.title}
              </Heading>
              <p className={styles.bookDescription}>{book.description}</p>
              <ul className={styles.topicList}>
                {book.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <p className={styles.bookFooter}>
                {book.prerequisite
                  ? `Pré-requisito recomendado: ${book.prerequisite}.`
                  : "Ponto de entrada da coleção."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.purposeSection} aria-labelledby="purpose-title">
        <a className={styles.sectionRail} href="#guia-pratico">
          <span>Consulta aberta</span>
          <span>Outros caminhos pela biblioteca</span>
          <span>Explorar ↓</span>
        </a>
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Outros caminhos</span>
          <Heading id="purpose-title" as="h2" className={styles.sectionTitle}>
            Consulte a biblioteca pela finalidade.
          </Heading>
        </div>

        <div className={styles.purposeList}>
          {seoLibrarySections.map((section) => (
            <article className={styles.purposeBlock} id={section.id} key={section.id}>
              <div className={styles.purposeHeading}>
                <span className={styles.eyebrow}>{section.eyebrow}</span>
                <Heading as="h3" className={styles.purposeTitle}>
                  {section.title}
                </Heading>
                <p>{section.description}</p>
              </div>
              <div>
                <span className={styles.scopeLabel}>Escopo planejado</span>
                <ul className={styles.exampleList}>
                  {section.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.aboutSection} aria-labelledby="about-library-title">
        <span className={styles.eyebrow}>Sobre este projeto</span>
        <Heading id="about-library-title" as="h2" className={styles.sectionTitle}>
          Uma biblioteca contínua, sem fórmulas universais.
        </Heading>
        <p>
          Este espaço será construído a partir de estudos, experiência prática, documentação técnica
          e análise crítica do mercado. O objetivo é desenvolver modelos mentais que ajudem a tomar
          decisões melhores — e atualizar o que precisar mudar com a busca.
        </p>
      </section>
    </Column>
  );
}
