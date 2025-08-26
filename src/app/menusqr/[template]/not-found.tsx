import Link from 'next/link';
import { FileX, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <FileX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Plantilla no encontrada
        </h1>
        <p className="text-gray-600 mb-6">
          La plantilla que buscas no existe o no está disponible.
        </p>
        
        <Link
          href="/links"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Enlaces
        </Link>
      </div>
    </div>
  );
}