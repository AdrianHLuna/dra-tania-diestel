import { z } from "zod";

// ─── Constantes de validación ── v3 ────────────────────────────
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // minúsculas con guiones, sin acentos
const E164 = /^\+[1-9]\d{6,14}$/; // formato internacional sin espacios: +529611234567
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/; // 2026-08-04

// ─── Sub-schemas ──────────────────────────────────────────────
const SEOSchema = z.object({
  title: z.string().max(60),
  description: z.string().max(160),
  keywords: z.array(z.string()).min(3),
  ogImage: z.string().optional(),
});

const ExperienceItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string(),
});

const CertificationSchema = z.object({
  name: z.string(),
  institution: z.string(),
  logo: z.string().optional(),
  year: z.string().optional(),
});

const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  logo: z.string().optional(),
  // Opcional: el intake real del doctor no siempre incluye el año de egreso.
  year: z.string().optional(),
});

const FAQItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const TestimonialSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
  image: z.string().optional(),
  sourceUrl: z.string().url(),
  date: z.string(),
});

const VideoSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
  duration: z.string().optional(),
  uploadDate: z.string(),
});

// ─── Doctor Profile ───────────────────────────────────────────
export const DoctorProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  specialty: z.string(),
  specialistTitle: z.string().optional(),
  subspecialty: z.string().optional(),
  cedula: z.string().min(5),
  // Institución (siglas) que emitió cada cédula — se muestra como "Céd Prof: 00000000 (UNAM)".
  cedulaInstitucion: z.string().optional(),
  cedulaEspecialidad: z.string().optional(),
  cedulaEspecialidadInstitucion: z.string().optional(),
  cedulaSubespecialidad: z.string().optional(),
  cedulaSubespecialidadInstitucion: z.string().optional(),
  cofepris: z.string().optional(),
  phone: z.string().regex(E164, "Formato E.164 sin espacios, ej: +529611234567"),
  whatsapp: z.string().regex(E164, "Formato E.164 sin espacios"),
  // Línea directa de urgencias, distinta del teléfono de citas — las señales
  // de alarma (§3.8 del manual) deben dirigir aquí, nunca a WhatsApp.
  emergencyPhone: z.string().regex(E164, "Formato E.164 sin espacios").optional(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  googleMapsUrl: z.string().url(),
  geo: z.object({ latitude: z.number(), longitude: z.number() }).optional(),
  consultationPrice: z.number().positive(),
  paymentMethods: z.array(z.string()),
  insurances: z.array(z.string()).optional(),
  schedule: z.string(),
  openingHours: z.array(z.string()).optional(),
  acceptingNewPatients: z.boolean().default(true),
  photo: z.string(),
  bio: z.string().min(100),
  philosophy: z.string(),
  experience: z.array(ExperienceItemSchema),
  // Estadísticas rápidas del Hero (ej. "+3,500 Pacientes"). No forma parte
  // del manual original — se añadió tras auditar sitios reales que sí lo usan.
  stats: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  certifications: z.array(CertificationSchema),
  education: z.array(EducationSchema),
  testimonials: z.array(TestimonialSchema).optional(),
  videos: z.array(VideoSchema).optional(),
  sameAs: z.array(z.string().url()).optional(),
  ga4Id: z.string().optional(),
});

// ─── Medical Condition (Enfermedad) ───────────────────────────
export const MedicalConditionSchema = z.object({
  id: z.string(),
  slug: z.string().regex(SLUG, "Slug en minúsculas con guiones, sin acentos"),
  name: z.string(),
  technicalName: z.string().optional(),
  colloquialNames: z.array(z.string()).optional(),
  description: z.string().min(50),
  symptoms: z.array(z.string()),
  causes: z.array(z.string()),
  riskFactors: z.array(z.string()),
  mexicoStats: z.string().optional(),
  complications: z.array(z.string()),
  treatments: z.array(z.string()), // Sin nombres de medicamentos
  faqs: z.array(FAQItemSchema).min(3),
  sources: z.array(z.string()).optional(),
  relatedServices: z.array(z.string()).optional(),
  relatedSymptoms: z.array(z.string()).optional(),
  lastReviewed: z.string().regex(ISO_DATE).optional(),
  image: z.string(),
  sameAs: z.string().url().optional(),
  seo: SEOSchema,
});

// ─── Medical Service (Servicio/Cirugía) ───────────────────────
export const MedicalServiceSchema = z.object({
  id: z.string(),
  slug: z.string().regex(SLUG),
  name: z.string(),
  description: z.string(),
  longDescription: z.string(),
  type: z.enum(["ambulatorio", "hospitalario", "consultorio"]),
  anesthesiaType: z.string().optional(),
  duration: z.string().optional(),
  recoveryTime: z.string().optional(),
  isPainful: z.boolean(),
  benefits: z.array(z.string()),
  postOpRecommendations: z.array(z.string()),
  priceRange: z.string().optional(),
  technicalSpecs: z.record(z.string(), z.string()).optional(),
  faqs: z.array(FAQItemSchema).min(2).optional(),
  relatedConditions: z.array(z.string()).optional(),
  lastReviewed: z.string().regex(ISO_DATE).optional(),
  video: VideoSchema.optional(),
  image: z.string(),
  seo: SEOSchema,
});

// ─── Symptom (Síntoma) ─────────────────────────────────────────
export const SymptomSchema = z.object({
  id: z.string(),
  slug: z.string().regex(SLUG),
  name: z.string(),
  colloquialNames: z.array(z.string()).optional(),
  description: z.string(),
  causes: z.array(z.string()),
  alarmSigns: z.array(z.string()).min(1),
  whyConsult: z.string(),
  faqs: z.array(FAQItemSchema).min(2).optional(),
  relatedConditions: z.array(z.string()),
  lastReviewed: z.string().regex(ISO_DATE).optional(),
  image: z.string(),
  seo: SEOSchema,
});

// ─── Clinical Case (Antes y Después) ───────────────────────────
export const ClinicalCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  beforeImage: z.string(),
  afterImage: z.string(),
  hasWrittenConsent: z.literal(true),
  patientDisclaimer: z.string().default("Paciente real. Los resultados varían."),
  procedureId: z.string().optional(),
});

// ─── Anatomy (Opcional) ────────────────────────────────────────
export const AnatomySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  relatedDiseases: z.array(z.string()),
  image: z.string(),
});

// ─── Tipos inferidos ───────────────────────────────────────────
export type DoctorProfile = z.infer<typeof DoctorProfileSchema>;
export type MedicalCondition = z.infer<typeof MedicalConditionSchema>;
export type MedicalService = z.infer<typeof MedicalServiceSchema>;
export type Symptom = z.infer<typeof SymptomSchema>;
export type ClinicalCase = z.infer<typeof ClinicalCaseSchema>;
export type Anatomy = z.infer<typeof AnatomySchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type FAQItem = z.infer<typeof FAQItemSchema>;
