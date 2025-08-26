'use client';

import { motion } from 'framer-motion';
import { 
  ImageIcon, 
  FileText, 
  Star, 
  MessageSquare, 
  Globe, 
  Phone, 
  Mail,
  AlertCircle,
  Info
} from 'lucide-react';

interface FallbackContentProps {
  className?: string;
  variant?: 'image' | 'text' | 'testimonial' | 'feature' | 'contact' | 'data';
  message?: string;
  showIcon?: boolean;
  animated?: boolean;
}

const fallbackVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1
  }
};

export function FallbackContent({
  className = '',
  variant = 'data',
  message,
  showIcon = true,
  animated = true
}: FallbackContentProps) {
  const getIconAndMessage = () => {
    switch (variant) {
      case 'image':
        return {
          icon: <ImageIcon className="w-8 h-8 text-gray-500" />,
          defaultMessage: 'Imagen no disponible'
        };
      case 'text':
        return {
          icon: <FileText className="w-8 h-8 text-gray-500" />,
          defaultMessage: 'Contenido no disponible'
        };
      case 'testimonial':
        return {
          icon: <MessageSquare className="w-8 h-8 text-gray-500" />,
          defaultMessage: 'Testimonios no disponibles'
        };
      case 'feature':
        return {
          icon: <Star className="w-8 h-8 text-gray-500" />,
          defaultMessage: 'Características no disponibles'
        };
      case 'contact':
        return {
          icon: <Phone className="w-8 h-8 text-gray-500" />,
          defaultMessage: 'Información de contacto no disponible'
        };
      default:
        return {
          icon: <Info className="w-8 h-8 text-gray-500" />,
          defaultMessage: 'Información no disponible'
        };
    }
  };

  const { icon, defaultMessage } = getIconAndMessage();
  const displayMessage = message || defaultMessage;

  const content = (
    <div className={`flex flex-col items-center justify-center text-center p-6 ${className}`}>
      {showIcon && (
        <div className="mb-3 opacity-60">
          {icon}
        </div>
      )}
      <p className="text-gray-400 text-sm">
        {displayMessage}
      </p>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        variants={fallbackVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Specialized fallback components
export function ImageFallback({ 
  className = '', 
  message = 'Imagen no disponible',
  aspectRatio = 'aspect-video'
}: {
  className?: string;
  message?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={`${aspectRatio} bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg ${className}`}>
      <FallbackContent 
        variant="image" 
        message={message}
        className="h-full"
      />
    </div>
  );
}

export function TestimonialFallback({ 
  className = '',
  count = 3
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-1" />
              <div className="h-3 bg-gray-700/70 rounded w-1/4" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700/50 rounded w-full" />
            <div className="h-3 bg-gray-700/50 rounded w-3/4" />
          </div>
        </motion.div>
      ))}
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">
          Los testimonios se cargarán próximamente
        </p>
      </div>
    </div>
  );
}

export function FeatureListFallback({ 
  className = '',
  count = 5
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-3 p-2"
        >
          <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full" />
          </div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700/50 rounded w-3/4" />
          </div>
        </motion.div>
      ))}
      <div className="text-center py-2">
        <p className="text-gray-500 text-xs">
          Características no disponibles
        </p>
      </div>
    </div>
  );
}

export function ContactInfoFallback({ 
  className = ''
}: {
  className?: string;
}) {
  const contactMethods = [
    { icon: Phone, label: 'Teléfono', fallback: 'No disponible' },
    { icon: Mail, label: 'Email', fallback: 'No disponible' },
    { icon: Globe, label: 'Sitio web', fallback: 'No disponible' }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {contactMethods.map((method, index) => (
        <motion.div
          key={method.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
        >
          <method.icon className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-300">{method.label}</p>
            <p className="text-xs text-gray-500">{method.fallback}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function PricingFallback({ 
  className = ''
}: {
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 text-center ${className}`}
    >
      <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-3" />
      <h4 className="text-white font-medium mb-2">Precio personalizado</h4>
      <p className="text-gray-400 text-sm mb-4">
        El precio de este servicio se determina según tus necesidades específicas.
      </p>
      <button className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-colors text-sm">
        Solicitar cotización
      </button>
    </motion.div>
  );
}

export function GalleryFallback({ 
  className = '',
  count = 3
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="aspect-video bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg"
        >
          <FallbackContent 
            variant="image" 
            message="Vista previa no disponible"
            className="h-full"
          />
        </motion.div>
      ))}
    </div>
  );
}

// Generic data fallback with retry functionality
export function DataFallback({ 
  className = '',
  message = 'No se pudieron cargar los datos',
  onRetry,
  showRetry = false
}: {
  className?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center p-8 ${className}`}
    >
      <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">
        Datos no disponibles
      </h3>
      <p className="text-gray-400 mb-6">
        {message}
      </p>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Reintentar
        </button>
      )}
    </motion.div>
  );
}