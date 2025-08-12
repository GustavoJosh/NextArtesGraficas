// Performance monitoring utilities

export interface PerformanceMetrics {
  fps: number;
  loadTime: number;
  renderTime: number;
  imageLoadTime: number;
}

class PerformanceMonitor {
  private fpsCounter: number = 0;
  private lastTime: number = 0;
  private frameCount: number = 0;
  private isMonitoring: boolean = false;

  // Monitor FPS for animations
  startFPSMonitoring(): () => number {
    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.frameCount = 0;

    const measureFrame = () => {
      if (!this.isMonitoring) return this.fpsCounter;

      this.frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - this.lastTime >= 1000) {
        this.fpsCounter = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
      }

      requestAnimationFrame(measureFrame);
      return this.fpsCounter;
    };

    requestAnimationFrame(measureFrame);

    return () => {
      this.isMonitoring = false;
      return this.fpsCounter;
    };
  }

  // Measure component render time
  measureRenderTime<T>(fn: () => T): { result: T; renderTime: number } {
    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    
    return {
      result,
      renderTime: endTime - startTime
    };
  }

  // Measure image load time
  measureImageLoad(src: string): Promise<{ loadTime: number; success: boolean }> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const img = new Image();
      
      img.onload = () => {
        const loadTime = performance.now() - startTime;
        resolve({ loadTime, success: true });
      };
      
      img.onerror = () => {
        const loadTime = performance.now() - startTime;
        resolve({ loadTime, success: false });
      };
      
      img.src = src;
    });
  }

  // Check if user prefers reduced motion
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Get connection quality
  getConnectionQuality(): 'slow' | 'fast' | 'unknown' {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.effectiveType === '4g') return 'fast';
      if (connection.effectiveType === '3g' || connection.effectiveType === '2g') return 'slow';
    }
    return 'unknown';
  }

  // Bundle size analysis
  getBundleInfo(): { jsSize: number; cssSize: number } {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    // This is a simplified version - in production you'd want more detailed analysis
    return {
      jsSize: scripts.length,
      cssSize: stylesheets.length
    };
  }
}

export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  return {
    measureRenderTime: performanceMonitor.measureRenderTime.bind(performanceMonitor),
    measureImageLoad: performanceMonitor.measureImageLoad.bind(performanceMonitor),
    startFPSMonitoring: performanceMonitor.startFPSMonitoring.bind(performanceMonitor),
    prefersReducedMotion: performanceMonitor.prefersReducedMotion.bind(performanceMonitor),
    getConnectionQuality: performanceMonitor.getConnectionQuality.bind(performanceMonitor)
  };
}

// Utility to preload critical images
export function preloadImages(imageSrcs: string[]): Promise<void[]> {
  const promises = imageSrcs.map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  });

  return Promise.all(promises);
}

// Utility to generate blur data URL for placeholder
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#374151'); // gray-700
  gradient.addColorStop(1, '#1f2937'); // gray-800
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

export default performanceMonitor;