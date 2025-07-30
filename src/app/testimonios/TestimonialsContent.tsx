'use client';

// src/app/testimonios/TestimonialsContent.tsx
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { testimonials } from '@/data/testimonials';
import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';

export function TestimonialsContent() {
  const [selectedService, setSelectedService] = useState<string>('all');

  // Get unique services for filtering
  const services = useMemo(() => {
    const uniqueServices = [...new Set(testimonials.map(t => t.service).filter((service): service is string => Boolean(service)))];
    return uniqueServices;
  }, []);

  // Filter testimonials based on selected service
  const filteredTestimonials = useMemo(() => {
    if (selectedService === 'all') {
      return testimonials;
    }
    return testimonials.filter(testimonial => testimonial.service === selectedService);
  }, [selectedService]);

  // Breadcrumb items for navigation
  const breadcrumbItems = [
    { name: 'Testimonios' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Testimonios
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre lo que nuestros clientes dicen sobre nuestros servicios profesionales
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              La satisfacción de nuestros clientes es nuestra mayor recompensa. 
              Aquí puedes leer sus experiencias trabajando con nosotros.
            </p>

            {/* Filter Section */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-gray-300">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filtrar por servicio:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedService('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedService === 'all'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Todos
                </button>
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedService === service
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="transform hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  company={testimonial.company}
                  quote={testimonial.quote}
                  rating={testimonial.rating}
                  service={testimonial.service}
                  date={testimonial.date}
                />
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No se encontraron testimonios para el servicio seleccionado.
              </p>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {testimonials.length}+
              </div>
              <p className="text-gray-300">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                5.0
              </div>
              <p className="text-gray-300">Calificación Promedio</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {services.length}
              </div>
              <p className="text-gray-300">Servicios Evaluados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para ser nuestro próximo cliente satisfecho?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestros clientes satisfechos y descubre por qué confían en nosotros 
            para sus proyectos de impresión y diseño gráfico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Contactar Ahora
            </a>
            <a
              href="/portafolio"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-white font-semibold rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors duration-300"
            >
              Ver Portafolio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}