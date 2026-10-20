import { ImageResponse } from "next/og";
import { diseases, doctor } from "@/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Información cardiológica del sitio oficial de la doctora";

export function generateStaticParams() {
  return diseases.map((d) => ({ slug: d.slug }));
}

export default async function OpengraphImage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const disease = diseases.find((d) => d.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #510d35 0%, #2d4a67 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1 }}>{disease?.name}</div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 28, opacity: 0.92 }}>
          {`${doctor.title} ${doctor.name} · ${doctor.specialty} · ${doctor.city}`}
        </div>
      </div>
    ),
    size
  );
}
