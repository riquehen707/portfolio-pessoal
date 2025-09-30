// src/app/admin/posts/DeletePostButton.tsx
"use client";
import { Button } from "@once-ui-system/core";

export default function DeletePostButton({ slug }: { slug: string }) {
  const onDelete = async () => {
    if (!confirm(`Excluir "${slug}"?`)) return;
    const res = await fetch("/api/admin/posts/delete", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ slug }),
    });
    if (res.ok) location.reload();
    else alert("Erro ao excluir");
  };
  return <Button size="s" variant="danger" onClick={onDelete}>Excluir</Button>;
}
