// src/app/page.tsx
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { TestimonialsPreview } from "@/components/sections/TestimonialsPreview";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { Footer } from "@/components/layout/Footer";
import { GallerySection } from "@/components/sections/GallerySection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Artes Gráficas Digitales | Impresión, Láser y Soluciones Digitales",
  description: "Servicios profesionales de impresión digital, corte láser, diseño gráfico y soluciones digitales. Menús para restaurantes, páginas web y más. Calidad garantizada.",
  keywords: "impresión digital, corte láser, grabado láser, diseño gráfico, menús digitales, páginas web, lonas publicitarias, papelería comercial",
  authors: [{ name: "Artes Gráficas Digitales" }],
  openGraph: {
    title: "Artes Gráficas Digitales - Soluciones Profesionales de Impresión",
    description: "Transformamos tus ideas en realidad con servicios de impresión digital, corte láser y soluciones digitales innovadoras.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes Gráficas Digitales",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artes Gráficas Digitales - Soluciones Profesionales",
    description: "Servicios profesionales de impresión digital, corte láser y diseño gráfico.",
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
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16"> {/* Add padding-top to account for fixed header */}
        <section id="hero">
          <HeroSection />
        </section>
        
        {/* Preview sections with navigation links to dedicated pages */}
        <section id="servicios-preview">
          <ServicesPreview />
        </section>
        
        <section id="portafolio-preview">
          <PortfolioPreview />
        </section>
        
        <section id="testimonios-preview">
          <TestimonialsPreview />
        </section>
        
        <section id="contacto-preview">
          <ContactPreview />
        </section>
        
        <GallerySection />
        
        <Footer />
      </main>
    </>
  );
}