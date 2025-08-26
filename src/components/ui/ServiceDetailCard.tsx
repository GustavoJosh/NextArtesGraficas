// src/components/ui/ServiceDetailCard.tsx
"use client";

import { Printer, Zap, FileText, Palette, Clock, ChevronDown, ChevronUp, Eye, ExternalLink } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Service, ServiceExample } from '@/data/services';
import { OptimizedImage } from './OptimizedImage';
import { usePerformanceMonitor } from '@/lib/performance';
import { useAnimations, useStaggerAnimation, useHoverEffects } from '@/hooks/useAnimations';
import { 
  serviceCardVariants, 
  buttonVariants, 
  iconVariants, 
  chevronVariants,
  contentRevealVariants,
  badgeVariants,
  MICRO_INTERACTIONS
} from '@/lib/animations';

interface ServiceDetailCardProps {
  title: string;
  description: string;
  category?: 'impresion' | 'laser' | 'papeleria';
  imageName?: string;
  deliveryTime?: {
    standard: string;
    rush?: string;
    notes?: string;
  };
  examples?: ServiceExample[];
  specifications?: {
    materials?: string[];
    maxSize?: string;
    minQuantity?: number;
    features: string[];
  };
  pricing?: {
    startingFrom?: string;
    unit?: string;
  };
  onExpand?: (isExpanded: boolean) => void;
  onExampleView?: (example: ServiceExample) => void;
  defaultExpanded?: boolean;
  className?: string;
}

const getServiceIcon = (category: string) => {
  switch (category) {
    case 'impresion': return Printer;
    case 'laser': return Zap;
    case 'papeleria': return FileText;
    default: return Palette;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'impresion': return 'from-blue-500 to-cyan-500';
    case 'laser': return 'from-red-500 to-orange-500';
    case 'papeleria': return 'from-green-500 to-emerald-500';
    default: return 'from-gray-500 to-slate-500';
  }
};

const getCategoryAccentColor = (category: string) => {
  switch (category) {
    case 'impresion': return 'text-blue-400';
    case 'laser': return 'text-red-400';
    case 'papeleria': return 'text-green-400';
    default: return 'text-gray-400';
  }
};

const getCategoryBorderColor = (category: string) => {
  switch (category) {
    case 'impresion': return 'border-blue-500/30';
    case 'laser': return 'border-red-500/30';
    case 'papeleria': return 'border-green-500/30';
    default: return 'border-gray-500/30';
  }
};

const getCategoryBgColor = (category: string) => {
  switch (category) {
    case 'impresion': return 'bg-blue-500/20';
    case 'laser': return 'bg-red-500/20';
    case 'papeleria': return 'bg-green-500/20';
    default: return 'bg-gray-500/20';
  }
};

export function ServiceDetailCard({ 
  title, 
  description, 
  category = 'impresion', 
  imageName,
  deliveryTime,
  examples = [],
  specifications,
  pricing,
  onExpand,
  onExampleView,
  defaultExpanded = false,
  className = ''
}: ServiceDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [focusedExampleIndex, setFocusedExampleIndex] = useState(-1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const exampleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const { prefersReducedMotion } = usePerformanceMonitor();
  
  // Animation hooks
  const cardAnimations = useAnimations(serviceCardVariants);
  const buttonAnimations = useAnimations(buttonVariants);
  const iconAnimations = useAnimations(iconVariants);
  const chevronAnimations = useAnimations(chevronVariants);
  const contentAnimations = useAnimations(contentRevealVariants);
  const badgeAnimations = useAnimations(badgeVariants);
  
  // Stagger animation for features and materials
  const featuresStagger = useStaggerAnimation(specifications?.features?.length || 0);
  const materialsStagger = useStaggerAnimation(specifications?.materials?.length || 0);
  const examplesStagger = useStaggerAnimation(examples.length);
  
  // Hover effects
  const hoverEffects = useHoverEffects(true);
  
  const Icon = getServiceIcon(category);
  const colorGradient = getCategoryColor(category);
  const accentColor = getCategoryAccentColor(category);
  const borderColor = getCategoryBorderColor(category);
  const bgColor = getCategoryBgColor(category);
  
  // Use imageName if provided, otherwise use placeholder
  const imageUrl = imageName ? `/images/services/${imageName}.webp` : "/images/services/impresion-digital.webp";
  const fallbackUrl = imageName ? `/images/services/${imageName}.jpg` : "/images/services/impresion-digital.jpg";

  const handleToggleExpand = useCallback(() => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpand?.(newExpandedState);
  }, [isExpanded, onExpand]);

  const handleExampleClick = useCallback((example: ServiceExample, index: number) => {
    setFocusedExampleIndex(index);
    onExampleView?.(example);
  }, [onExampleView]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggleExpand();
    } else if (event.key === 'Escape' && isExpanded) {
      setIsExpanded(false);
      onExpand?.(false);
      expandButtonRef.current?.focus();
    }
  }, [isExpanded, handleToggleExpand, onExpand]);

  const handleExampleKeyDown = useCallback((event: React.KeyboardEvent, example: ServiceExample, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleExampleClick(example, index);
    } else if (event.key === 'ArrowRight' && index < examples.length - 1) {
      event.preventDefault();
      exampleRefs.current[index + 1]?.focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      exampleRefs.current[index - 1]?.focus();
    }
  }, [examples.length, handleExampleClick]);

  // Get first 3 examples for thumbnail preview
  const previewExamples = examples.slice(0, 3);
  const displayExamples = examples.slice(0, 6);

  // Enhanced hover handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      className={`relative group cursor-pointer ${className}`}
      variants={cardAnimations.variants}
      initial="initial"
      animate={isExpanded ? "expanded" : isHovered ? "hover" : "initial"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      aria-label={`${title} service card. Press Enter to ${isExpanded ? 'collapse' : 'expand'} details.`}
      {...(!cardAnimations.isReducedMotion ? MICRO_INTERACTIONS.liftOnHover : {})}
    >
      {/* Card container with dynamic height */}
      <motion.div 
        className={`relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg transition-all duration-300 ${
          isHovered ? 'border-gray-600/80 shadow-xl' : ''
        } ${isExpanded ? 'border-blue-500/30 shadow-2xl' : ''}`}
        animate={{
          height: isExpanded ? 'auto' : '16rem',
          transition: { duration: cardAnimations.isReducedMotion ? 0 : 0.3, ease: "easeInOut" }
        }}
      >
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority={false}
            fallbackSrc={fallbackUrl}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          {/* Header with icon and delivery badge */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <motion.div 
                className={`
                  p-2 rounded-full transition-all duration-300
                  bg-black/30 backdrop-blur-sm border border-white/20
                  ${isHovered ? 'bg-black/40 border-white/30' : ''}
                `}
                variants={iconAnimations.variants}
                animate={isHovered ? "hover" : "initial"}
              >
                <Icon className={`w-5 h-5 ${accentColor} transition-colors duration-300`} />
              </motion.div>
              <motion.span 
                className={`text-xs font-medium uppercase tracking-wider ${accentColor} transition-colors duration-300`}
                animate={{
                  scale: isHovered && !iconAnimations.isReducedMotion ? 1.05 : 1,
                  transition: { duration: 0.15 }
                }}
              >
                {category === 'impresion' ? 'Impresión' : category === 'laser' ? 'Láser' : 'Papelería'}
              </motion.span>
            </div>
            
            {/* Delivery Time Badge */}
            {deliveryTime && (
              <motion.div 
                className={`flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20 transition-all duration-200 ${
                  isHovered ? 'bg-black/50 border-yellow-400/30' : ''
                }`}
                variants={badgeAnimations.variants}
                animate={deliveryTime.rush ? "pulse" : isHovered ? "hover" : "initial"}
                role="status"
                aria-label={`Tiempo de entrega: ${deliveryTime.standard}`}
              >
                <motion.div
                  animate={{
                    rotate: isHovered && !badgeAnimations.isReducedMotion ? [0, 5, -5, 0] : 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Clock className="w-3 h-3 text-yellow-400" aria-hidden="true" />
                </motion.div>
                <span className="text-xs text-yellow-400 font-medium">
                  {deliveryTime.standard}
                </span>
              </motion.div>
            )}
          </div>

          {/* Content at bottom */}
          <div className="text-left">
            <div className="flex items-center justify-between mb-2">
              <motion.h3 
                className={`text-xl font-bold transition-all duration-300 ${
                  isHovered 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'text-white'
                }`}
                animate={{
                  scale: isHovered && !cardAnimations.isReducedMotion ? 1.02 : 1,
                  transition: { duration: 0.2 }
                }}
              >
                {title}
              </motion.h3>
              
              {/* Expand/Collapse Button - Touch-friendly 44px minimum */}
              <motion.button
                ref={expandButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleExpand();
                }}
                className={`min-w-[44px] min-h-[44px] p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent touch-manipulation ${
                  isHovered ? 'bg-black/50 border-white/30' : ''
                }`}
                variants={buttonAnimations.variants}
                animate={isHovered ? "hover" : "initial"}
                whileTap={buttonAnimations.isReducedMotion ? {} : { scale: 0.95 }}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${title} details`}
              >
                <motion.div
                  variants={chevronAnimations.variants}
                  animate={isExpanded ? "expanded" : "collapsed"}
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </motion.div>
              </motion.button>
            </div>
            
            <p className="text-gray-200 text-sm leading-relaxed mb-3">
              {description}
            </p>

            {/* Example Thumbnails Preview (only when collapsed) */}
            {!isExpanded && previewExamples.length > 0 && (
              <motion.div 
                className="flex items-center space-x-2 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2, duration: contentAnimations.isReducedMotion ? 0 : 0.3 }
                }}
              >
                <span className="text-xs text-gray-400">Ejemplos:</span>
                <motion.div 
                  className="flex space-x-1"
                  variants={examplesStagger.containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {previewExamples.map((example, index) => (
                    <motion.div 
                      key={example.id}
                      className={`w-8 h-8 rounded border border-white/20 overflow-hidden bg-gray-700 transition-colors duration-200 ${
                        isHovered ? 'border-white/40' : ''
                      }`}
                      variants={examplesStagger.itemVariants}
                      whileHover={examplesStagger.isReducedMotion ? {} : { scale: 1.1, zIndex: 10 }}
                      whileTap={examplesStagger.isReducedMotion ? {} : { scale: 0.95 }}
                    >
                      <OptimizedImage
                        src={example.imagePath}
                        alt={example.title}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"

                        quality={75}
                      />
                    </motion.div>
                  ))}
                  {examples.length > 3 && (
                    <motion.div 
                      className={`w-8 h-8 rounded border border-white/20 bg-black/40 flex items-center justify-center transition-colors duration-200 ${
                        isHovered ? 'bg-black/50 border-white/40' : ''
                      }`}
                      variants={examplesStagger.itemVariants}
                      whileHover={examplesStagger.isReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <span className="text-xs text-white font-medium">+{examples.length - 3}</span>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* Pricing (always visible) */}
            {pricing && (
              <div className="text-right">
                <span className="text-sm text-green-400 font-semibold">
                  {pricing.startingFrom}
                  {pricing.unit && <span className="text-xs text-gray-400 ml-1">{pricing.unit}</span>}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentAnimations.variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative z-10 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50"
            >
              <div className="p-6 space-y-6">
                {/* Delivery Information */}
                {deliveryTime && (
                  <div role="region" aria-labelledby="delivery-info-heading">
                    <h4 id="delivery-info-heading" className="text-sm font-semibold text-white mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-yellow-400" aria-hidden="true" />
                      Tiempos de Entrega
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-black/30 rounded-lg p-4 border border-gray-700/50 min-h-[44px] flex flex-col justify-center">
                        <span className="text-xs text-gray-400 block">Estándar</span>
                        <span className="text-sm text-white font-medium">{deliveryTime.standard}</span>
                      </div>
                      {deliveryTime.rush && (
                        <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/30 min-h-[44px] flex flex-col justify-center">
                          <span className="text-xs text-gray-400 block">Express</span>
                          <span className="text-sm text-yellow-400 font-medium">{deliveryTime.rush}</span>
                        </div>
                      )}
                    </div>
                    {deliveryTime.notes && (
                      <p className="text-xs text-gray-400 mt-2 italic">{deliveryTime.notes}</p>
                    )}
                  </div>
                )}

                {/* Key Features - Collapsible on mobile */}
                {specifications?.features && (
                  <div className="md:block" role="region" aria-labelledby="features-heading">
                    <details className="md:hidden group">
                      <summary className="flex items-center justify-between cursor-pointer min-h-[44px] p-2 rounded-lg hover:bg-black/20 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                        <h4 id="features-heading" className="text-sm font-semibold text-white">Características</h4>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" aria-hidden="true" />
                      </summary>
                      <motion.div 
                        className="mt-3 flex flex-wrap gap-2"
                        variants={featuresStagger.containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {specifications.features.map((feature, index) => (
                          <motion.span 
                            key={index}
                            variants={featuresStagger.itemVariants}
                            className="px-3 py-1 bg-black/30 rounded-full text-xs text-gray-300 border border-gray-600 hover:border-gray-500 transition-colors duration-200"
                            whileHover={featuresStagger.isReducedMotion ? {} : { scale: 1.05, y: -2 }}
                            whileTap={featuresStagger.isReducedMotion ? {} : { scale: 0.95 }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </motion.div>
                    </details>
                    <div className="hidden md:block">
                      <h4 id="features-heading-desktop" className="text-sm font-semibold text-white mb-3">Características</h4>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        variants={featuresStagger.containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {specifications.features.map((feature, index) => (
                          <motion.span 
                            key={index}
                            variants={featuresStagger.itemVariants}
                            className="px-3 py-1 bg-black/30 rounded-full text-xs text-gray-300 border border-gray-600 hover:border-gray-500 transition-colors duration-200"
                            whileHover={featuresStagger.isReducedMotion ? {} : { scale: 1.05, y: -2 }}
                            whileTap={featuresStagger.isReducedMotion ? {} : { scale: 0.95 }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Technical Specifications - Collapsible on mobile */}
                {specifications && (specifications.maxSize || specifications.minQuantity) && (
                  <div className="md:block">
                    <details className="md:hidden group">
                      <summary className="flex items-center justify-between cursor-pointer min-h-[44px] p-2 rounded-lg hover:bg-black/20 transition-colors touch-manipulation">
                        <h4 className="text-sm font-semibold text-white">Especificaciones Técnicas</h4>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                      </summary>
                      <div className="mt-3 space-y-3">
                        {specifications.maxSize && (
                          <div className="bg-black/20 rounded-lg p-4 border border-gray-700/50 min-h-[44px] flex flex-col justify-center">
                            <span className="text-xs text-gray-400 block">Tamaño Máximo</span>
                            <span className="text-sm text-white font-medium">{specifications.maxSize}</span>
                          </div>
                        )}
                        {specifications.minQuantity && (
                          <div className="bg-black/20 rounded-lg p-4 border border-gray-700/50 min-h-[44px] flex flex-col justify-center">
                            <span className="text-xs text-gray-400 block">Cantidad Mínima</span>
                            <span className="text-sm text-white font-medium">{specifications.minQuantity} unidades</span>
                          </div>
                        )}
                      </div>
                    </details>
                    <div className="hidden md:block">
                      <h4 className="text-sm font-semibold text-white mb-3">Especificaciones Técnicas</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {specifications.maxSize && (
                          <div className="bg-black/20 rounded-lg p-4 border border-gray-700/50 min-h-[44px] flex flex-col justify-center">
                            <span className="text-xs text-gray-400 block">Tamaño Máximo</span>
                            <span className="text-sm text-white font-medium">{specifications.maxSize}</span>
                          </div>
                        )}
                        {specifications.minQuantity && (
                          <div className="bg-black/20 rounded-lg p-4 border border-gray-700/50 min-h-[44px] flex flex-col justify-center">
                            <span className="text-xs text-gray-400 block">Cantidad Mínima</span>
                            <span className="text-sm text-white font-medium">{specifications.minQuantity} unidades</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Materials - Collapsible on mobile */}
                {specifications?.materials && specifications.materials.length > 0 && (
                  <div className="md:block">
                    <details className="md:hidden group">
                      <summary className="flex items-center justify-between cursor-pointer min-h-[44px] p-2 rounded-lg hover:bg-black/20 transition-colors touch-manipulation">
                        <h4 className="text-sm font-semibold text-white">Materiales Disponibles</h4>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                      </summary>
                      <motion.div 
                        className="mt-3 flex flex-wrap gap-2"
                        variants={materialsStagger.containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {specifications.materials.map((material, index) => (
                          <motion.span 
                            key={index}
                            variants={materialsStagger.itemVariants}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${accentColor.replace('text-', 'text-')} border ${borderColor} hover:bg-opacity-30 transition-all duration-200`}
                            whileHover={materialsStagger.isReducedMotion ? {} : { scale: 1.05, y: -2 }}
                            whileTap={materialsStagger.isReducedMotion ? {} : { scale: 0.95 }}
                          >
                            {material}
                          </motion.span>
                        ))}
                      </motion.div>
                    </details>
                    <div className="hidden md:block">
                      <h4 className="text-sm font-semibold text-white mb-3">Materiales Disponibles</h4>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        variants={materialsStagger.containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {specifications.materials.map((material, index) => (
                          <motion.span 
                            key={index}
                            variants={materialsStagger.itemVariants}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${accentColor.replace('text-', 'text-')} border ${borderColor} hover:bg-opacity-30 transition-all duration-200`}
                            whileHover={materialsStagger.isReducedMotion ? {} : { scale: 1.05, y: -2 }}
                            whileTap={materialsStagger.isReducedMotion ? {} : { scale: 0.95 }}
                          >
                            {material}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Examples Gallery - Collapsible on mobile */}
                {examples.length > 0 && (
                  <div className="md:block">
                    <details className="md:hidden group" open>
                      <summary className="flex items-center justify-between cursor-pointer min-h-[44px] p-2 rounded-lg hover:bg-black/20 transition-colors touch-manipulation">
                        <h4 className="text-sm font-semibold text-white flex items-center">
                          <Eye className="w-4 h-4 mr-2 text-blue-400" />
                          Ejemplos de Trabajo
                        </h4>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                      </summary>
                      <div className="mt-3">
                        <motion.div 
                          className="grid grid-cols-2 gap-3"
                          variants={examplesStagger.containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {displayExamples.map((example, index) => (
                            <motion.button
                              key={example.id}
                              ref={(el) => { exampleRefs.current[index] = el; }}
                              variants={examplesStagger.itemVariants}
                              whileHover={examplesStagger.isReducedMotion ? {} : { 
                                scale: 1.05, 
                                y: -4,
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                              }}
                              whileTap={examplesStagger.isReducedMotion ? {} : { scale: 0.95 }}
                              onClick={() => handleExampleClick(example, index)}
                              onKeyDown={(e) => handleExampleKeyDown(e, example, index)}
                              className="group aspect-square rounded-lg overflow-hidden bg-gray-700 border border-gray-600 hover:border-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 touch-manipulation min-h-[44px]"
                              aria-label={`View example: ${example.title}`}
                            >
                              <div className="relative w-full h-full">
                                <OptimizedImage
                                  src={example.imagePath}
                                  alt={example.title}
                                  fill
                                  className={`object-cover transition-transform duration-300 ${
                                    !prefersReducedMotion() ? 'group-hover:scale-110' : ''
                                  }`}

                                  quality={80}
                                  sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                                  <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                        {examples.length > 6 && (
                          <p className="text-xs text-gray-400 mt-2 text-center">
                            Y {examples.length - 6} ejemplos más disponibles...
                          </p>
                        )}
                      </div>
                    </details>
                    <div className="hidden md:block">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <Eye className="w-4 h-4 mr-2 text-blue-400" />
                        Ejemplos de Trabajo
                      </h4>
                      <motion.div 
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                        variants={examplesStagger.containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {displayExamples.map((example, index) => (
                          <motion.button
                            key={example.id}
                            ref={(el) => { exampleRefs.current[index] = el; }}
                            variants={examplesStagger.itemVariants}
                            whileHover={examplesStagger.isReducedMotion ? {} : { 
                              scale: 1.05, 
                              y: -4,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                            }}
                            whileTap={examplesStagger.isReducedMotion ? {} : { scale: 0.95 }}
                            onClick={() => handleExampleClick(example, index)}
                            onKeyDown={(e) => handleExampleKeyDown(e, example, index)}
                            className="group aspect-square rounded-lg overflow-hidden bg-gray-700 border border-gray-600 hover:border-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 touch-manipulation min-h-[44px]"
                            aria-label={`View example: ${example.title}`}
                          >
                            <div className="relative w-full h-full">
                              <OptimizedImage
                                src={example.imagePath}
                                alt={example.title}
                                fill
                                className={`object-cover transition-transform duration-300 ${
                                  !prefersReducedMotion() ? 'group-hover:scale-110' : ''
                                }`}

                                quality={80}
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                                <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                      {examples.length > 6 && (
                        <p className="text-xs text-gray-400 mt-2 text-center">
                          Y {examples.length - 6} ejemplos más disponibles...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Hover Effects */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover:opacity-20 
          transition-opacity duration-300 rounded-xl pointer-events-none
        `}></div>
        
        {/* Subtle border effect on hover */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
}

export function ServiceDetailGrid({ 
  services, 
  onExampleView,
  className = ''
}: { 
  services: Service[];
  onExampleView?: (example: ServiceExample) => void;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ${className}`}>
      {services.map((service) => (
        <ServiceDetailCard
          key={service.title}
          title={service.title}
          description={service.description}
          category={service.categoryId === 'imprenta-digital' || service.categoryId === 'impresion-gran-formato' ? 'impresion' : 
                   service.categoryId === 'cnc-laser' ? 'laser' : 
                   service.categoryId === 'imprenta' ? 'papeleria' : undefined}
          imageName={undefined}
          deliveryTime={service.deliveryTime}
          examples={service.examples}
          specifications={service.specifications}
          pricing={service.pricing}
          onExampleView={onExampleView}
        />
      ))}
    </div>
  );
}