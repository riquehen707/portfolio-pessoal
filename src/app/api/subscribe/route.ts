// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // garante Node APIs disponíveis

type Payload = { email?: string };

export async function POST(req: Request) {
  let body: Payload = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "JSON inválido." },
      { status: 400 }
    );
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Email inválido." },
      { status: 400 }
    );
  }

  const listId = process.env.MAILCHIMP_LIST_ID;
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX; // ex.: "us21"

  if (!listId || !apiKey || !server) {
    return NextResponse.json(
      { ok: false, message: "Configuração do Mailchimp ausente." },
      { status: 500 }
    );
  }

  const { createHash, randomBytes } = await import("crypto");
  const subscriberHash = createHash("md5").update(email).digest("hex");
  const url = `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;

  // Mailchimp usa Basic Auth com qualquer usuário + API key como senha
  const auth = Buffer.from(`${randomBytes(6).toString("hex")}:${apiKey}`).toString("base64");

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
    }),
    // Importantíssimo: não repassar cache do build
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, message: data?.detail || "Erro ao inscrever." },
      { status: res.status || 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
