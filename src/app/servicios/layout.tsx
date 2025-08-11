import { Metadata } from 'next';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Imprenta | Artes Gráficas Digitales - Impresión y Corte Láser",
  description: "Descubre nuestros servicios de imprenta profesional: impresión digital, gran formato, corte y grabado láser, papelería comercial y stickers personalizados.",
  keywords: "imprenta, servicios impresión, corte láser, grabado láser, gran formato, lonas publicitarias, papelería comercial, stickers, diseño gráfico",
  openGraph: {
    title: "Imprenta Profesional - Artes Gráficas Digitales",
    description: "Servicios completos de imprenta digital, corte láser y soluciones gráficas para tu negocio.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes Gráficas Digitales",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imprenta - Artes Gráficas Digitales",
    description: "Servicios profesionales de imprenta digital, corte láser y diseño gráfico.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData 
        items={[
          { name: "Inicio", url: "https://artesgraficasdigitales.com" },
          { name: "Imprenta", url: "https://artesgraficasdigitales.com/servicios" }
        ]}
      />
      {children}
    </>
  );
}