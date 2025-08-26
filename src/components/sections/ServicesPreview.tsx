// src/components/sections/ServicesPreview.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { services, serviceCategories } from '@/data/services';
import MagicServicesBento from '@/components/ui/MagicBento';
import { Sparkles, ArrowRight } from 'lucide-react';

export function ServicesPreview() {
  // Get first 6 services for preview (works better with bento grid)
  const previewServices = services.slice(0, 6);

  // Transform services for MagicBento compatibility
  const servicesForBento = previewServices.map(service => {
    const category = serviceCategories.find(cat => cat.id === service.categoryId);
    
    // Map service categories to the three main categories expected by MagicBento
    let mappedCategory: 'impresion' | 'laser' | 'papeleria' = 'impresion';
    if (service.categoryId.includes('laser') || service.categoryId.includes('cnc')) {
      mappedCategory = 'laser';
    } else if (service.categoryId.includes('imprenta') || service.categoryId.includes('impresion')) {
      mappedCategory = 'impresion';
    } else {
      mappedCategory = 'papeleria';
    }
    
    return {
      title: service.title,
      description: service.description,
      category: mappedCategory,
      imageName: category?.imageName || 'default',
    };
  });

  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-b from-[#0A1B2E] to-[#0E345A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F7DF14] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#0E345A] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5 text-[#F7DF14] mr-2" />
            <span className="text-[#F7DF14] font-medium uppercase tracking-wider text-sm">Servicios</span>
            <Sparkles className="w-5 h-5 text-[#F7DF14] ml-2" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text">
              Lo Que Hacemos
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Desde impresión tradicional hasta soluciones digitales innovadoras
          </p>
        </div>

        {/* Magic Bento Grid - Compact version for preview */}
        <div className="mb-12">
          <MagicServicesBento
            services={servicesForBento}
            textAutoHide={false} // Keep text visible for preview
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            disableAnimations={false}
            spotlightRadius={250} // Slightly smaller radius
            particleCount={8} // Fewer particles for performance
            enableTilt={false} // Disable tilt for cleaner preview
            glowColor="247, 223, 20" // Golden color from theme
            clickEffect={true}
            enableMagnetism={false} // Disable magnetism for preview
          />
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">
              ¿Quieres ver todos nuestros servicios?
            </h3>
            <p className="text-gray-400 mb-6">
              Explora nuestro catálogo completo con más opciones y detalles
            </p>
            <Button asChild size="lg" className="bg-[#F7DF14] text-[#0E345A] hover:bg-[#F7DF14]/90">
              <Link href="/servicios" className="inline-flex items-center">
                Ver Catálogo Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}