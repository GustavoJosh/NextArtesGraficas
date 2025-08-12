// src/app/servicios/page.tsx
"use client"; // Para poder usar estado y manejar los filtros

import { useState } from 'react';
import { services, type Service } from '@/data/services';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Header } from '@/components/layout/Header';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

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
  // Estado para controlar la visibilidad de filtros en mobile
  const [showFilters, setShowFilters] = useState(false);

  // Filtramos los servicios según el estado
  const filteredServices = activeFilter === 'all'
    ? services
    : services.filter(service => service.category === activeFilter);

  // Función para manejar la expansión de tarjetas (opcional para futuras mejoras)
  const handleCardExpand = (isExpanded: boolean, serviceTitle: string) => {
    // Aquí podrías agregar lógica adicional si necesitas trackear qué tarjetas están expandidas
    // Por ejemplo, para analytics o para cerrar otras tarjetas cuando una se expande
  };

  // Función para manejar el cambio de filtro y cerrar el panel en mobile
  const handleFilterChange = (filterKey: CategoryKey) => {
    setActiveFilter(filterKey);
    setShowFilters(false); // Cerrar filtros en mobile después de seleccionar
  };

  // Breadcrumb items for navigation
  const breadcrumbItems = [
    { name: 'Imprenta' }
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
              Servicios de Imprenta
            </h1>
            <p className="text-gray-400 mt-2">
              Encuentra la solución perfecta para tu proyecto.
            </p>
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full min-h-[44px] p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors touch-manipulation"
            >
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-white font-medium">
                  {categories.find(c => c.key === activeFilter)?.name || 'Filtrar servicios'}
                </span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                  {filteredServices.length}
                </span>
              </div>
              {showFilters ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            
            {/* Mobile Filter Panel */}
            {showFilters && (
              <div className="mt-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <ul className="space-y-2">
                  {categories.map(category => {
                    const categoryServices = category.key === 'all' 
                      ? services 
                      : services.filter(service => service.category === category.key);
                    const serviceCount = categoryServices.length;
                    
                    return (
                      <li key={category.key}>
                        <button
                          onClick={() => handleFilterChange(category.key)}
                          className={`w-full text-left min-h-[44px] p-3 rounded-md transition-colors text-gray-300 hover:bg-gray-800 touch-manipulation ${activeFilter === category.key ? 'bg-cyan-600/20 text-cyan-200 font-semibold border border-cyan-500/30' : 'border border-transparent'}`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category.name}</span>
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                              {serviceCount}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* --- Layout de 2 columnas: Filtro + Grid --- */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            
            {/* Columna de Filtros (Sidebar) - Hidden on mobile */}
            <aside className="hidden lg:block">
              <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Filtrar por categoría</h2>
              <ul className="space-y-2">
                {categories.map(category => {
                  const categoryServices = category.key === 'all' 
                    ? services 
                    : services.filter(service => service.category === category.key);
                  const serviceCount = categoryServices.length;
                  
                  return (
                    <li key={category.key}>
                      <button
                        onClick={() => setActiveFilter(category.key)}
                        className={`w-full text-left min-h-[44px] p-3 rounded-md transition-colors text-gray-300 hover:bg-gray-800 touch-manipulation ${activeFilter === category.key ? 'bg-cyan-600/20 text-cyan-200 font-semibold border border-cyan-500/30' : 'border border-transparent'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                            {serviceCount}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
              
              {/* Filter Summary */}
              <div className="mt-6 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400">
                  Mostrando <span className="text-white font-semibold">{filteredServices.length}</span> servicio{filteredServices.length !== 1 ? 's' : ''}
                  {activeFilter !== 'all' && (
                    <span> en <span className="text-cyan-200">{categories.find(c => c.key === activeFilter)?.name}</span></span>
                  )}
                </p>
              </div>
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
                    imageName={service.imageName}
                    deliveryTime={service.deliveryTime}
                    examples={service.examples}
                    specifications={service.specifications}
                    pricing={service.pricing}
                    onExpand={(isExpanded) => handleCardExpand(isExpanded, service.title)}
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