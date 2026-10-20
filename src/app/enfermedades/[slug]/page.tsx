import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctor, diseases, services, symptoms } from "@/data";
import { generateDiseaseSchemas } from "@/lib/schemas";
import StructuredData from "@/components/StructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalReviewByline from "@/components/MedicalReviewByline";
import FloatingButtons from "@/components/FloatingButtons";
import EntityImageHeader from "@/components/EntityImageHeader";

export const dynamicParams = false;

export function generateStaticParams() {
  return diseases.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/enfermedades/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const disease = diseases.find((d) => d.slug === slug);
  if (!disease) return {};
  return {
    title: disease.seo.title,
    description: disease.seo.description,
    keywords: disease.seo.keywords,
    alternates: { canonical: `/enfermedades/${disease.slug}` },
    openGraph: {
      title: disease.seo.title,
      description: disease.seo.description,
      url: `/enfermedades/${disease.slug}`,
      type: "article",
      locale: "es_MX",
    },
  };
}

export default async function DiseasePage(props: PageProps<"/enfermedades/[slug]">) {
  const { slug } = await props.params;
  const disease = diseases.find((d) => d.slug === slug);
  if (!disease) notFound();

  const relatedServices = services.filter((s) => disease.relatedServices?.includes(s.id));
  const relatedSymptoms = symptoms.filter((s) => disease.relatedSymptoms?.includes(s.id));

  return (
    <>
      <StructuredData data={generateDiseaseSchemas(disease)} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Enfermedades", href: "/enfermedades" }, { label: disease.name }]} />

      <article className="mx-auto max-w-2xl px-6 pb-20">
        <header className="mb-8">
          <div className="mb-6 overflow-hidden rounded-xl border border-[var(--color-line)]">
            <EntityImageHeader src={disease.image} alt={disease.name} iconKey="condition" />
          </div>
          <h1 className="font-heading text-3xl text-[var(--color-ink)]">{disease.name}</h1>
          {disease.colloquialNames && disease.colloquialNames.length > 0 && (
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">También conocido como: {disease.colloquialNames.join(", ")}</p>
          )}
          <p className="mt-3 text-[var(--color-ink)]/90">{disease.description}</p>
          <div className="mt-4">
            <MedicalReviewByline lastReviewed={disease.lastReviewed} />
          </div>
        </header>

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">Síntomas</h2>
          <ul className="mt-3 space-y-2 text-[var(--color-ink)]/85">
            {disease.symptoms.map((s, i) => (
              <li key={i} className="border-b border-[var(--color-line)] pb-2">{s}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">Causas</h2>
          <ul className="mt-3 space-y-2 text-[var(--color-ink)]/85">
            {disease.causes.map((c, i) => (
              <li key={i} className="border-b border-[var(--color-line)] pb-2">{c}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">Factores de Riesgo</h2>
          <ul className="mt-3 space-y-2 text-[var(--color-ink)]/85">
            {disease.riskFactors.map((r, i) => (
              <li key={i} className="border-b border-[var(--color-line)] pb-2">{r}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">Complicaciones</h2>
          <ul className="mt-3 space-y-2 text-[var(--color-ink)]/85">
            {disease.complications.map((c, i) => (
              <li key={i} className="border-b border-[var(--color-line)] pb-2">{c}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">Tratamientos</h2>
          <ul className="mt-3 space-y-2 text-[var(--color-ink)]/85">
            {disease.treatments.map((t, i) => (
              <li key={i} className="border-b border-[var(--color-line)] pb-2">{t}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">Preguntas Frecuentes</h2>
          <div className="mt-4 divide-y divide-[var(--color-line)]">
            {disease.faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <h3 className="font-heading text-base text-[var(--color-ink)]">{faq.question}</h3>
                <p className="mt-1 text-[var(--color-ink-soft)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {(relatedServices.length > 0 || relatedSymptoms.length > 0) && (
          <section className="mt-10 rounded-xl border border-[var(--color-wine)]/30 bg-[var(--color-surface-soft)] p-6">
            <p className="eyebrow-pulso text-[var(--color-wine)]">Relacionados</p>
            <ul className="mt-3 space-y-2">
              {relatedServices.map((s) => (
                <li key={s.id}>
                  <Link href={`/servicios/${s.slug}` as Route} className="text-[var(--color-ink)] hover:text-[var(--color-blue)]">
                    {s.name}
                  </Link>
                </li>
              ))}
              {relatedSymptoms.map((s) => (
                <li key={s.id}>
                  <Link href={`/sintomas/${s.slug}` as Route} className="text-[var(--color-ink)] hover:text-[var(--color-wine)]">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10 border-t-2 border-[var(--color-red)] pt-6 text-center">
          <p className="font-heading text-lg text-[var(--color-ink)]">
            {doctor.title} {doctor.name} atiende {disease.name.toLowerCase()}.
          </p>
          <Link
            href="/contacto"
            className="tap-target mt-4 inline-flex items-center rounded-full bg-[var(--color-red)] px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[var(--color-wine)]"
          >
            Agendar Valoración
          </Link>
        </section>
      </article>

      <FloatingButtons context={disease.name.toLowerCase()} />
    </>
  );
}
