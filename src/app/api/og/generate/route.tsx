import { ImageResponse } from "next/og";

export const runtime = "edge";

const OG_BRAND_NAME = "Henrique Reis";
const OG_DEFAULT_SUBTITLE = "Estrategia, design e sistemas com clareza estrutural";
const OG_FOOTER = "Clareza gera resultado.";
const OG_COLORS = {
  backgroundStart: "#0B0B0D",
  backgroundEnd: "#17171B",
  textPrimary: "#F4F4F0",
  textSecondary: "#9A9AA3",
  accentGold: "#FFD700",
  accentBlue: "#1482B8",
  footerText: "#D8D8D0",
} as const;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || OG_BRAND_NAME;
  const subtitle = searchParams.get("subtitle") || OG_DEFAULT_SUBTITLE;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: `linear-gradient(180deg, ${OG_COLORS.backgroundStart} 0%, ${OG_COLORS.backgroundEnd} 100%)`,
        color: OG_COLORS.textPrimary,
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 24,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: OG_COLORS.textSecondary,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            background: OG_COLORS.accentGold,
          }}
        />
        {OG_BRAND_NAME}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 960 }}>
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3.4,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.35, color: OG_COLORS.textSecondary, maxWidth: 900 }}>
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          color: OG_COLORS.footerText,
        }}
      >
        <div>{OG_FOOTER}</div>
        <div style={{ color: OG_COLORS.accentBlue }}>henrique.dog</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
