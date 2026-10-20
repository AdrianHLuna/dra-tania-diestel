import type { Metadata } from "next";
import type { Route } from "next";
import { doctor, symptoms } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import EntityCard from "@/components/EntityCard";

export const metadata: Metadata = {
  title: "Síntomas",
  description: "Guía de síntomas cardíacos frecuentes y cuándo acudir a consulta o a urgencias.",
  alternates: { canonical: "/sintomas" },
};

export default function SymptomsIndexPage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-5xl px-6 pt-6">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Síntomas" }]} />
        <header className="mt-4 mb-10 text-center">
          <p className="eyebrow-pulso text-[var(--color-gold)]">Orientación al Paciente</p>
          <h1 className="mt-2 font-heading text-3xl text-[var(--color-ink)] sm:text-4xl">Síntomas Frecuentes</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)]">
            Señales del corazón que conviene evaluar con {doctor.title} {doctor.name} en {doctor.city}.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map((symptom) => (
            <EntityCard
              key={symptom.id}
              title={symptom.name}
              description={symptom.description}
              href={`/sintomas/${symptom.slug}` as Route}
              image={symptom.image}
              tag="Síntoma"
              iconKey="symptom"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
