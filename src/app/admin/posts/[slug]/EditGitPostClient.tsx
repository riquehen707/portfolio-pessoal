// src/app/admin/posts/[slug]/EditGitPostClient.tsx
"use client";

import { useState } from "react";
import { Column, Row, Text, Button, TextInput, TextArea } from "@once-ui-system/core";

export default function EditGitPostClient(props: {
  slug: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  categories: string[];
  content: string;
  publishedAt?: string;
}) {
  const [form, setForm] = useState({
    title: props.title,
    summary: props.summary,
    image: props.image,
    tags: props.tags.join(", "),
    categories: props.categories.join(", "),
    content: props.content,
  });
  const update = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      slug: props.slug,
      title: form.title,
      summary: form.summary || undefined,
      image: form.image || undefined,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      categories: form.categories.split(",").map((t) => t.trim()).filter(Boolean),
      content: form.content,
      publishedAt: props.publishedAt || undefined,
      commitMessage: `chore(blog): edit ${props.slug}`,
    };
    const res = await fetch("/api/admin/posts/commit", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(body),
    });
    if (res.ok) window.location.href = "/admin/posts";
    else alert("Erro ao salvar");
  };

  return (
    <Column maxWidth="l" gap="12">
      <Text variant="heading-strong-l">Editar: {props.slug}</Text>
      <form onSubmit={submit}>
        <Column gap="12">
          <TextInput placeholder="Título" value={form.title} onChange={(e:any)=>update("title", e.target.value)} />
          <TextInput placeholder="Resumo" value={form.summary} onChange={(e:any)=>update("summary", e.target.value)} />
          <TextInput placeholder="Imagem (/images/... ou URL)" value={form.image} onChange={(e:any)=>update("image", e.target.value)} />
          <TextInput placeholder="Tags (separadas por vírgula)" value={form.tags} onChange={(e:any)=>update("tags", e.target.value)} />
          <TextInput placeholder="Categorias (separadas por vírgula)" value={form.categories} onChange={(e:any)=>update("categories", e.target.value)} />
          <TextArea rows={18} value={form.content} onChange={(e:any)=>update("content", e.target.value)} />
          <Row><Button type="submit">Salvar alterações</Button></Row>
        </Column>
      </form>
    </Column>
  );
}
