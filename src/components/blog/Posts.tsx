import type { ComponentProps } from "react";

import { getPosts } from "@/utils/utils";
import { Column, Grid, Heading, Text } from "@once-ui-system/core";

import { BlogFile } from "@/utils/posts";

import Post from "./Post";

type Direction = "row" | "column";

export interface PostFrontmatter {
  title: string;
  publishedAt: string;
  tag?: string;
  tags?: string[];
  categories?: string[];
  image?: string;
  imageAlt?: string;
}

export interface PostData {
  slug: string;
  metadata: PostFrontmatter;
}

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: Direction;
  exclude?: string[];
  data?: PostData[];
  marginBottom?: ComponentProps<typeof Grid>["marginBottom"];
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  data,
  marginBottom = "40",
}: PostsProps) {
  let allBlogs: PostData[] = [];

  if (data && data.length) {
    allBlogs = data;
  } else {
    try {
      const raw = getPosts(["src", "app", "blog", "posts"]) as BlogFile[];
      allBlogs = raw.map((post) => ({
        slug: post.slug,
        metadata: post.metadata as PostFrontmatter,
      }));
    } catch {
      allBlogs = [];
    }
  }

  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = [...allBlogs].sort((a, b) => {
    const aTime = new Date(a.metadata?.publishedAt ?? 0).getTime() || 0;
    const bTime = new Date(b.metadata?.publishedAt ?? 0).getTime() || 0;
    return bTime - aTime;
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  if (!displayedBlogs.length) {
    return (
      <Column gap="8" marginBottom="24" padding="20">
        <Heading as="h3" variant="heading-strong-l">
          Sem publicacoes ainda
        </Heading>
        <Text onBackground="neutral-weak">
          Assim que houver posts, eles aparecem aqui automaticamente.
        </Text>
      </Column>
    );
  }

  return (
    <Grid
      columns={columns}
      s={{ columns: 1 }}
      fillWidth
      marginBottom={marginBottom}
      gap="16"
    >
      {displayedBlogs.map((post, idx) => (
        <Post
          key={post.slug}
          post={post}
          thumbnail={thumbnail}
          direction={direction}
          priority={thumbnail && idx === 0}
        />
      ))}
    </Grid>
  );
}
