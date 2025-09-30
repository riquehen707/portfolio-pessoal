// src/app/work/page.tsx
import { Suspense } from "react";
import { Column, Heading, Meta, Schema, Text, Line } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import NextDynamic from "next/dynamic"; // ✅ alias para evitar conflito com `export const dynamic`

// Carrega a grade de projetos de forma adiada para melhorar TTFB
const Projects = NextDynamic(
  () => import("@/components/work/Projects").then((m) => m.Projects),
  { loading: () => <ProjectsSkeleton /> } // ❗não use ssr:false em Server Components
);

// ISR + renderização estática estável
export const revalidate = 60;
export const dynamic = "force-static";

// SEO / OpenGraph
export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

// Skeleton simples — troque por seu componente do design system se tiver
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
