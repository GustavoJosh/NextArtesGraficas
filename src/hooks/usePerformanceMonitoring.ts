'use client';

import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  componentName: string;
  loadTime: number;
  renderTime: number;
  interactionTime?: number;
}

interface UsePerformanceMonitoringOptions {
  componentName: string;
  trackInteractions?: boolean;
  threshold?: number; // Log only if above threshold (ms)
  enableInProduction?: boolean;
}

export function usePerformanceMonitoring({
  componentName,
  trackInteractions = false,
  threshold = 100,
  enableInProduction = false
}: UsePerformanceMonitoringOptions) {
  const startTimeRef = useRef<number>(performance.now());
  const renderStartRef = useRef<number>(performance.now());
  const interactionStartRef = useRef<number | null>(null);

  // Log performance metrics
  const logMetrics = useCallback((metrics: PerformanceMetrics) => {
    const shouldLog = process.env.NODE_ENV === 'development' || enableInProduction;
    
    if (!shouldLog || metrics.loadTime < threshold) {
      return;
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔍 Performance Metrics: ${metrics.componentName}`);
      console.log(`Load Time: ${metrics.loadTime.toFixed(2)}ms`);
      console.log(`Render Time: ${metrics.renderTime.toFixed(2)}ms`);
      if (metrics.interactionTime) {
        console.log(`Interaction Time: ${metrics.interactionTime.toFixed(2)}ms`);
      }
      console.groupEnd();
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production' && enableInProduction) {
      // Google Analytics 4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'component_performance', {
          component_name: metrics.componentName,
          load_time: Math.round(metrics.loadTime),
          render_time: Math.round(metrics.renderTime),
          interaction_time: metrics.interactionTime ? Math.round(metrics.interactionTime) : undefined
        });
      }

      // Custom analytics endpoint
      if (typeof window !== 'undefined' && window.fetch) {
        fetch('/api/analytics/performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metrics)
        }).catch(() => {
          // Silently fail for analytics
        });
      }
    }
  }, [componentName, threshold, enableInProduction]);

  // Track component mount and unmount
  useEffect(() => {
    const mountTime = performance.now();
    renderStartRef.current = mountTime;

    return () => {
      const unmountTime = performance.now();
      const loadTime = unmountTime - startTimeRef.current;
      const renderTime = unmountTime - renderStartRef.current;

      logMetrics({
        componentName,
        loadTime,
        renderTime,
        interactionTime: interactionStartRef.current 
          ? unmountTime - interactionStartRef.current 
          : undefined
      });
    };
  }, [componentName, logMetrics]);

  // Track interactions
  const trackInteraction = useCallback((interactionType: string) => {
    if (!trackInteractions) return;

    const interactionTime = performance.now();
    interactionStartRef.current = interactionTime;

    // Log interaction immediately for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎯 Interaction: ${componentName} - ${interactionType}`);
    }

    // Send interaction event to analytics
    if (process.env.NODE_ENV === 'production' && enableInProduction) {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'component_interaction', {
          component_name: componentName,
          interaction_type: interactionType,
          timestamp: interactionTime
        });
      }
    }
  }, [componentName, trackInteractions, enableInProduction]);

  // Measure specific operations
  const measureOperation = useCallback((operationName: string, operation: () => void | Promise<void>) => {
    const startTime = performance.now();
    
    const result = operation();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`⏱️ ${componentName} - ${operationName}: ${duration.toFixed(2)}ms`);
        }
      });
    } else {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${componentName} - ${operationName}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    }
  }, [componentName]);

  return {
    trackInteraction,
    measureOperation
  };
}

// Hook for monitoring Core Web Vitals
export function useCoreWebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`📊 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
          }
          
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'web_vitals', {
              metric_name: 'LCP',
              metric_value: Math.round(lastEntry.startTime),
              metric_rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
            });
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    // First Input Delay (FID)
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (process.env.NODE_ENV === 'development') {
              console.log(`📊 FID: ${entry.processingStart - entry.startTime}ms`);
            }
            
            if (typeof window.gtag === 'function') {
              const fid = entry.processingStart - entry.startTime;
              window.gtag('event', 'web_vitals', {
                metric_name: 'FID',
                metric_value: Math.round(fid),
                metric_rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor'
              });
            }
          });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`📊 CLS: ${clsValue.toFixed(4)}`);
          }
          
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'web_vitals', {
              metric_name: 'CLS',
              metric_value: Math.round(clsValue * 1000),
              metric_rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
            });
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Initialize observers
    observeLCP();
    observeFID();
    observeCLS();
  }, []);
}

// Hook for monitoring bundle size and loading performance
export function useBundlePerformance() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor resource loading
    const observeResources = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry) => {
            if (entry.name.includes('.js') || entry.name.includes('.css')) {
              const size = (entry as any).transferSize || 0;
              const loadTime = entry.responseEnd - entry.startTime;
              
              if (process.env.NODE_ENV === 'development' && size > 100000) { // Log large resources
                console.log(`📦 Large Resource: ${entry.name.split('/').pop()}`);
                console.log(`   Size: ${(size / 1024).toFixed(2)}KB`);
                console.log(`   Load Time: ${loadTime.toFixed(2)}ms`);
              }
              
              if (typeof window.gtag === 'function' && size > 500000) { // Track very large resources
                window.gtag('event', 'resource_performance', {
                  resource_name: entry.name.split('/').pop(),
                  resource_size: Math.round(size / 1024),
                  load_time: Math.round(loadTime)
                });
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['resource'] });
      }
    };

    observeResources();
  }, []);
}

// Declare global gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
  }
}