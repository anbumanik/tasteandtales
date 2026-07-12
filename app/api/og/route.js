import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic OG image generation.
 * Usage: /api/og?title=Product+Name&subtitle=Category
 */
export default function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Taste & Tales";
  const subtitle = searchParams.get("subtitle") || "Sips. Bites. Memories.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FAF7F2",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Left panel */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            background: "#FAF7F2",
          }}
        >
          <p style={{ fontSize: 18, color: "#C9A66B", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
            ✦ Taste & Tales ✦
          </p>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#2A1E17",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 28, color: "#6D4C41" }}>{subtitle}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
            {["No Preservatives", "Millet-based", "Handcrafted"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#3F4A22",
                  color: "#FAF7F2",
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontFamily: "system-ui",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right panel — brand accent */}
        <div
          style={{
            width: 240,
            background: "#3F4A22",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: 96, color: "#C9A66B" }}>✦</p>
          <p style={{ fontSize: 18, color: "#FAF7F2", fontFamily: "system-ui", textAlign: "center", padding: "0 24px" }}>
            Sips. Bites. Memories.
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
