// Test component for animation enhancements
"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAnimations, useStaggerAnimation, useHoverEffects } from '@/hooks/useAnimations';
import { 
  serviceCardVariants, 
  buttonVariants, 
  badgeVariants,
  MICRO_INTERACTIONS 
} from '@/lib/animations';
import { Clock, Star, Zap } from 'lucide-react';

export function AnimationTestCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const cardAnimations = useAnimations(serviceCardVariants);
  const buttonAnimations = useAnimations(buttonVariants);
  const badgeAnimations = useAnimations(badgeVariants);
  const staggerTest = useStaggerAnimation(5, 0.1);
  const hoverEffects = useHoverEffects(true);

  const testItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <div className="p-8 space-y-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-8">Animation Test Suite</h1>
      
      {/* Service Card Animation Test */}
      <motion.div
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        variants={cardAnimations.variants}
        initial="initial"
        animate={isExpanded ? "expanded" : "initial"}
        {...hoverEffects.hoverHandlers}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Service Card Animation</h2>
          <motion.button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            variants={buttonAnimations.variants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </motion.button>
        </div>
        
        <p className="text-gray-300 mb-4">
          This card demonstrates the enhanced service card animations with hover effects and expansion.
        </p>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-700 pt-4"
          >
            <p className="text-gray-400">
              Expanded content with smooth animations and proper accessibility support.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Badge Animation Test */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Badge Animations</h2>
        <div className="flex space-x-4">
          <motion.div
            className="flex items-center space-x-2 bg-black/40 rounded-full px-3 py-1 border border-yellow-400/30"
            variants={badgeAnimations.variants}
            animate="pulse"
          >
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">Pulsing Badge</span>
          </motion.div>
          
          <motion.div
            className="flex items-center space-x-2 bg-black/40 rounded-full px-3 py-1 border border-green-400/30"
            variants={badgeAnimations.variants}
            whileHover="hover"
          >
            <Star className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Hover Badge</span>
          </motion.div>
        </div>
      </div>

      {/* Stagger Animation Test */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Stagger Animations</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={staggerTest.containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 rounded-lg p-4 text-center"
              variants={staggerTest.itemVariants}
              whileHover={staggerTest.isReducedMotion ? {} : { scale: 1.05, y: -2 }}
            >
              <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <span className="text-white text-sm">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Micro-interactions Test */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Micro-interactions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.button
            className="bg-blue-600 text-white rounded-lg p-4 text-center"
            {...MICRO_INTERACTIONS.scaleOnHover}
          >
            Scale on Hover
          </motion.button>
          
          <motion.button
            className="bg-green-600 text-white rounded-lg p-4 text-center"
            {...MICRO_INTERACTIONS.liftOnHover}
          >
            Lift on Hover
          </motion.button>
          
          <motion.button
            className="bg-purple-600 text-white rounded-lg p-4 text-center"
            {...MICRO_INTERACTIONS.glowOnHover}
          >
            Glow on Hover
          </motion.button>
          
          <motion.div
            className="bg-red-600 text-white rounded-lg p-4 text-center flex items-center justify-center"
            {...MICRO_INTERACTIONS.rotateOnHover}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
        </div>
      </div>

      {/* Reduced Motion Indicator */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Accessibility</h2>
        <div className="flex items-center space-x-4">
          <div className={`w-4 h-4 rounded-full ${cardAnimations.isReducedMotion ? 'bg-red-500' : 'bg-green-500'}`} />
          <span className="text-gray-300">
            Reduced Motion: {cardAnimations.isReducedMotion ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Animations automatically respect user's motion preferences for accessibility.
        </p>
      </div>
    </div>
  );
}