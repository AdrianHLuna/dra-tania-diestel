import localFont from "next/font/local";
import { Allura } from "next/font/google";

// Tipografía oficial de marca (guía real de la doctora, carpeta "PALETA DE
// COLORES"): Caviar Dreams para texto de cuerpo y encabezados en versalitas
// (gratuita, licencia de uso comercial confirmada — ya licenciada en este
// proyecto vía dr-aram-alarcon) y Allura para el trazo script del logotipo
// ("Dra. Tania Leticia"), gratuita en Google Fonts. Allura se usa solo como
// acento decorativo (firma, eyebrow), nunca para bloques de texto largo —
// así es como aparece en el logo real: solo el nombre de pila va en script,
// el apellido y la leyenda van en Caviar Dreams en mayúsculas.
export const caviarDreams = localFont({
  src: [
    { path: "../assets/fonts/CaviarDreams-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/CaviarDreams-Italic.ttf", weight: "400", style: "italic" },
    { path: "../assets/fonts/CaviarDreams-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/fonts/CaviarDreams-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-caviar",
});

export const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-allura",
});
