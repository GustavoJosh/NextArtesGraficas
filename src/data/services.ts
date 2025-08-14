// src/data/services.ts

// Category types
export type ServiceCategoryId = 'anuncios-luminosos' | 'cnc-laser' | 'cnc-router' | 'corte-vinil' | 'displays' |
  'impresion-gran-formato' | 'diseno-grafico' | 'imprenta' | 'imprenta-digital' |
  'letreros-3d' | 'oxicorte-plasma' | 'articulos-promocionales' | 'rotulacion-vehicular' |
  'sellos' | 'senaleticas' | 'textiles';

// Work examples for individual services
export interface ServiceExample {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  serviceId: string; // References the individual service, not category
  materials?: string[];
  dimensions?: string;
}

// Individual service item within a category
export interface Service {
  id: string;
  title: string;
  description: string;
  categoryId: ServiceCategoryId;
  deliveryTime: {
    standard: string;
    rush?: string;
    notes?: string;
  };
  specifications: {
    materials?: string[];
    maxSize?: string;
    minQuantity?: number;
    features: string[];
  };
  examples: ServiceExample[];
  pricing?: {
    startingFrom?: string;
    unit?: string;
  };
}

// Service category (parent container)
export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  description: string;
  imageName: string;
  services: Service[];
}

// Work examples for individual services
export const serviceExamples: ServiceExample[] = [
  // Flyers examples (2)
  {
    id: 'flyer-restaurant',
    title: 'Flyer Restaurante La Cocina',
    description: 'Flyer promocional para restaurante con diseño colorido y atractivo',
    imagePath: '/images/examples/impresion/flyer_restaurant.example.webp',
    serviceId: 'flyers',
    materials: ['papel couché 150g', 'papel bond'],
    dimensions: '21cm x 29.7cm (A4)'
  },
  {
    id: 'flyer-gym-membership',
    title: 'Flyer Gimnasio Fitness Pro',
    description: 'Volante promocional para membresías de gimnasio con diseño deportivo',
    imagePath: '/images/examples/impresion/flyer_gym.example.webp',
    serviceId: 'flyers',
    materials: ['papel couché 150g', 'papel bond'],
    dimensions: '21cm x 29.7cm (A4)'
  },

  // Business cards examples (2)
  {
    id: 'business-cards-lawyer',
    title: 'Tarjetas Bufete Legal',
    description: 'Tarjetas de presentación profesionales con acabado mate',
    imagePath: '/images/examples/impresion/business_cards_lawyer.example.webp',
    serviceId: 'tarjetas-presentacion',
    materials: ['papel texturizado 300g', 'papel couché'],
    dimensions: '9cm x 5cm'
  },
  {
    id: 'business-cards-doctor',
    title: 'Tarjetas Consultorio Médico',
    description: 'Tarjetas elegantes para profesionales de la salud',
    imagePath: '/images/examples/impresion/business_cards_doctor.example.webp',
    serviceId: 'tarjetas-presentacion',
    materials: ['papel texturizado 300g', 'papel couché'],
    dimensions: '9cm x 5cm'
  },

  // Banners examples (2)
  {
    id: 'banner-grand-opening',
    title: 'Banner Gran Apertura Tienda',
    description: 'Banner promocional para gran apertura de tienda comercial',
    imagePath: '/images/examples/impresion/banner_grand_opening.example.webp',
    serviceId: 'banners',
    materials: ['lona vinílica 440g', 'mesh calado'],
    dimensions: '3m x 2m'
  },
  {
    id: 'banner-sale-event',
    title: 'Banner Evento de Ventas',
    description: 'Banner llamativo para promociones y eventos especiales',
    imagePath: '/images/examples/impresion/banner_sale.example.webp',
    serviceId: 'banners',
    materials: ['lona vinílica 440g', 'mesh calado'],
    dimensions: '4m x 2m'
  },

  // Lonas examples (2)
  {
    id: 'lona-construction',
    title: 'Lona Empresa Construcción',
    description: 'Lona publicitaria resistente para empresa constructora',
    imagePath: '/images/examples/impresion/lona_construction.example.webp',
    serviceId: 'lonas',
    materials: ['lona vinílica', 'mesh'],
    dimensions: '8m x 3m'
  },
  {
    id: 'lona-real-estate',
    title: 'Lona Inmobiliaria Premium',
    description: 'Lona de gran formato para promoción de proyectos inmobiliarios',
    imagePath: '/images/examples/impresion/lona_realestate.example.webp',
    serviceId: 'lonas',
    materials: ['lona backlight', 'lona vinílica'],
    dimensions: '10m x 3m'
  },

  // Stickers examples (2) - Already has 2 ✅
  {
    id: 'vinyl-storefront',
    title: 'Vinilo Escaparate Boutique',
    description: 'Vinilo adhesivo para decoración de escaparate comercial',
    imagePath: '/images/examples/impresion/vinyl_storefront.example.webp',
    serviceId: 'stickers',
    materials: ['vinilo adhesivo', 'vinilo microperforado'],
    dimensions: '2m x 1.5m'
  },
  {
    id: 'stickers-brand-logo',
    title: 'Stickers Logo Marca Premium',
    description: 'Stickers personalizados con logo de marca resistentes al agua',
    imagePath: '/images/examples/papeleria/stickers_brand_logo.example.webp',
    serviceId: 'stickers',
    materials: ['vinilo adhesivo', 'papel adhesivo'],
    dimensions: '5cm x 5cm (circular)'
  },

  // Etiquetas examples (2)
  {
    id: 'labels-organic-products',
    title: 'Etiquetas Productos Orgánicos',
    description: 'Etiquetas para productos con información nutricional',
    imagePath: '/images/examples/papeleria/labels_organic_products.example.webp',
    serviceId: 'etiquetas',
    materials: ['papel adhesivo eco', 'vinilo transparente'],
    dimensions: '8cm x 6cm'
  },
  {
    id: 'labels-cosmetics',
    title: 'Etiquetas Productos Cosméticos',
    description: 'Etiquetas elegantes para línea de productos de belleza',
    imagePath: '/images/examples/papeleria/labels_cosmetics.example.webp',
    serviceId: 'etiquetas',
    materials: ['papel adhesivo', 'vinilo transparente'],
    dimensions: '6cm x 4cm'
  },

  // Vinilos Decorativos examples (2)
  {
    id: 'vinyl-office-branding',
    title: 'Vinilo Corporativo Oficina',
    description: 'Vinilo decorativo con branding corporativo para espacios de trabajo',
    imagePath: '/images/examples/impresion/vinyl_office.example.webp',
    serviceId: 'vinilos-decorativos',
    materials: ['vinilo adhesivo', 'vinilo esmerilado'],
    dimensions: '3m x 2m'
  },
  {
    id: 'vinyl-restaurant-window',
    title: 'Vinilo Ventana Restaurante',
    description: 'Vinilo microperforado para ventanas con menú y promociones',
    imagePath: '/images/examples/impresion/vinyl_restaurant.example.webp',
    serviceId: 'vinilos-decorativos',
    materials: ['vinilo microperforado', 'vinilo adhesivo'],
    dimensions: '2.5m x 1.8m'
  },

  // Grabado en Madera examples (2)
  {
    id: 'wood-sign-cafe',
    title: 'Letrero Café Artesanal',
    description: 'Letrero personalizado grabado en madera de roble para café',
    imagePath: '/images/examples/laser/wood_sign_cafe.example.webp',
    serviceId: 'grabado-madera',
    materials: ['madera de roble', 'madera de pino'],
    dimensions: '30cm x 20cm x 2cm'
  },
  {
    id: 'wood-wedding-sign',
    title: 'Letrero Boda Personalizado',
    description: 'Letrero rústico grabado en madera para eventos especiales',
    imagePath: '/images/examples/laser/wood_wedding.example.webp',
    serviceId: 'grabado-madera',
    materials: ['madera de pino', 'MDF'],
    dimensions: '40cm x 25cm x 2cm'
  },

  // Grabado en Metal examples (2)
  {
    id: 'metal-plaque-award',
    title: 'Placa Reconocimiento Empresarial',
    description: 'Placa conmemorativa grabada en acero inoxidable',
    imagePath: '/images/examples/laser/metal_plaque_award.example.webp',
    serviceId: 'grabado-metal',
    materials: ['acero inoxidable', 'aluminio anodizado'],
    dimensions: '25cm x 15cm x 3mm'
  },
  {
    id: 'metal-nameplate-office',
    title: 'Placa Identificación Oficina',
    description: 'Placa profesional grabada para identificación de espacios',
    imagePath: '/images/examples/laser/metal_nameplate.example.webp',
    serviceId: 'grabado-metal',
    materials: ['aluminio anodizado', 'latón'],
    dimensions: '20cm x 8cm x 2mm'
  },

  // Displays de Acrílico examples (2)
  {
    id: 'acrylic-display-shop',
    title: 'Display Acrílico Tienda',
    description: 'Display promocional cortado en acrílico transparente',
    imagePath: '/images/examples/laser/acrylic_display_shop.example.webp',
    serviceId: 'displays-acrilico',
    materials: ['acrílico transparente 5mm', 'acrílico de color'],
    dimensions: '40cm x 30cm x 5mm'
  },
  {
    id: 'acrylic-menu-holder',
    title: 'Portamenú Acrílico Restaurante',
    description: 'Elegante portamenú de acrílico para mesas de restaurante',
    imagePath: '/images/examples/laser/acrylic_menu.example.webp',
    serviceId: 'displays-acrilico',
    materials: ['acrílico transparente', 'acrílico esmerilado'],
    dimensions: '25cm x 35cm x 3mm'
  },

  // Corte en Madera examples (2)
  {
    id: 'wood-decoration-home',
    title: 'Decoración Hogar Personalizada',
    description: 'Elementos decorativos cortados en madera MDF',
    imagePath: '/images/examples/laser/wood_decoration_home.example.webp',
    serviceId: 'corte-madera',
    materials: ['MDF 6mm', 'madera contrachapada'],
    dimensions: '20cm x 20cm x 6mm'
  },
  {
    id: 'wood-puzzle-custom',
    title: 'Rompecabezas Personalizado',
    description: 'Rompecabezas cortado en madera con diseño personalizado',
    imagePath: '/images/examples/laser/wood_puzzle.example.webp',
    serviceId: 'corte-madera',
    materials: ['madera contrachapada', 'MDF'],
    dimensions: '30cm x 30cm x 4mm'
  },

  // Folletos examples (2)
  {
    id: 'trifold-corporate',
    title: 'Tríptico Corporativo Empresa',
    description: 'Tríptico informativo con diseño corporativo elegante',
    imagePath: '/images/examples/papeleria/trifold_corporate.example.webp',
    serviceId: 'folletos',
    materials: ['papel couché 150g', 'papel reciclado'],
    dimensions: '21cm x 29.7cm (desplegado)'
  },
  {
    id: 'brochure-medical',
    title: 'Folleto Servicios Médicos',
    description: 'Folleto informativo para clínica con servicios y especialidades',
    imagePath: '/images/examples/papeleria/brochure_medical.example.webp',
    serviceId: 'folletos',
    materials: ['papel couché 150g', 'papel bond'],
    dimensions: '21cm x 29.7cm (desplegado)'
  },

  // Catálogos examples (2)
  {
    id: 'catalog-products',
    title: 'Catálogo Productos Premium',
    description: 'Catálogo de productos con encuadernación profesional',
    imagePath: '/images/examples/papeleria/catalog_products.example.webp',
    serviceId: 'catalogos',
    materials: ['papel couché 120g', 'papel bond'],
    dimensions: '21cm x 21cm (16 páginas)'
  },
  {
    id: 'catalog-fashion',
    title: 'Catálogo Moda Temporada',
    description: 'Catálogo de moda con fotografías de alta calidad',
    imagePath: '/images/examples/papeleria/catalog_fashion.example.webp',
    serviceId: 'catalogos',
    materials: ['papel couché 120g', 'papel mate'],
    dimensions: '21cm x 29.7cm (24 páginas)'
  },

  // Anuncios Luminosos examples (4)
  {
    id: 'led-sign-restaurant',
    title: 'Anuncio LED Restaurante',
    description: 'Letrero luminoso estándar para restaurante con iluminación LED uniforme',
    imagePath: '/images/examples/anuncioluminosoestandar_example.webp',
    serviceId: 'anuncio-luminoso-estandar',
    materials: ['acrílico translúcido', 'aluminio', 'LED de alta eficiencia'],
    dimensions: '150cm x 60cm x 8cm'
  },
  {
    id: 'led-sign-pharmacy',
    title: 'Anuncio LED Farmacia',
    description: 'Letrero luminoso estándar para farmacia con cruz LED integrada',
    imagePath: '/images/examples/anuncioluminosoestandar_example.webp',
    serviceId: 'anuncio-luminoso-estandar',
    materials: ['acrílico translúcido', 'aluminio', 'LED de alta eficiencia'],
    dimensions: '120cm x 80cm x 10cm'
  },
  {
    id: '3d-sign-hotel',
    title: 'Letrero 3D Hotel Premium',
    description: 'Anuncio tridimensional con letras volumétricas e iluminación RGB',
    imagePath: '/images/examples/anunciotipo3d_example.webp',
    serviceId: 'anuncio-tipo-3d',
    materials: ['acrílico cortado láser', 'estructura metálica', 'LED RGB programable'],
    dimensions: '200cm x 50cm x 25cm'
  },
  {
    id: '3d-sign-corporate',
    title: 'Logo 3D Corporativo',
    description: 'Logo empresarial tridimensional con efectos de iluminación programable',
    imagePath: '/images/examples/anunciotipo3d_example.webp',
    serviceId: 'anuncio-tipo-3d',
    materials: ['acrílico cortado láser', 'estructura metálica', 'LED RGB programable'],
    dimensions: '180cm x 60cm x 20cm'
  }
];

// Service categories with individual services
export const serviceCategories: ServiceCategory[] = [
  {
    id: "corte-vinil",
    title: "Corte de Vinil",
    description: "Corte de precisión en vinil adhesivo para decoración y señalización.",
    imageName: "cortevinil",
    services: [
      {
        id: "stickers",
        title: "Stickers",
        description: "Stickers personalizados resistentes al agua en cualquier forma y tamaño.",
        categoryId: "corte-vinil",
        deliveryTime: {
          standard: "1-2 días hábiles",
          rush: "24 horas",
          notes: "Aplicación disponible con costo adicional"
        },
        specifications: {
          materials: ["vinil adhesivo", "vinil holográfico", "vinil reflectivo"],
          maxSize: "50cm x 50cm",
          minQuantity: 10,
          features: ["Resistente al agua", "Formas personalizadas", "Colores vibrantes", "Fácil aplicación"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'stickers'),
        pricing: {
          startingFrom: "Desde $5",
          unit: "por pieza"
        }
      },
      {
        id: "etiquetas",
        title: "Etiquetas",
        description: "Etiquetas adhesivas para productos, envases y identificación.",
        categoryId: "corte-vinil",
        deliveryTime: {
          standard: "2-3 días hábiles",
          rush: "24 horas"
        },
        specifications: {
          materials: ["papel adhesivo", "vinil transparente", "papel eco"],
          maxSize: "20cm x 15cm",
          minQuantity: 50,
          features: ["Adhesivo fuerte", "Información clara", "Resistente", "Troquelado personalizado"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'etiquetas'),
        pricing: {
          startingFrom: "Desde $2",
          unit: "por pieza"
        }
      },
      {
        id: "vinilos-decorativos",
        title: "Vinilos Decorativos",
        description: "Vinilos adhesivos para decoración de espacios y escaparates.",
        categoryId: "corte-vinil",
        deliveryTime: {
          standard: "2-3 días hábiles",
          rush: "48 horas"
        },
        specifications: {
          materials: ["vinil adhesivo", "vinil microperforado", "vinil esmerilado"],
          maxSize: "150cm x 50m",
          minQuantity: 1,
          features: ["Fácil aplicación", "Remoción limpia", "Diseños complejos", "Colores variados"]
        },
        examples: [],
        pricing: {
          startingFrom: "Desde $30",
          unit: "por m²"
        }
      }
    ]
  },

  {
    id: "imprenta-digital",
    title: "Imprenta Digital",
    description: "Impresiones digitales de alta calidad en diversos formatos.",
    imageName: "imprentadigital",
    services: [
      {
        id: "flyers",
        title: "Flyers",
        description: "Volantes promocionales de alta calidad para tu negocio.",
        categoryId: "imprenta-digital",
        deliveryTime: {
          standard: "2-3 días hábiles",
          rush: "24 horas"
        },
        specifications: {
          materials: ["papel couché 150g", "papel bond", "papel reciclado"],
          maxSize: "A3 (29.7cm x 42cm)",
          minQuantity: 100,
          features: ["Alta resolución", "Colores vibrantes", "Acabado mate o brillante", "Diseño incluido"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'flyers'),
        pricing: {
          startingFrom: "Desde $0.50",
          unit: "por pieza"
        }
      },
      {
        id: "tarjetas-presentacion",
        title: "Tarjetas de Presentación",
        description: "Tarjetas profesionales que causan una primera impresión memorable.",
        categoryId: "imprenta-digital",
        deliveryTime: {
          standard: "2-3 días hábiles",
          rush: "24 horas"
        },
        specifications: {
          materials: ["papel texturizado 300g", "papel couché", "papel reciclado"],
          maxSize: "9cm x 5cm",
          minQuantity: 100,
          features: ["Acabado premium", "Diseño profesional", "Durabilidad", "Impresión a doble cara"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'tarjetas-presentacion'),
        pricing: {
          startingFrom: "Desde $1",
          unit: "por pieza"
        }
      }
    ]
  },

  {
    id: "impresion-gran-formato",
    title: "Impresión Gran Formato",
    description: "Impresiones de gran tamaño para publicidad exterior e interior.",
    imageName: "granformato",
    services: [
      {
        id: "banners",
        title: "Banners",
        description: "Banners publicitarios resistentes para exterior e interior.",
        categoryId: "impresion-gran-formato",
        deliveryTime: {
          standard: "3-5 días hábiles",
          rush: "48 horas",
          notes: "Instalación disponible"
        },
        specifications: {
          materials: ["lona vinílica 440g", "mesh calado", "lona mate"],
          maxSize: "5m x 3m",
          minQuantity: 1,
          features: ["Resistente a intemperie", "Ojales reforzados", "Colores duraderos", "Impresión UV"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'banners'),
        pricing: {
          startingFrom: "Desde $200",
          unit: "por m²"
        }
      },
      {
        id: "lonas",
        title: "Lonas Publicitarias",
        description: "Lonas de gran formato para publicidad exterior de alto impacto.",
        categoryId: "impresion-gran-formato",
        deliveryTime: {
          standard: "3-5 días hábiles",
          rush: "48 horas"
        },
        specifications: {
          materials: ["lona vinílica", "mesh", "lona backlight"],
          maxSize: "10m x 3m",
          minQuantity: 1,
          features: ["Máxima durabilidad", "Colores intensos", "Resistente al viento", "Instalación profesional"]
        },
        examples: [],
        pricing: {
          startingFrom: "Desde $180",
          unit: "por m²"
        }
      }
    ]
  },

  {
    id: "cnc-laser",
    title: "CNC Láser",
    description: "Grabado y corte láser de precisión en diversos materiales.",
    imageName: "cnclaser",
    services: [
      {
        id: "grabado-madera",
        title: "Grabado en Madera",
        description: "Grabado láser personalizado en diferentes tipos de madera.",
        categoryId: "cnc-laser",
        deliveryTime: {
          standard: "2-4 días hábiles",
          rush: "24-48 horas"
        },
        specifications: {
          materials: ["madera de roble", "madera de pino", "MDF", "contrachapado"],
          maxSize: "60cm x 40cm",
          minQuantity: 1,
          features: ["Precisión micrométrica", "Grabado profundo", "Diseños complejos", "Acabado natural"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'grabado-madera'),
        pricing: {
          startingFrom: "Desde $50",
          unit: "por pieza"
        }
      },
      {
        id: "grabado-metal",
        title: "Grabado en Metal",
        description: "Grabado láser en metales para placas, trofeos y señalización.",
        categoryId: "cnc-laser",
        deliveryTime: {
          standard: "3-5 días hábiles",
          rush: "48 horas"
        },
        specifications: {
          materials: ["acero inoxidable", "aluminio anodizado", "latón", "cobre"],
          maxSize: "40cm x 30cm",
          minQuantity: 1,
          features: ["Grabado permanente", "Resistente a corrosión", "Acabado profesional", "Textos y logos"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'grabado-metal'),
        pricing: {
          startingFrom: "Desde $80",
          unit: "por pieza"
        }
      }
    ]
  },

  {
    id: "displays",
    title: "Displays",
    description: "Exhibidores y displays promocionales para puntos de venta.",
    imageName: "displays",
    services: [
      {
        id: "displays-acrilico",
        title: "Displays de Acrílico",
        description: "Exhibidores transparentes elegantes para productos y promociones.",
        categoryId: "displays",
        deliveryTime: {
          standard: "3-5 días hábiles",
          rush: "48 horas"
        },
        specifications: {
          materials: ["acrílico transparente", "acrílico de color", "acrílico esmerilado"],
          maxSize: "100cm x 200cm",
          minQuantity: 1,
          features: ["Transparencia cristalina", "Fácil limpieza", "Diseño moderno", "Ensamblaje incluido"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'displays-acrilico'),
        pricing: {
          startingFrom: "Desde $150",
          unit: "por pieza"
        }
      }
    ]
  },

  {
    id: "cnc-router",
    title: "CNC Router",
    description: "Corte y tallado CNC en madera, MDF y materiales compuestos.",
    imageName: "cncrouter",
    services: [
      {
        id: "corte-madera",
        title: "Corte en Madera",
        description: "Corte CNC de precisión en madera para decoración y mobiliario.",
        categoryId: "cnc-router",
        deliveryTime: {
          standard: "3-5 días hábiles",
          rush: "48 horas"
        },
        specifications: {
          materials: ["MDF", "madera contrachapada", "madera maciza", "OSB"],
          maxSize: "120cm x 80cm",
          minQuantity: 1,
          features: ["Cortes precisos", "Formas complejas", "Acabado lijado", "Ensamblaje disponible"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'corte-madera'),
        pricing: {
          startingFrom: "Desde $120",
          unit: "por pieza"
        }
      }
    ]
  },

  {
    id: "imprenta",
    title: "Imprenta",
    description: "Servicios de imprenta tradicional para folletos, catálogos y papelería.",
    imageName: "imprenta",
    services: [
      {
        id: "folletos",
        title: "Folletos",
        description: "Folletos informativos y promocionales con diseño profesional.",
        categoryId: "imprenta",
        deliveryTime: {
          standard: "3-5 días hábiles",
          rush: "48 horas"
        },
        specifications: {
          materials: ["papel couché 150g", "papel bond", "papel reciclado"],
          maxSize: "A3 (29.7cm x 42cm)",
          minQuantity: 100,
          features: ["Diseño incluido", "Doblado profesional", "Colores corporativos", "Acabados especiales"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'folletos'),
        pricing: {
          startingFrom: "Desde $2",
          unit: "por pieza"
        }
      },
      {
        id: "catalogos",
        title: "Catálogos",
        description: "Catálogos de productos con encuadernación profesional.",
        categoryId: "imprenta",
        deliveryTime: {
          standard: "5-7 días hábiles",
          rush: "3 días"
        },
        specifications: {
          materials: ["papel couché 120g", "papel bond", "papel mate"],
          maxSize: "A4 (21cm x 29.7cm)",
          minQuantity: 25,
          features: ["Encuadernación incluida", "Hasta 100 páginas", "Diseño profesional", "Índice incluido"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'catalogos'),
        pricing: {
          startingFrom: "Desde $15",
          unit: "por pieza"
        }
      }
    ]
  },

  // Add more categories with placeholder services for now
  {
    id: "anuncios-luminosos",
    title: "Anuncios y Luminosos",
    description: "Señalización luminosa y anuncios publicitarios con iluminación LED.",
    imageName: "anunciosluminosos",
    services: [
      {
        id: "anuncio-luminoso-estandar",
        title: "Anuncio luminoso estándar",
        description: "Anuncios luminosos con iluminación LED estándar para exteriores e interiores.",
        categoryId: "anuncios-luminosos",
        deliveryTime: {
          standard: "7-10 días hábiles",
          rush: "5 días",
          notes: "Instalación incluida"
        },
        specifications: {
          materials: ["acrílico translúcido", "aluminio", "LED de alta eficiencia"],
          maxSize: "200cm x 100cm",
          minQuantity: 1,
          features: ["Iluminación LED uniforme", "Resistente a intemperie", "Bajo consumo energético", "Instalación profesional"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'anuncio-luminoso-estandar'),
        pricing: {
          startingFrom: "Desde $800",
          unit: "por pieza"
        }
      },
      {
        id: "anuncio-tipo-3d",
        title: "Anuncio tipo 3D",
        description: "Anuncios luminosos tridimensionales con efectos visuales de profundidad.",
        categoryId: "anuncios-luminosos",
        deliveryTime: {
          standard: "10-15 días hábiles",
          rush: "7 días",
          notes: "Diseño 3D y instalación incluidos"
        },
        specifications: {
          materials: ["acrílico cortado láser", "estructura metálica", "LED RGB programable"],
          maxSize: "150cm x 80cm x 30cm",
          minQuantity: 1,
          features: ["Efecto tridimensional", "Iluminación programable", "Diseño personalizado", "Máximo impacto visual"]
        },
        examples: serviceExamples.filter(ex => ex.serviceId === 'anuncio-tipo-3d'),
        pricing: {
          startingFrom: "Desde $1,500",
          unit: "por pieza"
        }
      }
    ]
  },
  {
    id: "diseno-grafico",
    title: "Diseño Gráfico",
    description: "Servicios de diseño profesional para todas tus necesidades visuales.",
    imageName: "graphicdesign",
    services: []
  },
  {
    id: "letreros-3d",
    title: "Letreros 3D",
    description: "Letras y letreros tridimensionales con acabados premium.",
    imageName: "letreros3d",
    services: []
  },
  {
    id: "oxicorte-plasma",
    title: "Oxicorte y Plasma",
    description: "Corte industrial de metales con oxicorte y plasma.",
    imageName: "oxicorteplasma",
    services: []
  },
  {
    id: "articulos-promocionales",
    title: "Artículos Promocionales",
    description: "Productos promocionales personalizados para tu marca.",
    imageName: "promocionales",
    services: []
  },
  {
    id: "rotulacion-vehicular",
    title: "Rotulación Vehicular",
    description: "Decoración y rotulación profesional para vehículos.",
    imageName: "rotulacion",
    services: []
  },
  {
    id: "sellos",
    title: "Sellos",
    description: "Sellos personalizados automáticos y tradicionales.",
    imageName: "sellos",
    services: []
  },
  {
    id: "senaleticas",
    title: "Señaléticas",
    description: "Sistemas de señalización para espacios comerciales e industriales.",
    imageName: "signs",
    services: []
  },
  {
    id: "textiles",
    title: "Textiles",
    description: "Personalización de textiles con bordado, serigrafía y sublimación.",
    imageName: "textiles",
    services: []
  }
];

// Legacy export for backward compatibility
export const services: Service[] = serviceCategories.flatMap(category => category.services);


// Helper functions
export const getServiceImagePath = (imageName: string) => {
  return `/images/services/${imageName}.webp`;
};

export const getExampleImagePath = (imagePath: string) => {
  return imagePath;
};

export const getCategoryFallback = (categoryId: ServiceCategoryId) => {
  const fallbackMap: Record<ServiceCategoryId, string> = {
    'anuncios-luminosos': '/images/services/anunciosluminosos.webp',
    'cnc-laser': '/images/services/cnclaser.webp',
    'cnc-router': '/images/services/cncrouter.webp',
    'corte-vinil': '/images/services/cortevinil.webp',
    'displays': '/images/services/displays.webp',
    'impresion-gran-formato': '/images/services/granformato.webp',
    'diseno-grafico': '/images/services/graphicdesign.webp',
    'imprenta': '/images/services/imprenta.webp',
    'imprenta-digital': '/images/services/imprentadigital.webp',
    'letreros-3d': '/images/services/letreros3d.webp',
    'oxicorte-plasma': '/images/services/oxicorteplasma.webp',
    'articulos-promocionales': '/images/services/promocionales.webp',
    'rotulacion-vehicular': '/images/services/rotulacion.webp',
    'sellos': '/images/services/sellos.webp',
    'senaleticas': '/images/services/signs.webp',
    'textiles': '/images/services/textiles.webp'
  };
  return fallbackMap[categoryId];
};

// Helper to get category by ID
export const getCategoryById = (categoryId: ServiceCategoryId) => {
  return serviceCategories.find(cat => cat.id === categoryId);
};

// Helper to get service by ID
export const getServiceById = (serviceId: string) => {
  return services.find(service => service.id === serviceId);
};