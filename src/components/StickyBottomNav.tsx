"use client";

import { doctor } from "@/data";
import { trackEvent } from "@/lib/analytics";

/** Sticky Bottom Nav móvil — AISO v3.1 §3.1. Solo visible en móvil (md:hidden). */
export default function StickyBottomNav() {
  const cleanWhatsapp = doctor.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hola, ${doctor.title} ${doctor.name}. Vi su página web y me gustaría agendar una cita.`
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={`tel:${doctor.phone}`}
        onClick={() => trackEvent("clic_agendar_cita", { source: "sticky_nav" })}
        className="relative flex w-[70%] min-h-[44px] items-center justify-center gap-2 bg-primary py-3 text-sm font-semibold text-primary-foreground"
      >
        <span className="absolute inset-0 motion-safe:animate-ping bg-primary/50 -z-10" aria-hidden="true" />
        Agendar Cita
      </a>
      <a
        href={`https://wa.me/${cleanWhatsapp}?text=${message}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("clic_whatsapp", { source: "sticky_nav" })}
        className="flex w-[30%] min-h-[44px] items-center justify-center bg-[#25D366] py-3 text-sm font-semibold text-white"
      >
        WhatsApp
      </a>
    </div>
  );
}
