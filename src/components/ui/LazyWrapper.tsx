'use client';

import { lazy, Suspense, ComponentType, ReactNode, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkeletonLoader } from './SkeletonLoader';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  delay?: number;
}

// Default loading component
const DefaultFallback = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center p-8 ${className}`}>
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Cargando componente...</p>
    </div>
  </div>
);

// Animated loading wrapper
const AnimatedFallback = ({ 
  variant = 'card',
  className = '' 
}: { 
  variant?: 'card' | 'modal' | 'section';
  className?: string;
}) => {
  const getSkeletonProps = () => {
    switch (variant) {
      case 'modal':
        return { className: 'min-h-[400px] w-full' };
      case 'section':
        return { className: 'min-h-[200px] w-full' };
      default:
        return { className: 'h-full w-full' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <SkeletonLoader variant="card" {...getSkeletonProps()} />
    </motion.div>
  );
};

// Generic lazy wrapper component
export function LazyWrapper({ 
  children, 
  fallback, 
  className = '',
  delay = 0 
}: LazyWrapperProps) {
  const LoadingComponent = fallback || <DefaultFallback className={className} />;

  return (
    <Suspense fallback={LoadingComponent}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.3 }}
        className={className}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}

// HOC for lazy loading components
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  fallbackVariant: 'card' | 'modal' | 'section' = 'card'
) {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));

  return function WrappedComponent(props: P) {
    return (
      <Suspense fallback={<AnimatedFallback variant={fallbackVariant} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Intersection Observer based lazy loading
export function LazyIntersection({
  children,
  fallback,
  className = '',
  rootMargin = '50px',
  threshold = 0.1,
  triggerOnce = true
}: LazyWrapperProps & {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
            observer.disconnect();
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce, hasTriggered]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <LazyWrapper fallback={fallback}>
          {children}
        </LazyWrapper>
      ) : (
        fallback || <DefaultFallback />
      )}
    </div>
  );
}

// Preload utilities for better performance
export const preloadComponent = (componentImport: () => Promise<any>) => {
  // Preload on hover or focus
  const preload = () => {
    componentImport();
  };

  return {
    onMouseEnter: preload,
    onFocus: preload
  };
};

// Bundle splitting utilities
export const createLazyComponent = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallbackVariant: 'card' | 'modal' | 'section' = 'card'
) => {
  const LazyComponent = lazy(importFn);

  return function Component(props: P) {
    return (
      <Suspense fallback={<AnimatedFallback variant={fallbackVariant} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

// Performance monitoring for lazy components
export const withPerformanceMonitoring = <P extends object>(
  Component: ComponentType<P>,
  componentName: string
) => {
  return function MonitoredComponent(props: P) {
    useEffect(() => {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`${componentName} load time: ${loadTime.toFixed(2)}ms`);
        }
        
        // Send to analytics in production
        if (process.env.NODE_ENV === 'production' && window.gtag) {
          window.gtag('event', 'component_load_time', {
            component_name: componentName,
            load_time: Math.round(loadTime)
          });
        }
      };
    }, []);

    return <Component {...props} />;
  };
};