declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/** Dispara un evento personalizado en GA4. Usar en onClick de botones de conversión. */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/** Trackea scroll hasta un elemento específico. Usar con IntersectionObserver en secciones clave. */
export function trackScrollTo(sectionName: string) {
  trackEvent(`scroll_${sectionName}`, { section: sectionName });
}
