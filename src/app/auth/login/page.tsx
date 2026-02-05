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

export default function LoginPage() {
  const router = useRouter();
  const [nextParam, setNextParam] = useState("/conta");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (next) setNextParam(next);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getEmailError = (value: string) => {
    if (value.length === 0) return "Informe seu e-mail.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Digite um e-mail válido.";
    return "";
  };

  const getPasswordError = (value: string) => {
    if (value.length === 0) return "Informe sua senha.";
    return "";
  };

  const emailError = emailTouched ? getEmailError(email) : "";
  const passwordError = passwordTouched ? getPasswordError(password) : "";
  const formInvalid = Boolean(emailError || passwordError);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setEmailTouched(true);
    setPasswordTouched(true);

    const nextEmailError = getEmailError(email);
    const nextPasswordError = getPasswordError(password);
    if (nextEmailError || nextPasswordError) {
      setLoading(false);
      return;
    }

    let res;
    try {
      res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: nextParam,
      });
    } catch (err) {
      setError("Não foi possível entrar. Tente novamente.");
      setLoading(false);
      return;
    }

    if (res?.error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push(res?.url ?? nextParam);
  }

  return (
    <Column maxWidth="xs" paddingTop="48" gap="20">
      <Heading as="h1" variant="heading-strong-xl">
        Entrar
      </Heading>
      <Text onBackground="neutral-weak">
        Use seu e-mail e senha para acessar sua conta.
      </Text>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
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
          autoComplete="current-password"
          error={Boolean(passwordError)}
          errorMessage={passwordError}
          required
        />
        {error && (
          <Text variant="label-default-s" onBackground="accent-strong" role="status">
            {error}
          </Text>
        )}
        <Button type="submit" variant="primary" size="m" disabled={loading || formInvalid}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <Line maxWidth="64" />

      <Row gap="8" wrap>
        <Text onBackground="neutral-weak">Ainda não tem conta?</Text>
        <Button href="/auth/register" variant="tertiary" size="s">
          Criar conta
        </Button>
      </Row>
    </Column>
  );
}

