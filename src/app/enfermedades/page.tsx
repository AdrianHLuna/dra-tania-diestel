import type { Metadata } from "next";
import type { Route } from "next";
import { doctor, diseases } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import EntityCard from "@/components/EntityCard";

export const metadata: Metadata = {
  title: "Enfermedades que Atendemos",
  description: "Catálogo de enfermedades cardiológicas atendidas en consulta, con información clara para el paciente.",
  alternates: { canonical: "/enfermedades" },
};

export default function DiseasesIndexPage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-5xl px-6 pt-6">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Enfermedades" }]} />
        <header className="mt-4 mb-10 text-center">
          <p className="eyebrow-pulso text-[var(--color-wine)]">Guía Clínica</p>
          <h1 className="mt-2 font-heading text-3xl text-[var(--color-ink)] sm:text-4xl">Enfermedades que Atendemos</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)]">
            Las {diseases.length} condiciones cardiológicas que {doctor.title} {doctor.name} atiende con mayor
            frecuencia en su práctica de {doctor.specialty}.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {diseases.map((disease) => (
            <EntityCard
              key={disease.id}
              title={disease.name}
              description={disease.description}
              href={`/enfermedades/${disease.slug}` as Route}
              image={disease.image}
              tag="Enfermedad"
              iconKey="condition"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
