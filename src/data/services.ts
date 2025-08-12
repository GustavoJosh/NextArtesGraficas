// src/data/services.ts
export interface ServiceExample {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  category: string;
  materials?: string[];
  dimensions?: string;
}

export interface Service {
  title: string;
  description: string;
  imageName: string;
  category: 'impresion' | 'laser' | 'papeleria';
  deliveryTime: {
    standard: string;        // e.g., "3-5 días hábiles"
    rush?: string;          // e.g., "24-48 horas"
    notes?: string;         // Additional delivery information
  };
  specifications: {
    materials?: string[];    // Supported materials
    maxSize?: string;       // Maximum dimensions
    minQuantity?: number;   // Minimum order quantity
    features: string[];     // Key features/capabilities
  };
  examples: ServiceExample[];
  pricing?: {
    startingFrom?: string;  // e.g., "Desde $50"
    unit?: string;         // e.g., "por pieza", "por m²"
  };
}

// Work examples organized by service category
export const serviceExamples: ServiceExample[] = [
  // Impresión Digital examples
  {
    id: 'flyer-restaurant',
    title: 'Flyer Restaurante La Cocina',
    description: 'Flyer promocional para restaurante con diseño colorido y atractivo',
    imagePath: '/images/examples/impresion/flyer_restaurant.example.webp',
    category: 'impresion',
    materials: ['papel couché 150g', 'papel bond'],
    dimensions: '21cm x 29.7cm (A4)'
  },
  {
    id: 'business-cards-lawyer',
    title: 'Tarjetas Bufete Legal',
    description: 'Tarjetas de presentación profesionales con acabado mate',
    imagePath: '/images/examples/impresion/business_cards_lawyer.example.webp',
    category: 'impresion',
    materials: ['papel texturizado 300g', 'papel couché'],
    dimensions: '9cm x 5cm'
  },
  
  // Gran Formato examples
  {
    id: 'banner-grand-opening',
    title: 'Banner Gran Apertura Tienda',
    description: 'Banner promocional para gran apertura de tienda comercial',
    imagePath: '/images/examples/impresion/banner_grand_opening.example.webp',
    category: 'impresion',
    materials: ['lona vinílica 440g', 'mesh calado'],
    dimensions: '3m x 2m'
  },
  {
    id: 'vinyl-storefront',
    title: 'Vinilo Escaparate Boutique',
    description: 'Vinilo adhesivo para decoración de escaparate comercial',
    imagePath: '/images/examples/impresion/vinyl_storefront.example.webp',
    category: 'impresion',
    materials: ['vinilo adhesivo', 'vinilo microperforado'],
    dimensions: '2m x 1.5m'
  },

  // Grabado Láser examples
  {
    id: 'wood-sign-cafe',
    title: 'Letrero Café Artesanal',
    description: 'Letrero personalizado grabado en madera de roble para café',
    imagePath: '/images/examples/laser/wood_sign_cafe.example.webp',
    category: 'laser',
    materials: ['madera de roble', 'madera de pino'],
    dimensions: '30cm x 20cm x 2cm'
  },
  {
    id: 'metal-plaque-award',
    title: 'Placa Reconocimiento Empresarial',
    description: 'Placa conmemorativa grabada en acero inoxidable',
    imagePath: '/images/examples/laser/metal_plaque_award.example.webp',
    category: 'laser',
    materials: ['acero inoxidable', 'aluminio anodizado'],
    dimensions: '25cm x 15cm x 3mm'
  },

  // Corte Láser examples
  {
    id: 'acrylic-display-shop',
    title: 'Display Acrílico Tienda',
    description: 'Display promocional cortado en acrílico transparente',
    imagePath: '/images/examples/laser/acrylic_display_shop.example.webp',
    category: 'laser',
    materials: ['acrílico transparente 5mm', 'acrílico de color'],
    dimensions: '40cm x 30cm x 5mm'
  },
  {
    id: 'wood-decoration-home',
    title: 'Decoración Hogar Personalizada',
    description: 'Elementos decorativos cortados en madera MDF',
    imagePath: '/images/examples/laser/wood_decoration_home.example.webp',
    category: 'laser',
    materials: ['MDF 6mm', 'madera contrachapada'],
    dimensions: '20cm x 20cm x 6mm'
  },

  // Papelería examples
  {
    id: 'trifold-corporate',
    title: 'Tríptico Corporativo Empresa',
    description: 'Tríptico informativo con diseño corporativo elegante',
    imagePath: '/images/examples/papeleria/trifold_corporate.example.webp',
    category: 'papeleria',
    materials: ['papel couché 150g', 'papel reciclado'],
    dimensions: '21cm x 29.7cm (desplegado)'
  },
  {
    id: 'catalog-products',
    title: 'Catálogo Productos Premium',
    description: 'Catálogo de productos con encuadernación profesional',
    imagePath: '/images/examples/papeleria/catalog_products.example.webp',
    category: 'papeleria',
    materials: ['papel couché 120g', 'papel bond'],
    dimensions: '21cm x 21cm (16 páginas)'
  },

  // Stickers examples
  {
    id: 'stickers-brand-logo',
    title: 'Stickers Logo Marca Premium',
    description: 'Stickers personalizados con logo de marca resistentes al agua',
    imagePath: '/images/examples/papeleria/stickers_brand_logo.example.webp',
    category: 'papeleria',
    materials: ['vinilo adhesivo', 'papel adhesivo'],
    dimensions: '5cm x 5cm (circular)'
  },
  {
    id: 'labels-organic-products',
    title: 'Etiquetas Productos Orgánicos',
    description: 'Etiquetas para productos con información nutricional',
    imagePath: '/images/examples/papeleria/labels_organic_products.example.webp',
    category: 'papeleria',
    materials: ['papel adhesivo eco', 'vinilo transparente'],
    dimensions: '8cm x 6cm'
  }
];

export const services: Service[] = [
  {
    title: "Impresión Digital",
    description: "Impresiones de alta calidad en diversos formatos y materiales.",
    imageName: "impresion-digital",
    category: "impresion",
    deliveryTime: {
      standard: "2-3 días hábiles",
      rush: "24 horas",
      notes: "Tiempo puede variar según cantidad y complejidad"
    },
    specifications: {
      materials: ["papel couché", "papel bond", "papel fotográfico", "papel texturizado"],
      maxSize: "A0 (84.1cm x 118.9cm)",
      minQuantity: 1,
      features: ["Alta resolución 1200 DPI", "Colores vibrantes", "Acabados mate y brillante", "Resistente al agua"]
    },
    examples: serviceExamples.filter(ex => ex.id === 'flyer-restaurant' || ex.id === 'business-cards-lawyer'),
    pricing: {
      startingFrom: "Desde $15",
      unit: "por pieza"
    }
  },
  {
    title: "Lonas y Gran Formato",
    description: "Publicidad impactante que se ve desde lejos con la mejor durabilidad.",
    imageName: "lonas-gran-formato",
    category: "impresion",
    deliveryTime: {
      standard: "3-5 días hábiles",
      rush: "48 horas",
      notes: "Instalación disponible con costo adicional"
    },
    specifications: {
      materials: ["lona vinílica", "mesh", "vinilo adhesivo", "vinilo microperforado"],
      maxSize: "5m x 3m",
      minQuantity: 1,
      features: ["Resistente a intemperie", "Colores duraderos", "Ojales reforzados", "Impresión UV"]
    },
    examples: serviceExamples.filter(ex => ex.id === 'banner-grand-opening' || ex.id === 'vinyl-storefront'),
    pricing: {
      startingFrom: "Desde $200",
      unit: "por m²"
    }
  },
  {
    title: "Grabado Láser",
    description: "Personalización y detalle de precisión sobre metal, madera y más.",
    imageName: "grabado-laser",
    category: "laser",
    deliveryTime: {
      standard: "2-4 días hábiles",
      rush: "24-48 horas",
      notes: "Tiempo depende del material y complejidad del diseño"
    },
    specifications: {
      materials: ["madera", "metal", "acrílico", "cuero", "vidrio", "piedra"],
      maxSize: "60cm x 40cm",
      minQuantity: 1,
      features: ["Precisión micrométrica", "Grabado profundo", "Diseños complejos", "Acabado profesional"]
    },
    examples: serviceExamples.filter(ex => ex.id === 'wood-sign-cafe' || ex.id === 'metal-plaque-award'),
    pricing: {
      startingFrom: "Desde $80",
      unit: "por pieza"
    }
  },
  {
    title: "Corte Láser",
    description: "Cortes exactos y diseños complejos en una gran variedad de materiales.",
    imageName: "corte-laser",
    category: "laser",
    deliveryTime: {
      standard: "2-4 días hábiles",
      rush: "24-48 horas",
      notes: "Ensamblaje disponible con costo adicional"
    },
    specifications: {
      materials: ["madera", "acrílico", "MDF", "cartón", "cuero", "tela"],
      maxSize: "60cm x 40cm",
      minQuantity: 1,
      features: ["Cortes precisos", "Bordes sellados", "Formas complejas", "Sin rebabas"]
    },
    examples: serviceExamples.filter(ex => ex.id === 'acrylic-display-shop' || ex.id === 'wood-decoration-home'),
    pricing: {
      startingFrom: "Desde $50",
      unit: "por pieza"
    }
  },
  {
    title: "Folletos y Papelería",
    description: "Comunica tus ideas de forma efectiva con folletos, trípticos y más.",
    imageName: "folletos-papeleria",
    category: "papeleria",
    deliveryTime: {
      standard: "3-5 días hábiles",
      rush: "48 horas",
      notes: "Diseño incluido en el servicio"
    },
    specifications: {
      materials: ["papel couché", "papel bond", "papel reciclado", "papel texturizado"],
      maxSize: "A3 (29.7cm x 42cm)",
      minQuantity: 50,
      features: ["Diseño profesional", "Encuadernación disponible", "Acabados especiales", "Colores corporativos"]
    },
    examples: serviceExamples.filter(ex => ex.id === 'trifold-corporate' || ex.id === 'catalog-products'),
    pricing: {
      startingFrom: "Desde $2",
      unit: "por pieza"
    }
  },
  {
    title: "Stickers y Etiquetas",
    description: "Adhesivos personalizados con cualquier forma, tamaño y acabado.",
    imageName: "stickers-etiquetas",
    category: "papeleria",
    deliveryTime: {
      standard: "2-3 días hábiles",
      rush: "24 horas",
      notes: "Troquelado personalizado disponible"
    },
    specifications: {
      materials: ["vinilo adhesivo", "papel adhesivo", "vinilo transparente", "vinilo holográfico"],
      maxSize: "30cm x 30cm",
      minQuantity: 10,
      features: ["Resistente al agua", "Formas personalizadas", "Adhesivo fuerte", "Colores vibrantes"]
    },
    examples: serviceExamples.filter(ex => ex.id === 'stickers-brand-logo' || ex.id === 'labels-organic-products'),
    pricing: {
      startingFrom: "Desde $5",
      unit: "por pieza"
    }
  },
];


// Helper function to get service image path
export const getServiceImagePath = (imageName: string) => {
  return `/images/services/${imageName}.webp`;
};

// Helper function to get example image path with fallback
export const getExampleImagePath = (imagePath: string, fallbackServiceImage?: string) => {
  // For now, return the imagePath as-is
  // In production, you might want to check if file exists and fallback to service image
  return imagePath;
};

// Helper function to get fallback image for missing examples
export const getExampleFallback = (category: 'impresion' | 'laser' | 'papeleria') => {
  const fallbackMap = {
    'impresion': '/images/services/impresion-digital.webp',
    'laser': '/images/services/grabado-laser.webp',
    'papeleria': '/images/services/folletos-papeleria.webp'
  };
  return fallbackMap[category];
};