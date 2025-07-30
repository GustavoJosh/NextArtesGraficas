import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BusinessStructuredData, WebsiteStructuredData } from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Artes Gráficas Digitales | Impresión, Láser y Soluciones Digitales",
    template: "%s | Artes Gráficas Digitales"
  },
  description: "Servicios profesionales de impresión digital, corte láser, diseño gráfico y soluciones digitales. Menús para restaurantes, páginas web y más. Calidad garantizada.",
  keywords: "impresión digital, corte láser, grabado láser, diseño gráfico, menús digitales, páginas web, lonas publicitarias, papelería comercial",
  authors: [{ name: "Artes Gráficas Digitales" }],
  creator: "Artes Gráficas Digitales",
  publisher: "Artes Gráficas Digitales",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Artes Gráficas Digitales - Soluciones Profesionales de Impresión",
    description: "Transformamos tus ideas en realidad con servicios de impresión digital, corte láser y soluciones digitales innovadoras.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes Gráficas Digitales",
    url: "https://artesgraficasdigitales.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artes Gráficas Digitales - Soluciones Profesionales",
    description: "Servicios profesionales de impresión digital, corte láser y diseño gráfico.",
    creator: "@artesgraficasdigitales",
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BusinessStructuredData />
        <WebsiteStructuredData 
          url="https://artesgraficasdigitales.com"
          name="Artes Gráficas Digitales"
          description="Servicios profesionales de impresión digital, corte láser, diseño gráfico y soluciones digitales"
        />
        {children}
      </body>
    </html>
  );
}
