import { notFound } from "next/navigation";
import { Column, Heading } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { getAllTags, getPostsByTag } from "@/utils/posts";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();

  // A grid é renderizada pelo <Posts>; aqui só título e filtro
  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Heading as="h1" variant="heading-strong-xl">Tag: {tag}</Heading>
      {/* Usa a lógica já existente do componente */}
      <Posts />
    </Column>
  );
}
