// src/app/work/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";

import { getPosts } from "@/utils/utils";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Projects } from "@/components/work/Projects";

// ISR estável
export const revalidate = 60;
export const dynamic = "force-static";

// Helpers
function normalizeSlug(slugParam: string | string[] | undefined): string {
  if (!slugParam) return "";
  return Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
}

// Absolutiza (para SEO/OG/Schema)
function toAbs(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  try {
    return new URL(pathOrUrl, baseURL).toString();
  } catch {
    return pathOrUrl;
  }
}

// Força caminho local (para next/image em Media/Avatar/AvatarGroup)
function toLocal(src?: string): string | undefined {
  if (!src) return undefined;
  try {
    const u = new URL(src, baseURL);
    return u.pathname + u.search; // ex.: "/images/xxx.jpg"
  } catch {
    return src; // já é relativo
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((p) => ({ slug: p.slug }));
}

// SEO por projeto
export async function generateMetadata({
  params,
}: {
  params: { slug: string | string[] };
}): Promise<Metadata> {
  const slugPath = normalizeSlug(params.slug);
  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((p) => p.slug === slugPath);
  if (!post) return {};

  const title = post.metadata.title;
  const description = post.metadata.summary;
  const image = post.metadata.image || `/api/og/generate?title=${encodeURIComponent(title)}`;
  const path = `${work.path}/${post.slug}`;

  return Meta.generate({
    title,
    description,
    baseURL,
    image: toAbs(image), // ✅ absoluto para OG
    path,
  });
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string | string[] };
}) {
  const slugPath = normalizeSlug(params.slug);
  const post = getPosts(["src", "app", "work", "projects"]).find((p) => p.slug === slugPath);

  if (!post) notFound();

  const datePublished = post.metadata.publishedAt ?? undefined;
  const dateModified = post.metadata.updatedAt ?? post.metadata.publishedAt ?? undefined;

  // Equipe (avatar local p/ evitar host não permitido)
  const team = Array.isArray(post.metadata.team) ? post.metadata.team : [];
  const avatars = team
    .map((m: any) => ({ src: toLocal(m?.avatar) }))
    .filter((a) => Boolean(a.src));

  // Capa (usa local no componente visual)
  const cover =
    post.metadata.image ||
    (Array.isArray(post.metadata.images) && post.metadata.images.length > 0 ? post.metadata.images[0] : undefined);

  const ogImage = toAbs(
    cover || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
  );
  const canonicalPath = `${work.path}/${post.slug}`;

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
      {/* Para página de projeto, "article" é ok (se o Schema aceitar "CreativeWork", pode trocar) */}
      <Schema
        as="article"
        baseURL={baseURL}
        path={canonicalPath}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={datePublished}
        dateModified={dateModified}
        image={ogImage} // ✅ absoluto
        author={{
          name: person.name,
          url: toAbs(about.path)!,
          image: toAbs(person.avatar)!,
        }}
      />

      {/* Breadcrumb + título */}
      <Column maxWidth="s" gap="12" horizontal="center" align="center">
        <SmartLink href="/work" underline="hover">
          <Text variant="label-strong-m">Projetos</Text>
        </SmartLink>

        {datePublished && (
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {formatDate(datePublished)}
          </Text>
        )}

        <Heading variant="display-strong-m" align="center">
          {post.metadata.title}
        </Heading>
      </Column>

      {/* Equipe (se houver) */}
      {avatars.length > 0 && (
        <Row marginBottom="24" horizontal="center">
          <Row gap="12" vertical="center" wrap>
            <AvatarGroup reverse avatars={avatars} size="s" />
            <Text variant="label-default-m" onBackground="brand-weak">
              {team.map((member: any, idx: number) => (
                <span key={idx}>
                  {idx > 0 && (
                    <Text as="span" onBackground="neutral-weak">
                      {", "}
                    </Text>
                  )}
                  {member?.linkedIn ? (
                    <SmartLink href={member.linkedIn}>{member?.name || "Integrante"}</SmartLink>
                  ) : (
                    <Text as="span">{member?.name || "Integrante"}</Text>
                  )}
                </span>
              ))}
            </Text>
          </Row>
        </Row>
      )}

      {/* Capa (opcional) */}
      {cover && (
        <Media
          priority
          aspectRatio="16/9"
          radius="l"
          alt={post.metadata.title}
          src={toLocal(cover)} // ✅ local para next/image
          sizes="(min-width: 1024px) 960px, 100vw"
          border="neutral-alpha-weak"
          marginTop="4"
          marginBottom="8"
        />
      )}

      {/* Conteúdo */}
      <Column as="article" maxWidth="s" style={{ margin: "auto" }}>
        <CustomMDX source={post.content} />
      </Column>

      {/* Relacionados */}
      <Column fillWidth gap="32" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="12" align="center">
          Projetos relacionados
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>

      <ScrollToHash />
    </Column>
  );
}
