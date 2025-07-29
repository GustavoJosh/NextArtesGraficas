import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artes Gráficas Digitales | Impresión, Láser y Soluciones Digitales",
  description: "Servicios profesionales de impresión digital, corte láser, diseño gráfico y soluciones digitales. Menús para restaurantes, páginas web y más. Calidad garantizada.",
  keywords: "impresión digital, corte láser, grabado láser, diseño gráfico, menús digitales, páginas web, lonas publicitarias, papelería comercial",
  authors: [{ name: "Artes Gráficas Digitales" }],
  openGraph: {
    title: "Artes Gráficas Digitales - Soluciones Profesionales de Impresión",
    description: "Transformamos tus ideas en realidad con servicios de impresión digital, corte láser y soluciones digitales innovadoras.",
    type: "website",
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
        {children}
     
      </body>
    </html>
  );
}
