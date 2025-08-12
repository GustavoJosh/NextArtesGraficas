"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ServiceExample } from '@/data/services';
import { OptimizedImage } from './OptimizedImage';
import { useLazyLoading } from '@/hooks/useLazyLoading';
import { usePerformanceMonitor } from '@/lib/performance';

interface ExampleGalleryProps {
  examples: ServiceExample[];
  className?: string;
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
}

interface ExampleModalProps {
  example: ServiceExample;
  examples: ServiceExample[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Modal component for full-screen viewing
function ExampleModal({ 
  example, 
  examples, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious 
}: ExampleModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
        case 'Home':
          e.preventDefault();
          // Go to first example
          break;
        case 'End':
          e.preventDefault();
          // Go to last example
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrevious();
    }
    
    // Reset touch values
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="relative h-full flex items-center justify-center p-4">
          {/* Close button - Touch-friendly */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 min-w-[44px] min-h-[44px] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Cerrar galería de ejemplos"
            autoFocus
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Navigation buttons */}
          {examples.length > 1 && (
            <>
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                aria-label={`Ejemplo anterior (${currentIndex} de ${examples.length})`}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                aria-label={`Siguiente ejemplo (${currentIndex + 2} de ${examples.length})`}
                disabled={currentIndex === examples.length - 1}
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Image container */}
          <motion.div
            key={example.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[80vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
            )}
            
            <OptimizedImage
              src={example.imagePath}
              alt={example.title}
              width={800}
              height={600}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onLoad={() => setImageLoaded(true)}
              priority={true}
              lazy={false}
              quality={95}
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>

          {/* Example details */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h3 id="modal-title" className="text-xl font-bold mb-2">{example.title}</h3>
              <p id="modal-description" className="text-gray-300 mb-3">{example.description}</p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {example.materials && example.materials.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Materiales:</span>
                    <span>{example.materials.join(', ')}</span>
                  </div>
                )}
                
                {example.dimensions && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Dimensiones:</span>
                    <span>{example.dimensions}</span>
                  </div>
                )}
              </div>

              {/* Counter */}
              {examples.length > 1 && (
                <div className="mt-4 text-gray-400 text-sm" aria-live="polite" aria-atomic="true">
                  Ejemplo {currentIndex + 1} de {examples.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Lazy loading image component
function LazyExampleImage({ 
  example, 
  onClick, 
  className 
}: { 
  example: ServiceExample; 
  onClick: () => void;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isInView, elementRef } = useLazyLoading({ threshold: 0.1, rootMargin: '50px' });
  const { prefersReducedMotion } = usePerformanceMonitor();

  return (
    <button
      ref={elementRef}
      className={`relative group cursor-pointer overflow-hidden rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ${className}`}
      onClick={onClick}
      aria-label={`Ver ejemplo: ${example.title}. ${example.description}`}
    >
      {/* Image */}
      {isInView && (
        <OptimizedImage
          src={example.imagePath}
          alt={example.title}
          fill
          className={`object-cover transition-all duration-300 ${
            !prefersReducedMotion() ? 'group-hover:scale-105' : ''
          }`}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
          lazy={true}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Zoom icon */}
      <div className="absolute top-2 right-2 p-2 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
        <ZoomIn className="w-4 h-4 text-white" aria-hidden="true" />
      </div>

      {/* Title overlay */}
      <div className={`absolute bottom-0 left-0 right-0 p-3 text-white transition-transform duration-300 ${
        !prefersReducedMotion() ? 'transform translate-y-full group-hover:translate-y-0 group-focus:translate-y-0' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'
      }`}>
        <h4 className="font-semibold text-sm mb-1">{example.title}</h4>
        <p className="text-xs text-gray-300 line-clamp-2">{example.description}</p>
      </div>
    </button>
  );
}

export function ExampleGallery({ 
  examples, 
  className = '', 
  columns = 3,
  showFilters = false 
}: ExampleGalleryProps) {
  const [selectedExample, setSelectedExample] = useState<ServiceExample | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');

  // Filter examples based on selected filter
  const filteredExamples = filter === 'all' 
    ? examples 
    : examples.filter(example => example.category === filter);

  // Get unique categories for filters
  const categories = Array.from(new Set(examples.map(ex => ex.category)));

  const openModal = useCallback((example: ServiceExample) => {
    const index = filteredExamples.findIndex(ex => ex.id === example.id);
    setSelectedExample(example);
    setCurrentIndex(index);
  }, [filteredExamples]);

  const closeModal = useCallback(() => {
    setSelectedExample(null);
  }, []);

  const nextExample = useCallback(() => {
    const nextIndex = (currentIndex + 1) % filteredExamples.length;
    setCurrentIndex(nextIndex);
    setSelectedExample(filteredExamples[nextIndex]);
  }, [currentIndex, filteredExamples]);

  const previousExample = useCallback(() => {
    const prevIndex = currentIndex === 0 ? filteredExamples.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedExample(filteredExamples[prevIndex]);
  }, [currentIndex, filteredExamples]);

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  if (examples.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-400">No hay ejemplos disponibles</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Filters */}
      {showFilters && categories.length > 1 && (
        <div className="mb-6" role="group" aria-label="Filtros de categoría">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-colors touch-manipulation ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize touch-manipulation ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category === 'impresion' ? 'Impresión' : 
                 category === 'laser' ? 'Láser' : 
                 category === 'papeleria' ? 'Papelería' : category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div 
        className={`grid ${gridCols[columns]} gap-4`}
        role="grid"
        aria-label={`Galería de ejemplos${filter !== 'all' ? ` filtrada por ${filter}` : ''}`}
      >
        {filteredExamples.map((example, index) => (
          <div key={example.id} role="gridcell" aria-rowindex={Math.floor(index / columns) + 1} aria-colindex={(index % columns) + 1}>
            <LazyExampleImage
              example={example}
              onClick={() => openModal(example)}
              className="aspect-square"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedExample && (
        <ExampleModal
          example={selectedExample}
          examples={filteredExamples}
          currentIndex={currentIndex}
          isOpen={!!selectedExample}
          onClose={closeModal}
          onNext={nextExample}
          onPrevious={previousExample}
        />
      )}
    </div>
  );
}

export default ExampleGallery;