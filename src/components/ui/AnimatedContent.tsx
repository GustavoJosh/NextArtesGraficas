import React, { useRef, useEffect, ReactNode, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string | ((progress: number) => number);
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  onComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Detectar si es móvil y si la página está cargada
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    setIsLoaded(true);
    
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isLoaded) return;

    // Esperar un frame para asegurar que el DOM esté listo
    const initAnimation = () => {
      const axis = direction === "horizontal" ? "x" : "y";
      const offset = reverse ? -distance : distance;
      
      // Configuración inicial
      gsap.set(el, {
        [axis]: offset,
        scale,
        opacity: animateOpacity ? initialOpacity : 1,
      });

      // Crear la animación
      const animation = gsap.to(el, {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
        onComplete,
        scrollTrigger: {
          trigger: el,
          start: isMobile ? "top 90%" : `top ${(1 - threshold) * 100}%`,
          end: "bottom 10%",
          toggleActions: "play none none none",
          once: true,
          // Configuraciones mejoradas para móviles
          refreshPriority: isMobile ? 1 : 0,
          invalidateOnRefresh: true,
          fastScrollEnd: isMobile ? 2000 : true,
          preventOverlaps: true,
          // Debug en desarrollo
          // markers: process.env.NODE_ENV === 'development',
        },
      });

      // Fallback mejorado para móviles
      if (isMobile) {
        const checkVisibility = () => {
          const rect = el.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
          
          if (isVisible && animation.progress() === 0) {
            animation.play();
          }
        };

        // Verificar inmediatamente si ya es visible
        setTimeout(checkVisibility, 100);
        
        // También verificar en scroll
        const handleScroll = () => {
          if (animation.progress() === 0) {
            checkVisibility();
          }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
          ScrollTrigger.getAll().forEach((t) => t.kill());
          gsap.killTweensOf(el);
        };
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        gsap.killTweensOf(el);
      };
    };

    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    const rafId = requestAnimationFrame(() => {
      const cleanup = initAnimation();
      return cleanup;
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
    isMobile,
    isLoaded,
  ]);

  return <div ref={ref}>{children}</div>;
};

export default AnimatedContent;
