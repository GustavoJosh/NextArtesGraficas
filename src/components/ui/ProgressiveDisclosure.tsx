"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimations';
// Simple chevron icon component
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface ProgressiveDisclosureProps {
  title: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  animateOnScroll?: boolean;
  icon?: ReactNode;
}

export function ProgressiveDisclosure({
  title,
  children,
  className = "",
  defaultOpen = false,
  animateOnScroll = true,
  icon
}: ProgressiveDisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const contentVariants = {
    closed: {
      height: 0,
      opacity: 0
    },
    open: {
      height: 'auto',
      opacity: 1
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden ${className}`}
      initial={animateOnScroll ? "hidden" : "visible"}
      animate={animateOnScroll ? (isIntersecting ? "visible" : "hidden") : "visible"}
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <button
        onClick={toggleOpen}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/30 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
            {title}
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-gray-400 group-hover:text-blue-300 transition-colors"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={contentVariants}
            className="overflow-hidden"
          >
            <motion.div 
              className="px-6 pb-6"
              variants={itemVariants}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ProgressiveDisclosureGroup({ 
  children, 
  className = "",
  allowMultiple = false 
}: { 
  children: ReactNode; 
  className?: string;
  allowMultiple?: boolean;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleToggle = (itemId: string) => {
    if (allowMultiple) {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId);
      } else {
        newOpenItems.add(itemId);
      }
      setOpenItems(newOpenItems);
    } else {
      setOpenItems(openItems.has(itemId) ? new Set() : new Set([itemId]));
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
}

// Specialized disclosure components
export function FeatureDisclosure({ 
  title, 
  features, 
  className = "" 
}: { 
  title: string; 
  features: string[]; 
  className?: string; 
}) {
  return (
    <ProgressiveDisclosure
      title={title}
      className={className}
      icon={<div className="w-2 h-2 bg-blue-400 rounded-full" />}
    >
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-3 text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
    </ProgressiveDisclosure>
  );
}

export function StatsDisclosure({ 
  title, 
  stats, 
  className = "" 
}: { 
  title: string; 
  stats: Array<{ label: string; value: string; description?: string }>; 
  className?: string; 
}) {
  return (
    <ProgressiveDisclosure
      title={title}
      className={className}
      icon={<div className="w-3 h-3 bg-green-400 rounded-sm rotate-45" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-700/30 rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-white mb-1">
              {stat.label}
            </div>
            {stat.description && (
              <div className="text-xs text-gray-400">
                {stat.description}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </ProgressiveDisclosure>
  );
}