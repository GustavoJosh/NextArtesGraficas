// src/data/webServices.ts

// Core TypeScript interfaces for Web Services Catalog

export type WebServiceCategoryId = 'qr-menus' | 'websites' | 'digital-cards' | 'custom-solutions';

export type ComplexityLevel = 'basic' | 'standard' | 'premium';
export type BillingType = 'one-time' | 'monthly' | 'custom';
export type ServiceImageType = 'screenshot' | 'mockup' | 'demo';

export interface ServiceImage {
  url: string;
  alt: string;
  type: ServiceImageType;
  featured: boolean;
}

export interface PricingTier {
  starting: number;
  currency: string;
  billing: BillingType;
  features: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  content: string;
  rating: number;
  serviceId: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  imageUrl: string;
}

export interface WebServiceCategory {
  id: WebServiceCategoryId;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface WebService {
  id: string;
  title: string;
  description: string;
  category: WebServiceCategory;
  features: string[];
  technologies: string[];
  pricing: PricingTier;
  gallery: ServiceImage[];
  demoUrl?: string;
  caseStudy?: CaseStudy;
  testimonials: Testimonial[];
  estimatedDelivery: string;
  complexity: ComplexityLevel;
}

// Web Service Categories Configuration
export const webServiceCategories: WebServiceCategory[] = [
  {
    id: 'qr-menus',
    name: 'Menús QR',
    description: 'Menús digitales interactivos con códigos QR',
    icon: 'QrCode',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'websites',
    name: 'Sitios Web',
    description: 'Páginas web modernas y responsivas',
    icon: 'Globe',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'digital-cards',
    name: 'Tarjetas Digitales',
    description: 'Tarjetas de presentación digitales interactivas',
    icon: 'CreditCard',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'custom-solutions',
    name: 'Soluciones Personalizadas',
    description: 'Aplicaciones web a medida',
    icon: 'Sparkles',
    color: 'orange',
    gradient: 'from-orange-500 to-red-600'
  }
];

// Sample Testimonials
export const webServiceTestimonials: Testimonial[] = [
  {
    id: 'testimonial-qr-menu-1',
    clientName: 'María González',
    clientCompany: 'Restaurante La Cocina',
    content: 'El menú QR transformó completamente la experiencia de nuestros clientes. Ahora pueden ver fotos de los platos y actualizamos precios en tiempo real.',
    rating: 5,
    serviceId: 'qr-menu-restaurant'
  },
  {
    id: 'testimonial-website-1',
    clientName: 'Carlos Mendoza',
    clientCompany: 'Clínica Dental Sonrisa',
    content: 'Nuestra nueva página web nos ha traído 40% más pacientes. El diseño es profesional y fácil de navegar.',
    rating: 5,
    serviceId: 'website-dental-clinic'
  },
  {
    id: 'testimonial-digital-card-1',
    clientName: 'Ana Rodríguez',
    clientCompany: 'Consultora Legal AR',
    content: 'La tarjeta digital me permite compartir mi información de contacto al instante. Muy práctica para networking.',
    rating: 5,
    serviceId: 'digital-card-lawyer'
  }
];

// Sample Case Studies
export const webServiceCaseStudies: CaseStudy[] = [
  {
    id: 'case-study-qr-menu',
    title: 'Restaurante La Cocina - Menú QR',
    description: 'Implementación de menú digital que aumentó la eficiencia del servicio',
    challenge: 'El restaurante necesitaba reducir el contacto físico y actualizar precios frecuentemente',
    solution: 'Desarrollamos un menú QR interactivo con gestión de inventario en tiempo real',
    results: [
      '50% reducción en tiempo de pedido',
      '30% aumento en ventas de postres',
      '100% satisfacción del cliente'
    ],
    imageUrl: '/images/case-studies/qr-menu-restaurant.webp'
  }
];

// Sample Web Services Data
export const sampleWebServices: WebService[] = [
  // QR Menus
  {
    id: 'qr-menu-restaurant',
    title: 'Menú QR para Restaurantes',
    description: 'Menú digital interactivo con gestión de inventario y actualizaciones en tiempo real',
    category: webServiceCategories[0], // qr-menus
    features: [
      'Diseño responsive para móviles',
      'Gestión de inventario en tiempo real',
      'Múltiples idiomas',
      'Integración con redes sociales',
      'Analytics de visualizaciones',
      'Códigos QR personalizados',
      'Categorización de productos',
      'Fotos de alta calidad'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Supabase', 'QR Code Generator'],
    pricing: {
      starting: 299,
      currency: 'USD',
      billing: 'one-time',
      features: ['Hasta 50 productos', 'Dominio personalizado', '1 año de hosting', 'Actualizaciones ilimitadas']
    },
    gallery: [
      {
        url: '/images/web-services/qr-menu-restaurant-1.webp',
        alt: 'Vista previa del menú QR para restaurante',
        type: 'mockup',
        featured: true
      },
      {
        url: '/images/web-services/qr-menu-restaurant-2.webp',
        alt: 'Panel de administración del menú',
        type: 'screenshot',
        featured: false
      }
    ],
    demoUrl: 'https://demo-qr-menu.example.com',
    caseStudy: webServiceCaseStudies[0],
    testimonials: [webServiceTestimonials[0]],
    estimatedDelivery: '5-7 días',
    complexity: 'standard'
  },
  {
    id: 'qr-menu-bar',
    title: 'Menú QR para Bares y Cafeterías',
    description: 'Carta digital especializada para bebidas con promociones y horarios especiales',
    category: webServiceCategories[0], // qr-menus
    features: [
      'Carta de bebidas especializada',
      'Promociones por horarios',
      'Happy hour automático',
      'Integración con delivery',
      'Modo nocturno',
      'Recomendaciones personalizadas'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Firebase'],
    pricing: {
      starting: 249,
      currency: 'USD',
      billing: 'one-time',
      features: ['Hasta 30 productos', 'Dominio personalizado', '1 año de hosting']
    },
    gallery: [
      {
        url: '/images/web-services/qr-menu-bar-1.webp',
        alt: 'Menú QR para bar con modo nocturno',
        type: 'mockup',
        featured: true
      }
    ],
    testimonials: [],
    estimatedDelivery: '3-5 días',
    complexity: 'basic'
  },

  // Websites
  {
    id: 'website-business',
    title: 'Sitio Web Empresarial',
    description: 'Página web profesional para empresas con diseño moderno y optimización SEO',
    category: webServiceCategories[1], // websites
    features: [
      'Diseño responsive',
      'Optimización SEO',
      'Formulario de contacto',
      'Galería de servicios',
      'Blog integrado',
      'Google Analytics',
      'Certificado SSL',
      'Velocidad optimizada'
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Contentful'],
    pricing: {
      starting: 599,
      currency: 'USD',
      billing: 'one-time',
      features: ['Hasta 10 páginas', 'Dominio .com incluido', '1 año de hosting', 'Mantenimiento básico']
    },
    gallery: [
      {
        url: '/images/web-services/website-business-1.webp',
        alt: 'Página principal de sitio web empresarial',
        type: 'screenshot',
        featured: true
      },
      {
        url: '/images/web-services/website-business-2.webp',
        alt: 'Página de servicios responsive',
        type: 'mockup',
        featured: false
      }
    ],
    demoUrl: 'https://demo-business.example.com',
    testimonials: [],
    estimatedDelivery: '10-14 días',
    complexity: 'standard'
  },
  {
    id: 'website-dental-clinic',
    title: 'Sitio Web para Clínica Dental',
    description: 'Página web especializada para clínicas dentales con sistema de citas online',
    category: webServiceCategories[1], // websites
    features: [
      'Sistema de citas online',
      'Galería de casos antes/después',
      'Información de servicios',
      'Equipo médico',
      'Testimonios de pacientes',
      'Ubicación y contacto',
      'Blog de salud dental'
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Calendly API', 'Sanity CMS'],
    pricing: {
      starting: 799,
      currency: 'USD',
      billing: 'one-time',
      features: ['Sistema de citas', 'Hasta 15 páginas', 'Dominio .com', '1 año de hosting']
    },
    gallery: [
      {
        url: '/images/web-services/website-dental-1.webp',
        alt: 'Página principal de clínica dental',
        type: 'screenshot',
        featured: true
      }
    ],
    testimonials: [webServiceTestimonials[1]],
    estimatedDelivery: '12-16 días',
    complexity: 'premium'
  },

  // Digital Cards
  {
    id: 'digital-card-lawyer',
    title: 'Tarjeta Digital para Abogados',
    description: 'Tarjeta de presentación digital profesional con información de contacto interactiva',
    category: webServiceCategories[2], // digital-cards
    features: [
      'Información de contacto completa',
      'Botón de llamada directa',
      'Enlace a WhatsApp',
      'Redes sociales',
      'Descarga de vCard',
      'Compartir por QR',
      'Diseño profesional',
      'Actualizable en tiempo real'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'QR Code API'],
    pricing: {
      starting: 149,
      currency: 'USD',
      billing: 'one-time',
      features: ['Diseño personalizado', 'QR code incluido', 'Actualizaciones por 1 año']
    },
    gallery: [
      {
        url: '/images/web-services/digital-card-lawyer-1.webp',
        alt: 'Tarjeta digital para abogado',
        type: 'mockup',
        featured: true
      }
    ],
    testimonials: [webServiceTestimonials[2]],
    estimatedDelivery: '2-3 días',
    complexity: 'basic'
  },
  {
    id: 'digital-card-realtor',
    title: 'Tarjeta Digital para Agentes Inmobiliarios',
    description: 'Tarjeta digital con galería de propiedades y herramientas de contacto avanzadas',
    category: webServiceCategories[2], // digital-cards
    features: [
      'Galería de propiedades',
      'Calculadora de hipotecas',
      'Testimonios de clientes',
      'Certificaciones profesionales',
      'Contacto directo',
      'Compartir propiedades',
      'Integración con MLS'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Real Estate API'],
    pricing: {
      starting: 199,
      currency: 'USD',
      billing: 'one-time',
      features: ['Hasta 20 propiedades', 'Calculadora incluida', 'Actualizaciones ilimitadas']
    },
    gallery: [
      {
        url: '/images/web-services/digital-card-realtor-1.webp',
        alt: 'Tarjeta digital para agente inmobiliario',
        type: 'mockup',
        featured: true
      }
    ],
    testimonials: [],
    estimatedDelivery: '4-6 días',
    complexity: 'standard'
  },

  // Custom Solutions
  {
    id: 'custom-inventory-system',
    title: 'Sistema de Inventario Personalizado',
    description: 'Aplicación web a medida para gestión de inventario con reportes avanzados',
    category: webServiceCategories[3], // custom-solutions
    features: [
      'Gestión completa de inventario',
      'Códigos de barras',
      'Reportes avanzados',
      'Múltiples usuarios',
      'Alertas de stock bajo',
      'Integración con proveedores',
      'Dashboard ejecutivo',
      'Exportación de datos'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Chart.js'],
    pricing: {
      starting: 1999,
      currency: 'USD',
      billing: 'custom',
      features: ['Desarrollo a medida', 'Capacitación incluida', '6 meses de soporte', 'Hosting por 1 año']
    },
    gallery: [
      {
        url: '/images/web-services/custom-inventory-1.webp',
        alt: 'Dashboard del sistema de inventario',
        type: 'screenshot',
        featured: true
      },
      {
        url: '/images/web-services/custom-inventory-2.webp',
        alt: 'Módulo de reportes',
        type: 'screenshot',
        featured: false
      }
    ],
    testimonials: [],
    estimatedDelivery: '4-6 semanas',
    complexity: 'premium'
  },
  {
    id: 'custom-booking-system',
    title: 'Sistema de Reservas Personalizado',
    description: 'Plataforma de reservas online con calendario avanzado y pagos integrados',
    category: webServiceCategories[3], // custom-solutions
    features: [
      'Calendario de disponibilidad',
      'Pagos online seguros',
      'Notificaciones automáticas',
      'Gestión de clientes',
      'Reportes de ocupación',
      'Integración con Google Calendar',
      'App móvil opcional',
      'Soporte multiidioma'
    ],
    technologies: ['React', 'Node.js', 'Stripe API', 'MongoDB', 'Socket.io'],
    pricing: {
      starting: 2499,
      currency: 'USD',
      billing: 'custom',
      features: ['Desarrollo completo', 'Integración de pagos', '1 año de soporte', 'Capacitación incluida']
    },
    gallery: [
      {
        url: '/images/web-services/custom-booking-1.webp',
        alt: 'Sistema de reservas - calendario',
        type: 'screenshot',
        featured: true
      }
    ],
    testimonials: [],
    estimatedDelivery: '6-8 semanas',
    complexity: 'premium'
  }
];

// Helper functions
export const getWebServicesByCategory = (categoryId: WebServiceCategoryId): WebService[] => {
  return sampleWebServices.filter(service => service.category.id === categoryId);
};

export const getWebServiceById = (serviceId: string): WebService | undefined => {
  return sampleWebServices.find(service => service.id === serviceId);
};

export const getCategoryById = (categoryId: WebServiceCategoryId): WebServiceCategory | undefined => {
  return webServiceCategories.find(category => category.id === categoryId);
};

export const getServiceImagePath = (imagePath: string): string => {
  return imagePath.startsWith('/') ? imagePath : `/images/web-services/${imagePath}`;
};

export const getFeaturedServices = (): WebService[] => {
  return sampleWebServices.filter(service => 
    service.gallery.some(image => image.featured)
  );
};

export const getServicesByComplexity = (complexity: ComplexityLevel): WebService[] => {
  return sampleWebServices.filter(service => service.complexity === complexity);
};

export const searchServices = (query: string): WebService[] => {
  const lowercaseQuery = query.toLowerCase();
  return sampleWebServices.filter(service => 
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.features.some(feature => feature.toLowerCase().includes(lowercaseQuery)) ||
    service.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
};

// Export all services for easy access
export const webServices = sampleWebServices;