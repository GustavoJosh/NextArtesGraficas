// src/components/sections/HeroSection.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowDown, Monitor, Printer, Palette } from "lucide-react";
import Image from "next/image";
import CircularText from '@/components/ui/CircularText';
import AnimatedContent from "@/components/ui/AnimatedContent";
import ShinyText from "@/components/ui/ShinyText";




export function HeroSection() {


  return (

    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center p-8 bg-[#0C243D] text-white overflow-hidden">

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <AnimatedContent
            distance={300}
            direction="vertical"
            reverse={false}
            duration={3}
            ease="power2.out"
            initialOpacity={0}
            animateOpacity
            scale={1.05}
            threshold={0}
            delay={0}
          >
            <div className="relative w-48 h-48 mx-auto mb-4">

              <CircularText
                text="IMPRENTA • SERVICIOS WEB •"
                onHover="goBonkers"
                spinDuration={20}

                className="absolute top-0 left-0 w-full h-full text-[#DBC844]"
              />

              <Image
                src="/images/logos/circle.png"
                alt="Artes Gráficas Digitales Logo"
                width={128}
                height={128}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain mt-[4px] ml-[5px]"
                priority
              />
            </div>
          </AnimatedContent>
        </div>

        <AnimatedContent
          distance={800}
          direction="horizontal"
          reverse={false}
          duration={3}
          ease="power2.out"
          initialOpacity={0}
          animateOpacity
          scale={1.02}
          threshold={0}
          delay={0}
        >
          <h1 className="bebas-neue-regular text-center">
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight relative">
              <ShinyText text="ARTES GRÁFICAS" disabled={false} speed={5} className='inline-block text-[#DBC844] tracking-wide' />
              <span className="text-sm md:text-base lg:text-lg text-[#DBC844] absolute -top-2 md:-top-3 lg:-top-4 ml-1">®</span>
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.3em] -mt-2">
              <ShinyText text="DIGITALES" disabled={false} speed={5} className='inline-block text-[#DBC844]' />
            </div>
          </h1>
        </AnimatedContent>


        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={false}
          duration={1.5}
          ease="power1.out"
          initialOpacity={0}
          animateOpacity
          scale={1.0}
          threshold={0}
          delay={0}
        >
          <div className="flex items-center justify-center mt-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#DBC844] mr-2" />
            <span className="text-[#DBC844] font-medium">Impresión • Láser • Digital</span>
            <Sparkles className="w-5 h-5 text-[#DBC844] ml-2" />
          </div>
        </AnimatedContent>

        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={3}
          ease="power1.out"
          initialOpacity={0}
          animateOpacity
          scale={1.0}
          threshold={0}
          delay={0}
        >
          <p className="contrail-one-regular text-lg md:text-xl text-white max-w-2xl text-center mx-auto">
            Soluciones profesionales al servicio de tu marca. Desde impresión tradicional hasta corte láser y diseño digital.
          </p>
        </AnimatedContent>


        <div className="flex items-center justify-center space-x-8 my-12">
          {/* Design */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-[#DBC844]/20 rounded-full mb-2 hover:bg-[#DBC844]/30 transition-colors duration-300">
              <Palette className="w-6 h-6 text-[#DBC844]" />
            </div>
            <span className="text-sm text-gray-300">Diseño</span>
          </div>

          {/* Arrow */}
          <div className="w-8 h-0.5 bg-gradient-to-r from-[#DBC844] to-white"></div>

          {/* Print */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white/20 rounded-full mb-2 hover:bg-white/30 transition-colors duration-300">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-300">Impresión</span>
          </div>

          {/* Arrow */}
          <div className="w-8 h-0.5 bg-gradient-to-r from-white to-[#DBC844]"></div>

          {/* Finish */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-[#DBC844]/20 rounded-full mb-2 hover:bg-[#DBC844]/30 transition-colors duration-300">
              <Monitor className="w-6 h-6 text-[#DBC844]" />
            </div>
            <span className="text-sm text-gray-300">Acabado</span>
          </div>
        </div>



        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 mb-16">
          <Button
            className="px-8 py-3 bg-[#DBC844] text-[#0C243D] font-semibold rounded-lg shadow-lg hover:bg-[#C5B23D] transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ¡Conoce nuestros servicios!
          </Button>

          <Button
            variant="outline"
            className="px-6 py-3 border-2 border-[#DBC844] text-[#DBC844] bg-transparent hover:bg-[#DBC844] hover:text-[#0C243D] transition-all duration-300"
            onClick={() => {
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver Portfolio
          </Button>
        </div>
      </div>

      {/* Animated scroll indicator */}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <ArrowDown className="w-6 h-6 text-[#DBC844] animate-bounce" />
      </div>


      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C243D]/80 to-transparent pointer-events-none"></div>
    </section>
  );
}