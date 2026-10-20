# Manual de Prompts de Imágenes e Ilustraciones Médicas (AISO v3.1)
## Dra. Tania Leticia Diestel Bautista — Cardiología
**Ciudad:** Tuxtla Gutiérrez, Chiapas
**Especialidad:** Cardióloga, Alta Especialidad en Ecocardiografía

**Nota de discreción clínica:** este catálogo incluye condiciones de urgencia real (infarto agudo de miocardio, accidente cerebrovascular cardioembólico). Los prompts de estos temas están redactados para verse **clínicos, informativos y serenos, nunca alarmantes, gráficos ni tipo "escena de ambulancia/hospital dramática"**: ilustraciones anatómicas 3D del corazón y las arterias coronarias, electrocardiogramas y trazos de ritmo cardíaco esquemáticos, fotografía clínica discreta de estudios (ecocardiograma, prueba de esfuerzo, Holter) o encuadres cotidianos de paciente — nunca sangre, dolor facial exagerado, camillas de urgencia ni equipo de reanimación en primer plano. Cada prompt representa visualmente el tema real que describe (nunca una escena genérica desconectada del padecimiento, servicio o síntoma específico).

Cada prompt indica entre paréntesis la ruta de archivo a la que corresponde en el sitio (`public/...jpg`).

---

## 🤖 PROMPT INICIAL DE CONTEXTO MASTER PARA GEMINI / CHATGPT / MIDJOURNEY

```text
Rol: Experto en generación de imágenes e ilustraciones médicas fotorrealistas de nivel premium para marketing de salud y sitios web de Cardiología de alta gama.
Tono: Preciso, sereno y de autoridad clínica (Cardiología/Ecocardiografía), elegante y editorial — nunca alarmante ni gráfico, pese a tratar temas de urgencia cardiovascular.
Estilo: Renders 3D anatómicos de alta fidelidad del corazón, arterias coronarias y trazos de electrocardiograma para enfermedades; fotografía clínica discreta de alta gama (ecocardiograma, prueba de esfuerzo, Holter, consulta) para servicios; fotografía de escenas cotidianas de paciente, con iluminación cálida, para síntomas.
Identidad visual OBLIGATORIA (paleta real de marca de la doctora, dirección "Pulso Clínico"): vino oscuro (#510D35) como acento primario, rojo de marca (#B90C14) para trazos de pulso/EKG y detalles vivos, rosa blush (#E2B5B9) como superficie suave, azul de marca (#3C77B4) como acento secundario diagnóstico, dorado (#C7A24A) como acento terciario puntual, crema (#F5EDD4) solo como toque cálido ocasional — fondo dominante blanco/gris muy claro, nunca oscuro ni neón.
Restricciones: Cero sangre, cero gore, cero expresiones faciales de dolor agudo o pánico, cero camillas de urgencia/ambulancias/desfibriladores en primer plano, cero nombres de medicamentos ni empaques farmacéuticos visibles. Prohibidos hologramas, neones, HUDs interactivos o elementos de ciencia ficción. Cero palabras, texto, marcas de agua, firmas o números.
Formato: JPG horizontal de aspecto 16:9 (--ar 16:9 --v 6.0).

Instrucciones generales de color y estilo:
- Lighting: Clean, bright, warm-neutral editorial lighting — soft natural light or elegant studio light, never dark/moody.
- Color Palette: Deep Wine (#510D35), Brand Red (#B90C14), Blush Pink (#E2B5B9), Brand Blue (#3C77B4), Gold (#C7A24A), Cream (#F5EDD4), white/near-white backgrounds, natural skin tones.
- Composition: Centered, calm, editorial framing with generous negative space — elegant, never cluttered or clinically cold.
- Suffixes: realistic medical CGI or high-fidelity clinical photography, 8k, photorealistic textures, soft editorial grade --ar 16:9 --v 6.0
- Negative Prompt: hologram, sci-fi, futuristic, neon, glowing digital UI, hud, blueprints, user interface, text, words, letters, watermark, signature, blood, gore, pained facial expression, ambulance, defibrillator, hospital gurney, medication packaging, pill bottles, dark/carbon background.

Estas son instrucciones, no hagas imágenes todavía.
```

---

## ❤️ SECCIÓN 1: PROMPTS PARA ENFERMEDADES

### 1. Arritmias (`public/enfermedades/arritmias.jpg`)
```text
3D anatomical illustration of a human heart with a glowing electrical conduction pathway overlaid, showing an irregular rhythm pattern branching across the heart's surface, clean elegant medical textbook style.

Lighting: Soft warm studio lighting, subtle glow along the electrical pathway.
Color Palette: Wine (#510D35) heart tissue, Brand Red (#B90C14) glowing electrical pathway, white/cream (#F5EDD4) background.
Composition: Centered heart, three-quarter view, generous negative space.
```

### 2. Hipertensión (`public/enfermedades/hipertension.jpg`)
```text
3D anatomical illustration of a coronary artery cross-section showing a narrowed vessel under visible internal pressure, with a subtle pressure-gauge motif integrated into the composition, clean medical textbook style.

Lighting: Soft warm studio lighting, highlight on the vessel wall.
Color Palette: Brand Blue (#3C77B4) artery, Wine (#510D35) accent details, cream (#F5EDD4) background.
Composition: Centered vessel cross-section, macro framing, generous negative space.
```

### 3. Infarto agudo de miocardio (`public/enfermedades/infarto-agudo-de-miocardio.jpg`)
```text
3D anatomical illustration of a heart with one coronary artery shown blocked by a clot, a small highlighted area of affected heart muscle, serene educational diagram style — not alarming.

Lighting: Soft clinical studio lighting, clear highlight on the blocked vessel.
Color Palette: Wine (#510D35) heart tissue, Brand Red (#B90C14) blocked vessel/affected zone, white background.
Composition: Centered heart with artery close-up inset, generous negative space.
```

### 4. Insuficiencia cardíaca (`public/enfermedades/insuficiencia-cardiaca.jpg`)
```text
3D anatomical illustration of an enlarged, softly glowing heart with a subtle fluid-wave motif at its base suggesting reduced pumping efficiency, calm educational diagram style.

Lighting: Soft warm studio lighting, gentle gradient glow.
Color Palette: Wine (#510D35) heart, Brand Blue (#3C77B4) fluid motif, cream (#F5EDD4) background.
Composition: Centered heart, three-quarter view, generous negative space.
```

### 5. Fibrilación auricular (`public/enfermedades/fibrilacion-auricular.jpg`)
```text
3D anatomical illustration of the heart's upper chambers (atria) shown with a chaotic, quivering electrical pattern contrasted against the steady rhythm of the lower chambers, clean medical textbook style.

Lighting: Soft warm studio lighting, subtle glow on the chaotic pattern.
Color Palette: Wine (#510D35) heart tissue, Brand Red (#B90C14) irregular atrial pattern, Brand Blue (#3C77B4) steady ventricular rhythm, white background.
Composition: Centered heart, top-down emphasis on atria, generous negative space.
```

### 6. Cardiomiopatía isquémica (`public/enfermedades/cardiomiopatia-isquemica.jpg`)
```text
3D anatomical illustration of heart muscle tissue cross-section showing patches of weakened, pale tissue alongside a narrowed coronary artery, educational diagram style, serene not graphic.

Lighting: Soft clinical studio lighting.
Color Palette: Wine (#510D35) healthy tissue, muted Blush (#E2B5B9) weakened tissue, Brand Blue (#3C77B4) artery, cream background.
Composition: Centered cross-section, macro framing, generous negative space.
```

### 7. Angina (`public/enfermedades/angina.jpg`)
```text
3D anatomical illustration of a coronary artery narrowed by plaque buildup with a subtle warm glow indicating reduced blood flow to the heart muscle, clean medical textbook style.

Lighting: Soft warm studio lighting, highlight on the narrowed segment.
Color Palette: Brand Blue (#3C77B4) artery, Gold (#C7A24A) plaque buildup, Brand Red (#B90C14) subtle flow accent, white background.
Composition: Centered artery close-up, generous negative space.
```

### 8. Bradicardia (`public/enfermedades/bradicardia.jpg`)
```text
3D anatomical illustration of a heart with a slow, widely-spaced electrical pulse pattern overlaid, evoking a calm, unhurried rhythm, clean educational diagram style.

Lighting: Soft warm studio lighting.
Color Palette: Wine (#510D35) heart tissue, Brand Blue (#3C77B4) slow pulse pattern, cream (#F5EDD4) background.
Composition: Centered heart, three-quarter view, generous negative space.
```

### 9. Cardiopatía hipertensiva (`public/enfermedades/cardiopatia-hipertensiva.jpg`)
```text
3D anatomical illustration of a heart with visibly thickened left ventricular muscle wall shown in cross-section, clean educational diagram style.

Lighting: Soft clinical studio lighting, highlight on the thickened wall.
Color Palette: Wine (#510D35) thickened muscle, Brand Blue (#3C77B4) chamber interior, white background.
Composition: Centered cross-section, macro framing, generous negative space.
```

### 10. Infarto de miocardio (seguimiento) (`public/enfermedades/infarto-de-miocardio.jpg`)
```text
3D anatomical illustration of a heart with a small, healed pale scar patch on the muscle wall, a calm follow-up/monitoring visual motif, serene educational diagram style.

Lighting: Soft warm studio lighting.
Color Palette: Wine (#510D35) healthy tissue, muted Blush (#E2B5B9) scar tissue, Gold (#C7A24A) subtle accent, cream background.
Composition: Centered heart, three-quarter view, generous negative space.
```

### 11. Accidente cerebrovascular cardioembólico (`public/enfermedades/accidente-cerebrovascular-cardioembolico.jpg`)
```text
3D anatomical illustration showing a small clot traveling from a stylized heart silhouette toward a brain silhouette connected by a vessel pathway, calm educational diagram style — not alarming.

Lighting: Soft clinical studio lighting, subtle glow along the pathway.
Color Palette: Wine (#510D35) heart silhouette, Brand Blue (#3C77B4) brain silhouette and vessel, Brand Red (#B90C14) small clot accent, white background.
Composition: Centered dual-organ diagram, generous negative space.
```

### 12. Cardiomiopatía dilatada (`public/enfermedades/cardiomiopatia-dilatada.jpg`)
```text
3D anatomical illustration of an enlarged, rounded heart chamber shown in cross-section with thinned muscle walls, clean educational diagram style.

Lighting: Soft warm studio lighting.
Color Palette: Wine (#510D35) muscle wall, Brand Blue (#3C77B4) enlarged chamber interior, cream background.
Composition: Centered cross-section, macro framing, generous negative space.
```

### 13. Cardiomiopatía hipertrófica (CMH) (`public/enfermedades/cardiomiopatia-hipertrofica.jpg`)
```text
3D anatomical illustration of a heart cross-section showing a notably thickened septal wall partially narrowing the outflow pathway, clean educational diagram style.

Lighting: Soft clinical studio lighting, highlight on the thickened septum.
Color Palette: Wine (#510D35) thickened muscle, Brand Blue (#3C77B4) chamber and outflow pathway, white background.
Composition: Centered cross-section, macro framing, generous negative space.
```

### 14. Niveles elevados de colesterol y triglicéridos (`public/enfermedades/niveles-elevados-de-colesterol-y-trigliceridos.jpg`)
```text
3D illustration of a blood vessel interior showing smooth golden lipid droplets accumulating along the vessel wall, elegant editorial medical style.

Lighting: Soft warm studio lighting, subtle highlight on lipid droplets.
Color Palette: Brand Blue (#3C77B4) vessel, Gold (#C7A24A) lipid droplets, cream (#F5EDD4) background.
Composition: Centered vessel interior, macro framing, generous negative space.
```

### 15. Síndrome de disfunción sinusal (`public/enfermedades/sindrome-de-disfuncion-sinusal.jpg`)
```text
3D anatomical illustration of the heart's upper chamber highlighting the sinus node as a small glowing pacemaker point, with an irregular, pausing pulse pattern radiating outward, clean educational diagram style.

Lighting: Soft warm studio lighting, gentle glow on the sinus node point.
Color Palette: Wine (#510D35) heart tissue, Brand Red (#B90C14) glowing node, Brand Blue (#3C77B4) pulse pattern, white background.
Composition: Centered heart with node close-up emphasis, generous negative space.
```

---

## 🩺 SECCIÓN 2: PROMPTS PARA SERVICIOS

### 1. Ecocardiografía (`public/servicios/ecocardiografia.jpg`)
```text
Discreet high-end clinical photograph of an ultrasound transducer gently placed on a patient's chest during an echocardiogram, calm clinical setting, warm elegant lighting, cardiologist's hand visible, no face in close-up discomfort.

Lighting: Soft warm clinical lighting, elegant and calm.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) accents in clinic decor, cream (#F5EDD4) linens, natural skin tones.
Composition: Centered mid-shot, patient reclined comfortably, generous negative space.
```

### 2. Ecocardiograma de Estrés Farmacológico (`public/servicios/ecocardiograma-de-estres-farmacologico.jpg`)
```text
Discreet high-end clinical photograph of a patient resting comfortably on an exam table connected to ECG monitoring leads while a nurse checks a medication infusion line, calm supervised clinical setting.

Lighting: Soft warm clinical lighting.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) clinic accents, white linens, natural skin tones.
Composition: Centered mid-shot, generous negative space.
```

### 3. Prueba de Esfuerzo (Ergometría) (`public/servicios/prueba-de-esfuerzo.jpg`)
```text
Discreet high-end clinical photograph of a patient walking on a treadmill connected to ECG electrodes, supervised by a cardiologist nearby, calm confident expression, elegant clinical setting.

Lighting: Soft warm clinical lighting.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) clinic accents, natural skin tones.
Composition: Centered mid-shot, generous negative space.
```

### 4. Holter (Monitoreo Electrocardiográfico Ambulatorio) (`public/servicios/holter.jpg`)
```text
Discreet high-end clinical photograph of a small Holter monitor device and ECG electrode leads being attached to a patient's chest by a cardiologist, calm professional setting.

Lighting: Soft warm clinical lighting.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) accents, white linens, natural skin tones.
Composition: Centered mid-shot, generous negative space.
```

### 5. Monitoreo Ambulatorio de Presión Arterial (MAPA) (`public/servicios/monitoreo-ambulatorio-de-presion-arterial.jpg`)
```text
Discreet high-end clinical photograph of a blood pressure cuff device being fitted on a patient's arm, small portable monitor visible at the waist, calm confident expression, elegant clinical setting.

Lighting: Soft warm clinical lighting.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) accents, natural skin tones.
Composition: Centered mid-shot, generous negative space.
```

### 6. Electrocardiograma (ECG) (`public/servicios/electrocardiograma.jpg`)
```text
Discreet high-end clinical photograph of ECG electrodes being placed on a patient's chest and limbs, a clean ECG trace line visible on a nearby monitor, calm clinical setting.

Lighting: Soft warm clinical lighting.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) accents, white linens, natural skin tones.
Composition: Centered mid-shot, generous negative space.
```

### 7. Valoración Cardiovascular Preoperatoria (`public/servicios/valoracion-cardiovascular-preoperatoria.jpg`)
```text
Discreet high-end clinical photograph of a cardiologist reviewing a patient's chart and ECG printout together at a consultation desk, calm reassuring interaction, elegant clinical setting.

Lighting: Soft warm editorial lighting.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) accents, cream (#F5EDD4) desk tones, natural skin tones.
Composition: Centered two-person consultation shot, generous negative space.
```

### 8. Valoración de Cardiopatías Congénitas (`public/servicios/valoracion-de-cardiopatias-congenitas.jpg`)
```text
Discreet high-end clinical photograph of a cardiologist performing an echocardiogram on an adult patient while reviewing the heart structure image on a nearby screen, calm attentive expression, elegant clinical setting.

Lighting: Soft warm clinical lighting.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) accents, natural skin tones.
Composition: Centered mid-shot, generous negative space.
```

### 9. Consulta de Cardiología Extrahospitalaria (`public/servicios/consulta-de-cardiologia-extrahospitalaria.jpg`)
```text
Discreet high-end editorial photograph of a cardiologist in consultation with a patient at an elegant clinic desk, warm reassuring body language, calm confident atmosphere.

Lighting: Soft warm editorial lighting.
Color Palette: Wine (#510D35) and Brand Blue (#3C77B4) clinic accents, cream (#F5EDD4) desk tones, natural skin tones.
Composition: Centered two-person consultation shot, generous negative space.
```

---

## 💓 SECCIÓN 3: PROMPTS PARA SÍNTOMAS

### 1. Dolor en el pecho (`public/sintomas/dolor-en-el-pecho.jpg`)
```text
Warm lifestyle photograph of a person pausing mid-activity with one hand resting gently on their chest, calm concerned expression, soft natural indoor lighting, discreet and non-dramatic.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Blush (#E2B5B9) subtle accent in clothing/decor.
Composition: Centered mid-shot, generous negative space.
```

### 2. Palpitaciones (`public/sintomas/palpitaciones.jpg`)
```text
Warm lifestyle photograph of a person sitting quietly with a hand resting over their chest, calm attentive expression, soft natural light, discreet and non-dramatic.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Brand Blue (#3C77B4) subtle accent in clothing/decor.
Composition: Centered mid-shot, generous negative space.
```

### 3. Falta de aire (Disnea) (`public/sintomas/falta-de-aire.jpg`)
```text
Warm lifestyle photograph of a person pausing while climbing a few stairs, one hand on the railing, calm tired expression, soft natural light, discreet and non-dramatic.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Wine (#510D35) subtle accent in clothing/decor.
Composition: Centered mid-shot, generous negative space.
```

### 4. Fatiga o cansancio inusual (`public/sintomas/fatiga-o-cansancio-inusual.jpg`)
```text
Warm lifestyle photograph of a person resting on a sofa with eyes gently closed, relaxed but visibly tired posture, soft natural indoor lighting.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Blush (#E2B5B9) subtle accent in decor.
Composition: Centered mid-shot, generous negative space.
```

### 5. Mareo o sensación de desmayo (Presíncope) (`public/sintomas/mareo-o-sensacion-de-desmayo.jpg`)
```text
Warm lifestyle photograph of a person steadying themselves with one hand against a wall or furniture, calm cautious expression, soft natural indoor lighting, discreet and non-dramatic.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Brand Blue (#3C77B4) subtle accent.
Composition: Centered mid-shot, generous negative space.
```

### 6. Desmayo (Síncope) (`public/sintomas/desmayo.jpg`)
```text
Warm lifestyle photograph of a person seated with head lowered and a hand supporting their forehead, calm recovering posture, soft natural indoor lighting, discreet and non-dramatic — not depicting a collapse.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Wine (#510D35) subtle accent.
Composition: Centered mid-shot, generous negative space.
```

### 7. Hinchazón en piernas y tobillos (Edema) (`public/sintomas/hinchazon-en-piernas-y-tobillos.jpg`)
```text
Warm lifestyle photograph of a person gently pressing a finger against their own ankle while seated, calm attentive expression, soft natural indoor lighting, discreet medical framing.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Brand Blue (#3C77B4) subtle accent.
Composition: Centered close mid-shot on lower legs, generous negative space.
```

### 8. Dificultad para respirar al acostarse (Ortopnea) (`public/sintomas/dificultad-para-respirar-al-acostarse.jpg`)
```text
Warm lifestyle photograph of a person sitting propped up on several pillows in bed, calm but slightly uncomfortable expression, soft warm nighttime lamp lighting.

Lighting: Soft warm lamp lighting.
Color Palette: Warm neutral tones, Blush (#E2B5B9) bedding accent.
Composition: Centered mid-shot, generous negative space.
```

### 9. Latidos cardíacos lentos, rápidos o irregulares (`public/sintomas/latidos-cardiacos-lentos-rapidos-o-irregulares.jpg`)
```text
Warm lifestyle photograph of a person checking their pulse at the wrist with two fingers, calm attentive expression, soft natural indoor lighting.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Brand Red (#B90C14) subtle accent.
Composition: Centered close mid-shot on hand/wrist, generous negative space.
```

### 10. Sudoración fría repentina (`public/sintomas/sudoracion-fria-repentina.jpg`)
```text
Warm lifestyle photograph of a person dabbing their forehead with a cloth, calm concerned expression, soft natural indoor lighting, discreet and non-dramatic.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Brand Blue (#3C77B4) subtle accent.
Composition: Centered mid-shot, generous negative space.
```

### 11. Dolor que se irradia al brazo, cuello o mandíbula (`public/sintomas/dolor-que-se-irradia-al-brazo-cuello-o-mandibula.jpg`)
```text
Warm lifestyle photograph of a person gently rubbing their shoulder and upper arm, calm concerned expression, soft natural indoor lighting, discreet and non-dramatic.

Lighting: Soft warm natural light.
Color Palette: Warm neutral tones, Wine (#510D35) subtle accent.
Composition: Centered mid-shot, generous negative space.
```
