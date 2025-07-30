// src/app/contacto/page.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactContent } from './ContactContent';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contacto | Artes Gráficas Digitales - Solicita tu Presupuesto",
  description: "Ponte en contacto con nosotros para tus proyectos de impresión digital, corte láser y diseño gráfico. Estamos listos para ayudarte.",
  keywords: "contacto, impresión digital, corte láser, diseño gráfico, presupuesto, consulta, cotización",
  openGraph: {
    title: "Contacto - Artes Gráficas Digitales",
    description: "Contáctanos para darle vida a tu marca con nuestros servicios profesionales.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes Gráficas Digitales",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Artes Gráficas Digitales",
    description: "Solicita tu presupuesto para proyectos de impresión y diseño gráfico.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbStructuredData 
        items={[
          { name: "Inicio", url: "https://artesgraficasdigitales.com" },
          { name: "Contacto", url: "https://artesgraficasdigitales.com/contacto" }
        ]}
      />
      <Header />
      <main className="pt-16 min-h-screen bg-gray-950">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}