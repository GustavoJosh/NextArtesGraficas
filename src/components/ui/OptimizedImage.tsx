'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  style?: React.CSSProperties;
}

// Default fallback images for different contexts
const DEFAULT_FALLBACKS = {
  service: '/images/web-services/placeholder-service.svg',
  avatar: '/images/placeholder-avatar.svg',
  logo: '/images/placeholder-logo.svg',
  general: '/images/placeholder-general.svg'
};

// Generate a simple blur data URL using a static base64 string
const generateBlurDataURL = (width: number = 10, height: number = 10) => {
  // Static blur data URL that works on both server and client
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1f2937;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>`
  ).toString('base64')}`;
};

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  fallbackSrc,
  onLoad,
  onError,
  sizes,
  style
}: OptimizedImageProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  // Determine fallback image based on alt text or use provided fallback
  const getFallbackSrc = useCallback(() => {
    if (fallbackSrc) return fallbackSrc;
    
    const altLower = alt.toLowerCase();
    if (altLower.includes('service') || altLower.includes('servicio')) {
      return DEFAULT_FALLBACKS.service;
    }
    if (altLower.includes('avatar') || altLower.includes('profile')) {
      return DEFAULT_FALLBACKS.avatar;
    }
    if (altLower.includes('logo')) {
      return DEFAULT_FALLBACKS.logo;
    }
    
    return DEFAULT_FALLBACKS.general;
  }, [alt, fallbackSrc]);

  const handleLoad = useCallback(() => {
    setImageState('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (!hasTriedFallback) {
      // Try fallback image
      setCurrentSrc(getFallbackSrc());
      setHasTriedFallback(true);
      setImageState('loading');
    } else {
      // Fallback also failed
      setImageState('error');
    }
    onError?.();
  }, [hasTriedFallback, getFallbackSrc, onError]);

  // Generate blur data URL if not provided and placeholder is blur
  const blurData = blurDataURL || (
    placeholder === 'blur' 
      ? generateBlurDataURL(width || 400, height || 300)
      : undefined
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className={`bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse flex items-center justify-center ${className}`}>
      <ImageIcon className="w-8 h-8 text-gray-500" />
    </div>
  );

  // Error fallback component
  const ErrorFallback = () => (
    <div className={`bg-gray-800 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-gray-400 ${className}`}>
      <AlertCircle className="w-8 h-8 mb-2" />
      <span className="text-sm text-center px-2">
        Error al cargar imagen
      </span>
    </div>
  );

  // Show error state if both original and fallback failed
  if (imageState === 'error') {
    return <ErrorFallback />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Loading skeleton */}
      {imageState === 'loading' && (
        <div className="absolute inset-0">
          <LoadingSkeleton />
        </div>
      )}

      {/* Optimized Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: imageState === 'loaded' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full"
      >
        <Image
          src={currentSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={fill ? 'object-cover' : ''}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurData}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes || (fill ? '100vw' : undefined)}
          // Performance optimizations
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </motion.div>

      {/* Progressive loading indicator */}
      {imageState === 'loading' && (
        <div className="absolute bottom-2 right-2">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Specialized components for common use cases
export function ServiceImage({ 
  src, 
  alt, 
  className = '', 
  priority = false 
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      quality={80}
      fallbackSrc={DEFAULT_FALLBACKS.service}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export function AvatarImage({ 
  src, 
  alt, 
  size = 40,
  className = '' 
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      quality={90}
      fallbackSrc={DEFAULT_FALLBACKS.avatar}
    />
  );
}

export function LogoImage({ 
  src, 
  alt, 
  width = 120, 
  height = 40,
  className = '' 
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
      quality={95}
      fallbackSrc={DEFAULT_FALLBACKS.logo}
    />
  );
}