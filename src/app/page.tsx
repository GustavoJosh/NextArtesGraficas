// src/app/page.tsx
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { TestimonialsPreview } from "@/components/sections/TestimonialsPreview";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { Footer } from "@/components/layout/Footer";
import CircularGallery from "@/components/ui/CircularGallery";
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
        
        <section id="gallery-section" className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0E345A] mb-4">
                Nuestros Socios
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Empresas que confían en nuestros servicios
              </p>
            </div>
            <div className="h-96">
              <CircularGallery 
                bend={2}
                textColor="#0E345A"
                borderRadius={0.1}
                font="bold 24px sans-serif"
                scrollSpeed={1.5}
                scrollEase={0.08}
              />
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </>
  );
}