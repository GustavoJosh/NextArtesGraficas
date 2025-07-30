// src/app/testimonios/page.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TestimonialsContent } from './TestimonialsContent';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Testimonios | Artes Gráficas Digitales - Reseñas de Clientes",
  description: "Descubre lo que nuestros clientes dicen sobre nuestros servicios de impresión digital, corte láser y soluciones gráficas profesionales.",
  keywords: "testimonios, reseñas, clientes satisfechos, impresión digital, corte láser, diseño gráfico, opiniones, experiencias",
  openGraph: {
    title: "Testimonios - Artes Gráficas Digitales",
    description: "Lee las experiencias de nuestros clientes satisfechos con nuestros servicios profesionales.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes Gráficas Digitales",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonios - Artes Gráficas Digitales",
    description: "Experiencias reales de nuestros clientes satisfechos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TestimoniosPage() {
  return (
    <>
      <BreadcrumbStructuredData 
        items={[
          { name: "Inicio", url: "https://artesgraficasdigitales.com" },
          { name: "Testimonios", url: "https://artesgraficasdigitales.com/testimonios" }
        ]}
      />
      <Header />
      <main className="pt-16 min-h-screen bg-gray-950">
        <TestimonialsContent />
      </main>
      <Footer />
    </>
  );
}