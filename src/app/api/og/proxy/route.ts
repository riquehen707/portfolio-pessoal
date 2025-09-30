// src/app/api/og/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // mais rápido p/ servir imagens

// ===== Segurança básica (anti-SSRF) =====
const PRIVATE_IP_RANGES = [
  /^(127\.|10\.|192\.168\.|169\.254\.)/,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^\[?::1\]?$/,
  /^\[?(fc00:|fd00:|fe80:|::1)\]?/i,
];

function isIpv4(host: string) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
}

function isPrivateHost(host: string) {
  const lower = host.toLowerCase();
  if (lower === "localhost") return true;
  if (lower.endsWith(".local") || lower.endsWith(".internal")) return true;
  if (isIpv4(lower)) return PRIVATE_IP_RANGES.some((re) => re.test(lower));
  if (lower.startsWith("[") && lower.endsWith("]")) {
    return PRIVATE_IP_RANGES.some((re) => re.test(lower));
  }
  return false;
}

function safeParseUrl(raw: string): URL | null {
  try {
    const u = new URL(raw);
    if (!/^https?:$/.test(u.protocol)) return null;
    if (isPrivateHost(u.hostname)) return null;
    return u;
  } catch {
    return null;
  }
}

// ===== Timeout + leitura com limite =====
async function fetchWithTimeout(url: string, timeout = 8000, init?: RequestInit) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...init,
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ImageProxy/1.0; +https://example.com)",
        Accept: "image/*",
        ...(init?.headers || {}),
      },
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Repassa o body fazendo _stream_ e impondo limite de bytes.
 * Evita carregar tudo em memória (Edge ReadableStream).
 */
function proxyStreamWithLimit(res: Response, maxBytes = 5 * 1024 * 1024) {
  const reader = res.body?.getReader();
  if (!reader) return { stream: null as unknown as ReadableStream<Uint8Array>, length: 0 };

  let transferred = 0;

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      if (value) {
        transferred += value.byteLength;
        if (transferred > maxBytes) {
          controller.error(new Error("IMAGE_SIZE_LIMIT_EXCEEDED"));
          return;
        }
        controller.enqueue(value);
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return { stream, length: transferred };
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const raw = url.searchParams.get("url");
    if (!raw) {
      return NextResponse.json({ error: "Parâmetro 'url' é obrigatório" }, { status: 400 });
    }

    // valida URL pública http/https
    const parsed = safeParseUrl(raw);
    if (!parsed) {
      return NextResponse.json(
        { error: "URL inválida ou não permitida (somente HTTP/HTTPS públicos)" },
        { status: 400 }
      );
    }

    // busca com timeout
    const upstream = await fetchWithTimeout(parsed.toString(), 8000);

    if (!upstream.ok) {
      // repassa status do upstream quando possível
      const status = upstream.status || 502;
      return NextResponse.json(
        { error: `Falha ao buscar imagem: ${upstream.status}` },
        { status }
      );
    }

    // valida content-type
    const contentType = upstream.headers.get("content-type")?.toLowerCase() || "";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json(
        { error: "A URL não retornou um conteúdo de imagem" },
        { status: 415 }
      );
    }

    // stream com limite de 5 MB
    const { stream } = proxyStreamWithLimit(upstream, 5 * 1024 * 1024);

    // cabeçalhos repassados/normalizados
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    // Cache público 1 dia + revalidação (ajuste conforme sua cadência)
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600");

    // repassa alguns headers úteis se existirem
    const etag = upstream.headers.get("etag");
    if (etag) headers.set("ETag", etag);
    const lastMod = upstream.headers.get("last-modified");
    if (lastMod) headers.set("Last-Modified", lastMod);

    // CORS (se você for consumir no client diretamente)
    headers.set("Access-Control-Allow-Origin", "*");

    return new NextResponse(stream, { status: 200, headers });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const status = /TIMEOUT|aborted|Exceeded|IMAGE_SIZE_LIMIT_EXCEEDED/i.test(message) ? 504 : 500;

    if (message === "IMAGE_SIZE_LIMIT_EXCEEDED") {
      return NextResponse.json(
        { error: "Imagem excedeu o tamanho máximo permitido (5MB)" },
        { status: 413 }
      );
    }

    console.error("Erro no image proxy:", message);
    return NextResponse.json({ error: "Falha ao proxyar imagem" }, { status });
  }
}
