import type { MetadataRoute } from "next";
import { doctor } from "@/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${doctor.title} ${doctor.name} — ${doctor.specialty} en ${doctor.city}`,
    short_name: `${doctor.title} ${doctor.name}`,
    description: doctor.bio.substring(0, 160),
    start_url: "/",
    display: "standalone",
    background_color: "#f5edd4",
    theme_color: "#510d35",
    icons: [{ src: "/icon.png", sizes: "1182x1182", type: "image/png" }],
  };
}
