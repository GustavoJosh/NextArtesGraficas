// src/app/servicios/page.tsx
"use client"; // Para poder usar estado y manejar los filtros

import { useState } from 'react';
import { services } from '@/data/services';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Header } from '@/components/layout/Header';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

// Definimos los tipos de categorías que usaremos para el filtro
type CategoryKey = 'all' | 'impresion' | 'laser' | 'papeleria';

const categories: { key: CategoryKey, name: string }[] = [
    { key: 'all', name: 'Todos los Servicios'},
    { key: 'impresion', name: 'Impresión y Gran Formato'},
    { key: 'laser', name: 'Corte y Grabado Láser'},
    { key: 'papeleria', name: 'Papelería y Stickers'},
];

export default function ServiciosPage() {
  // Estado para guardar el filtro activo
  const [activeFilter, setActiveFilter] = useState<CategoryKey>('all');

  // Filtramos los servicios según el estado
  const filteredServices = activeFilter === 'all'
    ? services
    : services.filter(service => service.category === activeFilter);

  // Breadcrumb items for navigation
  const breadcrumbItems = [
    { name: 'Servicios' }
  ];

  return (
    <>
      {/* Header component for consistent navigation */}
      <Header />
      
      <main className="bg-gray-950 min-h-screen text-white pt-16">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          {/* Encabezado */}
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              Catálogo de Servicios
            </h1>
            <p className="text-gray-400 mt-2">
              Encuentra la solución perfecta para tu proyecto.
            </p>
          </div>

          {/* --- Layout de 2 columnas: Filtro + Grid --- */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            
            {/* Columna de Filtros (Sidebar) */}
            <aside>
              <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Filtrar por categoría</h2>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.key}>
                    <button
                      onClick={() => setActiveFilter(category.key)}
                      className={`w-full text-left p-2 rounded-md transition-colors text-gray-300 hover:bg-gray-800 ${activeFilter === category.key ? 'bg-blue-600/20 text-blue-300 font-semibold' : ''}`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Columna de Contenido (Grid de Servicios) */}
            <section>
              {/* Hacemos la cuadrícula más densa con más columnas en pantallas grandes */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    category={service.category}
                  />
                ))}
              </div>
              {filteredServices.length === 0 && (
                  <div className="text-center py-16 text-gray-500">
                      <p>No se encontraron servicios en esta categoría.</p>
                  </div>
              )}
            </section>

          </div>
        </div>
      </main>
    </>
  );
}