"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Column, Grid, Heading, Row, SmartLink, Tag, Text } from "@once-ui-system/core";

import Post from "./Post";
import type { PostData } from "./Posts";
import styles from "./BlogExplorer.module.scss";

type BlogCategory = {
  key: string;
  label: string;
  description: string;
  count: number;
};

type BlogExplorerProps = {
  posts: PostData[];
  categories: BlogCategory[];
};

const ALL_POSTS_KEY = "all";
const FEATURED_COUNT = 4;
const INITIAL_BATCH = 6;
const LOAD_STEP = 4;

export default function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_POSTS_KEY);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const deferredCategory = useDeferredValue(activeCategory);
  const tabs = useMemo(
    () => [
      {
        key: ALL_POSTS_KEY,
        label: "Tudo",
        description:
          "Arquivo completo de publicações organizado para facilitar leitura, contexto e navegação por tema.",
        count: posts.length,
      },
      ...categories,
    ],
    [categories, posts.length],
  );

  const activeTab = tabs.find((tab) => tab.key === deferredCategory) ?? tabs[0];

  const filteredPosts = useMemo(() => {
    if (deferredCategory === ALL_POSTS_KEY) return posts;
    return posts.filter((post) => post.metadata.categories?.includes(deferredCategory));
  }, [deferredCategory, posts]);

  const featuredPosts = filteredPosts.slice(0, FEATURED_COUNT);
  const feedPosts = filteredPosts.slice(FEATURED_COUNT, FEATURED_COUNT + visibleCount);
  const hasMore = FEATURED_COUNT + visibleCount < filteredPosts.length;

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
  }, [activeCategory]);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setVisibleCount((current) =>
          Math.min(current + LOAD_STEP, Math.max(0, filteredPosts.length - FEATURED_COUNT)),
        );
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredPosts.length, hasMore]);

  const handleCategoryChange = (nextCategory: string) => {
    if (nextCategory === activeCategory) return;

    startTransition(() => {
      setActiveCategory(nextCategory);
    });
  };

  return (
    <Column className={styles.root} gap="24">
      <Column className={styles.panel} gap="16" padding="20">
        <Row className={styles.panelHeader} gap="12" wrap vertical="center">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Explorar arquivo
          </Tag>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {tabs.length - 1} trilhas editoriais
          </Text>
        </Row>

        <Row className={styles.tabs} gap="12" wrap>
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.key;

            return (
              <button
                aria-pressed={isActive}
                className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
                key={tab.key}
                onClick={() => handleCategoryChange(tab.key)}
                type="button"
              >
                <span>{tab.label}</span>
                <span className={styles.tabCount}>{tab.count}</span>
              </button>
            );
          })}
        </Row>

        <Row className={styles.categorySummary} gap="12" wrap vertical="end">
          <Column className={styles.categoryIntro} gap="8">
            <Heading as="h2" variant="heading-strong-l">
              {activeTab.label}
            </Heading>
            <Text onBackground="neutral-weak">{activeTab.description}</Text>
          </Column>

          {activeTab.key !== ALL_POSTS_KEY && (
            <SmartLink
              href={`/blog/category/${encodeURIComponent(activeTab.key)}`}
              suffixIcon="arrowRight"
            >
              Abrir categoria
            </SmartLink>
          )}
        </Row>
      </Column>

      {featuredPosts.length > 0 ? (
        <Column className={styles.featuredSplit}>
          <Post
            post={featuredPosts[0]}
            thumbnail
            direction="column"
            variant="feature"
            priority
            showSummary
          />
          {featuredPosts.length > 1 && (
            <div className={styles.sideList}>
              {featuredPosts.slice(1).map((post) => (
                <Post key={post.slug} post={post} variant="compact" showSummary />
              ))}
            </div>
          )}
        </Column>
      ) : (
        <Column className={styles.emptyState} gap="8" padding="20">
          <Heading as="h3" variant="heading-strong-l">
            Sem publicações nesta categoria
          </Heading>
          <Text onBackground="neutral-weak">
            Escolha outra trilha para continuar explorando os textos.
          </Text>
        </Column>
      )}

      {feedPosts.length > 0 && (
        <Column gap="16">
          <Row className={styles.feedHeader} gap="12" wrap vertical="end">
            <Column gap="8">
              <Tag size="s" background="neutral-alpha-weak">
                Leituras publicadas
              </Tag>
              <Heading as="h2" variant="heading-strong-l">
                Arquivo em destaque
              </Heading>
            </Column>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {filteredPosts.length} textos nesta trilha
            </Text>
          </Row>

          <Grid className={styles.feedGrid} columns="2" s={{ columns: 1 }} gap="16">
            {feedPosts.map((post, idx) => (
              <Post
                key={post.slug}
                post={post}
                thumbnail
                direction="column"
                showSummary
                priority={idx === 0}
              />
            ))}
          </Grid>
        </Column>
      )}

      <div className={styles.loadZone}>
        {isPending && (
          <Text variant="body-default-s" onBackground="neutral-weak">
            Atualizando a trilha...
          </Text>
        )}

        {!isPending && hasMore && (
          <Text variant="body-default-s" onBackground="neutral-weak">
            Role para carregar mais textos
          </Text>
        )}

        {!isPending && !hasMore && filteredPosts.length > FEATURED_COUNT && (
          <Text variant="body-default-s" onBackground="neutral-weak">
            Você chegou ao fim desta trilha.
          </Text>
        )}

        <div aria-hidden className={styles.sentinel} ref={sentinelRef} />
      </div>
    </Column>
  );
}
