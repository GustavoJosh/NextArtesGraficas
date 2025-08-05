// src/data/faq.ts
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItem[] = [
  {
    id: "tiempo-proyecto",
    question: "¿Cuánto tiempo toma completar un proyecto?",
    answer: "El tiempo de entrega depende del tipo y complejidad del proyecto. Proyectos simples pueden estar listos en 1-3 días, mientras que proyectos más complejos pueden tomar 1-2 semanas. Te daremos un tiempo estimado específico cuando discutamos tu proyecto.",
    category: "Tiempos"
  },
  {
    id: "diseno-personalizado",
    question: "¿Ofrecen servicios de diseño personalizado?",
    answer: "Sí, ofrecemos servicios completos de diseño gráfico personalizado. Nuestro equipo puede crear diseños únicos desde cero o trabajar con tus ideas existentes para desarrollar la solución perfecta para tu marca.",
    category: "Diseño"
  },
  {
    id: "formatos-archivo",
    question: "¿Qué formatos de archivo aceptan?",
    answer: "Aceptamos una amplia variedad de formatos incluyendo AI, PSD, PDF, EPS, JPG, PNG, y más. Si tienes dudas sobre un formato específico, no dudes en contactarnos y te ayudaremos.",
    category: "Técnico"
  },
  {
    id: "gran-volumen",
    question: "¿Manejan proyectos de gran volumen?",
    answer: "Absolutamente. Tenemos la capacidad y experiencia para manejar proyectos de cualquier tamaño, desde pedidos pequeños hasta producciones de gran volumen. Ofrecemos precios especiales para pedidos grandes.",
    category: "Producción"
  },
  {
    id: "precios-cotizacion",
    question: "¿Cómo funcionan sus precios y cotizaciones?",
    answer: "Ofrecemos cotizaciones personalizadas basadas en las especificaciones de cada proyecto. Los factores que influyen en el precio incluyen el tamaño, cantidad, materiales, complejidad del diseño y tiempo de entrega. Contáctanos para una cotización gratuita.",
    category: "Precios"
  },
  {
    id: "revision-cambios",
    question: "¿Puedo hacer cambios después de aprobar el diseño?",
    answer: "Incluimos hasta 3 rondas de revisiones sin costo adicional. Cambios mayores después de la aprobación final pueden tener un costo adicional, pero siempre te informaremos antes de proceder.",
    category: "Proceso"
  },
  {
    id: "entrega-envio",
    question: "¿Cómo manejan la entrega y envío?",
    answer: "Ofrecemos entrega local en La Paz sin costo adicional para pedidos mayores a $500 MXN. Para envíos foráneos, trabajamos con paqueterías confiables y el costo se calcula según destino y peso del paquete.",
    category: "Entrega"
  },
  {
    id: "garantia-calidad",
    question: "¿Ofrecen garantía en sus trabajos?",
    answer: "Sí, garantizamos la calidad de todos nuestros trabajos. Si hay algún defecto de impresión o problema con los materiales, lo corregimos sin costo adicional. Tu satisfacción es nuestra prioridad.",
    category: "Calidad"
  }
];