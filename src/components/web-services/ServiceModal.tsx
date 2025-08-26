"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  X, 
  ExternalLink, 
  MessageSquare, 
  Star, 
  Clock, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Play,
  Download,
  Share2,
  Heart,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { WebService } from '@/data/webServices';

interface ServiceModalProps {
  service: WebService | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (service: WebService) => void;
}

type TabType = 'overview' | 'features' | 'pricing' | 'examples';

// Animation variants for the modal
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Animation variants for backdrop
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Animation variants for tab content
const tabContentVariants = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Get category colors
const getCategoryColors = (categoryId: string) => {
  switch (categoryId) {
    case 'qr-menus':
      return {
        gradient: 'from-emerald-500 to-teal-600',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
      };
    case 'websites':
      return {
        gradient: 'from-blue-500 to-indigo-600',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
      };
    case 'digital-cards':
      return {
        gradient: 'from-purple-500 to-pink-600',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20'
      };
    case 'custom-solutions':
      return {
        gradient: 'from-orange-500 to-red-600',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20'
      };
    default:
      return {
        gradient: 'from-gray-500 to-slate-600',
        text: 'text-gray-400',
        bg: 'bg-gray-500/10',
        border: 'border-gray-500/20'
      };
  }
};

export function ServiceModal({ service, isOpen, onClose, onRequestQuote }: ServiceModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
      setCurrentImageIndex(0);
      setImageLoaded(false);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        if (service && service.gallery.length > 1) {
          setCurrentImageIndex(prev => 
            prev === 0 ? service.gallery.length - 1 : prev - 1
          );
        }
        break;
      case 'ArrowRight':
        if (service && service.gallery.length > 1) {
          setCurrentImageIndex(prev => 
            prev === service.gallery.length - 1 ? 0 : prev + 1
          );
        }
        break;
      case '1':
        setActiveTab('overview');
        break;
      case '2':
        setActiveTab('features');
        break;
      case '3':
        setActiveTab('pricing');
        break;
      case '4':
        setActiveTab('examples');
        break;
    }
  }, [isOpen, onClose, service]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!service) return null;

  const colors = getCategoryColors(service.category.id);
  const currentImage = service.gallery[currentImageIndex];
  const averageRating = service.testimonials.length > 0
    ? service.testimonials.reduce((sum, t) => sum + t.rating, 0) / service.testimonials.length
    : 0;

  const handleRequestQuote = () => {
    onRequestQuote(service);
  };

  const handleNextImage = () => {
    if (service.gallery.length > 1) {
      setCurrentImageIndex(prev => 
        prev === service.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (service.gallery.length > 1) {
      setCurrentImageIndex(prev => 
        prev === 0 ? service.gallery.length - 1 : prev - 1
      );
    }
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Resumen', shortcut: '1' },
    { id: 'features' as TabType, label: 'Características', shortcut: '2' },
    { id: 'pricing' as TabType, label: 'Precios', shortcut: '3' },
    { id: 'examples' as TabType, label: 'Ejemplos', shortcut: '4' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full h-full max-w-7xl max-h-screen bg-gray-900 border border-gray-700/50 shadow-2xl overflow-hidden flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
                  {service.category.name}
                </div>
                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                {averageRating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-medium">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {service.demoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(service.demoUrl, '_blank')}
                    className="text-gray-300 border-gray-600/50 hover:bg-gray-700/50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Demo
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Side - Image Gallery */}
              <div className="w-1/2 relative bg-gray-800/30">
                {/* Main Image */}
                <div className="relative h-full">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
                  )}
                  
                  <Image
                    src={currentImage?.url || '/images/web-services/placeholder-service.webp'}
                    alt={currentImage?.alt || service.title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />

                  {/* Image Navigation */}
                  {service.gallery.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full border border-white/20 backdrop-blur-sm transition-all"
                        aria-label="Imagen anterior"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full border border-white/20 backdrop-blur-sm transition-all"
                        aria-label="Siguiente imagen"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {service.gallery.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all",
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/40 hover:bg-white/60"
                            )}
                            aria-label={`Ver imagen ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Image Type Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-black/40 text-white border-white/20">
                      {currentImage?.type === 'screenshot' ? 'Captura' :
                       currentImage?.type === 'mockup' ? 'Mockup' : 'Demo'}
                    </Badge>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {service.gallery.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex space-x-2 overflow-x-auto">
                      {service.gallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            "relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                            index === currentImageIndex
                              ? "border-white"
                              : "border-white/30 hover:border-white/60"
                          )}
                        >
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Content */}
              <div className="w-1/2 flex flex-col">
                {/* Tab Navigation */}
                <div className="border-b border-gray-700/50 bg-gray-800/30">
                  <div className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "flex-1 px-6 py-4 text-sm font-medium transition-all relative",
                          activeTab === tab.id
                            ? `${colors.text} bg-gray-700/30`
                            : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/20"
                        )}
                      >
                        <span>{tab.label}</span>
                        <span className="ml-2 text-xs opacity-60">({tab.shortcut})</span>
                        
                        {activeTab === tab.id && (
                          <motion.div
                            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient}`}
                            layoutId="activeTab"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="p-6"
                    >
                      {activeTab === 'overview' && (
                        <OverviewTab service={service} colors={colors} />
                      )}
                      {activeTab === 'features' && (
                        <FeaturesTab service={service} colors={colors} />
                      )}
                      {activeTab === 'pricing' && (
                        <PricingTab service={service} colors={colors} />
                      )}
                      {activeTab === 'examples' && (
                        <ExamplesTab service={service} colors={colors} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer CTAs */}
                <div className="p-6 border-t border-gray-700/50 bg-gray-800/30">
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleRequestQuote}
                      className={`flex-1 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all`}
                      size="lg"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Solicitar Cotización
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-gray-300 border-gray-600/50 hover:bg-gray-700/50"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Guardar
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-gray-300 border-gray-600/50 hover:bg-gray-700/50"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Compartir
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400">
                      Presiona <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Esc</kbd> para cerrar
                      • Usa <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">1-4</kbd> para cambiar pestañas
                      • <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">←→</kbd> para navegar imágenes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Overview Tab Component
function OverviewTab({ service, colors }: { service: WebService; colors: Record<string, string> }) {

  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Descripción</h3>
        <p className="text-gray-300 leading-relaxed">{service.description}</p>
      </div>

      {/* Key Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className={`w-5 h-5 ${colors.text}`} />
            <span className="text-sm font-medium text-gray-300">Tiempo de Entrega</span>
          </div>
          <p className="text-white font-semibold">{service.estimatedDelivery}</p>
        </div>

        <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
          <div className="flex items-center space-x-2 mb-2">
            <Star className={`w-5 h-5 ${colors.text}`} />
            <span className="text-sm font-medium text-gray-300">Complejidad</span>
          </div>
          <p className="text-white font-semibold capitalize">
            {service.complexity === 'basic' ? 'Básico' :
             service.complexity === 'standard' ? 'Estándar' : 'Premium'}
          </p>
        </div>
      </div>

      {/* Technologies */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Tecnologías</h3>
        <div className="flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-gray-700/50 text-gray-300 border-gray-600/50"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      {service.testimonials.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Testimonios</h3>
          <div className="space-y-4">
            {service.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">{testimonial.clientName}</p>
                    <p className="text-sm text-gray-400">{testimonial.clientCompany}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">&ldquo;{testimonial.content}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Features Tab Component
function FeaturesTab({ service, colors }: { service: WebService; colors: Record<string, string> }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Características Principales</h3>
        <div className="grid gap-3">
          {service.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50 transition-colors"
            >
              <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study */}
      {service.caseStudy && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Caso de Estudio</h3>
          <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden">
            <div className="p-6">
              <h4 className="text-xl font-bold text-white mb-2">{service.caseStudy.title}</h4>
              <p className="text-gray-300 mb-4">{service.caseStudy.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-white mb-2">Desafío</h5>
                  <p className="text-gray-300 text-sm">{service.caseStudy.challenge}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-white mb-2">Solución</h5>
                  <p className="text-gray-300 text-sm">{service.caseStudy.solution}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="font-semibold text-white mb-3">Resultados</h5>
                <div className="grid gap-2">
                  {service.caseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className={`w-4 h-4 ${colors.text}`} />
                      <span className="text-gray-300 text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Pricing Tab Component
function PricingTab({ service, colors }: { service: WebService; colors: Record<string, string> }) {
  return (
    <div className="space-y-6">
      {/* Main Pricing */}
      <div className={`p-6 rounded-lg ${colors.bg} ${colors.border} border`}>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-white mb-2">
            ${service.pricing.starting}
            <span className="text-lg text-gray-400 font-normal ml-2">
              {service.pricing.currency}
            </span>
          </div>
          <p className="text-gray-300">
            {service.pricing.billing === 'one-time' ? 'Pago único' :
             service.pricing.billing === 'monthly' ? 'Mensual' : 'Precio personalizado'}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-white">Incluye:</h4>
          {service.pricing.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className={`w-4 h-4 ${colors.text}`} />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-6">
        <h4 className="font-semibold text-white mb-4">Información Adicional</h4>
        
        <div className="grid gap-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
            <span className="text-gray-300">Tiempo de entrega</span>
            <span className="text-white font-medium">{service.estimatedDelivery}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
            <span className="text-gray-300">Nivel de complejidad</span>
            <span className="text-white font-medium capitalize">
              {service.complexity === 'basic' ? 'Básico' :
               service.complexity === 'standard' ? 'Estándar' : 'Premium'}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-300">Soporte incluido</span>
            <span className="text-white font-medium">
              {service.complexity === 'basic' ? '30 días' :
               service.complexity === 'standard' ? '90 días' : '6 meses'}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-6">
        <h4 className="font-semibold text-white mb-4">Métodos de Pago</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <CheckCircle className={`w-4 h-4 ${colors.text}`} />
            <span>Transferencia bancaria</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className={`w-4 h-4 ${colors.text}`} />
            <span>PayPal</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className={`w-4 h-4 ${colors.text}`} />
            <span>Tarjeta de crédito</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className={`w-4 h-4 ${colors.text}`} />
            <span>Financiamiento disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Examples Tab Component
function ExamplesTab({ service, colors }: { service: WebService; colors: Record<string, string> }) {
  return (
    <div className="space-y-6">
      {/* Gallery */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Galería de Ejemplos</h3>
        <div className="grid grid-cols-2 gap-4">
          {service.gallery.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-colors group"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border-white/30"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver completo
                </Button>
              </div>
              
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-black/40 text-white border-white/20 text-xs">
                  {image.type === 'screenshot' ? 'Captura' :
                   image.type === 'mockup' ? 'Mockup' : 'Demo'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Link */}
      {service.demoUrl && (
        <div className={`p-6 rounded-lg ${colors.bg} ${colors.border} border text-center`}>
          <h4 className="font-semibold text-white mb-2">Demo Interactivo</h4>
          <p className="text-gray-300 mb-4">
            Explora una versión funcional de este servicio
          </p>
          <Button
            onClick={() => window.open(service.demoUrl, '_blank')}
            className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white`}
          >
            <Play className="w-4 h-4 mr-2" />
            Abrir Demo
          </Button>
        </div>
      )}

      {/* Download Resources */}
      <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-6">
        <h4 className="font-semibold text-white mb-4">Recursos Descargables</h4>
        <div className="grid gap-3">
          <Button
            variant="outline"
            className="justify-start text-gray-300 border-gray-600/50 hover:bg-gray-700/50"
          >
            <Download className="w-4 h-4 mr-3" />
            Brochure del servicio (PDF)
          </Button>
          <Button
            variant="outline"
            className="justify-start text-gray-300 border-gray-600/50 hover:bg-gray-700/50"
          >
            <Download className="w-4 h-4 mr-3" />
            Especificaciones técnicas
          </Button>
          <Button
            variant="outline"
            className="justify-start text-gray-300 border-gray-600/50 hover:bg-gray-700/50"
          >
            <Download className="w-4 h-4 mr-3" />
            Casos de uso similares
          </Button>
        </div>
      </div>
    </div>
  );
}