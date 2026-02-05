"use client";

import { useState } from "react";
import { Column, PasswordInput, Button, Text, useToast } from "@once-ui-system/core";

export function PasswordForm() {
  const { addToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newTouched, setNewTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getNewPasswordError = (value: string) => {
    if (value.length === 0) return "Informe uma nova senha.";
    if (value.length < 8) return "Use pelo menos 8 caracteres.";
    return "";
  };

  const getConfirmError = (value: string, passwordValue: string) => {
    if (value.length === 0) return "Confirme a nova senha.";
    if (value !== passwordValue) return "As senhas não conferem.";
    return "";
  };

  const newPasswordError = newTouched ? getNewPasswordError(newPassword) : "";
  const confirmError = confirmTouched ? getConfirmError(confirmPassword, newPassword) : "";
  const formInvalid = Boolean(newPasswordError || confirmError);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setNewTouched(true);
    setConfirmTouched(true);

    const nextNewPasswordError = getNewPasswordError(newPassword);
    const nextConfirmError = getConfirmError(confirmPassword, newPassword);
    if (nextNewPasswordError || nextConfirmError) {
      return;
    }

    setLoading(true);

    const res = await fetch("/api/account/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({ error: "Erro ao atualizar senha." }));
      setError(payload.error || "Erro ao atualizar senha.");
      setLoading(false);
      return;
    }

    addToast({ variant: "success", message: "Senha atualizada." });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Column gap="12">
        <PasswordInput
          id="currentPassword"
          label="Senha atual"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            if (error) setError("");
          }}
          autoComplete="current-password"
          description="Obrigatória se você já definiu senha."
        />
        <PasswordInput
          id="newPassword"
          label="Nova senha"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (error) setError("");
          }}
          onBlur={() => setNewTouched(true)}
          autoComplete="new-password"
          description="Use pelo menos 8 caracteres."
          error={Boolean(newPasswordError)}
          errorMessage={newPasswordError}
          required
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirmar nova senha"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (error) setError("");
          }}
          onBlur={() => setConfirmTouched(true)}
          autoComplete="new-password"
          error={Boolean(confirmError)}
          errorMessage={confirmError}
          required
        />

        {error && (
          <Text variant="label-default-s" onBackground="accent-strong" role="status">
            {error}
          </Text>
        )}

        <Button type="submit" variant="secondary" size="m" disabled={loading || formInvalid}>
          {loading ? "Atualizando..." : "Atualizar senha"}
        </Button>
      </Column>
    </form>
  );
}
