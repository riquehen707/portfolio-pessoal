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
import { HeroVisual } from "@/components/home/HeroVisual";
import { TechStrip } from "@/components/home/TechStrip";
import { Reveal } from "@/components/motion/Reveal";
import {
  about,
  audiencePages,
  baseURL,
  contentStrategy,
  home,
  person,
  simulationPage,
} from "@/resources";
import { buildDiscoverImageMetadata } from "@/utils/og";

import styles from "./home.module.scss";

const homeStrategy = contentStrategy.pages.home;
const homeBlogSection = homeStrategy.sections.find((section) => section.id === "blog");
const homeAboutSection = homeStrategy.sections.find((section) => section.id === "about-teaser");
const homeFinalSection = homeStrategy.sections.find((section) => section.id === "final-cta");

const techStripItems = [
  { label: "Sites", icon: "globe" },
  { label: "Sistema de gestão", icon: "chart" },
  { label: "Next.js", icon: "nextjs" },
  { label: "React", icon: "react" },
  { label: "Banco de dados", icon: "supabase" },
  { label: "CRM", icon: "crm" },
  { label: "SEO", icon: "seo" },
  { label: "PageSpeed", icon: "performance" },
  { label: "Meta", icon: "meta" },
  { label: "Instagram", icon: "instagram" },
  { label: "Facebook", icon: "facebook" },
  { label: "YouTube", icon: "youtube" },
] as const;

const homeProofPoints = [
  { label: "Antes", value: "entender o gargalo real" },
  { label: "Durante", value: "executar o menor escopo útil" },
  { label: "Depois", value: "acompanhar sinais de melhoria" },
] as const;

const heroBenefits = ["Identidade clara", "Mensagem direta", "Presença memorável"] as const;

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
              Não faça igual a <span className={styles.heroAccent}>todo mundo.</span>
            </HeroTitle>

            <HeroSubtitle>
              Assim como uma expressão pode ser reconhecida em poucos traços, seu site precisa ser
              entendido sem exageros.
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
              primaryLabel="Saiba mais"
              primaryHref="/saiba-mais"
              secondaryLabel="Agendar uma ligação"
              secondaryHref={homeStrategy.hero.primaryCtaHref}
            />
          </div>

          <HeroVisual />

        </div>
      </section>

      <section className={styles.postHeroSection} id="home-proof">
        <TechStrip items={[...techStripItems]} />
      </section>

      <section className={styles.statementSection}>
        <div className={styles.statementCopy}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Método
          </Text>
          <h2 className={styles.statementTitle}>Diagnóstico antes de produção.</h2>
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
            eyebrow={homeBlogSection?.label ?? "Insights"}
            title={homeBlogSection?.title ?? "Ideias que geram resultado."}
            description={homeBlogSection?.description ?? ""}
            actionLabel={homeBlogSection?.ctaLabel ?? "Ver artigos"}
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
          title={
            homeAboutSection?.title ??
            "Marketing e estrutura personalizada para atrair clientes sem tomar seu tempo."
          }
          description={
            homeAboutSection?.description ??
            "Transformo ideias e necessidades reais em estruturas digitais claras, funcionais e valiosas."
          }
          ctaLabel={homeAboutSection?.ctaLabel ?? "Conheça minha trajetória"}
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
