// src/components/ui/ServiceCard.tsx
"use client";

import { useState } from 'react';
import { Printer, Zap, FileText, Scissors, Palette, Sticker } from 'lucide-react';
import { ServiceIcon } from './PrintingAnimations';

interface ServiceCardProps {
  title: string;
  description: string;
  category: 'impresion' | 'laser' | 'papeleria';
  imageName: string;
  index: number;
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

export function ServiceCard({ title, description, category, imageName, index }: ServiceCardProps) {
  const Icon = getServiceIcon(category);
  const colorGradient = getCategoryColor(category);

  return (
    <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105">
      {/* Card container */}
      <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 overflow-hidden">
        
        {/* Background gradient on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover:opacity-10 
          transition-opacity duration-300 rounded-xl
        `}></div>

        {/* Service icon */}
        <div className="flex justify-center mb-4">
          <div className={`
            relative p-4 rounded-full transition-all duration-300 hover:scale-105
            bg-gray-800/50 backdrop-blur-sm border border-gray-700/50
          `}>
            <Icon className={`w-8 h-8 ${category === 'impresion' ? 'text-blue-400' : category === 'laser' ? 'text-red-400' : 'text-green-400'} transition-colors duration-300`} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Subtle border effect on hover */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        
        {/* Corner accent */}
        <div className={`
          absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${colorGradient} 
          opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl
        `}></div>
      </div>
    </div>
  );
}

export function ServiceGrid({ services }: { services: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {services.map((service, index) => (
        <ServiceCard
          key={service.title}
          title={service.title}
          description={service.description}
          category={service.category}
          imageName={service.imageName}
          index={index}
        />
      ))}
    </div>
  );
}