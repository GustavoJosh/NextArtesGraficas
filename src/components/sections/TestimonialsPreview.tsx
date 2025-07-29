// src/components/sections/TestimonialsPreview.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data/testimonials';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { MessageCircle, ArrowRight, Users } from 'lucide-react';

export function TestimonialsPreview() {
  // Get first 2 testimonials for preview
  const previewTestimonials = testimonials.slice(0, 2);

  return (
    <section className="w-full py-16 md:py-20 bg-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F7DF14] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#0E345A] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="w-5 h-5 text-[#F7DF14] mr-2" />
            <span className="text-[#F7DF14] font-medium uppercase tracking-wider text-sm">Testimonios</span>
            <MessageCircle className="w-5 h-5 text-[#F7DF14] ml-2" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text">
              Lo Que Dicen Nuestros Clientes
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        {/* Testimonials preview grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {previewTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              company={testimonial.company}
              quote={testimonial.quote}
              rating={testimonial.rating}
              service={testimonial.service}
              date={testimonial.date}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#F7DF14] mr-2" />
              <span className="text-white font-semibold">+{testimonials.length} Clientes Satisfechos</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              ¿Quieres conocer más experiencias?
            </h3>
            <p className="text-gray-400 mb-6">
              Lee todas las reseñas y casos de éxito de nuestros clientes
            </p>
            <Button asChild size="lg" className="bg-[#F7DF14] text-[#0E345A] hover:bg-[#F7DF14]/90">
              <Link href="/testimonios" className="inline-flex items-center">
                Ver Todos los Testimonios
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}