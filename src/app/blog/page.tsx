import { Card, Column, Grid, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import BlogExplorer from "@/components/blog/BlogExplorer";
import { PostData, PostFrontmatter } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
import { getAllCategories, getAllPosts } from "@/utils/posts";

import styles from "./blog.module.scss";

const categoryDescriptions: Record<string, string> = {
  "Filosofia & Sociedade":
    "Ensaios sobre moral, identidade, cultura, modernidade e os atritos da vida contemporânea.",
  "Ética":
    "Textos sobre dever, virtude, moral e as tensões entre teoria e vida prática.",
  Sociologia:
    "Leituras sobre trabalho, comportamento, consumo, classe, mídia e formas de convivência.",
  Epistemologia:
    "Questões sobre conhecimento, verdade, crença e os limites do que chamamos de saber.",
  "engenharia social":
    "Reflexões sobre mídia, narrativa, influência, espetáculo e disputa por atenção.",
};

const editorialLanes = [
  {
    title: "Ensaios e filosofia",
    description:
      "O eixo mais forte hoje. Um espaço para pensar moral, cultura, identidade, sociedade e conflito.",
    meta: "Núcleo principal",
  },
  {
    title: "Tecnologia quando fizer sentido",
    description:
      "SEO, sites, produto, front-end e decisões digitais aparecem aqui como parte da vida real, não como jargão solto.",
    meta: "Camada aplicada",
  },
  {
    title: "Cultura, internet e entretenimento",
    description:
      "Música, mídia, comportamento e repertório entram porque também moldam como eu leio o mundo e trabalho.",
    meta: "Interesses abertos",
  },
];

function formatCategoryLabel(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  const rawPosts = getAllPosts();
  const allPosts = rawPosts
    .map((post) => ({
      slug: post.slug,
      metadata: post.metadata as PostFrontmatter,
    })) as PostData[];

  const categories = getAllCategories(rawPosts).map((category) => ({
    key: category,
    label: formatCategoryLabel(category),
    description:
      categoryDescriptions[category] ??
      "Textos reunidos por afinidade temática para facilitar a leitura e a navegação.",
    count: allPosts.filter((post) => post.metadata.categories?.includes(category)).length,
  }));

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Caderno editorial
        </Tag>
        <Heading variant="heading-strong-xl">{blog.title}</Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Este espaço não existe só para falar de serviço, produto ou SEO. Aqui entram ensaios,
          filosofia, cultura, internet, tecnologia e tudo que realmente atravessa meu trabalho e os
          meus interesses.
        </Text>
      </Column>

      <Grid className={styles.laneGrid} columns="3" s={{ columns: 1 }} gap="16">
        {editorialLanes.map((lane) => (
          <Card
            className={styles.laneCard}
            key={lane.title}
            direction="column"
            gap="12"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            fillHeight
          >
            <Text className={styles.laneMeta} variant="label-default-s" onBackground="neutral-weak">
              {lane.meta}
            </Text>
            <Heading as="h2" variant="heading-strong-m">
              {lane.title}
            </Heading>
            <Text onBackground="neutral-weak">{lane.description}</Text>
          </Card>
        ))}
      </Grid>

      <Row className={styles.infoPanel} gap="12" padding="20" wrap vertical="center">
        <Tag size="s" background="neutral-alpha-weak">
          Leitura organizada
        </Tag>
        <Text onBackground="neutral-weak">
          As abas abaixo separam os textos por categoria e o feed continua carregando em lotes
          pequenos para manter a navegação leve.
        </Text>
      </Row>

      <BlogExplorer posts={allPosts} categories={categories} />
    </Column>
  );
}
