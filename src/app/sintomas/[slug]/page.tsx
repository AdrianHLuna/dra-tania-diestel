import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctor, symptoms, diseases } from "@/data";
import { generateSymptomSchemas } from "@/lib/schemas";
import StructuredData from "@/components/StructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalReviewByline from "@/components/MedicalReviewByline";
import AlarmSignsSection from "@/components/AlarmSignsSection";
import FloatingButtons from "@/components/FloatingButtons";
import EntityImageHeader from "@/components/EntityImageHeader";

export const dynamicParams = false;

export function generateStaticParams() {
  return symptoms.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/sintomas/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const symptom = symptoms.find((s) => s.slug === slug);
  if (!symptom) return {};
  return {
    title: symptom.seo.title,
    description: symptom.seo.description,
    keywords: symptom.seo.keywords,
    alternates: { canonical: `/sintomas/${symptom.slug}` },
    openGraph: {
      title: symptom.seo.title,
      description: symptom.seo.description,
      url: `/sintomas/${symptom.slug}`,
      type: "article",
      locale: "es_MX",
      images: symptom.image ? [{ url: symptom.image, width: 1200, height: 630, alt: symptom.name }] : undefined,
    },
  };
}

export default async function SymptomPage(props: PageProps<"/sintomas/[slug]">) {
  const { slug } = await props.params;
  const symptom = symptoms.find((s) => s.slug === slug);
  if (!symptom) notFound();

  const relatedConditions = diseases.filter((d) => symptom.relatedConditions.includes(d.id));

  return (
    <>
      <StructuredData data={generateSymptomSchemas(symptom)} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Síntomas", href: "/sintomas" }, { label: symptom.name }]} />

      <article className="mx-auto max-w-2xl px-6 pb-20">
        <header className="mb-6">
          <div className="mb-6 overflow-hidden rounded-xl border border-[var(--color-line)]">
            <EntityImageHeader src={symptom.image} alt={symptom.name} iconKey="symptom" />
          </div>
          <h1 className="font-heading text-3xl text-[var(--color-ink)]">{symptom.name}</h1>
          {symptom.colloquialNames && symptom.colloquialNames.length > 0 && (
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">También descrito como: {symptom.colloquialNames.join(", ")}</p>
          )}
          <p className="mt-3 text-[var(--color-ink)]/90">{symptom.description}</p>
          <div className="mt-4">
            <MedicalReviewByline lastReviewed={symptom.lastReviewed} />
          </div>
        </header>

        <AlarmSignsSection signs={symptom.alarmSigns} />

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">Causas posibles</h2>
          <ul className="mt-3 space-y-2 text-[var(--color-ink)]/85">
            {symptom.causes.map((c, i) => (
              <li key={i} className="border-b border-[var(--color-line)] pb-2">{c}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">¿Por qué consultar a una cardióloga?</h2>
          <p className="mt-3 text-[var(--color-ink)]/85">{symptom.whyConsult}</p>
        </section>

        {symptom.faqs && symptom.faqs.length > 0 && (
          <section className="mt-8">
            <h2 className="font-heading text-xl text-[var(--color-ink)]">Preguntas Frecuentes</h2>
            <div className="mt-4 divide-y divide-[var(--color-line)]">
              {symptom.faqs.map((faq, i) => (
                <div key={i} className="py-4">
                  <h3 className="font-heading text-base text-[var(--color-ink)]">{faq.question}</h3>
                  <p className="mt-1 text-[var(--color-ink-soft)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedConditions.length > 0 && (
          <section className="mt-10 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-soft)] p-6">
            <p className="eyebrow-pulso text-[var(--color-wine)]">Puede estar relacionado con</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedConditions.map((d) => (
                <Link
                  key={d.id}
                  href={`/enfermedades/${d.slug}` as Route}
                  className="group flex items-center gap-3 rounded-lg border border-[var(--color-line)] bg-white p-2.5 transition-all hover:border-[var(--color-wine)] hover:shadow-sm"
                >
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-md bg-[var(--color-surface-soft)]">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="eyebrow-pulso text-[10px] text-[var(--color-wine)]">Enfermedad</span>
                    <p className="truncate text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-wine)]">
                      {d.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 border-t-2 border-[var(--color-gold)] pt-6 text-center">
          <p className="font-heading text-lg text-[var(--color-ink)]">
            {doctor.title} {doctor.name} puede ayudar a evaluar {symptom.name.toLowerCase()}.
          </p>
          <Link
            href="/contacto"
            className="tap-target mt-4 inline-flex items-center rounded-full bg-[var(--color-wine)] px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[var(--color-wine-dark)]"
          >
            Agendar Valoración
          </Link>
        </section>
      </article>

      <FloatingButtons context={symptom.name.toLowerCase()} />
    </>
  );
}
