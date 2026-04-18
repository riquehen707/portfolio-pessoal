import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Henrique Reis";
  const subtitle =
    searchParams.get("subtitle") || "Estratégia, design e sistemas para crescimento digital";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(180deg, #0B0B0D 0%, #101014 48%, #0B0B0D 100%)",
          color: "#F5F5F2",
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
            color: "#A8A8B3",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: "#FFD700",
              boxShadow: "0 0 0 1px rgba(255,215,0,0.32)",
            }}
          />
          Henrique Reis
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
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#A8A8B3", maxWidth: 900 }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#D8D8D3",
          }}
        >
          <div>Transformar complexidade em clareza.</div>
          <div style={{ color: "#16B8F3" }}>henrique.dog</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
