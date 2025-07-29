// src/data/testimonials.ts
export interface Testimonial {
  name: string;
  company: string;
  quote: string;
  rating?: number;
  service?: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ana López",
    company: "Tech Solutions",
    quote: "El nivel de detalle y profesionalismo superó todas nuestras expectativas. ¡Totalmente recomendados!",
    rating: 5,
    service: "Diseño Gráfico",
    date: "2024-01-15"
  },
  {
    name: "Carlos Vera",
    company: "Café del Puerto",
    quote: "Transformaron nuestra marca. El nuevo logo y los folletos han sido un éxito rotundo con nuestros clientes.",
    rating: 5,
    service: "Branding",
    date: "2024-02-20"
  },
  {
    name: "María González",
    company: "Restaurante El Sabor",
    quote: "Los menús digitales que crearon para nuestro restaurante son increíbles. Nuestros clientes los aman y nosotros también.",
    rating: 5,
    service: "Menús Digitales",
    date: "2024-03-10"
  },
  {
    name: "Roberto Martínez",
    company: "Constructora Martínez",
    quote: "El trabajo de corte láser fue perfecto. Cada pieza salió exactamente como la necesitábamos para nuestro proyecto.",
    rating: 5,
    service: "Corte Láser",
    date: "2024-02-28"
  },
  {
    name: "Laura Jiménez",
    company: "Boutique Luna",
    quote: "La impresión de nuestras etiquetas y material promocional quedó espectacular. Calidad excepcional.",
    rating: 5,
    service: "Impresión Digital",
    date: "2024-01-30"
  },
  {
    name: "Diego Ramírez",
    company: "Eventos DR",
    quote: "Siempre cumplen con los tiempos de entrega y la calidad es consistente. Son nuestro proveedor de confianza.",
    rating: 5,
    service: "Material Promocional",
    date: "2024-03-05"
  },
];