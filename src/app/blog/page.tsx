// src/app/blog/page.tsx
import { Suspense } from "react";
import { Column, Heading, Schema, Text } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";

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
    </Column>
  );
}
