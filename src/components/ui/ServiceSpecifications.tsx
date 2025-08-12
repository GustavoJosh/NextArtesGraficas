// src/components/ui/ServiceSpecifications.tsx
"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, Ruler, Hash, Star } from 'lucide-react';
import { Badge } from './badge';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { cn } from '@/lib/utils';

interface ServiceSpecificationsProps {
  specifications: {
    materials?: string[];
    maxSize?: string;
    minQuantity?: number;
    features: string[];
  };
  pricing?: {
    startingFrom?: string;
    unit?: string;
  };
  className?: string;
}

interface ExpandableSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

function ExpandableSection({ 
  title, 
  icon: Icon, 
  children, 
  defaultExpanded = false,
  className 
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentId = `expandable-content-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const buttonId = `expandable-button-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={cn("border border-gray-200 rounded-lg overflow-hidden", className)}>
      <button
        id={buttonId}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between min-h-[44px] p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset touch-manipulation"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        aria-label={`${isExpanded ? 'Contraer' : 'Expandir'} sección de ${title}`}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-gray-600" aria-hidden="true" />
          <span className="font-medium text-gray-900 text-left">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
        )}
      </button>
      
      <div 
        id={contentId}
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        aria-labelledby={buttonId}
        role="region"
      >
        <div className="p-4 bg-white border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}

function MaterialChips({ materials }: { materials: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {materials.map((material, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-200"
        >
          {material}
        </Badge>
      ))}
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-2" role="list" aria-label="Lista de características del servicio">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start space-x-2" role="listitem">
          <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span className="text-gray-700 text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceSpecifications({ 
  specifications, 
  pricing, 
  className 
}: ServiceSpecificationsProps) {
  const { materials, maxSize, minQuantity, features } = specifications;

  return (
    <Card className={cn("w-full", className)} role="region" aria-labelledby="specifications-title">
      <CardHeader>
        <CardTitle id="specifications-title" className="text-lg font-semibold text-gray-900">
          Especificaciones Técnicas
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Materials Section */}
        {materials && materials.length > 0 && (
          <ExpandableSection
            title="Materiales Disponibles"
            icon={Package}
            defaultExpanded={true}
          >
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">
                Materiales compatibles con este servicio:
              </p>
              <MaterialChips materials={materials} />
            </div>
          </ExpandableSection>
        )}

        {/* Technical Specifications */}
        <ExpandableSection
          title="Especificaciones"
          icon={Ruler}
          defaultExpanded={false}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {maxSize && (
              <div className="space-y-1">
                <dt className="text-sm font-medium text-gray-600">Tamaño Máximo</dt>
                <dd className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                  {maxSize}
                </dd>
              </div>
            )}
            
            {minQuantity && (
              <div className="space-y-1">
                <dt className="text-sm font-medium text-gray-600">Cantidad Mínima</dt>
                <dd className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                  {minQuantity} {minQuantity === 1 ? 'pieza' : 'piezas'}
                </dd>
              </div>
            )}
            
            {pricing && (
              <>
                {pricing.startingFrom && (
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-600">Precio</dt>
                    <dd className="text-sm text-gray-900 font-semibold text-green-600">
                      {pricing.startingFrom}
                      {pricing.unit && (
                        <span className="text-gray-500 font-normal ml-1">
                          {pricing.unit}
                        </span>
                      )}
                    </dd>
                  </div>
                )}
              </>
            )}
          </div>
        </ExpandableSection>

        {/* Features Section */}
        {features && features.length > 0 && (
          <ExpandableSection
            title="Características y Capacidades"
            icon={Star}
            defaultExpanded={false}
          >
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">
                Características principales de este servicio:
              </p>
              <FeatureList features={features} />
            </div>
          </ExpandableSection>
        )}
      </CardContent>
    </Card>
  );
}

export default ServiceSpecifications;