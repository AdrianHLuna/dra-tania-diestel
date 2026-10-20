interface MapFacadeProps {
  address: string;
  whatsapp: string;
}

/**
 * Mapa de Google real e interactivo desde la primera carga (AGENTS.md §7,
 * decisión explícita del usuario 2026-09-24) — nunca pedir clic para "ver
 * el mapa". Sin `loading="lazy"` a propósito: con lazy, el chequeo de
 * intersección del navegador corre antes de que el layout termine de
 * asentarse tras la hidratación y, sin un scroll posterior que lo
 * re-dispare, el mapa se queda en blanco de forma permanente — bug real
 * confirmado en `dr-gregorio-arcos`/`dr-oliver-martinez`/`dr-gustavo-alvarez`
 * (corregido aquí 2026-10-09 tras encontrarlo también en `dr-wilfredo-
 * santiesteban`, que copió esta misma versión desacatualizada de la
 * plantilla). Sin tarjeta flotante superpuesta al mapa: un embed de un solo
 * punto siempre centra el pin, y cualquier tarjeta superpuesta termina
 * tapándolo en viewports angostos sin importar su posición — la info de
 * contacto va en una sección aparte, debajo del mapa, nunca encima. El
 * nombre del componente se conserva por compatibilidad con el resto del
 * código, aunque ya no es un "facade" con clic.
 */
export default function MapFacade({ address }: MapFacadeProps) {
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className="h-[60vh] w-full bg-muted md:h-[70vh]">
      <iframe
        src={mapsEmbedUrl}
        className="h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación del consultorio"
      />
    </div>
  );
}
