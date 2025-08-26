'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Servicios Web page error:', error);
  }, [error]);

  // Breadcrumb items for navigation
  const breadcrumbItems = [
    { name: 'Servicios Web' }
  ];

  return (
    <>
      <Header />
      
      <main className="bg-gray-950 min-h-screen text-white pt-16">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          {/* Error Content */}
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">
                Algo salió mal
              </h1>
              
              <p className="text-gray-400 mb-8">
                Ocurrió un error al cargar la página de servicios web. 
                Por favor, intenta nuevamente.
              </p>
              
              <button
                onClick={reset}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Intentar nuevamente</span>
              </button>
              
              <div className="mt-8 text-sm text-gray-500">
                <p>Si el problema persiste, por favor contacta con soporte.</p>
                {error.digest && (
                  <p className="mt-2">Error ID: {error.digest}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}