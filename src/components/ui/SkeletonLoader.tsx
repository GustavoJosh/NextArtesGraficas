"use client";

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className = '', animate = true }: SkeletonProps) {
  const baseClasses = "bg-gray-700 rounded";
  const animationClasses = animate ? "animate-pulse" : "";
  
  return (
    <div className={`${baseClasses} ${animationClasses} ${className}`} />
  );
}

// Service card skeleton
export function ServiceCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden ${className}`}>
      <div className="relative h-64">
        {/* Image skeleton */}
        <Skeleton className="absolute inset-0" />
        
        {/* Content overlay skeleton */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30">
          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            {/* Header skeleton */}
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-9 h-9 rounded-full" />
                <Skeleton className="w-16 h-4" />
              </div>
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
            
            {/* Content skeleton */}
            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
              
              <div className="space-y-2 mb-3">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
              </div>
              
              {/* Example thumbnails skeleton */}
              <div className="flex items-center space-x-2 mb-2">
                <Skeleton className="w-12 h-3" />
                <div className="flex space-x-1">
                  <Skeleton className="w-8 h-8 rounded" />
                  <Skeleton className="w-8 h-8 rounded" />
                  <Skeleton className="w-8 h-8 rounded" />
                </div>
              </div>
              
              {/* Pricing skeleton */}
              <div className="text-right">
                <Skeleton className="w-20 h-4 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Example gallery skeleton
export function ExampleGallerySkeleton({ 
  columns = 3, 
  rows = 2,
  className = '' 
}: { 
  columns?: number;
  rows?: number;
  className?: string;
}) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const items = Array.from({ length: columns * rows }, (_, i) => i);

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-4 ${className}`}>
      {items.map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: item * 0.1 }}
          className="aspect-square"
        >
          <Skeleton className="w-full h-full rounded-lg" />
        </motion.div>
      ))}
    </div>
  );
}

// Delivery timeline skeleton
export function DeliveryTimelineSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="w-32 h-4" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-black/30 rounded-lg p-4 border border-gray-700/50">
          <Skeleton className="w-16 h-3 mb-2" />
          <Skeleton className="w-24 h-4" />
        </div>
        <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/30">
          <Skeleton className="w-12 h-3 mb-2" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
    </div>
  );
}

// Specifications skeleton
export function SpecificationsSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Features */}
      <div>
        <Skeleton className="w-24 h-4 mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="w-20 h-6 rounded-full" />
          ))}
        </div>
      </div>
      
      {/* Technical specs */}
      <div>
        <Skeleton className="w-36 h-4 mb-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-black/20 rounded-lg p-4 border border-gray-700/50">
            <Skeleton className="w-20 h-3 mb-2" />
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="bg-black/20 rounded-lg p-4 border border-gray-700/50">
            <Skeleton className="w-24 h-3 mb-2" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
      </div>
      
      {/* Materials */}
      <div>
        <Skeleton className="w-32 h-4 mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="w-16 h-6 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skeleton;