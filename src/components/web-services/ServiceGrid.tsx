"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles } from 'lucide-react';
import { WebServiceCard } from './WebServiceCard';
import { AnimatedCard } from '@/components/ui/AnimatedSection';
import { SkeletonLoader, ServiceCardSkeleton } from '@/components/ui/SkeletonLoader';
import { ServiceGridErrorBoundary } from './ErrorBoundaries';
import { DataFallback } from '@/components/ui/FallbackContent';
import type { WebService } from '@/data/webServices';

interface ServiceGridProps {
  services: WebService[];
  onViewDetails: (service: WebService) => void;
  onRequestQuote: (service: WebService) => void;
  isLoading?: boolean;
  searchQuery?: string;
  activeFilters?: string[];
}

// Animation variants for the grid container
const gridVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Animation variants for individual cards
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth entrance
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Loading skeleton variants
const skeletonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const skeletonCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

// Empty state animation variants
const emptyStateVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Skeleton card component for loading states
const SkeletonCard = ({ index }: { index: number }) => (
  <motion.div
    variants={skeletonCardVariants}
    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden h-full"
    style={{
      animationDelay: `${index * 0.1}s`
    }}
  >
    {/* Image skeleton */}
    <div className="aspect-[16/10] bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
    
    {/* Content skeleton */}
    <div className="p-6 space-y-4">
      {/* Title skeleton */}
      <div className="h-6 bg-gray-700 rounded animate-pulse" />
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-700/70 rounded animate-pulse" />
        <div className="h-4 bg-gray-700/70 rounded w-3/4 animate-pulse" />
      </div>
      
      {/* Technology badges skeleton */}
      <div className="flex space-x-2">
        <div className="h-6 w-16 bg-gray-700/50 rounded animate-pulse" />
        <div className="h-6 w-20 bg-gray-700/50 rounded animate-pulse" />
        <div className="h-6 w-14 bg-gray-700/50 rounded animate-pulse" />
      </div>
      
      {/* Price and buttons skeleton */}
      <div className="flex justify-between items-center pt-4">
        <div className="h-6 w-24 bg-gray-700/70 rounded animate-pulse" />
        <div className="h-6 w-16 bg-gray-700/70 rounded animate-pulse" />
      </div>
      
      <div className="flex space-x-3">
        <div className="flex-1 h-10 bg-gray-700/50 rounded animate-pulse" />
        <div className="flex-1 h-10 bg-gray-700/50 rounded animate-pulse" />
      </div>
    </div>
  </motion.div>
);

// Empty state component
const EmptyState = ({ searchQuery, activeFilters }: { searchQuery?: string; activeFilters?: string[] }) => {
  const hasActiveFilters = activeFilters && activeFilters.length > 0;
  const hasSearchQuery = searchQuery && searchQuery.trim().length > 0;

  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className="col-span-full flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
          {hasSearchQuery ? (
            <Search className="w-10 h-10 text-gray-400" />
          ) : hasActiveFilters ? (
            <Filter className="w-10 h-10 text-gray-400" />
          ) : (
            <Sparkles className="w-10 h-10 text-gray-400" />
          )}
        </div>
        
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-600/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-gray-600/20 animate-pulse" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {hasSearchQuery ? 'No se encontraron servicios' : 
         hasActiveFilters ? 'No hay servicios que coincidan' : 
         'No hay servicios disponibles'}
      </h3>

      <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
        {hasSearchQuery ? (
          <>
            No encontramos servicios que coincidan con <span className="text-white font-medium">"{searchQuery}"</span>. 
            Intenta con otros términos de búsqueda.
          </>
        ) : hasActiveFilters ? (
          'Intenta ajustar los filtros seleccionados para ver más opciones de servicios web.'
        ) : (
          'Parece que no hay servicios disponibles en este momento. Vuelve a intentarlo más tarde.'
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {hasSearchQuery && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            Limpiar búsqueda
          </motion.button>
        )}
        
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white rounded-lg transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            Ver todos los servicios
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export function ServiceGrid({ 
  services, 
  onViewDetails, 
  onRequestQuote, 
  isLoading = false,
  searchQuery,
  activeFilters 
}: ServiceGridProps) {
  // Show loading state with improved skeleton
  if (isLoading) {
    return <ServiceCardSkeleton count={6} />;
  }

  // Show empty state when no services match
  if (!services || services.length === 0) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState searchQuery={searchQuery} activeFilters={activeFilters} />
      </div>
    );
  }

  const GridErrorBoundary = process.env.NODE_ENV === 'test' ? 
    ({ children }: { children: React.ReactNode }) => <>{children}</> : 
    ServiceGridErrorBoundary;

  return (
    <GridErrorBoundary>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {services.map((service, index) => {
            // Skip invalid services
            if (!service || !service.id) {
              return null;
            }

            return (
              <AnimatedCard
                key={service.id}
                index={index}
                delay={0.1}
                className="h-full"
              >
                <motion.div
                  layoutId={service.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <WebServiceCard
                    service={service}
                    onViewDetails={onViewDetails}
                    onRequestQuote={onRequestQuote}
                    index={index}
                  />
                </motion.div>
              </AnimatedCard>
            );
          })}
        </AnimatePresence>
      </div>
    </GridErrorBoundary>
  );
}