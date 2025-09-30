// src/components/SubscribeForm.tsx
"use client";

import React, { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.message || "Falha ao inscrever.");
        return;
        }
      setStatus("ok");
      setMessage("Inscrição realizada com sucesso! 🎉");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Erro de rede. Tente novamente.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 items-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        required
        className="px-3 py-2 rounded-lg border w-full"
        aria-label="Digite seu email"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-2 rounded-lg border"
      >
        {status === "loading" ? "Enviando..." : "Inscrever"}
      </button>
      {message && (
        <span
          role="status"
          className={`text-sm ${status === "error" ? "text-red-500" : "text-green-600"}`}
        >
          {message}
        </span>
      )}
    </form>
  );
}
