import type { NextConfig } from "next";

// Security headers — AISO v3.1 §8.1. X-XSS-Protection deprecado, sustituido por CSP.
// 'unsafe-eval' solo en dev: Turbopack/React Fast Refresh usan eval() para HMR;
// React nunca usa eval() en producción, así que la build de producción no lo necesita.
// Dominios de Google ampliados 2026-10-16 (encontrado en dr-gregorio-arcos):
// GTM's "Container quality" diagnostic ("CSP blocks tag resources") falla
// si el CSP no permite tagassistant.google.com y los dominios de Ads/
// DoubleClick — Tag Assistant no puede conectarse al sitio para depurar el
// contenedor. Ver AGENTS.md §8 para el detalle completo.
const scriptSrc =
  process.env.NODE_ENV === "production"
    ? "'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://tagassistant.google.com"
    : "'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://tagassistant.google.com";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // SAMEORIGIN (no DENY) + frame-ancestors abajo permite que
    // tagassistant.google.com inspeccione el sitio para depurar el
    // contenedor de GTM — requerido por el diagnóstico "Container quality"
    // de Google Tag Manager (ver nota junto a scriptSrc).
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value:
      `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.googletagmanager.com https://www.google.com https://*.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://stats.g.doubleclick.net https://tagassistant.google.com; frame-src https://www.googletagmanager.com https://www.google.com https://www.youtube-nocookie.com https://bid.g.doubleclick.net https://td.doubleclick.net https://tagassistant.google.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self' https://tagassistant.google.com`,
  },
];

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }],
    qualities: [60, 75],
  },
  // Sin esto, Turbopack no sabe procesar el `@theme inline` de Tailwind v4
  // (warning "Unknown at rule: @theme" en build) — requerido por
  // create-next-app con --turbopack en Next 16.4. Encontrado 2026-10-15: el
  // template no lo tenía aunque dr-wilfredo-santiesteban sí (arreglado ahí
  // sin backportear) — mismo patrón de drift que ya pasó con MapFacade.tsx.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
