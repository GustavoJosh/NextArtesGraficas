// src/components/sections/ServicesSection.tsx
"use client";

import Link from 'next/link';
import CircularGallery from '@/components/ui/CircularGallery';
import { services, getImagePath } from '@/data/services';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';

export function ServicesSection() {
  const servicesForGallery = services.map(service => ({
    text: service.title,
    image: getImagePath(service.imageName),
    description: service.description
  }));

  return (
    <section id="servicios" className="w-full py-12 md:py-24 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Nuestros Servicios
          </h2>
          <p className="text-gray-400 mt-2">
            Todo lo que necesitas para que tu marca destaque. Desliza para explorar.
          </p>
        </div>

        {/* La galería visual se mantiene igual */}
        <CircularGallery items={servicesForGallery} />

        {/* --- Botón que redirige a la nueva página de catálogo --- */}
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/servicios">
              <LayoutGrid className="mr-2 h-5 w-5" />
              Ver Catálogo Completo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}