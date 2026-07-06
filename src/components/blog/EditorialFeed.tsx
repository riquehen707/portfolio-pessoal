"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi2";

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
        {visiblePosts.map((post, index) => (
          <article className={styles.card} data-card-type="article" key={post.slug}>
            <Link className={styles.link} href={`/blog/${post.slug}`}>
              <span className={styles.media}>
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fill
                    priority={index < 3}
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                ) : (
                  <span className={styles.mediaFallback} aria-hidden="true" />
                )}
              </span>
              <span className={styles.body}>
                <span className={styles.meta}>
                  {post.category ? <span className={styles.category}>{post.category}</span> : null}
                  {post.readingTime ? (
                    <span className={styles.readingTime}>{post.readingTime} min de leitura</span>
                  ) : null}
                </span>
                <h3 className={styles.title}>{post.title}</h3>
                {post.summary?.trim() ? <p className={styles.summary}>{post.summary}</p> : null}
                <span className={styles.readMore} aria-hidden="true">
                  Ler artigo
                  <HiOutlineArrowRight />
                </span>
              </span>
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
          Ver mais artigos
        </button>
      ) : null}
    </div>
  );
}
