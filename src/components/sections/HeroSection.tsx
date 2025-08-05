// src/components/sections/HeroSection.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowDown, Monitor, Printer, Palette } from "lucide-react";
import Image from "next/image";
import CircularText from '@/components/ui/CircularText';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-[#0A1B2E] via-[#0E345A] to-[#1A3A5C] text-white overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          {/*
    Quitamos 'flex', 'items-center', y 'justify-center'.
    El 'relative' es lo único que necesita para anclar al hijo absol
  */}
          <div className="relative w-48 h-48 mx-auto mb-4">

            <CircularText
              text="Artes • Gráficas • Digitales • "
              onHover="speedUp"
              spinDuration={25}
              // Estas clases ahora sí funcionarán como se espera
              className="absolute top-0 left-0 w-full h-full text-[#F7DF14]"
            />

            {/* Este logo, al no ser absoluto, podemos centrarlo dentro del div
    */}
            <Image
              src="/images/logos/circle.png"
              alt="Artes Gráficas Digitales Logo"
              width={128}
              height={128}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain mt-[4px] ml-[5px]"
              priority
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl leading-normal font-bold bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text">
          Artes Gráficas Digitales
        </h1>


        <div className="flex items-center justify-center mt-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#F7DF14] mr-2" />
          <span className="text-[#F7DF14] font-medium">Impresión • Láser • Digital</span>
          <Sparkles className="w-5 h-5 text-[#F7DF14] ml-2" />
        </div>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl text-center mx-auto">
          Soluciones profesionales al servicio de tu marca. Desde impresión tradicional hasta corte láser y diseño digital.
        </p>

        {/* Static process flow */}
        <div className="flex items-center justify-center space-x-8 my-12">
          {/* Design */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-[#F7DF14]/20 rounded-full mb-2 hover:bg-[#F7DF14]/30 transition-colors duration-300">
              <Palette className="w-6 h-6 text-[#F7DF14]" />
            </div>
            <span className="text-sm text-gray-300">Diseño</span>
          </div>

          {/* Arrow */}
          <div className="w-8 h-0.5 bg-gradient-to-r from-[#F7DF14] to-[#0E345A]"></div>

          {/* Print */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-[#0E345A]/30 rounded-full mb-2 hover:bg-[#0E345A]/40 transition-colors duration-300">
              <Printer className="w-6 h-6 text-blue-300" />
            </div>
            <span className="text-sm text-gray-300">Impresión</span>
          </div>

          {/* Arrow */}
          <div className="w-8 h-0.5 bg-gradient-to-r from-[#0E345A] to-[#F7DF14]"></div>

          {/* Finish */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-[#F7DF14]/20 rounded-full mb-2 hover:bg-[#F7DF14]/30 transition-colors duration-300">
              <Monitor className="w-6 h-6 text-[#F7DF14]" />
            </div>
            <span className="text-sm text-gray-300">Acabado</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 mb-16">
          <Button
            className="px-8 py-3 bg-[#F7DF14] text-[#0E345A] font-semibold rounded-lg shadow-lg hover:bg-[#E6C200] transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ¡Conoce nuestros servicios!
          </Button>

          <Button
            variant="outline"
            className="px-6 py-3 border-2 border-[#F7DF14] text-white bg-[#0E345A] hover:bg-[#F7DF14] hover:text-[#0E345A] transition-all duration-300"
            onClick={() => {
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver Portfolio
          </Button>
        </div>
      </div>

      {/* Static scroll indicator - moved outside main content container */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <ArrowDown className="w-6 h-6 text-[#F7DF14]" />
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B2E]/50 to-transparent pointer-events-none"></div>
    </section>
  );
}