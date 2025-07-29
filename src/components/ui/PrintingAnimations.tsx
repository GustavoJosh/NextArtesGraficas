// src/components/ui/PrintingAnimations.tsx
"use client";

import { Printer, Zap, FileText, Palette, Layers } from 'lucide-react';

export function FloatingPrintElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating paper sheets */}
      <div className="absolute top-20 left-10 animate-paper-feed animate-delay-100">
        <div className="w-8 h-10 bg-white/20 rounded-sm shadow-lg"></div>
      </div>
      <div className="absolute top-32 right-20 animate-paper-feed animate-delay-300">
        <div className="w-6 h-8 bg-white/15 rounded-sm shadow-lg"></div>
      </div>
      <div className="absolute bottom-40 left-1/4 animate-paper-feed animate-delay-500">
        <div className="w-10 h-12 bg-white/10 rounded-sm shadow-lg"></div>
      </div>

      {/* Floating ink drops */}
      <div className="absolute top-1/3 right-1/3 animate-ink-drop animate-delay-200">
        <div className="w-3 h-3 bg-blue-500/60 rounded-full"></div>
      </div>
      <div className="absolute top-1/2 left-1/3 animate-ink-drop animate-delay-100">
        <div className="w-2 h-2 bg-purple-500/60 rounded-full"></div>
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-ink-drop animate-delay-300">
        <div className="w-4 h-4 bg-pink-500/60 rounded-full"></div>
      </div>

      {/* Floating service icons */}
      <div className="absolute top-1/4 left-1/2 animate-float-up animate-delay-100">
        <Printer className="w-6 h-6 text-blue-400/40" />
      </div>
      <div className="absolute bottom-1/4 right-1/2 animate-float-up animate-delay-200">
        <Zap className="w-5 h-5 text-yellow-400/40" />
      </div>
      <div className="absolute top-3/4 left-1/3 animate-float-up animate-delay-300">
        <FileText className="w-4 h-4 text-green-400/40" />
      </div>
    </div>
  );
}

export function PrinterMachine() {
  return (
    <div className="relative w-32 h-20 mx-auto mb-8">
      {/* Printer body */}
      <div className="w-full h-16 bg-gray-700 rounded-lg shadow-xl relative overflow-hidden">
        {/* Printer screen */}
        <div className="absolute top-2 right-2 w-6 h-4 bg-blue-500 rounded-sm animate-pulse-glow"></div>
        
        {/* Paper tray */}
        <div className="absolute bottom-0 left-2 w-8 h-2 bg-gray-600 rounded-t-sm"></div>
        
        {/* Roller animation */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-gray-500 rounded-full animate-printer-roll"></div>
        <div className="absolute top-4 right-8 w-2 h-2 bg-gray-500 rounded-full animate-printer-roll"></div>
        
        {/* Laser beam effect */}
        <div className="absolute top-6 left-0 h-0.5 bg-red-500 animate-laser-beam"></div>
      </div>
      
      {/* Paper output */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-white/80 rounded-sm shadow-md animate-slide-in-right"></div>
    </div>
  );
}

export function ServiceIcon({ icon: Icon, category, isActive = false }: {
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  isActive?: boolean;
}) {
  const getIconColor = (cat: string) => {
    switch (cat) {
      case 'impresion': return 'text-blue-400';
      case 'laser': return 'text-red-400';
      case 'papeleria': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`
      relative p-4 rounded-full transition-all duration-300 
      ${isActive ? 'animate-pulse-glow scale-110' : 'hover:scale-105'}
      bg-gray-800/50 backdrop-blur-sm border border-gray-700/50
    `}>
      <Icon className={`w-8 h-8 ${getIconColor(category)} transition-colors duration-300`} />
      
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export function DigitalProcessFlow() {
  return (
    <div className="flex items-center justify-center space-x-8 my-12">
      {/* Design */}
      <div className="flex flex-col items-center animate-slide-in-left">
        <div className="p-3 bg-purple-500/20 rounded-full mb-2">
          <Palette className="w-6 h-6 text-purple-400" />
        </div>
        <span className="text-sm text-gray-400">Diseño</span>
      </div>

      {/* Arrow */}
      <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 animate-laser-beam"></div>

      {/* Print */}
      <div className="flex flex-col items-center animate-slide-in-left animate-delay-200">
        <div className="p-3 bg-blue-500/20 rounded-full mb-2">
          <Printer className="w-6 h-6 text-blue-400" />
        </div>
        <span className="text-sm text-gray-400">Impresión</span>
      </div>

      {/* Arrow */}
      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 animate-laser-beam animate-delay-100"></div>

      {/* Finish */}
      <div className="flex flex-col items-center animate-slide-in-left animate-delay-300">
        <div className="p-3 bg-green-500/20 rounded-full mb-2">
          <Layers className="w-6 h-6 text-green-400" />
        </div>
        <span className="text-sm text-gray-400">Acabado</span>
      </div>
    </div>
  );
}