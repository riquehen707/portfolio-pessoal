import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Henrique Studio";
  const subtitle = searchParams.get("subtitle") || "Portfólio • Blog • Diário";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          background: "linear-gradient(120deg, #0f172a 0%, #111827 50%, #0b1324 100%)",
          color: "#f8fafc",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 2, textTransform: "uppercase", color: "#cbd5f5" }}>
          Henrique Reis
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginTop: 24 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 24 }}>{subtitle}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
