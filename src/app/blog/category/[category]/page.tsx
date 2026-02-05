import { notFound } from "next/navigation";
import { Column, Heading } from "@once-ui-system/core";
import { Posts, PostData, PostFrontmatter } from "@/components/blog/Posts";
import { getAllCategories, getPostsByCategory } from "@/utils/posts";

export const dynamic = "force-static";
export const revalidate = 3600;

type PageProps = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c }));
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
      <Heading as="h1" variant="heading-strong-xl">Categoria: {decoded}</Heading>
      <Posts columns="2" data={formattedPosts} />
    </Column>
  );
}
