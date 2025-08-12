// Custom hook for managing animations with reduced motion support
import { useEffect, useState, useMemo } from 'react';
import { Variants } from 'framer-motion';
import { getMotionVariants } from '@/lib/animations';
import { usePerformanceMonitor } from '@/lib/performance';

export interface UseAnimationsOptions {
  respectReducedMotion?: boolean;
  enableHoverEffects?: boolean;
  enableMicroInteractions?: boolean;
}

export function useAnimations(
  variants: Variants,
  options: UseAnimationsOptions = {}
) {
  const {
    respectReducedMotion = true,
    enableHoverEffects = true,
    enableMicroInteractions = true
  } = options;

  const { prefersReducedMotion } = usePerformanceMonitor();
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (respectReducedMotion) {
      setIsReducedMotion(prefersReducedMotion());
    }
  }, [respectReducedMotion, prefersReducedMotion]);

  const animationVariants = useMemo(() => {
    return getMotionVariants(variants, isReducedMotion);
  }, [variants, isReducedMotion]);

  const shouldAnimate = useMemo(() => {
    return !isReducedMotion || !respectReducedMotion;
  }, [isReducedMotion, respectReducedMotion]);

  const hoverProps = useMemo(() => {
    if (!enableHoverEffects || isReducedMotion) {
      return {};
    }
    return {
      whileHover: "hover",
      whileTap: "tap"
    };
  }, [enableHoverEffects, isReducedMotion]);

  const microInteractionProps = useMemo(() => {
    if (!enableMicroInteractions || isReducedMotion) {
      return {};
    }
    return {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.15 }
    };
  }, [enableMicroInteractions, isReducedMotion]);

  return {
    variants: animationVariants,
    shouldAnimate,
    isReducedMotion,
    hoverProps,
    microInteractionProps
  };
}

// Hook for stagger animations
export function useStaggerAnimation(itemCount: number, delay: number = 0.05) {
  const { prefersReducedMotion } = usePerformanceMonitor();
  const isReducedMotion = prefersReducedMotion();

  const staggerDelay = useMemo(() => {
    return isReducedMotion ? 0 : delay;
  }, [isReducedMotion, delay]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: isReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: isReducedMotion ? 0 : 0.1
      }
    }
  }), [isReducedMotion, staggerDelay]);

  const itemVariants = useMemo(() => ({
    hidden: {
      opacity: isReducedMotion ? 1 : 0,
      y: isReducedMotion ? 0 : 10,
      scale: isReducedMotion ? 1 : 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isReducedMotion ? 0 : 0.3,
        ease: "easeOut"
      }
    }
  }), [isReducedMotion]);

  return {
    containerVariants,
    itemVariants,
    isReducedMotion
  };
}

// Hook for loading animations
export function useLoadingAnimation() {
  const { prefersReducedMotion } = usePerformanceMonitor();
  const isReducedMotion = prefersReducedMotion();

  const loadingVariants = useMemo(() => ({
    loading: {
      opacity: isReducedMotion ? 0.7 : 0,
      scale: isReducedMotion ? 1 : 1.1
    },
    loaded: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: isReducedMotion ? 0 : 0.3,
        ease: "easeOut"
      }
    }
  }), [isReducedMotion]);

  const shimmerProps = useMemo(() => {
    if (isReducedMotion) {
      return {
        className: "bg-gray-700"
      };
    }
    return {
      className: "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] animate-shimmer"
    };
  }, [isReducedMotion]);

  return {
    loadingVariants,
    shimmerProps,
    isReducedMotion
  };
}

// Hook for hover effects with performance optimization
export function useHoverEffects(enabled: boolean = true) {
  const { prefersReducedMotion } = usePerformanceMonitor();
  const isReducedMotion = prefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const hoverHandlers = useMemo(() => {
    if (!enabled || isReducedMotion) {
      return {};
    }

    return {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    };
  }, [enabled, isReducedMotion]);

  const hoverVariants = useMemo(() => ({
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      scale: isReducedMotion ? 1 : 1.02,
      y: isReducedMotion ? 0 : -2,
      boxShadow: isReducedMotion 
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: isReducedMotion ? 0 : 0.15,
        ease: "easeOut"
      }
    }
  }), [isReducedMotion]);

  return {
    isHovered,
    hoverHandlers,
    hoverVariants,
    shouldAnimate: !isReducedMotion && enabled
  };
}

export default useAnimations;