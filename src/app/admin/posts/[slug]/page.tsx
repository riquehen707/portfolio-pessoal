// src/app/admin/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import EditGitPostClient from "./EditGitPostClient";

export default function EditGitPostPage({ params }: { params: { slug: string } }) {
  const posts = getPosts(["src","app","blog","posts"]);
  const post = posts.find((p:any) => p.slug === params.slug);
  if (!post) notFound();

  // frontmatter pode ter tag (string) ou tags (string[])
  const tags = Array.isArray(post.metadata.tags)
    ? post.metadata.tags
    : post.metadata.tag ? [post.metadata.tag] : [];

  return (
    <EditGitPostClient
      slug={post.slug}
      title={post.metadata.title || ""}
      summary={post.metadata.summary || ""}
      image={post.metadata.image || ""}
      tags={tags}
      categories={post.metadata.categories || []}
      content={post.content || ""}
      publishedAt={post.metadata.publishedAt || ""}
    />
  );
}
