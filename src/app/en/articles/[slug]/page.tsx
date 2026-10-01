import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CustomMDX } from "@/components";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getArticleBySlug, getArticlesByLocale, getArticlesByTranslationKey } from "@/data/articles";
import { baseURL } from "@/resources";
import { getArticlePath, openGraphLocale } from "@/lib/contentLocale";

type PageProps = { params: Promise<{ slug: string }> };

function absolute(path?: string) {
  return path ? new URL(path, baseURL).toString() : undefined;
}

function translationAlternates(translationKey?: string) {
  if (!translationKey) return undefined;
  const translations = getArticlesByTranslationKey(translationKey);
  const pt = translations.find((item) => item.metadata.locale === "pt-BR");
  const en = translations.find((item) => item.metadata.locale === "en");
  if (!pt || !en) return undefined;
  return {
    languages: {
      "pt-BR": `${baseURL}${getArticlePath(pt.slug, "pt-BR")}`,
      en: `${baseURL}${getArticlePath(en.slug, "en")}`,
      "x-default": `${baseURL}${getArticlePath(pt.slug, "pt-BR")}`,
    },
  };
}

export async function generateStaticParams() {
  return getArticlesByLocale("en").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getArticleBySlug((await params).slug, "en");
  if (!post) return {};
  const path = getArticlePath(post.slug, "en");
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    alternates: {
      canonical: post.metadata.canonical ?? `${baseURL}${path}`,
      ...translationAlternates(post.metadata.translationKey),
    },
    openGraph: {
      type: "article",
      locale: openGraphLocale("en"),
      url: `${baseURL}${path}`,
      title: post.metadata.title,
      description: post.metadata.summary,
      images: absolute(post.metadata.image) ? [absolute(post.metadata.image)!] : undefined,
    },
  };
}

export default async function EnglishArticlePage({ params }: PageProps) {
  const post = getArticleBySlug((await params).slug, "en");
  if (!post) notFound();
  const path = getArticlePath(post.slug, "en");
  const translations = post.metadata.translationKey
    ? getArticlesByTranslationKey(post.metadata.translationKey)
    : [];
  const portuguese = translations.find((item) => item.metadata.locale === "pt-BR");

  return (
    <article lang="en" style={{ width: "min(100% - 2rem, 52rem)", margin: "5rem auto", minWidth: 0 }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseURL },
          { name: "Articles", url: `${baseURL}/en/articles` },
          { name: post.metadata.title, url: `${baseURL}${path}` },
        ]}
      />
      <header>
        <p>{post.metadata.category ?? "Article"}</p>
        <h1>{post.metadata.title}</h1>
        {post.metadata.summary ? <p>{post.metadata.summary}</p> : null}
        {portuguese ? <Link href={getArticlePath(portuguese.slug, "pt-BR")}>Português</Link> : null}
        {post.metadata.image ? (
          <Image src={post.metadata.image} alt={post.metadata.imageAlt ?? post.metadata.title} width={1200} height={675} sizes="(max-width: 900px) 100vw, 832px" unoptimized style={{ width: "100%", height: "auto", marginTop: "2rem" }} />
        ) : null}
      </header>
      <CustomMDX source={post.content} glossary={post.metadata.glossary ?? {}} locale="en" market={post.metadata.market ?? "US"} />
    </article>
  );
}
