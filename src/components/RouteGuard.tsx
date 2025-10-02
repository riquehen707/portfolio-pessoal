// src/components/RouteGuard.tsx
"use client";

import { useEffect, useState } from "react";
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
import NotFound from "@/app/not-found";

type Props = { children: React.ReactNode };

function normalize(path?: string | null): string {
  if (!path) return "/";
  const noTrail = path.replace(/\/+$/, "");
  return noTrail === "" ? "/" : noTrail;
}

function isAllowed(pathname: string): boolean {
  const clean = normalize(pathname);

  // 1) Match exato na whitelist
  if (clean in routes) {
    return Boolean(routes[clean as keyof typeof routes]);
  }

  // 2) Qualquer rota base marcada como true libera suas subrotas
  const hasAllowedPrefix = Object.entries(routes).some(([base, allowed]) => {
    if (!allowed) return false;
    const baseClean = normalize(base);
    if (baseClean === "/") return true; // raiz true => tudo passa
    return clean === baseClean || clean.startsWith(baseClean + "/");
  });
  if (hasAllowedPrefix) return true;

  // 3) Sem regra explícita: fail-open (mude para `return false` se quiser bloquear por padrão)
  return true;
}

function needsPassword(pathname: string): boolean {
  const clean = normalize(pathname);

  // 1) Se a rota exata está protegida
  if (clean in protectedRoutes) {
    return Boolean(protectedRoutes[clean as keyof typeof protectedRoutes]);
  }

  // 2) Qualquer prefixo protegido protege também as subrotas
  return Object.entries(protectedRoutes).some(([base, locked]) => {
    if (!locked) return false;
    const baseClean = normalize(base);
    if (baseClean === "/") return true;
    return clean === baseClean || clean.startsWith(baseClean + "/");
  });
}

export function RouteGuard({ children }: Props) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [routeEnabled, setRouteEnabled] = useState<boolean>(true);
  const [mustPassword, setMustPassword] = useState<boolean>(false);
  const [authed, setAuthed] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      const path = normalize(pathname);

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

      // Checa sessão existente
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
  }, [pathname]);

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
    // 404 amigável; se preferir bloquear duro, pode usar notFound() do Next
    return <NotFound />;
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
