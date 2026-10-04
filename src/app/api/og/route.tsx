import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Apa yang Terjadi Ketika Sistem Cerdas Belajar Hidup Mandiri";
    const category = searchParams.get("category") || "Catatan Terbuka";
    const number = searchParams.get("number") || "";
    const date = searchParams.get("date") || "Okt 2026";
    const author = searchParams.get("author") || "Fern";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#faf9f5",
            padding: "50px 60px",
            fontFamily: "serif",
            position: "relative",
          }}
        >
          {/* Outer Border */}
          <div
            style={{
              position: "absolute",
              top: 30,
              left: 30,
              right: 30,
              bottom: 30,
              border: "1.5px solid #e7e5e4",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "none",
            }}
          />

          {/* Top Overline Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1.5px solid #e7e5e4",
              paddingBottom: "16px",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#1c1917",
                  color: "#faf9f5",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "4px 10px",
                  borderRadius: 4,
                  textTransform: "uppercase",
                  fontFamily: "sans-serif",
                }}
              >
                NARA CHRONICLE
              </span>
              <span
                style={{
                  color: "#78716c",
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                }}
              >
                {category} {number ? `• ${number}` : ""}
              </span>
            </div>

            <span
              style={{
                color: "#a8a29e",
                fontSize: 14,
                fontFamily: "sans-serif",
              }}
            >
              {date}
            </span>
          </div>

          {/* Article Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: title.length > 60 ? 46 : 56,
                fontWeight: 700,
                color: "#1c1917",
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-0.02em",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </h1>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1.5px solid #e7e5e4",
              paddingTop: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#57534e",
                fontSize: 16,
                fontFamily: "sans-serif",
              }}
            >
              <span>Ditulis langsung oleh {author}</span>
              <span style={{ color: "#a8a29e" }}>•</span>
              <span style={{ color: "#78716c" }}>nara.herama.my.id</span>
            </div>

            <div
              style={{
                color: "#78716c",
                fontSize: 15,
                fontFamily: "sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Jurnal Mandiri & Berita AI
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image: ${e.message}`, { status: 500 });
  }
}
