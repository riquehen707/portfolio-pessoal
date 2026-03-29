import { Column, Heading, Meta, Schema, Tag, Text } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";

import styles from "../section.module.scss";

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
  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="blogPosting"
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

      <Column className={styles.heroGlow} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Blog
        </Tag>
        <Heading variant="heading-strong-xl">{blog.title}</Heading>
        <div className={styles.accentLine} />
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Ensaios, artigos e estudos aplicados para aprofundar front-end, SEO tecnico, conteudo e estrategia.
        </Text>
      </Column>

      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        {newsletter.display && <Mailchimp marginBottom="l" />}
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Posts anteriores
        </Heading>
        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
