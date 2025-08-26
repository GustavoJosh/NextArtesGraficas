"use client";

import { motion } from 'framer-motion';
import { useScrollProgress, useScrollDirection } from '@/hooks/useScrollAnimations';

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export function ScrollProgress({ 
  className = "", 
  color = "bg-gradient-to-r from-blue-500 to-purple-600",
  height = 3
}: ScrollProgressProps) {
  const scrollProgress = useScrollProgress();

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollProgress > 0.01 ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full bg-gray-800/20 backdrop-blur-sm">
        <motion.div
          className={`${color} transition-all duration-100 ease-out`}
          style={{ 
            height: `${height}px`,
            width: `${scrollProgress * 100}%`
          }}
        />
      </div>
    </motion.div>
  );
}

export function ScrollToTop({ className = "" }: { className?: string }) {
  const scrollProgress = useScrollProgress();
  const scrollDirection = useScrollDirection();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const shouldShow = scrollProgress > 0.2 && scrollDirection === 'down';

  return (
    <motion.button
      className={`fixed bottom-6 right-6 z-40 p-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full text-white hover:bg-gray-700/80 transition-colors duration-200 ${className}`}
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: shouldShow ? 1 : 0,
        scale: shouldShow ? 1 : 0.8,
        y: shouldShow ? 0 : 20
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ pointerEvents: shouldShow ? 'auto' : 'none' }}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </motion.button>
  );
}

export function SectionNavigator({ 
  sections,
  className = "" 
}: { 
  sections: Array<{ id: string; label: string }>;
  className?: string;
}) {
  const scrollProgress = useScrollProgress();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-40 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: scrollProgress > 0.1 ? 1 : 0,
        x: scrollProgress > 0.1 ? 0 : -20
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full p-2">
        <div className="space-y-2">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="block w-3 h-3 rounded-full bg-gray-600 hover:bg-blue-400 transition-colors duration-200"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={section.label}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  );
}