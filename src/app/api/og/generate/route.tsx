// src/app/api/og/generate/route.tsx
import { ImageResponse } from "next/og";
import { baseURL, person as personDefaults } from "@/resources";

export const runtime = "edge"; // mais rápido para imagens OG

// ---------- Utils ----------
function parseBool(v?: string | null, def = false) {
  if (v == null) return def;
  return ["1", "true", "yes", "on"].includes(v.toLowerCase());
}

function clamp(str: string, max = 120) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

function toPx(n: number) {
  return `${n}px`;
}

// Carrega fonte do Google Fonts e cacheia no edge
async function loadGoogleFontCSS(family: string, weights: number[] = [400, 600]) {
  const w = weights.map((x) => `0,${x}`).join(";");
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:ital,wght@${w}&display=swap`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "force-cache",
  });
  if (!res.ok) throw new Error(`Falha ao carregar CSS da fonte: ${family}`);
  return await res.text();
}

async function extractFontBuffers(css: string) {
  // captura url(...) dentro do CSS do GF
  const sources = Array.from(css.matchAll(/src:\s*url\(([^)]+)\)\s*format\(['"]\w+['"]\)/g)).map(
    (m) => m[1]
  );
  const unique = Array.from(new Set(sources));
  const bufs = await Promise.all(
    unique.map(async (src) => {
      const r = await fetch(src, { cache: "force-cache" });
      if (!r.ok) throw new Error("Falha ao baixar arquivo de fonte");
      return r.arrayBuffer();
    })
  );
  return bufs;
}

// ---------- Handler ----------
export async function GET(req: Request) {
  const url = new URL(req.url);

  // Query params personalizáveis
  const title = clamp(url.searchParams.get("title") || "Portfólio");
  const subtitle = clamp(url.searchParams.get("subtitle") || "");
  const theme = (url.searchParams.get("theme") || "dark").toLowerCase(); // dark | light
  const layout = (url.searchParams.get("layout") || "left").toLowerCase(); // left | center
  const accent = url.searchParams.get("accent") || "#8B5CF6"; // roxo elegante por padrão
  const bg = url.searchParams.get("bg") || ""; // cor/gradiente opcional
  const showAvatar = parseBool(url.searchParams.get("avatar"), true);

  const personOverrideName = url.searchParams.get("name") || "";
  const personOverrideRole = url.searchParams.get("role") || "";
  const personOverrideAvatar = url.searchParams.get("photo") || "";

  const person = {
    name: personOverrideName || personDefaults.name,
    role: personOverrideRole || personDefaults.role,
    avatar: personOverrideAvatar || `${baseURL}${personDefaults.avatar}`,
  };

  // Paleta (responsável e com bom contraste)
  const isDark = theme !== "light";
  const bgColor = bg || (isDark ? "#0E0E10" : "#FFFFFF");
  const fgColor = isDark ? "#FFFFFF" : "#0A0A0A";
  const weak = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";
  const hairline = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";

  // “Assinatura” criativa e sutil: faixa lateral e detalhe no rodapé com a cor de acento
  const AccentStripe = () => (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 16,
        background: accent,
      }}
    />
  );

  // Tipografia: Geist (regular + semibold)
  let geist400: ArrayBuffer | null = null;
  let geist600: ArrayBuffer | null = null;

  try {
    const css = await loadGoogleFontCSS("Geist", [400, 600]);
    const fontFiles = await extractFontBuffers(css);
    // Sem garantia de ordem, tentamos pegar dois pesos — se vier 1 só, repetimos
    geist400 = fontFiles[0] || null;
    geist600 = fontFiles[1] || fontFiles[0] || null;
  } catch (e) {
    // Fallback: sem fontes personalizadas, o Satori usa sans padrão
    geist400 = null;
    geist600 = null;
  }

  // Layouts
  const wrap = layout === "center";

  // Medidas base
  const W = 1200;
  const H = 630;

  const Title = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: wrap ? toPx(900) : toPx(840),
        textAlign: wrap ? "center" : "left",
      }}
    >
      <div
        style={{
          fontSize: 60,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: fgColor,
          fontWeight: 600,
          whiteSpace: "pre-wrap",
          overflow: "hidden",
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.25,
            color: weak,
            fontWeight: 400,
            whiteSpace: "pre-wrap",
            overflow: "hidden",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );

  const Signature = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      {showAvatar && (
        <img
          src={person.avatar}
          alt={person.name}
          width={96}
          height={96}
          style={{
            width: 96,
            height: 96,
            borderRadius: 999,
            objectFit: "cover",
            border: `2px solid ${hairline}`,
          }}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: fgColor,
            letterSpacing: "-0.01em",
          }}
        >
          {person.name}
        </div>
        <div
          style={{
            fontSize: 22,
            color: weak,
          }}
        >
          {person.role}
        </div>
      </div>
    </div>
  );

  // “Tag” discreta no rodapé com a cor de acento
  const FooterTag = () => (
    <div
      style={{
        position: "absolute",
        bottom: 32,
        right: 32,
        padding: "10px 14px",
        borderRadius: 999,
        border: `1px solid ${hairline}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background:
          isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: accent,
        }}
      />
      <div
        style={{
          fontSize: 18,
          color: weak,
        }}
      >
        {new Date().getFullYear()} • {new URL(baseURL).hostname}
      </div>
    </div>
  );

  // BG: cor/gradiente liso; você pode colocar uma textura leve no futuro
  const background = bgColor.includes("gradient")
    ? bgColor
    : `linear-gradient(180deg, ${bgColor} 0%, ${bgColor} 100%)`;

  // Composição
  const ContentLeft = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <Title />
      <Signature />
    </div>
  );

  const ContentCenter = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 36,
        alignItems: "center",
      }}
    >
      <Title />
      <Signature />
    </div>
  );

  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background,
            position: "relative",
            padding: 64,
          }}
        >
          <AccentStripe />

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: wrap ? "center" : "flex-start",
            }}
          >
            {wrap ? <ContentCenter /> : <ContentLeft />}
          </div>

          <FooterTag />
        </div>
      ),
      {
        width: W,
        height: H,
        fonts: [
          ...(geist400
            ? [
                {
                  name: "Geist",
                  data: geist400,
                  style: "normal",
                  weight: 400,
                } as const,
              ]
            : []),
          ...(geist600
            ? [
                {
                  name: "Geist",
                  data: geist600,
                  style: "normal",
                  weight: 600,
                } as const,
              ]
            : []),
        ],
      }
    );
  } catch (e) {
    // Fallback simples em caso de erro (garante que a rota não quebra)
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#111",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
          }}
        >
          {title}
        </div>
      ),
      { width: W, height: H }
    );
  }
}
