import { ImageResponse } from "next/og";
import { SITE_ORIGIN } from "@/lib/site-url";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "ZedNova Studios";
  const description =
    searchParams.get("description") ??
    "Websites, custom software, automations, and AI tools for service businesses.";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "#0f1410",
          color: "#f4f6f2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={`${SITE_ORIGIN}/images/brand/zednova-mark-light.svg`}
            alt=""
            width={58}
            height={40}
            style={{
              objectFit: "contain",
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.72 }}>
            ZedNova Studios
          </div>
        </div>
        <div>
          <div style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 600, maxWidth: 960 }}>
            {title}
          </div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.4, maxWidth: 900, opacity: 0.82 }}>
            {description}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
