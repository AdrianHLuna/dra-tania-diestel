"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { doctor } from "@/data";

// `Window.gtag` ya está declarado globalmente en lib/analytics.ts — no
// redeclarar aquí (TypeScript exige que todas las declaraciones globales
// coincidan exactamente).
const STORAGE_KEY = "cookie-consent";
type Choice = "granted" | "denied";

function applyConsent(choice: Choice) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: choice,
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
    });
  }
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Almacenamiento no disponible (modo privado, etc.) — el usuario verá el
    // banner de nuevo en su próxima visita, no es un caso crítico.
  }
}

/**
 * Banner de cookies real — cierra el círculo de `GoogleAnalytics.tsx`, que
 * deniega `analytics_storage`/`ad_storage` por defecto (Consent Mode) pero
 * nunca los actualiza a "granted" sin esto. Sin este componente, el
 * consentimiento queda denegado para siempre y GA4/Google Ads no reciben
 * señal real — el aviso de privacidad también promete este banner
 * explícitamente ("Cookies y Analítica"), así que su ausencia era, además,
 * una afirmación falsa en un documento legal.
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!doctor.ga4Id) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === "granted" || stored === "denied") {
      applyConsent(stored);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!doctor.ga4Id || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/98 px-4 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 md:flex-row md:justify-between">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          Usamos cookies de análisis para entender el uso del sitio y mejorar la experiencia. Puedes aceptarlas o
          rechazarlas.{" "}
          <Link href="/aviso-de-privacidad" className="underline hover:text-foreground">
            Aviso de privacidad
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => {
              applyConsent("denied");
              setVisible(false);
            }}
            className="min-h-[44px] rounded-xl border border-border px-4 py-2 text-sm font-medium"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => {
              applyConsent("granted");
              setVisible(false);
            }}
            className="min-h-[44px] rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
