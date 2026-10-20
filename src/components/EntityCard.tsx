"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { HeartPulse, Stethoscope, Activity } from "lucide-react";
import EkgLine from "./EkgLine";

// Las funciones de componente no pueden pasarse de un Server Component a un
// Client Component (cruza el límite de serialización en Next 16) — por eso
// el ícono se selecciona por nombre serializable, no por referencia.
const ICONS = { condition: HeartPulse, service: Activity, symptom: Stethoscope } as const;

// Duotono de marca aplicado por zona, nunca mezclado en un mismo degradado
// (lección de dr-gregorio-arcos, registro-disenos.md): vino/rojo identifica
// "Enfermedades", azul identifica "Servicios"; síntomas usa el dorado de
// marca como tercer acento de uso puntual.
const TAG_STYLES = {
  condition: { bg: "var(--color-wine)", text: "#ffffff" },
  service: { bg: "var(--color-blue)", text: "#ffffff" },
  symptom: { bg: "var(--color-gold)", text: "var(--color-ink)" },
} as const;

interface EntityCardProps {
  title: string;
  description: string;
  href: Route;
  image?: string;
  tag: string;
  iconKey?: keyof typeof ICONS;
}

/**
 * Tarjeta "Pulso Clínico" — banda de imagen + divisor en forma de trazo de
 * electrocardiograma (firma visual del sitio, EkgLine.tsx) entre la imagen y
 * el contenido. Esquinas medianas (ni hard-cut ni pill), hover con elevación
 * suave y el trazo EKG se redibuja. Deliberadamente distinta de los 7 tipos
 * de tarjeta ya registrados (bento, radios asimétricos, ClinicalCard
 * numerada, lista-índice, MasonryCard bounce, EntityCard hard-cut, EntityCard
 * serena de banda+tag).
 */
export default function EntityCard({ title, description, href, image, tag, iconKey = "condition" }: EntityCardProps) {
  const [failed, setFailed] = useState(!image);
  const Icon = ICONS[iconKey];
  const tagStyle = TAG_STYLES[iconKey];

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-[var(--shadow-pulse)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-pulse-lg)]"
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-44">
        {failed || !image ? (
          <div className="image-fallback-pulso absolute inset-0 flex items-center justify-center" role="img" aria-label={title}>
            <Icon className="h-9 w-9 opacity-50" aria-hidden="true" />
          </div>
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setFailed(true)}
          />
        )}
        <span
          className="eyebrow-pulso absolute right-3 top-3 rounded-full px-2.5 py-1 shadow-sm"
          style={{ background: tagStyle.bg, color: tagStyle.text }}
        >
          {tag}
        </span>
      </div>

      <EkgLine className="h-3 w-full shrink-0 bg-white" color="var(--color-red)" animate={false} />

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-base text-[var(--color-ink)]">{title}</h3>
        <p className="line-clamp-3 text-sm text-[var(--color-ink-soft)]">{description}</p>
      </div>
    </Link>
  );
}
