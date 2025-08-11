import { Metadata } from 'next';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Servicios Digitales | Artes Gráficas Digitales - Proyectos y Trabajos",
  description: "Explora nuestros servicios digitales: menús digitales, sitios web, diseño gráfico y soluciones digitales innovadoras.",
  keywords: "servicios digitales, proyectos, menús digitales, sitios web, diseño gráfico, trabajos realizados, casos de éxito",
  openGraph: {
    title: "Servicios Digitales - Artes Gráficas Digitales",
    description: "Descubre nuestros servicios digitales y casos de éxito en diseño gráfico y soluciones digitales.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes Gráficas Digitales",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios Digitales - Artes Gráficas Digitales",
    description: "Servicios digitales: menús digitales, sitios web y soluciones de diseño gráfico.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PortafolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData 
        items={[
          { name: "Inicio", url: "https://artesgraficasdigitales.com" },
          { name: "Servicios digitales", url: "https://artesgraficasdigitales.com/portafolio" }
        ]}
      />
      {children}
    </>
  );
}