"use client";

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";

import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";

import Post from "./Post";
import type { PostData } from "./Posts";
import styles from "./BlogExplorer.module.scss";

type BlogTaxonomyItem = {
  key: string;
  label: string;
  count: number;
};

type BlogExplorerProps = {
  posts: PostData[];
  categories: BlogTaxonomyItem[];
  tags: BlogTaxonomyItem[];
};

type ViewMode = "grid" | "list";

const ALL_FILTER = "all";
const INITIAL_BATCH = 6;
const LOAD_STEP = 6;

function matchesCategory(post: PostData, category: string) {
  if (category === ALL_FILTER) return true;
  return (
    post.metadata.category === category ||
    post.metadata.categories?.includes(category)
  );
}

function matchesTag(post: PostData, tag: string) {
  if (tag === ALL_FILTER) return true;
  return post.metadata.tag === tag || post.metadata.tags?.includes(tag);
}

export default function BlogExplorer({ posts, categories, tags }: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_FILTER);
  const [activeTag, setActiveTag] = useState<string>(ALL_FILTER);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [isPending, startTransition] = useTransition();

  const deferredCategory = useDeferredValue(activeCategory);
  const deferredTag = useDeferredValue(activeTag);

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) => matchesCategory(post, deferredCategory) && matchesTag(post, deferredTag),
    );
  }, [deferredCategory, deferredTag, posts]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
  }, [activeCategory, activeTag]);

  const handleCategoryChange = (nextCategory: string) => {
    if (nextCategory === activeCategory) return;
    startTransition(() => setActiveCategory(nextCategory));
  };

  const handleTagChange = (nextTag: string) => {
    if (nextTag === activeTag) return;
    startTransition(() => setActiveTag(nextTag));
  };

  const activeCategoryLabel =
    categories.find((category) => category.key === deferredCategory)?.label ?? "Todas";
  const activeTagLabel = tags.find((tag) => tag.key === deferredTag)?.label ?? "Todas";

  return (
    <Column className={styles.root} gap="20">
      <div className={styles.panel}>
        <div className={styles.panelTop}>
          <Column className={styles.panelCopy} gap="8">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Explorar arquivo
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Navegação por categorias e tags
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Filtros discretos para navegar o arquivo sem transformar o blog em painel pesado.
            </Text>
          </Column>

          <div className={styles.viewSwitch} aria-label="Modo de visualização">
            <button
              className={`${styles.viewButton} ${viewMode === "grid" ? styles.viewButtonActive : ""}`}
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              type="button"
            >
              Grade
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === "list" ? styles.viewButtonActive : ""}`}
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              type="button"
            >
              Lista
            </button>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <Text className={styles.filterLabel} variant="label-default-s" onBackground="neutral-weak">
            Categorias
          </Text>
          <div className={styles.filterRail}>
            <button
              className={`${styles.filterButton} ${activeCategory === ALL_FILTER ? styles.filterButtonActive : ""}`}
              onClick={() => handleCategoryChange(ALL_FILTER)}
              aria-pressed={activeCategory === ALL_FILTER}
              type="button"
            >
              <span>Todas</span>
              <span className={styles.filterCount}>{posts.length}</span>
            </button>

            {categories.map((category) => (
              <button
                className={`${styles.filterButton} ${activeCategory === category.key ? styles.filterButtonActive : ""}`}
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                aria-pressed={activeCategory === category.key}
                type="button"
              >
                <span>{category.label}</span>
                <span className={styles.filterCount}>{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <Text className={styles.filterLabel} variant="label-default-s" onBackground="neutral-weak">
            Tags
          </Text>
          <div className={styles.filterRail}>
            <button
              className={`${styles.filterButton} ${activeTag === ALL_FILTER ? styles.filterButtonActive : ""}`}
              onClick={() => handleTagChange(ALL_FILTER)}
              aria-pressed={activeTag === ALL_FILTER}
              type="button"
            >
              <span>Todas</span>
            </button>

            {tags.map((tag) => (
              <button
                className={`${styles.filterButton} ${activeTag === tag.key ? styles.filterButtonActive : ""}`}
                key={tag.key}
                onClick={() => handleTagChange(tag.key)}
                aria-pressed={activeTag === tag.key}
                type="button"
              >
                <span>{tag.label}</span>
                <span className={styles.filterCount}>{tag.count}</span>
              </button>
            ))}
          </div>
        </div>

        <Row className={styles.resultBar} gap="12" wrap vertical="center">
          <Text variant="body-default-s" onBackground="neutral-weak">
            {filteredPosts.length} artigo{filteredPosts.length === 1 ? "" : "s"} encontrados
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {`Categoria: ${activeCategoryLabel} · Tag: ${activeTagLabel}`}
          </Text>
        </Row>
      </div>

      {visiblePosts.length > 0 ? (
        viewMode === "grid" ? (
          <div className={styles.archiveGrid}>
            {visiblePosts.map((post, index) => (
              <Post
                key={post.slug}
                post={post}
                thumbnail
                direction="column"
                showSummary
                priority={index < 2}
              />
            ))}
          </div>
        ) : (
          <div className={styles.archiveList}>
            {visiblePosts.map((post, index) => (
              <Post
                key={post.slug}
                post={post}
                thumbnail
                direction="row"
                showSummary
                priority={index === 0}
              />
            ))}
          </div>
        )
      ) : (
        <div className={styles.emptyState}>
          <Heading as="h3" variant="heading-strong-l">
            Nenhum artigo encontrado
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Troque a categoria ou a tag para continuar explorando o arquivo editorial.
          </Text>
        </div>
      )}

      <div className={styles.loadZone}>
        {isPending && (
          <Text variant="body-default-s" onBackground="neutral-weak">
            Atualizando o arquivo...
          </Text>
        )}

        {!isPending && hasMore && (
          <Button
            onClick={() => setVisibleCount((current) => Math.min(current + LOAD_STEP, filteredPosts.length))}
            variant="secondary"
            size="m"
          >
            Carregar mais artigos
          </Button>
        )}

        {!isPending && !hasMore && filteredPosts.length > INITIAL_BATCH && (
          <Text variant="body-default-s" onBackground="neutral-weak">
            Você chegou ao fim desta seleção.
          </Text>
        )}
      </div>
    </Column>
  );
}
