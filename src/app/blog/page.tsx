// src/app/blog/page.tsx
import { Suspense } from "react";
import { Column, Heading, Text } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { BlogPillars } from "@/components/blog/BlogPillars";
import { PILLARS } from "@/utils/pillars";

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

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { pillar?: string };
}) {
  const current = searchParams?.pillar;
  const pillar = current ? PILLARS.find((p) => p.slug === current) : undefined;
  const pageTitle = pillar ? pillar.label : "Blog";

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <SectionHeading as="h1">{pageTitle}</SectionHeading>

      <BlogPillars currentPillar={current} />

      {pillar && (
        <Text onBackground="neutral-weak">
          Exibindo posts do pilar <strong>{pillar.label}</strong>.{" "}
          <a href="/blog">Ver todos</a>
        </Text>
      )}

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={[1, 1]} thumbnail />
      </Suspense>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
      </Suspense>

      <SectionHeading as="h2" marginTop="l">
        Posts anteriores
      </SectionHeading>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={[4]} columns="2" />
      </Suspense>
    </Column>
  );
}
