// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { Column, Row, Text, Button } from "@once-ui-system/core";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setSubmitting(false);

    if (res.ok) {
      window.location.href = "/admin/posts";
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Senha inválida");
    }
  }

  return (
    <Column maxWidth="s" gap="16" paddingTop="40">
      <Text variant="heading-strong-l">Entrar no painel</Text>

      <form onSubmit={onSubmit}>
        <Column gap="12">
          {/* Input nativo com estilos básicos */}
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            autoFocus
            aria-label="Senha"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "12px",
              border: "1px solid var(--border-neutral-alpha-medium)",
              background: "var(--layer-1)",
              color: "var(--text-neutral-strong)",
              outline: "none",
            }}
          />

          {error && (
            <Text onBackground="danger-strong" variant="body-default-s">
              {error}
            </Text>
          )}

          <Row>
            <Button type="submit" disabled={submitting} prefixIcon="lock">
              {submitting ? "Entrando…" : "Entrar"}
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
}
