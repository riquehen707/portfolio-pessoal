// src/app/blog/page.tsx
import { Suspense } from "react";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
import { PILLARS } from "@/utils/pillars";

const FEATURED_RANGE: [number, number] = [1, 1];
const RECENTS_RANGE: [number, number] = [2, 3];
const EARLIER_RANGE: number[] = [4];

export const revalidate = 60;
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { pillar?: string };
}) {
  const current = searchParams?.pillar;
  const pillar = PILLARS.find((p) => p.slug === current);
  const title = pillar ? `${pillar.label} · ${blog.title}` : blog.title;
  const description = pillar
    ? `Artigos do pilar ${pillar.label}. ${blog.description}`
    : blog.description;

  return Meta.generate({
    title,
    description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: blog.path,
  });
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { pillar?: string };
}) {
  const current = searchParams?.pillar;
  const pillar = PILLARS.find((p) => p.slug === current);

  const pageTitle = pillar ? pillar.label : blog.title;
  const ogImage = `/api/og/generate?title=${encodeURIComponent(pageTitle)}`;

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
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

      {pillar && (
        <Text onBackground="neutral-weak">
          Exibindo posts do pilar <strong>{pillar.label}</strong>.{" "}
          <a href="/blog">Ver todos</a>
        </Text>
      )}

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
