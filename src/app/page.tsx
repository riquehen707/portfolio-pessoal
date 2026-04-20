import { Meta, Schema, Text } from "@once-ui-system/core";

import { getBlogPrimaryCategory, getFeaturedBlogPosts } from "@/app/blog/postData";
import { getAllWorkProjects } from "@/app/work/projectData";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroActions } from "@/components/home/HeroActions";
import { HeroSubtitle } from "@/components/home/HeroSubtitle";
import { HeroTitle } from "@/components/home/HeroTitle";
import { TechStrip } from "@/components/home/TechStrip";
import { Reveal } from "@/components/motion/Reveal";
import { FeaturedWorksShowcase } from "@/components/work/FeaturedWorksShowcase";
import {
  about,
  baseURL,
  contact,
  contentStrategy,
  home,
  person,
} from "@/resources";

import styles from "./home.module.scss";

const homeStrategy = contentStrategy.pages.home;
const homeBlogSection = homeStrategy.sections.find((section) => section.id === "blog");
const homeAboutSection = homeStrategy.sections.find((section) => section.id === "about-teaser");
const homeFinalSection = homeStrategy.sections.find((section) => section.id === "final-cta");

const heroTrustItems = [
  "Negócios locais",
  "Estratégia orientada por dados",
  "Soluções completas",
] as const;

const techStripItems = [
  { label: "React", icon: "react" },
  { label: "Next.js", icon: "nextjs" },
  { label: "Google Ads", icon: "ads" },
  { label: "Meta Ads", icon: "meta" },
  { label: "Analytics", icon: "ga" },
  { label: "CRM", icon: "crm" },
  { label: "Automação", icon: "rocket" },
  { label: "SEO", icon: "seo" },
  { label: "UI/UX", icon: "figma" },
  { label: "Performance", icon: "performance" },
] as const;


export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: home.title,
      description: home.description,
      baseURL,
      path: home.path,
      image: home.image,
    }),
    keywords: homeStrategy.seo.keywords,
  };
}

export default function Home() {
  const workProjects = getAllWorkProjects();
  const blogPosts = getFeaturedBlogPosts(3);
  const heroHeadline = (
    <>
      <span className={styles.heroAccent}>Operação digital</span> completa para negócios locais.
    </>
  );

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
            <Text className={styles.heroIdentity} variant="label-default-s" onBackground="neutral-weak">
              Henrique Reis / estratégia, design e sistemas
            </Text>
            <HeroTitle>{heroHeadline}</HeroTitle>
            <HeroSubtitle>{homeStrategy.hero.subheadline}</HeroSubtitle>
            <HeroActions
              primaryLabel={homeStrategy.hero.primaryCtaLabel}
              primaryHref={homeStrategy.hero.primaryCtaHref}
              secondaryLabel={homeStrategy.hero.secondaryCtaLabel}
              secondaryHref={homeStrategy.hero.secondaryCtaHref}
            />

            <Reveal className={styles.heroTrustRow} delay={0.28} distance={18}>
              {heroTrustItems.map((item) => (
                <div className={styles.heroTrustItem} key={item}>
                  <span className={styles.heroTrustDot} aria-hidden="true" />
                  <Text variant="body-default-s">{item}</Text>
                </div>
              ))}
            </Reveal>
          </div>

        </div>

        <a className={styles.scrollCue} href="#home-proof" aria-label="Explorar próxima seção">
          <span className={styles.scrollCueText}>Explore</span>
          <span className={styles.scrollCueLine} aria-hidden="true" />
          <span className={styles.scrollCueArrow} aria-hidden="true" />
        </a>
      </section>

      <section className={styles.postHeroSection} id="home-proof">
        <Reveal delay={0.12} distance={20}>
          <TechStrip items={[...techStripItems]} />
        </Reveal>
      </section>

      <FeaturedWorksShowcase projects={workProjects} />

      <section className={styles.section}>
        <Reveal delay={0.04} distance={24}>
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
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                Blog
              </Text>
              <Text variant="body-default-m">
                O bloco editorial fica pronto para receber artigos assim que a nova linha de insights entrar em publicacao.
              </Text>
            </article>
          )}
        </div>
      </section>

      <section className={styles.aboutSection}>
        <AboutTeaser
          eyebrow={homeAboutSection?.label ?? "Sobre"}
          title={homeAboutSection?.title ?? "Mais que design e tecnologia."}
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
          eyebrow={homeFinalSection?.label ?? "Proximo passo"}
          title={
            homeFinalSection?.title ??
            "Se seu negócio precisa de presença forte e operação digital eficiente, vamos conversar."
          }
          description={
            homeFinalSection?.description ??
            "Uma conversa direta pode revelar oportunidades reais de posicionamento, aquisição e operação digital."
          }
          primaryLabel={homeFinalSection?.ctaLabel ?? "Agendar uma ligação"}
          primaryHref={homeFinalSection?.ctaHref ?? contact.path}
        />
      </section>
    </div>
  );
}

