import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { doctor, diseases, services, symptoms } from "@/data";
import logoFull from "@/assets/images/logo-full-white.png";

const MAX_LINKS = 6;

/**
 * Footer con "sitemap" de navegación (AGENTS.md §7): una columna por
 * categoría con enlace a la vista general y las entidades más relevantes,
 * reforzando el internal linking del grafo (§2.3 del manual). Logotipo real
 * (versión monocromática, legible sobre el fondo azul oscuro de marca) a
 * h-36/h-44 centrado — tamaño verificado en navegador a los breakpoints
 * reales antes de cerrar el sitio (AGENTS.md, feedback recurrente del
 * usuario sobre tamaño de logo).
 */
export default function Footer() {
  const columns = [
    { title: "Enfermedades", href: "/enfermedades" as Route, items: diseases.map((d) => ({ label: d.name, href: `/enfermedades/${d.slug}` as Route })) },
    { title: "Servicios", href: "/servicios" as Route, items: services.map((s) => ({ label: s.name, href: `/servicios/${s.slug}` as Route })) },
    { title: "Síntomas", href: "/sintomas" as Route, items: symptoms.map((s) => ({ label: s.name, href: `/sintomas/${s.slug}` as Route })) },
  ];

  return (
    <footer className="bg-[var(--color-blue-dark)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="relative h-24 w-full max-w-[280px] sm:h-28">
          <Image src={logoFull} alt={`${doctor.title} ${doctor.name}`} fill className="object-contain object-left" sizes="280px" />
        </div>
        <p className="mt-5 max-w-md text-sm text-white/75">
          {doctor.specialistTitle} con Alta Especialidad en {doctor.subspecialty}. Atención cardiológica en {doctor.city}, {doctor.state}.
        </p>
        <address className="mt-4 not-italic text-sm text-white/75">
          {doctor.address}
          <br />
          {doctor.schedule}
        </address>

        <nav aria-label="Mapa del sitio" className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <Link href={col.href} className="eyebrow-pulso text-[var(--color-gold)] hover:text-white">
                {col.title}
              </Link>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {col.items.slice(0, MAX_LINKS).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
                {col.items.length > MAX_LINKS && (
                  <li>
                    <Link href={col.href} className="underline hover:text-white">
                      Ver todas
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} {doctor.title} {doctor.name}. Todos los derechos reservados.
          </p>
          <p className="mt-2 max-w-2xl">
            La información de este sitio es orientativa y educativa; no sustituye una consulta médica. Ante una
            urgencia, acude al servicio de urgencias más cercano.{" "}
            <Link href="/aviso-de-privacidad" className="underline hover:text-white">
              Aviso de privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
