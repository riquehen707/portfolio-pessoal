import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Column, Heading, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import { PrintReportButton } from "@/components/work/PrintReportButton";
import { ProjectExecutiveSummarySheet } from "@/components/work/ProjectExecutiveSummarySheet";
import { getProjectDashboardSnapshot, getProjectExecutiveSummary } from "@/domain";
import { baseURL, about, person, work } from "@/resources";
import { createQrCodeDataUrl } from "@/utils/createQrCodeDataUrl";
import { buildOgImage } from "@/utils/og";
import { getPosts } from "@/utils/utils";

import styles from "./page.module.scss";

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

function formatReportDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(new Date(date));
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
    buildOgImage(`Resumo executivo ${post.metadata.title}`, "Diagnostico");

  return {
    title: `Resumo executivo | ${post.metadata.title}`,
    description: `Versao resumida e imprimivel do diagnostico de ${post.metadata.title}.`,
    alternates: {
      canonical: `${baseURL}${work.path}/${post.slug}/resumo`,
    },
    openGraph: {
      title: `Resumo executivo | ${post.metadata.title}`,
      description: `Versao resumida e imprimivel do diagnostico de ${post.metadata.title}.`,
      url: `${baseURL}${work.path}/${post.slug}/resumo`,
      images: [{ url: toAbs(image) ?? image }],
    },
  };
}

export default async function ProjectExecutiveSummaryPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((item) => item.slug === slugPath);
  const snapshot = getProjectDashboardSnapshot(slugPath);
  const summary = getProjectExecutiveSummary(slugPath);

  if (!post || !snapshot || !summary) {
    notFound();
  }

  const siteUrl = "https://henrique.dog";
  const qrCodeDataUrl = await createQrCodeDataUrl(siteUrl);

  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="20">
      <Schema
        as="article"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}/resumo`}
        title={`Resumo executivo | ${post.metadata.title}`}
        description={summary.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.updatedAt ?? post.metadata.publishedAt}
        image={toAbs(buildOgImage(`Resumo executivo ${post.metadata.title}`, "Diagnostico"))}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.header} gap="12">
        <Row className={styles.topBar} horizontal="between" vertical="center" gap="12" wrap>
          <Row gap="8" wrap>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Resumo PDF
            </Tag>
            <Tag size="s" background="neutral-alpha-weak">
              {post.metadata.title}
            </Tag>
          </Row>

          <Row className={styles.actions} gap="12" wrap>
            <PrintReportButton />
            <SmartLink href={`/work/${post.slug}`}>Ver analise completa</SmartLink>
          </Row>
        </Row>

        <Heading as="h1" variant="heading-strong-xl">
          Resumo executivo para apresentacao comercial
        </Heading>
        <Text onBackground="neutral-weak">
          Versao curta do diagnostico para leitura rapida, reuniao e exportacao em PDF. A analise
          completa permanece na pagina principal do projeto.
        </Text>
      </Column>

      <ProjectExecutiveSummarySheet
        snapshot={snapshot}
        summary={summary}
        generatedAtLabel={formatReportDate(snapshot.report.createdAt)}
        authorHandle="@riquehen"
        siteLabel="henrique.dog"
        siteUrl={siteUrl}
        qrCodeDataUrl={qrCodeDataUrl}
      />
    </Column>
  );
}
