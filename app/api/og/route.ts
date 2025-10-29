import { ImageResponse } from "next/og";

export const runtime = "edge";

const fontDataPromise = fetch(new URL("../../../../public/fonts/Inter-Bold.ttf", import.meta.url))
  .then((res) => (res.ok ? res.arrayBuffer() : undefined))
  .catch(() => undefined);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Best Life Official";
  const tag = searchParams.get("tag") ?? "Evidence-based";
  const date = searchParams.get("date") ?? "";
  const fontData = await fontDataPromise;

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #ecfdf7 0%, #ffffff 60%, #cff6e7 100%)",
          color: "#05302f",
          padding: "60px"
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#0ea47a" }}>{tag}</div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, color: "#4b4d63" }}>
          <span>Best Life Official</span>
          <span>{date}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts:
        fontData && fontData.byteLength > 0
          ? [
              {
                name: "Inter",
                data: fontData,
                style: "normal",
                weight: 700
              }
            ]
          : []
    }
  );
}
