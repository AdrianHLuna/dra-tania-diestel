import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Phone, MessageCircle, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { doctor, diseases, services, symptoms } from "@/data";
import { generateHomeSchemas } from "@/lib/schemas";
import { formatCredentials } from "@/lib/credentials";
import StructuredData from "@/components/StructuredData";
import DoctorPortrait from "@/components/DoctorPortrait";
import EntityCard from "@/components/EntityCard";
import EkgLine from "@/components/EkgLine";

const PREVIEW_COUNT = 6;

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${doctor.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola, ${doctor.title} ${doctor.name}, quisiera agendar una cita.`
  )}`;

  return (
    <>
      <StructuredData data={generateHomeSchemas()} />

      {/* ─── HERO "Pulso Clínico": texto a la izquierda + panel de foto a la
          derecha, con un trazo de electrocardiograma a todo lo ancho que
          cruza por detrás de ambas columnas y se dibuja al cargar — firma
          de animación del sitio, distinta de los 7 Heroes ya registrados. ─── */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--color-surface-soft)] px-6 py-16">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 opacity-[0.14] lg:block">
          <EkgLine className="h-28 w-full" color="var(--color-wine)" />
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="eyebrow-pulso inline-block rounded-full border border-[var(--color-wine)]/30 bg-white px-3 py-1.5 text-[var(--color-wine)]">
              {doctor.city}, {doctor.state} · {doctor.specialty}
            </span>
            <h1 className="mt-5 font-heading text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
              Cuidado cardiológico preciso, apoyado en el diagnóstico por imagen.
            </h1>
            <p className="mt-5 max-w-xl text-base text-[var(--color-ink-soft)]">
              Cardiología clínica y Alta Especialidad en Ecocardiografía en {doctor.city}: diagnóstico y
              seguimiento de arritmias, hipertensión, insuficiencia cardíaca y otras condiciones del corazón.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-red)] px-6 text-sm font-semibold uppercase tracking-wide text-white shadow-[var(--shadow-pulse-lg)] hover:bg-[var(--color-wine)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Agendar por WhatsApp
              </a>
              <a
                href={`tel:${doctor.phone}`}
                className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-wine)] bg-white px-6 text-sm font-semibold text-[var(--color-wine)] hover:bg-[var(--color-surface-soft)]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Llamar
              </a>
            </div>
          </div>

          <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[var(--shadow-pulse-lg)] sm:h-96 md:h-[420px] lg:h-[460px]">
            <DoctorPortrait
              src={doctor.heroPhoto || doctor.photo}
              alt={`${doctor.title} ${doctor.name}`}
              className="h-full w-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── BARRA DE ESTADÍSTICAS — único lugar del sitio donde se usa el
          crema de marca (feedback del usuario 2026-10-19: ya no es el fondo
          general, se reserva a esta banda de acento puntual). ─── */}
      {doctor.stats && doctor.stats.length > 0 && (
        <section className="border-y border-[var(--color-line)] bg-[var(--color-cream)]">
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-16 gap-y-4 px-6 py-8">
            {doctor.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl text-[var(--color-wine)]">{stat.value}</p>
                <p className="eyebrow-pulso mt-2 text-[var(--color-ink-soft)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── SOBRE LA DOCTORA (ABOUT ME) ─── */}
      <section className="border-b border-[var(--color-line)] bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Foto de la doctora en consulta */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-soft)] shadow-[var(--shadow-pulse-lg)] sm:aspect-[3/4] lg:aspect-[4/5]">
                <DoctorPortrait
                  src={doctor.aboutPhoto || doctor.photo}
                  alt={`${doctor.title} ${doctor.name} — ${doctor.specialistTitle}`}
                  className="h-full w-full"
                />
              </div>
              <div className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl bg-[var(--color-wine)]/10" />
            </div>

            {/* Credenciales y semblanza */}
            <div>
              <p className="eyebrow-pulso text-[var(--color-wine)]">{doctor.specialistTitle}</p>
              <h2 className="mt-2 font-heading text-2xl text-[var(--color-ink)] sm:text-3xl lg:text-4xl">
                {doctor.title} {doctor.name}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{formatCredentials(doctor)}</p>
              <p className="mt-4 border-l-2 border-[var(--color-red)] pl-4 italic text-[var(--color-ink-soft)]">
                &ldquo;{doctor.philosophy}&rdquo;
              </p>
              <p className="mt-5 text-[var(--color-ink)]/90">{doctor.bio}</p>

              {doctor.certifications.length > 0 && (
                <ul className="mt-6 space-y-2 text-sm text-[var(--color-ink)]/85">
                  {doctor.certifications.map((c) => (
                    <li key={c.name} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-blue)]" aria-hidden="true" />
                      <span>{c.name}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div className="flex items-start gap-2 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-soft)] p-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-wine)]" aria-hidden="true" />
                  <span>Consultorio en {doctor.city}, {doctor.state}.</span>
                </div>
                <div className="flex items-start gap-2 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-soft)] p-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-wine)]" aria-hidden="true" />
                  <span>{doctor.schedule}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ENFERMEDADES ─── */}
      <section id="enfermedades" className="border-b border-[var(--color-line)] bg-[var(--color-surface-soft)] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow-pulso text-[var(--color-wine)]">Guía Clínica</p>
              <h2 className="mt-1 font-heading text-2xl text-[var(--color-ink)] sm:text-3xl">Enfermedades que Atendemos</h2>
            </div>
            <Link href="/enfermedades" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-wine)] hover:underline">
              Ver todas ({diseases.length})
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diseases.slice(0, PREVIEW_COUNT).map((disease) => (
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
      </section>

      {/* ─── SERVICIOS ─── */}
      <section id="servicios" className="border-b border-[var(--color-line)] bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow-pulso text-[var(--color-blue)]">Estudios y Consulta</p>
              <h2 className="mt-1 font-heading text-2xl text-[var(--color-ink)] sm:text-3xl">Servicios</h2>
            </div>
            <Link href="/servicios" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-blue)] hover:underline">
              Ver todos ({services.length})
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, PREVIEW_COUNT).map((service) => (
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
      </section>

      {/* ─── SÍNTOMAS ─── */}
      <section id="sintomas" className="border-b border-[var(--color-line)] bg-[var(--color-surface-soft)] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow-pulso text-[var(--color-gold)]">Orientación al Paciente</p>
              <h2 className="mt-1 font-heading text-2xl text-[var(--color-ink)] sm:text-3xl">Síntomas Frecuentes</h2>
            </div>
            <Link href="/sintomas" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-wine)] hover:underline">
              Ver todos ({symptoms.length})
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {symptoms.slice(0, PREVIEW_COUNT).map((symptom) => (
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
      </section>

      {/* ─── CTA FINAL — sin precio numérico (la doctora no lo proporcionó). ─── */}
      <section className="bg-[var(--color-wine)] px-6 py-16 text-center text-white">
        <p className="eyebrow-pulso text-[var(--color-gold)]">Atención Cardiológica</p>
        <h2 className="mx-auto mt-2 max-w-xl font-heading text-2xl sm:text-3xl">Agenda tu consulta</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/75">
          Escribe por WhatsApp o llama directamente al consultorio en {doctor.city}.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="tap-target inline-flex items-center gap-2 rounded-full bg-[var(--color-red)] px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white hover:text-[var(--color-wine)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={`tel:${doctor.phone}`}
            className="tap-target inline-flex items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/10"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Llamar
          </a>
        </div>
      </section>
    </>
  );
}
