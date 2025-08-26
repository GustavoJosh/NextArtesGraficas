"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, MessageSquare, Clock, Star, ExternalLink } from 'lucide-react';
import { ServiceImage } from '@/components/ui/OptimizedImage';
import { ServiceCardErrorBoundary } from './ErrorBoundaries';
import { ImageFallback, PricingFallback } from '@/components/ui/FallbackContent';
import type { WebService } from '@/data/webServices';

interface WebServiceCardProps {
  service: WebService;
  onViewDetails: (service: WebService) => void;
  onRequestQuote: (service: WebService) => void;
  index: number; // For staggered animations
}

// Animation variants for the card
const cardVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }
};

// Animation variants for technology badges
const badgeVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.15 }
  }
};

// Get color classes based on category
const getCategoryColors = (categoryId: string) => {
  switch (categoryId) {
    case 'qr-menus':
      return {
        gradient: 'from-emerald-500 to-teal-600',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        hover: 'hover:bg-emerald-500/20'
      };
    case 'websites':
      return {
        gradient: 'from-blue-500 to-indigo-600',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        hover: 'hover:bg-blue-500/20'
      };
    case 'digital-cards':
      return {
        gradient: 'from-purple-500 to-pink-600',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        hover: 'hover:bg-purple-500/20'
      };
    case 'custom-solutions':
      return {
        gradient: 'from-orange-500 to-red-600',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        hover: 'hover:bg-orange-500/20'
      };
    default:
      return {
        gradient: 'from-gray-500 to-slate-600',
        text: 'text-gray-400',
        bg: 'bg-gray-500/10',
        border: 'border-gray-500/20',
        hover: 'hover:bg-gray-500/20'
      };
  }
};

export function WebServiceCard({ service, onViewDetails, onRequestQuote, index }: WebServiceCardProps) {
  const colors = getCategoryColors(service.category.id);
  const featuredImage = service.gallery?.find(img => img.featured) || service.gallery?.[0];

  // Get average rating from testimonials with fallback
  const averageRating = service.testimonials?.length > 0
    ? service.testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / service.testimonials.length
    : 0;

  const handleViewDetails = () => {
    onViewDetails(service);
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRequestQuote(service);
  };

  const CardErrorBoundary = process.env.NODE_ENV === 'test' ? 
    ({ children }: { children: React.ReactNode }) => <>{children}</> : 
    ServiceCardErrorBoundary;

  return (
    <CardErrorBoundary>
      <motion.div
        className="group cursor-pointer"
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        onClick={handleViewDetails}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        // Staggered entrance animation
        style={{
          animationDelay: `${index * 0.1}s`
        }}
      >
        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 overflow-hidden h-full flex flex-col">

        {/* Service Image with Progressive Loading */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {featuredImage ? (
            <ServiceImage
              src={featuredImage.url}
              alt={service.title || 'Servicio web'}
              className="transition-all duration-500 group-hover:scale-105"
              priority={index < 6}
            />
          ) : (
            <ImageFallback 
              message="Vista previa no disponible"
              aspectRatio="aspect-[16/10]"
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category badge */}
          {service.category && (
            <div className="absolute top-4 left-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-sm`}>
                {service.category.name || 'Servicio'}
              </div>
            </div>
          )}

          {/* Complexity indicator */}
          <div className="absolute top-4 right-4">
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-black/40 text-white border border-white/20 backdrop-blur-sm">
              {service.complexity === 'basic' ? 'Básico' :
                service.complexity === 'standard' ? 'Estándar' : 'Premium'}
            </div>
          </div>

          {/* Demo link if available */}
          {service.demoUrl && (
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-2 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-sm hover:bg-black/60 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title and Rating */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300 leading-tight flex-1 pr-2">
              {service.title || 'Servicio sin título'}
            </h3>

            {/* Rating stars */}
            {averageRating > 0 && (
              <div className="flex items-center space-x-1 flex-shrink-0">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-yellow-400 font-medium">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
            {service.description || 'Descripción no disponible para este servicio.'}
          </p>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {service.technologies?.slice(0, 4).map((tech) => (
              <motion.span
                key={tech}
                variants={badgeVariants}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50 hover:border-gray-500/50 transition-colors"
              >
                {tech}
              </motion.span>
            )) || (
              <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-md border border-gray-600/50">
                Tecnologías no especificadas
              </span>
            )}
            {service.technologies && service.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-md border border-gray-600/50">
                +{service.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Pricing and delivery info */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">{service.estimatedDelivery || 'Tiempo a consultar'}</span>
            </div>

            {service.pricing ? (
              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  ${service.pricing.starting || 0}
                  <span className="text-sm text-gray-400 font-normal ml-1">
                    {service.pricing.currency || 'USD'}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {service.pricing.billing === 'one-time' ? 'Pago único' :
                    service.pricing.billing === 'monthly' ? 'Mensual' : 'Personalizado'}
                </div>
              </div>
            ) : (
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  Precio a consultar
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3 mt-auto">
            <button
              onClick={handleViewDetails}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200 group/btn"
            >
              <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span className="text-sm font-medium">Ver Detalles</span>
            </button>

            <button
              onClick={handleRequestQuote}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white rounded-lg transition-all duration-200 group/btn shadow-lg hover:shadow-xl`}
            >
              <MessageSquare className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span className="text-sm font-medium">Cotizar</span>
            </button>
          </div>
        </div>

        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl`} />

        {/* Subtle border effect on hover */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-border opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
    </CardErrorBoundary>
  );
}