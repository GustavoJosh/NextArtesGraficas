// src/components/sections/ServicesSection.tsx
import CircularGallery from '@/components/ui/CircularGallery';
import { services, getImagePath } from '@/data/services';

export function ServicesSection() {
  // Mapear servicios al formato requerido por CircularGallery
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

        <CircularGallery items={servicesForGallery} />
      </div>
    </section>
  );
}