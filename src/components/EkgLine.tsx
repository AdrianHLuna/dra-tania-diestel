interface EkgLineProps {
  className?: string;
  color?: string;
  animate?: boolean;
}

/**
 * Trazo de electrocardiograma — firma visual del sitio "Pulso Clínico"
 * (tomado del icono real del logotipo, LOGO-04/05). Se reutiliza como
 * divisor en EntityCard y como elemento decorativo del Hero. El trazo se
 * dibuja una sola vez al entrar en pantalla vía `.ekg-line` (globals.css).
 */
export default function EkgLine({ className = "", color = "var(--color-red)", animate = true }: EkgLineProps) {
  return (
    <svg
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 30 H110 L130 30 L140 8 L155 54 L168 18 L178 38 L188 30 H400"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "ekg-line" : undefined}
      />
    </svg>
  );
}
