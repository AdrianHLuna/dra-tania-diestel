import type { Metadata, Viewport } from "next";
import { doctor } from "@/data";
import { caviarDreams, allura } from "@/lib/fonts";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBottomNav from "@/components/StickyBottomNav";
import FloatingButtons from "@/components/FloatingButtons";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: `${doctor.title} ${doctor.name} — ${doctor.specialistTitle} en ${doctor.city}`,
    template: `%s | ${doctor.title} ${doctor.name}`,
  },
  description: `${doctor.title} ${doctor.name}, ${doctor.specialistTitle} con Alta Especialidad en ${doctor.subspecialty} en ${doctor.city}, ${doctor.state}. Diagnóstico y tratamiento de enfermedades del corazón.`,
  openGraph: {
    title: `${doctor.title} ${doctor.name} — ${doctor.specialistTitle} en ${doctor.city}`,
    description: doctor.bio,
    locale: "es_MX",
    type: "website",
    images: [{ url: doctor.heroPhoto || doctor.photo, width: 1200, height: 630, alt: `${doctor.title} ${doctor.name}` }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#510d35",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${caviarDreams.variable} ${allura.variable}`}>
      <head>
        {/* Consent Mode — DEBE ir antes de cargar GTM/gtag (AGENTS.md §8,
            regla obligatoria desde 2026-09-22). Sin este bloque, GTM/GA4/
            Ads empiezan a enviar datos de inmediato al cargar la página, sin
            esperar el clic de "Aceptar" en CookieConsentBanner.tsx — lo cual
            contradice literalmente lo que /aviso-de-privacidad promete por
            escrito. Mismo patrón de omisión encontrado antes en
            dr-gregorio-arcos al pegar los snippets de GTM en crudo. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});`,
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-569489L5');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) - Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10835388341" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-10835388341');
`,
          }}
        />

        {/* Google tag (gtag.js) - Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QCKB40T73Q" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QCKB40T73Q');
`,
          }}
        />
      </head>
      <body className="pb-16 md:pb-0">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-569489L5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        {children}
        <Footer />
        <FloatingButtons />
        <StickyBottomNav />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
