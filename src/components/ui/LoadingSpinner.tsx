// src/components/ui/LoadingSpinner.tsx
"use client";

import { PrinterIcon, InkDropIcon } from './PrintingIcons';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated printer */}
      <div className="relative">
        <PrinterIcon className="w-12 h-12 text-blue-500 animate-pulse" />
        {/* Paper feeding animation */}
        <div className="absolute -right-2 top-2 w-3 h-4 bg-white/80 rounded-sm animate-paper-feed"></div>
        {/* Ink drops */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
          <InkDropIcon className="w-4 h-4 text-blue-500 animate-ink-drop" />
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <p className="text-white font-medium">Preparando tu experiencia...</p>
        <div className="flex space-x-1 mt-2 justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animate-delay-100"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animate-delay-200"></div>
        </div>
      </div>
    </div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-slide-in-left">
      {children}
    </div>
  );
}