// Animation utilities and constants for consistent micro-interactions
import { Variants, Transition } from 'framer-motion';

// Animation duration constants
export const ANIMATION_DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8
} as const;

// Easing functions
export const EASING = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 400, damping: 10 }
} as const;

// Common transition configurations
export const TRANSITIONS = {
  smooth: {
    duration: ANIMATION_DURATIONS.normal,
    ease: EASING.easeInOut
  },
  quick: {
    duration: ANIMATION_DURATIONS.fast,
    ease: EASING.easeOut
  },
  spring: EASING.spring,
  bouncy: EASING.bouncy
} as const;

// Service card animation variants
export const serviceCardVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
    rotateX: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: {
    scale: 1.02,
    y: -4,
    rotateX: 2,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: TRANSITIONS.quick
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: { duration: 0.1 }
  },
  expanded: {
    scale: 1.03,
    y: -8,
    zIndex: 10,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: TRANSITIONS.smooth
  }
};

// Button animation variants
export const buttonVariants: Variants = {
  initial: {
    scale: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: TRANSITIONS.quick
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Icon animation variants
export const iconVariants: Variants = {
  initial: {
    rotate: 0,
    scale: 1
  },
  hover: {
    rotate: 5,
    scale: 1.1,
    transition: TRANSITIONS.quick
  },
  tap: {
    rotate: -5,
    scale: 0.9,
    transition: { duration: 0.1 }
  }
};

// Chevron rotation variants
export const chevronVariants: Variants = {
  collapsed: {
    rotate: 0,
    transition: TRANSITIONS.smooth
  },
  expanded: {
    rotate: 180,
    transition: TRANSITIONS.smooth
  }
};

// Content reveal variants
export const contentRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.easeInOut
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.easeInOut,
      delay: 0.1
    }
  }
};

// Stagger animation for lists
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: TRANSITIONS.smooth
  }
};

// Image loading animation variants
export const imageVariants: Variants = {
  loading: {
    opacity: 0,
    scale: 1.1
  },
  loaded: {
    opacity: 1,
    scale: 1,
    transition: TRANSITIONS.smooth
  },
  error: {
    opacity: 0.5,
    scale: 0.95,
    transition: TRANSITIONS.smooth
  }
};

// Badge animation variants
export const badgeVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 0.9
  },
  hover: {
    scale: 1.05,
    opacity: 1,
    transition: TRANSITIONS.quick
  },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Floating animation for decorative elements
export const floatingVariants: Variants = {
  initial: {
    y: 0,
    rotate: 0
  },
  animate: {
    y: [-5, 5, -5],
    rotate: [-1, 1, -1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Shimmer effect for loading states
export const shimmerVariants: Variants = {
  initial: {
    backgroundPosition: "-200% 0"
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Utility function to create reduced motion variants
export function createReducedMotionVariants(variants: Variants): Variants {
  const reducedVariants: Variants = {};
  
  Object.keys(variants).forEach(key => {
    const variant = variants[key];
    if (typeof variant === 'object' && variant !== null) {
      reducedVariants[key] = {
        ...variant,
        scale: 1,
        rotate: 0,
        y: 0,
        x: 0,
        transition: { duration: 0 }
      };
    } else {
      reducedVariants[key] = variant;
    }
  });
  
  return reducedVariants;
}

// Utility function to get appropriate variants based on motion preference
export function getMotionVariants(variants: Variants, prefersReducedMotion: boolean): Variants {
  return prefersReducedMotion ? createReducedMotionVariants(variants) : variants;
}

// Micro-interaction presets
export const MICRO_INTERACTIONS = {
  // Subtle scale on hover
  scaleOnHover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: TRANSITIONS.quick
  },
  
  // Lift effect on hover
  liftOnHover: {
    whileHover: { y: -2, scale: 1.01 },
    whileTap: { y: 0, scale: 0.99 },
    transition: TRANSITIONS.quick
  },
  
  // Glow effect on hover
  glowOnHover: {
    whileHover: {
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
      transition: TRANSITIONS.quick
    }
  },
  
  // Rotate icon on hover
  rotateOnHover: {
    whileHover: { rotate: 5 },
    whileTap: { rotate: -5 },
    transition: TRANSITIONS.quick
  }
} as const;

export default {
  ANIMATION_DURATIONS,
  EASING,
  TRANSITIONS,
  serviceCardVariants,
  buttonVariants,
  iconVariants,
  chevronVariants,
  contentRevealVariants,
  staggerContainer,
  staggerItem,
  imageVariants,
  badgeVariants,
  floatingVariants,
  shimmerVariants,
  getMotionVariants,
  MICRO_INTERACTIONS
};