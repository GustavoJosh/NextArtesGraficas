import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollTrigger = () => {
  useEffect(() => {
    // Configuración global para móviles
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      ignoreMobileResize: true,
    });

    // Refresh después de que la página esté completamente cargada
    const handleLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Refresh en cambios de orientación móvil
    const handleOrientationChange = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);
};