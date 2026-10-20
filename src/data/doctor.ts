import type { DoctorProfile } from "@/types/schema";

// Datos reales del intake de la usuaria (2026-10-19). Sin fabricar nada no
// entregado: precio de consulta, métodos de pago, seguros, fotos, ficha de
// Google, widget de agenda, testimonios y redes sociales quedan PENDIENTE —
// no inventados. Logo y paleta de marca SÍ son reales (carpetas LOGO/ y
// "PALETA DE COLORES/" entregadas en el repo, pese a que el texto del
// intake las marcaba en blanco — verificado siempre antes de asumir que no
// hay material de marca, AGENTS.md).
export const doctor: DoctorProfile = {
  name: "Tania Leticia Diestel Bautista",
  title: "Dra.",
  specialty: "Cardiología",
  specialistTitle: "Cardióloga",
  subspecialty: "Ecocardiografía",
  cedula: "5148226",
  cedulaInstitucion: "UNACH",
  cedulaEspecialidad: "8070169",
  cedulaEspecialidadInstitucion: "UNAM",
  // Sin folio COFEPRIS confirmado todavía — "En trámite" se muestra siempre
  // junto a las cédulas (franja superior del Header), nunca se omite.
  cofepris: "En trámite",
  phone: "+529616125775",
  whatsapp: "+529621842735",
  email: "letytania26@hotmail.com",
  address:
    "Doctor Faustino Miranda s/n, entre avenida Álamos y 5ta Norte, Fraccionamiento Madero, C.P. 29000, Tuxtla Gutiérrez, Chiapas",
  city: "Tuxtla Gutiérrez",
  state: "Chiapas",
  country: "México",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Doctor+Faustino+Miranda+s%2Fn%2C+Fraccionamiento+Madero%2C+Tuxtla+Guti%C3%A9rrez%2C+Chiapas",
  // Precio, métodos de pago y seguros no se proporcionaron en el intake —
  // consultationPrice guarda un valor técnico (1) solo para satisfacer el
  // esquema Zod (positive()), nunca se muestra en la UI ni se emite en el
  // JSON-LD (mismo patrón que dr-gregorio-arcos, ver lib/schemas.ts).
  consultationPrice: 1,
  paymentMethods: [],
  schedule: "Lunes a viernes, 9:00 a.m. a 12:00 p.m.",
  openingHours: ["Mo-Fr 09:00-12:00"],
  acceptingNewPatients: true,
  photo: "/hero.JPG",
  heroPhoto: "/hero.JPG",
  aboutPhoto: "/aboutme.JPG",
  bio: "La Dra. Tania Leticia Diestel Bautista es cardióloga con Alta Especialidad en Ecocardiografía en Tuxtla Gutiérrez, Chiapas. Con más de 15 años de experiencia, atiende arritmias, insuficiencia cardíaca, cardiopatía isquémica y otras condiciones del corazón, con un enfoque diagnóstico preciso apoyado en estudios de imagen cardíaca.",
  philosophy: "Un diagnóstico cardiológico certero empieza por escuchar al paciente y confirmarse con la imagen correcta.",
  experience: [],
  stats: [{ label: "Años de experiencia", value: "+15" }],
  certifications: [
    { name: "Certificada por el Consejo Mexicano de Cardiología (CMC)", institution: "Consejo Mexicano de Cardiología (CMC)" },
  ],
  education: [
    { degree: "Médico Cirujano", institution: "Universidad Autónoma de Chiapas (UNACH)" },
    { degree: "Especialidad en Cardiología", institution: "Universidad Nacional Autónoma de México (UNAM)" },
  ],
  sameAs: [],
};
