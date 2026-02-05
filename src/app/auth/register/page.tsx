"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Column,
  Heading,
  Text,
  Input,
  PasswordInput,
  Button,
  Row,
  Line,
} from "@once-ui-system/core";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const router = useRouter();
  const [nextParam, setNextParam] = useState("/conta");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (next) setNextParam(next);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getNameError = (value: string) => {
    if (value.length === 0) return "";
    if (value.trim().length < 2) return "Use pelo menos 2 caracteres.";
    return "";
  };

  const getEmailError = (value: string) => {
    if (value.length === 0) return "Informe seu e-mail.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Digite um e-mail válido.";
    return "";
  };

  const getPasswordError = (value: string) => {
    if (value.length === 0) return "Informe uma senha.";
    if (value.length < 8) return "Use pelo menos 8 caracteres.";
    return "";
  };

  const getConfirmError = (value: string, passwordValue: string) => {
    if (value.length === 0) return "Confirme sua senha.";
    if (value !== passwordValue) return "As senhas não conferem.";
    return "";
  };

  const nameError = nameTouched ? getNameError(name) : "";
  const emailError = emailTouched ? getEmailError(email) : "";
  const passwordError = passwordTouched ? getPasswordError(password) : "";
  const confirmError = confirmTouched ? getConfirmError(confirmPassword, password) : "";
  const formInvalid = Boolean(nameError || emailError || passwordError || confirmError);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmTouched(true);

    const nextNameError = getNameError(name);
    const nextEmailError = getEmailError(email);
    const nextPasswordError = getPasswordError(password);
    const nextConfirmError = getConfirmError(confirmPassword, password);
    if (nextNameError || nextEmailError || nextPasswordError || nextConfirmError) {
      return;
    }

    setLoading(true);

    let res;
    try {
      res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
    } catch (err) {
      setError("Não foi possível criar sua conta. Tente novamente.");
      setLoading(false);
      return;
    }

    if (!res.ok) {
      const payload = await res.json().catch(() => ({ error: "Erro ao criar conta." }));
      setError(payload.error || "Erro ao criar conta.");
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: nextParam,
    });

    if (signInResult?.error) {
      setError("Conta criada, mas não foi possível entrar. Tente novamente.");
      setLoading(false);
      return;
    }

    router.push(nextParam);
  }

  return (
    <Column maxWidth="xs" paddingTop="48" gap="20">
      <Heading as="h1" variant="heading-strong-xl">
        Criar conta
      </Heading>
      <Text onBackground="neutral-weak">
        Crie sua conta para acompanhar o conteúdo e acessar áreas exclusivas.
      </Text>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <Input
          id="name"
          type="text"
          label="Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          onBlur={() => setNameTouched(true)}
          autoComplete="name"
          description="Opcional."
          error={Boolean(nameError)}
          errorMessage={nameError}
        />
        <Input
          id="email"
          type="email"
          label="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          onBlur={() => setEmailTouched(true)}
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          spellCheck={false}
          autoFocus
          error={Boolean(emailError)}
          errorMessage={emailError}
          required
        />
        <PasswordInput
          id="password"
          label="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
          onBlur={() => setPasswordTouched(true)}
          autoComplete="new-password"
          description="Use pelo menos 8 caracteres."
          error={Boolean(passwordError)}
          errorMessage={passwordError}
          required
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirmar senha"
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
        <Button type="submit" variant="primary" size="m" disabled={loading || formInvalid}>
          {loading ? "Criando..." : "Criar conta"}
        </Button>
      </form>

      <Line maxWidth="64" />

      <Row gap="8" wrap>
        <Text onBackground="neutral-weak">Já tem conta?</Text>
        <Button href="/auth/login" variant="tertiary" size="s">
          Entrar
        </Button>
      </Row>
    </Column>
  );
}

