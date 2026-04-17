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

import { CustomMDX, ScrollToHash } from "@/components";
import { ProjectIntelligencePanel } from "@/components/work/ProjectIntelligencePanel";
import { getProjectDashboardSnapshot } from "@/domain";
import { Projects } from "@/components/work/Projects";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { buildOgImage } from "@/utils/og";
import { getPosts } from "@/utils/utils";

import styles from "./page.module.scss";

const kindLabels = {
  personal: "Projeto pessoal",
  study: "Estudo de caso",
  client: "Case de cliente",
} as const;

type PageProps = {
  params: Promise<{ slug: string | string[] }>;
};

function normalizeSlug(slugParam: string | string[] | undefined): string {
  if (!slugParam) return "";
  return Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
}

function toAbs(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  try {
    return new URL(pathOrUrl, baseURL).toString();
  } catch {
    return pathOrUrl;
  }
}

function toLocal(src?: string): string | undefined {
  if (!src) return undefined;
  try {
    const u = new URL(src, baseURL);
    return u.pathname + u.search;
  } catch {
    return src;
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((item) => item.slug === slugPath);

  if (!post) return {};

  const image =
    post.metadata.image ||
    post.metadata.images?.[0] ||
    buildOgImage(post.metadata.title, post.metadata.tag ?? post.metadata.tags?.[0] ?? "Projeto");

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary ?? post.metadata.title,
    baseURL,
    image: toAbs(image),
    path: `${work.path}/${post.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);

  const allProjects = getPosts(["src", "app", "work", "projects"]);
  const post = allProjects.find((item) => item.slug === slugPath);

  if (!post) notFound();

  const relatedProjects = allProjects.filter((item) => item.slug !== slugPath);
  const avatars =
    post.metadata.team?.flatMap((member) =>
      member.avatar ? [{ src: toLocal(member.avatar) as string }] : [],
    ) || [];

  const cover = post.metadata.image || post.metadata.images?.[0];
  const intelligenceSnapshot = getProjectDashboardSnapshot(post.slug);
  const metaImage =
    post.metadata.image ||
    post.metadata.images?.[0] ||
    buildOgImage(post.metadata.title, post.metadata.tag ?? post.metadata.tags?.[0] ?? "Projeto");
  const stack = Array.from(
    new Set(
      [post.metadata.tag, ...(post.metadata.stack ?? post.metadata.tags ?? [])].filter(
        Boolean,
      ) as string[],
    ),
  );
  const displayKind = post.metadata.kind ? kindLabels[post.metadata.kind] : undefined;

  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="article"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary ?? post.metadata.title}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.updatedAt ?? post.metadata.publishedAt}
        image={toAbs(metaImage)}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Row gap="12" wrap>
              <SmartLink href="/work">Voltar para projetos</SmartLink>
              <SmartLink href={`/work/${post.slug}/resumo`}>Abrir resumo em PDF</SmartLink>
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
                Estrutura
              </Text>
              <Text variant="body-default-m">
                {displayKind ?? "Projeto com foco em interface, leitura e organização técnica."}
              </Text>
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
                  Pessoas
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
            src={toLocal(cover) ?? cover}
          />
        </div>
      )}

      {intelligenceSnapshot && <ProjectIntelligencePanel snapshot={intelligenceSnapshot} />}

      <Column className={styles.articleShell} horizontal="center">
        <Column className={styles.article} style={{ margin: "auto" }} as="article" maxWidth="s">
          <CustomMDX source={post.content} />
        </Column>
      </Column>

      {relatedProjects.length > 0 && (
        <Column className={styles.relatedPanel} fillWidth gap="20" padding="24">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Mais projetos
          </Tag>
          <Heading as="h2" variant="heading-strong-xl">
            Continue explorando o portfólio
          </Heading>
          <Projects exclude={[post.slug]} range={[1, 2]} marginBottom="0" paddingX="0" />
        </Column>
      )}
      <ScrollToHash />
    </Column>
  );
}
