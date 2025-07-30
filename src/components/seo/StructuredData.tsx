// src/components/seo/StructuredData.tsx
import Script from 'next/script';

interface BusinessStructuredDataProps {
  type?: 'Organization' | 'LocalBusiness';
}

export function BusinessStructuredData({ type = 'LocalBusiness' }: BusinessStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "Artes Gráficas Digitales",
    "description": "Servicios profesionales de impresión digital, corte láser, diseño gráfico y soluciones digitales",
    "url": "https://artesgraficasdigitales.com",
    "logo": "https://artesgraficasdigitales.com/images/logos/banner.png",
    "image": "https://artesgraficasdigitales.com/images/logos/banner.png",
    "telephone": "+1-234-567-8900",
    "email": "info@artesgraficasdigitales.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Principal 123",
      "addressLocality": "Ciudad",
      "addressRegion": "Estado",
      "postalCode": "12345",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.4326",
      "longitude": "-99.1332"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-14:00"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "MXN",
    "areaServed": {
      "@type": "Country",
      "name": "Mexico"
    },
    "serviceType": [
      "Impresión Digital",
      "Corte Láser",
      "Grabado Láser",
      "Diseño Gráfico",
      "Menús Digitales",
      "Páginas Web",
      "Papelería Comercial"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Artes Gráficas",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Impresión Digital",
            "description": "Servicios de impresión digital de alta calidad"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corte y Grabado Láser",
            "description": "Corte y grabado láser de precisión en diversos materiales"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Diseño Gráfico",
            "description": "Servicios profesionales de diseño gráfico y branding"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Menús Digitales",
            "description": "Creación de menús digitales interactivos para restaurantes"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/artesgraficasdigitales",
      "https://www.instagram.com/artesgraficasdigitales",
      "https://www.linkedin.com/company/artesgraficasdigitales"
    ]
  };

  return (
    <Script
      id="business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface WebsiteStructuredDataProps {
  url: string;
  name: string;
  description: string;
}

export function WebsiteStructuredData({ url, name, description }: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Artes Gráficas Digitales",
      "logo": {
        "@type": "ImageObject",
        "url": "https://artesgraficasdigitales.com/images/logos/banner.png"
      }
    }
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface ServiceStructuredDataProps {
  services: Array<{
    name: string;
    description: string;
    category: string;
  }>;
}

export function ServiceStructuredData({ services }: ServiceStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Servicios de Artes Gráficas Digitales",
    "description": "Lista completa de servicios profesionales de impresión digital, corte láser y diseño gráfico",
    "numberOfItems": services.length,
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "category": service.category,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Artes Gráficas Digitales"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Mexico"
        }
      }
    }))
  };

  return (
    <Script
      id="service-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

interface PortfolioStructuredDataProps {
  projects: Array<{
    title: string;
    description: string;
    url?: string;
    image?: string;
    technologies?: string[];
    client?: string;
  }>;
}

export function PortfolioStructuredData({ projects }: PortfolioStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Portafolio de Proyectos - Artes Gráficas Digitales",
    "description": "Proyectos exitosos realizados por Artes Gráficas Digitales",
    "numberOfItems": projects.length,
    "itemListElement": projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description,
        "url": project.url,
        "image": project.image,
        "creator": {
          "@type": "Organization",
          "name": "Artes Gráficas Digitales"
        },
        "keywords": project.technologies?.join(", "),
        "client": project.client
      }
    }))
  };

  return (
    <Script
      id="portfolio-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}