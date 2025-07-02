// src/data/services.ts
export interface Service {
  title: string;
  description: string;
  imageName: string;
  category: 'impresion' | 'laser' | 'papeleria'; // <-- ¡Añadimos la categoría!
}

export const services: Service[] = [
  {
    title: "Impresión Digital",
    description: "Impresiones de alta calidad en diversos formatos y materiales.",
    imageName: "impresion-digital",
    category: "impresion", // <-- Asignamos categoría
  },
  {
    title: "Lonas y Gran Formato",
    description: "Publicidad impactante que se ve desde lejos con la mejor durabilidad.",
    imageName: "lonas-gran-formato",
    category: "impresion", // <-- Asignamos categoría
  },
  {
    title: "Grabado Láser",
    description: "Personalización y detalle de precisión sobre metal, madera y más.",
    imageName: "grabado-laser",
    category: "laser", // <-- Asignamos categoría
  },
  {
    title: "Corte Láser",
    description: "Cortes exactos y diseños complejos en una gran variedad de materiales.",
    imageName: "corte-laser",
    category: "laser", // <-- Asignamos categoría
  },
  {
    title: "Folletos y Papelería",
    description: "Comunica tus ideas de forma efectiva con folletos, trípticos y más.",
    imageName: "folletos-papeleria",
    category: "papeleria", // <-- Asignamos categoría
  },
  {
    title: "Stickers y Etiquetas",
    description: "Adhesivos personalizados con cualquier forma, tamaño y acabado.",
    imageName: "stickers-etiquetas",
    category: "papeleria", // <-- Asignamos categoría
  },
];


// Función helper para obtener la ruta de la imagen
export const getImagePath = (imageName: string) => {
  // En Next.js, las imágenes en public/ se sirven desde la raíz
  // Primero intentamos con .webp
  const webpPath = `/images/services/${imageName}.webp`;
  const jpgPath = `/images/services/${imageName}.jpg`;
  const pngPath = `/images/services/${imageName}.png`;
  
  // Para producción, deberías verificar qué archivo existe
  // Por ahora, asumimos que tienes archivos .webp
  // Si no, puedes cambiar el orden de prioridad aquí
  return webpPath;
};