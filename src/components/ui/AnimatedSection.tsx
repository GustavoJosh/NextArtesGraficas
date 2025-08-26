"use client";

import { motion, Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useScrollAnimations';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  id?: string;
}

const animationVariants = {
  fadeUp: {
    hidden: { 
      opacity: 0, 
      y: 60,
      transition: { duration: 0.6 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  fadeIn: {
    hidden: { 
      opacity: 0,
      transition: { duration: 0.4 }
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  slideLeft: {
    hidden: { 
      opacity: 0, 
      x: -60,
      transition: { duration: 0.6 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  slideRight: {
    hidden: { 
      opacity: 0, 
      x: 60,
      transition: { duration: 0.6 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  scale: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.4 }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
};

export function AnimatedSection({
  children,
  className = "",
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  id
}: AnimatedSectionProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  const variants: Variants = {
    hidden: animationVariants[animation].hidden,
    visible: {
      ...animationVariants[animation].visible,
      transition: {
        delay,
        duration,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      ref={elementRef}
      className={className}
      id={id}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}

// Specialized animated components
export function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0,
  index = 0 
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
  index?: number;
}) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  });

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isIntersecting ? {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          delay: delay + (index * 0.1),
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      } : {}}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedText({ 
  children, 
  className = "", 
  delay = 0,
  variant = 'fadeUp'
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft';
}) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}