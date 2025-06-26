// src/components/sections/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gray-900 text-white">
      <h1 className="text-5xl md:text-7xl leading-normal font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-xy">
        Artes Gráficas Digitales
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
        Soluciones profesionales al servicio de tu marca
      </p>
      <Button 
        className="mt-8 px-8 py-3 bg-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        onClick={() => {
          document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        ¡Conoce nuestros servicios!
      </Button>
    </section>
  );
}