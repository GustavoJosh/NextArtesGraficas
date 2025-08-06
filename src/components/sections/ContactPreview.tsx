// src/components/sections/ContactPreview.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function ContactPreview() {
  return (
    <section className="w-full py-16 md:py-20 bg-[#0E345A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#F7DF14] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 text-center text-white relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text">
              ¿Listo para darle vida a tu marca?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Hablemos de tu proyecto. Estamos listos para escuchar tus ideas y
            convertirlas en realidad.
          </p>

          {/* Quick contact info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <Mail className="w-5 h-5 text-[#F7DF14]" />
              <span>Envíanos un email</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <Phone className="w-5 h-5 text-[#F7DF14]" />
              <span>Llámanos directamente</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-[#F7DF14]" />
              <span>Visítanos en persona</span>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#F7DF14] text-[#0E345A] hover:bg-[#F7DF14]/90 px-8 py-3">
              <Link href="/contacto" className="inline-flex items-center">
                Contáctanos Ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-[#F7DF14] text-white bg-[#0E345A] hover:bg-[#F7DF14] hover:text-[#0E345A] px-8 py-3"
            >
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@empresa.com'}`}>
                Enviar Email Directo
              </a>
            </Button>
          </div>

          {/* Additional info */}
          <div className="mt-8 text-sm text-gray-400">
            <p>Respuesta garantizada en menos de 24 horas</p>
          </div>
        </div>
      </div>
    </section>
  );
}