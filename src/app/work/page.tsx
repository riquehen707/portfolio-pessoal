// src/app/work/page.tsx
import { Suspense } from "react";
import { Column, Heading, Schema, Text, Line } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects"; // Server Component

// ISR + renderização estática estável
export const revalidate = false;
export const dynamic = "force-static";

// (Opcional) Metadata estática; se preferir, pode manter o Meta.generate aqui,
// desde que não use searchParams/headers/cookies.
export async function generateMetadata() {
  return {
    title: work.title,
    description: work.description,
    alternates: { canonical: `${baseURL}${work.path}` },
    openGraph: {
      title: work.title,
      description: work.description,
      url: `${baseURL}${work.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(work.title)}` }],
    },
  };
}

// Skeleton simples
function ProjectsSkeleton() {
  return (
    <Column gap="16">
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
    </Column>
  );
}

export default function WorkPage() {
  const ogImage = `/api/og/generate?title=${encodeURIComponent(work.title)}`;

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={ogImage}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Heading as="h1" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>

      {work.description && (
        <Text align="center" onBackground="neutral-weak" marginBottom="8">
          {work.description}
        </Text>
      )}

      <Line maxWidth="40" />

      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
    </Column>
  );
}
