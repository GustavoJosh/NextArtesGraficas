'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mx-auto max-w-md">
              <div className="text-6xl font-bold text-red-300 mb-4">⚠️</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Algo salió mal
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
              </p>
              <div className="space-y-4">
                <button
                  onClick={reset}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-4"
                >
                  Intentar nuevamente
                </button>
                <Link
                  href="/"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Volver al inicio
                </Link>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-8 text-left bg-gray-100 p-4 rounded-lg">
                  <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                    Detalles del error (solo en desarrollo)
                  </summary>
                  <pre className="text-sm text-gray-600 overflow-auto">
                    {error.message}
                    {error.stack && (
                      <>
                        {'\n\n'}
                        {error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}