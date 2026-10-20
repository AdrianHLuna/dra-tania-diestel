"use client";

import { Phone, MessageCircle } from "lucide-react";
import { doctor } from "@/data";
import { trackEvent } from "@/lib/analytics";

interface FloatingButtonsProps {
  /** Contexto de la página para el mensaje de WhatsApp. Ej: "hipertensión arterial" */
  context?: string;
}

const FloatingButtons = ({ context }: FloatingButtonsProps) => {
  const cleanWhatsapp = doctor.whatsapp.replace(/\D/g, "");

  const message = context
    ? `Hola, ${doctor.title} ${doctor.name}. Vi su página sobre ${context} y me gustaría agendar una valoración.`
    : `Hola, ${doctor.title} ${doctor.name}. Vi su página web y me gustaría agendar una cita.`;

  const whatsappLink = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(message)}`;
  const phoneLink = `tel:${doctor.phone}`;

  const buttonBaseClass =
    "w-[50px] h-[50px] rounded-full text-white flex justify-center items-center shadow-lg hover:scale-110 transition-transform duration-300 relative z-50";
  const pulseClass =
    "absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping -z-10";

  return (
    <div className="fixed right-5 bottom-5 hidden md:flex flex-col gap-4 z-50">
      <a
        target="_blank"
        href={whatsappLink}
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className={`${buttonBaseClass} bg-[#25D366]`}
        onClick={() => trackEvent("clic_whatsapp", { source: "floating" })}
      >
        <span className={`${pulseClass} bg-[#25D366]`} />
        <MessageCircle size={26} />
      </a>

      <a
        href={phoneLink}
        aria-label="Llamar al doctor"
        className={`${buttonBaseClass} bg-primary text-primary-foreground`}
        onClick={() => trackEvent("clic_llamar", { source: "floating" })}
      >
        <span className={`${pulseClass} bg-primary`} />
        <Phone size={20} />
      </a>
    </div>
  );
};

export default FloatingButtons;
