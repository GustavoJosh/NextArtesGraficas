import { Metadata } from 'next';
import LinksPageContent from '@/components/LinksPageContent';

export const metadata: Metadata = {
  title: 'Enlaces Rápidos - Artes Gráficas',
  description: 'Acceso rápido a nuestros servicios y plantillas de menú QR',
  robots: 'noindex, nofollow', // This makes it not accessible from search engines
};

export default function LinksPage() {
  return <LinksPageContent />;
}