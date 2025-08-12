// src/components/ui/ServiceCard.tsx
"use client";

import { Printer, Zap, FileText, Palette, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Service, ServiceExample } from '@/data/services';

interface ServiceCardProps {
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
    case 'impresion': return 'from-cyan-500 to-teal-500';
    case 'laser': return 'from-orange-500 to-red-500';
    case 'papeleria': return 'from-emerald-500 to-green-500';
    default: return 'from-gray-500 to-slate-500';
  }
};

export function ServiceCard({ 
  title, 
  description, 
  category = 'impresion', 
  imageName,
  deliveryTime,
  examples = [],
  specifications,
  pricing,
  onExpand
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const cardRef = useRef<HTMLDivElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  
  const Icon = getServiceIcon(category);
  const colorGradient = getCategoryColor(category);
  
  // Use imageName if provided, otherwise use placeholder
  const imageUrl = imageName ? `/images/services/${imageName}.webp` : "/images/services/impresion-digital.webp";

  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpand?.(newExpandedState);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggleExpand();
    } else if (event.key === 'Escape' && isExpanded) {
      setIsExpanded(false);
      onExpand?.(false);
      expandButtonRef.current?.focus();
    }
  };

  // Get first 3 examples for thumbnail preview
  const previewExamples = examples.slice(0, 3);

  return (
    <motion.div 
      ref={cardRef}
      className="relative group cursor-pointer"
      layout
      initial={false}
      animate={{ 
        scale: isExpanded ? 1 : 1,
        zIndex: isExpanded ? 10 : 1
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      role="article"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      aria-label={`${title} service card. Press Enter to ${isExpanded ? 'collapse' : 'expand'} details.`}
    >
      {/* Card container with dynamic height */}
      <motion.div 
        className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 overflow-hidden"
        layout
        animate={{ 
          height: isExpanded ? 'auto' : '16rem' // h-64 = 16rem
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority={false}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          {/* Header with icon and delivery badge */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <div className={`
                p-1 rounded-full transition-all duration-300
                bg-black/20
              `}>
                <Icon className={`w-4 h-4 ${category === 'impresion' ? 'text-cyan-300' : category === 'laser' ? 'text-orange-300' : 'text-emerald-300'} transition-colors duration-300`} />
              </div>
              <span className={`text-xs font-medium uppercase tracking-wider ${category === 'impresion' ? 'text-cyan-300' : category === 'laser' ? 'text-orange-300' : 'text-emerald-300'}`}>
                {category === 'impresion' ? 'Impresión' : category === 'laser' ? 'Láser' : 'Papelería'}
              </span>
            </div>
            
            {/* Delivery Time Badge */}
            {deliveryTime && (
              <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                <Clock className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-400 font-medium">
                  {deliveryTime.standard}
                </span>
              </div>
            )}
          </div>

          {/* Content at bottom */}
          <div className="text-left">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300">
                {title}
              </h3>
              
              {/* Expand/Collapse Button - Touch-friendly 44px minimum */}
              <button
                ref={expandButtonRef}
                onClick={handleToggleExpand}
                className="min-w-[44px] min-h-[44px] p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent touch-manipulation"
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${title} details`}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-white" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
            
            <p className="text-gray-200 text-sm leading-relaxed mb-3">
              {description}
            </p>

            {/* Example Thumbnails Preview (only when collapsed) */}
            {!isExpanded && previewExamples.length > 0 && (
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs text-gray-400">Ejemplos:</span>
                <div className="flex space-x-1">
                  {previewExamples.map((example, index) => (
                    <div 
                      key={example.id}
                      className="w-8 h-8 rounded border border-white/20 overflow-hidden bg-gray-700"
                    >
                      <Image
                        src={example.imagePath}
                        alt={example.title}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {examples.length > 3 && (
                    <div className="w-8 h-8 rounded border border-white/20 bg-black/40 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">+{examples.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            )}


          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative z-10 bg-gray-900/90 backdrop-blur-sm border-t border-gray-700/50"
            >
              <div className="p-6 space-y-6">
                {/* Delivery Information */}
                {deliveryTime && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                      Tiempos de Entrega
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-black/30 rounded-lg p-3">
                        <span className="text-xs text-gray-400 block">Estándar</span>
                        <span className="text-sm text-white font-medium">{deliveryTime.standard}</span>
                      </div>
                      {deliveryTime.rush && (
                        <div className="bg-black/30 rounded-lg p-3">
                          <span className="text-xs text-gray-400 block">Express</span>
                          <span className="text-sm text-yellow-400 font-medium">{deliveryTime.rush}</span>
                        </div>
                      )}
                    </div>
                    {deliveryTime.notes && (
                      <p className="text-xs text-gray-400 mt-2">{deliveryTime.notes}</p>
                    )}
                  </div>
                )}

                {/* Key Features */}
                {specifications?.features && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Características</h4>
                    <div className="flex flex-wrap gap-2">
                      {specifications.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-black/30 rounded-full text-xs text-gray-300 border border-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Materials */}
                {specifications?.materials && specifications.materials.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Materiales</h4>
                    <div className="flex flex-wrap gap-2">
                      {specifications.materials.map((material, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            category === 'impresion' ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' :
                            category === 'laser' ? 'bg-orange-500/20 text-orange-200 border border-orange-500/30' :
                            'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
                          }`}
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples Gallery */}
                {examples.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Ejemplos de Trabajo</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {examples.slice(0, 6).map((example, index) => (
                        <div 
                          key={example.id}
                          className="aspect-square rounded-lg overflow-hidden bg-gray-700 border border-gray-600 hover:border-gray-500 transition-colors duration-200 touch-manipulation min-h-[44px] cursor-pointer"
                          tabIndex={0}
                          role="button"
                          aria-label={`View example: ${example.title}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              // Handle example click/view
                            }
                          }}
                        >
                          <Image
                            src={example.imagePath}
                            alt={example.title}
                            width={120}
                            height={120}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ))}
                    </div>
                    {examples.length > 6 && (
                      <p className="text-xs text-gray-400 mt-2">
                        Y {examples.length - 6} ejemplos más...
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover effects */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover:opacity-20 
          transition-opacity duration-300 rounded-xl pointer-events-none
        `}></div>
        
        {/* Subtle border effect on hover */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-border opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
}

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {services.map((service) => (
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
        />
      ))}
    </div>
  );
}