"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Column, Row, Input, Textarea, Button, Text, useToast } from "@once-ui-system/core";

type ProfileFormProps = {
  name?: string | null;
  image?: string | null;
  bio?: string | null;
};

export function ProfileForm({ name, image, bio }: ProfileFormProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: name ?? "",
    image: image ?? "",
    bio: bio ?? "",
  });
  const [nameTouched, setNameTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getNameError = (value: string) => {
    if (value.length === 0) return "";
    if (value.trim().length < 2) return "Use pelo menos 2 caracteres.";
    return "";
  };

  const nameError = nameTouched ? getNameError(form.name) : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const nextNameError = getNameError(form.name);
    if (nextNameError) {
      setNameTouched(true);
      setLoading(false);
      return;
    }

    const res = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({ error: "Erro ao salvar." }));
      setError(payload.error || "Erro ao salvar.");
      setLoading(false);
      return;
    }

    addToast({ variant: "success", message: "Perfil atualizado." });
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Column gap="12">
        <Row gap="12" s={{ direction: "column" }}>
          <Input
            id="name"
            type="text"
            label="Nome"
            value={form.name}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, name: e.target.value }));
              if (error) setError("");
            }}
            onBlur={() => setNameTouched(true)}
            autoComplete="name"
            error={Boolean(nameError)}
            errorMessage={nameError}
          />
          <Input
            id="image"
            type="text"
            label="Avatar (URL)"
            value={form.image}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, image: e.target.value }));
              if (error) setError("");
            }}
            placeholder="https://..."
            autoComplete="photo"
            inputMode="url"
            spellCheck={false}
            description="Opcional. Use uma URL de imagem pública."
          />
        </Row>
        <Textarea
          id="bio"
          label="Bio"
          lines={4}
          value={form.bio}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, bio: e.target.value }));
            if (error) setError("");
          }}
          placeholder="Um parágrafo curto sobre você."
        />

        {error && (
          <Text variant="label-default-s" onBackground="accent-strong" role="status">
            {error}
          </Text>
        )}

        <Button type="submit" variant="primary" size="m" disabled={loading || Boolean(nameError)}>
          {loading ? "Salvando..." : "Salvar perfil"}
        </Button>
      </Column>
    </form>
  );
}
