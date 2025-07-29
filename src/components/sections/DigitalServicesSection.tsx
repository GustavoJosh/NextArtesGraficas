// src/components/sections/DigitalServicesSection.tsx
"use client";
import DecryptedText from '@/components/ui/DecryptedText';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, WebsiteIcon, PrinterIcon } from '@/components/ui/PrintingIcons';
import { Monitor, Palette, Code, Globe, FileText } from 'lucide-react';

const digitalServices = [
  {
    title: "Menús Digitales para Restaurantes",
    description: "Menús interactivos con códigos QR, fáciles de actualizar y perfectos para la era digital.",
    icon: MenuIcon,
    features: ["Códigos QR personalizados", "Actualización en tiempo real", "Diseño responsive", "Múltiples idiomas"],
    color: "from-[#F7DF14] to-[#E6C200]"
  },
  {
    title: "Páginas Web Profesionales",
    description: "Sitios web modernos y responsivos que representan tu marca de manera profesional.",
    icon: WebsiteIcon,
    features: ["Diseño responsive", "SEO optimizado", "Carga rápida", "Fácil administración"],
    color: "from-[#0E345A] to-[#1A3A5C]"
  },
  {
    title: "Identidad Visual Digital",
    description: "Logos, paletas de colores y elementos gráficos para tu presencia digital.",
    icon: Palette,
    features: ["Logo vectorial", "Paleta de colores", "Tipografías", "Manual de marca"],
    color: "from-[#F7DF14] to-[#E6C200]"
  },
  {
    title: "Soluciones de Impresión",
    description: "Desde tarjetas de presentación hasta lonas publicitarias de gran formato.",
    icon: PrinterIcon,
    features: ["Alta calidad", "Múltiples formatos", "Entrega rápida", "Precios competitivos"],
    color: "from-[#0E345A] to-[#1A3A5C]"
  }
];

export function DigitalServicesSection() {
  const [, setActiveService] = useState(0);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-[#0E345A] via-[#1A3A5C] to-[#0A1B2E] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F7DF14] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#0E345A] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-4">
          <Code className="w-6 h-6 text-[#F7DF14] mr-2" />
          <span className="text-[#F7DF14] font-medium uppercase tracking-wider text-sm">Soluciones Digitales</span>
          <Globe className="w-6 h-6 text-[#F7DF14] ml-2" />
        </div>
      
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text">
            <DecryptedText
              text="Más que Impresión"
              animateOn="view"
              revealDirection="start"
              // --- AJUSTES DE VELOCIDAD ---
              speed={100}         // <-- Aumentamos el número para hacerlo más lento
              maxIterations={25}  // <-- Aumentamos las iteraciones para alargar el efecto
              sequential={true}   // <-- Hacemos que se revele secuencialmente
               // <-- Revela desde el inicio
            />
          </span>
        </h2>
          
           <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
    <DecryptedText
        text="Combinamos la tradición de las artes gráficas con la innovación digital. Ofrecemos soluciones completas para tu negocio, desde el diseño hasta la implementación."
        animateOn="view"
        revealDirection="start"
        // --- Le damos valores ligeramente diferentes para un efecto más natural ---
        speed={10}
        maxIterations={10}
        sequential={true}
    />
  </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {digitalServices.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <div
                key={service.title}
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-102"
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#F7DF14]/50 transition-all duration-300 overflow-hidden h-full shadow-lg group-hover:shadow-2xl group-hover:shadow-[#F7DF14]/20">
                  
                  {/* Animated background gradient */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br from-[#F7DF14] to-[#E6C200] opacity-0 group-hover:opacity-90 
                    transition-opacity duration-500 rounded-2xl
                  `}></div>
                  
                  {/* Icon */}
                  <div className="flex items-center mb-6">
                    <div className={`
                      p-4 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20 
                      group-hover:scale-110 group-hover:bg-[#0E345A]/20 transition-all duration-300
                    `}>
                      <IconComponent className="w-8 h-8 text-white group-hover:text-[#0E345A] transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#0E345A] transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-lg text-gray-300 group-hover:text-[#0E345A] transition-colors duration-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-base text-gray-300 group-hover:text-[#0E345A] transition-colors duration-300">
                          <div className="w-3 h-3 rounded-full bg-[#0E345A] group-hover:bg-[#F7DF14] mr-4 transition-colors duration-300"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F7DF14] to-[#E6C200]"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-5 group-hover:opacity-15 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0E345A] to-[#1A3A5C]"></div>
                  </div>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process flow */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Nuestro Proceso de Trabajo
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-[#F7DF14]/20 rounded-full mb-4 hover:bg-[#F7DF14]/30 transition-colors duration-300">
                <FileText className="w-8 h-8 text-[#F7DF14]" />
              </div>
              <h4 className="font-semibold text-white mb-2">1. Consulta</h4>
              <p className="text-gray-300 text-sm">Analizamos tus necesidades</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-[#F7DF14] to-[#0E345A]"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-[#0E345A]/30 rounded-full mb-4 hover:bg-[#0E345A]/40 transition-colors duration-300">
                <Palette className="w-8 h-8 text-blue-300" />
              </div>
              <h4 className="font-semibold text-white mb-2">2. Diseño</h4>
              <p className="text-gray-300 text-sm">Creamos la propuesta visual</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-[#0E345A] to-[#F7DF14]"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-[#F7DF14]/20 rounded-full mb-4 hover:bg-[#F7DF14]/30 transition-colors duration-300">
                <Monitor className="w-8 h-8 text-[#F7DF14]" />
              </div>
              <h4 className="font-semibold text-white mb-2">3. Desarrollo</h4>
              <p className="text-gray-300 text-sm">Implementamos la solución</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-[#F7DF14] to-[#0E345A]"></div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-[#0E345A]/30 rounded-full mb-4 hover:bg-[#0E345A]/40 transition-colors duration-300">
                <Globe className="w-8 h-8 text-blue-300" />
              </div>
              <h4 className="font-semibold text-white mb-2">4. Entrega</h4>
              <p className="text-gray-300 text-sm">Lanzamos tu proyecto</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="px-8 py-3">
              Solicitar Cotización Gratuita
            </Button>
            
            <Button variant="outline" size="lg" className="border-[#F7DF14] text-[#F7DF14] hover:bg-[#F7DF14] hover:text-[#0E345A] px-8 py-3">
              Ver Ejemplos de Trabajo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}