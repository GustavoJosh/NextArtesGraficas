// src/app/testimonios/page.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TestimonialsContent } from './TestimonialsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Testimonios | Artes Gráficas Digitales",
  description: "Descubre lo que nuestros clientes dicen sobre nuestros servicios de impresión digital, corte láser y soluciones gráficas profesionales.",
  keywords: "testimonios, reseñas, clientes satisfechos, impresión digital, corte láser, diseño gráfico",
  openGraph: {
    title: "Testimonios - Artes Gráficas Digitales",
    description: "Lee las experiencias de nuestros clientes satisfechos con nuestros servicios profesionales.",
    type: "website",
  },
};

export default function TestimoniosPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-950">
        <TestimonialsContent />
      </main>
      <Footer />
    </>
  );
}