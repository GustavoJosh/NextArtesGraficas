import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';
import { ServiceCardSkeleton, ExampleGallerySkeleton, SpecificationsSkeleton } from '@/components/ui/SkeletonLoader';

// Dynamic import with loading states for better performance
export const DynamicServiceDetailCard = dynamic(
  () => import('@/components/ui/ServiceDetailCard').then(mod => ({ default: mod.ServiceDetailCard })),
  {
    loading: () => React.createElement(ServiceCardSkeleton),
    ssr: true // Enable SSR for SEO
  }
);

export const DynamicServiceDetailGrid = dynamic(
  () => import('@/components/ui/ServiceDetailCard').then(mod => ({ default: mod.ServiceDetailGrid })),
  {
    loading: () => React.createElement('div', 
      { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" },
      Array.from({ length: 6 }, (_, i) => React.createElement(ServiceCardSkeleton, { key: i }))
    ),
    ssr: true
  }
);

export const DynamicExampleGallery = dynamic(
  () => import('@/components/ui/ExampleGallery'),
  {
    loading: () => React.createElement(ExampleGallerySkeleton),
    ssr: false // Gallery can be client-side only for better performance
  }
);

export const DynamicDeliveryTimeline = dynamic(
  () => import('@/components/ui/DeliveryTimeline').then(mod => ({ default: mod.DeliveryTimeline })),
  {
    loading: () => React.createElement('div', 
      { className: "space-y-3" },
      React.createElement('div', 
        { className: "flex items-center space-x-2" },
        React.createElement('div', { className: "w-4 h-4 bg-gray-700 rounded-full animate-pulse" }),
        React.createElement('div', { className: "w-32 h-4 bg-gray-700 rounded animate-pulse" })
      ),
      React.createElement('div', 
        { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" },
        React.createElement('div', { className: "bg-black/30 rounded-lg p-4 border border-gray-700/50 h-16 animate-pulse" }),
        React.createElement('div', { className: "bg-black/30 rounded-lg p-4 border border-yellow-500/30 h-16 animate-pulse" })
      )
    ),
    ssr: false
  }
);

export const DynamicServiceSpecifications = dynamic(
  () => import('@/components/ui/ServiceSpecifications'),
  {
    loading: () => React.createElement(SpecificationsSkeleton),
    ssr: false
  }
);

// Utility function to create dynamic imports with custom loading states
export function createDynamicComponent<T = Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  LoadingComponent?: ComponentType,
  options: {
    ssr?: boolean;
  } = {}
) {
  return dynamic(importFn, {
    loading: LoadingComponent ? () => React.createElement(LoadingComponent) : undefined,
    ssr: options.ssr ?? true
  });
}

// Preload components for better performance
export function preloadComponents() {
  // Preload critical components
  import('@/components/ui/ServiceDetailCard');
  import('@/components/ui/ExampleGallery');
  
  // Preload on user interaction (hover, focus)
  const preloadOnInteraction = () => {
    import('@/components/ui/DeliveryTimeline');
    import('@/components/ui/ServiceSpecifications');
  };

  // Add event listeners for preloading
  if (typeof window !== 'undefined') {
    document.addEventListener('mouseover', preloadOnInteraction, { once: true });
    document.addEventListener('touchstart', preloadOnInteraction, { once: true });
  }
}

const dynamicImports = {
  DynamicServiceDetailCard,
  DynamicServiceDetailGrid,
  DynamicExampleGallery,
  DynamicDeliveryTimeline,
  DynamicServiceSpecifications,
  createDynamicComponent,
  preloadComponents
};

export default dynamicImports;