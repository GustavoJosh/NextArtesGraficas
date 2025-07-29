// src/components/sections/CtaSection.tsx
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="contacto" className="w-full py-16 md:py-28 bg-[#0E345A]">
      <div className="container mx-auto px-4 md:px-6 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold">
          ¿Listo para darle vida a tu marca?
        </h2>
        <p className="mt-4 max-w-xl mx-auto">
          Hablemos de tu proyecto. Estamos listos para escuchar tus ideas y
          convertirlas en realidad.
        </p>
        <Button asChild className="mt-8 px-10 py-6 text-lg" variant="secondary">
        <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>Contáctanos Ahora</a>
      </Button>
      </div>
    </section>
  );
}