// src/data/testimonials.ts
export interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ana López",
    company: "Tech Solutions",
    quote: "El nivel de detalle y profesionalismo superó todas nuestras expectativas. ¡Totalmente recomendados!",
  },
  {
    name: "Carlos Vera",
    company: "Café del Puerto",
    quote: "Transformaron nuestra marca. El nuevo logo y los folletos han sido un éxito rotundo con nuestros clientes.",
  },
];