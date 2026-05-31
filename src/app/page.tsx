import { Meta, Schema, Text } from "@once-ui-system/core";

import { getBlogPrimaryCategory, getFeaturedBlogPosts } from "@/app/blog/postData";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroActions } from "@/components/home/HeroActions";
import { HeroSubtitle } from "@/components/home/HeroSubtitle";
import { HeroTitle } from "@/components/home/HeroTitle";
import { Reveal } from "@/components/motion/Reveal";
import {
  about,
  audiencePages,
  baseURL,
  contentStrategy,
  ecosystemAreas,
  home,
  person,
  servicesPage,
  simulationPage,
} from "@/resources";
import { buildDiscoverImageMetadata } from "@/utils/og";

import styles from "./home.module.scss";

const homeStrategy = contentStrategy.pages.home;
const homeBlogSection = homeStrategy.sections.find((section) => section.id === "blog");
const homeAboutSection = homeStrategy.sections.find((section) => section.id === "about-teaser");
const homeFinalSection = homeStrategy.sections.find((section) => section.id === "final-cta");

const homeProofPoints = [
  { label: "Antes", value: "achar onde a decisão trava" },
  { label: "Durante", value: "mudar só o que precisa mudar" },
  { label: "Depois", value: "medir se a base respondeu" },
] as const;

const heroBenefits = [
  "Oferta antes de tráfego",
  "Página antes de campanha",
  "Atendimento antes de automação",
] as const;

export async function generateMetadata() {
  const generatedMeta = Meta.generate({
    title: home.title,
    description: home.description,
    baseURL,
    path: home.path,
    image: home.image,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(home.image, home.title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: home.image ? [home.image] : undefined,
    },
    keywords: homeStrategy.seo.keywords,
  };
}

export default function Home() {
  const blogPosts = getFeaturedBlogPosts(3);

  return (
    <div className={styles.page}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <nav className={styles.heroAudienceNav} aria-label="Públicos atendidos">
              {audiencePages.map((audience) => (
                <Link className={styles.heroAudienceLink} href={audience.path} key={audience.slug}>
                  {audience.label}
                </Link>
              ))}
            </nav>

            <HeroTitle>
              Mais tráfego não corrige uma <span className={styles.heroAccent}>base confusa.</span>
            </HeroTitle>

            <HeroSubtitle>
              Eu organizo oferta, página, conteúdo e atendimento antes de aumentar volume.
            </HeroSubtitle>

            <ul className={styles.heroBenefits} aria-label="Benefícios principais">
              {heroBenefits.map((benefit) => (
                <li className={styles.heroBenefit} key={benefit}>
                  <span className={styles.heroBenefitDot} aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <HeroActions
              primaryLabel="Começar pelo mapa"
              primaryHref="/mapa"
              secondaryLabel="Entender consultoria"
              secondaryHref={servicesPage.path}
            />
          </div>

        </div>
      </section>

      <section className={styles.ecosystemSection} id="ecossistema">
        <Reveal delay={0.04} distance={20}>
          <SectionHeader
            eyebrow="Ecossistema"
            title="Escolha por onde entrar."
            description="Você não precisa abrir tudo. Entre pelo problema: estudar, ver processo, usar um recurso ou avaliar ajuda."
          />
        </Reveal>

        <div className={styles.ecosystemGrid}>
          {ecosystemAreas.map((card) => (
            <Link className={styles.ecosystemCard} href={card.href} key={card.key}>
              <span className={styles.ecosystemLabel}>{card.label}</span>
              <strong>{card.title}</strong>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {card.description}
              </Text>
              <span className={styles.ecosystemPaths}>{card.paths.join(" / ")}</span>
              <span className={styles.ecosystemCta}>{card.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.statementSection}>
        <div className={styles.statementCopy}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Critério
          </Text>
          <h2 className={styles.statementTitle}>Antes de produzir, descubra o vazamento.</h2>
        </div>

        <div className={styles.proofList}>
          {homeProofPoints.map((point) => (
            <div className={styles.proofItem} key={point.label}>
              <Text
                className={styles.proofLabel}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                {point.label}
              </Text>
              <Text
                className={styles.proofValue}
                variant="body-default-m"
                onBackground="neutral-medium"
              >
                {point.value}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Reveal delay={0.04} distance={20}>
          <SectionHeader
            eyebrow={homeBlogSection?.label ?? "Biblioteca"}
            title={homeBlogSection?.title ?? "Leia antes de mexer no canal."}
            description={homeBlogSection?.description ?? ""}
            actionLabel={homeBlogSection?.ctaLabel ?? "Começar pela biblioteca"}
            actionHref={homeBlogSection?.ctaHref ?? "/blog"}
          />
        </Reveal>

        <div className={styles.blogGrid}>
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <ArticleCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={post.metadata.title}
                summary={post.metadata.summary}
                publishedAt={post.metadata.publishedAt}
                category={getBlogPrimaryCategory(post)}
                readingTime={post.metadata.readingTime}
              />
            ))
          ) : (
            <article className={styles.supportPanel}>
              <Text
                className={styles.eyebrow}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                Blog
              </Text>
              <Text variant="body-default-m">
                Novos artigos entram aqui quando forem publicados.
              </Text>
            </article>
          )}
        </div>
      </section>

      <section className={styles.aboutSection}>
        <AboutTeaser
          eyebrow={homeAboutSection?.label ?? "Sobre"}
          title={homeAboutSection?.title ?? "Por que eu olho a base antes do volume."}
          description={
            homeAboutSection?.description ??
            "Se a oferta, a página ou o atendimento confundem, mais volume só aumenta o ruído."
          }
          ctaLabel={homeAboutSection?.ctaLabel ?? "Ver como penso"}
          ctaHref={homeAboutSection?.ctaHref ?? about.path}
        />
      </section>

      <section className={styles.finalSection}>
        <FinalCTA
          eyebrow={homeFinalSection?.label ?? "Decisão"}
          title={homeFinalSection?.title ?? "Veja se faz sentido."}
          description={
            homeFinalSection?.description ??
            "Avalie cenário, prioridade e próximo passo antes de decidir."
          }
          primaryLabel={homeFinalSection?.ctaLabel ?? "Avaliar cenário"}
          primaryHref={homeFinalSection?.ctaHref ?? simulationPage.path}
        />
      </section>
    </div>
  );
}
