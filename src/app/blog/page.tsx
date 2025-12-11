// src/app/blog/page.tsx
import { Suspense } from "react";
import { Column, Heading, Schema, Text, Button, Row } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
import { getAllCategories, getAllTags } from "@/utils/posts";

const FEATURED_RANGE: [number, number] = [1, 1];
const RECENTS_RANGE: [number, number] = [2, 3];
const EARLIER_RANGE: number[] = [4];

// Mantém a página estática com revalidação
export const revalidate = false;
export const dynamic = "force-static";

function SectionHeading({
  children,
  as = "h2",
  marginTop = "0",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  marginTop?: "0" | "m" | "l" | "xl";
}) {
  return (
    <Heading as={as} variant="heading-strong-xl" marginTop={marginTop} marginBottom="l">
      {children}
    </Heading>
  );
}

function PostsSkeleton() {
  return (
    <Column gap="16">
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
    </Column>
  );
}

export default function BlogPage() {
  const pageTitle = blog.title;
  const ogImage = `/api/og/generate?title=${encodeURIComponent(pageTitle)}`;
  const categories = getAllCategories();
  const tags = getAllTags();
  const featuredCategories = categories.slice(0, 6);
  const featuredTags = tags.slice(0, 12);

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      {/* Schema estático (não interfere no SSG) */}
      <Schema
        as="Blog"
        baseURL={baseURL}
        title={pageTitle}
        description={blog.description}
        path={blog.path}
        image={ogImage}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <SectionHeading as="h1">{pageTitle}</SectionHeading>

      {/* Destaque */}
      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={FEATURED_RANGE} thumbnail />
      </Suspense>

      {/* Recentes */}
      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={RECENTS_RANGE} columns="2" thumbnail direction="column" />
      </Suspense>

      {/* Anteriores */}
      <SectionHeading as="h2" marginTop="l">
        Posts anteriores
      </SectionHeading>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={EARLIER_RANGE} columns="2" />
      </Suspense>

      <Column
        fillWidth
        padding="24"
        radius="l"
        background="surface-weak"
        gap="16"
        s={{ padding: "16" }}
      >
        <Heading as="h2" variant="heading-strong-s">
          Categorias e temas
        </Heading>
        <Text onBackground="neutral-weak">
          Cada categoria agrupa posts alinhados com estratégias, cultura e narrativas de produto.
          Use-as para guiar o que você quer estudar hoje.
        </Text>
        <Row wrap gap="8">
          {featuredCategories.map((category) => (
            <Button
              key={category}
              href={`/blog/category/${encodeURIComponent(category)}`}
              variant="ghost"
              size="s"
            >
              {category}
            </Button>
          ))}
        </Row>
        <Heading as="h3" variant="heading-strong-s" marginTop="m">
          Palavras-chave
        </Heading>
        <Row wrap gap="8">
          {featuredTags.map((tag) => (
            <Button
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              variant="ghost"
              size="s"
            >
              {tag}
            </Button>
          ))}
        </Row>
      </Column>
    </Column>
  );
}
