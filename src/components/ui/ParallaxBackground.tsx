"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useParallax } from '@/hooks/useScrollAnimations';
import { ReactNode } from 'react';

interface ParallaxBackgroundProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function ParallaxBackground({
  children,
  className = "",
  speed = 0.5,
  direction = 'up',
  intensity = 'subtle'
}: ParallaxBackgroundProps) {
  const { elementRef, offset } = useParallax(speed);

  const intensityMap = {
    subtle: 0.3,
    medium: 0.5,
    strong: 0.8
  };

  const actualSpeed = speed * intensityMap[intensity];

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${offset}px)`;
      case 'down':
        return `translateY(${-offset}px)`;
      case 'left':
        return `translateX(${offset}px)`;
      case 'right':
        return `translateX(${-offset}px)`;
      default:
        return `translateY(${offset}px)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: getTransform(),
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}

export function ParallaxContainer({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  const { scrollYProgress } = useScroll();
  
  // Create multiple parallax layers with different speeds
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  
  return (
    <div className={`relative ${className}`}>
      {/* Background parallax layer */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Midground parallax layer */}
      <motion.div
        className="absolute inset-0 -z-5"
        style={{ y: midgroundY }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-600/20 to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function FloatingElements({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  
  const float1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const float2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const float3Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-4 h-4 bg-blue-400/10 rounded-full"
        style={{ y: float1Y, rotate: rotate1 }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-6 h-6 border border-purple-400/10 rotate-45"
        style={{ y: float2Y, rotate: rotate2 }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-green-400/10 rounded-full"
        style={{ y: float3Y }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/6 w-5 h-5 border border-orange-400/10 rounded-full"
        style={{ y: float1Y, rotate: rotate1 }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}