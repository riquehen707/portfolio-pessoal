import React from "react";
import { Column, Grid, Card, Text, Heading, SmartLink, Badge, Row, Media } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils";
import { buildOgImage } from "@/utils/og";

type RelatedPostsProps = {
  currentSlug: string;
  pillar?: string;
  categories?: string[];
  tags?: string[];
  keywords?: string[];
  limit?: number;
};

function overlapScore(a: string[] = [], b: string[] = []) {
  const setB = new Set(b.map((x) => x.toLowerCase()));
  return a.reduce((acc, x) => acc + (setB.has(x.toLowerCase()) ? 1 : 0), 0);
}

export default function RelatedPosts({
  currentSlug,
  pillar,
  categories = [],
  tags = [],
  keywords = [],
  limit = 4,
}: RelatedPostsProps) {
  const posts = getPosts(["src", "app", "blog", "posts"]);

  const related = posts
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => p.metadata.status !== "draft") // respeita drafts
    .map((p) => {
      const pPillar = p.metadata.pillar;
      const pCategories = p.metadata.categories ?? [];
      const pTags = p.metadata.tags ?? (p.metadata.tag ? [p.metadata.tag] : []);
      const pKeywords = p.metadata.keywords ?? [];

      const samePillar = pillar && pPillar && pillar === pPillar ? 1 : 0;

      const catOverlap = overlapScore(categories, pCategories);
      const tagOverlap = overlapScore(tags, pTags);
      const kwOverlap = overlapScore(keywords, pKeywords);

      // pesos (simples e bons):
      // pillar vale mais porque define eixo editorial
      const score =
        samePillar * 5 +
        catOverlap * 3 +
        tagOverlap * 2 +
        kwOverlap * 1;

      return { post: p, score };
    })
    .filter((x) => x.score > 0) // só sugere se houver relação real
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);

  if (!related.length) return null;

  return (
    <Column fillWidth gap="16" marginTop="32">
      <Heading as="div" variant="heading-strong-l">
        Leia também
      </Heading>

      <Grid columns="2" gap="12">
        {related.map((p) => (
          <SmartLink key={p.slug} href={`/blog/${p.slug}`}>
            <Card
              padding="16"
              radius="l"
              border="neutral-alpha-weak"
              background="surface"
              style={{ background: "var(--layer-1)" }}
            >
              <Column gap="8">
                <Media
                  src={
                    p.metadata.image ||
                    buildOgImage(
                      p.metadata.title,
                      p.metadata.tag ?? p.metadata.tags?.[0] ?? p.metadata.categories?.[0] ?? "Artigo"
                    )
                  }
                  alt={p.metadata.title}
                  aspectRatio="16/9"
                  radius="m"
                  border="neutral-alpha-weak"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {p.metadata.pillar ?? "Blog"}
                </Text>

                <Text variant="heading-strong-s">
                  {p.metadata.title}
                </Text>

                {p.metadata.summary && (
                  <Text variant="body-default-s" onBackground="neutral-medium">
                    {p.metadata.summary}
                  </Text>
                )}

                {(p.metadata.categories?.length || p.metadata.tags?.length) && (
                  <Row gap="8" wrap marginTop="4">
                    {(p.metadata.categories ?? []).slice(0, 2).map((c) => (
                      <Badge
                        key={c}
                        background="neutral-alpha-weak"
                        onBackground="neutral-strong"
                        textVariant="label-default-xs"
                        paddingX="8"
                        paddingY="4"
                        arrow={false}
                      >
                        {c}
                      </Badge>
                    ))}
                    {(p.metadata.tags ?? []).slice(0, 2).map((t) => (
                      <Badge
                        key={t}
                        background="brand-alpha-weak"
                        onBackground="brand-strong"
                        textVariant="label-default-xs"
                        paddingX="8"
                        paddingY="4"
                        arrow={false}
                      >
                        {t}
                      </Badge>
                    ))}
                  </Row>
                )}
              </Column>
            </Card>
          </SmartLink>
        ))}
      </Grid>
    </Column>
  );
}
