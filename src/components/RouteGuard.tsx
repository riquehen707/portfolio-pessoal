// src/components/RouteGuard.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import {
  Flex,
  Spinner,
  Button,
  Heading,
  Column,
  PasswordInput,
} from "@once-ui-system/core";

type Props = { children: React.ReactNode };

function normalize(path?: string | null): string {
  if (!path) return "/";
  const noTrail = path.replace(/\/+$/, "");
  return noTrail === "" ? "/" : noTrail;
}

function hasAllowedPrefix(clean: string): boolean {
  return Object.entries(routes).some(([base, allowed]) => {
    if (!allowed) return false;
    const baseClean = normalize(base);
    if (baseClean === "/") return true; // raiz true => tudo passa
    return clean === baseClean || clean.startsWith(baseClean + "/");
  });
}

function isAllowed(pathname: string): boolean {
  const clean = normalize(pathname);
  if (clean in routes) return Boolean(routes[clean as keyof typeof routes]);
  // Sem regra explícita: aceita por prefixo; se não houver, fail-open
  return hasAllowedPrefix(clean) || true;
}

function needsPassword(pathname: string): boolean {
  const clean = normalize(pathname);

  if (clean in protectedRoutes) {
    return Boolean(protectedRoutes[clean as keyof typeof protectedRoutes]);
  }

  // Prefixo protegido protege subrotas
  return Object.entries(protectedRoutes).some(([base, locked]) => {
    if (!locked) return false;
    const baseClean = normalize(base);
    if (baseClean === "/") return true;
    return clean === baseClean || clean.startsWith(baseClean + "/");
  });
}

function NotFoundLike() {
  return (
    <Column paddingY="128" gap="8" center>
      <Heading as="h1" variant="heading-strong-xl">404</Heading>
      <p>Página não encontrada ou bloqueada.</p>
    </Column>
  );
}

export function RouteGuard({ children }: Props) {
  const enabled =
    (process.env.NEXT_PUBLIC_ENABLE_ROUTE_GUARD || "").toLowerCase() === "true";
  // Se o guard estiver desativado por flag → no-op
  if (!enabled) return <>{children}</>;

  const pathname = usePathname();
  const path = useMemo(() => normalize(pathname), [pathname]);

  const [loading, setLoading] = useState(true);
  const [routeEnabled, setRouteEnabled] = useState(true);
  const [mustPassword, setMustPassword] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);

      const allowed = isAllowed(path);
      if (cancelled) return;
      setRouteEnabled(allowed);

      if (!allowed) {
        setMustPassword(false);
        setAuthed(false);
        setLoading(false);
        return;
      }

      const locked = needsPassword(path);
      if (cancelled) return;
      setMustPassword(locked);

      if (!locked) {
        setAuthed(true);
        setLoading(false);
        return;
      }

      // Só consulta a sessão se realmente precisa de senha
      try {
        const res = await fetch("/api/check-auth", { cache: "no-store" });
        if (cancelled) return;
        setAuthed(res.ok);
      } catch {
        if (cancelled) return;
        setAuthed(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [path]);

  async function handlePasswordSubmit() {
    setError(undefined);
    try {
      const res = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
        setPassword("");
      } else {
        setError("Senha incorreta.");
      }
    } catch {
      setError("Falha de rede. Tente novamente.");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePasswordSubmit();
    }
  }

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!routeEnabled) {
    return <NotFoundLike />;
  }

  if (mustPassword && !authed) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          Essa página é protegida por senha.
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Confirmar</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
}
