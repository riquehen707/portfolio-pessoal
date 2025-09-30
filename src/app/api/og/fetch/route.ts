// src/app/api/og/fetch/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

// ===== Utilidades de validação/segurança =====
const PRIVATE_IP_RANGES = [
  /^(127\.|10\.|192\.168\.|169\.254\.)/,                 // IPv4 loopback/privado/link-local
  /^172\.(1[6-9]|2\d|3[0-1])\./,                         // 172.16.0.0 – 172.31.255.255
  /^\[?::1\]?$/,                                         // IPv6 loopback
  /^\[?fc00:|fd00:|fe80:|::1\]?/i,                       // IPv6 ULA/link-local/loopback
];

function isIpv4(host: string) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
}

function isPrivateHost(host: string) {
  if (!host) return true;
  const lower = host.toLowerCase();
  if (lower === "localhost") return true;
  if (lower.endsWith(".local") || lower.endsWith(".internal")) return true;

  if (isIpv4(lower)) {
    return PRIVATE_IP_RANGES.some((re) => re.test(lower));
  }
  // IPv6 entre colchetes [::1] ou afins
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

// ===== Timeout fetch + limite de bytes =====
async function fetchWithTimeout(url: string, timeout = 5000, init?: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      // Mantém follow padrão para redirects; o runtime edge segue até um limite interno
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OG-Meta-Fetch/1.0; +https://example.com)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        ...(init?.headers || {}),
      },
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function readTextWithLimit(res: Response, maxBytes = 512 * 1024): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return await res.text();
  const chunks: Uint8Array[] = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      received += value.byteLength;
      if (received > maxBytes) {
        throw new Error("Tamanho máximo de resposta excedido");
      }
      chunks.push(value);
    }
  }
  const merged = new Uint8Array(received);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.byteLength;
  }
  // Decoder padrão (UTF-8); para charsets específicos poderíamos inspecionar o meta charset
  return new TextDecoder().decode(merged);
}

// ===== Extração de metadados =====
function decodeHTMLEntities(text: string): string {
  return text.replace(/&(#?[a-zA-Z0-9]+);/g, (match, entity) => {
    const entities: Record<string, string> = {
      amp: "&",
      lt: "<",
      gt: ">",
      quot: '"',
      apos: "'",
      "#x27": "'",
      "#39": "'",
      "#x26": "&",
      "#38": "&",
    };
    if (entity.startsWith("#")) {
      const code = entity.startsWith("#x")
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10);
      return String.fromCharCode(code);
    }
    return entities[entity] || match;
  });
}

function reg(html: string, patterns: RegExp[]): string | null {
  for (const r of patterns) {
    const m = html.match(r);
    if (m?.[1]) return m[1].trim();
  }
  return null;
}

function resolveUrlMaybe(relativeOrAbs: string, base?: string): string {
  try {
    return new URL(relativeOrAbs, base).toString();
  } catch {
    return relativeOrAbs;
  }
}

function extractMetadata(html: string, pageUrl: string) {
  // Preferência: OG > Twitter > padrão
  const title =
    reg(html, [
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<title[^>]*>([^<]+)<\/title>/i,
    ]) || "";

  const description =
    reg(html, [
      /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    ]) || "";

  const imageRaw =
    reg(html, [
      /<meta[^>]*property=["']og:image:secure_url["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*name=["']image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    ]) || "";

  return {
    title: decodeHTMLEntities(title),
    description: decodeHTMLEntities(description),
    image: imageRaw ? resolveUrlMaybe(imageRaw, pageUrl) : "",
  };
}

// ===== Handler =====
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json({ error: "Parâmetro 'url' é obrigatório" }, { status: 400 });
  }

  const parsed = safeParseUrl(rawUrl);
  if (!parsed) {
    return NextResponse.json(
      { error: "URL inválida ou não permitida (somente http/https públicos)" },
      { status: 400 },
    );
  }

  try {
    const res = await fetchWithTimeout(parsed.toString(), 7000);
    if (!res.ok) {
      return NextResponse.json(
        { error: `Falha ao buscar URL: ${res.status}` },
        { status: 502 },
      );
    }

    // Verifica se é HTML
    const ct = res.headers.get("content-type") || "";
    if (!/text\/html|application\/xhtml\+xml/i.test(ct)) {
      return NextResponse.json(
        { error: "A URL não retornou um documento HTML" },
        { status: 415 },
      );
    }

    const html = await readTextWithLimit(res, 512 * 1024); // 512 KB
    const meta = extractMetadata(html, parsed.toString());

    return NextResponse.json({
      url: parsed.toString(),
      ...meta,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Erro ao buscar metadados:", message);

    const status =
      /aborted|timeout|Exceeded/i.test(message) ? 504 : 500;

    return NextResponse.json(
      { error: "Falha ao buscar metadados", message },
      { status },
    );
  }
}
