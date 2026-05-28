import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ASHVAH — House of Fabrics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF9F6",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #E5E5E5",
            paddingBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#666666",
            }}
          >
            Est. 2011 · B2B Fabric Supply
          </span>
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "2px",
              color: "#666666",
            }}
          >
            Delhi NCR · Pan India
          </span>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "180px",
              fontWeight: 700,
              letterSpacing: "-6px",
              color: "#111111",
              lineHeight: 1,
            }}
          >
            ASHVAH
          </div>
          <div
            style={{
              fontSize: "44px",
              color: "#666666",
              marginTop: "16px",
              letterSpacing: "-1px",
            }}
          >
            House of Fabrics
          </div>
        </div>

        {/* Bottom rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E5E5E5",
            paddingTop: "32px",
          }}
        >
          <span style={{ fontSize: "24px", color: "#111111" }}>
            Performance fabrics for India&apos;s activewear makers
          </span>
          <div
            style={{
              width: "16px",
              height: "16px",
              background: "#0A2540",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
