import Link from "next/link";
import { notFound } from "next/navigation";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import {
  getKnowledgeRoleLabel,
  getKnowledgeStageMeta,
  getKnowledgeTrail,
  type KnowledgeItem,
  type KnowledgeStatus,
} from "@/lib/knowledge";
import { publicTrailAreas } from "@/lib/knowledgeConfig";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const statusLabels: Record<KnowledgeStatus, string> = {
  publicado: "Publicado",
  "em breve": "Em breve",
  planejado: "Planejado",
};

const trailGuides: Record<string, string[]> = {
  marketing: [
    "Para quem precisa entender publico, oferta e canais antes de aumentar esforco.",
    "Bom para organizar conteudo, SEO, conversao e leitura comercial.",
    "Comece pelos fundamentos se os termos ainda parecem soltos.",
  ],
  design: [
    "Para quem quer melhorar leitura, hierarquia visual e materiais comerciais.",
    "Bom para sair de escolhas apenas esteticas e pensar em funcao.",
    "Comece pelos fundamentos visuais antes de ferramentas como Canva ou Figma.",
  ],
  "renda-digital": [
    "Para quem quer gerar renda online sem promessa facil.",
    "Bom para decidir com base em necessidade, tempo, habilidade e risco.",
    "Comece pelo diagnostico antes de escolher metodo de monetizacao.",
  ],
  aprendizado: [
    "Para quem precisa estudar sozinho sem depender de motivacao.",
    "Bom para transformar consumo de conteudo em pratica e progresso.",
    "Comece por rotina e criterio antes de acumular cursos e ferramentas.",
  ],
  ferramentas: [
    "Para quem quer usar ferramentas com funcao pratica, nao como lista de apps.",
    "Bom para IA, organizacao, escrita, SEO e analise no trabalho real.",
    "Comece pelo problema que a ferramenta precisa resolver.",
  ],
};

const fallbackTrailGuide = [
  "Para quem quer aprender por ordem, sem depender de uma lista cronologica.",
  "Bom para revisar fundamentos e escolher o proximo passo com mais criterio.",
  "Comece pelo primeiro modulo com conteudo disponivel.",
] as const;

function formatCount(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function isPublicTrail(slug: string) {
  return publicTrailAreas.some((area) => area.slug === slug);
}

function ArticleCard({ item, compact = false }: { item: KnowledgeItem; compact?: boolean }) {
  const stage = getKnowledgeStageMeta(item.stage);
  const content = (
    <>
      <div className={styles.articleTop}>
        <span className={styles.statusBadge} data-status={item.status}>
          {statusLabels[item.status]}
        </span>
        <span className={styles.articleMeta}>{stage.shortLabel}</span>
        <span className={styles.articleMeta}>{item.level}</span>
      </div>

      <div className={styles.articleCopy}>
        <Heading
          as="h3"
          className={styles.articleTitle}
          variant={compact ? "heading-strong-s" : "heading-strong-m"}
        >
          {item.title}
        </Heading>
        {compact ? null : (
          <Text
            className={styles.articleDescription}
            variant="body-default-s"
            onBackground="neutral-weak"
          >
            {item.description}
          </Text>
        )}
      </div>

      <div className={styles.articleFooter}>
        <span>{getKnowledgeRoleLabel(item.role)}</span>
        <span>{item.type}</span>
        {item.estimatedReadingTime ? <span>{item.estimatedReadingTime} min</span> : null}
        {item.prerequisites.length > 0 ? <span>{item.prerequisites.length} prereq.</span> : null}
      </div>
    </>
  );

  if (item.href) {
    return (
      <Link className={styles.articleCard} data-compact={compact} href={item.href}>
        {content}
      </Link>
    );
  }

  return (
    <article className={styles.articleCard} data-compact={compact} data-disabled="true">
      {content}
    </article>
  );
}

export function generateStaticParams() {
  return publicTrailAreas.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const trail = getKnowledgeTrail(slug, posts);

  if (!trail || !isPublicTrail(slug)) return {};

  const title = `Trilha de ${trail.area.title}`;
  const image = buildOgImage(trail.area.title, "trilha de aprendizado");
  const path = `/trilhas/${trail.area.slug}`;
  const generatedMeta = Meta.generate({
    title,
    description: trail.area.description,
    baseURL,
    image,
    path,
  });

  return {
    ...generatedMeta,
    alternates: {
      canonical: `${baseURL}${path}`,
    },
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default async function KnowledgeTrailPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const trail = getKnowledgeTrail(slug, posts);

  if (!trail || !isPublicTrail(slug)) notFound();

  const path = `/trilhas/${trail.area.slug}`;
  const firstModuleWithItems = trail.modules.find((module) => module.items.length > 0);
  const firstReadableItem = trail.startItem;
  const startHref =
    firstReadableItem?.href ?? (firstModuleWithItems ? `#${firstModuleWithItems.slug}` : "/mapa");
  const startTitle = firstReadableItem?.title ?? firstModuleWithItems?.title;
  const trailGuide = trailGuides[trail.area.slug] ?? fallbackTrailGuide;
  const trailTitle = `Trilha de ${trail.area.title}`;

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={trailTitle}
        description={trail.area.description}
        path={path}
        author={{
          name: person.name,
          url: baseURL,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Mapa de Aprendizado", url: `${baseURL}/mapa` },
          { name: trailTitle, url: `${baseURL}${path}` },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link className={styles.backLink} href="/mapa">
            Voltar ao mapa
          </Link>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Area: {trail.area.title}
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l" wrap="balance">
            {trailTitle}
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            {trail.area.description}
          </Text>
        </div>

        <div className={styles.heroStats} aria-label="Resumo da trilha">
          <div>
            <span>{formatCount(trail.publishedCount, "artigo", "artigos")}</span>
            <p>publicados</p>
          </div>
          <div>
            <span>{formatCount(trail.modules.length, "modulo", "modulos")}</span>
            <p>em ordem</p>
          </div>
          <div>
            <span>{trail.readingMinutes > 0 ? `${trail.readingMinutes} min` : "Em montagem"}</span>
            <p>leitura estimada</p>
          </div>
        </div>
      </section>

      <section className={styles.fitSection} aria-labelledby="fit-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Para quem serve
          </Text>
          <Heading id="fit-title" as="h2" variant="heading-strong-xl">
            Use esta trilha quando precisar de ordem.
          </Heading>
        </div>

        <div className={styles.fitGrid}>
          {trailGuide.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      {firstModuleWithItems ? (
        <section className={styles.startPanel} aria-labelledby="start-title">
          <div>
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Comece por aqui
            </Text>
            <Heading id="start-title" as="h2" variant="heading-strong-xl">
              {startTitle
                ? `Primeira leitura: ${startTitle}.`
                : "Abra o primeiro modulo disponivel."}
            </Heading>
          </div>
          <Link className={styles.startAction} href={startHref}>
            Comecar pela primeira leitura
          </Link>
        </section>
      ) : null}

      {trail.stageCounts.length > 0 ? (
        <section className={styles.sequenceSection} aria-labelledby="sequence-title">
          <div className={styles.sectionHeader}>
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Sequencia
            </Text>
            <Heading id="sequence-title" as="h2" variant="heading-strong-xl">
              A trilha mistura base, pratica e aprofundamento na ordem certa.
            </Heading>
          </div>

          <ol className={styles.stageSteps}>
            {trail.stageCounts.map((stage, index) => (
              <li key={stage.stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage.label}</strong>
                <small>{formatCount(stage.count, "conteudo", "conteudos")}</small>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className={styles.moduleSection} aria-labelledby="modules-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Modulos
          </Text>
          <Heading id="modules-title" as="h2" variant="heading-strong-xl">
            Siga uma etapa por vez.
          </Heading>
          <Text className={styles.sectionLead} variant="body-default-s" onBackground="neutral-weak">
            Cada modulo agrupa artigos da mesma etapa. Abra o primeiro, leia um artigo e avance
            quando fizer sentido.
          </Text>
        </div>

        <div className={styles.moduleStack}>
          {trail.modules.map((module, index) => (
            <details
              className={styles.moduleBlock}
              id={module.slug}
              key={module.slug}
              open={index === 0}
            >
              <summary>
                <span className={styles.moduleNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.moduleSummaryCopy}>
                  <strong>{module.title}</strong>
                  <small>{module.description}</small>
                  {module.stageCounts.length > 0 ? (
                    <small className={styles.moduleStages}>
                      {module.stageCounts.map((stage) => stage.label).join(" / ")}
                    </small>
                  ) : null}
                </span>
                <span className={styles.moduleCount}>
                  {module.items.length > 0
                    ? `${formatCount(module.items.length, "artigo", "artigos")}${
                        module.readingMinutes > 0 ? ` - ${module.readingMinutes} min` : ""
                      }`
                    : "planejado"}
                </span>
              </summary>

              {module.items.length > 0 ? (
                <>
                  <div className={styles.moduleContext}>
                    <span>Leia primeiro</span>
                    {module.startItem?.href ? (
                      <a href={module.startItem.href}>{module.startItem.title}</a>
                    ) : (
                      <p>{module.startItem?.title ?? "Conteudo em organizacao"}</p>
                    )}
                  </div>
                  <div className={styles.articleGrid}>
                    {module.items.map((item) => (
                      <ArticleCard item={item} key={item.slug} />
                    ))}
                  </div>
                </>
              ) : (
                <p className={styles.emptyModule}>Conteudos ainda planejados para esta etapa.</p>
              )}
            </details>
          ))}
        </div>
      </section>

      <section className={styles.nextPanel} aria-labelledby="trail-next-title">
        <div>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Proximo passo
          </Text>
          <Heading id="trail-next-title" as="h2" variant="heading-strong-xl">
            Terminou uma etapa? Volte ao mapa antes de abrir outra area.
          </Heading>
        </div>
        <div className={styles.nextActions}>
          <Link className={styles.startAction} href="/mapa">
            Voltar ao mapa de aprendizado
          </Link>
        </div>
      </section>
    </Column>
  );
}
