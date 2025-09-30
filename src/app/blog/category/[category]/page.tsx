import { notFound } from "next/navigation";
import { Column, Heading } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { getAllCategories, getPostsByCategory } from "@/utils/posts";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);
  if (!posts.length) notFound();

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Heading as="h1" variant="heading-strong-xl">Categoria: {category}</Heading>
      <Posts />
    </Column>
  );
}
