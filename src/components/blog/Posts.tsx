// src/components/blog/Posts.tsx
import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

type Direction = "row" | "column";

interface PostFrontmatter {
  title: string;
  publishedAt: string;
  tag?: string;
  image?: string;
  imageAlt?: string;
}

interface PostData {
  slug: string;
  metadata: PostFrontmatter;
}

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: Direction;
  exclude?: string[];
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
}: PostsProps) {
  // getPosts deve retornar [{ slug, metadata }, ...]
  let allBlogs = getPosts(["src", "app", "blog", "posts"]) as PostData[];

  // Excluir por slug (match exato)
  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  // Ordena por data (desc) sem mutar a origem
  const sortedBlogs = [...allBlogs].sort((a, b) => {
    const aTime = new Date(a.metadata.publishedAt).getTime() || 0;
    const bTime = new Date(b.metadata.publishedAt).getTime() || 0;
    return bTime - aTime;
  });

  // Recorte pelo range (1-based)
  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  if (!displayedBlogs.length) return null;

  return (
    <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
      {displayedBlogs.map((post, idx) => (
        <Post
          key={post.slug}
          post={post}
          thumbnail={thumbnail}
          direction={direction}
          // Prioriza imagem só no primeiro card desta grade/seção
          priority={thumbnail && idx === 0}
        />
      ))}
    </Grid>
  );
}
