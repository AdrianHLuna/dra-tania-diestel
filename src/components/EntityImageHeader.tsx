"use client";

import { useState } from "react";
import Image from "next/image";
import { HeartPulse, Stethoscope, Activity } from "lucide-react";

const ICONS = { condition: HeartPulse, service: Activity, symptom: Stethoscope } as const;

interface EntityImageHeaderProps {
  src?: string;
  alt: string;
  iconKey?: keyof typeof ICONS;
}

/** Imagen de cabecera para páginas de detalle (enfermedad/servicio/síntoma), aspecto 16/10, con fallback temático "Pulso Clínico". */
export default function EntityImageHeader({ src, alt, iconKey = "condition" }: EntityImageHeaderProps) {
  const [failed, setFailed] = useState(!src);
  const Icon = ICONS[iconKey];

  return (
    <div className="relative aspect-[16/10] w-full">
      {failed || !src ? (
        <div className="image-fallback-pulso absolute inset-0 flex items-center justify-center" role="img" aria-label={alt}>
          <Icon className="h-12 w-12 opacity-50" aria-hidden="true" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
