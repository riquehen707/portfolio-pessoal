import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AvatarGroup,
  Column,
  Grid,
  Heading,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import {
  getAllWorkProjects,
  getWorkProjectBySlug,
  getWorkProjectKindLabel,
  getWorkProjectPath,
  getWorkProjectSeoImage,
  getWorkProjectStack,
  getWorkProjectStaticParams,
  getWorkProjectSummaryPath,
  hasWorkProjectPrintableSummary,
  normalizeWorkProjectSlug,
  resolveWorkProjectMediaSrc,
  toAbsoluteWorkProjectUrl,
} from "@/app/work/projectData";
import ArticleToc from "@/components/blog/ArticleToc";
import { CustomMDX, ScrollToHash } from "@/components";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Projects } from "@/components/work/Projects";
import { ProjectIntelligencePanel } from "@/components/work/ProjectIntelligencePanel";
import { getProjectDashboardSnapshot } from "@/domain";
import { baseURL, about, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";

import styles from "./page.module.scss";

type PageProps = {
  params: Promise<{ slug: string | string[] }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getWorkProjectStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = normalizeWorkProjectSlug(slug);
  const post = getWorkProjectBySlug(slugPath);

  if (!post) return {};

  return {
    ...Meta.generate({
      title: post.metadata.title,
      description: post.metadata.summary ?? post.metadata.title,
      baseURL,
      image: toAbsoluteWorkProjectUrl(getWorkProjectSeoImage(post)),
      path: getWorkProjectPath(post.slug),
    }),
    keywords: [
      ...getWorkProjectStack(post),
      getWorkProjectKindLabel(post),
      post.metadata.category,
      person.name,
    ].filter((value): value is string => Boolean(value)),
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = normalizeWorkProjectSlug(slug);

  const allProjects = getAllWorkProjects();
  const post = getWorkProjectBySlug(slugPath);

  if (!post) notFound();

  const relatedProjects = allProjects.filter((item) => item.slug !== slugPath);
  const hasPrintableSummary = hasWorkProjectPrintableSummary(post.slug);
  const avatars =
    post.metadata.team?.flatMap((member) =>
      member.avatar ? [{ src: resolveWorkProjectMediaSrc(member.avatar) as string }] : [],
    ) || [];

  const cover = post.metadata.image || post.metadata.images?.[0];
  const intelligenceSnapshot = getProjectDashboardSnapshot(post.slug);
  const metaImage = getWorkProjectSeoImage(post);
  const stack = getWorkProjectStack(post);
  const displayKind = getWorkProjectKindLabel(post);
  const faqItems = post.metadata.faq ?? [];
  const references = post.metadata.references ?? [];
  const tocDepth = post.metadata.tocDepth ? Math.min(Math.max(post.metadata.tocDepth, 2), 4) : 3;
  const shouldRenderToc = post.metadata.toc === true;

  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="article"
        baseURL={baseURL}
        path={getWorkProjectPath(post.slug)}
        title={post.metadata.title}
        description={post.metadata.summary ?? post.metadata.title}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.updatedAt ?? post.metadata.publishedAt}
        image={toAbsoluteWorkProjectUrl(metaImage)}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Projetos", url: `${baseURL}/work` },
          { name: post.metadata.title, url: `${baseURL}${getWorkProjectPath(post.slug)}` },
        ]}
      />

      <Column className={styles.hero} gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Row gap="12" wrap>
              <SmartLink href="/work">Voltar</SmartLink>
              {hasPrintableSummary && (
                <SmartLink href={getWorkProjectSummaryPath(post.slug)}>Resumo PDF</SmartLink>
              )}
            </Row>

            {(displayKind || stack.length > 0) && (
              <Row className={styles.tagRow} gap="8" wrap>
                {displayKind && (
                  <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                    {displayKind}
                  </Tag>
                )}
                {stack.slice(0, 4).map((item) => (
                  <Tag key={`${post.slug}-${item}`} size="s" background="neutral-alpha-weak">
                    {item}
                  </Tag>
                ))}
              </Row>
            )}

            <Heading variant="display-strong-m" wrap="balance">
              {post.metadata.title}
            </Heading>
            <div className={styles.accentLine} />
            {post.metadata.summary && (
              <Text
                className={styles.heroLead}
                onBackground="neutral-weak"
                variant="heading-default-m"
                wrap="balance"
              >
                {post.metadata.summary}
              </Text>
            )}
          </Column>

          <Column className={styles.heroAside} gap="12">
            <Column className={styles.metaCard} gap="12">
              <Text
                className={styles.metaCardLabel}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                Publicado
              </Text>
              <Text variant="heading-strong-s">
                {post.metadata.publishedAt
                  ? formatDate(post.metadata.publishedAt)
                  : "Sem data definida"}
              </Text>
            </Column>

            <Column className={styles.metaCard} gap="12">
              <Text
                className={styles.metaCardLabel}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                Tipo
              </Text>
              <Text variant="heading-strong-s">{displayKind ?? "Projeto"}</Text>
              {stack.length > 0 && (
                <Row className={styles.stackRow} gap="8" wrap>
                  {stack.slice(0, 5).map((item) => (
                    <Tag key={`${post.slug}-meta-${item}`} size="s" background="neutral-alpha-weak">
                      {item}
                    </Tag>
                  ))}
                </Row>
              )}
            </Column>

            {avatars.length > 0 && (
              <Column className={styles.metaCard} gap="12">
                <Text
                  className={styles.authorLabel}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Equipe
                </Text>
                <div className={styles.authorCard}>
                  <AvatarGroup reverse avatars={avatars} size="s" />
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {post.metadata.team?.map((member) => member.name).join(", ")}
                  </Text>
                </div>
              </Column>
            )}
          </Column>
        </Grid>
      </Column>

      {cover && (
        <div className={styles.coverShell}>
          <Media
            priority
            aspectRatio="16 / 9"
            radius="l"
            alt={post.metadata.title}
            src={resolveWorkProjectMediaSrc(cover) ?? cover}
          />
        </div>
      )}

      {intelligenceSnapshot && <ProjectIntelligencePanel snapshot={intelligenceSnapshot} />}

      {shouldRenderToc && (
        <Column className={styles.supportPanel} gap="16" padding="24">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Navegação
          </Tag>
          <Heading as="h2" variant="heading-strong-l">
            Mapa do case
          </Heading>
          <Text className={styles.supportLead} onBackground="neutral-weak" variant="body-default-m">
            Uma leitura rápida das seções principais para navegar pelo projeto sem depender de scroll cego.
          </Text>
          <ArticleToc containerId="project-article" minLevel={2} maxLevel={tocDepth as 2 | 3 | 4} />
        </Column>
      )}

      <Column className={styles.articleShell} horizontal="center">
        <Column
          id="project-article"
          className={styles.article}
          style={{ margin: "auto" }}
          as="article"
          maxWidth="s"
        >
          <CustomMDX source={post.content} glossary={post.metadata.glossary ?? {}} />
        </Column>
      </Column>

      {faqItems.length > 0 && (
        <Column className={styles.supportPanel} gap="16" padding="24">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            FAQ
          </Tag>
          <Heading as="h2" variant="heading-strong-l">
            Perguntas sobre o projeto
          </Heading>
          <Column className={styles.faqList} gap="12">
            {faqItems.map((item) => (
              <details className={styles.faqItem} key={item.q}>
                <summary className={styles.faqQuestion}>{item.q}</summary>
                <Text className={styles.faqAnswer} onBackground="neutral-weak" variant="body-default-m">
                  {item.a}
                </Text>
              </details>
            ))}
          </Column>
        </Column>
      )}

      {references.length > 0 && (
        <Column className={styles.supportPanel} gap="16" padding="24">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Referências
          </Tag>
          <Heading as="h2" variant="heading-strong-l">
            Base usada para este case
          </Heading>
          <Column className={styles.referenceList} gap="12">
            {references.map((reference) => (
              <div className={styles.referenceItem} key={`${reference.title}-${reference.year ?? "nd"}`}>
                <Text variant="body-default-m">{reference.title}</Text>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {[reference.author, reference.year ? String(reference.year) : undefined]
                    .filter(Boolean)
                    .join(" - ") || "Referência editorial"}
                </Text>
                {reference.url && (
                  <a
                    className={styles.referenceLink}
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir referência
                  </a>
                )}
              </div>
            ))}
          </Column>
        </Column>
      )}

      {relatedProjects.length > 0 && (
        <Column className={styles.relatedPanel} fillWidth gap="20" padding="24">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Mais projetos
          </Tag>
          <Heading as="h2" variant="heading-strong-xl">
            Outros projetos
          </Heading>
          <Projects projects={relatedProjects} range={[1, 2]} marginBottom="0" paddingX="0" />
        </Column>
      )}
      <ScrollToHash />
    </Column>
  );
}
