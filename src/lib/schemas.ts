import { doctor, diseases, services, symptoms } from "@/data";
import type { MedicalCondition, MedicalService, Symptom } from "@/types/schema";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

// ─── IDs estables del grafo ── v3 ─────────────────────────────
export const IDS = {
  physician: `${baseUrl}/#physician`,
  organization: `${baseUrl}/#organization`,
  website: `${baseUrl}/#website`,
  condition: (slug: string) => `${baseUrl}/enfermedades/${slug}#condition`,
  procedure: (slug: string) => `${baseUrl}/servicios/${slug}#procedure`,
  symptom: (slug: string) => `${baseUrl}/sintomas/${slug}#symptom`,
};

const serviceById = new Map(services.map((s) => [s.id, s]));
const symptomById = new Map(symptoms.map((s) => [s.id, s]));

const refProcedures = (ids?: string[]) =>
  (ids ?? [])
    .map((id) => serviceById.get(id))
    .filter((s): s is MedicalService => Boolean(s))
    .map((s) => ({ "@id": IDS.procedure(s.slug) }));

const refSymptoms = (ids?: string[]) =>
  (ids ?? [])
    .map((id) => symptomById.get(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ "@id": IDS.symptom(s.slug) }));

// ─── Grafo base: presente en TODAS las páginas ───────────────
export function baseGraph() {
  return [
    {
      "@type": "Physician",
      "@id": IDS.physician,
      name: `${doctor.title} ${doctor.name}`,
      description: doctor.bio,
      url: baseUrl,
      medicalSpecialty: doctor.specialty,
      knowsAbout: [...diseases.map((d) => d.name), ...services.map((s) => s.name)],
      telephone: doctor.phone,
      email: doctor.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: doctor.address,
        addressLocality: doctor.city,
        addressRegion: doctor.state,
        addressCountry: doctor.country,
      },
      ...(doctor.geo
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: doctor.geo.latitude,
              longitude: doctor.geo.longitude,
            },
          }
        : {}),
      ...(doctor.openingHours ? { openingHours: doctor.openingHours } : {}),
      hasMap: doctor.googleMapsUrl,
      image: doctor.photo,
      priceRange: `$${doctor.consultationPrice} MXN`,
      paymentAccepted: doctor.paymentMethods.join(", "),
      isAcceptingNewPatients: doctor.acceptingNewPatients,
      hasCredential: doctor.education.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: e.degree,
        recognizedBy: { "@type": "CollegeOrUniversity", name: e.institution },
      })),
      sameAs: doctor.sameAs || [],
      parentOrganization: { "@id": IDS.organization },
    },
    {
      "@type": "MedicalOrganization",
      "@id": IDS.organization,
      name: `Consultorio ${doctor.title} ${doctor.name}`,
      url: baseUrl,
      telephone: doctor.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: doctor.address,
        addressLocality: doctor.city,
        addressRegion: doctor.state,
        addressCountry: doctor.country,
      },
      subOrganization: { "@id": IDS.physician },
    },
    {
      "@type": "WebSite",
      "@id": IDS.website,
      url: baseUrl,
      name: `${doctor.title} ${doctor.name}`,
      inLanguage: "es-MX",
      publisher: { "@id": IDS.organization },
    },
  ];
}

export function generateHomeSchemas() {
  return { "@context": "https://schema.org", "@graph": baseGraph() };
}

export function generateDiseaseSchemas(disease: MedicalCondition) {
  const pageUrl = `${baseUrl}/enfermedades/${disease.slug}`;

  const condition = {
    "@type": "MedicalCondition",
    "@id": IDS.condition(disease.slug),
    name: disease.name,
    alternateName: [disease.technicalName, ...(disease.colloquialNames ?? [])].filter(Boolean),
    description: disease.description,
    signOrSymptom: [
      ...disease.symptoms.map((s) => ({ "@type": "MedicalSignOrSymptom", name: s })),
      ...refSymptoms(disease.relatedSymptoms),
    ],
    riskFactor: disease.riskFactors.map((r) => ({ "@type": "MedicalRiskFactor", name: r })),
    possibleTreatment: [
      ...disease.treatments.map((t) => ({
        "@type": "MedicalTherapy",
        name: t,
        performer: { "@id": IDS.physician },
      })),
      ...refProcedures(disease.relatedServices),
    ],
    sameAs: disease.sameAs,
  };

  const webPage = {
    "@type": "MedicalWebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: disease.seo.title,
    inLanguage: "es-MX",
    isPartOf: { "@id": IDS.website },
    about: { "@id": IDS.condition(disease.slug) },
    ...(disease.lastReviewed ? { lastReviewed: disease.lastReviewed } : {}),
    reviewedBy: { "@id": IDS.physician },
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: disease.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [condition, webPage, faqPage, ...baseGraph()] };
}

export function generateServiceSchemas(service: MedicalService) {
  const pageUrl = `${baseUrl}/servicios/${service.slug}`;

  const procedure = {
    "@type": "MedicalProcedure",
    "@id": IDS.procedure(service.slug),
    name: service.name,
    description: service.longDescription,
    procedureType: service.type === "ambulatorio" ? "NoninvasiveProcedure" : "SurgicalProcedure",
    howPerformed: service.description,
    preparation: service.anesthesiaType ? `Tipo de anestesia: ${service.anesthesiaType}` : undefined,
    performer: { "@id": IDS.physician },
  };

  const webPage = {
    "@type": "MedicalWebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: service.seo.title,
    inLanguage: "es-MX",
    isPartOf: { "@id": IDS.website },
    about: { "@id": IDS.procedure(service.slug) },
    ...(service.lastReviewed ? { lastReviewed: service.lastReviewed } : {}),
    reviewedBy: { "@id": IDS.physician },
  };

  const schemas: Record<string, unknown>[] = [procedure, webPage];

  if (service.video) {
    schemas.push({
      "@type": "VideoObject",
      name: service.video.title,
      description: service.video.description,
      contentUrl: service.video.url,
      thumbnailUrl: service.video.thumbnailUrl,
      duration: service.video.duration,
      uploadDate: service.video.uploadDate,
    });
  }

  return { "@context": "https://schema.org", "@graph": [...schemas, ...baseGraph()] };
}

export function generateSymptomSchemas(symptom: Symptom) {
  const pageUrl = `${baseUrl}/sintomas/${symptom.slug}`;

  const signOrSymptom = {
    "@type": "MedicalSignOrSymptom",
    "@id": IDS.symptom(symptom.slug),
    name: symptom.name,
    alternateName: symptom.colloquialNames ?? [],
    description: symptom.description,
    possibleCause: refConditions(symptom.relatedConditions),
  };

  const webPage = {
    "@type": "MedicalWebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: symptom.seo.title,
    inLanguage: "es-MX",
    isPartOf: { "@id": IDS.website },
    about: { "@id": IDS.symptom(symptom.slug) },
    ...(symptom.lastReviewed ? { lastReviewed: symptom.lastReviewed } : {}),
    reviewedBy: { "@id": IDS.physician },
  };

  const faqPage = symptom.faqs?.length
    ? {
        "@type": "FAQPage",
        mainEntity: symptom.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [signOrSymptom, webPage, ...(faqPage ? [faqPage] : []), ...baseGraph()],
  };
}

const diseaseById = new Map(diseases.map((d) => [d.id, d]));
function refConditions(ids?: string[]) {
  return (ids ?? [])
    .map((id) => diseaseById.get(id))
    .filter((d): d is MedicalCondition => Boolean(d))
    .map((d) => ({ "@id": IDS.condition(d.slug) }));
}
