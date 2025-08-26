import { Metadata } from 'next';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Servicios Web | Artes Gráficas Digitales - Menús QR, Páginas Web y Soluciones Digitales",
  description: "Descubre nuestros servicios web profesionales: menús QR interactivos, páginas web modernas, tarjetas digitales y soluciones personalizadas para tu negocio.",
  keywords: "servicios web, menús QR, páginas web, tarjetas digitales, aplicaciones web, desarrollo web, menús digitales, sitios web responsivos, soluciones digitales",
  openGraph: {
    title: "Servicios Web Profesionales - Artes Gráficas Digitales",
    description: "Servicios web completos: menús QR interactivos, páginas web modernas y soluciones digitales personalizadas para impulsar tu negocio.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes Gráficas Digitales",
    url: "https://artesgraficasdigitales.com/servicios-web",
    images: [
      {
        url: "https://artesgraficasdigitales.com/images/logos/banner.png",
        width: 1200,
        height: 630,
        alt: "Servicios Web - Artes Gráficas Digitales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios Web - Artes Gráficas Digitales",
    description: "Servicios web profesionales: menús QR, páginas web modernas y soluciones digitales personalizadas.",
    creator: "@artesgraficasdigitales",
    images: ["https://artesgraficasdigitales.com/images/logos/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://artesgraficasdigitales.com/servicios-web",
  },
};

export default function ServiciosWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData 
        items={[
          { name: "Inicio", url: "https://artesgraficasdigitales.com" },
          { name: "Servicios Web", url: "https://artesgraficasdigitales.com/servicios-web" }
        ]}
      />
      {children}
    </>
  );
}