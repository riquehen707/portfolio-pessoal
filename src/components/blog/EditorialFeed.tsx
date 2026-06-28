"use client";

import Link from "next/link";
import { useState } from "react";

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

export function EditorialFeed({ posts, initialCount = 8, step = 8 }: EditorialFeedProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  if (!posts.length) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {visiblePosts.map((post) => (
          <article className={styles.card} key={post.slug}>
            <Link className={styles.link} href={`/blog/${post.slug}`}>
              <span className={styles.meta}>
                {post.category ? <span>{post.category}</span> : null}
                {post.publishedAt ? <span>{formatDate(post.publishedAt, false)}</span> : null}
              </span>
              <h3 className={styles.title}>{post.title}</h3>
              {post.summary?.trim() ? <p className={styles.summary}>{post.summary}</p> : null}
            </Link>
          </article>
        ))}
      </div>

      {hasMore ? (
        <button
          className={styles.loadMore}
          onClick={() => setVisibleCount((current) => Math.min(current + step, posts.length))}
          type="button"
        >
          Ver mais
        </button>
      ) : null}
    </div>
  );
}
