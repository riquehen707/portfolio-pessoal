import { ImageResponse } from "next/og";

import { brandIdentity, brandMessaging, brandPalette } from "@/resources";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || brandIdentity.name;
  const subtitle = searchParams.get("subtitle") || brandMessaging.signatureDescriptor;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "linear-gradient(180deg, #0B0B0D 0%, #17171B 100%)",
        color: brandPalette.textDarkMode,
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
          color: "#9A9AA3",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            background: brandPalette.goldSignature,
          }}
        />
        {brandIdentity.name}
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
        <div style={{ fontSize: 30, lineHeight: 1.35, color: "#9A9AA3", maxWidth: 900 }}>
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#D8D8D0",
        }}
      >
        <div>{brandMessaging.ogFooter}</div>
        <div style={{ color: brandPalette.technicalBlue }}>henrique.dog</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
