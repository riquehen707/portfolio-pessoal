import { ImageResponse } from "next/og";

import { DISCOVER_IMAGE_HEIGHT, DISCOVER_IMAGE_WIDTH } from "@/utils/og";

export const runtime = "edge";

const OG_BRAND_NAME = "Henrique Reis";
const OG_DEFAULT_SUBTITLE = "Oferta, página e sistemas para operações digitais";
const OG_FOOTER = "Clareza reduz atrito.";
const OG_COLORS = {
  backgroundStart: "#0E0E11",
  backgroundEnd: "#19191F",
  textPrimary: "#F4F4F0",
  textSecondary: "#9A9AA3",
  accentGold: "#E6C94A",
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
        padding: "72px 88px",
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
          fontSize: 26,
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

      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1160 }}>
        <div
          style={{
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3.8,
          }}
        >
          {title}
        </div>
        <div
          style={{ fontSize: 34, lineHeight: 1.35, color: OG_COLORS.textSecondary, maxWidth: 980 }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24,
          color: OG_COLORS.footerText,
        }}
      >
        <div>{OG_FOOTER}</div>
        <div style={{ color: OG_COLORS.accentBlue }}>henrique.dog</div>
      </div>
    </div>,
    {
      width: DISCOVER_IMAGE_WIDTH,
      height: DISCOVER_IMAGE_HEIGHT,
    },
  );
}
