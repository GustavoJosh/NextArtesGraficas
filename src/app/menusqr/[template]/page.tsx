import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface MenuQRPageProps {
  params: Promise<{
    template: string;
  }>;
}

// Define available templates
const availableTemplates = ['elegante', 'minimalista', 'neon', 'oceano'];

export async function generateStaticParams() {
  return availableTemplates.map((template) => ({
    template,
  }));
}

export default async function MenuQRPage({ params }: MenuQRPageProps) {
  const { template } = await params;

  // Check if template exists
  if (!availableTemplates.includes(template)) {
    notFound();
  }

  const templateNames = {
    elegante: 'Elegante',
    minimalista: 'Minimalista', 
    neon: 'Neón',
    oceano: 'Océano'
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              href="/links" 
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a Enlaces
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">
              Plantilla {templateNames[template as keyof typeof templateNames]}
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Template iframe */}
      <div className="h-[calc(100vh-80px)]">
        <iframe
          src={`/menusqr/${template}/index.html`}
          className="w-full h-full border-0"
          title={`Plantilla ${templateNames[template as keyof typeof templateNames]}`}
        />
      </div>
    </div>
  );
}