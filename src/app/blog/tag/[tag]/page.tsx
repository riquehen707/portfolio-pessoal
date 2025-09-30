import * as React from "react";

export default async function Page({ params }: { params: { tag: string } }) {
  const { tag } = params;
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Tag: {tag}</h1>
      <p>Aqui você pode listar os posts dessa tag.</p>
    </main>
  );
}
