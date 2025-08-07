import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Alumni_Sans_Pinstripe, Contrail_One } from "next/font/google";
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

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const alumniSansPinstripe = Alumni_Sans_Pinstripe({
  variable: "--font-alumni-sans-pinstripe",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const contrailOne = Contrail_One({
  variable: "--font-contrail-one",
  subsets: ["latin"],
  weight: "400",
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
    images: [
      {
        url: "https://artesgraficasdigitales.com/images/logos/banner.png",
        width: 1200,
        height: 630,
        alt: "Artes Gráficas Digitales - Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artes Gráficas Digitales - Soluciones Profesionales",
    description: "Servicios profesionales de impresión digital, corte láser y diseño gráfico.",
    creator: "@artesgraficasdigitales",
    images: ["https://artesgraficasdigitales.com/images/logos/banner.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${alumniSansPinstripe.variable} ${contrailOne.variable} antialiased`}
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
