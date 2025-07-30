import { Metadata } from 'next';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Portafolio | Artes Gráficas Digitales - Proyectos y Trabajos",
  description: "Explora nuestro portafolio de proyectos exitosos: menús digitales, sitios web, diseño gráfico y soluciones de impresión digital.",
  keywords: "portafolio, proyectos, menús digitales, sitios web, diseño gráfico, trabajos realizados, casos de éxito",
  openGraph: {
    title: "Portafolio - Artes Gráficas Digitales",
    description: "Descubre nuestros proyectos exitosos y casos de éxito en diseño gráfico y soluciones digitales.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes Gráficas Digitales",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio - Artes Gráficas Digitales",
    description: "Proyectos exitosos en diseño gráfico, menús digitales y soluciones de impresión.",
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
          { name: "Portafolio", url: "https://artesgraficasdigitales.com/portafolio" }
        ]}
      />
      {children}
    </>
  );
}