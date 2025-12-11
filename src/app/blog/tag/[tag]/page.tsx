import { notFound } from "next/navigation";
import { Column, Heading } from "@once-ui-system/core";
import { Posts, PostData, PostFrontmatter } from "@/components/blog/Posts";
import { getAllTags, getPostsByTag } from "@/utils/posts";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();

  const formattedPosts: PostData[] = posts.map((post) => ({
    slug: post.slug,
    metadata: post.metadata as PostFrontmatter,
  }));

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Heading as="h1" variant="heading-strong-xl">
        Tag: {tag}
      </Heading>
      <Posts columns="2" data={formattedPosts} />
    </Column>
  );
}
