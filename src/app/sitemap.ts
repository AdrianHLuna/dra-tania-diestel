import { MetadataRoute } from "next";
import { diseases, services, symptoms } from "@/data";

// Actualizar manualmente cuando haya cambios globales de contenido.
const FALLBACK_DATE = new Date("2026-10-19");

const dateOf = (lastReviewed?: string) => (lastReviewed ? new Date(lastReviewed) : FALLBACK_DATE);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const diseaseUrls = diseases.map((d) => ({
    url: `${baseUrl}/enfermedades/${d.slug}`,
    lastModified: dateOf(d.lastReviewed),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const serviceUrls = services.map((s) => ({
    url: `${baseUrl}/servicios/${s.slug}`,
    lastModified: dateOf(s.lastReviewed),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const symptomUrls = symptoms.map((s) => ({
    url: `${baseUrl}/sintomas/${s.slug}`,
    lastModified: dateOf(s.lastReviewed),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: FALLBACK_DATE, priority: 1.0 },
    { url: `${baseUrl}/enfermedades`, lastModified: FALLBACK_DATE, priority: 0.9 },
    { url: `${baseUrl}/servicios`, lastModified: FALLBACK_DATE, priority: 0.8 },
    { url: `${baseUrl}/sintomas`, lastModified: FALLBACK_DATE, priority: 0.7 },
    ...diseaseUrls,
    ...serviceUrls,
    ...symptomUrls,
    { url: `${baseUrl}/contacto`, lastModified: FALLBACK_DATE, priority: 0.5 },
    { url: `${baseUrl}/aviso-de-privacidad`, lastModified: FALLBACK_DATE, priority: 0.3 },
  ];
}
