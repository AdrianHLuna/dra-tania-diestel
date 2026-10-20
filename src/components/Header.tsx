import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { PhoneCall, MessageCircle } from "lucide-react";
import { doctor } from "@/data";
import { formatCredentials } from "@/lib/credentials";
import MobileMenu from "./MobileMenu";
import logoIcon from "@/assets/images/icon-color.png";

const navItems: { label: string; href: Route }[] = [
  { label: "Enfermedades", href: "/enfermedades" },
  { label: "Servicios", href: "/servicios" },
  { label: "Síntomas", href: "/sintomas" },
  { label: "Contacto", href: "/contacto" },
];

const whatsappUrl = `https://wa.me/${doctor.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hola, ${doctor.title} ${doctor.name}, quisiera agendar una cita.`
)}`;

/**
 * Header "Pulso Clínico" — composición espejo de la "clásica" (logo-izq/
 * nav-der de dr-gustavo-alvarez): aquí la nav va a la izquierda y el
 * logotipo a la derecha, nunca usada en los 6 Headers ya registrados
 * (registro-disenos.md). Franja de credenciales arriba (formato exacto,
 * COFEPRIS "En trámite" siempre visible, AGENTS.md §3). "Agendar Cita" va
 * directo a WhatsApp, nunca a /contacto (AGENTS.md §7, cero formularios).
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="bg-[var(--color-wine)] px-6 py-1.5 text-center">
        <span className="credentials-pulso text-white/90">{formatCredentials(doctor)}</span>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-b border-[var(--color-line)] px-6 py-3">
        <div className="md:hidden">
          <MobileMenu items={navItems} />
        </div>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-wine)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${doctor.phone}`}
            className="tap-target inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-wine)] px-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-wine)] transition-colors hover:bg-[var(--color-wine)] hover:text-white"
          >
            <PhoneCall className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Llamar
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="tap-target inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-red)] px-5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[var(--color-wine)]"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Agendar Cita
          </a>
        </div>

        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${doctor.title} ${doctor.name}`}>
          <span className="hidden flex-col items-end text-right sm:flex">
            <span className="font-script whitespace-nowrap text-xl leading-none text-[var(--color-red)]">
              {doctor.title} Tania Leticia
            </span>
            <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wide leading-tight text-[var(--color-blue)]">
              Diestel Bautista
            </span>
          </span>
          <Image src={logoIcon} alt="" width={42} height={42} className="h-10 w-10 shrink-0" priority />
        </Link>
      </div>
    </header>
  );
}
