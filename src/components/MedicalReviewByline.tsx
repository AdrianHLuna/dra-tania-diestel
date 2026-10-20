import { doctor } from "@/data";

interface MedicalReviewBylineProps {
  lastReviewed?: string;
}

/** AISO v3.1 §3.1 — obligatorio bajo el Hero de páginas de enfermedad/servicio/síntoma. */
export default function MedicalReviewByline({ lastReviewed }: MedicalReviewBylineProps) {
  const fecha = lastReviewed
    ? new Date(`${lastReviewed}T00:00:00`).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3 py-1">
      Revisado médicamente por {doctor.title} {doctor.name} — Cédula Profesional {doctor.cedula}.
      {fecha ? ` Última revisión: ${fecha}.` : ""}
    </p>
  );
}
