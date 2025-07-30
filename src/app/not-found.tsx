import Link from 'next/link';
import { Header } from '@/components/layout/Header';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mx-auto max-w-md">
              <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Página no encontrada
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Lo sentimos, la página que buscas no existe o ha sido movida.
              </p>
              <div className="space-y-4">
                <Link
                  href="/"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Volver al inicio
                </Link>
                <div className="text-sm text-gray-500">
                  <p>O navega a una de estas páginas:</p>
                  <div className="mt-2 space-x-4">
                    <Link href="/servicios" className="text-blue-600 hover:text-blue-800 underline">
                      Servicios
                    </Link>
                    <Link href="/portafolio" className="text-blue-600 hover:text-blue-800 underline">
                      Portafolio
                    </Link>
                    <Link href="/testimonios" className="text-blue-600 hover:text-blue-800 underline">
                      Testimonios
                    </Link>
                    <Link href="/contacto" className="text-blue-600 hover:text-blue-800 underline">
                      Contacto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}