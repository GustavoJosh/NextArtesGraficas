"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Info } from 'lucide-react';
import { Badge } from './badge';

export interface DeliveryTimelineProps {
  deliveryTime: {
    standard: string;
    rush?: string;
    notes?: string;
  };
  className?: string;
}

export function DeliveryTimeline({ deliveryTime, className = '' }: DeliveryTimelineProps) {
  const hasRushOption = Boolean(deliveryTime.rush);

  return (
    <div 
      className={`space-y-4 ${className}`}
      role="region"
      aria-labelledby="delivery-timeline-heading"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-400" aria-hidden="true" />
        <h4 id="delivery-timeline-heading" className="text-sm font-semibold text-gray-200">
          Tiempos de Entrega
        </h4>
      </div>

      {/* Timeline Container */}
      <div className="space-y-3" role="list" aria-label="Opciones de entrega disponibles">
        {/* Standard Delivery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 min-h-[44px]"
          role="listitem"
          aria-label={`Entrega estándar: ${deliveryTime.standard}`}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0" 
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-gray-200">Entrega Estándar</p>
              <p className="text-xs text-gray-400">Tiempo regular de producción</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="bg-blue-500/20 text-blue-300 border-blue-500/30"
            role="status"
            aria-label={`Tiempo de entrega estándar: ${deliveryTime.standard}`}
          >
            {deliveryTime.standard}
          </Badge>
        </motion.div>

        {/* Rush Delivery (if available) */}
        {hasRushOption && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/30 min-h-[44px]"
            role="listitem"
            aria-label={`Entrega express: ${deliveryTime.rush}`}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex-shrink-0" 
                aria-hidden="true"
              />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-gray-200">Entrega Express</p>
                  <p className="text-xs text-gray-400">Producción prioritaria</p>
                </div>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-orange-500/20 text-orange-300 border-orange-500/30"
              role="status"
              aria-label={`Tiempo de entrega express: ${deliveryTime.rush}`}
            >
              {deliveryTime.rush}
            </Badge>
          </motion.div>
        )}

        {/* Progress Bar Visualization */}
        <div 
          className="relative mt-4" 
          role="img" 
          aria-label={`Visualización de tiempos de entrega: estándar ${deliveryTime.standard}${hasRushOption ? `, express ${deliveryTime.rush}` : ''}`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Inicio</span>
            <span className="text-xs text-gray-400">Entrega</span>
          </div>
          
          {/* Timeline Bar */}
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            {/* Standard timeline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: hasRushOption ? '70%' : '100%' }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
              aria-label="Tiempo de entrega estándar"
            />
            
            {/* Rush timeline overlay */}
            {hasRushOption && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '40%' }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                aria-label="Tiempo de entrega express"
              />
            )}
          </div>

          {/* Timeline markers */}
          <div className="flex justify-between mt-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            {hasRushOption && (
              <div className="w-2 h-2 bg-orange-400 rounded-full" style={{ marginLeft: '38%' }} />
            )}
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
          </div>
        </div>

        {/* Additional Notes */}
        {deliveryTime.notes && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-start gap-2 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 min-h-[44px]"
            role="note"
            aria-label="Información adicional sobre tiempos de entrega"
          >
            <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-xs text-gray-400 leading-relaxed">
              {deliveryTime.notes}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Compact version for use in cards
export function DeliveryTimelineBadge({ deliveryTime, showRush = true }: { 
  deliveryTime: DeliveryTimelineProps['deliveryTime']; 
  showRush?: boolean;
}) {
  const hasRushOption = Boolean(deliveryTime.rush);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
        <Clock className="w-3 h-3 mr-1" />
        {deliveryTime.standard}
      </Badge>
      
      {hasRushOption && showRush && (
        <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
          <Zap className="w-3 h-3 mr-1" />
          {deliveryTime.rush}
        </Badge>
      )}
    </div>
  );
}