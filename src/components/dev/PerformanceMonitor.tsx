"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Image, Zap, Monitor } from 'lucide-react';
import { usePerformanceMonitor } from '@/lib/performance';

interface PerformanceStats {
  fps: number;
  imageLoadTime: number;
  renderTime: number;
  bundleSize: { jsSize: number; cssSize: number };
  connectionQuality: 'slow' | 'fast' | 'unknown';
}

export function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 0,
    imageLoadTime: 0,
    renderTime: 0,
    bundleSize: { jsSize: 0, cssSize: 0 },
    connectionQuality: 'unknown'
  });

  const { 
    startFPSMonitoring, 
    measureImageLoad, 
    measureRenderTime,
    getConnectionQuality 
  } = usePerformanceMonitor();

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // Start FPS monitoring
    const getFPS = startFPSMonitoring();
    
    // Update stats periodically
    const interval = setInterval(() => {
      const currentFPS = getFPS();
      const connectionQuality = getConnectionQuality();
      
      // Measure render time of a simple operation
      const { renderTime } = measureRenderTime(() => {
        return Array.from({ length: 100 }, (_, i) => i);
      });

      setStats(prev => ({
        ...prev,
        fps: currentFPS,
        renderTime,
        connectionQuality
      }));
    }, 1000);

    // Test image load time
    measureImageLoad('/images/services/impresion-digital.webp').then(result => {
      setStats(prev => ({
        ...prev,
        imageLoadTime: result.loadTime
      }));
    });

    return () => {
      clearInterval(interval);
    };
  }, [startFPSMonitoring, measureImageLoad, measureRenderTime, getConnectionQuality]);

  // Toggle visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-400';
    if (value >= thresholds.warning) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getFPSColor = () => getPerformanceColor(stats.fps, { good: 55, warning: 30 });
  const getLoadTimeColor = () => {
    if (stats.imageLoadTime <= 100) return 'text-green-400';
    if (stats.imageLoadTime <= 300) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Performance Monitor (Ctrl+Shift+P)"
      >
        <Activity className="w-5 h-5" />
      </button>

      {/* Performance panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 z-40 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 min-w-[280px] shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center">
                <Monitor className="w-4 h-4 mr-2" />
                Performance Monitor
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {/* FPS */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-gray-300 text-sm">FPS</span>
                </div>
                <span className={`font-mono text-sm ${getFPSColor()}`}>
                  {stats.fps}
                </span>
              </div>

              {/* Image Load Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-gray-300 text-sm">Image Load</span>
                </div>
                <span className={`font-mono text-sm ${getLoadTimeColor()}`}>
                  {stats.imageLoadTime.toFixed(0)}ms
                </span>
              </div>

              {/* Render Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-gray-300 text-sm">Render Time</span>
                </div>
                <span className="font-mono text-sm text-gray-300">
                  {stats.renderTime.toFixed(2)}ms
                </span>
              </div>

              {/* Connection Quality */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Monitor className="w-4 h-4 mr-2 text-orange-400" />
                  <span className="text-gray-300 text-sm">Connection</span>
                </div>
                <span className={`text-sm capitalize ${
                  stats.connectionQuality === 'fast' ? 'text-green-400' :
                  stats.connectionQuality === 'slow' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stats.connectionQuality}
                </span>
              </div>
            </div>

            {/* Performance Tips */}
            <div className="mt-4 pt-3 border-t border-gray-700">
              <div className="text-xs text-gray-400 space-y-1">
                {stats.fps < 30 && (
                  <div className="text-red-400">⚠ Low FPS detected</div>
                )}
                {stats.imageLoadTime > 300 && (
                  <div className="text-yellow-400">⚠ Slow image loading</div>
                )}
                {stats.connectionQuality === 'slow' && (
                  <div className="text-orange-400">📶 Slow connection detected</div>
                )}
                <div className="text-gray-500">Press Ctrl+Shift+P to toggle</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PerformanceMonitor;