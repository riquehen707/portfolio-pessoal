import * as React from "react";

// Se você tem funções utilitárias para buscar posts, importe aqui.
// Exemplo (ajuste para o que você já usa):
// import { getPostBySlug } from "@/utils/posts";

type PageProps = {
  params: { slug: string };
};

// Página dinâmica para edição/visualização de post pelo slug
export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // Aqui você pode buscar dados do post pelo slug:
  // const post = await getPostBySlug(slug);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Admin / Editar Post</h1>
      <p>
        Slug atual: <strong>{slug}</strong>
      </p>

      {/* Renderize os dados do post aqui */}
      {/* {post ? <PostEditor post={post} /> : <p>Post não encontrado.</p>} */}
    </main>
  );
}

// (Opcional) Pré-geração de rotas estáticas
// Se você quiser usar SSG/ISR para páginas admin:
export async function generateStaticParams() {
  // Normalmente retornaria todos os slugs existentes
  // const slugs = await getAllSlugs();
  // return slugs.map((slug) => ({ slug }));

  return [];
}
