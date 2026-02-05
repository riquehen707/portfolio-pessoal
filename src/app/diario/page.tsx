import { Suspense } from "react";
import { Column, Heading, Schema, Text, Button, Row, Line } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { baseURL, daily, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { getAllTags } from "@/utils/posts";

const FEATURED_RANGE: [number, number] = [1, 1];
const RECENTS_RANGE: [number, number] = [2, 4];
const EARLIER_RANGE: [number] = [5];

export const revalidate = false;
export const dynamic = "force-static";

export async function generateMetadata() {
  return {
    title: daily.title,
    description: daily.description,
    alternates: { canonical: `${baseURL}${daily.path}` },
    openGraph: {
      title: daily.title,
      description: daily.description,
      url: `${baseURL}${daily.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(daily.title)}` }],
    },
  };
}

function PostsSkeleton() {
  return (
    <Column gap="16">
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
    </Column>
  );
}

export default function DiarioPage() {
  const pageTitle = daily.title;
  const ogImage = `/api/og/generate?title=${encodeURIComponent(pageTitle)}`;
  const posts = getPosts(["src", "app", "diario", "posts"]);
  const data = posts.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt || "",
      tag: post.metadata.tag,
      image: post.metadata.image,
    },
  }));

  const featuredTags = getAllTags(posts).slice(0, 10);

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={pageTitle}
        description={daily.description}
        path={daily.path}
        image={ogImage}
        author={{
          name: person.name,
          url: `${baseURL}${daily.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Heading as="h1" variant="heading-strong-xl">
        {pageTitle}
      </Heading>
      <Text onBackground="neutral-weak">{daily.description}</Text>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={FEATURED_RANGE} thumbnail data={data} />
      </Suspense>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={RECENTS_RANGE} columns="2" thumbnail direction="column" data={data} />
      </Suspense>

      <Heading as="h2" variant="heading-strong-xl" marginTop="l">
        Entradas anteriores
      </Heading>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={EARLIER_RANGE} columns="2" data={data} />
      </Suspense>

      {featuredTags.length > 0 && (
        <Column
          fillWidth
          padding="24"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          gap="16"
          s={{ padding: "16" }}
        >
          <Heading as="h2" variant="heading-strong-s">
            Temas frequentes
          </Heading>
          <Row wrap gap="8">
            {featuredTags.map((tag) => (
              <Button
                key={tag}
                href={`/diario/tag/${encodeURIComponent(tag)}`}
                variant="tertiary"
                size="s"
              >
                {tag}
              </Button>
            ))}
          </Row>
          <Line maxWidth="40" />
        </Column>
      )}
    </Column>
  );
}

