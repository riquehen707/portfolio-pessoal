import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  AvatarGroup,
  Column,
  Heading,
  Line,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";

import { ScrollToHash, CustomMDX } from "@/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { buildOgImage } from "@/utils/og";
import { getPosts } from "@/utils/utils";

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

function toLocal(src?: string): string | undefined {
  if (!src) return undefined;
  try {
    const u = new URL(src, baseURL);
    return u.pathname + u.search;
  } catch {
    return src;
  }
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
    buildOgImage(post.metadata.title, post.metadata.tag ?? post.metadata.tags?.[0] ?? "Projeto");

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary ?? post.metadata.title,
    baseURL,
    image: toAbs(image),
    path: `${work.path}/${post.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);

  const post = getPosts(["src", "app", "work", "projects"]).find((item) => item.slug === slugPath);

  if (!post) notFound();

  const avatars =
    post.metadata.team?.flatMap((member) =>
      member.avatar ? [{ src: toLocal(member.avatar) as string }] : [],
    ) || [];

  const cover =
    post.metadata.image ||
    post.metadata.images?.[0] ||
    buildOgImage(post.metadata.title, post.metadata.tag ?? post.metadata.tags?.[0] ?? "Projeto");

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="article"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary ?? post.metadata.title}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.updatedAt ?? post.metadata.publishedAt}
        image={toAbs(cover)}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projetos</Text>
        </SmartLink>
        {post.metadata.publishedAt && (
          <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
            {formatDate(post.metadata.publishedAt)}
          </Text>
        )}
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      {avatars.length > 0 && (
        <Row marginBottom="32" horizontal="center">
          <Row gap="16" vertical="center" wrap>
            <AvatarGroup reverse avatars={avatars} size="s" />
            <Text variant="label-default-m" onBackground="brand-weak">
              {post.metadata.team?.map((member, idx) => (
                <span key={idx}>
                  {idx > 0 && (
                    <Text as="span" onBackground="neutral-weak">
                      {", "}
                    </Text>
                  )}
                  {member.linkedIn ? (
                    <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                  ) : (
                    <Text as="span">{member.name}</Text>
                  )}
                </span>
              ))}
            </Text>
          </Row>
        </Row>
      )}
      {cover && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt={post.metadata.title}
          src={toLocal(cover) ?? cover}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Projetos relacionados
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
