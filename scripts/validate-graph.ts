// Ejecutar con: npx tsx scripts/validate-graph.ts
// Importación relativa para no depender de la resolución de alias fuera de Next.
import { diseases, services, symptoms } from "../src/data";

const errors: string[] = [];

function assertUnique(label: string, values: string[]) {
  const seen = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) errors.push(`${label} duplicado: "${v}"`);
    seen.add(v);
  }
}
assertUnique("ID de enfermedad", diseases.map((d) => d.id));
assertUnique("Slug de enfermedad", diseases.map((d) => d.slug));
assertUnique("ID de servicio", services.map((s) => s.id));
assertUnique("Slug de servicio", services.map((s) => s.slug));
assertUnique("ID de síntoma", symptoms.map((s) => s.id));
assertUnique("Slug de síntoma", symptoms.map((s) => s.slug));

const diseaseIds = new Set(diseases.map((d) => d.id));
const serviceIds = new Set(services.map((s) => s.id));
const symptomIds = new Set(symptoms.map((s) => s.id));

for (const d of diseases) {
  d.relatedServices?.forEach((id) => {
    if (!serviceIds.has(id)) errors.push(`Enfermedad "${d.id}": servicio inexistente "${id}"`);
  });
  d.relatedSymptoms?.forEach((id) => {
    if (!symptomIds.has(id)) errors.push(`Enfermedad "${d.id}": síntoma inexistente "${id}"`);
  });
}
for (const s of services) {
  s.relatedConditions?.forEach((id) => {
    if (!diseaseIds.has(id)) errors.push(`Servicio "${s.id}": enfermedad inexistente "${id}"`);
  });
}
for (const s of symptoms) {
  s.relatedConditions.forEach((id) => {
    if (!diseaseIds.has(id)) errors.push(`Síntoma "${s.id}": enfermedad inexistente "${id}"`);
  });
}

for (const d of diseases) {
  d.relatedServices?.forEach((id) => {
    const svc = services.find((s) => s.id === id);
    if (svc && !svc.relatedConditions?.includes(d.id))
      errors.push(
        `Relación no bidireccional: enfermedad "${d.id}" → servicio "${id}" (falta el retorno en relatedConditions)`
      );
  });
}
for (const s of services) {
  s.relatedConditions?.forEach((id) => {
    const dis = diseases.find((d) => d.id === id);
    if (dis && !dis.relatedServices?.includes(s.id))
      errors.push(
        `Relación no bidireccional: servicio "${s.id}" → enfermedad "${id}" (falta el retorno en relatedServices)`
      );
  });
}

for (const d of diseases) {
  d.relatedSymptoms?.forEach((id) => {
    const sym = symptoms.find((s) => s.id === id);
    if (sym && !sym.relatedConditions.includes(d.id))
      errors.push(
        `Relación no bidireccional: enfermedad "${d.id}" → síntoma "${id}" (falta el retorno en relatedConditions)`
      );
  });
}
for (const s of symptoms) {
  s.relatedConditions.forEach((id) => {
    const dis = diseases.find((d) => d.id === id);
    if (dis && !dis.relatedSymptoms?.includes(s.id))
      errors.push(
        `Relación no bidireccional: síntoma "${s.id}" → enfermedad "${id}" (falta el retorno en relatedSymptoms)`
      );
  });
}

if (errors.length > 0) {
  console.error(`\n✗ Grafo inválido (${errors.length} errores):\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log("✓ Grafo de conocimiento válido: esquemas, unicidad y bidireccionalidad correctos.");
