import { notFound } from "next/navigation";
import { Column, Heading, Meta, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import { Posts, PostData, PostFrontmatter } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
import { getAllCategories, getPostsByCategory } from "@/utils/posts";

import styles from "../../blog.module.scss";

export const dynamic = "force-static";
export const revalidate = 3600;

type PageProps = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);

  return Meta.generate({
    title: `${decoded} | ${blog.title}`,
    description: `Textos da categoria ${decoded} dentro do caderno editorial de ${person.name}.`,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(decoded)}`,
    path: `${blog.path}/category/${encodeURIComponent(decoded)}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getPostsByCategory(decoded);
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
        description={`Textos da categoria ${decoded} dentro do caderno editorial de ${person.name}.`}
        path={`${blog.path}/category/${encodeURIComponent(decoded)}`}
        image={`/api/og/generate?title=${encodeURIComponent(decoded)}`}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Categoria
        </Tag>
        <Heading as="h1" variant="heading-strong-xl">
          {decoded}
        </Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
          Uma trilha editorial para reunir textos com o mesmo eixo temático e facilitar a navegação.
        </Text>
        <Row gap="12" wrap vertical="center">
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formattedPosts.length} textos nesta categoria
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
