import { notFound } from "next/navigation";
import { Column, Heading } from "@once-ui-system/core";
import { Posts, PostData, PostFrontmatter } from "@/components/blog/Posts";
import { getAllTags, getPostsByTag } from "@/utils/posts";
import { getPosts } from "@/utils/utils";

export const dynamic = "force-static";
export const revalidate = 3600;

type PageProps = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const dailyPosts = getPosts(["src", "app", "diario", "posts"]);
  return getAllTags(dailyPosts).map((tag) => ({ tag }));
}

export default async function DiarioTagPage({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const dailyPosts = getPosts(["src", "app", "diario", "posts"]);
  const posts = getPostsByTag(decoded, dailyPosts);
  if (!posts.length) notFound();

  const formattedPosts: PostData[] = posts.map((post) => ({
    slug: post.slug,
    metadata: post.metadata as PostFrontmatter,
  }));

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Heading as="h1" variant="heading-strong-xl">
        Diário · Tag: {decoded}
      </Heading>
      <Posts columns="2" data={formattedPosts} />
    </Column>
  );
}
