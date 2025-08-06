// src/components/sections/PortfolioPreview.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ArrowRight, Star } from 'lucide-react';
import './PortfolioPreview.css';

// Registrar ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_BREAKPOINT = 768;

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

export function PortfolioPreview() {
  // Get featured projects or first 3 projects for preview
  const featuredProjects = projects.filter(p => p.status === 'featured').slice(0, 3);
  const previewProjects = featuredProjects.length >= 3 ? featuredProjects : projects.slice(0, 3);
  
  // Refs para las animaciones
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();

  // Configurar animaciones de entrada desde abajo
  useEffect(() => {
    if (!sectionRef.current) return;

    const header = headerRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;
    const cards = grid?.querySelectorAll('.project-card');

    if (!header || !grid || !cta || !cards) return;

    // Configurar posiciones iniciales
    gsap.set(header, { 
      y: 60, 
      opacity: 0 
    });

    gsap.set(cards, { 
      y: 80, 
      opacity: 0,
      scale: 0.9
    });

    gsap.set(cta, { 
      y: 60, 
      opacity: 0,
      scale: 0.95
    });

    // Crear timeline para las animaciones
    const tl = gsap.timeline({
      delay: isMobile ? 0.3 : 0, // En móvil, delay mínimo para que se ejecute automáticamente
      ...(isMobile ? {} : {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        }
      }),
      onComplete: () => {
        // Limpiar las transformaciones después de la animación
        gsap.set([header, ...Array.from(cards), cta], { 
          clearProps: "all" 
        });
      }
    });

    // Animar header con efecto de reveal
    tl.to(header, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, 0)
    .to(header.querySelector('h2'), {
      backgroundPosition: "0% 50%",
      duration: 1.2,
      ease: "power2.out"
    }, 0.2);

    // Animar tarjetas de proyecto con stagger y efectos adicionales
    tl.to(cards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        from: "start",
        ease: "power2.out"
      },
      ease: "back.out(1.7)",
      onComplete: function() {
        // Agregar un sutil efecto de brillo después de la animación
        this.targets().forEach((card: Element, index: number) => {
          gsap.to(card, {
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15)",
            duration: 0.3,
            delay: index * 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        });
      }
    }, 0.4);

    // Animar CTA con efecto de entrada dramático
    tl.to(cta, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, 0.9)
    .to(cta.querySelector('.portfolio-cta'), {
      boxShadow: "0 0 40px rgba(247, 223, 20, 0.2)",
      duration: 0.5,
      ease: "power2.out"
    }, 1.2);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [isMobile, previewProjects.length]);

  return (
    <section ref={sectionRef} className="portfolio-section w-full py-16 md:py-20 bg-gradient-to-b from-[#0E345A] to-[#0A1B2E] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-40 h-40 bg-[#F7DF14] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#0E345A] rounded-full blur-3xl"></div>
      </div>

      <div className="portfolio-content container mx-auto px-4 md:px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-5 h-5 text-[#F7DF14] mr-2" />
            <span className="text-[#F7DF14] font-medium uppercase tracking-wider text-sm">Portfolio</span>
            <Star className="w-5 h-5 text-[#F7DF14] ml-2" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#F7DF14] via-white to-[#F7DF14] text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
              Nuestros Mejores Trabajos
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Proyectos que reflejan nuestro compromiso con la calidad y la innovación
          </p>
        </div>

        {/* Portfolio preview grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {previewProjects.map((project) => (
            <div key={project.title} className="project-card">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                url={project.url}
                status={project.status}
                technologies={project.technologies}
                completionTime={project.completionTime}
                client={project.client}
              />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div ref={ctaRef} className="text-center">
          <div className="portfolio-cta bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              ¿Quieres ver más de nuestro trabajo?
            </h3>
            <p className="text-gray-400 mb-6">
              Explora nuestro portfolio completo con más de {projects.length} proyectos exitosos
            </p>
            <Button asChild size="lg" className="bg-[#F7DF14] text-[#0E345A] hover:bg-[#F7DF14]/90">
              <Link href="/portafolio" className="inline-flex items-center">
                Ver Portfolio Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}