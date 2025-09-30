// src/app/admin/posts/page.tsx
import { Column, Row, Text, Button, Line, SmartLink } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils"; // já existente que lê /blog/posts
import DeletePostButton from "./DeletePostButton";

export const dynamic = "force-dynamic";

export default function AdminPosts() {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort((a, b) => {
    const at = new Date(a.metadata.publishedAt || 0).getTime();
    const bt = new Date(b.metadata.publishedAt || 0).getTime();
    return bt - at;
  });

  return (
    <Column maxWidth="l" gap="16">
      <Row horizontal="between" vertical="center">
        <Text variant="heading-strong-l">Artigos</Text>
        <SmartLink href="/admin/posts/new-git">
          <Button variant="primary">Novo artigo</Button>
        </SmartLink>
      </Row>
      <Line />
      <Column gap="8">
        {posts.map((p:any) => (
          <Row key={p.slug} horizontal="between" vertical="center" paddingY="8">
            <Column>
              <Text variant="label-strong-m">{p.metadata.title}</Text>
              <Text onBackground="neutral-weak" variant="body-default-s">
                /blog/{p.slug} {p.metadata.publishedAt ? `• ${new Date(p.metadata.publishedAt).toLocaleDateString()}` : ""}
              </Text>
            </Column>
            <Row gap="8">
              <SmartLink href={`/admin/posts/${p.slug}`}>
                <Button size="s" variant="secondary">Editar</Button>
              </SmartLink>
              <DeletePostButton slug={p.slug} />
            </Row>
          </Row>
        ))}
        {posts.length === 0 && <Text onBackground="neutral-weak">Nenhum artigo ainda.</Text>}
      </Column>
    </Column>
  );
}
