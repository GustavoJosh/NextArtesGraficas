// src/components/ui/ServiceCard.tsx
"use client";

import { Printer, Zap, FileText, Palette } from 'lucide-react';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  category?: 'impresion' | 'laser' | 'papeleria';
  imageName?: string;
}

const getServiceIcon = (category: string) => {
  switch (category) {
    case 'impresion': return Printer;
    case 'laser': return Zap;
    case 'papeleria': return FileText;
    default: return Palette;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'impresion': return 'from-blue-500 to-cyan-500';
    case 'laser': return 'from-red-500 to-orange-500';
    case 'papeleria': return 'from-green-500 to-emerald-500';
    default: return 'from-gray-500 to-slate-500';
  }
};

export function ServiceCard({ title, description, category = 'impresion', imageName }: ServiceCardProps) {
  const Icon = getServiceIcon(category);
  const colorGradient = getCategoryColor(category);
  
  // Use placeholder image - you can change this to any image you prefer
  const placeholderImage = "/images/services/impresion-digital.webp";

  return (
    <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105">
      {/* Card container with fixed height */}
      <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 overflow-hidden h-64">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={placeholderImage}
            alt={title}
            fill
            className="object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          {/* Header with icon */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className={`
                p-2 rounded-full transition-all duration-300
                bg-black/30 backdrop-blur-sm border border-white/20
              `}>
                <Icon className={`w-5 h-5 ${category === 'impresion' ? 'text-blue-400' : category === 'laser' ? 'text-red-400' : 'text-green-400'} transition-colors duration-300`} />
              </div>
              <span className={`text-xs font-medium uppercase tracking-wider ${category === 'impresion' ? 'text-blue-400' : category === 'laser' ? 'text-red-400' : 'text-green-400'}`}>
                {category === 'impresion' ? 'Impresión' : category === 'laser' ? 'Láser' : 'Papelería'}
              </span>
            </div>
          </div>

          {/* Content at bottom */}
          <div className="text-left">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
              {title}
            </h3>
            
            <p className="text-gray-200 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Hover effects */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover:opacity-20 
          transition-opacity duration-300 rounded-xl
        `}></div>
        
        {/* Subtle border effect on hover */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}

export function ServiceGrid({ services }: { services: ServiceCardProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {services.map((service) => (
        <ServiceCard
          key={service.title}
          title={service.title}
          description={service.description}
          category={service.category}
        />
      ))}
    </div>
  );
}