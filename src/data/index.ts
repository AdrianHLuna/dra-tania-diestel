// Única puerta de acceso a los datos.
// Prohibido importar los archivos crudos (./diseases, ./services...) desde componentes.
import { z } from "zod";
import {
  DoctorProfileSchema,
  MedicalConditionSchema,
  MedicalServiceSchema,
  SymptomSchema,
} from "@/types/schema";
import { doctor as rawDoctor } from "./doctor";
import { diseases as rawDiseases } from "./diseases";
import { services as rawServices } from "./services";
import { symptoms as rawSymptoms } from "./symptoms";

// Si un dato viola el esquema, el build falla con el error exacto de Zod.
// Ese es el comportamiento deseado: nunca se publica un sitio con datos inválidos.
export const doctor = DoctorProfileSchema.parse(rawDoctor);
export const diseases = z.array(MedicalConditionSchema).min(1).parse(rawDiseases);
export const services = z.array(MedicalServiceSchema).min(1).parse(rawServices);
export const symptoms = z.array(SymptomSchema).min(1).parse(rawSymptoms);
