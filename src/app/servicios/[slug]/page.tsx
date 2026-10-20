import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctor, diseases, services } from "@/data";
import { generateServiceSchemas } from "@/lib/schemas";
import StructuredData from "@/components/StructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalReviewByline from "@/components/MedicalReviewByline";
import FloatingButtons from "@/components/FloatingButtons";
import EntityImageHeader from "@/components/EntityImageHeader";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `/servicios/${service.slug}`,
      type: "article",
      locale: "es_MX",
    },
  };
}

export default async function ServicePage(props: PageProps<"/servicios/[slug]">) {
  const { slug } = await props.params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedConditions = diseases.filter((d) => service.relatedConditions?.includes(d.id));

  return (
    <>
      <StructuredData data={generateServiceSchemas(service)} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Servicios", href: "/servicios" }, { label: service.name }]} />

      <article className="mx-auto max-w-2xl px-6 pb-20">
        <header className="mb-8">
          <div className="mb-6 overflow-hidden rounded-xl border border-[var(--color-line)]">
            <EntityImageHeader src={service.image} alt={service.name} iconKey="service" />
          </div>
          <h1 className="font-heading text-3xl text-[var(--color-ink)]">{service.name}</h1>
          <p className="mt-3 text-[var(--color-ink)]/90">{service.description}</p>
          <div className="mt-4">
            <MedicalReviewByline lastReviewed={service.lastReviewed} />
          </div>
        </header>

        {service.duration && (
          <section className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-line)]">
            <div className="bg-white p-4 text-center">
              <p className="eyebrow-pulso text-[var(--color-blue)]">Duración</p>
              <p className="mt-1 text-sm text-[var(--color-ink)]">{service.duration}</p>
            </div>
            <div className="bg-white p-4 text-center">
              <p className="eyebrow-pulso text-[var(--color-blue)]">Molestia</p>
              <p className="mt-1 text-sm text-[var(--color-ink)]">{service.isPainful ? "Puede incomodar" : "No invasivo"}</p>
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">¿En qué consiste {service.name.toLowerCase()}?</h2>
          <p className="mt-3 text-[var(--color-ink)]/85">{service.longDescription}</p>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl text-[var(--color-ink)]">Beneficios</h2>
          <ul className="mt-3 space-y-2 text-[var(--color-ink)]/85">
            {service.benefits.map((b, i) => (
              <li key={i} className="border-b border-[var(--color-line)] pb-2">{b}</li>
            ))}
          </ul>
        </section>

        {service.postOpRecommendations.length > 0 && (
          <section className="mt-8">
            <h2 className="font-heading text-xl text-[var(--color-ink)]">Recomendaciones</h2>
            <ul className="mt-3 space-y-2 text-[var(--color-ink)]/85">
              {service.postOpRecommendations.map((r, i) => (
                <li key={i} className="border-b border-[var(--color-line)] pb-2">{r}</li>
              ))}
            </ul>
          </section>
        )}

        {service.faqs && service.faqs.length > 0 && (
          <section className="mt-8">
            <h2 className="font-heading text-xl text-[var(--color-ink)]">Preguntas Frecuentes</h2>
            <div className="mt-4 divide-y divide-[var(--color-line)]">
              {service.faqs.map((faq, i) => (
                <div key={i} className="py-4">
                  <h3 className="font-heading text-base text-[var(--color-ink)]">{faq.question}</h3>
                  <p className="mt-1 text-[var(--color-ink-soft)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedConditions.length > 0 && (
          <section className="mt-10 rounded-xl border border-[var(--color-blue)]/30 bg-[var(--color-surface-soft)] p-6">
            <p className="eyebrow-pulso text-[var(--color-blue)]">Relacionados</p>
            <ul className="mt-3 space-y-2">
              {relatedConditions.map((d) => (
                <li key={d.id}>
                  <Link href={`/enfermedades/${d.slug}` as Route} className="text-[var(--color-ink)] hover:text-[var(--color-wine)]">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10 border-t-2 border-[var(--color-blue)] pt-6 text-center">
          <p className="font-heading text-lg text-[var(--color-ink)]">
            {doctor.title} {doctor.name} ofrece {service.name.toLowerCase()}.
          </p>
          <Link
            href="/contacto"
            className="tap-target mt-4 inline-flex items-center rounded-full bg-[var(--color-blue)] px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[var(--color-blue-dark)]"
          >
            Agendar Valoración
          </Link>
        </section>
      </article>

      <FloatingButtons context={service.name.toLowerCase()} />
    </>
  );
}
