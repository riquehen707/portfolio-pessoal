import { notFound } from "next/navigation";
import { Column, Heading, Meta, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import { Posts, PostData, PostFrontmatter } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
import { getAllTags, getPostsByTag } from "@/utils/posts";

import styles from "../../blog.module.scss";

export const dynamic = "force-static";
export const revalidate = 3600;

type PageProps = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  return Meta.generate({
    title: `${decoded} | ${blog.title}`,
    description: `Textos marcados com ${decoded} dentro do caderno editorial de ${person.name}.`,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(decoded)}`,
    path: `${blog.path}/tag/${encodeURIComponent(decoded)}`,
  });
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (!posts.length) notFound();

  const formattedPosts: PostData[] = posts.map((post) => ({
    slug: post.slug,
    metadata: post.metadata as PostFrontmatter,
  }));

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`${decoded} | ${blog.title}`}
        description={`Textos marcados com ${decoded} dentro do caderno editorial de ${person.name}.`}
        path={`${blog.path}/tag/${encodeURIComponent(decoded)}`}
        image={`/api/og/generate?title=${encodeURIComponent(decoded)}`}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Tag
        </Tag>
        <Heading as="h1" variant="heading-strong-xl">
          {decoded}
        </Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
          Uma leitura mais específica para quem quer explorar um tema, autor, conceito ou referência.
        </Text>
        <Row gap="12" wrap vertical="center">
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formattedPosts.length} textos com esta tag
          </Text>
          <SmartLink href={blog.path} suffixIcon="arrowRight">
            Voltar para o blog
          </SmartLink>
        </Row>
      </Column>

      <Posts data={formattedPosts} columns="2" thumbnail direction="column" showSummary />
    </Column>
  );
}
