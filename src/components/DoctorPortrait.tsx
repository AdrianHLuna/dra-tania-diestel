"use client";

import { useState } from "react";
import Image from "next/image";
import { HeartPulse } from "lucide-react";

interface DoctorPortraitProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Retrato de la doctora con fallback temático "Pulso Clínico".
 */
export default function DoctorPortrait({
  src,
  alt,
  className = "",
  imgClassName = "object-cover",
  priority,
}: DoctorPortraitProps) {
  const [failed, setFailed] = useState(!src || src.includes("placeholder"));

  if (failed) {
    return (
      <div
        className={`image-fallback-pulso flex items-center justify-center text-center text-sm ${className}`}
        role="img"
        aria-label={alt}
      >
        <HeartPulse className="h-10 w-10 opacity-50" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={imgClassName}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
