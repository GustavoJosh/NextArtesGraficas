// src/components/sections/TestimonialsSection.tsx
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { testimonials } from '@/data/testimonials';

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="w-full py-12 md:py-24 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
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
      </div>
    </section>
  );
}