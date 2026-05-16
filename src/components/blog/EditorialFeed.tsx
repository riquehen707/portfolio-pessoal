"use client";

import Link from "next/link";
import { useState } from "react";

import { Media } from "@once-ui-system/core";

import { formatDate } from "@/utils/formatDate";

import styles from "./EditorialFeed.module.scss";

export type EditorialFeedPost = {
  slug: string;
  title: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  format?: string;
  readingTime?: number;
  publishedAt?: string;
};

type EditorialFeedProps = {
  posts: EditorialFeedPost[];
  initialCount?: number;
  step?: number;
};

export function EditorialFeed({
  posts,
  initialCount = 4,
  step = 4,
}: EditorialFeedProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const hasMore = visibleCount < posts.length;

  if (!posts.length) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {posts.map((post, index) => {
          const hidden = index >= visibleCount;

          return (
            <article
              aria-hidden={hidden ? "true" : undefined}
              className={styles.card}
              data-hidden={hidden ? "true" : "false"}
              key={post.slug}
            >
              <Link className={styles.link} href={`/blog/${post.slug}`}>
                <div className={styles.thumb}>
                  <Media
                    src={post.image ?? "/api/og/generate?title=Insights"}
                    alt={post.imageAlt ?? `Capa de ${post.title}`}
                    aspectRatio="16 / 9"
                    sizes="(max-width: 768px) 100vw, 320px"
                    radius="l"
                    border="transparent"
                  />
                </div>

                <div className={styles.content}>
                  <div className={styles.meta}>
                    {post.category ? <span className={styles.tag}>{post.category}</span> : null}
                    {post.format ? <span>{post.format}</span> : null}
                    {post.readingTime ? <span>{post.readingTime} min</span> : null}
                    {post.publishedAt ? <span>{formatDate(post.publishedAt, false)}</span> : null}
                  </div>

                  <h3 className={styles.title}>{post.title}</h3>

                  {post.summary?.trim() ? (
                    <p className={styles.summary}>{post.summary}</p>
                  ) : null}
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {hasMore ? (
        <div className={styles.loadMoreWrap}>
          <button
            className={styles.loadMore}
            onClick={() => setVisibleCount((current) => Math.min(current + step, posts.length))}
            type="button"
          >
            Carregar mais
          </button>
        </div>
      ) : null}
    </div>
  );
}
