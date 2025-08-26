"use client";

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FilterBar } from './FilterBar';
import { ServiceGrid } from './ServiceGrid';
import { ServiceModal } from './ServiceModal';
import { ConversionCTA } from './ConversionCTA';
import { TrustIndicators } from './TrustIndicators';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ProgressiveDisclosure } from '@/components/ui/ProgressiveDisclosure';
import { CatalogErrorBoundary, ServiceModalErrorBoundary } from './ErrorBoundaries';
import { LazyWrapper } from '@/components/ui/LazyWrapper';
import { DataFallback } from '@/components/ui/FallbackContent';
import { sampleWebServices, webServiceCategories } from '@/data/webServices';
import type { WebService } from '@/data/webServices';

interface WebServicesCatalogProps {
  onRequestQuote?: (service: WebService) => void;
  onContactClick?: (method: 'phone' | 'email' | 'whatsapp' | 'form') => void;
  className?: string;
}

export function WebServicesCatalog({ 
  onRequestQuote,
  onContactClick,
  className = ""
}: WebServicesCatalogProps) {
  // Filter state management
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal state management
  const [selectedService, setSelectedService] = useState<WebService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Service filtering logic with error handling
  const filteredServices = useMemo(() => {
    try {
      if (!sampleWebServices || !Array.isArray(sampleWebServices)) {
        return [];
      }

      let filtered = sampleWebServices.filter(service => service && service.id);

      // Apply category filters
      if (activeFilters.length > 0) {
        filtered = filtered.filter(service => 
          service.category && activeFilters.includes(service.category.id)
        );
      }

      // Apply search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(service => {
          const title = service.title?.toLowerCase() || '';
          const description = service.description?.toLowerCase() || '';
          const features = service.features?.join(' ').toLowerCase() || '';
          const technologies = service.technologies?.join(' ').toLowerCase() || '';
          const categoryName = service.category?.name?.toLowerCase() || '';

          return title.includes(query) ||
                 description.includes(query) ||
                 features.includes(query) ||
                 technologies.includes(query) ||
                 categoryName.includes(query);
        });
      }

      return filtered;
    } catch (error) {
      console.error('Error filtering services:', error);
      return [];
    }
  }, [activeFilters, searchQuery]);

  // Event handlers
  const handleViewDetails = useCallback((service: WebService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  }, []);

  const handleRequestQuote = useCallback((service: WebService) => {
    if (onRequestQuote) {
      onRequestQuote(service);
    } else {
      // Default behavior - show alert and suggest contact
      console.log('Request quote for:', service.title);
      alert(`Solicitud de cotización para: ${service.title}\n\nSerás redirigido al formulario de contacto.`);
    }
  }, [onRequestQuote]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedService(null);
  }, []);

  const handleFilterChange = useCallback((filters: string[]) => {
    // Show loading state during filter application
    setIsLoading(true);
    
    // Simulate async filter processing for better UX
    setTimeout(() => {
      setActiveFilters(filters);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    // Show loading state during search
    setIsLoading(true);
    
    // Simulate async search processing for better UX
    setTimeout(() => {
      setSearchQuery(query);
      setIsLoading(false);
    }, 200);
  }, []);

  // Disable error boundaries in test environment
  const ErrorBoundaryComponent = process.env.NODE_ENV === 'test' ? 
    ({ children }: { children: React.ReactNode }) => <>{children}</> : 
    CatalogErrorBoundary;

  return (
    <ErrorBoundaryComponent>
      <div className={`web-services-catalog ${className}`}>
      {/* Filter Bar with Animation */}
      <AnimatedSection 
        animation="fadeUp"
        threshold={0.2}
        className="sticky top-16 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50"
      >
        <FilterBar
          categories={webServiceCategories}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          totalServices={sampleWebServices.length}
          filteredCount={filteredServices.length}
        />
      </AnimatedSection>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Service Grid with Scroll Animations */}
        <AnimatedSection 
          animation="fadeIn"
          threshold={0.1}
          rootMargin="0px 0px -100px 0px"
        >
          <ServiceGrid
            services={filteredServices}
            onViewDetails={handleViewDetails}
            onRequestQuote={handleRequestQuote}
            searchQuery={searchQuery}
            activeFilters={activeFilters}
            isLoading={isLoading}
          />
        </AnimatedSection>

        {/* Results Summary with Animation */}
        {filteredServices.length > 0 && (activeFilters.length > 0 || searchQuery) && (
          <AnimatedSection 
            className="mt-12 text-center"
            animation="fadeUp"
            threshold={0.5}
          >
            <p className="text-gray-400">
              Mostrando {filteredServices.length} de {sampleWebServices.length} servicios
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </AnimatedSection>
        )}

        {/* Mid-Catalog CTA - Show after user has browsed services */}
        {filteredServices.length > 0 && (
          <LazyWrapper fallback={<div className="h-32 bg-gray-800/30 rounded-xl animate-pulse" />}>
            <AnimatedSection 
              className="mt-16"
              animation="fadeUp"
              threshold={0.2}
            >
              <ConversionCTA 
                variant="secondary"
                showUrgency={false}
                onContactClick={onContactClick}
                className="max-w-4xl mx-auto"
              />
            </AnimatedSection>
          </LazyWrapper>
        )}

        {/* No Results State with Animation */}
        {!isLoading && filteredServices.length === 0 && (activeFilters.length > 0 || searchQuery) && (
          <AnimatedSection 
            className="text-center py-16"
            animation="scale"
            threshold={0.3}
          >
            <div className="max-w-md mx-auto">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                🔍
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No se encontraron servicios
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery 
                  ? `No hay servicios que coincidan con "${searchQuery}"`
                  : "No hay servicios que coincidan con los filtros seleccionados"
                }
              </p>
              <motion.button
                onClick={() => {
                  setActiveFilters([]);
                  setSearchQuery('');
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Limpiar filtros
              </motion.button>
            </div>
          </AnimatedSection>
        )}

        {/* Trust Indicators Section */}
        <LazyWrapper fallback={<div className="h-48 bg-gray-800/30 rounded-xl animate-pulse" />}>
          <AnimatedSection 
            className="mt-16"
            animation="fadeUp"
            threshold={0.2}
          >
            <TrustIndicators 
              showTestimonials={true}
              showStats={true}
              showBadges={true}
              variant="default"
            />
          </AnimatedSection>
        </LazyWrapper>

        {/* Progressive Disclosure Section for Additional Info */}
        <AnimatedSection 
          className="mt-16"
          animation="fadeUp"
          threshold={0.2}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <ProgressiveDisclosure
              title="¿Por qué elegir nuestros servicios web?"
              defaultOpen={false}
              icon={<div className="w-3 h-3 bg-blue-400 rounded-full" />}
            >
              <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-3">Tecnología Moderna</h4>
                  <p className="text-sm leading-relaxed">
                    Utilizamos las últimas tecnologías web como React, Next.js y Tailwind CSS 
                    para crear experiencias rápidas y modernas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Diseño Responsivo</h4>
                  <p className="text-sm leading-relaxed">
                    Todos nuestros servicios están optimizados para funcionar perfectamente 
                    en dispositivos móviles, tablets y computadoras.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Soporte Continuo</h4>
                  <p className="text-sm leading-relaxed">
                    Ofrecemos soporte técnico continuo y actualizaciones para mantener 
                    tu servicio funcionando de manera óptima.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Entrega Rápida</h4>
                  <p className="text-sm leading-relaxed">
                    Nuestro proceso optimizado nos permite entregar proyectos de alta calidad 
                    en tiempos récord sin comprometer la calidad.
                  </p>
                </div>
              </div>
            </ProgressiveDisclosure>

            <ProgressiveDisclosure
              title="Proceso de desarrollo"
              defaultOpen={false}
              icon={<div className="w-3 h-3 bg-green-400 rounded-sm rotate-45" />}
            >
              <div className="space-y-4">
                {[
                  { step: "1", title: "Consulta inicial", description: "Analizamos tus necesidades y objetivos" },
                  { step: "2", title: "Propuesta y diseño", description: "Creamos una propuesta personalizada con mockups" },
                  { step: "3", title: "Desarrollo", description: "Construimos tu servicio con las mejores prácticas" },
                  { step: "4", title: "Pruebas y lanzamiento", description: "Probamos exhaustivamente antes del lanzamiento" },
                  { step: "5", title: "Soporte continuo", description: "Mantenimiento y actualizaciones regulares" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-700/20 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">{item.title}</h5>
                      <p className="text-sm text-gray-300">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ProgressiveDisclosure>
          </div>
        </AnimatedSection>

        {/* Final Conversion CTA */}
        <LazyWrapper fallback={<div className="h-64 bg-gray-800/30 rounded-xl animate-pulse" />}>
          <AnimatedSection 
            className="mt-16"
            animation="fadeUp"
            threshold={0.2}
          >
            <ConversionCTA 
              variant="primary"
              showUrgency={true}
              showQuickForm={true}
              onContactClick={onContactClick}
            />
          </AnimatedSection>
        </LazyWrapper>
      </div>

      {/* Service Modal */}
      <ServiceModalErrorBoundary>
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onRequestQuote={handleRequestQuote}
        />
      </ServiceModalErrorBoundary>
    </div>
    </ErrorBoundaryComponent>
  );
}