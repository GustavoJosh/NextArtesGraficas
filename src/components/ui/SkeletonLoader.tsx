"use client";

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'card' | 'text' | 'image' | 'button' | 'filter';
  count?: number;
}

const skeletonVariants = {
  pulse: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function SkeletonLoader({ 
  className = "", 
  variant = "card",
  count = 1 
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <motion.div 
            className={`bg-gray-800 rounded-xl p-6 ${className}`}
            variants={skeletonVariants}
            animate="pulse"
          >
            {/* Image skeleton */}
            <div className="bg-gray-700 rounded-lg h-48 mb-4" />
            
            {/* Title skeleton */}
            <div className="bg-gray-700 rounded h-6 mb-3 w-3/4" />
            
            {/* Description skeleton */}
            <div className="space-y-2 mb-4">
              <div className="bg-gray-700 rounded h-4 w-full" />
              <div className="bg-gray-700 rounded h-4 w-5/6" />
            </div>
            
            {/* Tags skeleton */}
            <div className="flex gap-2 mb-4">
              <div className="bg-gray-700 rounded-full h-6 w-16" />
              <div className="bg-gray-700 rounded-full h-6 w-20" />
              <div className="bg-gray-700 rounded-full h-6 w-14" />
            </div>
            
            {/* Price and button skeleton */}
            <div className="flex justify-between items-center">
              <div className="bg-gray-700 rounded h-6 w-24" />
              <div className="bg-gray-700 rounded-lg h-10 w-32" />
            </div>
          </motion.div>
        );

      case 'text':
        return (
          <motion.div 
            className={`space-y-2 ${className}`}
            variants={skeletonVariants}
            animate="pulse"
          >
            <div className="bg-gray-700 rounded h-4 w-full" />
            <div className="bg-gray-700 rounded h-4 w-4/5" />
            <div className="bg-gray-700 rounded h-4 w-3/4" />
          </motion.div>
        );

      case 'image':
        return (
          <motion.div 
            className={`bg-gray-700 rounded-lg ${className}`}
            variants={skeletonVariants}
            animate="pulse"
          />
        );

      case 'button':
        return (
          <motion.div 
            className={`bg-gray-700 rounded-lg h-10 ${className}`}
            variants={skeletonVariants}
            animate="pulse"
          />
        );

      case 'filter':
        return (
          <motion.div 
            className={`bg-gray-800 rounded-xl p-6 ${className}`}
            variants={skeletonVariants}
            animate="pulse"
          >
            {/* Search bar skeleton */}
            <div className="bg-gray-700 rounded-lg h-12 mb-6" />
            
            {/* Filter buttons skeleton */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-gray-700 rounded-full h-10 w-24" />
              <div className="bg-gray-700 rounded-full h-10 w-32" />
              <div className="bg-gray-700 rounded-full h-10 w-28" />
              <div className="bg-gray-700 rounded-full h-10 w-36" />
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div 
            className={`bg-gray-700 rounded ${className}`}
            variants={skeletonVariants}
            animate="pulse"
          />
        );
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}

// Specialized skeleton components for common use cases
export function ServiceCardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonLoader variant="card" count={count} />
    </div>
  );
}

export function FilterBarSkeleton() {
  return <SkeletonLoader variant="filter" className="mb-8" />;
}

export function PageHeaderSkeleton() {
  return (
    <motion.div 
      className="mb-8"
      variants={skeletonVariants}
      animate="pulse"
    >
      <div className="bg-gray-700 rounded h-12 w-1/2 mb-4" />
      <div className="bg-gray-700 rounded h-6 w-3/4" />
    </motion.div>
  );
}