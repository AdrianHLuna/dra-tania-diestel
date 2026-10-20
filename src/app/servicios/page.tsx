import type { Metadata } from "next";
import type { Route } from "next";
import { doctor, services } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import EntityCard from "@/components/EntityCard";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Catálogo de estudios cardiológicos y consulta disponibles con la Dra. Tania Diestel Bautista.",
  alternates: { canonical: "/servicios" },
};

export default function ServicesIndexPage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-5xl px-6 pt-6">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]} />
        <header className="mt-4 mb-10 text-center">
          <p className="eyebrow-pulso text-[var(--color-blue)]">Estudios y Consulta</p>
          <h1 className="mt-2 font-heading text-3xl text-[var(--color-ink)] sm:text-4xl">Servicios</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)]">
            Estudios diagnósticos y consulta cardiológica que ofrece {doctor.title} {doctor.name} en {doctor.city}.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <EntityCard
              key={service.id}
              title={service.name}
              description={service.description}
              href={`/servicios/${service.slug}` as Route}
              image={service.image}
              tag="Servicio"
              iconKey="service"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
