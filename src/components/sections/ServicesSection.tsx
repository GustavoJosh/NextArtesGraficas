// src/components/sections/ServicesSection.tsx
"use client";

import Link from 'next/link';
import MagicServicesBento from '@/components/ui/MagicBento';
import { services } from '@/data/services';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Sparkles } from 'lucide-react';

export function ServicesSection() {
  // Transformar los servicios para que sean compatibles con MagicBento
  const servicesForBento = services.map(service => ({
    title: service.title,
    description: service.description,
    category: service.category,
    imageName: service.imageName,
  }));

  return (
    <section id="servicios" className="w-full py-12 md:py-24 bg-gradient-to-b from-[#0A1B2E] to-[#0E345A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F7DF14] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#0E345A] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-[#F7DF14] mr-2" />
            <span className="text-[#F7DF14] font-medium uppercase tracking-wider text-sm">Servicios Profesionales</span>
            <Sparkles className="w-6 h-6 text-[#F7DF14] ml-2" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text">
            Nuestros Servicios
          </h2>

          <p className="text-gray-400 mt-2 text-lg max-w-2xl mx-auto">
            Todo lo que necesitas para que tu marca destaque. Desde impresión tradicional hasta soluciones digitales innovadoras.
          </p>
        </div>

        {/* Magic Bento Grid */}
        <div className="mb-16">
          <MagicServicesBento
            services={servicesForBento}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            disableAnimations={false}
            spotlightRadius={300}
            particleCount={12}
            enableTilt={true}
            glowColor="247, 223, 20" // Color dorado de tu tema
            clickEffect={true}
            enableMagnetism={true}
          />
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4">
            <Button asChild size="lg">
              <Link href="/servicios">
                <LayoutGrid className="mr-2 h-5 w-5" />
                Ver Catálogo Completo
              </Link>
            </Button>

            <Button variant="outline" size="lg" className="border-[#F7DF14] text-[#F7DF14] hover:bg-[#F7DF14] hover:text-[#0E345A]">
              <Link href="#contacto">
                Solicitar Cotización
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}