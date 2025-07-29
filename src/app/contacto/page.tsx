// src/app/contacto/page.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactContent } from './ContactContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contacto | Artes Gráficas Digitales",
  description: "Ponte en contacto con nosotros para tus proyectos de impresión digital, corte láser y diseño gráfico. Estamos listos para ayudarte.",
  keywords: "contacto, impresión digital, corte láser, diseño gráfico, presupuesto, consulta",
  openGraph: {
    title: "Contacto - Artes Gráficas Digitales",
    description: "Contáctanos para darle vida a tu marca con nuestros servicios profesionales.",
    type: "website",
  },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-950">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}